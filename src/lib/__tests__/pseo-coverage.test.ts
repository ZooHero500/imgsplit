import { describe, expect, it } from "vitest"
import { routing } from "@/i18n/routing"
import { getAllToolPages } from "@/lib/pseo"

/**
 * Slugs that are intentionally published for a single locale only
 * (locale-specific search keywords, not translations of each other).
 */
const LOCALE_EXCLUSIVE_SLUGS: Record<string, readonly string[]> = {
  "cortar-carrossel": ["pt-BR"],
  "cortar-imagens-carrossel": ["pt-BR"],
  "cortar-carrossel-infinito": ["pt-BR"],
  "xiaohongshu-cover-size": ["zh-CN"],
  "wechat-official-account-cover-size": ["zh-CN"],
}

describe("pSEO locale coverage", () => {
  const pages = getAllToolPages()

  it("exposes at least one pSEO page", () => {
    expect(pages.length).toBeGreaterThan(0)
  })

  it("every locale has data for every slug (except locale-exclusive pages)", () => {
    const missing: string[] = []
    for (const page of pages) {
      const requiredLocales = LOCALE_EXCLUSIVE_SLUGS[page.slug] ?? routing.locales
      for (const locale of requiredLocales) {
        if (!page.locales[locale]) {
          missing.push(`locale "${locale}" is missing slug "${page.slug}"`)
        }
      }
    }
    expect(missing).toEqual([])
  })

  it("locale-exclusive slugs exist in exactly their whitelisted locales", () => {
    const failures: string[] = []
    for (const [slug, expectedLocales] of Object.entries(LOCALE_EXCLUSIVE_SLUGS)) {
      const page = pages.find((candidate) => candidate.slug === slug)
      if (!page) {
        failures.push(`whitelisted slug "${slug}" no longer exists in the pSEO data`)
        continue
      }
      const actual = Object.keys(page.locales).sort()
      const expected = [...expectedLocales].sort()
      if (actual.join(",") !== expected.join(",")) {
        failures.push(`slug "${slug}" expected locales [${expected.join(", ")}] but has [${actual.join(", ")}]`)
      }
    }
    expect(failures).toEqual([])
  })

  it("page data only uses locales declared in routing", () => {
    const knownLocales = new Set<string>(routing.locales)
    const unknown: string[] = []
    for (const page of pages) {
      for (const locale of Object.keys(page.locales)) {
        if (!knownLocales.has(locale)) {
          unknown.push(`slug "${page.slug}" has data for unknown locale "${locale}"`)
        }
      }
    }
    expect(unknown).toEqual([])
  })
})
