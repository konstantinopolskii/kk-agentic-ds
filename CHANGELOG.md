# Changelog

Every release names: what was added, what was removed, what moved. Consumers read this when bumping versions.

## 0.11.1 — 2026-04-22

Propagation patch. The integration-doc convention established in 0.11.0 now lives as system rule in the skills that would otherwise not know about it. Also captures one hardlink drift issue that surfaced during the 0.11.1 edits themselves.

### Added
- `kk-ds-maintainer` SKILL.md bundle rule gains item 7: integration doc at `docs/integration/<component>.md` required when a change touches a component's consumer-facing API. If the doc does not exist yet and the change creates the first public API for the component, the doc is created in the same PR.
- `kk-ds-maintainer` hidden failure modes gain two entries:
  - **Public API change without integration-doc update.** Events, config keys, and data attributes are public API; shipping them without updating the doc leaves consumers to read source.
  - **Hardlink drift between `skills/` and `.claude/skills/` after edits.** Some editors (Claude Code's Edit tool included) break hardlinks via atomic write-and-rename. Verify with `stat -f "%i %N"` on both paths; re-link with `rm + ln` if inodes diverge.
- `kk-role-frontend-engineer` SKILL.md DS-engineer mode gains a bullet: flag integration-doc impact when a refactor adds or changes a component's consumer-facing API. If the doc exists, update inline; if not and the change creates the first public API, propose creating it.
- `manifesto.md § Runtime` gains a general integration-docs paragraph under Comment lifecycle events, generalising from "here's the Comment doc" to "here's the convention, today only Comment qualifies".

### Moved
- `package.json` version `0.11.0` → `0.11.1`.
- One hardlink between `skills/kk-role-frontend-engineer/SKILL.md` and its `.claude/skills/` sibling went stale mid-session because the Edit tool rewrote via atomic rename. Re-linked before ship.

### Open
- Nothing carried.

## 0.11.0 — 2026-04-22

Third `kk:comment` action lands: `delete`. Every `.comment-msg` gets a stable `data-message-id` so deletes address messages by identity, not DOM position. New `docs/integration/comment.md` carries the full consumer-facing surface (the three actions, config, data attributes, three framework patterns, anti-patterns) — first file under the integration-docs convention, written while the API is fresh.

### Added
- `action: 'delete'` in the `kk:comment` event. Detail: `{ action, threadId, messageId, threadRemoved }`. `threadRemoved` is true when deleting the last message drops the whole thread card; consumer picks whether to delete the server-side thread too or just the one message.
- `data-message-id` on every `.comment-msg`. Kit stamps it at creation time; server-rendered pre-existing messages can set their own (server ids) and kit respects them.
- `ensureMessageId` helper inside `initCommentSelectionFlow`; one-time scan stamps any pre-rendered message missing an id.
- `messageId` field added to existing `action: 'new'` and `action: 'reply'` event payloads. Additive — consumers that did not destructure it keep working; consumers that need delete tracking now have the handle.
- `docs/integration/comment.md` — full integration doc for the comment component. Sections: enable-or-own decision, events (all three actions), data attributes, config, Flask + Next.js + Rails patterns, anti-patterns, per-component version history.
- Cross-link from `components.md` § Comment → `docs/integration/comment.md`.

### Moved
- Manifesto § Runtime → Comment lifecycle events updated to include the delete action, the `messageId` field on all three actions, and a pointer to the integration doc.
- `package.json` version `0.10.0` → `0.11.0`. Kit's `window.KK.version` bumped in lockstep.

### Open
- `action: 'resolve'` and an edit action. Neither has a real consumer request; deferred.

## 0.10.0 — 2026-04-22

Comment lifecycle events. Consumers that use `KK.enableCommentSelectionFlow()` and need to persist comments to a backend (Flask portal, Next.js API, Rails controller) now listen for `kk:comment` — a `CustomEvent` dispatched on `.comment-stack` — instead of re-implementing the selection flow or observing DOM mutations. Framework-neutral JS event shape (camelCase) keeps the universal consumer story clean; Python/Ruby/PHP backends rename on their POST body.

### Added
- `kk:comment` `CustomEvent` on `.comment-stack`, bubbles to `document`. Two actions in 0.10.0:
  - `action: 'new'` — draft committed, thread card created. Detail: `{ action, threadId, anchorQuote, anchorPrefix, anchorSuffix, cluster, sectionSlug, text }`.
  - `action: 'reply'` — message appended to an existing thread. Detail: `{ action, threadId, text }`.
- Anchor prefix/suffix capture in the selection flow. Pulls the ±20 chars around the first occurrence of the selected text inside the nearest `.doc__section` (falls back to the nearest paragraph-like parent). Feeds fuzzy re-anchoring on the consumer's server side; no numeric offsets, no hash fingerprints.
- `[data-cluster]` ancestor read at anchor time. Consumers annotate top-level sections with `data-cluster="strategy"` / `"call"` / `"research"` / etc., and kit reports it in the event. `null` if the attribute isn't set.
- `§ Runtime → Comment lifecycle events` in `manifesto.md`. Payload spec + a universal consumer snippet.

### Moved
- Kit ships `version: '0.10.0'` in its `window.KK` object as well as `package.json`, kept in lockstep.
- Selection flow's `captureAnchorContext()` helper is internal to `initCommentSelectionFlow`; not part of the public API surface, which stays at four entries (`init`, `refresh`, `enableCommentSelectionFlow`, `config`).

### Open
- `action: 'delete'` and `action: 'resolve'`. Both blocked on adding per-message stable ids inside kit (messages currently tracked by DOM position). Not in scope for 0.10.0; landed when a consumer needs them.

## 0.9.1 — 2026-04-22

Maintainer skill patch. Prompted by a real incident where four kit versions (0.6, 0.7, 0.8, 0.9) shipped to disk and to CHANGELOG but never reached origin because the maintainer skill did not mandate commit + tag + push explicitly. A sibling agent fetched the repo, saw v0.4.0, and flagged it.

### Added
- `Ship protocol` section in `skills/kk-ds-maintainer/SKILL.md`. Four mandatory steps: commit with explicit paths, annotated tag (`vX.Y.Z`), push main, push tag. Requires human OK before the push step. Naming-matches the existing `v0.2.0`–`v0.5.0` tag convention.
- Two new hidden failure modes in the maintainer skill: **Unshipped versions** (version bump without a pushed tag) and **Role skills under `.claude/skills/` instead of `skills/`** (local runtime cache vs canonical shipping path; hardlink from one into the other inside this repo).

### Moved
- `package.json` version `0.9.0` → `0.9.1`.

### Open
- Nothing carried.

## 0.9.0 — 2026-04-22

`KK.refresh()` is real now. Consumers that inject new DOM after the initial load (SPA-style swaps, lazy-loaded sections, route-driven content) call `KK.refresh()` to wire up new elements without teardown or a page reload. Closes the last open item from 0.7.0.

### Added
- Idempotent re-scan inside every auto-init module. Each module tracks whether its global listeners are bound; subsequent calls only pick up new iterable elements.
- Per-wrapper `data-kk-deck-bound="true"` marker on `.deck` elements. Bound wrappers skip re-init; new wrappers bind on `KK.refresh()`.
- `bound` state map inside kit.js covering scroll-spy, narrow-view toggle, column reveal, inspector stack, comment menus. Delegation-based modules (narrow-view, inspector stack, comment menus) already picked up new children for free; the sentinel prevents redundant listener re-attachment.
- Scroll-spy now queries `.doc__section` live on every callback, so SPA-added sections participate in the "first visible" calculation without a teardown. Nav links also live-queried so new links get `.is-active` state.

### Moved
- `KK.refresh()` from no-op stub to a real function that calls each auto-init in sequence. Safe to over-call. Bound elements are skipped; unbound elements get wired.
- Scroll-spy internal `sections` / `links` closures replaced with live queries at call sites. Small perf cost on every callback, acceptable given the call rate.
- `package.json` version: `0.8.0` → `0.9.0`.

### Open
- Nothing carried. Backlog is empty.

## 0.8.0 — 2026-04-22

Kit polish. Four baked-in English strings in `js/kit.js` move to overridable config. Doc-spec tables cap their first two columns at 30% each so prose-heavy value columns get room to breathe. Prototype-alpha's Russian deck labels come back — the 0.7.0 regression is resolved.

### Added
- `window.KK.config.i18n` — overridable text strings for kit.js-generated DOM. Four keys: `addComment`, `reply`, `deckChoose`, `deckChosen`. Defaults ship in English. Consumers set the object before loading `js/kit.js` to change them.
- `attrEscape` helper inside `kit.js` — minimal HTML-attribute escape used when injecting i18n strings into innerHTML placeholder contexts.
- Config override pattern documented in `manifesto.md § Runtime` with a Russian example.
- `prototype-alpha/index.html` now sets `KK.config.i18n` to Russian before loading kit.js.

### Removed
- Hardcoded strings `"Add a comment"`, `"Reply…"`, `"Choose"`, `"Chosen"` inside kit.js module bodies. All four read from `KK.config.i18n` now.

### Moved
- `.doc__spec` grid columns: `minmax(140px, max-content) 1fr` → `minmax(140px, 30%) 1fr`. Key column caps at 30%.
- `.doc__spec--value` grid columns: now `minmax(120px, 30%) minmax(60px, 30%) 1fr`. Key and middle-value each cap at 30%; prose gets the rest.
- `.doc__spec--triple` grid columns: `1fr 1fr 1fr` → `minmax(0, 30%) minmax(0, 30%) 1fr`. First two cap at 30%; third takes the remainder. Affects Claim/Reality/Resolution-style tables where the third column carries the prose.
- `package.json` version: `0.7.0` → `0.8.0`.

### Open
- **`KK.refresh()` still a stub.** Carried over from 0.7.0. SPA re-bind support remains a 0.9.0 concern.
- Deck's initial button text lives in consumer HTML, not config. If a consumer sets `deckChoose: 'Выбрать'` but writes `<button>Choose</button>` in the HTML, the first paint mismatches. Documented in manifesto; no code-level enforcement yet.

## 0.7.0 — 2026-04-22

Kit behaviour extracted. Seven JS modules that used to live inline in `index.html` now ship as a shared `js/kit.js`. Any consumer that loads the file gets scroll-spy, deck controller, card stack, column reveal, narrow-view toggle, and comment kebab menus for free. The selection-to-draft comment flow is opt-in via `KK.enableCommentSelectionFlow()` to avoid colliding with prototypes that own a localized selection handler. First pipeline-v2 run — analyst at stage 1, frontend engineer in DS-engineer mode at stage 8, reviewers at stage 10, no design phase.

### Added
- `js/kit.js` — 979 lines. Six auto-init modules (scroll-spy, narrow-view toggle, column reveal, inspector card stack, comment menus, deck) plus one opt-in module (selection-to-draft comment flow). Public API on `window.KK`: `init`, `refresh`, `enableCommentSelectionFlow`.
- `documentation/2026-04-22-kit-js-extraction/` — session artifacts. First session produced under pipeline-v2.
- `## Runtime` section in `manifesto.md` naming `js/kit.js` and the public API surface.
- `js/kit.js` reference in `index.html` across `#skill` (kit ships two ways), `#install` (package contents), and `#ownership` (kit files list).

### Removed
- Inline `<script>` block at the bottom of `index.html` (lines 3218-4306 in 0.6.0, ~1088 lines). Content moved verbatim to `js/kit.js` with one rename for clarity (`setActive` → `promoteCard` inside the inspector stack module).
- Duplicate deck controller in `prototype-alpha/app.js` (102 lines). Kit.js owns the deck; prototype-alpha trusts it.

### Moved
- `index.html` now loads `./js/kit.js` via `<script src>`. A second inline `<script>` calls `KK.enableCommentSelectionFlow()` so the manifesto page keeps its live comment demo.
- `prototype-alpha/index.html` loads `../js/kit.js` before `data.js` + `app.js`. No call to `enableCommentSelectionFlow` — the prototype owns its own Russian-labeled selection flow.
- `prototype-alpha/app.js` line count: 618 → 516.
- `index.html` line count: 4326 → 3243.
- `package.json` `files` array: added `js/` directory.
- `kk-role-frontend-engineer` SKILL.md: `../kit.js` → `../js/kit.js`. Added a note on when to call `KK.enableCommentSelectionFlow()`.

### Open
- **i18n config deferred to 0.8.0.** Three strings bake in English inside `js/kit.js`: `"Add a comment"` (draft placeholder), `"Choose"` / `"Chosen"` (deck button label swap), `"Reply…"` (thread reply placeholder). Prototypes that need other locales currently must either fork the kit (anti-pattern) or avoid the opt-in comment flow. 0.8.0 adds `KK.config.i18n` for these.
- **`KK.refresh()` is a stub.** SPA consumers that mount content after load need a re-query path. Real behaviour lands in 0.8.0.
- **One known regression:** `prototype-alpha` deck labels revert from Russian «Выбрать» / «Выбрано» to English "Choose" / "Chosen". Resolves when 0.8.0 ships i18n config.

## 0.6.0 — 2026-04-22

Pipeline overhaul. The five-stage pipeline (hypothesis, iteration, contrast, supervision, magic) is replaced by a ten-stage pipeline organised into three phases: think (stages 1-3), hand-off (stages 4-7), build (stages 8-10), plus an on-demand meta-retro. Nine new role skills ship. Documentation contract and revolutionary protocol formalised.

### Added
- `skills/kk-design-system/doc-format.md` — shared output contract for every role skill. Frontmatter spec, disk artifact body structure, conversation return shape, README template.
- Eleven new role skills under `skills/kk-role-*/`:
  - `kk-role-analyst` — stage 1. Decomposes the brief, produces job stories and open questions.
  - `kk-role-art-director` — stage 2. Produces five or more directions with intent and guardrails.
  - `kk-role-concept` — stage 3. Spawned 3-5 in parallel. ASCII flows, JSON component trees, shape-up framing.
  - `kk-role-designer-conservative` — stage 4. Strict kit inventory, no inventions.
  - `kk-role-designer-ux` — stage 5. Reorganises within kit rules, no inventions.
  - `kk-role-designer-revolutionary` — stage 6. May break rules with a matching `manifest-diff.md` entry.
  - `kk-role-ds-reviewer` — stage 7. Comparative review of three hand-offs, no ranking.
  - `kk-role-frontend-engineer` — stage 8. Ships prototype structure with placeholder copy comments.
  - `kk-role-ux-copywriter` — stage 9. Fills every placeholder, enforces voice consistency.
  - `kk-role-ux-copy-reviewer` — stage 10 (parallel). Voice, AI-tells, button discipline.
  - `kk-role-meta-retro` — on-demand. Reads session documentation, proposes canon updates.
- `documentation/2026-04-22-wealthy-alpha/` — twelve files from the alpha session that triggered the pipeline redesign. Reference material for every role skill.
- `prototype-alpha/` — the alpha build (renamed from `prototype/`) preserved as voice and content reference.
- `manifesto.md` § Pipeline — short section pointing at `pipeline.md`.
- `manifesto.md` § Documentation contract — short section pointing at `doc-format.md`.
- `manifesto.md` § Revolutionary protocol — short section with the diff shape.
- `index.html` mirrored sections: `#think`, `#handoff`, `#build`, `#meta-retro`, `#doc-contract`, `#revolutionary`. Sidebar Pipeline nav group updated to match.

### Removed
- `index.html` articles `#hypothesis`, `#iteration`, `#boost`, `#supervision`, `#implementation`, `#magic`. Content replaced by the three-phase structure.

### Moved
- `skills/kk-design-system/pipeline.md` rewritten end to end. Ten stages, three phases, gates, inputs, outputs, canon-load per role.
- `skills/kk-ds-supervisor/SKILL.md` frontmatter description: stage 4 supervisor becomes stage 10 consistency reviewer, also runs as stage 7 DS reviewer when invoked comparatively.
- `skills/kk-ds-frontend/SKILL.md` frontmatter description: stage 4 code pass becomes stage 10 frontend reviewer.
- `skills/kk-design-system/SKILL.md` frontmatter description: names the ten-stage pipeline and the nine role skills.
- `package.json` `files` array: added eleven `skills/kk-role-*/` entries plus `skills/kk-ds-maintainer/`.
- `prototype-alpha/index.html` font preload reference: `fonts/manrope/Manrope-Latin.woff2` → `fonts/commissioner/Commissioner-Latin.woff2`. Carryover from the 0.5.0 font swap.

### Open
- `kit.js` extraction is deferred to 0.7.0. The shared behavioural JS (scroll-spy, deck controller, card stack, comment menu, FABs, selection-to-highlight) still lives inline in `index.html` and is not reachable by prototypes. The next release dogfoods the new pipeline by running the extraction through `kk-role-analyst` plus `kk-role-frontend-engineer`.

## 0.5.0 — 2026-04-22

Typeface swap. Commissioner replaces Manrope. Both ship under SIL OFL 1.1, so this is a visual call, not a license fix. Commissioner's humanist letterforms read warmer at hero (66 px) and display (38 px) sizes than Manrope's grotesque, which suits the signed-deliverable tone of the kit.

### Added
- `fonts/commissioner/Commissioner-Latin.woff2` — weights 200–800, Latin + Western European script coverage.
- `fonts/commissioner/Commissioner-Cyrillic.woff2` — weights 200–800, Russian, Ukrainian, Belarusian, and allied scripts.
- `fonts/commissioner/OFL.txt` — SIL OFL 1.1 license for the Commissioner files.

### Removed
- `fonts/manrope/` — all Manrope `.woff2` files and the OFL license. Not purged from git history this time; the outgoing typeface was itself redistributable, so the binaries can stay in prior commits.

### Moved
- `--font-body` in `vars.css` and `type.family` in `tokens.json` now resolve to `Commissioner`. System fallbacks unchanged.
- `style.css` `@font-face` blocks point at `fonts/commissioner/*.woff2`; `index.html` preload points at the Latin subset.
- Typography rule in `manifesto.md` names Commissioner. Regular-on-Medium guidance carries over unchanged.
- `kk-design-system` skill `description` in `SKILL.md` frontmatter now reads "Commissioner typography" instead of "Manrope typography".
- Type credit in `index.html` now reads "Commissioner. A variable font (SIL OFL 1.1) by Kostas Bartsokas."

### Open
- Nothing carried over.

## 0.4.0 — 2026-04-21

Typeface swap. PP Neue Montreal was never licensed for redistribution inside an npm package — Pangram Pangram's EULA §3.7 prohibits distributing copies or uploading the font publicly. The kit now ships Manrope, a variable font under SIL OFL 1.1.

### Added
- `fonts/manrope/Manrope-Latin.woff2` — weights 200–800, Latin + Western European script coverage.
- `fonts/manrope/Manrope-Cyrillic.woff2` — weights 200–800, Russian, Ukrainian, Belarusian, and allied scripts.
- `fonts/manrope/OFL.txt` — SIL OFL 1.1 license for the Manrope files.
- Single `<link rel="preload">` in `index.html` pointing at the Latin subset; Cyrillic lazy-loads via `unicode-range`.

### Removed
- `fonts/montreal/` and every PP Neue Montreal `.woff` / `.woff2` binary. Purged from the entire git history with `git filter-repo --path fonts/ --invert-paths`; all prior commits and tags rewritten. Old commit SHAs are dead.
- The legacy `.woff` fallback. Manrope ships `.woff2` only — evergreen browsers cover it, IE11 is not a support floor.

### Moved
- `--font-body` in `vars.css` and `type.family` in `tokens.json` now resolve to `Manrope`, falling back to the system stack.
- `style.css` `@font-face` blocks collapsed from three weight-specific declarations to two subset-specific declarations. Variable-weight axis (`font-weight: 200 800`) covers the full range per subset.
- Typography rule in `manifesto.md` names Manrope and explains why the 400 axis is still skipped at body size.
- `kk-design-system` skill `description` (in `SKILL.md` frontmatter) now reads "Manrope typography" instead of "PP Neue Montreal". The skill `homepage` field updated to the real repo URL.

### Open
- Nothing carried over. Backlog is empty.

## 0.3.1 — 2026-04-21

Resolves the mobile padding drift open item from 0.3.0.

### Fixed
- Phone columns now fill the viewport. The 0.3.0 phone grid `.app { grid-template-columns: 1fr }` was losing the cascade to the tablet rule `.app[data-view="nav"] { grid-template-columns: minmax(220px, var(--sidebar-w)) 1fr }` on specificity (0,1,0 vs 0,2,0), so sidebar stayed pinned at 260 px even at 392 px viewport. Phone selector raised to `.app[data-view]` to tie on specificity and win on source order.
- Inspector goes flush on phone. Zero horizontal column padding so shout cards own the full viewport width; card-internal `--card-inset-x` (12 px) is the only horizontal rhythm.
- Doc and nav move to a 24 px rail on phone (`--space-6`, up from 16 px).
- Nav-group dividers run edge-to-edge on phone. `left: 0; right: 0;` override for `.nav-group::after`.
- Doc intro sits snug against the top of the column on phones. `.doc__intro { padding-top: 0 }`.

### Added
- `viewport-fit=cover` on the meta viewport so iOS safe areas are reported; pages can draw under the status bar and home indicator.
- `html, body { width: 100% }` in the base reset (defensive).

### Moved
- `homepage` in `package.json` and `.claude-plugin/plugin.json` updated from the placeholder `github.com/kk-consulting/kk-design-system` to the actual repo `github.com/konstantinopolskii/kk-agentic-ds`. Added a `repository` field to `package.json` so `npm` can resolve the git install.

## 0.3.0 — 2026-04-21

### Added
- Global `::selection` rule in `style.css`. Selection renders inverted using `--color-text` on `--color-bg`. No native blue, no custom color. Documented as a color foundation in `manifesto.md`.
- `Dismiss` row under `#states` in `index.html`. Clicking empty space inside the inspector collapses whatever is active.

### Fixed
- 3D card stack on mobile. Tap handlers now scope per card; the runtime overlay that swallowed every touch is gone.
- Comment selection. The native range re-anchors onto the freshly-wrapped `.highlight` spans, so `⌘/Ctrl+C` copies the marked text again.
- Inspector glide scroll when a draft dismisses mid-promotion. `setActive` defers its layout measurement one frame so the `MutationObserver` that removes an empty draft flushes before `cardRect.top` is read.
- Tablet column resize across 1025–1440 px. `.app` grid-template-columns uses clamp-based widths, so sidebar and inspector shrink smoothly with the viewport instead of gluing to their max until the tablet breakpoint. `#columns` spec table updated.

### Moved
- `clearDomSelection` helper removed from `index.html`. Unused after the selection-preserving rewrite.

### Open
- Mobile padding drift logged in `#backlog` with specifics: phone `.doc` rail is 16 px, `.inspector` rail is 8 px. Unify or justify — pending review.

## 0.2.0 — 2026-04-21

### Added
- Frontend sub-skill `kk-ds-frontend` in `skills/kk-ds-frontend/` — stage 4 code pass. Rewrites the stage-three draft for semantics, accessibility, JS simplicity, mobile behavior, and cross-browser safety. Visual is frozen; kit classes, tokens, and layout structure stay untouched. Runs before `kk-ds-supervisor`.
- `#implementation` section in `index.html` describing the new stage-4 role.

### Moved
- Stage 4 in `pipeline.md` expanded into two sub-stages: `4a` frontend rewrite, `4b` supervisor audit. Supervisor behavior and output shape unchanged.
- `#stack` card in `index.html` now lists three skills. Supervisor entry narrowed to "stage 4, audit".
- Step 4 row in the `#pipeline` overview card names both roles.

## 0.1.0 — 2026-04-21

### Added
- npm package `@kk/design-system` shipping `vars.css`, `style.css`, `fonts/`, `signature.svg`.
- Claude skill `kk-design-system` in `skills/kk-design-system/` — SKILL.md, tokens.json, manifesto.md, pipeline.md, components.md, voice.md, patterns/strategy-doc.md.
- Supervisor sub-skill `kk-ds-supervisor` in `skills/kk-ds-supervisor/` — stage 4 audit.
- Claude Code plugin manifest at `.claude-plugin/plugin.json`.
- Postinstall symlinks `skills/` into consumer's `.claude/skills/`.

### Removed
- Old copy-files install instructions from the documentation.
