import { describe, it, expect, vi, afterEach } from "vitest"
import {
  computeScale,
  resolveOutputMimeType,
  MAX_CANVAS_AREA,
  canvasFromImage,
  canvasToBlob,
  canvasObjectUrl,
  imageToBlob,
  thumbnailCanvas,
  createThumbnailBlob,
  createThumbnailDataUrl,
  THUMBNAIL_JPEG_QUALITY,
} from "../image-canvas"

describe("computeScale", () => {
  it("returns 1 when image is within limits", () => {
    expect(computeScale(1000, 1000)).toBe(1)
  })
  it("downscales when area exceeds MAX_CANVAS_AREA", () => {
    const big = Math.ceil(Math.sqrt(MAX_CANVAS_AREA)) + 2000
    const scale = computeScale(big, big)
    expect(scale).toBeLessThan(1)
    expect(big * scale * big * scale).toBeLessThanOrEqual(MAX_CANVAS_AREA + 1)
  })
  it("clamps a very wide image by max dimension", () => {
    const scale = computeScale(40000, 100)
    expect(40000 * scale).toBeLessThanOrEqual(16384 + 0.5)
  })
})

describe("resolveOutputMimeType", () => {
  it("keeps jpeg and png", () => {
    expect(resolveOutputMimeType("image/jpeg")).toBe("image/jpeg")
    expect(resolveOutputMimeType("image/png")).toBe("image/png")
  })
  it("converts webp and unknown to png", () => {
    expect(resolveOutputMimeType("image/webp")).toBe("image/png")
    expect(resolveOutputMimeType("image/gif")).toBe("image/png")
  })
})

interface MockCanvas {
  width: number
  height: number
  getContext: ReturnType<typeof vi.fn>
  toBlob: ReturnType<typeof vi.fn>
  toDataURL: ReturnType<typeof vi.fn>
  ctx: { drawImage: ReturnType<typeof vi.fn> }
}

function mockCanvasCreation(options: { contextAvailable?: boolean; blobResult?: Blob | null } = {}) {
  const { contextAvailable = true, blobResult } = options
  const created: MockCanvas[] = []
  const originalCreateElement = document.createElement.bind(document)
  vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
    if (tag === "canvas") {
      const ctx = { drawImage: vi.fn() }
      const canvas: MockCanvas = {
        width: 0,
        height: 0,
        ctx,
        getContext: vi.fn(() => (contextAvailable ? ctx : null)),
        toBlob: vi.fn((cb: BlobCallback, type?: string) => {
          if (blobResult === null) {
            cb(null)
          } else {
            cb(blobResult ?? new Blob(["mock"], { type: type ?? "image/png" }))
          }
        }),
        toDataURL: vi.fn((type?: string) => `data:${type ?? "image/png"};base64,mock`),
      }
      created.push(canvas)
      return canvas as unknown as HTMLCanvasElement
    }
    return originalCreateElement(tag)
  })
  return created
}

function makeImage(naturalWidth: number, naturalHeight: number): HTMLImageElement {
  return { naturalWidth, naturalHeight, width: 0, height: 0 } as HTMLImageElement
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe("canvasFromImage", () => {
  it("creates a canvas at natural size and draws the image", () => {
    const created = mockCanvasCreation()
    const image = makeImage(800, 600)
    const canvas = canvasFromImage(image)
    expect(created).toHaveLength(1)
    expect(canvas.width).toBe(800)
    expect(canvas.height).toBe(600)
    expect(created[0].ctx.drawImage).toHaveBeenCalledWith(image, 0, 0)
  })

  it("falls back to width/height when natural sizes are 0", () => {
    const created = mockCanvasCreation()
    const image = { naturalWidth: 0, naturalHeight: 0, width: 320, height: 240 } as HTMLImageElement
    const canvas = canvasFromImage(image)
    expect(canvas.width).toBe(320)
    expect(canvas.height).toBe(240)
    expect(created).toHaveLength(1)
  })

  it("throws when 2D context is unavailable", () => {
    mockCanvasCreation({ contextAvailable: false })
    expect(() => canvasFromImage(makeImage(10, 10))).toThrow("Canvas is not available")
  })
})

describe("canvasToBlob", () => {
  it("resolves with the encoded blob", async () => {
    const created = mockCanvasCreation()
    const canvas = canvasFromImage(makeImage(10, 10))
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.8)
    expect(blob.type).toBe("image/jpeg")
    expect(created[0].toBlob).toHaveBeenCalledWith(expect.any(Function), "image/jpeg", 0.8)
  })

  it("rejects when toBlob yields null", async () => {
    mockCanvasCreation({ blobResult: null })
    const canvas = canvasFromImage(makeImage(10, 10))
    await expect(canvasToBlob(canvas, "image/png")).rejects.toThrow("Failed to export canvas")
  })
})

describe("canvasObjectUrl", () => {
  it("encodes as PNG by default and returns an object URL", async () => {
    const created = mockCanvasCreation()
    const createUrlSpy = vi.fn(() => "blob:canvas-url")
    vi.stubGlobal("URL", { ...URL, createObjectURL: createUrlSpy, revokeObjectURL: vi.fn() })
    const canvas = canvasFromImage(makeImage(10, 10))
    const url = await canvasObjectUrl(canvas)
    expect(url).toBe("blob:canvas-url")
    expect(created[0].toBlob).toHaveBeenCalledWith(expect.any(Function), "image/png", undefined)
    vi.unstubAllGlobals()
  })
})

describe("imageToBlob", () => {
  it("draws the image and encodes it with the given type and quality", async () => {
    const created = mockCanvasCreation()
    const image = makeImage(100, 50)
    const blob = await imageToBlob(image, "image/jpeg", 0.92)
    expect(blob.type).toBe("image/jpeg")
    expect(created[0].ctx.drawImage).toHaveBeenCalledWith(image, 0, 0)
    expect(created[0].toBlob).toHaveBeenCalledWith(expect.any(Function), "image/jpeg", 0.92)
  })
})

describe("thumbnailCanvas / createThumbnailBlob / createThumbnailDataUrl", () => {
  it("scales the longest side down to maxSize", () => {
    const created = mockCanvasCreation()
    const image = makeImage(1000, 500)
    const canvas = thumbnailCanvas(image, 128)
    expect(canvas.width).toBeCloseTo(128)
    expect(canvas.height).toBeCloseTo(64)
    expect(created[0].ctx.drawImage).toHaveBeenCalledWith(image, 0, 0, canvas.width, canvas.height)
  })

  it("creates a JPEG thumbnail blob by default", async () => {
    const created = mockCanvasCreation()
    const blob = await createThumbnailBlob(makeImage(1000, 500), 128)
    expect(blob.type).toBe("image/jpeg")
    expect(created[0].toBlob).toHaveBeenCalledWith(
      expect.any(Function),
      "image/jpeg",
      THUMBNAIL_JPEG_QUALITY
    )
  })

  it("creates a JPEG thumbnail data URL by default", () => {
    const created = mockCanvasCreation()
    const dataUrl = createThumbnailDataUrl(makeImage(1000, 500), 128)
    expect(dataUrl).toBe("data:image/jpeg;base64,mock")
    expect(created[0].toDataURL).toHaveBeenCalledWith("image/jpeg", THUMBNAIL_JPEG_QUALITY)
  })
})
