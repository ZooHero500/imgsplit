"use client"

import { useCallback, useState } from "react"

export interface ExportActionCallbacks {
  /** Called after the export function resolves. Show success toasts here. */
  onSuccess?: () => void
  /** Called when the export function throws/rejects. Show error toasts here. */
  onError?: (error: unknown) => void
}

export interface UseExportActionReturn {
  isExporting: boolean
  /**
   * Run an async export function, managing `isExporting` and try/catch/finally.
   * Per-call callbacks override the hook-level ones.
   */
  run: (action: () => Promise<void>, callbacks?: ExportActionCallbacks) => Promise<void>
}

/**
 * Shared export state machine for editor download/export buttons.
 * No UI side effects — success/error feedback stays in the component layer.
 */
export function useExportAction(
  options: ExportActionCallbacks = {}
): UseExportActionReturn {
  const { onSuccess, onError } = options
  const [isExporting, setIsExporting] = useState(false)

  const run = useCallback(
    async (action: () => Promise<void>, callbacks?: ExportActionCallbacks) => {
      setIsExporting(true)
      try {
        await action()
        ;(callbacks?.onSuccess ?? onSuccess)?.()
      } catch (error) {
        ;(callbacks?.onError ?? onError)?.(error)
      } finally {
        setIsExporting(false)
      }
    },
    [onSuccess, onError]
  )

  return { isExporting, run }
}
