import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"

interface ToolCardProps {
  title: string
  description: string
  href: string
  num?: string
}

export function ToolCard({ title, description, href, num }: ToolCardProps) {
  return (
    <Link href={href} className="tool-cell">
      <span className="tool-top">
        {num ? <span className="tool-num">{num}</span> : <span />}
        <span className="tool-arrow" aria-hidden="true">
          <ArrowRight />
        </span>
      </span>
      <h3 className="tool-title leading-snug">{title}</h3>
      <p className="tool-desc line-clamp-2">{description}</p>
    </Link>
  )
}
