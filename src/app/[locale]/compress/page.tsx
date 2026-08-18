import { setRequestLocale } from "next-intl/server"
import { getTranslations } from "next-intl/server"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { buildOgImages, openGraphLocale } from "@/lib/seo/metadata"
import type { Metadata } from "next"
import { DynamicCompressEditor } from "@/components/compress/DynamicCompressEditor"
import { JsonLd } from "@/components/JsonLd"
import { SiteFooter } from "@/components/SiteFooter"
import { FaqItem } from "../FaqSection"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imgsplit.com"
const PAGE_DATE_MODIFIED = "2026-05-26"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "compress.metadata" })

  const canonicalUrl =
    locale === routing.defaultLocale
      ? `${BASE_URL}/compress`
      : `${BASE_URL}/${locale}/compress`

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            l === routing.defaultLocale
              ? `${BASE_URL}/compress`
              : `${BASE_URL}/${l}/compress`,
          ])
        ),
        "x-default": `${BASE_URL}/compress`,
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function CompressPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "compress.metadata" })
  const tLanding = await getTranslations({ locale, namespace: "compress.landing" })

  return (
    <main className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ImgSplit Image Compressor",
          dateModified: PAGE_DATE_MODIFIED,
          url: `${BASE_URL}/compress`,
          description: t("description"),
          applicationCategory: "DesignApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "Image compression with quality control",
            "Format conversion between PNG, JPEG, WebP",
            "Real-time before/after comparison",
            "Batch processing with ZIP download",
            "100% browser-based, no upload",
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

      <header className="border-b border-ink px-4 py-5 sm:px-8 sm:py-6 md:px-16">
        <div className="kicker mb-3">{tLanding("hero.overline")}</div>
        <h1 className="font-serif text-2xl leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
          {tLanding("hero.headlinePart1")}{" "}
          <em className="text-accent-deep italic">{tLanding("hero.headlineAccent")}</em>
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {tLanding("hero.description")}
        </p>
      </header>

      <section
        id="editor"
        className="flex h-[calc(100dvh-8.75rem)] min-h-[32rem] flex-col overflow-hidden border-b border-ink"
      >
        <DynamicCompressEditor />
      </section>

      <section id="features" className="border-t border-ink px-4 py-12 sm:px-8 sm:py-16 md:px-16">
        <div className="mb-10">
          <div className="kicker mb-4">{tLanding("features.overline")}</div>
          <h2 className="font-serif text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            {tLanding("features.headlinePart1")}{" "}
            <em className="text-accent-deep italic">{tLanding("features.headlineAccent")}</em>
          </h2>
        </div>
        <div className="grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCell num="01" title={tLanding("features.item1Title")} description={tLanding("features.item1Desc")} />
          <FeatureCell num="02" title={tLanding("features.item2Title")} description={tLanding("features.item2Desc")} />
          <FeatureCell num="03" title={tLanding("features.item3Title")} description={tLanding("features.item3Desc")} />
          <FeatureCell num="04" title={tLanding("features.item4Title")} description={tLanding("features.item4Desc")} />
        </div>
      </section>

      <section id="how-it-works" className="border-t border-ink px-4 py-12 sm:px-8 sm:py-16 md:px-16">
        <div className="mb-10">
          <div className="kicker mb-4">{tLanding("steps.overline")}</div>
          <h2 className="font-serif text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            {tLanding("steps.headlinePart1")}{" "}
            <em className="text-accent-deep italic">{tLanding("steps.headlineAccent")}</em>
          </h2>
        </div>
        <div className="step-row">
          <div className="step">
            <span className="step-num">01</span>
            <strong>{tLanding("steps.step1Title")}</strong>
            <p>{tLanding("steps.step1Desc")}</p>
          </div>
          <div className="step">
            <span className="step-num">02</span>
            <strong>{tLanding("steps.step2Title")}</strong>
            <p>{tLanding("steps.step2Desc")}</p>
          </div>
          <div className="step">
            <span className="step-num">03</span>
            <strong>{tLanding("steps.step3Title")}</strong>
            <p>{tLanding("steps.step3Desc")}</p>
          </div>
          <div className="step">
            <span className="step-num">04</span>
            <strong>{tLanding("steps.step4Title")}</strong>
            <p>{tLanding("steps.step4Desc")}</p>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-ink px-4 py-12 sm:px-8 sm:py-16 md:px-16">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 md:col-span-4">
            <div className="kicker mb-4">{tLanding("faq.overline")}</div>
            <h2 className="mb-4 font-serif text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
              {tLanding("faq.headlinePart1")}{" "}
              <em className="text-accent-deep italic">{tLanding("faq.headlineAccent")}</em>
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              {tLanding("faq.subtitle")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <FaqItem question={tLanding("faq.q1")} answer={tLanding("faq.a1")} />
            <FaqItem question={tLanding("faq.q2")} answer={tLanding("faq.a2")} />
            <FaqItem question={tLanding("faq.q3")} answer={tLanding("faq.a3")} />
            <FaqItem question={tLanding("faq.q4")} answer={tLanding("faq.a4")} />
          </div>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  )
}

function FeatureCell({
  num,
  title,
  description,
}: {
  num: string
  title: string
  description: string
}) {
  return (
    <article className="bg-background p-8 md:p-10">
      <span className="mb-5 block font-serif text-2xl text-ink-soft">{num}</span>
      <h3 className="mb-3 font-condensed text-sm font-bold uppercase tracking-[0.15em] text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
    </article>
  )
}
