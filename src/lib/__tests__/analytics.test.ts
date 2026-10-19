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

afterEach(async () => {
  await analytics.flushAnalyticsEvents()
  delete window.umami
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
  window.history.replaceState(null, "", "/")
})

describe("analytics delivery", () => {
  it("retains real event times and operation identity when a delayed tracker flushes serially", async () => {
    const now = vi.spyOn(Date, "now").mockReturnValue(1000)
    const finish = analytics.startOperation("export", { action: "all", format: "zip" })
    now.mockReturnValue(2500)
    finish("succeeded")
    now.mockReturnValue(9000)
    let release!: () => void
    window.umami = { track: vi.fn((callback) => {
      events.push(callback({ website: "test-site" }))
      return events.length === 1 ? new Promise<void>((resolve) => { release = resolve }) : Promise.resolve()
    }) }
    const flush = analytics.flushAnalyticsEvents()
    expect(events).toHaveLength(1)
    analytics.trackEvent("upload_picker_opened")
    expect(events).toHaveLength(1)
    release()
    await flush
    const data = events.map((event) => event.data as Payload)
    expect(data.map((event) => event.occurred_at_ms)).toEqual([1000, 2500, 9000])
    expect(data.map((event) => event.event_sequence)).toEqual([1, 2, 3])
    expect(data[1]).toMatchObject({ operation_id: data[0].operation_id, operation_started_at_ms: 1000, duration_ms: 1500, page_instance_id: data[0].page_instance_id })
    expect(data[0].operation_id).toEqual(expect.any(String))
    expect(data[2].operation_id).toBeUndefined()
    // Keep Umami's normal visit expiry behavior; event-time precision lives in data.
    expect(events[0]).not.toHaveProperty("timestamp")
  })

  it("continues draining when a tracker request never settles", async () => {
    vi.useFakeTimers()
    try {
      window.umami = { track: vi.fn((callback) => {
        events.push(callback({}))
        return events.length === 1 ? new Promise(() => {}) : Promise.resolve()
      }) }
      analytics.trackEvent("upload_picker_opened")
      analytics.trackEvent("tool_cta_clicked")
      expect(events).toHaveLength(1)
      await vi.advanceTimersByTimeAsync(5000)
      await analytics.flushAnalyticsEvents()
      expect(events).toHaveLength(2)
    } finally {
      vi.useRealTimers()
    }
  })
  it("keeps queued actions on their original route and excludes queries and hashes", async () => {
    analytics.trackEvent("upload_picker_opened")
    window.history.replaceState(null, "", "/compress")
    connectTracker()
    await analytics.flushAnalyticsEvents()
    await analytics.flushAnalyticsEvents()

    expect(events).toMatchObject([{
      website: "test-site",
      url: "/zh-CN/workspace",
      name: "upload_picker_opened",
      data: { schema_version: 2, page_path: "/zh-CN/workspace", locale: "zh-CN", tool: "split" },
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

  it("bounds the queue when the analytics script is blocked", async () => {
    for (let i = 0; i < 100; i++) analytics.trackEvent("upload_picker_opened")
    connectTracker()
    await analytics.flushAnalyticsEvents()
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
  it("sends a stable ZIP stage code, never the underlying exception", async () => {
    connectTracker()
    const { ExportError } = await import("../export-errors")
    const error = new ExportError("zip_load_failed", new Error("secret-url"))
    await expect(analytics.trackOperation("export", async () => { throw error })).rejects.toBe(error)
    await analytics.flushAnalyticsEvents()
    expect(events[1].data).toMatchObject({ error_code: "zip_load_failed" })
    expect(JSON.stringify(events)).not.toContain("secret-url")
  })
  it("emits one terminal event with elapsed time and the original route", async () => {
    connectTracker()
    const now = vi.spyOn(Date, "now").mockReturnValue(1000)
    const finish = analytics.startOperation("processing", { input_count: 1 })
    window.history.replaceState(null, "", "/tools")
    now.mockReturnValue(1250)
    finish("succeeded", { output_count: 9 })
    finish("failed")
    finish("canceled")
    await analytics.flushAnalyticsEvents()

    expect(events.map((event) => event.name)).toEqual(["processing_started", "processing_succeeded"])
    expect(events[1].data).toMatchObject({ page_path: "/zh-CN/workspace", input_count: 1, output_count: 9, duration_ms: 250 })
  })

  it("rethrows the original processing error without sending its contents", async () => {
    connectTracker()
    const error = new Error("secret-customer-photo.png failed at blob:private")
    await expect(analytics.trackOperation("processing", async () => { throw error })).rejects.toBe(error)
    await analytics.flushAnalyticsEvents()
    expect(events.map((event) => event.name)).toEqual(["processing_started", "processing_failed"])
    expect(events[1].data).toMatchObject({ error_code: "processing_failed" })
    expect(JSON.stringify(events)).not.toContain("secret-customer")
  })

  it("records validation failure without filename parameters", async () => {
    connectTracker()
    const { loadUploadResults } = await import("../upload-utils")
    const file = new File(["x"], "private-client-document.png", { type: "image/png" })
    const result = await loadUploadResults([file])
    await analytics.flushAnalyticsEvents()
    expect(result.status).toBe("invalid")
    expect(events.map((event) => event.name)).toEqual(["upload_started", "upload_failed"])
    expect(events[1].data).toMatchObject({ error_code: "imageMetadataUnreadable", input_count: 1 })
    expect(JSON.stringify(events)).not.toContain(file.name)
  })
})
