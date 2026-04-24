---
session: 2026-04-24-content-architecture
stage: 1
role: analyst
input: proposals/2026-04-24-not-accepted.md + user clarifications across five rounds
output: users, job stories, priority scenarios, per-document jobstories, locked file architecture, CSS dedupe scope, entry point
gate: passed to stage 2 (design director)
---

Stage 1 decomposes the content-architecture rework triggered by v1.3.0 rejection. Renderer infrastructure retained as correct. Content re-shaped around a thin manifesto + canon folder + pipeline folder, patterns.html migrated to patterns.md, `.doc` wrapper renamed per flowing-text-region criteria, CSS dedupe scoped to sibling-selector tier.

## Raw input

From `proposals/2026-04-24-not-accepted.md`, user critique verbatim:

> Look. The key problem is that we now have several different documents with md. The main document at the same time looks too much detailed with technical stuff instead of serving philosophy of the system. Same time we also show a lot of different cards in the foundation part, while it's definetely not the thing which I would prefer to start. Before the whole document was more like a thing that was describing how the whole system works, the purpose, the key thing about the agents, and so on. This could be a great starting document. Short. Understandable both by agents and human. Now. The other problem is that now we have lot's of different documents. For example, we have foundation. Which is perfect. But it lists the components and elements and so on in the html format. While expected to be the md. WE have the index prototype for that, it lives in demo. And we should keep all necessary components and it. And in the md iwth foundation we should point on the specific parts of that document, explaining the key details. Same with patterns. It should be the .md file. All the files we observe through the system with agents that serves as documentation should be the .md. And our index.html should be our way to discover those elements from the human side.

From `proposals/2026-04-24-not-accepted.md`, §What this means:

> - No tag. v1.3.0 does not ship.
> - The renderer infrastructure is real and correct.
> - The content architecture is wrong.
> - The main manifesto must return to short philosophy — purpose, how the system works, the agents, how the pipeline fits. Readable at one sitting by human or agent.
> - Components and patterns move to `.md` documentation that **points at** the `demos/fundamental--accepted/` and `patterns.html` HTML prototypes for the actual element inventory. The `.md` holds the key details and the navigation into the prototype; the prototype holds the live components.
> - Every file the agent reads as documentation is `.md`.
> - `index.html` at the repo root is the human-side discovery surface — renders the canon `.md` files + links to the demos.

From live session, user interrupt on scope expansion:

> No need for patterns.html, it should live in patterns.md with html inside of it and that's it. We have the styles. Plus we also should double check all the styles that were created for the sake of showing the design in .doc, all the styles that were written there are good. But I am afraid that now we have too many duplicated, but similar designs in css. So the stuff that is in .doc > all other styles, we can simply delete, if there are two similar declarations and think like all the documents will have this .doc div. Also I am not sure "doc" is the right way to call it then.

Five rounds of clarification captured below under Locked decisions.

## Users

Three. One surface, three jobs.

1. **Konstantin (KK)** — kit maintainer. Reads `manifesto.md` cold at session start. Edits canon. Ships tags.
2. **Pipeline agent** — every role skill loads canonical `.md` files. Consumes reference, does not browse HTML.
3. **Human at repo root** — opens `index.html` in a browser. Discovers the system visually — philosophy → foundations → components → patterns → pipeline → demos.

## Job stories

**KK as philosopher-reader.** When opening `manifesto.md` cold after a break, we want purpose + how it works + agents + pipeline on one sitting, so we re-ground without scrolling past inventory.

**Agent as canon loader.** When invoking a role skill that needs component or pattern inventory, we want one `.md` file that points at the live prototype and carries key rules in prose, so we read canon, not HTML scaffolding.

**Human at root.** When opening `index.html` in a browser, we want the rendered manifesto first and pointer cards into canon + demos second, so the repo reads as a hallway, not a dumping ground.

## Per-document jobstories

Each canonical artefact carries its own testable jobstory. Stage 7 compares the shipped doc against its jobstory.

- **manifesto.md** — When opening the system cold, we want purpose + fit-together in one sitting, so we re-ground without scrolling past inventory.
- **patterns.md** — When composing any layout, we start here. Canonical patterns with live previews. We only drill into components.md when a pattern uses a part we need to customize.
- **components.md** — When drilling from a pattern into its parts, we find every foundation + component + forbidden thing in one doc that deep-links to live examples, so we use kit vocabulary and never invent.
- **voice.md** — When writing any user-facing string, we want shape rules + AI-tells inventory in one place, so drafts pass the voice audit without rework.
- **protocols.md** — When shipping, evolving, or logging an exception, we want bundle rules + semver + evolve protocol + backlog + ideation in one doc, so every kit change follows the same discipline.
- **pipeline.md** — When entering or evaluating a session, we want stages + role roster + entry-point matching + communication protocol in one doc, so we know which stage owns the current failure mode.
- **tokens.json** — When code needs a design token, we want machine-readable source of truth mirrored across CSS/JS/skill files, so consumers cannot drift.
- **index.html** — When a human opens the repo root, they want rendered manifesto first + pointer cards into canon + demos second, so the repo reads as hallway not dumping ground.

## Priority scenarios

1. **Happy path — one-sitting read.** KK opens `manifesto.md`, reads end-to-end in under ten minutes. Finds purpose, four layers, agents, pipeline summary, navigation pointer. No inventory.
2. **Agent canon load — components.** Role skill loads `canon/components.md`. File carries foundations + components + forbidden in pointer prose with deep links into `demos/fundamental--accepted/index.html#<component-id>`.
3. **Agent canon load — patterns.** Role skill loads `canon/patterns.md`. File carries UI patterns in pointer prose with embedded HTML for the registry table + deep links into `demos/fundamental--accepted/patterns/<slug>.html`. `patterns.html` at repo root goes away.
4. **Human discovery at root.** `index.html` renders manifesto inline (80%) plus pointer cards into canon + demos (20%). Future session adds SPA-swap on pointer click.
5. **CSS dedupe.** Audit `style.css`. Tier-2 adjacency rules scope to the flowing-text wrapper; unscoped twins delete. Tier-1 widget/class styles stay unscoped.
6. **Wrapper rename.** `.doc` renames to a class that carries "flowing-text region" (not "document"). Stage 2 brings candidates; shortlist: `.prose`, `.content`, `.read`, `.paper`, `.rendered`.

Out of scope: token palette, new components, pipeline stage edits, the renderer.

## Open questions — resolved

All eight questions stamped across five clarification rounds. Resolutions captured below under §Locked decisions.

## Entry point

**Full walk, six pattern blocks.** Stages 1 → 2 → 3a/3b/3c (six parallel tracks) → 4 → 5 → 6b → 6c → 7. Stage 6a skipped per kit-internal adaptation — no product jobstory exists for cold-read comparison at stage 7.

Six pattern blocks for stages 3a/3b/3c to run in parallel:

1. **manifesto** — thin starter shape, §Agents, §Pipeline summary, §Navigation
2. **patterns** — patterns.md content + embedded HTML + live deep links + absorbs root patterns.html
3. **components** — foundations + components + forbidden, typography rhythm absorbed (Lebedev-stripped)
4. **protocols** — ship + bundle + semver + evolve + backlog + ideation, migrated out of manifesto
5. **index-hallway** — rendered manifesto (80%) + pointer cards (20%) at repo root
6. **css-dedupe + wrapper rename** — two-tier dedupe (widget vs adjacency), rename `.doc` per flowing-text criteria

## Gate

Passed. Every open question stamped. Handing to stage 2 — design director.

## Locked decisions

### Session + version

- **Session slug:** `2026-04-24-content-architecture`
- **Rework path:** replay clean. Revert v1.3.0 markdown-as-source content commits; keep renderer commits (`js/md.js`, `demos/md-renderer-smoke/`); replay the rework on top.
- **Version on ship:** reuse `1.3.0`. First tagged version of the new content architecture.

### File structure

```
skills/kk-design-system/
  SKILL.md
  manifesto.md
  tokens.json
  canon/                     what the system is
    components.md
    patterns.md
    voice.md
  pipeline/                  how we work on it
    pipeline.md              absorbs doc-format.md § Documentation contract
    protocols.md             NEW
```

- `doc-format.md` **deleted**. Content folded into `pipeline.md § Documentation contract`.
- `patterns.html` at repo root **deleted**. Content absorbed into `canon/patterns.md` with embedded HTML.
- `skills/kk-design-system/patterns/strategy-doc.md` **moved out of the kit**. It is a product-deliverable recipe, not kit canon. Interim home: stage 2 decides. Final home: inside a future strategy prototype under `demos/` when that prototype gets built. Live skill references to `strategy-doc.md` update in stage 5 as mechanical cleanup.

### Manifesto target shape

Survives in `manifesto.md` (target ~200 lines from 685 today):

- §Why this exists · §Philosophy
- §Agents — new, short — names role skills + their pipeline slot
- §Pipeline — one-paragraph summary, pointer to `pipeline/pipeline.md`
- §Principles — signal / expected patterns / 80-20 / chunking / radical contrast / iPad feel
- §Job stories · §Time to value
- §Navigation — one line each, pattern-first reading order: patterns → components → voice → protocols → pipeline → tokens

Tone: humanistic, direct, LLM-tips-and-captions friendly.

Moves to `canon/components.md`:

- §Foundations § Material / Color / Type / Space / Radii / Motion
- §Typography rhythm (14 rules + kit addenda) — Lebedev name stripped; refer to as "inner and outer theory" or describe rules directly
- §Components (full inventory: typography utility classes, card, field, button, tag, switch, comment, navigation, signoff, spec list, list, preview surfaces, registry surfaces)
- §Forbidden

Moves to `canon/patterns.md`:

- §Patterns (three columns shell, card stack, narrow mobile)
- The 11 patterns currently in `patterns.html` at root, with embedded HTML for the registry table + `preview-frame` primitives + deep links into `demos/fundamental--accepted/patterns/<slug>.html`

Moves to `pipeline/protocols.md` (NEW):

- §Ship discipline
- §Bundle rule
- §Semver
- §Evolve protocol
- §Backlog
- §Ideation

Moves to `canon/components.md § Comment` as one-line pointer:

- §Runtime (comment lifecycle events) — detail stays in `docs/integration/comment.md` where it already lives

### Reading order

Pattern-first. When composing a layout, start at `patterns.md`; drill into `components.md` only when a pattern uses a part we need to customize.

### index.html at repo root

- **Near-term shape:** rendered manifesto inline (80% — the signal), pointer cards into canon + demos (20% — secondary).
- **Future shape (not this session):** SPA-style hallway — pointer cards swap documents inline on click, no reload.

### CSS dedupe — two tiers

- **Tier 1 — widget/class styles.** `.button`, `.card`, `.field`, `.tag`, `.switch`, `.t-hero`, `.t-display`, `.t-body`, `.t-title`, `.t-caption`, `.t-micro`. Font, size, weight, leading, color. Fire anywhere the class appears. Stay unscoped.
- **Tier 2 — adjacency/sibling rules.** Heading top-margin = 2× bottom-margin when leading a paragraph. Paragraph ending in `:` followed by a list tightens to 8px gap. List-item spacing tied to line-height. Quote + attribution vs quote + paragraph. Use sibling selectors (`h2 + p`, `p:has(+ ul)`) which cannot target classes selectively. Scope to the flowing-text wrapper.

Dedupe rule: Tier-2 rules live scoped to the wrapper; unscoped twins delete. Tier-1 stays unscoped.

The wrapper has nothing to do with markdown. Any region carrying flowing text (md-rendered, hand-authored, or the content column, or future inspector content) wraps in the same class and activates Tier-2 rules.

### Wrapper rename

`.doc` renames to a class that carries "flowing-text region" (not "document"). Stage 2 delivers the shortlist with reasoning. Shortlist seed: `.prose`, `.content`, `.read`, `.paper`, `.rendered`.

### Voice directive — no Lebedev attribution

When the typography rhythm migrates from manifesto to `canon/components.md § Type`:

- Strip the Source line (`Source: Artemy Lebedev, Bureau, "Rule of Inner and Outer" (bureau.ru/soviet/20140818/)`).
- Strip the attribution paragraph under the heading.
- Default phrase when naming the concept: "inner and outer theory". Or describe the rules directly without authorship.
- Guard in every pipeline stage that touches these docs. Flag as a voice audit defect if any draft reintroduces the name.

### Entry point

Full walk, six pattern blocks, stage 6a skipped.

## Hand-off

Stage 2 — Design Director (`kk-role-design-director`). Input: this file + user-stamped locked decisions above.

Expected stage 2 output, round one: five or more directions for the file architecture + wrapper rename. Each direction names a one-line intent, primary signal, guardrails, file-layout impact.

Expected stage 2 output, round two (after user picks): direction document carrying:

- ASCII tree of the target file architecture.
- ASCII of the content structure inside each canon file — sections, order, one-line hook per section.
- Rename candidates for `.doc` with reasoning.
- Named six pattern blocks with per-block intent and guardrails.
- Alignment transcript + rejected-directions archive.
