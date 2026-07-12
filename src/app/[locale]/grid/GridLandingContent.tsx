"use client"

import { useCallback } from "react"
import { useRouter } from "@/i18n/navigation"
import { SingleImageUploadZone } from "@/components/SingleImageUploadZone"
import { setPendingGridUpload } from "@/lib/pending-grid-upload"

export function GridLandingContent() {
  const router = useRouter()

  const handleImageLoaded = useCallback(
    (_img: HTMLImageElement, file: File) => {
      setPendingGridUpload(file)
      router.push("/grid/workspace")
    },
    [router]
  )

  return <SingleImageUploadZone namespace="grid.upload" onImageLoaded={handleImageLoaded} />
}
