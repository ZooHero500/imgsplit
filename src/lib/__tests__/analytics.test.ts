import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

type Payload = Record<string, unknown>
let analytics: typeof import("../analytics")
let events: Payload[]

function connectTracker() {
  window.umami = {
    track: vi.fn((callback: (properties: Payload) => Payload) => {
      events.push(callback({ website: "test-site", url: "/current?private=query#upload" }))
      return Promise.resolve()
    }),
  }
}

beforeEach(async () => {
  vi.resetModules()
  vi.stubEnv("NEXT_PUBLIC_UMAMI_DOMAINS", window.location.hostname)
  window.history.replaceState(null, "", "/zh-CN/workspace?private=query#upload")
  delete window.umami
  events = []
  analytics = await import("../analytics")
})

afterEach(() => {
  delete window.umami
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
  window.history.replaceState(null, "", "/")
})

describe("analytics delivery", () => {
  it("keeps queued actions on their original route and excludes queries and hashes", () => {
    analytics.trackEvent("upload_picker_opened")
    window.history.replaceState(null, "", "/compress")
    connectTracker()
    analytics.flushAnalyticsEvents()
    analytics.flushAnalyticsEvents()

    expect(events).toEqual([{
      website: "test-site",
      url: "/zh-CN/workspace",
      name: "upload_picker_opened",
      data: { schema_version: 1, page_path: "/zh-CN/workspace", locale: "zh-CN", tool: "split" },
    }])
  })

  it("does not collect local or preview traffic outside the configured domains", async () => {
    vi.stubEnv("NEXT_PUBLIC_UMAMI_DOMAINS", "imgsplit.com,www.imgsplit.com")
    vi.resetModules()
    analytics = await import("../analytics")
    connectTracker()
    analytics.trackEvent("tool_cta_clicked")
    analytics.flushAnalyticsEvents()
    expect(events).toEqual([])
  })

  it("bounds the queue when the analytics script is blocked", () => {
    for (let i = 0; i < 100; i++) analytics.trackEvent("upload_picker_opened")
    connectTracker()
    analytics.flushAnalyticsEvents()
    expect(events).toHaveLength(50)
  })

  it.each([
    ["/zh-CN/png-to-jpg", "compress", "zh-CN"],
    ["/ja/grid/workspace", "grid", "ja"],
    ["/remove-background", "removeBackground", "en"],
    ["/tools", "site", "en"],
  ])("attributes %s to its actual tool", (path, tool, locale) => {
    window.history.replaceState(null, "", path)
    connectTracker()
    analytics.trackEvent("tool_cta_clicked")
    expect(events[0].data).toMatchObject({ page_path: path, tool, locale })
  })

  it.each(["sync", "async"])("isolates %s tracker failures from image actions", async (mode) => {
    window.umami = { track: () => {
      if (mode === "sync") throw new Error("tracker unavailable")
      return Promise.reject(new Error("tracker unavailable"))
    } }
    await expect(analytics.trackOperation("export", async () => "image result")).resolves.toBe("image result")
  })
})

describe("operation outcomes", () => {
  it("emits one terminal event with elapsed time and the original route", () => {
    connectTracker()
    const now = vi.spyOn(Date, "now").mockReturnValue(1000)
    const finish = analytics.startOperation("processing", { input_count: 1 })
    window.history.replaceState(null, "", "/tools")
    now.mockReturnValue(1250)
    finish("succeeded", { output_count: 9 })
    finish("failed")
    finish("canceled")

    expect(events.map((event) => event.name)).toEqual(["processing_started", "processing_succeeded"])
    expect(events[1].data).toMatchObject({ page_path: "/zh-CN/workspace", input_count: 1, output_count: 9, duration_ms: 250 })
  })

  it("rethrows the original processing error without sending its contents", async () => {
    connectTracker()
    const error = new Error("secret-customer-photo.png failed at blob:private")
    await expect(analytics.trackOperation("processing", async () => { throw error })).rejects.toBe(error)
    expect(events.map((event) => event.name)).toEqual(["processing_started", "processing_failed"])
    expect(events[1].data).toMatchObject({ error_code: "processing_failed" })
    expect(JSON.stringify(events)).not.toContain("secret-customer")
  })

  it("records validation failure without filename parameters", async () => {
    connectTracker()
    const { loadUploadResults, MAX_SIZE } = await import("../upload-utils")
    const file = new File(["x"], "private-client-document.png", { type: "image/png" })
    Object.defineProperty(file, "size", { value: MAX_SIZE + 1 })
    const result = await loadUploadResults([file])
    expect(result.status).toBe("invalid")
    expect(events.map((event) => event.name)).toEqual(["upload_started", "upload_failed"])
    expect(events[1].data).toMatchObject({ error_code: "fileTooLarge", input_count: 1 })
    expect(JSON.stringify(events)).not.toContain(file.name)
  })
})
