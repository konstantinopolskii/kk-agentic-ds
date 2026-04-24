---
session: 2026-04-24-markdown-source
stage: phase-1-fresh-eyes-round-4
role: fresh-eyes-jobstory
input: demos/md-renderer-smoke/index.html + sample-a.md + sample-b.md + sample-c.md + screenshots jobs-round-4-viewport.png, jobs-round-4-full.png, jobs-round-4-1280.png
output: Cold-read per-sample audit + typography rhythm audit + binary verdict
gate: FAIL
---

Round 4 cold read of the markdown renderer smoke. Three samples in the main column. Notes card in the inspector. Sidebar with three anchors. Audited against the fourteen Lebedev rules plus the kit additions (heading offset, quote colour, raw-HTML caption).

## Raw input

Task from the user: re-audit the demo cold. Three prior Jobs passes found defects; maintainer reworked each time. I did not read the prior Jobs docs or the reworks. I read the three markdown sources, the HTML shell, and the three screenshots only.

## Sample A — Core prose path

### What I see
A hero "Markdown renderer smoke test", then a body intro, then a part heading "Samples". Below that, an article that opens with "Core prose path" display heading, a body paragraph, then three smaller headings ("Section heading", "Card-level heading", "Subtitle-level heading"), each with a short body. Then a "Lists" heading, an "Unordered list:" label, a bulleted list, an "Ordered list:" label, a numbered list, a "Mixed content paragraph" heading, a body paragraph.

### What I can do
Read it. Click one of three sidebar anchors to jump between samples. Click the two inline prose links in the card-level section.

### What this is for
Showing that markdown block types render with kit classes intact — hero, display, title, subtitle, body, and list patterns.

### What's great
Hero + intro + part sequence reads clean. Display heading "Core prose path" leads its body without ambiguity. Body paragraphs render black Medium 500 as the no-muted rule demands.

### What could be better
- **List items render smaller than body text and carry hairline rules between rows.** The list reads as a data registry, not prose. A markdown `- item` should match body weight and size. Items with separator rules between them are an `.registry-list` pattern, not a prose list. Category error.
- **"Card-level heading" (h4 / t-subtitle) sits between its neighbours with a top-gap only marginally larger than its bottom-gap.** I measure roughly 124 px above, 76 px below — ratio ~1.6:1. Manifesto floor for clear lead is 2:1. 1.6:1 reads as roughly equal at the 0.2-second bar. Rule 12 defect.
- **"Subtitle-level heading" (h5 capped at h4) is visually indistinguishable from "Card-level heading" (h4).** The cap is documented, but an author writing `####` then `#####` sees two identical lines. Renderer should either refuse the fifth level or visually differentiate it.

## Sample B — Dense blocks

### What I see
A display heading "Dense blocks", a body intro, a "Table" subtitle, a four-row table with Class / Role / Size columns. A "Blockquote" subtitle, a quote in italic. A "Fenced code block" subtitle, three lines of JS in monospace. A horizontal rule. An "After the rule" subtitle, a body paragraph, a smaller second blockquote.

### What I can do
Read it. The table rows do nothing. The code block does nothing.

### What this is for
Proving tables render with `.registry-table`, blockquotes render italic, code fences render in mono, the `---` rule lands.

### What's great
Table hierarchy is crisp. First blockquote is body-sized, italic, black — matches the kit contract. Fenced code block sits in monospace with air around it.

### What could be better
- **The second blockquote ("A second blockquote…") renders visibly smaller than the first.** The first is body-sized italic. The second is caption-sized italic. Same markdown `>` source, two different outputs. The manifesto says quotes render black Medium 500 italic. It does not say caption-sized. Defect.
- **The second blockquote sits with almost no air above it** — reads as continuation of the "A paragraph below a horizontal rule" paragraph rather than its own block. Rule 14 inner-outer inversion: the outer gap (between blocks) is smaller than the inner gap (inside the blockquote's own line-box).
- **Horizontal rule above "After the rule" is fine, but the rule below the fenced code block also renders as a hairline of the same weight** — two rules in quick succession confuse the section boundary. Reader cannot tell whether "After the rule" is a subsection of "Dense blocks" or a new sibling.

## Sample C — Raw HTML passthrough

### What I see
A display heading "Raw HTML passthrough", a body intro, a "Card embedded in markdown" subtitle, an "Example" caption, a card with heading and body. Then "Prose between raw HTML" subtitle — and the screenshot cuts off.

### What I can do
Read it. The card is static, no action.

### What this is for
Proving that raw HTML dropped into a `.md` file passes through with the kit's card CSS still resolving.

### What's great
The "Example" caption above the card matches the kit contract — raw HTML blocks get a muted caption so they do not compete with section headings. First card embedding works — hero-free, t-title on the card heading, body copy inside.

### What could be better
- **Screenshot does not include the second card (shout variant), the "Prose between raw HTML" body, or the "Security note" section.** I cannot audit what is not visible. The maintainer's deliverable is incomplete.
- **"Card from markdown" card heading sits on a `t-title` line; its caption "Authored as raw HTML inside a .md file." is muted.** Inside a card this follows the card pattern and is fine. Noted because the same string outside a card would break the no-muted-by-default rule.

## Typography rhythm audit

Fourteen Lebedev rules plus kit additions. Checked every heading, paragraph, list, separator, embedded card.

- **Rule 1 — capitals require letter-spacing.** No all-caps visible. N/A.
- **Rule 2 — lowercase no letter-spacing.** Pass.
- **Rule 3 — vertical strokes align at equal intervals.** Body line-height reads even. Pass.
- **Rule 4 — cap letter-spacing below line-height.** N/A.
- **Rule 5 — line-spacing between cap lines ≥ cap height.** N/A.
- **Rule 6 — line-height exceeds word-spacing.** Pass.
- **Rule 7 — descenders nearly touch ascenders at minimum line-height.** Body paragraphs look clean. Pass.
- **Rule 8 — longer lines require greater line-height.** Intro paragraph at 1440 sits four lines wide with ample leading. Pass.
- **Rule 9 — line-height ≤ outer page margins.** Left margin of the article column vs body line-height (32 px): column is comfortably wider. Pass.
- **Rule 10 — list item spacing exceeds line-height.** Lists do space items generously, but the items sit smaller than body text and carry hairline rules. Technically passes this rule since item-to-item gap is clear, but the category issue in Sample A note above overrides.
- **Rule 11 — page numbers closer to text than to edge.** N/A.
- **Rule 12 — headings closer to following paragraph than preceding.** Card-level (h4) rhythm measures ~1.6:1 above:below. Manifesto 2:1 floor. Fail on subtitle-level headings.
- **Rule 13 — heading-to-paragraph spacing ≥ heading's own line-height.** Display and title headings pass. Subtitle headings: subtitle line-height is roughly 24 px; below-gap ~76 px. Pass on rule 13 — the failure is the above-gap (rule 12), not the below.
- **Rule 14 — inner ≤ outer.** Second blockquote in Sample B violates this: outer gap (to previous paragraph) smaller than inner gap (between the quote's own lines). The first blockquote passes. Label-list pairs ("Unordered list:" → list, "Ordered list:" → list) read tight enough.
- **Kit addition — heading offset.** Each article's `#` renders at display size, not hero. Pass. Only one t-hero on the page.
- **Kit addition — quotes black Medium 500 italic.** First quote passes. Second quote reads smaller than body — size is not specified in the rule but the inconsistency with quote one is the defect.
- **Kit addition — raw-HTML caption.** Both cards in Sample C carry the "Example" caption line. Pass on the first. Cannot verify the second — not in the screenshot.

## Defects — prioritized

1. **Second blockquote smaller than first.** Same markdown, two sizes. Sample B "A second blockquote…" line. Must render body-sized italic like its sibling above.
2. **Markdown lists render smaller than body text and with registry-row hairlines.** Category error — prose list styled as a data table. Sample A Unordered + Ordered lists. Must render at body size with standard list rhythm, no separator rules between items.
3. **Rule 14 inversion — second blockquote outer gap < own line-box.** Same line as defect 1. Needs a margin-top that matches the other blockquote's above-spacing.
4. **Rule 12 marginal — card-level and subtitle-level headings (~1.6:1 above:below).** Falls between the 1.5:1 "roughly equal" read and the 2:1 "clear lead" read. Manifesto says 2:1 in dense text columns.
5. **h5 collapses to h4 identically** — the cap is documented but makes `####` and `#####` render as the same line. At least a micro-weight or leading difference would save the author from guessing.
6. **Screenshot truncated — Sample C second card + security-note section not visible.** Cannot audit what is not shown. Maintainer must deliver the full capture.

## Verdict

FAIL. Six defects. Three are hard violations (blockquote size, list size + hairlines, rule 14 inversion). Two are rhythm marginals. One is a capture gap.

## Gate

FAIL — return to maintainer. Priority: defects 1, 2, 3 before anything else. Defect 6 blocks verification of Sample C's second card.

## Hand-off

Maintainer rework. After fixes, re-screenshot the full sample-c including the second card and the security-note body, then re-dispatch fresh-eyes round 5 for a final cold read.
