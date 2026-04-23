---
session: 2026-04-22-wealthy-operator-alpha
stage: 6
role: designer-revolutionary
input: documentation/2026-04-22-wealthy-operator-alpha/03-concept-1.md (+ 02-art-director.md §Chosen direction, + stage-3 gate amendments)
output: hand-off on Signed workshop review state with one manifest-diff entry — unanchored steering note
gate: pending — stage 7 DS reviewer compares against 04-conservative and 05-ux
---

# Revolutionary designer — Wealthy operator alpha

Stage 6. Runs parallel to stages 4 and 5. One rule broken with diff. Review state of happy-path concept 1 on Signed workshop direction. Scope: review state (stage-8 build target) plus flow-wide behaviours that the break propagates to.

## Raw input

Prior stages referenced, not copied:

- `documentation/2026-04-22-wealthy-operator-alpha/02-art-director.md` §Chosen direction — Signed workshop.
- `documentation/2026-04-22-wealthy-operator-alpha/03-concept-1.md` — happy-path walkthrough.
- Gate amendments carried from stage 3 (flat comments, regen scopes default `[Improve in place]`, research controls, comments-as-context-stream, lifecycle Approve/Reject/Leave-unanswered, resolved + archived drop out of context, kit v0.13.0 ships Approve + Archive).

Job story: operator walks brief → prompt → research → draft → review → signoff → delivered. Steers every regen with comments. Comments are context stream — open comments feed every regeneration, not only the one anchored to the span.

## Component list

Kit-canonical unless marked INVENTION or DIFF.

### Typography

`t-hero`, `t-display`, `t-display--medium`, `t-body`, `t-title`, `t-subtitle`, `t-caption`, `t-caption--bold`, `t-micro`, `t-mono`, `t-muted` (metadata only), `t-subtle` (placeholders only).

### Shell

`app[data-view="doc"]`, `sidebar` + `sidebar__header` + `sidebar__nav` + `nav-group` + `sidebar__footer` + `toc__indicator`, `doc#doc` + `doc__section`, `inspector` + `inspector__group`.

### Cards

- `card` static — brief collapsed summary, research sources, per-section control blocks, stages card, future-reserved card.
- `card card--interactive` — comment threads (collapsible reveal) in inspector.
- `card card--shout` — signoff block at doc bottom.

### Fields + inputs

`field field--row`, `field__label`, `field__input`, `field__fake-caret`.

### Buttons

`button`, `button--primary`. One primary per card.

### Tags

`tag`, `tag--bold`.

### Switch

For brief depth toggle (shallow / deep).

### Comments

`comment-new`, `comment-thread`, `comment-msg`, `comment__menu`, `comment-stack`. Kit v0.13.0 ships Approve + Archive kebab actions + resolved-state + archive-hidden visual.

### Spec list

`dl.doc__spec`, `doc__spec-row`, `doc__spec-key`, `doc__spec-value`. Used for brief summary row, stages card rows, research source rows, signoff stats.

### Signoff

`doc__signoff-stats`, `doc__signoff-signature`. Appears in working-layout signoff shout (stats only, pre-sign) and delivered-layout signed title block (stats + signature glyph).

### DIFF — unanchored steering note (one entry in `06-revolutionary-manifest-diff.md`)

Same DOM + classes as the existing anchored `comment-new` → `comment-thread` flow. Opt-in affordance added:

- **`comment-stack__add`** (INVENTION, sub-class of `comment-stack`) — a `button` with `t-subtitle` label rendered as the last child of the threads `inspector__group` header. Click drops a draft `comment-new` at top of stack without requiring a text selection.
- `data-anchor="unanchored"` on the spawned `comment-thread` root — distinguishes it from anchored threads for regeneration scope logic.
- `kk:comment` event payload — `anchorQuote`, `anchorPrefix`, `anchorSuffix` become nullable. `action: 'new'` consumers read null to mean "steering note, not anchored".
- No highlight span inserted in doc body. No scroll-to-anchor behaviour. Thread participates in context stream identically to anchored threads.

## Behaviors

### Kit defaults (unchanged)

- Three-column shell. Only middle scrolls during reading. Sidebar scroll-spy drives `toc__indicator`.
- Narrow collapse below ~800px: inspector slides over, sidebar becomes hamburger.
- `card--interactive` stack — one active at a time, rest collapsed to heading + minimized CTA.
- `card--shout` — one per column. Signoff owns that slot in working layout.
- Selection in doc body drops a draft shout at top of `.comment-stack` (kit.js `enableCommentSelectionFlow()`). Commit turns it into a thread.
- `kk:comment` CustomEvent on `.comment-stack` bubbling — actions `new`, `reply`, `delete`. Kit v0.13.0 adds `approve`, `archive`.
- Per-message `data-message-id` stamped at creation. Local ids, consumer maps to server ids.

### Per stage-3 gate amendments

- **Flat comment stack.** Threads sit as siblings in `inspector__group#threads`. No grouping, no nesting of clusters.
- **Regeneration scopes.** Each per-section control block carries three buttons:
  1. `[Improve in place]` (primary, default) — agent re-edits existing prose respecting open comments + current structure.
  2. `[Redo section]` (secondary, rare) — agent rewrites one section.
  3. `[Redo whole doc]` (secondary, rarest) — agent rewrites entire strategy, seeded from accumulated comments.
  Three buttons break the kit rule "one primary per card" cleanly because `[Improve in place]` stays primary; the two redos are explicitly secondary in both label weight (regular `t-subtitle`) and verb hierarchy. See reasoning §Regen scopes.
- **Research controls** (per research section control block):
  - `[Implement comments in research]` (primary) — agent integrates open research comments.
  - `[Redo research]` (secondary, replace, confirm) — destructive, kit confirm pattern (native `confirm()` in v0.13.0, upgrade later).
  - `[+ Add research]` (secondary, additive) — spawns a new `## Research N+1` section. Prompt seeded from an unanchored steering note (if any) + brief context.
- **Comments-as-context-stream.** Every open comment (not resolved, not archived) flows into every regeneration's prompt. Per-section redo uses the subset anchored to that section's range + all unanchored steering notes. Whole-doc redo uses all open threads.
- **Lifecycle.**
  - **Approve** (kebab menu, kit v0.13.0) — thread marked resolved, goes to doc-level `approvedComments` store, drops out of context stream. Visual: dimmed thread, checkmark glyph.
  - **Reject with answer** — operator writes a reply explaining why, thread stays open, reply becomes part of the context for next regen.
  - **Leave unanswered** — operator advances without resolving. Thread skipped in the next regen batch (consumer filters on `data-cycle-age >= 1`), but still carries weight as strategy context when the operator manually invokes `[Redo whole doc]`.
  - **Archive** (kebab menu, kit v0.13.0) — hidden from inspector stack, `data-archived="true"`, drops out of context stream. Data preserved for audit trail.
- **Resolved + archived drop out of context.** Consumers reading the context stream filter threads where `data-state="resolved"` or `data-archived="true"`.

### DIFF behaviour — unanchored steering note

- **Affordance.** `+ Add steering note` button in threads group header (`t-subtitle` label). Always visible in working layout; hidden in delivered layout.
- **Flow.** Click spawns `comment-new` at top of `.comment-stack`. No doc-body highlight. `field__input` placeholder seeds from i18n key `addSteeringNote` (default "What should every run know?").
- **Commit.** `kk:comment` fires with `action: 'new'`, `anchorQuote: null`, `anchorPrefix: null`, `anchorSuffix: null`, `sectionSlug: null`, `cluster: null`. Thread root carries `data-anchor="unanchored"`.
- **Rendering.** Thread card renders identically to anchored threads except the "Re: 'quoted text'" heading is replaced by `t-caption--bold` "Steering note" label.
- **Context stream.** Unanchored notes flow into every regeneration regardless of scope — `[Improve in place]` per section, `[Redo section]`, `[Redo whole doc]`. Unanchored notes are the steering backbone.
- **Lifecycle.** Same Approve / Reject / Leave / Archive semantics as anchored threads.

### Signoff shout behaviour

- Per direction spec: stats row + guided step list + `[Sign]` primary. Steps guidance, not gates. `[Sign]` enabled whenever `## Strategy` has content.
- Sign triggers doc resort — signoff card flies to top, sections reorder to delivered layout, control blocks fade out, inspector simplifies. Kit transitions only, no custom keyframes.

### Inspector state during working layout

- `inspector__group#stages` — card with `doc__spec` rows, one per stage (Brief, Rsrch brief, Research, Strategy, Notes, Signoff, Delivered). `●` for current, `✓` for past, disabled styling for future.
- `inspector__group#future` — card titled "Agent summary" with `t-caption t-muted` body "(next version)". Labelled placeholder per art-director spec.
- `inspector__group#threads` — group header carries `t-subtitle` "Threads" + `+ Add steering note` button (DIFF). `comment-stack` below. Threads flat, anchored + unanchored siblings.

### Inspector state during delivered layout

- `inspector__group#stages` — unchanged, all rows ticked, Delivered current.
- `inspector__group#delivered` — share URL + `[Copy]` + `[Patch]`.
- `inspector__group#edit-log` — card listing patches, empty on first delivery.
- Threads group hidden (all resolved or archived). `+ Add steering note` hidden.

### Narrow (mobile) behaviour

Kit default. Below ~800px, inspector slides over on demand via hamburger. Control blocks in doc body still show regen scope buttons. `+ Add steering note` lives inside the slide-over inspector.

## Flow ASCII

Review state (step 5 of concept 1). Working layout. Strategy drafted. One anchored thread on `### Позиционирование` (resolved post-redo). One unanchored steering note driving voice consistency. Signoff shout pending.

```
+- sidebar ----+------------ doc body ------------+--- inspector -----+
| Brief      ✓ | <t-hero>                         | + Stages --------+|
| Rsrch brief✓ | Strategy for Sofia               | | Brief        ✓ ||
| Research   ✓ |                                  | | Rsrch brief  ✓ ||
| Strategy   ● | ## Brief (collapsed summary)     | | Research     ✓ ||
|  Обсудили    | +- card -----------------------+ | | Strategy     ● ||
|  Точка А     | | Sofia · deep · Nelli · CV     | | | Notes        · ||
|  Точка Б     | | [Edit brief]                  | | | Signoff      · ||
|  Видение     | +-------------------------------+ | | Delivered    · ||
|  Позицион-е  |                                  | +-----------------+|
|  Гипотезы    | ## Research brief (collapsed)    | + Agent summary -+|
|  Рынок       | ## Research 1                    | | (next version)  ||
|  Шаги        | +- card -----------------------+ | +-----------------+|
|  Как работ-м | | · source 1  yc founder profile| | + Threads -------+|
| Notes      · | | · source 2  exit archive 2021 | | [+ Add steering ||
| Signoff    · | | · source 3  podcast s4e12     | |  note]  ◆DIFF   ||
|              | | · source 4  market map q4     | | +---------------+||
|              | | · source 5  public notes      | | | STEERING ◆    |||
|              | | · source 6  mentor archive    | | | (unanchored)  |||
|              | | · source 7  pricing preced.   | | | "keep verb    |||
|              | | · source 8  3 more sources    | | |  tight across |||
|              | +-------------------------------+ | |  all sections"|||
|              | +- control block --------------+ | | [Reply…]      |||
|              | | 0 threads · 0 unanch. notes  | | | resolved? kebab|||
|              | | [Implement comments in rsrch] | | +---------------+||
|              | | [Redo research]               | | +---------------+||
|              | | [+ Add research]              | | | @Позициониров-||
|              | +-------------------------------+ | | resolved ✓    |||
|              |                                  | | "sharpen verb"|||
|              | ## Strategy                      | | ↳ agent reply |||
|              | ### Что обсудили                 | | ↳ operator ack|||
|              | <t-body> ═══text═══              | | +---------------+||
|              | ### Точка А                      | +-----------------+|
|              | <t-body> ═══text═══              |                    |
|              | ### Точка Б                      |                    |
|              | <t-body> ═══text═══              |                    |
|              | ### Видение + бизнес-модель      |                    |
|              | <t-body> ═══text═══              |                    |
|              | ### Позиционирование             |                    |
|              | <t-body> ═══redrafted text═══    |                    |
|              | ### Гипотезы + каналы            |                    |
|              | <t-body> ═══text═══              |                    |
|              | ### Рынок                        |                    |
|              | ### Ближайшие шаги               |                    |
|              | ### Как мы работаем              |                    |
|              | +- control block --------------+ |                    |
|              | | 1 thread · 1 steering note    | |                    |
|              | | [Improve in place]  (primary) | |                    |
|              | | [Redo section]                | |                    |
|              | | [Redo whole doc]              | |                    |
|              | +-------------------------------+ |                    |
|              |                                  |                    |
|              | ## Additional notes              |                    |
|              | <t-body> (empty — operator skips)|                    |
|              |                                  |                    |
|              | ╔═══ Signoff (shout) ═════════╗  |                    |
|              | ║ 2 revs · 11 hits · 0 pending║  |                    |
|              | ║ Steps to sign:              ║  |                    |
|              | ║ 1. ✓ Commit rsrch brief     ║  |                    |
|              | ║ 2. ✓ Run research           ║  |                    |
|              | ║ 3. ✓ Draft strategy         ║  |                    |
|              | ║ 4. Final read-through ●     ║  |                    |
|              | ║ 5. [Sign]  (enabled)        ║  |                    |
|              | ╚═════════════════════════════╝  |                    |
+--------------+----------------------------------+--------------------+
```

Surface reading: operator sees the whole document at review. Threads group carries two items — one anchored, one unanchored steering note. Control block under Strategy names both counts (`1 thread · 1 steering note`) so the operator knows what feeds the next regen. `[Improve in place]` is the primary; operator clicks, agent re-edits respecting both items. Sign is enabled.

## Component trees

### Working-review state (step 5)

```json
{
  "app[data-view=doc]": {
    "sidebar": [
      "sidebar__header",
      { "sidebar__nav#toc": ["toc__indicator", "nav-group", "nav-group", "nav-group"] },
      "sidebar__footer"
    ],
    "doc#doc": [
      "t-hero",
      { "doc__section#brief": [
        { "card": ["card__heading", "doc__spec", "button"] }
      ]},
      { "doc__section#research-brief": [
        "t-display",
        "t-body"
      ]},
      { "doc__section#research-1": [
        "t-display",
        { "card": ["doc__spec"] },
        { "card.control-block": ["t-caption", "button.button--primary", "button", "button"] }
      ]},
      { "doc__section#strategy": [
        "t-display",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        { "card.control-block": ["t-caption", "button.button--primary", "button", "button"] }
      ]},
      { "doc__section#additional-notes": ["t-display", "t-body"] },
      { "doc__section#signoff": [
        { "card.card--shout": [
          "card__heading",
          "doc__signoff-stats",
          { "card__collapsible": ["t-caption", "t-caption", "t-caption", "t-caption"] },
          "button.button--primary"
        ]}
      ]}
    ],
    "inspector": [
      { "inspector__group#stages": [
        { "card": ["card__heading", "doc__spec"] }
      ]},
      { "inspector__group#future": [
        { "card": ["card__heading", "t-caption t-muted"] }
      ]},
      { "inspector__group#threads": [
        "t-subtitle",
        "button.comment-stack__add  [◆ INVENTION via DIFF]",
        { "comment-stack": [
          { "comment-thread[data-anchor=unanchored]  [◆ INVENTION via DIFF]": [
            "t-caption--bold",
            { "comment-msg": ["t-caption", "comment__menu"] },
            "field.comment-reply"
          ]},
          { "comment-thread[data-state=resolved]": [
            "t-caption--bold",
            { "comment-msg": ["t-caption", "comment__menu"] },
            { "comment-msg": ["t-caption", "comment__menu"] },
            { "comment-msg": ["t-caption", "comment__menu"] },
            "field.comment-reply"
          ]}
        ]}
      ]}
    ]
  }
}
```

Notes on the tree:
- `card.control-block` is not an invention — it is `card` with one `t-caption` line (thread + note counts) plus three buttons (primary + two secondary). The `.control-block` class is semantic scoping sugar for the per-section redo block; if the DS reviewer prefers plain `card`, drop the modifier.
- `button.comment-stack__add` is the unanchored steering note trigger. Marked INVENTION via DIFF.
- `comment-thread[data-anchor="unanchored"]` renders identically to an anchored thread except the "Re: 'quote'" heading is replaced with a "Steering note" label.

### Delivered state (step 7)

Unchanged from concept 1 tree. DIFF does not leak into delivered layout.

```json
{
  "app[data-view=doc]": {
    "sidebar": ["sidebar__header", { "sidebar__nav": ["nav-group", "nav-group"] }, "sidebar__footer"],
    "doc#doc": [
      "t-hero",
      { "doc__section#signed-title": [
        { "card": ["card__heading", "doc__signoff-stats", "doc__signoff-signature"] }
      ]},
      { "doc__section#strategy": ["t-display", "t-display--medium", "t-body", "t-display--medium", "t-body", "t-display--medium", "t-body"] },
      { "doc__section#research-brief": ["t-display", "t-body"] },
      { "doc__section#research": ["t-display", "doc__spec"] },
      { "doc__section#additional-notes": ["t-display", "t-body"] },
      { "doc__section#way-of-work": ["t-display", "t-body"] },
      { "doc__section#next-steps": ["t-display", "t-body"] }
    ],
    "inspector": [
      { "inspector__group#stages": [{ "card": ["card__heading", "doc__spec"] }] },
      { "inspector__group#delivered": [{ "card": ["card__heading", "t-caption", "button", "button"] }] },
      { "inspector__group#edit-log": [{ "card": ["card__heading", "t-caption"] }] }
    ]
  }
}
```

## Reasoning

### Why one diff, not three

Gate direction is already decisive. Three-column shell respected, actions redistributed to doc-body control blocks per art-director correction, signoff shout per spec. Those decisions are load-bearing; breaking them fights the direction, not the kit. The one place the kit genuinely fights the job is the **selection-anchored comment origin** — the kit assumes every comment is about a specific span, but amendment 4 says open comments are a global context stream. The unanchored steering note resolves that tension with one primitive. One diff. High leverage. Low blast.

### Regen scopes — three buttons, one primary

Kit rule: "one primary per card." The per-section control block carries three regen buttons. Rule holds because only `[Improve in place]` is primary. `[Redo section]` and `[Redo whole doc]` stay secondary — regular `button` class, no `button--primary` modifier, imperative but heavier-consequence verbs marking them as rare. Gate amendment 2 literally names them "rare" and "rarest". Kit rule served, job served. No diff needed.

### Flat threads

Gate amendment 1. Threads sit as siblings in `.comment-stack`. Unanchored steering notes flow in the same stack. No grouping container, no cluster headers. Kit default honoured.

### Comments-as-context-stream made visible

Job hinges on the operator knowing what feeds each regen. Every per-section control block carries a count line: `N threads · M steering notes`. Scoped redos filter: per-section redo reads threads anchored to that section's id range plus all unanchored steering notes. Whole-doc redo reads every open thread. Consumers read `data-state` and `data-archived` to filter resolved + archived out. The count line is plain `t-caption`. No new typography needed.

### Unanchored steering note — the one break

Canonical flow (kit.js `enableCommentSelectionFlow`, `strategy-doc.md` §Commenting pattern): reader selects text → draft shout → thread. Every comment carries an anchor. Amendment 4 reframes comments as global steering. A comment anchored to "pricing paragraph" visually says "this thread is about that paragraph" even when the operator wants "this note steers every section's voice." The anchored model under-serves cross-cutting steering.

Invention: `+ Add steering note` affordance in threads group header. Click spawns `comment-new` at top of `.comment-stack` without requiring a selection. Thread roots carry `data-anchor="unanchored"`. `kk:comment` payload nullable for `anchorQuote` / `anchorPrefix` / `anchorSuffix` / `sectionSlug` / `cluster`. Consumers treat unanchored notes as "apply to every regen regardless of scope."

Why this is worth the diff: the job is steering. The kit primitive for steering today is the anchored thread. Keeping only the anchored primitive forces operators to fake cross-cutting notes by anchoring to an arbitrary span — misleading for the reader, leaky for the regen logic. One new primitive, one affordance, no layout change, no token change. See §Manifest diff + sidecar file for the full entry.

### Signoff behaviour

Kit `card--shout` + stats + guided step list + primary `[Sign]`. No rule broken. Sign triggers resort — kit transitions only, no custom keyframes (concept-1 rabbit-hole constraint). Shout rule holds (one per column, signoff owns it).

### Stages card as status

Kit `card` + `doc__spec` rows. `●` current, `✓` past, disabled styling for future. Peek-only per concept-1 no-go. No click-to-edit.

### Future-reserved slot

Kit `card` with `card__heading` "Agent summary" + body `t-caption t-muted` "(next version)". Labelled placeholder per art-director rabbit-hole constraint.

### Voice

All prose handed to stage 9 copywriter as placeholders. No real strings in this hand-off. Placeholders follow voice.md: imperative verbs for buttons ("Improve in place", "Redo section"), real-example placeholders for fields ("What should every run know?"), no filler adjectives.

### Narrow behaviour

Kit default. `+ Add steering note` rides inside the slide-over inspector on narrow widths — same button, same flow.

### Accessibility floors

Non-negotiable, preserved.

- Every button 44×44 minimum hit target. Kit `button` radius 12px, `t-subtitle` label, padding via kit tokens delivers ≥ 44px.
- Semantic HTML — `main`, `aside`, `section.doc__section`, `nav.sidebar__nav`, `button`, `label`, `dl`.
- Contrast — black text on white (`--color-text` on `--color-bg`). Muted only for metadata per voice.md.
- `kk:comment` stream listeners bubble through `.comment-stack`; keyboard commit path (Ctrl+Enter) unchanged from kit default.
- Unanchored steering note spawns with `field__fake-caret` focus management mirroring the selection-flow path.

## Manifest diff

One entry. Sidecar file: `documentation/2026-04-22-wealthy-operator-alpha/06-revolutionary-manifest-diff.md`.

Summary of the entry:

- **Rule broken:** every comment originates from a text selection and carries an anchor (prefix + quote + suffix, section slug, cluster).
- **Canon source:** `manifesto.md` §Runtime (comment lifecycle events) + `strategy-doc.md` §Commenting pattern + `components.md` §Comment.
- **Proposed change:** introduce the unanchored steering note — `comment-stack__add` button in threads group header, nullable anchor fields in `kk:comment` payload, `data-anchor="unanchored"` on thread root, identical lifecycle (Approve / Reject / Archive).
- **Reason:** comments-as-context-stream (gate amendment 4) requires a primitive for cross-cutting steering. Anchored-only forces operators to fake cross-cutting notes by anchoring to arbitrary spans, misleading the reader and leaking regen scope logic.
- **Blast radius:** `kk:comment` payload optional anchor fields (consumers null-check); `docs/integration/comment.md` gains an "unanchored" section; kit.js `.comment-stack` handles a second insertion path (button click vs selection-flow); kit v0.13.0 scope widens from Approve/Archive to include the new affordance.
- **Rollback:** remove `comment-stack__add` button, revert payload optionality, existing anchored comments unchanged.

## Inventory check

### Kit-canonical components used

Typography utilities, card (+ shout + interactive), field + field__row, button (+ primary), tag, switch, sidebar + sidebar__nav + sidebar__header + sidebar__footer, nav-group, toc__indicator, doc + doc__section + doc__spec + doc__signoff-stats + doc__signoff-signature, inspector + inspector__group, comment-new + comment-thread + comment-msg + comment__menu + comment-stack, app[data-view="doc"].

### Inventions

1. **`button.comment-stack__add`** — button in threads group header that spawns an unanchored draft. Covered by the manifest diff. Ships with kit v0.13.1 (or folded into v0.13.0 if maintainer accepts).
2. **`data-anchor="unanchored"`** — data attribute on `comment-thread` root. Covered by the manifest diff.
3. **`comment-thread` variant rendering** — the "Steering note" label replacing "Re: 'quote'" heading for unanchored threads. Covered by the manifest diff (rendering difference, no new class).

No other inventions. No off-grid spacing. No new colors. No forbidden tokens (gradients, shadows, glass, blur).

### Rules broken

One, covered by sidecar.

### Tokens touched

None. Every value from `tokens.json`.

## Gate

Pending — stage 7 DS reviewer compares 04-conservative, 05-ux, 06-revolutionary. Revolutionary diff evaluated separately. Two human paths:
- Reject diff → revolutionary falls back to UX-driven variant.
- Accept diff → `kk-ds-maintainer` runs before stage 8, updates canon, bumps kit version.

## Hand-off

→ Stage 7, `kk-role-ds-reviewer`. Reads this file + `04-conservative.md` + `05-ux.md`. Evaluates the diff at `06-revolutionary-manifest-diff.md` separately. Output → `documentation/2026-04-22-wealthy-operator-alpha/07-ds-reviewer.md`.
