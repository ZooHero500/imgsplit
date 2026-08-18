import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import {
  getAllToolPageParams,
  getToolPageData,
  getToolPageLocales,
} from "@/lib/pseo"
import { getPseoSlugLastModified } from "@/lib/seo/last-modified"
import { buildLocaleAlternates, buildOgImages, NOT_FOUND_METADATA, openGraphLocale } from "@/lib/seo/metadata"
import { ToolLanding } from "@/components/pseo/ToolLanding"
import { JsonLd } from "@/components/JsonLd"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imgsplit.com"

// Generate static params only for locale/slug pairs with content.
export function generateStaticParams() {
  return getAllToolPageParams()
}

function getLocalizedToolUrl(toolSlug: string, locale: string) {
  return locale === routing.defaultLocale
    ? `${BASE_URL}/${toolSlug}`
    : `${BASE_URL}/${locale}/${toolSlug}`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; toolSlug: string }>
}): Promise<Metadata> {
  const { locale, toolSlug } = await params
  const data = getToolPageData(toolSlug, locale)
  if (!data) return NOT_FOUND_METADATA

  const canonicalUrl = getLocalizedToolUrl(toolSlug, locale)
  const availableLocales = getToolPageLocales(toolSlug)

  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: buildLocaleAlternates(
      canonicalUrl,
      availableLocales,
      (l) => getLocalizedToolUrl(toolSlug, l)
    ),
    openGraph: {
      title: data.seo.ogTitle,
      description: data.seo.ogDescription,
      url: canonicalUrl,
      siteName: "ImgSplit",
      type: "website",
      locale: openGraphLocale(locale),
      images: buildOgImages(data.seo.ogTitle),
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.ogTitle,
      description: data.seo.ogDescription,
      images: [`${BASE_URL}/og-image.png`],
    },
  }
}

export default async function ToolSlugPage({
  params,
}: {
  params: Promise<{ locale: string; toolSlug: string }>
}) {
  const { locale, toolSlug } = await params
  const data = getToolPageData(toolSlug, locale)

  if (!data) {
    notFound()
  }

  setRequestLocale(locale)

  const dateModified = getPseoSlugLastModified(toolSlug)

  // Get all translations needed by ToolLanding
  const tNav = await getTranslations("nav")
  const tUpload = await getTranslations("uploadSection")
  const tPseo = await getTranslations("pseoChrome")

  // Build the t prop for ToolLanding
  const t = {
    nav: {
      features: tNav("features"),
      howItWorks: tNav("howItWorks"),
      faq: tNav("faq"),
      getStarted: tNav("getStarted"),
      menu: tNav("menu"),
      close: tNav("close"),
    },
    uploadSection: {
      overline: tUpload("overline"),
    },
    pseoChrome: {
      scenariosTitle: tPseo("scenariosTitle"),
      howItWorksTitle: tPseo("howItWorksTitle"),
      howItWorksHeadlinePart1: tPseo("howItWorksHeadlinePart1"),
      howItWorksHeadlineAccent: tPseo("howItWorksHeadlineAccent"),
      faqTitle: tPseo("faqTitle"),
      relatedToolsTitle: tPseo("relatedToolsTitle"),
      ctaButton: tPseo("ctaButton"),
    },
  }

  return (
    <>
      {/* BreadcrumbList JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ImgSplit", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
            { "@type": "ListItem", position: 3, name: data.seo.ogTitle },
          ],
        }}
      />
      {/* FAQPage JSON-LD */}
      {data.faqEntries.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: data.faqEntries.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
      )}
      {/* HowTo JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: data.seo.title,
          description: data.hero.description,
          dateModified,
          step: data.howToSteps.map((step) => ({
            "@type": "HowToStep",
            position: step.stepNumber,
            name: step.title,
            text: step.description,
          })),
        }}
      />
      {/* WebApplication JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ImgSplit",
          dateModified,
          url: getLocalizedToolUrl(toolSlug, locale),
          description: data.seo.description,
          applicationCategory: "DesignApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
      <ToolLanding data={data} locale={locale} t={t} />
    </>
  )
}
