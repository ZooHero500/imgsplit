import { CORE_TOOLS, TOOL_EDITOR_HREFS, type CoreToolId } from "@/lib/tools/catalog"

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
  error_code?: "unsupportedFormat" | "fileTooLarge" | "decode_failed" | "processing_failed" | "export_failed" | "download_failed" | "popup_blocked" | "no_split_lines" | "lines_not_crossing" | "model_unavailable"
}

interface EventData extends AnalyticsProperties {
  schema_version: number
  page_path: string
  locale: string
  duration_ms?: number
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
  return { schema_version: 1, page_path, locale, tool }
}

function send(event: PendingEvent): void {
  try {
    // Preserve the action's route even if the tracker loads after SPA navigation.
    const result = window.umami?.track((properties) => ({
      ...properties,
      url: event.data.page_path,
      name: event.name,
      data: event.data,
    }))
    void Promise.resolve(result).catch(() => {})
  } catch {
    // Analytics must never interrupt local image processing or downloads.
  }
}

export function flushAnalyticsEvents(): void {
  if (!enabled() || !window.umami) return
  pending.splice(0).forEach(send)
}

function record(name: AnalyticsEvent, data: EventData): void {
  if (!enabled()) return
  if (!window.umami) {
    // Bounded, memory-only queue; blocked analytics must not accumulate forever.
    if (pending.length < 50) pending.push({ name, data })
    return
  }
  flushAnalyticsEvents()
  send({ name, data })
}

export function trackEvent(name: AnalyticsEvent, properties: AnalyticsProperties = {}): void {
  record(name, { ...context(), ...properties })
}

/** Capture the start route and emit exactly one terminal event per operation. */
export function startOperation(stage: Stage, properties: AnalyticsProperties = {}) {
  const data = { ...context(), ...properties }
  const startedAt = Date.now()
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
    finish("failed", { error_code: stage === "export" ? "export_failed" : "processing_failed" })
    throw error
  }
}
