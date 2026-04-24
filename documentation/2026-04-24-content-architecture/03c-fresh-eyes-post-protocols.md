---
session: 2026-04-24-content-architecture
stage: 3c
role: fresh-eyes-jobstory (post-designer mode)
character: Steve Jobs — 0.2-second clarity bar, ungenerous
input: 03a-fresh-eyes-pre-protocols.md (14 questions) + 03b-designer-protocols.md (designer draft)
output: per-question pass/fail against designer hand-off for the protocols book
gate: PASS — every pre-question answered with evidence in the draft
---

Post-designer validation for pattern block 4 — protocols. Cold pass over the designer's draft against the 14 pre-questions. Ungenerous. Jobs lens.

## Jobstory under test

When shipping, evolving, or logging an exception, we want bundle rules + semver + evolve protocol + backlog + ideation in one doc, so every kit change follows the same discipline.

## Per-question verdict

**1. Numbered checklist shape — top-to-bottom readable in thirty seconds?**

PASS. §Pre-question answers #1 names concrete counts — six sections, each numbered. Ship discipline 6 items, Bundle 7, Semver 4 push steps + 3 axes, Evolve 5, Backlog + Ideation list entries. Draft body confirms the shape. Under ninety lines claim holds on the rendered markdown.

**2. Landing mid-task — which section owns my current action?**

PASS. §Pre-question answers #2 maps section order to commit arc. Pre-commit → Ship. Staging → Bundle. Tagging → Semver. Conflict → Evolve. Known wrong → Backlog. New idea → Ideation. Reader's current action resolves to a section without scanning.

**3. Bundle-rule file list walkable without scroll?**

PASS. §Pre-question answers #3 commits to seven one-line items. Draft confirms — each bundle item is a single numbered line. Fits a laptop screen. No scroll needed.

**4. Semver four-step sequence walkable without git-docs detour?**

PASS. §Pre-question answers #4 and draft §Semver §Push steps both carry verbatim commands — `git commit`, `git tag -a vX.Y.Z -m "..."`, `git push origin main`, `git push origin vX.Y.Z`. Annotated-tag flag called out. Reader copies from book, not git docs.

**5. Evolve protocol — decision path or principles-only?**

PASS. §Pre-question answers #5 and draft §Evolve protocol deliver five action-verb steps. Step 1 state, step 2 decide, step 3 update both, step 4 log, step 5 sign. Every step produces an artefact. Not principles-only.

**6. Backlog scannable as list, not embedded prose?**

PASS. §Pre-question answers #6 commits to list shape for both Backlog and Ideation. Empty-state handled by one-sentence placeholder instead of empty bullets. Draft confirms.

**7. Framing as maintainer-only visible at 0.2s?**

PASS. §Pre-question answers #7 places "This book is for the human editing the kit itself. Product consumers … skip this" as the first sentence under the hero. Draft opening paragraph confirms. Product consumers hit the skip signal before any protocol content.

**8. Reading flow — landed from what, going to what?**

PASS. §Pre-question answers #8 states landed-from (finished change, about to commit) and going-to (clean tree on pushed tag). Draft opening paragraph restates both. Explicit.

**9. Reference vs read-through — which?**

PASS. §Pre-question answers #9 says both, with TOC acting as jump menu on subsequent opens. Section titles match action names. Works for first-read and reference mode.

**10. Bundle-rule file list canonical or extensible?**

PASS. §Pre-question answers #10 declares canonical today, extensible only via the evolve protocol. Draft §Bundle rule closer — "Adding an eighth file type runs the evolve protocol first. No silent extensions." — locks the rule.

**11. Semver major/minor/patch — renames mapped to axis?**

PASS. §Pre-question answers #11 and draft §Semver §Axes carry the `.doc` → `.book` rename as the worked major example. Minor = add token. Patch = typo. Axis lands on consumer-facing impact, not internal scope. Reader maps their change before touching `package.json`.

**12. Evolve five-step — code and doc in different PRs, what gives?**

PASS. §Pre-question answers #12 and draft §Evolve step 3 carry the carve-out — paired PRs within one business day count as "together"; log the split to §Backlog at step 4. Rule survives the edge case without silent breakage.

**13. Backlog vs Ideation — crisp split?**

PASS. §Pre-question answers #13 makes the split concrete — Backlog = prototype is wrong on purpose, short entries with fix target; Ideation = considered but not built, long entries with Parked + Revisit if. Draft §Backlog and §Ideation confirm different entry shapes.

**14. Checklist-shaped or essay-shaped at 0.2s?**

PASS. §Pre-question answers #14 — numbered lists dominate, no paragraphs over three sentences except opening framing. Draft renders as pre-ship gate. Every bullet is a did-or-did-not action. Jobs lens clears it.

## Tally

Answered: 14/14. Gaps: 0. Bubbled: 0.

## Gate

PASS. Designer answered every pre-question with evidence in the draft. Pattern block 4 (protocols) clears stage 3c.

## Hand-off

Downstream stage 4 `kk-role-ds-manager` once all six pattern blocks clear 3c. No return-to-designer needed for protocols.
