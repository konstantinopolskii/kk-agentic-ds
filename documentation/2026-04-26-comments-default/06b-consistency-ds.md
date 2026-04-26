---
session: 2026-04-26-comments-default
stage: 6b
role: consistency-ds (Dieter Rams)
input: built kit.js + integration doc + CHANGELOG, cold-read against canon
output: PASS
gate: feeds stage 7
---

## Audit return

# DS audit — comments-default 1.7.0

## Inventory drift
PASS. Auto-mount injects only canon-resolved classes. `inspector` and `comment-stack` resolve to canon (`patterns.md § Three columns`, `components.md § Comment`). `aria-label="Comments"` is a label string, not a class. No `proto-` / `tw-` / `u-` prefixes. Zero new classes introduced.

## API surface symmetry
PASS. `KK.config.comments` follows the same `Object.assign({defaults}, KK.config.comments || {})` shape as `KK.config.i18n` and `KK.config.persist`. Same defaults-then-override merge.

## Behavioural consistency
PASS. `autoMountCommentSurface` and `autoEnableCommentSelectionFlow` use the idempotent-bound-sentinel pattern matching every other module. Auto-enable additionally relies on `initCommentSelectionFlow`'s own `commentFlowEnabled` gate so explicit `KK.enableCommentSelectionFlow()` calls do not double-bind.

## Init order
PASS in both `KK.init` and `KK.refresh`. `autoMountCommentSurface()` runs BEFORE `initColumnReveal()` so the injected inspector animates. `autoEnableCommentSelectionFlow()` runs AFTER `initCommentPersistence()` so the flow binds to a restored stack. Inline comment documents the intent.

## Doc-prose conformance
PASS. New `## Comments default` section in `docs/integration/comment.md` carries h2 + intro paragraph + snippet + sub-headings (`### Three opt-out switches`, `### When auto-mount runs`) — same shape as the existing `## Persistence` section.

## Manifesto rules
PASS. iPad feel preserved (three-column shell unchanged). Expected patterns honoured (`.inspector` is the right column, `.comment-stack` hosts comments). 80/20 unchanged.

## Verdict
PASS. No prior stage owns a fix.
