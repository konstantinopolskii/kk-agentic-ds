---
session: 2026-04-23-fundamental
date: 2026-04-23
owner: kk-role-design-engineer (Sara Soueidan)
artifact: demos/fundamental/index.html
rubric: kit-internal adaptation per pipeline.md §Kit-internal review adaptation + proposals/2026-04-23-patterns-library.md §First execution: fundamental
---

# Session — fundamental

## Entry point

Kit-internal. Stages 1-4 skipped. Session enters at stage 5 (design engineer) and runs 6b + 6c + 7 on the adapted rubric. Stage 6a is skipped — no analyst jobstory exists for kit-internal artifacts.

## Scope

Every atom and every element in `index.html` composed in plain composition. No catalog ceremony, no "this is the disabled state" labels, no invented product surface. Spec is `proposals/2026-04-23-patterns-library.md` §First execution: `fundamental`.

## Adapted rubric for stage 7

Per `pipeline.md` §Kit-internal review adaptation:

1. Every atom present, every element present, no catalog ceremony retained. (Replaces the product-shaped 6a-vs-analyst item.)
2. Every direction-doc pattern has an implementation. (Inherited.)
3. (Dropped — no 6a.)
4. Zero off-inventory components. (Inherited.)
5. Zero AI-tells. (Inherited.)
6. User-agreed exceptions and new components carry paper trail. (Inherited.)

## Exceptions shipped

User rulings applied at the stage 5 rerun. Each overrides the reviewer flag noted.

- **`t-muted` on display subtitles — allowed.** Sixteen sites (`demos/fundamental/index.html:98, 115, 135, 169, 195, 247, 326, 404, 440, 490, 516, 533, 557, 589, 658, 702`). User ruling: muted is allowed beyond metadata. Overrides the 6b + 6c flags. Subtitles render as-is.

## Canon defects observed, routed elsewhere

Surfaced by the fundamental build, owned by canon. Maintainer session picks these up later. Proposals live in `05-design-engineer-rerun.md` §Canon proposals.

- `.aside`, `.quote`, `.figure` classes live in `style.css` but are missing from `components.md`. Inventory gap. See proposal P1.
- Six swatches in the Color section emit raw `rgba(0,0,0,0.X)` inline. Token candidates named in proposal P2.
- Signoff stats grid at `style.css:337-339` is `1fr 1fr 1fr` but `components.md` §Signoff shows two `.stat` children.
- Kit.js bugs: empty comment-new fails to dismiss on blur; `.comment__menu-popover` does not open on click.

## Stage artifact pointers

- 05 first build: `documentation/2026-04-23-fundamental/05-design-engineer.md`
- 06b consistency DS (Rams): `documentation/2026-04-23-fundamental/06b-consistency-ds.md`
- 06c voice (Orwell): `documentation/2026-04-23-fundamental/06c-voice.md`
- 07 meta (Hall, FAIL verdict): `documentation/2026-04-23-fundamental/07-meta-reviewer.md`
- 05 rerun: `documentation/2026-04-23-fundamental/05-design-engineer-rerun.md`
