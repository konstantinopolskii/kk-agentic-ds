---
session: 2026-04-24-markdown-source
stage: phase-2a
role: ds-manager
input: index.html + every .md canon file + every SKILL.md
output: migration plan
gate: KK stamp before executor runs
---

# Phase 2a audit — markdown-as-source migration

Read-only audit. Maps every prose block in `index.html` to a destination in markdown, flags drifts between prose and implementation, lists every skill loading `components.md`, sketches the post-migration shape of `manifesto.md` and `index.html`, and surfaces decisions that route back to KK before the executor runs.

No canon file touched. No index.html touched. No SKILL.md touched.

## §1. Prose inventory in `index.html`

One row per `<article>` or `<section>` block carrying prose. Line numbers are current `index.html` (767 lines). Destinations use the post-migration section names proposed in §4.

| Block (id or anchor) | Lines | Destination | Notes |
|---|---|---|---|
| `doc__intro` paragraphs (three) | 106-123 | `manifesto.md § Why this exists § Intro` | Three intro paragraphs — framing for the whole page. Merge with current manifesto.md §Philosophy opener or promote as a new §Intro. KK call in §7. |
| `doc__signoff` stats + signature | 125-147 | KEEP IN INDEX | Interactive shell. Counts (`49 sections`, `9 components`, `9 color tokens`, `2 radii`) violate user ruling 4 (abstract). Counts removed; stats rephrase abstractly during 2b. |
| `<h2 class="doc__part">Meanings</h2>` marker | 151 | DROP | Structural nav marker. Replaced by markdown `##` rendering. |
| `#philosophy` | 153-162 | `manifesto.md § Philosophy` | Already present verbatim in manifesto.md lines 5-7. Prose duplicates canon — migrate by deletion, canon wins. |
| `#why` | 164-191 | `manifesto.md § Why this exists` | Body paragraph + signal/noise/magic spec. Canon lines 9-15 already carry this as a bullet list. Drop spec-list version from index; canon's bullet form wins. |
| `#jobs` | 193-219 | `manifesto.md § Job stories` | Canon lines 17-22 carry formula + anti-pattern. Example paragraph (voice transcription interview) is new content — migrate it into manifesto under §Job stories as an example. |
| `#ttv` | 221-231 | `manifesto.md § Time to value` | Already in canon lines 24-26 verbatim. Drop index version. |
| `<h2 class="doc__part">Principles</h2>` marker | 235 | DROP | Structural. |
| `#signal` | 237-247 | `manifesto.md § Principles § Pure signal` | Canon lines 30-31 carry it. Duplicate — drop index version. |
| `#expected` | 249-279 | `manifesto.md § Principles § Expected patterns` | Canon lines 33-38 carry four bullets. Spec list (red button / X / back arrow / hamburger) matches canon content. Drop duplicate. |
| `#eighty-twenty` | 281-307 | `manifesto.md § Principles § Eighty / twenty` | Canon line 40-41 short. Three spec-list rows (screen / panel / card level) are new examples — migrate into canon under §Eighty / twenty. |
| `#chunking` | 309-354 | `manifesto.md § Principles § Chunking` | Two paragraphs + fractal examples spec list. Canon lines 43-44 short. Chunking examples include hardcoded counts (`44 items`, `9 tokens`, `12 tokens`, `9 questions`, `17 items`) — rewrite abstractly per ruling 4. Or relocate the concrete examples to the fundamental demo where tokens render. KK call in §7. |
| `#contrast` | 356-373 | `manifesto.md § Principles § Radical contrast` | Canon line 46-47 carries short version with same 66/22 example. Duplicate — drop index version. |
| `#ipad` | 375-390 | `manifesto.md § Principles § The iPad feel` | Canon lines 49-50 carry this. Duplicate — drop. |
| `<h2 class="doc__part">Inventory</h2>` marker | 396 | DROP | Structural. |
| `#components` pointer card | 398-413 | KEEP IN INDEX | Interactive pointer — button + copy into fundamental demo. Copy contains drift (`Nine components` — see §2). Rewrite abstractly. |
| `#patterns` pointer card | 415-427 | KEEP IN INDEX | Interactive pointer. Copy contains drift (`Eleven patterns`). Rewrite abstractly. |
| `#pipeline` pointer card | 429-441 | KEEP IN INDEX | Interactive pointer. Copy (`Eight stages, eleven roles`) matches pipeline.md. Keep. |
| `#foundations` pointer card | 443-459 | KEEP IN INDEX | Interactive pointer. Copy abstract already. |
| `<h2 class="doc__part">Voice</h2>` marker | 466 | DROP | Structural. |
| `#ai-tells` wrapper + two intro paragraphs | 468-484 | `voice.md § No AI tells § Intro` | Two intro paragraphs + cross-reference note. Canon `voice.md` opens §No AI tells at line 30 but skips the "Wikipedia inventory" preamble — migrate the two paragraphs into voice.md as the §No AI tells opener. |
| `#ai-tells` card 1 (Words and verbs to cut) | 486-512 | `voice.md § No AI tells § Words and verbs to cut` | Five rows: filler adjectives, buzzy nouns, −ing verbs, copula avoidance, transitions. Canon `voice.md` lines 33-37 already carry all five items. Duplicate — drop index version. Verify parity per §5. |
| `#ai-tells` card 2 (Sentence shapes to cut) | 514-544 | `voice.md § No AI tells § Sentence shapes to cut` | Six rows: not-just-but, not-A-but-B, rule of three, elegant variation, em-dashes, moralizing closers. Canon lines 40-45 carry all six. Duplicate — drop. |
| `#ai-tells` card 3 (Structures and signals to cut) | 546-576 | `voice.md § No AI tells § Structures and signals to cut` | Six rows: summary blocks, challenges, weasel attribution, exhaustive lists, Title Case, mechanical boldface. Canon lines 48-53 carry all six. Duplicate — drop. |
| `<h2 class="doc__part">Practice</h2>` marker | 584 | DROP | Structural. |
| `#practice` pointer card | 586-603 | KEEP IN INDEX | Interactive pointer. Copy reasonable. Links include `components.md` — update to `manifesto.md § Components` per §3. |
| `#evolve` | 605-633 | `manifesto.md § Protocols § Evolve` | Two paragraphs + ordered list of five steps + conflict card. Not in current manifesto.md — net new migration. Fully qualifies for §Protocols. |
| `<h2 class="doc__part">Audit</h2>` marker | 637 | DROP | Structural. |
| `#backlog` | 639-653 | `manifesto.md § Protocols § Backlog` | Body paragraph + empty card. KK call in §7 — does backlog stay in manifesto or move to dedicated `backlog.md`? Lean: stays in manifesto (small, rarely edited, lives next to §Evolve). |
| `#ideation` | 655-700 | `manifesto.md § Protocols § Ideation` | Body paragraph + one detailed card (auto-sync inspector comments to Claude). Not in canon. Migrate as §Ideation. Length: ~45 lines of prose. If manifesto nears 700-line threshold, split to `protocols.md` — see §4 line estimate. |
| `<h2 class="doc__part">Distribution</h2>` marker | 706 | DROP | Structural. |
| `#distribution` pointer card | 708-720 | KEEP IN INDEX | Interactive pointer. Points at kk-ds-maintainer skill. Keep. |
| Inspector shell | 729-738 | KEEP IN INDEX | Comment demo shell. Not prose. |
| FAB buttons + nav scripts | 746-765 | KEEP IN INDEX | Runtime JS + narrow-view affordances. Not prose. |

**Uncertain blocks flagged:**
- `doc__intro` three paragraphs (106-123) — framing copy that mentions "atoms, elements, and patterns live in the fundamental demo" + "the pattern registry" + "this document carries the thinking." The framing is page-specific. Migration candidate: split. Lines 107-115 (four layers + agentic rationale) → manifesto.md § Why this exists. Lines 117-123 (pointer to fundamental + patterns.html) stays as shell intro in index.html. KK call in §7.
- `#chunking` hardcoded counts (lines 328-352) — either abstractly rewrite or relocate concrete examples to the fundamental demo. KK call in §7.
- `doc__signoff` itself — the signoff block is interactive HTML (signature SVG + byline), not prose. Stays in index.html. But the stats inside (lines 127-134) carry the hardcoded count claims and need abstract rewrite. Confirmed keep-in-index with stats rewrite.

## §2. Drift inventory

Every claim in `index.html` prose that contradicts implementation in `vars.css` / `tokens.json` / `components.md`. Per user ruling 4, count claims rewrite abstractly during Phase 2b rather than update the number.

| Claim | Location | Actual | Resolution |
|---|---|---|---|
| "two radii plus one pill alias" | `manifesto.md` line 84, `index.html` line 133 (signoff stat `2 radii everywhere. 12px for small things, 24px for cards.`) | `vars.css` lines 14-17 define four: `--radius-sm: 12px`, `--radius-md: 16px`, `--radius-lg: 24px`, `--radius-full: 9999px`. `.preview-frame` uses `--radius-md`. `tokens.json` lines 26-31 match vars.css. | Manifesto prose rewrites as abstract: "a bounded set of radii, from button to card to pill." Signoff stat drops the count entirely. |
| "Nine components in the kit" | `index.html` line 128 (signoff stat), line 401 (`Nine in the kit`), line 406 (`Nine components cover most SAAS flows`) | `components.md` headings: Card, Field, Button, Tag, Switch, Comment, Navigation, Signoff = 8 proper components. Plus Spec list (dl.doc__spec), Preview surfaces, Registry surfaces, Typography utility classes as document-surface primitives. No single count agrees. | Rewrite abstract: "a small, bounded component surface." Drop the number. |
| "9 color tokens" | `index.html` line 132 (signoff stat), line 335 (chunking spec) | `vars.css` lines 3-11 define 9: bg, bg-muted, surface-overlay, surface-strong, border, border-strong, text, text-muted, text-subtle. `tokens.json` lines 9-17 match. | Count is currently accurate. Still rewrite to abstract per ruling 4: "a bounded palette — backgrounds, surface tints, hairlines, text alphas, no brand or status." |
| "two backgrounds, two surface tints, two hairlines, three text alphas" | `index.html` line 335, `manifesto.md` line 62 | Matches vars.css (2 bg tokens: bg, bg-muted; 2 surfaces: surface-overlay, surface-strong; 2 borders: border, border-strong; 3 text alphas: text, text-muted, text-subtle). | Breakdown is accurate. Rewrite still: "backgrounds, surface tints, hairlines, text alphas" — drop the numeric counts per ruling 4. |
| "seven sizes" type scale | `manifesto.md` line 72, (implicit in index.html via components.md reference) | `vars.css` lines 43-49 define 7: hero, display, body, title, subtitle, caption, micro. `tokens.json` lines 58-65 match. | Accurate but count is hardcoded — rewrite as "a restricted type scale." |
| "three weights" | `manifesto.md` line 72 | `vars.css` lines 57-59: regular 500, medium 500, bold 700. Three named, two actual mass values (500 and 700). `tokens.json` lines 52-55 match. | Technically the count is "three names, two weights on the wire." Rewrite as "regular, medium, bold — a disciplined weight set." |
| "12 spacing tokens on a 4px grid" | `index.html` line 339 (chunking spec) | `vars.css` lines 20-31: space-1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20 = 12 tokens. `tokens.json` matches. | Count accurate. Rewrite abstract: "spacing snaps to multiples of 4." |
| "four easing curves" | `manifesto.md` line 88 | `vars.css` lines 65-71: `--ease-out`, `--ease-in-out`, `--ease-spring`, `--ease-swing` = 4. `tokens.json` lines 81-85 match. | Accurate. Rewrite abstract per ruling 4: "a small set of easing curves, each tied to a motion role." |
| "Eleven patterns from the first accepted prototype" | `index.html` line 423 | `patterns.html` is the registry. Skipping count verification in this audit; flagged for Phase 2b execution to cross-check or rewrite abstractly. | Rewrite abstract: "the registry seeded by the first accepted prototype." |
| "Eight stages, eleven roles" | `index.html` line 432, pipeline.md §Role roster | `pipeline.md` table has 12 rows (stages 1-7 + meta-retro + pattern-discoverer + maintainer). But maintainer + pattern-discoverer + meta-retro are outside the eight-stage walk. Eight stages count (1, 2, 3a, 3b, 3c, 4, 5, 6a, 6b, 6c, 7) is 11 substages; the spec calls it "eight stages" collapsing 3a/3b/3c to stage 3 and 6a/6b/6c to stage 6. Eleven roles is the stage-owning role count. | Accurate with the collapsed counting. Keep — this is pipeline canon, rewriting abstract would lose the spec's own framing. No change. |
| "49 sections across nine parts" | `index.html` line 128 (signoff stat) | Nav groups in sidebar: Meanings, Principles, Inventory, Voice, Practice, Audit, Distribution, Surfaces = 8 groups (not 9). Section anchors in doc: philosophy, why, jobs, ttv, signal, expected, eighty-twenty, chunking, contrast, ipad, components, patterns, pipeline, foundations, ai-tells, practice, evolve, backlog, ideation, distribution = 20 sections (not 49). Prose count predates the slim. | Stale count — two drifts in one sentence. Rewrite signoff stats abstractly per ruling 4. The signoff keeps two stats (per canon components.md signoff rule), but reworked without numbers. |
| "0 edits pending" stat convention (canon) | `components.md` line 148-154 signoff example | Index has stats that narrate the doc (`49 sections`, `9 components`, etc.), not the canon example's shape (`3 revisions before sealing`, `0 edits pending`). | Minor — the signoff example in components.md is illustrative, not prescriptive. No action. |
| ai-tells duplicated between voice.md and index.html | `voice.md § No AI tells` (lines 30-53), `index.html § ai-tells` (lines 468-576) | Verbatim parity per Phase 2 contract. See §5 for line-by-line check. | Index version drops; voice.md is the single source. |

**Drift total: 12 claims logged. 11 require abstract rewrite per ruling 4. 1 (pipeline count "eight stages, eleven roles") keeps its specificity because it is pipeline canon's own framing.**

## §3. `components.md` consumers

Every skill with a `components.md` reference in its canon-load list, plus which sections each actually uses. Migration target column names the manifesto section the canon load points at post-migration.

| Skill | SKILL.md section referencing | Sections used | Migration target |
|---|---|---|---|
| `kk-design-system` (parent) | `## Hard rules, before anything else` (line 15) + `## Reference files` (line 63) + line 53 (narrow pattern reference) | Full file — the parent lists components.md as one of the canonical inputs to read in order before any UI work. | `manifesto.md § Components` (full subsection tree) |
| `kk-role-design-director` | `## Load the canonical rules first` (line 31) | §Typography utility classes, §Card, §Patterns (Three columns, Card stack, Narrow) | `manifesto.md § Components § Typography`, `§ Card`, `§ Patterns` |
| `kk-role-designer` | `## Load the canonical rules first` (line 30) + `## What a pattern hand-off contains` (line 81) | Full file — every kit class the pattern needs must resolve to components.md | `manifesto.md § Components` (full subsection tree) |
| `kk-role-ds-manager` | `## Load the canonical rules first` (line 27) + lines 62, 86 | Full file — maps each pattern to kit classes + variants + kit-demo section | `manifesto.md § Components` (full subsection tree) |
| `kk-role-design-engineer` | `## Load the canonical rules first` (line 29) + line 132 | Full file — builds every class against inventory | `manifesto.md § Components` (full subsection tree) |
| `kk-role-consistency-ds` | `## Load the canonical rules first` (line 23) + `## The four vectors` (lines 41-45) | Full file — class resolution checks every class against every components.md entry | `manifesto.md § Components` (full subsection tree) |
| `kk-role-meta-reviewer` | `## Load the canonical rules first` (line 28) | `§ Typography utility classes` only (for the AI-tells voice pass) | `manifesto.md § Components § Typography` |
| `kk-role-meta-retro` | `## Load the canonical rules first` (line 29) | Full file — retros can propose changes to any canon | `manifesto.md § Components` (full subsection tree) |
| `kk-role-pattern-discoverer` | `## Inputs` (line 39) | Full file for reference when naming patterns | `manifesto.md § Components` (full subsection tree) |
| `kk-ds-maintainer` | `## Inherited rules — still binding` (line 41) + lines 54, 68, 108 | Full file — the artifact being edited | `manifesto.md § Components` (full subsection tree) |
| `kk-ds-supervisor` | `## Load the canonical rules first` (line 26) + line 57 | Full file — inventory checks against every entry. Marked deprecated in kit 1.0.0 but retained for historical session playback. | `manifesto.md § Components` (full subsection tree) |
| `kk-ds-frontend` | Section around line 25 + line 40 | Full file — forbidden to introduce classes outside it. Marked deprecated in kit 1.0.0. | `manifesto.md § Components` (full subsection tree) |

**Non-SKILL.md consumers of `components.md`:**

| File | Reference | Migration target |
|---|---|---|
| `skills/kk-design-system/pipeline.md` | Multiple — lines 30, 51, 59, 83, 95, 117, 119, 154, 186 (role canon-load declarations + rubric) | Update all references to `manifesto.md § Components` (or specific subsection where applicable) |
| `skills/kk-design-system/voice.md` | Line 57 (`See components.md → Signoff.`) | `manifesto.md § Components § Signoff` |
| `skills/kk-design-system/patterns/strategy-doc.md` | Lines 82, 95 (`See components.md` for signoff + comment) | `manifesto.md § Components § Signoff`, `§ Comment` |
| `skills/kk-role-fresh-eyes-jobstory/SKILL.md` | Lines 30, 88 (negative reference — do NOT read components.md) | Update the anti-reference: do NOT read `manifesto.md § Components` |
| `skills/kk-role-consistency-jobstory/SKILL.md` | Lines 28, 49 (negative reference) | Update: do NOT read `manifesto.md § Components` |

**Consumers requiring canon-load migration: 12 skill files + 4 non-skill canon files = 16 files touched in Phase 2b executor run.**

## §4. Proposed `manifesto.md` structure post-migration

Table of contents, with source annotations showing what each section absorbs.

```
# Manifesto

## Why this exists                              [from: index.html#why + doc__intro]
  ### Intent
  ### Signal, noise, magic

## Philosophy                                   [from: current manifesto.md + index.html#philosophy]

## Job stories                                  [from: current manifesto.md + index.html#jobs example]

## Time to value                                [from: current manifesto.md, unchanged]

## Principles                                   [from: current manifesto.md + index.html principles examples]
  ### Pure signal
  ### Expected patterns
  ### Eighty / twenty                           [absorb index.html#eighty-twenty screen/panel/card examples]
  ### Chunking                                  [absorb index.html#chunking; rewrite counts abstractly per ruling 4]
  ### Radical contrast
  ### The iPad feel

## Foundations                                  [from: current manifesto.md; rewrite counts abstract]
  ### Material
  ### Color
  ### Type
  ### Space
  ### Radii
  ### Motion

## Components                                   [from: components.md — full file absorbed]
  ### Typography utility classes
  ### Card
  ### Field
  ### Button
  ### Tag
  ### Switch
  ### Comment
  ### Navigation
  ### Signoff
  ### Spec list
  ### Preview surfaces
  ### Registry surfaces
  ### Patterns
    #### Three columns
    #### Card stack
    #### Narrow (mobile)
  ### What's forbidden

## Runtime                                      [from: current manifesto.md, unchanged]
  ### Comment lifecycle events
  ### Integration docs convention

## Protocols                                    [net new — absorb index.html#evolve, #backlog, #ideation]
  ### Evolve a rule                             [from: index.html#evolve]
  ### Backlog                                   [from: index.html#backlog]
  ### Ideation                                  [from: index.html#ideation]

## Pipeline                                     [from: current manifesto.md pointer, unchanged]

## Documentation contract                       [from: current manifesto.md, unchanged]
```

**Source breakdown:**
- Current `manifesto.md`: ~234 lines (confirmed).
- Current `components.md`: ~274 lines (confirmed).
- `index.html` prose migrating in: ~120 lines after deduplication (most §Principles content already in canon; the net-new is §Evolve + §Backlog + §Ideation + a handful of examples under Eighty/Chunking + the ai-tells intro that moves to voice.md, not here).

**Estimated post-migration line count:** `234 (current) + 274 (components absorb) + 120 (net-new prose) − 80 (deduplication of already-canon material in current manifesto where index.html mirrors) = ~548 lines.`

**Fits the 500-700 ceiling.** No split needed. Per user ruling 3, coherence is the measure, and the proposed TOC stays topically coherent (Philosophy → Principles → Foundations → Components → Runtime → Protocols → Pipeline pointer → Documentation contract). If §Protocols + §Components together push past 700 during execution, split §Components into a separate `components.md` reference OR spin §Protocols into `protocols.md` — not both, and only if the file becomes unreadable when skimmed.

**§Ideation card — watch for bloat.** The one parked idea (auto-sync inspector comments) is ~45 lines. A second parked idea in a future session doubles that. Flag to KK in §7: should §Ideation cards live in manifesto.md or spin to `ideation.md` the moment a second one lands?

## §5. `voice.md` additions

Line-by-line parity check between `voice.md § No AI tells` (lines 30-53) and `index.html § ai-tells` (lines 468-576). The claim from Phase 1: voice.md is authoritative, index.html mirrors it.

**Parity confirmed for all twelve items. Breakdown:**

| Item | voice.md | index.html | Parity |
|---|---|---|---|
| Filler adjectives (10 words) | Line 33 | Line 493 | Word lists match exactly (vibrant, pivotal, intricate, meticulous, robust, seamless, breathtaking, rich, comprehensive, holistic) |
| Buzzy nouns (6 words) | Line 34 | Line 497 | Match (tapestry, testament, landscape, journey, ecosystem, realm) |
| −ing filler verbs (7 words) | Line 35 | Line 501 | Match (showcasing, fostering, highlighting, emphasizing, reflecting, contributing to, delving into) |
| Copula avoidance (5 words) | Line 36 | Line 505 | Match (serves as, represents, stands as, features, boasts) |
| Transitions that pad (4 words) | Line 37 | Line 509 | Match (Additionally, Moreover, Furthermore, In conclusion) |
| "Not just X, but Y" | Line 40 | Line 521 | Match |
| "Not A, but B" | Line 41 | Line 525 | Match |
| Rule of three | Line 42 | Line 529 | Match (same "fast, reliable, and scalable" example) |
| Elegant variation | Line 43 | Line 533 | Match |
| Em-dashes for punch | Line 44 | Line 537 | Match |
| Moralizing closers | Line 45 | Line 541 | Match (same examples) |
| Summary blocks | Line 48 | Line 553 | Match |
| "Challenges and future prospects" | Line 49 | Line 557 | Match |
| Weasel attribution | Line 50 | Line 561 | Match |
| "Such as" exhaustive lists | Line 51 | Line 565 | Match |
| Title Case headings | Line 52 | Line 569 | Match |
| Mechanical boldface | Line 53 | Line 573 | Match |

**One addition voice.md is missing:**

- `index.html` lines 478-484 — the two-paragraph §No AI tells intro ("AI drafts leak the same tics. Cutting them is the fastest way to un-AI a passage. Based on the Wikipedia project's inventory of signs of AI writing…"). Voice.md jumps from the §Muted text section straight into the bulleted list without this framing. Phase 2b migrates the intro paragraphs into voice.md as the §No AI tells opener, between line 30 (heading) and line 32 (current first item).

**Action for executor:** move the two-paragraph intro from index.html lines 478-484 into voice.md § No AI tells as the opener. Everything else is verbatim parity — the index.html copies delete cleanly.

## §6. `index.html` final shape

Post-migration sketch. What stays, what leaves.

**Stays (hand-written HTML):**

```
<aside class="sidebar">
  TOC — populated from markdown headings by the renderer after it injects
  manifesto.md and voice.md. Sidebar template HTML stays the same; the
  <section class="nav-group"> items are rebuilt at runtime.

<main class="doc">
  <h1>Agentic Design System</h1>
  <div class="doc__intro">
    Two or three intro paragraphs (the third, pointing at fundamental +
    patterns.html, stays). KK ruling on whether the first two migrate.

  <div class="doc__signoff">
    Stats (abstract phrasing, no hardcoded counts per ruling 4) + byline +
    signature SVG. Interactive element, not prose.

  <!-- Six pointer cards: inventory group -->
  <article id="components"> Components pointer → fundamental
  <article id="patterns">   Patterns pointer → patterns.html
  <article id="pipeline">   Pipeline pointer → pipeline.md
  <article id="foundations"> Foundations pointer → fundamental#color + tokens.json
  <article id="practice">   Practice pointer → patterns.html + §evolve + maintainer
  <article id="distribution"> Distribution pointer → maintainer skill

  <!-- Markdown-rendered sections -->
  <section data-md-src="./skills/kk-design-system/manifesto.md"></section>
  <section data-md-src="./skills/kk-design-system/voice.md"></section>

<aside class="inspector">
  Empty comment stack. Selection-to-draft flow via kit.js.

<button class="fab fab--nav">
<button class="fab fab--inspector">
<button class="fab fab--comment">
```

**Leaves (migrated to markdown):**

- All `<article>` prose blocks under §Meanings, §Principles, §Voice, §Practice (#evolve), §Audit.
- `<h2 class="doc__part">` structural markers.

**Line estimate post-migration:**

- Current: 767 lines.
- Removed: ~490 lines of prose (articles + spec-lists + part markers from line 149 through line 700, minus the six pointer-card articles + signoff which stay at ~180 lines).
- Added: `<section data-md-src>` containers × 2 = ~4 lines.
- Shell + six pointer cards + inspector + FABs + scripts: ~280 lines.

**Target: ~285 lines.** Well under the 400-line ceiling named in Phase 3 spec.

## §7. Open questions for KK

Decision points that should route back to KK before the executor runs Phase 2b.

### Q1. `doc__intro` paragraph ownership

The three intro paragraphs at lines 106-123 of `index.html`:

1. "A design system for AI-assisted product work. Four layers: meanings, perception, matter, pipeline. Output is screens with low cognitive load and a small component surface."
2. "Agentic because AI does most of the drafting. The rules below exist so a junior agent (or a junior human) ships coherent work before human review."
3. "The kit's atoms, elements, and patterns live in [fundamental demo] and [patterns registry]. This document carries the thinking: philosophy, foundations, voice, protocols."

Paragraph 1 + 2 read as manifesto-framing (why the kit exists). Paragraph 3 reads as shell-framing (where each artifact lives). **Proposed split:** paragraphs 1-2 migrate to `manifesto.md § Why this exists § Intro` as the doc's new opener. Paragraph 3 stays in `index.html` as the shell intro above the pointer cards.

**KK call:** accept the split, or keep all three as shell intro (migrate none), or migrate all three and let the shell start directly with the pointer cards?

### Q2. Chunking examples — abstract rewrite or relocate?

`index.html` #chunking lines 328-352 has a spec-list of five concrete fractal examples:

- Sidebar: 44 items split into 9 nav groups.
- Color tokens: 9 tokens grouped as 2/2/2/3.
- Spacing tokens: 12 tokens split into micro/standard/macro.
- Decision tree: 9 questions.
- Checklist: 17 items.

Per user ruling 4, hardcoded counts drop from foundations prose. But chunking examples are not foundations — they are principle demonstrations. The count is the point of the example ("when a list passes seven, break it").

**KK call:** rewrite abstract ("sidebar nav breaks into groups, color breaks into four families, space breaks into three bands") and lose the concrete numbers, or keep the concrete examples verbatim in manifesto.md §Principles § Chunking as illustrations (the rule is about chunking large counts — naming them serves the teaching)?

Recommendation: keep concrete. Chunking examples are teaching, not foundations claims. Ruling 4 targets prose like "we have nine colors" — not "here's a list of 44 items, chunked into 9 groups."

### Q3. §Backlog, §Ideation — stay in manifesto.md or split?

User ruling 3: 500-700 lines is fine in manifesto.md; split only on incoherence. Current estimate (§4) lands at ~548 lines.

**KK call:** stays in manifesto.md as §Protocols § Backlog + § Ideation for now. Flag a future split to `backlog.md` + `ideation.md` if a second parked idea lands and §Ideation crosses ~80 lines, because §Ideation entries are self-contained essays that won't reward being interleaved with evolve-protocol prose.

### Q4. Signoff stats — two stats or drop entirely?

Per components.md §Signoff canon: "Ship two stats, never three." Current signoff carries four stats in two rows (violates canon — already a drift not caught in §2 because it's structural, not prose). With abstract rewrite, what do the two stats say?

**KK call:** name the two stats that survive, or ship the signoff with byline + signature only (no stats)? Canon allows two. Examples from components.md: "3 revisions before sealing" + "0 edits pending." Kit-doc equivalent could be "signed April 2026" + the kit version shipped.

### Q5. `kk-design-system` parent skill canon-load order

Current parent SKILL.md line 15: *"Read the reference files in order: `manifesto.md` → `tokens.json` → `components.md` → `voice.md` → `pipeline.md`."*

Post-migration: components.md retires. The read order becomes `manifesto.md` → `tokens.json` → `voice.md` → `pipeline.md` (four files). Is four-file read order correct, or does the parent skill drop the explicit order now that components is folded into manifesto?

**KK call:** confirm the four-file order, or reshape the parent skill canon-load to match the new doc shape (e.g., `manifesto.md § Philosophy+Principles+Foundations`, then `manifesto.md § Components`, etc.)?

### Q6. Drift between components.md signoff example and index.html signoff

Components.md §Signoff demonstrates two stats ("3 revisions before sealing", "0 edits pending"). Index.html ships four stats (49 sections, 9 components, 9 color tokens, 2 radii). This is a quiet drift per §2 that the migration surfaces.

**KK call:** the migration resolves Q4 by picking the two stats. Confirm that the components.md example itself stays prescriptive ("ship two stats, never three"), or loosen the rule?

### Q7. Proposed Phase 4 version bump — 1.3.0 or 2.0.0?

Out of scope for this audit, but flagging since the audit surfaces the blast radius. **Count: 12 SKILL.md files need canon-load edits.** That is every skill in `skills/*` except `kk-role-fresh-eyes-jobstory` and `kk-role-consistency-jobstory` (which reference components.md only as a negative — do-not-read). Removing the file without a re-export stub breaks every skill's file-read step on first invocation until the canon loads land.

**KK call at Phase 4:** options from the proposal:
- (a) Remove `components.md` entirely. All 16 file edits land. Major bump → 2.0.0.
- (b) Keep `components.md` as a thin re-export pointing at `manifesto.md § Components` for one minor cycle. Minor bump → 1.3.0. Retirement in 2.0.0.

Recommendation lean: (b) for one minor. The re-export is a two-line file. It buys consumers (and any agent state cached from before the migration) a clean upgrade path. Semver honesty: additive infrastructure + deprecation stub is minor.

---

## Audit summary

- §1 prose inventory rows: 32.
- §2 drift rows: 12 (11 require abstract rewrite; 1 kept specific because it is pipeline canon's own framing).
- §3 skill consumers: 12 SKILL.md files + 4 non-skill canon files = 16 files to edit in Phase 2b executor.
- §4 manifesto.md post-migration estimate: ~548 lines. Fits the 500-700 band.
- §5 voice.md additions: 1 (the two-paragraph §No AI tells intro from index.html).
- §6 index.html post-migration estimate: ~285 lines. Under the 400 ceiling.
- §7 open questions: 7.

Executor cannot run until KK rules Q1, Q2, Q4, and Q7. Q3, Q5, Q6 have recommended defaults inline; executor proceeds on default unless KK overrides.
