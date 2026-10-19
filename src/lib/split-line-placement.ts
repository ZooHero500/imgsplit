import type { SplitLine } from "@/types"

interface ImagePosition {
  x: number
  y: number
}

/** Only pixel boundaries strictly inside the image produce useful slices. */
export function getImageSplitLines(
  lines: SplitLine[],
  position: ImagePosition,
  width: number,
  height: number,
): SplitLine[] {
  return lines.flatMap((line) => {
    const horizontal = line.orientation === "horizontal"
    const localPosition = Math.round(line.position - (horizontal ? position.y : position.x))
    const limit = horizontal ? height : width
    return localPosition > 0 && localPosition < limit
      ? [{ ...line, position: localPosition }]
      : []
  })
}

export function getImageMidpoint(
  orientation: SplitLine["orientation"],
  position: ImagePosition,
  width: number,
  height: number,
): number | null {
  const dimension = orientation === "horizontal" ? height : width
  if (dimension < 2) return null
  return (orientation === "horizontal" ? position.y : position.x) + Math.floor(dimension / 2)
}
