---
session: 2026-04-26-comments-html-attr
stage: 1+2
role: analyst + design-director (kit-refactor recipe — §Exceptions stamped)
input: 00-brief.md
output: API surface, precedence rules, easter-egg shape, version bump
gate: §Exceptions stamped under user stamp from conversation
---

## Direction

Two additions for 1.7.1, both dev-ergonomic, both small.

### 1. Declarative html data-attr opt-out

`<html>` is the highest meta-level element. Three parallel attributes map 1:1 to the existing JS config:

| Attribute | Maps to | Values |
|---|---|---|
| `data-kk-comments` | `KK.config.comments.enabled` | `on` / `off` (else: ignored) |
| `data-kk-comments-mount` | `KK.config.comments.autoMount` | `on` / `off` |
| `data-kk-comments-enable` | `KK.config.comments.autoEnable` | `on` / `off` |

Precedence (lowest to highest):

1. Kit defaults (`true / true / true`).
2. Data attributes on `<html>`.
3. Explicit `window.KK.config.comments.*` set by the consumer.

A consumer can therefore set a global default via data attribute and override per-script. Or set a global default via script and override per-page via data attribute (since the data attribute layer sits between defaults and explicit JS).

Wait — the spec above says explicit JS wins over data attribute. To keep the rule "the more specific surface wins," that's correct: a page that pastes a `<script>KK.config.comments.enabled = false</script>` is making a per-page declaration that overrides any inherited `<html data-kk-comments="on">`. Same precedence the kit's i18n / persist configs already use.

### 2. Hidden copy easter egg

Inject `<h2 data-kk-action="copy-comments" aria-hidden="true">Comments</h2>` at the top of any inspector that hosts a `.comment-stack`. Inline-styled to be visually hidden (opacity 0, font-size 0, no padding, absolute-positioned over the inspector's top padding strip). Clickable hit area is the top ~24 px of the inspector — invisible.

A delegated `click` handler watches for `[data-kk-action="copy-comments"]` and calls `KK.copyComments()` (which already writes pretty-printed JSON to the clipboard).

Devs find the trigger via DevTools (search for `data-kk-action="copy-comments"`) or by grepping the kit. Readers do not see it.

The "for now" framing in the brief signals temporary — the easter egg can be removed without breaking any consumer code (it is a kit-injected element, no consumer markup depends on it).

## §Exceptions (kit-refactor recipe — populated under user stamp)

1. Data attribute placement: `<html>`. User stamp: "Not an app. Only if app is the key meta level tag that is on the highest level."
2. Three parallel attributes (one per JS knob), not one composite attribute. Mirrors the JS config 1:1.
3. Precedence: explicit JS > data attr > kit defaults. User-implicit (matches the existing config-merge convention; user did not direct otherwise).
4. Easter egg lives inside the inspector, not the comment-stack itself. Avoids the existing draft-insertion logic (`commentStack.insertBefore(draft, commentStack.firstChild)`).
5. Easter egg uses inline styles, not a new CSS class. No canon edit. Single-script kit-internal feature.
6. Easter egg trigger label is literal "Comments" — the user's "headline" framing.

## Version bump

- `js/kit.js` internal: `0.15.0 → 0.15.1`. Patch.
- npm package: `1.7.0 → 1.7.1`. Patch.
- Doc + CHANGELOG entries.

## Hand-off

Stage 5 ships both features. 6b + 6c run in parallel. 7 verdicts.
