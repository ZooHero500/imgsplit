import { describe, expect, it } from "vitest"
import { getImageMidpoint, getImageSplitLines } from "../split-line-placement"
import type { SplitLine } from "@/types"

describe("split line placement", () => {
  it("places a shortcut inside the selected image even when it is offset in a batch", () => {
    const position = { x: 900, y: 240 }
    const midpoint = getImageMidpoint("vertical", position, 101, 200)!
    expect(midpoint).toBe(950)
    expect(getImageSplitLines([{ id: "v", orientation: "vertical", position: midpoint }], position, 101, 200)[0].position).toBe(50)
    expect(getImageMidpoint("horizontal", position, 101, 200)).toBe(340)
  })

  it("rejects lines outside or rounding onto an edge so Generate cannot produce an unsplit image", () => {
    const lines: SplitLine[] = [-1, 0, 0.2, 1, 99, 99.9, 100, 110].map((position) => ({ id: String(position), orientation: "vertical", position: position + 300 }))
    expect(getImageSplitLines(lines, { x: 300, y: 500 }, 100, 100).map((line) => line.position)).toEqual([1, 99])
    expect(getImageMidpoint("horizontal", { x: 0, y: 0 }, 100, 1)).toBeNull()
  })
})
