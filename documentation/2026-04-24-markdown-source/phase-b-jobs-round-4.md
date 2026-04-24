# Phase B — fresh-eyes jobstory round 4 — markdown-source smoke

Character: Steve Jobs. 0.2-second clarity bar. Ungenerous.

Scope: cold re-audit after two refinements landed.

- `--lh-title` moved 28 → 32. Title leading now matches body.
- Every `<h3 class="t-subtitle">` in sidebar nav-groups rebound to `<h4 class="t-subtitle">`. Binding rule: h4 ⇒ t-subtitle.

Inputs read: `demos/md-renderer-smoke/index.html`, `sample-a.md`, `sample-b.md`, `sample-c.md`, three fresh screenshots, `manifesto.md § Typography rhythm`. Nothing else.

## What I see

Three columns. Left rail reads "Renderer" at title rank, then "Samples" one step smaller as a subtitle label, then three file links. Middle column carries a short intro paragraph with inline code, a thin rule, then the first article opening with "Core prose path" at hero rank, body prose below it, and a "Section heading" at display rank further down. Right rail reads "Notes" at display, then two card-shaped blocks each with a title and a caption.

Inline code tokens sit on the same line as prose. Nothing jogs. The intro paragraph wraps cleanly. At 1280 viewport the same three columns hold, links wrap a line, no overflow.

## What I can do

Click a sample link on the left, jump to that article. Scroll the middle column. Read the maintainer notes on the right. All self-evident.

## What this is for

A smoke test. Three markdown files rendered as three articles in one page with shared shell. The page announces this plainly in the intro paragraph.

## What is great

- Title leading change is invisible as a defect. Titles and bodies share the same 32-unit line-box so mixed-rank lines land on one rhythm. Right-rail title-plus-caption pairs read as one unit.
- H4 binding lands cleanly in the sidebar. "Samples" reads as subtitle rank without contest. Size and weight step against the "Renderer" header above it is unambiguous at the 0.2-second bar.
- Hero "Core prose path" owns a strong break from the intro paragraph. Rule 12 visibly satisfied — gap above exceeds gap below the hero.
- "Section heading" display rank leads its paragraph with a clear visible space that reads larger than the body line-height. Rule 13 holds.
- Left rail, middle column, right rail parse as three distinct jobs at first glance.

## What could be better

- Three screenshots all show the same viewport slice (top of the page). Below-fold content — sample B table, fenced code, blockquotes, sample C embedded cards and muted-caption frames, any markdown-rendered h4 — is not exercised in the provided captures. Scope of this audit is limited to what is visible. A scroll-captured full-page render would verify the rest.

Flagging this as a scope note, not a defect in the build. The two refinements the round targets (`--lh-title` 32, h4/t-subtitle binding in the sidebar) are both visible in the viewport crop and both pass.

## Verdict

**PASS.** Zero defects in the visible content.

Defect count: 0.
