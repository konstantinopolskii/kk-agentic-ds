---
session: 2026-04-22-wealthy-alpha
stage: retro
role: human + analyst
input: 00..09
output: proposed pipeline-v2, roles, kit-extraction, meta-retro, documentation contract
gate: user green-lit documentation + pipeline-v2 build next
---

# Stage 10 — Retro

Structure: raw user messages verbatim, agent analysis inline, agreed conclusions at the end.

## Round 1 — opening retro

### Raw user message

> Why the nav on the left doesn't work as expected? It seems that the product design pipeline doesn't really work here. I believe we shpuld revise the way we work on the design. Save this result, save the document you have. But let's have the retro session where we discuss the problems and see the possible solutions to them.

### Agent analysis — what actually broke

1. **Left nav** — scroll-spy indicator + smooth scroll live in the kit's inline `<script>` at `index.html:3400+` (~700 lines). Not ported.
2. **Deck hover** — same kit JS, already patched after bug 1.
3. **Likely also broken** — inspector card auto-scroll on promotion; narrow-view FAB toggles; comment menu popovers; any active-state observer mapping thread cards to highlight spans.

### Agent analysis — where the pipeline failed

- **Stage 2 was theater.** Manifesto says "3-5 flow alternatives". Session produced one option and called it iteration.
- **Stage 1 missed the JS dependency entirely.** Treated the kit as CSS + classes. Ignored the behavioral JS inline in `index.html`.
- **Stage 3 was a single 1700-line commit.** No vertical slice, no checkpoint for user.
- **Supervisor fired late.** Inventory drift caught after 800+ lines of HTML. A class-prefix check at the top of stage 3 would have caught it in seconds.
- **No browser in loop.** Agent worked without running the UI. Assumptions about JS behavior replaced verification.

### Agent proposed changes

A. Extract the kit JS into `kit.js` shared by the manifesto and every prototype.
B. Vertical slices — ship one page or one flow at a time.
C. Inventory check before code, not after.
D. Actual 3-5 alternatives at stage 2.
E. Human in loop — URL + three specific things to click, every slice.

## Round 2 — user's redesign of the pipeline

### Raw user message

> A. Yes. B. Yes for prototypes. But actually I would propose to deploy several agents for the design implementation for the aligned direction. C. Yes. And also add another step before the implementation: the design handoff, where the designers list the components that are needed to actually build their proposed solutions. D. Exactly. But I propose another agent - art-director that has the system knowledge and carries the principles, actually, give at least 5 possible directions for the design agents on the stage 2 to explore. As a result those agents on the phase B should bring the conceptions on the way it all should work, showing the asci images for each steps and following the solution phase for the shape up. After user gives the another loop of feedback, the concept becomes chosen and we go to hand-off. On the hand-off three designers with the same level of experience and creativity are prompted to create the UI with the existing component. One is conservative, second is UX driven, third is revolutionary. Depending on creativity level they can broke the rules. Conservative follows rules stictly. UX-driven can propose new way to organise components but don't break the layout. Revolutionary don't give a fuck and just uses what he has and picks up the most steve jobs way. Results are the exact list of components and behaviours and flows plus the asci way to show it again, plus the why's behind those ideas. The agent that reviews everything with the design system is deployed here. After that he gives a conclusion to the user and user decide.  After that we go further to implementation with the chosen hand-off. Then the frontend engineer just creates the prototype. It doesn't really think about the copy, just leaves the absctract commentaries in all the needed buttons texts labels and so on. With the abstract function and possible length. Then ext agent is the copywriter. The UX copywriter cretes the namings for each part of the prototype and ensures consistency. After that we deploy frontend-reviewer, UX copy reviewer, and general consistency reviewer. Each agent should be also improved, so they actually check our DS document sections that are related for their role. Me as the browser is great. Extracting ui-kit js is the right thing. Think how to orchestrate agents for the meta-improvement of our system. Also one of the huge failures: on the design phase it's okay to think of the whole pipeline. But high fidelity propotype could cover jsut one direction or fraction, otherwise it's bloated. I would prefer to go through page - flow - page for another segment - flow way, sort of. I propose to keep the old prototype too, just rename it as -alpha and let's focus now on the retro-meta part of the improvements. And then test our flow again, just reffering the prototype as the example.

### Agent analysis — pipeline recap in structured form

Ten stages, three phases, nine agent roles.

**Phase 1 — Think**

1. Analyst (existing) — decomposes the brief, lists open questions, gates on user approval.
2. Art-director — carries DS principles, produces 5+ directions at stage 2.
3. Design agents — one concept per direction, ASCII mockups per step, shape-up solution-phase format. Parallel.
4. User picks direction.

**Phase 2 — Hand-off**

5. Three designers in parallel on the chosen direction:
   - Conservative — strict rule adherence, kit inventory only.
   - UX-driven — may reorganize components, preserves layout.
   - Revolutionary — Steve Jobs mode; may break rules.
   Each outputs: component list, behaviors, flows, ASCII, reasoning.
6. DS reviewer — compares three hand-offs, gives a conclusion.
7. User picks hand-off.

**Phase 3 — Build**

8. Frontend engineer — ships prototype structure with placeholder copy comments (`<!-- button: primary action, ~12 chars -->`).
9. UX copywriter — fills copy, enforces consistency.
10. Three reviewers in parallel — frontend reviewer, UX copy reviewer, general consistency reviewer. Each loads only its scoped DS canon sections.

**Meta** — on-demand retro agent reads session outputs and proposes rule updates.

### Agent pushback on the proposal

1. **Revolutionary's rule-breaking needs a protocol.** Revolutionary output is a diff — user rejects (falls back to UX-driven variant) or accepts, which fires `kk-ds-maintainer` and updates the kit. Without this, the revolutionary and the supervisor deadlock.
2. **ASCII is cheap for flows, unreadable for dense layouts.** Use a micro-format: ASCII for flows + layouts, JSON tree for component structure. `Card[heading, spec-list, button-primary]` style.
3. **Nine agents isn't free.** Entry point should match scope. Tiny change → direct to frontend engineer. New page → full ten-stage walk.
4. **Meta-retro trigger.** On-demand, not periodic. User calls it when something feels off (like this session).

## Round 3 — user confirmation

### Raw user message

> 1. Yes, good addition. 2. Maybe, that's okay. ASCII for the layots and designs, trees for actual content for blocks. 3. Yes. 4. On demand, as now. 5. I also propose analyst and all other agents to store what they've created in the documentation folder, together with the materials and inputs from the user. So we can redo the work of the retro, without the need of the reprompting context. Thoughts? Cand we do it also with a separate documentation agent right now? It will check the context we had so far.

### Agent analysis — documentation contract

Proposed shape: `documentation/<date>-<slug>/` with a README index plus one file per stage carrying frontmatter (`session`, `stage`, `role`, `input`, `output`, `gate`). Each file preserves raw user input verbatim and agent output. Pointers to artifacts, not copies.

### Agent analysis — on the "separate documentation agent right now"

Two reads:
- A fresh documenter subagent has no context. Passing the conversation to it is expensive duplication.
- I write from context directly. Faster, same output.

Future pipeline agents self-document as the final step of their stage. That becomes part of each role's contract.

## Round 4 — documentation green-light

### Raw user message

> 1. Yes. Raw input is good. We can put it in every artefact that was created, no? And have the index in readme going. 2. Yes. Pointers are great. 3. Write the documentation, okay. And add the retro conclusions there too.

### Agent action

Wrote ten files into `documentation/2026-04-22-wealthy-alpha/` (this retro is file 10). Raw user input preserved verbatim in every artifact. README indexes all files.

# Conclusions — decisions locked for pipeline-v2

These supersede the current `pipeline.md` and `components.md` inventory rules where they disagree.

## Pipeline-v2 structure

Three phases, ten stages, nine agent roles. Enter at the stage that matches scope (tiny change skips ahead).

| Stage | Role | Input | Output | Gate |
|---|---|---|---|---|
| 1 | Analyst | User brief + materials | Decomposed brief, priority scenarios, open questions | User approval |
| 2 | Art-director | Approved brief | 5+ directions with intent and guardrails | User picks direction |
| 3 | Design agents (parallel) | Chosen direction | Concepts: ASCII flows + JSON component trees + shape-up solution phase | User picks concept |
| 4 | Conservative designer | Chosen concept | Hand-off: component list, behaviors, flows, ASCII, reasoning. Strict kit inventory. | Supervisor review |
| 5 | UX-driven designer (parallel with 4) | Chosen concept | Hand-off: may reorganize components, preserves layout. | Supervisor review |
| 6 | Revolutionary designer (parallel with 4) | Chosen concept | Hand-off: may break rules. Output includes a diff to the DS manifesto. | Supervisor review; diff routed to maintainer |
| 7 | DS reviewer | All three hand-offs | Comparative conclusion | User picks hand-off |
| 8 | Frontend engineer | Chosen hand-off | Prototype structure. Placeholder copy comments, no real strings. | Frontend reviewer |
| 9 | UX copywriter | Prototype + hand-off | Final copy in the prototype. Consistency enforced. | UX copy reviewer |
| 10 | Consistency reviewer | Prototype + copy | Cross-check against DS canon sections | Ship |

Plus on-demand meta-retro agent reading documentation artifacts and proposing rule updates.

## Agent role contracts

Each role's skill should document:

- **Canon load** — which files in `.claude/skills/kk-design-system/` to read (scoped to role).
- **Input contract** — what the previous stage's output must contain.
- **Output contract** — file name, frontmatter fields, required sections.
- **Failure mode** — which stage to return to on failure.
- **Self-documentation** — writes its own `NN-<role>.md` into the session's documentation folder before handing off.

Nine role files to write:
`roles/analyst.md`, `roles/art-director.md`, `roles/designer-conservative.md`, `roles/designer-ux.md`, `roles/designer-revolutionary.md`, `roles/ds-reviewer.md`, `roles/frontend-engineer.md`, `roles/ux-copywriter.md`, `roles/reviewer-consistency.md`. Plus `roles/meta-retro.md`.

## Artifact formats

- **ASCII mockups** — for flows and page-level layouts. Comparable across designers.
- **JSON component trees** — for block-level structure. `Card[heading, spec-list, button-primary]`. Comparable across hand-offs.
- **Shape-up format** — for concept documents. Fat marker problem framing, rabbit holes, no-gos, appetite.

## Revolutionary protocol

Revolutionary designer's output includes a `manifest-diff.md` describing what rule they broke and why. User paths:
- Reject → fall back to UX-driven variant.
- Accept → fires `kk-ds-maintainer` which updates the relevant canon file, then the chosen hand-off proceeds.

## Vertical slice rule

High-fidelity prototype covers ONE page or ONE flow per pass. Pattern: `page → flow → next page → flow`. No whole-product builds in a single session.

## Kit JS extraction

One-time `kk-ds-maintainer` task: extract the inline `<script>` block from `../index.html` (lines ~3400-4270, ~700 lines) into `kit.js`. Include it from the manifesto page and from every prototype. Un-breaks scroll-spy, deck controller, card stack, comment menu, FABs, and the selection-to-highlight flow for every future consumer.

## Documentation contract

Every pipeline agent, as the final step of its stage, writes `documentation/<session>/NN-<role>.md` with:

- Frontmatter: `session`, `stage`, `role`, `input`, `output`, `gate`.
- Raw user input verbatim, preserved in full where the stage had one.
- Agent output summary.
- Gate result.

`README.md` is maintained by the analyst (stage 1) and appended by each subsequent stage.

## Meta-retro agent

Triggered on-demand by the user. Reads all session documentation in `documentation/`. Proposes updates to `manifesto.md`, `components.md`, `voice.md`, `pipeline.md`, `tokens.json`. Never edits unilaterally — always proposes via a `proposals/<date>-retro.md` for user review.

## Next session's entry point

Start with `pipeline-v2.md` (written from these conclusions). Then role specs. Then kit JS extraction. Then validate the new pipeline by building one vertical slice (operator brief card + its flow, stopping there) with `prototype-alpha` as reference for voice and content.

## Open questions for next session

1. Does the frontend engineer's placeholder-copy convention warrant its own file (`copy-placeholder-spec.md`) or is inline `<!-- comment -->` enough?
2. Should the DS reviewer (stage 7) produce a ranked output or a single recommendation?
3. How does the pipeline handle a hand-off that mixes two archetypes (e.g., UX-driven base + one revolutionary element)?
4. Does the meta-retro agent get write access to the canon, or is it always proposal-only?
