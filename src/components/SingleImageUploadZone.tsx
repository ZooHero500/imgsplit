"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { ACCEPTED_TYPES } from "@/lib/upload-utils"
import { trackEvent } from "@/lib/analytics"
import { useImageUpload } from "@/hooks/use-image-upload"
import { UploadRecovery } from "./UploadRecovery"

interface SingleImageUploadZoneProps {
  /** i18n namespace providing title / dragHint / clickHint / formatHint. */
  namespace: "grid.upload" | "carousel.upload"
  onImageLoaded: (image: HTMLImageElement, file: File) => void
}

/** Single-image drop zone shared by the grid and carousel tools. */
export function SingleImageUploadZone({ namespace, onImageLoaded }: SingleImageUploadZoneProps) {
  const t = useTranslations(namespace)
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const tUpload = useTranslations("upload")

  const upload = useImageUpload((results) => {
    if (results[0]) onImageLoaded(results[0].image, results[0].file)
  })
  const processFile = (files: FileList) => { void upload.processFiles(Array.from(files).slice(0, 1)) }
  const chooseFile = () => {
    if (upload.isLoading) return
    trackEvent("upload_picker_opened")
    inputRef.current?.click()
  }

  return (
    <div
      className={`flex flex-col items-center justify-center border-t border-b p-8 sm:p-16 md:p-24 transition-all duration-700 cursor-pointer ${
        isDragOver
          ? "border-accent bg-accent/5"
          : "border-primary/20 hover:border-primary/40"
      }`}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragOver(false)
        if (e.dataTransfer.files.length > 0) processFile(e.dataTransfer.files)
      }}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false) }}
      onClick={(event) => {
        if (event.target === inputRef.current) return
        chooseFile()
      }}
      aria-busy={upload.isLoading}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        disabled={upload.isLoading}
        onChange={(e) => {
          if (e.target.files) processFile(e.target.files)
          if (inputRef.current) inputRef.current.value = ""
        }}
      />
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          {t("title")}
        </p>
        <p className="font-serif text-2xl md:text-3xl text-foreground mb-4">
          {t("dragHint")}
        </p>
        <button type="button" disabled={upload.isLoading} className="text-sm text-foreground hover:text-accent transition-colors duration-500">
          {t("clickHint")}
        </button>
        <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
          {t("formatHint")}
        </p>
        <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">{tUpload("largeImageHint")}</p>
      </div>
      <UploadRecovery failure={upload.failure} isLoading={upload.isLoading} onRecover={upload.recover} onRetry={upload.retry} onChoose={chooseFile} />
    </div>
  )
}
