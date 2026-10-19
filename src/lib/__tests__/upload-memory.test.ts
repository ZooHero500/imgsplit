import { describe, expect, it } from "vitest"
import { estimateImageMemory, estimateLoadedImages, getUploadMemoryBudget, MEBIBYTE, rememberImageMemory } from "../upload-memory"

describe("upload working-memory policy", () => {
  it("uses bounded device tiers and a fallback when the API is unavailable", () => {
    expect(getUploadMemoryBudget(1)).toBe(64 * MEBIBYTE)
    expect(getUploadMemoryBudget(2)).toBe(128 * MEBIBYTE)
    expect(getUploadMemoryBudget(4)).toBe(256 * MEBIBYTE)
    expect(getUploadMemoryBudget(8)).toBe(512 * MEBIBYTE)
    expect(getUploadMemoryBudget(64)).toBe(512 * MEBIBYTE)
    expect(getUploadMemoryBudget(undefined, true)).toBe(256 * MEBIBYTE)
    expect(getUploadMemoryBudget()).toBe(512 * MEBIBYTE)
  })
  it("counts decoded pixels, animation frames, processing copies and file bytes", () => {
    expect(estimateImageMemory({ width: 1000, height: 1000, frames: 1 }, 100)).toBe(12_000_200)
    expect(estimateImageMemory({ width: 1000, height: 1000, frames: 10 }, 100)).toBe(48_000_200)
  })
  it("includes already loaded images and keeps their original estimate", () => {
    const image = { naturalWidth: 1000, naturalHeight: 1000 } as HTMLImageElement
    expect(estimateLoadedImages([{ image }])).toBe(12_000_000)
    rememberImageMemory(image, 48_000_000)
    expect(estimateLoadedImages([{ image }, { image }])).toBe(96_000_000)
  })
})
