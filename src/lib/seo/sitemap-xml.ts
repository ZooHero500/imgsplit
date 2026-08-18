import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { getAllToolPages } from "@/lib/pseo"
import {
  CORE_PAGE_LAST_MODIFIED,
  getCoreToolHrefLastModified,
  getPseoSlugLastModified,
  toLastModifiedDate,
} from "@/lib/seo/last-modified"
import { buildLocaleAlternates, SITE_BASE_URL } from "@/lib/seo/metadata"
import { CORE_TOOLS } from "@/lib/tools/catalog"

const BASE_URL = SITE_BASE_URL

function getLocalizedUrl(path: string, locale: string) {
  if (path === "/") {
    return locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`
  }

  return locale === routing.defaultLocale
    ? `${BASE_URL}${path}`
    : `${BASE_URL}/${locale}${path}`
}

function getLocalizedToolPageUrl(slug: string, locale: string) {
  return locale === routing.defaultLocale
    ? `${BASE_URL}/${slug}`
    : `${BASE_URL}/${locale}/${slug}`
}

function buildSitemapAlternates(
  canonicalUrl: string,
  locales: string[],
  urlForLocale: (locale: string) => string
): NonNullable<MetadataRoute.Sitemap[number]["alternates"]> {
  const alternates = buildLocaleAlternates(canonicalUrl, locales, urlForLocale)
  return alternates as NonNullable<MetadataRoute.Sitemap[number]["alternates"]>
}

function getToolPageSitemapPriority(slug: string, locale: string): number {
  if (
    [
      "youtube-thumbnail-size",
      "instagram-post-size",
      "instagram-story-size",
      "facebook-cover-photo-size",
    ].includes(slug)
  ) {
    return 0.85
  }

  if (["linkedin-post-size", "twitter-header-size"].includes(slug)) {
    return 0.82
  }

  if (
    ["xiaohongshu-cover-size", "wechat-official-account-cover-size"].includes(slug)
  ) {
    return locale === "zh-CN" ? 0.82 : 0.5
  }

  if (slug === "social-media-image-resizer") {
    return 0.6
  }

  if (slug === "wechat-cover-size" && locale !== "zh-CN") {
    return 0.5
  }

  return 0.8
}

export function buildCoreSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    entries.push({
      url: getLocalizedUrl("/", locale),
      lastModified: toLastModifiedDate(CORE_PAGE_LAST_MODIFIED.home),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: buildSitemapAlternates(
        getLocalizedUrl("/", locale),
        [...routing.locales],
        (l) => getLocalizedUrl("/", l)
      ),
    })
  }

  for (const tool of CORE_TOOLS.filter((tool) => tool.href !== "/")) {
    const lastModified = toLastModifiedDate(getCoreToolHrefLastModified(tool.href))

    for (const locale of routing.locales) {
      entries.push({
        url: getLocalizedUrl(tool.href, locale),
        lastModified,
        changeFrequency: "weekly",
        priority: tool.sitemapPriority,
        alternates: buildSitemapAlternates(
          getLocalizedUrl(tool.href, locale),
          [...routing.locales],
          (l) => getLocalizedUrl(tool.href, l)
        ),
      })
    }
  }

  const staticPages = [
    { path: "/tools", lastModified: CORE_PAGE_LAST_MODIFIED.tools, priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about", lastModified: CORE_PAGE_LAST_MODIFIED.about, priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/privacy", lastModified: CORE_PAGE_LAST_MODIFIED.privacy, priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/terms", lastModified: CORE_PAGE_LAST_MODIFIED.terms, priority: 0.3, changeFrequency: "monthly" as const },
  ]

  for (const page of staticPages) {
    for (const locale of routing.locales) {
      entries.push({
        url: getLocalizedUrl(page.path, locale),
        lastModified: toLastModifiedDate(page.lastModified),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: buildSitemapAlternates(
          getLocalizedUrl(page.path, locale),
          [...routing.locales],
          (l) => getLocalizedUrl(page.path, l)
        ),
      })
    }
  }

  return entries
}

export function buildPseoSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const toolPages = getAllToolPages()

  for (const page of toolPages) {
    const locales = Object.keys(page.locales)
    const lastModified = toLastModifiedDate(getPseoSlugLastModified(page.slug))

    for (const locale of locales) {
      const url = getLocalizedToolPageUrl(page.slug, locale)

      entries.push({
        url,
        lastModified,
        changeFrequency: "weekly",
        priority: getToolPageSitemapPriority(page.slug, locale),
        alternates: buildSitemapAlternates(
          url,
          locales,
          (l) => getLocalizedToolPageUrl(page.slug, l)
        ),
      })
    }
  }

  return entries
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

function formatLastModified(lastModified: MetadataRoute.Sitemap[number]["lastModified"]): string | null {
  if (!lastModified) return null
  const date = lastModified instanceof Date ? lastModified : new Date(lastModified)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

function serializeAlternateLinks(
  alternates: MetadataRoute.Sitemap[number]["alternates"]
): string {
  if (!alternates?.languages) return ""

  return Object.entries(alternates.languages)
    .map(([hreflang, href]) => {
      if (typeof href !== "string") return ""
      return `<xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}" />`
    })
    .join("")
}

export function serializeSitemapXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const lastmod = formatLastModified(entry.lastModified)
      const alternateLinks = serializeAlternateLinks(entry.alternates)

      return `<url>
<loc>${escapeXml(entry.url)}</loc>${lastmod ? `\n<lastmod>${lastmod}</lastmod>` : ""}${entry.changeFrequency ? `\n<changefreq>${entry.changeFrequency}</changefreq>` : ""}${entry.priority != null ? `\n<priority>${entry.priority}</priority>` : ""}${alternateLinks ? `\n${alternateLinks}` : ""}
</url>`
    })
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`
}

export function serializeSitemapIndexXml(locations: string[]): string {
  const entries = locations
    .map((loc) => `<sitemap><loc>${escapeXml(loc)}</loc></sitemap>`)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`
}

export function getSitemapEntriesById(id: string): MetadataRoute.Sitemap | null {
  if (id === "0") return buildCoreSitemapEntries()
  if (id === "1") return buildPseoSitemapEntries()
  return null
}
