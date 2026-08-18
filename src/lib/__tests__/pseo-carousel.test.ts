import { describe, it, expect } from "vitest"
import { getToolPageData, getToolPageLocales, getAllToolPageParams } from "@/lib/pseo"
import { TOOL_EDITOR_HREFS } from "@/lib/tools/catalog"

describe("pseo carousel pages", () => {
  it("serves cortar-carrossel only in pt-BR", () => {
    expect(getToolPageData("cortar-carrossel", "pt-BR")).toBeTruthy()
    expect(getToolPageData("cortar-carrossel", "en")).toBeFalsy()
  })
  it("serves canva-image-splitter in en", () => {
    expect(getToolPageData("canva-image-splitter", "en")).toBeTruthy()
  })
  it("every generated param resolves to data", () => {
    const params = getAllToolPageParams().filter((p) => p.toolSlug.includes("carrossel") || p.toolSlug.includes("carousel") || p.toolSlug === "canva-image-splitter")
    for (const p of params) {
      expect(getToolPageData(p.toolSlug, p.locale)).toBeTruthy()
    }
    expect(params.length).toBeGreaterThan(0)
  })
  it("pt-BR carousel page exposes FAQ entries", () => {
    const data = getToolPageData("cortar-carrossel", "pt-BR")
    expect(data?.faqEntries.length).toBeGreaterThanOrEqual(3)
  })

  it("canva-image-splitter is available in every locale", () => {
    const locales = getToolPageLocales("canva-image-splitter")
    for (const locale of ["en", "zh-CN", "ja", "ko", "es", "pt-BR"]) {
      expect(locales).toContain(locale)
    }
  })

  it("pt-BR exclusive carousel slug is available only in pt-BR", () => {
    expect(getToolPageData("cortar-carrossel", "pt-BR")).toBeTruthy()
    expect(getToolPageData("cortar-carrossel", "en")).toBeFalsy()
    expect(getToolPageData("cortar-carrossel", "zh-CN")).toBeFalsy()
  })

  it("cortar-carrossel has People Also Ask FAQ questions", () => {
    const data = getToolPageData("cortar-carrossel", "pt-BR")
    const questions = data?.faqEntries.map((e) => e.question) ?? []
    expect(questions.some((q) => q.toLowerCase().includes("recortar"))).toBe(true)
    expect(questions.some((q) => q.toLowerCase().includes("cortar"))).toBe(true)
  })

  it("routes remaining carousel slugs to the carousel tool", () => {
    for (const slug of ["canva-image-splitter", "cortar-carrossel"]) {
      expect(TOOL_EDITOR_HREFS[slug]).toBeDefined()
      expect(TOOL_EDITOR_HREFS[slug].startsWith("/carousel")).toBe(true)
    }
  })

  it("carousel pages have all required fields", () => {
    const slugs = ["canva-image-splitter", "cortar-carrossel"]
    const localeMap: Record<string, string> = {
      "canva-image-splitter": "en",
      "cortar-carrossel": "pt-BR",
    }
    for (const slug of slugs) {
      const data = getToolPageData(slug, localeMap[slug])
      expect(data).toBeTruthy()
      expect(data?.seo.title).toBeTruthy()
      expect(data?.seo.description).toBeTruthy()
      expect(data?.hero.overline).toBeTruthy()
      expect(data?.scenarios.length).toBeGreaterThanOrEqual(3)
      expect(data?.howToSteps.length).toBeGreaterThanOrEqual(3)
      expect(data?.faqEntries.length).toBeGreaterThanOrEqual(3)
      expect(data?.relatedTools.length).toBeGreaterThanOrEqual(3)
    }
  })
})
