---
session: 2026-04-22-kit-js-extraction
stage: 10
role: reviewers (frontend + consistency, parallel)
input: js/kit.js, index.html (updated), prototype-alpha/* (updated), 08-frontend-engineer.md
output: both verdicts PASS. Human browser-check confirmed behaviour parity.
gate: hand to maintainer
---

# Stage 10 — reviewers

Two reviewers ran in parallel on the stage-8 output. UX copy reviewer skipped (no copy changed). Human also clicked through `index.html` and `prototype-alpha` and confirmed behaviour parity.

## Frontend reviewer — `kk-ds-frontend`

### Vectors walked

**Semantics and a11y.**
- kit.js generates HTML for draft and thread cards. Every interactive element carries either a semantic tag or an ARIA role that matches: kebab button has `aria-label`, `aria-expanded`, `role` / `aria-hidden` on popover items.
- `matchMedia` and `IntersectionObserver` feature-gated at top of their modules. No UA sniffing.
- Feature detection for `scrollend` event handled via timeout fallback.

**Simplicity.**
- IIFE at the file root is required (exposes only `KK` on window). Keep.
- Seven modules each own one behaviour. No abstractions called once that would benefit from inlining.
- `try/catch` absent — there is no code that can throw under normal operation.
- No polyfills, no framework, no build step.

**Mobile.**
- Deck's touchAction set to `pan-y` on the wrapper. 30px horizontal threshold for cycling.
- Comment selection flow: the click-highlight-promote path swaps `data-view` to `inspector` on matchMedia(768px) so the promoted card lands in sight.
- Add-comment FAB attaches a click handler that sets `data-view` to `inspector`. Scoped to the FAB element.

**Browsers.**
- `scrollend` event is recent (Chrome 114+, Safari 17+, Firefox 109+). A 1.5s timeout fallback covers older engines.
- `IntersectionObserver` — scroll-spy returns early if unavailable.
- `matchMedia` — the deck returns to desktop behaviour on SSR-like paths where `global.matchMedia` is undefined. Already handled (the code reads `global.matchMedia(...)` under the IIFE's `global = window` bind, so it only runs in the browser).
- `prefers-reduced-motion` honoured by the existing CSS token overrides in `vars.css`.

### Verdict

```
PASS
```

No changes recommended. Kit.js reads as the extracted-and-renamed version of the inline block it replaces.

## Consistency reviewer — `kk-ds-supervisor`

### Vectors walked, in order

**1. Logic — does the layout still serve the job story?**

Three job stories from stage 1:
- Maintainer edits one file, consumers inherit. ✓ — every consumer loads the same `js/kit.js`.
- Consumer loads kit.js, every behaviour works without porting. ✓ — manifesto page demonstrates. Prototype-alpha demonstrates, minus the one documented English-label regression.
- Reader sees no regression on the manifesto page. ✓ — verified by the human in the browser.

**2. 80 / 20 at every nesting.**

kit.js has no visual output. The weight test collapses to: does the file organize into one primary concern per level?
- File level: one primary concern (kit behaviour). Seven modules each own one behaviour. No single module balloons across concerns.
- Module level: each module's public surface is a single `init*()` call. Private helpers nested.
- Function level: each function does one thing. No 200-line setup functions.

Pass.

**3. Inventory.**

- No new classes in any DOM kit.js generates. Everything resolves against `components.md`.
- No new tokens. Only `var(--dur-long)` and `var(--ease-swing)` referenced in animation strings, both pre-existing.
- No inline style colours or sizes. `style.animation` uses token vars, `style.transform` computes from layout rects.
- No gradient, shadow, glass, blur.
- Voice check on comments in the source: sentence case, no em-dashes in section headers, no AI tells. Body em-dashes present but rare.

Pass.

### Verdict

```
PASS
```

No drift introduced. The extraction preserves kit inventory exactly.

## Human verification

User clicked through the manifesto page and `prototype-alpha`. Scroll-spy indicator moves. Deck promotes on hover. Card stack glides. Comments fire. Inspector promotes on click. No regressions beyond the documented deck-label English regression in prototype-alpha.

## Gate

Both reviewers PASS. Human PASS. Hand to `kk-ds-maintainer`.

## Hand-off

→ Stage 11, `kk-ds-maintainer`. Input: maintainer proposals in `08-frontend-engineer.md` §Maintainer proposals.
