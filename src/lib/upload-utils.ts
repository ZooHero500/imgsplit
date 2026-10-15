import type { UploadResult } from "@/types"
import { startOperation } from "@/lib/analytics"

export const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"]
export const MAX_SIZE = 20 * 1024 * 1024 // 20MB per file
export const MAX_TOTAL_SIZE = 50 * 1024 * 1024 // 50MB total

export interface ValidationError {
  key: "unsupportedFormat" | "fileTooLarge"
  params?: Record<string, string>
}

export interface ValidationResult {
  valid: boolean
  files: File[]
  error?: ValidationError
  totalSizeWarning?: boolean
}

export function validateFiles(files: File[], existingSize: number = 0): ValidationResult {
  const validFiles: File[] = []

  for (const file of files) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return {
        valid: false,
        files: [],
        error: { key: "unsupportedFormat" },
      }
    }
    if (file.size > MAX_SIZE) {
      return {
        valid: false,
        files: [],
        error: { key: "fileTooLarge", params: { name: file.name } },
      }
    }
    validFiles.push(file)
  }

  const totalSize = validFiles.reduce((sum, f) => sum + f.size, 0)

  return {
    valid: true,
    files: validFiles,
    totalSizeWarning: totalSize + existingSize > MAX_TOTAL_SIZE,
  }
}

/** Load an HTMLImageElement from a File via a temporary object URL (revoked after load). */
export function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file)
  return loadImageFromSrc(url, { errorMessage: "Failed to load image" }).then(
    (img) => {
      URL.revokeObjectURL(url)
      return img
    },
    (error: unknown) => {
      URL.revokeObjectURL(url)
      throw error
    }
  )
}

export interface LoadImageFromSrcOptions {
  /** Set `crossOrigin` on the image (needed when the result is drawn to a canvas). */
  crossOrigin?: "anonymous" | "use-credentials"
  /** Message for the rejection Error when loading fails. */
  errorMessage?: string
}

/** Load an HTMLImageElement from any src (data URL, object URL, remote URL). */
export function loadImageFromSrc(
  src: string,
  options: LoadImageFromSrcOptions = {}
): Promise<HTMLImageElement> {
  const { crossOrigin, errorMessage = "Failed to load image" } = options
  return new Promise((resolve, reject) => {
    const img = new Image()
    if (crossOrigin) img.crossOrigin = crossOrigin
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(errorMessage))
    img.src = src
  })
}

/** Read a File as a base64 data URL. */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsDataURL(file)
  })
}

export interface LoadUploadResultsOptions {
  /** Estimated byte size of already-loaded images, counted toward the total-size warning. */
  existingSize?: number
}

/**
 * Outcome of `loadUploadResults`. UI feedback (toasts) is the caller's job:
 * - "invalid": validation failed, `error` carries the i18n key + params
 * - "loadFailed": a file passed validation but could not be decoded
 * - "success": all files loaded; `totalSizeWarning`/`totalSize` inform an optional warning toast
 */
export type LoadUploadResultsOutcome =
  | { status: "invalid"; error: ValidationError }
  | { status: "loadFailed" }
  | {
      status: "success"
      results: UploadResult[]
      totalSizeWarning: boolean
      totalSize: number
    }

/** Validate files, then load each one into an HTMLImageElement. No UI side effects. */
export async function loadUploadResults(
  files: File[],
  options: LoadUploadResultsOptions = {}
): Promise<LoadUploadResultsOutcome> {
  const finish = files.length > 0 ? startOperation("upload", { input_count: files.length }) : null
  const validation = validateFiles(files, options.existingSize ?? 0)
  if (!validation.valid) {
    finish?.("failed", { error_code: validation.error?.key ?? "unsupportedFormat" })
    return {
      status: "invalid",
      error: validation.error ?? { key: "unsupportedFormat" },
    }
  }

  const totalSize = validation.files.reduce((sum, f) => sum + f.size, 0)

  try {
    const results: UploadResult[] = []
    for (const file of validation.files) {
      const image = await loadImage(file)
      results.push({ file, image, mimeType: file.type })
    }
    finish?.("succeeded", { output_count: results.length })
    return {
      status: "success",
      results,
      totalSizeWarning: validation.totalSizeWarning === true,
      totalSize,
    }
  } catch {
    finish?.("failed", { error_code: "decode_failed" })
    return { status: "loadFailed" }
  }
}
