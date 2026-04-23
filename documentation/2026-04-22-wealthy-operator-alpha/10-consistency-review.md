---
session: 2026-04-22-wealthy-operator-alpha
stage: 10
role: consistency-reviewer
input: prototype-operator-alpha/{index.html,app.js,data.js,prototype.css} + stages 4/7/8 context
output: stage-10 consistency verdict — logic, 80/20, inventory
gate: pass
---

# Consistency review — 2026-04-22-wealthy-operator-alpha

Stage-10 supervisor audit on the fully-copied operator review-state prototype. Three vectors: logic (amendments wired?), 80/20 (signal dominates at every zone?), inventory (every class in `components.md`, every token in `tokens.json`).

## Raw input

Orchestrator spawn — stage-10 consistency reviewer running in parallel with frontend reviewer + UX copy reviewer on:

- `prototype-operator-alpha/index.html`
- `prototype-operator-alpha/app.js`
- `prototype-operator-alpha/data.js`
- `prototype-operator-alpha/prototype.css`

Amendments of record: `07-ds-reviewer.md §Amendments` items 1-9.

## Verdict

**PASS.** All nine amendments wired with file:line evidence. Zero inventions. 80/20 holds at screen, doc-zone, card, and row. One soft observation recorded for retro, zero blockers.

## Logic audit

One amendment per row. Evidence cites `prototype-operator-alpha/<file>:<line>` unless noted.

| # | Amendment | Pass | Evidence |
|---|---|---|---|
| 1 | Flat thread list in inspector, insertion order, no grouping | PASS | `app.js:144-148` — single `commentStack.insertAdjacentHTML('beforeend', …)` loop over `PROTO.threads` in array order. No grouping wrapper, no section-sort. |
| 2 | Scope ladder `[Improve in place]` default · `[Redo section]` rare · `[Redo whole doc]` rarest — primary on default | PASS | `index.html:130-134` (brief), `index.html:273-277` (strategy) — `button.button--primary` on the improve/implement action; two secondaries follow. Stage-7 amendment 8 applied cleanly. |
| 3 | Research controls: implement-comments · redo-research · add-research | PASS | `index.html:195-199` — three buttons with `data-action="implement-research|redo-research|add-research"`. Primary on `implement-research`. |
| 4 | Context-stream count line visible (stage-7 amendment 9) | PASS | `index.html:420` — `<p class="t-caption t-muted" data-context-count></p>` in threads header. `app.js:162-181` updates text to "<N> <тред\|треда\|тредов> в контексте агента". Only counts threads without `data-resolved="true"` or `data-archived="true"`. Plain `t-caption`, no new class. |
| 5 | Comment lifecycle via kit v0.13.0 Approve + Archive + reply + delete | PASS | `app.js:66-83` emits the four-item kebab popover with English dispatch labels (kit v0.13.0 constraint flagged in `08-frontend-engineer.md §Known gaps`, not a logic break). `app.js:195-215` handles `kk:comment` branching on `action === 'approve'` (rewrites `.highlight[data-comment-id]` `textContent`) and `action === 'archive'` (count refresh). |
| 6 | Resolved + archived drop out of context stream | PASS | `app.js:164-166` — `.comment-thread:not([data-resolved="true"]):not([data-archived="true"])` is the only counted set. Kit owns state flip; consumer honors the filter. |
| 7 | Kit v0.13.0 shipped and consumed, not rebuilt | PASS | `app.js:236` calls `KK.enableCommentSelectionFlow()` once. No kebab dispatch logic, no resolved-state CSS, no archive CSS in consumer files. `app.js:64-65` comment explicit about kit-owned approve-visibility gating via `data-author-role="agent"` on agent messages (`app.js:111`). |
| 8 | Primary on default scope per control block | PASS | Same evidence as amendment 2 plus research block at `index.html:195` and strategy block at `index.html:273`. Brief control block at `index.html:130`. All three control blocks carry one `button--primary` on the default scope. |
| 9 | Context-stream count line is plain `t-caption` (no new component) | PASS | `index.html:420` — no modifier class, no data-component attribute claiming a new surface. Uses `t-caption t-muted` (muted permitted — metadata). Populated by `app.js:175`. |

Nine of nine amendments wired. The review-state fixture honestly defers three surfaces: the selection-to-draft `comment-new` card (kit builds live — no pre-render needed per `08-frontend-engineer.md`), the resort-on-sign reflow (out of stage-8 vertical slice — review state only), and the delivered-layout resort (same). All three deferrals are documented and consistent with the vertical-slice rule.

## 80/20 audit

Per-zone weight call. Empty space counts toward the 80%.

### Screen level

**PASS.** Three-column kit shell at `index.html:14` — `.app[data-view="doc"]` + `.sidebar` + `.doc` + `.inspector`. Default column widths from `tokens.json §layout` (sidebar 260 / inspector 420) leave the doc column as the visual 80%. No override, no custom grid. Middle column scrolls; sides are pinned. Primary signal = the document. Secondary = nav map + inspector margin.

### Sidebar

**PASS.** Sidebar is a quiet map. `t-title` session header (`index.html:22`) + two `nav-group` sections (`Работа` / `Подпись`) + `sidebar__footer t-caption` (`index.html:52`). Five TOC rows. No extra widget, no thread-density glyphs (UX-driven R4 deliberately not adopted by conservative — honest to the chosen hand-off). Primary signal inside the column = the TOC rows under their `t-subtitle` headings. Everything else metadata.

### Doc body

**PASS.** 80% is the strategy prose. `t-hero` title (`index.html:64`) + five `doc__section` blocks. Strategy section (`index.html:204-279`) carries nine subsection `t-display--medium` heads + nine `t-body` paragraphs before a single static control block — exactly the concept's "doc accumulates, past stages visibly survived" framing. Signoff `card--shout` at `index.html:297` is the single shout per column, carrying the 80% weight of the signoff zone. Control blocks at `index.html:122`, `189`, `267` are static `card`s with a tag + three buttons each — 20% noise under their section's 80% prose.

### Inspector

**PASS.** Three `inspector__group` blocks in order: stages (seven-row `doc__spec` snapshot) at `index.html:355-399`; future-reserved placeholder at `index.html:402-411`; threads group at `index.html:414-428` with the context-count line and the seven-thread stack. Threads block owns the 80% weight of the inspector — stages + future-reserved combined fit in the top 20%. Matches concept 1's literal order (stages top, future middle, threads below) and amendment-1's flat-stack expectation.

### Card level

**PASS.** Signoff shout (`index.html:297-346`) owns one `button--primary` (`index.html:344`) at the bottom — the one CTA that matters. Brief input card is committed-state read-only with zero buttons (correct per `components.md §Card` — "A card that only fires an action stays static"); the committed brief already fired its primary at stage 1. Control blocks each carry exactly one primary (stage-7 amendment 8) + two secondaries. Research sources card is pure `doc__spec` — no button, no primary; static informational.

### Row level

**PASS.** `field--row` rows in the brief card follow the kit's label + value pattern. `doc__spec-row` in research uses `doc__spec--value` three-column shape. Stage rows in the inspector use two-column `doc__spec` with `✓ / ● / ·` glyphs matching the conservative hand-off spec.

## Inventory audit

Every class resolved. Prefix check passes the allowlist `t-`, `card`, `field`, `button`, `tag`, `switch`, `sidebar`, `doc`, `nav-group`, `inspector`, `comment`, `stat`, `swatch`, `app`.

### Classes (enumerated)

- Typography — `t-hero`, `t-display`, `t-display--medium`, `t-body`, `t-title`, `t-subtitle`, `t-caption`, `t-caption--bold`, `t-muted`, `t-subtle`. All in `components.md §Typography utility classes`.
- Card — `card`, `card--interactive`, `card--shout`, `card--heading`, `card__heading`, `card__collapsible`, `card__collapsible-inner`. `card--heading` appears in canon `index.html:2974` and `style.css:457` — kit-native, not yet in `components.md` prose but inside the `card` prefix allowlist and canon markup.
- Field + switch + button + tag — `field`, `field--row`, `field__label`, `field__input`, `field__fake-caret`, `switch`, `switch__input`, `switch__track`, `button`, `button--primary`, `tag`. All in `components.md`.
- Spec + signoff + stat — `doc__spec`, `doc__spec--value`, `doc__spec-row`, `doc__spec-key`, `doc__spec-value`, `doc__signoff-stats`, `stat`. All in `components.md §Spec list` + `§Signoff`.
- Shell + nav — `app`, `sidebar`, `sidebar__header`, `sidebar__nav`, `sidebar__footer`, `toc__indicator`, `nav-group`, `nav-group__items`, `doc`, `doc__section`, `inspector`, `inspector__group`. All in `components.md §Navigation` + `§Patterns` + canon `index.html`.
- Comment — `comment-stack`, `comment-thread`, `comment-thread__preview`, `comment-thread__list`, `comment-thread__reply`, `comment-msg`, `comment-msg__header`, `comment__menu`, `comment__menu-popover`, `comment__menu-item`, `comment__menu-item--approve`. All in `components.md §Comment` / canon.
- `highlight` — `components.md §Comment` via selection flow; `style.css:1368` owns the CSS.

### Composition rule

One composition rule in `prototype.css`:

```css
.card[data-block="control"] { flex-direction: row; … }
.card[data-block="control"] > .card__heading { … }
.card[data-block="control"] > .button { width: auto; }
@media (max-width: 800px) { .card[data-block="control"] { flex-direction: column; … } }
```

Attribute-scoped on a kit class. No new classname. `data-block` is consumer-owned markup; not a token. Permitted composition per `components.md §What's forbidden` — the forbidden list targets classnames, not attribute selectors on kit classes.

`data-context-count` (`index.html:420`) is a behaviour hook, not a visual class — consumer-set attribute targeted by `app.js`, no CSS rule. Permitted.

### Tokens

- Spacing in `prototype.css` uses `var(--space-3)` — 12px, on grid, inside `tokens.json §space.scale`.
- Zero `--color-*` overrides. Zero `--radius-*` overrides. Zero hard-coded colors, sizes, or spacing.
- Zero inline styles anywhere in `index.html`, `app.js`, `data.js`, `prototype.css`.

### Forbidden checks

- No gradients, no drop shadows, no glass, no blur. PASS.
- No brand colors, no status colors (`danger` / `success` / `warning`). PASS.
- No Tailwind, Bootstrap, or other utility class. PASS.
- No `<h1>`-class Title Case headings — everything sentence case in Russian. PASS.
- No em-dashes in headlines. Body uses em-dashes in a few places (`index.html:144`, `215`, `226`) — permitted in body per `tokens.json §type.rules` "Em-dashes forbidden in headlines, rare in body". Headlines clean.

## Failures and their owners

None.

### Soft observations (not failures)

Two items recorded for retro, not gated here.

1. **Kit kebab label dispatch is English-only** — already raised by frontend engineer in `08-frontend-engineer.md §Known gaps`. The prototype ships literal English "Approve" / "Reply" / "Archive thread" / "Delete" in a Russian UI (`app.js:75-81`). This is a kit v0.13.x limitation, not a consistency-review failure — the consumer did the right thing inside the constraints. Owner: maintainer (future `kk-ds-maintainer` pass), not any stage 4-9 role.
2. **`card--heading` is in canon `index.html` + `style.css` but not in `components.md §Card`** — the class is legitimate kit inventory (`card-*` prefix, used in canon). Surfacing for the meta-retro: `components.md §Card` could list `card--heading` as the fourth variant alongside static / interactive / shout. Owner: meta-retro → maintainer, not this build.

Both observations track back to the kit canon, not the prototype. The prototype itself is clean.

## Gate

**PASS.**

Nine of nine amendments wired with line-level evidence. 80/20 holds at every zone (sidebar, doc body with its five sub-zones, inspector with its three groups, card level, row level). Inventory audit returns zero invented classes, zero off-grid spacing, zero off-token colors, zero inline styles. One composition rule — attribute-scoped on a kit class — the one permitted move. Deferred surfaces are honest and documented.

Ship once UX copy reviewer + frontend reviewer also pass.

## Hand-off

→ Stage 10 aggregator. Three reviewers' results combine; human gates the ship.
