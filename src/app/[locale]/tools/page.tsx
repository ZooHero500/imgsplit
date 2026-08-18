import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { buildOgImages, openGraphLocale } from "@/lib/seo/metadata"
import { getToolPagesByCategory, getToolPageData } from "@/lib/pseo"
import { ToolCard } from "@/components/pseo/ToolCard"
import { InkButton } from "@/components/ui/InkButton"
import { ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/JsonLd"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteFrame } from "@/components/SiteFrame"
import { SiteNav } from "@/components/SiteNav"
import { CORE_TOOLS } from "@/lib/tools/catalog"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imgsplit.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "toolsHub.metadata" })
  const canonicalUrl =
    locale === routing.defaultLocale
      ? `${BASE_URL}/tools`
      : `${BASE_URL}/${locale}/tools`

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
              ? `${BASE_URL}/tools`
              : `${BASE_URL}/${l}/tools`,
          ])
        ),
        "x-default": `${BASE_URL}/tools`,
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

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("toolsHub")
  const tFooter = await getTranslations("footer")

  const directionPages = getToolPagesByCategory("direction")
  const useCasePages = getToolPagesByCategory("use-case")

  return (
    <main className="min-h-screen bg-background relative">
      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://imgsplit.com/tools",
          name: t("metadata.title"),
          description: t("metadata.description"),
          url: `${BASE_URL}/tools`,
          isPartOf: { "@id": "https://imgsplit.com/#website" },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Split Image in Half", url: `${BASE_URL}/split-in-half` },
              { "@type": "ListItem", position: 2, name: "Split Image Horizontally", url: `${BASE_URL}/split-horizontally` },
              { "@type": "ListItem", position: 3, name: "Split Image Vertically", url: `${BASE_URL}/split-vertically` },
              { "@type": "ListItem", position: 4, name: "Split into Equal Parts", url: `${BASE_URL}/split-into-equal-parts` },
              { "@type": "ListItem", position: 5, name: "Long Screenshot Splitter", url: `${BASE_URL}/split-long-screenshot` },
              { "@type": "ListItem", position: 6, name: "Instagram Splitter", url: `${BASE_URL}/split-for-instagram` },
              { "@type": "ListItem", position: 7, name: "Social Media Grid Splitter", url: `${BASE_URL}/split-for-wechat` },
              { "@type": "ListItem", position: 8, name: "Print Splitter", url: `${BASE_URL}/split-for-print` },
              { "@type": "ListItem", position: 9, name: "No-Photoshop Slicer", url: `${BASE_URL}/no-photoshop-slicer` },
              { "@type": "ListItem", position: 10, name: "Grid Splitter", url: `${BASE_URL}/grid` },
              { "@type": "ListItem", position: 11, name: "Image Splitter", url: BASE_URL },
              { "@type": "ListItem", position: 12, name: "Image Resizer", url: `${BASE_URL}/resize` },
              { "@type": "ListItem", position: 13, name: "Image Compressor", url: `${BASE_URL}/compress` },
              { "@type": "ListItem", position: 14, name: "Watermark Tool", url: `${BASE_URL}/watermark` },
              { "@type": "ListItem", position: 15, name: "Privacy Mosaic Tool", url: `${BASE_URL}/mosaic` },
              { "@type": "ListItem", position: 16, name: "Photo Collage Maker", url: `${BASE_URL}/collage` },
              { "@type": "ListItem", position: 17, name: "Social Media Image Exporter", url: `${BASE_URL}/social-export` },
              { "@type": "ListItem", position: 18, name: "AI Background Remover", url: `${BASE_URL}/remove-background` },
            ],
          },
        }}
      />
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
          sameAs: [
            "https://github.com/ZooHero500/imgsplit",
            "https://x.com/zooheroes",
          ],
        }}
      />

      <SiteFrame>
        <SiteNav
          locale={locale}
          links={[{ href: "https://tally.so/r/NpRyK0", label: t("feedbackButton") }]}
          ctaLabel={t("feedbackButton")}
          ctaHref="https://tally.so/r/NpRyK0"
        />

        {/* HERO — hidden in PWA standalone mode */}
        <section className="pwa-hide relative border-b border-ink px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 md:col-start-1">
              <div className="kicker mb-8 hero-enter hero-delay-1">{t("hero.overline")}</div>

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
                {t("hero.headlinePart1")}{" "}
                <em className="text-accent-deep italic">{t("hero.headlineAccent")}</em>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-ink-soft leading-relaxed max-w-md mb-6 sm:mb-8 hero-enter hero-delay-3">
                {t("hero.description")}
              </p>
              <a
                href="https://tally.so/r/NpRyK0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-condensed text-xs font-bold uppercase tracking-[0.2em] text-ink-soft hover:text-signal transition-colors duration-500 hero-enter hero-delay-4 link-underline"
              >
                {t("feedbackHeroCta")}
              </a>
            </div>

            {/* Vertical decorative text */}
            <div className="hidden lg:flex col-span-2 col-start-11 items-end justify-end pb-4 hero-enter hero-delay-4">
              <span className="writing-vertical font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/50">
                Editorial / Vol. 01
              </span>
            </div>
          </div>
        </section>

        {/* CORE TOOLS */}
        <section className="pwa-first-section border-t border-ink py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16">
          <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft mb-6">
            {t("categoryExisting")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {CORE_TOOLS.map((tool, index) => (
              <ToolCard
                key={tool.id}
                num={String(index + 1).padStart(2, "0")}
                title={tFooter(tool.labelKey)}
                description={t(tool.descriptionKey)}
                href={tool.quickAccessHref}
              />
            ))}
          </div>
        </section>

        {/* DIRECTION TOOLS */}
        <section className="border-t border-ink py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16">
          <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft mb-6">
            {t("categoryDirection")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {directionPages.map((page, index) => {
              const data = getToolPageData(page.slug, locale)
              if (!data) return null
              return (
                <ToolCard
                  key={page.slug}
                  num={String(index + 1).padStart(2, "0")}
                  title={data.seo.ogTitle}
                  description={data.seo.description}
                  href={`/${page.slug}`}
                />
              )
            })}
          </div>
        </section>

        {/* USE-CASE TOOLS */}
        <section className="border-t border-ink py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16">
          <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft mb-6">
            {t("categoryUseCase")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {useCasePages.map((page, index) => {
              const data = getToolPageData(page.slug, locale)
              if (!data) return null
              return (
                <ToolCard
                  key={page.slug}
                  num={String(index + 1).padStart(2, "0")}
                  title={data.seo.ogTitle}
                  description={data.seo.description}
                  href={`/${page.slug}`}
                />
              )
            })}
          </div>
        </section>

        {/* FEEDBACK */}
        <section className="border-t border-ink py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft mb-2">
                {t("feedbackOverline")}
              </p>
              <p className="text-sm text-ink-soft leading-relaxed max-w-md">
                {t("feedbackDesc")}
              </p>
            </div>
            <InkButton href="https://tally.so/r/NpRyK0" size="dense" icon={<ArrowRight />}>
              {t("feedbackButton")}
            </InkButton>
          </div>
        </section>

        <SiteFooter locale={locale} />
      </SiteFrame>
    </main>
  )
}
