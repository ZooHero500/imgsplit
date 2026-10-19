export type ExportErrorCode = "zip_load_failed" | "zip_read_failed" | "zip_generate_failed" | "download_failed"

/** Stable, privacy-safe codes; the original error is never sent to analytics. */
export class ExportError extends Error {
  constructor(public readonly code: ExportErrorCode, cause: unknown) {
    super(code, { cause })
    this.name = "ExportError"
  }
}

export function getExportErrorCode(error: unknown): ExportErrorCode | "export_failed" {
  return error instanceof ExportError ? error.code : "export_failed"
}
