---
session: 2026-04-24-content-architecture
stage: 3a
role: fresh-eyes-jobstory (pre-designer mode)
input: documentation/2026-04-24-content-architecture/02-design-director.md §Pattern blocks §3. components + 01-analyst.md §Per-document jobstories §components.md
output: naive-user question list for the components book — 18 questions across five sections
gate: pending — feeds stage 3b designer
---

Pre-designer question list for the components book. Cold read. Jobs lens. Ungenerous.

## Jobstory under test

When drilling from a pattern into its parts, we find every foundation + component + forbidden thing in one doc that deep-links to live examples, so we use kit vocabulary and never invent.

## What I'd want to see first

1. A scannable table of every component at the top. Class, one-line role, link. That is the inventory promise.
2. A table of every foundation at the top. Color swatch + token, type scale + size, space + value. Scannable before prose.
3. Is "Forbidden" at the top as a warning, or at the bottom as a close? The placement changes how seriously I read it.

## What I'd try to do

4. Search for `button`. Does the inventory carry me straight to §Button, or do I land in prose first?
5. Copy the card HTML snippet. Does the snippet compile standalone, or does it need surrounding kit JS / CSS loaded?
6. Click the deep link for Card. Does it open `demos/fundamental--accepted/index.html#card`? Does the target anchor exist?
7. Hop from a component's rule ("one primary per card") back to the pattern that uses it ("card stack"). Does the book point backward, or only forward?

## What this is for

8. I arrived from a pattern that uses, say, `card--interactive`. I want the component's rules, variants, states, and an example — in one section. Is this book structured that way, or split across foundations + components + forbidden?
9. What comes before — patterns.md told me to drill here. What comes next — I copy the snippet, customize, ship? Or do I round-trip back to patterns.md?
10. Is this reference (lookup on demand) or pedagogy (read once)? Forbidden section sets the expectation.

## Unclarities

11. Foundations collapsed into components.md. Where does a reader who knows the word "foundations" land? §Foundations at the top, or buried? If buried, the reader who thought foundations was a separate file has to re-orient.
12. Typography rhythm migrated here. The concept name is "inner and outer theory" (Lebedev stripped). Does a reader meeting this name for the first time understand it, or does a quick definition precede?
13. The 14 rhythm rules under §Type — are they a checklist, numbered, or prose? How does a reader audit against them?
14. Comment component — one-line pointer to `docs/integration/comment.md`. A reader looking for the comment's own rules (two shapes, kebab menu, draft state) — does the components book carry them, or only the pointer?
15. Kit-doc primitives (preview-frame, registry-table) live here. A reader building product UI — do they skip this section, or do they need to know it exists?

## 0.2-second check

16. At 0.2s, is the book's structure obvious — foundations first, components second, forbidden last? The reader who lands mid-scroll needs to know where they are without reading section headers.
17. At 0.2s, can a reader count how many components exist? An inventory book that hides its count fails.
18. At 0.2s, is "Forbidden" readable as a firm rule set, or as suggestions? The word alone is strong, but the visual treatment needs to match.

## All questions

1. Scannable component table at the top — class, role, link?
2. Scannable foundation table at the top — color, type, space?
3. Forbidden — top as warning, or bottom as close?
4. Search for `button` lands in the inventory table, not prose?
5. Card HTML snippet standalone or needs surrounding JS/CSS?
6. Card deep link — opens the demo with correct anchor?
7. Component-to-pattern back-reference — book points backward?
8. Component section self-contained — rules + variants + states + example in one place?
9. Next step after reading — copy + customize, or round-trip to patterns?
10. Reference vs pedagogy — which kind of book is this?
11. §Foundations top-level or buried — reader re-orientation?
12. "Inner and outer theory" introduced — definition precedes first use?
13. 14 rhythm rules — checklist, numbered, or prose?
14. Comment's own rules here, or only integration pointer?
15. Kit-doc primitives — product-UI reader skips, or needs to know?
16. Structure obvious mid-scroll without section headers?
17. Component count visible at a glance?
18. "Forbidden" reads as firm rule set, not suggestion?

## Gate

Pending. Designer runs next.

## Hand-off

`kk-role-designer` for pattern block 3 — components. Input: this file + `documentation/2026-04-24-content-architecture/02-design-director.md § Pattern blocks § 3. components`.
