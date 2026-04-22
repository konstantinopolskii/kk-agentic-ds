---
session: 2026-04-22-wealthy-alpha
stage: 4b
role: supervisor
input: 05-frontend-pass.md + prototype-alpha/* (after frontend pass)
output: FAIL verdict, return to stage 2
gate: stage 2 rebuild
---

# Stage 4b — Supervisor, first audit

## Verdict

FAIL

## Failures

- **Inventory** — 21 new classes outside kit prefixes: `proto-client-only`, `proto-operator-only`, `proto-stage-card`, `proto-stage-card--N`, `proto-dev`, `proto-dev__label`, `proto-dev__pills`, `proto-pill`, `proto-deck`, `proto-stars`, `proto-star`, `proto-review`, `proto-review__text`, `proto-review__meta`, `proto-locked-hint`, `proto-unlocked-hint`, `proto-sign`, `proto-tier`, `proto-tier__head`, `proto-tier__price`, `proto-tier__items`, `proto-toast`, `proto-empty`, `proto-agent-reply`, `proto-agent-reply__actions`, `proto-draft-input`, `proto-prompt`, `highlight-pending` → return to stage 2.
- **Inventory** — star rating is a new primitive not in `components.md` (closest kit analog is `.tag` / `.tag--bold`) → return to stage 2.
- **Inventory** — toast is a new floating surface not in `components.md` → return to stage 2.
- **Inventory** — `.highlight` is re-declared in `prototype.css` while the kit already owns it in `style.css` → duplicate rule, return to stage 2.

## Next action

Return to stage 2. The prototype introduced 20+ classes outside the kit's approved prefixes (`t-`, `card`, `field`, `button`, `tag`, `switch`, `sidebar`, `doc`, `nav-group`, `inspector`, `comment`, `stat`, `swatch`, `app`).

## Why this happened

Stage 3 treated "prototype as consumer of the kit" as a license to namespace new classes under `proto-*`. The manifesto does not allow consumer-added classes — it expects composition from the existing inventory. The star rating and the toast are genuinely new primitives; those required either a `kk-ds-maintainer` kit extension or removal.

The supervisor caught this after 800 lines of HTML, 500 lines of JS, 180 lines of CSS. A 30-second class-prefix check at the top of stage 3 would have caught it before any code was written.

## What the rebuild must cover

- Replace every `proto-*` class with attribute selectors: `data-view-only="client|operator"`, `data-stage-card="N"`, `data-show-when="locked|reviewed|unsigned"`, `data-price-gated`, `data-dev-block`, `data-dev-label`, `data-dev-pills`, `data-stars`, `data-star`, `data-review-error`.
- Replace the star primitive with `.tag` + `.tag--bold` on filled.
- Replace the stage pill primitive with `.tag` + `aria-pressed` + `.tag--bold` for active.
- Remove the toast entirely — the inspector shout card already speaks state.
- Remove `highlight-pending` — hold the pending span in a JS variable reference instead.
- Compose the agent-reply action block from a `.divider` + two `.button` elements, no wrapper.

## Hand-off

→ Stage 2 rebuild, `07-rebuild.md`.
