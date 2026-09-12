# Resize Editor Interaction Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the resize editor to professional quality with viewport zoom/pan, magnetic snap, visual feedback, undo/redo, and status bar.

**Architecture:** Reuse existing `useCanvasViewport` hook for zoom/pan math, `useUndoRedo` for transform history, and `ZoomIndicator` for zoom controls. Add new snap utility (pure, testable) and status bar component. The main change is replacing ResizeCanvas's fixed `viewScale` with the viewport hook's dynamic scale/position.

**Tech Stack:** react-konva (Konva), existing hooks (use-canvas-viewport, use-undo-redo), vitest

---

## File Structure

```
Modified:
  src/components/resize/ResizeCanvas.tsx     — viewport zoom/pan, snap, cursors, checkerboard, drag feedback
  src/components/resize/ResizeEditor.tsx      — keyboard shortcuts, status bar, undo/redo buttons
  src/components/resize/CropOverlay.tsx       — larger handles with cornerRadius
  src/hooks/use-resize-editor.ts              — wrap transform with useUndoRedo
  src/messages/{en,zh-CN,ja,ko,es}.json       — add status bar + undo/redo i18n keys

New:
  src/lib/resize-snap.ts                      — snap calculation (pure function)
  src/lib/__tests__/resize-snap.test.ts       — snap tests
  src/components/resize/ResizeStatusBar.tsx    — bottom status bar
```

---

### Task 1: Snap Utility (TDD)

**Files:**
- Create: `src/lib/resize-snap.ts`
- Create: `src/lib/__tests__/resize-snap.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/__tests__/resize-snap.test.ts`:

```typescript
import { describe, it, expect } from "vitest"
import { calculateSnap, type SnapResult } from "../resize-snap"

describe("calculateSnap", () => {
  const artboard = { width: 500, height: 500 }

  it("should snap image left edge to artboard left edge", () => {
    // Image at x=3, close to 0
    const result = calculateSnap(3, 10, 200, 150, artboard, 8)
    expect(result.snappedX).toBe(0)
    expect(result.guidesX).toContainEqual({ pos: 0, type: "edge" })
  })

  it("should snap image right edge to artboard right edge", () => {
    // Image right edge at x+w = 295+200 = 495, close to 500
    const result = calculateSnap(295, 10, 200, 150, artboard, 8)
    expect(result.snappedX).toBe(300) // 500 - 200
    expect(result.guidesX).toContainEqual({ pos: 500, type: "edge" })
  })

  it("should snap image center to artboard center horizontally", () => {
    // Image center at x+w/2 = 148+200/2 = 248, close to 250
    const result = calculateSnap(148, 10, 200, 150, artboard, 8)
    expect(result.snappedX).toBe(150) // 250 - 200/2
    expect(result.guidesX).toContainEqual({ pos: 250, type: "center" })
  })

  it("should snap image center to artboard center vertically", () => {
    // Image center at y+h/2 = 173+150/2 = 248, close to 250
    const result = calculateSnap(10, 173, 200, 150, artboard, 8)
    expect(result.snappedY).toBe(175) // 250 - 150/2
    expect(result.guidesY).toContainEqual({ pos: 250, type: "center" })
  })

  it("should snap image top edge to artboard top edge", () => {
    const result = calculateSnap(100, 5, 200, 150, artboard, 8)
    expect(result.snappedY).toBe(0)
  })

  it("should snap image bottom edge to artboard bottom edge", () => {
    // Image bottom at y+h = 345+150 = 495, close to 500
    const result = calculateSnap(100, 345, 200, 150, artboard, 8)
    expect(result.snappedY).toBe(350) // 500 - 150
  })

  it("should not snap when outside threshold", () => {
    const result = calculateSnap(50, 50, 200, 150, artboard, 8)
    expect(result.snappedX).toBe(50)
    expect(result.snappedY).toBe(50)
    expect(result.guidesX).toHaveLength(0)
    expect(result.guidesY).toHaveLength(0)
  })

  it("should prefer closest snap when multiple edges match", () => {
    // x=1 snaps to left edge (distance 1), center distance = |1+100-250| = 149
    const result = calculateSnap(1, 100, 200, 150, artboard, 8)
    expect(result.snappedX).toBe(0)
  })

  it("should snap both axes independently", () => {
    const result = calculateSnap(3, 345, 200, 150, artboard, 8)
    expect(result.snappedX).toBe(0)
    expect(result.snappedY).toBe(350)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun run vitest run src/lib/__tests__/resize-snap.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement snap utility**

Create `src/lib/resize-snap.ts`:

```typescript
export interface SnapGuide {
  /** Position in artboard coordinates */
  pos: number
  type: "edge" | "center"
}

export interface SnapResult {
  snappedX: number
  snappedY: number
  guidesX: SnapGuide[]
  guidesY: SnapGuide[]
}

/**
 * Calculate snap positions for an image within an artboard.
 * Tests image left/right/center against artboard left/right/center,
 * and image top/bottom/center against artboard top/bottom/center.
 *
 * All coordinates in artboard space.
 */
export function calculateSnap(
  imageX: number,
  imageY: number,
  imageW: number,
  imageH: number,
  artboard: { width: number; height: number },
  threshold: number
): SnapResult {
  let snappedX = imageX
  let snappedY = imageY
  const guidesX: SnapGuide[] = []
  const guidesY: SnapGuide[] = []

  // --- Horizontal snap ---
  const imgLeft = imageX
  const imgRight = imageX + imageW
  const imgCenterX = imageX + imageW / 2
  const abCenterX = artboard.width / 2

  let bestDx = threshold + 1

  // Left edge → artboard left (0)
  const dLeft = Math.abs(imgLeft - 0)
  if (dLeft < bestDx) {
    bestDx = dLeft
    snappedX = 0
  }

  // Right edge → artboard right
  const dRight = Math.abs(imgRight - artboard.width)
  if (dRight < bestDx) {
    bestDx = dRight
    snappedX = artboard.width - imageW
  }

  // Center → artboard center
  const dCenterX = Math.abs(imgCenterX - abCenterX)
  if (dCenterX < bestDx) {
    bestDx = dCenterX
    snappedX = abCenterX - imageW / 2
  }

  // Generate guides for snapped axis
  if (bestDx <= threshold) {
    if (snappedX === 0) {
      guidesX.push({ pos: 0, type: "edge" })
    } else if (snappedX === artboard.width - imageW) {
      guidesX.push({ pos: artboard.width, type: "edge" })
    } else {
      guidesX.push({ pos: abCenterX, type: "center" })
    }
  } else {
    snappedX = imageX
  }

  // --- Vertical snap ---
  const imgTop = imageY
  const imgBottom = imageY + imageH
  const imgCenterY = imageY + imageH / 2
  const abCenterY = artboard.height / 2

  let bestDy = threshold + 1

  // Top edge → artboard top (0)
  const dTop = Math.abs(imgTop - 0)
  if (dTop < bestDy) {
    bestDy = dTop
    snappedY = 0
  }

  // Bottom edge → artboard bottom
  const dBottom = Math.abs(imgBottom - artboard.height)
  if (dBottom < bestDy) {
    bestDy = dBottom
    snappedY = artboard.height - imageH
  }

  // Center → artboard center
  const dCenterY = Math.abs(imgCenterY - abCenterY)
  if (dCenterY < bestDy) {
    bestDy = dCenterY
    snappedY = abCenterY - imageH / 2
  }

  if (bestDy <= threshold) {
    if (snappedY === 0) {
      guidesY.push({ pos: 0, type: "edge" })
    } else if (snappedY === artboard.height - imageH) {
      guidesY.push({ pos: artboard.height, type: "edge" })
    } else {
      guidesY.push({ pos: abCenterY, type: "center" })
    }
  } else {
    snappedY = imageY
  }

  return { snappedX, snappedY, guidesX, guidesY }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun run vitest run src/lib/__tests__/resize-snap.test.ts`
Expected: All 9 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/resize-snap.ts src/lib/__tests__/resize-snap.test.ts
git commit -m "feat(resize): add snap-to-edge utility with tests"
```

---

### Task 2: Add Undo/Redo to Editor Hook

**Files:**
- Modify: `src/hooks/use-resize-editor.ts`

- [ ] **Step 1: Add undo/redo wrapping**

In `src/hooks/use-resize-editor.ts`, make these changes:

1. Add import for `useUndoRedo`:

```typescript
import { useUndoRedo } from "@/hooks/use-undo-redo"
```

2. In `UseResizeEditorReturn` interface, add after `mimeType: string`:

```typescript
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
```

3. Replace the `transform` state line (line 40-45):

```typescript
  // Old:
  // const [transform, setTransform] = useState<ResizeImageTransform>(...)

  // New:
  const {
    state: transform,
    setState: setTransformWithHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<ResizeImageTransform>({
    initialState: { x: 0, y: 0, scale: 1, crop: null },
  })
```

4. Keep a `setTransform` alias that skips history for drag-move (live updates). Add after the useUndoRedo call:

```typescript
  // For live drag updates (don't pollute undo stack)
  const transformRef = useRef(transform)
  transformRef.current = transform

  // setTransform = record in history (for drag end, transform end, crop apply)
  const setTransform = setTransformWithHistory

  // setTransformLive = skip history (for drag move preview — not used yet but available)
```

5. In the return object, add `undo, redo, canUndo, canRedo`.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `bun run tsc --noEmit --skipLibCheck 2>&1 | grep "use-resize-editor" | head -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-resize-editor.ts
git commit -m "feat(resize): add undo/redo for image transform history"
```

---

### Task 3: Viewport Zoom/Pan + Cursors + Snap in ResizeCanvas

This is the largest task — it replaces the fixed `viewScale` with dynamic viewport zoom/pan, adds wheel zoom, Space+drag pan, cursor management, snap guides, image drag feedback, and checkerboard background.

**Files:**
- Modify: `src/components/resize/ResizeCanvas.tsx`

- [ ] **Step 1: Replace the entire ResizeCanvas.tsx**

Replace `src/components/resize/ResizeCanvas.tsx` with the following complete implementation:

```typescript
"use client"

import { useRef, useCallback, useEffect, useState, useMemo } from "react"
import { Stage, Layer, Rect, Image, Transformer, Group, Line } from "@/lib/konva"
import { useTranslations } from "next-intl"
import { Upload } from "lucide-react"
import { ACCEPTED_TYPES } from "@/lib/upload-utils"
import { calculateSnap, type SnapGuide } from "@/lib/resize-snap"
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
  /** Viewport state from parent */
  viewportScale: number
  viewportPosition: { x: number; y: number }
  onZoomAtPoint: (screenX: number, screenY: number, factor: number) => void
  onPan: (dx: number, dy: number) => void
}

const SNAP_THRESHOLD = 8
const ZOOM_FACTOR = 1.05
const CHECKER_SIZE = 10
const CHECKER_COLOR_1 = "#f0f0f0"
const CHECKER_COLOR_2 = "#ffffff"
const SNAP_LINE_COLOR = "#3b82f6"

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
  viewportScale,
  viewportPosition,
  onZoomAtPoint,
  onPan,
}: ResizeCanvasProps) {
  const t = useTranslations("resize")
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Konva.Stage>(null)
  const imageRef = useRef<Konva.Image>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 })
  const [isDragOver, setIsDragOver] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const isPanningRef = useRef(false)
  const panStartRef = useRef({ x: 0, y: 0 })
  const [snapGuides, setSnapGuides] = useState<{ x: SnapGuide[]; y: SnapGuide[] }>({ x: [], y: [] })
  const [isDraggingImage, setIsDraggingImage] = useState(false)

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

  // Artboard position in stage coordinates
  const artboardX = viewportPosition.x
  const artboardY = viewportPosition.y
  const artboardDisplayW = canvasWidth * viewportScale
  const artboardDisplayH = canvasHeight * viewportScale

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

  // Checkerboard pattern (memoized)
  const checkerboardImage = useMemo(() => {
    if (typeof document === "undefined") return undefined
    const size = CHECKER_SIZE * 2
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")
    if (!ctx) return undefined
    ctx.fillStyle = CHECKER_COLOR_2
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = CHECKER_COLOR_1
    ctx.fillRect(0, 0, CHECKER_SIZE, CHECKER_SIZE)
    ctx.fillRect(CHECKER_SIZE, CHECKER_SIZE, CHECKER_SIZE, CHECKER_SIZE)
    const img = new window.Image()
    img.src = canvas.toDataURL()
    return img
  }, [])

  // --- Space key pan mode ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat && document.activeElement === document.body) {
        e.preventDefault()
        isPanningRef.current = true
        setIsPanning(true)
        if (containerRef.current) containerRef.current.style.cursor = "grab"
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        isPanningRef.current = false
        setIsPanning(false)
        if (containerRef.current) containerRef.current.style.cursor = ""
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // --- Wheel zoom ---
  const handleWheel = useCallback(
    (e: Konva.KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault()
      const stage = stageRef.current
      if (!stage) return
      const pointer = stage.getPointerPosition()
      if (!pointer) return

      if (isPanningRef.current) {
        onPan(-e.evt.deltaX, -e.evt.deltaY)
        return
      }

      const direction = e.evt.deltaY > 0 ? -1 : 1
      const factor = direction > 0 ? ZOOM_FACTOR : 1 / ZOOM_FACTOR
      onZoomAtPoint(pointer.x, pointer.y, factor)
    },
    [onZoomAtPoint, onPan]
  )

  // --- Stage mouse handlers for pan ---
  const handleStageMouseDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (isPanningRef.current) {
        panStartRef.current = { x: e.evt.clientX, y: e.evt.clientY }
        if (containerRef.current) containerRef.current.style.cursor = "grabbing"
      }
    },
    []
  )

  const handleStageMouseMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (isPanningRef.current && e.evt.buttons === 1) {
        const dx = e.evt.clientX - panStartRef.current.x
        const dy = e.evt.clientY - panStartRef.current.y
        panStartRef.current = { x: e.evt.clientX, y: e.evt.clientY }
        onPan(dx, dy)
      }
    },
    [onPan]
  )

  const handleStageMouseUp = useCallback(() => {
    if (isPanningRef.current && containerRef.current) {
      containerRef.current.style.cursor = "grab"
    }
  }, [])

  // --- Click handlers ---
  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (isPanningRef.current) return
      if (e.target === e.target.getStage() || e.target.name() === "artboard" || e.target.name() === "checkerboard") {
        if (mode === "selected") {
          onModeChange("idle")
        }
      }
    },
    [mode, onModeChange]
  )

  const handleImageClick = useCallback(() => {
    if (isPanningRef.current) return
    if (mode === "idle") {
      onModeChange("selected")
    }
  }, [mode, onModeChange])

  const handleImageDblClick = useCallback(() => {
    if (!image || isPanningRef.current) return
    const imgLeft = transform.x
    const imgTop = transform.y
    const imgRight = transform.x + displayW
    const imgBottom = transform.y + displayH

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

  // --- Image drag with snap ---
  const handleImageDragStart = useCallback(() => {
    setIsDraggingImage(true)
    if (containerRef.current) containerRef.current.style.cursor = "grabbing"
  }, [])

  const handleImageDragMove = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      // Convert stage position to artboard coordinates
      const artX = (e.target.x() - artboardX) / viewportScale
      const artY = (e.target.y() - artboardY) / viewportScale

      // Calculate snap in artboard coordinates
      const snap = calculateSnap(
        artX, artY, displayW, displayH,
        { width: canvasWidth, height: canvasHeight },
        SNAP_THRESHOLD / viewportScale
      )

      // Apply snapped position back to stage coordinates
      e.target.x(artboardX + snap.snappedX * viewportScale)
      e.target.y(artboardY + snap.snappedY * viewportScale)

      setSnapGuides({ x: snap.guidesX, y: snap.guidesY })
    },
    [artboardX, artboardY, viewportScale, displayW, displayH, canvasWidth, canvasHeight]
  )

  const handleImageDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      setIsDraggingImage(false)
      setSnapGuides({ x: [], y: [] })
      if (containerRef.current) containerRef.current.style.cursor = ""

      const newX = (e.target.x() - artboardX) / viewportScale
      const newY = (e.target.y() - artboardY) / viewportScale
      onTransformChange({
        ...transform,
        x: newX,
        y: newY,
      })
    },
    [transform, onTransformChange, artboardX, artboardY, viewportScale]
  )

  const handleTransformEnd = useCallback(() => {
    const node = imageRef.current
    if (!node) return

    const scaleX = node.scaleX()
    const newScale = transform.scale * scaleX

    const newX = (node.x() - artboardX) / viewportScale
    const newY = (node.y() - artboardY) / viewportScale

    onTransformChange({
      ...transform,
      x: newX,
      y: newY,
      scale: newScale,
    })

    node.scaleX(1)
    node.scaleY(1)
  }, [transform, onTransformChange, artboardX, artboardY, viewportScale])

  // --- Cursor management ---
  const handleImageMouseEnter = useCallback(() => {
    if (isPanningRef.current || isDraggingImage) return
    if (containerRef.current && mode !== "crop") {
      containerRef.current.style.cursor = "grab"
    }
  }, [mode, isDraggingImage])

  const handleImageMouseLeave = useCallback(() => {
    if (isPanningRef.current || isDraggingImage) return
    if (containerRef.current) {
      containerRef.current.style.cursor = ""
    }
  }, [isDraggingImage])

  // --- File upload handlers ---
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
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false) }}
    >
      {isDragOver && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-accent/10 border-2 border-dashed border-accent pointer-events-none">
          <p className="text-accent text-sm uppercase tracking-wider">{t("uploadHint")}</p>
        </div>
      )}

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

      <Stage
        ref={stageRef}
        width={containerSize.width}
        height={containerSize.height}
        onClick={handleStageClick}
        onWheel={handleWheel}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
      >
        <Layer>
          {/* Artboard shadow (below checkerboard) */}
          <Rect
            name="artboard-shadow"
            x={artboardX}
            y={artboardY}
            width={artboardDisplayW}
            height={artboardDisplayH}
            shadowColor="rgba(0,0,0,0.12)"
            shadowBlur={12}
            shadowOffsetY={3}
            listening={false}
          />

          {/* Checkerboard background */}
          {checkerboardImage && (
            <Rect
              name="checkerboard"
              x={artboardX}
              y={artboardY}
              width={artboardDisplayW}
              height={artboardDisplayH}
              fillPatternImage={checkerboardImage}
              fillPatternScaleX={1}
              fillPatternScaleY={1}
              fillPatternRepeat="repeat"
            />
          )}

          {/* White artboard background */}
          <Rect
            name="artboard"
            x={artboardX}
            y={artboardY}
            width={artboardDisplayW}
            height={artboardDisplayH}
            fill="#ffffff"
          />

          {/* Clipped image group */}
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
                x={artboardX + transform.x * viewportScale}
                y={artboardY + transform.y * viewportScale}
                width={displayW * viewportScale}
                height={displayH * viewportScale}
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
                draggable={mode !== "crop" && !isPanning}
                onClick={handleImageClick}
                onDblClick={handleImageDblClick}
                onDragStart={handleImageDragStart}
                onDragMove={handleImageDragMove}
                onDragEnd={handleImageDragEnd}
                onMouseEnter={handleImageMouseEnter}
                onMouseLeave={handleImageMouseLeave}
                shadowColor={isDraggingImage ? "rgba(0,0,0,0.25)" : undefined}
                shadowBlur={isDraggingImage ? 8 : 0}
                shadowOffsetY={isDraggingImage ? 4 : 0}
              />
            </Group>
          )}

          {/* Transformer */}
          {mode === "selected" && (
            <Transformer
              ref={transformerRef}
              rotateEnabled={false}
              enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
              keepRatio={true}
              anchorSize={8}
              anchorCornerRadius={2}
              anchorFill="#ffffff"
              anchorStroke="#3b82f6"
              anchorStrokeWidth={1.5}
              borderStroke="#3b82f6"
              borderStrokeWidth={1}
              borderDash={[4, 4]}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 20 || newBox.height < 20) return oldBox
                return newBox
              }}
              onTransformEnd={handleTransformEnd}
            />
          )}

          {/* Snap guide lines */}
          {snapGuides.x.map((guide, i) => (
            <Line
              key={`sx-${i}`}
              points={[
                artboardX + guide.pos * viewportScale, artboardY,
                artboardX + guide.pos * viewportScale, artboardY + artboardDisplayH,
              ]}
              stroke={SNAP_LINE_COLOR}
              strokeWidth={1}
              dash={guide.type === "center" ? [4, 4] : undefined}
              listening={false}
            />
          ))}
          {snapGuides.y.map((guide, i) => (
            <Line
              key={`sy-${i}`}
              points={[
                artboardX, artboardY + guide.pos * viewportScale,
                artboardX + artboardDisplayW, artboardY + guide.pos * viewportScale,
              ]}
              stroke={SNAP_LINE_COLOR}
              strokeWidth={1}
              dash={guide.type === "center" ? [4, 4] : undefined}
              listening={false}
            />
          ))}

          {/* Crop overlay */}
          {mode === "crop" && cropRect && image && (
            <CropOverlay
              cropRect={{
                x: artboardX + cropRect.x * viewportScale,
                y: artboardY + cropRect.y * viewportScale,
                width: cropRect.width * viewportScale,
                height: cropRect.height * viewportScale,
              }}
              imageBounds={{
                x: artboardX + transform.x * viewportScale,
                y: artboardY + transform.y * viewportScale,
                width: displayW * viewportScale,
                height: displayH * viewportScale,
              }}
              onCropChange={(displayRect) => {
                onCropRectChange({
                  x: (displayRect.x - artboardX) / viewportScale,
                  y: (displayRect.y - artboardY) / viewportScale,
                  width: displayRect.width / viewportScale,
                  height: displayRect.height / viewportScale,
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

- [ ] **Step 2: Verify no TypeScript errors related to ResizeCanvas**

Run: `bun run tsc --noEmit --skipLibCheck 2>&1 | grep "ResizeCanvas" | head -10`
Expected: Errors about missing new props in ResizeEditor (fixed in Task 5)

- [ ] **Step 3: Commit**

```bash
git add src/components/resize/ResizeCanvas.tsx
git commit -m "feat(resize): add viewport zoom/pan, snap guides, cursors, checkerboard, drag feedback"
```

---

### Task 4: Status Bar + Crop Handle Enhancement

**Files:**
- Create: `src/components/resize/ResizeStatusBar.tsx`
- Modify: `src/components/resize/CropOverlay.tsx` (handle size tweak)

- [ ] **Step 1: Create ResizeStatusBar**

Create `src/components/resize/ResizeStatusBar.tsx`:

```typescript
"use client"

import { useTranslations } from "next-intl"
import type { CropRect } from "@/types"

interface ResizeStatusBarProps {
  imageWidth: number | null
  imageHeight: number | null
  canvasWidth: number
  canvasHeight: number
  zoomPercent: number
  mode: string
  cropRect: CropRect | null
}

export function ResizeStatusBar({
  imageWidth,
  imageHeight,
  canvasWidth,
  canvasHeight,
  zoomPercent,
  mode,
  cropRect,
}: ResizeStatusBarProps) {
  const t = useTranslations("resize")

  return (
    <div className="flex items-center justify-between px-4 py-1.5 border-t border-border bg-background text-[10px] uppercase tracking-wider text-muted-foreground">
      <div className="flex items-center gap-4">
        {imageWidth && imageHeight && (
          <span>
            {t("statusImage")}: {imageWidth} × {imageHeight} {t("px")}
          </span>
        )}
        <span>
          {t("statusCanvas")}: {canvasWidth} × {canvasHeight} {t("px")}
        </span>
        {mode === "crop" && cropRect && (
          <span>
            {t("statusCrop")}: {Math.round(cropRect.width)} × {Math.round(cropRect.height)} {t("px")}
          </span>
        )}
      </div>
      <span>{zoomPercent}%</span>
    </div>
  )
}
```

- [ ] **Step 2: Tweak CropOverlay handle size**

In `src/components/resize/CropOverlay.tsx`, change line 21:

```typescript
// Old:
const HANDLE_SIZE = 10

// New:
const HANDLE_SIZE = 12
```

And add `cornerRadius={2}` to each corner handle Rect (inside the CORNERS.map). Change the Rect to:

```typescript
<Rect
  key={corner}
  x={pos.x - HANDLE_SIZE / 2}
  y={pos.y - HANDLE_SIZE / 2}
  width={HANDLE_SIZE}
  height={HANDLE_SIZE}
  fill={HANDLE_COLOR}
  stroke={HANDLE_STROKE}
  strokeWidth={1.5}
  cornerRadius={2}
  shadowColor="rgba(0,0,0,0.2)"
  shadowBlur={3}
  shadowOffsetY={1}
  draggable
  onDragMove={(e) => handleCornerDrag(corner, e)}
  dragBoundFunc={(pos) => ({
    x: Math.max(
      imageBounds.x - HANDLE_SIZE / 2,
      Math.min(imageBounds.x + imageBounds.width - HANDLE_SIZE / 2, pos.x)
    ),
    y: Math.max(
      imageBounds.y - HANDLE_SIZE / 2,
      Math.min(imageBounds.y + imageBounds.height - HANDLE_SIZE / 2, pos.y)
    ),
  })}
/>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/resize/ResizeStatusBar.tsx src/components/resize/CropOverlay.tsx
git commit -m "feat(resize): add status bar and enhance crop handles"
```

---

### Task 5: Wire Everything in ResizeEditor

**Files:**
- Modify: `src/components/resize/ResizeEditor.tsx`

- [ ] **Step 1: Replace the entire ResizeEditor.tsx**

Replace `src/components/resize/ResizeEditor.tsx` with:

```typescript
"use client"

import { useCallback, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { Download, RotateCcw, ImagePlus, Check, X, Undo2, Redo2 } from "lucide-react"
import { useResizeEditor } from "@/hooks/use-resize-editor"
import { useCanvasViewport } from "@/hooks/use-canvas-viewport"
import { exportArtboard } from "@/lib/resize-export"
import { ACCEPTED_TYPES } from "@/lib/upload-utils"
import { CanvasSizeControl } from "./CanvasSizeControl"
import { ResizeCanvas } from "./ResizeCanvas"
import { ResizeStatusBar } from "./ResizeStatusBar"
import { ZoomIndicator } from "@/components/ZoomIndicator"

export function ResizeEditor() {
  const t = useTranslations("resize")
  const replaceInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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
    undo,
    redo,
    canUndo,
    canRedo,
  } = useResizeEditor()

  // Viewport zoom/pan — treats the artboard as the "image" for the viewport hook
  const viewport = useCanvasViewport({
    containerWidth: containerRef.current?.clientWidth ?? 800,
    containerHeight: containerRef.current?.clientHeight ?? 600,
    imageWidth: canvasSize.width,
    imageHeight: canvasSize.height,
  })

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey

      if (mode === "crop") {
        if (e.key === "Enter") { e.preventDefault(); applyCrop() }
        else if (e.key === "Escape") { e.preventDefault(); cancelCrop() }
        return
      }

      if (e.key === "Escape" && mode === "selected") {
        setMode("idle")
        return
      }

      if (e.key === "Delete" && mode === "selected" && document.activeElement === document.body) {
        clearImage()
        return
      }

      // Zoom shortcuts
      if (isCmd && (e.key === "=" || e.key === "+")) {
        e.preventDefault()
        const cx = (containerRef.current?.clientWidth ?? 800) / 2
        const cy = (containerRef.current?.clientHeight ?? 600) / 2
        viewport.zoomAtPoint(cx, cy, 1.15)
        return
      }
      if (isCmd && e.key === "-") {
        e.preventDefault()
        const cx = (containerRef.current?.clientWidth ?? 800) / 2
        const cy = (containerRef.current?.clientHeight ?? 600) / 2
        viewport.zoomAtPoint(cx, cy, 1 / 1.15)
        return
      }
      if (isCmd && e.key === "0") {
        e.preventDefault()
        viewport.fitToView()
        return
      }

      // Undo/Redo
      if (isCmd && !e.shiftKey && e.key === "z") {
        e.preventDefault()
        undo()
        return
      }
      if (isCmd && e.shiftKey && e.key === "z") {
        e.preventDefault()
        redo()
        return
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mode, applyCrop, cancelCrop, setMode, clearImage, viewport, undo, redo])

  const handleImageFile = useCallback(
    async (file: File) => {
      try {
        await loadImage(file)
      } catch {
        toast.error(t("invalidSize"))
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
          image, transform, canvasSize.width, canvasSize.height, format, quality
        )
        const ext = format === "image/jpeg" ? ".jpg" : ".png"
        const baseName = fileName ? fileName.replace(/\.[^.]+$/, "") : "resized"
        const downloadName = `${baseName}_${canvasSize.width}x${canvasSize.height}${ext}`
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = downloadName
        a.click()
        URL.revokeObjectURL(url)
      } catch {
        toast.error("Export failed. Please try again.")
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

  const handleZoomChange = useCallback(
    (percent: number) => {
      const cx = (containerRef.current?.clientWidth ?? 800) / 2
      const cy = (containerRef.current?.clientHeight ?? 600) / 2
      const targetScale = percent / 100
      const factor = targetScale / viewport.scale
      viewport.zoomAtPoint(cx, cy, factor)
    },
    [viewport]
  )

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border">
        <CanvasSizeControl
          width={canvasSize.width}
          height={canvasSize.height}
          onChange={setCanvasSize}
        />

        <div className="flex items-center gap-2 shrink-0">
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

          {mode !== "crop" && image && (
            <>
              <button
                onClick={undo}
                disabled={!canUndo}
                className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground rounded hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
                title="Undo (Cmd+Z)"
              >
                <Undo2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground rounded hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
                title="Redo (Cmd+Shift+Z)"
              >
                <Redo2 className="h-3.5 w-3.5" />
              </button>
              <div className="w-px h-6 bg-border mx-1" />
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
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
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
          viewportScale={viewport.scale}
          viewportPosition={viewport.position}
          onZoomAtPoint={viewport.zoomAtPoint}
          onPan={viewport.panBy}
        />

        {/* Zoom controls */}
        <ZoomIndicator
          zoomPercent={viewport.zoomPercent}
          onFitToView={viewport.fitToView}
          onResetTo100={viewport.resetTo100}
          onZoomChange={handleZoomChange}
        />
      </div>

      {/* Status bar */}
      <ResizeStatusBar
        imageWidth={image?.naturalWidth ?? null}
        imageHeight={image?.naturalHeight ?? null}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        zoomPercent={viewport.zoomPercent}
        mode={mode}
        cropRect={cropRect}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify build succeeds**

Run: `bun run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/resize/ResizeEditor.tsx
git commit -m "feat(resize): wire viewport, zoom controls, undo/redo, and status bar"
```

---

### Task 6: i18n Keys for Status Bar

**Files:**
- Modify: `src/messages/en.json`
- Modify: `src/messages/zh-CN.json`
- Modify: `src/messages/ja.json`
- Modify: `src/messages/ko.json`
- Modify: `src/messages/es.json`

- [ ] **Step 1: Add status bar keys to all 5 locale files**

In each file, inside the `"resize"` object, add these keys after the existing `"px"` key:

**en.json:**
```json
    "statusImage": "Image",
    "statusCanvas": "Canvas",
    "statusCrop": "Crop"
```

**zh-CN.json:**
```json
    "statusImage": "图片",
    "statusCanvas": "画布",
    "statusCrop": "裁剪"
```

**ja.json:**
```json
    "statusImage": "画像",
    "statusCanvas": "キャンバス",
    "statusCrop": "トリミング"
```

**ko.json:**
```json
    "statusImage": "이미지",
    "statusCanvas": "캔버스",
    "statusCrop": "자르기"
```

**es.json:**
```json
    "statusImage": "Imagen",
    "statusCanvas": "Lienzo",
    "statusCrop": "Recorte"
```

- [ ] **Step 2: Verify JSON validity**

Run: `for f in src/messages/*.json; do python3 -c "import json; json.load(open('$f'))" && echo "$f OK"; done`
Expected: All 5 files OK

- [ ] **Step 3: Commit**

```bash
git add src/messages/en.json src/messages/zh-CN.json src/messages/ja.json src/messages/ko.json src/messages/es.json
git commit -m "feat(resize): add i18n keys for status bar (5 locales)"
```

---

### Task 7: Run All Tests + Final Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run all resize tests**

Run: `bun run vitest run src/lib/__tests__/resize-snap.test.ts src/lib/__tests__/resize-utils.test.ts src/lib/__tests__/resize-export.test.ts`
Expected: All tests pass (9 + 13 + 4 = 26 tests)

- [ ] **Step 2: Run full build**

Run: `bun run build 2>&1 | tail -20`
Expected: Build succeeds, `/resize` page compiles

- [ ] **Step 3: Verify no regressions**

Run: `bun run vitest run`
Expected: All existing tests still pass
