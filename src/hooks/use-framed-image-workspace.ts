"use client"

import { useState, useCallback, useMemo, useRef, useEffect, type RefObject } from "react"
import { loadImage } from "@/lib/upload-utils"
import { downloadUrl, saveBlobWithIOSFallback } from "@/lib/download"

export type WorkspaceStep = 1 | 2 | 3

interface Size {
  width: number
  height: number
}

export interface FramedImageWorkspaceOptions<TResult extends { blob: Blob }> {
  /** Consume the file handed over from the landing page (pending-*-upload slot). */
  consumePendingUpload: () => File | null
  /** File name for saving a single result, e.g. `grid-1.png` / `carousel-1.png`. */
  getSingleFileName: (result: TResult, index: number, fileExtension: string) => string
  /** Build the "download all" ZIP. Dynamic-import the exporter inside to keep it lazy. */
  exportZip: (results: TResult[], fileExtension: string) => Promise<{ blob: Blob; fileName: string }>
}

export interface FramedImageWorkspace<TResult extends { blob: Blob }> {
  step: WorkspaceStep
  image: HTMLImageElement | null
  imageUrl: string
  mimeType: string
  /** Natural image size, `1x1` placeholder before an image is loaded (editor hook input). */
  imageSize: Size
  containerRef: RefObject<HTMLDivElement | null>
  containerSize: Size
  results: TResult[] | null
  /** Object URLs for `results`, revoked automatically when results change/unmount. */
  resultUrls: string[]
  /** Step 1 upload-zone callback: swap in a new image and move to step 2. */
  handleImageLoaded: (image: HTMLImageElement, file: File) => void
  /** Back to step 1, clearing results. */
  handleReupload: () => void
  /** Store generated results and move to step 3. */
  completeWithResults: (results: TResult[]) => void
  /** Back to step 2, clearing results. */
  handleReadjust: () => void
  /** Save one result blob (iOS opens a new tab, elsewhere anchor download). */
  handleSaveSingle: (result: TResult, index: number) => void
  /** Download all results as a ZIP. */
  handleDownloadAll: () => Promise<void>
}

/**
 * Shared orchestration for the grid/carousel "framed image" workspaces:
 * pending-upload consumption, the 3-step state machine, container measurement,
 * result object-URL lifecycle and single/ZIP downloads. Tool-specific bits
 * (editor state, result generation, file naming, ZIP exporter) stay in the
 * caller via the options.
 */
export function useFramedImageWorkspace<TResult extends { blob: Blob }>(
  options: FramedImageWorkspaceOptions<TResult>
): FramedImageWorkspace<TResult> {
  const { consumePendingUpload, getSingleFileName, exportZip } = options

  const [step, setStep] = useState<WorkspaceStep>(1)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [mimeType, setMimeType] = useState<string>("image/png")
  const [results, setResults] = useState<TResult[] | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState<Size>({ width: 400, height: 400 })
  const pendingConsumed = useRef(false)

  const imageSize = useMemo<Size>(
    () =>
      image
        ? { width: image.naturalWidth, height: image.naturalHeight }
        : { width: 1, height: 1 },
    [image]
  )

  // One-shot measurement after the step-2 editor container has been laid out.
  const measureContainer = useCallback(() => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({
          width: Math.min(rect.width - 48, 600),
          height: Math.min(rect.height - 48, 600),
        })
      }
    })
  }, [])

  // Consume pending upload on mount (file handed over from the landing page)
  useEffect(() => {
    if (pendingConsumed.current) return
    pendingConsumed.current = true
    const file = consumePendingUpload()
    if (!file) return
    loadImage(file).then((img) => {
      const url = URL.createObjectURL(file)
      setImage(img)
      setImageUrl(url)
      setMimeType(file.type)
      setStep(2)
      measureContainer()
    })
  }, [consumePendingUpload, measureContainer])

  const handleImageLoaded = useCallback(
    (img: HTMLImageElement, file: File) => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
      const url = URL.createObjectURL(file)
      setImage(img)
      setImageUrl(url)
      setMimeType(file.type)
      setResults(null)
      setStep(2)
      measureContainer()
    },
    [imageUrl, measureContainer]
  )

  const handleReupload = useCallback(() => {
    setResults(null)
    setStep(1)
  }, [])

  const completeWithResults = useCallback((r: TResult[]) => {
    setResults(r)
    setStep(3)
  }, [])

  const handleReadjust = useCallback(() => {
    setResults(null)
    setStep(2)
  }, [])

  const resultUrls = useMemo(() => {
    if (!results) return []
    return results.map((r) => URL.createObjectURL(r.blob))
  }, [results])

  useEffect(() => {
    return () => {
      resultUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [resultUrls])

  const fileExtension = mimeType === "image/jpeg" ? "jpg" : "png"

  const handleSaveSingle = useCallback(
    (result: TResult, index: number) => {
      saveBlobWithIOSFallback(result.blob, getSingleFileName(result, index, fileExtension))
    },
    [getSingleFileName, fileExtension]
  )

  const handleDownloadAll = useCallback(async () => {
    if (!results) return
    const { blob, fileName } = await exportZip(results, fileExtension)
    const url = URL.createObjectURL(blob)
    downloadUrl(url, fileName)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, [results, exportZip, fileExtension])

  return {
    step,
    image,
    imageUrl,
    mimeType,
    imageSize,
    containerRef,
    containerSize,
    results,
    resultUrls,
    handleImageLoaded,
    handleReupload,
    completeWithResults,
    handleReadjust,
    handleSaveSingle,
    handleDownloadAll,
  }
}
