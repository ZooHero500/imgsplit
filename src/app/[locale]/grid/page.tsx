import { getTranslations, setRequestLocale } from "next-intl/server"
import { JsonLd } from "@/components/JsonLd"
import { FaqItem } from "../FaqSection"
import { GridLandingContent } from "./GridLandingContent"
import { InkButton } from "@/components/ui/InkButton"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteFrame } from "@/components/SiteFrame"
import { SiteNav } from "@/components/SiteNav"
import {
  Grid3X3,
  ArrowRight,
  Columns3,
  LayoutGrid,
} from "lucide-react"

export default async function GridPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("grid")
  const tLanding = await getTranslations("grid.landing")

  return (
    <main className="min-h-screen bg-background relative">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ImgSplit", item: "https://imgsplit.com" },
            { "@type": "ListItem", position: 2, name: t("metadata.title") },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "@id": "https://imgsplit.com/grid#app",
          name: "ImgSplit Grid",
          dateModified: "2026-03-24",
          url: locale === "en" ? "https://imgsplit.com/grid" : `https://imgsplit.com/${locale}/grid`,
          description: t("metadata.description"),
          applicationCategory: "DesignApplication",
          operatingSystem: "Any",
          inLanguage: ({ en: "en", "zh-CN": "zh-Hans", ja: "ja", ko: "ko", es: "es" }[locale] ?? "en"),
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@id": "https://imgsplit.com/#organization" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t("metadata.title"),
          description: t("metadata.description"),
          dateModified: "2026-03-24",
          step: [
            { "@type": "HowToStep", position: 1, name: tLanding("howItWorks.step1Title"), text: tLanding("howItWorks.step1Desc") },
            { "@type": "HowToStep", position: 2, name: tLanding("howItWorks.step2Title"), text: tLanding("howItWorks.step2Desc") },
            { "@type": "HowToStep", position: 3, name: tLanding("howItWorks.step3Title"), text: tLanding("howItWorks.step3Desc") },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: tLanding("faq.q1"), acceptedAnswer: { "@type": "Answer", text: tLanding("faq.a1") } },
            { "@type": "Question", name: tLanding("faq.q2"), acceptedAnswer: { "@type": "Answer", text: tLanding("faq.a2") } },
            { "@type": "Question", name: tLanding("faq.q3"), acceptedAnswer: { "@type": "Answer", text: tLanding("faq.a3") } },
            { "@type": "Question", name: tLanding("faq.q4"), acceptedAnswer: { "@type": "Answer", text: tLanding("faq.a4") } },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://imgsplit.com/#organization",
          name: "ImgSplit",
          url: "https://imgsplit.com",
          logo: {
            "@type": "ImageObject",
            url: "https://imgsplit.com/og-image.png",
            width: 1200,
            height: 630,
          },
          sameAs: [
            "https://github.com/ZooHero500/online-image-segmentation",
            "https://x.com/zooheroes",
          ],
        }}
      />

      <SiteFrame>
        <SiteNav
          locale={locale}
          links={[
            { href: "#grid-types", label: tLanding("types.overline") },
            { href: "#how-it-works", label: tLanding("howItWorks.overline") },
            { href: "#faq", label: tLanding("faq.overline") },
          ]}
          ctaLabel={tLanding("hero.ctaPrimary")}
          ctaHref="#upload"
        />

        {/* HERO */}
        <section className="relative border-b border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 md:col-start-1">
              <div className="kicker mb-8 hero-enter hero-delay-1">
                {tLanding("hero.overline")}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-9xl leading-[1.05] tracking-tight mb-6 sm:mb-8 hero-enter hero-delay-2">
                {tLanding("hero.headlinePart1")}
                <em className="text-accent-deep italic">{tLanding("hero.headlineAccent")}</em>
                <br />
                {tLanding("hero.headlinePart2")}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-ink-soft leading-relaxed max-w-md mb-8 sm:mb-10 hero-enter hero-delay-3">
                {tLanding("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 hero-enter hero-delay-4">
                <InkButton href="#upload" icon={<ArrowRight />}>
                  {tLanding("hero.ctaPrimary")}
                </InkButton>
                <a
                  href="#grid-types"
                  className="inline-flex items-center justify-center gap-2 border border-ink px-6 sm:px-10 py-3 sm:py-4 text-xs uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-paper transition-all duration-500 press"
                >
                  {tLanding("hero.ctaSecondary")}
                </a>
              </div>
            </div>

            {/* Vertical decorative text */}
            <div className="hidden lg:flex col-span-2 col-start-11 items-end justify-end pb-4 hero-enter hero-delay-4">
              <span className="writing-vertical font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/50">
                Grid / Vol. 02
              </span>
            </div>
          </div>
        </section>

        {/* GRID TYPES */}
        <section id="grid-types" className="border-t border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4 mb-12">
            <div className="col-span-12 md:col-span-8 md:col-start-2">
              <div className="kicker mb-4">{tLanding("types.overline")}</div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {tLanding("types.headlinePart1")}
                <em className="text-accent-deep italic">{tLanding("types.headlineAccent")}</em>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            <div className="group border-t border-ink p-8 md:p-12 transition-colors duration-700 hover:bg-secondary/40">
              <div className="text-signal mb-6 transition-colors duration-500">
                <Grid3X3 className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-condensed text-sm font-bold uppercase tracking-[0.15em] text-foreground mb-3">
                {tLanding("types.3x3Title")}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                {tLanding("types.3x3Desc")}
              </p>
            </div>
            <div className="group border-t border-ink p-8 md:p-12 transition-colors duration-700 hover:bg-secondary/40">
              <div className="text-signal mb-6 transition-colors duration-500">
                <Columns3 className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-condensed text-sm font-bold uppercase tracking-[0.15em] text-foreground mb-3">
                {tLanding("types.1x3Title")}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                {tLanding("types.1x3Desc")}
              </p>
            </div>
            <div className="group border-t border-ink p-8 md:p-12 transition-colors duration-700 hover:bg-secondary/40">
              <div className="text-signal mb-6 transition-colors duration-500">
                <LayoutGrid className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-condensed text-sm font-bold uppercase tracking-[0.15em] text-foreground mb-3">
                {tLanding("types.2x2Title")}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                {tLanding("types.2x2Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* UPLOAD */}
        <section id="upload" className="border-b border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="mb-8">
            <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft">
              {tLanding("howItWorks.step1Title")}
            </span>
          </div>
          <GridLandingContent />
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="border-t border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="mb-12">
            <div className="kicker mb-4">{tLanding("howItWorks.overline")}</div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {tLanding("howItWorks.headlinePart1")}
              <em className="text-accent-deep italic">
                {tLanding("howItWorks.headlineAccent")}
              </em>
            </h2>
          </div>

          <div className="grid gap-px border border-ink bg-ink md:grid-cols-3">
            <div className="step">
              <span className="step-num">01</span>
              <strong>{tLanding("howItWorks.step1Title")}</strong>
              <p>{tLanding("howItWorks.step1Desc")}</p>
            </div>
            <div className="step">
              <span className="step-num">02</span>
              <strong>{tLanding("howItWorks.step2Title")}</strong>
              <p>{tLanding("howItWorks.step2Desc")}</p>
            </div>
            <div className="step">
              <span className="step-num">03</span>
              <strong>{tLanding("howItWorks.step3Title")}</strong>
              <p>{tLanding("howItWorks.step3Desc")}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-7 md:col-start-2">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-primary-foreground mb-6">
                {tLanding("cta.headlinePart1")}
                <em className="text-signal italic">
                  {tLanding("cta.headlineAccent")}
                </em>
              </h2>
              <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-md mb-10">
                {tLanding("cta.description")}
              </p>
              <InkButton href="#upload" variant="inverse" icon={<ArrowRight />}>
                {tLanding("cta.button")}
              </InkButton>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4">
              <div className="kicker mb-4">{tLanding("faq.overline")}</div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-4">
                {tLanding("faq.headlinePart1")}
                <em className="text-accent-deep italic">
                  {tLanding("faq.headlineAccent")}
                </em>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                {tLanding("faq.subtitle")}
              </p>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <div className="space-y-0">
                <FaqItem question={tLanding("faq.q1")} answer={tLanding("faq.a1")} />
                <FaqItem question={tLanding("faq.q2")} answer={tLanding("faq.a2")} />
                <FaqItem question={tLanding("faq.q3")} answer={tLanding("faq.a3")} />
                <FaqItem question={tLanding("faq.q4")} answer={tLanding("faq.a4")} />
              </div>
            </div>
          </div>
        </section>

        <SiteFooter locale={locale} />
      </SiteFrame>
    </main>
  )
}
