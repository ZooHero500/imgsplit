# Design QA

## Evidence

- Source visual truth: `/Users/wuzhiqiang/Library/Application Support/Open Design/namespaces/release-stable/data/projects/161c1a3d-2505-4c5a-ba4e-f817172c7d84/imgsplit-ink-edition.html`
- Source capture: `/tmp/imgsplit-design-audit/00-reference-desktop.png`
- Implementation capture: `/tmp/imgsplit-design-qa-final-home-zh-clean.png`
- Combined comparison: `/tmp/imgsplit-design-qa-final-comparison.png`
- Supporting captures:
  - `/tmp/imgsplit-design-qa-final-home-en.png`
  - `/tmp/imgsplit-design-qa-final-pseo-zh.png`
  - `/tmp/imgsplit-design-qa-final-home-mobile.png`
  - `/tmp/imgsplit-design-qa-final-workspace.png`
  - `/tmp/imgsplit-design-qa-final-production-home.png`
- Desktop viewport: 1280 x 720 CSS px; both comparison captures are 1265 x 712 px at browser density 1 after scrollbar/chrome normalization.
- Mobile viewport: 375 x 812 CSS px; rendered page client width 360 px.
- State: public landing page, first-visit state for the primary comparison; returning-user toolbar checked separately.

## Full-view comparison

The implementation preserves the reference's paper/ink palette, editorial serif display type, orange signal color, thin frame rules, right-side index rail, square controls, and generous vertical spacing. Product copy is intentionally different from the concept copy, but the hierarchy and above-the-fold proportions now remain equivalent: the title, description, and primary actions all fit in the desktop first viewport.

## Focused comparisons

- Typography: English H1 is now 235 px tall and Chinese H1 is 157 px tall at 1280 x 720; neither consumes the full viewport. pSEO H1 is two balanced lines with no orphaned CJK character.
- Spacing and layout rhythm: hero content remains aligned to the reference frame and index rail; returning-user navigation fits without a horizontal scrollbar at desktop or mobile widths.
- Colors and tokens: public pages continue to use Ink Edition tokens. Editor ruler text, ticks, border, and marker now resolve from the same ink/rule/signal tokens.
- Image quality and assets: no visual assets were introduced or replaced in this change.
- Copy and content: the missing English separator was restored, producing `Online Image Splitter — Free & Precise` in the accessibility tree.
- Accessibility: the upload surface is a native button; the mobile menu exposes dialog/expanded state, locks background scroll, closes with Escape, and restores focus to the trigger.

## Comparison history

1. Initial audit
   - P0: English homepage title measured about 538 px tall and pushed the primary action below the first viewport.
   - P1: desktop pSEO and tools headings stranded individual CJK characters.
   - P1: upload surface had mouse-only `div` semantics.
   - P2: returning-user toolbar overflowed, and the mobile menu did not expose or manage its open state.
2. First implementation pass
   - Added content-aware title sizing, keyboard upload activation, responsive toolbar prioritization, navigation dialog behavior, stronger microtype contrast, footer hierarchy cleanup, and semantic ruler tokens.
   - The first shared title class was removed after browser verification showed that its component-layer rule was not present in the emitted stylesheet.
3. Final implementation pass
   - Moved the display-title dimensions to explicit component styles so runtime sizing is deterministic across build modes.
   - Post-fix evidence: English H1 235 px, Chinese H1 157 px, pSEO H1 135 px; desktop and mobile page widths equal their client widths with no horizontal overflow.

## Findings

No actionable P0, P1, or P2 design differences remain for the requested scope.

## Follow-up polish

- P3: the local development indicator appears in dev screenshots only; it is absent from the production build.
- P3: several decorative 9–10 px labels remain elsewhere in the wider site. They were not expanded wholesale because doing so would change the established editorial density beyond this fix.

## Verification

- Primary upload control is exposed as a native button and its pointer-triggered file chooser accepts multiple files.
- Mobile navigation reports `aria-expanded=true` while open, closes with Escape, restores trigger focus, and restores body scrolling.
- Production browser console checked with no warnings or errors on the final public route.
- `bun run lint`, `bun run test` (408 tests), `bun run build`, and `git diff --check` passed.

final result: passed
