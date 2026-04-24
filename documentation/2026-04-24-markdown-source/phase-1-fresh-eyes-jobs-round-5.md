---
session: 2026-04-24-markdown-source
stage: phase-1-fresh-eyes-round-5
role: fresh-eyes-jobstory
input: demos/md-renderer-smoke/ + screenshots jobs-round-5-{viewport,full,1280}.png
output: round 5 cold typography audit of the markdown renderer smoke demo
gate: FAIL
---

Cold round 5 typography audit of `demos/md-renderer-smoke/` against `manifesto.md § Typography rhythm` (14 Lebedev rules + kit additions) and `components.md § Prose list`.

## Raw input

Operator request: round 5 fresh-eyes cold read of the markdown smoke demo after four prior fix cycles. Read only the demo sources, the two canon sections, and the round-5 screenshots. Ungenerous. Pass is pass; any flag fails.

Sources audited:
- `demos/md-renderer-smoke/index.html`
- `demos/md-renderer-smoke/sample-a.md`
- `demos/md-renderer-smoke/sample-b.md`
- `demos/md-renderer-smoke/sample-c.md`
- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-5-viewport.png`
- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-5-full.png`
- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-5-1280.png`

## What I see

Three articles rendered from three markdown files inside one shell. Shell owns the hero ("Markdown renderer smoke test"), the intro paragraph, and a `<h2 class="doc__part">Samples</h2>` part label. Each article's `#` top-level heading shifts +1 to t-display per the kit's data-md-src contract. Inside each article I see h2 → t-title (Section heading, Lists, Mixed content paragraph, Table, Blockquote, Fenced code block, After the rule, Card embedded in markdown, Prose between raw HTML, Security note). h3 → t-subtitle (Card-level heading). h4 → caption-bold (Subtitle-level heading). Body paragraphs, unordered and ordered prose lists, one markdown table, two blockquotes, one fenced code block, one horizontal rule, two raw HTML cards each prefaced by a muted Example caption.

## Typography audit — defects

### Defect 1 — hierarchy collapse between shell h2 and article h1

The shell ships `<h2 class="doc__part">Samples</h2>`. That renders at t-display (38/38). Immediately below, the first article's `# Core prose path` shifts +1 and also renders at t-display. "Samples" is meant to be the container; "Core prose path" is the first child under it. At 0.2 seconds they read as peers. The same visual collision repeats three times: "Samples" next to "Core prose path", then "Dense blocks", then "Raw HTML passthrough" — all four display-rank, no step. Rule 14, inner ≤ outer, broken at the type scale: the container and its children sit at identical rank. A user lands on the page and cannot tell "Samples" is the group label and the three are its members. That is the canonical hierarchy-collapse failure the +1 shift was added to prevent; here the shift overshot because the shell already sits at display rank.

Fix territory: either drop the article shift to 0 so `# Core prose path` lands at t-title under the t-display "Samples" part, or promote "Samples" off display rank, or cut the shell's part label entirely. Not my call — the defect is the flat rank stack.

### Defect 2 — h3 and h4 render at visually identical rank

Sample-a places a `###` "Card-level heading" and a `####` "Subtitle-level heading" in sequence. Under the +1 shift, `###` lands at t-subtitle (16/24 Medium bold). `####` lands at `.t-caption--bold` (16px bold) per the demote rule. Two adjacent heading ranks, same pixel size, same weight. At 0.2 seconds the eye sees two identical bold labels. The step from section heading to card-level to subtitle-level should read as a visible stair; instead rungs 3 and 4 merge. Rule 12 (headings group with what follows) and rule 14 (inner ≤ outer) both assume each rank is distinguishable. This one is not. A user cannot tell which rank nests under which.

### Defect 3 — label-list pair gap reads as paragraph rhythm

Sample-a pattern: a paragraph ending in `:` ("Unordered list:", "Ordered list:") followed immediately by the list. Manifesto § Typography rhythm, rule 14 addendum: "Gap between label and list sits well below paragraph rhythm so the label reads as caption of the list, not as continuation of the prose above." In the render the gap between "Unordered list:" and the first bullet reads at the same vertical as a paragraph-to-paragraph break. Same for "Ordered list:". The label floats as its own paragraph instead of reading as a caption bolted to the list it introduces. Rule 14 violated: the gap between label and list (inner, should be small) is greater than or equal to the gap between the list and the surrounding prose (outer).

## What's fine

- Hero "Markdown renderer smoke test" at t-hero (66/66) reads one rank above the article titles. That step is visible.
- Body paragraphs render black, Medium 500, body size. No muted-by-default violations in prose.
- Both blockquotes render black, italic, body-sized, left hairline. Quote contract honoured.
- Raw HTML cards are each prefaced with a muted `Example` caption. Caption-frame contract honoured.
- Horizontal rule from `---` renders as a hairline between the fenced code block and "After the rule". No extra furniture, no unwanted separator elsewhere.
- Inline code spans render t-mono and keep baseline with the surrounding prose.
- Prose lists sit at body size (t-prose-list). No hairlines per item. Marker in the gutter. Prose-list contract honoured.
- Sidebar hierarchy (Renderer title → Samples subtitle → caption nav items) steps cleanly. Inspector cards (Notes → Renderer is dumb / Watch for errors) step cleanly.

## Verdict

**FAIL.** Three defects.

Priority:
1. Shell part label versus first article heading — both at t-display. Hierarchy collapse.
2. h3 and h4 render at the same pixel rank. No visible step.
3. Label-list pair gap sits at paragraph rhythm, not below.

## Gate

FAIL. Return to the maintainer responsible for the renderer's heading-shift contract and the prose-list label-pair spacing.

## Hand-off

Back to the markdown renderer maintainer. Fix all three. Re-screenshot. Re-audit round 6.
