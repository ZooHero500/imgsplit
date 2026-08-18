# ImgSplit — Free Online Image Splitter & Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ZooHero500/imgsplit)

**[imgsplit.com](https://imgsplit.com)** — Privacy-first online image tools: split, grid, resize, compress, watermark, and more. 100% browser-based — your images never leave your device.

## Not to be confused with

This project (**ImgSplit** at [imgsplit.com](https://imgsplit.com), source at [ZooHero500/imgsplit](https://github.com/ZooHero500/imgsplit)) is **not affiliated** with:

- the npm package [`@imgsplit/core`](https://www.npmjs.com/package/@imgsplit/core)
- [github.com/imgsplit/imgsplit](https://github.com/imgsplit/imgsplit)
- [imgsplit.com.tr](https://imgsplit.com.tr)

The official website is **imgsplit.com**. The official repository is **ZooHero500/imgsplit**.

## Features

### Core tools

- **Image splitter** — Drag-and-drop split lines with snap alignment (up to 20 horizontal + 20 vertical lines), pixel-perfect precision, ZIP or individual downloads
- **Grid splitting** — Pre-configured 3×3, 1×3, and 2×2 grids for Instagram and social media
- **Carousel splitter** — Split wide images into carousel slides for Instagram and other platforms
- **Resize** — Resize, crop, rotate, and export with social media presets
- **Compress & convert** — Compress and convert between JPEG, PNG, and WebP
- **Watermark** — Text, image, and tiled watermarks with opacity and placement control
- **Mosaic / blur** — Mosaic, blur, and solid cover for faces, license plates, and sensitive areas
- **Collage** — Combine multiple photos into grid and story layouts
- **Social media export** — Export one image to multiple platform-ready sizes (Instagram, YouTube, Facebook, LinkedIn, X, and more) as a ZIP
- **Local AI background removal** — Runs in a browser Web Worker via [@huggingface/transformers](https://huggingface.co/docs/transformers.js); model is downloaded once and inference stays local — images are never uploaded

### Platform

- **Privacy-first** — All image processing in-browser via Canvas API; images never uploaded to any server
- **Multi-format** — PNG, JPG/JPEG, WebP up to 20MB
- **One-click download** — ZIP archive or individual files
- **Multilingual** — English, 中文, 日本語, 한국어, Español, Português (BR) — 6 languages
- **Responsive** — Works on desktop, tablet, and mobile
- **pSEO tool pages** — Dozens of scenario-specific landing pages (split in half, long screenshot, platform sizes, and more) at `/tools`

## Demo

Visit **[imgsplit.com](https://imgsplit.com)** to try it instantly — no signup required.

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router, Server Components
- [React 19](https://react.dev/) — UI framework
- [Tailwind CSS 4](https://tailwindcss.com/) — Styling
- [Konva.js](https://konvajs.org/) — Canvas-based image editor
- [next-intl](https://next-intl.dev/) — Internationalization
- [@huggingface/transformers](https://huggingface.co/docs/transformers.js) — Local AI background removal (Web Worker)
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [Vercel](https://vercel.com/) — Hosting & deployment

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (package manager)
- Node.js 20+

### Installation

```bash
# Clone the repository
git clone https://github.com/ZooHero500/imgsplit.git
cd online-image-segmentation

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
bun run build
bun run start
```

### Other scripts

```bash
bun run lint          # ESLint
bun run test          # Vitest
bun run models:background-removal  # Download local AI background-removal model
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # i18n routes
│   │   ├── page.tsx        # Homepage (image splitter)
│   │   ├── grid/           # Grid splitter
│   │   ├── carousel/       # Carousel splitter
│   │   ├── resize/         # Image resizer
│   │   ├── compress/       # Compress & convert
│   │   ├── watermark/      # Watermark tool
│   │   ├── mosaic/         # Mosaic / blur
│   │   ├── collage/        # Photo collage
│   │   ├── social-export/  # Social media export
│   │   ├── remove-background/  # Local AI background removal
│   │   ├── tools/          # All tools directory
│   │   ├── about/          # About page
│   │   ├── privacy/        # Privacy policy
│   │   ├── terms/          # Terms of service
│   │   ├── workspace/      # Split editor workspace
│   │   └── [toolSlug]/     # pSEO tool pages
│   ├── api/                # API routes
│   ├── robots.ts           # robots.txt
│   └── sitemap.xml/        # XML sitemap (index)
├── components/             # React components
├── hooks/                  # Custom React hooks
├── i18n/                   # Internationalization config
├── lib/                    # Utilities & business logic
│   ├── tools/catalog.ts    # Core tools single source of truth
│   └── pseo/               # Programmatic SEO data
├── messages/               # Translation files (en, zh-CN, ja, ko, es, pt-BR)
├── workers/                # Web Workers (local AI background removal)
└── types/                  # TypeScript types
```

## Tools

| Tool | URL | Description |
|------|-----|-------------|
| Image Splitter | [/](https://imgsplit.com) | Custom drag-and-drop split lines with snap alignment |
| Grid Splitter | [/grid](https://imgsplit.com/grid) | 3×3, 1×3, 2×2 social media grids |
| Carousel Splitter | [/carousel](https://imgsplit.com/carousel) | Split wide images into carousel slides |
| Image Resizer | [/resize](https://imgsplit.com/resize) | Resize, crop, rotate with social presets |
| Compress & Convert | [/compress](https://imgsplit.com/compress) | Compress and convert JPEG, PNG, WebP |
| Watermark | [/watermark](https://imgsplit.com/watermark) | Text, image, and tiled watermarks |
| Mosaic / Blur | [/mosaic](https://imgsplit.com/mosaic) | Mosaic, blur, and solid cover for privacy |
| Photo Collage | [/collage](https://imgsplit.com/collage) | Grid and story collage layouts |
| Social Export | [/social-export](https://imgsplit.com/social-export) | Multi-platform size export as ZIP |
| Background Removal | [/remove-background](https://imgsplit.com/remove-background) | Local AI background removal in browser |
| All Tools | [/tools](https://imgsplit.com/tools) | Browse all core and scenario tools |

Popular scenario pages include [Split in Half](https://imgsplit.com/split-in-half), [Split for Instagram](https://imgsplit.com/split-for-instagram), [Long Screenshot](https://imgsplit.com/split-long-screenshot), and [Split for Print](https://imgsplit.com/split-for-print).

## Privacy

ImgSplit processes all images locally in your browser using the HTML5 Canvas API. **No images are ever uploaded to any server.** Local AI background removal runs entirely in a Web Worker with a one-time model download. See our [Privacy Policy](https://imgsplit.com/privacy) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License — see [LICENSE](LICENSE) for details.

## Author

**ZooHero** — [GitHub](https://github.com/ZooHero500) · [Twitter](https://x.com/zooheroes)
