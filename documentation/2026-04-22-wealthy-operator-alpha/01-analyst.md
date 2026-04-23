---
session: 2026-04-22-wealthy-operator-alpha
stage: 1
role: analyst
input: documentation/2026-04-22-wealthy-alpha/00-brief.md + /Users/kostyantinopolskii/Downloads/wealthy-pipeline-handoff.md + user scope-lock in conversation
output: decomposition of operator surface, priority scenarios, locked decisions, brief amendments, entry-point declaration
gate: passed — stage 2 unblocked, handed to kk-role-art-director
style: caveman full
---

# Analyst — Wealthy operator alpha

Stage 1. Decompose brief. No pixels, no components, no solutions.

## Raw input

User this turn, verbatim:

> Hey, check the project and files you have. How would we work, if we will need to try once again to create the right prototype for the task we've done first? Let's specifically focus on the admin page and starting the research

Scope lock, verbatim:

> Let's try bro. Sounds amazing. -alpha still and name the scope. for the concept and so on I want to see whole flow ideation high fidelity starts from one page prototype first

Gate stamps + brief amendments, verbatim:

> b, okay. remove role, yes. diverge permited. decide during research of the possible directions on the 2stage. 5. yes. 6. yes. note that research prompt is a part of the document side, it's not shown in the inspector. And user comments every part on every step with regular comment flow and sends back to agent. I told it. let's do the canon propagation as separate sub agent and run art-director here after getting my feedback

Source files:
- `documentation/2026-04-22-wealthy-alpha/00-brief.md` — original user brief.
- `/Users/kostyantinopolskii/Downloads/wealthy-pipeline-handoff.md` — canonical product spec.
- `/Users/kostyantinopolskii/Downloads/KK-Design-System-f7be3b55-dba0.json` — Fireflies call transcript. Background. Filename misleading.

## Users

**Operator** (in scope). Konstantin or future team member. Runs audit for new mentee. Holds pen across seven pipeline states. Motivation: ship signed deliverable fast, preserve provenance.

**Mentee / client** (out of scope). Delivery audience. Held for later slice. Named — body-shape decisions hit both surfaces.

## Job stories

**Operator.** When new mentee taken on and audit needed, want walk brief → prompt → research → draft → review → signoff in one document-shaped surface, so ship signed deliverable with every cycle, source hit, rejected reply preserved as provenance.

Mentee story deferred.

## Priority scenarios

Five, ranked. Numbered order matters — multi-step walk.

1. **Happy seven-stage walk.** brief → prompt → research → draft → review → signoff → delivered.
2. **Comment-steered revision at any stage.** Operator selects text in doc body, opens thread, agent replies with revision, operator approves or rejects with why. Same loop at every stage — prompt, findings, draft. Training signal per spec §5.2.
3. **Sparse research.** Operator judges evidence thin. Requests more before greenlighting draft.
4. **Reject-with-why required.** UI refuses silent reject.
5. **Patch after signoff.** Typo path, no review reopen. Edit log at doc bottom. Edge.

Out of scope: client surface, multitenancy, billing, role switcher.

## Open questions

Raised six, all resolved at gate. See `## Locked decisions` below.

## Entry point

**Stages 1-10** — new page/flow. Think phase walks seven states end-to-end. Build narrows at stage 8 to locked slice.

## Brief amendments from gate

User corrected two load-bearing shape assumptions. Both override the `wealthy-pipeline-handoff.md` read I had earlier.

1. **Research prompt renders in doc body, not inspector.** Middle column carries prompt draft. Inspector holds stage indicator + action button only. Generalizes: every content the operator reviews lives in doc body.
2. **Comment loop is steering primitive across every stage, not just review.** Pattern: operator selects text in doc → highlight → draft card → thread → agent reply with revision → operator approve or reject-with-why. Runs on prompt draft, findings, strategy draft. Review state is one slice of this primitive, not a special mechanic.

Implication: stage-8 slice = review state is effectively building THE steering pattern. Whatever ships there propagates to every other stage. Art-director's directions must frame the whole flow around this pattern.

## Locked decisions

1. **Stage-8 high-fidelity slice** → **(b) review state**.
2. **Role switcher** → **removed**. Operator-only markup, no attribute gating.
3. **Review-state fidelity** → **divergence permitted** at stages 2-7. Supervisor and DS reviewer judge per direction.
4. **Research pricing in brief state** → **deferred to stage 2**. Art-director's directions may take different stances on whether cost surfaces inline or abstracts.
5. **Agent reply tone in review** → **operator's voice** (spec §10 default).
6. **Patch path after signoff** → **allowed with visible edit log**.

## Gate

Passed. All six questions stamped. Stage 2 unblocked.

Canon propagation for caveman communication rule runs in a separate background sub-agent via `kk-ds-maintainer`. Does not block art-director.

## Hand-off

→ `kk-role-art-director`. Reads this file. Produces 5+ directions on full operator flow with one-line intent + guardrails. Each direction frames how review-state slice embodies it. Output → `documentation/2026-04-22-wealthy-operator-alpha/02-art-director.md`.
