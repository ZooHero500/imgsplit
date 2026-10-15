"use client"

import Script from "next/script"
import { ANALYTICS_DOMAINS, flushAnalyticsEvents } from "@/lib/analytics"

const SCRIPT_URL =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ??
  "https://analysis.zoohero.me/script.js"

const WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ??
  "b40ffc66-c1cd-4c98-b391-f2a8777e8951"

export function UmamiAnalytics() {
  if (!WEBSITE_ID || !SCRIPT_URL) {
    return null
  }

  return (
    <Script
      src={SCRIPT_URL}
      data-website-id={WEBSITE_ID}
      data-domains={ANALYTICS_DOMAINS}
      data-exclude-hash="true"
      data-performance="true"
      onReady={flushAnalyticsEvents}
      strategy="afterInteractive"
    />
  )
}
