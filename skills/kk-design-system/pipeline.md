# The pipeline

Five stages. No skipping. No reordering. Each stage owns one role. The gate between stages is either human approval or a verifiable check.

The point: AI agents draft most of our work, and without gates they produce gray mush and invent components. The pipeline enforces business logic, contrast, and inventory discipline before the human art-directs.

## Stage 1 — Hypothesis defense

**Agent:** Analyst.
**Input:** The raw brief. Often a transcript, a request, a ticket.
**Output:** Decomposed brief — user, job stories (`context + motivation = step → value`), priority scenarios, open questions.
**Gate:** Human approval. No iteration starts until the brief holds up.

The analyst's job is to push back. If the brief has logical holes, name them. Do not proceed to layouts.

## Stage 2 — Option iteration

**Agent:** UX / CX, in parallel.
**Input:** Approved brief from stage 1.
**Output:** 3–5 flow alternatives using only kit components. Structural choices only — what appears where, in what order, under which state.
**Forbidden at this stage:** new components, custom colors, off-grid values, typography choices, visual polish.

Mock data is fine. Pictures of the flow, not designs.

## Stage 3 — Contrast boost

**Agent:** UI.
**Input:** The selected flow from stage 2.
**Output:** Same flow with visual hierarchy applied, contrast turned up past the target.
**Rules:**
- Hero runs 3–4× body size.
- Primary CTA dominates the frame.
- Secondary shrinks or hides.
- Every adjacent pair carries one clear distinction step — bold vs regular, big vs small, or black vs muted. Never all three.
- No gray mush.

Easier to dial contrast down from 100 than up from 20. Ship hypertrophied.

## Stage 4 — Gate

Stage 4 has two roles, in sequence. Both run on the stage-3 draft before the human touches it.

### 4a. Frontend rewrite

**Agent:** Frontend. (Use the `kk-ds-frontend` skill if wired up.)
**Input:** The stage-3 draft.
**Output:** The same draft with the code underneath rewritten. Visual frozen — no kit class moves, no wrapper shifts layout, no tokens change. What changes: semantics, accessibility, JS simplicity, mobile handlers, cross-browser fallbacks.

If a rewrite needs a class or wrapper that is not in `components.md`, the rewrite stops and the work returns to stage 2. Invention belongs to the maintainer, never to this stage.

### 4b. Supervisor audit

**Agent:** Supervisor. (Use the `kk-ds-supervisor` skill if wired up.)
**Input:** The rewritten draft from stage 4a.
**Checks, in order:**
1. **Logic** — does the layout still serve the job story from stage 1? If the job story has been lost, the layout fails.
2. **80 / 20** — is one primary signal holding 80% of the weight, at every nesting (screen, panel, card, row)? Count empty space toward the 80%.
3. **Inventory** — did a junior agent invent a new component, token, or class? Check against `components.md` and `tokens.json`. If yes, reject.

Failures are not patched. They return to the stage that owns them. Inventory drift introduced during 4a returns to 4a; logic or 80/20 failures return to stage 2 or 3. The pipeline only flows forward when every gate passes.

## Stage 5 — Magic injection

**Agent:** Human.
**Input:** A verified layout — logic holds, signal is loud, inventory is honest.
**Output:** Emotional accents. A specific illustration, a rewarding hover, a better label, a signature line.

Magic lands on a verified frame. It never replaces one.

## Failure mode to watch for

Agents like to patch. When the supervisor flags a failure, the tempting response is to tweak the broken version — nudge a size, mute a color, add a heading. That is how drift enters the system. Return the work to stage 2 or 3 and rebuild from kit parts.
