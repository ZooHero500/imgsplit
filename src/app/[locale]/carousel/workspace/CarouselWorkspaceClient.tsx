"use client"

import { useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { LogoIcon } from "@/components/LogoIcon"
import { LocaleSwitcher } from "@/components/LocaleSwitcher"
import { CarouselSteps } from "@/components/carousel/CarouselSteps"
import { SingleImageUploadZone } from "@/components/SingleImageUploadZone"
import { CarouselCountSelector } from "@/components/carousel/CarouselCountSelector"
import { AspectSelector } from "@/components/carousel/AspectSelector"
import { DynamicCarouselEditor } from "@/components/carousel/DynamicCarouselEditor"
import { CarouselPreview } from "@/components/carousel/CarouselPreview"
import { useCarouselEditor } from "@/hooks/use-carousel-editor"
import { useFramedImageWorkspace } from "@/hooks/use-framed-image-workspace"
import { splitCarousel } from "@/lib/carousel-splitter"
import { consumePendingCarouselUpload } from "@/lib/pending-carousel-upload"
import type { CarouselSlide } from "@/lib/carousel-splitter"

function getSingleFileName(_slide: CarouselSlide, index: number, ext: string): string {
  return `carousel-${index + 1}.${ext}`
}

async function exportZip(
  slides: CarouselSlide[],
  ext: string
): Promise<{ blob: Blob; fileName: string }> {
  const { exportCarouselAsZip, getCarouselZipFileName } = await import("@/lib/zip-exporter")
  const blob = await exportCarouselAsZip(slides.map((s) => s.blob), ext)
  return { blob, fileName: getCarouselZipFileName() }
}

export function CarouselWorkspaceClient() {
  const tDownload = useTranslations("carousel.download")

  const [generating, setGenerating] = useState(false)

  const {
    step,
    image,
    imageUrl,
    mimeType,
    imageSize,
    containerRef,
    containerSize,
    results: slides,
    resultUrls: slideUrls,
    handleImageLoaded,
    handleReupload,
    completeWithResults,
    handleReadjust,
    handleSaveSingle,
    handleDownloadAll,
  } = useFramedImageWorkspace<CarouselSlide>({
    consumePendingUpload: consumePendingCarouselUpload,
    getSingleFileName,
    exportZip,
  })

  const editor = useCarouselEditor(imageSize, containerSize)

  const handleGenerate = useCallback(async () => {
    if (!image) return
    setGenerating(true)
    try {
      const result = await splitCarousel(
        image,
        editor.state,
        { displayWidth: editor.frameSize.width, displayHeight: editor.frameSize.height },
        mimeType,
      )
      completeWithResults(result)
    } finally {
      setGenerating(false)
    }
  }, [image, editor.state, editor.frameSize.width, editor.frameSize.height, mimeType, completeWithResults])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-16 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/carousel" className="flex items-center gap-3">
              <LogoIcon className="h-4 w-4 text-foreground" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-foreground">
                ImgSplit
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <LocaleSwitcher variant="compact" />
          </div>
        </div>
      </nav>

      <CarouselSteps step={step} />

      <div className="flex-1 flex flex-col">
        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="max-w-[800px] mx-auto w-full px-4 md:px-8 py-8">
            <SingleImageUploadZone namespace="carousel.upload" onImageLoaded={handleImageLoaded} />
          </div>
        )}

        {/* Step 2: Adjust */}
        {step === 2 && image && (
          <div className="flex-1 flex flex-col md:flex-row gap-0 max-w-[1400px] mx-auto w-full">
            {/* Left sidebar — desktop */}
            <div className="hidden md:flex md:flex-col w-[200px] flex-shrink-0 p-4 gap-4">
              <CarouselCountSelector
                value={editor.state.slideCount}
                onChange={editor.setSlideCount}
              />
              <AspectSelector
                value={editor.state.aspect}
                onChange={editor.setAspect}
              />
              <button
                onClick={handleReupload}
                className="mt-auto py-2.5 border border-primary/20 text-muted-foreground text-xs uppercase tracking-[0.15em] hover:border-primary/40 hover:text-foreground transition-colors duration-500"
              >
                {tDownload("reupload")}
              </button>
            </div>

            {/* Mobile toolbar */}
            <div className="md:hidden px-2 py-3 flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <CarouselCountSelector
                  value={editor.state.slideCount}
                  onChange={editor.setSlideCount}
                />
                <AspectSelector
                  value={editor.state.aspect}
                  onChange={editor.setAspect}
                />
              </div>
              <button
                onClick={handleReupload}
                className="px-3 py-2.5 border border-secondary text-muted-foreground text-xs tracking-[0.1em] self-start"
              >
                {tDownload("reupload")}
              </button>
            </div>

            {/* Center editor */}
            <div ref={containerRef} className="flex-1 flex items-center justify-center">
              <DynamicCarouselEditor
                image={image}
                imageUrl={imageUrl}
                frameSize={editor.frameSize}
                state={editor.state}
                scaleRange={editor.scaleRange}
                onOffsetChange={editor.setOffset}
                onScaleChange={editor.handleScale}
                slideCount={editor.state.slideCount}
              />
            </div>

            {/* Right preview — desktop */}
            <div className="hidden md:flex md:flex-col w-[200px] flex-shrink-0 p-4 gap-4 justify-between">
              <div className="flex-1 flex items-center justify-center">
                {/* Preview placeholder on desktop — shown below on mobile */}
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] hover:bg-accent transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? tDownload("generating") : tDownload("generate")}
              </button>
            </div>

            {/* Mobile generate */}
            <div className="md:hidden px-2 py-3">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] hover:bg-accent transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? tDownload("generating") : tDownload("generate")}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Download results */}
        {step === 3 && slides && (
          <div className="max-w-[800px] mx-auto w-full px-4 md:px-8 py-8">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {tDownload("count", { count: slides.length })}
            </div>

            {/* Carousel preview strip */}
            <div className="mb-6">
              <CarouselPreview slides={slides} />
            </div>

            {/* Individual slide grid */}
            <div
              className="grid gap-1 mb-6"
              style={{
                gridTemplateColumns: `repeat(${Math.min(slides.length, 5)}, 1fr)`,
              }}
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.index}
                  onClick={() => handleSaveSingle(slide, i)}
                  className="relative aspect-square overflow-hidden group cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- blob object URL, next/image not applicable */}
                  <img
                    src={slideUrls[i]}
                    alt={tDownload("slideAlt", { index: slide.index })}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-primary-foreground/0 group-hover:text-primary-foreground/80 text-xs uppercase tracking-[0.15em] transition-colors duration-300">
                      {slide.index}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleDownloadAll}
              className="w-full py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] hover:bg-accent transition-colors duration-500 mb-3"
            >
              {tDownload("zip")}
            </button>
            <button
              onClick={handleReadjust}
              className="w-full py-3 border border-primary text-foreground text-xs uppercase tracking-[0.15em] hover:bg-primary hover:text-primary-foreground transition-colors duration-500"
            >
              {tDownload("readjust")}
            </button>
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {tDownload("tapToSave")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
