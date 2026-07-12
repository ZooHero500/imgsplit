"use client"

import { useState, useCallback, useMemo } from "react"
import { getGridConfig, type GridType, type GridEditorState } from "@/lib/grid-splitter"
import { useAspectFramedImage } from "@/hooks/use-aspect-framed-image"

interface ImageSize {
  width: number
  height: number
}

export function useGridEditor(
  imageSize: ImageSize,
  containerSize: ImageSize
) {
  const [gridType, setGridTypeState] = useState<GridType>("3x3")
  const [withGap, setWithGap] = useState(false)

  const aspectRatio = useMemo(() => getGridConfig(gridType).aspectRatio, [gridType])

  const framed = useAspectFramedImage(imageSize, containerSize, aspectRatio)

  const setGridType = useCallback((type: GridType) => {
    setGridTypeState(type)
  }, [])

  const state: GridEditorState = {
    gridType,
    offsetX: framed.offsetX,
    offsetY: framed.offsetY,
    scale: framed.scale,
    withGap,
  }

  return {
    state,
    frameSize: framed.frameSize,
    scaleRange: framed.scaleRange,
    setGridType,
    setWithGap,
    setOffset: framed.setOffset,
    handleScale: framed.handleScale,
    resetToFit: framed.resetToFit,
  }
}
