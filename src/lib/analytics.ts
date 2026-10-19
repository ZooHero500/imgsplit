import { CORE_TOOLS, TOOL_EDITOR_HREFS, type CoreToolId } from "@/lib/tools/catalog"
import { getExportErrorCode, type ExportErrorCode } from "@/lib/export-errors"

export const ANALYTICS_DOMAINS =
  process.env.NEXT_PUBLIC_UMAMI_DOMAINS ?? "imgsplit.com,www.imgsplit.com"

type Stage = "upload" | "processing" | "export"
type Outcome = "succeeded" | "failed" | "canceled"
export type AnalyticsEvent =
  | `${Stage}_started`
  | `${Stage}_${Outcome}`
  | "download_triggered"
  | "download_failed"
  | "save_preview_opened"
  | "tool_cta_clicked"
  | "results_readjusted"
  | "image_replaced"
  | "upload_picker_opened"
  | "processing_blocked"

/** Only operational metadata: never pass files, URLs, image content or error messages. */
export interface AnalyticsProperties {
  tool?: CoreToolId | "site"
  input_count?: number
  output_count?: number
  failure_count?: number
  format?: string
  action?: "all" | "selected" | "single" | "open_editor" | "resume" | "upload"
  error_code?: ExportErrorCode | "unsupportedFormat" | "fileTooLarge" | "imageMetadataUnreadable" | "imageMemoryRisk" | "imageDimensionsTooLarge" | "imageCanvasRisk" | "decode_failed" | "processing_failed" | "export_failed" | "popup_blocked" | "no_split_lines" | "lines_not_crossing" | "model_unavailable"
}

interface EventData extends AnalyticsProperties {
  schema_version: number
  page_path: string
  locale: string
  duration_ms?: number
  operation_id?: string
  operation_started_at_ms?: number
  occurred_at_ms: number
  event_sequence: number
  page_instance_id: string
}

interface PendingEvent {
  name: AnalyticsEvent
  data: EventData
}

declare global {
  interface Window {
    umami?: {
      track: (payload: (properties: Record<string, unknown>) => Record<string, unknown>) => unknown
    }
  }
}

const pending: PendingEvent[] = []
let draining: Promise<void> | null = null
let sequence = 0
let pageInstanceId: string | undefined

function createId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

function enabled(): boolean {
  return typeof window !== "undefined" &&
    ANALYTICS_DOMAINS.split(",").some((domain) => domain.trim() === window.location.hostname)
}

function context(): Pick<EventData, "schema_version" | "page_path" | "locale" | "tool"> {
  const page_path = typeof window === "undefined" ? "/" : window.location.pathname
  const parts = page_path.split("/").filter(Boolean)
  const locale = ["en", "zh-CN", "ja", "ko", "es", "pt-BR"].includes(parts[0])
    ? parts.shift()!
    : "en"
  const path = `/${parts.join("/")}`
  const editor = (TOOL_EDITOR_HREFS[parts[0]] ?? path).split("?")[0]
  const tool = CORE_TOOLS.find((candidate) => candidate.href !== "/" &&
    (editor === candidate.href || editor.startsWith(`${candidate.href}/`)))?.id
    ?? (["tools", "about", "privacy", "terms"].includes(parts[0]) ? "site" : "split")
  return { schema_version: 2, page_path, locale, tool }
}

async function send(event: PendingEvent): Promise<void> {
  let timeout: ReturnType<typeof setTimeout> | undefined
  try {
    // Preserve the action's route even if the tracker loads after SPA navigation.
    const result = window.umami?.track((properties) => ({
      ...properties,
      url: event.data.page_path,
      name: event.name,
      data: event.data,
    }))
    // A blocked request must not hold the bounded queue forever. Original times
    // and sequence numbers remain authoritative even if a request arrives late.
    await Promise.race([
      Promise.resolve(result),
      new Promise<void>((resolve) => { timeout = setTimeout(resolve, 5000) }),
    ])
  } catch {
    // Analytics must never interrupt local image processing or downloads.
  } finally {
    clearTimeout(timeout)
  }
}

export function flushAnalyticsEvents(): Promise<void> {
  if (!enabled() || !window.umami) return Promise.resolve()
  if (draining) return draining
  draining = (async () => {
    while (pending.length && enabled() && window.umami) {
      await send(pending.shift()!)
    }
  })().finally(() => {
    draining = null
    if (pending.length && enabled() && window.umami) void flushAnalyticsEvents()
  })
  return draining
}

function record(name: AnalyticsEvent, data: Omit<EventData, "occurred_at_ms" | "event_sequence" | "page_instance_id">): void {
  if (!enabled()) return
  pageInstanceId ??= createId()
  // Capture these before queueing, not when the tracker finally becomes ready.
  const event = { name, data: { ...data, occurred_at_ms: Date.now(), event_sequence: ++sequence, page_instance_id: pageInstanceId } }
  if (pending.length < 50) pending.push(event)
  void flushAnalyticsEvents()
}

export function trackEvent(name: AnalyticsEvent, properties: AnalyticsProperties = {}): void {
  record(name, { ...context(), ...properties })
}

/** Capture the start route and emit exactly one terminal event per operation. */
export function startOperation(stage: Stage, properties: AnalyticsProperties = {}) {
  const startedAt = Date.now()
  const data = { ...context(), ...properties, operation_id: createId(), operation_started_at_ms: startedAt }
  let finished = false
  record(`${stage}_started`, data)
  return (outcome: Outcome, result: AnalyticsProperties = {}): void => {
    if (finished) return
    finished = true
    record(`${stage}_${outcome}`, {
      ...data,
      ...result,
      duration_ms: Math.max(0, Date.now() - startedAt),
    })
  }
}

/** Track an async action without changing its result or error behavior. */
export async function trackOperation<T>(
  stage: Stage,
  action: () => Promise<T>,
  properties: AnalyticsProperties = {},
  summarize?: (result: T) => AnalyticsProperties,
): Promise<T> {
  const finish = startOperation(stage, properties)
  try {
    const result = await action()
    finish("succeeded", summarize?.(result))
    return result
  } catch (error) {
    finish("failed", { error_code: stage === "export" ? getExportErrorCode(error) : "processing_failed" })
    throw error
  }
}
