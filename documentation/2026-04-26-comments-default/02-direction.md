---
session: 2026-04-26-comments-default
stage: 2
role: design-director (kit-refactor recipe — §Exceptions stamped by user)
input: 01-analyst.md
output: API surface + auto-mount logic + opt-out paths + version bump
gate: §Exceptions stamped under user "execute" mandate per kit-refactor recipe
---

## Direction

Comments are a default kit affordance. The kit auto-mounts a `.comment-stack` on any page that ships the kit's three-column shell (`.app` containing `.book` or `#doc`), auto-enables the selection-to-draft flow, and runs persistence per the 1.6.0 rules. Three opt-out switches let consumers turn off any layer independently.

## API surface

### Config (consumer sets before `js/kit.js` loads)

```js
window.KK = {
  config: {
    comments: {
      enabled:    true,   // master switch. false = no injection, no auto-enable.
      autoMount:  true,   // false = kit will not inject a stack; opt-in via consumer HTML.
      autoEnable: true    // false = kit will not auto-call enableCommentSelectionFlow.
    }
  }
};
```

`KK.config.persist` keeps its existing shape — its defaults are unchanged.

### Auto-mount detection

The kit auto-mounts when ALL of these hold:

1. `KK.config.comments.enabled !== false`
2. `KK.config.comments.autoMount !== false`
3. `document.querySelector('.app .book')` or `.app #doc` resolves
4. `document.querySelector('.comment-stack')` does NOT resolve

Mount sequence:

1. Find or create the `.inspector`. If `.app .inspector` exists, reuse it. Otherwise create `<aside class="inspector" aria-label="Comments"></aside>` and append to `.app`.
2. Append `<div class="comment-stack"></div>` to the inspector.

### Auto-enable detection

The kit auto-calls `initCommentSelectionFlow()` when ALL of these hold:

1. `KK.config.comments.enabled !== false`
2. `KK.config.comments.autoEnable !== false`
3. `document.querySelector('.comment-stack')` resolves (after auto-mount, always true unless the consumer explicitly suppressed mount)
4. `document.querySelector('.book') || document.querySelector('#doc')` resolves

This drops the requirement that consumers call `KK.enableCommentSelectionFlow()` explicitly. Existing calls remain idempotent — `commentFlowEnabled` short-circuits.

### Order of operations inside `KK.init()`

Important. Auto-mount must run BEFORE the inspector-stack handler binds, BEFORE persistence restores, and BEFORE selection flow auto-enables. Final order:

1. `initScrollSpy()`
2. `initNarrowView()`
3. `initColumnReveal()`
4. `autoMountCommentSurface()` — NEW. Injects DOM if needed.
5. `initInspectorStack()` — uses delegation; picks up the auto-mounted inspector.
6. `initCommentMenus()`
7. `initCommentApi()`
8. `initCommentPersistence()` — restores into the auto-mounted stack if a snapshot exists.
9. `autoEnableCommentSelectionFlow()` — NEW. Calls `initCommentSelectionFlow()` when criteria hold.
10. `initDeck()`

## Opt-out paths

Three real consumer cases:

| Case | Set | Effect |
|---|---|---|
| App without comments | `comments.enabled: false` | No DOM injection, no selection auto-enable, no persistence (persist module bails when no stack). |
| Custom inspector layout | `comments.autoMount: false` | Kit will not inject. Consumer ships their own `.inspector`/`.comment-stack` (or none). Selection auto-enable still runs if a `.comment-stack` exists. |
| Custom selection handler | `comments.autoEnable: false` | Kit injects the stack but stays out of selection. Consumer binds their own `mouseup`. Same path as the prototype-alpha pattern in `docs/integration/comment.md`. |

## Backward compatibility

- Pages that already render `.comment-stack` in HTML: auto-mount detects and skips. No change.
- Pages that already call `KK.enableCommentSelectionFlow()`: idempotent guard short-circuits the auto-enable call. No double-binding.
- Pages with `.app` but no `.book`/`#doc`: auto-mount skips (fails detection criterion 3). No change.
- Pages without `.app`: auto-mount skips. No change.

The behavioural change applies to one specific shape: a page using `.app` + `.book` (or `#doc`) but NOT carrying its own `.comment-stack`. Pre-1.7.0, that page had no comment functionality. Post-1.7.0, the kit injects the stack and auto-enables selection. Consumers who relied on the old absence set `comments.autoMount: false` (or `enabled: false`).

## Version bump

- `js/kit.js` internal: `0.14.0 → 0.15.0`. Additive feature.
- npm package: `1.6.1 → 1.7.0`. Minor bump. Defaults change behaviour for one specific page shape; opt-out is one line.
- New `### Comments default` section in `docs/integration/comment.md`.
- CHANGELOG entry under `## 1.7.0`.

## §Exceptions (kit-refactor recipe — populated under user "execute" mandate)

Four open questions in 01-analyst.md stamped:

1. Auto-mount detection requires both `.app` AND `.book`/`#doc`. Stamped.
2. Auto-enable runs alongside auto-mount, not gated on persistence. Stamped.
3. Three knobs (`enabled` / `autoMount` / `autoEnable`), defaulting to `true`. Stamped.
4. No backward-compat shim for the explicit `enableCommentSelectionFlow()` call — already idempotent. Stamped.

No new components introduced (mount uses existing `.inspector` + `.comment-stack` classes). No new tokens. No off-grid spacing. No CSS changes.

## Hand-off

Stage 5 reads this file and ships the code + integration doc + CHANGELOG entry.
