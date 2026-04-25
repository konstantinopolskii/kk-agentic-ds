---
session: 2026-04-24-content-architecture
stage: 6b (retrospective on v1.4.0)
role: consistency-ds (Dieter Rams)
input: v1.4.0 shipped artifacts + canon
output: per-block strict audit — class resolution, token compliance, off-grid, pattern-language drift
gate: feeds stage 7 (retrospective)
---

# 06b — consistency-ds, v1.4.0 retrospective

Dieter Rams, cold read. Ten Principles eye, 0.2-second self-evidence on pattern language. Built artefacts paired with `canon/components.md`, `canon/patterns.md`, `tokens.json`. Pre-existing kit drift surfaced in earlier 06b runs (legacy off-grid, legacy box-shadows) is out of scope. This audit names what v1.4.0 introduced or should have addressed.

## v1.4.0 changes — verification

1. **`.book__intro` class removed; hero region migrates to `<article class="book__section">`.** Implemented. `style.css` carries no `.book__intro` rules — only one explanatory comment at `style.css:470` referencing the old class for the rule-13 below-gap heritage. Permitted. Hand-authored callers `demos/fundamental--accepted/index.html:80-90`, `…/patterns/three-column-shell.html:35-41`, `…/patterns/narrow.html:27` all wrap the hero region (h1 + intros) in the first `.book__section`.

2. **`js/md.js` adds `wrapInSections()` post-process that auto-wraps each h2-rooted region in an article.** Partially correct. Function exists at `js/md.js:109-125` and is called at `js/md.js:272`. Defect: the call order is `wrapInSections(unstash(out.join("\n")))` — `wrapInSections` runs **after** unstash, not before. The brief named "runs before unstash" as the contract. Functional risk: a stashed raw-HTML block containing an `<h2>` would, after unstash, get split by the `/<h2\b[^>]*>/` regex inside `wrapInSections`, producing a malformed split mid-block. No live source markdown currently exercises this case, but the contract is broken at the line that ships. Flag.

3. **1.3.3's `:is(.book, .book__section) > * + *:not(.book__signoff)` broadening reverted to `.book__section > * + *`.** Implemented. `style.css:408` reads `.book__section > * + *`. No `:is(.book, .book__section)` selector exists anywhere in the file.

4. **`.book__section > h1, .t-hero` margin-bottom stepped from `var(--space-6)` (24 px) to `var(--space-15)` (60 px).** Implemented. `style.css:465-473`. Token used is `--space-15`, multiple of 4, on-grid.

5. **Rule-12 rescue extended to h1 and `.t-hero`.** Implemented. `style.css:455-463` — the next-sibling-zero rule covers `h1`, `.t-hero`, `h2`, `h3`, `h4`, `.t-display`, `.t-title`, `.t-subtitle`. Comment block at 443-454 documents the intent.

6. **`canon/patterns.md § Book structure`: new top-level pattern entry.** Implemented. `canon/patterns.md:5-37`. Carries the jobstory hook ("Reach for this structure on every doc surface…"), HTML snippet (lines 9-28), six rules (lines 30-37), and a registry-table row at line 162-165 naming `book__section` as a structural wrapper.

7. **`canon/components.md § Rhythm § Kit addenda` 1.3.3 "Rhythm scope" bullet dropped.** Implemented. `canon/components.md:97-103` lists exactly four addenda — Rule-12 ratio floor, Next-sibling margin collapse, Label-list tightening, Quote treatment. No fifth bullet. The header text reads "Four rules" (line 97).

Score: 6/7 fully implemented. 1/7 partially correct (`wrapInSections` runs after unstash, not before).

## Per-file audit

### `style.css`

**Class resolution.** All v1.4.0-touched selectors land on canon: `.book__section`, `.t-hero`, `.t-display`, `.t-title`, `.t-subtitle`, `.t-body`, `.t-caption`, `.t-list`, `.t-code`, `.book__signoff`, `.book__part`, `.registry-table`, `.quote`, `.card`, `.card--shout`, `.book__signoff-stats`, `.book__signoff-signature`, `.book__signoff-signature-img`. No new class introduced outside canon.

**Token compliance.** `--space-15` (60 px) on hero margin-bottom maps to `tokens.json space.scale.15`. The new `calc(var(--space-20) + var(--space-3))` at `style.css:432` and `:440` evaluates to 92 px and 84 px — both multiples of 4, both expressed in tokens, no raw px literal. The composed values are not single named tokens but the expression stays inside the token grammar. Acceptable per kit rule (compose tokens, never hand-pick px).

**Off-grid spacing.** None introduced by v1.4.0. All margins land on `--space-*` tokens.

**Pattern-language drift.** None introduced. No drop shadow, no glass, no blur, no gradient, no italic added by v1.4.0.

### `js/md.js`

**Class resolution.** Output classes: `t-hero`, `t-display`, `t-title`, `t-subtitle`, `t-body`, `t-list`, `quote`, `registry-table`, `t-caption--bold`, `t-caption`, `t-code`, `t-code--block`, `t-muted`, `book__section`. All resolve to canon.

**Token / off-grid / pattern drift.** No CSS values written by md.js. Pure HTML emission.

**Functional.** `wrapInSections` order defect — see change #2 above.

### `index.html` (repo-root hallway shell)

**Class resolution.** Every class on the surface lands on canon: `app`, `sidebar`, `sidebar__header`, `sidebar__nav`, `sidebar__footer`, `nav-group`, `nav-group__items`, `toc__indicator`, `t-title`, `t-subtitle`, `t-caption`, `book`, `inspector`, `inspector__group`, `card`, `card--heading`, `card--interactive`, `card__heading`, `t-display`, `button`, `fab`, `fab--nav`, `fab--inspector`, `fab__count`. No drift.

**Token / off-grid / pattern drift.** No inline style declarations introduced by v1.4.0.

**Functional defect — double-wrap on render.** The inline `wrapBookSections()` script at `index.html:178-210` runs on the `kk:md-rendered` event. md.js now emits `<article class="book__section">` wrappers as direct children of `.book` via `wrapInSections`. The shell script then walks `.book`'s direct children expecting raw `<h2 class="t-display">` nodes (line 186-188: `node.tagName === "H2" && node.classList.contains("t-display")`). After md.js, no top-level h2 exists at `.book` level — the h2s are nested one article deep. Walking the tree:

  - First child article → H2 test fails. `current` is null. `sections.length === 0` → push a new lead `<article class="book__section">`. Nest the existing `book__section` inside it.
  - Subsequent child articles → H2 test fails. `current` still null. `sections.length === 1` and `sections[0].id === ""` (no h2 was promoted to set it). Both branches of the `||` are falsy, so no new lead. Falls to `sections[0].appendChild(node)`. Each remaining article nests inside the same lead.
  - Result: `.book > article.book__section > article.book__section × N`. Double-wrap. No section gets a slug `id`, so the sidebar TOC anchors `#why-this-exists`, `#philosophy`, `#job-stories`, `#time-to-value`, `#principles`, `#agents`, `#pipeline`, `#navigation` (defined at `index.html:28-53`) all break. Scroll-spy still observes the inner sections via descendant selector `.book__section` (`js/kit.js:125`), but TOC click → no scroll target.

This is the v1.4.0 ship-gap. The new section convention made `wrapBookSections()` obsolete; the shell script was never updated to either (a) delete itself and let md.js own the wrap, plus a tiny pass that slugifies inner h2 ids, or (b) detect already-wrapped articles and skip. As shipped, the hallway book renders, the prose displays, but every TOC anchor in the sidebar lands at top-of-document. Flag.

### `skills/kk-design-system/manifesto.md`

**Class resolution.** Source markdown — no classes authored. md.js owns class injection. Heading-offset is `0` per `index.html:70 data-md-heading-offset="0"`, so `#` stays h1, `##` stays h2, etc. Source structure clean.

**Voice / pattern drift.** Out of scope for 6b (voice is 6c).

### `skills/kk-design-system/canon/components.md`

**Class resolution.** Documents canon — no surface classes to audit. Drop of the 1.3.3 Rhythm-scope addendum verified at lines 97-103.

**Pattern-language drift.** None introduced by v1.4.0.

### `skills/kk-design-system/canon/patterns.md`

**Class resolution.** New § Book structure entry uses `book`, `book__section`, `t-hero`, `t-body`, `t-display`, `book__signoff` — all canon. The HTML snippet at lines 9-28 mirrors the live shape in `style.css` rules.

**Voice quick-pass.** "Every prose unit in `.book` lives inside an `<article class="book__section">`" — terse, factual, no AI tells. Six rules read in the same register. 6c owns the deep voice audit.

### `demos/fundamental--accepted/index.html`

**Section convention.** Hero region wraps cleanly at lines 80-90. h1 + two intro paragraphs inside the first `<article class="book__section">`. Subsequent named sections (`#opening`, etc.) follow the same shape. No `.book__intro` survives.

**Class resolution / tokens / drift.** No v1.4.0-introduced drift. Pre-existing kit content unchanged.

### `demos/fundamental--accepted/patterns/three-column-shell.html`

**Section convention.** Hero region wraps cleanly at lines 35-41. Subsequent sections at `#opening` (line 42), `#reading` (line 53). No drift.

### `demos/fundamental--accepted/patterns/narrow.html`

**Section convention.** Hero region wraps at lines 27-32. Subsequent sections at `#full-width` (line 34), `#slide-over` (line 44). No drift.

### `demos/fundamental--accepted/patterns/card-stack-columns.html`

Pattern fragment. No `<main class="book">`, no h1, no hero region — out of scope for the section convention. The file is a deep-link slice for the pattern registry. No v1.4.0 change required here. No drift.

## Section convention — verification

- Hand-authored callers wrap hero regions in `.book__section`. Three live files migrated. Pass.
- `js/md.js wrapInSections` exists and produces the expected `<article class="book__section">` shape. Order-against-unstash defect noted in change #2. Output shape correct for current source markdown; latent risk for raw-HTML blocks containing h2.
- `<p class="book__intro">` survives only inside `CHANGELOG.md` (history) and pipeline `documentation/` (history). No live HTML or live CSS reference. Pass.
- `.book__intro` CSS rules are gone from `style.css`. One explanatory comment at line 470 only. Pass.

Defect: the hallway shell (`index.html:178-210`) double-wraps and drops slug ids. Section convention is enforced at the wrong layer for the hallway.

## New canon entry — verification

`canon/patterns.md § Book structure`:

- Jobstory hook at line 7 — present.
- Intent — present, framed as "Reach for this structure on every doc surface…".
- HTML snippet at lines 9-28 — well-formed, includes `.book__signoff` placement at line 24-26 to make the outside-section convention explicit.
- Rules at lines 30-37 — six bullets covering rule-path scope, first-section flush, hero clearance, subsequent-section borders, signoff placement, markdown auto-wrap responsibility.
- Registry-table row at lines 162-165 — present, marked as a structural wrapper without a preview slice (line 152 explanation).
- Voice — terse, factual, no AI tells visible.

Pass.

## Drift summary

- v1.4.0 changes verified: 6/7. One partially correct (md.js wrap-vs-unstash order).
- Class resolution: 0 flags.
- Token compliance: 0 flags.
- Off-grid: 0 flags.
- Pattern-language drift: 0 flags.
- Section convention: 1 flag (hallway shell double-wrap + missing slug ids).
- New canon entry: 0 flags.

In-scope flag count: 2.

1. `js/md.js:272` — `wrapInSections` runs after unstash. Contract was: before unstash. Functional risk for raw-HTML blocks containing h2.
2. `index.html:178-210` — `wrapBookSections()` shell script was not retired or updated to match the new "md.js owns the wrap" convention. Result: nested `book__section` articles inside `.book` and zero slug ids on the sections. Sidebar TOC anchors defined at `index.html:28-53` resolve to top-of-document instead of their target sections.

## Verdict

FAIL.

Two in-scope flags. The hallway TOC anchor breakage is user-visible. The md.js order defect is latent but contradicts the contract the change spec named.

Recommend v1.4.1 patch:

- Fix `js/md.js:272` to call `wrapInSections` before `unstash`: `unstash(wrapInSections(out.join("\n")))`.
- Update `index.html:178-210`. Either (a) delete `wrapBookSections()` entirely and add a tiny pass that walks `.book__section` direct children, finds the inner h2.t-display, and copies its slug to the article's id; or (b) make `wrapBookSections` idempotent — detect `.book > article.book__section` and only run the slug pass.

## Hand-off

Feeds stage 7 retrospective. The v1.4.0 ship was clean on class resolution, tokens, grid, and pattern language. The defect is a layering miss between the renderer and the hallway shell — a coordination bug that would have surfaced in 6b had it run at v1.4.0 ship time. The new convention is sound. The implementation needs one targeted patch to land it on the hallway and one one-line reorder in md.js.
