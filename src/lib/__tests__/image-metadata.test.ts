import { describe, expect, it, vi } from "vitest"
import { readImageMetadata } from "../image-metadata"
import { pngHeader, jpegHeader, webpHeader } from "./image-header-fixtures"

describe("image header preflight", () => {
  it("reads large PNG dimensions using only small slices", async () => {
    const file = pngHeader(3000, 12000, 60 * 1024 * 1024)
    const slice = vi.spyOn(file, "slice")
    expect(await readImageMetadata(file)).toEqual({ width: 3000, height: 12000, frames: 1 })
    expect(slice.mock.calls.every(([start = 0, end = 0]) => end - start <= 25)).toBe(true)
  })
  it("accounts for APNG frames before the first image data chunk", async () => {
    expect(await readImageMetadata(pngHeader(500, 300, undefined, 20))).toEqual({ width: 500, height: 300, frames: 20 })
  })
  it.each([false, true])("reads JPEG dimensions after metadata, progressive=%s", async (progressive) => {
    expect(await readImageMetadata(jpegHeader(6000, 4000, progressive))).toEqual({ width: 6000, height: 4000, frames: 1 })
  })
  it.each(["VP8 ", "VP8L", "VP8X"] as const)("reads %s WebP dimensions", async (kind) => {
    expect(await readImageMetadata(webpHeader(kind, 1234, 5678))).toEqual({ width: 1234, height: 5678, frames: 1 })
  })
  it("counts animated WebP frames while skipping their compressed payloads", async () => {
    const bytes = new Uint8Array(78)
    const view = new DataView(bytes.buffer)
    bytes.set(new TextEncoder().encode("RIFF"))
    view.setUint32(4, 70, true)
    bytes.set(new TextEncoder().encode("WEBPVP8X"), 8)
    view.setUint32(16, 10, true)
    bytes[20] = 2
    bytes[24] = 99
    bytes[27] = 49
    for (const offset of [30, 54]) {
      bytes.set(new TextEncoder().encode("ANMF"), offset)
      view.setUint32(offset + 4, 16, true)
    }
    expect(await readImageMetadata(new Blob([bytes]))).toEqual({ width: 100, height: 50, frames: 2 })
  })
  it("rejects zero dimensions, truncated headers and unknown data without decoding", async () => {
    await expect(readImageMetadata(pngHeader(0, 100))).rejects.toThrow()
    await expect(readImageMetadata(new Blob(["not an image"]))).rejects.toThrow()
    await expect(readImageMetadata(webpHeader("VP8X", 10, 10).slice(0, 24))).rejects.toThrow()
    await expect(readImageMetadata(jpegHeader(10, 10).slice(0, 16))).rejects.toThrow()
  })
})
