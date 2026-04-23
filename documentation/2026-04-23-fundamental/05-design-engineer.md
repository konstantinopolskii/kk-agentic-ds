---
session: 2026-04-23-fundamental
stage: 5
role: design-engineer
input: proposals/2026-04-23-patterns-library.md + index.html (kit canon)
output: demos/fundamental/index.html — every atom and element in plain composition, no catalog ceremony
gate: pending 6b (consistency-ds) + 6c (voice) + 7 (meta, adjusted rubric)
---

# Design engineer — fundamental

We enter at stage 5. Stages 1-4 skipped by initiative declaration. Spec is the proposal doc plus the kit canon. Output is one document-shaped HTML page that uses every atom once and every element once. No didactic headings naming what an atom is. No "this is the disabled state" labels. No fabricated product surface.

## Files shipped

- `demos/fundamental/index.html` — the stripped document. Sidebar + doc + inspector. References `../../vars.css`, `../../style.css`, `../../js/kit.js`, `../../signature.svg`.

## Kit classes used

Counted by class root, alphabetical. Every entry resolves to `components.md`, `style.css`, or `vars.css`.

### Shell and document

- `app` with `data-view="doc"`
- `sidebar`, `sidebar__header`, `sidebar__nav`, `sidebar__footer`
- `toc__indicator`
- `nav-group`, `nav-group__items`, `is-active`
- `doc`, `doc__intro`, `doc__part`, `doc__section`
- `doc__signoff`, `doc__signoff-stats`, `doc__signoff-signature`, `doc__signoff-signature-img`
- `inspector`, `inspector__group`

### Typography utilities

- `t-hero`, `t-display`, `t-display--medium`
- `t-body`, `t-title`, `t-subtitle`
- `t-caption`, `t-caption--bold`
- `t-micro`
- `t-mono`
- `t-muted`, `t-subtle` (subtle carried by placeholder styles, not directly tagged; muted used for metadata only)
- `t-list` (on both `ul` and `ol`)
- `aside` (span), `quote` (blockquote), `cite`, `figure`, `figcaption`

### Cards

- `card` (static)
- `card--heading`
- `card--interactive` + `data-state="active"` / `data-state="minimized"`
- `card--shout`
- `card--tight`
- `card__heading`, `card__body`, `card__collapsible`, `card__collapsible-inner`

### Fields, buttons, tags, switches

- `field`, `field--row`, `field__label`, `field__input`, `field__value`, `field__fake-caret`
- `button`, `button--primary` with `data-cta="minimized"` / `data-cta="active"`
- `tag`, `tag--bold`, `tag--inline`
- `switch`, `switch__input`, `switch__track`

### Collections

- `card-stack`
- `deck`, `deck-card`, `deck-card.active`, `deck-card__select`

### Comments

- `comment-stack`
- `comment-new`, `comment-new__header`, `comment-new__preview`, `comment-new__field`
- `comment-thread`, `comment-thread__preview`, `comment-thread__list`, `comment-thread__reply`, `comment-thread__ellipsis`
- `comment-thread__resolved`, `comment-thread__resolved-stamp`, `comment-thread__resolved-snippet`, `comment-thread__resolved-byline`
- `comment-msg`, `comment-msg__header`
- `comment__menu`, `comment__menu-popover`, `comment__menu-item`, `comment__menu-item--approve`

### Spec and marks

- `doc__spec`, `doc__spec-row`, `doc__spec-key`, `doc__spec-value`
- `doc__spec--value` (three-column variant)
- `doc__spec--triple` (claim / reality / resolution)
- `swatch`, `swatch__dot`
- `stat`

### Narrow-view controls

- `fab`, `fab--nav`, `fab--inspector`, `fab--comment`, `fab__count` + `data-view-target`

Class count: approximately 60 kit-inventory entries. Zero invented classes. Zero inline styles beyond the canonical `style="background: …"` on `swatch__dot` that the canon itself uses.

## Attribute gating scheme

All attributes below come from kit canon. No new attributes introduced.

- `data-view="doc"` on `.app` — shell view router driven by kit.js narrow-view toggle.
- `data-state="active"` / `data-state="minimized"` on interactive cards — card stack gating.
- `data-cta="active"` / `data-cta="minimized"` on buttons inside interactive cards — CTA swap rule in style.css.
- `data-resolved="true"` on a comment thread — collapses to single checkmark row.
- `data-archived="true"` on a comment thread — DOM retained, hidden by CSS.
- `data-author-role="agent"` on a `.comment-msg` — ungates Approve on the kebab.
- `data-can-approve="true"` on a comment thread — kit.js toggles this at runtime; we pre-set it on the open thread so the agent reply's Approve shows without requiring a kit.js scan.
- `data-message-id` on every `.comment-msg` — kit contract.
- `data-view-target="nav"` / `data-view-target="inspector"` on FABs — narrow-view toggle.

## Build log

One pass, in reading order.

1. Shell skeleton — `<html>`, head with relative vars.css/style.css/font preload (path depth `../../`), body, `.app[data-view="doc"]`.
2. Sidebar — brand, five nav groups (Prose, Spec, Controls, Collections, Margin), scroll-spy indicator, footer. Five nav groups mirror the five doc parts so the scroll-spy has a real target per part.
3. Doc hero + intro.
4. Prose part — opening (hero/display scale contrast in prose), reading (body/caption/micro stack), lists (ul.t-list, ol.t-list, aside inline), figures (blockquote.quote + cite, figure + figcaption, signature image).
5. Spec part — color (nine swatches in doc__spec), space (12-row doc__spec--value), type (doc__spec--value + doc__spec--triple variants), motion (doc__spec).
6. Controls part — cards (static, with-body, tight, shout, heading), fields (row variants, free-text + fake caret), buttons (secondary + primary pair inside a card), tags (tag--inline inside caption, tag + tag--bold in row), switches (three rows, one off).
7. Collections part — card-stack (three interactive cards, one active), deck (five deck-cards, one active, inside a shout card).
8. Margin part — signoff block (stats + byline + signature).
9. Inspector — heading card, Tweak interactive card active-by-default (deck + switches + heading + fields), Templates minimized card, Comments heading card, comment-new shout, open thread with agent reply, resolved thread, archived thread.
10. kit.js + comment selection flow enabled, three FABs.

## Dummy-text spots

No designer hand-off exists for this exception entry. Every string we emit is dummy or adapted from the kit canon's own phrasing. The spots below can be overwritten by Konstantin without us redesigning.

- All `doc__section` titles and subtitles. Drafted to describe the atom being composed, not to label it didactically.
- Card titles inside the interactive stack (Pick a direction, Scope the change, Commit the change).
- Inspector Tweak card copy — re-used near-verbatim from `index.html`'s inspector Tweak card so the voice holds.
- Comment messages — three short strings that form a real exchange, no fake product narrative.
- Signoff byline timestamp — set to 23 April '26, 17:30 Tbilisi Time.

## State coverage check

Every state the canon demonstrates appears at least once.

| Component | States present |
|---|---|
| Card static | rest |
| Card interactive | active (stack top + inspector top) + minimized (stack middle/bottom + inspector second) |
| Card shout | rest (deck container + comment-new active thread) |
| Card heading | rest (two instances in inspector) |
| Card tight | rest |
| Field row | rest + free-text variant with fake caret |
| Field value | rest (field__value spans) |
| Button secondary | rest (minimized CTA) |
| Button primary | rest (active CTA) |
| Tag metadata | rest |
| Tag bold | rest |
| Tag inline | rest |
| Switch | on (checked) + off (unchecked) |
| Deck card | active + inactive |
| Deck select | rest + active-state (via `.active` parent) |
| Nav group | rest |
| Comment new | active (shout) |
| Comment thread | rest + resolved + archived + data-can-approve |
| Comment msg | rest + agent-authored (data-author-role="agent") |
| Comment menu | rest; `aria-expanded="false"` by default — kit.js toggles at runtime |
| FAB | visible on narrow viewport (CSS-gated) |

Hover, focus, active on cards and fields are all visible through interaction — CSS handles the transition, no state markup needed beyond what we set.

## Judgement calls

The spec asked for every atom and every element present once in plain composition without ceremony. Three calls where "plain composition" had to be interpreted.

1. **`doc__section` titles carry a subtitle line.** The canon uses `t-display` + `t-display--medium t-muted` as its standard section heading shape. We kept that shape because it IS the composition, not ceremony. The subtitle describes what the section composes, not what an atom "is" (e.g. "Nine tokens", "A 4px grid", "Secondary, primary"). No "This is the color atom" labels.
2. **Spec cards kept.** `doc__spec` is an atom in its own right and the kit uses it to document tokens inside the canon. Dropping it would cost atom coverage. Kept as plain spec composition, not didactic callout.
3. **Inspector retained with product-like copy.** The inspector is itself a pattern (three-column shell). To compose it without pretending to ship a product, we used the kit canon's own "Tweak the system" copy, adapted to match the fundamental's scope. This is closer to "kit showing its own dogfood" than "invented narrative". Every string is a kit-ish fact, not a user scenario.

## Items where the canon had something plain composition could not carry

None fully. A few soft gaps:

- **`.highlight` + `.highlight--active`.** Body highlights are produced at runtime by `kit.js` when a reader selects prose and triggers the comment draft flow. In static markup there is no highlight to draft around. We did not pre-seed a highlight span because that would be a fake artifact without the draft-and-commit pair the kit demonstrates. The class exists and will paint the moment a reader selects text on this page.
- **`.deck-card__check`.** Check glyph shows when a deck card is in `is-chosen` state, which kit.js sets on select. Same live-only consideration; we left the default rest state so the glyph paints at runtime, not in static markup.
- **`inspector__group::after` and the per-group dividers.** These are CSS-only and paint off the two `inspector__group` sections we already include.

No atom genuinely absent. No element genuinely absent. The two runtime-only paints (highlight + chosen check) are live behaviours, not markup the static page should seed.

## Ceremony we removed from the canon

For the record, comparing to `index.html`:

- Dropped `.doc__example` wrappers and `.doc__example--row` variants. The canon uses these to frame "here is the component in demo form" after a spec card explains it. In `fundamental` the composition itself is the showing — no framing needed.
- Dropped the Components / Patterns / Voice / Pipeline / Practice / Distribution / Audit part structure. Kept five parts (Prose, Spec, Controls, Collections, Margin) that track atom families rather than manifesto themes.
- Dropped the spec cards that describe states by name ("Hover: fills row with 3%", "Focus: row inverts"). Those are kit canon behaviour documentation. `fundamental` demonstrates state through structure, not through a table of state names.
- Dropped nav items for Distribution, Pipeline, Voice, Practice, Audit — all manifesto content, not atom composition.

## Inventory check

Pass. Zero off-inventory classes. Zero inline styles beyond the canonical `swatch__dot` `background` inline style that the canon itself uses. Zero invented tokens. Zero new `data-*` attributes.

## Gate

Hand to 6b (kk-role-consistency-ds, Dieter Rams), 6c (kk-role-voice-reviewer, George Orwell), and 7 (kk-role-meta-reviewer, Anna Wintour, adjusted rubric). 6a is explicitly skipped by the initiative doc — fundamental is kit-internal, no analyst jobstory exists.
