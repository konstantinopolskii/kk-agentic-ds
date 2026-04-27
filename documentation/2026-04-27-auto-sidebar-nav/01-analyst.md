---
session: 2026-04-27-auto-sidebar-nav
stage: 1
role: analyst
input: user brief (three turns this session, verbatim below) plus page audit of 4 consuming HTMLs
output: decomposed brief — three users, three job stories, five priority scenarios, eight open questions
gate: passed 2026-04-27, eight decisions locked
---

# Analyst — auto sidebar nav

The kit's sidebar TOC is hand-curated in four pages. Every section rename or reorder requires editing the markdown body plus the sidebar HTML. The manifesto's editorial four-group overlay (Meanings / Principles / Agents / Navigation) doesn't sit in the source markdown — it lives only in the consuming HTML. Drift is inevitable. This session ships a generator that reads the rendered `.book` DOM and writes the TOC at runtime, so the source becomes the single point of truth.

## Raw input

User messages verbatim across three turns this session:

> Let's implement automatic sections in the left side of the navigation. Currently it's manual. Which is causing trouble. We need to select the pipeline, inspect current prototypes in demo and then propose a craft for this one.

> 2. I would prefer this. Did you also thought about the situation with multiple markdowns on one page? There we start counting from the H1, not H2. So H2 becomes the navigation. And H1 is a bold label. Also bold labels should also work as a menu nav, be clickable, just lead to the needed direction. The structure should be smart and simple and search for the H1, H2, H3 in the doc. If there is one H1, then we start from H2 and H3. If multiple H1, then we show H1 and H2s

> Bold label was <h4 class="t-subtitle">; becomes <a class="t-subtitle"> so scroll-spy + click both resolve. Same visual.    ensure style from h4 will be kept. 1. I want to see how system works. So just do aligned with the mapping. No need for the manifesto restructure. Why we need it? 2. Why need restructure? 3. Idk.

> 1. Yes. 2. Yes.

In-conversation alignment, stamped: no canon edits, no manifesto restructure, no fundamental restructure. Apply the heading-rank rule against existing bodies and ship as-is. If the un-curated shape reads worse, open a follow-up canon-rework session.

## Users

Three users, one surface (the sidebar TOC).

1. **Kit maintainer** — Konstantin, or anyone editing the kit itself (canon files, kit.js, demos). Today, renaming a section in `manifesto.md` means also editing `index.html` to update the sidebar entry. Two edits per section rename, four edits across consuming pages. Needs the rename to propagate from one source.
2. **Kit consumer** — any prototype or product that installs `@kk/design-system` and ships its own page. Today, every consumer hand-curates their own `<section class="nav-group">` block; new prototypes copy from `index.html` and drift. Needs an empty `<nav class="sidebar__nav" id="toc">` shell that the kit fills.
3. **Document reader** — anyone using the manifesto, fundamental, comment-persistence, or md-renderer-smoke page. Today, the sidebar works. Must not regress: scroll-spy, click-to-jump, narrow-view sidebar visibility, `.toc__indicator` active state all behave identically after the swap.

## Job stories

- **Maintainer.** When we rename a section in markdown source or rearrange article order in static body, we want the sidebar TOC to update without a separate edit, so that one source of truth governs reading order.
- **Consumer.** When we build a new page against the kit, we want the sidebar to be a one-line shell the kit fills from rendered headings, so that the consumer never copies the manifesto's group structure and drifts.
- **Reader.** When we open a kit page, we want the sidebar to read the same as today across scroll-spy, click-to-jump, narrow-view affordances, and active state, so that nothing about navigation behaviour changes from a reader's perspective.

## Priority scenarios

1. **Happy path — manifesto loads under mixed mode.** Page renders `manifesto.md`. The lead article carries h1; eight content articles each carry h2; the Principles article carries six h3 children. Sidebar shows 9 bold labels (one per content h2); only "Principles" expands to 6 items. Click a label → scrolls to that article. Click an item → scrolls to the h3. Scroll-spy moves `.toc__indicator` along.
2. **Multi-h1 — md-renderer-smoke loads under multi-h1 mode.** Page hosts three articles, each with its own h1.t-hero (each markdown sample is offset 0). Sidebar shows 3 bold labels (Core prose path, Dense blocks, Raw HTML passthrough); h2s within each sample list as items underneath. Old "Samples" h4 is gone.
3. **Flat fallback — comment-persistence loads under flat mode.** Page has 1 h1 + 6 content h2s; the only h3s in the document live inside the inspector aside, which is outside `.book`. So no h3 in `.book` triggers flat mode. Sidebar shows a single ungrouped list of 6 items. Same shape as today's hand-curated single nav-group.
4. **Out of scope — fundamental's hand-curated 5 groups disappear.** Page has 1 h1 + many h2 (book__part organizational + book__section content). No h3 lands as a direct child of any book__section. Flat fallback gives 16 items, no groups. The current 5-group editorial overlay (Prose / Spec / Controls / Collections / Margin) is lost. Per human's stamp, this is acceptable and the readback at stage 7 decides whether to open a canon-rework follow-up.
5. **Out of scope for this pass.** Markdown frontmatter convention for declaring nav groups, `data-nav-group` attribute on articles, exclusion-by-class for the signoff section, group label in multi-h1 mode beyond the article h1. Each can return as a follow-up if the readback shows a need. Log and defer.

## Open questions

Eight holes in the brief. Each is a decision for the human.

1. **Section detection unit.** Should the generator walk all `<h1>`, `<h2>`, `<h3>` anywhere in `.book` (literal reading of human's "search for the H1, H2, H3 in the doc"), or scope to `.book > article.book__section` and treat each article as the section unit (matches existing `stampSectionIds` convention; excludes inspector h3s, card-internal h3s, and other decorative headings)? Default: scope to `book__section`. Cleaner, matches how md.js + the post-render hook already think.
2. **Lead-article exclusion in single-h1 mode.** The manifesto's lead article carries h1.t-hero "The Agentic Design System". Today's nav doesn't include the page title as a nav item. Should the generator skip the lead article in single-h1 mode? Default: skip. The lead article is the page intro, not a navigated section.
3. **Signoff inclusion.** Manifesto's `## Signoff` is the closing h2 holding the signature block. Today's hand-curated nav excludes it. Auto-nav under simple rule includes it. Options: (a) include per "just align with the mapping" stamp; (b) exclude via class convention (e.g., `book__section--signoff`). Default: (a) include. Honors the alignment stamp. Readback at stage 7 may flip to (b) as a small canon convention.
4. **h3 id stamping.** Today only `article.book__section` carries an id. For h3s to be click targets in mixed mode, h3s need ids too. Default: kit auto-stamps `<h3 id="...">` on every h3 direct child of a `book__section`, using the same `slugify` logic that already lives in the post-render hook. Stamp moves into kit.js, retired from index.html post-render hook.
5. **Multi-h1 mode trigger.** The human's rule: "≥2 h1". What counts as an h1 — every `<h1>` anywhere in `.book`, or articles whose primary heading is h1? Default: count `article.book__section` whose first heading child is `h1` (matches md.js wrapping convention). Avoids false positives if a card or inspector ever carries an h1.
6. **Bold label clickability — hash semantics.** Bold label becomes `<a class="t-subtitle" href="#section-id">`. Click → browser jumps to anchor → scroll-spy picks up. URL hash changes on click. Acceptable, or do we suppress the hash via `event.preventDefault` plus scrollIntoView? Default: native anchor behaviour. URL hash is useful for sharing a deep link.
7. **Existing nav-group HTML across the four pages.** Generator writes into the `<nav class="sidebar__nav">` shell. The four consuming pages must collapse their sidebar HTML to the empty shell or the generator's output appends below the hand-curated content (double TOC). Default: this session edits all four sidebar HTMLs to collapse to the empty shell. In scope.
8. **Idempotence + re-fire.** Generator must run twice cleanly: once on `DOMContentLoaded` for static-body pages, once on `kk:md-rendered` for markdown-body pages. The `kk:md-rendered` event already triggers the existing post-render hook in `index.html`. Default: kit.js exposes the generator inside `KK.refresh()` (already a public API entry from the kit-js-extraction session) and auto-fires on both events. The post-render hook in `index.html` reduces to a `KK.refresh()` call after `stampSectionIds` is moved into kit.js.

## Entry point

**Kit refactor** per `pipeline.md § Entry point matching` → enters at **stage 1 + stage 5 (DS-engineer mode) + stage 6b + stage 7**. Pattern design phase skipped. Stage 6a skipped per `Kit-internal review adaptation` (kit-internal artifact, no analyst jobstory for the cold read to gate against). Direction doc §Exceptions block populated by human stamps below at the gate.

A `kk-ds-maintainer` pass fires at end-of-session for the version bump, CHANGELOG entry, manifesto §Runtime mention if the new behaviour is named there.

## Gate

Passed 2026-04-27. Human stamped every open question. Decisions locked below.

## Locked decisions

1. **Section detection unit.** Scope to `.book > article.book__section`. Article is the unit. Excludes card-internal h3s and inspector h3s. Matches `stampSectionIds` convention.
2. **Lead-article exclusion.** Skip the lead article in single-h1 mode. The page-title h1 is the intro, not a navigated section.
3. **Signoff inclusion.** Include. The Signoff article appears in the nav alongside other content articles. If the readback at stage 7 names it as visual noise, follow-up session adds an opt-out class.
4. **h3 id stamping.** Kit auto-stamps `<h3 id="...">` on h3 elements that are direct children of a `book__section`, using the same `slugify` logic. Stamping logic moves from the `index.html` post-render hook into kit.js.
5. **Multi-h1 trigger.** Count `article.book__section` whose first heading child is `h1`. Triggered when ≥2 such articles exist. No false positives from card or inspector h1s.
6. **Click semantics.** Bold label is `<a class="t-subtitle" href="#section-id">`. Native anchor behaviour. URL hash changes on click; useful for shareable deep links.
7. **Autonav opt-out, not opt-in.** Generator runs in every consuming page by default. Opt-out signal: `data-nav="manual"` on `<nav class="sidebar__nav">`. When set, the kit skips that nav and leaves hand-curated content untouched. Otherwise, the kit replaces nav children (preserving `.toc__indicator`) with the generated TOC. This session collapses the four current consuming pages to the empty shell — none of them are opt-outs, all four ship the generated nav.
8. **Idempotence.** Generator lives inside `KK.refresh()`. Fires on `DOMContentLoaded` (static-body case) and on `kk:md-rendered` (markdown-body case). Both events are safe to fire twice — generator clears + re-renders. The `index.html` post-render hook collapses to a `KK.refresh()` call after `stampSectionIds` and slugify move into kit.js.

## Hand-off

→ Stage 5, `kk-role-design-engineer` in DS-engineer mode. Input: this file. Stages 2 + 3a/b/c + 4 skipped per kit-refactor entry point. Stage 6a skipped per kit-internal review adaptation. Stages 6b + 7 fire at stage 5 ship. `kk-ds-maintainer` pass at session close for version bump 1.9.0 → 1.10.0 + CHANGELOG entry.
