"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import type { UploadResult } from "@/types"
import { loadUploadResults, planUploadRecovery, type LoadUploadResultsOptions, type LoadUploadResultsOutcome, type UploadRecoveryPlan } from "@/lib/upload-utils"
import { trackEvent } from "@/lib/analytics"

export interface UploadFailure {
  outcome: Exclude<LoadUploadResultsOutcome, { status: "success" }>
  files: File[]
  recovery?: UploadRecoveryPlan
}

/** One selection at a time; a failed selection stays available for an explicit retry. */
export function useImageUpload(onLoaded: (results: UploadResult[]) => void, options: LoadUploadResultsOptions = {}) {
  const t = useTranslations("upload")
  const [isLoading, setIsLoading] = useState(false)
  const [failure, setFailure] = useState<UploadFailure | null>(null)
  const busy = useRef(false)
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  const processFiles = useCallback(async (files: File[], recoveryKind?: "safe_subset" | "retry") => {
    if (busy.current || files.length === 0) return
    busy.current = true
    setIsLoading(true)
    try {
      if (recoveryKind) trackEvent("upload_recovery_selected", { input_count: files.length, recovery_kind: recoveryKind })
      const outcome = await loadUploadResults(files, options)
      if (outcome.status === "success") {
        if (!mounted.current) {
          outcome.results.forEach(({ image }) => { image.src = "" })
          return
        }
        setFailure(null)
        if (outcome.memoryWarning) toast.warning(t("memoryWarning", { estimated: outcome.estimatedMemoryMB }))
        onLoaded(outcome.results)
      } else {
        const recovery = files.length > 1 && outcome.status === "invalid" && outcome.error.reason !== "concurrent_upload"
          ? await planUploadRecovery(files, options) : undefined
        if (mounted.current) setFailure({ outcome, files, recovery })
      }
    } finally {
      busy.current = false
      if (mounted.current) setIsLoading(false)
    }
  }, [onLoaded, options, t])

  const recover = useCallback(() => {
    if (failure?.recovery?.files.length) void processFiles(failure.recovery.files, "safe_subset")
  }, [failure, processFiles])
  const retry = useCallback(() => {
    if (failure) void processFiles(failure.files, "retry")
  }, [failure, processFiles])

  return { isLoading, failure, processFiles, recover, retry }
}
