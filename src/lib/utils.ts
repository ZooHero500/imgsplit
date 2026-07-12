import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Map an image MIME type to its export file extension (webp/unknown export as png). */
export function getFileExtension(mimeType: string): string {
  if (mimeType === "image/webp") return "png"
  if (mimeType === "image/jpeg") return "jpg"
  if (mimeType === "image/png") return "png"
  return "png"
}

/** Remove the trailing ".ext" segment from a file name (no fallback; may return ""). */
export function getFileNameWithoutExtension(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "")
}

/** Remove the trailing ".ext" segment, returning `fallback` when the result is empty. */
export function stripExtension(fileName: string, fallback: string = "image"): string {
  return fileName.replace(/\.[^.]+$/, "") || fallback
}
