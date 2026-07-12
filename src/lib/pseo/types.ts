import type { routing } from "@/i18n/routing"

export type PseoLocale = (typeof routing.locales)[number]

export type ToolCategory = "direction" | "use-case"

export interface ScenarioCard {
  icon: string
  title: string
  description: string
}

export interface HowToStep {
  stepNumber: number
  title: string
  description: string
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface RelatedTool {
  slug: string
  title: string
  description: string
}

export interface ToolPageSeo {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
}

export interface ToolPageData {
  slug: string
  category: ToolCategory
  seo: ToolPageSeo
  hero: {
    overline: string
    headlinePart1: string
    headlineAccent: string
    headlinePart2: string
    description: string
  }
  scenarios: ScenarioCard[]
  howToSteps: HowToStep[]
  faqEntries: FaqEntry[]
  relatedTools: RelatedTool[]
  platformInfo?: string
}

/** Flat seed row shared by the per-tool pSEO page factories (mosaic, collage, social-export, background-removal). */
export interface ToolPageSeed {
  slug: string
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  overline: string
  headlinePart1: string
  headlineAccent: string
  headlinePart2: string
  heroDescription: string
  scenarios: ToolPageData["scenarios"]
  faqEntries: ToolPageData["faqEntries"]
}

export interface ToolPageConfig {
  slug: string
  category: ToolCategory
  locales: Record<string, ToolPageData>
}
