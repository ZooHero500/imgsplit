"use client"

import { useCallback, useRef, useState } from "react"
import { startOperation, trackOperation, type AnalyticsProperties } from "@/lib/analytics"
import { getExportErrorCode } from "@/lib/export-errors"
import { splitImage } from "@/lib/image-splitter"
import {
  exportAsZip,
  exportBatchAsZip,
  downloadSingle,
  getZipFileName,
  getSelectedZipFileName,
  getBatchZipFileName,
} from "@/lib/zip-exporter"
import { downloadBlob } from "@/lib/download"
import { getFileExtension, getFileNameWithoutExtension } from "@/lib/utils"
import type { SplitLine, SplitResult, BatchSplitResult } from "@/types"

function getResultKey(result: SplitResult, imageIndex?: number): string {
  if (imageIndex !== undefined) {
    return `${imageIndex}-${result.row}-${result.col}`
  }
  return `${result.row}-${result.col}`
}

interface ImageItem {
  image: HTMLImageElement
  fileName: string
  mimeType: string
}

interface UseImageExportReturn {
  splitResults: SplitResult[]
  batchResults: BatchSplitResult[]
  isSplitting: boolean
  isExporting: boolean
  exportError: ReturnType<typeof getExportErrorCode> | null
  generateSplit: (
    image: HTMLImageElement,
    lines: SplitLine[],
    mimeType: string
  ) => Promise<SplitResult[]>
  generateBatchSplit: (
    images: ImageItem[],
    linesPerImage: SplitLine[][]
  ) => Promise<BatchSplitResult[]>
  downloadAll: (
    originalFileName: string,
    fileExtension: string
  ) => Promise<void>
  downloadBatchAll: () => Promise<void>
  downloadOne: (result: SplitResult, fileName: string) => void
  clearResults: () => void
  selectedKeys: ReadonlySet<string>
  toggleSelect: (key: string) => void
  selectAll: () => void
  deselectAll: () => void
  clearSelection: () => void
  downloadSelected: (
    originalFileName: string,
    fileExtension: string
  ) => Promise<void>
  downloadBatchSelected: () => Promise<void>
}

export function useImageExport(): UseImageExportReturn {
  const [splitResults, setSplitResults] = useState<SplitResult[]>([])
  const [batchResults, setBatchResults] = useState<BatchSplitResult[]>([])
  const [isSplitting, setIsSplitting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<ReturnType<typeof getExportErrorCode> | null>(null)
  const exportingRef = useRef(false)
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())

  const runExport = useCallback(async (action: () => Promise<void>, properties: AnalyticsProperties) => {
    // The ref also blocks repeated clicks before React renders the busy state.
    if (exportingRef.current) return
    exportingRef.current = true
    setIsExporting(true)
    setExportError(null)
    try {
      await trackOperation("export", action, properties)
    } catch (error) {
      setExportError(getExportErrorCode(error))
      throw error
    } finally {
      exportingRef.current = false
      setIsExporting(false)
    }
  }, [])

  const generateSplit = useCallback(
    async (
      image: HTMLImageElement,
      lines: SplitLine[],
      mimeType: string
    ): Promise<SplitResult[]> => {
      setIsSplitting(true)
      setExportError(null)
      try {
        const results = await trackOperation("processing", () => splitImage(image, lines, mimeType),
          { tool: "split", input_count: 1, format: mimeType }, (items) => ({ output_count: items.length }))
        setSplitResults(results)
        setBatchResults([])
        setSelectedKeys(new Set())
        return results
      } finally {
        setIsSplitting(false)
      }
    },
    []
  )

  const generateBatchSplit = useCallback(
    async (
      images: ImageItem[],
      linesPerImage: SplitLine[][]
    ): Promise<BatchSplitResult[]> => {
      setIsSplitting(true)
      setExportError(null)
      const finish = startOperation("processing", { tool: "split", input_count: images.length })
      try {
        const batch: BatchSplitResult[] = []
        for (let i = 0; i < images.length; i++) {
          const item = images[i]
          const lines = linesPerImage[i] ?? []
          const results = await splitImage(item.image, lines, item.mimeType)
          batch.push({
            fileName: item.fileName,
            mimeType: item.mimeType,
            results,
          })
        }
        setBatchResults(batch)
        // Flatten for backward compatible display
        const allResults = batch.flatMap((b, i) =>
          b.results.map((r) => ({ ...r, _imageIndex: i }))
        )
        setSplitResults(allResults)
        setSelectedKeys(new Set())
        finish("succeeded", { output_count: allResults.length })
        return batch
      } catch (error) {
        finish("failed", { error_code: "processing_failed" })
        throw error
      } finally {
        setIsSplitting(false)
      }
    },
    []
  )

  const downloadAll = useCallback(
    async (originalFileName: string, fileExtension: string) => {
      if (splitResults.length === 0) return
      await runExport(async () => {
        const zipBlob = await exportAsZip({
          originalFileName,
          results: splitResults,
          fileExtension,
        })
        downloadBlob(zipBlob, getZipFileName(originalFileName))
      }, { tool: "split", action: "all", output_count: splitResults.length, format: "zip" })
    },
    [splitResults, runExport]
  )

  const downloadBatchAll = useCallback(async () => {
    if (batchResults.length === 0) return
    await runExport(async () => {
      const zipBlob = await exportBatchAsZip({
        items: batchResults.map((b) => ({
          originalFileName: getFileNameWithoutExtension(b.fileName),
          results: b.results,
          fileExtension: getFileExtension(b.mimeType),
        })),
      })
      downloadBlob(zipBlob, getBatchZipFileName())
    }, { tool: "split", action: "all", output_count: batchResults.reduce((count, item) => count + item.results.length, 0), format: "zip" })
  }, [batchResults, runExport])

  const downloadOne = useCallback(
    (result: SplitResult, fileName: string) => {
      if (exportingRef.current) return
      setExportError(null)
      const finish = startOperation("export", { tool: "split", action: "single", output_count: 1 })
      try {
        downloadSingle(result, fileName)
        finish("succeeded")
      } catch (error) {
        const errorCode = getExportErrorCode(error)
        setExportError(errorCode)
        finish("failed", { error_code: errorCode })
        throw error
      }
    },
    []
  )

  const clearResults = useCallback(() => {
    setSplitResults([])
    setBatchResults([])
    setSelectedKeys(new Set())
    setExportError(null)
  }, [])

  const toggleSelect = useCallback((key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  const selectAll = useCallback(() => {
    if (batchResults.length > 0) {
      const keys: string[] = []
      batchResults.forEach((b, i) => {
        b.results.forEach((r) => keys.push(getResultKey(r, i)))
      })
      setSelectedKeys(new Set(keys))
    } else {
      setSelectedKeys(new Set(splitResults.map((r) => getResultKey(r))))
    }
  }, [splitResults, batchResults])

  const deselectAll = useCallback(() => {
    setSelectedKeys(new Set())
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedKeys(new Set())
  }, [])

  const downloadSelected = useCallback(
    async (originalFileName: string, fileExtension: string) => {
      if (selectedKeys.size === 0) return
      const selected = splitResults.filter((r) =>
        selectedKeys.has(getResultKey(r))
      )
      if (selected.length === 0) return
      await runExport(async () => {
        const zipBlob = await exportAsZip({
          originalFileName,
          results: selected,
          fileExtension,
        })
        downloadBlob(zipBlob, getSelectedZipFileName(originalFileName))
      }, { tool: "split", action: "selected", output_count: selected.length, format: "zip" })
    },
    [splitResults, selectedKeys, runExport]
  )

  const downloadBatchSelected = useCallback(async () => {
    if (selectedKeys.size === 0 || batchResults.length === 0) return

    const items = batchResults.map((b, i) => ({
      originalFileName: getFileNameWithoutExtension(b.fileName),
      results: b.results.filter((r) => selectedKeys.has(getResultKey(r, i))),
      fileExtension: getFileExtension(b.mimeType),
    })).filter((item) => item.results.length > 0)

    if (items.length === 0) return

    await runExport(async () => {
      const zipBlob = await exportBatchAsZip({ items })
      downloadBlob(zipBlob, "selected_split.zip")
    }, { tool: "split", action: "selected", output_count: items.reduce((count, item) => count + item.results.length, 0), format: "zip" })
  }, [batchResults, selectedKeys, runExport])

  return {
    splitResults,
    batchResults,
    isSplitting,
    isExporting,
    exportError,
    generateSplit,
    generateBatchSplit,
    downloadAll,
    downloadBatchAll,
    downloadOne,
    clearResults,
    selectedKeys,
    toggleSelect,
    selectAll,
    deselectAll,
    clearSelection,
    downloadSelected,
    downloadBatchSelected,
  }
}
