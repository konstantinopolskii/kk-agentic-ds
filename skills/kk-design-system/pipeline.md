# The pipeline

Ten stages. Three phases. Nine role skills plus one meta. Do not skip stages inside a phase. Do not reorder them. Gates are either human approval or a verifiable check.

Entry point matches scope. A new page walks all ten stages. A copy tweak enters at stage 9. Kit refactoring enters at stage 8. Nothing forces the full walk on work that does not need it.

The point: AI agents draft most of our work. Without gates they produce gray mush, invent components, and ship the first plausible draft. The pipeline enforces breadth at the think phase, honesty at the hand-off phase, discipline at the build phase. Each stage writes its own documentation artifact so retros never replay the conversation.

## Phase 1 — Think

### Stage 1 — Analyst

- **Role skill:** `kk-role-analyst`
- **Input:** User brief plus referenced materials (files, transcripts, tickets).
- **Output:** Decomposed brief — users, job stories (`context + motivation = step → value`), priority scenarios, open questions.
- **Canon load:** `manifesto.md` (philosophy, job stories).
- **Gate:** Human approves the brief. No further stages start until the brief holds.
- **Self-doc:** `documentation/<session>/01-analyst.md`

The analyst pushes back. If the brief has holes, they surface here. No pixels yet.

### Stage 2 — Art-director

- **Role skill:** `kk-role-art-director`
- **Input:** Approved brief from stage 1.
- **Output:** Five or more directions, each with a one-line intent and the guardrails that keep it honest (which kit components are expected, which signal dominates, what gets demoted).
- **Canon load:** `manifesto.md`, `tokens.json`, `patterns/*`.
- **Gate:** Human picks one direction. Unused directions archive in the session docs — never deleted.
- **Self-doc:** `documentation/<session>/02-art-director.md`

Breadth at this stage is non-negotiable. One option is a fail.

### Stage 3 — Concept agents (parallel)

- **Role skill:** `kk-role-concept` (spawned 3-5 times in parallel by the art-director)
- **Input:** Chosen direction from stage 2.
- **Output:** One concept each. Each concept carries: ASCII flow mockups (one per step), a JSON component tree for block structure, shape-up solution framing (fat marker problem, rabbit holes, no-gos, appetite).
- **Canon load:** `components.md`, `patterns/*`.
- **Gate:** Human picks one concept. Others archive.
- **Self-doc:** `documentation/<session>/03-concept-<N>.md` per spawned agent.

Concepts stay low-fi. No code, no polished pixels.

## Phase 2 — Hand-off

Three designers run on the chosen concept in parallel. Each produces a hand-off. A DS reviewer compares. Human picks which hand-off becomes the build.

### Stage 4 — Designer: conservative

- **Role skill:** `kk-role-designer-conservative`
- **Input:** Chosen concept from stage 3.
- **Output:** Hand-off — exact component list (kit inventory only), behaviors, flow ASCII, JSON component tree, reasoning for every choice.
- **Canon load:** `components.md`, `tokens.json`, `manifesto.md`.
- **Gate:** DS reviewer at stage 7.
- **Self-doc:** `documentation/<session>/04-conservative.md`

Strict. No invented classes, no off-grid values, no composition that reads unfamiliar.

### Stage 5 — Designer: UX-driven (parallel with 4)

- **Role skill:** `kk-role-designer-ux`
- **Input:** Chosen concept from stage 3.
- **Output:** Hand-off in the same shape as stage 4, but may reorganize components to serve the job better. Layout frame stays kit-standard.
- **Canon load:** `components.md`, `tokens.json`, `manifesto.md`, `patterns/*`.
- **Gate:** DS reviewer at stage 7.
- **Self-doc:** `documentation/<session>/05-ux.md`

Rearranges within the room. Does not rebuild the room.

### Stage 6 — Designer: revolutionary (parallel with 4)

- **Role skill:** `kk-role-designer-revolutionary`
- **Input:** Chosen concept from stage 3.
- **Output:** Hand-off that may break a rule. Every broken rule carries a `manifest-diff.md` entry naming the rule, the proposed change, and the reason. Output also includes the full hand-off shape (component list, behaviors, flow, JSON, reasoning).
- **Canon load:** `manifesto.md`, `tokens.json`, `components.md`, `patterns/*`.
- **Gate:** DS reviewer at stage 7. Diff routed to `kk-ds-maintainer` if accepted.
- **Self-doc:** `documentation/<session>/06-revolutionary.md`

Steve Jobs mode. May break rules only with a diff and a reason.

### Stage 7 — DS reviewer

- **Role skill:** `kk-role-ds-reviewer`
- **Input:** Three hand-offs from stages 4-6.
- **Output:** Comparative write-up. What each hand-off optimizes for. Where they align, where they diverge. A recommendation with the tradeoff made explicit. Revolutionary diff evaluated separately.
- **Canon load:** `manifesto.md`, `components.md`, `voice.md`.
- **Gate:** Human picks one hand-off. If a revolutionary diff is accepted, `kk-ds-maintainer` runs before the build.
- **Self-doc:** `documentation/<session>/07-ds-reviewer.md`

The reviewer does not pick. The reviewer clarifies the tradeoff so the human picks with eyes open.

## Phase 3 — Build

### Stage 8 — Frontend engineer

- **Role skill:** `kk-role-frontend-engineer`
- **Input:** Chosen hand-off from stage 7.
- **Output:** Prototype structure. HTML + CSS + JS using kit classes and the kit's shared `kit.js`. Copy is placeholder comments: `<!-- button: primary action, imperative verb, up to 24 chars -->`. No real strings.
- **Canon load:** `components.md`, `tokens.json`, `patterns/*`.
- **Gate:** Frontend reviewer (existing `kk-ds-frontend`).
- **Self-doc:** `documentation/<session>/08-frontend-engineer.md`

Structure and behavior only. No voice decisions happen here.

### Stage 9 — UX copywriter

- **Role skill:** `kk-role-ux-copywriter`
- **Input:** Prototype from stage 8 plus hand-off context.
- **Output:** Final copy in every placeholder slot. Consistency across buttons, labels, empty states, errors, captions. One voice across the whole prototype.
- **Canon load:** `voice.md`, `manifesto.md` (voice section).
- **Gate:** UX copy reviewer at stage 10.
- **Self-doc:** `documentation/<session>/09-ux-copywriter.md`

Does not touch structure. Words only.

### Stage 10 — Reviewers (three parallel)

Three reviewers run in parallel on the fully-copied prototype. Any failure returns to the stage that owns it.

- **Frontend reviewer** — skill: `kk-ds-frontend` (existing). Checks semantics, a11y, mobile, cross-browser, JS simplicity. Fails return to stage 8.
- **UX copy reviewer** — skill: `kk-role-ux-copy-reviewer`. Checks voice rules, AI-tells, button label discipline, placeholder quality, error message shape. Fails return to stage 9.
- **Consistency reviewer** — skill: `kk-ds-supervisor` (existing). Checks logic, 80/20, inventory. Fails return to stage 4-6 (rebuild the hand-off, not patch the build).

All three must pass before ship.

- **Self-doc:** `documentation/<session>/10-reviewers.md` (three sub-sections or three files).

## Meta — retro

- **Role skill:** `kk-role-meta-retro`
- **Input:** All session documentation in `documentation/<session>/*`.
- **Output:** `proposals/<date>-retro.md` — proposed updates to `manifesto.md`, `pipeline.md`, `components.md`, `voice.md`, `tokens.json`. Never edits canon directly.
- **Trigger:** On-demand only. User calls the retro when something feels off.
- **Gate:** Human accepts or rejects each proposal. Accepted proposals route to `kk-ds-maintainer`.

## Protocols

### Revolutionary protocol

The revolutionary designer may break a manifesto rule only with a `manifest-diff.md` entry in their hand-off. Each entry: rule broken, proposed change, reason. Two user paths at stage 7:

- **Reject the diff.** The revolutionary hand-off falls back to the UX-driven variant; build proceeds without the diff.
- **Accept the diff.** `kk-ds-maintainer` runs between stage 7 and stage 8, updates the canon file and bumps the kit version. Only then does the build proceed.

Revolutionary output that does not carry a diff for every broken rule fails DS review automatically.

### Documentation contract

Every stage, as its final step, writes a documentation file:

```
documentation/<session>/NN-<role>.md
```

Each file carries frontmatter:

```yaml
---
session: <session id>
stage: <stage number>
role: <role name>
input: <prior stage output path>
output: <summary of what this stage produced>
gate: <gate result>
---
```

Body carries: raw user input verbatim where the stage received one, agent output summary, reasoning for non-obvious decisions, gate result. Artifact pointers, not copies — build files live in their repo location, the doc links.

`README.md` is maintained by the analyst at stage 1, appended by each subsequent stage.

### Vertical slice rule

High-fidelity prototype covers one page or one flow per pass. Pattern: `page → flow → next page → flow`. A session that tries to cover the whole product in one run is bloated and untestable — halt it and split.

### Parallel spawning

Stages 3 (concepts), 4-6 (designers), and 10 (reviewers) run as parallel subagents. The orchestrating role spawns them via the Agent tool, collects outputs, and hands the combined result to the next stage. Wall-clock cost is one stage, not N.

### Entry point matching

Pipeline entry points, from lightest to heaviest:

- **Typo or copy tweak** — stage 9 only (UX copywriter) plus stage 10 copy review.
- **Kit refactor (like kit.js extraction)** — stage 1 (analyst decomposes) + stage 8 (frontend engineer implements) + stage 10 frontend and consistency reviewers. Designers skipped; revolutionary protocol used only if the refactor changes canon.
- **New component in an existing page** — stages 4-10.
- **New page or flow** — stages 1-10 (full walk).
- **Retro** — meta only.

Entry point is declared at session start and recorded in `documentation/<session>/README.md`.

## Failure mode to watch for

Agents like to patch. When a stage fails review, the tempting fix is to tweak the broken output. That is how drift enters. Failures return to the stage that owns them. Rebuild from kit parts, not from the broken draft.
