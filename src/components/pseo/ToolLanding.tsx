import { Link } from "@/i18n/navigation"
import { LandingContent } from "@/app/[locale]/LandingContent"
import { SmartCTA } from "@/app/[locale]/SmartCTA"
import { FaqItem } from "@/app/[locale]/FaqSection"
import { RelatedTools } from "@/components/pseo/RelatedTools"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteFrame } from "@/components/SiteFrame"
import { SiteNav } from "@/components/SiteNav"
import type { ToolPageData } from "@/lib/pseo"
import { TOOL_EDITOR_HREFS } from "@/lib/tools/catalog"
import {
  Columns2,
  LayoutList,
  FileText,
  Columns3,
  LayoutDashboard,
  Grid2X2,
  Printer,
  MessageSquare,
  FileSearch,
  LayoutGrid,
  GalleryHorizontal,
  Share2,
  Camera,
  Sparkles,
  Maximize2,
  Image as ImageIcon,
  Ruler,
  DollarSign,
  GraduationCap,
  Smartphone,
  Layers,
  Crop,
  Youtube,
  Shield,
  Stamp,
  Type,
  Grid3X3,
  Images,
  Instagram,
  LayoutTemplate,
  Palette,
  ShieldCheck,
} from "lucide-react"
import type React from "react"

// ─── Icon Map ───

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Columns2,
  LayoutList,
  FileText,
  Columns3,
  LayoutDashboard,
  Grid2X2,
  Printer,
  MessageSquare,
  FileSearch,
  LayoutGrid,
  GalleryHorizontal,
  Share2,
  Camera,
  Sparkles,
  Maximize2,
  Image: ImageIcon,
  Ruler,
  DollarSign,
  GraduationCap,
  Smartphone,
  Layers,
  Crop,
  Youtube,
  Shield,
  Stamp,
  Type,
  Grid3X3,
  Images,
  Instagram,
  LayoutTemplate,
  Palette,
  ShieldCheck,
}

// ─── Translation Interfaces ───

interface NavTranslations {
  features: string
  howItWorks: string
  faq: string
  getStarted: string
  menu: string
  close: string
}

interface UploadSectionTranslations {
  overline: string
}

interface PseoChrome {
  scenariosTitle: string
  howItWorksTitle: string
  howItWorksHeadlinePart1: string
  howItWorksHeadlineAccent: string
  faqTitle: string
  relatedToolsTitle: string
  ctaButton: string
}

interface ToolLandingProps {
  data: ToolPageData
  locale: string
  t: {
    nav: NavTranslations
    uploadSection: UploadSectionTranslations
    pseoChrome: PseoChrome
  }
}

// ─── Component ───

export function ToolLanding({ data, locale, t }: ToolLandingProps) {
  const hasFaq = data.faqEntries.length > 0
  const editorHref = TOOL_EDITOR_HREFS[data.slug]

  return (
    <main className="min-h-screen bg-background relative">
      <SiteFrame>
        <SiteNav
          locale={locale}
          links={[
            { href: "#scenarios", label: t.nav.features },
            { href: "#how-it-works", label: t.nav.howItWorks },
            ...(hasFaq ? [{ href: "#faq", label: t.nav.faq }] : []),
          ]}
          ctaLabel={t.nav.getStarted}
          ctaHref={editorHref || "#upload"}
          smartCta
        />

        {/* HERO */}
        <section className="relative border-b border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 md:col-start-1">
              <div className="kicker mb-8 hero-enter hero-delay-1">{data.hero.overline}</div>

              <h1
                className="font-serif mb-6 sm:mb-8 hero-enter hero-delay-2"
                style={{
                  maxWidth: "13ch",
                  fontSize: "clamp(2.75rem, 5.4vw, 6.25rem)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.035em",
                  textWrap: "balance",
                }}
              >
                {data.hero.headlinePart1}{" "}
                <em className="text-accent-deep italic">{data.hero.headlineAccent}</em>{" "}
                <br />
                {data.hero.headlinePart2}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-ink-soft leading-relaxed max-w-md mb-8 sm:mb-10 hero-enter hero-delay-3">
                {data.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 hero-enter hero-delay-4">
                <SmartCTA label={t.pseoChrome.ctaButton} href={editorHref} />
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 border border-ink px-6 sm:px-10 py-3 sm:py-4 text-xs uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-paper transition-all duration-500 press"
                >
                  {t.nav.howItWorks}
                </a>
              </div>

              {/* Platform Info */}
              {data.platformInfo && (
                <div className="mt-8 hero-enter hero-delay-4">
                  <div className="border-l-2 border-rule bg-secondary/60 px-4 py-3 text-sm text-ink-soft">
                    {data.platformInfo}
                  </div>
                </div>
              )}
            </div>

            {/* Vertical decorative text */}
            <div className="hidden lg:flex col-span-2 col-start-11 items-end justify-end pb-4 hero-enter hero-delay-4">
              <span className="writing-vertical font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/50">
                Editorial / Vol. 01
              </span>
            </div>
          </div>
        </section>

        {/* UPLOAD — editor wrappers deep-link to focused tools; split pages keep inline splitter. */}
        <section id="upload" className="border-b border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="mb-8 text-center">
            <span className="kicker inline-flex">{t.uploadSection.overline}</span>
          </div>
          {editorHref ? (
            <Link
              href={editorHref}
              className="group flex flex-col items-center justify-center border border-ink bg-paper p-8 sm:p-16 md:p-24 transition-colors duration-500 ease-luxury hover:border-primary/40 cursor-pointer"
            >
              <div className="text-center">
                <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-ink-soft mb-6">
                  {data.hero.overline}
                </p>
                <p className="font-serif text-2xl md:text-3xl text-foreground mb-4 group-hover:text-signal transition-colors duration-500">
                  {t.pseoChrome.ctaButton} →
                </p>
                <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-ink-soft/70">
                  PNG · JPEG · WebP
                </p>
              </div>
            </Link>
          ) : (
            <LandingContent />
          )}
        </section>

        {/* SCENARIOS */}
        <section id="scenarios" className="border-t border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="mb-12">
            <div className="kicker mb-4">{t.pseoChrome.scenariosTitle}</div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {data.hero.headlinePart1}{" "}
              <em className="text-accent-deep italic">{data.hero.headlineAccent}</em>
            </h2>
          </div>

          <div
            className={`grid gap-0 ${
              data.scenarios.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            {data.scenarios.map((scenario, i) => {
              const IconComponent = iconMap[scenario.icon]
              return (
                <div
                  key={i}
                  className="group border-t border-ink p-8 md:p-12 transition-colors duration-700 hover:bg-secondary/40"
                >
                  <div className="text-signal mb-6 transition-colors duration-500">
                    {IconComponent ? (
                      <IconComponent className="h-4 w-4" strokeWidth={1.5} />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                  </div>
                  <h3 className="font-condensed text-sm font-bold uppercase tracking-[0.15em] text-foreground mb-3">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {scenario.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="border-t border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="mb-12">
            <div className="kicker mb-4">{t.pseoChrome.howItWorksTitle}</div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {t.pseoChrome.howItWorksHeadlinePart1}
              <em className="text-accent-deep italic">{t.pseoChrome.howItWorksHeadlineAccent}</em>
            </h2>
          </div>

          <div
            className={`grid gap-px border border-ink bg-ink ${
              data.howToSteps.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"
            }`}
          >
            {data.howToSteps.map((step) => (
              <div key={step.stepNumber} className="step">
                <span className="step-num">{String(step.stepNumber).padStart(2, "0")}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        {data.faqEntries.length > 0 && (
          <section id="faq" className="border-t border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
            <div className="grid grid-cols-12 gap-8 md:gap-16">
              <div className="col-span-12 md:col-span-4">
                <div className="kicker mb-4">{t.pseoChrome.faqTitle}</div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
                  {t.pseoChrome.faqTitle}
                </h2>
              </div>
              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <div className="space-y-0">
                  {data.faqEntries.map((entry, i) => (
                    <FaqItem key={i} question={entry.question} answer={entry.answer} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED TOOLS */}
        <section className="border-t border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <RelatedTools
            tools={data.relatedTools}
            locale={locale}
            title={t.pseoChrome.relatedToolsTitle}
          />
        </section>

        <SiteFooter locale={locale} />
      </SiteFrame>
    </main>
  )
}
