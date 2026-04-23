---
session: 2026-04-22-wealthy-operator-alpha
stage: 10
role: ux-copy-reviewer
input: prototype-operator-alpha/{index.html, data.js, app.js} + 09-ux-copywriter.md
output: voice audit across 75 filled slots, button-discipline check on 10 labels + 4 kit-literal kebab items, empty/error state check on 2 empty states, AI-tell sweep, placeholder leftover count
gate: pass
---

# UX copy reviewer — Wealthy operator alpha

Stage 10 ran the six-vector voice audit on the copy-complete prototype. Walked shape, button discipline, error/empty-state shape, AI-tell inventory, muted-text discipline, cross-surface consistency. Cross-checked against prototype-alpha as the approved voice anchor.

## Raw input

> stage-10 UX copy reviewer, running in parallel with frontend reviewer + consistency reviewer on the fully-copied prototype. Inputs — prototype-operator-alpha/index.html, data.js, app.js. Context — 09-ux-copywriter.md, kk-design-system/voice.md, kk-design-system/manifesto.md §voice-relevant, prototype-alpha/index.html as voice anchor. Flag strings; do not edit.

Stage-9 hand-off artifact — `documentation/2026-04-22-wealthy-operator-alpha/09-ux-copywriter.md`. 75 slots filled, primary-verb discipline applied, register split between Russian operator-facing strings and English kit-dispatch kebab literals documented as a v0.14.0 kit gap.

## Verdict

PASS. Voice clean. Zero AI-tells. Zero leftover `<!-- -->` placeholders. Ten buttons imperative + sentence case + under 24 chars. Two empty states follow `state + action` shape. Muted usage confined to metadata.

## Voice audit

Walked the six vectors against `voice.md` and cross-checked the anchor (`prototype-alpha/index.html`). Body copy in the strategy section is lifted verbatim from the anchor — voice stays locked to the approved register. New copy added at stage 9 (button labels, section subtitles, empty states, thread bodies in `data.js`) sits flush with that register.

No strings flagged. No AI-tells. No "I". No rule-of-three. No "not X, but Y". No filler adjectives (vibrant / robust / seamless / comprehensive / holistic — absent). No buzzy nouns (tapestry / journey / ecosystem / landscape — absent). No -ing filler verbs (showcasing / fostering / highlighting — absent). No copula avoidance (serves as / represents / features — absent). No padding transitions (Additionally / Moreover / Furthermore — absent). No moralizing closers. No weasel attribution. No "such as" exhaustive lists. No mechanical boldface.

**Em-dash survey.** Zero em-dashes in visible headings. Em-dashes appear only in Russian body prose for canonical clause-joining — consistent with voice.md's "rare in body" allowance and with the prototype-alpha anchor. One borderline instance logged for record, not flagged:

- `index.html:7` — `<title>Стратегия для Нелли Кам — kk.consulting</title>`. `<title>` is a browser-tab label, not a rendered headline, and the exact pattern appears in `prototype-alpha/index.html:6`. Voice anchor precedent. Pass.

**Muted-text survey.** All `t-muted` usage is metadata or captions, per `voice.md` §Muted text:
- `index.html:72, 144, 209, 287` — four `t-display--medium t-muted` section subtitles. Anchor-locked pattern from `prototype-alpha/index.html:112, 161, 205` etc. Subtitles function as byline metadata under the noun-headline. Pass.
- `index.html:116` — `20 USD` price caption. Metadata. Pass.
- `index.html:127` — `7 открытых тредов в доке` context caption. Metadata. Pass.
- `index.html:302` — `Подписать можно в любой момент.` signoff-pending byline. Metadata. Pass.
- `index.html:409` — `Агент задаст уточнения здесь. Пока тишина.` future-reserved caption. Metadata. Pass.
- `index.html:420` — `data-context-count` container for the live count line. Metadata. Pass.

No body text in muted. No structural marker (field label, spec key, nav row) in muted. Stage row `Доставлено` uses `t-subtle` (future-disabled state, not muted color per the copywriter hand-off).

**Register consistency.** The operator surface reads Russian end-to-end. The four English kit-dispatch kebab labels (`Approve` / `Reply` / `Archive thread` / `Delete`) are documented as a kit v0.14.0 i18n gap in `08-frontend-engineer.md` and accepted by stage 9. Not a copy failure — a kit-contract constraint. No flag to copywriter.

## Button discipline audit

Ten operator-facing button labels plus four kit-literal kebab items. All pass.

| Location | Label | Imperative | Sentence case | Len | Verdict |
|---|---|---|---|---|---|
| `index.html:130` brief primary | Улучшить на месте | yes | yes | 17 | pass |
| `index.html:132` brief secondary | Пересобрать бриф | yes | yes | 16 | pass |
| `index.html:134` brief secondary | Пересобрать весь док | yes | yes | 20 | pass |
| `index.html:195` research primary | Учесть комментарии | yes | yes | 18 | pass |
| `index.html:197` research secondary | Пересобрать ресерч | yes | yes | 18 | pass |
| `index.html:199` research secondary | Добавить ресерч | yes | yes | 15 | pass |
| `index.html:273` strategy primary | Улучшить на месте | yes | yes | 17 | pass |
| `index.html:275` strategy secondary | Переписать | yes | yes | 10 | pass |
| `index.html:277` strategy secondary | Пересобрать весь док | yes | yes | 20 | pass |
| `index.html:344` signoff primary | Подписать | yes | yes | 9 | pass |
| `app.js:75` kebab item | Approve | yes | yes | 7 | pass (kit literal) |
| `app.js:77` kebab item | Reply | yes | yes | 5 | pass (kit literal) |
| `app.js:79` kebab item | Archive thread | yes | yes | 14 | pass (kit literal) |
| `app.js:81` kebab item | Delete | yes | yes | 6 | pass (kit literal) |

Primary vs secondary inside one card — labels never collide. Brief card: `Улучшить на месте` / `Пересобрать бриф` / `Пересобрать весь док` — three distinct labels. Research card: `Учесть комментарии` / `Пересобрать ресерч` / `Добавить ресерч` — three distinct. Strategy card: `Улучшить на месте` / `Переписать` / `Пересобрать весь док` — three distinct. Cross-card repetition of `Улучшить на месте` (brief primary + strategy primary) and `Пересобрать весь док` (brief secondary + strategy secondary) is intentional per the stage-9 decision log — same action name for same action, documented.

Verb-family consistency across the prototype — `Пересобрать` used for destructive regen (`бриф` / `ресерч` / `весь док`), `Улучшить` used for additive regen in place, `Добавить` used for additive new, `Учесть` used for incorporating thread feedback, `Переписать` used for strategy-scope redo, `Подписать` used for final commit. Each verb maps to one distinct action class. No drift.

## Empty/error state audit

Two empty states present. No error states — stage-9 doc confirms this is a review-state fixture with no validation paths. Error-state shape reserved for the next build pass.

| Location | String | Shape | Verdict |
|---|---|---|---|
| `index.html:291` notes section body | `Пусто. Выделите абзац в документе и оставьте комментарий, чтобы агент дописал сюда строку.` | state + action | pass |
| `index.html:409` inspector future-reserved caption | `Агент задаст уточнения здесь. Пока тишина.` | action + state | pass |

Both honest, short, no moralizing, no filler. Each has an action or an expectation. Under 120 chars each.

## Leftover placeholders

Zero `<!-- -->` placeholder comments unfilled. `Grep` for empty comment markers across all three files returns only the frontend engineer's intent-comments (length budgets, function descriptions) which are retained on purpose per stage-9 doc for retro. No empty attribute, element, or text node remains.

Search pattern `<!--\s*-->` against `prototype-operator-alpha/` — zero matches.

## Gate

Pass. Copy ships.

## Hand-off

Waits for the two parallel stage-10 reviewers — `kk-ds-frontend` and `kk-ds-supervisor`. When all three reviewers return pass, the prototype ships. On any failure in another lane, the owning stage fixes its vector; the copy lane stays closed.

Copywriter not recalled. Nothing to fix.
