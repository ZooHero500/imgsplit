import {
  ArrowRight,
  ChevronDown,
  EyeOff,
  Grid3X3,
  LayoutTemplate,
  Maximize2,
  Send,
  Scissors,
  Sparkles,
  Stamp,
  Zap,
} from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { LocaleSwitcher } from "@/components/LocaleSwitcher"
import { LogoIcon } from "@/components/LogoIcon"
import { MobileNav } from "@/components/MobileNav"
import { SmartCTA } from "@/app/[locale]/SmartCTA"
import { InkButton } from "@/components/ui/InkButton"
import { CORE_TOOLS, type CoreToolIcon } from "@/lib/tools/catalog"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export interface SiteNavLink {
  href: string
  label: string
}

interface SiteNavProps {
  locale: string
  links?: SiteNavLink[]
  ctaLabel?: string
  ctaHref?: string
  smartCta?: boolean
  includeToolsLink?: boolean
}

const toolIconMap: Record<CoreToolIcon, LucideIcon> = {
  scissors: Scissors,
  grid: Grid3X3,
  resize: Maximize2,
  compress: Zap,
  watermark: Stamp,
  mosaic: EyeOff,
  collage: LayoutTemplate,
  socialExport: Send,
  removeBackground: Sparkles,
}

export async function SiteNav({
  locale,
  links = [],
  ctaLabel,
  ctaHref,
  smartCta = false,
  includeToolsLink = true,
}: SiteNavProps) {
  const tNav = await getTranslations({ locale, namespace: "nav" })
  const tFooter = await getTranslations({ locale, namespace: "footer" })
  const tTools = await getTranslations({ locale, namespace: "toolsHub" })
  const resolvedCtaLabel = ctaLabel ?? tNav("getStarted")
  const allToolsLabel = tFooter("toolAll")
  const toolLinks = CORE_TOOLS.map((tool) => ({
    href: tool.href,
    label: tFooter(tool.labelKey),
    description: tTools(tool.descriptionKey),
    icon: tool.icon,
  }))

  return (
    <nav className="sticky top-0 z-[70] border-b border-ink bg-paper">
      <div className="grid min-h-[74px] grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[220px_minmax(0,1fr)_auto]">
        {/* Publication */}
        <div className="flex min-w-0 items-center gap-3 px-4 md:px-6 lg:border-r lg:border-ink">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <LogoIcon className="h-[30px] w-[30px] shrink-0 text-ink" />
            <span className="min-w-0 leading-tight">
              <span className="block font-condensed text-[18px] font-bold uppercase leading-[1.05] tracking-[0.08em]">
                ImgSplit
              </span>
              <small className="hidden truncate font-condensed text-[9px] uppercase leading-tight tracking-[0.14em] text-ink-soft sm:block">
                {tNav("editionSub")}
              </small>
            </span>
          </Link>
        </div>

        {/* Masthead line */}
        <div className="hidden min-w-0 items-center gap-6 px-6 font-condensed text-[12px] uppercase tracking-[0.12em] text-ink md:flex">
          {includeToolsLink && <ToolsDropdown label={allToolsLabel} tools={toolLinks} />}
          {links.map((link) => (
            <NavLink key={`${link.href}-${link.label}`} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Masthead meta */}
        <div className="hidden items-center gap-5 border-l border-ink pl-6 pr-6 lg:flex">
          <span className="whitespace-nowrap font-condensed text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
            {tNav("localPrivateFree")}
          </span>
          <span className="h-[9px] w-[9px] rounded-full bg-signal" aria-hidden="true" />
          <LocaleSwitcher variant="compact" />
          {smartCta ? (
            <SmartCTA label={resolvedCtaLabel} href={ctaHref} size="dense" />
          ) : (
            <InkButton href={ctaHref ?? "/"} size="dense" icon={<ArrowRight />}>
              {resolvedCtaLabel}
            </InkButton>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 px-4 lg:hidden">
          <LocaleSwitcher variant="compact" />
          <MobileNav
            links={includeToolsLink ? [{ href: "/tools", label: allToolsLabel }, ...links] : links}
            toolLinks={includeToolsLink ? toolLinks : undefined}
            ctaLabel={resolvedCtaLabel}
            ctaHref={ctaHref ?? "#upload"}
            menuLabel={tNav("menu")}
            closeLabel={tNav("close")}
          />
        </div>
      </div>
    </nav>
  )
}

function ToolsDropdown({
  label,
  tools,
}: {
  label: string
  tools: Array<{
    href: string
    label: string
    description: string
    icon: CoreToolIcon
  }>
}) {
  return (
    <div className="group relative hidden md:flex h-[74px] items-center">
      <Link
        href="/tools"
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 text-ink transition-colors duration-500 hover:text-ink-soft link-underline"
      >
        {label}
        <ChevronDown className="h-3 w-3 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1.5} />
      </Link>
      <div className="absolute left-1/2 top-full z-50 mt-3 w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 border border-ink bg-paper opacity-0 invisible pointer-events-none translate-y-2 shadow-[0_16px_48px_rgba(0,0,0,0.15)] transition-all duration-300 ease-luxury group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:translate-y-0">
        <div className="grid grid-cols-2 gap-px bg-rule">
          {tools.map((tool, index) => {
            const Icon = toolIconMap[tool.icon]
            const spansFullRow = tools.length % 2 === 1 && index === tools.length - 1

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`min-h-24 bg-paper p-5 text-ink transition-colors duration-300 hover:bg-secondary ${spansFullRow ? "col-span-2" : ""}`}
              >
                <span className="flex items-center gap-3 font-condensed text-[11px] font-bold uppercase tracking-[0.18em]">
                  <Icon className="h-3.5 w-3.5 text-signal" strokeWidth={1.5} />
                  {tool.label}
                </span>
                <span className="mt-2 block text-xs normal-case tracking-normal leading-5 text-ink-soft">
                  {tool.description}
                </span>
              </Link>
            )
          })}
        </div>
        <Link
          href="/tools"
          className="flex items-center justify-between gap-4 border-t border-ink px-5 py-4 font-condensed text-[11px] font-bold uppercase tracking-[0.2em] text-signal transition-colors duration-300 hover:text-ink"
        >
          {label}
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  )
}

function NavLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const baseClass =
    "text-ink transition-colors duration-500 hover:text-ink-soft link-underline"

  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={baseClass}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={baseClass}>
      {children}
    </Link>
  )
}
