# Local AI Background Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an ImgSplit `/remove-background` MVP that removes image backgrounds in the browser with an explicit one-time model download, cache status, and transparent PNG export.

**Architecture:** Use a client-only editor page that uploads one image, asks the user to download the local AI model, runs background removal in a Web Worker, composites the returned alpha mask on canvas, and exports PNG/WebP/JPEG. Keep image pixels local; only model files are downloaded. Cache awareness is handled via browser Cache Storage plus the Transformers.js browser cache.

**Tech Stack:** Next.js App Router, TypeScript strict mode, Tailwind CSS v4, `@huggingface/transformers`, Web Worker, Canvas API, Bun.

---

## File Structure

- Create `src/app/[locale]/remove-background/page.tsx`: localized tool route, metadata, JSON-LD, client editor mount.
- Create `src/components/background-removal/DynamicBackgroundRemovalEditor.tsx`: dynamic import wrapper with loading copy.
- Create `src/components/background-removal/BackgroundRemovalEditor.tsx`: upload, model download explanation, progress, cache state, preview, export controls.
- Create `src/workers/background-removal.worker.ts`: lazy-load Transformers.js `Xenova/modnet`, report progress, run local background removal, return mask image bytes.
- Create `scripts/download-background-removal-model.mjs`: download the model into `public/models/Xenova/modnet` for first-party hosting.
- Create `public/models/README.md`: document first-party model hosting and the `NEXT_PUBLIC_BACKGROUND_REMOVAL_MODEL_SOURCE` switch.
- Create `src/lib/background-removal.ts`: cache detection, compositing, export helpers, file name helpers.
- Create `src/lib/__tests__/background-removal.test.ts`: unit tests for cache helpers, compositing/export behavior, and filenames.
- Modify `src/lib/tools/catalog.ts`: add `removeBackground` core tool and pSEO editor hrefs.
- Modify `src/components/SiteNav.tsx`: add icon mapping.
- Modify `src/messages/{en,zh-CN,ja,ko,es}.json`: add `removeBackground`, footer labels, tools hub labels.
- Modify `src/app/sitemap.ts`: core tool sitemap automatically picks up catalog entry.
- Modify `docs/ideation/PROGRESS.md` and `docs/ideation/2026-05-26-tool-expansion.md`: reflect implementation start/details.

---

### Task 1: Add Pure Background Removal Helpers

**Files:**
- Create: `src/lib/background-removal.ts`
- Test: `src/lib/__tests__/background-removal.test.ts`

- [ ] **Step 1: Write tests for helper behavior**

Test cases:
- `formatModelBytes(26214400)` returns `25 MB`.
- `getBackgroundRemovalBaseName("product.photo.jpg")` returns `product.photo`.
- `getBackgroundRemovalBaseName("image")` returns `image`.
- `composeBackgroundRemovalResult()` draws the source image and applies the provided alpha mask.
- `exportBackgroundRemovalCanvas()` passes MIME type and quality to `canvas.toBlob`.

Run: `bunx vitest run src/lib/__tests__/background-removal.test.ts`
Expected: FAIL because the helper file does not exist.

- [ ] **Step 2: Implement helpers**

Implement:
- `BACKGROUND_REMOVAL_MODEL_ID = "Xenova/modnet"`
- `BACKGROUND_REMOVAL_MODEL_LABEL = "MODNet local AI model"`
- `BACKGROUND_REMOVAL_ESTIMATED_MODEL_BYTES = 25 * 1024 * 1024`
- `formatModelBytes(bytes: number): string`
- `getBackgroundRemovalBaseName(fileName: string): string`
- `composeBackgroundRemovalResult(image, maskBlob): Promise<HTMLCanvasElement>`
- `exportBackgroundRemovalCanvas(canvas, format, quality): Promise<Blob>`
- `isBackgroundRemovalModelLikelyCached(): Promise<boolean>` using Cache Storage best-effort matching for `Xenova/modnet`, `modnet`, or Hugging Face model paths.

- [ ] **Step 3: Verify helper tests**

Run: `bunx vitest run src/lib/__tests__/background-removal.test.ts`
Expected: PASS.

---

### Task 2: Add Local Inference Worker

**Files:**
- Create: `src/workers/background-removal.worker.ts`

- [ ] **Step 1: Implement worker protocol**

Message types:
- Main to worker: `{ type: "remove-background"; image: Blob; modelId: "Xenova/modnet" }`
- Worker to main: `{ type: "status"; status: "loading" | "ready" | "processing" }`
- Worker to main: `{ type: "download-progress"; progress: number | null }`
- Worker to main: `{ type: "result"; mask: Blob }`
- Worker to main: `{ type: "error"; message: string }`

- [ ] **Step 2: Implement local model load**

Inside worker:
- Dynamically import `pipeline` and `env` from `@huggingface/transformers`.
- Set `env.allowLocalModels = true`, `env.localModelPath = "/models/"`, and allow Hugging Face fallback unless `NEXT_PUBLIC_BACKGROUND_REMOVAL_MODEL_SOURCE=local`.
- Load `pipeline("background-removal", "Xenova/modnet", { dtype: "fp32", progress_callback })`.
- Reuse the loaded pipeline for later images.

- [ ] **Step 3: Implement inference**

Inside worker:
- Convert the incoming image blob to an object URL.
- Run the segmenter.
- Convert `output[0]` to a PNG mask blob with `toBlob()`.
- Revoke the object URL in `finally`.
- Return the mask blob.

---

### Task 3: Build the Editor UX

**Files:**
- Create: `src/components/background-removal/DynamicBackgroundRemovalEditor.tsx`
- Create: `src/components/background-removal/BackgroundRemovalEditor.tsx`
- Create: `src/app/[locale]/remove-background/page.tsx`

- [ ] **Step 1: Add dynamic wrapper and route**

Follow existing `compress`, `mosaic`, and `collage` routes:
- fixed-height editor page
- localized metadata
- JSON-LD `WebApplication`
- dynamic client component with loading text

- [ ] **Step 2: Build upload and model preparation state**

Editor states:
- `idle`: upload zone visible.
- `selected`: preview original image and show model download explanation.
- `loading-model`: show model download progress.
- `processing`: show local processing status.
- `ready`: show before/after preview and export controls.
- `error`: show retry action.

User-facing model copy must say:
- The AI model is downloaded once.
- The model is used to process images in this browser.
- Images are not uploaded.
- Cached model usually avoids future downloads.

- [ ] **Step 3: Wire worker**

On `Download model & remove background`:
- Create worker with `new Worker(new URL("../../workers/background-removal.worker.ts", import.meta.url), { type: "module" })`.
- Pass image blob to worker.
- Update status/progress from worker events.
- On result, call `composeBackgroundRemovalResult()`.
- Store result canvas and object URL.

- [ ] **Step 4: Add export controls**

Support:
- PNG transparent export.
- WebP transparent export with quality.
- JPEG export flattened on white.
- Download filename `<base-name>-no-bg.<ext>`.

---

### Task 4: Register Tool and i18n

**Files:**
- Modify: `src/lib/tools/catalog.ts`
- Modify: `src/components/SiteNav.tsx`
- Modify: `src/messages/en.json`
- Modify: `src/messages/zh-CN.json`
- Modify: `src/messages/ja.json`
- Modify: `src/messages/ko.json`
- Modify: `src/messages/es.json`

- [ ] **Step 1: Add catalog entry**

Add a `removeBackground` core tool with:
- `href: "/remove-background"`
- `quickAccessHref: "/remove-background"`
- `sitemapPriority: 0.9`
- icon key `removeBackground`

- [ ] **Step 2: Add icon mapping**

Use `Sparkles` from lucide-react for the public dropdown and tool cards.

- [ ] **Step 3: Add messages**

Add:
- footer label `toolRemoveBackground`
- tools hub label/description
- `removeBackground` namespace with metadata and editor strings in all five locales.

---

### Task 5: Verify

**Files:**
- All files above.

- [ ] **Step 1: Install dependency**

Run: `bun add @huggingface/transformers`
Expected: package added to `package.json` and lockfile.

- [ ] **Step 2: Run focused tests**

Run: `bunx vitest run src/lib/__tests__/background-removal.test.ts`
Expected: PASS.

- [ ] **Step 3: Run lint/build**

Run: `bun run build`
Expected: PASS or document pre-existing unrelated failures separately.

- [ ] **Step 4: Browser smoke**

Run dev server and open `/remove-background`.
Check:
- upload screen renders
- model explanation is visible before processing
- cache status text is visible
- export controls do not overflow on mobile width

---

## Self-Review

Spec coverage:
- Local browser processing: Task 2 and Task 3.
- Explicit model download explanation: Task 3.
- Avoid repeated downloads / cache status: Task 1 and Task 3.
- Tool integration: Task 4.
- Verification: Task 5.

Placeholder scan:
- No `TODO`, `TBD`, or undefined task references remain.

Type consistency:
- Tool id is consistently `removeBackground`.
- Route is consistently `/remove-background`.
- Model id is consistently `Xenova/modnet`.
