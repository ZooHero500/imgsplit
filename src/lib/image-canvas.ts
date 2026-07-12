export const JPEG_QUALITY = 0.92
export const MAX_CANVAS_AREA = 16_777_216
export const MAX_CANVAS_DIMENSION = 16_384

export function resolveOutputMimeType(originalMimeType: string): string {
  if (originalMimeType === "image/webp") return "image/png"
  if (originalMimeType === "image/jpeg" || originalMimeType === "image/png") return originalMimeType
  return "image/png"
}

export function computeScale(w: number, h: number): number {
  let scale = 1
  if (w * h > MAX_CANVAS_AREA) scale = Math.sqrt(MAX_CANVAS_AREA / (w * h))
  if (w * scale > MAX_CANVAS_DIMENSION) scale = MAX_CANVAS_DIMENSION / w
  if (h * scale > MAX_CANVAS_DIMENSION) scale = MAX_CANVAS_DIMENSION / h
  return scale
}

/** Draw an image onto a new canvas at its natural size. Throws if 2D context is unavailable. */
export function canvasFromImage(image: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  canvas.width = image.naturalWidth || image.width
  canvas.height = image.naturalHeight || image.height
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas is not available")
  ctx.drawImage(image, 0, 0)
  return canvas
}

/** Encode a canvas to a Blob, rejecting when `toBlob` yields null. */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType?: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Failed to export canvas"))),
      mimeType,
      quality
    )
  })
}

/** Encode a canvas (PNG by default) and return an object URL. Caller must revoke it. */
export async function canvasObjectUrl(
  canvas: HTMLCanvasElement,
  mimeType: string = "image/png"
): Promise<string> {
  const blob = await canvasToBlob(canvas, mimeType)
  return URL.createObjectURL(blob)
}

/** Convert an image to a Blob of the given MIME type via an intermediate canvas. */
export function imageToBlob(
  image: HTMLImageElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return canvasToBlob(canvasFromImage(image), mimeType, quality)
}

export const THUMBNAIL_JPEG_QUALITY = 0.6

/** Draw a scaled-down copy of an image whose longest side fits `maxSize`. */
export function thumbnailCanvas(
  image: HTMLImageElement,
  maxSize: number
): HTMLCanvasElement {
  const width = image.naturalWidth || image.width
  const height = image.naturalHeight || image.height
  const ratio = Math.min(maxSize / width, maxSize / height)
  const canvas = document.createElement("canvas")
  canvas.width = width * ratio
  canvas.height = height * ratio
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas is not available")
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas
}

/** Create a thumbnail Blob (JPEG by default) whose longest side fits `maxSize`. */
export function createThumbnailBlob(
  image: HTMLImageElement,
  maxSize: number,
  mimeType: string = "image/jpeg",
  quality: number = THUMBNAIL_JPEG_QUALITY
): Promise<Blob> {
  return canvasToBlob(thumbnailCanvas(image, maxSize), mimeType, quality)
}

/** Create a thumbnail data URL (JPEG by default) whose longest side fits `maxSize`. */
export function createThumbnailDataUrl(
  image: HTMLImageElement,
  maxSize: number,
  mimeType: string = "image/jpeg",
  quality: number = THUMBNAIL_JPEG_QUALITY
): string {
  return thumbnailCanvas(image, maxSize).toDataURL(mimeType, quality)
}
