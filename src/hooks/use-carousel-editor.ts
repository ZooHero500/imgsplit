"use client"

import { useState, useCallback, useMemo } from "react"
import {
  clampSlideCount, getCompositeAspect,
  type AspectPreset, type CarouselEditorState,
} from "@/lib/carousel-splitter"
import { useAspectFramedImage } from "@/hooks/use-aspect-framed-image"

interface Size { width: number; height: number }

// Minimal HTMLImageElement-like shape so geometry can be computed without a real <img>.
function asImage(size: Size): HTMLImageElement {
  return { naturalWidth: size.width, naturalHeight: size.height } as HTMLImageElement
}

export function useCarouselEditor(imageSize: Size, containerSize: Size) {
  const [slideCount, setSlideCountState] = useState(3)
  const [aspect, setAspectState] = useState<AspectPreset>("4:5")

  const aspectRatio = useMemo(
    () =>
      getCompositeAspect(
        aspect,
        asImage({ width: imageSize.width, height: imageSize.height }),
        slideCount
      ),
    [aspect, slideCount, imageSize.width, imageSize.height]
  )

  const framed = useAspectFramedImage(imageSize, containerSize, aspectRatio)

  const setSlideCount = useCallback((n: number) => setSlideCountState(clampSlideCount(n)), [])
  const setAspect = useCallback((a: AspectPreset) => setAspectState(a), [])

  const state: CarouselEditorState = {
    slideCount,
    aspect,
    offsetX: framed.offsetX,
    offsetY: framed.offsetY,
    scale: framed.scale,
  }

  return {
    state,
    frameSize: framed.frameSize,
    scaleRange: framed.scaleRange,
    setSlideCount,
    setAspect,
    setOffset: framed.setOffset,
    handleScale: framed.handleScale,
    resetToFit: framed.resetToFit,
  }
}
