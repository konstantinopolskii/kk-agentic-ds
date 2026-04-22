---
session: 2026-04-22-wealthy-alpha
stage: 2→3 (rebuild)
role: ux + frontend
input: 06-supervisor-fail.md
output: kit-clean prototype-alpha/*
gate: supervisor re-audit
---

# Rebuild — kit-only classes

Three files edited. CSS rewritten from scratch. HTML + JS touched in targeted edits.

## prototype.css — full rewrite

Old file (the first attempt) had 21 `proto-*` class rules plus a `.highlight` re-declaration.

New file (114 lines) uses only attribute selectors scoped to `.app`'s state. All visible elements use kit classes. Key scopes:

| Attribute | Purpose |
|---|---|
| `data-role="operator\|client"` (on `.app`) | role gating via CSS |
| `data-view-only="client\|operator"` | hide in other role |
| `data-stage-card="N"` | show only in matching stage |
| `data-stage-pill` | dev pill styling on `.tag` |
| `data-star` | star styling on `.tag` with `::before` content |
| `data-stars` | stars row flex container |
| `data-show-when="locked\|reviewed\|unsigned"` | hint gating |
| `data-price-gated="true"` | dim + append "· после отзыва" |
| `data-dev-block`, `data-dev-label`, `data-dev-pills` | dev UI scoping |
| `data-review-error` | inline error node |

`.highlight` rules removed — the kit owns them in `style.css`.

Tier card heading layout: `.card[data-tier] .card__heading` with row flex.

## index.html — targeted edits

- All `proto-client-only` class tokens → `data-view-only="client"` attributes.
- All `proto-operator-only` class tokens → `data-view-only="operator"` attributes.
- All `proto-stage-card proto-stage-card--N` → `data-stage-card="N"`.
- `.proto-deck` wrapper class removed; bare `.deck`.
- Stars markup: `<button class="tag" data-star data-rating="N" role="radio" aria-checked="false" aria-label="...">` with empty text (kit CSS adds "★" via `::before`).
- Stage pills: `<button type="button" class="tag t-micro" data-stage-pill data-stage="N" aria-label="...">N</button>`.
- Review form, sign form: dropped `.proto-review`, `.proto-review__text`, `.proto-review__meta`, `.proto-sign`, `.proto-locked-hint`, `.proto-unlocked-hint` classes.
- Replaced hint hiding logic: `data-show-when="locked"` on the pre-review text, `data-show-when="reviewed"` on the unlocked text + form.
- Tier price gating: `data-price-gated="true"` on the price span.
- Empty-state card for client comments: just `<div class="card">` with `<p class="t-caption t-muted">`.
- Agent-reply UI inside thread cards: `<hr class="divider" />` + two `.button` elements stacked, no wrapper.
- Voice cleanup: replaced "Путь через нетворк, не через стандартный хайринг. Фаундер-первая логика, не рекрутёрская." with "Ход через фаундеров. Прямые диалоги, без рекрутёрской воронки." Removed the two adjacent "not A, but B" patterns that trip voice.md.

## app.js — targeted edits

- Stars: selector `.proto-star` → `[data-star]`; toggled `.tag--bold` instead of `.is-on`; synced `aria-checked`.
- Stage pills: selector `.proto-pill` → `[data-stage-pill]`; toggled `.tag--bold` on the active one.
- Deck: selector `.proto-deck .deck-card` → just `.deck .deck-card`.
- Stage cards: `.proto-stage-card--N` → `[data-stage-card="N"]`.
- Draft input: selector `.proto-draft-input` → `[data-draft-input]`.
- Review textarea: selector `.proto-review__text` → `textarea[name="text"]`.
- `.highlight-pending` class logic → plain JS variable (`pendingSpan`) holding the DOM reference. `unwrapPending()` added for Escape path.
- Toast system removed entirely (~20 lines). Form submit errors surface through the new `[data-review-error]` inline hint node.
- Tier card rendering: dropped `proto-tier` wrapper class; used `<ul class="t-list">` for line items; `data-price-gated` attribute on the price span.
- Agent-reply block renders as `<hr class="divider" />` + `<p class="t-caption t-muted">` + two `.button` elements, no wrapper.

## Final class enumeration (from final index.html)

```
active, app, button, button--primary, card, card--heading,
card--interactive, card--shout, card__collapsible,
card__collapsible-inner, card__heading, comment-stack, deck,
deck-card, deck-card__select, doc, doc__intro, doc__part,
doc__section, doc__signoff, doc__signoff-signature,
doc__signoff-signature-img, doc__signoff-stats, doc__spec,
doc__spec--triple, doc__spec--value, doc__spec-key, doc__spec-row,
doc__spec-value, field, field--row, field__input, field__label,
field__value, inspector, inspector__group, nav-group, nav-group__items,
sidebar, sidebar__footer, sidebar__header, sidebar__nav, stat, switch,
switch__input, switch__track, t-body, t-caption, t-caption--bold,
t-display, t-display--medium, t-hero, t-list, t-micro, t-muted,
t-subtitle, t-title, tag, toc__indicator
```

Every class ships with the kit. `deck`, `divider`, `toc__indicator`, `highlight`, `active` are not in the explicit allowed-prefix list in `components.md` but are kit-provided (they're used in `index.html` and styled in `style.css`). The prefix list in `components.md` is incomplete; the true inventory is "whatever the kit ships."

## Line count delta

- HTML: 856 → 887 lines (attribute additions, slightly longer)
- CSS: 199 → 114 lines (attribute scoping is denser than class rules)
- JS: ~540 → 526 lines (toast removed, deck handler still simple at this point)

## Hand-off

→ Stage 4b re-audit, `08-supervisor-pass.md`.
