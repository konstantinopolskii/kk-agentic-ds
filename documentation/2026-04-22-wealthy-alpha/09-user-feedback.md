---
session: 2026-04-22-wealthy-alpha
stage: 5
role: human + frontend
input: 08-supervisor-pass.md + prototype-alpha/* running on localhost:8173
output: bug reports, in-place fix
gate: retro called by user
---

# Stage 5 — Human verification

Two bugs surfaced. One fixed in place. The second triggered the retro.

## Bug 1 — 3D card stack hover

### Raw user message

> Почему-то сломался 3D card stack и по ховеру не работает теперь

### Diagnosis

The kit's deck controller lives inline in `../index.html` at line 4131 (`// Card stack — hover on desktop, horizontal drag on mobile`). ~110 lines. The prototype's `app.js` had a trivial click-to-activate handler, not the hover + drag controller.

Missing behaviors:
- Desktop: `mouseenter` on each card promotes it; `mouseleave` on wrapper snaps back to the chosen card.
- Mobile: `touchstart` + `touchmove` + 30px drag threshold cycles the active card; `touchAction: pan-y`; synthetic click suppression during swipe.
- Choose button: toggles `is-chosen` class and text "Choose" ↔ "Chosen" with a checkmark span.

### Fix applied

Ported the controller verbatim into `app.js`, localised labels: "Choose" → "Выбрать", "Chosen" → "Выбрано". 110 new lines in `app.js`.

User confirmed after fix — deck hover worked.

## Bug 2 — left nav doesn't work, pipeline feels wrong

### Raw user message

> Why the nav on the left doesn't work as expected? It seems that the product design pipeline doesn't really work here. I believe we shpuld revise the way we work on the design. Save this result, save the document you have. But let's have the retro session where we discuss the problems and see the possible solutions to them.

### Diagnosis

Same root cause as bug 1: kit's behavioral JS lives inline in `index.html`, not in a shared file. The prototype ported fragments only. Not ported:

- Scroll-spy indicator animation (`toc__indicator` doesn't move)
- Inspector card auto-scroll on promotion
- Narrow-view FAB toggles (tablet + phone)
- Comment menu popovers
- Selection-to-highlight flow's active-state observer

Each bug here is a symptom of the same structural hole.

### Fix applied

None in-place. User called a retro instead. Agreed — patching each symptom would not fix the systemic issue. The structural fix is extracting the kit's inline JS into a shared `kit.js`, consumable by any prototype.

### Signal the user sent beyond the bug

"The product design pipeline doesn't really work here" → the meta point: the existing five-stage pipeline didn't have defenses against this class of failure. No stage checked "did we import the kit's JS?" No stage produced multiple flow alternatives. No stage was scoped to a vertical slice.

## Gate

Retro declared. Prototype renamed to `prototype-alpha`. Focus shifts to meta-improvement.

## Hand-off

→ `10-retro.md`.
