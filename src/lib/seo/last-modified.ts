/** Git commit dates (`git log -1 --format=%cs`) for sitemap and JSON-LD dateModified. */

export const CORE_PAGE_LAST_MODIFIED = {
  home: "2026-08-11",
  grid: "2026-08-11",
  carousel: "2026-08-11",
  tools: "2026-08-11",
  about: "2026-08-11",
  privacy: "2026-08-11",
  terms: "2026-08-11",
  resize: "2026-05-28",
  compress: "2026-05-26",
  watermark: "2026-06-01",
  mosaic: "2026-06-04",
  collage: "2026-06-04",
  socialExport: "2026-06-05",
  removeBackground: "2026-06-05",
} as const

/** Last committed date per pSEO data module (`src/lib/pseo/*.ts`). */
const PSEO_MODULE_LAST_MODIFIED = {
  localeBase: "2026-06-08",
  localeI18n: "2026-07-12",
  watermark: "2026-07-12",
  mosaic: "2026-07-12",
  collage: "2026-07-12",
  socialExport: "2026-07-12",
  backgroundRemoval: "2026-07-12",
  carousel: "2026-07-12",
} as const

const PSEO_SLUG_MODULE: Record<string, keyof typeof PSEO_MODULE_LAST_MODIFIED> = {
  "split-in-half": "localeBase",
  "split-horizontally": "localeBase",
  "split-vertically": "localeBase",
  "split-into-equal-parts": "localeBase",
  "split-long-screenshot": "localeBase",
  "split-for-instagram": "localeBase",
  "split-for-wechat": "localeBase",
  "split-for-print": "localeBase",
  "no-photoshop-slicer": "localeBase",
  "compress-jpeg": "localeBase",
  "compress-png": "localeBase",
  "png-to-webp": "localeBase",
  "png-to-jpg": "localeBase",
  "jpg-to-png": "localeBase",
  "jpg-to-webp": "localeBase",
  "webp-to-png": "localeBase",
  "webp-to-jpg": "localeBase",
  "crop-image": "localeBase",
  "crop-for-instagram": "localeBase",
  "instagram-story-crop": "localeBase",
  "youtube-thumbnail-crop": "localeBase",
  "canva-image-splitter": "carousel",
  "add-watermark-to-photo": "watermark",
  "blur-face": "mosaic",
  "pixelate-image": "mosaic",
  "censor-image-online": "mosaic",
  "redact-image": "mosaic",
  "photo-collage-maker": "collage",
  "photo-grid-maker": "collage",
  "instagram-story-collage": "collage",
  "instagram-collage-maker": "collage",
  "social-media-image-resizer": "socialExport",
  "social-media-image-sizes": "socialExport",
  "instagram-post-size": "socialExport",
  "instagram-story-size": "socialExport",
  "youtube-thumbnail-size": "socialExport",
  "facebook-cover-photo-size": "socialExport",
  "linkedin-post-size": "socialExport",
  "twitter-header-size": "socialExport",
  "wechat-cover-size": "socialExport",
  "xiaohongshu-cover-size": "socialExport",
  "wechat-official-account-cover-size": "socialExport",
  "transparent-background-maker": "backgroundRemoval",
  "bulk-background-remover": "backgroundRemoval",
  "cortar-carrossel": "carousel",
}

export function getPseoSlugLastModified(slug: string): string {
  const moduleKey = PSEO_SLUG_MODULE[slug]
  if (!moduleKey) return PSEO_MODULE_LAST_MODIFIED.localeI18n
  return PSEO_MODULE_LAST_MODIFIED[moduleKey]
}

export function toLastModifiedDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00.000Z`)
}

/** Map core tool href to its page last-modified date. */
export function getCoreToolHrefLastModified(href: string): string {
  switch (href) {
    case "/":
      return CORE_PAGE_LAST_MODIFIED.home
    case "/grid":
      return CORE_PAGE_LAST_MODIFIED.grid
    case "/carousel":
      return CORE_PAGE_LAST_MODIFIED.carousel
    case "/resize":
      return CORE_PAGE_LAST_MODIFIED.resize
    case "/compress":
      return CORE_PAGE_LAST_MODIFIED.compress
    case "/watermark":
      return CORE_PAGE_LAST_MODIFIED.watermark
    case "/mosaic":
      return CORE_PAGE_LAST_MODIFIED.mosaic
    case "/collage":
      return CORE_PAGE_LAST_MODIFIED.collage
    case "/social-export":
      return CORE_PAGE_LAST_MODIFIED.socialExport
    case "/remove-background":
      return CORE_PAGE_LAST_MODIFIED.removeBackground
    default:
      return CORE_PAGE_LAST_MODIFIED.home
  }
}
