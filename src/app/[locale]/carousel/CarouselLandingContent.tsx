"use client"

import { useCallback } from "react"
import { useRouter } from "@/i18n/navigation"
import { SingleImageUploadZone } from "@/components/SingleImageUploadZone"
import { setPendingCarouselUpload } from "@/lib/pending-carousel-upload"

export function CarouselLandingContent() {
  const router = useRouter()

  const handleImageLoaded = useCallback(
    (_img: HTMLImageElement, file: File) => {
      setPendingCarouselUpload(file)
      router.push("/carousel/workspace")
    },
    [router]
  )

  return <SingleImageUploadZone namespace="carousel.upload" onImageLoaded={handleImageLoaded} />
}
