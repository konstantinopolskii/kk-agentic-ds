---
session: 2026-04-24-content-architecture
stage: 4
role: ds-manager
input: 02-design-director.md + 03b-designer-{manifesto,patterns,components,protocols,index-hallway}.md
output: per-block component map + build-order task split + kit-demo references + inventory check
gate: pending — stage 5 runs next
---

Stage 4 catalogues the five designer hand-offs plus the css-dedupe block (no 03b on disk). Every class referenced across the six blocks resolves to `skills/kk-design-system/manifesto.md § Components`. Flags surfaced, not suppressed. Build-order task split written for stage 5 in the order the design engineer ticks them off.

## Per-block component map

### Block 1 — manifesto

Source: `03b-designer-manifesto.md § Component list` + §Example content.

| Class | Variant / attribute | Count | Kit-demo anchor | Notes |
|---|---|---|---|---|
| `.book` | wrapper | 1 | n/a (shell-level wrapper) | Renamed from `.doc` in block 6. Carries every Tier-2 adjacency rule. |
| `.t-hero` | — | 1 | `fundamental--accepted/index.html#type` | `#` heading. |
| `.t-display` | — | 9 | `#type` | One per `##`. |
| `.t-title` | — | 6 | `#type` | Six `###` under §Principles. |
| `.t-body` | — | ~30 | `#type` | Default paragraph rank. |
| `.t-caption` | — | 4 | `#type` | Signoff stats + signature prose. |
| `.t-caption--bold` | variant | 5 | `#type` | Emphasized caption. |
| `.t-micro` | — | 0 reserved | `#type` | Not required in this draft. |
| `.t-muted` | — | 1 | `#color` | Signoff timestamp only (metadata). |
| `.t-list` | — | 4 | `#lists` | `<ul>` / `<ol>` in §Why / §Agents / §Navigation. |
| `.book__signoff` | — | 1 | `#signoff` | Renamed from `.doc__signoff`. |
| `.book__signoff-stats` | — | 1 | `#signoff` | Renamed. |
| `.book__signoff-signature` | — | 1 | `#signoff` | Renamed. |
| `.book__signoff-signature-img` | — | 1 | `#signoff` | Renamed. |
| `.stat` | — | 2 | `#signoff` | Stats children inside signoff. |

All 15 classes resolve. No flags.

### Block 2 — patterns

Source: `03b-designer-patterns.md § Component list` + §Example content.

| Class | Variant / attribute | Count | Kit-demo anchor | Notes |
|---|---|---|---|---|
| `.book` | wrapper | 1 | — | Renamed from `.doc`. |
| `.book__signoff` | — | 1 | `#signoff` | Tail of the book. |
| `.app` | `data-view="doc"` | 2 | `#opening` (shell) | Three-columns shell root, used in two snippets (three-columns, narrow). |
| `.sidebar` | — | 2 | `#opening` | Left column. |
| `.sidebar--collapsed` | narrow-mobile state | 1 | `#opening` | Narrow variant. |
| `.sidebar__nav` | — | 1 | `#opening` | TOC host. |
| `.inspector` | — | 2 | `#opening` | Right column. |
| `.inspector--modal` | narrow-mobile state | 1 | `#opening` | Slide-over. |
| `.preview-frame` | — | (referenced in prose) | `#figures` | No dedicated anchor — flag below. |
| `.preview-frame__iframe` | — | 0 rendered | `#figures` | No dedicated anchor — flag. |
| `.registry-table` | — | 1 | `#lists` (parent) | No dedicated anchor — flag. |
| `.card` | — | 2 | `#cards` | Used in card-stack snippet. |
| `.card--interactive` | variant | 2 | `#cards` | — |
| `.card--selectable` | variant | 2 | `#cards` | — |
| `.card__heading` | — | 2 | `#cards` | — |
| `.card__body` | — | 1 | `#cards` | — |
| `.card-stack` | — | 1 | `#stack` | Vertical wrapper. |
| `.button` | — | 1 | `#buttons` | — |
| `.button--icon` | variant | 1 | `#buttons` | Narrow hamburger. |
| `.t-hero` | — | 1 | `#type` | Book title. |
| `.t-display` | — | 4 | `#type` | Section heads. |
| `.t-title` | — | 2 | `#type` | Card titles inside stack snippet. |
| `.t-body` | — | 22 | `#type` | Registry rows. |
| `.t-caption` | — | 4 | `#type` | Table headers + card captions. |
| `.t-mono` | — | 11 | `#type` | Pattern-name column in registry. |

All classes resolve. Two flags carried forward to block 6 / stage 5:
- **Flag P1.** Preview-frame, preview-frame__iframe, registry-table have no dedicated anchors in the fundamental demo — deep links resolve to nearest parent (`#figures`, `#lists`).
- **Flag P2 (stage-3 flag).** Three-columns slug mismatch: direction doc writes `three-columns.html`, disk carries `three-column-shell.html`. Designer drafted around the disk name. Stage 5 picks one and applies it consistently (recommend keeping disk name; rename the direction doc pointer).
- **Flag P3 (stage-3 flag).** `demos/fundamental--accepted/patterns/narrow.html` does not exist on disk. Designer drafted a deep link to it. Stage 5 must create the slice or the deep link 404s.

### Block 3 — components

Source: `03b-designer-components.md § Component list` + §Example content.

| Class | Variant / attribute | Count | Kit-demo anchor | Notes |
|---|---|---|---|---|
| `.book`, `.book__part`, `.book__section`, `.book__intro` | wrappers | n | n/a | Renamed from `.doc__*`. Mechanical rename per block 6. |
| `.book__spec` | — | 3 | `#lists` (parent) | No dedicated `#spec-list` anchor — flag. |
| `.book__spec-row`, `.book__spec-key`, `.book__spec-value` | — | 3 each | `#lists` | — |
| `.book__spec--value` | variant | 1 | `#lists` | — |
| `.book__spec--triple` | variant | 1 | `#lists` | — |
| `.book__signoff` + `-stats` + `-signature` + `-signature-img` | — | 1 each | `#signoff` | Renamed. |
| `.card` | — | 3 | `#cards` | Static / interactive / shout. |
| `.card--interactive` | variant | 2 | `#cards` | — |
| `.card--shout` | variant | 2 | `#cards` | — |
| `.card--selectable` | variant | — | `#cards` | Referenced in preview-frame rules. |
| `.card__heading` | — | 7 | `#cards` | — |
| `.card__collapsible` / `.card__collapsible-inner` | — | 2 each | `#cards` | — |
| `.field`, `.field--row`, `.field__label`, `.field__input`, `.field__fake-caret` | — | 2 / 1 / 1 / 2 / 1 | `#fields` | — |
| `.button` | — | 6 | `#buttons` | Across card, comment, signoff snippets. |
| `.button--primary` | variant | 3 | `#buttons` | — |
| `.tag` | — | 3 | `#tags` | — |
| `.tag--bold` | variant | 1 | `#tags` | — |
| `.switch`, `.switch__input`, `.switch__track`, `.switch__thumb`, `.switch__label` | — | 1 each | `#switches` | — |
| `.comment-new` | — | 1 | `#stack` (parent) | No dedicated `#comment` anchor — flag. |
| `.comment-thread` | — | 1 | `#stack` | — |
| `.comment-msg` | `data-message-id`, `data-author-role` | 2 | `#stack` | — |
| `.comment__menu` | — | 1 | `#stack` | — |
| `.sidebar`, `.sidebar__nav`, `.sidebar__footer` | — | 1 each | `#opening` | No dedicated `#navigation` anchor — flag. |
| `.nav-group`, `.nav-group__items` | — | 1 each | `#opening` | — |
| `.toc__indicator` | — | 1 | `#opening` | — |
| `.inspector`, `.app` | — | referenced | `#opening` | — |
| `.stat` | — | 2 | `#signoff` | — |
| `.t-hero`, `.t-display`, `.t-display--medium`, `.t-body`, `.t-title`, `.t-subtitle`, `.t-caption`, `.t-caption--bold`, `.t-micro`, `.t-mono`, `.t-muted`, `.t-subtle`, `.t-list` | — | many | `#type` | Full typography utility registry. |
| `.preview-frame`, `.preview-frame__iframe` | — | 1 each | `#figures` (parent) | No dedicated `#preview-frame` anchor — flag. |
| `.registry-table` | — | 3 (component registry, typography registry, variants) | `#lists` (parent) | No dedicated `#registry-table` anchor — flag. |

All classes resolve. Flags (all anchor-level, not class-level):
- **Flag C1.** Missing `#material` anchor in fundamental demo (Material subsection → falls back to `#color`).
- **Flag C2.** Missing `#radii` anchor (falls back to `#cards`).
- **Flag C3.** Missing `#comment` anchor (falls back to `#stack`).
- **Flag C4.** Missing `#navigation` anchor (falls back to `#opening`).
- **Flag C5.** Missing `#preview-frame` anchor (falls back to `#figures`).
- **Flag C6.** Missing `#registry-table` anchor (falls back to `#lists`).
- **Flag C7.** Missing `#spec-list` anchor (falls back to `#lists`).

Seven missing anchors. Stage 5 adds them to `demos/fundamental--accepted/index.html`.

### Block 4 — protocols

Source: `03b-designer-protocols.md § Kit inventory check` + §Example content.

| Class | Variant / attribute | Count | Kit-demo anchor | Notes |
|---|---|---|---|---|
| `.book` | wrapper | 1 | — | Renamed. |
| `.t-hero` | — | 1 | `#type` | Book title. |
| `.t-display` | — | 6 | `#type` | One per section. |
| `.t-title` | — | — | `#type` | Reserved for `###` sub-heads (Axes, Push steps, Ideation entry). |
| `.t-body` | — | many | `#type` | Paragraphs. |
| `.t-caption` | — | — | `#type` | Reserved. |
| `.t-micro` | — | — | `#type` | Reserved. |
| `.t-list` | — | 6 (ordered) | `#lists` | Ship 1–6, bundle 1–7, semver 1–4, evolve 1–5, ideation bullets. |
| `.t-mono` | — | multiple | `#type` | Inline git commands + paths. |

All classes resolve. No flags. Protocols is prose + lists only — no widget classes.

### Block 5 — index-hallway

Source: `03b-designer-index-hallway.md § Component list` + §Example content.

| Class | Variant / attribute | Count | Kit-demo anchor | Notes |
|---|---|---|---|---|
| `.app` | `data-view="doc"` | 1 | `#opening` | Three-columns shell root. |
| `.sidebar`, `.sidebar__header`, `.sidebar__nav`, `.sidebar__footer` | — | 1 each | `#opening` | Left column. |
| `.toc__indicator` | — | 1 | `#opening` | Scroll-spy. |
| `.nav-group`, `.nav-group__items` | — | 4 each | `#opening` | Four groups: Meanings, Principles, Agents, Navigation. |
| `.book` | wrapper | 1 | — | Middle column; `data-md-src`. Renamed from `.doc`. |
| `.book__section` | — | N (one per `##`) | — | Renamed from `.doc__section`. Emitted by post-render hook. |
| `.inspector`, `.inspector__group` | — | 1 / 2 | `#opening` | Right column with canon + demos groups. |
| `.card` | — | 10 | `#cards` | Two headings + eight interactive pointers. |
| `.card--heading` | variant | 2 | `#cards` | Group headings. |
| `.card--interactive` | variant | 8 | `#cards` | Pointer cards (canon + demos). |
| `.card__heading` | — | 8 | `#cards` | — |
| `.button` | — | 8 | `#buttons` | Span-rendered CTA inside each pointer card. |
| `.fab`, `.fab--nav`, `.fab--inspector`, `.fab__count` | — | 2 / 1 / 1 / 1 | — | Narrow-mobile FABs — no dedicated demo anchor. |
| `.t-hero`, `.t-display`, `.t-title`, `.t-subtitle`, `.t-caption` | — | 0 / 2 / 9 / 12 / 13 | `#type` | `t-hero` inherited from rendered manifesto. |

All classes resolve. Flags:
- **Flag I1.** `.fab` + variants have no dedicated anchor in the fundamental demo. Present in kit CSS; no demo surface. Acceptable — FABs only render below 1024 px and the fundamental demo renders at desktop.
- **Flag I2.** `id="doc"` on the `<main class="book">` element. JS contract in `kit.js § initScrollSpy` + `initCommentSelectionFlow` queries `#doc`. Element class renames to `.book`; element id remains `doc` until kit.js relaxes the selector in the same bundle. Stage 5 owns the kit.js update as part of the `.doc` → `.book` rename commit.
- **Flag I3.** `card card--interactive` used as `<a>` anchor — `kit.js § handleTrigger` calls `promoteCard()` on click; the page unloads before the promotion matters. No blocker; micro-polish candidate (`data-nav="true"` suppression).

### Block 6 — css-dedupe + `.doc` → `.book` rename

No 03b on disk. Source: `02-design-director.md § Pattern blocks § 6` + §`.book` rename reasoning.

Rename inventory (every class below renames in lockstep, one commit):

| Class | Variant / attribute | Count | Kit-demo anchor | Notes |
|---|---|---|---|---|
| `.doc` → `.book` | wrapper | ~every rendered region | n/a | Class-level rename. |
| `.doc__part` → `.book__part` | — | all occurrences | n/a | BEM rename. |
| `.doc__section` → `.book__section` | — | all occurrences | n/a | BEM rename. Article wrappers. |
| `.doc__spec` → `.book__spec` | — | all occurrences | n/a | Spec list root. |
| `.doc__spec-row` → `.book__spec-row` | — | all occurrences | n/a | Spec row. |
| `.doc__spec-key` → `.book__spec-key` | — | all occurrences | n/a | Spec key. |
| `.doc__spec-value` → `.book__spec-value` | — | all occurrences | n/a | Spec value. |
| `.doc__spec--value`, `.doc__spec--triple` → `.book__spec--value`, `.book__spec--triple` | variants | all | n/a | Variants. |
| `.doc__signoff` → `.book__signoff` | — | all | `#signoff` | Signoff root. |
| `.doc__signoff-stats` → `.book__signoff-stats` | — | all | `#signoff` | — |
| `.doc__signoff-signature` → `.book__signoff-signature` | — | all | `#signoff` | — |
| `.doc__signoff-signature-img` → `.book__signoff-signature-img` | — | all | `#signoff` | — |
| `.doc__intro` → `.book__intro` | — | all | n/a | Intro block. |

Tier-1 widget classes (unchanged, unscoped): `.button`, `.card`, `.field`, `.tag`, `.switch`, every `.t-*` utility class.

Tier-2 adjacency rules (scope to `.book`, delete unscoped twins): sibling selectors (`h2 + p`, `p:has(+ ul)`, `p:has(+ ol)`), heading-to-paragraph spacing rules, quote treatment, list-item spacing rules, label-list tightening, next-sibling margin collapse.

No flags. Mechanical rename.

## Build-order task split

Seventeen tasks. Stage 5 ticks each off in order. Every task has one concrete artefact.

1. **Revert markdown-as-source content commits** on the `main` branch (replay-clean path per analyst lock). Keep renderer commits (`js/md.js`, `demos/md-renderer-smoke/`). Git reset-to-commit target: last good pre-1.3.0 content state, rebase renderer commits on top.
2. **Create canon + pipeline subfolders** under `skills/kk-design-system/`: `canon/` and `pipeline/`. Empty directories with a `.gitkeep` until files land.
3. **`.doc` → `.book` rename pass** across the whole repo in one commit. Targets: `style.css`, `vars.css`, `js/md.js`, `js/kit.js`, every `.html` under repo root + `demos/`, every `.md` inside `skills/` and `docs/` where code fences carry `.doc*` class strings, every skill `SKILL.md` that names the wrapper. Also relax `#doc` id selector in `kit.js § initScrollSpy` + `initCommentSelectionFlow` to query `.book` class first, fall back to `#doc` if the id survives. Ship as one atomic commit.
4. **Write the thinned `manifesto.md`** from `03b-designer-manifesto.md § Example content`. Target ~200 lines. Copy the draft verbatim, including the signoff block. Delete the existing 685-line file first, replace with the draft.
5. **Write `canon/components.md`** from `03b-designer-components.md § Example content`. Copy verbatim. Includes foundations (Material / Color / Type / Space / Radii / Motion), typography rhythm ("inner and outer theory", no attribution), typography utility registry, component sections (Card / Field / Button / Tag / Switch / Comment / Navigation / Signoff / Spec list / List), kit-doc primitives (Preview frame / Registry table), forbidden close.
6. **Write `canon/patterns.md`** from `03b-designer-patterns.md § Example content`. Copy verbatim. Three top-level patterns (Three columns / Card stack / Narrow mobile) + 11-row registry table. Resolve three-columns slug to `three-column-shell.html` (the on-disk name).
7. **Write `pipeline/protocols.md`** from `03b-designer-protocols.md § Example content`. Copy verbatim. Ship discipline / Bundle rule / Semver / Evolve / Backlog / Ideation sections.
8. **Fold `doc-format.md` into `pipeline/pipeline.md § Documentation contract`**. Read `doc-format.md` in full; append as a new top-level section inside `pipeline/pipeline.md`. Delete the source `doc-format.md` file.
9. **Move `skills/kk-design-system/patterns/strategy-doc.md` out of the kit canon folder.** Interim location: create `proposals/strategy-doc-interim.md` and move the file there with a one-line header naming final destination (future strategy prototype under `demos/`). Update any skill `SKILL.md` reference that points at the old path.
10. **Delete root `patterns.html`.** Its 11 patterns now live inside `canon/patterns.md § Registry of additional patterns`. Verify no HTML in the repo still hrefs `patterns.html` before deleting.
11. **Rewrite `index.html` at repo root** from `03b-designer-index-hallway.md § Example content`. Copy verbatim — three-column shell, sidebar nav groups, `.book` middle with `data-md-src="./skills/kk-design-system/manifesto.md"`, inspector with two `.inspector__group` (canon + demos), post-render hook script, two FABs. 237 lines.
12. **Create `demos/fundamental--accepted/patterns/narrow.html`** (stage-3 flag P3). Slice the narrow-mobile pattern snippet from `canon/patterns.md § Narrow mobile` into a standalone preview page matching the shape of `three-column-shell.html`.
13. **Add missing anchors to `demos/fundamental--accepted/index.html`.** Add id anchors on the existing `<article class="book__section">` elements (or create new ones) for `#material`, `#radii`, `#comment`, `#preview-frame`, `#registry-table`, `#navigation`, `#spec-list`. Seven anchors. Resolves flags C1–C7.
14. **Audit `style.css`.** Scope every Tier-2 adjacency rule under `.book`. Delete unscoped twins. Keep Tier-1 widget and `.t-*` utility class styles unscoped. Sibling selectors (`+`, `~`, `:has(+ ...)`) all sit inside `.book`. Spot-check: quote treatment, label-list tightening, heading-to-paragraph spacing, next-sibling margin collapse, list-item spacing all scoped.
15. **Update every skill `SKILL.md`** that references the changed paths. Search targets: `skills/kk-design-system/components.md`, `skills/kk-design-system/patterns`, `doc-format.md`, `strategy-doc.md`, `.doc` / `.doc__*` in class strings, `patterns.html`. Update each hit to the new canonical path.
16. **Update `CHANGELOG.md`** with a `1.3.0` entry. Shape: Added (canon folder, pipeline folder, protocols.md, hallway index.html shell) / Removed (root patterns.html, doc-format.md, `.doc` class namespace) / Moved (components to canon/components.md, patterns to canon/patterns.md, strategy-doc out of kit). Lead with the breaking rename.
17. **Bump `package.json` and `.claude-plugin/plugin.json` to 1.3.0** in lockstep. Semver axis: major (class rename is a breaking change for consumers). Version reused from unshipped 1.3.0 per analyst lock — the unshipped 1.3.0 commits landed with no tag, so first tag on the new architecture ships as `v1.3.0`.

After task 17, the maintainer follows `pipeline/protocols.md § Semver § Push steps` (commit → annotated tag → push main → push tag). Ship-check: `git status -sb` clean on a pushed tag.

## Kit-demo references

Every deep link across the five 03b docs, with source + target + disk resolution. Flagged rows name the missing target.

| Source doc | Link text | Target path | On disk? |
|---|---|---|---|
| 03b-manifesto | `.book` wrapper render | (no deep link) | n/a |
| 03b-patterns | Three columns preview | `demos/fundamental--accepted/patterns/three-column-shell.html` | yes |
| 03b-patterns | Card stack preview | `demos/fundamental--accepted/patterns/card-stack.html` | yes |
| 03b-patterns | Narrow mobile preview | `demos/fundamental--accepted/patterns/narrow.html` | **flag P3 — missing; stage 5 creates** |
| 03b-patterns (registry) | three-column-shell | `demos/fundamental--accepted/patterns/three-column-shell.html` | yes |
| 03b-patterns (registry) | card-stack | `demos/fundamental--accepted/patterns/card-stack.html` | yes |
| 03b-patterns (registry) | sidebar-nav | `demos/fundamental--accepted/patterns/sidebar-nav.html` | yes |
| 03b-patterns (registry) | doc-section | `demos/fundamental--accepted/patterns/doc-section.html` | yes |
| 03b-patterns (registry) | spec-list | `demos/fundamental--accepted/patterns/spec-list.html` | yes |
| 03b-patterns (registry) | deck-in-shout | `demos/fundamental--accepted/patterns/deck-in-shout.html` | yes |
| 03b-patterns (registry) | inspector-group | `demos/fundamental--accepted/patterns/inspector-group.html` | yes |
| 03b-patterns (registry) | comment-thread | `demos/fundamental--accepted/patterns/comment-thread.html` | yes |
| 03b-patterns (registry) | comment-thread-resolved | `demos/fundamental--accepted/patterns/comment-thread-resolved.html` | yes |
| 03b-patterns (registry) | comments-group | `demos/fundamental--accepted/patterns/comments-group.html` | yes |
| 03b-patterns (registry) | signoff | `demos/fundamental--accepted/patterns/signoff.html` | yes |
| 03b-components | Material | `demos/fundamental--accepted/index.html#color` | anchor — no `#material` (**flag C1**) |
| 03b-components | Color | `demos/fundamental--accepted/index.html#color` | yes |
| 03b-components | Type | `demos/fundamental--accepted/index.html#type` | yes |
| 03b-components | Space | `demos/fundamental--accepted/index.html#space` | yes |
| 03b-components | Radii | `demos/fundamental--accepted/index.html#cards` | anchor — no `#radii` (**flag C2**) |
| 03b-components | Motion | `demos/fundamental--accepted/index.html#motion` | yes |
| 03b-components | Typography utility classes | `demos/fundamental--accepted/index.html#type` | yes |
| 03b-components | Card | `demos/fundamental--accepted/index.html#cards` | yes |
| 03b-components | Field | `demos/fundamental--accepted/index.html#fields` | yes |
| 03b-components | Button | `demos/fundamental--accepted/index.html#buttons` | yes |
| 03b-components | Tag | `demos/fundamental--accepted/index.html#tags` | yes |
| 03b-components | Switch | `demos/fundamental--accepted/index.html#switches` | yes |
| 03b-components | Comment | `demos/fundamental--accepted/index.html#stack` | anchor — no `#comment` (**flag C3**) |
| 03b-components | Navigation | `demos/fundamental--accepted/index.html#opening` | anchor — no `#navigation` (**flag C4**) |
| 03b-components | Signoff | `demos/fundamental--accepted/index.html#signoff` | yes |
| 03b-components | Spec list | `demos/fundamental--accepted/index.html#lists` | anchor — no `#spec-list` (**flag C7**) |
| 03b-components | List | `demos/fundamental--accepted/index.html#lists` | yes |
| 03b-components | Preview frame | `demos/fundamental--accepted/index.html#figures` | anchor — no `#preview-frame` (**flag C5**) |
| 03b-components | Registry table | `demos/fundamental--accepted/index.html#lists` | anchor — no `#registry-table` (**flag C6**) |
| 03b-components runtime | `docs/integration/comment.md` | `docs/integration/comment.md` | yes |
| 03b-components forbidden | `pipeline/protocols.md § Evolve` | `skills/kk-design-system/pipeline/protocols.md` | **pending — written at task 7** |
| 03b-protocols | (no demo deep links) | — | n/a |
| 03b-index-hallway | Patterns pointer | `./skills/kk-design-system/canon/patterns.md` | **pending — written at task 6** |
| 03b-index-hallway | Components pointer | `./skills/kk-design-system/canon/components.md` | **pending — written at task 5** |
| 03b-index-hallway | Voice pointer | `./skills/kk-design-system/canon/voice.md` | **pending — move from current location** |
| 03b-index-hallway | Pipeline pointer | `./skills/kk-design-system/pipeline/pipeline.md` | **pending — fold at task 8** |
| 03b-index-hallway | Protocols pointer | `./skills/kk-design-system/pipeline/protocols.md` | **pending — written at task 7** |
| 03b-index-hallway | Tokens pointer | `./skills/kk-design-system/tokens.json` | yes |
| 03b-index-hallway | Fundamental demo | `./demos/fundamental--accepted/index.html` | yes |
| 03b-index-hallway | Renderer smoke | `./demos/md-renderer-smoke/index.html` | yes |

Total deep links: 44. Flagged: 8 (1 missing pattern preview + 7 missing anchors). Six pointers read "pending" because they land after their own task writes them — normal stage-5 ordering, not a flag.

**Missing voice.md location.** `canon/voice.md` is referenced by the index-hallway inspector and by `03b-components.md` but the analyst lock does not spell out the move. It exists today at `skills/kk-design-system/voice.md`. Task 2 creates `canon/`; an implicit 17a task moves `voice.md` into it as part of the canon migration. Stage 5 carries this as a sub-step of task 2.

## Inventory check

**Verdict: pass with seven anchor flags + one pattern slice flag + one slug flag.**

Every class across all six blocks resolves to `manifesto.md § Components`. No off-inventory classes. No new tokens proposed. No new components introduced. `.book` and `.book__*` are the stage-2 locked rename from `.doc` and `.doc__*`; the rename is mechanical and scoped to block 6.

Flags the design engineer must resolve before the build ships:
- **P2 (slug).** Direction doc wrote `three-columns.html`; disk has `three-column-shell.html`. Task 6 uses the on-disk name; the designer already did. No further action.
- **P3 (missing slice).** `demos/fundamental--accepted/patterns/narrow.html` does not exist. Task 12 creates it.
- **C1–C7 (missing anchors).** Seven anchors missing in `fundamental--accepted/index.html`: `#material`, `#radii`, `#comment`, `#navigation`, `#spec-list`, `#preview-frame`, `#registry-table`. Task 13 adds them.
- **I2 (kit.js selector).** `#doc` id selector in `kit.js § initScrollSpy` + `initCommentSelectionFlow`. Task 3 relaxes the selector in the same rename commit.

Named user-approved exceptions per the direction doc's §Exceptions — none. No new components, no new tokens, no voice exceptions. Still none.

## Gate

Pending stage 5 execution. All flags above are actionable tasks in the build-order split; nothing blocks the handoff.

## Hand-off

Stage 5, `kk-role-design-engineer`. Character: Sara Soueidan — ships piece by piece, saves each piece as landed.

Input:
- This file (`04-ds-manager.md`).
- All five 03b hand-offs (`03b-designer-manifesto.md`, `03b-designer-patterns.md`, `03b-designer-components.md`, `03b-designer-protocols.md`, `03b-designer-index-hallway.md`).
- Direction doc (`02-design-director.md`).
- Analyst gate (`01-analyst.md`) for replay-clean and semver locks.

Expected stage 5 output: seventeen tickable tasks shipped in order, a clean working tree on a pushed `v1.3.0` annotated tag, `CHANGELOG.md` + `package.json` + `.claude-plugin/plugin.json` all in lockstep, every flagged anchor resolved.
