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
  a.click()
}

/** Download a Blob as a file. Creates an object URL and revokes it immediately after the click. */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  downloadUrl(url, fileName)
  URL.revokeObjectURL(url)
}

/**
 * Save a Blob with an iOS-aware fallback: on iOS the blob is opened in a new
 * tab (so the user can long-press to save; the object URL is intentionally
 * not revoked), elsewhere a normal anchor download runs and the object URL is
 * revoked after a short delay.
 */
export function saveBlobWithIOSFallback(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  if (isIOS()) {
    window.open(url, "_blank")
  } else {
    downloadUrl(url, fileName)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
}
