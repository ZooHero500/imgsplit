import type { ImageMetadata } from "@/lib/image-metadata"

export const MEBIBYTE = 1024 * 1024
export const MAX_IMAGE_DIMENSION = 65_535

/** Policy budgets, not a measurement of free RAM or a browser guarantee. */
export function getUploadMemoryBudget(deviceMemory?: number, coarsePointer = false): number {
  if (deviceMemory !== undefined && Number.isFinite(deviceMemory) && deviceMemory > 0) {
    return Math.min(512, Math.max(64, deviceMemory * 64)) * MEBIBYTE
  }
  return (coarsePointer ? 256 : 512) * MEBIBYTE
}

export function browserUploadMemoryBudget(): number {
  const memory = typeof navigator === "undefined" ? undefined : (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const coarse = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches === true
  return getUploadMemoryBudget(memory, coarse)
}

/** Source pixels + working/output buffers + encoded source/ZIP copy headroom. */
export function estimateImageMemory(metadata: ImageMetadata, encodedBytes: number): number {
  return metadata.width * metadata.height * 4 * (2 + metadata.frames) + encodedBytes * 2
}

export interface LoadedImageMemory {
  image: HTMLImageElement
  file?: Blob
}

// Retain the original estimate (including animation frames), without holding images alive.
const estimates = new WeakMap<HTMLImageElement, number>()

export function rememberImageMemory(image: HTMLImageElement, bytes: number): void {
  estimates.set(image, bytes)
}

export function estimateLoadedImages(items: LoadedImageMemory[]): number {
  return items.reduce((sum, item) => sum + (estimates.get(item.image) ?? estimateImageMemory({
    width: item.image.naturalWidth,
    height: item.image.naturalHeight,
    frames: 1,
  }, item.file?.size ?? 0)), 0)
}
