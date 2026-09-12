# GEO Audit Report: ImgSplit

**Audit Date:** 2026-03-24
**URL:** https://imgsplit.com
**Business Type:** Free Online Tool (Browser-based Web Application)
**Pages Analyzed:** 5 key pages + 80 sitemap URLs reviewed
**Languages:** English, Chinese (zh-CN), Japanese, Korean, Spanish

---

## Executive Summary

**Overall GEO Score: 40/100 (Poor)**

ImgSplit has a strong technical GEO foundation — AI crawlers are explicitly welcomed, llms.txt exists, and the site is server-rendered for excellent crawlability. However, the site is severely undermined by **zero brand presence** outside its own domain and **missing trust infrastructure** (no About page, no Privacy Policy, no contact info). AI systems currently have no external signals to recognize ImgSplit as an entity, making citation extremely unlikely despite good on-site structure. The highest-impact improvements are establishing third-party brand presence and adding basic trust pages.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 45/100 | 25% | 11.25 |
| Brand Authority | 8/100 | 20% | 1.60 |
| Content E-E-A-T | 52/100 | 20% | 10.40 |
| Technical GEO | 75/100 | 15% | 11.25 |
| Schema & Structured Data | 42/100 | 10% | 4.20 |
| Platform Optimization | 8/100 | 10% | 0.80 |
| **Overall GEO Score** | | | **39.5 → 40/100** |

---

## Critical Issues (Fix Immediately)

### 1. Zero Third-Party Brand Presence
**Impact: Catastrophic for AI visibility**

ImgSplit has **no discoverable presence** outside its own domain:
- No Wikipedia or Wikidata entry
- No Reddit mentions or discussions
- No YouTube content
- No LinkedIn company page
- No ProductHunt listing
- No presence on G2, Capterra, Trustpilot, or AlternativeTo
- No tech blog mentions or reviews
- Name collision with unrelated GitHub project "ImgSplit" by MelonSpeedruns

**Why this matters:** AI models build entity knowledge from cross-platform signals. Without any external mentions, AI systems cannot recognize "ImgSplit" as a known entity and will not recommend or cite it.

**Fix:** Create profiles on GitHub, ProductHunt, LinkedIn, Twitter/X, and submit to tool directories (AlternativeTo, ToolFinder). Target Reddit communities (r/webdev, r/design, r/instagram) with genuine engagement.

### 2. No Privacy Policy Page
**URL:** /privacy → 404
**Impact: Critical trust gap**

The site explicitly invites users to process "contracts, IDs, design files" — sensitive documents — but provides no privacy policy. While the tool genuinely processes images client-side (a strong trust signal), the absence of formal documentation is a red flag for both users and AI quality assessors.

**Fix:** Create `/privacy` page in all 5 languages explaining: client-side processing, Sentry telemetry, Vercel Analytics, cookie usage, and data retention (none).

### 3. No Terms of Service
**URL:** /terms → 404

**Fix:** Create `/terms` page in all 5 languages.

### 4. No Contact Information
**Impact: Baseline trust signal missing**

No email, phone, physical address, or contact form anywhere on the site.

**Fix:** Add contact email to footer at minimum. Consider a `/contact` page.

### 5. No About Page
**URL:** /about → 404
**Impact: E-E-A-T authority destroyed**

No identifiable person or organization behind ImgSplit. No creator bio, team info, or founding story.

**Fix:** Create `/about` page with creator name, background, motivation, and links to professional profiles (GitHub, LinkedIn).

---

## High Priority Issues

### 6. Organization Schema Missing `sameAs` — Zero Entity Linking
The Organization schema has only `name`, `url`, and `logo`. No `sameAs` links to any external platform. AI models cannot resolve "ImgSplit" as an entity across the web.

**Fix:** Add `sameAs` array to Organization schema with links to all external profiles once created.

### 7. Schema Entities Are Disconnected Islands
All 10 schema blocks across the site are standalone — no `@id` references linking Organization → WebSite → WebApplication. AI models cannot infer these are parts of the same entity.

**Fix:** Add `@id` references: Organization as `#organization`, WebSite references it as publisher, WebApplication references both.

### 8. No Person Schema for Creator
Zero author attribution on any page. No Person schema markup. E-E-A-T expertise signals completely absent.

**Fix:** Add Person schema for creator with `name`, `url`, `sameAs`, `jobTitle`, `worksFor`.

### 9. No Real Images on an Image Tool Site
An image-splitting tool with zero actual images (only SVG icons). No screenshots, no before/after examples, no real splitting demonstrations.

**Fix:** Add: tool interface screenshots, before/after splitting examples, Instagram grid demonstrations, sample outputs.

### 10. Content Lacks Experience Signals
All content reads as marketing copy. Zero case studies, real-world examples, before/after comparisons, or first-hand usage accounts. Use case sections are one-sentence generic descriptions.

**Fix:** Expand use cases to 200-300 words each with specific examples, platform dimensions, and tips from actual usage.

### 11. No `speakable` Schema Property
No speakable specification on any page. This directly signals AI assistant readability.

**Fix:** Add `speakable` with CSS selectors targeting H1, feature descriptions, and FAQ answers.

### 12. Missing `llms-full.txt`
The `llms.txt` is well-formed but there's no companion `llms-full.txt` with complete content.

**Fix:** Create `llms-full.txt` with full-text content of all key pages.

---

## Medium Priority Issues

### 13. Zero External Citations/Links
Not a single external link on any page. No references to Instagram dimension specs, MDN Canvas API docs, W3C image format standards, or any authoritative source.

**Fix:** Add contextual links to authoritative sources (Instagram help center, MDN Web Docs, etc.).

### 14. BreadcrumbList Only on `/grid`
Homepage and `/tools` have no BreadcrumbList schema.

**Fix:** Add BreadcrumbList to all pages for consistent navigation context.

### 15. Organization Logo Uses SVG
Google recommends logo images be at least 112x112px in PNG or JPG format, not SVG.

**Fix:** Update logo in Organization schema to use PNG version.

### 16. Dynamic `dateModified` in Schema
Using `new Date().toISOString()` generates today's date on every render, misrepresenting content freshness.

**Fix:** Use actual last-content-modification dates from git or build timestamps.

### 17. CollectionPage on `/tools` Has No `hasPart` or `ItemList`
The tools directory schema doesn't reference the actual tools it lists.

**Fix:** Add `mainEntity` ItemList referencing all tool pages.

### 18. No Educational/Blog Content
No guides, tutorials, or informational content beyond tool descriptions. Missing topical authority layer.

**Fix:** Create 5-10 guide articles: "Instagram Grid Dimensions Guide 2026," "PNG vs JPG vs WebP for Splitting," "How Client-Side Image Processing Works," etc.

### 19. CCBot Blocked in robots.txt
Common Crawl data feeds many open-source and smaller AI models. Blocking it reduces visibility in those ecosystems.

**Fix:** Consider allowing CCBot if broader AI model coverage is desired.

---

## Low Priority Issues

### 20. No `OAI-SearchBot` Directive
While it inherits `Allow: /` from the wildcard rule, explicitly listing it would be a best practice.

### 21. HowTo Schema Still Present (Deprecated Rich Results)
Google removed HowTo rich results in Sep 2023. The schema still provides semantic value for AI but adds payload with zero search display benefit.

### 22. No WebSite `SearchAction`
WebSite schema exists but has no `potentialAction` with `SearchAction`. Only actionable if a search feature is implemented.

### 23. Some Images Missing Alt Text
Minor accessibility gap on decorative elements.

### 24. No Visible Publication Dates
Pages show no visible "Last updated" dates to users. Only schema dateModified provides this signal (and it's dynamic/unreliable).

---

## Category Deep Dives

### AI Citability (45/100)

**Strengths:**
- 6 FAQ Q&A pairs on homepage with specific, quotable answers
- 4-step HowTo structure (Upload → Add Lines → Preview → Download)
- Specific data points: 20MB max, 20+20 split lines, PNG/JPG/WebP support, 1080x1080px Instagram specs
- Feature lists with concrete descriptions

**Weaknesses:**
- Mostly marketing copy — not optimized for AI extraction
- No self-contained definitional paragraphs ("Image splitting is...")
- Use case descriptions are one-sentence summaries, not substantial enough to cite
- No comparison data ("ImgSplit vs Photoshop: X% faster, Y% smaller")
- No unique research, benchmarks, or original data
- No "What is [topic]?" answer blocks that AI systems love to extract

**Top Citable Passages (Current):**
1. FAQ answer about privacy: "Yes. ImgSplit processes everything locally in your browser. Your images are never uploaded to any server."
2. FAQ answer about file limits: "ImgSplit supports up to 20 horizontal and 20 vertical split lines"
3. Feature description: "100% browser-based, no upload needed"

**Passages Needing Improvement:**
1. E-commerce use case: "Split long product images into sections for different display areas" → Should include specific platform dimensions, marketplace guidelines
2. Hero description: Generic marketing language → Should include a definitional opening paragraph
3. Tool descriptions on /tools: One-line descriptions → Should be 2-3 sentences with specific use cases

### Brand Authority (8/100)

| Platform | Present | Impact |
|---|---|---|
| Wikipedia | No | Critical for AI entity recognition |
| Reddit | No | Key citation source for AI models |
| YouTube | No | High-authority content platform |
| LinkedIn | No | Professional credibility signal |
| ProductHunt | No | Tool discovery platform |
| GitHub | No | Developer credibility |
| G2/Capterra | No | Software review authority |
| AlternativeTo | No | Tool directory |
| Twitter/X | No | Real-time brand signal |
| Tech Blogs | No | Editorial authority |

**Brand Authority Score: 8/100** — The 8 points come from: having a memorable domain name (imgsplit.com), consistent brand identity across the site, and a well-formed llms.txt. Everything else is zero.

### Content E-E-A-T (52/100)

| Dimension | Score | Key Gap |
|---|---|---|
| Experience | 8/25 | No real-world examples, case studies, or first-hand accounts |
| Expertise | 10/25 | No author attribution, no technical depth on how browser splitting works |
| Authoritativeness | 8/25 | No About page, no external citations, no industry recognition |
| Trustworthiness | 20/25 | Strong privacy claims but no formal policies or contact info |

**Content Strengths:** Well-structured heading hierarchy, specific technical specs, multilingual support (5 languages), clean readable copy, FAQ sections with real value.

**Content Gaps:** No educational content layer (guides, tutorials), no comparison content, no visual examples, no author voice or personality, zero external references.

### Technical GEO (75/100)

| Component | Score | Status |
|---|---|---|
| AI Crawler Access | 22/25 | 6 crawlers explicitly allowed; only CCBot blocked |
| llms.txt | 18/25 | Present, well-formed; missing llms-full.txt |
| Server Rendering | 15/15 | Next.js SSR with React streaming — excellent |
| HTTPS | 5/5 | Enabled |
| Sitemap | 5/5 | 80 URLs, hreflang, proper priorities |
| Page Speed | 5/10 | No measurement data; Next.js SSR is generally fast |
| Meta Tags | 5/5 | Title, description, OG, Twitter Card all present |
| Robots.txt | 5/5 | Well-structured with sitemap reference |
| llms-full.txt | 0/5 | Missing |

**Technical GEO is ImgSplit's strongest category.** The site is extremely well-prepared for AI crawlers at the infrastructure level. The gap is entirely in content and brand signals.

### Schema & Structured Data (42/100)

**10 schema blocks found across 3 audited pages:**

| Page | Schema Types |
|---|---|
| Homepage | WebSite, WebApplication, FAQPage, Organization, HowTo |
| /grid | BreadcrumbList, WebApplication, HowTo, FAQPage |
| /tools | CollectionPage |

**Critical Gaps:**
1. Organization has zero `sameAs` links (the single biggest schema gap)
2. No `@id` entity linking between schemas
3. No Person schema anywhere
4. No `speakable` property
5. Logo uses SVG instead of PNG/JPG

**What's Good:**
- All schemas use JSON-LD (best practice)
- WebApplication schemas are well-formed with offers, featureList, applicationCategory
- FAQ schemas have real, valuable Q&A content
- Consistent schema across multiple pages

### Platform Optimization (8/100)

ImgSplit has **zero presence** on platforms that AI models rely on for training data and citations:

| Platform | AI Model Usage | ImgSplit Presence |
|---|---|---|
| Reddit | High — ChatGPT, Claude, Perplexity all cite Reddit | None |
| YouTube | High — Google AI Overviews cite YouTube | None |
| Wikipedia | Critical — Core entity recognition source | None |
| StackOverflow | Medium — Developer-oriented queries | None |
| ProductHunt | Medium — Tool discovery | None |
| LinkedIn | Medium — Professional credibility | None |
| GitHub | Medium — Developer trust signal | None |
| Medium/Dev.to | Low-Medium — Technical content | None |

---

## Quick Wins (Implement This Week)

1. **Create Privacy Policy page** (`/privacy`) — Write a clear statement that images are processed client-side and never uploaded. Mention Sentry/analytics telemetry. Deploy in all 5 languages. (Estimated impact: +5 Trust score)

2. **Create About page** (`/about`) — Even 200 words about who built ImgSplit and why. Include creator name, GitHub/LinkedIn link. (Estimated impact: +8 Authority/Expertise score)

3. **Add `sameAs` to Organization schema** — Create GitHub repo and Twitter/X account first, then add URLs to schema. (Estimated impact: +10 Schema score)

4. **Add `@id` references across all schemas** — Connect Organization → WebSite → WebApplication with entity IDs. Purely code change, no content needed. (Estimated impact: +5 Schema score)

5. **Create `llms-full.txt`** — Expand llms.txt with full-text content of homepage, key features, FAQ answers, and all tool descriptions. (Estimated impact: +3 Technical GEO score)

---

## 30-Day Action Plan

### Week 1: Trust & Identity Foundation
- [ ] Create Privacy Policy page in all 5 languages
- [ ] Create Terms of Service page in all 5 languages
- [ ] Create About page with creator bio, motivation, and professional links
- [ ] Add contact email to footer
- [ ] Add `sameAs` to Organization schema (even if profiles are new/empty)
- [ ] Add `@id` entity linking across all schemas
- [ ] Add Person schema for creator

### Week 2: Platform Presence Building
- [ ] Create GitHub repository (public) with README, contributing guide
- [ ] Launch ProductHunt page with screenshots and description
- [ ] Create LinkedIn company page
- [ ] Create Twitter/X account and post announcement
- [ ] Submit to AlternativeTo.net (compare with Photoshop, Canva, etc.)
- [ ] Write and publish a Reddit post in r/webdev or r/SideProject
- [ ] Create `llms-full.txt`
- [ ] Add `speakable` property to schemas

### Week 3: Content Enrichment
- [ ] Add real screenshots and before/after images to homepage
- [ ] Expand all use case descriptions to 200-300 words with specific examples
- [ ] Add Instagram grid visual examples to `/split-for-instagram`
- [ ] Create definitional opening paragraph for homepage ("Image splitting is...")
- [ ] Add external citations (Instagram dimension specs, MDN Canvas API docs)
- [ ] Fix dynamic `dateModified` to use actual content dates
- [ ] Add BreadcrumbList to homepage and `/tools`

### Week 4: Educational Content Layer
- [ ] Publish guide: "Instagram Grid Dimensions Guide 2026"
- [ ] Publish guide: "PNG vs JPG vs WebP — Which Format for Image Splitting?"
- [ ] Publish guide: "How Browser-Based Image Processing Works"
- [ ] Add ItemList to `/tools` CollectionPage schema
- [ ] Add comparison content: "ImgSplit vs Photoshop Slicing"
- [ ] Review and optimize FAQ sections for AI extractability
- [ ] Add visible "Last updated" dates to all pages

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| https://imgsplit.com | Online Image Splitter — Free, Instant & Precise \| ImgSplit | 12 (no About/Privacy/Contact, schema gaps, content gaps) |
| https://imgsplit.com/grid | Free Online Image Grid Splitter \| ImgSplit | 6 (thin content ~500 words, no real images, schema gaps) |
| https://imgsplit.com/tools | All Image Splitting Tools — Free Online \| ImgSplit | 8 (thin content ~550 words, minimal CollectionPage schema, no ItemList) |
| https://imgsplit.com/robots.txt | N/A | 1 (CCBot blocked, no OAI-SearchBot directive) |
| https://imgsplit.com/llms.txt | N/A | 1 (missing llms-full.txt companion) |
| https://imgsplit.com/sitemap.xml | N/A | 1 (all entries share same lastmod date) |

### Sitemap URL Count by Category

| Category | URL Count | Languages |
|---|---|---|
| Homepage | 5 variants | en, zh-CN, ja, ko, es |
| Core tools (grid, tools, split-in-half, etc.) | ~25 | 5 languages each |
| Feature tools (Instagram, WeChat, print, etc.) | ~50 | 5 languages each |
| **Total** | **80** | |

---

## Methodology

This audit was performed on 2026-03-24 using:
- Live page fetches via WebFetch for all analyzed URLs
- Web searches for brand mention discovery
- robots.txt and llms.txt analysis
- Schema.org markup extraction and validation
- E-E-A-T signal assessment against Google Quality Rater Guidelines
- AI citability scoring based on passage extractability and self-containment
- Platform presence scanning across 10+ major platforms

GEO Score weights follow the standard GEO audit framework:
- AI Citability (25%), Brand Authority (20%), Content E-E-A-T (20%), Technical GEO (15%), Schema (10%), Platform Optimization (10%)
