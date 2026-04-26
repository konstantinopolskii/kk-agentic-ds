---
session: 2026-04-26-comments-html-attr
stage: 7
role: meta-reviewer (Anna Wintour)
input: 01-direction.md + 05-design-engineer.md + 06b-consistency-ds.md + 06c-voice.md + the built files
output: PASS
gate: ship
---

## Adapted rubric (kit-internal artifact)

### 1. Direction-doc API surface has an implementation in the built code.

PASS. Six surfaces named in the direction doc resolve in `js/kit.js`:

| Surface | Built |
|---|---|
| `<html data-kk-comments>` reads | `readCommentsDataAttributes` reads `dataset.kkComments`. |
| `<html data-kk-comments-mount>` reads | `dataset.kkCommentsMount`. |
| `<html data-kk-comments-enable>` reads | `dataset.kkCommentsEnable`. |
| Three-layer merge: defaults → data attrs → explicit JS | `Object.assign({defaults}, readCommentsDataAttributes(), KK.config.comments || {})`. |
| Hidden `<h2 data-kk-action="copy-comments">` injection | `initCommentSecretCopy` builds the heading, sets aria-hidden + inline styles, inserts at the top of the inspector. |
| Click delegate → `KK.copyComments()` | Document-level click handler watches `[data-kk-action="copy-comments"]` and invokes `KK.copyComments`. |

14/14 implementation checks pass via static grep.

### 2. Zero off-inventory components.

PASS per stage 6b. No new CSS classes. New `data-kk-*` attributes follow the kit's existing `data-*` namespace convention. The injected `<h2>` lacks a typography class but renders zero visible content.

### 3. Zero AI-tells.

PASS per stage 6c re-audit. First pass FAILED with three defects ("Easter egg" buzz noun in CHANGELOG + kit.js, "dev-ergonomic" filler adjective in CHANGELOG, em-dash for punch in CHANGELOG). Stage 5 re-spun. Re-audit PASS.

### 4. User-agreed exceptions carry paper trail.

PASS. `01-direction.md § Exceptions` records six user stamps: `<html>` placement, three parallel attributes (not composite), explicit-JS-wins precedence, egg lives outside the comment-stack, inline styles + no canon edit, "Comments" headline label.

### 5. Session-specific completeness.

PASS. The direction doc named two features; both ship complete:

- Declarative html data-attribute opt-out works for all three knobs with full precedence semantics. Verified by grep.
- Hidden copy target injects on every page with `.comment-stack` + `.inspector`. Click delegate fires `KK.copyComments`. Removable in one revert.

## Verdict

PASS. Ship.
