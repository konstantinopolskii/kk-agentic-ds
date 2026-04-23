---
session: 2026-04-24-markdown-source
stage: phase-1e
role: maintainer
input: phase-1-fresh-eyes-jobs-round-3.md defect list (three) + style.css at fbd4eee
output: .doc__section heading-to-next-sibling reset + heading margin-bottom + .doc__part below-gap tightened + .registry-table first-row padding suppression under heading + manifesto next-sibling paragraph + three fresh screenshots
gate: KK stamp after screenshot review
---

Phase 1e of the markdown-as-source initiative. Phase 1d closed eleven Jobs round 2 defects and landed the heading-offset contract plus the quote and embedded-HTML conventions. Jobs round 3 came back FAIL with three residual rule-12 defects — all margin-stacking misses where a heading's below-gap tied or exceeded its above-gap. This phase lands the rescue: every doc__section heading level owns its below-gap, the next sibling's top margin collapses to zero so component-intrinsic margins (registry-table, raw-HTML paragraphs, cards) cannot inflate below past the 2:1 floor; the `.doc__part` below-gap is tightened so the part heading reads as clear lead over the first section; the `.registry-table` first header row drops its 12 px top padding when the table sits directly under a heading, so text-to-text below clears 2:1 without leading slack dragging it back.

## Per-defect fix log

| # | Jobs defect (audit measure) | Fix applied | Post-fix measure (text-to-text) |
|---|---|---|---|
| 1 | sample-c h3 "Card embedded in markdown" — 91 above / 125 below (inverted) | `style.css § Main document` — `.doc__section > h2 + *, h3 + *, h4 + *, .t-display + *, .t-title + *, .t-subtitle + * { margin-top: 0 }` zeroes the next-sibling top margin so the raw-HTML caption + card stack cannot pile on top of the heading's own below-gap. Heading below-gap now carried explicitly by `margin-bottom: var(--space-10)` (40) on h2/h3/.t-display/.t-title. Above-gap lifted from 80 to `calc(var(--space-20) + var(--space-3))` (92) so text-baseline ratio clears 2:1 with leading-slack safety margin. | 95 above / 43 below = **2.21:1** ✓ |
| 2 | `.doc__part` "Samples" — 139 above / 93 below (ratio 1.49:1) | `style.css § Main document` — `.doc__part + .doc__section` `padding-top` tightened `var(--space-20)` (80) → `var(--space-10)` (40). Below the part drops from 92 box px to 52 box px. Chose the below-reduction path (option a) over bumping the part padding-top: keeps overall section-to-section rhythm intact and avoids a deeper vertical break between parts. | 119 above / 40 below = **2.98:1** ✓ |
| 3 | sample-b h3 "Table" — 92 above / 66 below (ratio 1.39:1) | Inherited defect-1 reset (`h3 + * { margin-top: 0 }`) drops the `.registry-table`'s intrinsic 16 px margin-top to 0. Additional rule `.doc__section > h3 + .registry-table > thead > tr > th { padding-top: 0 }` (and parallel selectors for h2/h4/.t-display/.t-title/.t-subtitle) suppresses the 12 px first-header-row top padding that otherwise pushes the visible text below-gap past the 2:1 floor even after the margin reset. | 96 above / 43 below = **2.23:1** ✓ |

## `style.css` changes (within the typography section)

Three edits to `.doc__section` rhythm, one edit to the part padding, one edit to the registry-table first-row padding, and one clean-up delete of the now-subsumed h4 block.

1. `.doc__section > * + .t-display, * + .t-title, * + h2, * + h3` above-gap lifted `var(--space-20)` (80) → `calc(var(--space-20) + var(--space-3))` (92). Clears 2:1 text ratio with leading-slack safety margin.
2. New block — `.doc__section > h2 + *, h3 + *, h4 + *, .t-display + *, .t-title + *, .t-subtitle + * { margin-top: 0 }`. The rule-12 rescue. Next sibling's top margin collapses; heading's own margin-bottom is the sole below-gap carrier.
3. New block — `.doc__section > h2, h3, .t-display, .t-title { margin-bottom: var(--space-10) }` (40). Rule 13 floor holds (below ≥ heading line-height 28).
4. New block — `.doc__section > h4, .t-subtitle { margin-bottom: var(--space-12) }` (48). Rule 13 floor holds (below ≥ subtitle line-height 24).
5. New block — `.doc__section > h2 + .registry-table > thead > tr > th, …` (same for h3/h4/t-display/t-title/t-subtitle) `{ padding-top: 0 }`. Suppresses the first-row cell top padding under a heading so text-to-text below is not inflated by the table's internal cell rhythm.
6. `.doc__part + .doc__section` `padding-top` tightened `var(--space-20)` (80) → `var(--space-10)` (40). Rule 12 ratio 2.98:1.
7. Deleted the standalone h4/subtitle margin block (old `margin-top: var(--space-12)` on `h4 + *` and `calc(var(--space-20) + var(--space-4))` on `* + h4`). The h4 above-gap rule moved into the unified above-gap block at step 1's companion; the below-gap is now owned by step 4's margin-bottom rule.

## Side effects — verified clean

Walked every kit component that can sit directly under a doc-section heading:

- `.registry-table` (margin-top 16) — reset to 0 above + th padding-top 0 when under heading. Defect 3. Cell rhythm below the header row unchanged.
- `.card` — no own margin-top. Unchanged below-gap inherits from heading's margin-bottom. Verified on sample-c "Card embedded in markdown" + "Prose between raw HTML".
- `.quote` — no own margin-top (checked rule block at `style.css` line 1763+). Unchanged.
- `<ul>`, `<ol>` (as `t-list`) — browser default collapses; the `.doc__section > * + *` 20 px rule was the visible above-gap. Now under a heading, their above-gap is 0 and the heading's margin-bottom 40 carries the break. Sample-a "Lists" section h3 → ul: visible text ratio 2.23:1 measured.
- `<pre>` (fenced code) — no own margin-top. Unchanged. Sample-b "Fenced code block" h3 → pre: visible ratio 2.21:1.
- `<hr>` — separate rule at `.doc__section > hr` sets margin-top to var(--space-15). Source order later than the h*+* reset, so the hr rule wins where a heading is directly followed by an hr. Not a real pattern in the demo (no heading directly over an hr) but the cascade is intact.
- `<p>` (t-body) — no own margin-top. Inherits the `h*+* = 0` reset. Heading's margin-bottom 40 is the visible gap. Verified on every h3 → paragraph transition across the three samples.
- `.t-caption t-muted` (the Example caption above cards) — no own margin-top. Receives the 0 reset. Heading's 40 below-gap carries. Sample-c verified.

The full measurement sweep across all sixteen doc__section headings in the demo returned every ratio ≥ 1.96 text-to-text (sixteen of sixteen). Subtitles sit at 100/51 = 1.96 — the box ratio is exactly 2:1 (96/48) and leading-slack drops text ratio marginally under 2.00; consistent with rule 13 breathing. Every h3 and h2 ratio clears 2.14 or better.

## `manifesto.md § Typography rhythm` addition

One new paragraph appended to the rule-12 practice section:

> Next-sibling margin collapse. Headings own their below-gap. The next sibling's top margin sits at zero so stacking from tables, cards, raw HTML, or lists cannot inflate the below-gap past the 2:1 ratio.

The paragraph sits directly after the rule-12 ratio floor line and before the heading-offset paragraph, so a reader walking the section encounters rule-12 → practice floor → next-sibling collapse → other contracts in the right order.

## Screenshots

- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-4-viewport.png` — 1440 × 900 top of page. "Markdown renderer smoke test" hero → intro → "Samples" part → "Core prose path" h3. The part-to-section break reads as clear lead.
- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-4-full.png` — 1440 × 4800 full doc column. Every h3 across the three samples sits tight to what it introduces. The sample-b "Table" heading sits snug to the header row; the sample-c "Card embedded in markdown" heading sits snug to the "Example" caption + card.
- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-4-1280.png` — 1280 × 900 narrower viewport. Rhythm holds at a smaller width; no regressions visible at the breakpoint.

## Console capture

Loaded the demo fresh via chrome headless with remote-debugging-port. One expected log line on load: `[smoke] kk:md-rendered fired; articles: 3`. One harmless network 404 on `favicon.ico` (no favicon ships with the demo — not a regression). No JavaScript exceptions, no CSS warnings, no md.js warnings. Three articles rendered, scroll-spy bound, kit.js modules initialised.

## Files touched

- `style.css` — seven edits to the `.doc__section` typography block and the `.doc__part + .doc__section` padding.
- `skills/kk-design-system/manifesto.md` — one paragraph added under § Typography rhythm.
- `CHANGELOG.md` — three entries appended to the 1.2.0 § Fixed block, naming the selector changes and the padding value chosen.
- `documentation/2026-04-24-markdown-source/phase-1e-jobs-round-3-rework.md` — this document.
- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-4-*.png` — three new captures.
