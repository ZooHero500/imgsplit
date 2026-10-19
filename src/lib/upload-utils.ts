import type { UploadResult } from "@/types"
import { startOperation } from "@/lib/analytics"
import { readImageMetadata, type ImageMetadata } from "@/lib/image-metadata"
import { browserUploadMemoryBudget, estimateImageMemory, rememberImageMemory, MAX_IMAGE_DIMENSION, MEBIBYTE } from "@/lib/upload-memory"
import { MAX_CANVAS_AREA, MAX_CANVAS_DIMENSION } from "@/lib/image-canvas"

export const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"]

export interface ValidationError {
  key: "unsupportedFormat" | "imageMetadataUnreadable" | "imageMemoryRisk" | "imageDimensionsTooLarge" | "imageCanvasRisk"
  params?: Record<string, string>
}

export class UploadValidationError extends Error {
  constructor(public readonly validation: ValidationError) {
    super(validation.key)
    this.name = "UploadValidationError"
  }
}

export interface LoadUploadResultsOptions {
  /** Working-memory estimate for images already retained by this editor. */
  existingMemoryBytes?: number
  /** Tools that require one full-resolution canvas use the shared canvas limits. */
  requiresFullCanvas?: boolean
  /** History restoration reuses admission checks without recording a new upload. */
  trackUpload?: boolean
}

type ValidationResult =
  | { valid: false; error: ValidationError }
  | { valid: true; metadata: ImageMetadata[]; estimates: number[]; estimatedMemory: number; budget: number }

function memoryError(estimated: number, budget: number): ValidationError {
  return { key: "imageMemoryRisk", params: {
    estimated: String(Math.ceil(estimated / MEBIBYTE)),
    budget: String(Math.round(budget / MEBIBYTE)),
  } }
}

/** Inspect the whole selection before any pixel decoding or canvas allocation. */
export async function validateFiles(files: File[], options: LoadUploadResultsOptions = {}): Promise<ValidationResult> {
  const budget = browserUploadMemoryBudget()
  let estimatedMemory = Math.max(0, options.existingMemoryBytes ?? 0)
  const metadata: ImageMetadata[] = []
  const estimates: number[] = []
  for (const file of files) {
    if (!ACCEPTED_TYPES.includes(file.type)) return { valid: false, error: { key: "unsupportedFormat" } }
    let size: ImageMetadata
    try { size = await readImageMetadata(file) } catch {
      return { valid: false, error: { key: "imageMetadataUnreadable" } }
    }
    if (Math.max(size.width, size.height) > MAX_IMAGE_DIMENSION) {
      return { valid: false, error: { key: "imageDimensionsTooLarge", params: { width: String(size.width), height: String(size.height), limit: String(MAX_IMAGE_DIMENSION) } } }
    }
    if (options.requiresFullCanvas && (size.width * size.height > MAX_CANVAS_AREA || Math.max(size.width, size.height) > MAX_CANVAS_DIMENSION)) {
      return { valid: false, error: { key: "imageCanvasRisk", params: { width: String(size.width), height: String(size.height) } } }
    }
    const estimate = estimateImageMemory(size, file.size)
    estimatedMemory += estimate
    if (estimatedMemory > budget) return { valid: false, error: memoryError(estimatedMemory, budget) }
    metadata.push(size)
    estimates.push(estimate)
  }
  return { valid: true, metadata, estimates, estimatedMemory, budget }
}

/** Used by standalone file consumers, including resize and pending-upload handoffs. */
export async function loadImage(file: File, options: LoadUploadResultsOptions = {}): Promise<HTMLImageElement> {
  const validation = await validateFiles([file], options)
  if (!validation.valid) throw new UploadValidationError(validation.error)
  const peakMemory = validation.estimatedMemory + inFlightMemory
  if (peakMemory > validation.budget) throw new UploadValidationError(memoryError(peakMemory, validation.budget))
  const reserved = validation.estimates[0]
  inFlightMemory += reserved
  try {
    return await decodeValidatedImage(file, validation.metadata[0], reserved)
  } finally {
    inFlightMemory -= reserved
  }
}

async function decodeValidatedImage(file: File, metadata: ImageMetadata, estimate: number): Promise<HTMLImageElement> {
  const image = await decodeImage(file)
  // Orientation swaps and browser downsampling are valid; larger decoded sizes are not.
  const decodedEstimate = estimateImageMemory({ width: image.naturalWidth, height: image.naturalHeight, frames: metadata.frames }, file.size)
  if (image.naturalWidth < 1 || image.naturalHeight < 1 || decodedEstimate > estimate) {
    image.src = ""
    throw new Error("Decoded image dimensions differ from header")
  }
  rememberImageMemory(image, estimate)
  return image
}

/** Decode only after preflight; the temporary URL is released on both outcomes. */
function decodeImage(file: File): Promise<HTMLImageElement> {
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

/**
 * Outcome of `loadUploadResults`. UI feedback (toasts) is the caller's job:
 * - "invalid": validation failed, `error` carries the i18n key + params
 * - "loadFailed": a file passed validation but could not be decoded
 * - "success": all files loaded; memory estimates inform an optional warning toast
 */
export type LoadUploadResultsOutcome =
  | { status: "invalid"; error: ValidationError }
  | { status: "loadFailed" }
  | {
      status: "success"
      results: UploadResult[]
      memoryWarning: boolean
      estimatedMemoryMB: number
    }

// Reserve memory for overlapping selections while their images are being decoded.
let inFlightMemory = 0

/** Validate files, then load each one into an HTMLImageElement. No UI side effects. */
export async function loadUploadResults(
  files: File[],
  options: LoadUploadResultsOptions = {}
): Promise<LoadUploadResultsOutcome> {
  const finish = files.length > 0 && options.trackUpload !== false ? startOperation("upload", { input_count: files.length }) : null
  const validation = await validateFiles(files, options)
  if (!validation.valid) {
    finish?.("failed", { error_code: validation.error.key })
    return {
      status: "invalid",
      error: validation.error,
    }
  }

  const peakMemory = validation.estimatedMemory + inFlightMemory
  if (peakMemory > validation.budget) {
    finish?.("failed", { error_code: "imageMemoryRisk" })
    return { status: "invalid", error: memoryError(peakMemory, validation.budget) }
  }
  const reserved = validation.estimates.reduce((sum, bytes) => sum + bytes, 0)
  inFlightMemory += reserved
  const results: UploadResult[] = []
  try {
    for (const [index, file] of files.entries()) {
      const image = await decodeValidatedImage(file, validation.metadata[index], validation.estimates[index])
      results.push({ file, image, mimeType: file.type })
    }
    finish?.("succeeded", { output_count: results.length })
    return {
      status: "success",
      results,
      memoryWarning: peakMemory >= validation.budget * 0.6,
      estimatedMemoryMB: Math.ceil(peakMemory / MEBIBYTE),
    }
  } catch {
    for (const result of results) result.image.src = ""
    finish?.("failed", { error_code: "decode_failed" })
    return { status: "loadFailed" }
  } finally {
    inFlightMemory -= reserved
  }
}
