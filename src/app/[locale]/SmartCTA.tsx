"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "@/i18n/navigation"
import { db } from "@/lib/storage-service"
import { ArrowRight } from "lucide-react"
import { InkButton } from "@/components/ui/InkButton"
import { trackEvent } from "@/lib/analytics"

interface SmartCTAProps {
  label: string
  className?: string
  href?: string
  size?: "default" | "hero" | "dense"
  /** Render the trailing icon cell. */
  icon?: boolean
}

export function SmartCTA({ label, className, href, size = "default", icon = true }: SmartCTAProps) {
  const router = useRouter()
  const [hasHistory, setHasHistory] = useState(false)

  useEffect(() => {
    db.history.count().then((count) => setHasHistory(count > 0))
  }, [])

  const handleClick = useCallback(() => {
    trackEvent("tool_cta_clicked", { action: href ? "open_editor" : hasHistory ? "resume" : "upload" })
    if (href) {
      router.push(href)
    } else if (hasHistory) {
      router.push("/workspace")
    } else {
      document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })
    }
  }, [hasHistory, router, href])

  return (
    <InkButton
      onClick={handleClick}
      size={size}
      icon={icon ? <ArrowRight /> : undefined}
      className={className}
    >
      {label}
    </InkButton>
  )
}
