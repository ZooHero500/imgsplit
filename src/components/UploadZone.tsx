"use client"

import { useCallback, useId, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import type { UploadResult } from "@/types"
import { loadUploadResults, ACCEPTED_TYPES } from "@/lib/upload-utils"

interface UploadZoneProps {
  onImageLoaded?: (result: UploadResult) => void
  onImagesLoaded?: (results: UploadResult[]) => void
  multiple?: boolean
  surface?: "paper" | "blend"
  title?: string
  dragHint?: string
  clickHint?: string
  formatHint?: string
}

export function UploadZone({
  onImageLoaded,
  onImagesLoaded,
  multiple = true,
  surface = "paper",
  title,
  dragHint,
  clickHint,
  formatHint,
}: UploadZoneProps) {
  const t = useTranslations("upload")
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const hintId = useId()
  const errorId = useId()

  const processFiles = useCallback(
    async (files: FileList) => {
      setError(null)

      const selectedFiles = multiple ? Array.from(files) : Array.from(files).slice(0, 1)
      const outcome = await loadUploadResults(selectedFiles)
      if (outcome.status === "invalid") {
        setError(t(outcome.error.key, outcome.error.params))
        return
      }
      if (outcome.status === "loadFailed") {
        setError(t("loadFailed"))
        return
      }

      if (outcome.totalSizeWarning) {
        toast.warning(
          t("totalSizeWarning", { size: (outcome.totalSize / 1024 / 1024).toFixed(1) })
        )
      }

      if (onImagesLoaded) {
        onImagesLoaded(outcome.results)
      } else if (onImageLoaded && outcome.results.length > 0) {
        onImageLoaded(outcome.results[0])
      }
    },
    [multiple, onImageLoaded, onImagesLoaded, t]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files)
      }
    },
    [processFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files)
      }
      if (inputRef.current) inputRef.current.value = ""
    },
    [processFiles]
  )

  return (
    <div
      className={`group flex flex-col items-center justify-center border border-ink transition-colors duration-500 ease-luxury ${
        isDragOver
          ? "border-signal bg-signal/5"
          : `${surface === "blend" ? "bg-transparent" : "bg-paper"} hover:border-primary/40`
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        multiple={multiple}
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-describedby={`${hintId}${error ? ` ${errorId}` : ""}`}
        className="flex w-full cursor-pointer flex-col items-center justify-center p-10 text-center sm:p-14"
      >
        <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-ink-soft mb-6">
          {title ?? t("title")}
        </p>
        <p className="font-serif text-2xl md:text-3xl text-foreground mb-4">
          {dragHint ?? t("dragHint")}
        </p>
        <div className="flex items-center gap-4 justify-center mb-6">
          <span className="h-px w-8 bg-rule" />
          <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-ink-soft">
            {t("or")}
          </span>
          <span className="h-px w-8 bg-rule" />
        </div>
        <p className="font-condensed text-xs font-bold uppercase tracking-[0.2em] text-foreground group-hover:text-signal transition-colors duration-500">
          {clickHint ?? t("clickHint")}
        </p>
        <p id={hintId} className="mt-4 font-condensed text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
          {formatHint ?? t("formatHint")}
        </p>
      </button>

      {error && (
        <p id={errorId} className="pb-6 text-sm text-destructive" role="alert">{error}</p>
      )}
    </div>
  )
}
