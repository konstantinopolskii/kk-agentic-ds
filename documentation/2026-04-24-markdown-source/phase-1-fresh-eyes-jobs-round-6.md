---
stage: phase-1-fresh-eyes-round-6
gate: PASS
character: Steve Jobs
bar: 0.2-second clarity
---

# Fresh-eyes round 6 — markdown renderer smoke

Cold re-read. No prior self-doc consulted. Five sections per contract.

## What I see first

Viewport lands on three columns. Left: narrow sidebar, "Renderer" title, three sample links, footer. Center: hero "Markdown renderer smoke test" in three bold lines, an intro paragraph below, then a part heading "Samples," then the first article's t-title "Core prose path" and its opening body line. Right: "Notes" display, two card-heading blocks.

Hierarchy at 0.2s: page title, intro, part label, article, body. Reads in one glance.

## What I can do

Click a TOC item in the sidebar to jump to one of three sample articles. Read the rendered markdown inside each article. Inspect the code snippets and the card passthrough. Nothing else is offered. Nothing else is needed.

## What this is for

A smoke test for the markdown renderer. Prose, dense blocks, raw HTML passthrough — three articles exercise the three paths. The shell is the kit's standard three-column doc surface so the output shows what kit docs look like when fed from `.md` files.

## Typography audit

Fourteen Lebedev rules + three kit contracts.

- **Rule 1 / 2 letter-spacing.** Capitals carry spacing where the kit sets it; lowercase flat. No violations visible in hero, display, title, subtitle, caption.
- **Rule 3 vertical stroke rhythm.** Commissioner holds.
- **Rules 4 / 5 capital rhythm.** Hero "Markdown renderer smoke test" — lowercase, N/A. "Samples," "Notes" — lowercase cap initial only.
- **Rule 6 line-height > word-spacing.** Hero 66/66, display 38/38, body 22/32. Clean.
- **Rule 7 ascender-descender.** No cramped rows.
- **Rule 8 longer lines, greater line-height.** Body at 22/32 across the center column (≈540px) reads. Right-column card captions sit at 16/24; shorter lines. OK.
- **Rule 9 line-height ≤ page margins.** Outer frame honored; page padding exceeds 32px body leading.
- **Rule 10 list item spacing > line-height.** Bulleted and numbered lists in sample-a carry visible inter-item air greater than their per-line leading.
- **Rule 11 page numbers near block.** N/A.
- **Rule 12 heading closer to follow-up than to previous.** Hero to intro: large but intro is next-block, not a new hero pair — fine. "Samples" part display: top gap (from intro paragraph) clearly greater than bottom gap (to "Core prose path"). Every `##` subtitle across the three samples sits with top ≥ 2× bottom. "Core prose path" t-title to its body: top gap from "Samples" parent reads as parent-child tight, bottom gap to body reads tighter. No mis-parse.
- **Rule 13 heading-to-paragraph ≥ heading's line-height.** Every heading pair holds.
- **Rule 14 inner ≤ outer.** Article body gaps sit inside section gaps sit inside page gaps. Card padding sits inside card-to-card stack. Label-list pairs ("Unordered list:", "Ordered list:") collapse to 8px as spec'd — label reads as caption of the list.
- **Kit contract 1 heading offset.** `data-md-heading-offset="2"` shifts source `#` to t-title, `##` to t-subtitle, `###` demotes to t-caption--bold. "Core prose path" sits at t-title. "Section heading" at t-subtitle. "Card-level heading" at caption-bold — visible weight drop from Medium t-subtitle to Bold 16px caption-bold. Canon.
- **Kit contract 2 quote.** Both quotes in sample-b render black, italic, body-sized, hairline left rule. Neither is muted. Neither is demoted to caption. Canon.
- **Kit contract 3 raw HTML caption.** Both cards in sample-c carry a "Example" t-caption t-muted line above the block. Canon.

## Verdict

PASS.

Zero defects. Zero minor issues. Every Lebedev rule holds at 0.2s. Every kit contract holds. Five prior passes flagged defects; every defect closed.

Ship.
