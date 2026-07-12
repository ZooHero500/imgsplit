import { describe, it, expect, vi, afterEach } from "vitest"
import {
  validateFiles,
  MAX_SIZE,
  loadImageFromSrc,
  readFileAsDataUrl,
  loadUploadResults,
} from "../upload-utils"

describe("validateFiles", () => {
  function makeFile(name: string, size: number, type: string): File {
    const buffer = new ArrayBuffer(size)
    return new File([buffer], name, { type })
  }

  it("should accept valid PNG file", () => {
    const file = makeFile("test.png", 1024, "image/png")
    const result = validateFiles([file])
    expect(result.valid).toBe(true)
    expect(result.files).toHaveLength(1)
  })

  it("should accept valid JPG file", () => {
    const file = makeFile("test.jpg", 1024, "image/jpeg")
    const result = validateFiles([file])
    expect(result.valid).toBe(true)
  })

  it("should accept valid WebP file", () => {
    const file = makeFile("test.webp", 1024, "image/webp")
    const result = validateFiles([file])
    expect(result.valid).toBe(true)
  })

  it("should reject unsupported file type", () => {
    const file = makeFile("test.gif", 1024, "image/gif")
    const result = validateFiles([file])
    expect(result.valid).toBe(false)
    expect(result.error).toEqual({ key: "unsupportedFormat" })
  })

  it("should reject file exceeding 20MB", () => {
    const file = makeFile("big.png", MAX_SIZE + 1, "image/png")
    const result = validateFiles([file])
    expect(result.valid).toBe(false)
    expect(result.error).toEqual({ key: "fileTooLarge", params: { name: "big.png" } })
  })

  it("should accept multiple valid files", () => {
    const files = [
      makeFile("a.png", 1024, "image/png"),
      makeFile("b.jpg", 2048, "image/jpeg"),
    ]
    const result = validateFiles(files)
    expect(result.valid).toBe(true)
    expect(result.files).toHaveLength(2)
  })

  it("should warn but still accept when total exceeds 50MB", () => {
    const files = [
      makeFile("a.png", 18 * 1024 * 1024, "image/png"),
      makeFile("b.png", 18 * 1024 * 1024, "image/png"),
      makeFile("c.png", 18 * 1024 * 1024, "image/png"),
    ]
    const result = validateFiles(files)
    expect(result.valid).toBe(true)
    expect(result.totalSizeWarning).toBe(true)
  })

  it("should warn when new files + existing size exceeds 50MB", () => {
    const file = makeFile("new.png", 10 * 1024 * 1024, "image/png")
    const existingSize = 45 * 1024 * 1024 // 45MB already loaded
    const result = validateFiles([file], existingSize)
    expect(result.valid).toBe(true)
    expect(result.totalSizeWarning).toBe(true)
  })

  it("should not warn when new files + existing size is under 50MB", () => {
    const file = makeFile("new.png", 1024, "image/png")
    const existingSize = 10 * 1024 * 1024
    const result = validateFiles([file], existingSize)
    expect(result.valid).toBe(true)
    expect(result.totalSizeWarning).toBe(false)
  })
})

/** Stub the global Image so assigning `src` fires onload (or onerror) asynchronously. */
function stubImage(behavior: "load" | "error") {
  // jsdom does not implement URL.createObjectURL — stub it for loadImage(file)
  vi.stubGlobal("URL", {
    ...URL,
    createObjectURL: vi.fn(() => "blob:mock-url"),
    revokeObjectURL: vi.fn(),
  })
  class FakeImage {
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    crossOrigin: string | null = null
    naturalWidth = 100
    naturalHeight = 50
    #src = ""
    set src(value: string) {
      this.#src = value
      queueMicrotask(() => {
        if (behavior === "load") this.onload?.()
        else this.onerror?.()
      })
    }
    get src() {
      return this.#src
    }
  }
  vi.stubGlobal("Image", FakeImage)
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("loadImageFromSrc", () => {
  it("resolves with the image on load and applies crossOrigin", async () => {
    stubImage("load")
    const img = await loadImageFromSrc("data:image/png;base64,x", {
      crossOrigin: "anonymous",
    })
    expect(img.src).toBe("data:image/png;base64,x")
    expect(img.crossOrigin).toBe("anonymous")
  })

  it("rejects with the default message on error", async () => {
    stubImage("error")
    await expect(loadImageFromSrc("bad-src")).rejects.toThrow("Failed to load image")
  })

  it("rejects with a custom error message", async () => {
    stubImage("error")
    await expect(
      loadImageFromSrc("bad-src", { errorMessage: "Failed to load mask image" })
    ).rejects.toThrow("Failed to load mask image")
  })
})

describe("readFileAsDataUrl", () => {
  it("reads a file as a base64 data URL", async () => {
    const file = new File(["hello"], "note.txt", { type: "text/plain" })
    const dataUrl = await readFileAsDataUrl(file)
    expect(dataUrl.startsWith("data:text/plain")).toBe(true)
    expect(dataUrl).toContain("base64")
  })
})

describe("loadUploadResults", () => {
  function makeFile(name: string, size: number, type: string): File {
    const buffer = new ArrayBuffer(size)
    return new File([buffer], name, { type })
  }

  it("returns invalid with the validation error for unsupported files", async () => {
    stubImage("load")
    const outcome = await loadUploadResults([makeFile("a.gif", 10, "image/gif")])
    expect(outcome).toEqual({ status: "invalid", error: { key: "unsupportedFormat" } })
  })

  it("loads every valid file into an UploadResult", async () => {
    stubImage("load")
    const files = [
      makeFile("a.png", 10, "image/png"),
      makeFile("b.jpg", 10, "image/jpeg"),
    ]
    const outcome = await loadUploadResults(files)
    expect(outcome.status).toBe("success")
    if (outcome.status === "success") {
      expect(outcome.results).toHaveLength(2)
      expect(outcome.results[0].file).toBe(files[0])
      expect(outcome.results[0].mimeType).toBe("image/png")
      expect(outcome.results[1].mimeType).toBe("image/jpeg")
      expect(outcome.totalSizeWarning).toBe(false)
      expect(outcome.totalSize).toBe(20)
    }
  })

  it("flags a total-size warning including existingSize", async () => {
    stubImage("load")
    const outcome = await loadUploadResults(
      [makeFile("a.png", 10 * 1024 * 1024, "image/png")],
      { existingSize: 45 * 1024 * 1024 }
    )
    expect(outcome.status).toBe("success")
    if (outcome.status === "success") {
      expect(outcome.totalSizeWarning).toBe(true)
    }
  })

  it("returns loadFailed when an image cannot be decoded", async () => {
    stubImage("error")
    const outcome = await loadUploadResults([makeFile("a.png", 10, "image/png")])
    expect(outcome).toEqual({ status: "loadFailed" })
  })
})
