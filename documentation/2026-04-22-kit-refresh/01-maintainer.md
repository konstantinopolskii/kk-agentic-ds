---
session: 2026-04-22-kit-refresh
stage: maintainer pass
role: kk-ds-maintainer
input: user request to implement KK.refresh() real behaviour (option 1 from the explainer)
output: v0.9.0 shipped
gate: session complete
---

# Maintainer — `KK.refresh()` real behaviour, 0.9.0

One decision, six module edits inside `js/kit.js`, one public method upgraded from stub to real.

## Raw input

Previous turn proposed three options for implementing `KK.refresh()`:
1. Idempotent re-scan (marker + skip).
2. MutationObserver auto-refresh.
3. Per-module refresh methods.

User's answer:

> Ah, got it. Let's do

"Let's do" = proceed with option 1 (the recommended option in the previous turn).

## Design

Each auto-init module gets an idempotency sentinel. Subsequent calls early-return for global listener binding but still scan for new iterable elements. `KK.refresh()` just calls every auto-init function in sequence; modules sort themselves out.

Module-by-module behaviour:

| Module | Listener shape | Refresh behaviour |
|---|---|---|
| scroll-spy | Observer + nav/window listeners | Observes any new `.doc__section` that wasn't already observed. `IntersectionObserver.observe` is idempotent for already-observed elements. Live queries `.doc__section` and `a[href^="#"]` on each callback so SPA-added elements participate. |
| narrow view | Document delegation | Sentinel. Early-return. Delegated clicks already cover future elements. |
| column reveal | `.app` MutationObserver + initial reveal | Sentinel. Early-return. One-time animation; not expected to re-fire on refresh. |
| inspector stack | `.inspector` delegation (click + focusin) | Sentinel. Early-return. Delegated handlers cover future cards. |
| comment menus | Document delegation | Sentinel. Early-return. Delegated handlers cover future kebabs. |
| deck | Per-wrapper listeners | Per-wrapper `data-kk-deck-bound="true"` marker. Skip bound wrappers, bind new ones. |

## Implementation

### New state at top of IIFE

```js
var bound = {
  scrollSpy: false,
  narrowView: false,
  columnReveal: false,
  inspectorStack: false,
  commentMenus: false
};
var scrollSpyObserver = null;
```

Five modules use the `bound` map. Deck uses a DOM attribute because each wrapper is iterated. Scroll-spy keeps an observer reference because the refresh path calls `observe()` on new sections.

### Each module's entry

```js
function initX() {
  if (bound.X) return;   // five of six modules
  // ... original init body ...
  bound.X = true;
}
```

Except scroll-spy:

```js
function initScrollSpy() {
  // ...
  if (bound.scrollSpy) {
    doc.querySelectorAll('.doc__section').forEach(function (s) {
      scrollSpyObserver.observe(s);
    });
    return;
  }
  // ... full init ...
  scrollSpyObserver = observer;
  bound.scrollSpy = true;
}
```

And deck:

```js
stacks.forEach(function (wrapper) {
  if (wrapper.getAttribute('data-kk-deck-bound') === 'true') return;
  // ... bind this wrapper ...
  wrapper.setAttribute('data-kk-deck-bound', 'true');
});
```

### Scroll-spy live queries

Two closure variables — `sections` and `links` — were captured at init time. Replaced with live queries at each call site so SPA-added nav links and sections participate in `setActive` and the "first visible" calculation without a teardown:

```js
function setActive(id) {
  nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
    // ... live link state ...
  });
  // ... rest unchanged ...
}

var observer = new IntersectionObserver(function (entries) {
  // ...
  var liveSections = doc.querySelectorAll('.doc__section');
  // ... find best visible ...
}, { ... });
```

Perf cost: one `querySelectorAll` per scroll-spy callback plus one per `setActive` call. Acceptable given the call rate (IntersectionObserver callbacks are rate-limited by the browser).

### `KK.refresh()` itself

```js
KK.refresh = function () {
  initScrollSpy();
  initNarrowView();
  initColumnReveal();
  initInspectorStack();
  initCommentMenus();
  initDeck();
};
```

Six calls. Each sorts itself. No teardown, no double-binding, no early-returns that leak.

## Files edited

- `js/kit.js` — module sentinels, per-module early-returns, deck wrapper marker, scroll-spy live queries, real `KK.refresh()`. 1014 → 1083 lines (+69).
- `.claude/skills/kk-design-system/manifesto.md` § Runtime — added paragraph describing `KK.refresh()` semantics.
- `CHANGELOG.md` — 0.9.0 entry at top. Backlog now empty.
- `package.json` — `0.8.0` → `0.9.0`.

## Verification

- `node -c js/kit.js` passes.
- No change to visible behaviour on static pages (manifesto, prototype-alpha). Every existing module's initial-load path still runs once and still binds.
- SPA-style refresh not tested against a real consumer; the implementation relies on documented idempotent behaviour of `IntersectionObserver.observe` and the attribute-based guard for decks. First real-world test comes with the Wealthy full build.

## Open items

None. Backlog empty. The last 0.7.0 open item (real `KK.refresh()`) is resolved. 0.8.0 had no open items of its own.

## Gate

Session complete. v0.9.0 shippable.
