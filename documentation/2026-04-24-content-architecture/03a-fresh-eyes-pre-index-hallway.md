---
session: 2026-04-24-content-architecture
stage: 3a
role: fresh-eyes-jobstory (pre-designer mode)
input: documentation/2026-04-24-content-architecture/02-design-director.md §Pattern blocks §5. index-hallway + 01-analyst.md §Per-document jobstories §index.html
output: naive-user question list for the index-hallway shell — 20 questions across five sections
gate: pending — feeds stage 3b designer
---

Pre-designer question list for the index-hallway shell. Cold read. Jobs lens. Ungenerous.

## Jobstory under test

When a human opens the repo root, they want rendered manifesto first + pointer cards into canon + demos second, so the repo reads as hallway not dumping ground.

## What I'd want to see first

1. Three columns at 0.2s — sidebar left, manifesto middle, pointer-card inspector right. The kit's own shell looking back at the reader.
2. The manifesto's hero + first paragraph visible above the fold without scroll.
3. The inspector's pointer cards visible without scroll, at least the first three.
4. A clear entry signal — "this is the hallway of the system," not "this is a document."

## What I'd try to do

5. Click a pointer card to open patterns.md. Does the card's click target the whole card, or only a small hit area?
6. Click a sidebar TOC entry to jump to a manifesto section. Does scroll-spy update to match?
7. Resize the window down to 800px. Does the narrow pattern engage smoothly, or do the columns crash into each other?
8. Open on a phone. Are the pointer cards reachable via hamburger inspector, or lost behind a gesture I don't know?
9. Hover a pointer card. Does the card lift to 3%? Is the hover state visible at a glance?
10. Scroll the manifesto to the bottom. Does the scroll-spy indicator track the last section correctly?

## What this is for

11. This is the repo's front door. A first-time visitor, a returning maintainer, or an agent load target. Which audience does the shell optimize for?
12. Prior step for a human — got sent a link, cloned the repo, hit `open index.html`. Prior step for an agent — loaded at session start as canon. Shell handles both?
13. Next step — read the manifesto end-to-end, then pick a pointer card for deeper canon; OR skim the manifesto, click a pointer, leave.

## Unclarities

14. Pointer card contents — title + one-line description + target path? Or just title + link? Reader needs enough to decide which card to click without hovering each.
15. Pointer-card ordering. Pattern-first reading means patterns.md sits above components.md. Confirmed? Does the inspector's visual order carry this, or is it alphabetical?
16. Demos inspector cards (fundamental, md-renderer-smoke) — same visual weight as canon cards, or demoted? A reader who wants canon might confuse demos for canon.
17. When a pointer card is clicked, the page reloads to the target `.md` rendered surface. Does the manifesto middle swap, or does the whole shell re-render?
18. Sidebar nav carries scroll-spy TOC of the current doc. When the reader clicks a pointer and lands on patterns.md, does the sidebar refresh to show patterns.md's TOC? The pattern block says yes — does the shell re-render completely, or is it seamless?

## 0.2-second check

19. At 0.2s, is the visual hierarchy obvious — middle column dominates, sidebar + inspector subordinate? The 80/20 locked decision demands this.
20. At 0.2s, does the shell read as reading-surface (book) or as product-marketing page (landing)? The jobstory wants reading-surface.

## All questions

1. Three columns at 0.2s — sidebar, manifesto, inspector visible?
2. Manifesto hero + first paragraph above the fold?
3. At least three pointer cards visible without scroll?
4. "Hallway of the system" signal — clear framing?
5. Pointer-card click target — whole card, or small area?
6. Sidebar TOC click + scroll-spy update?
7. Resize to 800px — narrow pattern engages smoothly?
8. Phone view — pointer cards reachable via hamburger?
9. Hover pointer card — 3% lift visible?
10. Scroll to manifesto bottom — scroll-spy tracks last section?
11. Audience optimized for — first-time, returning, or agent?
12. Prior step — link, clone, agent load — shell handles both?
13. Next step — read + pick, or skim + leave?
14. Pointer-card contents — title, description, path, all three?
15. Pointer-card ordering — pattern-first visible, or alphabetical?
16. Demo cards — same weight as canon cards, or demoted?
17. Click on pointer — middle swap or whole shell re-render?
18. Sidebar TOC refresh on doc change — seamless or jarring?
19. 80/20 visual hierarchy obvious — middle dominates?
20. Reading-surface vs product-marketing framing?

## Gate

Pending. Designer runs next.

## Hand-off

`kk-role-designer` for pattern block 5 — index-hallway. Input: this file + `documentation/2026-04-24-content-architecture/02-design-director.md § Pattern blocks § 5. index-hallway`.
