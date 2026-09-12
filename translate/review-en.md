# English Content Review Report — ImgSplit

Reviewer: Professional English Copywriter
Date: 2026-03-22
Files reviewed:
- `src/messages/en.json` (UI strings & marketing copy)
- `src/lib/pseo/en.ts` (SEO landing page data)

---

## Overall Quality Assessment

The English content is generally strong — clear, action-oriented, and well-structured. The tone is appropriately conversational without being sloppy. Most FAQ answers are accurate and concise. The main areas for improvement are:

1. **SEO title lengths** — 9 out of 12 titles exceed the 60-character guideline. Google typically truncates at ~60 chars, so the brand suffix `| ImgSplit` and some filler words should be trimmed.
2. **One critical SEO mistake** — the `split-for-wechat` page uses completely generic copy that has nothing to do with WeChat, duplicating the homepage title/description instead.
3. **WeChat Moments references in the English version** — "WeChat Moments" and "Xiaohongshu" are China-specific platforms unfamiliar to English-speaking audiences. These should be replaced with globally relevant platforms.
4. **Minor inconsistencies** in how the same feature is described across pages.

---

## Issues Found

### Critical

**1. `split-for-wechat` has completely wrong SEO copy — duplicates homepage instead of being WeChat-specific**

| Field | Current | Problem |
|-------|---------|---------|
| `seo.title` | "Free Online Image Splitter — Split & Grid Photos Instantly \| ImgSplit" | Generic — identical concept to homepage title. Not about WeChat/social grids at all. |
| `seo.description` | "Free online image splitter with drag-and-drop split lines. Cut photos into any grid or custom segments. Browser-based, private, no upload needed." | Generic — no mention of social media or grids. |
| `seo.ogTitle` | "Free Image Splitter — Split Photos Online" | Generic. |
| `seo.ogDescription` | "Split images into grids or custom segments. Free and browser-based." | Generic. |
| `hero.overline` | "Image Grid Splitter" | Vague — should reference social media. |
| `hero.description` | "Split images into grid tiles for social media posts..." | Better than the SEO fields, but still not specific enough. |
| `faqEntries` | `[]` (empty) | No FAQs — every other page has 3. |

**Suggested fix:** Since the analysis doc notes that "WeChat Moments" should be localized to "social media" for non-Chinese audiences, this page should be rewritten as a general "Social Media Grid Splitter" page. Suggested copy:

- `seo.title`: `"Split Images for Social Media Grids — Free Online Tool | ImgSplit"` (60 chars)
- `seo.description`: `"Split images into grid tiles for social media profiles. Create 3x3, 2x2, or custom grids for Instagram, Facebook, and more. Free, browser-based."` (147 chars)
- `seo.ogTitle`: `"Social Media Grid Splitter — Free Online Tool"`
- `seo.ogDescription`: `"Split images into grid tiles for social media. Free and browser-based."`
- Add 3 FAQ entries relevant to social media grids.

---

**2. "WeChat Moments" and "Xiaohongshu" references in English-facing content**

These China-specific platforms are meaningless to English-speaking users and hurt SEO relevance.

| File | Key Path | Current Text | Suggested Fix |
|------|----------|-------------|---------------|
| `en.json` | `grid.metadata.description` | "...for WeChat Moments, Instagram, and social media." | "...for Instagram, Facebook, and social media." |
| `en.json` | `grid.landing.hero.description` | "...for WeChat Moments, Instagram, Xiaohongshu, and other social platforms." | "...for Instagram, Facebook, and other social platforms." |
| `en.json` | `grid.landing.types.3x3Desc` | "...for Instagram and WeChat Moments" | "...for Instagram and social media profiles" |
| `en.json` | `toolsHub.metadata.description` | "...for Instagram, WeChat, printing, and more." | "...for Instagram, social media, printing, and more." |

---

### Medium

**3. SEO titles exceeding 60 characters — risk of truncation in Google SERPs**

| Key | Current (length) | Suggested Fix (length) |
|-----|-----------------|----------------------|
| `metadata.title` | "Free Online Image Splitter — Split & Cut Photos Instantly \| ImgSplit" (68) | "Free Online Image Splitter — Split Photos Instantly \| ImgSplit" (62) or "Online Image Splitter — Free, Instant & Precise \| ImgSplit" (58) |
| `split-in-half seo.title` | "Split Image in Half Online — Free 50/50 Image Divider \| ImgSplit" (64) | "Split Image in Half Online — Free 50/50 Divider \| ImgSplit" (58) |
| `split-horizontally seo.title` | "Split Image Horizontally Online — Free Horizontal Image Cutter \| ImgSplit" (73) | "Split Image Horizontally Online — Free Cutter \| ImgSplit" (56) |
| `split-vertically seo.title` | "Split Image Vertically Online — Free Vertical Image Cutter \| ImgSplit" (69) | "Split Image Vertically Online — Free Cutter \| ImgSplit" (54) |
| `split-into-equal-parts seo.title` | "Split Image into Equal Parts Online — Free Grid Divider \| ImgSplit" (66) | "Split Image into Equal Parts — Free Online Divider \| ImgSplit" (61) or "Split Image into Equal Parts Online — Free \| ImgSplit" (52) |
| `split-long-screenshot seo.title` | "Split Long Screenshots into Pages — Free Online Tool \| ImgSplit" (63) | "Split Long Screenshots into Pages — Free Tool \| ImgSplit" (57) |
| `split-for-instagram seo.title` | "Split Images for Instagram Carousel & Grid — Free Online Tool \| ImgSplit" (72) | "Instagram Image Splitter — Carousel & Grid \| ImgSplit" (53) |
| `split-for-print seo.title` | "Split Large Image for Printing — Free Tile Print Tool \| ImgSplit" (64) | "Split Image for Printing — Free Tile Tool \| ImgSplit" (52) |

Note: `grid.metadata.title` (42 chars) and `no-photoshop-slicer seo.title` (57 chars) are fine.

---

**4. Homepage meta description exceeds 160 characters (173 chars)**

| File | Key Path | Current (173 chars) | Suggested Fix (~155 chars) |
|------|----------|--------------------|-----------------------------|
| `en.json` | `metadata.description` | "Free online image splitter — drag split lines, snap to grid, and download all pieces instantly. No upload needed, 100% browser-based image cutter. Works on desktop & mobile." | "Free online image splitter — drag split lines, snap to grid, and download pieces instantly. No upload needed, 100% browser-based. Desktop & mobile." (148 chars) |

---

**5. `grid.metadata.title` inconsistent format — uses hyphen instead of em dash**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `grid.metadata.title` | "ImgSplit - Free Online Image Grid Splitter" | "Free Online Image Grid Splitter \| ImgSplit" (to match other pages' pattern: `[descriptive title] \| ImgSplit`) |

Every other title uses `| ImgSplit` as the brand suffix. This one uses `ImgSplit -` as a prefix. Should follow the established pattern for consistency and SEO (descriptive keywords come first).

---

**6. `trust.qualityDesc` — "Pixel-for-pixel quality" is awkward phrasing**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `trust.qualityDesc` | "Pixel-for-pixel quality" | "Zero quality loss" or "Original quality preserved" |

"Pixel-for-pixel" is not a standard English phrase. The glossary term is "pixel-perfect," but in this context (describing lossless output), the meaning is about preserving quality rather than precision.

---

**7. `trust.freeDesc` — "No limits" is vague and potentially misleading**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `trust.freeDesc` | "No limits" | "No signup, no fees" or "Free with no restrictions" |

The tool does have limits (20MB file size, 20 split lines). "No limits" could set false expectations. A more accurate and still compelling alternative focuses on the absence of paywalls and account requirements.

---

**8. Inconsistent terminology: "split lines" vs "lines" across pages**

The glossary establishes "split line" as the core term, but some places drop "split":

| File | Key Path | Current | Note |
|------|----------|---------|------|
| `en.ts` | `split-horizontally howToSteps[1]` | "Click 'Add Horizontal Line'" | Should be "Add Horizontal **Split** Line" (or match the actual UI button text `+ Horizontal Line` from `workspace.addHorizontal`) |
| `en.json` | `workspace.addHorizontal` | "+ Horizontal Line" | The UI button itself says "Line" not "Split Line" |

This is a minor tension between the glossary and the UI. If the UI buttons say "Horizontal Line" and "Vertical Line" (without "Split"), then the how-to instructions should match the UI exactly to avoid confusion. Consider either:
- (a) Updating UI buttons to "+ Horizontal Split Line" / "+ Vertical Split Line", or
- (b) Accepting "Line" in the UI for brevity and matching it in instructions.

---

### Minor

**9. `benefits.batchTitle` — "Twice as Fast" is an unsupported claim**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `benefits.batchTitle` | "Batch Split, Twice as Fast" | "Batch Split, Save Time" or "Batch Split in Seconds" |

"Twice as fast" compared to what? This is a vague comparative claim with no benchmark. Replace with a less specific but still compelling speed message.

---

**10. `features.gridDesc` — unnecessarily verbose**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `features.gridDesc` | "Add horizontal and vertical lines simultaneously to quickly create regular grids for efficient batch cropping." | "Add horizontal and vertical lines at once to create even grids for batch cropping." |

"Simultaneously" and "efficiently" are filler. "Regular" is ambiguous (could mean "ordinary").

---

**11. `hero.description` — redundant with `metadata.description`**

| File | Key Path | Current |
|------|----------|---------|
| `en.json` | `hero.description` | "Free online image splitter with drag-and-drop split lines, snap alignment, and pixel-perfect precision. No upload needed — everything runs in your browser." |
| `en.json` | `metadata.description` | "Free online image splitter — drag split lines, snap to grid, and download all pieces instantly. No upload needed, 100% browser-based image cutter. Works on desktop & mobile." |

Both start with "Free online image splitter" and hit similar points. This is acceptable for SEO (meta desc vs. visible hero text serve different purposes), but noted in case consolidation is desired.

---

**12. `pseoChrome.howItWorksHeadlinePart1` has a trailing space**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `pseoChrome.howItWorksHeadlinePart1` | `"Simple "` (trailing space) | `"Simple "` — keep as-is if this is intentional for layout joining with `headlineAccent`, otherwise trim |

This appears intentional (the space separates "Simple" from the accent word "Steps" when concatenated), but verify that other `headlinePart1` values handle spacing consistently. Looking at the pattern: `hero.headlinePart1` = `"Online"` (no trailing space), while `pseoChrome.howItWorksHeadlinePart1` = `"Simple "` (trailing space). This inconsistency suggests the rendering component may handle spacing differently, which could cause double-space or no-space bugs.

---

**13. `editor.pinchHint` — "Pinch to resize" should be "Pinch to zoom"**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `grid.editor.pinchHint` | "Drag to move · Pinch to resize" | "Drag to move · Pinch to zoom" |

"Pinch to zoom" is the standard mobile UI convention. The image is not being resized; the view is being zoomed.

---

**14. `useCases.ecommerceResult` — specificity without evidence**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `useCases.ecommerceResult` | "40%+ faster page loads" | "Faster page loads" or "Optimized load times" |

"40%+" is a specific performance claim that requires a citation. If there is no supporting data, use a qualitative statement instead.

---

**15. `useCases.designerResult` — another unsupported metric**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `useCases.designerResult` | "3x faster asset export" | "Faster asset export" or "Export in seconds" |

Same issue as above — "3x faster" compared to what baseline?

---

**16. `steps.step3Desc` — "confirm the results meet your needs" is wordy**

| File | Key Path | Current | Suggested Fix |
|------|----------|---------|---------------|
| `en.json` | `steps.step3Desc` | "See each split region in real-time and confirm the results meet your needs." | "See each split region in real-time and verify the results." |

---

**17. `workspace.shortcutHints` — Mac-specific shortcuts without Windows alternatives**

| File | Key Path | Current |
|------|----------|---------|
| `en.json` | `workspace.shortcutHints` | "...Cmd+0 Fit \| Cmd+1 100%" |

Uses `Cmd` (Mac) but also `Ctrl` (cross-platform). On Windows, `Cmd+0` / `Cmd+1` do not exist. Consider dynamic key labels or showing both: `Cmd/Ctrl+0`.

---

**18. `split-for-instagram platformInfo` — uses multiplication sign inconsistently**

| File | Key Path | Current | Note |
|------|----------|---------|------|
| `en.ts` | `split-for-instagram.platformInfo` | "1080 × 1080 px" (with spaces around ×) | Fine, but the seo.description uses "1080×1080px" (no spaces). Pick one style. |

---

## Terminology Consistency Check

| Term | en.json | en.ts (pSEO) | Consistent? |
|------|---------|-------------|-------------|
| split line(s) | Used throughout | Used throughout | Yes |
| snap alignment | `hero.description`, `features.preciseDesc` | Multiple pages | Yes |
| pixel-perfect | `hero.description`, `features.preciseTitle` | Multiple pages | Yes |
| browser-based | `metadata.description`, `features.privacyDesc` | Multiple pages | Yes |
| grid splitting | `features.gridTitle` | Grid Splitter references | Yes |
| lossless | `trust.qualityLabel` ("Lossless Quality") | "zero quality loss" in pSEO | Mostly — different phrasing but same meaning |
| ZIP download | `features.downloadDesc`, `results.downloadAll` | Multiple pages | Yes |
| drag and drop | `hero.description`, `upload.dragHint` | Multiple pages | Yes |

---

## Summary

| Severity | Count | Key Actions |
|----------|-------|-------------|
| Critical | 2 | Fix `split-for-wechat` generic copy; remove WeChat/Xiaohongshu from English content |
| Medium | 6 | Trim SEO titles to ≤60 chars; fix meta description length; fix title format inconsistency; fix awkward phrasing in trust badges |
| Minor | 10 | Remove unsupported metrics; tighten verbose copy; fix pinch/zoom label; address spacing inconsistency |

The content is well-written at its core. The critical issues are localization errors (China-specific references in English) and one pSEO page with placeholder-quality generic copy. The medium issues are SEO-technical and easy to fix. The minor issues are polish-level refinements.
