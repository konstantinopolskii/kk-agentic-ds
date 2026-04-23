# Markdown as source, HTML as view

Date: 2026-04-24
Owner: KK
Status: draft, awaiting stamp
Stamp: not accepted

## Why

The kit has two homes for the same prose. `manifesto.md` is the agent-readable source. `index.html` is the human-readable web surface. Both grew in parallel and now carry overlapping copies of foundations philosophy, voice rules, and enumerations like "nine tokens" and "two radii."

Two concrete drifts caught this session:
- `manifesto.md` says "two radii plus one pill alias." `vars.css` defines four: `--radius-sm: 12px`, `--radius-md: 16px`, `--radius-lg: 24px`, `--radius-full: 9999px`. `.preview-frame` consumes `--radius-md`. Prose and implementation disagree.
- `index.html §ai-tells` mirrors `voice.md §No AI tells` verbatim. One is authoritative, the other is a copy. Any edit to voice.md without touching index.html creates drift; any edit to index.html without touching voice.md creates drift the other way.

The pattern: every count, every enumeration, every voice rule, every foundation claim that lives in two places will drift. Manual sync is a bug-generator.

## What we are building

One source per fact. Markdown as source. HTML as view.

- Authoring surface stays markdown (`manifesto.md`, `voice.md`, `pipeline.md`). Agents read directly.
- `index.html` becomes a **runtime renderer**. On page load, a tiny JS shim fetches the relevant markdown files, runs a minimal renderer, and injects the output into pre-shaped `<article>` containers. Kit CSS classes apply via a custom element-to-class map (`h1 → t-hero`, `h2 → t-display`, `p → t-body`, etc.).
- Prose lives in markdown only. HTML carries the shell, the six pointer cards, the inspector demo, and the renderer.
- Structured data stays JSON (`tokens.json`). Vars.css implements it; drift is a bug in vars.css.
- Live demos stay HTML (`demos/fundamental--accepted/`, `patterns.html`) — markdown can't represent live kit behaviour.

No build step. No framework dependency. Author writes markdown; browser renders HTML with kit styling.

## Ownership table after migration

| Content | Single home | Format |
|---|---|---|
| Philosophy + principles + foundations WHY | `manifesto.md` | markdown |
| Voice rules + ai-tells inventory | `voice.md` | markdown |
| Pipeline + role roster + protocols | `pipeline.md` | markdown |
| Evolve protocol + backlog + ideation | `manifesto.md` (or `protocols.md` if manifesto bloats) | markdown |
| Token values | `tokens.json` | JSON |
| Visual reference | `demos/fundamental--accepted/index.html` | HTML |
| Pattern registry | `patterns.html` | HTML |
| Kit canon page | `index.html` | HTML shell + markdown renderer |
| Component inventory + rules | absorbed into `manifesto.md`; `components.md` retires | markdown |

## Architecture

### Renderer shim (new)

`js/md.js` — new file. Responsibilities:
- Fetch one or more markdown files declared on the page via a `data-md-src` attribute on container elements.
- Run a small markdown-to-HTML converter (options below).
- Apply the kit CSS class map to every rendered element.
- Insert the result into the container.
- Trigger scroll-spy re-registration after insert (kit.js already has scroll-spy; it reads on load).

### Renderer library options

- **(i) Custom tiny renderer** (~150 lines). Kit is small; supports only the subset of markdown it actually uses (headings, paragraphs, lists, links, inline code, code fences, bold, italic, horizontal rule, tables, blockquote). No dependency, no footprint tax.
- **(ii) `marked.js`** (~12KB minified). Full CommonMark. Add as a single file under `js/vendor/` (one new vendor dep, documented in CHANGELOG). License-compatible (MIT).
- **(iii) `markdown-it`** (~40KB). More features than needed.

Lean towards **(i) custom** — the kit's ethos is "two CSS files and one JS file." Adding a vendor renderer breaks that. A 150-line custom renderer covering the markdown the kit actually uses stays in character.

### CSS class map

Implemented inside the renderer. One table:

```
h1 → t-hero
h2 → t-display (with a t-display--medium t-muted sibling if a subtitle pattern applies)
h3 → t-title
h4 → t-subtitle
p → t-body
p with one-line content in a card → t-caption
ul / ol → t-list
code (inline) → t-mono
pre > code → t-mono
a → (inherit — kit link style)
blockquote → .quote
hr → (structural; invisible by default)
table → .registry-table (already canonized)
th / td → .t-caption, .t-caption--bold respectively
```

Exceptions: markdown can embed raw HTML. For constructs the markdown grammar cannot express (cards, card-stacks, decks, inspector groups), authors drop raw HTML inline. The renderer passes raw HTML through.

### Shell changes

`index.html` structure after migration:

```html
<!-- three-column shell -->
<aside class="sidebar">...TOC sourced from markdown headings...</aside>
<main class="doc">
  <div class="doc__intro">...unchanged intro prose or migrated into manifesto.md...</div>

  <!-- Inventory group: six pointer cards stay as hand-written HTML -->
  <section class="doc__part" data-inventory>
    ...Components / Patterns / Pipeline / Foundations cards...
  </section>

  <!-- Protocols group: rendered from manifesto.md + voice.md + pipeline.md -->
  <section class="doc__part" data-md-src="./skills/kk-design-system/manifesto.md"></section>
  <section class="doc__part" data-md-src="./skills/kk-design-system/voice.md"></section>

  <!-- Sign-off / ideation stay hand-written HTML -->
  <section class="doc__part">...signoff, backlog card...</section>
</main>
<aside class="inspector">...live demo shell...</aside>
```

TOC sidebar is auto-generated from `<h2>` / `<h3>` headings after render. Scroll-spy picks up the new structure.

## Migration plan

Three phases. Phases 2 and 3 can overlap once the renderer is stable.

### Phase 1: Infrastructure

Owner: design engineer.

Deliverables:
- `js/md.js` — renderer + CSS class map + container discovery + post-render scroll-spy re-registration hook.
- Unit-of-manual-test: a small demo page at `demos/md-renderer-smoke/` with a sample `.md` input + expected HTML output, so the renderer can be eyeballed in isolation before touching `index.html`.
- Smoke-test matrix: headings h1-h4, paragraphs, lists, links (internal + external), inline code, code fences, bold, italic, tables, raw HTML pass-through, blockquote, horizontal rule.
- `index.html` is NOT touched in this phase.

Gate: smoke test renders correctly in a browser, devtools console clean (zero errors, zero warnings), screenshot + console capture in the self-doc. KK stamps.

### Phase 2: Consolidation

Owner: design-system manager (ds-manager role) with maintainer hands.

Deliverables:
- Line-by-line audit of current `index.html` prose. Every `<article>` block mapped to a destination:
  - Manifesto-philosophy content → `manifesto.md`.
  - Voice-related content (§ai-tells card, §tone if it comes back) → `voice.md`.
  - Protocol content (§evolve, §backlog, §ideation) → `manifesto.md` (or `protocols.md` if manifesto crosses 500 lines).
  - Drift found during the audit (Radii count, any other enumeration) resolved by updating the source of truth (`vars.css` or `tokens.json` or the manifesto prose — declare the truth, fix the mirror).
- `manifesto.md` absorbs and grows.
- `components.md` retires. Its rules migrate to `manifesto.md § Components`. Agent skill canon loads update to read from `manifesto.md` where they previously read `components.md`.
- A migration report at `documentation/2026-04-24-markdown-source/` documenting what moved where and what drifts got resolved.

Gate: KK reads the consolidated markdown files. Migration report links every drift resolution. Stamps when satisfied.

### Phase 3: Rewire index.html

Owner: design engineer + maintainer.

Deliverables:
- `index.html` rewritten as the thin shell described in §Architecture.
- Six pointer cards stay hand-written HTML (they're interactive + specific to the shell).
- Inspector and doc-intro shell stay.
- Markdown-sourced parts become `<section data-md-src>` containers.
- Scroll-spy validates the new TOC populates correctly.
- Line count drops below 400 (down from 767 post-slim). The cut is real: prose migrates out.
- Old Radii / ai-tells / foundations drifts confirmed absent.

Gate: visual parity check — KK compares the rendered page against the pre-migration `index.html` screenshots. Devtools console clean. Every click target tested. Every anchor resolves. Self-doc carries the screenshots + console capture. KK stamps.

### Phase 4: Ship

Owner: maintainer.

Kit bump: **1.3.0** — minor by blast-radius rule (additive infrastructure, `components.md` removal is visible to consumers but deprecation was already on the roadmap after the patterns-library initiative; CHANGELOG 1.2.0 §Open already names the patterns-library split as a retirement path).

Actually: `components.md` removal is breaking for any consumer still reading it. If a consumer skill has `components.md` in its canon load list, removing the file breaks that skill. Check every SKILL.md under `skills/`. If any role still loads components.md, either (a) migrate the role's canon load to manifesto.md sections, or (b) keep components.md as a thin re-export pointing at manifesto.md for one minor cycle.

If (a) is clean, kit bumps to **2.0.0** (major — component doc removed, trigger descriptions for skills that used it shift).

Decide at the start of Phase 4.

## Constraints

- **No build step.** Runtime rendering only. `npm run build` is not part of the author workflow.
- **No framework.** Vanilla JS, vanilla CSS.
- **Agent skills unbroken.** Every role's canon load list must still resolve. If a skill loads `components.md`, Phase 2 must either leave the file or migrate the skill's canon load.
- **Visual parity.** The rendered `index.html` looks identical to the current hand-written one at stage end. No regressions in sidebar, scroll-spy, card layouts, type scale.
- **Kit demos (fundamental, patterns.html) untouched.** They stay HTML. Live kit behaviour doesn't render from markdown.
- **Token values untouched.** `tokens.json` + `vars.css` stay the machine truth. Any drift found during Phase 2 resolves by updating the lying side.

## Verification discipline (every phase)

Reading the code is not enough. Every phase ends with a browser check. Shitty-work guard rail:

- **Screenshot the rendered page** before / after. Diff reads in one glance.
- **Open the devtools console. Zero errors, zero warnings.** Capture a screenshot of the console state. Paste into the phase's self-doc.
- **Click every interactive affordance on the page once.** Confirm no silent breakage (dead clicks, lost scroll-spy, broken nav anchors, iframe preview stuck).
- **For the renderer specifically**: a smoke test page with a sample markdown covering every supported construct. Side-by-side render-vs-source. Console clean.
- Any regression discovered post-ship routes back to the phase owner, not a hotfix patch.

This is a kit-wide rule going forward, not just this initiative. Every browser-affecting change ends with a verified console + screenshot evidence in the self-doc. Migrate the rule to `manifesto.md § Ship discipline` when the file grows to carry it.

## Resolved round 2 — user rulings

1. **Renderer library**: custom tiny renderer. No vendor drop. Kit ethos holds.
2. **Radii truth**: `vars.css` is truth (β-inverse). Manifesto prose updates to match the four radii (12 / 16 / 24 / 9999) + pill alias, or describes the count abstractly per §4 below. Implementation wins.
3. **Manifesto length**: 500 lines acceptable. Golden standard is coherence, not line count — split only when topics genuinely diverge. A manifesto at 500-700 lines staying focused beats an arbitrary split. If the file ever feels incoherent when skimmed, split by concern (philosophy / protocols / reference), not by size.
4. **Foundations counts**: abstract phrasing. "Bounded palette," "restricted type scale," "a small set of radii." No hardcoded numbers in prose. Counts live in `vars.css` and render in `fundamental`. Prose stays stable across implementation evolution. Fewer drift points.
5. **Raw-HTML cards-inside-markdown**: engineer judgement call in Phase 1. Likely starts as raw-HTML passthrough only (authors drop `<div class="card">...</div>` inline). Phase 1 engineer evaluates whether a lightweight injection shorthand (`:::card ... :::` fenced-div, or `{.card}` attribute syntax) earns its complexity by proving demand in Phase 2's migration. Security footnote: markdown source is author-controlled (lives in the repo, not user input), so XSS from passthrough is not a live threat — but the engineer should note the assumption in the self-doc so a future change doesn't silently make it a threat.

## Out of scope for this initiative

- Static site generator frameworks (Jekyll, Eleventy, MkDocs). Vanilla-only.
- Server-side rendering.
- HTML templating language.
- Theming / dark mode.
- i18n.
- Syntax highlighting for code fences.

## Resolved round 1

- Source format: markdown. JSON for machine values.
- View format: runtime-rendered HTML. No build step.
- Renderer preference: custom tiny renderer.
- Ownership principle: one home per fact.
- `components.md`: retires in Phase 2 or 4; canon loads migrate.
- ai-tells mirror: resolved by construction in Phase 2. `voice.md` is the truth; the manifesto page renders it.

## First execution: this session's scope

Proposal author is KK (with this orchestrator agent). Stamp on this doc after review. Spawn Phase 1 design engineer when stamped.

The agent roster for execution:
- Phase 1 — `kk-role-design-engineer` (Sara Soueidan). Craft-first, state-by-state. Renderer implementation + smoke test.
- Phase 2 — `kk-role-ds-manager` (Muriel Cooper) for the prose migration audit + `kk-ds-maintainer` (Rachel Andrew) for canon writes.
- Phase 3 — `kk-role-design-engineer` for the shell rewrite + `kk-ds-maintainer` for the bundle.
- Phase 4 — `kk-ds-maintainer`, ship protocol + version decision (1.3.0 vs 2.0.0).
