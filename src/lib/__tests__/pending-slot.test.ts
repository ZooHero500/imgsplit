import { describe, it, expect } from "vitest"
import { createPendingSlot } from "../pending-slot"
import { setPendingUpload, consumePendingUpload } from "../pending-upload"
import { setPendingGridUpload, consumePendingGridUpload } from "../pending-grid-upload"
import {
  setPendingCarouselUpload,
  consumePendingCarouselUpload,
} from "../pending-carousel-upload"
import type { UploadResult } from "@/types"

describe("createPendingSlot", () => {
  it("returns null before anything is set", () => {
    const slot = createPendingSlot<string>()
    expect(slot.consume()).toBeNull()
  })

  it("returns the stored value once and clears it", () => {
    const slot = createPendingSlot<number>()
    slot.set(42)
    expect(slot.consume()).toBe(42)
    expect(slot.consume()).toBeNull()
  })

  it("keeps only the latest value", () => {
    const slot = createPendingSlot<string>()
    slot.set("first")
    slot.set("second")
    expect(slot.consume()).toBe("second")
  })

  it("creates independent slots", () => {
    const a = createPendingSlot<string>()
    const b = createPendingSlot<string>()
    a.set("only-a")
    expect(b.consume()).toBeNull()
    expect(a.consume()).toBe("only-a")
  })
})

describe("pending upload wrappers", () => {
  it("pending-upload keeps set/consume semantics", () => {
    const data = [
      {
        file: new File(["x"], "a.png", { type: "image/png" }),
        image: {} as HTMLImageElement,
        mimeType: "image/png",
      },
    ] satisfies UploadResult[]
    expect(consumePendingUpload()).toBeNull()
    setPendingUpload(data)
    expect(consumePendingUpload()).toBe(data)
    expect(consumePendingUpload()).toBeNull()
  })

  it("pending-grid-upload keeps set/consume semantics", () => {
    const file = new File(["x"], "grid.png", { type: "image/png" })
    expect(consumePendingGridUpload()).toBeNull()
    setPendingGridUpload(file)
    expect(consumePendingGridUpload()).toBe(file)
    expect(consumePendingGridUpload()).toBeNull()
  })

  it("pending-carousel-upload keeps set/consume semantics", () => {
    const file = new File(["x"], "carousel.png", { type: "image/png" })
    expect(consumePendingCarouselUpload()).toBeNull()
    setPendingCarouselUpload(file)
    expect(consumePendingCarouselUpload()).toBe(file)
    expect(consumePendingCarouselUpload()).toBeNull()
  })

  it("grid and carousel slots do not share state", () => {
    const file = new File(["x"], "grid.png", { type: "image/png" })
    setPendingGridUpload(file)
    expect(consumePendingCarouselUpload()).toBeNull()
    expect(consumePendingGridUpload()).toBe(file)
  })
})
