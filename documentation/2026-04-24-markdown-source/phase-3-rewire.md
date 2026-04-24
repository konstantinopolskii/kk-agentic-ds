---
session: 2026-04-24-markdown-source
stage: phase-3
role: design-engineer + ds-maintainer
input: phase-2b-migration.md + manifesto.md (685 lines) + index.html (767 lines)
output: index.html rewritten as thin shell (359 lines), markdown renders at runtime, scroll-spy covers rendered sections
gate: headless Chrome renders clean (no console errors, no warnings), pointer cards navigate, TOC anchors resolve to wrapped sections, KK stamp on commit
---

# Phase 3 rewire — index.html becomes a markdown-rendered shell

`index.html` absorbs the markdown-as-source architecture from the proposal (`proposals/2026-04-24-markdown-as-source.md`). Prose migrated to `manifesto.md` in phase 2b now renders at runtime. Shell keeps six pointer cards, signoff, inspector column, FABs.

## Line count — before and after

| File | Before | After | Delta |
|---|---|---|---|
| `index.html` | 767 | 359 | -408 (53% reduction) |

Target was "well under 400." Landed at 359.

## Architecture diff

### Stayed hand-written

- Sidebar shell, brand header, footer.
- Six pointer cards (Components, Patterns, Pipeline, Foundations, Practice, Distribution) — interactive navigation to the fundamental demo, patterns registry, pipeline.md, tokens.json, and the maintainer skill.
- Signoff block (stats + signature + byline).
- Inspector shell (empty comment stack; drafts spawn on text selection).
- FAB buttons for narrow-view nav + inspector + add-comment.

### Moved to markdown render

Every prose `<article class="doc__section">` that previously carried manifesto content now lives in `manifesto.md` and renders via `<div id="manifesto-mount" data-md-src="./skills/kk-design-system/manifesto.md" data-md-heading-offset="0"></div>`.

Sections rendered from markdown:
- Why this exists, Philosophy, Job stories, Time to value (meanings).
- Principles (one big section with sub-headings for pure signal, expected patterns, 80/20, chunking, radical contrast, iPad feel).
- Foundations (material, color, type, space, typography rhythm, radii, motion).
- Components (typography utility classes, card, field, button, tag, switch, comment, navigation, signoff, spec list, list, preview surfaces, registry surfaces, patterns, what's forbidden).
- Runtime (kit.js modules, comment lifecycle events, integration docs convention).
- Protocols (evolve, backlog, ideation).
- Pipeline.
- Documentation contract.
- Ship discipline.

Total: 12 top-level `##` sections rendered from manifesto.md. Each gets its own `.doc__section` wrapper at render time.

### Sidebar TOC

Hand-curated, seven nav groups. Inventory + Distribution groups point at pointer-card ids (`#inv-*`); Meanings + Principles + Matter + Protocols + Surfaces groups point at wrapped manifesto sections (`#philosophy`, `#components`, etc) or external pages.

## Offset decision

`data-md-heading-offset="0"`. Chosen reasoning:

- Option (a) — shell drops `<h1>`, markdown's `# Manifesto` becomes page h1. Offset 0.
- Option (b) — shell keeps `<h1>Manifesto</h1>`, offset 1 pushes markdown `#` to h2. Redundant.
- Option (c) — drop markdown's `# Manifesto` entirely, shell carries h1. Offset 1 then breaks nested ranks (manifesto's `##` becomes h3 — wrong).

Option (a) is cleanest. The markdown file owns its full heading stack. One h1 per page. The sidebar header (`sidebar__header t-title`) carries the page brand; the hero inside the doc column is "Manifesto" from the markdown source. Matches the smoke-test precedent at `demos/md-renderer-smoke/` where articles also use offset 0.

Canon check: the manifesto's Typography rhythm section covers this choice — "Multi-article pages with no shell h1... set offset 0 and let each article carry its own hero." Same rule applies to a single-article page where the shell has no competing h1.

## Scroll-spy re-registration approach

Kit.js scroll-spy observes `.doc__section` elements inside `#doc`. It initializes on `DOMContentLoaded` against the sections present at that moment. `KK.refresh()` re-runs every module and observes new sections.

Problem: manifesto.md renders into a single container. One container = one section. Scroll-spy would see one giant section covering the whole manifesto.

Solution: post-render wrapping. An inline script listens for `kk:md-rendered` (fired by md.js after render completes), then:

1. Walks the mount container's children.
2. Splits each `h2.t-display` + following siblings into its own `<article class="doc__section" id="<slug>">`.
3. Content before the first h2 (the `# Manifesto` hero + opener paragraph) forms a lead-in `.doc__section` with no id — scroll-spy ignores id-less sections gracefully.
4. Inserts the new sections in place of the mount, removes the mount.
5. Calls `KK.refresh()` so the scroll-spy observer picks up every new `.doc__section` and the TOC indicator starts tracking.

Slug function: lowercase, en/em dashes to hyphens, strip non-`[a-z0-9-]`, trim, spaces to hyphens. Matches the sidebar TOC anchor ids.

The comment-selection flow opts in on `DOMContentLoaded` (not inside `kk:md-rendered`) — the DOM event always fires but `KK.enableCommentSelectionFlow` installs one document-level listener; safe to call once at DOM ready regardless of render timing.

## CSS additions

None. The existing `.doc__section` rules (typography rhythm, border-top, padding) apply to every wrapped section because they target `.doc__section > h2` / `> h3` / `> h4` etc. as direct children, and my wrapping preserves the direct-child relationship (each h2 + following siblings become direct children of the new wrapper).

One contract already in the kit covers this: `style.css` § Main document's asymmetric heading margins, which fire on both `.t-display` and bare `h2` selectors per the round-2 Jobs fix. Every manifesto section wraps correctly without a stylesheet change.

## Verification

Served from `http://localhost:8765/` via `python3 -m http.server 8765`.

### Screenshots

- `screenshots/phase-3-rewire-viewport.png` — 1440 × 900 viewport at page load. Inventory part heading + first pointer card + sidebar TOC.
- `screenshots/phase-3-rewire-full.png` — 1440 × 30000 full page. Top to signoff: pointer cards, Manifesto hero, all twelve rendered sections, signoff.
- `screenshots/phase-3-rewire-1280.png` — 1280 × 900 narrow desktop. Three-column layout holds, nothing reflows.

### DOM check

Headless dump confirms 18 `.doc__section` articles in `#doc`: 6 hand-written pointer cards (`#inv-components` through `#inv-distribution`), 1 lead-in (no id, holds the hero + opener), 12 wrapped manifesto sections (`#why-this-exists` through `#ship-discipline`).

One `<h1 class="t-hero">Manifesto</h1>` element. No duplicate h1s.

### Console

Zero errors, zero warnings. Only Chrome process-level chatter (`TASK_CATEGORY_POLICY`, `external_pref_loader`) appears in the launch harness — not in the page.

### Interactive affordances

- Pointer card primary buttons point at live targets (`patterns.html`, `demos/fundamental--accepted/index.html`, `pipeline.md`, `manifesto.md`, `kk-ds-maintainer/SKILL.md`) — hrefs unchanged from the prior release, link resolution not at risk.
- Sidebar anchor links resolve to wrapped section ids. Click handler in kit.js scroll-spy intercepts, calls `doc.scrollTo`, pins indicator.
- Inspector selection-to-draft flow still opt-in via `KK.enableCommentSelectionFlow`.

## Open question for user

Two things worth your eyes before the v1.3.0 tag:

1. **Signoff stats content.** New stats read: "12 top-level sections across Meanings, Matter, Protocols" (counts the rendered manifesto h2s), "9 components", "9 color tokens", "4 radii: 12, 16, 24, and 9999 for pills." Swapped "2 radii" → "4 radii" to match the drift resolution from phase 2b. The section count reflects the manifesto.md body, not the pointer cards above it. Flag if you want either adjusted.

2. **Sidebar group labels.** I grouped the nav as Inventory → Distribution → Meanings → Principles → Matter → Protocols → Surfaces. "Matter" bundles Foundations + Components + Runtime because they are all "what the kit is made of" in a way that maps to manifesto.md's four-layer frame. If you prefer a flatter "Manifesto" single group that lists every section, or a different grouping, it's a one-block edit.

## Hand-off

Phase 4 maintainer: bumps `package.json` + `plugin.json` to `1.3.0`, tags `v1.3.0`, pushes main + tag. CHANGELOG entry for phase 3 added in the `1.3.0-unreleased — Phase 2b/3` block under §Moved (`index.html` reshelled).
