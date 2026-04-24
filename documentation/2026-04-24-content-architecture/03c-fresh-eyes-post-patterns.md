---
session: 2026-04-24-content-architecture
stage: 3c
role: fresh-eyes-jobstory (post-designer mode)
pattern-block: patterns
input: documentation/2026-04-24-content-architecture/03a-fresh-eyes-pre-patterns.md + 03b-designer-patterns.md
output: answered/unanswered audit across all 16 pre-designer questions for the patterns book
gate: PASS — 16/16 answered, 0 gaps, 1 bubbled flag
---

Cold post-designer audit. Character: Steve Jobs — 0.2-second clarity bar, ungenerous. Every 3a question checked against 3b §Question-to-answer map. Deflections fail. Deferrals fail unless the deferral itself is a valid answer (out-of-scope routing to a named stage counts).

## Audit — 16 questions

**Q1 — Which pattern for what I'm building: decision tree, table, or headings?**
Answered. 3b Q1: headings for three top-level, table for eleven. Jobstory line names the decision.

**Q2 — Pattern vs component distinction at 0.2s.**
Answered. 3b Q2: pattern = composition of two or more parts with a nameable function. Component = the part itself. Distinction carried by the jobstory line.

**Q3 — Preview visible at a glance, or click-to-see?**
Answered. 3b Q3: HTML snippet inline (glance), live preview-frame behind a deep link (click). No thumbnails in markdown.

**Q4 — Preview-frame click — in-page, new tab, navigate?**
Answered. 3b Q4: navigate in-page, standard anchor, no `target="_blank"`.

**Q5 — HTML snippet copy-paste — standalone, or needs surrounding markup?**
Answered. 3b Q5: needs `style.css` + `vars.css` on the page. Snippets carry the minimum root (`<div class="app" data-view="doc">`), no `<html>`/`<head>`/`<link>`.

**Q6 — Drill from pattern to component — direct link, or search?**
Answered. 3b Q6: one pointer at the jobstory line, no inline per-class links. Reader navigates via the inspector column at kit root.

**Q7 — Registry table size — one screen, many?**
Answered. 3b Q7: eleven rows, fits one desktop screen, may scroll on narrow. Two columns (name + role).

**Q8 — Opening question match — "which shell / stack / recipe?"**
Answered. 3b Q8: shell → §Three columns; stack → §Card stack; narrow → §Narrow mobile; any recipe → registry table.

**Q9 — Reading flow — prior step was manifesto; next step is pick + copy?**
Answered. 3b Q9: manifesto §Navigation → patterns.md → pick → copy → drill to components.md only if customizing a part. Signoff closes the book.

**Q10 — Catalogue vs decision tree?**
Answered. 3b Q10: catalogue of three plus registry of eleven. Not a tree. Top three ranked by frequency.

**Q11 — Three top-level vs 11 registry — canonical vs supplementary, or peers?**
Answered. 3b Q11: top-level load-bearing (every kit surface uses them); registry reusable (appear in some surfaces). Different visual weight matches different role.

**Q12 — Narrow mobile — pattern or responsive variant?**
Answered. 3b Q12: pattern. Own composition rules (doc full-width, sidebar → hamburger, inspector → modal sheet). Breakpoint is part of the pattern.

**Q13 — Root patterns.html absorbed — old URL handling?**
Answered by routing. 3b Q13: out of scope for canon/patterns.md; mechanical delete handled at stage 5. Canon does not reference the old URL. Counts as answered — the deferral names the owning stage and the canon-file posture is explicit.

**Q14 — Preview-frame slug missing on disk — broken link or empty preview?**
Answered. 3b Q14: broken link, standard 404, no graceful fallback. Missing slug = ship-check failure at stage 6. All 11 slugs listed and confirmed on disk.

**Q15 — Strategy-doc pattern obvious at 0.2s?**
Answered. 3b Q15: not present and should not be — moved out of kit per 01-analyst.md; future home is a strategy prototype under `demos/`. Registry row added when a prototype ships and the pattern-discoverer slices it.

**Q16 — Three-columns visible as the default / most-used?**
Answered. 3b Q16: first section after jobstory; heading carries `(default shell)` parenthetical. Visual hierarchy = reading order = frequency.

## Tally

- Answered: 16 / 16
- Gaps: 0
- Deflections: 0

## Bubbled flags (not gating, pass-through to stage 7)

1. **Filename mismatch.** Direction doc §Per-canon-file content structure writes the three-columns preview pointer as `demos/fundamental--accepted/patterns/three-columns.html`; the file on disk is `three-column-shell.html`. 3b §Q14 flagged and recommended keeping the disk filename (option b). Draft prose uses `three-column-shell.html`. Bubbled to meta-reviewer.

2. **Narrow-mobile preview slug.** 3b draft prose uses `demos/fundamental--accepted/patterns/narrow.html` in the snippet preview line, but the on-disk inventory listed in 3b §Q14 does not include a `narrow.html` — the 11 confirmed slugs are card-stack, three-column-shell, sidebar-nav, doc-section, spec-list, deck-in-shout, inspector-group, comment-thread, comment-thread-resolved, comments-group, signoff. `narrow.html` is not in that list. Either the slice exists and the Q14 inventory missed it, or the draft points at a missing file. Ship-check risk. Bubbled to meta-reviewer.

## Gate

PASS. 16/16 answered. Two bubbled flags for stage 7 meta-review — neither blocks the designer hand-off.

## Hand-off

Back to `kk-role-design-director` for pattern-block assembly alongside other 3c outputs. Bubbled flags travel to `kk-role-meta-reviewer` at stage 7.
