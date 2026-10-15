import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { downloadBlob, downloadUrl, isIOS, saveBlobWithIOSFallback } from "../download"
import { trackEvent } from "../analytics"

vi.mock("../analytics", () => ({ trackEvent: vi.fn() }))

beforeEach(() => vi.clearAllMocks())

function setUserAgent(ua: string) {
  Object.defineProperty(window.navigator, "userAgent", {
    value: ua,
    configurable: true,
  })
}

const DESKTOP_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
const IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"

describe("isIOS", () => {
  it("returns false for desktop user agents", () => {
    setUserAgent(DESKTOP_UA)
    expect(isIOS()).toBe(false)
  })

  it("returns true for iPhone/iPad/iPod user agents", () => {
    setUserAgent(IOS_UA)
    expect(isIOS()).toBe(true)
    setUserAgent("Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)")
    expect(isIOS()).toBe(true)
  })
})

describe("downloadUrl", () => {
  it("clicks a temporary anchor with href and download set", () => {
    const clicked: HTMLAnchorElement[] = []
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(function (this: HTMLAnchorElement) {
        clicked.push(this)
      })

    downloadUrl("blob:fake-url", "result.png")

    expect(clicked).toHaveLength(1)
    expect(clicked[0].getAttribute("href")).toBe("blob:fake-url")
    expect(clicked[0].getAttribute("download")).toBe("result.png")
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith("download_triggered")
    clickSpy.mockRestore()
  })
})

describe("downloadBlob", () => {
  let createSpy: ReturnType<typeof vi.fn>
  let revokeSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    createSpy = vi.fn(() => "blob:mock-url")
    revokeSpy = vi.fn()
    vi.stubGlobal("URL", {
      ...URL,
      createObjectURL: createSpy,
      revokeObjectURL: revokeSpy,
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("creates an object URL, triggers the download, and revokes the URL", () => {
    const clicked: string[] = []
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement
    ) {
      clicked.push(`${this.getAttribute("href")}|${this.getAttribute("download")}`)
    })

    const blob = new Blob(["data"], { type: "image/png" })
    downloadBlob(blob, "photo.png")

    expect(createSpy).toHaveBeenCalledWith(blob)
    expect(clicked).toEqual(["blob:mock-url|photo.png"])
    expect(revokeSpy).toHaveBeenCalledWith("blob:mock-url")
  })

  it("cleans up and reports failed clicks without exposing the filename or URL", () => {
    const failure = new Error("private-file.png")
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => { throw failure })

    expect(() => downloadBlob(new Blob(["data"]), "private-file.png")).toThrow(failure)
    expect(revokeSpy).toHaveBeenCalledWith("blob:mock-url")
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith("download_failed", { error_code: "download_failed" })
  })
})

describe("saveBlobWithIOSFallback", () => {
  let createSpy: ReturnType<typeof vi.fn>
  let revokeSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.useFakeTimers()
    createSpy = vi.fn(() => "blob:save-url")
    revokeSpy = vi.fn()
    vi.stubGlobal("URL", {
      ...URL,
      createObjectURL: createSpy,
      revokeObjectURL: revokeSpy,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("opens the blob in a new tab on iOS without revoking the URL", () => {
    setUserAgent(IOS_UA)
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => window)
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click")

    saveBlobWithIOSFallback(new Blob(["x"]), "grid-1.png")

    expect(openSpy).toHaveBeenCalledWith("blob:save-url", "_blank")
    expect(clickSpy).not.toHaveBeenCalled()
    vi.runAllTimers()
    expect(revokeSpy).not.toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith("save_preview_opened")
  })

  it("reports a blocked iOS preview without claiming a download", () => {
    setUserAgent(IOS_UA)
    vi.spyOn(window, "open").mockReturnValue(null)

    saveBlobWithIOSFallback(new Blob(["x"]), "private-photo.png")

    expect(revokeSpy).toHaveBeenCalledWith("blob:save-url")
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith("download_failed", { error_code: "popup_blocked" })
  })

  it("downloads via anchor and revokes the URL after a delay elsewhere", () => {
    setUserAgent(DESKTOP_UA)
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null)
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => undefined)

    saveBlobWithIOSFallback(new Blob(["x"]), "grid-1.png")

    expect(openSpy).not.toHaveBeenCalled()
    expect(clickSpy).toHaveBeenCalledTimes(1)
    expect(revokeSpy).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1000)
    expect(revokeSpy).toHaveBeenCalledWith("blob:save-url")
  })
})
