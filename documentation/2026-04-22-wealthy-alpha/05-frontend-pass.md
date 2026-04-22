---
session: 2026-04-22-wealthy-alpha
stage: 4a
role: frontend-reviewer
input: 04-build.md + prototype-alpha/* (first draft)
output: a11y + mobile + simplicity edits
gate: hand to supervisor
---

# Stage 4a — Frontend pass

Four vectors walked: semantics/a11y, simplicity, mobile, browsers.

## Findings

- **Semantics/a11y:** Stage pills had `title` but no `aria-label` — screen readers hear "1", "2", "3" without context.
- **Semantics/a11y:** Stars used `role="radiogroup"` but children were `<button>`, not `role="radio"` — broken contract.
- **Mobile:** `.proto-star` was 40×40, below the 44×44 floor.
- **Mobile:** Stage pills shrank below the 44×44 floor at kit's narrow breakpoint.
- **Simplicity:** `findThread` and `activeCommentStack` were one-shot helpers. Inline.
- **Browsers:** Clean. `String.prototype.replaceAll` matches the kit's modern-browser floor. No `structuredClone`, no `Array.prototype.at`, no TLA.

## Changes applied

1. Added `aria-label` to each of the seven stage pills: `aria-label="Стадия N, <stage name>"`.
2. Added `role="radio"` + `aria-checked="false"` to all five star buttons.
3. Synced `aria-checked` on rating change (click handler updates every star's aria state, not just the visual).
4. Grew stage pills to `min-width: 44px; min-height: 44px` with `padding: var(--space-2) var(--space-3)`.
5. Grew stars from 40×40 to 44×44; bumped font size from 20px to 22px.
6. Inlined `findThread` at the single call site in `resolveCard`.
7. Inlined `activeCommentStack` at the single call site in `makeDraft`.

## Changelog block

```
## Changes
- [semantics] aria-label on stage pills → "1" alone is not an accessible name.
- [semantics] role="radio" + aria-checked on star buttons → matches radiogroup contract.
- [mobile] Stage pills grown to 44×44 min → touch-target floor.
- [mobile] Stars grown from 40×40 to 44×44 → same.
- [simplicity] Inlined findThread, activeCommentStack → one call site each.
- [semantics] Stars sync aria-checked on rating change.
```

## What did not change

- Kit classes on every element.
- DOM shape.
- Token values.
- Order of content.

## Gate

Hand to supervisor (stage 4b).

## Hand-off

→ Stage 4b, `06-supervisor-fail.md`.
