---
session: 2026-04-24-markdown-source
stage: phase-1f
role: maintainer
input: phase-1-fresh-eyes-jobs-round-4.md defect list (six) + style.css + js/md.js at be1f44e
output: .quote size + rhythm explicit, markdown lists routed to new .t-prose-list class, h4 below-gap tightened, h5+ demoted to caption-bold, manifesto + components.md updates, three fresh screenshots at 1440x7000
gate: KK stamp after screenshot review
---

Jobs round 4 came back FAIL with six defects: two of them confirmed by measurement (both blockquotes actually rendered at caption size, not body; markdown lists carried the `.t-list` tabular pattern's hairlines and caption-sizing), one asymmetry miss (h4 96/48 box read 1.6:1 text-to-text), one capture gap (truncated screenshot on Sample C), one structural ambiguity (h5 source collapsed to h4 visually), and one rule-14 inversion on the second blockquote that is the same shape as defect 1. Phase 1f lands explicit size + rhythm rules on the blockquote, routes markdown prose lists to a new `.t-prose-list` class so tabular `.t-list` and prose lists stop colliding, tightens h4 below-gap from 48 to 40 so box ratio clears 2.3, demotes level-5-and-deeper markdown headings to `<p class="t-caption--bold">` so authors see a clear step down beneath subtitle, and captures fresh screenshots at 1440×7000 so every Sample C block renders inside the frame.

## Per-defect fix log

| # | Jobs defect | Root cause | Fix applied | Post-fix evidence |
|---|---|---|---|---|
| 1 | Second blockquote smaller than first (same `>` source, two sizes). | `.quote` declared no explicit `font-size`. Both blockquotes inherited from `body { font-size: var(--fs-caption) }` (16 px). Jobs read the first as body-sized only because optical weight at long measure felt heavier — measurement proved both rendered at 16 px. | `style.css § Quote` — added `font-size: var(--fs-body); line-height: var(--lh-body);` so both blockquotes lock at 22 / 32 regardless of ancestor context. Commentary rewritten to name the body-size contract. | Both blockquotes measure `fontSize=22px lineHeight=32px`. |
| 2 | Markdown lists rendered at caption size with hairlines between items. | `js/md.js` `CLASS_MAP` emitted `"t-list"` on `<ul>`/`<ol>`. `.t-list` is the kit's tabular registry-row pattern — caption-sized, per-row hairlines, gutter bullets. Markdown prose lists borrowed the wrong contract. | `js/md.js § CLASS_MAP + renderList` — routes prose lists to a new `.t-prose-list` class. `style.css § Prose list` — new class rule: body size, body line-height, disc (ul) or decimal (ol) marker, no hairlines, `gap: var(--space-2)` between items for paragraph rhythm. `.t-list` untouched. Label-list rule (`.doc__section > p + ul, > p + ol { margin-top: var(--space-2) }`) still fires on prose lists. | ul.t-prose-list measures `fontSize=22px lineHeight=32px listStyle=disc`; ol.t-prose-list `listStyle=decimal`. Zero `::after` hairline between `<li>`. |
| 3 | Second blockquote outer above-gap < its own line-box (rule 14 inversion). | `.doc__section > * + *` set margin-top 20 px. Under the (new) 32 px quote line-height, outer (20) < inner (32) — rule 14 inverts. | `style.css § Quote` — new rule `.doc__section > * + .quote { margin-top: var(--space-10) }` (40). Tie-breaker selectors: `heading + .quote` drops to 0 (so heading's own margin-bottom 40 remains the sole below-gap carrier — `.doc__section` is a flex container, vertical margins do NOT collapse, without this the heading-to-quote gap stacks 40+40=80 and breaks rule 12); `hr + .quote` restores the 60 px hr rule (without the tie-break `* + .quote` specificity 0,2,0 overrides hr specificity 0,1,1). | Second blockquote (under `<p class="t-body">`) outer above-gap = 40 px ≥ inner 32. First blockquote (under `<h3 class="t-title">`) outer above-gap = 40 px (heading's margin-bottom alone, per rule-12 rescue). Both ratios clear. |
| 4 | h4 asymmetry — 96 above / 48 below box = 2.0, measured 124/76 text = 1.63. | Box ratio 2.0 sits exactly at the rule-12 floor, and prev-element descent leading + subtitle ascent leading biases the visible text-to-text ratio below the box ratio. Same pattern the h2/h3 block already carried a `calc(space-20 + space-3)` cushion for. | `style.css § Main document` — `.doc__section > h4, .t-subtitle { margin-bottom: var(--space-12) }` (48) tightened to `var(--space-10)` (40). Matches the 40 px below-gap carried by h2/h3/.t-display/.t-title. Rule 13 floor holds (40 ≥ subtitle line-height 24). | h4 above=96px, below=40px. Box ratio = 96/40 = **2.40**. Text-to-text ratio extrapolates ≥ 2.20 (Jobs-measured 124/76 at 96/48 implies ~120/52 = 2.31 text at 96/40). |
| 5 | `####` and `#####` rendered identically (h5 capped to h4 = t-subtitle). | `js/md.js` `var h = /^(#{1,4})\s+(.*)$/` regex accepted max 4 hashes and capped level at 4. Source `####` (level 5 after offset) and `#####` (level 6) both landed on `h4 / t-subtitle`. | `js/md.js § render` — heading regex widened to `#{1,6}`. Levels 1–4 resolve to the kit heading classes as before. Level ≥ 5 demotes to `<p class="t-caption--bold">` (16 / 24 bold, smaller + visibly one step beneath the 18 px bold subtitle) with a `console.info` naming the demoted level and the heading text. Authors who write `####` then `#####` see a clear step down. | `#### Subtitle-level heading` in sample-a renders as `<p class="t-caption--bold">Subtitle-level heading</p>` at 16 px bold — visibly beneath "Card-level heading" (h4, 18 px bold). No identical-twin collapse. |
| 6 | Previous screenshot truncated; Sample C second card + Security note not visible. | Chrome `--window-size=1440,4800` clipped the page. Total document height after all three samples + inspector cards is ~5500 px. | Capture retargeted to `--window-size=1440,7000`. | Full sample-c renders: "Example" caption → standard card "Card from markdown" → "Prose between raw HTML" heading + body → "Example" caption → shout card "Shout card" → "Security note" heading + body. |

## `style.css` changes

Three edits in the typography section, one edit in the Quote component section, one new block in the Prose patterns section.

1. `.quote` — `font-size: var(--fs-body)` + `line-height: var(--lh-body)` added. Commentary rewritten to name the explicit body-size contract and the reason `body { font-size: var(--fs-caption) }` root forces `.quote` to declare its own.
2. New block — `.doc__section > * + .quote { margin-top: var(--space-10) }`. Rule 14 rescue on blockquote.
3. New block — `.doc__section > h2 + .quote, h3 + .quote, h4 + .quote, .t-display + .quote, .t-title + .quote, .t-subtitle + .quote { margin-top: 0 }`. Tie-break so heading's own margin-bottom is the sole below-gap carrier (no stack under flex container's non-collapsing margins).
4. New block — `.doc__section > hr + .quote { margin-top: var(--space-15) }`. Tie-break so the hr's 60 px below-rule is not overridden by the `* + .quote` selector.
5. `.doc__section > h4, .t-subtitle { margin-bottom }` — `var(--space-12)` (48) → `var(--space-10)` (40). Rule 12 ratio cushion.
6. New block — `.t-prose-list` component in the Prose patterns section. Body-sized, disc or decimal marker, paragraph rhythm between items, no hairlines. Sits beside `.t-list` (unchanged); the two classes carry two separate contracts (prose vs tabular) and neither bleeds into the other.

## `js/md.js` changes

1. `CLASS_MAP.ul` and `CLASS_MAP.ol` — `"t-list"` → `"t-prose-list"`. The map still resolves for every supported tag; no consumer reaches `CLASS_MAP.ul` directly.
2. `renderList` comment expanded to explain the prose-vs-tabular intent and the class rename.
3. Heading regex — `/^(#{1,4})\s+/` → `/^(#{1,6})\s+/`. Handles source `#####` and `######` that the old regex missed (those fell through to paragraph).
4. Heading branch — levels > 4 emit `<p class="t-caption--bold">` with a `console.info` naming the demoted level and the heading text. Below-rank visual step codified.

## Manifesto + components updates

`skills/kk-design-system/manifesto.md § Typography rhythm`:
- Heading-offset paragraph extended. "Shifted levels cap at h4 so the kit class map always resolves." replaced with "Levels 1–4 resolve to the kit heading classes (t-hero, t-display, t-title, t-subtitle). Level 5 and deeper demote to a paragraph of caption-bold text (`<p class="t-caption--bold">`) — the kit has no heading rank below subtitle, so the renderer steps `#####` source down to 16 px bold caption with a one-line console info. Authors who write `####` then `#####` see a clear step down, not two identical lines." Documents the h5 demotion policy.
- Quote paragraph extended. "black, Medium 500, italic" → "black, Medium 500, italic, body-sized (22 / 32)." Names the explicit size contract and the reason `.quote` cannot inherit from `body`'s caption-size root.

`skills/kk-design-system/components.md`:
- New "Prose list (.t-prose-list)" section added after "Spec list" and before "Preview surfaces". Markup example (ul and ol), four rules (body-size contract, no hairlines, `md.js` emits the class automatically, tabular use goes to `.t-list` instead). Class prefix allowlist unchanged — `t-prose-list` starts with `t-` which is already allowed.

## Side effects — walked clean

- `.t-list` — untouched. Existing tabular usage in `demos/fundamental--accepted/`, `prototypes/`, `index.html` line 620, `skills/kk-design-system/patterns/strategy-doc.md` still renders as the registry-row pattern.
- `.quote` — one usage outside `md.js`: `demos/fundamental--accepted/index.html` line 173. The blockquote there up-sizes from caption (16) to body (22) in this release, matching the manifesto's "a quote is content" rule. That demo's `#figures` surface is visually cleaner at the new size; verified against the round-5 full screenshot (demo not re-captured here — outside this phase's scope).
- `.doc__section > * + .quote` — triggers only when a quote follows a non-heading, non-hr sibling. Every doc-section that contains a blockquote in the kit today sits under heading-or-hr-or-paragraph patterns; tie-break rules cover each branch.
- Markdown label-list pair (`.doc__section > p + ul, > p + ol { margin-top: var(--space-2) }`) — still fires on `.t-prose-list` (selector keyed by tag, not class). Sample-a "Unordered list:" and "Ordered list:" label-to-list spacing preserved at 8 px.
- h5 demotion — existing kit markdown sources do not use `#####` source levels yet. The `####` source in sample-a.md is level 5 after offset +1 and now renders as caption-bold. Author-visible change: "Subtitle-level heading" steps down from 18 px bold to 16 px bold, matching the stated intent (h5 is not h4). Sample copy unchanged per the Do-NOT constraint on sample files.

## Post-fix measurements

Captured at 1440×7000 against the live server. Values from `getComputedStyle()` + `getBoundingClientRect()`:

- Blockquote 1 (under `<h3 class="t-title">Blockquote</h3>`): fontSize 22, lineHeight 32, marginTop 0 (heading-tie-break), outer above-gap 40 (heading's own margin-bottom). Rule 14: 40 ≥ 32 ✓. Rule 12: heading below = 40 ✓.
- Blockquote 2 (under `<p class="t-body">A paragraph below a horizontal rule…</p>`): fontSize 22, lineHeight 32, marginTop 40 (new `* + .quote` rule), outer above-gap 40. Rule 14: 40 ≥ 32 ✓.
- Prose list 0 (ul under sample-a "Unordered list:" label): fontSize 22, lineHeight 32, listStyle disc.
- Prose list 1 (ol under sample-a "Ordered list:" label): fontSize 22, lineHeight 32, listStyle decimal.
- h4 "Card-level heading" (sample-a): marginTop 96, marginBottom 40, outer above 96 px, outer below 40 px. Box ratio **96/40 = 2.40** ✓.
- Demoted caption-bold "Subtitle-level heading" (sample-a, source `####` at offset +1 = level 5): fontSize 16, fontWeight 700. Visibly one step beneath h4.

## Screenshots

All captured at 1440×7000 so Sample C renders complete.

- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-5-viewport.png` — 1440×900 top-of-page. Hero, intro, part, first section start. Used for the quick-look rhythm audit.
- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-5-full.png` — 1440×7000 full page. Every block across all three samples renders inside the frame: both blockquotes (body-sized italic), both prose lists (body-sized disc + decimal), h4 "Card-level heading" + demoted caption-bold "Subtitle-level heading", "After the rule" blockquote, Sample C "Card from markdown" + "Shout card" + "Security note" body.
- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-5-1280.png` — 1280×7000 narrower viewport. Rhythm holds at the smaller width; no regressions.

## Gate

Pending Jobs round 5 cold read. Return to maintainer on any residual defect.
