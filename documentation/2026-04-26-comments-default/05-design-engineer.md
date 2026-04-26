---
session: 2026-04-26-comments-default
stage: 5
role: design-engineer
input: 02-direction.md
output: kit.js + integration doc + CHANGELOG + package.json + demo cleanup
gate: 6b + 6c run on the built files; 7 follows
---

## What shipped

### `js/kit.js` (0.14.0 → 0.15.0)

- Header docstring documents `KK.config.comments` and notes that `enableCommentSelectionFlow` runs automatically by default.
- `KK.config.comments = Object.assign({ enabled: true, autoMount: true, autoEnable: true }, KK.config.comments || {})`. Same merge pattern as `i18n` and `persist`.
- `bound.commentMount` and `bound.commentAutoEnable` sentinels added.
- `autoMountCommentSurface()` runs when `comments.enabled` and `comments.autoMount` are both true. Bails when `.app` is missing, when `.book`/`#doc` is missing, or when a `.comment-stack` already exists. Otherwise reuses the existing `.inspector` (or creates `<aside class="inspector" aria-label="Comments">`) and appends `<div class="comment-stack">`. Idempotent.
- `autoEnableCommentSelectionFlow()` calls `initCommentSelectionFlow()` when `comments.enabled` and `comments.autoEnable` are both true and a `.comment-stack` plus `.book`/`#doc` exist. Idempotent through `bound.commentAutoEnable`. Existing explicit `KK.enableCommentSelectionFlow()` calls remain idempotent through the flow's own `commentFlowEnabled` sentinel — no double-binding.
- `KK.init` and `KK.refresh` reorder: `autoMountCommentSurface` runs after `initNarrowView` and BEFORE `initColumnReveal` so an injected inspector participates in the staggered reveal. `autoEnableCommentSelectionFlow` runs AFTER `initCommentPersistence` so the selection flow binds to a restored stack.

### `docs/integration/comment.md`

- New `## Comments default` section at the top, before `## The enable-or-own decision`. Subsections: prose intro, "Three opt-out switches", "When auto-mount runs".

### `CHANGELOG.md`

- New `## 1.7.0, 2026-04-26` entry. Subsections: prose summary, opt-out switches, backward-compat notes, Added, Changed.

### `package.json`

- `"version": "1.6.1"` → `"version": "1.7.0"`.

### `demos/comment-persistence/index.html`

- Removed the explicit `KK.enableCommentSelectionFlow()` call. Replaced with a comment explaining that the kit auto-enables as of 1.7.0 — the demo proves the new default by shipping zero call-site code for it.

## Decision log

### `.app` + `.book`/`#doc` is the auto-mount trigger
Adding columns to layouts that did not opt into the kit's three-column shell would break consumer pages. The combined detector signals deliberate kit-shell intent.

### Three knobs, not one
The user pre-stamped this in 02-direction. Three real consumer cases map to three switches: app without comments (`enabled: false`), custom inspector layout (`autoMount: false`), custom selection handler (`autoEnable: false`). One master switch could not separate the second from the third.

### Auto-mount runs BEFORE column-reveal
The injected inspector must participate in the staggered reveal cascade. Reordering covers this; the rest of `KK.init` carries on as before.

### Auto-enable runs AFTER persistence
Persistence restores the stack `innerHTML`. If `autoEnable` ran first, `initCommentSelectionFlow`'s init scan would stamp message ids on a stack that gets replaced moments later. Running auto-enable after persistence means the flow stamps the restored DOM. Same order persistence and the existing manifesto/agreement pages already relied on.

### No CSS changes
Auto-mount uses existing `.inspector` and `.comment-stack` classes. `<aside class="inspector" aria-label="Comments">` follows the same shape as the manifesto's hand-authored inspector. An empty inspector with only `.comment-stack` renders as a visually empty column until a draft appears — acceptable for the auto-mount default. Consumers who want richer inspector content set `comments.autoMount: false` and ship their own.

### Demo dropped its explicit enable call
Showing zero call-site code for the selection flow proves the new default to anyone reading the demo. The agreement.html and manifesto root similarly benefit from removing the call, but those edits are deferred — they are static external surfaces; touching them is out of session scope.

## Hand-off

Stages 6b + 6c run in parallel on the built files. Then stage 7.
