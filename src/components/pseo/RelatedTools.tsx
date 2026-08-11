import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"

interface RelatedTool {
  slug: string
  title: string
  description: string
}

interface RelatedToolsProps {
  tools: RelatedTool[]
  locale: string
  title: string
}

export function RelatedTools({ tools, locale, title }: RelatedToolsProps) {
  if (tools.length === 0) return null

  return (
    <section className="mt-24">
      <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft mb-12">
        {title}
      </p>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-0">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.slug}
            locale={locale}
            className="group border-t border-ink p-8 hover:bg-secondary/40 transition-colors duration-700"
          >
            <h3 className="font-condensed text-sm font-bold uppercase tracking-[0.15em] text-foreground mb-3">
              {tool.title}
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed mb-6">
              {tool.description}
            </p>
            <ArrowRight className="h-4 w-4 text-ink-soft/40 group-hover:text-signal transition-colors duration-500" />
          </Link>
        ))}
      </div>
    </section>
  )
}
