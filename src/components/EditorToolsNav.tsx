"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { CORE_TOOLS, type CoreToolId } from "@/lib/tools/catalog"

interface EditorToolsNavProps {
  /**
   * Tool id of the editor currently open. The matching tool is rendered as
   * highlighted static text instead of a link (same treatment the editors
   * use today for the active tool).
   */
  currentToolId?: CoreToolId
  /**
   * Alternative to `currentToolId`: match the current tool by its `href`
   * in `CORE_TOOLS` (e.g. "/compress").
   */
  currentHref?: string
  /**
   * Extra classes for the container. Defaults show the bar from the `sm`
   * breakpoint up; pass e.g. "md:flex" via className to override visibility.
   */
  className?: string
}

/**
 * Cross-tool navigation strip shared by the editor workbenches.
 * Driven by the single source of truth `CORE_TOOLS` (src/lib/tools/catalog.ts)
 * and localized with the same `footer.tool*` keys used by SiteNav/SiteFooter.
 */
export function EditorToolsNav({ currentToolId, currentHref, className }: EditorToolsNavProps) {
  const tFooter = useTranslations("footer")
  const tNav = useTranslations("editorToolsNav")

  return (
    <div
      className={cn(
        "hidden items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex",
        className
      )}
    >
      {CORE_TOOLS.map((tool) => {
        const isCurrent =
          (currentToolId !== undefined && tool.id === currentToolId) ||
          (currentHref !== undefined && tool.href === currentHref)

        if (isCurrent) {
          return (
            <span key={tool.id} className="font-medium text-foreground">
              {tFooter(tool.labelKey)}
            </span>
          )
        }

        return (
          <Link
            key={tool.id}
            href={tool.href}
            className="transition-colors hover:text-foreground"
          >
            {tFooter(tool.labelKey)}
          </Link>
        )
      })}
      <Link href="/tools" className="transition-colors hover:text-foreground">
        {tNav("title")}
      </Link>
    </div>
  )
}
