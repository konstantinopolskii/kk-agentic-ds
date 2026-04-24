---
session: 2026-04-24-content-architecture
stage: 2
role: design-director
input: documentation/2026-04-24-content-architecture/01-analyst.md
output: direction locked — manifesto-first reader with three-column kit shell at root; `.book` wrapper; six pattern blocks with per-block intent + guardrails
gate: round two stamped — hand to stage 3a (fresh-eyes pre-designer) N=6 parallel
---

Stage 2 opens the solution space with six directions, commits to one. Direction: the kit folds its own three-column pattern back onto itself for the repo root — nav TOC left, rendered manifesto middle, pointer-card inspector right. Wrapper renames `.doc` → `.book`.

## Aligned direction

**Manifesto-first reader, three-column kit shell.** Open the kit at `index.html`, read the manifesto like a book. Nav left carries the scroll-spy TOC of the currently-open doc. Middle column renders the manifesto with full kit typography. Inspector right holds one pointer card per canon file and per demo — the only way to navigate between books.

Primary signal: middle column — the rendered manifesto.

Guardrails:
- No inline editing at repo root. Read-only surface.
- Pointer cards in the inspector are the only cross-doc navigation. Sidebar is doc-internal only.
- Rendered manifesto wraps in `.book`. Inspector cards and sidebar nav do not — they are widget surfaces.
- Narrow-mobile collapses to the kit's existing narrow pattern. No new narrow shell.

Expected kit surface:
- `app` three-columns pattern (`data-view="doc"`)
- `sidebar` + `sidebar__nav` + `nav-group` + `toc__indicator`
- `.book` wrapper on the middle column (renamed from `.doc`)
- `card` + `card--interactive` in the inspector (pointer cards)
- `t-hero`, `t-display`, `t-title`, `t-body`, `t-caption`, `t-micro` utility classes on rendered prose
- `doc__signoff` at the bottom of the manifesto

No new components. No new tokens. No new patterns. Pure kit inventory.

## File architecture

```
ui-kit prototype/
  index.html                        three-column shell at root; renders manifesto inline
  style.css                         audited + scoped per Tier 1/Tier 2 rule below
  vars.css
  js/
    kit.js
    md.js
  fonts/
  skills/
    kk-design-system/
      SKILL.md
      manifesto.md                  thin starter, ~200 lines
      tokens.json
      canon/
        components.md               foundations + components + forbidden
        patterns.md                 UI patterns (absorbs root patterns.html)
        voice.md                    unchanged
      pipeline/
        pipeline.md                 absorbs doc-format.md § Documentation contract
        protocols.md                NEW — ship + bundle + semver + evolve + backlog + ideation
    kk-role-analyst/
    kk-role-design-director/
    kk-role-designer/
    ... (other role skills — untouched this session)
  demos/
    fundamental--accepted/
      index.html                    live component inventory; deep-link targets
      patterns/
        *.html                      sliced pattern previews; deep-link targets for patterns.md
    md-renderer-smoke/
  docs/
    integration/
      comment.md                    unchanged — comment consumer API reference
  documentation/
  proposals/
  CHANGELOG.md
  package.json
  .claude-plugin/
    plugin.json
```

Removed from previous tree:

- `skills/kk-design-system/components.md` at old top level — absorbed into `canon/components.md`.
- `skills/kk-design-system/doc-format.md` — folded into `pipeline/pipeline.md § Documentation contract`.
- `skills/kk-design-system/patterns/strategy-doc.md` — moved out of kit canon; interim location deferred, final home is inside the future strategy prototype under `demos/`.
- `patterns.html` at repo root — absorbed into `canon/patterns.md`.

## Per-canon-file content structure

### `manifesto.md` — the primer

```
# The KK Agentic Design System
    One-paragraph hero — what this is, who it's for.

## Why this exists
    Four layers: meanings, perception, matter, pipeline.
    Signal / noise / magic.

## Philosophy
    A product is a document. The document is the UI.

## Principles
    Pure signal · Expected patterns · 80/20 · Chunking · Radical contrast · iPad feel.
    One short paragraph per principle.

## Job stories
    Context + motivation = step → value.
    One priority per screen.

## Time to value
    Path length measured in time to insight, not clicks.

## Agents
    Brief intro to the pipeline's role skills — who does what, why.
    Pointer to `pipeline/pipeline.md § Role roster` for detail.

## Pipeline
    One-paragraph summary of the eight stages + three phases.
    Pointer to `pipeline/pipeline.md` for full.

## Navigation
    Pattern-first reading order.
    - canon/patterns.md — start here for layout composition
    - canon/components.md — drill from a pattern into its parts
    - canon/voice.md — words the system speaks
    - pipeline/pipeline.md — how sessions run
    - pipeline/protocols.md — ship, bundle, semver, evolve, backlog, ideation
    - tokens.json — machine-readable source of truth

## Signoff
    Author + timestamp + handwritten signature.
```

Target: ~200 lines from 685.

### `canon/patterns.md` — the sampler

```
# Patterns
    Jobstory: when composing any layout, start here.
    Drill into components.md when a pattern uses a part we need to customize.

## Three columns (default shell)
    Sidebar + doc + inspector. Only middle scrolls during reading.
    [HTML snippet]
    Preview: demos/fundamental--accepted/patterns/three-columns.html

## Card stack
    Stack interactive cards vertically. One active at a time.
    [HTML snippet]
    Preview: demos/fundamental--accepted/patterns/card-stack.html

## Narrow mobile
    Below ~800px. Doc single column, sidebar hamburger, inspector slides over.
    [HTML snippet]
    Preview: demos/fundamental--accepted/patterns/narrow.html

## Registry of additional patterns
    Embedded <table class="registry-table"> listing every pattern shipped to
    demos/fundamental--accepted/patterns/, with per-row link + one-line role.
    Absorbs the 11 patterns from the deleted root patterns.html.
```

### `canon/components.md` — the field guide

```
# Components
    Jobstory: when drilling from a pattern into its parts, find every foundation,
    component, and forbidden thing in one doc with deep links into live examples.

## Foundations
    Material — no gradients, shadows, glass, blur.
    Color — nine tokens; black body + metadata muted only.
    Type — Commissioner, three weights, seven sizes. Inner and outer theory for rhythm.
    Space — 4-multiples; off-grid fails the linter.
    Radii — four values: 12 / 16 / 24 / 9999.
    Motion — 200ms ease-out default; four easing roles; reduced-motion drops to 0.01ms.

## Typography utility classes
    Full table — t-hero through t-micro + t-mono + t-muted + t-subtle.
    Deep link: demos/fundamental--accepted/index.html#typography

## Card
    Three variants, one HTML shape — static / interactive / shout.
    [HTML snippet]
    Rules: interactive needs hidden content; one active per stack; one shout per column.
    Deep link: demos/fundamental--accepted/index.html#card

## Field, Button, Tag, Switch, Comment, Navigation, Signoff, Spec list, List
    One section each. Pointer prose + HTML snippet + rules + deep link.

## Kit-doc primitives
    Preview surfaces + Registry surfaces — only for kit docs, not product prose.
    One section each. Pointer prose + HTML snippet + rules + deep link.

## Forbidden
    Classes outside the kit namespace.
    Inline styles for tokens.
    New color / spacing / radius values outside tokens.json.
    Drop shadows, glass, blur, gradients.
    Utility-class frameworks.
```

Typography rhythm migrates here under §Foundations § Type. Lebedev attribution strips. Default concept name: "inner and outer theory."

### `canon/voice.md` — the style guide

Unchanged from today. Already thin and single-purpose.

### `pipeline/pipeline.md` — the playbook

```
# The pipeline
    [existing content — eight stages, three phases, eleven role skills]

## Documentation contract
    [absorbed from doc-format.md in full]
    Two artifacts per stage · session slug · frontmatter spec · body structure ·
    conversation return shape · README template · pointers not copies ·
    raw input verbatim · archive not delete.
```

### `pipeline/protocols.md` — the manual (NEW)

```
# Protocols
    Maintainer-facing rules for kit evolution and ship.

## Ship discipline
    [migrated from manifesto]
    Screenshot before/after · console clean · click every affordance ·
    renderer smoke test · regressions route to phase owner, not hotfix.

## Bundle rule
    [migrated from manifesto]
    Every kit change moves a fixed set of files together.

## Semver
    [migrated from manifesto]
    Version bump without pushed tag = vapourware. Four steps — commit / tag / push main / push tag.

## Evolve protocol
    [migrated from manifesto]
    Rules are canonical. Five steps on conflict.

## Backlog
    [migrated from manifesto]
    Things the prototype does wrong on purpose, unfixed. Visible.

## Ideation
    [migrated from manifesto]
    Ideas considered but not built. Reasoning kept so future sessions don't re-propose blind.
```

## `.book` rename reasoning

The wrapper names the class of thing being rendered — a unit of text that can be read linearly, with internal structure navigated by a TOC. The kit is a library; each canon file is a book.

- **Fit with the shell.** Three-column kit pattern reads as TOC (left nav) + pages (middle `.book`) + margin notes (right inspector).
- **Fit with reading order.** Pattern-first navigation means each book has its own reading order; the wrapper carries "this is a readable unit," not "this is a document."
- **No collision.** No Tailwind, no common CSS library uses `.book` broadly. Free namespace.
- **Short.** Four characters. Easy to type, easy to read in a selector.
- **Scoping reads naturally.** `.book h2 + p` · `.book p:has(+ ul)` · `.book .quote` · `.book .t-list`.
- **Humanistic.** Matches the manifesto's tone target.

Rename scope: every `.doc` and `.doc__*` class across `style.css`, `vars.css`, `js/md.js`, `js/kit.js`, every HTML surface (`index.html`, `demos/**/*.html`, `docs/integration/*.md` code snippets, canon `.md` HTML examples).

`.doc__part`, `.doc__section`, `.doc__spec`, `.doc__spec-row`, `.doc__spec-key`, `.doc__spec-value`, `.doc__signoff`, `.doc__signoff-stats`, `.doc__signoff-signature`, `.doc__signoff-signature-img` all rename in lockstep: `.book__part`, `.book__section`, `.book__spec`, etc.

## Pattern blocks — six

### 1. manifesto

**Intent.** Thin starter ~200 lines. Humanistic and direct. Readable at one sitting by human or agent. Serves as the kit's opening book. Tone is personal, tips and captions LLM-legible.

**Guardrails.**
- No foundation inventory. No component inventory. No typography rhythm rules.
- Sections in the canonical order named above. No new top-level sections.
- §Navigation reflects pattern-first reading order.
- No Lebedev attribution if any reference to the rhythm rule sneaks in — use "inner and outer theory" or skip.

**Expected kit surface.** `.book` wrapper, t-hero, t-display, t-title, t-body, t-caption, t-micro. `doc__signoff` → renamed `book__signoff` at the tail.

### 2. patterns

**Intent.** Compose-first entry point. Three top-level patterns (three columns, card stack, narrow mobile) plus the registry table absorbing the 11 patterns from the deleted root `patterns.html`. Each top-level pattern carries a pointer paragraph + HTML snippet + preview-frame deep link.

**Guardrails.**
- Absorbs `patterns.html`. Root file deletes in stage 5.
- Preview-frame pointers go into `demos/fundamental--accepted/patterns/<slug>.html`. File slug matches pattern name.
- No component-level HTML — pattern-level composition only.
- Registry table uses `registry-table` primitive verbatim.

**Expected kit surface.** `.book` wrapper, registry-table, preview-frame (embedded HTML), t-hero, t-display, t-title, t-body, t-caption.

### 3. components

**Intent.** Drill-from-patterns reference. Foundations + components + forbidden in one book, with deep links into `demos/fundamental--accepted/index.html#<component-id>`. Typography rhythm migrates from manifesto under §Foundations § Type (Lebedev stripped).

**Guardrails.**
- Foundations is a top-level section inside components.md, not a separate file.
- Each component section carries pointer prose + HTML snippet + rules + deep link.
- Forbidden closes the book as a list.
- Typography rhythm migrates with attribution stripped; concept name = "inner and outer theory."
- Comment runtime detail stays in `docs/integration/comment.md`; components.md carries a one-line pointer.

**Expected kit surface.** `.book` wrapper, registry-table (typography utility classes), HTML snippets, t-hero, t-display, t-title, t-body, t-caption, t-mono.

### 4. protocols (NEW file)

**Intent.** Maintainer reference for ship-time decisions. Ship + bundle + semver + evolve + backlog + ideation migrated from manifesto in full.

**Guardrails.**
- Audit-ready — every rule checkable against a live artefact.
- Keep §Backlog and §Ideation visible (hidden issues are worse than visible ones).
- No component references; protocols are meta.
- Evolve protocol's five-step conflict walk carries verbatim.

**Expected kit surface.** `.book` wrapper, t-hero, t-display, t-title, t-body, t-list for ordered protocol steps.

### 5. index-hallway

**Intent.** Repo-root surface. Three-column kit shell. Left sidebar = scroll-spy TOC of the currently-rendered book. Middle = rendered manifesto via `data-md-src`. Right inspector = one pointer card per canon file + one per demo.

**Guardrails.**
- Read-only. No inline editing.
- Sidebar is doc-internal nav only. Cross-doc navigation lives in the inspector.
- Pointer cards are `card card--interactive` with a visible "open" CTA; click opens the target.
- Narrow-mobile uses the kit's existing narrow pattern — no new narrow shell.
- Future SPA-swap is out of scope this session; every pointer-card click opens a new doc via normal navigation.

**Expected kit surface.** `app` three-columns pattern (`data-view="doc"`), sidebar + sidebar__nav + nav-group + toc__indicator, `.book` wrapper on the middle column, card + card--interactive in the inspector, t-caption, button.

### 6. css-dedupe + `.doc` → `.book` rename

**Intent.** Audit `style.css`. Rename every `.doc` and `.doc__*` class to `.book` / `.book__*` across CSS, JS, HTML, markdown snippets. Scope Tier-2 adjacency rules under `.book`; delete unscoped twins. Tier-1 widget and utility-class styles stay unscoped.

**Guardrails.**
- Widget primitives never scope-gated: `.button`, `.card`, `.field`, `.tag`, `.switch`, every `.t-*` utility class.
- Adjacency rules live only inside `.book`: sibling selectors (`+`, `~`, `:has(+ ...)`) and any rule that depends on a neighbour.
- Rename is mechanical — every occurrence of `.doc` / `.doc__*` in CSS selectors, JS class toggles, HTML class attributes, and markdown code fences renames in the same commit.
- No new tokens introduced. No CSS property values change — only selector scoping and class renames.

**Expected kit surface.** Existing CSS with rename applied. No new classes except the rename.

## Exceptions

None. Pure kit inventory. No new components, no new tokens, no voice exceptions.

## Rejected directions

### Hallway-first browser (direction 2)

**Intent.** Six canon surfaces as pointer cards above the fold; manifesto renders below as "about this system." Primary: six-card grid fills first screen. Guardrails: cards carry own jobstory caption; manifesto below fold secondary; one click to any canon doc. Expected kit: `.content` wrapper, card--interactive for pointers, t-body for manifesto below.

**Why rejected.** Inverts the locked 80/20 — pointer cards dominate, manifesto demotes. The rejection doc from 2026-04-24 explicitly names the too-many-cards failure mode: "we also show a lot of different cards in the foundation part, while it's definitely not the thing which I would prefer to start." Browser-first framing repeats the failure.

### Split-view reader (direction 3)

**Intent.** Two columns at root — manifesto 2/3 reading left, sticky pointer cards 1/3 right. Primary: reading column dominates width. Guardrails: pointer column sticky; narrow collapses to manifesto-first stacked; no third column. Expected kit: `.read` wrapper, card for pointers, app two-column shell without inspector.

**Why rejected.** Invents a two-column shell variant. The kit's canonical pattern is three columns. A two-column variant would force a new pattern or an exception. Chosen direction folds the kit's own three-column shell onto itself instead — zero new patterns.

### Single-surface scroll (direction 4)

**Intent.** One scroll; pointer cards inline as section-end breaks inside manifesto flow. Primary: full-width reading surface broken by inline pointer cards. Guardrails: breaks never more than once per §Principle; max three cards per break; no cards before §Why this exists. Expected kit: `.paper` wrapper, card inline, t-caption for break captions.

**Why rejected.** Inline breaks interrupt reading rhythm. The manifesto is meant to be read in one sitting; inline navigation cards would either be ignored (no signal) or break the read (noise). Pointer cards belong in the inspector column where they do not compete with reading.

### Agent-native canon (direction 5)

**Intent.** Root optimized for agent legibility first, human browsing second. manifesto.md reads as numbered spec, not prose. index.html opens with a catalog table of every canon file — jobstory + path + anchor. Primary: registry-table catalog. Guardrails: no rendered manifesto inline at index; manifesto stays terse; pointers carry explicit file paths. Expected kit: `.canon` wrapper, registry-table, t-caption per entry.

**Why rejected.** Re-opened the locked manifesto-inline decision. User kept the locked decision and chose a humanistic reading direction. Agent legibility is served by the prose tone — LLM-tips-and-captions friendly — not by collapsing prose to a spec table.

### Four-layer temple (direction 6)

**Intent.** Mirror manifesto's own four-layer model (meanings, perception, matter, pipeline) in every surface. Each canon file declares its layer upfront + points at the other three. index.html renders a four-panel layout mapped to the four layers. Primary: labeled four-panel grid. Guardrails: every canon file declares its layer at top; cross-layer pointers mandatory; manifesto renders in the meanings panel only. Expected kit: `.layer` wrapper, card--shout for four panels, doc__spec for cross-layer pointers.

**Why rejected.** Four-panel root competes with the manifesto as primary signal. The four-layer model is a concept the manifesto carries in prose; turning it into a structural scaffold at every surface over-commits to one organizing principle and buries the reading direction the chosen path protects.

## Alignment transcript

Round one — directions returned. User response verbatim:

> 1. Nice. With the nav on the left. And inspector on the right. In the inspector we can store the cards with other files, the links or how you name them. Pointers.

Round-one correction on direction 1: three-column kit shell at root. Nav left, manifesto middle, pointer-card inspector right.

Round two — two alignment questions asked. User response verbatim:

> 1. Internal naviation. 2. Inspector - one pointer card per canon file and demo, yes. On wrapper rename -- .book?

Round-two stamps: nav = internal scroll-spy TOC of current doc; inspector = one pointer card per canon file and per demo; wrapper rename = `.book`.

## Gate

Both gates passed. Round-one pick stamped with direction-1 correction. Round-two stamps captured above.

## Hand-off

Spawn six parallel `kk-role-fresh-eyes-jobstory` instances in pre-designer mode — one per pattern block:

- 03a-fresh-eyes-pre-manifesto.md
- 03a-fresh-eyes-pre-patterns.md
- 03a-fresh-eyes-pre-components.md
- 03a-fresh-eyes-pre-protocols.md
- 03a-fresh-eyes-pre-index-hallway.md
- 03a-fresh-eyes-pre-css-dedupe-rename.md

Input for each: this file + the pattern name. Output feeds the designer spawns at stage 3b.
