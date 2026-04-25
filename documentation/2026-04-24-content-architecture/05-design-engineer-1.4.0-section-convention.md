---
session: 2026-04-24-content-architecture
stage: 5 (1.4.0 section-convention rework)
role: design-engineer (Sara Soueidan)
input: KK directive — the intro paragraphs at the top of a doc are a section semantically; do not invent `.book__intro`; do not broaden CSS to forgive section-less prose; wrap h1 + intros in the first `<article class="book__section">`.
output: `.book__intro` class removed; paragraph-rhythm rule reverted to `.book__section > * + *`; hero margin-bottom inside section bumped to 60 px; rule-12 rescue extended to h1; three live HTML callers migrated; `js/md.js` auto-wraps h2-rooted regions in `<article class="book__section">`; canon/patterns.md gains Book structure pattern; canon/components.md drops the 1.3.3 Rhythm-scope addendum; CHANGELOG 1.4.0; package.json + plugin.json at 1.4.0.
gate: pending. Stage 7 rerun.
---

## CSS changes

Edited `style.css`.

- Removed `.book__intro` base rule (`max-width: 612px`).
- Removed `.book > .book__intro:first-of-type` rule (the 60 px hero-clear `padding-top` added in 1.3.3).
- Removed the `@media (max-width: 768px)` `.book__intro { padding-top: 0; }` reset.
- Reverted the 1.3.3 paragraph-rhythm broadening. Selector returns to `.book__section > * + *`. Comment block updated to name the new convention.
- `.book__section > h1, .book__section > .t-hero` margin-bottom stepped from `var(--space-6)` to `var(--space-15)`. Same 60 px the old `.book__intro padding-top` carried, now expressed inside the section. Comment explains the rule-13 line-height clearance.
- Rule-12 rescue block extended to include `h1` and `.t-hero`. Hero's bottom-margin becomes the sole determinant of hero-to-paragraph distance. No double-stacking with the next paragraph's `* + *` margin-top.

Net: five CSS edits, zero new tokens, zero new classes. Reuses `var(--space-15)` already in `vars.css`.

## HTML migrations

Three files. Every `<p class="book__intro t-body">` migrates to `<p class="t-body">` inside an `<article class="book__section">` wrapping the hero region.

- `demos/fundamental--accepted/index.html`. h1 + two intros wrapped in `<article class="book__section">`. The `<h2 class="book__part">` part-group label for "Prose" stays at `.book` level, between sections, untouched.
- `demos/fundamental--accepted/patterns/three-column-shell.html`. h1 + one intro wrapped in `<article class="book__section">`. Position: above the existing `#opening` section.
- `demos/fundamental--accepted/patterns/narrow.html`. h1 + one intro wrapped in `<article class="book__section">`. Position: above the existing `#full-width` section.

Grep confirms zero `book__intro` references remain in live `style.css`/`*.html` rules; the only mention is one explanatory CSS comment plus historic CHANGELOG/documentation entries.

## md.js auto-wrap

Added `wrapInSections(html)` helper next to `renderTable` and `renderList`. Splits the rendered HTML on the opening tag of every `<h2 ...>` (capturing group preserves the tag), wraps each h2-rooted region in `<article class="book__section">`. The first article carries pre-h2 content (h1, preamble, intro paragraphs). If the source has no h2, the whole output wraps as one section. Empty input returns empty.

Call site: `render()` returns `wrapInSections(unstash(out.join("\n")))`. Post-processes the unstashed output before returning.

Top-of-file comment updated. Mentions section auto-wrap, the first-article-spans-h1-and-preamble rule, and points at `canon/patterns.md § Book structure` for the convention.

## Canon updates

`canon/patterns.md`. New top-level pattern **Book structure**, placed first under the jobstory hook, before "Three columns (default shell)". Carries: intent paragraph, HTML snippet showing hero section + named section + signoff at `.book` level, and six rules (rule path, first-section flush, hero clearance, subsequent-section spacing, signoff at `.book` level, md.js auto-wrap behavior).

Registry-of-additional-patterns. Added a row at the top of the table: class `book__section`, role "Structural article wrapping every prose unit. First section holds the hero; each h2 starts a new section." No preview link (structural, not a sliced widget). Intro prose updated from "Twelve compositions" to "Twelve compositions sliced out of shipped prototypes plus one structural wrapper." Signoff stats stepped to "5 top-level patterns" and "13 registry compositions".

`canon/components.md § Foundations § Type § Rhythm § Kit addenda`. Dropped the fifth bullet ("Rhythm scope") added in 1.3.3. List restored to four bullets (Rule-12 ratio floor, Next-sibling margin collapse, Label-list tightening, Quote treatment). Header line updated from "Five rules" to "Four rules". No other `.book__intro` references existed in components.md.

## Version

`package.json` 1.3.3 → 1.4.0.
`.claude-plugin/plugin.json` 1.3.3 → 1.4.0.
`CHANGELOG.md` gains a 1.4.0 entry above 1.3.3 with Breaking / Added / Removed / Changed sections.

Semver axis: minor with a breaking class removal. The class only had three live callers, all in this repo, all migrated. No external consumers tracked. Per repo convention this is a 1.x.0 minor with breaking notes.

## Open issues

- Scroll-spy. The middle-column `.book` already wires through `id="doc"` and the `kit.js` scroll-spy code queries `.book` first. Verifying scroll-spy still tracks anchors after md.js wraps subsequent h2s in their own articles is not in scope for this stage. The anchor `id` lives on the article wrapper for hand-authored docs (e.g. `<article class="book__section" id="opening">`) but md.js does not stamp ids on rendered articles. If scroll-spy regresses on md-rendered surfaces, follow-up work threads `id` from the source heading onto the wrapper article.
- Other demo prototypes under `demos/`. Did not audit beyond the three live `.book__intro` callers KK named. Any forgotten consumer using `.book__intro` is now an unstyled `<p>` with the doc-level `.book__signoff` exception still intact. Unlikely but worth a sweep at next pass.
- Markdown source files using ad-hoc demo prose at `.book` level (no h2 anywhere) wrap as a single section. This works visually but the section's padding-top + border-top still apply. The `:first-of-type` rule strips them when the section is the only/first article, so the result is correct. Verified mentally; not regression-tested.
