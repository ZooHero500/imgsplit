# Image Compress & Format Convert Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a browser-based image compress & format convert tool to ImgSplit with fusion mode (single preview + auto-switch to batch), 10 pSEO landing pages, and full site integration.

**Architecture:** Standalone `/compress` editor page using `<img>` elements (no Konva) with offscreen canvas `toBlob()` for conversion. Fusion mode: single image shows side-by-side comparison; multiple images auto-switches to batch list with ZIP download. 10 pSEO slugs registered in `slugMeta` with preset URL params linking to editor.

**Tech Stack:** Next.js 16, React 19, next-intl, Canvas API `toBlob()`, JSZip (existing), Tailwind CSS

---

## File Structure

```
src/lib/compress.ts                          — Core compress/convert logic (new)
src/components/compress/CompressEditor.tsx    — Main editor: fusion state machine (new)
src/components/compress/DynamicCompressEditor.tsx — Dynamic import wrapper (new)
src/components/compress/CompressPreview.tsx   — Single-image comparison view (new)
src/components/compress/CompressBatchList.tsx — Batch file list view (new)
src/components/compress/CompressControls.tsx  — Format selector + quality slider (new)
src/app/[locale]/compress/page.tsx           — Page route (new)
src/lib/pseo/index.ts                        — Register 10 new slugs (modify)
src/lib/pseo/en.ts                           — English pSEO data for 10 slugs (modify)
src/lib/pseo/zh-CN.ts                        — Chinese pSEO data (modify)
src/lib/pseo/ja.ts                           — Japanese pSEO data (modify)
src/lib/pseo/ko.ts                           — Korean pSEO data (modify)
src/lib/pseo/es.ts                           — Spanish pSEO data (modify)
src/messages/en.json                         — English i18n keys (modify)
src/messages/zh-CN.json                      — Chinese i18n keys (modify)
src/messages/ja.json                         — Japanese i18n keys (modify)
src/messages/ko.json                         — Korean i18n keys (modify)
src/messages/es.json                         — Spanish i18n keys (modify)
src/app/[locale]/tools/page.tsx              — Add Compress to Tools Hub + footer (modify)
src/app/[locale]/[toolSlug]/page.tsx         — Add Compress to footer (modify)
src/app/[locale]/page.tsx                    — Add Compress to homepage footer (modify)
```

---

### Task 1: Core Compress/Convert Library

**Files:**
- Create: `src/lib/compress.ts`

- [ ] **Step 1: Create the compress utility module**

```typescript
// src/lib/compress.ts

export type OutputFormat = "image/png" | "image/jpeg" | "image/webp"

export interface CompressResult {
  blob: Blob
  originalSize: number
  compressedSize: number
  savedPercent: number
  format: OutputFormat
  width: number
  height: number
}

/**
 * Compress/convert an image using offscreen canvas.
 * Draws the image at original dimensions onto a canvas,
 * then exports via toBlob with the target format and quality.
 */
export async function compressImage(
  image: HTMLImageElement,
  originalFile: File,
  format: OutputFormat,
  quality: number // 0.1 - 1.0
): Promise<CompressResult> {
  const canvas = document.createElement("canvas")
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  const ctx = canvas.getContext("2d")!

  // White background for JPEG (no transparency support)
  if (format === "image/jpeg") {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.drawImage(image, 0, 0)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      format,
      format === "image/png" ? undefined : quality
    )
  })

  const savedPercent =
    originalFile.size > 0
      ? Math.round((1 - blob.size / originalFile.size) * 100)
      : 0

  return {
    blob,
    originalSize: originalFile.size,
    compressedSize: blob.size,
    savedPercent,
    format,
    width: image.naturalWidth,
    height: image.naturalHeight,
  }
}

/** Map OutputFormat to file extension */
export function formatToExtension(format: OutputFormat): string {
  const map: Record<OutputFormat, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  }
  return map[format]
}

/** Format bytes to human-readable string */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Strip file extension and return base name */
export function getBaseName(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "")
}
```

- [ ] **Step 2: Verify the module compiles**

Run: `bunx tsc --noEmit src/lib/compress.ts`

If there are import issues (isolated module), just verify no syntax errors by running:
```bash
bun run build 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/compress.ts
git commit -m "feat(compress): add core compress/convert library"
```

---

### Task 2: CompressControls Component

**Files:**
- Create: `src/components/compress/CompressControls.tsx`
- Modify: `src/messages/en.json` — add `compress` namespace

- [ ] **Step 1: Add i18n keys for compress tool to `src/messages/en.json`**

Add a `"compress"` key at the top level of the JSON, after the `"resize"` section:

```json
"compress": {
  "metadata": {
    "title": "Image Compressor & Format Converter — Free Online Tool | ImgSplit",
    "description": "Compress images and convert between PNG, JPEG, WebP formats online. Free, private, 100% browser-based — your files never leave your device."
  },
  "loadingEditor": "Loading editor...",
  "uploadTitle": "Compress & Convert",
  "formatPng": "PNG",
  "formatJpeg": "JPEG",
  "formatWebp": "WebP",
  "quality": "Quality",
  "download": "Download",
  "downloadZip": "Download ZIP",
  "original": "Original",
  "compressed": "Compressed",
  "saved": "saved",
  "filesCount": "{count} files",
  "totalSaved": "Total saved: {size} ({percent}%)",
  "addMore": "Add more images",
  "changeImage": "Change",
  "processing": "Processing...",
  "ready": "Ready"
}
```

- [ ] **Step 2: Create CompressControls component**

```typescript
// src/components/compress/CompressControls.tsx
"use client"

import { useTranslations } from "next-intl"
import type { OutputFormat } from "@/lib/compress"

interface CompressControlsProps {
  format: OutputFormat
  quality: number
  onFormatChange: (format: OutputFormat) => void
  onQualityChange: (quality: number) => void
  downloadLabel: string
  onDownload: () => void
  onAddMore?: () => void
  showAddMore?: boolean
}

const FORMAT_OPTIONS: { value: OutputFormat; labelKey: string }[] = [
  { value: "image/png", labelKey: "formatPng" },
  { value: "image/jpeg", labelKey: "formatJpeg" },
  { value: "image/webp", labelKey: "formatWebp" },
]

export function CompressControls({
  format,
  quality,
  onFormatChange,
  onQualityChange,
  downloadLabel,
  onDownload,
  onAddMore,
  showAddMore = false,
}: CompressControlsProps) {
  const t = useTranslations("compress")
  const showQuality = format !== "image/png"

  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6 p-4 bg-card border border-border rounded-lg">
      {/* Format selector */}
      <div className="flex gap-1">
        {FORMAT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFormatChange(opt.value)}
            className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 ${
              format === opt.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(opt.labelKey)}
          </button>
        ))}
      </div>

      {/* Quality slider */}
      {showQuality && (
        <div className="flex items-center gap-3 flex-1 min-w-[160px]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground shrink-0">
            {t("quality")}
          </span>
          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="flex-1 h-1 accent-primary cursor-pointer"
          />
          <span className="text-xs tabular-nums text-muted-foreground w-8 text-right">
            {quality}%
          </span>
        </div>
      )}

      {/* Download button */}
      <button
        onClick={onDownload}
        className="ml-auto px-5 py-2 bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity duration-300 press"
      >
        {downloadLabel}
      </button>

      {/* Add more */}
      {showAddMore && onAddMore && (
        <button
          onClick={onAddMore}
          className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-300"
        >
          + {t("addMore")}
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/compress/CompressControls.tsx src/messages/en.json
git commit -m "feat(compress): add CompressControls component and i18n keys"
```

---

### Task 3: CompressPreview Component (Single Image Mode)

**Files:**
- Create: `src/components/compress/CompressPreview.tsx`

- [ ] **Step 1: Create CompressPreview component**

```typescript
// src/components/compress/CompressPreview.tsx
"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { formatFileSize } from "@/lib/compress"
import type { CompressResult } from "@/lib/compress"

interface CompressPreviewProps {
  originalFile: File
  originalUrl: string
  result: CompressResult | null
  resultUrl: string | null
}

export function CompressPreview({
  originalFile,
  originalUrl,
  result,
  resultUrl,
}: CompressPreviewProps) {
  const t = useTranslations("compress")

  const originalFormatLabel = useMemo(() => {
    const map: Record<string, string> = {
      "image/png": "PNG",
      "image/jpeg": "JPEG",
      "image/webp": "WebP",
    }
    return map[originalFile.type] ?? "IMG"
  }, [originalFile.type])

  return (
    <div className="flex-1 grid grid-cols-2 gap-4 p-4 min-h-0">
      {/* Original */}
      <div className="flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("original")}
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
            {originalFormatLabel}
          </span>
          <span className="ml-auto text-xs tabular-nums text-muted-foreground">
            {formatFileSize(originalFile.size)}
          </span>
        </div>
        <div className="flex-1 bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center min-h-0">
          <img
            src={originalUrl}
            alt="Original"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Compressed */}
      <div className="flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("compressed")}
          </span>
          {result && (
            <>
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
                {result.format === "image/png" ? "PNG" : result.format === "image/jpeg" ? "JPEG" : "WebP"}
              </span>
              <span className="ml-auto text-xs tabular-nums text-accent">
                {formatFileSize(result.compressedSize)}
                {result.savedPercent > 0 && (
                  <span className="ml-1 text-[10px]">↓{result.savedPercent}%</span>
                )}
              </span>
            </>
          )}
        </div>
        <div className="flex-1 bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center min-h-0">
          {resultUrl ? (
            <img
              src={resultUrl}
              alt="Compressed"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <span className="text-xs text-muted-foreground">{t("processing")}</span>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/compress/CompressPreview.tsx
git commit -m "feat(compress): add CompressPreview single-image comparison"
```

---

### Task 4: CompressBatchList Component (Batch Mode)

**Files:**
- Create: `src/components/compress/CompressBatchList.tsx`

- [ ] **Step 1: Create CompressBatchList component**

```typescript
// src/components/compress/CompressBatchList.tsx
"use client"

import { useTranslations } from "next-intl"
import { formatFileSize } from "@/lib/compress"
import type { CompressResult } from "@/lib/compress"
import { X } from "lucide-react"

export interface BatchItem {
  id: string
  file: File
  image: HTMLImageElement
  result: CompressResult | null
}

interface CompressBatchListProps {
  items: BatchItem[]
  onRemove: (id: string) => void
  onAddMore: () => void
}

export function CompressBatchList({
  items,
  onRemove,
  onAddMore,
}: CompressBatchListProps) {
  const t = useTranslations("compress")

  const totalOriginal = items.reduce((s, i) => s + i.file.size, 0)
  const totalCompressed = items.reduce(
    (s, i) => s + (i.result?.compressedSize ?? i.file.size),
    0
  )
  const totalSaved = totalOriginal - totalCompressed
  const totalPercent =
    totalOriginal > 0 ? Math.round((totalSaved / totalOriginal) * 100) : 0

  const allReady = items.every((i) => i.result !== null)

  return (
    <div className="flex-1 flex flex-col min-h-0 p-4 gap-3">
      {/* File list */}
      <div className="flex-1 overflow-y-auto space-y-1 min-h-0">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-3 px-3 py-2.5 bg-card border border-border rounded hover:border-primary/30 transition-colors"
          >
            <span className="text-xs text-foreground truncate flex-1 min-w-0">
              {item.file.name}
            </span>
            <span className="text-[11px] tabular-nums text-muted-foreground shrink-0">
              {formatFileSize(item.file.size)}
            </span>
            <span className="text-[11px] text-muted-foreground shrink-0">→</span>
            {item.result ? (
              <>
                <span className="text-[11px] tabular-nums text-accent shrink-0">
                  {formatFileSize(item.result.compressedSize)}
                </span>
                <span className="text-[10px] tabular-nums text-accent shrink-0">
                  ↓{item.result.savedPercent}%
                </span>
                <span className="text-accent text-xs shrink-0">✓</span>
              </>
            ) : (
              <span className="text-[11px] text-muted-foreground shrink-0 animate-pulse">
                {t("processing")}
              </span>
            )}
            <button
              onClick={() => onRemove(item.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {/* Add more drop zone */}
        <button
          onClick={onAddMore}
          className="w-full py-3 border border-dashed border-border rounded text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:border-primary/40 hover:text-accent transition-colors duration-300"
        >
          + {t("addMore")}
        </button>
      </div>

      {/* Summary bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/30 rounded text-xs text-muted-foreground">
        <span>{t("filesCount", { count: items.length })}</span>
        {allReady && totalSaved > 0 && (
          <span>
            {t("totalSaved", {
              size: formatFileSize(totalSaved),
              percent: String(totalPercent),
            })}
          </span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/compress/CompressBatchList.tsx
git commit -m "feat(compress): add CompressBatchList batch file list"
```

---

### Task 5: CompressEditor — Main Fusion Component

**Files:**
- Create: `src/components/compress/CompressEditor.tsx`
- Create: `src/components/compress/DynamicCompressEditor.tsx`

- [ ] **Step 1: Create the main CompressEditor**

```typescript
// src/components/compress/CompressEditor.tsx
"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { UploadZone } from "@/components/UploadZone"
import { CompressPreview } from "./CompressPreview"
import { CompressBatchList } from "./CompressBatchList"
import type { BatchItem } from "./CompressBatchList"
import { CompressControls } from "./CompressControls"
import {
  compressImage,
  formatToExtension,
  formatFileSize,
  getBaseName,
} from "@/lib/compress"
import type { OutputFormat, CompressResult } from "@/lib/compress"
import type { UploadResult } from "@/types"
import { Link } from "@/i18n/navigation"
import { LogoIcon } from "@/components/LogoIcon"
import { LocaleSwitcher } from "@/components/LocaleSwitcher"

let nextId = 0
function genId() {
  return `ci-${++nextId}`
}

export function CompressEditor() {
  const t = useTranslations("compress")
  const searchParams = useSearchParams()

  // Read presets from URL params
  const initialFormat = ((): OutputFormat => {
    const f = searchParams.get("format")
    if (f === "png") return "image/png"
    if (f === "jpeg" || f === "jpg") return "image/jpeg"
    if (f === "webp") return "image/webp"
    return "image/webp"
  })()
  const initialQuality = (() => {
    const q = searchParams.get("quality")
    if (q) {
      const n = parseInt(q, 10)
      if (n >= 10 && n <= 100) return n
    }
    return 80
  })()

  const [format, setFormat] = useState<OutputFormat>(initialFormat)
  const [quality, setQuality] = useState(initialQuality)
  const [items, setItems] = useState<BatchItem[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isSingle = items.length === 1
  const isBatch = items.length > 1

  // --- Compress all items when format/quality changes ---
  const compressAll = useCallback(
    async (targetItems: BatchItem[], fmt: OutputFormat, q: number) => {
      const promises = targetItems.map(async (item) => {
        const result = await compressImage(item.image, item.file, fmt, q / 100)
        return { id: item.id, result }
      })

      const results = await Promise.all(promises)
      setItems((prev) =>
        prev.map((item) => {
          const found = results.find((r) => r.id === item.id)
          return found ? { ...item, result: found.result } : item
        })
      )
    },
    []
  )

  // Re-compress when format or quality changes
  useEffect(() => {
    if (items.length > 0) {
      compressAll(items, format, quality)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, quality])

  // --- Upload handlers ---
  const handleImagesLoaded = useCallback(
    (results: UploadResult[]) => {
      const newItems: BatchItem[] = results.map((r) => ({
        id: genId(),
        file: r.file,
        image: r.image,
        result: null,
      }))

      setItems((prev) => {
        const merged = [...prev, ...newItems]
        // Trigger compress for new items after state update
        setTimeout(() => compressAll(newItems, format, quality), 0)
        return merged
      })
    },
    [format, quality, compressAll]
  )

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const handleAddMore = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleAddMoreFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return
      const files = Array.from(e.target.files)

      // Reuse upload-utils validation
      import("@/lib/upload-utils").then(({ validateFiles, loadImage }) => {
        const validation = validateFiles(
          files,
          items.reduce((s, i) => s + i.file.size, 0)
        )
        if (!validation.valid) return

        Promise.all(
          validation.files.map(async (f) => {
            const img = await loadImage(f)
            return { file: f, image: img, mimeType: f.type } as UploadResult
          })
        ).then(handleImagesLoaded)
      })

      e.target.value = ""
    },
    [items, handleImagesLoaded]
  )

  // --- Download ---
  const handleDownload = useCallback(async () => {
    if (isSingle && items[0]?.result) {
      const { result, file } = items[0]
      const ext = formatToExtension(result.format)
      const url = URL.createObjectURL(result.blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${getBaseName(file.name)}.${ext}`
      a.click()
      URL.revokeObjectURL(url)
    } else if (isBatch) {
      const readyItems = items.filter((i) => i.result)
      if (readyItems.length === 0) return

      const { default: JSZip } = await import("jszip")
      const zip = new JSZip()
      for (const item of readyItems) {
        const ext = formatToExtension(item.result!.format)
        zip.file(`${getBaseName(item.file.name)}.${ext}`, item.result!.blob)
      }
      const blob = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "compressed_images.zip"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [items, isSingle, isBatch])

  // --- Object URLs for single preview ---
  const [originalUrl, setOriginalUrl] = useState<string>("")
  const [resultUrl, setResultUrl] = useState<string>("")

  useEffect(() => {
    if (isSingle) {
      const url = URL.createObjectURL(items[0].file)
      setOriginalUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setOriginalUrl("")
  }, [isSingle, items])

  useEffect(() => {
    if (isSingle && items[0]?.result) {
      const url = URL.createObjectURL(items[0].result.blob)
      setResultUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setResultUrl("")
  }, [isSingle, items])

  // --- Download label ---
  const downloadLabel = (() => {
    if (isSingle && items[0]?.result) {
      const ext = formatToExtension(items[0].result.format).toUpperCase()
      return `${t("download")} ${ext} (${formatFileSize(items[0].result.compressedSize)})`
    }
    if (isBatch) return t("downloadZip")
    return t("download")
  })()

  // --- Change image (single mode) ---
  const handleChangeImage = useCallback(() => {
    setItems([])
  }, [])

  // --- Render ---
  const hasImages = items.length > 0

  return (
    <>
      {/* Hidden file input for add-more */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={handleAddMoreFiles}
      />

      {/* Nav */}
      <nav className="shrink-0 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <LogoIcon className="h-3.5 w-3.5 text-foreground" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium">
                ImgSplit
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Split</Link>
              <Link href="/grid" className="hover:text-foreground transition-colors">Grid</Link>
              <Link href="/resize" className="hover:text-foreground transition-colors">Resize</Link>
              <span className="text-foreground font-medium">Compress</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasImages && (
              <button
                onClick={handleChangeImage}
                className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors"
              >
                {t("changeImage")}
              </button>
            )}
            <LocaleSwitcher variant="compact" />
          </div>
        </div>
      </nav>

      {/* Content */}
      {!hasImages ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <UploadZone onImagesLoaded={handleImagesLoaded} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          {isSingle ? (
            <CompressPreview
              originalFile={items[0].file}
              originalUrl={originalUrl}
              result={items[0].result}
              resultUrl={resultUrl}
            />
          ) : (
            <CompressBatchList
              items={items}
              onRemove={handleRemove}
              onAddMore={handleAddMore}
            />
          )}

          <div className="shrink-0 p-4">
            <CompressControls
              format={format}
              quality={quality}
              onFormatChange={setFormat}
              onQualityChange={setQuality}
              downloadLabel={downloadLabel}
              onDownload={handleDownload}
              onAddMore={handleAddMore}
              showAddMore={isSingle}
            />
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Create DynamicCompressEditor wrapper**

```typescript
// src/components/compress/DynamicCompressEditor.tsx
"use client"

import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

function EditorLoading() {
  const t = useTranslations("compress")
  return (
    <div className="flex items-center justify-center h-64 text-muted-foreground">
      {t("loadingEditor")}
    </div>
  )
}

export const DynamicCompressEditor = dynamic(
  () =>
    import("./CompressEditor").then((mod) => ({
      default: mod.CompressEditor,
    })),
  {
    ssr: false,
    loading: () => <EditorLoading />,
  }
)
```

- [ ] **Step 3: Commit**

```bash
git add src/components/compress/CompressEditor.tsx src/components/compress/DynamicCompressEditor.tsx
git commit -m "feat(compress): add CompressEditor with fusion mode"
```

---

### Task 6: Compress Page Route

**Files:**
- Create: `src/app/[locale]/compress/page.tsx`

- [ ] **Step 1: Create the page route**

```typescript
// src/app/[locale]/compress/page.tsx
import { setRequestLocale } from "next-intl/server"
import { getTranslations } from "next-intl/server"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import type { Metadata } from "next"
import { DynamicCompressEditor } from "@/components/compress/DynamicCompressEditor"
import { JsonLd } from "@/components/JsonLd"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imgsplit.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "compress.metadata" })

  const canonicalUrl =
    locale === routing.defaultLocale
      ? `${BASE_URL}/compress`
      : `${BASE_URL}/${locale}/compress`

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
              ? `${BASE_URL}/compress`
              : `${BASE_URL}/${l}/compress`,
          ])
        ),
        "x-default": `${BASE_URL}/compress`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "ImgSplit",
      type: "website",
      locale: locale === "zh-CN" ? "zh_CN" : locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function CompressPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "compress.metadata" })

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ImgSplit Image Compressor",
          url: `${BASE_URL}/compress`,
          description: t("description"),
          applicationCategory: "DesignApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "Image compression with quality control",
            "Format conversion between PNG, JPEG, WebP",
            "Real-time before/after comparison",
            "Batch processing with ZIP download",
            "100% browser-based, no upload",
          ],
        }}
      />
      <DynamicCompressEditor />
    </main>
  )
}
```

- [ ] **Step 2: Verify page loads**

```bash
bun run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/compress
```

Expected: `200`

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/compress/page.tsx
git commit -m "feat(compress): add /compress page route"
```

---

### Task 7: i18n — All 5 Languages

**Files:**
- Modify: `src/messages/zh-CN.json`
- Modify: `src/messages/ja.json`
- Modify: `src/messages/ko.json`
- Modify: `src/messages/es.json`

- [ ] **Step 1: Add `compress` namespace to `src/messages/zh-CN.json`**

```json
"compress": {
  "metadata": {
    "title": "图片压缩 & 格式转换 — 免费在线工具 | ImgSplit",
    "description": "在线压缩图片，PNG、JPEG、WebP 格式互转。免费、隐私安全、100% 浏览器端处理——文件不会离开你的设备。"
  },
  "loadingEditor": "加载编辑器...",
  "uploadTitle": "压缩 & 转换",
  "formatPng": "PNG",
  "formatJpeg": "JPEG",
  "formatWebp": "WebP",
  "quality": "质量",
  "download": "下载",
  "downloadZip": "下载 ZIP",
  "original": "原图",
  "compressed": "压缩后",
  "saved": "已节省",
  "filesCount": "{count} 个文件",
  "totalSaved": "总计节省: {size} ({percent}%)",
  "addMore": "添加更多图片",
  "changeImage": "换一张",
  "processing": "处理中...",
  "ready": "就绪"
}
```

- [ ] **Step 2: Add `compress` namespace to `src/messages/ja.json`**

```json
"compress": {
  "metadata": {
    "title": "画像圧縮 & フォーマット変換 — 無料オンラインツール | ImgSplit",
    "description": "オンラインで画像を圧縮し、PNG、JPEG、WebP形式間で変換。無料・プライバシー安全・100%ブラウザ処理。"
  },
  "loadingEditor": "エディタを読み込み中...",
  "uploadTitle": "圧縮 & 変換",
  "formatPng": "PNG",
  "formatJpeg": "JPEG",
  "formatWebp": "WebP",
  "quality": "品質",
  "download": "ダウンロード",
  "downloadZip": "ZIPでダウンロード",
  "original": "元画像",
  "compressed": "圧縮後",
  "saved": "削減",
  "filesCount": "{count}ファイル",
  "totalSaved": "合計削減: {size} ({percent}%)",
  "addMore": "画像を追加",
  "changeImage": "変更",
  "processing": "処理中...",
  "ready": "完了"
}
```

- [ ] **Step 3: Add `compress` namespace to `src/messages/ko.json`**

```json
"compress": {
  "metadata": {
    "title": "이미지 압축 & 포맷 변환 — 무료 온라인 도구 | ImgSplit",
    "description": "온라인으로 이미지를 압축하고 PNG, JPEG, WebP 형식 간 변환하세요. 무료, 개인정보 보호, 100% 브라우저 기반."
  },
  "loadingEditor": "에디터 로딩 중...",
  "uploadTitle": "압축 & 변환",
  "formatPng": "PNG",
  "formatJpeg": "JPEG",
  "formatWebp": "WebP",
  "quality": "품질",
  "download": "다운로드",
  "downloadZip": "ZIP 다운로드",
  "original": "원본",
  "compressed": "압축 후",
  "saved": "절약",
  "filesCount": "{count}개 파일",
  "totalSaved": "총 절약: {size} ({percent}%)",
  "addMore": "이미지 추가",
  "changeImage": "변경",
  "processing": "처리 중...",
  "ready": "완료"
}
```

- [ ] **Step 4: Add `compress` namespace to `src/messages/es.json`**

```json
"compress": {
  "metadata": {
    "title": "Compresor de Imágenes & Convertidor de Formato — Herramienta Gratis | ImgSplit",
    "description": "Comprime imágenes y convierte entre formatos PNG, JPEG, WebP en línea. Gratis, privado, 100% en el navegador."
  },
  "loadingEditor": "Cargando editor...",
  "uploadTitle": "Comprimir & Convertir",
  "formatPng": "PNG",
  "formatJpeg": "JPEG",
  "formatWebp": "WebP",
  "quality": "Calidad",
  "download": "Descargar",
  "downloadZip": "Descargar ZIP",
  "original": "Original",
  "compressed": "Comprimido",
  "saved": "ahorrado",
  "filesCount": "{count} archivos",
  "totalSaved": "Total ahorrado: {size} ({percent}%)",
  "addMore": "Añadir más imágenes",
  "changeImage": "Cambiar",
  "processing": "Procesando...",
  "ready": "Listo"
}
```

- [ ] **Step 5: Commit**

```bash
git add src/messages/zh-CN.json src/messages/ja.json src/messages/ko.json src/messages/es.json
git commit -m "feat(compress): add i18n translations for 4 additional languages"
```

---

### Task 8: pSEO — Register Slugs and Create English Data

**Files:**
- Modify: `src/lib/pseo/index.ts`
- Modify: `src/lib/pseo/en.ts`

- [ ] **Step 1: Register 10 new slugs in `src/lib/pseo/index.ts`**

Add 10 entries to the `slugMeta` array, after the existing `"grid-maker"` entry:

```typescript
  { slug: "compress-image", category: "use-case" },
  { slug: "compress-jpeg", category: "use-case" },
  { slug: "compress-png", category: "use-case" },
  { slug: "png-to-webp", category: "use-case" },
  { slug: "png-to-jpg", category: "use-case" },
  { slug: "jpg-to-png", category: "use-case" },
  { slug: "jpg-to-webp", category: "use-case" },
  { slug: "webp-to-png", category: "use-case" },
  { slug: "webp-to-jpg", category: "use-case" },
  { slug: "reduce-image-size", category: "use-case" },
```

- [ ] **Step 2: Add all 10 tool data objects to `src/lib/pseo/en.ts`**

Add inside the `data` object, after the last existing entry. Each entry follows the `ToolPageData` interface. Create all 10 with appropriate SEO titles, descriptions, hero sections, scenarios, how-to steps, FAQ entries, and related tools.

The CTA on each landing page currently uses `SmartCTA` which scrolls to `#upload`. For compress tools, the `relatedTools` should link to `/compress?format=xxx&quality=xxx` so users discover the editor. The main CTA flow (via `SmartCTA`) scrolls to the upload section on the current landing page — this is acceptable for now and follows the existing pattern.

Each tool entry needs: `slug`, `category`, `seo`, `hero`, `scenarios` (2 items), `howToSteps` (3 items), `faqEntries` (3 items), `relatedTools` (3-4 items linking to other compress slugs + existing tools).

Example for the first slug — replicate this pattern for all 10:

```typescript
"compress-image": {
  slug: "compress-image",
  category: "use-case",
  seo: {
    title: "Compress Images Online — Free & Private | ImgSplit",
    description: "Reduce image file size without visible quality loss. Free online compressor for PNG, JPEG, WebP — 100% browser-based, no upload to servers.",
    ogTitle: "Compress Images Online — Free Tool",
    ogDescription: "Reduce image file size instantly in your browser. No upload needed.",
  },
  hero: {
    overline: "Image Compressor",
    headlinePart1: "Compress",
    headlineAccent: "Images",
    headlinePart2: "— Instantly",
    description: "Reduce image file size with adjustable quality. Compare original vs compressed side by side. Free, private, and entirely in your browser.",
  },
  scenarios: [
    {
      icon: "FileDown",
      title: "Optimize for Web",
      description: "Reduce image sizes for faster website loading without visible quality loss. Perfect for blogs, e-commerce, and portfolios.",
    },
    {
      icon: "Mail",
      title: "Email-Ready Photos",
      description: "Shrink photos to fit email attachment limits. Compress multiple images at once and download as a ZIP.",
    },
  ],
  howToSteps: [
    { stepNumber: 1, title: "Upload Your Image", description: "Drag and drop or click to upload any PNG, JPEG, or WebP image." },
    { stepNumber: 2, title: "Adjust Quality", description: "Choose the output format and drag the quality slider. See the compressed file size update in real time." },
    { stepNumber: 3, title: "Download", description: "Download the compressed image. For multiple images, get them all in a single ZIP file." },
  ],
  faqEntries: [
    { question: "Does compression reduce image quality?", answer: "You control the tradeoff. The quality slider lets you balance between file size and visual quality. At 80%, most images look identical to the original." },
    { question: "Is my image uploaded to a server?", answer: "No. All compression happens entirely in your browser using the Canvas API. Your files never leave your device." },
    { question: "Can I compress multiple images at once?", answer: "Yes. Upload multiple images and they will all be compressed with the same settings. Download them as a single ZIP file." },
  ],
  relatedTools: [
    { slug: "/compress?format=webp&quality=80", title: "Convert to WebP", description: "Convert images to WebP format for maximum compression." },
    { slug: "/compress?format=jpeg&quality=75", title: "Compress JPEG", description: "Reduce JPEG file size with adjustable quality." },
    { slug: "/resize", title: "Image Resizer", description: "Resize images to exact dimensions for any platform." },
    { slug: "/", title: "Image Splitter", description: "Split images with drag-and-drop precision." },
  ],
},
```

Repeat for all 10 slugs with tailored content. Each slug's `relatedTools` should cross-link to other compress variants and existing tools.

- [ ] **Step 3: Verify build passes**

```bash
bun run build 2>&1 | tail -5
```

Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/lib/pseo/index.ts src/lib/pseo/en.ts
git commit -m "feat(compress): register 10 pSEO slugs with English data"
```

---

### Task 9: pSEO — 4 Additional Languages

**Files:**
- Modify: `src/lib/pseo/zh-CN.ts`
- Modify: `src/lib/pseo/ja.ts`
- Modify: `src/lib/pseo/ko.ts`
- Modify: `src/lib/pseo/es.ts`

- [ ] **Step 1: Add 10 tool data objects to `src/lib/pseo/zh-CN.ts`**

Translate all 10 tool entries to Chinese. Same structure as English, with localized content for SEO titles, descriptions, hero text, scenarios, how-to steps, FAQ, and related tools. Related tool `slug` paths stay in English (they are URL paths).

- [ ] **Step 2: Add 10 tool data objects to `src/lib/pseo/ja.ts`**

Translate to Japanese.

- [ ] **Step 3: Add 10 tool data objects to `src/lib/pseo/ko.ts`**

Translate to Korean.

- [ ] **Step 4: Add 10 tool data objects to `src/lib/pseo/es.ts`**

Translate to Spanish.

- [ ] **Step 5: Verify build passes**

```bash
bun run build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/pseo/zh-CN.ts src/lib/pseo/ja.ts src/lib/pseo/ko.ts src/lib/pseo/es.ts
git commit -m "feat(compress): add pSEO data for zh-CN, ja, ko, es"
```

---

### Task 10: Site Integration — Footer, Tools Hub, Navigation

**Files:**
- Modify: `src/app/[locale]/tools/page.tsx`
- Modify: `src/messages/en.json` — add footer key
- Modify: `src/messages/zh-CN.json` — add footer key
- Modify: `src/messages/ja.json` — add footer key
- Modify: `src/messages/ko.json` — add footer key
- Modify: `src/messages/es.json` — add footer key

- [ ] **Step 1: Add footer translation keys to all 5 locale files**

In each `src/messages/{locale}.json`, add to the `"footer"` object:

English: `"toolCompress": "Compress"`
Chinese: `"toolCompress": "压缩"`
Japanese: `"toolCompress": "圧縮"`
Korean: `"toolCompress": "압축"`
Spanish: `"toolCompress": "Comprimir"`

Also add to the `"toolsHub"` section of each locale:

English: `"existingToolCompress": "Image Compressor", "existingToolCompressDesc": "Compress images and convert between PNG, JPEG, and WebP formats."`

(And equivalent translations for other locales)

- [ ] **Step 2: Add Compress tool card to Tools Hub existing tools section**

In `src/app/[locale]/tools/page.tsx`, find the section with `existingToolGrid`, `existingToolResize` and add after the Resize ToolCard:

```tsx
<ToolCard
  title={t("existingToolCompress")}
  description={t("existingToolCompressDesc")}
  href="/compress"
/>
```

- [ ] **Step 3: Add Compress link to footer in Tools Hub**

In `src/app/[locale]/tools/page.tsx`, find the footer tools section (around line 334-358) and add a Compress link after the Resize link:

```tsx
<Link
  href="/compress"
  className="hover:text-accent transition-colors duration-500"
>
  {tFooter("toolCompress")}
</Link>
```

- [ ] **Step 4: Add Compress link to footer in `[toolSlug]/page.tsx`**

In `src/app/[locale]/[toolSlug]/page.tsx`, add `toolCompress: tFooter("toolCompress"),` to the footer translations object (around line 106), and add the corresponding `<Link>` in `ToolLanding.tsx`'s footer section.

- [ ] **Step 5: Add Compress to JSON-LD ItemList in Tools Hub**

In `src/app/[locale]/tools/page.tsx`, add to the `itemListElement` array:

```typescript
{ "@type": "ListItem", position: 13, name: "Image Compressor", url: `${BASE_URL}/compress` },
```

- [ ] **Step 6: Verify build and all pages render**

```bash
bun run build 2>&1 | tail -10
```

- [ ] **Step 7: Commit**

```bash
git add src/app/[locale]/tools/page.tsx src/app/[locale]/[toolSlug]/page.tsx src/messages/*.json
git commit -m "feat(compress): integrate into Tools Hub, footer, and navigation"
```

---

### Task 11: Smoke Test & Progress Update

- [ ] **Step 1: Run full build**

```bash
bun run build
```

Verify: no errors, all pages generate including `/compress` and 10 new pSEO slugs × 5 locales = 50 new static pages.

- [ ] **Step 2: Manual smoke test**

```bash
bun run dev
```

Test these flows:
1. Navigate to `/compress` — see upload zone
2. Upload a single PNG — see side-by-side comparison
3. Switch format to WebP — see file size change
4. Drag quality slider — see size update on release
5. Click download — file downloads as WebP
6. Click "Add more" — upload 2 more images → batch list appears
7. Delete files back to 1 → returns to comparison view
8. Navigate to `/compress-image` — pSEO landing page renders
9. Navigate to `/png-to-webp` — pSEO landing page renders
10. Check `/tools` — Compress card appears
11. Check footer — Compress link appears

- [ ] **Step 3: Update PROGRESS.md**

Update `docs/ideation/PROGRESS.md`: Change tool ① status from `⬜ 未开始` to `🟢 已完成`, fill in start/completion dates, check all subtask checkboxes.

- [ ] **Step 4: Commit**

```bash
git add docs/ideation/PROGRESS.md
git commit -m "docs: mark compress tool as complete in PROGRESS.md"
```
