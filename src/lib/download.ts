import { trackEvent } from "@/lib/analytics"
import { ExportError } from "@/lib/export-errors"

/**
 * Browser download helpers shared by all editors.
 * Keep UI (toasts, i18n) out of this module — callers handle feedback.
 */

/** Detect iOS devices (iPhone/iPad/iPod), where anchor downloads are unreliable. */
export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

/** Trigger a browser download of a URL via a temporary anchor element. */
export function downloadUrl(url: string, fileName: string): void {
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  try {
    document.body.appendChild(a)
    a.click()
    trackEvent("download_triggered")
  } catch (error) {
    trackEvent("download_failed", { error_code: "download_failed" })
    throw error
  } finally {
    a.remove()
  }
}

/** Leave the object URL alive briefly so the browser can start reading it. */
export function downloadBlob(blob: Blob, fileName: string): void {
  let url: string | undefined
  try {
    url = URL.createObjectURL(blob)
    downloadUrl(url, fileName)
  } catch (error) {
    if (url) URL.revokeObjectURL(url)
    throw new ExportError("download_failed", error)
  }
  setTimeout(() => URL.revokeObjectURL(url!), 1000)
}

/**
 * Save a Blob with an iOS-aware fallback: on iOS the blob is opened in a new
 * tab (so the user can long-press to save; the object URL is intentionally
 * not revoked), elsewhere a normal anchor download runs and the object URL is
 * revoked after a short delay.
 */
export function saveBlobWithIOSFallback(blob: Blob, fileName: string): void {
  if (!isIOS()) {
    downloadBlob(blob, fileName)
    return
  }
  const url = URL.createObjectURL(blob)
  const preview = window.open(url, "_blank")
  if (preview) {
    trackEvent("save_preview_opened")
  } else {
    URL.revokeObjectURL(url)
    trackEvent("download_failed", { error_code: "popup_blocked" })
  }
}
