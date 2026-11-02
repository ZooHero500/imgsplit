"use client"

import { useTranslations } from "next-intl"
import type { UploadFailure } from "@/hooks/use-image-upload"

interface UploadRecoveryProps {
  failure: UploadFailure | null
  isLoading: boolean
  onRecover: () => void
  onRetry: () => void
  onChoose: () => void
  errorId?: string
}

export function UploadRecovery({ failure, isLoading, onRecover, onRetry, onChoose, errorId }: UploadRecoveryProps) {
  const t = useTranslations("upload")
  if (!failure) return isLoading ? <p className="p-4 text-sm text-ink-soft" role="status">{t("loadingImages")}</p> : null
  const { outcome, recovery } = failure
  const error = outcome.status === "invalid" ? outcome.error : null
  const canRetry = outcome.status === "loadFailed" || error?.reason === "concurrent_upload" || error?.reason === "existing_images"
  const hasSubset = recovery && recovery.files.length > 0 && recovery.skippedCount > 0
  const message = error?.reason ? t(`memoryRecovery.${error.reason}`) : error ? t(error.key, error.params) : t("loadFailed")

  return <div className="w-full min-w-0 px-6 pb-6 text-center" onClick={event => event.stopPropagation()}>
    <p id={errorId} className="mx-auto max-w-lg break-words text-sm text-destructive" role="alert">{message}</p>
    {hasSubset && <div className="mx-auto mt-4 max-w-lg border border-ink/20 p-4 text-left">
      <p className="text-sm">{t("safeSelection", { count: recovery.files.length, skipped: recovery.skippedCount })}</p>
      <ul className="mt-2 max-h-28 overflow-y-auto text-xs text-ink-soft" aria-label={t("safeImages")}>
        {recovery.files.map((file, index) => <li className="break-all py-1" key={index}>{file.name}</li>)}
      </ul>
    </div>}
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      {hasSubset && <button type="button" disabled={isLoading} className="border border-ink bg-ink px-4 py-3 text-sm text-paper disabled:opacity-50" onClick={onRecover}>{t("openSafeImages", { count: recovery.files.length })}</button>}
      {canRetry && <button type="button" disabled={isLoading} className="border border-ink px-4 py-3 text-sm disabled:opacity-50" onClick={onRetry}>{t("retrySelection")}</button>}
      <button type="button" disabled={isLoading} className="px-4 py-3 text-sm underline underline-offset-4 disabled:opacity-50" onClick={onChoose}>{t("chooseAnother")}</button>
    </div>
    {isLoading && <p className="mt-3 text-sm text-ink-soft" role="status">{t("loadingImages")}</p>}
  </div>
}
