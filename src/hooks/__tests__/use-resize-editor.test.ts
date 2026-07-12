import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useResizeEditor } from "../use-resize-editor"
import type { ResizeImageTransform } from "@/types"

// Controls the fake window.Image used by loadImage
const mockImageBehavior = {
  naturalWidth: 1000,
  naturalHeight: 500,
  shouldFail: false,
}

class MockImage {
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  naturalWidth: number
  naturalHeight: number
  private srcValue = ""

  constructor() {
    this.naturalWidth = mockImageBehavior.naturalWidth
    this.naturalHeight = mockImageBehavior.naturalHeight
  }

  set src(value: string) {
    this.srcValue = value
    queueMicrotask(() => {
      if (mockImageBehavior.shouldFail) {
        this.onerror?.()
      } else {
        this.onload?.()
      }
    })
  }

  get src(): string {
    return this.srcValue
  }
}

const OriginalImage = window.Image

const DEFAULT_TRANSFORM: ResizeImageTransform = {
  x: 0, y: 0, scale: 1, crop: null, rotation: 0, flipX: false, flipY: false,
}

function createFile(name = "photo.png", type = "image/png"): File {
  return new File(["x"], name, { type })
}

// Default: 1000x500 image on a 500x500 canvas.
// fill -> scale 1, x -250, y 0 / fit -> scale 0.5, x 0, y 125
async function renderWithImage() {
  const view = renderHook(() => useResizeEditor())
  await act(async () => {
    await view.result.current.loadImage(createFile())
  })
  return view
}

beforeEach(() => {
  mockImageBehavior.naturalWidth = 1000
  mockImageBehavior.naturalHeight = 500
  mockImageBehavior.shouldFail = false

  window.Image = MockImage as unknown as typeof Image
  vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock-url")
  vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {})
})

afterEach(() => {
  window.Image = OriginalImage
  vi.restoreAllMocks()
})

describe("useResizeEditor - initial state", () => {
  it("should initialize with defaults", () => {
    const { result } = renderHook(() => useResizeEditor(800, 600))

    expect(result.current.canvasSize).toEqual({ width: 800, height: 600 })
    expect(result.current.image).toBeNull()
    expect(result.current.transform).toEqual(DEFAULT_TRANSFORM)
    expect(result.current.mode).toBe("idle")
    expect(result.current.cropRect).toBeNull()
    expect(result.current.fileName).toBe("")
    expect(result.current.mimeType).toBe("image/png")
    expect(result.current.fitMode).toBe("fill")
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
  })
})

describe("useResizeEditor - loadImage", () => {
  it("should load an image and fill the artboard", async () => {
    const { result } = await renderWithImage()

    expect(result.current.image).not.toBeNull()
    expect(result.current.fileName).toBe("photo.png")
    expect(result.current.mimeType).toBe("image/png")
    // fill: scale = max(500/1000, 500/500) = 1, centered horizontally
    expect(result.current.transform).toEqual({
      x: -250, y: 0, scale: 1, crop: null, rotation: 0, flipX: false, flipY: false,
    })
  })

  it("should default mimeType to image/png when the file has no type", async () => {
    const { result } = renderHook(() => useResizeEditor())

    await act(async () => {
      await result.current.loadImage(createFile("raw-file", ""))
    })

    expect(result.current.mimeType).toBe("image/png")
    expect(result.current.fileName).toBe("raw-file")
  })

  it("should reject when the image fails to load", async () => {
    mockImageBehavior.shouldFail = true
    const { result } = renderHook(() => useResizeEditor())

    await act(async () => {
      await expect(result.current.loadImage(createFile())).rejects.toThrow(
        "Failed to load image"
      )
    })

    expect(result.current.image).toBeNull()
  })

  it("should revoke the previous object URL when loading a second image", async () => {
    const { result } = await renderWithImage()

    await act(async () => {
      await result.current.loadImage(createFile("second.jpg", "image/jpeg"))
    })

    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url")
    expect(result.current.fileName).toBe("second.jpg")
    expect(result.current.mimeType).toBe("image/jpeg")
  })
})

describe("useResizeEditor - fit mode & canvas size", () => {
  it("should refit with contain math when switching to fit", async () => {
    const { result } = await renderWithImage()

    act(() => result.current.setFitMode("fit"))

    expect(result.current.fitMode).toBe("fit")
    // fit: scale = min(0.5, 1) = 0.5 -> 500x250 centered
    expect(result.current.transform).toMatchObject({ x: 0, y: 125, scale: 0.5 })
  })

  it("should only switch fitMode when no image is loaded", () => {
    const { result } = renderHook(() => useResizeEditor())

    act(() => result.current.setFitMode("fit"))

    expect(result.current.fitMode).toBe("fit")
    expect(result.current.transform).toEqual(DEFAULT_TRANSFORM)
  })

  it("should refit the image when the canvas size changes", async () => {
    const { result } = await renderWithImage()

    act(() => result.current.setCanvasSize({ width: 1000, height: 1000 }))

    expect(result.current.canvasSize).toEqual({ width: 1000, height: 1000 })
    // fill: scale = max(1, 2) = 2 -> 2000x1000 centered
    expect(result.current.transform).toMatchObject({ x: -500, y: 0, scale: 2 })
  })

  it("should keep the default transform when resizing an empty canvas", () => {
    const { result } = renderHook(() => useResizeEditor())

    act(() => result.current.setCanvasSize({ width: 300, height: 200 }))

    expect(result.current.canvasSize).toEqual({ width: 300, height: 200 })
    expect(result.current.transform).toEqual(DEFAULT_TRANSFORM)
  })
})

describe("useResizeEditor - rotation & flip", () => {
  it("should rotate right and refit with swapped dimensions", async () => {
    const { result } = await renderWithImage()

    act(() => result.current.rotateRight())

    // effective 500x1000, fill: scale = max(1, 0.5) = 1 -> centered vertically
    expect(result.current.transform).toMatchObject({
      x: 0, y: -250, scale: 1, rotation: 90,
    })
  })

  it("should wrap rotation across 360 degrees in both directions", async () => {
    const { result } = await renderWithImage()

    act(() => result.current.rotateLeft())
    expect(result.current.transform.rotation).toBe(270)

    act(() => result.current.rotateRight())
    expect(result.current.transform.rotation).toBe(0)

    act(() => result.current.rotateRight())
    act(() => result.current.rotateRight())
    act(() => result.current.rotateRight())
    act(() => result.current.rotateRight())
    expect(result.current.transform.rotation).toBe(0)
  })

  it("should ignore rotation without an image", () => {
    const { result } = renderHook(() => useResizeEditor())

    act(() => result.current.rotateRight())

    expect(result.current.transform).toEqual(DEFAULT_TRANSFORM)
    expect(result.current.canUndo).toBe(false)
  })

  it("should toggle flips without touching position or scale", async () => {
    const { result } = await renderWithImage()
    const before = result.current.transform

    act(() => result.current.flipHorizontal())
    expect(result.current.transform).toEqual({ ...before, flipX: true })

    act(() => result.current.flipVertical())
    expect(result.current.transform).toEqual({ ...before, flipX: true, flipY: true })

    act(() => result.current.flipHorizontal())
    expect(result.current.transform.flipX).toBe(false)
  })
})

describe("useResizeEditor - crop", () => {
  it("should map an artboard crop rect to source pixels and refit", async () => {
    const { result } = await renderWithImage()
    // transform: x -250, y 0, scale 1; display size 1000x500

    act(() => {
      result.current.setMode("crop")
      result.current.setCropRect({ x: 0, y: 0, width: 500, height: 500 })
    })
    act(() => result.current.applyCrop())

    // relX = (0 - (-250)) / 1000 = 0.25 -> source x = 250
    expect(result.current.transform.crop).toEqual({
      x: 250, y: 0, width: 500, height: 500,
    })
    // 500x500 crop fills the 500x500 canvas exactly
    expect(result.current.transform).toMatchObject({ x: 0, y: 0, scale: 1 })
    expect(result.current.cropRect).toBeNull()
    expect(result.current.mode).toBe("idle")
  })

  it("should compound a second crop relative to the first", async () => {
    const { result } = await renderWithImage()

    act(() => result.current.setCropRect({ x: 0, y: 0, width: 500, height: 500 }))
    act(() => result.current.applyCrop())
    // crop = { x: 250, y: 0, 500x500 }, transform x 0, y 0, scale 1

    act(() => result.current.setCropRect({ x: 100, y: 100, width: 200, height: 200 }))
    act(() => result.current.applyCrop())

    // rel = 100/500 = 0.2 -> source x = 250 + 0.2*500 = 350, y = 100
    expect(result.current.transform.crop).toEqual({
      x: 350, y: 100, width: 200, height: 200,
    })
    // 200x200 crop filling 500x500 -> scale 2.5
    expect(result.current.transform).toMatchObject({ x: 0, y: 0, scale: 2.5 })
  })

  it("should do nothing when applying without a crop rect", async () => {
    const { result } = await renderWithImage()
    const before = result.current.transform

    act(() => result.current.applyCrop())

    expect(result.current.transform).toEqual(before)
  })

  it("should cancel crop back to selected mode", async () => {
    const { result } = await renderWithImage()

    act(() => {
      result.current.setMode("crop")
      result.current.setCropRect({ x: 0, y: 0, width: 100, height: 100 })
    })
    act(() => result.current.cancelCrop())

    expect(result.current.cropRect).toBeNull()
    expect(result.current.mode).toBe("selected")
    expect(result.current.transform.crop).toBeNull()
  })
})

describe("useResizeEditor - reset & clear", () => {
  it("should reset crop and rotation back to a fresh fill", async () => {
    const { result } = await renderWithImage()

    act(() => result.current.setCropRect({ x: 0, y: 0, width: 500, height: 500 }))
    act(() => result.current.applyCrop())
    act(() => result.current.rotateRight())

    act(() => result.current.resetImage())

    expect(result.current.transform).toEqual({
      x: -250, y: 0, scale: 1, crop: null, rotation: 0, flipX: false, flipY: false,
    })
    expect(result.current.mode).toBe("idle")
  })

  it("should clear the image and revoke its object URL", async () => {
    const { result } = await renderWithImage()

    act(() => result.current.clearImage())

    expect(result.current.image).toBeNull()
    expect(result.current.transform).toEqual(DEFAULT_TRANSFORM)
    expect(result.current.fileName).toBe("")
    expect(result.current.mimeType).toBe("image/png")
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url")
  })
})

describe("useResizeEditor - undo/redo integration", () => {
  it("should undo and redo transform changes", async () => {
    const { result } = await renderWithImage()
    const afterLoad = result.current.transform
    expect(result.current.canUndo).toBe(true)

    act(() => result.current.rotateRight())
    expect(result.current.transform.rotation).toBe(90)

    act(() => result.current.undo())
    expect(result.current.transform).toEqual(afterLoad)
    expect(result.current.canRedo).toBe(true)

    act(() => result.current.undo())
    expect(result.current.transform).toEqual(DEFAULT_TRANSFORM)

    act(() => result.current.redo())
    expect(result.current.transform).toEqual(afterLoad)
  })
})

describe("useResizeEditor - alignImage", () => {
  async function renderWithSmallImage() {
    const view = await renderWithImage()
    // Shrink to 200x100 at (50, 60) so every edge has room to move
    act(() => {
      view.result.current.setTransform({
        x: 50, y: 60, scale: 0.2, crop: null, rotation: 0, flipX: false, flipY: false,
      })
    })
    return view
  }

  it("should align to each edge and center on a 500x500 canvas", async () => {
    const { result } = await renderWithSmallImage()

    act(() => result.current.alignImage("left"))
    expect(result.current.transform).toMatchObject({ x: 0, y: 60 })

    act(() => result.current.alignImage("right"))
    expect(result.current.transform).toMatchObject({ x: 300, y: 60 })

    act(() => result.current.alignImage("top"))
    expect(result.current.transform).toMatchObject({ x: 300, y: 0 })

    act(() => result.current.alignImage("bottom"))
    expect(result.current.transform).toMatchObject({ x: 300, y: 400 })

    act(() => result.current.alignImage("center"))
    expect(result.current.transform).toMatchObject({ x: 150, y: 200, scale: 0.2 })
  })

  it("should rescale to fill on align fill", async () => {
    const { result } = await renderWithSmallImage()

    act(() => result.current.alignImage("fill"))

    expect(result.current.transform).toMatchObject({ x: -250, y: 0, scale: 1 })
  })

  it("should use rotation-swapped dimensions when aligning", async () => {
    const { result } = await renderWithImage()

    act(() => result.current.rotateRight())
    // effective 500x1000 at scale 1
    act(() => result.current.alignImage("bottom"))

    expect(result.current.transform.y).toBe(500 - 1000)
  })

  it("should ignore alignment without an image", () => {
    const { result } = renderHook(() => useResizeEditor())

    act(() => result.current.alignImage("center"))

    expect(result.current.transform).toEqual(DEFAULT_TRANSFORM)
  })
})
