---
name: kk-charter-system
description: Orchestrator for KK's charter-writing pipeline. Use when rebuilding per-direction charters or producing a new charter for a freshly-surfaced direction. Mirrors `kk-design-system` (UI shipping) for strategic-document work. Eight stages, nine roles (four new, five reused from kk-design-system). Writes outputs to a project's `outputs/` folder; never deploys to canonical paths without KK's stamp. Anchor doc: `/Users/kostyantinopolskii/Jupiter/Core/PROJECT_OS.md` Phase 0.
type: orchestrator
parent-pipeline: kk-design-system
---

# kk-charter-system

Charters define what a direction is *for*, what initiatives are live inside it, what's explicitly out (in a separate decisions log, not the charter), and where the work lives in repos and Projects. This pipeline produces them.

Same flywheel as `kk-design-system`: a brief enters, a sequence of named roles each operate on an artefact, gates check rubric, the result ships when meta-reviewer accepts.

## When to invoke

- A new direction surfaces from calls and needs its first charter.
- KK lands a comment pass on `CHARTERS_DRAFT.md` that re-shapes one or more directions.
- A direction's status field has been stale > 30 days and the planning agent flags drift.
- Quarterly review of the full charter set.

Do **not** invoke for:
- Editing a single line in an existing charter (use a regular Edit).
- Drafting an initiative that fits inside an existing direction (charter-writer handles initiatives as part of its scope; you don't need the whole pipeline for one bullet).

## Stages and roles

Pipeline is 8 stages. Five roles are reused from `kk-design-system`; four are new and live in this project package.

| Stage | Role | Source | What it does |
|---|---|---|---|
| 1 | `kk-role-analyst` | reused | Decompose the brief (calls digest + KK comments + current draft) into users, job stories, candidate directions, open questions. |
| 2 | `kk-role-charter-director` | NEW | Pick the direction list and shape per direction. Write the *direction map* doc — names, types, primary spokes, sub-tracks, framing. |
| 3a | `kk-role-fresh-eyes-jobstory` (pre-charter mode) | reused | Per-direction naive questions. "If I land cold on this charter, what would I need to understand?" |
| 3b | `kk-role-charter-writer` × N | NEW | N parallel instances, one per direction. Each writes mission + sub-tracks + initiatives + time-bound + open questions + references. Triple-pass (draft → critique → rewrite). |
| 3c | `kk-role-fresh-eyes-jobstory` (post-charter mode) | reused | Validate every pre-question is answered. Unanswered questions return work to 3b. |
| 4 | `kk-role-portfolio-manager` | NEW | Cross-direction view. Time-bound consolidation. Dependency graph. Resource conflicts. Sequencing recommendations. |
| 5 | (mechanical) | — | Synthesis of N per-direction charters into a single consolidated `CHARTERS_DRAFT.md`. No role; pure assembly. |
| 6a | `kk-role-consistency-charter` | NEW | Cross-direction naming, glossary alignment, contradictions, evidence-pointer integrity. Dieter Rams strict pass. |
| 6b | `kk-role-voice-reviewer` | reused | Orwell pass: AI tells, soft hedges, bold overreach, filler openers, sentence-case rules. |
| 7 | `kk-role-meta-reviewer` | reused | Rubric gate. Every item answered with evidence; failures return work to the stage that owns them. |

Stage 3 fans out (one writer per direction) and fans back in. Stages 6a and 6b run in parallel. Stage 7 is the final gate.

## Inputs (project-level)

- `inputs/calls-digest.md` (or path) — the canonical past-month call summary
- `inputs/comments-pass-*.json` — every KK comment pass in chronological order
- `inputs/CHARTERS_DRAFT.md` — the current consolidated state (if rebuilding)
- `inputs/glossary.md` — current canonical names
- `inputs/PROJECT_OS.md` — origin doc; Phase 0 context
- Any agent outputs from prior runs (deep-reads, voice patches) the analyst should consider

## Outputs (project-level)

- `outputs/charter-<slug>.md` (one per direction)
- `outputs/CHARTERS_DRAFT.md` (consolidated)
- `outputs/glossary.md` (updated if entities changed)
- `outputs/portfolio.md` (Stage 4 deliverable — cross-direction view)
- `outputs/CHANGES.md` (delta vs. inputs)
- `outputs/gates.md` (rubric pass/fail for each gate, with evidence)

## Forbidden

- Inventing initiatives or directions not grounded in the calls digest, KK comments, or KK's stamped direction list.
- Writing out-of-scope sections (KK directive: signal-only).
- Disclosing client identities in published charters (names live in `wealthy`, not the public draft).
- Bolding whole sentences. Bold marks the term, not the thought.
- Italic for editorial gloss. KK called this out — drop italics on meta-prose.
- AI-tells: "comprehensive," "leverage," "unlock," "navigate the complexities," "delve into," "elevate," "harness," "transformative," "robust," "seamless," "empower."
- Filler openers: "X is a Y that does Z." Just say what it does.
- "Coaching." Use **supervision**.
- Spelling "Xplee" — it's **Explee**.

## Inheritance from kk-design-system

This pipeline borrows the *shape* (8 stages, gated by meta-reviewer, character-coded roles, return-to-owning-stage on failure) from `kk-design-system`. The reused roles bring their character with them — Margaret Hamilton at the analyst, Steve Jobs cold-read for fresh-eyes, George Orwell for voice, Erika Hall for the rubric gate at meta-reviewer.

The four new roles in this pipeline are character-coded to the kit's tier convention — women for the Opus + Sonnet smart roles, men for the Haiku cold-read consistency role. Tina Brown directs the map at Stage 2 (Opus). Janet Malcolm writes each charter at Stage 3b (Sonnet, fan-out). Indra Nooyi runs the cross-direction portfolio at Stage 4 (Sonnet). Jan Tschichold audits consistency at Stage 6a (Haiku). See each role's `SKILL.md` for the full character note and the bar each enforces.
