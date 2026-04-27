# Changelog

Every release names: what was added, what was removed, what moved. Consumers read this when bumping versions.

## 1.9.0, 2026-04-26

Minor. Sibling pipeline. The kit now hosts two pipelines instead of one — `kk-design-system` (existing, ships UI prototypes) and `kk-charter-system` (new, ships per-direction strategic charters). Same eight-stage shape, same gating discipline, same kit canon. Five roles share between them; four new role skills are charter-pipeline-only.

The new pipeline runs against KK's strategic-document workflow (charter rebuild for direction-level work). Same flywheel as the design pipeline: brief enters, named roles each operate on an artefact, gates check rubric, the result ships when meta-reviewer accepts. Outputs target a project's `outputs/` folder; canonical paths only with operator stamp.

The `kk-design-system` pipeline is unchanged. Existing consumers see no breaking changes — same canon paths, same eleven role skills, same release-dispatch shape. The kit's manifesto and pipeline doc now carry the expanded roster (single table, new `Pipeline` column reading `kk-ds`, `kk-charter`, or `both`) so the cross-pipeline reuse is legible at a glance.

### Added
- `skills/kk-charter-system/` — orchestrator (`SKILL.md` + `manifesto.md` + `pipeline.md`). The charter pipeline definition: when to invoke, eight stages, role mapping, gate criteria, return routing.
- `skills/kk-role-charter-director/` — Stage 2. Tina Brown. Picks the direction list and writes the direction map; the strategic editorial decision before any per-direction charter is written.
- `skills/kk-role-charter-writer/` — Stage 3b ×N. Janet Malcolm. Writes one direction's charter from documentary evidence; cites every claim; refuses gloss. One subagent per direction; fan-out parallel.
- `skills/kk-role-portfolio-manager/` — Stage 4. Indra Nooyi. Cross-direction operations view: consolidated time-bound table, dependency graph, resource conflicts, sequencing, blocking open questions.
- `skills/kk-role-consistency-charter/` — Stage 6a. Jan Tschichold. Strict consistency audit on the consolidated draft against manifesto, glossary, and audit chain. Off-canon = fail.

### Changed
- `skills/kk-design-system/manifesto.md` §Agents — reorganised into shared / kk-ds-specific / kk-charter-specific groups. Added `../kk-charter-system/` pointer in §Pipeline and §Navigation.
- `skills/kk-design-system/pipeline/pipeline.md` — opening note that `kk-charter-system` is a sibling pipeline. §Role roster table now carries a `Pipeline` column (`kk-ds` / `kk-charter` / `both`) and lists the four new charter-pipeline rows. The Voice row reflects the stage divergence (6c in kk-ds, 6b in kk-charter).
- `skills/kk-charter-system/manifesto.md` §Anti-patterns → "Disclosing clients" — added the partner-relationship exception. Cross-direction operators / partners / contributors KK has named in comments may appear in charter prose; supervision-client names still live in `wealthy`. Test: is this person paying KK for supervision? If yes, name lives in `wealthy`.
- `package.json` — `description` reframed to name both pipelines. `files` extended with the five new skill directories so the package ships them.

### Migration
None required. No breaking changes to canon paths, role roster of `kk-design-system`, or release-dispatch contract. Consumers of the kit can ignore the charter pipeline entirely; it has no runtime cost on the design path.

## 1.8.0, 2026-04-26

Minor. Edit-a-comment, plus a persistence rehydration fix for markdown-backed docs.

Edit a comment. Every message kebab carries a new Edit item between Approve and Reply. Edit collapses the whole thread into a single field-card prefilled with the targeted message's body — same surface treatment as a draft. Enter commits the new text back to that message, re-forms the thread, and dispatches `kk:comment` with `{ action: 'edit', threadId, messageId, text }`. Escape — and any data-state demote (clicking another card in the inspector) — cancels without firing the event.

The edit slot lives at thread level (sibling of `.comment-thread__preview` and `.card__collapsible`) and animates with the same grid-rows pattern the kit uses for `.card__collapsible`. CSS hides preview + collapsible while `data-editing="true"`, reveals the edit slot. Threads built before 0.16.0 (restored from a snapshot, or hand-authored markup) lazily get the slot injected on first edit, so the feature works against any restore.

Persistence rehydration on `kk:md-rendered`. Pages that source their `.book` from markdown via `js/md.js` previously lost every doc-side highlight on reload: kit ran `rewrapAllHighlights` once at DOMContentLoaded against a still-empty `.book`, then md.js wrote the markdown in afterwards and never triggered a second pass. Now `initCommentPersistence` also listens for `kk:md-rendered` and re-runs the rewrap. Idempotent — the rewrap skips text already inside an existing `.highlight`, so a second pass through stable HTML is a no-op. Threads + highlights survive on every md-driven page (the kit's own `index.html`, the project-os prototype, any consumer wired the same way).

`js/kit.js` internal version `0.15.1 → 0.16.0`.

### Added
- `js/kit.js`: `enterEditMode`, `exitEditMode`, `ensureEditSlot` inside `initCommentSelectionFlow`. Edit kebab item in `buildMessage`. `Edit` branch in the kebab-item click handler. Edit-input branch in the keydown handler (Enter commits, Escape cancels). Edit-input branch in the input handler (mirrors typed text into the `value` attribute so a mid-edit snapshot rehydrates with intact text). Mutation observer cleans up `data-editing` when the thread leaves active state. Type-anywhere-to-focus picks the edit field when the active thread is editing.
- `js/kit.js`: `kk:md-rendered` listener inside `initCommentPersistence` re-runs `rewrapAllHighlights(doc, stack)` after md.js renders.
- `style.css`: `.comment-thread__edit` + `.comment-thread__edit-inner` + `.comment-thread__edit-field` with the grid-rows expand animation, the auto-lit (white-on-black) field treatment, and the `⏎` glyph + right-padding shift on `:has(.field__input:not(:placeholder-shown))`.
- `docs/integration/comment.md`: new `### action: 'edit'` section with payload shape and consumer-side semantics. Version-history row for 0.16.0.
- `demos/fundamental--accepted/index.html`, `patterns/comment-thread.html`, `patterns/comments-group.html`: Edit kebab item added to every static `.comment__menu-popover`.

### Changed
- `js/kit.js` header docstring: documents `action: 'edit'` in the events list.
- `js/kit.js` version: `0.15.1 → 0.16.0`.
- `js/kit.js` `buildThread`: pre-injects `.comment-thread__edit` so freshly built threads carry the edit slot before any Edit click. Pre-0.16 restores still work via `ensureEditSlot`.
- `docs/integration/comment.md`: removed the now-shipped `'update'` line from "Future additions"; renamed the section heading from "not in 0.13.0" to "not yet in the kit".

### Migration

None for consumers using `kk:comment` only. The new event is additive — existing handlers that branch on `action` will silently ignore `'edit'` unless they add a case for it. Consumers persisting message bodies should add an `'edit'` branch that overwrites the `text` for the named `messageId`.

## 1.7.3, 2026-04-26

Patch. Package rename so GitHub Packages publish works.

The 1.7.2 release pipeline fix unblocked workflow validation, but the publish step still hit `403 Forbidden — The requested installation does not exist`. GitHub Packages rejected `@kk/design-system` because the `@kk` scope is owned by an unrelated GitHub user (Eric Chow). The repo owner is `konstantinopolskii`; for user-scoped GitHub Packages the package name must match the repo owner.

Renamed `@kk/design-system` → `@konstantinopolskii/design-system`. Same code, same tag train, new package coordinates.

### Changed
- `package.json`: `"name": "@kk/design-system"` → `"@konstantinopolskii/design-system"`.
- `.github/workflows/release.yml`: `actions/setup-node@v4` `scope: '@kk'` → `'@konstantinopolskii'`.
- `scripts/postinstall.js`: docstring banner updated to match the new name.
- `skills/kk-ds-maintainer/SKILL.md`: "Building a product that consumes `@kk/design-system`" → "consumes `@konstantinopolskii/design-system`".

### Migration for consumers using the npm install path
Two install routes have always been documented:

- **github-direct (current convention, no change):** `npm install github:konstantinopolskii/kk-agentic-ds#v1.7.3`. Imports nothing of the package name; the dependency line stays unchanged in consumer `package.json`.
- **GitHub Packages registry (newly working):** `npm install @konstantinopolskii/design-system@1.7.3` after configuring `.npmrc` with `@konstantinopolskii:registry=https://npm.pkg.github.com`. Consumers that had `@kk/design-system@x.y.z` in `package.json` (anywhere it actually worked, which is nowhere — the publish chain was broken) update the dependency line to the new name.

The historical CHANGELOG entries (1.0.0 onwards) and the session retros under `documentation/` keep the original `@kk/design-system` name where they describe past state. Live references are the only ones updated.

## 1.7.2, 2026-04-26

Patch. Release pipeline fix. Every release run since at least 1.4.2 had failed in 0 seconds with "workflow file issue" — the publish job, the GitHub Release creation, and the Wealthy consumer dispatch never executed. Pushed-and-tagged-on-origin still met the kit's ship rule, but the GitHub Packages publish chain stayed cold.

Three defects in `.github/workflows/release.yml` and one in `package.json`:

1. `permissions:` carried only `contents: write`. `npm publish` to GitHub Packages needs `packages: write`. Added.
2. The `notify-consumers` step gated on `if: ${{ secrets.CONSUMER_DISPATCH_TOKEN != '' }}`. GitHub Actions blocks direct `secrets.*` references in `if:` expressions at the workflow-validation layer — the run failed before any job started. Replaced with the env-indirection pattern (`env.DISPATCH_TOKEN != ''`).
3. No `workflow_dispatch` trigger. Re-running a release for an older tag required a fresh tag push. Added a manual trigger with a tag input so backfills are possible.
4. `package.json` carried `"private": true`. `npm publish` refuses to push private packages. Replaced with `"publishConfig": { "registry": "https://npm.pkg.github.com", "access": "restricted" }` — pins publication to GitHub Packages and prevents accidental public-npm push.

After this lands, the release run for v1.7.2 should publish `@kk/design-system@1.7.2` to GitHub Packages, create a Release page from the CHANGELOG, and (when `CONSUMER_DISPATCH_TOKEN` is configured as a repo secret) dispatch `kk-design-system-updated` to `kk-consulting/wealthy`. Older tags v1.6.0 through v1.7.1 can be backfilled via the new `workflow_dispatch` trigger by passing the tag name.

### Changed
- `.github/workflows/release.yml`: `permissions: { contents: write, packages: write }`. Step-level `if: ${{ secrets.X != '' }}` replaced with job-level `env: DISPATCH_TOKEN: ${{ secrets.CONSUMER_DISPATCH_TOKEN }}` plus step-level `if: env.DISPATCH_TOKEN != ''`. Added `workflow_dispatch.inputs.tag` and threaded it through `actions/checkout@v4` ref + `softprops/action-gh-release@v2` tag_name + the dispatch payload.
- `package.json`: `"private": true` → `"publishConfig": { "registry": "https://npm.pkg.github.com", "access": "restricted" }`.

### Backfill (manual, post-merge)
After this commit + tag is pushed, re-run the release workflow once per missing version via the Actions tab → Release → Run workflow → enter tag (e.g., `v1.6.0`). One run per tag publishes that version to GitHub Packages and creates its Release page.

## 1.7.1, 2026-04-26

Patch. Two additions on top of 1.7.0: declarative opt-out via html data attributes, and a hidden copy target inside the inspector.

Declarative html data-attribute opt-out. Three attributes on `<html>` mirror `KK.config.comments.{enabled, autoMount, autoEnable}`. No `<script>` block needed for the common "turn comments off on this page" case.

```html
<html data-kk-comments="off">         <!-- comments.enabled: false  -->
<html data-kk-comments-mount="off">   <!-- comments.autoMount: false -->
<html data-kk-comments-enable="off">  <!-- comments.autoEnable: false -->
```

Values: `"off"` / `"on"` / absent. Precedence: kit defaults → html data attributes → explicit JS config. A consumer can therefore ship a global default via the data attribute and override per-page in a `<script>` block.

The attributes live on `<html>`, not on `.app`. `.app` is a layout class; document-level config belongs at the document root.

Hidden copy-comments target. The kit injects an aria-hidden, opacity-0 `<h2 data-kk-action="copy-comments">Comments</h2>` at the top of every inspector that hosts a `.comment-stack`. Click the top ~24 px strip and `KK.copyComments()` fires (pretty-printed JSON to the clipboard, console-log of the array length). Devs find the trigger via DevTools or by grepping the kit. Readers do not see it. Marked "for now". Removable without breaking consumer code.

`js/kit.js` internal version `0.15.0 → 0.15.1`.

### Added
- `js/kit.js`: `readCommentsDataAttributes()` reads `<html data-kk-comments[-mount|-enable]>` into a middle layer of the `KK.config.comments` merge. Kit defaults stay first, html data attributes second, explicit JS config wins.
- `js/kit.js`: `initCommentSecretCopy()` injects a hidden `<h2 data-kk-action="copy-comments">Comments</h2>` into the inspector and binds a delegated `click` handler that calls `KK.copyComments()`. Idempotent via `bound.commentSecret`. Inline-styled, no new CSS class.
- `docs/integration/comment.md § Comments default § Declarative html data-attribute opt-out`: new subsection.

### Changed
- `js/kit.js` header docstring: documents the html data attributes (precedence, values, placement rationale) and the hidden copy target.
- `js/kit.js` version: `0.15.0 → 0.15.1`.
- `KK.init` and `KK.refresh` call `initCommentSecretCopy()` after `autoEnableCommentSelectionFlow()`.

## 1.7.0, 2026-04-26

Minor. Comments are a default kit affordance. Any page that renders the kit's three-column shell (`.app` containing `.book` or `#doc`) gets a `.comment-stack` injected when one is missing, plus an `.inspector` to host it if the consumer did not ship one. The selection-to-draft flow auto-enables alongside, so highlight-to-comment works without consumer code. Persistence keeps its 1.6.0 rules.

Three opt-out switches:

- `comments.enabled: false`. No injection, no selection auto-enable, no persistence on the would-be-mounted stack.
- `comments.autoMount: false`. No DOM injection. The consumer ships their own `.inspector` and `.comment-stack`.
- `comments.autoEnable: false`. No auto-call of `enableCommentSelectionFlow`. The consumer owns selection.

Backward compatibility:

- Pages already carrying `.comment-stack` skip auto-mount. No change.
- Pages already calling `KK.enableCommentSelectionFlow()` keep working. The flow's `commentFlowEnabled` sentinel short-circuits the auto-enable's second call.
- Pages using `.app` for a non-doc surface (no `.book`, no `#doc`) skip auto-mount.
- Pages without `.app` skip auto-mount.

The behavioural change applies to one shape: a page using `.app` + `.book`/`#doc` but NOT carrying its own `.comment-stack`. Pre-1.7.0, that page had no comment functionality. Post-1.7.0, the kit injects the stack and auto-enables selection. Set `comments.autoMount: false` (or `comments.enabled: false`) to keep the old absence.

`js/kit.js` internal version `0.14.0 → 0.15.0`.

### Added
- `js/kit.js`: `autoMountCommentSurface()`. When `comments.enabled` and `comments.autoMount` are both true, `.app` exists, `.book`/`#doc` exists, and no `.comment-stack` is present, the function reuses the page's `.inspector` (or creates a fresh one with `aria-label="Comments"`) and appends a `<div class="comment-stack">`. Idempotent via `bound.commentMount`.
- `js/kit.js`: `autoEnableCommentSelectionFlow()`. Calls `initCommentSelectionFlow` when `comments.enabled` and `comments.autoEnable` hold and a `.comment-stack` plus a `.book`/`#doc` exist. Idempotent via `bound.commentAutoEnable`. Existing explicit `KK.enableCommentSelectionFlow()` calls remain idempotent through the flow's own `commentFlowEnabled` sentinel.
- `js/kit.js`: `KK.config.comments` namespace. Keys: `enabled`, `autoMount`, `autoEnable`. Defaults all `true`.
- `docs/integration/comment.md § Comments default`: new section documenting the three switches plus the auto-mount detection rules.

### Changed
- `js/kit.js` header docstring: documents `KK.config.comments` and notes that `KK.enableCommentSelectionFlow()` runs automatically by default.
- `js/kit.js` version: `0.14.0 → 0.15.0`.
- `KK.init` and `KK.refresh` reorder: `autoMountCommentSurface()` runs after `initNarrowView` and before `initColumnReveal` so an injected inspector participates in the staggered reveal. `autoEnableCommentSelectionFlow()` runs after `initCommentPersistence` so the flow binds to a restored stack.
- `demos/comment-persistence/index.html`: removed the redundant `KK.enableCommentSelectionFlow()` call. Auto-enable now does the work. The demo proves the new default by shipping zero call-site code.

## 1.6.1, 2026-04-26

Patch. Demo for the 1.6.0 comment persistence feature lands at `demos/comment-persistence/index.html`. Self-contained kit-internal page exercising the full loop: selection → draft → commit → reload → restore. Three URL modes test the three adapter shapes:

- `?persist=on` (default). The kit's `localStorage` adapter.
- `?persist=off`. `KK.config.persist.enabled = false` set before kit.js loads.
- `?persist=memory`. Custom in-memory adapter (`{ load, save, clear }` against a JS variable).

Three buttons inside the inspector wire to the public API: Extract comments, Copy as JSON, Clear and reload. Output for the first two lands in the browser console.

Root `index.html` gains a ninth pointer card surfacing the demo. Kit `js/kit.js` is unchanged from 1.6.0.

### Added
- `demos/comment-persistence/index.html`. Three-column shell with a comment stack. Demonstrates 1.6.0 persistence end-to-end. URL modes: `on` / `off` / `memory`.
- Root `index.html` Demos group: ninth card linking the new demo.

### Changed
- Root `index.html` FAB count badge: `8 → 9`.

## 1.6.0, 2026-04-26

Minor. Comment persistence ships in the kit. Default-on whenever a `.comment-stack` and a doc surface coexist on the page. Snapshot is the stack's `innerHTML`; restore re-wraps doc highlights via the kit's existing `kkAnchorQuote / kkAnchorPrefix / kkAnchorSuffix / kkAnchorSectionSlug` thread metadata. Drafts persist mid-typing (200 ms debounce on stack mutations).

Three adapter shapes:

- `'localStorage'` (default). Reads + writes JSON at `kk:comments:<location.pathname>`. Override via `config.persist.key`.
- `'none'`. Bail. DB-backed apps that route `kk:comment` events to their own backend set this.
- `{ load, save, clear }`. Custom store. Routes the snapshot through the consumer's adapter.

Two new always-on public methods walk the live DOM:

- `KK.extractComments()`. Array of threads with anchor metadata plus messages, matching the `kk:comment` event shape.
- `KK.copyComments()`. Same array; also writes pretty-printed JSON to `navigator.clipboard`.

`KK.clearSavedComments()` calls the adapter's `clear()` and reloads the page.

Source artifact: the inline persistence script at the bottom of the Explee partnership proposal (`/explee/agreement/agreement.html` lines 452-597). Generalised and moved into the kit. Pages that ran the inline script can drop it after upgrade and pass `config.persist.key = 'explee_agreement_comments_v1'` (or whatever their key was) so existing reader comments survive the upgrade. Snapshots without a `v` field read as v1, so pre-0.14.0 inline-script saves restore on first load.

Switch persistence off when the backend owns state. Set `enabled: false` (or `adapter: 'none'`) so localStorage does not shadow your DB. Same flag for dev iteration when stale cache masks your edits.

`js/kit.js` internal version `0.13.0 → 0.14.0`.

### Added
- `js/kit.js`: `initCommentApi()` exposes `KK.extractComments()` + `KK.copyComments()`. Always-on, no opt-in. Walks the DOM at call time. Returns the `kk:comment` event shape per thread.
- `js/kit.js`: `initCommentPersistence()` restores stack `innerHTML` from the resolved adapter, re-wraps doc highlights from each thread's `kkAnchor*` dataset, then binds a 200 ms debounced `MutationObserver` on the stack to persist on every mutation. Bails when `enabled: false`, when adapter is `'none'`, when the adapter object is malformed, or when `.comment-stack` / `.book` is missing.
- `js/kit.js`: `KK.clearSavedComments()` calls `adapter.clear()` and reloads. Stays a silent no-op when persistence is disabled.
- `js/kit.js`: `KK.config.persist` config namespace. Keys: `enabled`, `key`, `adapter`. Defaults: `enabled: true`, `key: 'kk:comments:' + location.pathname`, `adapter: 'localStorage'`.
- `docs/integration/comment.md § Persistence`: full pattern.

### Changed
- `js/kit.js` header docstring: documents `KK.extractComments`, `KK.copyComments`, `KK.clearSavedComments`, plus the `KK.config.persist` block.
- `js/kit.js` version field: `0.13.0 → 0.14.0`.
- `KK.init` and `KK.refresh` call `initCommentApi()` and `initCommentPersistence()` alongside the existing modules. Both new modules are idempotent.

### Migration
- Pre-0.14.0 inline persistence scripts can be removed after upgrade. Pass `config.persist.key` to keep existing localStorage entries alive across the swap.
- DB-backed consumers (the Wealthy portal pattern) must set `config.persist.enabled = false` or `adapter: 'none'` to avoid localStorage shadowing the DB.

## 1.5.1, 2026-04-26

Patch. Packaging hygiene. Consumers installing via `npm install --save github:konstantinopolskii/kk-agentic-ds` were pulling in `prototypes/`, `documentation/`, `proposals/`, `.github/`, and `.claude/` because no `.npmignore` filtered the github clone. Eighteen megabytes of session retros plus work-in-progress prototypes landed in their `node_modules`. Confusing and noisy.

Two changes close the gap:

- `package.json` `files[]` adds `demos/` and `CHANGELOG.md`. Demos belong in the package (consumer-facing reference); the kit had been silently omitting them from registry installs.
- New `.npmignore` blocklists kit-internal directories so github installs match registry installs. Belt-and-suspenders against newer npm versions that may not honor `files[]` for git installs in every case.

Verified with `npm pack --dry-run`: 55 files, 236 kB packed, 662 kB unpacked. No prototypes, no documentation, no proposals.

### Changed
- `package.json` `files[]`: + `demos/`, + `CHANGELOG.md`.

### Added
- `.npmignore` excluding `documentation/`, `prototypes/`, `proposals/`, `.claude/`, `.github/`, plus local cruft.

## 1.5.0, 2026-04-25

Minor. Manifesto h1 changes from `# The KK Agentic Design System` to `# The Agentic Design System`. The "KK" prefix drops. Initials bound the system to a person; the system stands on its own.

Shipped as Haiku-path exception per maintainer call — single-line canon edit, no pipeline review loop. Other surfaces that carry "KK" in branding (package.json description, plugin.json description, repo README, signature blocks) are unaffected this round; downstream rebrand is a separate session if KK wants it.

### Changed
- `manifesto.md` h1: `# The KK Agentic Design System` → `# The Agentic Design System`.

## 1.4.2, 2026-04-25

Patch. Manifesto §Pipeline gains one paragraph naming the session-open rule: read `pipeline/pipeline.md § Entry point matching — the recipe map` before code touches disk, default is the full walk, deviations need a stamp, architectural impact picks the recipe (not diff size).

The directive lives in canon now instead of memory. Memory shrinks to a single pointer at manifesto. Every role skill that already loads manifesto (analyst, director, designer, design engineer, meta-reviewer) inherits the rule automatically. Fresh-eyes keeps its cold-read contract — it does not need the recipe map.

### Added
- `manifesto.md § Pipeline`: one-paragraph directive naming the session-open rule.

## 1.4.1, 2026-04-25

Patch. Two fixes for the v1.4.0 section-convention rollout, surfaced by the retrospective stage 6b consistency-DS pass.

`js/md.js` `render()` returned `wrapInSections(unstash(out.join("\n")))` — wrap ran AFTER unstash. Any raw HTML block containing an `<h2>` would split mid-block under the section regex. Reversed to `unstash(wrapInSections(out.join("\n")))` so raw HTML stays inside whichever section it lands in.

`index.html` post-render hook still ran the legacy `wrapBookSections()` function. With md.js now auto-wrapping, the hook walked the already-wrapped articles, found no top-level h2 children, double-wrapped every section inside one outer lead article, and never stamped slug ids. Sidebar TOC anchors broke. Replaced the function body with `stampSectionIds()`. The walker is idempotent: it finds each `<article class="book__section">`'s inner `<h2 class="t-display">` and copies the slug onto the article id. Lead article (h1) keeps no id.

### Fixed
- `js/md.js` wrap-before-unstash order. Raw HTML blocks no longer split mid-block under the section regex.
- `index.html` post-render hook. Replaced legacy wrap with `stampSectionIds()`. Sidebar TOC anchors resolve again.

## 1.4.0, 2026-04-25

Section convention universalized. Every prose unit in `.book` lives inside an `<article class="book__section">`, including the hero region (h1 + intro paragraphs). The previous `.book__intro` class is removed. The markdown renderer (`js/md.js`) auto-wraps each h2-rooted region in a section, so hand-authored and markdown-rendered docs share one structural model.

### Breaking
- `.book__intro` class removed. Hand-authored markup using `<p class="book__intro">` migrates to plain `<p class="t-body">` inside an `<article class="book__section">` with the surrounding h1.
- `js/md.js` now wraps each h2-rooted region in `<article class="book__section">`. Consumer CSS targeting flat md-rendered structure (e.g., `.book > p` or `.book > h2`) needs to retarget through the new section wrapper.

### Added
- `canon/patterns.md § Book structure`: new pattern entry documenting the universal section convention, with HTML snippet and rules.
- `js/md.js` auto-wraps sections. The first section spans h1 + preamble + intros; each h2 starts a new section.

### Removed
- `.book__intro` class and its three CSS rules (base, `:first-of-type` modifier, narrow `@media` reset).
- The 1.3.3 `:is(.book, .book__section) > * + *:not(.book__signoff)` paragraph-rhythm broadening. Sections own the rhythm rules; prose at `.book` level is no longer a supported authoring shape.
- `canon/components.md § Rhythm § Kit addenda § "Rhythm scope"` bullet (added in 1.3.3, no longer needed).

### Changed
- `.book__section > h1, .book__section > .t-hero` margin-bottom stepped from `var(--space-6)` (24 px) to `var(--space-15)` (60 px). Hero clears its own line-height when followed by an intro paragraph inside the section.
- Rule-12 rescue extended to h1 and `.t-hero`. The hero's bottom-margin is now the sole determinant of hero-to-paragraph distance inside a section.

## 1.3.3, 2026-04-25

Patch. Two fixes for prose written outside `.book__section` wrappers.

`.book__intro` previously declared `padding-top: var(--space-15)` unconditionally. Multiple intro paragraphs each got 60 px of top-padding, producing a runaway gap between consecutive intros. The padding now scopes to `.book > .book__intro:first-of-type` so only the first intro carries the hero-clear offset; subsequent intros follow the paragraph-rhythm rule.

The basic paragraph-rhythm rule broadens from `.book__section > * + *` to `:is(.book, .book__section) > * + *:not(.book__signoff)`. Prose at `.book` level (intros, ad-hoc demo prose) now inherits the kit's 20 px paragraph rhythm. `.book__section` keeps its structural role; `.book__signoff` keeps its current zero-margin offset.

### Fixed
- `.book__intro` hero-clearing top-padding scopes to `:first-of-type`. Resolves the runaway gap between consecutive intro paragraphs.
- Paragraph-rhythm rule broadened to `:is(.book, .book__section) > * + *:not(.book__signoff)`. Prose written without an article wrapper inherits 20 px paragraph rhythm.
- `canon/components.md § Foundations § Type § Rhythm § Kit addenda` documents the new rhythm-scope rule.

## 1.3.2, 2026-04-25

Patch. `.t-code` padding stepped from `0 var(--space-1)` to `var(--space-1) var(--space-2)`. The chip now carries 4 px vertical and 8 px horizontal padding so the surface tint reads as a deliberate chip on the line rather than a tight underline. Top equals bottom; horizontal grows enough to give body-size text air without breaking the surrounding line rhythm.

### Fixed
- `.t-code` padding sits at `var(--space-1) var(--space-2)` (4 px vertical, 8 px horizontal). `canon/components.md § Code` updated.

## 1.3.1, 2026-04-25

Patch. `.t-code` and `.t-code--block` now declare `font-family: var(--font-body)` explicitly. Default browser styling for the `<code>` element falls back to monospace; the kit ships one typeface (Commissioner), so the override forces every `.t-code` instance onto the kit's body font regardless of which element carries the class. Resolves the visual asymmetry where a `<code>` chip rendered in monospace appeared top-heavy against Commissioner prose — a baseline mismatch, not a padding bug. `canon/components.md § Code` documents the rule.

### Fixed
- `.t-code` and `.t-code--block` carry an explicit `font-family: var(--font-body)`. `<code>` elements no longer default to browser monospace inside kit-rendered surfaces.
- `canon/components.md § Code` mentions the font-family rule and notes that block padding stays symmetric (top never exceeds bottom).

## 1.3.0, 2026-04-25

Content-architecture rework. Breaking: `.doc` and `.doc__*` wrapper classes rename to `.book` / `.book__*` across CSS, JS, HTML, markdown snippets, and skill canon loads. Every consumer selector targeting `.doc` breaks. The 2026-04-24 content-architecture session replaces the earlier (rejected, unshipped) 1.3.0 markdown-as-source content with a thin manifesto (200 lines from 685), a `canon/` folder (components, patterns, voice), and a `pipeline/` folder (pipeline, protocols). Patterns now live in `canon/patterns.md` with an embedded registry table that absorbs the root `patterns.html` file. The repo-root `index.html` rebuilds as a three-column hallway: sidebar TOC + rendered manifesto in the middle column + eight pointer cards in the inspector (six canon + two demos). Renderer infrastructure (`js/md.js`, `demos/md-renderer-smoke/`) carries forward unchanged. Scope-triggered rename; replay-clean content, no destructive git ops.

### Breaking
- `.doc` wrapper class and every `.doc__*` BEM descendant rename to `.book` / `.book__*`. Scope: `style.css`, `js/kit.js`, every HTML surface under repo root + `demos/`, every markdown snippet inside `skills/` and `docs/`, every SKILL.md. Consumer selectors targeting `.doc` or `.doc__section`, `.doc__part`, `.doc__spec`, `.doc__signoff` no longer match. `id="doc"` on the main element kept for kit.js compatibility; `kit.js § initScrollSpy` + `initCommentSelectionFlow` now query `.book` first and fall back to `#doc`.

### Added
- `skills/kk-design-system/canon/` folder: three canon books (`components.md`, `patterns.md`, `voice.md`).
- `skills/kk-design-system/canon/components.md`: foundations (Material, Color, Type, Space, Radii, Motion), typography rhythm (inner and outer theory: no attribution), typography utility registry, component sections (Card / Field / Button / Tag / Switch / Comment / Navigation / Signoff / Spec list / List), kit-doc primitives (Preview frame / Registry table), Forbidden close. Each component section carries pointer prose + HTML snippet + rules + deep link into `demos/fundamental--accepted/index.html`.
- `skills/kk-design-system/canon/patterns.md`: three top-level patterns (Three columns, Card stack, Narrow mobile) with HTML snippets and preview deep links, plus the 11-row registry absorbed from the deleted root `patterns.html`.
- `skills/kk-design-system/pipeline/` folder: pipeline and protocols books.
- `skills/kk-design-system/pipeline/protocols.md`: new book. Ship discipline, Bundle rule, Semver (with axes + push steps), Evolve protocol (five-step conflict walk), Backlog, Ideation. Migrated from the old manifesto's §Protocols and §Ship discipline.
- `skills/kk-design-system/pipeline/pipeline.md § Documentation contract`: new sub-section. Absorbs the entire `doc-format.md` file.
- `demos/fundamental--accepted/patterns/narrow.html`: narrow-mobile pattern preview slice. Completes the registry's 11 previews.
- Seven new anchor ids in `demos/fundamental--accepted/index.html`: `#material`, `#radii`, `#comment`, `#preview-frame`, `#registry-table`, `#navigation`, `#spec-list`. Every canon deep link now resolves to a dedicated anchor.
- Root `index.html` rebuilt as a three-column hallway: sidebar scroll-spy TOC + `<main class="book" data-md-src="./skills/kk-design-system/manifesto.md">` middle column + inspector with eight `card card--interactive` pointer cards (Patterns, Components, Voice, Pipeline, Protocols, Tokens, Fundamental, Renderer smoke) split into two `inspector__group` tiers. Two FABs for narrow-mobile (nav + inspector).

### Removed
- Root `patterns.html`: absorbed into `canon/patterns.md § Registry of additional patterns`.
- `skills/kk-design-system/doc-format.md`: content folded into `pipeline/pipeline.md § Documentation contract`.
- `skills/kk-design-system/components.md`: old re-export stub removed; canonical home is `canon/components.md`.
- `skills/kk-design-system/patterns/` directory: the kit-canon patterns folder no longer exists.
- `.doc` class namespace in its entirety (replaced by `.book`; see Breaking).

### Moved
- `skills/kk-design-system/voice.md` → `skills/kk-design-system/canon/voice.md`. Canon tri-set (patterns, components, voice) now sits in one folder.
- `skills/kk-design-system/pipeline.md` → `skills/kk-design-system/pipeline/pipeline.md`.
- `skills/kk-design-system/patterns/strategy-doc.md` → `proposals/strategy-doc-interim.md`. Strategy doc is a product-deliverable recipe, not kit canon; interim home until a strategy prototype ships under `demos/`.
- `manifesto.md` thinned to ~200 lines: purpose, four layers, signal/noise/magic, philosophy, six principles (one paragraph each), job stories, time to value, agents roster, pipeline summary, navigation pointers, signoff. Foundation inventory, typography rhythm, component inventory, protocols, and ship discipline all migrated to their canonical homes under `canon/` and `pipeline/`.
- Every SKILL.md canon-load reference repointed: `doc-format.md` → `pipeline/pipeline.md § Documentation contract`; `patterns/*.md` → `canon/patterns.md`; `patterns/strategy-doc.md` → `../../proposals/strategy-doc-interim.md`; `patterns.html` → `canon/patterns.md § Registry of additional patterns`.

### Voice
- Typography rhythm migrated to `canon/components.md § Foundations § Type § Rhythm, inner and outer theory` with zero attribution. The prior source line and attribution paragraph are stripped from every kit surface. Concept name: "inner and outer theory" or describe the rules directly.
- Em-dash density across canon prose reduced to zero in body. Voice canon: rare in body, none in headlines. Three residual hits sit inside protected code-block templates and a JS regex; semantic exemption.
- Five canon rules added under explicit user stamp on 2026-04-25:
  - **FAB shadow exception.** Drop shadow permitted on active elements rendered on a black or inverted background. The floating action button at narrow viewport qualifies. Documented in `manifesto.md § The iPad feel` and `canon/components.md § Foundations § Material`.
  - **Flat-geometry highlight.** `box-shadow` with zero blur as flat color geometry extension is permitted on the same logic as the FAB exception. Not depth illusion. Used by `.highlight` to extend visual height without affecting line-height. Documented in `canon/components.md`.
  - **`.t-code` consolidation.** New utility class replaces `.t-mono` and `.tag--inline` for inline code, tokens, and chip-like phrase emphasis. Surface chip + `--color-text-muted` + regular weight + body size + no caps + no letter-spacing. Block variant `.t-code--block` for multi-line code paragraphs (left rail, no surface chip). Documented in `canon/components.md § Components § Code`.
  - **Animation registry.** Seven keyframes catalogued in `canon/components.md § Foundations § Motion`: `fake-caret-blink`, `menu-in`, `inspector-card-focus` (canonical blur pattern), `check-in`, `reveal-from-left`, `reveal-from-right`, `reveal-from-below`. Each carries name, mechanics, why, applications. Blur policy: permitted only via reuse of `inspector-card-focus`, or maintainer-stamped exception. New-animation policy: try existing seven first.
  - **Card stack columns pattern.** New top-level pattern in `canon/patterns.md § Card stack — columns`. Replaces the legacy `.tier` / `.tiers` shape. Cards arranged horizontally for parallel comparison; columns stack vertically below the narrow breakpoint.

### Removed (canon-level)
- `.t-mono` utility class. Replaced by `.t-code`.
- `.tag--inline` utility class. Replaced by `.t-code`.
- `.aside` component. Migrated to plain prose or `.t-code`.
- `.checkbox` component. Migrated to `.switch` (kit is mobile-first; switch is the sole binary affordance).
- `.tier` and `.tiers` components. Refactored as the new `.card-stack--columns` pattern.
- Font weight 600 from kit. Strict 400 / 500 / 700 only. The prior `.t-mono` exception is gone with the class.

### Fixed (second wave)
- Off-grid spacings snapped to 4 px multiples across `style.css` (eighteen sites). Sidebar nav rail re-tuned to 16 px. Deck fan offset re-tuned to -188 px.
- `.deck-card` cleaned: hard-coded `#cccccc` replaced by `--color-surface-strong`; 300 ms transition replaced by `--dur-slow`; 20 px radius replaced by `--radius-lg` (24 px).
- `.quote` left border colour stepped from `--color-border` (gray) to `--color-text` (black). Stronger affordance.
- `.figure` selector generalized from `.figure > img, .figure > svg` to `.figure > *:not(figcaption)` so any child can carry a caption.
- `.comment__menu-popover` drop shadow removed. Popover renders on white; the FAB exception covers black-bg only.
- Phone hero font size moved out of inline `style` into the existing `@media (max-width: 768px)` block via `.t-hero` rule.
- `protocols.md` ships the canonical `book__signoff` block at the tail.
- Four AI-tell carryovers fixed: `components.md` headline em-dash, `components.md` moralizing closer, `pipeline.md` three-adjective stack, `pipeline.md` not-just-but pattern.
- `CHANGELOG.md` historical Lebedev/Bureau attribution stripped retroactively from earlier entries.

### Fixed
- `kit.js § initScrollSpy` + `initCommentSelectionFlow`: selector relaxed from `document.getElementById('doc')` to `document.querySelector('.book') || document.getElementById('doc')`. Contract preserves the `id="doc"` fallback so consumers who kept the old id on their main element keep working through the rename transition.

### Unchanged
- `js/md.js` and `demos/md-renderer-smoke/`: renderer infrastructure carried from the earlier (unshipped) 1.3.0 cycle. Every supported construct renders the same way; only class names inside `CLASS_MAP` and class-string literals shifted under the rename.
- `tokens.json`: no new tokens, no new values.
- `docs/integration/comment.md`: runtime events, config keys, consumer integration patterns unchanged; class references inside code fences renamed in lockstep with the kit.


### Added
- `js/md.js`: markdown renderer. Fetches `[data-md-src]` sources, parses headings / paragraphs / lists / blockquotes / code / HR / tables / raw HTML passthrough, maps to kit classes via `CLASS_MAP`, dispatches `kk:md-rendered` on completion. Heading-offset contract: every `[data-md-src]` container reads `data-md-heading-offset` (integer, default 0) and shifts source levels against it. Levels 1–4 resolve to kit heading classes (t-hero, t-display, t-title, t-subtitle); level 5 and deeper demote to `<p class="t-caption">` with a one-line console info naming the demoted source. `renderList` emits `.t-list`.
- `skills/kk-design-system/manifesto.md`: canonical manifesto, 686 lines. Absorbs prose that previously lived as hand-written `doc__section` blocks inside `index.html`: §Why this exists, §Philosophy, §Job stories, §Time to value, §Principles, §Foundations (material, color, type, space, typography rhythm, radii, motion), §Components (full inventory migrated from `components.md`), §Protocols (evolve, backlog, ideation), §Pipeline, §Documentation contract, §Ship discipline (bundle rule + semver). One home per prose fact.
- `skills/kk-design-system/manifesto.md § Foundations § Typography rhythm`: new rule appended after the raw-HTML caption paragraph. *Shell chrome does not compete with rendered content for heading rank. A page that carries markdown via `data-md-src` must either drop all shell-owned h1/h2/doc__part headings and let the markdown carry the full hierarchy (offset=0), or reserve higher ranks for the shell and set offset to match the depth already claimed. Two heading stacks on one scroll is the canonical hierarchy-collapse failure mode.* Canon from retro Proposal 5; Phase 1 rounds 1–5 rediscovered this rule five times before Phase 1i named it in prose.
- `skills/kk-design-system/manifesto.md § Ship discipline`: new verification bullet. *Before shipping a markdown-rendered page, grep the shell for every claim the rendered content also carries. A page that carries pointer-card copy, nav labels, or signoff stats that restate facts from the rendered body fails the one-home rule on ship. Remove shell-side claims or migrate them to the rendered source.* Canon from retro Proposal 6; the audit found twelve drifts and Phase 3 re-introduced four more before the ship-check landed.
- `demos/md-renderer-smoke/`: smoke-test page with three sample markdown files (`sample-a.md` core prose, `sample-b.md` dense blocks, `sample-c.md` raw HTML passthrough) plus `index.html` shell. Covers every supported construct side-by-side; console clean. Passed six Jobs rounds on cold read.
- `documentation/2026-04-24-markdown-source/`: initiative session log. 23 phase self-docs + 36 screenshots. Retro doc `proposals/2026-04-24-retro.md` plus phase-3-rework self-doc after this release closes the session.

### Fixed
- `index.html`: pointer-card subtitles dropped. Six `<h2 class="t-display">CardName<br /><span class="t-display--medium t-muted">Subtitle</span></h2>` wrappers removed from the six `<article class="doc__section" id="inv-*">` blocks. Each card now opens at the `.card` heading (h3). The deleted subtitles (*Nine in the kit*, *Registry at the repo root*, *Eight stages, eleven roles*, *Values and swatches*, *Evolve here, inventory out*, *The maintainer skill owns it*) all duplicated claims the manifesto prose below already carries. Retro Proposal 1. First-scroll rank drops from three (part + display + display-medium) to two (part + card title).
- `index.html`: signoff stats rewritten as structural, not count-based. Four count stats (*12 top-level sections*, *9 components*, *9 color tokens*, *4 radii*) replaced with two structural stats: *Signed, kit v1.3.0.* and *24 April '26, Tbilisi.* Count claims re-introduced the "stale count: two drifts in one sentence" failure that the initiative was opened to close; the signoff's purpose is version + sign date + who, not a copy of foundation counts enforced elsewhere in canon. Retro Proposal 2. `manifesto.md § Components § Signoff` rule *"two or four `.stat` children are valid shapes, never three"* unchanged. The index uses two.
- `index.html`: sidebar duplicates collapsed. Nav groups *Inventory* and *Distribution* (six items pointing at the shell's pointer cards) removed. The sidebar TOC now carries one structure: the manifesto's rendered sections (Meanings, Principles, Matter, Protocols, Surfaces). *Components* and *Foundations* previously appeared twice in the sidebar because both the shell cards and the manifesto claimed them. Pointer cards remain reachable by scrolling to the top of the doc. Retro Proposal 4.

### Moved
- `skills/kk-design-system/manifesto.md` absorbs the full component inventory from `components.md`. New subsection tree: §Components § Typography utility classes / § Card / § Field / § Button / § Tag / § Switch / § Comment / § Navigation / § Signoff / § Spec list / § List / § Preview surfaces / § Registry surfaces / § Patterns / § What's forbidden.
- `skills/kk-design-system/manifesto.md § Why this exists`: opener absorbs the two framing paragraphs that previously sat as `doc__intro` prose at `index.html`.
- `skills/kk-design-system/manifesto.md § Job stories`: voice-transcription example migrated from `index.html § jobs`.
- `skills/kk-design-system/manifesto.md § Principles § Eighty / twenty`: screen/panel/card examples migrated from `index.html § eighty-twenty`.
- `skills/kk-design-system/manifesto.md § Principles § Chunking`: fractal examples (sidebar, color tokens, spacing tokens, decision tree, checklist) migrated from `index.html § chunking`.
- `skills/kk-design-system/manifesto.md § Foundations § Radii`: drift resolved. Prior "two radii plus one pill alias" replaced with the four-radii set already in `vars.css` and `tokens.json`.
- `skills/kk-design-system/manifesto.md § Components § Signoff`: rule relaxed to "two or four `.stat` children are valid shapes: never three." Grid unchanged.
- `skills/kk-design-system/manifesto.md § Protocols`: new section. Absorbs §Evolve (five-step protocol), §Backlog, §Ideation (parked-idea card, auto-sync inspector comments).
- `skills/kk-design-system/manifesto.md § Ship discipline`: new section. Absorbs the verification discipline from the markdown-as-source proposal and the bundle rule + semver ship protocol from `kk-ds-maintainer/SKILL.md`. Maintainer skill still owns the operational detail.
- `skills/kk-design-system/voice.md § No AI tells`: opener absorbs the two-paragraph intro that previously lived at `index.html § ai-tells`. Voice.md is now the sole source for the AI-tells inventory.
- `skills/kk-design-system/voice.md § Signature`: cross-reference repointed from `components.md → Signoff` to `manifesto.md § Components § Signoff`.
- `skills/kk-design-system/components.md`: file retires as an authored doc. Replaced with a re-export stub whose sections point at `manifesto.md § Components § <Name>`. Stub stays for one minor cycle (1.3.0) so consumer skills loading `components.md` keep working. Full removal bumps to v2.0.0.
- Every SKILL.md canon-load list and non-skill reference repointed from `components.md` to `manifesto.md § Components`. Touched: `skills/kk-design-system/SKILL.md`, `skills/kk-design-system/pipeline.md`, `skills/kk-design-system/patterns/strategy-doc.md`, `skills/kk-role-design-director/SKILL.md`, `skills/kk-role-designer/SKILL.md`, `skills/kk-role-ds-manager/SKILL.md`, `skills/kk-role-design-engineer/SKILL.md`, `skills/kk-role-consistency-ds/SKILL.md`, `skills/kk-role-consistency-jobstory/SKILL.md`, `skills/kk-role-fresh-eyes-jobstory/SKILL.md`, `skills/kk-role-meta-reviewer/SKILL.md`, `skills/kk-role-meta-retro/SKILL.md`, `skills/kk-role-pattern-discoverer/SKILL.md`, `skills/kk-ds-maintainer/SKILL.md`, `skills/kk-ds-supervisor/SKILL.md` (deprecated), `skills/kk-ds-frontend/SKILL.md` (deprecated), `docs/integration/comment.md`.
- `index.html` reshelled as a markdown-rendered canon doc. Line count 767 → 359 (53% reduction). Body prose renders at runtime from `<div id="manifesto-mount" data-md-src="./skills/kk-design-system/manifesto.md" data-md-heading-offset="0">`. Shell keeps six pointer cards (Components, Patterns, Pipeline, Foundations, Practice, Distribution), signoff, inspector. Inline post-render script wraps each top-level `##` + following siblings into its own `<article class="doc__section" id="<slug>">` and calls `KK.refresh()` so scroll-spy observes the wrapped sections. Sidebar TOC carries one structure after the retro rework: Meanings, Principles, Matter, Protocols, Surfaces.
- `package.json` version `1.2.0` → `1.3.0`. Minor bump: markdown renderer and canonical manifesto ship additively; the `components.md` stub preserves the old load path for one cycle so no consumer breaks.
- `.claude-plugin/plugin.json` version `1.2.0` → `1.3.0`. Lockstep.

### Open
- `components.md` full removal deferred to v2.0.0. Proposal 3 of the retro is accepted in principle; removal runs in a separate session. Today the stub still resolves for any consumer skill loading the old path.
- Phase 3's rollback (retro Proposal 7) was not needed: rework (option b) landed cleanly before tag.

## 1.2.0 — 2026-04-23

Pattern discoverer role, plus four canon-kit defects surfaced during the first fundamental build. The 2026-04-23 patterns-library initiative split kit work into a canon track (atoms and elements in `index.html`) and a pattern registry track (`patterns.html` at repo root, thin index over `demos/<slug>--accepted/`). A discovery pass was missing from the pipeline — stage 7 meta-reviewer ends the product-shaped walk, but no role owns the post-acceptance pattern catalogue. This release adds `kk-role-pattern-discoverer`, wires it into the roster as a post-pipeline pass, and bakes the kit-internal review adaptation (skip 6a, keep 6b + 6c, adjusted 7 rubric) into `pipeline.md` so future kit-internal artefacts route through the right sweep. The fundamental build also exposed two kit.js behaviour bugs, one canon-doc drift on the signoff pattern, and one token-drift on the color swatches in `index.html`. All four ship in the same bundle.

### Added
- `skills/kk-role-pattern-discoverer/SKILL.md` — Sonnet, Jina Anne. Triggered by the `--accepted` suffix on a prototype folder. Slices qualifying compositions to `demos/<slug>--accepted/patterns/<pattern-slug>.html` and appends entries to `patterns.html`. First-accepted wins on cross-prototype dedup. Never edits canon. Full pattern-eligibility rubric (five must-clauses plus disqualifiers) carried in the skill body.
- `skills/kk-design-system/pipeline.md § Role roster` — pattern-discoverer row (stage column `— (post)`, Jina Anne, Design Systems Conference + W3C Design Tokens citation).
- `skills/kk-design-system/pipeline.md § Post-pipeline pattern discovery` — new subsection placing the pass outside the eight-stage walk, trigger by `--accepted` stamp, dedup rule, canon read-only constraint.
- `skills/kk-design-system/pipeline.md § Kit-internal review adaptation` — new subsection. 6a skipped for kit-internal artifacts, 6b and 6c universal, 7 runs on an adjusted rubric that drops the 6a-vs-analyst comparison and adds an artifact-specific completeness item declared at walk start.
- `skills/kk-design-system/components.md § Signoff` — one-line rule that `doc__signoff-stats` grids into three columns, two `.stat` children plus a trailing empty column for asymmetric breathing room. Ship two stats, never three.
- `style.css § Preview surfaces` — `.preview-frame` + `.preview-frame__iframe` primitive. Wrapper clips, inner iframe renders at 400% and scales to 0.25 so registry pages show pattern slices at full container width regardless of the slice's internal viewport. Ships as the single registry-preview primitive after the phase-3 patterns rework dropped the iframe-in-`<details>` UX.
- `skills/kk-design-system/components.md § Preview surfaces` — new section documenting `.preview-frame` + `.preview-frame__iframe` + the pairing rule with `.card--selectable` in doc-column registries.
- `style.css § Registry surfaces` — `.registry-table` primitive. Resets browser table defaults and applies kit tokens (`--color-border`, `--color-border-strong`, `--color-text`, `--space-3`, `--space-4`) to render dense two-column atoms and elements inventories on registry pages. Placed as a new section next to `§ Preview surfaces` since both are registry-page-only doc-surface primitives; kept separate so the scaled-iframe rules and the table-reset rules stay legible. The `§ Registry surfaces` section name was retired earlier in 1.2.0 drafts with the `.registry-frame` family — this is a fresh section holding only `.registry-table`.
- `skills/kk-design-system/components.md § Registry surfaces` — new section documenting `.registry-table` with example markup and the five rules (full reset, 30% first-column with nowrap, header-vs-body border weights, last-row border drop, link inheritance).
- `skills/kk-design-system/components.md § What's forbidden` — `registry-table` added to the class-prefix allowlist.
- `style.css § .card--interactive.card--selectable[data-state="active"]` — registry-only active surface. Reads as "this is the current selection" with `var(--color-surface-strong)` rather than the softer "this form is open for input" overlay on plain `.card--interactive[data-state="active"]`. Scoped by the `card--selectable` opt-in so comment-thread and comment-new active states keep their existing surface.
- `skills/kk-design-system/manifesto.md § Foundations § Typography rhythm` — new subsection carrying the fourteen rules of inner and outer theory. Core principle **inner ≤ outer** stated up front, fourteen rules enumerated, three emphasis paragraphs on the rules that bite hardest in practice (12, 13, 14).
- `skills/kk-role-design-engineer/SKILL.md § Build rules § 8. Typography rhythm` — new build rule referencing the fourteen-rule canon. Calls out rules 9, 10, 12, 13 explicitly plus the manifesto cite. Added to the §Load the canonical rules first list under manifesto foundations.
- `skills/kk-role-fresh-eyes-jobstory/SKILL.md` — Steve Jobs character paragraph extended. Typography rhythm violations (rules 9, 12, 13, 14) flagged as 0.2-second defects. Cite routes to `manifesto.md § Typography rhythm` for the full list.
- `skills/kk-role-consistency-jobstory/SKILL.md` — Steve Jobs character paragraph extended with the same four-rule flag list for cold-read audits. Defects go under §5 without hesitation.
- `js/md.js § render + load` — heading-level offset contract. Every `[data-md-src]` container reads `data-md-heading-offset` (integer, defaults to `+1`). Parsed heading level plus offset, clamped 1–4, resolves via the existing `CLASS_MAP`. Markdown `#` inside a default container lands at the article's h2 rank (t-display), preventing a second hero from stacking under the page title and the part heading. Opt out with `data-md-heading-offset="0"` when the markdown file is the page root. Closes Jobs round 2 defect 1.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — heading-offset paragraph. Contract documented alongside the fourteen rules so downstream roles encounter it on the canon load.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — quote rule paragraph. Quotes render black, Medium 500, italic. Muted colour would bury a quote against its own citation and contradict the no-muted-by-default rule. A quote is content, not metadata. Closes Jobs round 2 defect 5.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — embedded-HTML caption convention. Raw HTML blocks in prose carry a muted caption line above naming the block, e.g. `<p class="t-caption t-muted">Example</p>`. Without the caption the block competes with section headings for attention. Closes Jobs round 2 defect 7.
- `skills/kk-role-design-engineer/SKILL.md § 8. Typography rhythm` — second paragraph naming the three kit contracts (heading offset, quote rule, embedded-HTML caption) so the design engineer lands them on first pass.
- `skills/kk-role-fresh-eyes-jobstory/SKILL.md` — Jobs-character paragraph extended: hero-sized article headings, muted quotes, and uncaptioned embedded cards are 0.2-second defects.
- `skills/kk-role-consistency-jobstory/SKILL.md` — same three-contract paragraph added for cold-read audits.

### Fixed
- `style.css § Main document` — typography rhythm in the doc column aligned with inner-and-outer rules 9, 12, 13, 14. `.doc` `padding-top` bumped `var(--space-4)` (16 px) → `var(--space-8)` (32 px) — rule 9, outer page margin ≥ body line-height 32. `.doc__intro` `padding-top` bumped `var(--space-3)` (12) → `var(--space-15)` (60) — rule 13, hero-to-intro clears 66 px line-height. `.doc__section` — symmetric `gap: var(--space-5)` removed, replaced with asymmetric `> * + *` margin rules keyed by child type: paragraph-to-paragraph 20 px (inner), heading-to-following 40 or 80 (rule 13 ≥ heading line-height), preceding-to-heading 60 or 80 (rule 12, strictly greater than below). `.doc__part + .doc__section` `padding-top` bumped `var(--space-6)` (24) → `var(--space-20)` (80) — rule 13, clears hero-size part heading's 66 px line-height.
- `style.css § Main document` — rule 12 ratio tightened after Jobs fresh-eyes round 2. Heading-above bumped 60 → 80 on display/title/subtitle inside `.doc__section` so the top/bottom ratio is 2:1 (80/40), not 1.5:1. Asymmetric spacing now also fires on bare `h2`/`h3`/`h4` selectors as insurance against markdown content that skips the `.t-display`/`.t-title`/`.t-subtitle` class. `.doc__section` `padding-top` bumped `var(--space-8)` (32) → `var(--space-15)` (60) so outer section-to-section (80 incl. margin-top 20) remains ≥ the new 80 px inner heading gap — rule 14 holds.
- `style.css § Main document` — rule 14 enforced on label-list pairs. New `.doc__section > p + ul`, `.doc__section > p + ol` rule sets the list's top margin to `var(--space-2)` (8 px). Pattern: a paragraph ending in `:` introduces a list; the inner label-to-list gap now sits well below the 20 px paragraph-to-paragraph rhythm, so the label reads as the list's caption instead of floating between the two blocks.
- `style.css § Sidebar` — rule 9 on the sidebar column. `padding-top` bumped `var(--space-6)` (24) → `var(--space-8)` (32) so outer top margin clears the sidebar header's `t-title` line-height (28 px).
- `skills/kk-design-system/manifesto.md § Foundations § Typography rhythm` — two paragraphs added under the rule-14 emphasis. Label-list pairs declared rule-14 territory; rule-12 ratio floor named explicitly at 2:1 (top ≥ 2× bottom) so 1.5:1 fixes no longer pass on sight.
- `demos/md-renderer-smoke/sample-a.md` + `sample-b.md` + `sample-c.md` — hero heading em-dashes removed. `# Sample A — ...` → `# Sample A`. Scope descriptions moved to the body paragraph below the hero.
- `demos/md-renderer-smoke/index.html` — doc-column intro collapsed from two paragraphs (body + muted caption carrying a shell command) to one body paragraph. Shell command moved to an HTML source comment so deployment notes stay discoverable to maintainers without crowding the user-facing prose with a second intro weight.
- `js/kit.js` — empty `comment-new` now dismisses on demote. The MutationObserver bailed on `!tid` before reaching the dismiss branch, so the pre-rendered static demo draft (no `data-thread-id`) became a zombie preview card on blur. Reordered: the empty-draft dismiss runs first and independent of thread id; the highlight-mark branch keeps its tid gate.
- `style.css` — `.comment__menu-popover` now opens on dots-button click. The old selector `.comment__menu[aria-expanded="true"] ~ .comment__menu-popover` required siblings, but the button sits inside `.comment-msg__header` while the popover is a child of `.comment-msg`. Rewrote as `.comment-msg:has(.comment__menu[aria-expanded="true"]) > .comment__menu-popover`, matching the `:has()` usage already in the file.
- `index.html § Color` — six swatches (`--color-surface-overlay`, `--color-surface-strong`, `--color-border`, `--color-border-strong`, `--color-text-muted`, `--color-text-subtle`) were emitting raw `rgba(0,0,0,0.X)` inline. Swapped to `var(--color-*)` to match the first two swatches in the list and the fundamental demo.
- `js/kit.js` — resolved and archived comment threads no longer re-expand on click. `handleTrigger` had no guard for terminal-state threads, so any click on a resolved preview promoted the card to `data-state="active"` with no content to reveal. Added an early return for `data-resolved="true"` or `data-archived="true"` before the `card--interactive` promote branch.
- `style.css` — `.comment__menu-popover` no longer truncates when the message sits near the bottom of an open thread. Popover lives inside `.card__collapsible-inner` which carries `overflow: hidden` for the slide transition. Added a `:has()` rule that flips the inner to `overflow: visible` while any menu popover is open, mirroring the existing deck-escape rule. Returns to `overflow: hidden` on close.
- `style.css § Main document` — `.doc__section` h4/subtitle rhythm asymmetry. Below-gap `var(--space-10)` (40) → `var(--space-12)` (48) so the subtitle reads as breathing room rather than a tight hand-off. Above-gap bumped to `calc(var(--space-20) + var(--space-4))` (96) to preserve the 2:1 rule-12 floor. Closes Jobs round 2 defect 4.
- `style.css § Main document` — `.doc__section > hr` rule set. Symmetric 60 above + 60 below via explicit margin; `.doc__section > hr + *` raises next-sibling margin-top back to 60 so the usual 80-above-h2 rule does not fire after an HR. Border reset to 0 + `0.5px` top hairline matching other kit separators. HR reads as pure divider, not as lead-in to the heading beneath. Closes Jobs round 2 defect 6.
- `style.css § Quote` — `.quote` colour dropped from `var(--color-text-muted)` to `var(--color-text)`; `font-weight: var(--fw-regular)` added to lock Medium 500. Italic face retained. Closes Jobs round 2 defect 5.
- `demos/md-renderer-smoke/sample-a.md` — opening heading `# Sample A` → `# Core prose path`. Title names what the sample proves rather than echoing the filename. Closes Jobs round 2 defect 2 part a.
- `demos/md-renderer-smoke/sample-b.md` — opening heading `# Sample B` → `# Dense blocks`. Second-blockquote copy rewritten from "muted colour" to "black body colour" to match the updated `.quote` rule. Closes Jobs round 2 defect 2 part b.
- `demos/md-renderer-smoke/sample-c.md` — opening heading `# Sample C` → `# Raw HTML passthrough`. Two `<p class="t-caption t-muted">Example</p>` caption lines added above the two embedded cards per the embedded-HTML convention. Card body paragraphs rewritten from `t-caption` to `t-body`. Closes Jobs round 2 defects 2 part c, 7, and 8.
- `demos/md-renderer-smoke/index.html` — page `<title>` and page `<h1>` rewritten from "md.js smoke test" to "Markdown renderer smoke test". Sidebar header label "Smoke" → "Renderer". Sidebar nav links "Sample A/B/C" → "Core prose path"/"Dense blocks"/"Raw HTML passthrough" to match the article titles. Closes Jobs round 2 defect 11.
- `demos/md-renderer-smoke/index.html` — sidebar footer collapsed from two muted lines to one line ("md.js renderer"). Closes Jobs round 2 defect 9.
- `demos/md-renderer-smoke/index.html` — inspector second card heading "Console" → "Watch for errors". Caption copy unchanged. Closes Jobs round 2 defect 10.
- `style.css § Main document` — rule 12 stacking rescue. Three rule-12 defects surfaced by Jobs round 3: h3 "Card embedded in markdown" in sample-c inverted at 91 above / 125 below; doc__part "Samples" at 1.49:1 (139 above / 93 below); h3 "Table" in sample-b at 1.39:1 (92 above / 66 below). New rule `.doc__section > h2 + *, h3 + *, h4 + *, .t-display + *, .t-title + *, .t-subtitle + * { margin-top: 0 }` zeroes the next-sibling top margin so component-intrinsic margins (registry-table 16, raw-HTML card + paragraph) can no longer stack on top of the heading's below-gap. Below-gap now carried explicitly by margin-bottom on `.doc__section > h2/h3/.t-display/.t-title` at `var(--space-10)` (40) and on `.doc__section > h4/.t-subtitle` at `var(--space-12)` (48), matching what the previous `h* + *` rules declared. Post-fix text-to-text ratios measured 2.21:1 on defect 1, 2.23:1 on defect 3.
- `style.css § Main document` — `.doc__section > * + .t-display, * + .t-title, * + h2, * + h3` above-gap lifted `var(--space-20)` (80) → `calc(var(--space-20) + var(--space-3))` (92). A pure 80/40 margin ratio is 2:1 in box terms but text-baseline ratio drops to 1.93 because of asymmetric line-leading on the flanking elements; 92/40 box (2.30) cushions the slack and text ratio lands ~2.20. Mirrors the `calc(space-20 + space-4)` = 96 pattern already used on h4/t-subtitle above-gap.
- `style.css § Main document` — new `.doc__section > h2 + .registry-table > thead > tr > th` rule (and parallel selectors for h3/h4/.t-display/.t-title/.t-subtitle) sets `padding-top: 0`. Table cell rhythm below the header row is unchanged. Without this rule the 12 px first-row top padding stacks under the heading's 40 px below-gap and inflates visible text-to-text past the 2:1 floor even after the margin-reset rule zeros the table's own margin-top. Closes Jobs round 3 defect 3 at the text-baseline level.
- `style.css § Main document` — `.doc__part + .doc__section` `padding-top` tightened `var(--space-20)` (80) → `var(--space-10)` (40). Above the part 124 / below 52 = 2.38:1 box ratio; measured text-to-text 2.98:1 — clears the 2:1 rule-12 floor that the earlier 80 px below-gap failed at 1.49:1. Chose the below-reduction path (a) over bumping part padding-top (option b); keeps overall section-to-section rhythm intact and avoids a deeper page break between parts. Closes Jobs round 3 defect 2.
- `style.css § Main document` — deleted the standalone h4/subtitle margin block (old `.doc__section > h4 + * { margin-top: var(--space-12) }` + `* + h4 { margin-top: calc(var(--space-20) + var(--space-4)) }`). H4 above-gap now sits in the unified `* + .t-subtitle, * + h4` block at the top of the section; h4 below-gap is carried by the new `.doc__section > h4, .t-subtitle { margin-bottom: var(--space-12) }`. No net change to the h4 rhythm (96 above / 48 below).
- `skills/kk-design-system/manifesto.md § Typography rhythm` — next-sibling margin collapse paragraph added under the rule-12 ratio floor line. Headings own their below-gap; next-sibling top margin sits at zero so stacking cannot inflate past the 2:1 ratio. Closes Jobs round 3 defects 1 and 3 at the canon level.
- `style.css § Quote` — `.quote` now declares `font-size: var(--fs-body)` + `line-height: var(--lh-body)` explicitly. Before the fix both blockquotes in the md-renderer smoke rendered at caption size (16 px), not body — `.quote` had no explicit `font-size` and inherited from `body { font-size: var(--fs-caption) }`. Jobs round 4 defect 1 read the first blockquote as body-sized only because optical weight at long measure felt heavier; measurement proved both rendered at 16 px. Explicit body size locks the quote at 22 / 32 regardless of ancestor context so the manifesto contract ("a quote is content, not metadata") holds at every doc-section position. Closes Jobs round 4 defect 1.
- `style.css § Quote` — rule 14 rescue on blockquote. New rule `.doc__section > * + .quote { margin-top: var(--space-10) }` (40) gives every doc-section blockquote an above-gap that clears its own 32 px line-box. Tie-break rules preserve prior rhythm contracts: `heading + .quote` drops margin-top to 0 so heading's own margin-bottom (40) is the sole below-gap carrier (`.doc__section` is display:flex, so vertical margins do NOT collapse — without the tie-break, 40+40=80 would inflate past rule 12); `hr + .quote` restores the 60 px hr rule (without it the `* + .quote` specificity 0,2,0 would override the hr's 0,1,1). Post-fix outer above-gap: first blockquote 40 (under heading), second blockquote 40 (under paragraph) — both clear the 32 px inner line-box. Closes Jobs round 4 defect 3.
- `js/md.js § CLASS_MAP + renderList` — markdown `<ul>`/`<ol>` now render with the new `.t-prose-list` class, not `.t-list`. The kit's `.t-list` is a tabular registry-row pattern (hairlines between items, caption-sized type, gutter bullets); markdown `-` and `1.` blocks are prose, not data rows, and need a different contract. `renderList` comment expanded to name the prose-vs-tabular split. `.t-list` itself untouched; its existing consumers in `demos/fundamental--accepted/`, `prototypes/`, `index.html`, and `skills/kk-design-system/patterns/strategy-doc.md` still render tabular. Paired with the new `.t-prose-list` style block. Closes Jobs round 4 defect 2 at the renderer level.
- `js/md.js § render heading branch` — heading regex widened `/^(#{1,4})\s+/` → `/^(#{1,6})\s+/` so source `#####` and `######` parse as headings instead of falling through to paragraph. Level > 4 demotes to `<p class="t-caption--bold">` (16 / 24 bold) with a one-line `console.info` naming the demoted level and heading text. Before the fix, `####` source (level 5 after offset +1) and `#####` source (level 6) both capped to h4 / t-subtitle, so the author writing a deliberate step-down saw two identical lines. Demotion to caption-bold steps visibly beneath h4/t-subtitle (16 px bold vs 18 px bold) so the hierarchy is self-evident. Closes Jobs round 4 defect 5.
- `style.css § Main document` — `.doc__section > h4, .t-subtitle` below-gap tightened `var(--space-12)` (48) → `var(--space-10)` (40). Box ratio 96/48 = 2.0 was exactly at the rule-12 floor, but Jobs round 4 measured text-to-text at 124/76 = 1.63 — descent leading on the prev element + ascent leading on the subtitle bias the visual ratio below box. New 96/40 box = 2.40; text ratio extrapolates ≥ 2.20. Rule 13 floor holds (40 ≥ subtitle line-height 24). Matches the 40 px below-gap carried by h2/h3/.t-display/.t-title; the whole doc-section heading stack now sits at a single 40 px below-gap contract. Closes Jobs round 4 defect 4.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — heading-offset paragraph rewritten. Prior "Shifted levels cap at h4 so the kit class map always resolves" replaced with the demotion contract: levels 1–4 resolve to kit heading classes, level 5 and deeper demote to `<p class="t-caption--bold">` with a console info. Authors see a clear step down instead of a silent cap.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — quote paragraph extended. "black, Medium 500, italic" → "black, Medium 500, italic, body-sized (22 / 32)." Names the explicit size contract + the reason `.quote` declares size rather than inheriting from `body` (body sits at caption size).
- `demos/md-renderer-smoke/index.html § articles` — each `<article data-md-src>` now carries `data-md-heading-offset="2"`. Shell owns hero (page title) and hero again (`.doc__part` "Samples"); article `#` now lands at t-title instead of t-display, one step below the part label. Prior offset +1 placed article `#` at t-display — same rank as the shell's part heading inside the flat stack the page renders, so "Samples" read as a peer of "Core prose path". Offset +2 restores a visible step. Closes Jobs round 5 defect 1.
- `demos/md-renderer-smoke/sample-a.md` — the `#### Subtitle-level heading` block removed. Under offset +2, `###` and `####` both demote to `t-caption--bold` (levels 5 and 6 land in the same demotion branch), so two sibling sub-headings at identical rank would collide. Body paragraph kept, rewritten to name the new heading-offset contract. Closes the offset=2 heading-collision side effect.
- `style.css § Typography utilities` — `.t-subtitle` `font-weight` dropped `var(--fw-bold)` (700) → `var(--fw-medium)` (500). Weight step against `t-caption--bold` (700) carries the rank where the 2 px size delta alone failed the 0.2-second bar. Every other heading rank (hero, display, title) stays at Bold 700. Ripples: `.button.t-subtitle` buttons render at Medium 500 instead of Bold 700, which matches the rest of the kit's body-rank typography (body / caption / micro are all 500). Closes Jobs round 5 defect 2.
- `style.css § Main document` — label-list pair rule rewritten. Prior rule set `ul/ol { margin-top: var(--space-2) }` (8) but left the preceding paragraph's own `margin-bottom` governing the visible gap via `.doc__section > * + *` (20). New rule uses `:has()`: `p:has(+ ul), p:has(+ ol) { margin-bottom: var(--space-2) }` tightens the label's own bottom gap, and `p + ul, p + ol { margin-top: 0 }` zeroes the list's top so the two gaps do not stack. Label-list visible gap now 8 px, well under the 20 px paragraph rhythm and the 32 px body line-box, so the label reads as the list's caption. Closes Jobs round 5 defect 3.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — label-list paragraph extended. Names the `:has()` implementation (paragraph owns its bottom gap) and explains why tightening only the list's `margin-top` left the pair loose. Closes round 5 defect 3 at the canon level.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — heading-offset paragraph extended. `data-md-heading-offset="2"` contract documented — article under a part label that already owns display or hero rank sets offset 2 so `#` lands at t-title, one step below the part. Closes round 5 defect 1 at the canon level.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — new paragraph on the weight step at the bottom of the heading stack. `t-subtitle` sits at Medium 500, `t-caption--bold` stays at Bold 700; the weight drop carries the rank where size alone (18 vs 16) fails the 0.2-second bar. Closes round 5 defect 2 at the canon level.
- `skills/kk-design-system/components.md § Typography` — `t-subtitle` row updated: "18 / 24 medium" + note on the weight-step contract.
- `skills/kk-design-system/tokens.json § typography.scale.subtitle` — explicit `fontWeight: 500` added + note naming the weight step against `t-caption--bold`.
- `style.css § Typography utilities` — `.t-subtitle` reverted from Medium 500 to Bold 700. The round-5 weight-step fix regressed every t-subtitle site in the kit (card headings, sidebar nav, button labels). Original collision with demoted-h5 re-solved by demoting h5+ to `t-caption` regular weight instead of `t-caption--bold`. Size + weight step now carries the rank distinction without touching canon t-subtitle. `js/md.js § render heading branch` demotion target and `console.info` message updated. `skills/kk-design-system/manifesto.md § Typography rhythm` weight-step paragraph rewritten: `t-subtitle` stays Bold 700 kit-wide; demoted-h5 drops to regular caption, carrying the step by size + weight together. `skills/kk-design-system/components.md § Typography` `t-subtitle` row reset to "18 / 24". `skills/kk-design-system/tokens.json § typography.scale.subtitle` explicit `fontWeight: 500` removed.
- `demos/md-renderer-smoke/index.html` — shell `<h1 class="t-hero">Markdown renderer smoke test</h1>` and `<h2 class="doc__part">Samples</h2>` removed. Each article now renders its markdown file's own `#` heading at t-hero, so three article heroes ("Core prose path", "Dense blocks", "Raw HTML passthrough") carry the page hierarchy directly. Each `<article>`'s `data-md-heading-offset="2"` swapped to `data-md-heading-offset="0"` — source `#` lands at h1 / t-hero, `##` at h2 / t-display, `###` at h3 / t-title, `####` at h4 / t-subtitle, `#####` and deeper demote to `<p class="t-caption">`. A shell page h1 plus part h2 plus three article h3s read as a demoted stack; three article h1s on an internal test page read as three sibling documents, which is what the smoke test is. Sidebar nav labels unchanged (already match article titles from the round-2 rename). `style.css § Main document` gains a `.doc__section:has(> h1:first-child), :has(> .t-hero:first-child)` rule that lifts `padding-top` to `calc(var(--space-20) + var(--space-15))` (140) when the article opens with a hero — the default 60 px padding-top landed 112 px above the hero on the first article and 127 px on subsequent articles, both failing the 2:1 rule-12 floor against the hero's 80 px below-gap. Post-fix above-gaps measured 192 / 206 / 204; ratios 2.43 / 2.61 / 2.58, all clear of the 2:1 floor. Rule 13 holds (below 80 ≥ hero line-height 66). Scoped by `:has()` so only articles opening with an h1 pick up the extra padding; `index.html` and `demos/fundamental--accepted/` articles open with display or title rank and keep the original 60 px. `demos/md-renderer-smoke/sample-a.md` line 13 rewritten — `data-md-heading-offset="2"` reference dropped, demotion target restated as `<p class="t-caption">` regular, new mapping named (`#` → h1 / t-hero through `####` → h4 / t-subtitle, `#####+` demoted). `skills/kk-design-system/manifesto.md § Typography rhythm` heading-offset paragraph rewritten: default offset is 0, authors opt into positive offsets when the shell already carries higher ranks, multi-article pages with no shell h1 accept multiple h1 elements on one internal page.

### Added
- `style.css § Prose patterns` — `.t-prose-list` component. Body-sized, disc (ul) or decimal (ol) marker, `gap: var(--space-2)` paragraph rhythm between items, no per-item hairlines. Sits beside `.t-list` (unchanged); the two classes carry two separate contracts (prose vs tabular registry-row). Emitted by `js/md.js` on markdown `<ul>`/`<ol>`. Paired with the `.doc__section > p + ul, > p + ol { margin-top: var(--space-2) }` label-list rule already in the kit. Closes Jobs round 4 defect 2 at the CSS level.
- `skills/kk-design-system/components.md § Prose list (.t-prose-list)` — new section after Spec list. Markup examples (ul + ol), four rules (body-size contract, no hairlines, md.js emits the class automatically, tabular use goes to `.t-list`). Class prefix allowlist unchanged (`t-prose-list` starts with `t-`).

### Removed
- `skills/kk-design-system/components.md § Registry surfaces` — section removed. The three primitives it documented (`.registry-frame`, `.registry-frame--tall`, `.registry-disclosure`) were retired in the same bundle. See §Moved.
- `skills/kk-design-system/components.md § What's forbidden` — `registry` prefix dropped from the class allowlist. Replaced by `preview-frame` to cover the new primitive.

### Changed
- `--lh-title` 28 → 32 px. Title leading matches body leading; inline code + title on the same line no longer jumps when the line breaks between them. `skills/kk-design-system/tokens.json § typography.scale.title` and `skills/kk-design-system/components.md § Typography utility classes` updated in lockstep.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — new paragraph codifying the h4 rank binding: every `<h4>` element in kit surfaces carries `t-subtitle`. `js/md.js` enforces the pair for rendered markdown; HTML authors write the two together. `<h3 class="t-subtitle">` is not a valid pairing. Second new paragraph names the title-leading match: `--lh-title` sits at 32 so title and body share a vertical rhythm.

### Moved
- Sidebar nav-group heading tag `<h3>` → `<h4>`. Accompanying `t-subtitle` class unchanged. All kit canvases updated: `index.html`, `patterns.html`, `demos/md-renderer-smoke/index.html`, `demos/fundamental--accepted/index.html`, `demos/fundamental--accepted/patterns/sidebar-nav.html`, `demos/fundamental--accepted/patterns/three-column-shell.html`, `prototypes/prototype-alpha/index.html`, `prototypes/prototype-operator-alpha/index.html`, `skills/kk-design-system/patterns/strategy-doc.md`.
- `package.json` version `1.1.0` → `1.2.0`. Minor bump — one new role skill, additive.
- `package.json` `files` array — added `skills/kk-role-pattern-discoverer/` after the other `kk-role-*` entries.
- `.claude-plugin/plugin.json` version `0.4.0` → `1.2.0`. Bump in lockstep with `package.json` after a drift window across the 1.0.x and 1.1.0 cycles. Plugin `skills` array unchanged — the discoverer is kit-internal, matching the precedent that no `kk-role-*` skill is listed there.
- `.registry-frame` + `.registry-frame--tall` + `.registry-disclosure` were added earlier in 1.2.0 drafts (commit `549c9ad`) and removed before tag. The final 1.2.0 does not carry them. Zero consumers reached outside the drafting window, so the removal does not break semver — the release has not been tagged or pushed.
- `index.html` slimmed: component catalogues + pattern demos + atom/element state galleries removed; live in `demos/fundamental--accepted/index.html` + `patterns.html`. The kit canon doc now carries manifesto + protocols + foundations-why only. Line count 3304 → 765 (77% reduction).
- `index.html` cross-reference stubs: §Components, §Patterns, §Pipeline, §Foundations, §Practice, §Distribution — each a one-sentence pointer at the surface that now carries the content. §ai-tells carries a one-line `voice.md` cross-reference. Sidebar nav adds an Inventory group (Components, Patterns, Pipeline), a Distribution group (Install and ship), and a `#foundations` entry at the top of the Foundations group. Line count 765 → 876.
- `index.html` cross-reference stubs shifted from paragraph prose to six kit cards — `.card` + `.card__heading` + `.button.button--primary`. Louder at 0.2 seconds. Secondary targets kept as `t-micro t-muted` anchor rows beneath the primary button. §Foundations primary button points at the fundamental-demo swatches (`./demos/fundamental--accepted/index.html#color`), not `tokens.json`: the manifesto reader walking the doc is a human scanning for visual proof of nine tokens, not a maintainer fetching machine values — that reader opens `tokens.json` directly.
- `index.html § Foundations` consolidated: pointer card moved from its own `doc__part` into Inventory alongside Components + Patterns + Pipeline. §material / §color / §type / §space / §radii / §motion WHY prose transferred to `manifesto.md § Foundations`. Index stays philosophy + protocols; manifesto absorbs the kit-foundation thinking.

### Open
- `patterns.html` not created in this release. Phase 3 of the initiative deploys the discoverer against `demos/fundamental--accepted/`, which creates the file and populates the first entry set.

Stage 6c voice reviewer + voice discipline extended to every role that writes UI text, prototype prose, or pattern descriptions. v1.0.0's pipeline-v3 folded the dedicated UX-copy-review role into meta-reviewer's rubric item 5 (one line on a six-item Opus rubric). User flagged the dilution — voice defects written at stage 3b would survive until stage 7, then require an expensive reiterate loop. This release restores a dedicated cold-read voice auditor parallel with 6a + 6b, and tightens voice.md canon load on the four roles that author prose for prototype or docs.

### Added
- `skills/kk-role-voice-reviewer/SKILL.md` — Haiku, George Orwell. Stage 6c. Cold reads every visible UI string against `voice.md` — AI tells, button-label discipline, empty-state shape, error shape, sentence case, em-dash and italics rules, muted and light-weight rules. Flags file:line + string + rule broken. No pass/fail — feeds stage 7 meta-reviewer's rubric item 5.
- `skills/kk-design-system/pipeline.md § Stage 6c — Voice` — new stage section.
- `skills/kk-design-system/pipeline.md § Role roster` — voice reviewer row added.
- Canon-load entries for `voice.md` on four roles that were previously missing or partial: `kk-role-analyst` (job stories + open questions), `kk-role-design-director` (direction doc + pattern descriptions), `kk-role-ds-manager` (component map prose), `kk-role-design-engineer` (upgraded from `§AI tells` to full `voice.md` — carries designer strings + writes dummy text).

### Removed
- Nothing. Additive release.

### Moved
- `skills/kk-design-system/pipeline.md` intro: "Ten role skills" → "Eleven role skills".
- `skills/kk-design-system/pipeline.md § Parallel spawning` — stage-6 parallel updates from "6a + 6b" to "6a + 6b + 6c". Spawning owner is the design engineer at stage-5 ship.
- `skills/kk-design-system/pipeline.md § Meta-reviewer rubric` item 5 — now names stage 6c as the evidence source. Flags must be either fixed in copy or stamped as user-approved exceptions in the direction doc.
- `skills/kk-design-system/pipeline.md § Dumb-reviewer character` — footnote extended. Steve Jobs governs fresh-eyes + consistency-jobstory (0.2-second user-clarity frame). Dieter Rams (6b) and George Orwell (6c) are Haiku reviewers with canon-framed lenses — kit-pattern conformance and voice conformance respectively.
- `skills/kk-design-system/pipeline.md § Stage 7 Meta-reviewer` canon input — now reads 06c alongside 06a + 06b + upstream chain.
- `skills/kk-design-system/manifesto.md § Pipeline` — "three cold-read audits (jobstory, DS, voice)" replaces the two-audit phrasing; role count ten → eleven.
- `package.json` version `1.0.2` → `1.1.0`. Minor bump — added a new role skill.
- `package.json` description — role count ten → eleven.
- `package.json` `files` array — added `skills/kk-role-voice-reviewer/`.

### Open
- The three parallel 6a + 6b + 6c reviewers produce three distinct artefact files. Meta-reviewer reads all three. Wall-clock cost of stage 6 stays unchanged because the three run in parallel.
- Three other roles already carried `voice.md` in their canon load prior to this release: `kk-role-designer` (full file), `kk-role-meta-retro` (full file), `kk-ds-maintainer` (inherited rules). No change for those three.
- Reviewer-only roles (fresh-eyes-jobstory, consistency-jobstory, consistency-ds, meta-reviewer) do not author UI text or prototype prose. Their canon loads remain role-specific; voice is not added to their load lists.

## 1.0.2 — 2026-04-23

Convention parity for §Character body paragraphs. The four role SKILL.md files that carried character only in frontmatter (analyst, ds-manager, design-engineer, meta-retro) now carry the same 2-3 sentence §Character body section the seven other roles already had — who this person is, the work they are famous for, why the match holds. All eleven roles now share the convention. Patch-level: no mandate, trigger description, or consumer API changed.

### Added
- `skills/kk-role-analyst/SKILL.md § Character` — Margaret Hamilton body paragraph (NASA Apollo lead, coined "software engineering", Apollo 11 priority-display system).
- `skills/kk-role-ds-manager/SKILL.md § Character` — Muriel Cooper body paragraph (first MIT Press art director, MIT Press colophon, Visible Language Workshop).
- `skills/kk-role-design-engineer/SKILL.md § Character` — Sara Soueidan body paragraph (independent front-end engineer, accessible-component deep-dive series).
- `skills/kk-role-meta-retro/SKILL.md § Character` — Joan Didion body paragraph (American essayist, *Slouching Towards Bethlehem*, *The White Album*, pattern-observer).

### Removed
- Nothing. Patch release.

### Moved
- `package.json` version `1.0.1` → `1.0.2`. Patch bump — §Character convention parity; no mandate, trigger description, or consumer API changed.

### Open
- Nothing pending from v1.0.0 + v1.0.1 character work. Convention now uniform across eleven roles.

## 1.0.1 — 2026-04-23

Character swaps for four roles after v1.0.0 ship — user flagged that the original picks were famous but not domain-fit. Each new pick is a practitioner whose actual craft matches the role's work. Every role SKILL.md also gains a §Character body section that expands on the match — the frontmatter carries name + voice, the body carries the why-this-person reference the agent reads at invocation. Patch-level: no role mandate changed, no stage mechanics changed, no consumer-visible API changed.

### Added
- `skills/kk-role-design-director/SKILL.md § Character` — Paula Scher body paragraph (Pentagram partner, The Public Theater / Citi / Tiffany / MoMA / Windows 8, multi-direction client presentation that commits hard to one).
- `skills/kk-role-designer/SKILL.md § Character` — Susan Kare body paragraph (original Macintosh icon designer, every state of every icon in full variant sets at 16×16).
- `skills/kk-role-meta-reviewer/SKILL.md § Character` — Erika Hall body paragraph (Mule Design co-founder, *Just Enough Research*, *Conversational Design*, evidence-gated critique). Replaces prior Anna Wintour paragraph in the same section.
- `skills/kk-ds-maintainer/SKILL.md § Character` — Rachel Andrew body paragraph (CSS Grid spec co-editor at W3C, former Smashing Magazine editor-in-chief, bundle discipline).
- `skills/kk-design-system/pipeline.md § Role roster` — footnote pointing agents to each skill's own §Character section for the full reference.

### Removed
- Nothing. Patch release.

### Moved
- `skills/kk-role-design-director/SKILL.md` frontmatter `character.name` — Charlotte Perriand → Paula Scher. Perriand was a designer, not a director; Scher's strategic-commitment work is the prototype.
- `skills/kk-role-designer/SKILL.md` frontmatter `character.name` + voice — Hella Jongerius → Susan Kare. Kare is the prototype for "every state of every variant answered".
- `skills/kk-role-meta-reviewer/SKILL.md` frontmatter `character.name` + voice — Anna Wintour → Erika Hall. Wintour was cultural shorthand for ruthless; Hall is the actual rubric-gated UX reviewer.
- `skills/kk-ds-maintainer/SKILL.md` frontmatter `character.name` + voice — Jessica Hische → Rachel Andrew. Hische is a letterer; Andrew runs production CSS systems with explicit version discipline.
- `skills/kk-design-system/pipeline.md § Role roster` — the four swapped rows rewritten with why-this-person descriptions tied to each practitioner's actual work.
- `package.json` version `1.0.0` → `1.0.1`. Patch bump — character metadata only; no mandate, trigger description, or consumer API changed.

### Open
- Seven other roles (analyst, fresh-eyes, ds-manager, design-engineer, consistency-jobstory, consistency-ds, meta-retro) carry character in frontmatter + some have body paragraphs, others do not. Asymmetric. Not bundled here — user may extend the §Character body-paragraph convention to all roles in a future patch.

## 1.0.0 — 2026-04-23

Pipeline-v3. Eight stages. Ten role skills. Three-track designer parallel collapses to N-per-pattern on one designer track. UX writer role eliminated — designers ship UI copy drafts. Revolutionary protocol deleted — user-approved exceptions replace it. Fresh-eyes jobstory loop (Steve Jobs character, Haiku) frames designer output via pre-question + post-validation. DS Manager absorbs PM role. Design Engineer refined from frontend engineer. Stage-10 reviewer trio becomes two dumb consistency officers (Steve Jobs + Dieter Rams) + one strict meta-reviewer (Anna Wintour, Opus, rubric-gated). Every role carries `model:` + `character:` frontmatter. `kk-ds-frontend` + `kk-ds-supervisor` deprecated, retained for historical session playback. See `proposals/2026-04-23-retro.md` for the full proposal set.

### Added
- `skills/kk-role-design-director/SKILL.md` — Opus, Charlotte Perriand. Brings multiple directions at session open; aligns on one with the human; writes the direction document with pattern blocks, exceptions, alignment transcript. Replaces the deleted `kk-role-art-director`.
- `skills/kk-role-designer/SKILL.md` — Sonnet, Hella Jongerius. Single-track designer, one per pattern block, N parallel. Answers 3a fresh-eyes questions in ASCII across states, variants, edge cases, example content, UI copy drafts. Replaces the deleted `kk-role-designer-conservative`.
- `skills/kk-role-design-engineer/SKILL.md` — Sonnet, Sara Soueidan. Refined frontend engineer. Piece-by-piece landing, state fidelity, designer copy verbatim, dummy text flagged only. DS-engineer mode retained for kit refactors. Replaces the deleted `kk-role-frontend-engineer`.
- `skills/kk-role-fresh-eyes-jobstory/SKILL.md` — Haiku, Steve Jobs. Two modes: pre-designer (3a, naive question list per pattern) + post-designer (3c, pass/fail per question).
- `skills/kk-role-ds-manager/SKILL.md` — Sonnet, Muriel Cooper. Stage 4 PM-absorbing catalog role. Per-block component map, build-order task split, kit-demo references.
- `skills/kk-role-consistency-jobstory/SKILL.md` — Haiku, Steve Jobs. Stage 6a cold-read jobstory audit. Zero upstream context, five-section output.
- `skills/kk-role-consistency-ds/SKILL.md` — Haiku, Dieter Rams. Stage 6b cold-read strict audit against `components.md` + `tokens.json`. Class resolution, token compliance, off-grid spacing, pattern-language drift.
- `skills/kk-role-meta-reviewer/SKILL.md` — Opus, Anna Wintour. Stage 7 rubric-gated verdict. Rejects "it's fine" replies. Six rubric items, each answered with file:line evidence or left open.
- `skills/kk-design-system/pipeline.md` — §Fidelity contract, §Reiterate protocol, §Meta-reviewer rubric, §Dumb-reviewer character, §Role roster sections. Full v3 stage list. Updated §Parallel spawning, §Entry point matching, §Failure mode.
- `proposals/README.md` — convention note for retro-produced proposal files.
- Every role + maintainer SKILL.md `metadata:` — `model:` + `character:` keys. Model tiered Haiku / Sonnet / Opus by role capability. Character tiered women (clever) / men (dumb-reviewer) per role-roster mapping.

### Removed
- `skills/kk-role-art-director/` — replaced by `kk-role-design-director` (renamed + remandated).
- `skills/kk-role-designer-conservative/` — replaced by `kk-role-designer` (renamed + single-track mandate).
- `skills/kk-role-frontend-engineer/` — replaced by `kk-role-design-engineer` (renamed + piece-by-piece + designer-copy-verbatim mandate).
- `skills/kk-role-designer-ux/` — eliminated. Single-track designer only.
- `skills/kk-role-designer-revolutionary/` — eliminated. Canon changes route via `kk-ds-maintainer` retros only.
- `skills/kk-role-ds-reviewer/` — eliminated. Three-hand-off comparative role has no subject under v3.
- `skills/kk-role-concept/` — eliminated. Concept stage collapses into the design-director's direction document.
- `skills/kk-role-ux-copywriter/` — eliminated. Designers ship UI copy drafts at 3b; no separate writer.
- `skills/kk-role-ux-copy-reviewer/` — eliminated. Voice binding enforced at meta-reviewer rubric item 5.
- `skills/kk-design-system/manifesto.md § Revolutionary protocol` — section deleted. Replacement affordance: user-agreed exceptions in the direction doc, logged via meta-reviewer rubric item 6.

### Moved
- `skills/kk-design-system/manifesto.md § Pipeline` — updated to name eight stages, ten roles, no in-pipeline canon changes.
- `skills/kk-ds-frontend/SKILL.md` + `skills/kk-ds-supervisor/SKILL.md` — frontmatter marked `status: deprecated` with `replaced-by:` pointers. Files retained for historical session playback.
- `package.json` version `0.13.0` → `1.0.0`. Major bump: nine role-skill `description:` trigger phrases changed (renames, new mandates, deprecations), pipeline stage numbers renumbered consumer-visible, six role skills deleted. Backward-incompatible with pipeline-v2 session folders.
- `package.json` description field — eight-stage pipeline-v3 summary.
- `package.json` `files` array — pruned six deleted role skill dirs, added five new ones, tracked the three renames.
- Role SKILL.md `metadata.version` unchanged per precedent.

### Open
- `.claude-plugin/plugin.json` still reads `0.4.0`; `package.json` sits at `1.0.0`. Drift flagged in 0.12.1; not bundled here per the proposal's scope discipline. Resync remains its own decision.
- Existing `documentation/<session>/` folders under the v2 schema (e.g. `2026-04-22-wealthy-operator-alpha`) remain under pipeline-v2 filenames. Not backported. Only new sessions use v3 schema.

## 0.13.0 — 2026-04-22

Comment: `Approve` + `Archive thread` actions in kebab menu. Resolved threads collapse to checkmark + replacement snippet. Archived threads hidden via `data-archived` (data preserved for future UI). `kk:comment` event gains `approve` (carries `replacementText` + anchor for doc-body sync) and `archive` (thread kept, not removed) action types.

### Added
- `js/kit.js` — two new menu items (`Approve`, `Archive thread`) in `buildMessage`. New kebab branches in the selection-flow click handler: `Approve` validates the thread's last list message carries `data-author-role="agent"`, collapses the thread to a resolved row, and emits `action: 'approve'` with `replacementText` + full anchor triple + `cluster` + `sectionSlug`. `Archive thread` sets `data-archived="true"` and emits `action: 'archive'` with `threadRemoved: false`.
- `js/kit.js` — `commitDraft` now mirrors the draft's anchor metadata (`kkAnchorQuote`, `kkAnchorPrefix`, `kkAnchorSuffix`, `kkSectionSlug`, `kkCluster`) onto the new thread's dataset. Approve re-reads from the thread at action time.
- `js/kit.js` — `refreshApproveAvailability` runs on every kebab open and toggles `data-can-approve="true"` on the thread based on the last list message's `data-author-role`. CSS hides the Approve item when the attribute is absent.
- `style.css` — archived-thread hide rule (`.comment-stack > .comment-thread[data-archived="true"] { display: none; }`). Resolved-thread layout (`.comment-thread__resolved` flexbox row: stamp + snippet + byline). Approve-gating rule (`.comment-thread:not([data-can-approve="true"]) .comment__menu-item--approve { display: none; }`).
- `index.html § Comment` — Lifecycle spec list gains Approve and Archive thread rows. Intro body gains a paragraph naming the four kebab actions. Example stack gains a static resolved-thread card under the existing interactive thread.
- `index.html` — every existing `.comment__menu-popover` (14 total across the doc) updated to carry the four menu items in the new order.
- `skills/kk-design-system/components.md § Comment` — added a paragraph on the 0.13.0 menu surface: four actions, Approve gating on `data-author-role="agent"`, Archive's `data-archived` hide.
- `skills/kk-design-system/manifesto.md` — `action: 'approve'` and `action: 'archive'` payload shapes. Note on `data-author-role` as consumer-owned classification. Total action list updated to five.
- `docs/integration/comment.md` — `approve` and `archive` event sections, full Flask / Next.js / Rails snippets for both, new data-attribute rows (`data-author-role`, `data-resolved`, `data-archived`), and a 0.13.0 row in the version-history table.

### Removed
- Nothing. Additive release.

### Moved
- `package.json` version `0.12.1` → `0.13.0`. Minor bump: two new public action types on the `kk:comment` event, one new `data-*` attribute consumers may set (`data-author-role`), two new CSS state attributes kit writes (`data-resolved`, `data-archived`). Backward-compatible.
- `js/kit.js` `KK.version` string `0.11.0` → `0.13.0` (had been stale since 0.12.0).
- Role SKILL.md `metadata.version` unchanged per precedent.

### Open
- `.claude-plugin/plugin.json` still reads `0.4.0`; `package.json` sits at `0.13.0`. Drift flagged in 0.12.1. Resync remains its own decision, not bundled here.
- Archived threads have no re-surface UI. Data is preserved; the toggle lands when a consumer asks for it.

## 0.12.1 — 2026-04-22

Card rail patch. The "half + half" inset contract now covers raw prose direct-children. Before, kit components paid their 12px half and landed on the 24px rail; a bare `<p>`, `<ol>`, `<ul>`, or `<dl>` dropped inside `.card` paid nothing and sat at the 12px shell. Six call sites in `index.html` exhibited the drift, including the "Empty right now" backlog card and the "Why not auto-merge" caveat card under the iteration section.

The fix is kit-side: the rail contract absorbs raw text and list children. Authors do not wrap a one-line empty state in `card__body` just to get on the rail.

### Added
- `style.css` — new rule `.card > p, .card > ol, .card > ul, .card > dl { padding-left/right: var(--card-inset-x); }` placed alongside the existing `.card > .deck` and `.card > .button` direct-child inset rules. Comment block names the failure mode it closes and the older selector it supersedes.
- `index.html § Card` — two-sentence addition under the variants intro, naming the rail as the default and calling out raw paragraphs and lists.
- `skills/kk-design-system/components.md § Card` — raw-prose code example plus a Rules bullet covering `<p>`/`<ol>`/`<ul>`/`<dl>`.

### Removed
- `style.css` — old rule `.doc .card > .doc__spec { padding-left/right: var(--card-inset-x); }`. `.doc__spec` is always a `<dl>`, so the new `.card > dl` selector covers it in every context. Removing the duplicate leaves one rail path with one owning comment.

### Moved
- `package.json` version `0.12.0` → `0.12.1`. Patch bump: card layout fix, no consumer-visible API change beyond previously off-rail prose now landing on the rail.
- The six existing off-rail call sites in `index.html` (raw `<p>`/`<ol>` direct children of `.card` at lines 2376, 2409, 2606, 2739, 2773, 2876) now render on the 24px rail without any HTML edit. No call-site churn.

### Open
- `.claude-plugin/plugin.json` still reads `0.4.0`; package.json sits at `0.12.1` after this bump. The two have drifted since the 0.4.0 ship and the maintainer skill's lockstep rule is honored only in the breach. Resyncing is its own decision and is not bundled here.

## 0.12.0 — 2026-04-22

Agent communication protocol lands. Every role skill in the pipeline now speaks to the user in caveman register by default: articles, filler, pleasantries, and hedging dropped from conversation output. Structured artefacts (code, file paths, frontmatter, ASCII mockups, JSON component trees, manifest-diff entries, blockquoted user input) render untouched. Auto-clarity carve-out drops caveman for multi-step sequences, destructive confirmations, and clarification requests. User override: `stop caveman` reverts; `/caveman lite` or `/caveman ultra` switches intensity. Source inspiration: JuliusBrussee/caveman.

Scope boundary called out inside the protocol itself: this governs agent-to-user conversation. `voice.md` continues to govern rendered document prose and UI labels. When writing to an artefact, voice.md wins; when replying in conversation, the new protocol wins.

### Added
- `skills/kk-design-system/pipeline.md § Protocols → Agent communication protocol` — new subsection placed between Revolutionary protocol and Documentation contract. Carries the five rule bullets (drop articles / filler / pleasantries / hedging; fragments OK; unchanged surfaces; unchanged structured artefacts; auto-clarity carve-out), the two override commands, and the voice.md boundary.
- Cross-reference line `- ../kk-design-system/pipeline.md — §Agent communication protocol` added to the canon-load block of every role skill: `kk-role-analyst`, `kk-role-art-director`, `kk-role-concept`, `kk-role-designer-conservative`, `kk-role-designer-ux`, `kk-role-designer-revolutionary`, `kk-role-ds-reviewer`, `kk-role-frontend-engineer`, `kk-role-ux-copywriter`, `kk-role-ux-copy-reviewer`, `kk-role-meta-retro` (noted inline since meta-retro loads the full file), `kk-ds-frontend`, `kk-ds-supervisor`. Thirteen skills total.

### Moved
- `package.json` version `0.11.1` → `0.12.0`. Minor bump: additive behavioural rule across every pipeline role.
- Eleven `skills/kk-role-*/SKILL.md` hardlinks into `.claude/skills/` re-linked after the Edit tool's atomic-rename broke them mid-session. Verified via `stat -f "%i"` parity on both paths after re-link. Second session in a row with this failure mode — the maintainer skill's hidden-failure-mode entry continues to earn its place.

### Open
- Nothing carried.

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
