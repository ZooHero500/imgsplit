"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight, EyeOff, Grid3X3, LayoutTemplate, Maximize2, Send, Scissors, Sparkles, Stamp, Zap } from "lucide-react"
import { CORE_TOOLS, type CoreToolIcon } from "@/lib/tools/catalog"
import { hasVisited, markVisited } from "@/lib/storage-service"

const iconMap: Record<CoreToolIcon, typeof Scissors> = {
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

export function ReturningUserToolbar() {
  const [show, setShow] = useState(false)
  const t = useTranslations("footer")

  useEffect(() => {
    if (hasVisited()) {
      queueMicrotask(() => setShow(true))
    }
    markVisited()
  }, [])

  if (!show) return null

  return (
    <div className="border-b border-ink bg-paper/90 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 h-11 flex items-center gap-4 sm:gap-5 overflow-hidden font-condensed text-[11px] font-semibold uppercase tracking-[0.14em]">
        {CORE_TOOLS.slice(0, 5).map((tool, index) => {
          const Icon = iconMap[tool.icon]
          const visibility = index >= 4 ? "hidden lg:flex" : index >= 2 ? "hidden sm:flex" : "flex"

          return (
            <Link
              key={tool.id}
              href={tool.quickAccessHref}
              className={`${visibility} items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors duration-300 whitespace-nowrap`}
            >
              <Icon className="h-3 w-3" strokeWidth={1.5} />
              {t(tool.labelKey)}
            </Link>
          )
        })}
        <Link
          href="/tools"
          className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors duration-300 whitespace-nowrap ml-auto"
        >
          {t("toolAll")}
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  )
}
