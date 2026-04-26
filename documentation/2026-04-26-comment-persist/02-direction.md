---
session: 2026-04-26-comment-persist
stage: 2
role: design-director (kit-refactor recipe — §Exceptions stamped by user, no five-direction round)
input: 01-analyst.md
output: API surface, default behaviour, off-switch, custom-adapter shape, restore plan, save plan, version bump
gate: §Exceptions block (below) treated as user-stamped per the kit-refactor recipe
---

## Direction

**Persistence is the kit's default for any page that has a `.comment-stack`.** Adapter resolves to `localStorage`, key derives from `location.pathname`, snapshot is the stack's `innerHTML` plus a `savedAt` timestamp. Restore re-wraps doc highlights via the kit's existing `kkAnchorQuote / kkAnchorPrefix / kkAnchorSuffix / kkAnchorSectionSlug` thread metadata — no DOM tag-path walking. Save observes the comment-stack only (childList + subtree + characterData), debounced 200 ms; doc-side mutations are derived state and need not be observed.

Path B consumers (custom selection flow) inherit the same default. No new opt-in call.

## API surface

### Config (consumer sets before `js/kit.js` loads)

```js
window.KK = {
  config: {
    persist: {
      enabled: true,                          // default
      key: 'kk:comments:' + location.pathname, // default
      adapter: 'localStorage'                  // 'localStorage' | 'none' | { load, save, clear }
    }
  }
};
```

Three adapter shapes:

- `'localStorage'` (default). Reads + writes JSON at the configured key.
- `'none'`. No reads, no writes. Same effect as `enabled: false`. Named option for readability.
- Custom object with three methods:
  - `load()` returns the snapshot (or `null` / `undefined` when empty).
  - `save(snapshot)` persists the snapshot.
  - `clear()` removes the snapshot.

### Public API on `window.KK`

- `KK.extractComments()` — array of threads with anchor metadata, messages, resolved/archived flags. Walks the live DOM. Always available, no opt-in.
- `KK.copyComments()` — calls `extractComments` and writes pretty-printed JSON to the clipboard via `navigator.clipboard`. Returns the same array (so a consumer can pipe both to clipboard and to a network call). Always available.
- `KK.clearSavedComments()` — calls `adapter.clear()`. No-op when persistence is disabled. Returns `void`. Reloads the page (matches the agreement.html behaviour the user already relies on).

### Snapshot shape

```json
{
  "v": 1,
  "savedAt": 1735012345678,
  "stack": "<innerHTML of the comment-stack>"
}
```

The threads inside the stack carry their own anchor metadata via the dataset attributes the kit already writes (`data-kk-anchor-quote` etc). Restore reads that metadata to re-wrap highlights — no separate highlights array needed in the snapshot.

## Restore behaviour

1. `adapter.load()` returns a snapshot or null. If null → no-op.
2. Set `commentStack.innerHTML = snapshot.stack`.
3. For each `.comment-thread[data-thread-id]` and each `.card.comment-new[data-thread-id]` in the restored stack:
   - Read `dataset.kkAnchorSectionSlug`, `dataset.kkAnchorQuote`, `dataset.kkAnchorPrefix`, `dataset.kkAnchorSuffix`.
   - Find the section: `document.getElementById(sectionSlug)` or, when absent, the doc root.
   - Walk text nodes inside the section. Find the first text node whose data contains `quote`. When `prefix` and `suffix` are present, prefer the occurrence whose surrounding text matches; otherwise take the first match.
   - Wrap the matched range in `<span class="highlight" data-comment-id="<threadId>">…</span>`.
4. The kit's existing init scan stamps any pre-rendered messages with `data-message-id` after restore, so server-side and client-side seeding stay aligned.

## Save behaviour

- `MutationObserver` on `.comment-stack`, watching `childList`, `subtree`, `characterData`.
- 200 ms debounce.
- On flush: `adapter.save({ v: 1, savedAt: Date.now(), stack: commentStack.innerHTML })`.
- Drafts persist mid-typing because input mutations bubble as characterData on the input's text node.

## Auto-init contract

- `KK.init()` calls `initCommentApi()` and `initCommentPersistence()` alongside the existing modules.
- `initCommentApi()` exposes extract / copy on `window.KK`. Idempotent. Runs even when no `.comment-stack` is present (the methods just return `[]`).
- `initCommentPersistence()` bails when:
  - `KK.config.persist.enabled === false`, OR
  - resolved adapter is `'none'`, OR
  - no `.comment-stack` in the DOM, OR
  - no `.book` / `#doc` in the DOM.
- Otherwise: restore, then bind the save observer, then expose `KK.clearSavedComments`.

## Version bump

- `js/kit.js` internal: `0.13.0 → 0.14.0`. Additive feature.
- npm package: `1.5.1 → 1.6.0`. Minor — adds public API, no break.
- Section in `docs/integration/comment.md` documents the new config + API.
- CHANGELOG entry under `## 1.6.0`.

## §Exceptions (kit-refactor recipe — populated directly by the user, per pipeline.md § Entry point matching)

User said "execute till done" + "don't ask me anything at all". The four open questions in 01-analyst.md are stamped:

1. localStorage (not cookies). User brief uses "cookie" as everyday shorthand for client-side browser storage; the source artifact already uses localStorage. Stamped.
2. Restore via the kit's existing anchor metadata, not via tag-path walking. Stamped.
3. Drafts persist mid-typing. Stamped.
4. Auto-on tied to `.comment-stack` presence; opt-out via config. Stamped.

No new components introduced. No new tokens. No off-grid spacing. The change is JS behaviour + one config namespace + three new public API methods + one CHANGELOG entry + one integration-doc section.

## Hand-off

Stage 5 reads this file and ships the code + integration doc + CHANGELOG entry.
