import type { SplitResult, ZipExportOptions, BatchZipExportOptions } from "@/types"
import { downloadBlob } from "@/lib/download"
import { ExportError } from "@/lib/export-errors"
import type JSZip from "jszip"

async function createZip(entries: { name: string; blob: Blob }[]): Promise<Blob> {
  let zip: JSZip
  try {
    const { default: Zip } = await import("jszip")
    zip = new Zip()
  } catch (error) {
    throw new ExportError("zip_load_failed", error)
  }
  try {
    for (const { name, blob } of entries) {
      // Read explicitly so a failed image read is distinguishable from packing.
      const data = typeof blob.arrayBuffer === "function" ? await blob.arrayBuffer() : await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as ArrayBuffer)
        reader.onerror = () => reject(reader.error)
        reader.onabort = () => reject(new Error("Blob read canceled"))
        reader.readAsArrayBuffer(blob)
      })
      zip.file(name, data)
    }
  } catch (error) {
    throw new ExportError("zip_read_failed", error)
  }
  try {
    return await zip.generateAsync({ type: "blob", mimeType: "application/zip" })
  } catch (error) {
    throw new ExportError("zip_generate_failed", error)
  }
}

function getFileName(
  originalFileName: string,
  result: SplitResult,
  fileExtension: string
): string {
  return `${originalFileName}_r${result.row}_c${result.col}.${fileExtension}`
}

export async function exportAsZip(options: ZipExportOptions): Promise<Blob> {
  return createZip(options.results.map((result) => ({
    name: getFileName(options.originalFileName, result, options.fileExtension),
    blob: result.blob,
  })))
}

export async function exportBatchAsZip(options: BatchZipExportOptions): Promise<Blob> {
  const isSingle = options.items.length === 1
  return createZip(options.items.flatMap((item) => item.results.map((result) => {
    const fileName = getFileName(item.originalFileName, result, item.fileExtension)
    return { name: isSingle ? fileName : `${item.originalFileName}/${fileName}`, blob: result.blob }
  })))
}

export function downloadSingle(result: SplitResult, fileName: string): void {
  downloadBlob(result.blob, fileName)
}

export function getZipFileName(originalFileName: string): string {
  return `${originalFileName}_split.zip`
}

export function getSelectedZipFileName(originalFileName: string): string {
  return `${originalFileName}_selected.zip`
}

export function getBatchZipFileName(): string {
  return `batch_split.zip`
}

export async function exportGridAsZip(
  blobs: Blob[],
  fileExtension: string
): Promise<Blob> {
  return createZip(blobs.map((blob, i) => ({ name: `grid-${i + 1}.${fileExtension}`, blob })))
}

export function getGridZipFileName(): string {
  return "grid_split.zip"
}

export async function exportCarouselAsZip(
  blobs: Blob[],
  fileExtension: string,
): Promise<Blob> {
  return createZip(blobs.map((blob, i) => ({ name: `carousel-${i + 1}.${fileExtension}`, blob })))
}

export function getCarouselZipFileName(): string {
  return "carousel_split.zip"
}
