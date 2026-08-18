import type { Metadata } from "next"
import { routing } from "@/i18n/routing"

export const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://imgsplit.com"

export const OG_IMAGE = {
  url: `${SITE_BASE_URL}/og-image.png`,
  width: 1200,
  height: 630,
} as const

export const OPEN_GRAPH_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  "zh-CN": "zh_CN",
  ja: "ja_JP",
  ko: "ko_KR",
  es: "es_ES",
  "pt-BR": "pt_BR",
}

export function openGraphLocale(locale: string): string {
  return OPEN_GRAPH_LOCALE_MAP[locale] ?? "en_US"
}

export function buildOgImages(alt?: string) {
  return [{ ...OG_IMAGE, alt: alt ?? "ImgSplit" }]
}

export const NOT_FOUND_METADATA: Metadata = {
  title: "Page Not Found | ImgSplit",
  robots: { index: false, follow: false },
  alternates: {},
}

export function buildLocaleAlternates(
  canonicalUrl: string,
  locales: string[],
  urlForLocale: (locale: string) => string
): NonNullable<Metadata["alternates"]> {
  if (locales.length <= 1) {
    return { canonical: canonicalUrl }
  }

  const xDefaultLocale = locales.includes(routing.defaultLocale)
    ? routing.defaultLocale
    : locales[0] ?? routing.defaultLocale

  return {
    canonical: canonicalUrl,
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, urlForLocale(locale)])),
      "x-default": urlForLocale(xDefaultLocale),
    },
  }
}
