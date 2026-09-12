# Image Resize Canvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Canva-like image resize tool at `/resize` where users upload an image onto a configurable-size artboard, drag/resize/crop it, and export at the target pixel dimensions.

**Architecture:** Konva canvas renders an artboard (white rect) at user-defined pixel dimensions. The image lives on a layer above it, manipulated via Transformer (resize) and a custom crop overlay (double-click crop mode). Export renders only the artboard region to an offscreen canvas at exact target dimensions.

**Tech Stack:** Next.js 16 App Router, react-konva (Konva), Tailwind CSS 4, shadcn/ui, next-intl, vitest

---

## File Structure

```
src/
├── app/[locale]/resize/
│   └── page.tsx                          # Server page: metadata + dynamic editor import
├── components/resize/
│   ├── DynamicResizeEditor.tsx            # next/dynamic wrapper (ssr: false)
│   ├── ResizeEditor.tsx                   # Main orchestrator: toolbar + canvas + controls
│   ├── ResizeCanvas.tsx                   # Konva Stage with artboard, image, transformer, crop
│   ├── CanvasSizeControl.tsx              # Width/height inputs + dimension presets
│   └── CropOverlay.tsx                    # Crop mode: draggable crop rect + dim overlay
├── hooks/
│   └── use-resize-editor.ts              # Editor state: canvas size, image transform, mode
├── lib/
│   ├── resize-utils.ts                   # Pure functions: fill calc, crop constraint, validation
│   ├── resize-export.ts                  # Offscreen canvas export at target dimensions
│   └── konva.ts                          # Add Transformer to re-exports
├── types/
│   └── index.ts                          # Add ResizeImageState, CropRect types
├── lib/__tests__/
│   ├── resize-utils.test.ts              # Unit tests for pure utility functions
│   └── resize-export.test.ts             # Unit tests for export logic
└── messages/{en,zh-CN,ja,ko,es}.json     # Add "resize" namespace
```

---

### Task 1: Types & Pure Utility Functions (TDD)

**Files:**
- Modify: `src/types/index.ts` (append new types)
- Create: `src/lib/resize-utils.ts`
- Create: `src/lib/__tests__/resize-utils.test.ts`

- [ ] **Step 1: Add types to `src/types/index.ts`**

Append at end of file:

```typescript
/** Resize editor — image transform state on artboard */
export interface ResizeImageTransform {
  /** Image position on artboard (artboard coordinates) */
  x: number
  y: number
  /** Uniform scale factor */
  scale: number
  /** Source crop region (image pixel coordinates). null = full image */
  crop: CropRect | null
}

/** Crop rectangle in image source pixel coordinates */
export interface CropRect {
  x: number
  y: number
  width: number
  height: number
}

/** Resize editor interaction mode */
export type ResizeEditorMode = "idle" | "selected" | "crop"
```

- [ ] **Step 2: Write failing tests for `resize-utils`**

Create `src/lib/__tests__/resize-utils.test.ts`:

```typescript
import { describe, it, expect } from "vitest"
import {
  calculateFillTransform,
  constrainCropRect,
  validateCanvasSize,
} from "../resize-utils"

describe("calculateFillTransform", () => {
  it("should scale landscape image to cover square artboard", () => {
    // 800x400 image → 500x500 artboard
    // scaleToFillW = 500/800 = 0.625, scaleToFillH = 500/400 = 1.25
    // cover = max(0.625, 1.25) = 1.25
    // scaledW = 800*1.25 = 1000, scaledH = 400*1.25 = 500
    // x = (500 - 1000) / 2 = -250, y = (500 - 500) / 2 = 0
    const result = calculateFillTransform(800, 400, 500, 500)
    expect(result.scale).toBeCloseTo(1.25)
    expect(result.x).toBeCloseTo(-250)
    expect(result.y).toBeCloseTo(0)
  })

  it("should scale portrait image to cover square artboard", () => {
    // 400x800 image → 500x500 artboard
    // scaleToFillW = 500/400 = 1.25, scaleToFillH = 500/800 = 0.625
    // cover = max(1.25, 0.625) = 1.25
    // scaledW = 400*1.25 = 500, scaledH = 800*1.25 = 1000
    // x = (500 - 500) / 2 = 0, y = (500 - 1000) / 2 = -250
    const result = calculateFillTransform(400, 800, 500, 500)
    expect(result.scale).toBeCloseTo(1.25)
    expect(result.x).toBeCloseTo(0)
    expect(result.y).toBeCloseTo(-250)
  })

  it("should handle image same size as artboard", () => {
    const result = calculateFillTransform(500, 500, 500, 500)
    expect(result.scale).toBeCloseTo(1)
    expect(result.x).toBeCloseTo(0)
    expect(result.y).toBeCloseTo(0)
  })

  it("should handle wide artboard with square image", () => {
    // 500x500 image → 800x400 artboard
    // scaleToFillW = 800/500 = 1.6, scaleToFillH = 400/500 = 0.8
    // cover = 1.6
    // scaledW = 500*1.6 = 800, scaledH = 500*1.6 = 800
    // x = (800 - 800) / 2 = 0, y = (400 - 800) / 2 = -200
    const result = calculateFillTransform(500, 500, 800, 400)
    expect(result.scale).toBeCloseTo(1.6)
    expect(result.x).toBeCloseTo(0)
    expect(result.y).toBeCloseTo(-200)
  })
})

describe("constrainCropRect", () => {
  it("should not modify a rect already within bounds", () => {
    const crop = { x: 10, y: 10, width: 80, height: 80 }
    const bounds = { x: 0, y: 0, width: 100, height: 100 }
    const result = constrainCropRect(crop, bounds)
    expect(result).toEqual({ x: 10, y: 10, width: 80, height: 80 })
  })

  it("should clamp rect that exceeds right edge", () => {
    const crop = { x: 60, y: 10, width: 80, height: 40 }
    const bounds = { x: 0, y: 0, width: 100, height: 100 }
    const result = constrainCropRect(crop, bounds)
    expect(result.x + result.width).toBeLessThanOrEqual(bounds.x + bounds.width)
    expect(result.width).toBe(40) // 100 - 60
  })

  it("should clamp rect that exceeds bottom edge", () => {
    const crop = { x: 10, y: 70, width: 40, height: 80 }
    const bounds = { x: 0, y: 0, width: 100, height: 100 }
    const result = constrainCropRect(crop, bounds)
    expect(result.y + result.height).toBeLessThanOrEqual(bounds.y + bounds.height)
    expect(result.height).toBe(30) // 100 - 70
  })

  it("should clamp rect that goes past left/top", () => {
    const crop = { x: -20, y: -10, width: 80, height: 60 }
    const bounds = { x: 0, y: 0, width: 100, height: 100 }
    const result = constrainCropRect(crop, bounds)
    expect(result.x).toBe(0)
    expect(result.y).toBe(0)
  })

  it("should enforce minimum size of 20x20", () => {
    const crop = { x: 90, y: 90, width: 5, height: 5 }
    const bounds = { x: 0, y: 0, width: 100, height: 100 }
    const result = constrainCropRect(crop, bounds)
    expect(result.width).toBeGreaterThanOrEqual(20)
    expect(result.height).toBeGreaterThanOrEqual(20)
  })
})

describe("validateCanvasSize", () => {
  it("should accept valid dimensions", () => {
    expect(validateCanvasSize(500, 500)).toEqual({ valid: true })
    expect(validateCanvasSize(1920, 1080)).toEqual({ valid: true })
  })

  it("should reject zero or negative dimensions", () => {
    expect(validateCanvasSize(0, 500).valid).toBe(false)
    expect(validateCanvasSize(500, -10).valid).toBe(false)
  })

  it("should reject dimensions exceeding max (4096)", () => {
    expect(validateCanvasSize(5000, 500).valid).toBe(false)
    expect(validateCanvasSize(500, 5000).valid).toBe(false)
  })

  it("should reject non-integer dimensions", () => {
    expect(validateCanvasSize(500.5, 500).valid).toBe(false)
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `bun run vitest run src/lib/__tests__/resize-utils.test.ts`
Expected: FAIL — module `../resize-utils` not found

- [ ] **Step 4: Implement `resize-utils.ts`**

Create `src/lib/resize-utils.ts`:

```typescript
import type { CropRect } from "@/types"

const MIN_CANVAS_SIZE = 1
const MAX_CANVAS_SIZE = 4096
const MIN_CROP_SIZE = 20

/**
 * Calculate transform to make image cover the artboard (like CSS object-fit: cover).
 * Returns position and uniform scale relative to artboard origin.
 */
export function calculateFillTransform(
  imageWidth: number,
  imageHeight: number,
  artboardWidth: number,
  artboardHeight: number
): { x: number; y: number; scale: number } {
  const scaleToFillW = artboardWidth / imageWidth
  const scaleToFillH = artboardHeight / imageHeight
  const scale = Math.max(scaleToFillW, scaleToFillH)

  const scaledW = imageWidth * scale
  const scaledH = imageHeight * scale

  return {
    x: (artboardWidth - scaledW) / 2,
    y: (artboardHeight - scaledH) / 2,
    scale,
  }
}

/**
 * Constrain a crop rect to stay within image bounds.
 * Enforces minimum crop size of MIN_CROP_SIZE.
 */
export function constrainCropRect(
  crop: CropRect,
  bounds: CropRect
): CropRect {
  let { x, y, width, height } = crop
  const { x: bx, y: by, width: bw, height: bh } = bounds

  // Clamp position to bounds origin
  x = Math.max(bx, x)
  y = Math.max(by, y)

  // Clamp size to not exceed bounds
  width = Math.min(width, bx + bw - x)
  height = Math.min(height, by + bh - y)

  // Enforce minimum size
  width = Math.max(MIN_CROP_SIZE, width)
  height = Math.max(MIN_CROP_SIZE, height)

  // Re-clamp position if min size pushed it out
  if (x + width > bx + bw) {
    x = bx + bw - width
  }
  if (y + height > by + bh) {
    y = by + bh - height
  }

  return { x, y, width, height }
}

/**
 * Validate canvas pixel dimensions.
 */
export function validateCanvasSize(
  width: number,
  height: number
): { valid: boolean; errorKey?: string } {
  if (!Number.isInteger(width) || !Number.isInteger(height)) {
    return { valid: false, errorKey: "notInteger" }
  }
  if (width < MIN_CANVAS_SIZE || height < MIN_CANVAS_SIZE) {
    return { valid: false, errorKey: "tooSmall" }
  }
  if (width > MAX_CANVAS_SIZE || height > MAX_CANVAS_SIZE) {
    return { valid: false, errorKey: "tooLarge" }
  }
  return { valid: true }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `bun run vitest run src/lib/__tests__/resize-utils.test.ts`
Expected: All 10 tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/types/index.ts src/lib/resize-utils.ts src/lib/__tests__/resize-utils.test.ts
git commit -m "feat(resize): add types and pure utility functions with tests"
```

---

### Task 2: Export Utility (TDD)

**Files:**
- Create: `src/lib/resize-export.ts`
- Create: `src/lib/__tests__/resize-export.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/__tests__/resize-export.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest"
import { exportArtboard } from "../resize-export"
import type { ResizeImageTransform } from "@/types"

function createMockImage(width: number, height: number): HTMLImageElement {
  return {
    naturalWidth: width,
    naturalHeight: height,
    width,
    height,
    complete: true,
  } as unknown as HTMLImageElement
}

function createMockCanvas() {
  const ctx = {
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn(),
    drawImage: vi.fn(),
    fillStyle: "",
    fillRect: vi.fn(),
  }
  const canvas = {
    width: 0,
    height: 0,
    getContext: vi.fn(() => ctx),
    toBlob: vi.fn((cb: BlobCallback, type?: string) => {
      cb(new Blob(["test"], { type: type || "image/png" }))
    }),
  }
  return { canvas, ctx }
}

describe("exportArtboard", () => {
  let mockCanvas: ReturnType<typeof createMockCanvas>

  beforeEach(() => {
    mockCanvas = createMockCanvas()
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "canvas") return mockCanvas.canvas as unknown as HTMLCanvasElement
      return document.createElement(tag)
    })
  })

  it("should create canvas at artboard dimensions", async () => {
    const image = createMockImage(800, 600)
    const transform: ResizeImageTransform = { x: 0, y: 0, scale: 1, crop: null }

    await exportArtboard(image, transform, 500, 500, "image/png")

    expect(mockCanvas.canvas.width).toBe(500)
    expect(mockCanvas.canvas.height).toBe(500)
  })

  it("should draw image with correct transform", async () => {
    const image = createMockImage(800, 600)
    const transform: ResizeImageTransform = { x: -150, y: -50, scale: 1.25, crop: null }

    await exportArtboard(image, transform, 500, 500, "image/png")

    expect(mockCanvas.ctx.drawImage).toHaveBeenCalledWith(
      image,
      -150,
      -50,
      800 * 1.25,
      600 * 1.25
    )
  })

  it("should draw cropped image when crop is set", async () => {
    const image = createMockImage(800, 600)
    const transform: ResizeImageTransform = {
      x: 0,
      y: 0,
      scale: 1,
      crop: { x: 100, y: 50, width: 400, height: 300 },
    }

    await exportArtboard(image, transform, 500, 500, "image/png")

    // drawImage with 9 args: image, sx, sy, sw, sh, dx, dy, dw, dh
    expect(mockCanvas.ctx.drawImage).toHaveBeenCalledWith(
      image,
      100, 50, 400, 300,
      0, 0, 400 * 1, 300 * 1
    )
  })

  it("should return blob with correct mime type", async () => {
    const image = createMockImage(800, 600)
    const transform: ResizeImageTransform = { x: 0, y: 0, scale: 1, crop: null }

    const blob = await exportArtboard(image, transform, 500, 500, "image/jpeg", 0.92)

    expect(blob).toBeInstanceOf(Blob)
    expect(mockCanvas.canvas.toBlob).toHaveBeenCalledWith(
      expect.any(Function),
      "image/jpeg",
      0.92
    )
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun run vitest run src/lib/__tests__/resize-export.test.ts`
Expected: FAIL — module `../resize-export` not found

- [ ] **Step 3: Implement `resize-export.ts`**

Create `src/lib/resize-export.ts`:

```typescript
import type { ResizeImageTransform } from "@/types"

/**
 * Export the artboard region as an image blob.
 * Renders the image with its current transform onto an offscreen canvas
 * clipped to artboard dimensions.
 */
export function exportArtboard(
  image: HTMLImageElement,
  transform: ResizeImageTransform,
  artboardWidth: number,
  artboardHeight: number,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    canvas.width = artboardWidth
    canvas.height = artboardHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      reject(new Error("Failed to get canvas 2d context"))
      return
    }

    // White background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, artboardWidth, artboardHeight)

    // Clip to artboard
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, artboardWidth, artboardHeight)
    ctx.clip()

    if (transform.crop) {
      // Draw cropped source region
      const { x: sx, y: sy, width: sw, height: sh } = transform.crop
      const dw = sw * transform.scale
      const dh = sh * transform.scale
      ctx.drawImage(
        image,
        sx, sy, sw, sh,
        transform.x, transform.y, dw, dh
      )
    } else {
      // Draw full image with transform
      const dw = image.naturalWidth * transform.scale
      const dh = image.naturalHeight * transform.scale
      ctx.drawImage(image, transform.x, transform.y, dw, dh)
    }

    ctx.restore()

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error("Failed to create blob"))
        }
      },
      mimeType,
      quality
    )
  })
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun run vitest run src/lib/__tests__/resize-export.test.ts`
Expected: All 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/resize-export.ts src/lib/__tests__/resize-export.test.ts
git commit -m "feat(resize): add artboard export utility with tests"
```

---

### Task 3: Editor State Hook

**Files:**
- Create: `src/hooks/use-resize-editor.ts`

- [ ] **Step 1: Implement the hook**

Create `src/hooks/use-resize-editor.ts`:

```typescript
"use client"

import { useState, useCallback, useRef } from "react"
import type { ResizeImageTransform, CropRect, ResizeEditorMode } from "@/types"
import { calculateFillTransform } from "@/lib/resize-utils"

interface CanvasSize {
  width: number
  height: number
}

interface UseResizeEditorReturn {
  /** Artboard pixel dimensions */
  canvasSize: CanvasSize
  setCanvasSize: (size: CanvasSize) => void
  /** Loaded image element */
  image: HTMLImageElement | null
  /** Image transform state on artboard */
  transform: ResizeImageTransform
  setTransform: (t: ResizeImageTransform) => void
  /** Current interaction mode */
  mode: ResizeEditorMode
  setMode: (m: ResizeEditorMode) => void
  /** Crop rect in display coordinates (only valid when mode === "crop") */
  cropRect: CropRect | null
  setCropRect: (r: CropRect | null) => void
  /** Load a new image and auto-fill the artboard */
  loadImage: (file: File) => Promise<void>
  /** Apply the current crop rect to the image transform */
  applyCrop: () => void
  /** Cancel crop mode */
  cancelCrop: () => void
  /** Reset image to fill artboard */
  resetImage: () => void
  /** Remove current image */
  clearImage: () => void
  /** Original file name (for export) */
  fileName: string
  /** Original mime type (for export) */
  mimeType: string
}

export function useResizeEditor(
  initialWidth = 500,
  initialHeight = 500
): UseResizeEditorReturn {
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: initialWidth,
    height: initialHeight,
  })
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [transform, setTransform] = useState<ResizeImageTransform>({
    x: 0,
    y: 0,
    scale: 1,
    crop: null,
  })
  const [mode, setMode] = useState<ResizeEditorMode>("idle")
  const [cropRect, setCropRect] = useState<CropRect | null>(null)
  const [fileName, setFileName] = useState("")
  const [mimeType, setMimeType] = useState("image/png")
  const imageUrlRef = useRef<string | null>(null)

  const fitImageToArtboard = useCallback(
    (img: HTMLImageElement, size: CanvasSize, currentCrop: CropRect | null) => {
      const srcW = currentCrop ? currentCrop.width : img.naturalWidth
      const srcH = currentCrop ? currentCrop.height : img.naturalHeight
      const fill = calculateFillTransform(srcW, srcH, size.width, size.height)
      setTransform({ ...fill, crop: currentCrop })
    },
    []
  )

  const loadImage = useCallback(
    async (file: File) => {
      // Revoke previous URL
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current)
      }

      const url = URL.createObjectURL(file)
      imageUrlRef.current = url

      const img = new window.Image()
      img.src = url

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error("Failed to load image"))
      })

      setImage(img)
      setFileName(file.name)
      setMimeType(file.type || "image/png")
      setMode("idle")
      setCropRect(null)
      fitImageToArtboard(img, canvasSize, null)
    },
    [canvasSize, fitImageToArtboard]
  )

  const applyCrop = useCallback(() => {
    if (!cropRect || !image) return

    // Convert display crop rect to source image coordinates
    const currentCrop = transform.crop
    const srcW = currentCrop ? currentCrop.width : image.naturalWidth
    const srcH = currentCrop ? currentCrop.height : image.naturalHeight
    const displayW = srcW * transform.scale
    const displayH = srcH * transform.scale

    // cropRect is in artboard display coordinates
    // Convert to source coordinates
    const relX = (cropRect.x - transform.x) / displayW
    const relY = (cropRect.y - transform.y) / displayH
    const relW = cropRect.width / displayW
    const relH = cropRect.height / displayH

    const srcBaseX = currentCrop ? currentCrop.x : 0
    const srcBaseY = currentCrop ? currentCrop.y : 0

    const newCrop: CropRect = {
      x: srcBaseX + relX * srcW,
      y: srcBaseY + relY * srcH,
      width: relW * srcW,
      height: relH * srcH,
    }

    setCropRect(null)
    setMode("idle")
    fitImageToArtboard(image, canvasSize, newCrop)
  }, [cropRect, image, transform, canvasSize, fitImageToArtboard])

  const cancelCrop = useCallback(() => {
    setCropRect(null)
    setMode("selected")
  }, [])

  const resetImage = useCallback(() => {
    if (!image) return
    setMode("idle")
    setCropRect(null)
    fitImageToArtboard(image, canvasSize, null)
  }, [image, canvasSize, fitImageToArtboard])

  const clearImage = useCallback(() => {
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current)
      imageUrlRef.current = null
    }
    setImage(null)
    setTransform({ x: 0, y: 0, scale: 1, crop: null })
    setMode("idle")
    setCropRect(null)
    setFileName("")
    setMimeType("image/png")
  }, [])

  const handleSetCanvasSize = useCallback(
    (size: CanvasSize) => {
      setCanvasSize(size)
      if (image) {
        fitImageToArtboard(image, size, transform.crop)
      }
    },
    [image, transform.crop, fitImageToArtboard]
  )

  return {
    canvasSize,
    setCanvasSize: handleSetCanvasSize,
    image,
    transform,
    setTransform,
    mode,
    setMode,
    cropRect,
    setCropRect,
    loadImage,
    applyCrop,
    cancelCrop,
    resetImage,
    clearImage,
    fileName,
    mimeType,
  }
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `bun run tsc --noEmit --pretty 2>&1 | grep -E "use-resize-editor|error" | head -20`
Expected: No errors related to use-resize-editor

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-resize-editor.ts
git commit -m "feat(resize): add editor state management hook"
```

---

### Task 4: i18n Translations

**Files:**
- Modify: `src/messages/en.json`
- Modify: `src/messages/zh-CN.json`
- Modify: `src/messages/ja.json`
- Modify: `src/messages/ko.json`
- Modify: `src/messages/es.json`

- [ ] **Step 1: Add "resize" namespace to `en.json`**

Insert before the closing `}` of the JSON root object:

```json
  "resize": {
    "metadata": {
      "title": "Image Resizer — Resize & Crop to Any Dimension | ImgSplit",
      "description": "Free online image resizer — set custom dimensions, drag to position, crop to fit, and download. No upload needed, 100% browser-based."
    },
    "loadingEditor": "Loading editor...",
    "uploadTitle": "Upload Image",
    "uploadHint": "Drop image here or click to upload",
    "uploadFormats": "PNG, JPEG, WebP",
    "canvasSize": "Canvas Size",
    "width": "Width",
    "height": "Height",
    "swap": "Swap",
    "presets": "Presets",
    "preset_1_1": "1:1 Square",
    "preset_4_3": "4:3 Landscape",
    "preset_3_4": "3:4 Portrait",
    "preset_16_9": "16:9 Widescreen",
    "preset_9_16": "9:16 Phone",
    "preset_custom": "Custom",
    "download": "Download",
    "downloadAs": "Download as {format}",
    "reset": "Reset",
    "replaceImage": "Replace Image",
    "cropMode": "Crop Mode",
    "cropHint": "Drag corners to crop. Enter to apply, Esc to cancel.",
    "applyCrop": "Apply Crop",
    "cancelCrop": "Cancel",
    "invalidSize": "Dimensions must be integers between 1 and 4096",
    "px": "px"
  }
```

- [ ] **Step 2: Add "resize" namespace to `zh-CN.json`**

```json
  "resize": {
    "metadata": {
      "title": "图片调整尺寸 — 自定义裁剪和缩放 | ImgSplit",
      "description": "免费在线图片调整工具 — 设置自定义尺寸，拖拽定位，裁剪适配，一键下载。无需上传，100% 浏览器处理。"
    },
    "loadingEditor": "加载编辑器中...",
    "uploadTitle": "上传图片",
    "uploadHint": "拖放图片到此处或点击上传",
    "uploadFormats": "PNG、JPEG、WebP",
    "canvasSize": "画布尺寸",
    "width": "宽度",
    "height": "高度",
    "swap": "交换",
    "presets": "预设",
    "preset_1_1": "1:1 正方形",
    "preset_4_3": "4:3 横版",
    "preset_3_4": "3:4 竖版",
    "preset_16_9": "16:9 宽屏",
    "preset_9_16": "9:16 手机",
    "preset_custom": "自定义",
    "download": "下载",
    "downloadAs": "下载为 {format}",
    "reset": "重置",
    "replaceImage": "替换图片",
    "cropMode": "裁剪模式",
    "cropHint": "拖动四角进行裁剪。回车确认，Esc 取消。",
    "applyCrop": "应用裁剪",
    "cancelCrop": "取消",
    "invalidSize": "尺寸必须为 1 到 4096 之间的整数",
    "px": "px"
  }
```

- [ ] **Step 3: Add "resize" namespace to `ja.json`**

```json
  "resize": {
    "metadata": {
      "title": "画像リサイズ — 自由にトリミング＆リサイズ | ImgSplit",
      "description": "無料オンライン画像リサイズツール — カスタムサイズ設定、ドラッグ配置、トリミング、ダウンロード。アップロード不要、100%ブラウザ処理。"
    },
    "loadingEditor": "エディタを読み込み中...",
    "uploadTitle": "画像をアップロード",
    "uploadHint": "画像をドロップまたはクリックしてアップロード",
    "uploadFormats": "PNG、JPEG、WebP",
    "canvasSize": "キャンバスサイズ",
    "width": "幅",
    "height": "高さ",
    "swap": "入替",
    "presets": "プリセット",
    "preset_1_1": "1:1 正方形",
    "preset_4_3": "4:3 横長",
    "preset_3_4": "3:4 縦長",
    "preset_16_9": "16:9 ワイド",
    "preset_9_16": "9:16 スマホ",
    "preset_custom": "カスタム",
    "download": "ダウンロード",
    "downloadAs": "{format}でダウンロード",
    "reset": "リセット",
    "replaceImage": "画像を入替",
    "cropMode": "トリミングモード",
    "cropHint": "角をドラッグしてトリミング。Enterで適用、Escでキャンセル。",
    "applyCrop": "トリミング適用",
    "cancelCrop": "キャンセル",
    "invalidSize": "サイズは1から4096の整数にしてください",
    "px": "px"
  }
```

- [ ] **Step 4: Add "resize" namespace to `ko.json`**

```json
  "resize": {
    "metadata": {
      "title": "이미지 크기 조정 — 자유 자르기 및 크기 조정 | ImgSplit",
      "description": "무료 온라인 이미지 크기 조정 — 사용자 정의 크기, 드래그 위치 지정, 자르기, 다운로드. 업로드 불필요, 100% 브라우저 처리."
    },
    "loadingEditor": "에디터 로딩 중...",
    "uploadTitle": "이미지 업로드",
    "uploadHint": "이미지를 드롭하거나 클릭하여 업로드",
    "uploadFormats": "PNG, JPEG, WebP",
    "canvasSize": "캔버스 크기",
    "width": "너비",
    "height": "높이",
    "swap": "교환",
    "presets": "프리셋",
    "preset_1_1": "1:1 정사각형",
    "preset_4_3": "4:3 가로",
    "preset_3_4": "3:4 세로",
    "preset_16_9": "16:9 와이드",
    "preset_9_16": "9:16 폰",
    "preset_custom": "사용자 정의",
    "download": "다운로드",
    "downloadAs": "{format}으로 다운로드",
    "reset": "초기화",
    "replaceImage": "이미지 교체",
    "cropMode": "자르기 모드",
    "cropHint": "모서리를 드래그하여 자르기. Enter 적용, Esc 취소.",
    "applyCrop": "자르기 적용",
    "cancelCrop": "취소",
    "invalidSize": "크기는 1에서 4096 사이의 정수여야 합니다",
    "px": "px"
  }
```

- [ ] **Step 5: Add "resize" namespace to `es.json`**

```json
  "resize": {
    "metadata": {
      "title": "Redimensionar Imagen — Recortar y Ajustar | ImgSplit",
      "description": "Herramienta gratuita para redimensionar imágenes — dimensiones personalizadas, arrastrar para posicionar, recortar y descargar. Sin subir archivos, 100% en el navegador."
    },
    "loadingEditor": "Cargando editor...",
    "uploadTitle": "Subir imagen",
    "uploadHint": "Arrastra una imagen aquí o haz clic para subir",
    "uploadFormats": "PNG, JPEG, WebP",
    "canvasSize": "Tamaño del lienzo",
    "width": "Ancho",
    "height": "Alto",
    "swap": "Intercambiar",
    "presets": "Preajustes",
    "preset_1_1": "1:1 Cuadrado",
    "preset_4_3": "4:3 Horizontal",
    "preset_3_4": "3:4 Vertical",
    "preset_16_9": "16:9 Panorámico",
    "preset_9_16": "9:16 Móvil",
    "preset_custom": "Personalizado",
    "download": "Descargar",
    "downloadAs": "Descargar como {format}",
    "reset": "Restablecer",
    "replaceImage": "Reemplazar imagen",
    "cropMode": "Modo recorte",
    "cropHint": "Arrastra las esquinas para recortar. Enter para aplicar, Esc para cancelar.",
    "applyCrop": "Aplicar recorte",
    "cancelCrop": "Cancelar",
    "invalidSize": "Las dimensiones deben ser enteros entre 1 y 4096",
    "px": "px"
  }
```

- [ ] **Step 6: Commit**

```bash
git add src/messages/en.json src/messages/zh-CN.json src/messages/ja.json src/messages/ko.json src/messages/es.json
git commit -m "feat(resize): add i18n translations for resize module (5 locales)"
```

---

### Task 5: Page Route & Dynamic Import Wrapper

**Files:**
- Create: `src/app/[locale]/resize/page.tsx`
- Create: `src/components/resize/DynamicResizeEditor.tsx`

- [ ] **Step 1: Create the dynamic import wrapper**

Create `src/components/resize/DynamicResizeEditor.tsx`:

```typescript
"use client"

import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

function EditorLoading() {
  const t = useTranslations("resize")
  return (
    <div className="flex items-center justify-center h-64 text-muted-foreground">
      {t("loadingEditor")}
    </div>
  )
}

export const DynamicResizeEditor = dynamic(
  () =>
    import("./ResizeEditor").then((mod) => ({ default: mod.ResizeEditor })),
  {
    ssr: false,
    loading: () => <EditorLoading />,
  }
)
```

- [ ] **Step 2: Create a stub `ResizeEditor` so imports resolve**

Create `src/components/resize/ResizeEditor.tsx`:

```typescript
"use client"

export function ResizeEditor() {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      Resize Editor (placeholder)
    </div>
  )
}
```

- [ ] **Step 3: Create the page route**

Create `src/app/[locale]/resize/page.tsx`:

```typescript
import { setRequestLocale } from "next-intl/server"
import { getTranslations } from "next-intl/server"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import type { Metadata } from "next"
import { DynamicResizeEditor } from "@/components/resize/DynamicResizeEditor"

const BASE_URL = "https://imgsplit.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "resize.metadata" })

  const canonicalUrl =
    locale === routing.defaultLocale
      ? `${BASE_URL}/resize`
      : `${BASE_URL}/${locale}/resize`

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            l === routing.defaultLocale
              ? `${BASE_URL}/resize`
              : `${BASE_URL}/${l}/resize`,
          ])
        ),
        "x-default": `${BASE_URL}/resize`,
      },
    },
  }
}

export default async function ResizePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <DynamicResizeEditor />
    </main>
  )
}
```

- [ ] **Step 4: Verify page loads without errors**

Run: `bun run build 2>&1 | grep -E "resize|error|Error" | head -20`
Expected: `/resize` page builds successfully

- [ ] **Step 5: Commit**

```bash
git add src/app/[locale]/resize/page.tsx src/components/resize/DynamicResizeEditor.tsx src/components/resize/ResizeEditor.tsx
git commit -m "feat(resize): add page route with dynamic editor import"
```

---

### Task 6: Canvas Size Control Component

**Files:**
- Create: `src/components/resize/CanvasSizeControl.tsx`

- [ ] **Step 1: Implement the canvas size control**

Create `src/components/resize/CanvasSizeControl.tsx`:

```typescript
"use client"

import { useState, useCallback } from "react"
import { ArrowLeftRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { validateCanvasSize } from "@/lib/resize-utils"

interface CanvasSizeControlProps {
  width: number
  height: number
  onChange: (size: { width: number; height: number }) => void
}

const PRESETS = [
  { key: "preset_1_1", w: 1080, h: 1080 },
  { key: "preset_4_3", w: 1200, h: 900 },
  { key: "preset_3_4", w: 900, h: 1200 },
  { key: "preset_16_9", w: 1920, h: 1080 },
  { key: "preset_9_16", w: 1080, h: 1920 },
] as const

export function CanvasSizeControl({
  width,
  height,
  onChange,
}: CanvasSizeControlProps) {
  const t = useTranslations("resize")
  const [inputW, setInputW] = useState(String(width))
  const [inputH, setInputH] = useState(String(height))
  const [error, setError] = useState<string | null>(null)

  const applySize = useCallback(
    (w: string, h: string) => {
      const numW = parseInt(w, 10)
      const numH = parseInt(h, 10)
      if (isNaN(numW) || isNaN(numH)) {
        setError(t("invalidSize"))
        return
      }
      const validation = validateCanvasSize(numW, numH)
      if (!validation.valid) {
        setError(t("invalidSize"))
        return
      }
      setError(null)
      onChange({ width: numW, height: numH })
    },
    [onChange, t]
  )

  const handleBlurW = useCallback(() => {
    applySize(inputW, inputH)
  }, [inputW, inputH, applySize])

  const handleBlurH = useCallback(() => {
    applySize(inputW, inputH)
  }, [inputW, inputH, applySize])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        applySize(inputW, inputH)
      }
    },
    [inputW, inputH, applySize]
  )

  const handleSwap = useCallback(() => {
    setInputW(inputH)
    setInputH(inputW)
    applySize(inputH, inputW)
  }, [inputW, inputH, applySize])

  const handlePreset = useCallback(
    (w: number, h: number) => {
      setInputW(String(w))
      setInputH(String(h))
      setError(null)
      onChange({ width: w, height: h })
    },
    [onChange]
  )

  // Detect active preset
  const activePreset = PRESETS.find(
    (p) => p.w === width && p.h === height
  )?.key

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {t("canvasSize")}
      </p>

      {/* Width x Height inputs */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t("width")}
          </label>
          <input
            type="number"
            value={inputW}
            onChange={(e) => setInputW(e.target.value)}
            onBlur={handleBlurW}
            onKeyDown={handleKeyDown}
            min={1}
            max={4096}
            className="w-20 h-8 px-2 text-sm bg-background border border-border rounded text-foreground text-center focus:outline-none focus:border-accent"
          />
        </div>

        <button
          onClick={handleSwap}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          title={t("swap")}
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-1">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t("height")}
          </label>
          <input
            type="number"
            value={inputH}
            onChange={(e) => setInputH(e.target.value)}
            onBlur={handleBlurH}
            onKeyDown={handleKeyDown}
            min={1}
            max={4096}
            className="w-20 h-8 px-2 text-sm bg-background border border-border rounded text-foreground text-center focus:outline-none focus:border-accent"
          />
        </div>

        <span className="text-[10px] text-muted-foreground">{t("px")}</span>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* Presets */}
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            onClick={() => handlePreset(preset.w, preset.h)}
            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border rounded transition-colors ${
              activePreset === preset.key
                ? "border-accent text-accent bg-accent/5"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {t(preset.key)}
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `bun run tsc --noEmit --pretty 2>&1 | grep -E "CanvasSizeControl|error" | head -10`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/resize/CanvasSizeControl.tsx
git commit -m "feat(resize): add canvas size control with presets"
```

---

### Task 7: Konva Canvas with Image Upload & Drag

**Files:**
- Modify: `src/lib/konva.ts` (add Transformer export)
- Create: `src/components/resize/ResizeCanvas.tsx`

- [ ] **Step 1: Add Transformer to Konva re-exports**

Modify `src/lib/konva.ts`:

```typescript
// Single re-export point for react-konva to avoid "Several Konva instances detected" warning
// when multiple files import from react-konva separately (Turbopack creates duplicate module instances).
export { Stage, Layer, Image, Line, Group, Rect, Transformer } from "react-konva"
```

- [ ] **Step 2: Implement the Konva canvas**

Create `src/components/resize/ResizeCanvas.tsx`:

```typescript
"use client"

import { useRef, useCallback, useEffect, useState } from "react"
import { Stage, Layer, Rect, Image, Transformer } from "@/lib/konva"
import { useTranslations } from "next-intl"
import { Upload } from "lucide-react"
import { ACCEPTED_TYPES } from "@/lib/upload-utils"
import type { ResizeImageTransform, ResizeEditorMode, CropRect } from "@/types"
import type Konva from "konva"
import { CropOverlay } from "./CropOverlay"

interface ResizeCanvasProps {
  canvasWidth: number
  canvasHeight: number
  image: HTMLImageElement | null
  transform: ResizeImageTransform
  onTransformChange: (t: ResizeImageTransform) => void
  mode: ResizeEditorMode
  onModeChange: (m: ResizeEditorMode) => void
  cropRect: CropRect | null
  onCropRectChange: (r: CropRect | null) => void
  onImageFile: (file: File) => void
}

/** Padding around the artboard in the viewport */
const ARTBOARD_PADDING = 40

export function ResizeCanvas({
  canvasWidth,
  canvasHeight,
  image,
  transform,
  onTransformChange,
  mode,
  onModeChange,
  cropRect,
  onCropRectChange,
  onImageFile,
}: ResizeCanvasProps) {
  const t = useTranslations("resize")
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Konva.Stage>(null)
  const imageRef = useRef<Konva.Image>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 })
  const [isDragOver, setIsDragOver] = useState(false)

  // Observe container size
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Calculate artboard display scale and position (fit artboard in container)
  const viewScale = Math.min(
    (containerSize.width - ARTBOARD_PADDING * 2) / canvasWidth,
    (containerSize.height - ARTBOARD_PADDING * 2) / canvasHeight,
    1 // Don't scale up beyond 1:1
  )
  const artboardDisplayW = canvasWidth * viewScale
  const artboardDisplayH = canvasHeight * viewScale
  const artboardX = (containerSize.width - artboardDisplayW) / 2
  const artboardY = (containerSize.height - artboardDisplayH) / 2

  // Attach transformer to image when selected
  useEffect(() => {
    if (mode === "selected" && imageRef.current && transformerRef.current) {
      transformerRef.current.nodes([imageRef.current])
      transformerRef.current.getLayer()?.batchDraw()
    } else if (transformerRef.current) {
      transformerRef.current.nodes([])
      transformerRef.current.getLayer()?.batchDraw()
    }
  }, [mode])

  // Image display dimensions
  const srcW = transform.crop ? transform.crop.width : image?.naturalWidth ?? 0
  const srcH = transform.crop ? transform.crop.height : image?.naturalHeight ?? 0
  const displayW = srcW * transform.scale
  const displayH = srcH * transform.scale

  // Handle click on stage background → deselect
  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (e.target === e.target.getStage() || e.target.name() === "artboard") {
        if (mode === "selected") {
          onModeChange("idle")
        }
      }
    },
    [mode, onModeChange]
  )

  // Handle click on image → select
  const handleImageClick = useCallback(() => {
    if (mode === "idle") {
      onModeChange("selected")
    }
  }, [mode, onModeChange])

  // Handle double-click → enter crop mode
  const handleImageDblClick = useCallback(() => {
    if (!image) return
    // Initialize crop rect to the visible part of the image within artboard
    const imgLeft = transform.x
    const imgTop = transform.y
    const imgRight = transform.x + displayW
    const imgBottom = transform.y + displayH

    // Intersection with artboard (0,0,canvasWidth,canvasHeight)
    const cropX = Math.max(0, imgLeft)
    const cropY = Math.max(0, imgTop)
    const cropRight = Math.min(canvasWidth, imgRight)
    const cropBottom = Math.min(canvasHeight, imgBottom)

    onCropRectChange({
      x: cropX,
      y: cropY,
      width: Math.max(20, cropRight - cropX),
      height: Math.max(20, cropBottom - cropY),
    })
    onModeChange("crop")
  }, [image, transform, displayW, displayH, canvasWidth, canvasHeight, onCropRectChange, onModeChange])

  // Handle image drag
  const handleImageDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      onTransformChange({
        ...transform,
        x: e.target.x(),
        y: e.target.y(),
      })
    },
    [transform, onTransformChange]
  )

  // Handle transform (resize via corner handles)
  const handleTransformEnd = useCallback(() => {
    const node = imageRef.current
    if (!node) return

    const scaleX = node.scaleX()
    const newScale = transform.scale * scaleX

    onTransformChange({
      ...transform,
      x: node.x(),
      y: node.y(),
      scale: newScale,
    })

    // Reset node scale (we track scale ourselves)
    node.scaleX(1)
    node.scaleY(1)
  }, [transform, onTransformChange])

  // File upload handlers
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file && ACCEPTED_TYPES.includes(file.type)) {
        onImageFile(file)
      }
    },
    [onImageFile]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) onImageFile(file)
      if (inputRef.current) inputRef.current.value = ""
    },
    [onImageFile]
  )

  return (
    <div
      ref={containerRef}
      className="flex-1 relative bg-muted/30 overflow-hidden"
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsDragOver(false)
      }}
    >
      {/* Drag over overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-accent/10 border-2 border-dashed border-accent pointer-events-none">
          <p className="text-accent text-sm uppercase tracking-wider">{t("uploadHint")}</p>
        </div>
      )}

      {/* Upload prompt when no image */}
      {!image && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-1">{t("uploadHint")}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
            {t("uploadFormats")}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Konva Stage */}
      <Stage
        ref={stageRef}
        width={containerSize.width}
        height={containerSize.height}
        onClick={handleStageClick}
      >
        <Layer>
          {/* Artboard background (white) */}
          <Rect
            name="artboard"
            x={artboardX}
            y={artboardY}
            width={artboardDisplayW}
            height={artboardDisplayH}
            fill="#ffffff"
            shadowColor="rgba(0,0,0,0.1)"
            shadowBlur={10}
            shadowOffsetY={2}
          />

          {/* Clip group for artboard content */}
          {image && (
            <Group
              clipX={artboardX}
              clipY={artboardY}
              clipWidth={artboardDisplayW}
              clipHeight={artboardDisplayH}
            >
              <Image
                ref={imageRef}
                image={image}
                x={artboardX + transform.x * viewScale}
                y={artboardY + transform.y * viewScale}
                width={displayW * viewScale}
                height={displayH * viewScale}
                crop={
                  transform.crop
                    ? {
                        x: transform.crop.x,
                        y: transform.crop.y,
                        width: transform.crop.width,
                        height: transform.crop.height,
                      }
                    : undefined
                }
                draggable={mode !== "crop"}
                onClick={handleImageClick}
                onDblClick={handleImageDblClick}
                onDragEnd={handleImageDragEnd}
                dragBoundFunc={(pos) => {
                  // Allow free drag but keep transform in artboard coords
                  return pos
                }}
              />
            </Group>
          )}

          {/* Transformer for resize mode */}
          {mode === "selected" && (
            <Transformer
              ref={transformerRef}
              rotateEnabled={false}
              enabledAnchors={[
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
              ]}
              keepRatio={true}
              boundBoxFunc={(oldBox, newBox) => {
                // Minimum size constraint
                if (newBox.width < 20 || newBox.height < 20) {
                  return oldBox
                }
                return newBox
              }}
              onTransformEnd={handleTransformEnd}
            />
          )}

          {/* Crop overlay */}
          {mode === "crop" && cropRect && image && (
            <CropOverlay
              cropRect={{
                x: artboardX + cropRect.x * viewScale,
                y: artboardY + cropRect.y * viewScale,
                width: cropRect.width * viewScale,
                height: cropRect.height * viewScale,
              }}
              imageBounds={{
                x: artboardX + transform.x * viewScale,
                y: artboardY + transform.y * viewScale,
                width: displayW * viewScale,
                height: displayH * viewScale,
              }}
              onCropChange={(displayRect) => {
                // Convert display coordinates back to artboard coordinates
                onCropRectChange({
                  x: (displayRect.x - artboardX) / viewScale,
                  y: (displayRect.y - artboardY) / viewScale,
                  width: displayRect.width / viewScale,
                  height: displayRect.height / viewScale,
                })
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  )
}
```

Note: We import `Group` from `@/lib/konva`. The `Group` is already exported there. The `Transformer` was just added in Step 1.

- [ ] **Step 3: Verify no TypeScript errors**

Run: `bun run tsc --noEmit --pretty 2>&1 | grep -E "ResizeCanvas|error" | head -20`
Expected: May show CropOverlay import error (created in next task). That's fine.

- [ ] **Step 4: Commit**

```bash
git add src/lib/konva.ts src/components/resize/ResizeCanvas.tsx
git commit -m "feat(resize): add Konva canvas with artboard, image upload, drag, and transformer"
```

---

### Task 8: Crop Overlay Component

**Files:**
- Create: `src/components/resize/CropOverlay.tsx`

- [ ] **Step 1: Implement the crop overlay**

Create `src/components/resize/CropOverlay.tsx`:

```typescript
"use client"

import { useRef, useCallback } from "react"
import { Group, Rect, Line } from "@/lib/konva"
import { constrainCropRect } from "@/lib/resize-utils"
import type Konva from "konva"

interface CropRect {
  x: number
  y: number
  width: number
  height: number
}

interface CropOverlayProps {
  /** Crop rectangle in stage display coordinates */
  cropRect: CropRect
  /** Image bounds in stage display coordinates */
  imageBounds: CropRect
  /** Called when crop rect changes (display coordinates) */
  onCropChange: (rect: CropRect) => void
}

const HANDLE_SIZE = 10
const HANDLE_COLOR = "#ffffff"
const HANDLE_STROKE = "#0066ff"
const DIM_COLOR = "rgba(0, 0, 0, 0.5)"

/** Corner handle positions */
const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"] as const
type Corner = (typeof CORNERS)[number]

function getCornerPos(corner: Corner, rect: CropRect): { x: number; y: number } {
  switch (corner) {
    case "top-left":
      return { x: rect.x, y: rect.y }
    case "top-right":
      return { x: rect.x + rect.width, y: rect.y }
    case "bottom-left":
      return { x: rect.x, y: rect.y + rect.height }
    case "bottom-right":
      return { x: rect.x + rect.width, y: rect.y + rect.height }
  }
}

export function CropOverlay({
  cropRect,
  imageBounds,
  onCropChange,
}: CropOverlayProps) {
  const dragStartRef = useRef<{ corner: Corner; startRect: CropRect } | null>(null)

  const handleCornerDrag = useCallback(
    (corner: Corner, e: Konva.KonvaEventObject<DragEvent>) => {
      const node = e.target
      const nx = node.x() + HANDLE_SIZE / 2
      const ny = node.y() + HANDLE_SIZE / 2

      let newRect: CropRect

      switch (corner) {
        case "top-left":
          newRect = {
            x: nx,
            y: ny,
            width: cropRect.x + cropRect.width - nx,
            height: cropRect.y + cropRect.height - ny,
          }
          break
        case "top-right":
          newRect = {
            x: cropRect.x,
            y: ny,
            width: nx - cropRect.x,
            height: cropRect.y + cropRect.height - ny,
          }
          break
        case "bottom-left":
          newRect = {
            x: nx,
            y: cropRect.y,
            width: cropRect.x + cropRect.width - nx,
            height: ny - cropRect.y,
          }
          break
        case "bottom-right":
          newRect = {
            x: cropRect.x,
            y: cropRect.y,
            width: nx - cropRect.x,
            height: ny - cropRect.y,
          }
          break
      }

      const constrained = constrainCropRect(newRect, imageBounds)
      onCropChange(constrained)
    },
    [cropRect, imageBounds, onCropChange]
  )

  // Rule of thirds lines
  const thirdW = cropRect.width / 3
  const thirdH = cropRect.height / 3

  return (
    <Group>
      {/* Dim overlay — four rectangles around crop rect */}
      {/* Top */}
      <Rect
        x={imageBounds.x}
        y={imageBounds.y}
        width={imageBounds.width}
        height={cropRect.y - imageBounds.y}
        fill={DIM_COLOR}
        listening={false}
      />
      {/* Bottom */}
      <Rect
        x={imageBounds.x}
        y={cropRect.y + cropRect.height}
        width={imageBounds.width}
        height={imageBounds.y + imageBounds.height - (cropRect.y + cropRect.height)}
        fill={DIM_COLOR}
        listening={false}
      />
      {/* Left */}
      <Rect
        x={imageBounds.x}
        y={cropRect.y}
        width={cropRect.x - imageBounds.x}
        height={cropRect.height}
        fill={DIM_COLOR}
        listening={false}
      />
      {/* Right */}
      <Rect
        x={cropRect.x + cropRect.width}
        y={cropRect.y}
        width={imageBounds.x + imageBounds.width - (cropRect.x + cropRect.width)}
        height={cropRect.height}
        fill={DIM_COLOR}
        listening={false}
      />

      {/* Crop border */}
      <Rect
        x={cropRect.x}
        y={cropRect.y}
        width={cropRect.width}
        height={cropRect.height}
        stroke={HANDLE_STROKE}
        strokeWidth={1.5}
        listening={false}
      />

      {/* Rule of thirds */}
      {[1, 2].map((i) => (
        <Line
          key={`v-${i}`}
          points={[
            cropRect.x + thirdW * i,
            cropRect.y,
            cropRect.x + thirdW * i,
            cropRect.y + cropRect.height,
          ]}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={0.5}
          listening={false}
        />
      ))}
      {[1, 2].map((i) => (
        <Line
          key={`h-${i}`}
          points={[
            cropRect.x,
            cropRect.y + thirdH * i,
            cropRect.x + cropRect.width,
            cropRect.y + thirdH * i,
          ]}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={0.5}
          listening={false}
        />
      ))}

      {/* Corner handles */}
      {CORNERS.map((corner) => {
        const pos = getCornerPos(corner, cropRect)
        return (
          <Rect
            key={corner}
            x={pos.x - HANDLE_SIZE / 2}
            y={pos.y - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            fill={HANDLE_COLOR}
            stroke={HANDLE_STROKE}
            strokeWidth={1.5}
            draggable
            onDragMove={(e) => handleCornerDrag(corner, e)}
            dragBoundFunc={(pos) => {
              // Constrain handle to image bounds
              return {
                x: Math.max(
                  imageBounds.x - HANDLE_SIZE / 2,
                  Math.min(imageBounds.x + imageBounds.width - HANDLE_SIZE / 2, pos.x)
                ),
                y: Math.max(
                  imageBounds.y - HANDLE_SIZE / 2,
                  Math.min(imageBounds.y + imageBounds.height - HANDLE_SIZE / 2, pos.y)
                ),
              }
            }}
          />
        )
      })}
    </Group>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `bun run tsc --noEmit --pretty 2>&1 | grep -E "CropOverlay|error" | head -10`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/resize/CropOverlay.tsx
git commit -m "feat(resize): add crop overlay with corner handles and rule-of-thirds"
```

---

### Task 9: Main Editor Orchestrator

**Files:**
- Modify: `src/components/resize/ResizeEditor.tsx` (replace stub)

- [ ] **Step 1: Implement the full ResizeEditor**

Replace the entire content of `src/components/resize/ResizeEditor.tsx`:

```typescript
"use client"

import { useCallback, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { Download, RotateCcw, ImagePlus, Check, X } from "lucide-react"
import { useResizeEditor } from "@/hooks/use-resize-editor"
import { exportArtboard } from "@/lib/resize-export"
import { ACCEPTED_TYPES } from "@/lib/upload-utils"
import { CanvasSizeControl } from "./CanvasSizeControl"
import { ResizeCanvas } from "./ResizeCanvas"

export function ResizeEditor() {
  const t = useTranslations("resize")
  const replaceInputRef = useRef<HTMLInputElement>(null)
  const {
    canvasSize,
    setCanvasSize,
    image,
    transform,
    setTransform,
    mode,
    setMode,
    cropRect,
    setCropRect,
    loadImage,
    applyCrop,
    cancelCrop,
    resetImage,
    clearImage,
    fileName,
    mimeType,
  } = useResizeEditor()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode === "crop") {
        if (e.key === "Enter") {
          e.preventDefault()
          applyCrop()
        } else if (e.key === "Escape") {
          e.preventDefault()
          cancelCrop()
        }
      } else if (e.key === "Escape" && mode === "selected") {
        setMode("idle")
      } else if (e.key === "Delete" || e.key === "Backspace") {
        if (mode === "selected") {
          clearImage()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mode, applyCrop, cancelCrop, setMode, clearImage])

  const handleImageFile = useCallback(
    async (file: File) => {
      try {
        await loadImage(file)
      } catch {
        toast.error(t("uploadHint"))
      }
    },
    [loadImage, t]
  )

  const handleDownload = useCallback(
    async (format: "image/png" | "image/jpeg") => {
      if (!image) return

      try {
        const quality = format === "image/jpeg" ? 0.92 : undefined
        const blob = await exportArtboard(
          image,
          transform,
          canvasSize.width,
          canvasSize.height,
          format,
          quality
        )

        const ext = format === "image/jpeg" ? ".jpg" : ".png"
        const baseName = fileName
          ? fileName.replace(/\.[^.]+$/, "")
          : "resized"
        const downloadName = `${baseName}_${canvasSize.width}x${canvasSize.height}${ext}`

        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = downloadName
        a.click()
        URL.revokeObjectURL(url)
      } catch {
        toast.error("Export failed")
      }
    },
    [image, transform, canvasSize, fileName]
  )

  const handleReplaceFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleImageFile(file)
      if (replaceInputRef.current) replaceInputRef.current.value = ""
    },
    [handleImageFile]
  )

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border">
        {/* Left: Canvas size */}
        <CanvasSizeControl
          width={canvasSize.width}
          height={canvasSize.height}
          onChange={setCanvasSize}
        />

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Crop mode actions */}
          {mode === "crop" && (
            <>
              <p className="text-[10px] text-muted-foreground mr-2 hidden sm:block">
                {t("cropHint")}
              </p>
              <button
                onClick={applyCrop}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
              >
                <Check className="h-3.5 w-3.5" />
                {t("applyCrop")}
              </button>
              <button
                onClick={cancelCrop}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider border border-border text-muted-foreground rounded hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                {t("cancelCrop")}
              </button>
            </>
          )}

          {/* Normal mode actions */}
          {mode !== "crop" && image && (
            <>
              <button
                onClick={() => replaceInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider border border-border text-muted-foreground rounded hover:text-foreground transition-colors"
                title={t("replaceImage")}
              >
                <ImagePlus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t("replaceImage")}</span>
              </button>
              <button
                onClick={resetImage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider border border-border text-muted-foreground rounded hover:text-foreground transition-colors"
                title={t("reset")}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t("reset")}</span>
              </button>
              <button
                onClick={() => handleDownload("image/png")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider bg-foreground text-background rounded hover:bg-foreground/90 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                PNG
              </button>
              <button
                onClick={() => handleDownload("image/jpeg")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider bg-foreground text-background rounded hover:bg-foreground/90 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                JPG
              </button>
            </>
          )}

          <input
            ref={replaceInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="hidden"
            onChange={handleReplaceFile}
          />
        </div>
      </div>

      {/* Canvas area */}
      <ResizeCanvas
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        image={image}
        transform={transform}
        onTransformChange={setTransform}
        mode={mode}
        onModeChange={setMode}
        cropRect={cropRect}
        onCropRectChange={setCropRect}
        onImageFile={handleImageFile}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify build succeeds**

Run: `bun run build 2>&1 | tail -20`
Expected: Build succeeds with `/resize` page compiled

- [ ] **Step 3: Commit**

```bash
git add src/components/resize/ResizeEditor.tsx
git commit -m "feat(resize): implement main editor with toolbar, download, and crop controls"
```

---

### Task 10: Navigation Integration & Footer Links

**Files:**
- Modify: `src/app/[locale]/page.tsx` (add resize link in footer)
- Modify: `src/messages/en.json` (add footer.toolResize key)
- Modify: `src/messages/zh-CN.json` (add footer.toolResize key)
- Modify: `src/messages/ja.json` (add footer.toolResize key)
- Modify: `src/messages/ko.json` (add footer.toolResize key)
- Modify: `src/messages/es.json` (add footer.toolResize key)

- [ ] **Step 1: Add footer translation key to all locale files**

In each `src/messages/{locale}.json`, inside the `"footer"` object, add the key `"toolResize"`:

- `en.json`: `"toolResize": "Resize"`
- `zh-CN.json`: `"toolResize": "调整尺寸"`
- `ja.json`: `"toolResize": "リサイズ"`
- `ko.json`: `"toolResize": "크기 조정"`
- `es.json`: `"toolResize": "Redimensionar"`

- [ ] **Step 2: Add resize link to footer in `src/app/[locale]/page.tsx`**

Find the footer tools section (around line 622-635 where `toolGrid`, `toolSplit`, `toolAll` links are). Add a resize link after the grid link:

```tsx
<Link
  href="/resize"
  className="hover:text-accent transition-colors duration-500"
>
  {t("footer.toolResize")}
</Link>
```

Insert this `<Link>` right after the existing `/grid` link and before the `#upload` anchor.

- [ ] **Step 3: Verify the page renders**

Run: `bun run dev &` then check `http://localhost:3000/resize` loads.
Expected: Resize editor page renders with upload prompt.

- [ ] **Step 4: Run all tests to confirm nothing is broken**

Run: `bun run vitest run`
Expected: All existing tests pass + new resize tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/[locale]/page.tsx src/messages/en.json src/messages/zh-CN.json src/messages/ja.json src/messages/ko.json src/messages/es.json
git commit -m "feat(resize): add navigation link and footer integration"
```

---

## Coordinate System Reference

Understanding the coordinate system is critical for this feature. There are three coordinate spaces:

```
┌─────────────────────────────────────────┐
│  Stage (container pixel coordinates)     │
│                                         │
│   ┌───────────────────────┐             │
│   │ Artboard              │             │
│   │ (artboard coordinates)│             │
│   │                       │             │
│   │   ┌───────────┐      │             │
│   │   │ Image     │      │             │
│   │   │ (source   │      │             │
│   │   │  px coords)│     │             │
│   │   └───────────┘      │             │
│   └───────────────────────┘             │
└─────────────────────────────────────────┘

Stage coords = artboard coords * viewScale + artboardOffset
Artboard coords = source coords * transform.scale + transform.{x,y}
Source coords = raw image pixels (crop applies here)
```

- **Stage**: The Konva Stage fills the container div. All Konva positions are in stage coords.
- **Artboard**: The virtual canvas at user-defined pixel dimensions. Positioned centered in stage with `viewScale` applied.
- **Source/Image**: The raw image pixels. `transform.crop` selects a subregion. `transform.scale` and `transform.{x,y}` position the (cropped) image on the artboard.
- **Export**: Renders at artboard dimensions (1:1 pixel), ignoring viewScale.
