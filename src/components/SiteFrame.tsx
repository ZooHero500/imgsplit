import type { ReactNode } from "react"

/**
 * SiteFrame — the Ink Edition "paper edition" frame: a 1px ink border box
 * with outer margins that wraps the masthead, page content and footer.
 */
export function SiteFrame({ children }: { children: ReactNode }) {
  return <div className="edition">{children}</div>
}
