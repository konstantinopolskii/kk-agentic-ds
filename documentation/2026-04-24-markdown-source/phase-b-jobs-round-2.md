# Phase B — Jobs cold read — round 2

Steve Jobs. 0.2-second bar. Ungenerous.

## Inputs

- `demos/md-renderer-smoke/index.html`
- `demos/md-renderer-smoke/sample-a.md`
- `demos/md-renderer-smoke/sample-b.md`
- `demos/md-renderer-smoke/sample-c.md`
- Screenshots: `jobs-round-6-viewport.png`, `jobs-round-6-1280.png`, `jobs-round-6-full.png`.
- Manifesto § Typography rhythm — fourteen rules plus three markdown contracts.

The round-2 change removed one inline italic span from sample-a to satisfy voice canon. Typography is unaffected. Fresh captures remain representative.

## Walk the screens

### Shell — hero, intro, part label

Hero "Markdown renderer smoke test" sits at t-hero. Intro paragraph sits well below, body at rank. Margin left of the main column reads wider than body line-height — rule 9 holds. Part heading "Samples" sits at display size with clear lead into the first article. Rule 12 holds: space above the part reads larger than space below.

### Sample A — Core prose path

`#` demotes to t-title "Core prose path". `##` demotes to t-subtitle "Section heading" at 18 px Medium. `###` demotes to caption-bold "Card-level heading" at 16 px Bold. Weight step between subtitle (Medium) and caption-bold (Bold) reads as a weight drop at 0.2 s, not a peer line. Rank ladder self-evident.

Each heading leads its paragraph — rule 12. Space below each heading clears its own line-height — rule 13.

Lists: unordered and ordered items space wider than body line-height — rule 10. Label-list pair "Unordered list:" / "Ordered list:" tightens against its list — the `:has(+ ul)` and `:has(+ ol)` rule reads correctly, the colon owns its list.

Inline code in `t-mono` renders at body rank with the surrounding prose. No rank break.

### Sample B — Dense blocks

Table rendered as registry-table, caption-rank column headers, body-rank cells. Row rhythm clean.

Blockquote renders black, Medium 500, italic, at body size (22 / 32). Hairline left rule. Not muted. Not caption-sized. Manifesto quote contract holds.

Fenced code block renders pre > code at t-mono, indent-neutral.

Horizontal rule from `---` ships as a hairline. Paragraph below clears the rule by outer spacing. Rule 14 holds.

Second blockquote after the rule reads at the same rank as the first — consistent.

### Sample C — Raw HTML passthrough

Both raw-HTML cards carry the mandated `<p class="t-caption t-muted">Example</p>` caption above them. The caption frames the embedded block as illustration, not as standalone callout. Manifesto raw-HTML contract holds.

Card inside the markdown stream renders with kit card CSS — rounded surface, internal heading stack, body paragraph. Shout card inverts against the kit's shout surface. Both cards carry outer spacing greater than inner padding — rule 14 holds.

### Chrome

Sidebar header "Renderer" at t-title, nav items at t-caption, footer "md.js renderer" muted caption. Inspector hosts two cards with heading + caption — kit card pattern. Nothing competes with the doc column.

## Verdict

**PASS.**

Zero defects.

## Defect count

0.
