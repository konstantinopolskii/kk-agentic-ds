---
session: 2026-04-22-kit-i18n-tables
stage: maintainer pass
role: kk-ds-maintainer
input: two named decisions (i18n strings overridable, doc-spec first two columns cap at 30%)
output: v0.8.0 shipped
gate: session complete
---

# Maintainer — kit polish, 0.8.0

Two kit changes bundled into one release. Short session.

## Raw input

User's verbatim instruction:

> Okay, let's do. Maybe we can somehow give them more freedom in what they can write in this component or something. Let's do ok. And also let's fix the tables along the way. I would say that max width for first two column in the table is 30% from the whole width

Two decisions, both named plainly:

1. Give consumers "more freedom in what they can write" in the kit.js-generated components. Interpreted as i18n for the four English strings baked into kit.js in 0.7.0 (`"Add a comment"`, `"Reply…"`, `"Choose"`, `"Chosen"`).
2. Cap the first two columns of every `.doc__spec` table at 30% of the table width.

## Decision 1 — i18n via `KK.config.i18n`

### Change

Consumers set a single object on `window.KK` before loading `js/kit.js`. kit.js merges with defaults:

```html
<script>
  window.KK = { config: { i18n: {
    addComment: 'Ваш комментарий',
    reply: 'Ответить…',
    deckChoose: 'Выбрать',
    deckChosen: 'Выбрано'
  } } };
</script>
<script src="../js/kit.js"></script>
```

### Files edited

- `js/kit.js` — merge `KK.config.i18n` with defaults at module load. Added `attrEscape()` helper. Replaced four hardcoded strings: `buildDraft()`'s placeholder, `buildThread()`'s reply placeholder, `setChosen()`'s reset and active labels (three sites total in the deck module).
- `prototype-alpha/index.html` — added a `<script>` that sets `window.KK.config.i18n` to Russian before loading `../js/kit.js`. Placed before all other scripts.
- `.claude/skills/kk-design-system/manifesto.md` § Runtime — added the four-key table and the Russian example HTML.

### Why this shape, not another

The consumer sets the object before kit.js loads. kit.js reads `global.KK` at module load and merges with defaults. This has three properties worth naming:

- **No API surface creep.** The public surface stays three methods (`init`, `refresh`, `enableCommentSelectionFlow`). Config is a data object, not a method.
- **Fail-safe defaults.** A consumer that sets nothing still gets a working kit with English strings. Forgetting the config is not a crash.
- **Merge, not replace.** A consumer that sets only `deckChoose` keeps English for the other three. Partial overrides work.

Alternative considered: a runtime setter (`KK.setLocale({...})`). Rejected because it requires calling it before kit.js binds handlers, which is the same timing constraint as the preload pattern, and adds a method to the public surface without adding expressiveness.

### Regression resolved

Prototype-alpha's deck now shows «Выбрать» / «Выбрано» again, restored to the pre-0.7.0 behaviour. The 0.7.0 CHANGELOG listed this under Open.

## Decision 2 — doc-spec tables cap first two columns at 30%

### Change

Grid-template-columns updated for all three doc-spec shapes:

| Shape | Before | After |
|---|---|---|
| `.doc__spec` | `minmax(140px, max-content) 1fr` | `minmax(140px, 30%) 1fr` |
| `.doc__spec--value` | `minmax(120px, max-content) minmax(60px, max-content) 1fr` | `minmax(120px, 30%) minmax(60px, 30%) 1fr` |
| `.doc__spec--triple` | `1fr 1fr 1fr` | `minmax(0, 30%) minmax(0, 30%) 1fr` |

### Files edited

- `style.css` — three rules updated at lines 1694-1700, 1746-1751, 1755-1757.

### Why 30%, not some other number

User named 30% explicitly. Kept. The constraint is "max 30% each" — columns can be smaller if content is shorter. The third column always gets the remainder, so:

- Short keys + short middle values → third column takes 70%+. Great for reading.
- Long keys → first column wraps at 30%. Overflow-wrap: anywhere (already set on `.doc__spec-key`) handles the break cleanly.
- On narrow viewport (phone), the existing `.doc__spec { grid-template-columns: 1fr }` override stacks the whole spec into one column, so the 30% rule does not apply there.

### Visual implication

The `--triple` shape, which used to be an equal 33/33/33 split, is now 30/30/40 max. Existing Claim/Reality/Resolution tables (Positioning, Ближайшие шаги) gain reading room in the right column. No content changes needed; the table renders differently on next paint.

## Additional file

- `package.json` — version `0.7.0` → `0.8.0`. Description unchanged.
- `CHANGELOG.md` — `## 0.8.0 — 2026-04-22` entry added at top. Sections: Added, Removed, Moved, Open. Two 0.7.0 open items resolved; one carries.

## Verification

- `node -c js/kit.js` passes.
- kit.js line count: 979 → 1014 (+35 for config merge block, attrEscape, i18n inlining).
- Server still returns 200 for `http://localhost:8173/js/kit.js`.
- prototype-alpha browser-side: deck labels now «Выбрать» / «Выбрано» (config pathway). Manifesto browser-side: deck labels still "Choose" / "Chosen" (defaults). No other paths touched.

## Open items carried to 0.9.0

- **`KK.refresh()` real behaviour.** Still a stub. Unchanged from 0.7.0 status. Not in scope for 0.8.0.
- **HTML/config drift guard for deck initial text.** If a consumer sets `deckChoose` in config but writes a mismatched string in the deck HTML, the first paint shows the HTML, the first reset shows the config. Low risk, documented in manifesto; a future version could reconcile by having kit.js stamp initial text from config at init.

## Gate

Session complete. v0.8.0 shippable.
