import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { LogoIcon } from "@/components/LogoIcon"
import { InkButton } from "@/components/ui/InkButton"
import { ArrowRight } from "lucide-react"
import { CORE_TOOLS, POPULAR_TOOL_SLUGS } from "@/lib/tools/catalog"
import { getToolPageData, type ToolPageData } from "@/lib/pseo"

interface SiteFooterProps {
  locale: string
}

export async function SiteFooter({ locale }: SiteFooterProps) {
  const tFooter = await getTranslations({ locale, namespace: "footer" })
  const tNav = await getTranslations({ locale, namespace: "nav" })
  const tTools = await getTranslations({ locale, namespace: "toolsHub" })
  const popularTools = POPULAR_TOOL_SLUGS.map((slug) => getToolPageData(slug, locale)).filter(
    (tool): tool is ToolPageData => tool != null
  )
  const toolsFirstHalf = CORE_TOOLS.slice(0, 5)
  const toolsSecondHalf = CORE_TOOLS.slice(5)

  return (
    <footer className="border-t border-ink">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-block">
          <div className="footer-head">
            <span className="inline-flex items-center gap-3">
              <LogoIcon className="h-[30px] w-[30px] text-ink" />
              ImgSplit
            </span>
          </div>
          <p>{tFooter("tagline")}</p>
          <InkButton href="/" size="dense" icon={<ArrowRight />}>
            {tNav("getStarted")}
          </InkButton>
          <div className="mt-6">
            <a
              href="https://www.producthunt.com/products/imgsplit?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-imgsplit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="ImgSplit on Product Hunt"
                width="200"
                height="43"
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1114907&theme=light&t=1775379733917"
              />
            </a>
          </div>
        </div>

        {/* Tools (first half) */}
        <div className="footer-block">
          <div className="footer-head">{tFooter("toolsTitle")}</div>
          <div className="footer-list">
            {toolsFirstHalf.map((tool) => (
              <Link key={tool.id} href={tool.href}>
                {tFooter(tool.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        {/* Tools (second half) + all */}
        <div className="footer-block">
          <div className="footer-head" aria-hidden="true">&nbsp;</div>
          <div className="footer-list">
            {toolsSecondHalf.map((tool) => (
              <Link key={tool.id} href={tool.href}>
                {tFooter(tool.labelKey)}
              </Link>
            ))}
            <Link href="/tools">{tFooter("toolAll")}</Link>
          </div>
        </div>

        {/* Popular use cases */}
        <div className="footer-block">
          <div className="footer-head">{tTools("categoryUseCase")}</div>
          <div className="footer-list">
            {popularTools.map((tool) => (
              <Link key={tool.slug} href={`/${tool.slug}`}>
                {tool.seo.ogTitle}
              </Link>
            ))}
          </div>
          <div className="footer-head mt-8">{tFooter("navTitle")}</div>
          <div className="footer-list">
            <Link href="/about">{tFooter("about")}</Link>
            <Link href="/privacy">{tFooter("privacy")}</Link>
            <Link href="/terms">{tFooter("terms")}</Link>
            <a href="mailto:zoohero.dev@gmail.com">{tFooter("contact")}</a>
          </div>
        </div>
      </div>

      <div className="footer-base">
        <span>{tFooter("editionLabel")}</span>
        <span>
          © {new Date().getFullYear()} · {tFooter("madeWith")}
        </span>
      </div>
    </footer>
  )
}
