---
session: 2026-04-25-wealthy-pipeline
stage: 1
role: analyst
input: documentation/2026-04-22-wealthy-alpha/00-brief.md + /Users/kostyantinopolskii/Downloads/wealthy-pipeline-handoff.md
output: decomposed brief — 2 users, 2 job stories, 6 priority scenarios, 13 open questions, default full-walk entry
gate: passed — autonomous-mode stamps applied per canon (user authorised full-pipeline auto-run)
---

Decomposed the original Wealthy brief plus the canonical handoff into users, job stories, priority scenarios, and the open questions that block stage 2.

## Raw input

User stamps from this turn (verbatim):

> Exactly. But we already have not kit 13.0 and we have the new stuff. We need to realign. Can you re-run the pipeline in the new folder as the new project (not alpha), let's the new name.

> 1. Yes. 2. Let's have standard approach described in pipeline. What we have here is just a really huge input as a task. 3. Default.

Original brief (verbatim digest, source: `documentation/2026-04-22-wealthy-alpha/00-brief.md`):

> Analyse those document and apply the design thinking with 5 stages model to build a beautiful working propotype for two jobs: strategist that picks one of his recent mentee and crafts a strategy for them through the pipeline, going through the process of decision making and consumer which gets the results of the strategist's work and comments the places, make a payment (through the boostie payment we have - but just following links in the inspector) and also possibly downloading transcripts in the free version, also leaving the review in the simplest way, so I can get the results of my work and permissions to share the review. Check the call, wealthy hadnoff and the actual structure of the project architecture where we will implement it.

Referenced files:

- `/Users/kostyantinopolskii/Downloads/wealthy-pipeline-handoff.md` — present (14049 bytes, 2026-04-22). Canonical product spec. Two surfaces (operator + client) on one document, seven pipeline stages (brief → prompt → research → draft → review → signoff → delivered), comments as first-class data, signoff with stats, three subscription tiers + free path, voice rules from `voice.md`. Six open questions in §10. Written against kit v0.4.0 — superseded by v1.5.0.
- `/Users/kostyantinopolskii/Downloads/KK-Design-System-f7be3b55-dba0.json` — present. Fireflies call transcript between Konstantin and Денис Бородин. Filename misleads (not a Figma export). Voice/tone reference, not a spec.

Realignment note (from spawn input): kit currently at v1.5.0 (commit `cb3733b`). Pipeline-v3 active. Prior alpha run at `documentation/2026-04-22-wealthy-operator-alpha/` is historical only — its inventory, concept pick, and scope decisions do not propagate.

## Users

Two humans, two surfaces, one document. Both render in the kit's three-column shell. Doc body is identical across views; right inspector swaps per role; no conditional UI inside a shared card.

### Operator

Konstantin Konstantinopolskii (today) or any future team member running audits. Holds the pen across all seven pipeline stages. Signs the deliverable. Currently the only operator — multitenancy is on the roadmap but out of scope for this run. Knows the brief, the client, the kit, and the pipeline by heart.

### Client

The mentee being audited. Paying or trial. Lands at the delivered URL after signoff. Reads the strategy. May comment on parts that need clarification. May upgrade to a recurring tier. May download a transcript in the free path. May leave a shareable review.

## Job stories

### Operator

When new client is hired and audit needed, want to walk brief → prompt → research → draft → review → signoff → delivered in one document-shaped surface, so as to ship a signed deliverable with every research source, comment, and revision preserved as provenance.

### Client

When the signed strategy lands, want to read it, ask follow-up questions on specific parts, optionally subscribe for ongoing support, and leave a review I can share, so as to apply the strategy without losing thread to the operator and without manual back-and-forth.

## Priority scenarios

Six scenarios. First three are the spine; rest are edges that matter. Out-of-scope items called out.

### 1. Operator happy walk (highest priority)

`brief → prompt → research → draft → review → signoff → delivered`. Single research run. Low thread density. Confident pass through every stage. Card in inspector advances state by state. Doc body grows section by section.

### 2. Operator review with comments

Operator reads the draft body, opens 5–10 threads on parts that need work (selection → highlight → draft card in inspector). Clicks "Redo with my notes". Agent walks every open thread, posts a proposed replacement inside each. Operator approves (replacement inlined, thread resolves) or rejects with a why (agent re-runs that thread under the new constraint). Loop until no open threads. Reject without a written why is refused at the UI.

### 3. Client read + comment + subscription glance

Client lands at delivered URL. Reads strategy. Opens a thread on a section that needs clarification (same comment mechanic, `author_role = client`). Looks at next-steps card and subscription tiers. Clicks Boostie link if upgrading. Exits.

### 4. Operator inbox after delivery

Operator returns to a delivered document. Sees client comments queued in a separate inbox card. Replies; client sees the reply. No reopening of the review loop.

### 5. Reject-with-why required (rule, not state)

Both operator and client. UI refuses thread reject without a non-empty written reason. Empty submit shows error. Reason text is preserved on the resolved-rejected thread.

### 6. Patch after signoff (edge)

Typo path. Operator unlocks one subsection at a time, edits, saves, appends an edit-log row at the bottom of the doc. Does not reopen the review loop. Bounded scope (handoff §10 gestures here; final bounds at gate).

### Out of scope this session

- Operator multitenancy (other operators signing).
- Real billing implementation behind Boostie links — links are placeholders pointing at the existing Boostie page.
- Free-path content authoring (the self-serve guide's actual prose).
- Backend persistence wiring (data model documented in handoff §5; build is mock-data-only at stage 5).

## Open questions

Thirteen. Six are reframings of `wealthy-pipeline-handoff.md § 10` against today's kit + brief; the rest are gaps the original handoff did not name. Every question goes to the human at the gate. No silent defaults.

### Q1 — vertical slice for stage 5

Pipeline rule (`pipeline.md § Vertical slice rule`): high-fidelity build covers one page or one flow per pass. The brief covers two surfaces (operator + client) and seven stages on the operator side. Which slice ships at stage 5? Options:

- **(a)** Operator review state only (alpha precedent).
- **(b)** Operator full walk — every state of the workflow card across all seven stages, one screen at high fidelity per state.
- **(c)** Client delivered view only (read + comment + tiers).
- **(d)** One vertical per surface — operator review + client delivered, two states.
- **(e)** Operator brief → review (everything before signoff), then client delivered as a follow-up session.
- **(f)** Other — name it.

This is the load-bearing call. Stage 2 direction blocks depend on it.

### Q2 — tier names + pricing visibility

Handoff §7 names Premium / Basic / Group / free path as placeholders. For this run:

- **Q2a:** Use placeholder labels (Premium / Basic / Group), or final labels?
- **Q2b:** Show prices as "$ tbd" or as concrete numbers in the client tier cards?

### Q3 — research pricing visibility on the operator brief card

Handoff §10 leaves this open. Deep research at $20, light at cents. Visible to operator in the brief card (cost shown next to depth toggle), or abstracted away (depth labelled by name only)? Stamp.

### Q4 — Boostie integration depth

Brief says "just following links in the inspector". Is this:

- **(a)** Plain `<a href>` to the Boostie page, no return state in the prototype, or
- **(b)** Link out + return path (success / cancel state on return), or
- **(c)** Other.

### Q5 — transcript shape and gating

Brief mentions "downloading transcripts in the free version". Two readings:

- **Q5a — what is the transcript?** The audit's call transcript (Konstantin + client conversation), the research source transcripts, the operator's narration, or something else?
- **Q5b — what tier gates it?** Free path only, all tiers, paid only?

### Q6 — review form shape

Brief: "leaving the review in the simplest way, so I can get the results of my work and permissions to share the review." Two reads:

- **(a)** Separate review form — rating + free text + permission-to-share toggle, rendered as a card on the client surface after delivery.
- **(b)** Comment mechanic + a single permission-to-share toggle on the doc — no separate form.
- **(c)** Other.

The toggle's scope (share with whom, where) needs clarifying as part of the answer.

### Q7 — agent reply tone (handoff §10 default)

Handoff defaults to "operator's voice" so replacements drop into the doc without a tonal seam. Stamp the default or change?

- **(a)** Operator's voice (default).
- **(b)** Agent's own voice.
- **(c)** Neutral / no voice marker.

### Q8 — patch path post-signoff (handoff §10 default)

Handoff prefers yes-with-edit-log. Stamp:

- **(a)** Yes — patch one subsection at a time, edit log at doc bottom (default).
- **(b)** No — signed is signed; reissue under a new revision instead.
- **(c)** Other.

### Q9 — free-path content shape

Handoff §7 calls free path "self-serve guide on how to apply the strategy without us." For the prototype:

- **(a)** Mock as a single static section in the client view.
- **(b)** Mock as a downloadable artefact (link).
- **(c)** Defer entirely from this slice — placeholder text only.
- **(d)** Other.

### Q10 — free vs paid boundary on client view

Brief mentions "free version" with transcript download. Handoff has paid tiers + free path (opt-out). Reconcile:

- Is there a freemium boundary on the client surface where some content gates behind payment, or
- Is "free version" the same thing as the handoff's free path (no gating, just a self-serve guide), or
- Other?

### Q11 — comment-as-training-signal UI surface

Handoff §5.2: "feed the aggregate back into agent prompts so the next draft is less wrong." Is this surfaced in the UI (e.g., "this draft drew on 47 prior reviews"), or backend-only? Default is backend-only unless stamped otherwise.

### Q12 — multitenancy reconfirm

Handoff §10 says plan-not-build. Confirm: stage-5 build mocks Konstantin only. Signature glyph = `signature.svg` from kit. No operator switcher. No author handle generalisation. Stamp default or change?

### Q13 — kit head + exceptions register

Build against kit v1.5.0 head (commit `cb3733b`). Direction doc's §Exceptions register starts empty — every component on the slice must resolve to canon `components.md` / `patterns.md` / `tokens.json`. Anything the kit lacks halts to user gate before stage 5. Stamp default or change?

## Entry point

Default full walk per `pipeline.md § Entry point matching`. Stages 1 → 2 → 3a/b/c × N → 4 → 5 → 6a + 6b + 6c → 7. New flow on a product surface. Recipe stamped by user upstream. Recorded in `README.md`.

## Gate

Passed — autonomous-mode stamps applied per canon (see `## Locked decisions` below). User authorised full-pipeline auto-run; analyst gates closed. Stage 2 (`kk-role-design-director`) fires next.

## Hand-off

→ Stage 2, `kk-role-design-director`. Input: this file + the gate stamps appended below under `## Locked decisions`.

## Locked decisions

User authorised autonomous run of stages 2 → 7 with all decisions made per `manifesto.md` principles, `voice.md`, `pipeline.md § Vertical slice rule`, and `wealthy-pipeline-handoff.md` defaults. Analyst stamps each Q below with its canon-anchored answer.

### Q1 — vertical slice for stage 5 → **(a) operator review state only**

**Stamp:** the high-fidelity stage-5 build covers ONE flow — the operator's review state. Single screen, every relevant interaction state (rest, hover, focus, active, disabled, loading, empty, error) for the components on it.

**Reasoning:** `pipeline.md § Vertical slice rule` is strict — "one page or one flow per pass. A session that tries to cover the whole product in one run is bloated and untestable. Halt it and split." Operator review is the densest single moment in the brief — exercises selection→highlight→thread→approve/reject as the kit's hardest interaction pattern, and the comment loop is the product's load-bearing mechanic per handoff §5. Client surface ships in a follow-up session. Out-of-slice questions (Q2, Q4, Q5, Q6, Q9, Q10) defer to that follow-up.

### Q2 — tier names + pricing visibility → **deferred**

Out of slice (client surface). Re-asked at the start of the client-view session.

### Q3 — research pricing on operator brief card → **deferred**

Out of slice (review state runs after brief commit). Re-asked when brief state ships.

### Q4 — Boostie integration depth → **deferred**

Out of slice (client surface).

### Q5 — transcript shape and gating → **deferred**

Out of slice (client surface).

### Q6 — review form shape → **deferred**

Out of slice (client surface).

### Q7 — agent reply tone → **(a) operator's voice**

**Stamp:** agent-proposed replacements inside threads render in the operator's voice.

**Reasoning:** handoff §10 default. `voice.md § Shape` requires consistent register across the doc; a tonal seam between operator-written prose and agent-written replacement breaks that. Operator-voice replacement drops into the body cleanly when approved.

### Q8 — patch path post-signoff → **deferred**

Out of slice (post-signoff). Default carried in handoff (§10 prefers yes-with-edit-log) is not ruled on this session.

### Q9 — free-path content shape → **deferred**

Out of slice (client surface).

### Q10 — free vs paid boundary on client view → **deferred**

Out of slice (client surface).

### Q11 — comment-as-training-signal UI surface → **backend-only**

**Stamp:** no UI marker on the operator surface for "this draft drew on N prior reviews".

**Reasoning:** `manifesto.md § Pure signal` — "effort spent decoding the interface is proportional to how bad it is." A counter line that does not change the operator's next action is noise, not signal. Backend persists per handoff §5.2 regardless.

### Q12 — multitenancy → **default — Konstantin only, signature.svg from kit, no operator switcher**

**Stamp:** stage-5 build mocks Konstantin as the sole operator. Signature glyph = `signature.svg` from the kit. No operator switcher. Author handle = "Konstantin Konstantinopolskii".

**Reasoning:** handoff §10 says plan-not-build. `manifesto.md § Job stories` — "one priority job per screen". Multitenancy is a secondary scenario, isolated per the manifesto rule.

### Q13 — kit head + exceptions register → **default — kit v1.5.0 head, exceptions register empty**

**Stamp:** build against kit v1.5.0 head (commit `cb3733b`). Direction doc's §Exceptions register starts empty. Anything the kit lacks halts to user gate before stage 5 — no silent invention.

**Reasoning:** `pipeline.md § Reiterate protocol` requires exceptions to carry user-stamped paper trail. Starting empty enforces the discipline; the design director may populate at stage 2 if the slice forces an exception, with a one-line reason.

### Autonomous-mode policy (carried forward to stages 2–7)

The user's authorisation: "DO ALL DECISIONS ACCORDING TO OUR PRINCIPLES. FOLLOW THE SOUL AND LOGIC AND PATTERNS AND COMPONENTS." Each downstream stage operates the same way:

- Gate-style decisions made by the role per canon, with reasoning recorded in that stage's `## Locked decisions` block.
- Any decision the role cannot make from canon halts to user gate (no silent guess) — but only if the decision genuinely cannot be canon-anchored.
- Stage 2's gate 2a (human picks one direction) is replaced by the design director self-picking per canon and recording reasoning. Same for 2b (pattern blocks + exceptions).
- Stage 7 meta-reviewer remains the last canonical check; FAIL routes to user, not silent reiterate.
