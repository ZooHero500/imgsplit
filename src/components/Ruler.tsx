"use client"

import { useEffect, useRef, useCallback } from "react"
import type { SplitLine } from "@/types"

interface RulerProps {
  orientation: "horizontal" | "vertical"
  length: number
  viewportScale: number
  viewportOffset: number
  thickness?: number
  lines: SplitLine[]
  onDragStart: (orientation: "horizontal" | "vertical") => void
}

function calculateTickStep(scale: number): number {
  const pixelsPerUnit = scale
  const steps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000]
  const minPixelGap = 50
  for (const step of steps) {
    if (step * pixelsPerUnit >= minPixelGap) return step
  }
  return steps[steps.length - 1]
}

export function Ruler({
  orientation,
  length,
  viewportScale,
  viewportOffset,
  thickness = 20,
  lines,
  onDragStart,
}: RulerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const isHorizontal = orientation === "horizontal"
    const w = isHorizontal ? length : thickness
    const h = isHorizontal ? thickness : length

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const styles = getComputedStyle(document.documentElement)
    const rulerText = styles.getPropertyValue("--ink-soft").trim()
    const rulerTick = styles.getPropertyValue("--rule").trim()
    const rulerMarker = styles.getPropertyValue("--signal").trim()
    const rulerBorder = styles.getPropertyValue("--rule-soft").trim()

    // Calculate visible world range
    const worldStart = -viewportOffset / viewportScale
    const worldEnd = worldStart + length / viewportScale

    // Tick step based on viewport scale (pixels per world unit)
    const step = calculateTickStep(viewportScale)

    ctx.fillStyle = rulerText
    ctx.strokeStyle = rulerTick
    ctx.lineWidth = 0.5
    ctx.font = '10px "Archivo Narrow Variable", "Arial Narrow", sans-serif'

    // Start from first visible tick
    const firstTick = Math.floor(worldStart / step) * step

    for (let value = firstTick; value <= worldEnd; value += step) {
      const screenPos = value * viewportScale + viewportOffset
      if (screenPos < 0 || screenPos > length) continue

      if (isHorizontal) {
        ctx.beginPath()
        ctx.moveTo(screenPos, thickness)
        ctx.lineTo(screenPos, thickness * 0.4)
        ctx.stroke()
        ctx.textAlign = "left"
        ctx.textBaseline = "top"
        ctx.fillText(`${Math.round(value)}`, screenPos + 2, 1)
      } else {
        ctx.beginPath()
        ctx.moveTo(thickness, screenPos)
        ctx.lineTo(thickness * 0.4, screenPos)
        ctx.stroke()
        ctx.save()
        ctx.translate(1, screenPos + 2)
        ctx.textAlign = "left"
        ctx.textBaseline = "top"
        ctx.fillText(`${Math.round(value)}`, 0, 0)
        ctx.restore()
      }

      // Minor ticks
      const subStep = step >= 10 ? step / 5 : step / 2
      for (let sub = subStep; sub < step; sub += subStep) {
        const subValue = value + sub
        const subPos = subValue * viewportScale + viewportOffset
        if (subPos < 0 || subPos > length) continue

        if (isHorizontal) {
          ctx.beginPath()
          ctx.moveTo(subPos, thickness)
          ctx.lineTo(subPos, thickness * 0.7)
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.moveTo(thickness, subPos)
          ctx.lineTo(thickness * 0.7, subPos)
          ctx.stroke()
        }
      }
    }

    // Line markers (triangles) — convert world pos to screen
    const relevantLines = lines.filter((l) => l.orientation === orientation)
    ctx.fillStyle = rulerMarker
    for (const line of relevantLines) {
      const pos = line.position * viewportScale + viewportOffset
      if (pos < 0 || pos > length) continue

      const markerSize = 5
      ctx.beginPath()
      if (isHorizontal) {
        ctx.moveTo(pos - markerSize, thickness)
        ctx.lineTo(pos + markerSize, thickness)
        ctx.lineTo(pos, thickness - markerSize)
      } else {
        ctx.moveTo(thickness, pos - markerSize)
        ctx.lineTo(thickness, pos + markerSize)
        ctx.lineTo(thickness - markerSize, pos)
      }
      ctx.closePath()
      ctx.fill()
    }

    // Border
    ctx.strokeStyle = rulerBorder
    ctx.lineWidth = 1
    ctx.beginPath()
    if (isHorizontal) {
      ctx.moveTo(0, thickness - 0.5)
      ctx.lineTo(length, thickness - 0.5)
    } else {
      ctx.moveTo(thickness - 0.5, 0)
      ctx.lineTo(thickness - 0.5, length)
    }
    ctx.stroke()
  }, [orientation, length, viewportScale, viewportOffset, thickness, lines])

  useEffect(() => {
    const rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [draw])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      onDragStart(orientation)
    },
    [orientation, onDragStart]
  )

  return (
    <canvas
      ref={canvasRef}
      style={{
        backgroundColor: "var(--workspace-ruler)",
        cursor: orientation === "horizontal" ? "s-resize" : "e-resize",
        display: "block",
      }}
      onMouseDown={handleMouseDown}
    />
  )
}

export function CornerBlock({ thickness = 20 }: { thickness?: number }) {
  return (
    <div
      style={{
        width: thickness,
        height: thickness,
        backgroundColor: "var(--workspace-ruler)",
        borderRight: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        flexShrink: 0,
      }}
    />
  )
}

export function DragPreviewLine({
  isDragging,
  orientation,
  position,
}: {
  isDragging: boolean
  orientation: "horizontal" | "vertical"
  position: number
}) {
  if (!isDragging) return null

  const style: React.CSSProperties =
    orientation === "horizontal"
      ? {
          position: "absolute",
          left: 0,
          right: 0,
          top: position,
          height: 1,
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          pointerEvents: "none",
          zIndex: 50,
        }
      : {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: position,
          width: 1,
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          pointerEvents: "none",
          zIndex: 50,
        }

  return <div style={style} />
}
