---
session: 2026-04-26-comments-html-attr
stage: 5
role: design-engineer
input: 01-direction.md
output: kit.js + integration doc + CHANGELOG + package.json
gate: 6b + 6c run on the built files; 7 follows
---

## What shipped

### `js/kit.js` (0.15.0 → 0.15.1)

- `readCommentsDataAttributes()` reads `<html data-kk-comments[-mount|-enable]>` into an object with `{ enabled?, autoMount?, autoEnable? }`. Maps `"off"` → `false`, `"on"` → `true`, anything else → undefined.
- The `KK.config.comments` merge now has three layers: defaults → readCommentsDataAttributes() → explicit `KK.config.comments` set by the consumer. Same layering convention as the existing i18n / persist namespaces, with the html data attribute layer slotted in the middle.
- `initCommentSecretCopy()` injects an aria-hidden, opacity-0 `<h2 data-kk-action="copy-comments">Comments</h2>` at the top of any inspector that hosts a `.comment-stack`. Inline-styled (no new CSS class). Click target is the top ~24 px of the inspector. A delegated `click` handler on `document` watches `[data-kk-action="copy-comments"]` and calls `KK.copyComments()`. Idempotent via `bound.commentSecret`.
- `KK.init` and `KK.refresh` call `initCommentSecretCopy` after `autoEnableCommentSelectionFlow` (KK.copyComments must be installed first).

### `docs/integration/comment.md`

- New `### Declarative html data-attribute opt-out (1.7.1)` subsection inside `## Comments default`. Documents the three attributes, values, precedence, and placement rationale.

### `CHANGELOG.md`

- New `## 1.7.1, 2026-04-26` entry documenting both features.

### `package.json`

- `"version": "1.7.0"` → `"version": "1.7.1"`.

## Decision log

### `<html>`, not `.app`
User stamped: "Not an app. Only if app is the key meta level tag that is on the highest level." `.app` is a layout class. Document-level config belongs at the document root.

### Three parallel attributes, not one composite
Mirrors the JS config 1:1. A composite attribute (`data-kk-comments="no-mount"`, etc.) would couple the three knobs into a state-machine syntax that does not match the underlying API.

### Precedence: defaults → data attrs → explicit JS
A consumer can paste a global default into a CMS template's `<html>` and override per-page in a `<script>` block. The same precedence the kit's i18n / persist configs already use.

### Easter egg: aria-hidden, opacity-0, font-size-0, absolute over inspector top padding
Headline element exists in the DOM (so devs find it semantically). Visually invisible (so readers do not). Clickable hit area is the top ~24 px of the inspector — a strip that already sits in the inspector's padding, no visible content displaced.

### Inline styles, not a new class
The user framed the easter egg as "for now." A new CSS class would land in canon and require a follow-up to remove. Inline styles keep the egg self-contained.

### Click delegate on document
Survives DOM mutations from auto-mount + persistence restore. One handler per page; the bound flag prevents re-binding on KK.refresh.

## Hand-off

Stages 6b + 6c run in parallel.
