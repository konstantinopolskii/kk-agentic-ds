---
session: 2026-04-26-comment-persist
stage: 5
role: design-engineer
input: 02-direction.md
output: kit.js + integration doc + CHANGELOG + package.json
gate: 6b + 6c run on the built files; 7 follows
---

## What shipped

### `js/kit.js` (0.13.0 → 0.14.0)

- Header docstring documents `KK.extractComments`, `KK.copyComments`, `KK.clearSavedComments`, plus the `KK.config.persist` block.
- `KK.config.persist = Object.assign({ enabled: true, key: 'kk:comments:' + location.pathname, adapter: 'localStorage' }, KK.config.persist || {})`. Same merge pattern as `KK.config.i18n` — defaults first, consumer override second.
- `bound.commentApi` and `bound.commentPersistence` sentinels added.
- `extractCommentsFromDom()` walks `.comment-stack` threads and returns the array shape that matches the `kk:comment` event payload (one schema across both surfaces).
- `initCommentApi()` exposes `KK.extractComments` + `KK.copyComments`. `copyComments` writes `JSON.stringify(data, null, 2)` to `navigator.clipboard` when available.
- `resolvePersistAdapter(cfg)` returns `null` for `'none'` or malformed objects, the validated object for custom adapters, the built-in `localStorage` adapter otherwise. The localStorage adapter wraps reads + writes in try/catch (private-mode quotas, disabled storage).
- `rewrapQuoteInScope(scope, quote, threadId)` — single-text-node walker. Skips text already inside a `.highlight` (idempotent restore). Same single-node trade-off as the original explee inline script.
- `rewrapAllHighlights(doc, stack)` — iterates threads + drafts in the restored stack, finds each thread's section via `kkSectionSlug`, calls `rewrapQuoteInScope`.
- `initCommentPersistence()` — bails when disabled, no adapter, or DOM surfaces missing. Otherwise: load → set `stack.innerHTML` → re-wrap → bind 200 ms debounced `MutationObserver` (childList + subtree + characterData) on the stack. Drafts persist mid-typing because input value mutations bubble as characterData.
- Restore guard: `snapshot.v == null || snapshot.v === 1`. Pre-0.14.0 inline-script snapshots (no `v`) restore as v1.
- `KK.clearSavedComments` is exposed by `initCommentPersistence` only (bound to the resolved adapter). When persistence is disabled, the method is undefined — consumer treats absence as "nothing to clear".
- `KK.init` + `KK.refresh` call `initCommentApi()` and `initCommentPersistence()` alongside the existing modules.

### `docs/integration/comment.md`

- New §Persistence section between §Config and §Consumer patterns.
- Subsections: Default configuration, Three adapter shapes, Snapshot shape, Restore contract, Extract and copy, When to switch persistence off, Migration from inline persistence scripts (pre-0.14.0).

### `CHANGELOG.md`

- New `## 1.6.0, 2026-04-26` entry. Subsections: prose summary, Added, Changed, Migration.

### `package.json`

- `"version": "1.5.1"` → `"version": "1.6.0"`.

## Decision log

### localStorage, not cookies
The user brief says "cookie storaging" but the source artifact (`agreement.html`) uses `localStorage`. Cookies cap at 4 kB per domain — the kit's `comment-stack innerHTML` exceeds that on any non-trivial doc. Read "cookie" as everyday shorthand for client-side browser storage. Stamped at stage 1.

### Auto-on tied to `.comment-stack`, not to `enableCommentSelectionFlow`
The agreement.html consumer never calls enableCommentSelectionFlow because the script handles its own selection flow. Auto-on must not require enable. Stamped at stage 1.

### Restore via `kkAnchor*` dataset, not via tag-path walking
The original inline script walks DOM tag-paths because it has no anchor metadata to lean on. The kit already mirrors `kkAnchorQuote / kkAnchorPrefix / kkAnchorSuffix / kkAnchorSectionSlug` onto every thread + draft dataset (since 0.13.0). Cleaner restore: read the dataset, find the section, walk text nodes for the quote. Stamped at stage 1.

### Drafts persist mid-typing
Reference observes characterData. Reload during draft → keeps the unfinished text. Same observer config in the kit. Stamped at stage 1.

### Single-text-node restore only
Multi-element selections (across `<strong>` etc.) wrap as multiple spans on first paint, but on restore only re-wrap the first single-node match. The thread restores intact; the doc-side highlight is partially lost. Same trade-off the inline script ships today.

### `v` is optional in snapshots
Old inline-script snapshots have no `v` field. Restore accepts `snapshot.v == null || snapshot.v === 1`. Lets `key: 'explee_agreement_comments_v1'` migrate cleanly without forcing the existing user to lose their saved comments.

### Why `extract` / `copy` is always-on
Both methods walk the DOM at call time — they have no persistent state. Exposing them universally costs nothing and means a consumer with `adapter: 'none'` (DB-backed) still gets the JSON-export ergonomic for free.

### Why `clearSavedComments` is conditional on persistence
It calls `adapter.clear()`. With no adapter resolved, there is nothing to clear. Method is undefined — consumer treats absence as a no-op signal.

## Hand-off

Stages 6b + 6c run in parallel on the built files. Then stage 7.
