import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const PSEO_SLUG_REDIRECTS: ReadonlyArray<{ source: string; destination: string }> = [
  { source: "photo-splitter", destination: "/" },
  { source: "image-cutter", destination: "/" },
  { source: "grid-maker", destination: "/grid" },
  { source: "compress-image", destination: "/compress" },
  { source: "reduce-image-size", destination: "/compress" },
  { source: "watermark-maker", destination: "/watermark" },
  { source: "add-watermark-to-image", destination: "/watermark" },
  { source: "online-watermark-tool", destination: "/watermark" },
  { source: "blur-face-in-photo", destination: "/blur-face" },
  { source: "pixelate-image-online", destination: "/pixelate-image" },
  { source: "redact-image-online", destination: "/redact-image" },
  { source: "mosaic-tool", destination: "/mosaic" },
  { source: "free-photo-collage-maker", destination: "/photo-collage-maker" },
  { source: "picture-grid-maker", destination: "/photo-grid-maker" },
  { source: "resize-image-for-social-media", destination: "/social-media-image-resizer" },
  { source: "instagram-image-size", destination: "/instagram-post-size" },
  { source: "remove-background-free", destination: "/remove-background" },
  { source: "carousel-splitter", destination: "/carousel" },
  { source: "cortar-imagens-carrossel", destination: "/cortar-carrossel" },
  { source: "cortar-carrossel-infinito", destination: "/cortar-carrossel" },
];

function buildPseoRedirects() {
  const localeGroup = "zh\\-CN|ja|ko|es|pt\\-BR";
  return PSEO_SLUG_REDIRECTS.flatMap(({ source, destination }) => {
    const localizedDestination =
      destination === "/" ? "/:locale" : `/:locale${destination}`;
    return [
      { source: `/${source}`, destination, permanent: true },
      {
        source: `/:locale(${localeGroup})/${source}`,
        destination: localizedDestination,
        permanent: true,
      },
    ];
  });
}

const nextConfig: NextConfig = {
  async redirects() {
    return buildPseoRedirects();
  },
  async rewrites() {
    return [
      {
        source: "/sitemap/:id.xml",
        destination: "/sitemap/:id",
      },
    ];
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "pleasurehub",

  project: "online-image-segmentation",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

// Disable component annotation to avoid hydration mismatch
  reactComponentAnnotation: {
    enabled: false,
  },

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  }
});
