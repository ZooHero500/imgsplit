import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { LandingContent } from "./LandingContent"
import { SmartCTA } from "./SmartCTA"
import { FaqItem } from "./FaqSection"
import { JsonLd } from "@/components/JsonLd"
import { ReturningUserToolbar } from "@/components/ReturningUserToolbar"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteFrame } from "@/components/SiteFrame"
import { SiteNav } from "@/components/SiteNav"
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Image as ImageIcon,
  Shield,
  Zap,
} from "lucide-react"
import type React from "react"
import { CORE_PAGE_LAST_MODIFIED } from "@/lib/seo/last-modified"
import {
  buildOgImages,
  openGraphLocale,
  SITE_BASE_URL,
} from "@/lib/seo/metadata"

const BASE_URL = SITE_BASE_URL

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const canonicalUrl =
    locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            l === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${l}`,
          ])
        ),
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "ImgSplit",
      type: "website",
      locale: openGraphLocale(locale),
      images: buildOgImages(t("title")),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${BASE_URL}/og-image.png`],
    },
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  return (
    <main className="min-h-screen bg-background relative">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ImgSplit", item: "https://imgsplit.com" },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://imgsplit.com/#website",
          name: "ImgSplit",
          url: "https://imgsplit.com",
          description: t("metadata.description"),
          inLanguage: ({ en: "en", "zh-CN": "zh-Hans", ja: "ja", ko: "ko", es: "es" }[locale] ?? "en"),
          publisher: { "@id": "https://imgsplit.com/#organization" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "@id": "https://imgsplit.com/#app",
          name: "ImgSplit",
          url: "https://imgsplit.com",
          description: t("hero.description"),
          dateModified: CORE_PAGE_LAST_MODIFIED.home,
          applicationCategory: "DesignApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            t("jsonLd.feature1"),
            t("jsonLd.feature2"),
            t("jsonLd.feature3"),
            t("jsonLd.feature4"),
            t("jsonLd.feature5"),
            t("jsonLd.feature6"),
          ],
          image: "https://imgsplit.com/og-image.png",
          publisher: { "@id": "https://imgsplit.com/#organization" },
          isPartOf: { "@id": "https://imgsplit.com/#website" },
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "#features h2", "#faq"],
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: t("faq.q1"), acceptedAnswer: { "@type": "Answer", text: t("faq.a1") } },
            { "@type": "Question", name: t("faq.q2"), acceptedAnswer: { "@type": "Answer", text: t("faq.a2") } },
            { "@type": "Question", name: t("faq.q3"), acceptedAnswer: { "@type": "Answer", text: t("faq.a3") } },
            { "@type": "Question", name: t("faq.q4"), acceptedAnswer: { "@type": "Answer", text: t("faq.a4") } },
            { "@type": "Question", name: t("faq.q5"), acceptedAnswer: { "@type": "Answer", text: t("faq.a5") } },
            { "@type": "Question", name: t("faq.q6"), acceptedAnswer: { "@type": "Answer", text: t("faq.a6") } },
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
            url: `${BASE_URL}/logo-256.png`,
            width: 256,
            height: 256,
          },
          description: t("metadata.description"),
          sameAs: [
            "https://github.com/ZooHero500/imgsplit",
            "https://x.com/zooheroes",
          ],
          founder: {
            "@type": "Person",
            name: "ZooHero",
            url: "https://github.com/ZooHero500",
            sameAs: [
              "https://github.com/ZooHero500",
              "https://x.com/zooheroes",
            ],
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: "zoohero.dev@gmail.com",
            contactType: "customer support",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t("steps.overline"),
          description: t("metadata.description"),
          dateModified: CORE_PAGE_LAST_MODIFIED.home,
          step: [
            { "@type": "HowToStep", position: 1, name: t("steps.step1Title"), text: t("steps.step1Desc") },
            { "@type": "HowToStep", position: 2, name: t("steps.step2Title"), text: t("steps.step2Desc") },
            { "@type": "HowToStep", position: 3, name: t("steps.step3Title"), text: t("steps.step3Desc") },
            { "@type": "HowToStep", position: 4, name: t("steps.step4Title"), text: t("steps.step4Desc") },
          ],
        }}
      />

      <SiteFrame>
        <SiteNav
          locale={locale}
          links={[
            { href: "#features", label: t("nav.features") },
            { href: "#how-it-works", label: t("nav.howItWorks") },
            { href: "#faq", label: t("nav.faq") },
          ]}
          ctaLabel={t("nav.getStarted")}
          ctaHref="#upload"
          smartCta
        />

        {/* QUICK ACCESS — returning users only */}
        <ReturningUserToolbar />

        {/* HERO */}
        <section className="relative border-b border-ink">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0 px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
              <div className="kicker mb-8 hero-enter hero-delay-1">{t("hero.overline")}</div>

              <h1
                className="font-serif mb-6 sm:mb-8 hero-enter hero-delay-2"
                style={{
                  maxWidth: "14ch",
                  fontSize: "clamp(2.75rem, 6.25vw, 7.25rem)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.035em",
                  textWrap: "balance",
                }}
              >
                {t("hero.headlinePart1")}{" "}
                <em className="text-accent-deep italic">{t("hero.headlineAccent")}</em>{" "}
                <br />
                {t("hero.headlinePart2")}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-ink-soft leading-relaxed max-w-md mb-8 sm:mb-10 hero-enter hero-delay-3">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 hero-enter hero-delay-4">
                <SmartCTA label={t("hero.ctaPrimary")} />
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 border border-ink px-6 sm:px-10 py-3 sm:py-4 text-xs uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-paper transition-all duration-500 press"
                >
                  {t("hero.ctaSecondary")}
                </a>
              </div>
            </div>

            {/* Hero index rail */}
            <aside className="hero-index hidden lg:grid" aria-label={t("hero.overline")}>
              <IndexItem letter="A" title={t("index.aTitle")} desc={t("index.aDesc")} />
              <IndexItem letter="B" title={t("index.bTitle")} desc={t("index.bDesc")} />
              <IndexItem letter="C" title={t("index.cTitle")} desc={t("index.cDesc")} />
              <IndexItem letter="D" title={t("index.dTitle")} desc={t("index.dDesc")} />
            </aside>
          </div>
        </section>

        {/* TRUST INDICATORS */}
        <section className="border-t border-ink px-4 sm:px-8 md:px-16 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <TrustItem
              icon={<Shield className="h-4 w-4" strokeWidth={1.5} />}
              label={t("trust.privacyLabel")}
              desc={t("trust.privacyDesc")}
            />
            <TrustItem
              icon={<Zap className="h-4 w-4" strokeWidth={1.5} />}
              label={t("trust.speedLabel")}
              desc={t("trust.speedDesc")}
            />
            <TrustItem
              icon={<ImageIcon className="h-4 w-4" strokeWidth={1.5} />}
              label={t("trust.qualityLabel")}
              desc={t("trust.qualityDesc")}
            />
            <TrustItem
              icon={<Download className="h-4 w-4" strokeWidth={1.5} />}
              label={t("trust.freeLabel")}
              desc={t("trust.freeDesc")}
            />
          </div>
        </section>

        {/* UPLOAD */}
        <section
          id="upload"
          className="signature-stage"
          style={{ "--stage-note": t("stage.note") } as React.CSSProperties}
        >
          <div className="stage-copy">
            <div className="kicker mb-6">{t("stage.kicker")}</div>
            <p>{t("stage.copy")}</p>
            <LandingContent />
          </div>
        </section>

        {/* BENEFITS - Dark Section */}
        <section className="bg-primary px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-12 gap-4 mb-12">
            <div className="col-span-12 md:col-span-6">
              <span className="font-condensed text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/65 mb-4 block">
                {t("benefits.overline")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-primary-foreground">
                {t("benefits.headlinePart1")}{" "}
                <em className="text-signal italic">{t("benefits.headlineAccent")}</em>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-8 flex items-end">
              <p className="text-sm text-primary-foreground/60 leading-relaxed">
                {t("benefits.subtitle")}
              </p>
            </div>
          </div>

          <div className="benefits">
            <BenefitCard
              num="01"
              label="Private"
              title={t("benefits.noPsTitle")}
              description={t("benefits.noPsDesc")}
            />
            <BenefitCard
              num="02"
              label="Speed"
              title={t("benefits.privacyTitle")}
              description={t("benefits.privacyDesc")}
            />
            <BenefitCard
              num="03"
              label="Batch"
              title={t("benefits.batchTitle")}
              description={t("benefits.batchDesc")}
            />
            <BenefitCard
              num="04"
              label="Devices"
              title={t("benefits.crossPlatformTitle")}
              description={t("benefits.crossPlatformDesc")}
            />
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24 border-t border-ink">
          <div className="grid grid-cols-12 gap-4 mb-12">
            <div className="col-span-12 md:col-span-8 md:col-start-2">
              <div className="kicker mb-4">{t("features.overline")}</div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t("features.headlinePart1")}{" "}
                <em className="text-accent-deep italic">{t("features.headlineAccent")}</em>
              </h2>
            </div>
          </div>

          <div className="tool-grid">
            <FeatureCell
              num="01"
              title={t("features.preciseTitle")}
              description={t("features.preciseDesc")}
              href="/split-in-half"
            />
            <FeatureCell
              num="02"
              title={t("features.privacyTitle")}
              description={t("features.privacyDesc")}
              href="/no-photoshop-slicer"
            />
            <FeatureCell
              num="03"
              title={t("features.downloadTitle")}
              description={t("features.downloadDesc")}
              href="/split-into-equal-parts"
            />
            <FeatureCell
              num="04"
              title={t("features.gridTitle")}
              description={t("features.gridDesc")}
              href="/grid"
            />
            <FeatureCell
              num="05"
              title={t("features.formatTitle")}
              description={t("features.formatDesc")}
              href="/split-horizontally"
            />
            <FeatureCell
              num="06"
              title={t("features.previewTitle")}
              description={t("features.previewDesc")}
              href="/split-vertically"
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="border-t border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4 mb-12">
            <div className="col-span-12 md:col-span-8">
              <div className="kicker mb-4">{t("steps.overline")}</div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t("steps.headlinePart1")}{" "}
                <em className="text-accent-deep italic">{t("steps.headlineAccent")}</em>
              </h2>
            </div>
          </div>

          <div className="step-row">
            <StepCard
              step={1}
              title={t("steps.step1Title")}
              description={t("steps.step1Desc")}
            />
            <StepCard
              step={2}
              title={t("steps.step2Title")}
              description={t("steps.step2Desc")}
            />
            <StepCard
              step={3}
              title={t("steps.step3Title")}
              description={t("steps.step3Desc")}
            />
            <StepCard
              step={4}
              title={t("steps.step4Title")}
              description={t("steps.step4Desc")}
            />
          </div>
        </section>

        {/* USE CASES */}
        <section className="bg-primary px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-12 gap-4 mb-12">
            <div className="col-span-12 md:col-span-6">
              <span className="font-condensed text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/65 mb-4 block">
                {t("useCases.overline")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-primary-foreground">
                {t("useCases.headlinePart1")}{" "}
                <em className="text-signal italic">{t("useCases.headlineAccent")}</em>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-primary-foreground/10">
            <UseCaseCard
              title={t("useCases.ecommerceTitle")}
              description={t("useCases.ecommerceDesc")}
              result={t("useCases.ecommerceResult")}
              href="/split-long-screenshot"
            />
            <UseCaseCard
              title={t("useCases.designerTitle")}
              description={t("useCases.designerDesc")}
              result={t("useCases.designerResult")}
              href="/no-photoshop-slicer"
            />
            <UseCaseCard
              title={t("useCases.socialTitle")}
              description={t("useCases.socialDesc")}
              result={t("useCases.socialResult")}
              href="/split-for-instagram"
            />
          </div>
        </section>

        {/* WHY IMGSPLIT */}
        <section className="px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24 border-t border-ink">
          <div className="grid grid-cols-12 gap-4 mb-12">
            <div className="col-span-12 md:col-span-8 md:col-start-2">
              <div className="kicker mb-4">{t("comparison.overline")}</div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-4">
                {t("comparison.headlinePart1")}{" "}
                <em className="text-accent-deep italic">{t("comparison.headlineAccent")}</em>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed max-w-lg">
                {t("comparison.subtitle")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            <ComparisonCard
              title={t("comparison.feature1")}
              description={t("comparison.feature1Desc")}
            />
            <ComparisonCard
              title={t("comparison.feature2")}
              description={t("comparison.feature2Desc")}
            />
            <ComparisonCard
              title={t("comparison.feature3")}
              description={t("comparison.feature3Desc")}
            />
            <ComparisonCard
              title={t("comparison.feature4")}
              description={t("comparison.feature4Desc")}
            />
            <ComparisonCard
              title={t("comparison.feature5")}
              description={t("comparison.feature5Desc")}
            />
            <ComparisonCard
              title={t("comparison.feature6")}
              description={t("comparison.feature6Desc")}
            />
          </div>
        </section>

        {/* STATS */}
        <section className="bg-primary px-4 sm:px-8 md:px-16 py-12 sm:py-14 md:py-16">
          <div className="mb-10">
            <span className="font-condensed text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/65 mb-4 block">
              {t("stats.overline")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-primary-foreground">
              {t("stats.headlinePart1")}{" "}
              <em className="text-signal italic">{t("stats.headlineAccent")}</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
            <StatCard value={t("stats.stat1Value")} label={t("stats.stat1Label")} />
            <StatCard value={t("stats.stat2Value")} label={t("stats.stat2Label")} />
            <StatCard value={t("stats.stat3Value")} label={t("stats.stat3Label")} />
            <StatCard value={t("stats.stat4Value")} label={t("stats.stat4Label")} />
            <StatCard value={t("stats.stat5Value")} label={t("stats.stat5Label")} />
            <StatCard value={t("stats.stat6Value")} label={t("stats.stat6Label")} />
          </div>
        </section>

        {/* CTA */}
        <section className="cta-band">
          <h2>
            {t("cta.headlinePart1")}{" "}
            <em className="text-accent-deep italic">{t("cta.headlineAccent")}</em>
          </h2>
          <p>{t("cta.description")}</p>
          <div>
            <SmartCTA label={t("cta.button")} size="hero" />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-ink">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_330px]">
            <div className="min-w-0 border-b border-ink lg:border-b-0 lg:border-r lg:border-ink">
              <header className="p-[30px_26px] border-b border-ink">
                <div className="kicker mb-4">{t("faq.overline")}</div>
                <h2 className="font-serif text-3xl sm:text-4xl leading-[1.1] mb-4">
                  {t("faq.headlinePart1")}{" "}
                  <em className="text-accent-deep italic">{t("faq.headlineAccent")}</em>
                </h2>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {t("faq.subtitle")}
                </p>
              </header>
              <div className="px-[26px] pb-6">
                <FaqItem question={t("faq.q1")} answer={t("faq.a1")} />
                <FaqItem question={t("faq.q2")} answer={t("faq.a2")} />
                <FaqItem question={t("faq.q3")} answer={t("faq.a3")} />
                <FaqItem question={t("faq.q4")} answer={t("faq.a4")} />
                <FaqItem question={t("faq.q5")} answer={t("faq.a5")} />
                <FaqItem question={t("faq.q6")} answer={t("faq.a6")} />
              </div>
            </div>

            <aside className="grid content-between gap-8 p-[30px_26px]">
              <div>
                <div className="eyebrow mb-2.5">FAQ</div>
                <p className="font-condensed text-2xl font-bold uppercase leading-[1.15] tracking-[-0.01em] mb-2">
                  {t("faq.headlinePart1")}{" "}
                  <em className="text-accent-deep italic normal-case">{t("faq.headlineAccent")}</em>
                </p>
              </div>
              <p className="text-xs leading-[1.8] text-ink">{t("faqFeedback")}</p>
            </aside>
          </div>
        </section>

        <SiteFooter locale={locale} />
      </SiteFrame>
    </main>
  )
}

/* ─── Hero index item ─── */
function IndexItem({
  letter,
  title,
  desc,
}: {
  letter: string
  title: string
  desc: string
}) {
  return (
    <div className="index-item">
      <span className="index-number">{letter}</span>
      <span className="index-copy">
        <strong>{title}</strong>
        <span>{desc}</span>
      </span>
    </div>
  )
}

/* ─── Trust Item ─── */
function TrustItem({
  icon,
  label,
  desc,
}: {
  icon: React.ReactNode
  label: string
  desc: string
}) {
  return (
    <div className="flex flex-col items-start gap-3 p-6 border-t border-ink">
      <div className="text-signal">{icon}</div>
      <span className="font-condensed text-xs font-bold uppercase tracking-[0.2em] text-foreground">
        {label}
      </span>
      <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-ink-soft">
        {desc}
      </span>
    </div>
  )
}

/* ─── Benefit Card (Dark bg) ─── */
function BenefitCard({
  num,
  label,
  title,
  description,
}: {
  num: string
  label: string
  title: string
  description: string
}) {
  return (
    <div className="benefit">
      <div className="benefit-rail">
        <strong>{num}</strong>
        <span>{label}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

/* ─── Feature Cell (tool register) ─── */
function FeatureCell({
  num,
  title,
  description,
  href,
}: {
  num: string
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href} className="tool-cell">
      <span className="tool-top">
        <span className="tool-num">{num}</span>
        <span className="tool-arrow" aria-hidden="true">
          <ArrowRight />
        </span>
      </span>
      <span className="tool-title">{title}</span>
      <span className="tool-desc">{description}</span>
    </Link>
  )
}

/* ─── Step Card ─── */
function StepCard({
  step,
  title,
  description,
}: {
  step: number
  title: string
  description: string
}) {
  return (
    <div className="step">
      <span className="step-num">{String(step).padStart(2, "0")}</span>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  )
}

/* ─── Use Case Card (Dark bg) ─── */
function UseCaseCard({
  title,
  description,
  result,
  href,
}: {
  title: string
  description: string
  result: string
  href?: string
}) {
  const content = (
    <div className="group border-t border-primary-foreground/10 p-8 md:p-12 transition-colors duration-700 hover:bg-background/[0.03]">
      <h3 className="font-condensed text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground mb-3">
        {title}
      </h3>
      <p className="text-sm text-primary-foreground/50 leading-relaxed mb-6">{description}</p>
      <div className="flex items-center gap-3 font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-signal">
        <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />
        {result}
      </div>
    </div>
  )
  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return content
}

/* ─── Comparison Card ─── */
function ComparisonCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="border-t border-ink p-8 md:p-12">
      <h3 className="font-condensed text-sm font-bold uppercase tracking-[0.15em] text-foreground mb-3">
        {title}
      </h3>
      <p className="text-sm text-ink-soft leading-relaxed">{description}</p>
    </div>
  )
}

/* ─── Stat Card ─── */
function StatCard({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="border-t border-primary-foreground/10 p-6 md:p-8 text-center">
      <span className="font-serif text-3xl md:text-4xl text-primary-foreground leading-none block mb-2">
        {value}
      </span>
      <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-primary-foreground/50">
        {label}
      </span>
    </div>
  )
}
