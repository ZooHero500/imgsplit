import { NextRequest, NextResponse } from "next/server"
import Replicate from "replicate"
import { LAYER_COLORS } from "@/lib/ai-segmentation"
import { createRateLimiter, getClientIp } from "@/lib/rate-limit"

// ~10MB binary image as a base64 data URL (10MB × 4/3 ≈ 13.4M chars + headroom)
const MAX_IMAGE_SIZE = 14_000_000

// Each label triggers one paid Replicate inference — hard cap the batch size.
const MAX_LABELS = 10

// Per-instance abuse brake for the paid Replicate endpoint (see @/lib/rate-limit)
const rateLimiter = createRateLimiter({ windowMs: 60_000, max: 20 })

interface SegmentLabel {
  label_en: string
  label_zh?: string
}

function isSegmentLabel(value: unknown): value is SegmentLabel {
  if (typeof value !== "object" || value === null) return false
  const record = value as Record<string, unknown>
  if (typeof record.label_en !== "string" || record.label_en.length === 0) return false
  if ("label_zh" in record && typeof record.label_zh !== "string") return false
  return true
}

export async function POST(request: NextRequest) {
  const rate = rateLimiter.check(getClientIp(request.headers))
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests, please try again later" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) },
      }
    )
  }

  try {
    const body: unknown = await request.json()
    const { image, labels } = (body ?? {}) as { image?: unknown; labels?: unknown }

    if (!image || !Array.isArray(labels) || labels.length === 0) {
      return NextResponse.json(
        { error: "Image and labels are required" },
        { status: 400 }
      )
    }

    if (labels.length > MAX_LABELS) {
      return NextResponse.json(
        { error: `Too many labels (max ${MAX_LABELS})` },
        { status: 400 }
      )
    }

    if (!labels.every(isSegmentLabel)) {
      return NextResponse.json(
        { error: "Each label must be an object with a label_en string" },
        { status: 400 }
      )
    }
    const validLabels: SegmentLabel[] = labels

    // Only accept inline data URLs — never http(s) URLs, which Replicate
    // would fetch server-side (SSRF surface).
    if (typeof image !== "string" || !image.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "Image must be a base64 data URL (data:image/...)" },
        { status: 400 }
      )
    }

    if (image.length > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Image too large (max 10MB)" },
        { status: 413 }
      )
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN not configured" },
        { status: 500 }
      )
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })

    // Process each label sequentially to avoid rate limits
    const segments: Array<{
      label_en: string
      label_zh: string
      maskUrl: string
      color: string
    }> = []

    for (let i = 0; i < validLabels.length; i++) {
      const label = validLabels[i]

      const output = await replicate.run(
        "tmappdev/lang-segment-anything:9f69a43b4a1a2bbb24e78e1e42ea3c28e30b9f52b86102a3ef7e0b3dda16929c",
        {
          input: {
            image,
            text_prompt: label.label_en,
          },
        }
      )

      // Lang-SAM may return string, array of strings, or other formats
      let maskUrl: string | null = null
      if (typeof output === "string") {
        maskUrl = output
      } else if (Array.isArray(output) && typeof output[0] === "string") {
        maskUrl = output[0]
      }

      if (!maskUrl) {
        console.error(`Unexpected Replicate output format for ${label.label_en}:`, output)
        continue
      }

      segments.push({
        label_en: label.label_en,
        label_zh: label.label_zh ?? label.label_en,
        maskUrl,
        color: LAYER_COLORS[i % LAYER_COLORS.length],
      })
    }

    return NextResponse.json({ segments })
  } catch (error) {
    console.error("Segment API error:", error)
    return NextResponse.json(
      { error: "Failed to segment image" },
      { status: 500 }
    )
  }
}
