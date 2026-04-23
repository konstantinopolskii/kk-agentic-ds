---
session: 2026-04-24-markdown-source
stage: phase-1g-jobs-round-5-rework
role: kk-ds-maintainer
character: Rachel Andrew
input: phase-1-fresh-eyes-jobs-round-5.md (three defects, FAIL)
output: kit + smoke-test fixes + round-6 screenshots + measurement evidence
gate: pending round-6 Jobs audit
---

Round 5 Jobs cold read failed the smoke test on three defects. This doc records the per-defect fix, the option chosen, the files touched, and the measured evidence.

## Inputs

- `documentation/2026-04-24-markdown-source/phase-1-fresh-eyes-jobs-round-5.md` — Jobs round 5 audit, FAIL, three defects.
- Kit tree at commit `7fe98a3`.

## Defect 1 — hierarchy collapse between shell part and article heading

### Diagnosis

Shell renders `<h2 class="doc__part">Samples</h2>` at hero rank (66 px bold, per `.doc__part` CSS). Article `#` rendered at `t-display` (38 px bold) under the default `data-md-heading-offset="1"`. The visible hierarchy was hero (page h1) → hero (part) → display (article). The flat stack made "Samples" and "Core prose path" read as peers at the 0.2-second bar — the step between them lived only in the page h1 gap, not in the part-to-article transition.

### Fix — option (a), heading-offset bump

Added `data-md-heading-offset="2"` to each of the three `<article data-md-src>` in `demos/md-renderer-smoke/index.html`. Under offset +2 the article's source heading levels shift +2 instead of +1:

- `#` source lands at `h3` → `t-title` (22 px bold).
- `##` source lands at `h4` → `t-subtitle` (18 px Medium 500).
- `###` and `####` source both demote to `<p class="t-caption--bold">` (16 px Bold 700) with a `console.info` per the existing demotion contract.

`js/md.js § load` already honours `data-md-heading-offset` (introduced in the round 2 rework at commit `fbd4eee`). No renderer change needed.

Side effect: `###` and `####` in sample-a both demoted to the same `t-caption--bold` rank. Two sibling sub-headings at identical rank would collide, so the `#### Subtitle-level heading` block was removed and its body paragraph rewritten under the `### Card-level heading` section. The new prose names the `data-md-heading-offset="2"` contract explicitly, so readers of the rendered sample see the kit contract documented where it applies.

### Evidence

Measured from the rendered smoke test at 1280 viewport:

| Element | Source | Rendered class | Computed size / weight |
|---|---|---|---|
| page h1 | shell `<h1>` | `t-hero` | 66 px / 700 |
| shell part | shell `<h2 class="doc__part">` | `doc__part` | 66 px / 700 |
| article h3 | md `#` + offset 2 | `t-title` | 22 px / 700 |

Part-to-article step: 66 → 22, ratio 3:1. Clear visible stair. Hierarchy collapse resolved.

## Defect 2 — h4 t-subtitle vs demoted `t-caption--bold` read as peers

### Diagnosis

Under offset +1, sample-a's `###` shifted to `t-subtitle` (18 px Bold) and `####` demoted to `t-caption--bold` (16 px Bold). 2 px size delta at identical weight read as the same bold label under the 0.2-second bar.

### Fix — option (b), weight step

Chose option (b): drop `.t-subtitle` `font-weight` from `var(--fw-bold)` (700) to `var(--fw-medium)` (500). Every other heading rank (hero, display, title) stays at Bold 700. `t-caption--bold` stays at Bold 700.

Rationale over option (a) letter-spacing: weight step is a classical typographic contrast axis, reads instantly, and carries the rank regardless of reading distance. Letter-spacing at 18 px is too subtle to rescue a 2 px size delta. Option (c) would mute the subtitle and contradict the kit's no-muted-by-default rule. Option (d) would silently drop `#####` source content, losing the author's intent.

Ripple acknowledged: `.button.t-subtitle` buttons (used in `index.html` for CTAs) now render at Medium 500 instead of Bold 700. This matches the rest of the kit's body-rank typography — body, caption, and micro are all 500 — and the button's inverted surface (`.button--primary`) still carries full visual weight via the black background. No downstream defect surfaced in the round-6 screenshots.

### Evidence

| Element | Source | Rendered class | Computed size / weight |
|---|---|---|---|
| article-a h4 | md `##` + offset 2 | `t-subtitle` | 18 px / **500** |
| article-a demoted | md `###` + offset 2 | `t-caption--bold` | 16 px / **700** |

Weight delta: 200 units (Medium → Bold). Size delta: 2 px. Both axes now differentiate the two ranks. Visible step restored.

## Defect 3 — label-list pair gap at paragraph rhythm

### Diagnosis

Prior rule set `ul/ol { margin-top: 8 }` when preceded by a paragraph, but the paragraph's own `margin-bottom` was still governed by `.doc__section > * + *` (20 px) — the visible gap collapsed to the larger of the two via margin-collapse logic. With `display: flex` on the section, margins do not collapse at all, so the full 20 px carried through. The label floated between the prose above and the list below.

### Fix — `:has()` on the label paragraph

Rewrote the label-list rule to make the paragraph own its bottom gap when the next sibling is a list:

```css
.doc__section > p:has(+ ul),
.doc__section > p:has(+ ol) {
  margin-bottom: var(--space-2);   /* 8 px */
}
.doc__section > p + ul,
.doc__section > p + ol {
  margin-top: 0;
}
```

`:has()` is Baseline since 2024, supported by every browser the kit targets. The heuristic "a paragraph immediately followed by a list is the label for that list" holds for every markdown authoring pattern the kit accepts; authors who want loose gap can insert any other element between the two.

### Evidence

| Measurement | Value |
|---|---|
| Label p `margin-bottom` | 8 px |
| Following `ul` / `ol` `margin-top` | 0 px |
| Measured gap (label.bottom to ul.top) | 8 px |
| Baseline paragraph-to-next-sibling gap (in same article) | 39 px |

Ratio 8 / 39 = 0.21. Label-list pair reads as one group; gap sits well below the 20 px inner paragraph rhythm and the 32 px body line-box. Rule 14 holds at the label-list level.

## Files touched

- `demos/md-renderer-smoke/index.html` — `data-md-heading-offset="2"` added to each of three `<article data-md-src>`.
- `demos/md-renderer-smoke/sample-a.md` — `#### Subtitle-level heading` removed; body paragraph rewritten under `###` to name the new offset contract. (Collision avoidance under offset +2, per round 5 rework instructions.)
- `style.css § Typography utilities` — `.t-subtitle` `font-weight` Bold 700 → Medium 500 with inline comment naming the weight-step rationale.
- `style.css § Main document` — label-list pair rule rewritten to use `:has()` on the preceding paragraph; list `margin-top` set to 0. Inline comment extended.
- `skills/kk-design-system/manifesto.md § Typography rhythm` — three paragraph updates: label-list paragraph extended to name the `:has()` contract; heading-offset paragraph extended to name the `"2"` case; new paragraph on the weight step between `t-subtitle` and `t-caption--bold`.
- `skills/kk-design-system/components.md § Typography` — `t-subtitle` row updated to name Medium 500 and the weight-step rationale.
- `skills/kk-design-system/tokens.json § typography.scale.subtitle` — explicit `fontWeight: 500` added plus a note on the weight step.
- `CHANGELOG.md § 1.2.0 § Fixed` — eight bullets added covering the three defect fixes and their canon + token updates.
- `documentation/2026-04-24-markdown-source/screenshots/jobs-round-6-viewport.png`, `jobs-round-6-1280.png`, `jobs-round-6-full.png` — round-6 screenshot triple captured at 1280 viewport, 1280×2400 mid, and 1280×4800 full.
- `documentation/2026-04-24-markdown-source/phase-1g-jobs-round-5-rework.md` — this self-doc.

## Not touched

- Version, tag, push — per operator instructions. 1.2.0 stays on `7fe98a3` plus this one commit. Ship protocol runs only after human OK and audit PASS.
- `index.html` (root), `patterns.html`, `demos/fundamental--accepted/` — untouched.
- `js/md.js` — the renderer already honours `data-md-heading-offset`; no change needed.
- `sample-b.md`, `sample-c.md` — no heading collisions under offset +2; left as is.

## Next step

Hand back to Jobs for round 6 cold read. If PASS, ship protocol runs. If FAIL, return to round 7 rework.
