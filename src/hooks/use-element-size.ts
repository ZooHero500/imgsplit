"use client"

import { useEffect, useState, type RefObject } from "react"

export interface ElementSize {
  width: number
  height: number
}

export interface UseElementSizeOptions {
  /**
   * Measurement strategy:
   * - "content-rect" (default): read `entry.contentRect` from the ResizeObserver callback.
   * - "bounding-rect": call `getBoundingClientRect()` on resize and once more on the
   *   next animation frame after (re)subscribing, matching canvas editors that need
   *   post-layout pixel sizes.
   */
  mode?: "content-rect" | "bounding-rect"
  /**
   * Change this value to force re-subscription, e.g. when the observed element is
   * conditionally remounted behind the same ref (`ref.current` swaps are not tracked
   * automatically).
   */
  resetKey?: unknown
}

/** Observe an element's size via ResizeObserver and return `{ width, height }`. */
export function useElementSize<T extends Element>(
  ref: RefObject<T | null>,
  options: UseElementSizeOptions = {}
): ElementSize {
  const { mode = "content-rect", resetKey } = options
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (mode === "bounding-rect") {
      const measure = () => {
        const rect = el.getBoundingClientRect()
        setSize({ width: rect.width, height: rect.height })
      }
      const observer = new ResizeObserver(measure)
      observer.observe(el)
      const frame = requestAnimationFrame(measure)
      return () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
      }
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, mode, resetKey])

  return size
}
