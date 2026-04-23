---
session: 2026-04-22-wealthy-operator-alpha
stage: 10
role: frontend-reviewer
input: prototype-operator-alpha/{index.html, app.js, data.js, prototype.css} + 08-frontend-engineer.md + 09-ux-copywriter.md + 07-ds-reviewer.md §Amendments
output: four fixes landed (markup + JS + a11y), five flags surfaced with next-owner, zero blockers
gate: pass
kit: v0.13.0 consumed (no kit edits this stage)
---

# Frontend review — Wealthy operator alpha

Stage-10 pass on the copy-complete prototype. Semantics, a11y, mobile + cross-browser, JS simplicity. Visual frozen throughout — zero kit-class changes, zero token touches, zero layout moves.

## Raw input

> stage-10 frontend reviewer, running in parallel with UX copy reviewer + consistency reviewer on the fully-copied prototype. Inputs — prototype-operator-alpha/{index.html, app.js, data.js, prototype.css}. Context — 08-frontend-engineer.md, 09-ux-copywriter.md, 07-ds-reviewer.md §Amendments. Scope per kk-ds-frontend: semantics, a11y, mobile, cross-browser, JS simplicity. Visual frozen. Failures return to stage 8. Pass returns to final ship.

## Verdict

PASS. One real bug caught (anchor-wrap silently failed for five of seven threads); three supporting fixes (strategy subsection ids, aria-live on the count line, aria-label on the nested nav). JS already simple — no collapse needed. Five flags surfaced for maintainer or next-pass, zero blockers.

## Fixes applied

- `prototype-operator-alpha/app.js:42-47` — JS bug fix. `wrapAnchor` called `document.getElementById(sectionId)` then bailed out when null. Threads t1-t5 carry subsection slugs (`point-a`, `positioning`, `hypotheses-channels`, `next-steps`) that land on h3 headings inside one flat `#strategy` article — not on `.doc__section` wrappers. Result: five of seven `.highlight[data-comment-id]` spans never materialised, breaking the doc-body ↔ inspector loop for 71% of the seeded threads. Fallback added: if the resolved element is not itself a `.doc__section`, walk its nearest `.doc__section` ancestor; final fallback `#doc`. Quotes are unique Russian strings, first-occurrence wins. No visual change — affects only whether kit-shipped CSS on existing `.highlight` spans runs.
- `prototype-operator-alpha/index.html:213, 219, 225, 231, 237, 243, 249, 255, 261` — markup a11y. Added `id` to the nine strategy h3 subsection headings (`call-digest`, `point-a`, `point-b`, `vision-model`, `positioning`, `hypotheses-channels`, `market`, `next-steps`, `how-we-work`). Matches `data-kk-section-slug` metadata in `data.js`, enables in-page linking for deep references in future builds, gives the walker fallback a stable hit point, surfaces the subsection structure to screen readers. Zero visual effect — just attributes.
- `prototype-operator-alpha/index.html:420` — a11y live region. Added `aria-live="polite"` + `role="status"` to the `[data-context-count]` paragraph in the threads inspector group. `updateContextCount()` re-renders on every `kk:comment` (new / reply / delete / approve / archive); without a live region, screen-reader users miss every count change. Visual identical — live regions are semantic only.
- `prototype-operator-alpha/index.html:24` — a11y landmark naming. Added `aria-label="Разделы документа"` to the nested `<nav class="sidebar__nav">`. The outer `<aside aria-label="Навигация">` already labels the sidebar region; the inner `<nav>` now names itself distinctly so rotor navigation lands on "Разделы документа" rather than an unnamed nav landmark nested inside a labelled aside.

## Flags not fixed

- **Soft. Next-owner: kk-ds-maintainer.** Kit's `comment-kebab-menus` dispatches on English `textContent` (`Approve`, `Reply`, `Archive thread`, `Delete`) — consumers in any non-English locale must ship literal English kebab labels beside their localised UI. Stage-8 already flagged this for a v0.14.0 i18n pass; prototype ships the known rough edge intact. Fix belongs in kit.js dispatch + `KK.config.i18n` keys, not in a consumer rewrite.
- **Soft. Next-owner: kk-ds-maintainer.** Kebab `<div class="comment__menu-popover" role="menu">` + `<button role="menuitem">` invite arrow-key navigation per ARIA 1.2; kit's current handler wires click + outside-click-close + Escape only. No Home/End/ArrowUp/ArrowDown handlers. Either remove the `role="menu"` / `role="menuitem"` attributes (downgrade to a plain button group) or extend kit to implement the contract. Kit-level call.
- **Soft. Next-owner: kk-ds-maintainer.** `.highlight` spans in the doc body are click-targets (kit's `doc.addEventListener('click', …)` promotes the matching thread), but are not keyboard-reachable. No `tabindex="0"` + `role="button"` + `keydown(Enter/Space)` handler. Keyboard users cannot jump from a marked quote to its thread. Fix belongs in kit.js comment-selection-flow where the spans are authored — a consumer adding tabindex on pre-seeded spans would divert from kit.
- **Soft. Next-owner: kk-role-frontend-engineer (next build pass).** Four signoff steps render as `<p class="t-caption">1. <span>…</span></p>` with hand-authored numerals. Semantically an enumerated list wants `<ol>`. Kit ships `ol.t-list` with its own counter — adopting it would introduce the list's 0.5px between-row divider + counter glyph geometry, which is visible rework. Leave as p-paragraphs for this build; revisit when the steps grow past four or gain interaction.
- **Soft. Next-owner: kk-role-frontend-engineer (next build pass).** Brief card's depth switch is `<input type="checkbox" class="switch__input" checked disabled />` with no `aria-describedby` naming why it is locked. Visually the `20 USD` caption sits beside it; screen readers hear "Deep Research, checkbox, checked, dimmed" with no pricing context. Tie the caption via `aria-describedby` when the switch becomes interactive in the build that owns depth selection. Review-state fixture keeps it inert and out of scope here.

## JS simplicity audit

`prototype-operator-alpha/app.js` is 243 lines, one IIFE, clean split between `wrapAnchor` (DOM mutation helper) + `kebabPopoverHTML` + `messageHTML` + `threadHTML` (templating) + `seed` + `updateContextCount` + one `kk:comment` listener. No per-element `addEventListener` — the kit's delegated listeners cover kebab clicks, thread promotion, scroll-spy, narrow toggle. Consumer's one listener is on `document` for `kk:comment` and branches on action. Zero refresh loops, no `setInterval`, no manual DOM diffing, no reimplementation of kit behaviour. Russian plural logic for the count line is five lines and self-contained. No collapse needed. `KK.refresh()` not required — the consumer mutates `.comment-stack` via `insertAdjacentHTML` before kit's auto-init fires `KK.init()` on `DOMContentLoaded`, which picks up the seeded threads in a single pass.

## Accessibility audit

- **Landmarks.** `<aside aria-label="Навигация">` + `<main class="doc" id="doc">` + `<aside class="inspector" aria-label="Стадии и треды">`. Each top-level region named. Nested `<nav>` now carries its own aria-label post-fix.
- **Heading hierarchy.** h1 (one per page) → h2 (four doc sections + signoff shout) → h3 (card headings + strategy subsections + inspector card titles). No skips. No multiple h1.
- **Buttons vs links.** Buttons for actions (`button.button`, `button.comment__menu`, `button.comment__menu-item`). Anchors for navigation (`a[href^="#"]` in the TOC). Discipline held.
- **Focus reach.** All interactive surfaces are `<button>` or `<a href>` or `<input>`. Focus-visible outline shipped by kit (`outline: 2px solid var(--color-border-strong)` on `.button:focus-visible`). No `tabindex="-1"` anywhere. No `outline: none` overrides in `prototype.css`.
- **Touch targets.** `.button` renders `padding: 14px var(--space-6)` + `.t-subtitle` 24-line-height → ≈52px row. `.comment__menu` renders with min-height set by the kebab glyph + kit-owned padding. TOC `<a>` rows render with `.t-caption` 24-line-height plus the nav-group's spacing; the clickable surface is the full row width via `<li>`. All clear the 44×44 floor.
- **Contrast.** Body + structural markers render `--color-text` on `--color-bg` (black on near-white). `t-muted` + `t-subtle` confined to metadata per voice.md + manifesto. No `prototype.css` overrides.
- **Live regions.** Count line in the threads inspector group now announces. No other dynamic region needs one — the resolved-thread collapse, approve/archive state flips, and doc-body quote rewrite are visual-only changes that do not require polite announcement.
- **Language.** `<html lang="ru">` declares Russian. Kit-internal kebab labels (`Approve` / `Reply` / `Archive thread` / `Delete`) render in English inside a Russian document — an ARIA or `lang="en"` span wrap would be over-engineered for a known v0.14.0 target. Leave as-is per the stage-8 flag.

## Mobile + cross-browser

- `prototype.css` carries one `@media (max-width: 800px)` rule on the control-block composition — mirrors the kit's tablet→phone breakpoint in `style.css` (1024 tablet, 768 phone; the 800 threshold flows the buttons vertical before the inspector stacks). Works.
- No CSS features outside the evergreen set: `flex`, `flex-wrap`, `gap`, custom properties. No container queries, no `:has()` (kit uses `:has()` extensively — consumer does not).
- JS uses `document.createTreeWalker`, `CustomEvent`, `IntersectionObserver` (via kit), `String.prototype.replaceAll`, `element.closest`. All evergreen from 2021+.
- No hover-only affordances. Kebab + thread promote both fire on click.
- The anchor-wrap uses `node.nodeValue.indexOf(quote)` — case-sensitive substring. Matches the Russian anchor quotes exactly. Unicode-safe (JavaScript strings are UTF-16, `indexOf` operates on code units, the anchors and source text use the same encoding).

## Seed integrity check

Walked each of the seven seeded threads against the post-fix DOM:

| id | Section slug in seed | Resolves to | Quote matches | Highlight wraps |
|---|---|---|---|---|
| t1 | `point-a` | h3 → closest `#strategy` | "Ничего не заканчивается" in `<p>` under Точка А | yes |
| t2 | `positioning` | h3 → closest `#strategy` | "Прекратить транслировать неуверенность" in `<p>` | yes |
| t3 | `positioning` | h3 → closest `#strategy` (second walk, first match already wrapped) | "Делегирование двум проверенным спецам" in `<p>` | yes |
| t4 | `hypotheses-channels` | h3 → closest `#strategy` | "Фаундеры читают прямые сообщения в LinkedIn" in `<p>` | yes |
| t5 | `next-steps` | h3 → closest `#strategy` | "Ассистентка и 25 инвайтов" in `<p>` | yes |
| t6 | `research-1` | `#research-1` article directly | "LinkedIn Jobs, апрель 2026" in a `<dd>` | yes |
| t7 | `research-1` | `#research-1` article directly | "Taplio, Dripify работают" in a `<dd>` | yes |

One subtle note on t2 + t3: both target `#positioning`, and the treeWalker walks `#strategy` in document order. t2 wraps "Прекратить транслировать неуверенность" (earlier in the Позиционирование paragraph); t3 then walks again from the top and finds "Делегирование двум проверенным спецам" (later in the same paragraph). Both distinct strings, first-occurrence rule handles both cleanly.

## Gate

Pass. Hand back to the final ship (after the parallel UX copy + consistency reviews finish). No return to stage 8.

## Hand-off

→ Final ship merge. The orchestrator collects stage-10 verdicts across the three reviewers and, if all three pass, proceeds to ship. If any fails, the failing vector's stage is re-run with the flagged issues; this review has nothing to re-run.
