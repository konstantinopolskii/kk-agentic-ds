---
session: 2026-04-22-wealthy-alpha
stage: 3
role: ui + frontend
input: 03-iteration.md
output: HTML + CSS + JS artifacts in prototype-alpha/
gate: frontend pass next
---

# Stage 3 — Build

One commit, four files, 1673 lines. Also the commit that earned the supervisor fail later.

## Artifacts produced (pointers, no copies)

All files live in `prototype-alpha/` (renamed from `prototype/` after the retro).

### `prototype-alpha/index.html` — 887 lines

Shell using kit classes (sidebar + doc + inspector inside `.app[data-view="doc"]`).

Doc body in order: hero + intro + stats card; Разговор (call digest); Гипотезы (Точка А, Точка Б, Видение и бизнес-модель, Позиционирование, Гипотезы и каналы); Валидация (Рынок, Ближайшие шаги); Дальше (Как мы работаем); client-only Отзыв + Транскрипция sections; final Podpis signoff block.

Inspector splits operator section (seven stage-cards rendered, gated via CSS attribute selectors) + client section (help shout + comment stack + tier stack).

Sidebar: nav groups (Разговор / Гипотезы / Валидация / Дальше), footer with dev stage pills 1-7.

Seed content: Нелли Кам, based on the 2026-04-21 call transcript and the existing `strategy_Nelly_Kam_1.md`, rewritten to the new structure with tables in Точка А, Точка Б, Рынок, Ближайшие шаги, plus triple spec in Позиционирование.

### `prototype-alpha/data.js` — 146 lines

`window.PROTO` global with:
- `mentee` — Нелли Кам metadata (role, goal summary, call reference)
- `threads` — four seed comment threads with anchor quotes, agent proposals, statuses
- `deck` — five mentee cards for the stage-1 3D picker
- `tiers` — four tier objects (community, expert, pro, free) with line items + Boostie hrefs
- `state` — initial role, stage, reviewShared, transcriptSigned, clientComments

### `prototype-alpha/app.js` — 526 lines

All vanilla JS inside one IIFE. Behaviors:
- URL params → `role`, `stage` set on `.app`
- Stage pills click + Shift+1..7 keyboard shortcut
- Card stack controller (one active per group, data-state flip)
- Deck controller (hover-to-activate desktop, drag-to-cycle mobile, click-to-choose)
- Text selection → draft card in active stack → Enter commits a thread
- Thread accept replaces highlighted text inline; reject closes with status
- Review submit gate (rating + text required) → sets `data-reviewed="true"`, scrolls to sign
- Sign submit → generates `.md` transcript download via Blob, sets `data-transcript-signed="true"`
- Client shout card rotates title + body + primary CTA through three states
- Tier stack rendered from data.js, prices gated by `data-price-gated` attribute

### `prototype-alpha/prototype.css` — 114 lines (final state after rebuild)

Attribute-scoped gating only. No new classes.

- Role gating: `.app[data-role="operator"] [data-view-only="client"] { display: none }` et al.
- Stage gating: `[data-stage-card]` hidden by default, shown when `.app[data-stage="N"]` matches
- Dev block: `[data-dev-block]`, `[data-dev-label]`, `[data-dev-pills]`
- Stage pills: `.tag[data-stage-pill]` with 44×44 touch target
- Stars: `.tag[data-star]::before { content: "★" }`, size 44×44, filled = `.tag--bold`
- Hint gating: `[data-show-when="locked|reviewed|unsigned"]`
- Price gating: `[data-price-gated="true"]` dimmed + appended "· после отзыва" text when review not shared
- Tier card heading: flexbox for title + price side-by-side

## Rendering URL surface

- `/prototype-alpha/` → operator, stage 4 (ревью стратегии, default)
- `/prototype-alpha/?role=client` → client view
- `/prototype-alpha/?role=operator&stage=1` → operator starting at brief
- Shift+1 … Shift+7 on keyboard advances stages

## What I did NOT port from the kit

This is the sentence that explains the whole downstream mess.

The kit's behavioral JS lives inline in `../index.html` at lines 3400+ (~700 lines). It owns: scroll-spy indicator animation, inspector card stack controller with MutationObserver, deck hover + drag controller, comment menu popovers, narrow-view FAB toggles, selection-to-highlight flow, active-state observer mapping thread cards to highlight spans.

I ported fragments (card stack promote/collapse, deck controller after the bug report). Everything else stayed broken. Nav scroll-spy indicator does not move. Highlight `--active` state does not track card state.

Retro finding: kit JS must be extracted into a shared `kit.js` before any future consumer is built.

## Gate

Hand to frontend pass.

## Hand-off

→ Stage 4a, `05-frontend-pass.md`.
