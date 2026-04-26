---
session: 2026-04-26-comment-persist
stage: 6b
role: consistency-ds (Dieter Rams)
input: built kit.js + integration doc + CHANGELOG, cold-read against canon
output: PASS with one cosmetic flag (since fixed in stage 5 re-spin)
gate: feeds stage 7
---

## Audit return

# DS audit — comment-persist 1.6.0

## Inventory drift
No drift. JS-only module, no new CSS, no new classes. Selectors used: `.comment-stack`, `.comment-thread`, `.comment-thread__list`, `.comment-msg`, `.card.comment-new`, `.book`, `#doc`, `.highlight`, `.t-subtitle`, `p.t-caption` — every one resolves to canon (components.md §Comment, §List, §Type, §Forbidden allow-prefixes; patterns.md §Three columns). Dataset reads `kkAnchorQuote / kkAnchorPrefix / kkAnchorSuffix / kkSectionSlug / kkCluster / messageId` reuse pre-existing attributes. Restore wraps in `<span class="highlight" data-comment-id="…">` matching the existing draft-time DOM shape.

## API surface symmetry
Pass. `KK.config.persist` mirrors `KK.config.i18n` merge pattern (same `Object.assign({defaults}, KK.config.persist || {})`). Public methods `KK.extractComments`, `KK.copyComments`, `KK.clearSavedComments` match lowerCamelCase + verb-first style of `KK.init`, `KK.refresh`, `KK.enableCommentSelectionFlow`. `extractComments` returns array; `copyComments` returns same array plus side-effect; `clearSavedComments` triggers reload — sensible returns.

## Behavioural consistency
Pass. Both modules follow the bound-sentinel pattern: `bound.commentApi`, `bound.commentPersistence` declared alongside the other module flags; early-return on second entry; flag set after work. Wired into both `KK.init` and `KK.refresh` symmetrically.

**Cosmetic flag (now fixed)**: `KK.clearSavedComments` was assigned inside `initCommentPersistence`, so it was undefined when persistence bailed (no stack, `enabled: false`, `adapter: 'none'`, malformed adapter). Header docstring claimed "no-op when persistence disabled" but it was in fact `TypeError: KK.clearSavedComments is not a function`. **Fix landed in stage 5 re-spin**: `initCommentApi` now installs a default no-op for `KK.clearSavedComments`; `initCommentPersistence` overrides with the real implementation when persistence resolves. Docstring also corrected.

## Doc-prose conformance
Pass. § Persistence in `docs/integration/comment.md` follows the existing § Config section shape — heading, prose intro, snippet, rules, sub-headings.

## Manifesto rules
No relevant visual rules apply. JS module, no surfaces rendered. Pure-signal / 80-20 / chunking / radical-contrast / iPad-feel are visual; this change is behavioural.

## Verdict
PASS. Cosmetic flag closed in stage 5 re-spin.
