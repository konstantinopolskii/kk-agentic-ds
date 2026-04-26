---
session: 2026-04-26-comments-html-attr
stage: 6b
role: consistency-ds (Dieter Rams)
input: built kit.js + integration doc + CHANGELOG, cold-read against canon
output: PASS with two minor non-blocking flags
gate: feeds stage 7
---

## Audit return

# DS audit — 1.7.1

## Inventory drift
PASS. `data-kk-action` follows the kit's existing `data-*` hyphenated convention. `data-kk-comments` and siblings on `<html>` introduce a new namespace consistent with the JS config keys 1:1. No new CSS classes. The injected `<h2>` carries no typography utility class, but it is aria-hidden + opacity 0 + font-size 0 — there is no rendered type to violate type rules. The element is a click target dressed as a heading. Defensible as a hidden hit-region.

## API surface symmetry
PASS. `Object.assign({defaults}, readCommentsDataAttributes(), KK.config.comments || {})` — three-layer merge with explicit JS winning. Same convention as the existing two-layer i18n / persist merges. `readCommentsDataAttributes()` returns an object containing only the keys explicitly set; absent keys do not overwrite defaults.

## Behavioural consistency
PASS. `initCommentSecretCopy` uses the bound-sentinel pattern. Bails cleanly on missing `.comment-stack` / `.inspector`. DOM idempotence guard prevents double-injection. Click delegate dereferences `KK.copyComments` lazily so even if order inverted the click would no-op rather than throw.

## Init order
PASS in both `KK.init` and `KK.refresh`. `initCommentApi` (which installs `KK.copyComments`) runs four steps before `initCommentSecretCopy`. Sequencing safe.

## Doc-prose conformance
PASS. New `### Declarative html data-attribute opt-out (1.7.1)` subsection matches sibling subsection conventions. Snippet alignment, sentence case, no AI tells.

## Manifesto rules
PASS for the user-stamped scope. The egg is intentionally invisible — not a clickable element pretending to be something else. The user explicitly framed this as a temporary cheat code "for now."

## Removability of the easter egg
PASS. One function, two call sites, one sentinel, one docstring block, one CHANGELOG paragraph, one doc subsection. No new CSS class, no canon edit, no token. Removal is a single-revert delete.

## Minor flags (non-blocking)
1. The egg writes inline `font-size`, `line-height`, `position: relative` on a kit-owned element. None violate the spirit (no rendered text, no token leak), but they bypass the kit's "no inline styles" stance. Acceptable for the "for now" lifetime.
2. `readCommentsDataAttributes()` is declared after the `Object.assign` that calls it. Function-declaration hoisting saves it; reading order is inverted. Stylistic, not a bug.

## Verdict
PASS. No prior stage owns a fix that gates ship.
