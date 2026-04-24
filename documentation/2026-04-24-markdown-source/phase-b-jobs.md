---
session: 2026-04-24-markdown-source
stage: phase-b-jobs
role: fresh-eyes-jobstory
input: demos/md-renderer-smoke/index.html + sample-a.md + sample-b.md + sample-c.md + screenshots/jobs-round-6-*.png
output: cold-read typography + clarity audit against the 14 rhythm rules + three kit contracts
gate: PASS
---

# Phase B Jobs — markdown-as-source cold read

Cold read. No prior self-doc. Fresh eyes on the three-sample smoke.

## What I see

Three-column shell. Sidebar left: "Renderer" title, "Samples" subtitle, three caption links, muted footer "md.js renderer". Main column: hero "Markdown renderer smoke test", intro paragraph with inline mono spans, "Samples" part heading, then three rendered articles stacked. Inspector right: "Notes" display + two cards.

Article one renders at t-title "Core prose path", with t-subtitle section heads, one caption-bold card-level head, paragraphs, unordered list, ordered list, mixed-content paragraph.

Article two renders at t-title "Dense blocks", with a registry-table, a blockquote rendered black italic body-size, a fenced code block at t-mono, a horizontal rule, a second blockquote.

Article three renders at t-title "Raw HTML passthrough", two embedded cards each preceded by a muted "Example" caption, one of them card--shout.

## What I can do

Read top to bottom. Scan the sidebar to jump anchors. Follow inline links. Copy from code spans. Nothing asks me to do anything else — this is a doc.

## What this is for

Proof that authors can ship docs by writing `.md` next to an `article[data-md-src]` and the kit renders them with correct rank, rhythm, and embedded-card grammar. A smoke test for the markdown renderer before it gets pointed at canon.

## What's great

Rank discipline holds under the +2 heading offset. Source `#` lands at t-title, `##` at t-subtitle, `###` steps to caption-bold — the weight drop reads as a real rank step, not a size accident. No second hero leaks inside an article. Hierarchy flows cleanly.

Blockquotes render black, Medium 500, italic, body-sized. Both quotes in sample-b carry the same weight as surrounding prose — neither buries itself as metadata.

Raw HTML cards each carry the muted "Example" caption line above. The embedded card reads as an illustration, not as a standalone callout competing with section headings.

Rule 12 holds on every heading I can measure: top margin reads clearly greater than bottom margin at t-subtitle, t-title, and caption-bold ranks. "Card-level heading" sits further from the paragraph above than from the paragraph below — the rank points down, as it should.

Rule 13 holds at hero rank — the intro paragraph sits at least a hero line-height below "Markdown renderer smoke test", never cramped.

Inspector card stack respects inner ≤ outer. Inside each card the t-title sits tight to its t-caption; between cards the gap is visibly larger.

Label-list pairs ("Unordered list:" → list, "Ordered list:" → list) sit tight. No stacked margin inflating the gap.

Horizontal rule in sample-b renders as a thin line and separates "Fenced code block" from "After the rule" at outer-spacing scale. Does not bury the rule, does not shout.

No muted-by-default drift. Intro paragraph, body paragraphs, headings all land black + Medium or Bold. Muted only on sidebar footer metadata and the explicit `t-caption t-muted` example captions — correct use.

No AI tells in the sample prose. No em-dashes in headlines. No filler.

## What could be better

Zero. Nothing to flag at the 0.2-second bar. Rank, rhythm, quote grammar, embedded-card caption frame, muted discipline, inner-outer ratio — all clean on fresh eyes. I do not have to work to parse this.

## Verdict

**PASS.**

Zero defects. Zero minor issues. Stamp.
