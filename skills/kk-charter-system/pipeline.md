# Pipeline — eight stages, in order

Run sequentially except where marked parallel. Each stage gates the next; failure returns work to the stage that owns it.

```
Stage 1   ─►  analyst                          (decompose brief)
Stage 2   ─►  charter-director                  (direction map)
Stage 3a  ─►  fresh-eyes-jobstory (pre)         (per-direction naive Qs)
Stage 3b  ─►  charter-writer × N (parallel)     (one charter per direction)
Stage 3c  ─►  fresh-eyes-jobstory (post)        (validate every Q answered)
Stage 4   ─►  portfolio-manager                 (cross-direction view)
Stage 5   ─►  synthesis (mechanical)            (consolidate)
Stage 6   ─►  consistency-charter ┐ (parallel)
              voice-reviewer      ┘
Stage 7   ─►  meta-reviewer                     (gate; ship or return)
```

## Stage 1 — analyst

**Input.** Calls digest, all comment-pass JSON files, current `CHARTERS_DRAFT.md` (if rebuilding), `PROJECT_OS.md` Phase 0.

**Output.** `outputs/01-analyst.md` — decomposition into:
- Active directions with evidence pointers per direction
- Job stories per direction (when applicable)
- Open questions, especially cross-direction ones
- Newly surfaced entities (people, products, repos) not yet in glossary

**Gate.** Every direction in `outputs/01-analyst.md` is grounded in either calls evidence or a stamped KK comment. Anything else is flagged.

**Return on failure.** Re-read the missing input.

## Stage 2 — charter-director

**Input.** `outputs/01-analyst.md`, glossary, PROJECT_OS.md.

**Output.** `outputs/02-direction-map.md` — for each direction, the framing decisions:
- Canonical name + slug
- Type (direction / ecosystem / product-as-direction / personal)
- Primary spoke repo(s)
- Sub-tracks (named, not described — description is for charter-writer)
- One-sentence framing
- Cross-references to other directions

**Gate.** Every direction in the analyst's list appears in the map, or is explicitly demoted (with reason). Names match the glossary. No new sub-tracks invented without grounding.

**Return on failure.** Back to Stage 1 if the missing direction was an analyst miss; otherwise rewrite the map.

## Stage 3a — fresh-eyes pre-charter

**Input.** `outputs/02-direction-map.md`, glossary.

**Output.** `outputs/03a-pre-questions.md` — per direction, naive questions a cold reader would ask. No design context; pure user POV.

**Gate.** Each direction has at least 5 naive questions. Steve Jobs 0.2-second clarity bar.

## Stage 3b — charter-writer × N (parallel)

**Input.** `outputs/02-direction-map.md`, the relevant subset of `outputs/03a-pre-questions.md`, calls digest, all comment passes, glossary, any deep-read files (e.g., `jazzylea-deep-mission.md`).

**Output.** `outputs/charter-<slug>.md` per direction. Triple-pass (draft → critique → rewrite). Cite evidence everywhere. No out-of-scope sections. Mission passes the three-month test.

**Gate.** Every charter has the six required sections (mission / sub-tracks / initiatives + status / time-bound / references / open questions). Every initiative has a status. Every claim has an evidence pointer or `[KK-asserted]`.

**Return on failure.** Charter goes back to its writer with the gate's specific failure note.

## Stage 3c — fresh-eyes post-charter

**Input.** `outputs/charter-<slug>.md` (all of them), `outputs/03a-pre-questions.md`.

**Output.** `outputs/03c-post-validation.md` — per pre-question, the answer location in the charter, or `UNANSWERED`.

**Gate.** Zero unanswered pre-questions. Any unanswered question returns work to that direction's charter-writer.

## Stage 4 — portfolio-manager

**Input.** All `outputs/charter-<slug>.md`.

**Output.** `outputs/04-portfolio.md`:
- Time-bound deliverables consolidated table
- Cross-direction dependencies (graph)
- Resource conflicts (e.g., one person on two critical paths at once)
- Status balance (active vs paused per direction)
- Sequencing recommendations
- Cross-cutting open questions for KK

**Gate.** Every time-bound deliverable from every charter appears in the consolidated table. No invented deliverables. Conflicts named with the conflicting parties.

## Stage 5 — synthesis (mechanical)

No role. Assembly only.

**Input.** All `outputs/charter-<slug>.md` + `outputs/04-portfolio.md`.

**Output.** `outputs/CHARTERS_DRAFT.md` — assembled in the canonical order, with the portfolio table inserted at the bottom + the resolved-decisions log carried forward + cross-direction questions section.

## Stage 6a — consistency-charter

**Input.** `outputs/CHARTERS_DRAFT.md`, glossary.

**Output.** `outputs/06a-consistency.md` — defect list:
- Naming inconsistencies (any name that differs from glossary)
- Cross-direction contradictions
- Out-of-scope language sneaking back in
- Italic / bold / weight rule violations
- Initiative-vs-task confusion
- Evidence-pointer drift (claims without evidence; broken call IDs)

**Gate.** Zero defects, or every defect has an `[ACCEPTED-BY-KK]` tag (which can only happen if KK has commented).

## Stage 6b — voice-reviewer

**Input.** `outputs/CHARTERS_DRAFT.md`.

**Output.** `outputs/06b-voice-patches.md` — patch list (BEFORE / AFTER / WHY) for every voice defect. Same shape as the existing `voice-review-patches.md` example.

**Gate.** Zero AI tells. Bold rule honored. Sentence-case for headings. No filler openers. No filler endings.

## Stage 7 — meta-reviewer

**Input.** Everything. Especially `outputs/06a-consistency.md`, `outputs/06b-voice-patches.md`, and `outputs/04-portfolio.md`.

**Output.** `outputs/07-rubric.md` — every rubric item answered with evidence:
- Mission survives the three-month test (sample-test on at least 2 directions)
- Every initiative has a status and evidence pointer
- No out-of-scope sections in published charters
- No "coaching" — only "supervision"
- No client names disclosed
- No "Xplee" spelling
- Glossary is canonical and consistent
- Cross-direction contradictions resolved
- Time-bound table is complete and accurate
- Open questions are sharp and decision-forcing

**Gate.** Every rubric item passes. If anything fails, work returns to the owning stage with a specific note. No "looks fine" verdicts — every accept names the evidence.

## Failure routing

When a gate fails:

| Gate failure | Returns to |
|---|---|
| Direction missing | Stage 1 (analyst) |
| Sub-track invented without grounding | Stage 2 (director) |
| Initiative missing evidence | Stage 3b (the relevant writer) |
| Pre-question unanswered | Stage 3b (the relevant writer) |
| Cross-direction contradiction | Stage 3b (both writers) |
| Time-bound mismatch | Stage 4 (portfolio-manager) |
| Voice / AI-tell defect | Stage 6b output applies as a patch — no return |
| Glossary defect | Stage 1 (analyst surfaces new entities) or Stage 6a (typo / drift) |
| Mission fails 3-month test | Stage 3b (the writer) |

## Hand-off to KK

After Stage 7 passes, hand off to KK with:

1. `outputs/CHARTERS_DRAFT.md` — the new draft.
2. `outputs/CHANGES.md` — what changed vs. inputs and why.
3. `outputs/07-rubric.md` — the gate report.
4. `outputs/portfolio.md` — cross-direction view.
5. A short list of the open questions (from charters + Stage 4) that need KK's call before Phase 1.

Do **not** deploy outputs to canonical paths (`/Users/kostyantinopolskii/Jupiter/Core/CHARTERS_DRAFT.md` etc.) until KK reviews and stamps.
