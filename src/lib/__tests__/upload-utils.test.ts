import { describe, it, expect, vi, afterEach } from "vitest"
import { validateFiles, loadImage, loadImageFromSrc, readFileAsDataUrl, loadUploadResults } from "../upload-utils"
import { MEBIBYTE } from "../upload-memory"
import { pngHeader, jpegHeader, webpHeader } from "./image-header-fixtures"

function stubImage(behavior: "load" | "error") {
  vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock-url")
  vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {})
  class FakeImage {
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    crossOrigin: string | null = null
    naturalWidth = 100
    naturalHeight = 50
    #src = ""
    set src(value: string) {
      this.#src = value
      if (value) queueMicrotask(() => behavior === "load" ? this.onload?.() : this.onerror?.())
    }
    get src() { return this.#src }
  }
  vi.stubGlobal("Image", FakeImage)
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("validateFiles", () => {
  it.each([pngHeader(), jpegHeader(100, 50), webpHeader("VP8X", 100, 50)])("accepts supported image headers", async (file) => {
    expect((await validateFiles([file])).valid).toBe(true)
  })
  it("accepts a 40 MiB file when its pixels fit the memory budget", async () => {
    const validation = await validateFiles([pngHeader(3000, 2000, 40 * MEBIBYTE)])
    expect(validation.valid).toBe(true)
  })
  it("rejects a tiny compressed file with excessive decoded pixels", async () => {
    expect(await validateFiles([pngHeader(10000, 10000)])).toMatchObject({ valid: false, error: { key: "imageMemoryRisk" } })
  })
  it("applies a lower budget on low-memory devices", async () => {
    vi.stubGlobal("navigator", { deviceMemory: 2 })
    expect(await validateFiles([pngHeader(3000, 2000, 40 * MEBIBYTE)])).toMatchObject({ valid: false, error: { key: "imageMemoryRisk" } })
  })
  it("accounts for animated frames as well as canvas pixels", async () => {
    expect(await validateFiles([pngHeader(2000, 2000, undefined, 100)])).toMatchObject({ valid: false, error: { key: "imageMemoryRisk" } })
  })
  it("checks batch and existing images together", async () => {
    expect(await validateFiles([pngHeader(6000, 4000), pngHeader(6000, 4000)])).toMatchObject({ valid: false, error: { key: "imageMemoryRisk" } })
    expect(await validateFiles([pngHeader(4000, 4000)], { existingMemoryBytes: 400 * MEBIBYTE })).toMatchObject({ valid: false, error: { key: "imageMemoryRisk" } })
  })
  it("checks extreme edge lengths even when total pixels are small", async () => {
    expect(await validateFiles([pngHeader(1, 65536)])).toMatchObject({ valid: false, error: { key: "imageDimensionsTooLarge" } })
  })
  it("applies canvas limits only to tools needing a full-image canvas", async () => {
    const file = pngHeader(2000, 10000)
    expect((await validateFiles([file])).valid).toBe(true)
    expect(await validateFiles([file], { requiresFullCanvas: true })).toMatchObject({ valid: false, error: { key: "imageCanvasRisk" } })
  })
  it("does not bypass preflight when metadata is unreadable or the type is unsupported", async () => {
    expect(await validateFiles([new File(["x"], "a.gif", { type: "image/gif" })])).toMatchObject({ valid: false, error: { key: "unsupportedFormat" } })
    expect(await validateFiles([new File(["x"], "a.png", { type: "image/png" })])).toMatchObject({ valid: false, error: { key: "imageMetadataUnreadable" } })
  })
})

describe("loadUploadResults", () => {
  it("blocks the whole risky selection before creating image URLs", async () => {
    stubImage("load")
    const outcome = await loadUploadResults([pngHeader(), pngHeader(10000, 10000)])
    expect(outcome).toMatchObject({ status: "invalid", error: { key: "imageMemoryRisk" } })
    expect(URL.createObjectURL).not.toHaveBeenCalled()
  })
  it("loads a file larger than the old 20 MiB cutoff", async () => {
    stubImage("load")
    const file = pngHeader(100, 50, 40 * MEBIBYTE)
    const outcome = await loadUploadResults([file])
    expect(outcome.status).toBe("success")
    if (outcome.status === "success") {
      expect(outcome.results[0].file).toBe(file)
      expect(outcome.memoryWarning).toBe(false)
    }
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url")
  })
  it("warns near the memory budget but still loads the image", async () => {
    stubImage("load")
    const outcome = await loadUploadResults([pngHeader()], { existingMemoryBytes: 400 * MEBIBYTE })
    expect(outcome).toMatchObject({ status: "success", memoryWarning: true })
  })
  it("releases the in-flight reservation after decoding fails", async () => {
    stubImage("error")
    expect(await loadUploadResults([pngHeader(6000, 4000)])).toEqual({ status: "loadFailed" })
    stubImage("load")
    expect((await loadUploadResults([pngHeader(6000, 4000)])).status).toBe("success")
  })
  it("reserves memory across overlapping uploads and standalone consumers", async () => {
    stubImage("load")
    let pendingImage: HTMLImageElement | undefined
    vi.stubGlobal("Image", class {
      naturalWidth = 6000
      naturalHeight = 4000
      onload: (() => void) | null = null
      set src(value: string) { if (value) pendingImage = this as unknown as HTMLImageElement }
    })
    const first = loadUploadResults([pngHeader(6000, 4000)])
    await vi.waitFor(() => expect(pendingImage).toBeDefined())
    const second = await loadUploadResults([pngHeader(6000, 4000)])
    expect(second).toMatchObject({ status: "invalid", error: { key: "imageMemoryRisk" } })
    await expect(loadImage(pngHeader(6000, 4000))).rejects.toThrow("imageMemoryRisk")
    pendingImage!.onload?.(new Event("load"))
    expect((await first).status).toBe("success")
    stubImage("load")
    expect((await loadUploadResults([pngHeader(6000, 4000)])).status).toBe("success")
  })
  it("rejects decoder dimensions larger than declared in the header", async () => {
    stubImage("load")
    expect(await loadUploadResults([pngHeader(10, 10)])).toEqual({ status: "loadFailed" })
    await expect(loadImage(pngHeader(10, 10))).rejects.toThrow("Decoded image dimensions differ")
  })
  it("returns no upload results for an empty selection", async () => {
    expect(await loadUploadResults([])).toMatchObject({ status: "success", results: [] })
  })
})

describe("existing image readers", () => {
  it("loads an image and preserves its cross-origin option", async () => {
    stubImage("load")
    const image = await loadImageFromSrc("blob:test", { crossOrigin: "anonymous" })
    expect(image.src).toBe("blob:test")
    expect(image.crossOrigin).toBe("anonymous")
  })
  it("rejects decoding with the configured error", async () => {
    stubImage("error")
    await expect(loadImageFromSrc("bad", { errorMessage: "Failed to load mask" })).rejects.toThrow("Failed to load mask")
  })
  it("reads a file as a base64 data URL", async () => {
    const dataUrl = await readFileAsDataUrl(new File(["hello"], "note.txt", { type: "text/plain" }))
    expect(dataUrl).toMatch(/^data:text\/plain;base64,/)
  })
})
