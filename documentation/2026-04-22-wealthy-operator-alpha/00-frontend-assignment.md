---
session: 2026-04-22-wealthy-operator-alpha
audience: frontend engineer (stage 8)
contents: full record of stages 1-7 — every agent draft + every verbatim user gate stamp
excludes: stage 8 (frontend engineering), stage 9 (UX copy), stage 10 (reviews)
purpose: single source of truth for the FE iteration. Read end-to-end before touching code.
---

# Frontend assignment — Wealthy operator alpha

This document embeds the full think-phase record (stages 1-7) for the Wealthy operator review-state slice. Every agent draft is included verbatim. Every user feedback / gate stamp is preserved verbatim and called out in **User feedback** blocks. Nothing after stage 7 is included by design — your iteration starts on a clean slate.

How to read this:

1. **§A Session frame** — what this is, what's in scope.
2. **§B Stage 1-7 record** — chronological, each stage in full. User feedback is inline at the gate that produced it.
3. **§C Final assignment** — the locked spec the FE engineer builds against (synthesis of §B for working reference).

If §B and §C ever disagree, §B wins — §C is a navigational summary.

---

# §A Session frame

**Date.** 2026-04-22
**Owner.** Konstantin Konstantinopolskii
**Product.** Wealthy operator surface — strategy audit pipeline (brief → research brief → research → strategy → review → signoff → delivered).
**Entry point.** Stages 1-10 (new page/flow).
**Kit at session start.** `@kk/design-system` v0.11.1. Bumps to v0.13.0 mid-session (Comment component gains Approve + Archive).
**FE slice.** Review state of the working layout — step 5 of seven — at high fidelity. Other six steps are spec context only.
**Out of scope.** Mentee/client surface, multitenancy, billing, role switcher.

**Why we re-run this brief.** Previous attempt shipped `prototype-alpha/` and surfaced pipeline holes documented in that session's retro. This run is the first end-to-end walk under pipeline-v2 (ten stages, nine roles, doc-as-artifact, vertical-slice rule). `prototype-alpha/` is a voice and content reference only; it does not constrain inventory.

---

# §B Stage 1-7 record

---

## Stage 1 — Analyst

**Role.** `kk-role-analyst`. Decomposes brief into users, job stories, scenarios, open questions; locks decisions at gate.
**Inputs.** `documentation/2026-04-22-wealthy-alpha/00-brief.md` + `/Users/kostyantinopolskii/Downloads/wealthy-pipeline-handoff.md` + user scope-lock in conversation.
**Output.** Decomposition of the operator surface, priority scenarios, locked decisions, brief amendments, entry-point declaration.

### User feedback — kickoff (verbatim)

> Hey, check the project and files you have. How would we work, if we will need to try once again to create the right prototype for the task we've done first? Let's specifically focus on the admin page and starting the research

### User feedback — scope lock (verbatim)

> Let's try bro. Sounds amazing. -alpha still and name the scope. for the concept and so on I want to see whole flow ideation high fidelity starts from one page prototype first

### User feedback — gate stamps + brief amendments (verbatim)

> b, okay. remove role, yes. diverge permited. decide during research of the possible directions on the 2stage. 5. yes. 6. yes. note that research prompt is a part of the document side, it's not shown in the inspector. And user comments every part on every step with regular comment flow and sends back to agent. I told it. let's do the canon propagation as separate sub agent and run art-director here after getting my feedback

### Analyst synthesis

**Users.**
- **Operator** (in scope). Konstantin or future team member. Runs audit for new mentee. Holds pen across seven pipeline states. Motivation: ship signed deliverable fast, preserve provenance.
- **Mentee / client** (out of scope). Delivery audience. Held for later slice.

**Job story (operator).** When new mentee is taken on and audit needed, want to walk brief → prompt → research → draft → review → signoff in one document-shaped surface, so as to ship signed deliverable with every cycle, source hit, rejected reply preserved as provenance.

**Priority scenarios (ranked).**
1. **Happy seven-stage walk.** brief → prompt → research → draft → review → signoff → delivered.
2. **Comment-steered revision at any stage.** Operator selects text in doc body, opens thread, agent replies with revision, operator approves or rejects with why. Same loop at every stage — prompt, findings, draft. Training signal per spec §5.2.
3. **Sparse research.** Operator judges evidence thin. Requests more before greenlighting draft.
4. **Reject-with-why required.** UI refuses silent reject.
5. **Patch after signoff.** Typo path, no review reopen. Edit log at doc bottom. Edge.

**Out of scope.** Client surface, multitenancy, billing, role switcher.

**Brief amendments from gate.** User corrected two load-bearing shape assumptions. Both override the `wealthy-pipeline-handoff.md` read.

1. **Research prompt renders in doc body, not inspector.** Middle column carries prompt draft. Inspector holds stage indicator + action button only. Generalizes: every content the operator reviews lives in doc body.
2. **Comment loop is steering primitive across every stage, not just review.** Pattern: operator selects text in doc → highlight → draft card → thread → agent reply with revision → operator approve or reject-with-why. Runs on prompt draft, findings, strategy draft. Review state is one slice of this primitive, not a special mechanic.

Implication: stage-8 slice = review state is effectively building THE steering pattern. Whatever ships there propagates to every other stage. Art-director's directions must frame the whole flow around this pattern.

**Locked decisions.**
1. Stage-8 high-fidelity slice → **(b) review state**.
2. Role switcher → **removed**. Operator-only markup, no attribute gating.
3. Review-state fidelity → **divergence permitted** at stages 2-7. Supervisor and DS reviewer judge per direction.
4. Research pricing in brief state → **deferred to stage 2**.
5. Agent reply tone in review → **operator's voice** (spec §10 default).
6. Patch path after signoff → **allowed with visible edit log**.

**Gate.** Passed. All six questions stamped. Stage 2 unblocked. Canon propagation for caveman communication rule runs in a separate background sub-agent via `kk-ds-maintainer`.

---

## Stage 2 — Art director

**Role.** `kk-role-art-director`. Produces 5+ flow directions, each with intent + guardrails. Iteration 1 was rejected. Iteration 2 ran under tightened constraints; final pick is a composite ("Signed workshop") landing at stage-2 gate.

### User feedback — iteration 1 rejection (verbatim, per direction)

> 1. Stupid and shitty direction. Doesn't make any sense, ignores current layout. 2. Shit. Skeleton idea is interesting, but layout is broken. 3. Stream is a bad idea - violates the layout. 4. Interesting direction with the highlights in text and stage in the right part. I see it as the main card on the top with the stages and steps needed to perform, plys actions that operator might need to have on each step, the general ones. Plus comments below for the agents with replies from agents. 5. No. Just no. Violates 3 column structure and needs to much of the additional components. Such changes are necessary only in case we are defining something truly distinctive from the actual admins we have. 6. Big Crown is interesting. But I would love to see it in the inspector. I want another iteration of art-director. And I want more focus on the flows now as well, not just one page. One page is for high fidelity.

Iteration 1 directions (rejected) for the record:
1. Thread-forward — marginalia strategy (split doc column).
2. Signed-first — pride shell (layout broken per gate).
3. Stream-mode — single column.
4. Workshop — minimal chrome with ~80px inspector strip.
5. Correspondence — dialogue as structure.
6. Stage-crown — big crown at doc top.

Seeds 4 and 6 survived and evolved. Rejected probes that still stand: deadline pressure (30s), form-mode (inspector dominates content).

### Iteration 2 — five directions

Constraints carried in: three-column kit shell (sidebar | doc | inspector), workflow card on top of inspector + comment thread stack below, all stage content in doc body, threads pin in inspector anchored to highlights, directions differ on FLOW shape across seven stages, stage-8 high-fidelity build covers one page (the review state).

#### Direction 1 — Workshop (accumulative doc)

**Intent.** Doc body accumulates across stages. Brief → prompt → findings → draft stack as sections inside one growing document. Workflow card in inspector shows current stage + steps checklist + general actions. Threads pin below.

```
┌ nav ────┐┌────── doc body ──────┐┌─ inspector ─┐
│ Brief ✓ ││ # Strategy            ││ ┌ Review  ─┐│
│ Prompt✓ ││                       ││ │ Step 5/7 ││
│ Rsrch ✓ ││ ## Brief              ││ │          ││
│ Draft ✓ ││ depth: deep ($20)     ││ │ Steps:   ││
│ Review●││ goal: Sofia → founder ││ │ · read   ││
│ Signoff ││                       ││ │ · thread ││
│         ││ ## Research           ││ │ · redo   ││
│         ││ ═══12 sources═══      ││ │ · sign   ││
│         ││ [collapsed, approved] ││ │          ││
│         ││                       ││ │ [Redo w/ ││
│         ││ ## Strategy draft     ││ │  notes]  ││
│         ││ ### Targeting         ││ │ [Sign]   ││
│         ││ Sofia's first ═══     ││ └──────────┘│
│         ││ months═══ text…       ││ ┌ @target ─┐│
│         ││ ### Pricing           ││ │ thread…  ││
│         ││ ═══text═══            ││ └──────────┘│
└─────────┘└───────────────────────┘└─────────────┘
```

Flow across seven stages: doc gains a section at each stage; workflow card transitions through brief form → prompt review → findings control → draft streaming → review → signed → delivered. Primary signal: the growing document. Guardrails: no past-stage collapse, no stage-switcher, doc never reshapes, only grows.

#### Direction 2 — Crown-in-inspector (drama per stage)

**Intent.** Inspector workflow card is a shout card per stage. Large hero line + context line + one primary action. Each stage transition shifts crown loudly.

```
┌ nav ────┐┌────── doc body ──────┐┌─ inspector ─┐
│ Brief   ││ # Strategy            ││ ╔══════════╗│
│ Prompt  ││                       ││ ║ Review   ║│
│ Research││ ## Strategy draft     ││ ║          ║│
│ Draft   ││ ### Targeting         ││ ║ 7 threads║│
│ Review●││ Sofia's first ═══     ││ ║ 3 replies║│
│ Signoff ││ months═══ text…       ││ ║ pending  ║│
│         ││                       ││ ║          ║│
│         ││ ### Pricing           ││ ║ [Redo w/ ║│
│         ││ ═══text═══            ││ ║  notes]  ║│
│         ││                       ││ ╚══════════╝│
│         ││                       ││ ┌ @target ─┐│
│         ││                       ││ │ thread…  ││
│         ││                       ││ └──────────┘│
└─────────┘└───────────────────────┘└─────────────┘
```

Crown swaps per stage with a hero line + primary CTA. Primary signal: inspector crown — each stage feels like a named moment.

#### Direction 3 — Timeline-native (progress-forward)

**Intent.** Inspector workflow card renders as a vertical timeline of seven stages. Current stage expanded with controls; past stages collapse to one-line summary + stats; future stages disabled.

```
┌ nav ────┐┌────── doc body ──────┐┌─ inspector ─┐
│ Brief   ││ # Strategy            ││ ┌────────────┐
│ Prompt  ││                       ││ │ Brief   ✓  │
│ Research││ ## Strategy draft     ││ │ Prompt  ✓  │
│ Draft   ││ ### Targeting         ││ │ Research✓  │
│ Review●││ Sofia's first ═══     ││ │ Draft   ✓  │
│ Signoff ││ months═══ text…       ││ │────────────│
│         ││                       ││ │◉ Review    │
│         ││                       ││ │ 7 threads  │
│         ││                       ││ │ [Redo w/   │
│         ││                       ││ │  notes]    │
│         ││                       ││ │────────────│
│         ││                       ││ │ Signoff    │
│         ││                       ││ │ Delivered  │
│         ││                       ││ └────────────┘
└─────────┘└───────────────────────┘└─────────────┘
```

Primary signal: the timeline itself — operator sees distance covered + remaining at every moment.

#### Direction 4 — Artefact-in-becoming (signed template from minute one)

**Intent.** Doc body renders the signed deliverable's full skeleton from stage 1. Title block, section placeholders, pending signoff block at bottom. Stages fill placeholders with real content. The finish is visible from the start.

```
┌ nav ────┐┌────── doc body ──────┐┌─ inspector ─┐
│ Brief   ││ # Strategy for Sofia  ││ ┌ Review  ─┐│
│ Prompt  ││                       ││ │ Step 5/7 ││
│ Research││ ## Targeting          ││ │          ││
│ Draft   ││ ═══Sofia's first      ││ │ [Redo w/ ││
│ Review●││ months═══ text…       ││ │  notes]  ││
│ Signoff ││                       ││ │ [Sign]   ││
│         ││ ## Pricing            ││ └──────────┘│
│         ││ ═══text═══            ││ ┌ @target ─┐│
│         ││                       ││ │ thread…  ││
│         ││ ## Next steps         ││ └──────────┘│
│         ││ [pending]             ││             │
│         ││                       ││             │
│         ││ ┌── Signoff ────────┐ ││             │
│         ││ │ Pending signature │ ││             │
│         ││ │ 3 revs · 7 hits   │ ││             │
│         ││ │ 0 edits pending   │ ││             │
│         ││ └───────────────────┘ ││             │
└─────────┘└───────────────────────┘└─────────────┘
```

Primary signal: always-visible signed-deliverable skeleton. Operator sees the finish before the work.

#### Direction 5 — Propose-and-review ledger (universal mechanic)

**Intent.** Every stage IS a propose-and-review moment. Workflow card always reads "Agent proposes: [thing]. Approve or comment." Operator either approves (advances) or opens threads (stays in stage, iterates). No special "review" visual.

```
┌ nav ────┐┌────── doc body ──────┐┌─ inspector ─┐
│ Brief   ││ # Strategy            ││ ┌ Stage 5  ─┐
│ Prompt  ││                       ││ │ Review    │
│ Research││ ## Strategy draft     ││ │           │
│ Draft   ││ ### Targeting         ││ │ Agent     │
│ Review●││ ═══Sofia's first      ││ │ proposes: │
│ Signoff ││ months═══ text…       ││ │ "strategy"│
│         ││                       ││ │           │
│         ││ ### Pricing           ││ │ [Approve] │
│         ││ ═══text═══            ││ │ [Redo w/  │
│         ││                       ││ │  notes]   │
│         ││                       ││ └───────────┘
└─────────┘└───────────────────────┘└─────────────┘
```

Primary signal: the approve-or-thread action pair. Same shape every stage.

### User feedback — iteration 2 gate (composite synthesis)

Five rounds of synthesis with the user landed on a composite of iteration-2 directions 1, 2, and 4. Directions 3 and 5 rejected.

### Chosen direction — Signed workshop

**Essence.** Kit-canonical three columns. Strategy is a single document with TWO layouts — working (during operator build) and delivered (after sign). Sign triggers a doc resort: signoff block flies from bottom to top, sections re-sort into delivery order.

Actions redistribute out of inspector into three doc-body homes:
- Brief input block at top of doc.
- Per-section control blocks beneath each research + strategy section (thread count + local redo).
- Signoff block at doc bottom (kit shout, step-by-step gate toward sign).

Inspector becomes a light status layer: stages card on top, future-reserved space (agent summary + clarifying questions — not built this session), threads stack below.

#### Doc body — working layout

| Section | Content |
|---|---|
| `## Brief` | Input block: transcription selector, CV attach, mentor notes, depth switch. Goal auto-derived from transcription (no goal field). |
| `## Research N` (one per run) | Sources list with inline prune affordance. Control block beneath: `N threads · [Redo research]`. |
| `## Strategy` | Meat. Subsections per prototype-alpha voice anchor (Что обсудили, Точка А, Точка Б, Видение + бизнес-модель, Позиционирование, Гипотезы + каналы, Рынок, Ближайшие шаги, Как мы работаем). Control block beneath: `N threads · [Redo draft]`. |
| `## Additional notes` | Optional operator notes. |
| `## Signoff` (shout) | Stats row (revs · research hits · edits pending). Guided step list. Operator can sign any time — steps are guidance, not gates. |

#### Doc body — delivered layout (post-sign resort)

| Section | Content |
|---|---|
| Signed title block (top) | Strategy for {mentee} · by {operator} · date · stats · signature glyph. |
| `## Strategy` | Meat first. |
| `## Research brief` | Operator's `## Brief` renamed for client. |
| `## Research` | Consolidated accepted sources across all runs. |
| `## Additional notes` · `## Way of work` · `## Next steps` | |

Control blocks disappear on delivered. Inspector simplifies to share URL + [Copy] + [Patch] + edit log card.

#### Inspector

**Working:** stages card (seven stages, past ✓, current ●, future disabled), future-reserved space (agent summary + clarifying Qs — next version), thread stack below (kit Comment).

**Delivered:** delivered status card (share URL + [Copy] + [Patch]) + edit-log card.

#### Working-layout ASCII

```
┌ Brief ────┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Research 1││ # Strategy for Sofia            ││ ┌ Stages ──┐│
│ Research 2││                                 ││ │ Brief  ✓ ││
│ Strategy  ││ ## Brief                        ││ │ Prompt ✓ ││
│  Point A  ││ ┌ Input ────────────────────┐  ││ │ Rsrch  ✓ ││
│  Point B  ││ │ Transcription [Nelli call]│  ││ │ Draft  ✓ ││
│  …        ││ │ CV            [attach]    │  ││ │◉Review   ││
│ Notes     ││ │ Mentor notes  [paste]     │  ││ │ Signoff  ││
│ Signoff   ││ │ depth: deep ($20)         │  ││ │ Delivered││
│           ││ └───────────────────────────┘  ││ └──────────┘│
│           ││ ┌ 0 threads · edit brief ──┐   ││ ┌ future ──┐│
│           ││ └──────────────────────────┘   ││ │ (agent   ││
│           ││                                 ││ │ summary +││
│           ││ ## Research 1                   ││ │ clarify  ││
│           ││ · source 1 ═══ ✕                ││ │ Qs, next ││
│           ││ · source 2    ✕                 ││ │ version) ││
│           ││ ┌ 2 threads · redo rsrch ──┐   ││ └──────────┘│
│           ││ └──────────────────────────┘   ││             │
│           ││ ## Strategy                     ││ ┌ @src1 ───┐│
│           ││ ### Point A  ═══text═══         ││ │ thread…  ││
│           ││ ### Point B  ═══text═══         ││ └──────────┘│
│           ││ ┌ 5 threads · redo draft ──┐   ││ ┌ @pointA ─┐│
│           ││ └──────────────────────────┘   ││ │ thread…  ││
│           ││                                 ││ └──────────┘│
│           ││ ╔═══ Signoff ═══════════════╗ ││             │
│           ││ ║ 3 revs · 10 hits           ║ ││             │
│           ││ ║ 0 edits pending            ║ ││             │
│           ││ ║ Steps to sign:             ║ ││             │
│           ││ ║ 1. Resolve 7 open threads  ║ ││             │
│           ││ ║ 2. Redo draft with notes   ║ ││             │
│           ││ ║ 3. Final read-through      ║ ││             │
│           ││ ║ 4. [Sign]                  ║ ││             │
│           ││ ╚════════════════════════════╝ ││             │
└───────────┘└─────────────────────────────────┘└─────────────┘
```

#### Delivered-layout ASCII

```
┌ Signed ───┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Strategy  ││ ┌ Signed ────────────────────┐ ││ ┌Delivered─┐│
│  Point A  ││ │ Strategy for Sofia          │ ││ │ share URL││
│  Point B  ││ │ by Konstantin · 2026-04-23  │ ││ │ [copy]   ││
│  …        ││ │ 3 revs · 10 hits            │ ││ │ [Patch]  ││
│ Rsrch br. ││ │ [signature glyph]           │ ││ └──────────┘│
│ Research  ││ └─────────────────────────────┘ ││ ┌edit log ─┐│
│ Notes     ││                                 ││ │ (none)   ││
│ Way of w. ││ ## Strategy                     ││ └──────────┘│
│ Next step ││ ### Point A  · Point B  · …    ││             │
│           ││                                 ││             │
│           ││ ## Research brief               ││             │
│           ││ [operator Brief, renamed]       ││             │
│           ││                                 ││             │
│           ││ ## Research                     ││             │
│           ││ · source 1  · source 3          ││             │
│           ││                                 ││             │
│           ││ ## Additional notes             ││             │
│           ││ ## Way of work                  ││             │
│           ││ ## Next steps                   ││             │
└───────────┘└─────────────────────────────────┘└─────────────┘
```

**Stage-8 build scope.** REVIEW state of working layout only. Concepts at stage 3 cover the whole flow so review-state decisions propagate coherently, but only review ships high-fidelity first.

**Voice + content anchor.** prototype-alpha's strategy text per operator: section structure and tone inherited. Copywriter (stage 9) resolves final copy.

**Kit inventory.** No new components. Three-columns pattern, Card (static for stages + control blocks; shout for signoff; interactive thread stack), Field, Switch, Typography, Nav, Comment, Signoff, Spec list.

---

## Stage 3 — Concepts (three in parallel)

**Role.** `kk-role-concept`. Three instances spawned in parallel on Signed workshop. Each carries ASCII flow mockups per step, JSON component trees, shape-up framing. Low-fi only, no code.

### Concept 1 — Happy-path walkthrough (chosen)

**Scenario.** Operator walks brief → research → strategy → sign cleanly, single research run, minimal thread activity, one small redo, confident pass to delivered.

**Fat marker.** Operator runs a clean strategy in under an hour. Every stage the doc visibly grows, inspector stages card ticks forward, signoff steps fill bottom-up.

#### Step 1 — Brief

```
+- sidebar ----+-------- doc body --------------------+- inspector ------+
| Brief     ●  |                                      | + Stages -------+|
| Rsrch brief  | <t-hero> Strategy for Sofia          | | Brief       ● ||
| Research   · |                                      | | Rsrch brief · ||
| Strategy   · | ## Brief                             | | Research    · ||
| Notes      · | +- card (Input) -------------------+ | | Strategy    · ||
| Signoff    · | | Transcription  [Nelli call  v]   | | | Notes       · ||
|              | | CV             [attach file]     | | | Signoff     · ||
|              | | Mentor notes   [paste…]          | | | Delivered   · ||
|              | | Depth          [shallow|●deep]   | | +----------------+|
|              | +----------------------------------+ | + future --------+|
|              |                                      | | (agent summary ||
|              | ## Signoff  (shout, pending)         | |  + clarify Qs  ||
|              | +- card--shout -------------------+  | |  — next rev)   ||
|              | | 0 revs · 0 hits                  | | +----------------+|
|              | | Steps to sign:                   | |                   |
|              | | 1. Run research                  | |                   |
|              | | 2. Draft strategy                | |                   |
|              | | 3. Resolve open threads          | |                   |
|              | | 4. Final read-through            | |                   |
|              | | 5. [Sign]  (disabled)            | |                   |
|              | +----------------------------------+ |                   |
+--------------+--------------------------------------+-------------------+
```

#### Step 5 — Review (the stage-8 slice)

```
+- sidebar ----+-------- doc body --------------------+- inspector ------+
| Brief      ✓ | ## Strategy                          | + Stages -------+|
| Rsrch brief✓ | ### Что обсудили                     | | Brief       ✓ ||
| Research   ✓ | ### Точка А                          | | Rsrch brief ✓ ||
| Strategy   ✓ | ### Точка Б                          | | Research    ✓ ||
|  Позицион-е  | ### Видение + бизнес-модель          | | Strategy    ✓ ||
|  …           | ### Позиционирование                 | | Notes       ✓ ||
| Notes      ● | <t-body> ═══redrafted text═══        | | Signoff     ● ||
| Signoff    · | ### Гипотезы + каналы                | | Delivered   · ||
|              | ### Рынок                            | +----------------+|
|              | ### Ближайшие шаги                   | + future --------+|
|              | ### Как мы работаем                  | | …              ||
|              | +- card --------------------------+  | +----------------+|
|              | | 1 thread · [Redo draft w/ notes] | | + threads ------+|
|              | +----------------------------------+ | | @Позициониров-е||
|              |                                      | | resolved ✓     ||
|              | ## Additional notes                  | | "sharpen verb" ||
|              | <t-body> (empty — operator skips)    | +----------------+|
|              |                                      |                   |
|              | ## Signoff  (shout)                   |                   |
|              | 2 revs · 11 hits · 0 edits pending    |                   |
|              | Steps: 1.✓ 2.✓ 3.✓                     |                   |
|              |        4. Final read-through ●        |                   |
|              |        5. [Sign]   (enabled)          |                   |
+--------------+--------------------------------------+-------------------+
```

#### Step 6 — Sign + resort

Doc resorts: signoff shout collapses to signed title block and flies to top. Sections reorder per delivered layout. Animation implied — sections slide to new positions, research-brief renames, research runs consolidate, control blocks evaporate, sidebar TOC relabels.

#### Step 7 — Delivered

Post-resort steady state. Signed title block anchors top. Strategy first. No control blocks, no signoff shout, no brief input card. Inspector future-reserved slot swaps to delivered-status card (share URL + copy + patch); thread stack dormant.

(Steps 2-4 omitted from this consolidation — same shell, content additions only. See concept 1 source for full ASCII.)

#### Component tree — working-review state (step 5)

```json
{
  "app[data-view=doc]": {
    "sidebar": ["sidebar__header", { "sidebar__nav": ["nav-group", "nav-group", "nav-group"] }, "sidebar__footer"],
    "doc#doc": [
      "t-hero",
      { "doc__section#brief": [{ "card": ["card__heading", "doc__spec", "button"] }] },
      { "doc__section#research-brief": ["t-display", "t-body", { "card": ["t-caption", "button"] }] },
      { "doc__section#research-1": ["t-display", { "card": ["doc__spec"] }, { "card": ["t-caption", "button"] }] },
      { "doc__section#strategy": [
        "t-display",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        { "card": ["t-caption", "button"] }
      ]},
      { "doc__section#additional-notes": ["t-display", "t-body"] },
      { "doc__section#signoff": [
        { "card.card--shout": [
          "card__heading",
          "doc__signoff-stats",
          { "card__collapsible": ["t-caption", "t-caption", "t-caption", "t-caption"] },
          "button.button--primary"
        ]}
      ]}
    ],
    "inspector": [
      { "inspector__group#stages": [{ "card": ["card__heading", "doc__spec"] }] },
      { "inspector__group#future": [{ "card": ["card__heading", "t-caption"] }] },
      { "inspector__group#threads": [
        { "card.card--interactive": ["card__heading", { "card__collapsible": ["comment-thread"] }, "button"] }
      ]}
    ]
  }
}
```

**Appetite.** A week.

**Rabbit holes named.** Resort animation choreography (kit transitions only, no custom keyframes); sidebar relabel animation (hard swap synced to reflow endpoint); signoff steps as guidance not gates ([Sign] enabled whenever draft exists); subsection-targeted redo (one control block per top-level section); future-reserved inspector slot (labeled placeholder card, empty body, no logic).

**No-gos.** No multi-run research UI; no prune in happy path; no reject-with-why thread flow; no patch path; no stage-back-navigation; no settings/account/share-permissions modal; no loading skeletons.

### Concept 2 — Thread-heavy walkthrough (archived)

**Scenario.** Operator enters review with 10 threads. Fires Redo draft. Agent batch-replies. Operator approves three, rejects one with a written reason (UI refuses empty rejection). Fires Redo draft again on the rejected subset. Resolves remaining threads. Signs.

#### Step 1 — Enter review (10 threads spread, pre-Redo) — densest ASCII

```
┌ Brief ────┐┌──────────── doc body ────────────┐┌─── inspector ────┐
│ Research 1││ # Strategy for Sofia              ││ ┌ Stages ───────┐│
│ Strategy  ││                                   ││ │ Brief    ✓    ││
│  Что обс. ││ ## Brief                          ││ │◉Review        ││
│  Точка А  ││ ┌ Input ────────────────────┐    ││ │ Signoff       ││
│  Точка Б  ││ │ transcription [Nelli call]│    ││ └───────────────┘│
│  …        ││ │ depth: deep ($20)          │    ││                  │
│ Signoff   ││ └───────────────────────────┘    ││ ┌ Threads (10) ─┐│
│           ││                                   ││ │ [collapse all]││
│           ││ ## Strategy                       ││ │               ││
│           ││ ### Что обсудили ═══ text         ││ │ ▾ Research 1 2││
│           ││ ### Точка А       ═══ text        ││ │   @src1 quote ││
│           ││ ### Точка Б       ═══ text        ││ │   @src2 quote ││
│           ││ ### Видение + биз ═══ text        ││ │ ▾ Strategy  8 ││
│           ││ ### Позициониров  ═══ text        ││ │   @Что-обс.   ││
│           ││ ### Гипотезы      ═══ text        ││ │   @Точка А ×2 ││
│           ││ ### Рынок         ═══ text        ││ │   @Точка Б    ││
│           ││ ### Ближайшие     ═══ text        ││ │   @Видение    ││
│           ││ ### Как работаем  ═══ text        ││ │   @Позиц.     ││
│           ││ ┌ 8 threads · [Redo draft] ─┐     ││ │   @Гипотезы   ││
│           ││ └────────────────────────────┘    ││ │   @Рынок      ││
│           ││                                   ││ └───────────────┘│
│           ││ ╔═══ Signoff ═══════════════════╗ ││                  │
│           ││ ║ Steps to sign:                 ║ ││                  │
│           ││ ║ 1. Resolve 10 open threads     ║ ││                  │
│           ││ ║ 2. [Redo draft] with notes (8) ║ ││                  │
│           ││ ║ 3. [Redo research] (2)         ║ ││                  │
│           ││ ║ 4. Final read-through          ║ ││                  │
│           ││ ║ 5. [Sign]                      ║ ││                  │
│           ││ ╚════════════════════════════════╝ ││                  │
└───────────┘└───────────────────────────────────┘└──────────────────┘
```

Inspector thread stack grouped by section header. Each group collapsible. Count badge `×N` on subsections with multiple threads.

#### Reject-with-why (inline, not modal)

Operator clicks [Reject] on a thread. An inline `field` opens inside the thread card. Submission disabled until textarea carries ≥ 1 non-whitespace char. Empty-state attempt shows error: "Reason required. Agent needs the 'why' to redo it right." On commit, thread flips to `✗ rejected · reason captured` with the reason text preserved inline.

#### No-gos for this concept

No silent rejection (hard refusal). No reject-reason hidden behind tooltip. No second column for threads. No modal for reject-with-why (inline only). No signoff as gate for [Sign]. No cross-thread dependencies.

(Concept 2 archived at gate. Thread grouping + reject-with-why modal simplified out of the chosen path. Mechanics survive in Concept 1 amendments.)

### Concept 3 — Multi-research + post-sign patch (archived)

**Scenario.** Operator fires research twice (run 1 sparse, refines prompt, runs again), prunes two weak sources from run 1, drafts, reviews, signs. Post-delivery, spots typo in Point B subsection, patches without reopening review. Patch appends row to edit log.

**Three locked decisions in this concept** (partly carried into stage-3 amendments):

1. **Run-more vs redo.** Control block carries `[Redo research]` (replace, destructive, confirm) + `[Run more research]` (additive, spawns next `## Research N+1`).
2. **Source prune confirm.** Inline `✕` on a source is immediate (no modal). `[Undo prune]` chip appears for 10s.
3. **Patch-edit scope.** Post-sign `[Patch]` unlocks ONE subsection at a time via dropdown. Body renders edit-caret on that subsection only. Save commits, closes edit mode, appends edit-log row.

#### Patch UX — subsection picker (step 9)

```
┌ Signed    ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Strategy  ││ ## Strategy                     ││ ┌Delivered─┐│
│  Point A  ││ ### Point A  (locked)           ││ │ share URL││
│  Point B ●││ ### Point B  (locked)           ││ │ [copy]   ││
│  Point C  ││ ### Point C  (locked)           ││ │◉Patch    ││
│ Rsrch br. ││                                 ││ └──────────┘│
│           ││                                 ││ ┌ Patch ───┐│
│           ││                                 ││ │ Edit     ││
│           ││                                 ││ │ which    ││
│           ││                                 ││ │ subsect? ││
│           ││                                 ││ │ Strategy ││
│           ││                                 ││ │ ▸ Pt A   ││
│           ││                                 ││ │ ▸ Pt B ◉ ││
│           ││                                 ││ │ ▸ Pt C   ││
│           ││                                 ││ │ Notes    ││
│           ││                                 ││ │ ▸ …      ││
│           ││                                 ││ │ [Unlock] ││
│           ││                                 ││ │ [Cancel] ││
│           ││                                 ││ └──────────┘│
└───────────┘└─────────────────────────────────┘└─────────────┘
```

**Patch-edit bounds.** IN scope: subsection body inside Strategy, Additional notes, Way of work, Next steps. OUT of scope forever: signed title block, signoff stats, signature glyph, section titles, `## Research`, `## Research brief`, section order. Escape hatch (not built): `[Open new revision]` creates a new doc under `rev 2`.

**Edit-log shape.** timestamp · subsection slug · before-snippet (~20 chars) · after-snippet. Diff-centered, append-only.

(Concept 3 archived at gate. Mechanics partially merged into stage-3 amendments — research iteration, post-sign patch bounds.)

### User feedback — stage-3 gate (the seven amendments)

User picked **Concept 1** and added seven gate amendments that propagate forward into every later stage. These amendments are load-bearing and must be honoured at stage 8.

1. **Comment threads in inspector render as a FLAT list.** No grouping, no section-sort, no collapsible groups. Kit Comment pinned in order.
2. **Regeneration scopes per section control block, ranked by frequency:** `[Improve in place]` (default), `[Redo section]`, `[Redo whole doc]`.
3. **Research control blocks carry:** `[Implement comments in research]`, `[Redo research]` (confirm modal), `[+ Add research]` (additive, spawns `## Research N+1`, prompt seeded + operator-editable). Depth regulation deferred.
4. **Comments are a context stream** — all open comments across the doc with quoted anchors feed every regeneration. Research comments inform strategy. Strategy comments inform research redo.
5. **Comment lifecycle:** agent reply lands inside the thread, not in doc body. Three operator paths per thread — Approve (kebab action, replacement moves into doc body, thread collapses to resolved visual), Reject with written answer (operator reply, feeds next round), Leave unanswered (still feeds context). Archive kebab action hides thread, preserves `data-archived`.
6. **Resolved + archived threads drop out of the context stream.**
7. **Kit v0.13.0 ships the Approve + Archive kebab actions, resolved-state visual, archive-hidden state, event payload.** Background task owned by `kk-ds-maintainer`. Frontend engineer at stage 8 consumes the shipped version.

---

## Stage 4 — Conservative designer

**Role.** `kk-role-designer-conservative`. Strict mode. Pure kit inventory. No invention. Two soft-rule frictions flagged for DS reviewer.

### Component list (review state — the stage-8 slice)

**Shell:** `app[data-view="doc"]` (1), `sidebar` (1), `sidebar__header` (1), `sidebar__nav#toc` (1), `toc__indicator` (1), `nav-group` (2-4), `nav-group__items` (2-4), `sidebar__footer` (1), `doc#doc` (1), `inspector` (1), `inspector__group` (3 working / 3 delivered).

**Sidebar:** `t-title` (1), `t-subtitle` (2-4), `t-caption` (7-11), `t-caption` in footer (1).

**Doc body — working layout:**

| Class | Count | Role |
|---|---|---|
| `t-hero` | 1 | "Strategy for Sofia". |
| `doc__section` | 5 | Brief, Research 1, Strategy, Additional notes, Signoff. |
| `t-display` | 5 | Section titles. |
| `t-display--medium` + `t-muted` | 5 | Section subtitles (job-story line per strategy-doc pattern). |
| `t-body` | 9 | Strategy subsection prose per prototype-alpha voice anchor. |
| `t-display--medium` (subsection heads, not muted) | 9 | Strategy subsection headings. |
| `card` (static) | 7 | Brief input card; Research 1 sources card; five control blocks. |
| `card__heading` | 6 | Inside every control block + brief input card. |
| `card.card--shout` | 1 | Signoff block (pending state). |
| `card__collapsible` | 1 | Signoff steps list inside the shout. |
| `card__collapsible-inner` | 1 | Padding wrapper. |
| `field.field--row` | 4 | Brief inputs. |
| `field__label` + `t-caption--bold` | 4 | Brief field labels. |
| `field__input` + `t-caption` | 3 | Brief text/file/select inputs. |
| `switch` | 1 | Depth toggle. |
| `button.button--primary` + `t-subtitle` | 1 | Signoff `[Sign]` primary. |
| `button` + `t-subtitle` | 10 | Secondary buttons. |
| `tag` | 5 | Thread counts on control blocks (metadata). |
| `doc__spec` | 2 | Research 1 source list; Signoff stats row. |
| `doc__spec-row` / `doc__spec-key` / `doc__spec-value` | per row | Spec rows. |
| `doc__signoff-stats` | 1 | Inside signoff shout. |
| `stat` + `t-caption` | 3 | Revs · research hits · edits pending. |
| `t-caption--bold` (numerics) | 3 | Numerals. |
| `highlight` | 0–N | Selection-injected anchors in body. |

**Control blocks (seven in maximal working layout).** Each is a static `card` with `card__heading` carrying a `<span class="tag">N threads</span>` and three `button` + `t-subtitle` children: `[Improve in place]` (default), `[Redo section]`, `[Redo whole doc]`. Research control block swaps the two right buttons for `[Implement comments in research]` (default), `[Redo research]` (destructive-confirm), `[+ Add research]` (spawns `## Research 2`).

**Inspector — working:**

| Class | Count | Role |
|---|---|---|
| `inspector__group` | 3 | Stages / future-reserved / threads. |
| `card` (static, stages) | 1 | Stages card. |
| `t-title` | 2 | Card headings. |
| `doc__spec` | 1 | Seven-row stage list. Status glyphs ✓ / ● / ·. |
| `card` (static, future-reserved) | 1 | Empty placeholder. |
| `t-caption` + `t-muted` | 1 | Placeholder caption. Metadata, so muted permitted. |
| `comment-stack` | 1 | Flat thread list container. |
| `card.card--interactive.comment-thread` | 0–N | One per open thread. Flat list, no grouping. Default `data-state="minimized"`. |
| `comment-thread__preview` / `__ellipsis` / `__list` | N | Kit default. |
| `comment-msg` (with `data-message-id`) | 2–M per thread | Messages. |
| `comment-msg__header` | M | Author + timestamp row. |
| `comment__menu` | M | Kebab trigger. |
| `comment__menu-popover` + `comment__menu-item` | M | Menu items: Reply, Delete, **Approve** (v0.13.0, on `data-role="agent-proposal"` only), **Archive thread** (v0.13.0, on seed message only). |
| `field.comment-thread__reply` | N | Reply input row. |
| `card.card--interactive.card--shout.comment-new` | 0–1 | Draft pinned at top during active selection. |

Resolved threads use kit v0.13.0 resolved-state visual (built-in collapse to checkmark stamp + truncated replacement snippet). Archived threads carry `data-archived` and render `display: none` per v0.13.0.

**Inventory sanity — forbidden classes:** zero. No invented classes.

### Behaviors

Kit JS auto-wires on `DOMContentLoaded`. Consumer calls `KK.enableCommentSelectionFlow()` once after mount. No new modules.

- **Sidebar — scroll-spy.** Watches `.doc__section[id]`, moves `toc__indicator`. On resort (sign), `KK.refresh()` fires after DOM reorder. TOC text swaps synchronously with resort endpoint — hard swap.
- **Doc — column reveal + scroll.** Middle column scrolls; sidebar + inspector are fixed. `.highlight` clicks promote matching thread in inspector stack.
- **Brief card.** Static `card` with `field` children. Hover fills with 3% (`--color-surface-overlay`); focus inverts. Depth switch is binary (shallow / deep) — no third state. Primary `[Commit brief]` lives at bottom of same card.
- **Control block.** Static (no hidden content, three buttons in a row). Flagged: three secondary buttons, no primary. Rationale — frequency ranking is not signal hierarchy; rendering all three secondary preserves 80/20 at the section scale. **DS reviewer back-ports a primary** at stage 7 (see §7).
- **Confirm modal — `[Redo research]` only.** Kit ships no modal. Conservative renders the confirm as a `card.card--shout` that inflates inside the research control block itself. Inline, not overlay. Two buttons: `[Redo research]` primary, `[Cancel]` secondary.
- **Signoff shout — pending state.** Shout variant inverts everything (black surface, white text). `doc__signoff-stats` filled. `card__collapsible > card__collapsible-inner` holds steps list — four `t-caption` rows. `[Sign]` enabled whenever a strategy subsection has text. Steps are guidance, not gates.
- **Inspector stages card.** Static `card` + `doc__spec`. Seven rows. Past row `✓`, current `●`, future `·` with `t-subtle`. No hover, no click.
- **Inspector future-reserved card.** Static `card` + headed + one `t-caption.t-muted` line.
- **Inspector thread stack.** FLAT list. Order of insertion. v0.13.0 resolved+archived threads reorder per kit default. One-active-at-a-time via inspector card-stack module. Kebab popover ships v0.13.0 items. Approve fires `kk:comment` `action: 'approve'` — consumer swaps doc body's highlighted span text with agent-proposal message body.
- **Comment draft.** `card.card--interactive.card--shout.comment-new`. Pins at top of inspector during active selection. Range wraps in `.highlight` spans. Commit creates a `comment-thread`; fires `kk:comment` with `action: 'new'` + anchor fields.

### Resort sequence — sign click

Kit has no animation primitive for this; conservative path is a minimal two-step DOM reflow:

1. Sign click → ~20-line handler at stage 8.
2. Doc sections re-parent in delivered order. Signoff shout removed; `doc__section#signed-title` inserted at top with filled stats + signature SVG. Control blocks detach. Research sections consolidate. Brief renames to Research brief.
3. `KK.refresh()` runs.
4. Sidebar TOC relabels via hard text swap.

Transition uses `--duration-slow` + `--ease-in-out` on section opacity only. No custom keyframes. No section-sliding. **Conservative accepts the rough read** as the cost of strict discipline.

### Kit JS modules used

`scroll-spy`, `narrow-view-toggle`, `column-reveal`, `inspector-card-stack`, `comment-kebab-menus`, `enableCommentSelectionFlow()`. `KK.refresh()` after the resort + after `[+ Add research]` inserts a new section.

### Component tree — review state (block-level, kit classes only)

```json
{
  "app[data-view=doc]": {
    "sidebar": [
      "sidebar__header.t-title",
      { "sidebar__nav#toc": [
        "toc__indicator",
        { "nav-group": ["t-subtitle", { "nav-group__items": ["t-caption", "t-caption", "t-caption"] }] },
        { "nav-group": ["t-subtitle", { "nav-group__items": ["t-caption", "t-caption"] }] }
      ]},
      "sidebar__footer.t-caption"
    ],
    "doc#doc": [
      "t-hero",
      { "doc__section#brief": [
        "t-display",
        "t-display--medium.t-muted",
        { "card": [
          { "card__heading": ["t-title", "t-caption"] },
          { "field.field--row": ["field__label.t-caption--bold", "field__input.t-caption"] },
          { "field.field--row": ["field__label.t-caption--bold", "field__input.t-caption"] },
          { "field.field--row": ["field__label.t-caption--bold", "field__input.t-caption"] },
          { "field.field--row": ["field__label.t-caption--bold", "switch", "t-caption.t-muted"] },
          "button.button--primary.t-subtitle"
        ]}
      ]},
      { "doc__section#research-1": [
        "t-display",
        "t-display--medium.t-muted",
        { "card": [{ "doc__spec": ["doc__spec-row","doc__spec-row","doc__spec-row","doc__spec-row","doc__spec-row","doc__spec-row","doc__spec-row","doc__spec-row"] }] },
        { "card": ["tag", "button.t-subtitle", "button.t-subtitle", "button.t-subtitle"] }
      ]},
      { "doc__section#strategy": [
        "t-display",
        "t-display--medium.t-muted",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        "t-display--medium", "t-body",
        { "card": ["tag", "button.t-subtitle", "button.t-subtitle", "button.t-subtitle"] }
      ]},
      { "doc__section#additional-notes": ["t-display", "t-display--medium.t-muted", "t-body"] },
      { "doc__section#signoff": [
        { "card.card--shout": [
          { "card__heading": ["t-title", "t-caption.t-muted"] },
          { "doc__signoff-stats": [
            { "stat.t-caption": ["t-caption--bold"] },
            { "stat.t-caption": ["t-caption--bold"] },
            { "stat.t-caption": ["t-caption--bold"] }
          ]},
          { "card__collapsible": [{ "card__collapsible-inner": ["t-caption","t-caption","t-caption","t-caption"] }] },
          "button.button--primary.t-subtitle"
        ]}
      ]}
    ],
    "inspector": [
      { "inspector__group": [{ "card": [
        { "card__heading": ["t-title"] },
        { "doc__spec": ["doc__spec-row","doc__spec-row","doc__spec-row","doc__spec-row","doc__spec-row","doc__spec-row","doc__spec-row"] }
      ]}]},
      { "inspector__group": [{ "card": [
        { "card__heading": ["t-title"] },
        "t-caption.t-muted"
      ]}]},
      { "inspector__group": [{ "comment-stack": [
        { "card.card--interactive.comment-thread[data-state=minimized]": [
          { "comment-thread__preview": [
            { "comment-msg[data-message-id]": [
              { "comment-msg__header": ["t-caption","comment__menu"] },
              "t-caption",
              { "comment__menu-popover": ["comment__menu-item.t-caption","comment__menu-item.t-caption","comment__menu-item.t-caption"] }
            ]},
            "comment-thread__ellipsis",
            { "comment-msg[data-message-id][data-role=agent-proposal]": [
              { "comment-msg__header": ["t-caption","comment__menu"] },
              "t-caption",
              { "comment__menu-popover": ["comment__menu-item.t-caption","comment__menu-item.t-caption","comment__menu-item.t-caption"] }
            ]}
          ]},
          { "card__collapsible": [{ "card__collapsible-inner": [
            { "comment-thread__list": ["comment-msg","comment-msg"] },
            { "field.comment-thread__reply": ["field__input.t-caption","field__fake-caret"] }
          ]}]}
        ]}
      ]}]}
    ]
  }
}
```

### Two soft flags from designer to DS reviewer

1. **No primary inside the control block.** Defensible reading of "one primary per card" but contradicts gate amendment 2's frequency ranking visually. May be flagged by reviewer.
2. **Inline `card--shout` for `[Redo research]` confirm.** Kit ships no modal; conservative path is the inline shout. Reviewer may read this as a modal-replacement violation.

(Both fixed at stage 7 — see §7.)

---

## Stage 5 — UX-driven designer

**Role.** `kk-role-designer-ux`. Eight ergonomic reorganizations inside kit rules. Same shell. Same inventory. Different priority signals at the section level.

### The eight moves

| # | Move | Kit parts | Conservative does | UX-driven does | Job served |
|---|---|---|---|---|---|
| R1 | Inspector reorder + stages minimized | `card--interactive[data-state]` | Stages / future / threads | Stages(min) / threads / future | Threads to attention zone at review. |
| R2 | Control-block scope ladder | `card--interactive` + `card__collapsible` | Flat single button | Primary default + collapsible rare + rarest | Frequency hierarchy from gate amendment 2. |
| R3 | Transcription primary label weight | `t-caption--bold` vs `t-caption` | Equal weight | Transcription bold, others regular | Goal derives from transcription — point at it. |
| R4 | Sidebar thread-density glyph | `t-micro.t-muted` inside `nav-group__items li` | Section labels only | Labels + muted thread count | Heat map, not plain map. |
| R5 | Flat threads | `.comment-stack` default | Same | Same (called out to stage 8) | Gate amendment 1. |
| R6 | Past doc sections minimized | `card--interactive[data-state=minimized]` | Static collapsed text | Kit minimized card | Scan density without losing survival. |
| R7 | Active step bold | `t-caption--bold` | Glyph only | Glyph + bold row | One distinction step. |
| R8 | Stages card three-column spec | `doc__spec--value` | Two-column spec | Three-column spec | Past stages carry summary. |

### Reasoning highlights

- **R2 (scope ladder).** Kit's `card--interactive` is the native frequency-hierarchy mechanic. Primary surfaces the default; collapsible reveals rare cases. One primary per card still holds. Maps gate amendment 2 directly.
- **R6.** The accumulative-doc framing wants past stages survived; full-render scan degrades at nine sections. Kit's minimized interactive card gives scent-compression with one-click recovery — content preserved, no invention.
- **R8.** Two-column `doc__spec` can't fit past-stage summaries ("Rsrch brief ✓ · 8 sources"). Three-column variant `doc__spec--value` is kit inventory, designed for key/value/explanation triples.

### One behavior flagged

`Redo research` confirm modal. Kit has no modal. Stage 8 path: browser `confirm()` while kit grows nothing; or stage 6 (revolutionary) proposes a modal component.

(Conservative was chosen at stage 7 — UX-driven moves not all back-ported. Two fixes (R2 scope ladder spirit + visible context-stream count) were back-ported as DS-reviewer amendments. See §7.)

---

## Stage 6 — Revolutionary designer

**Role.** `kk-role-designer-revolutionary`. May break manifesto rules with a manifest diff. Submitted one diff: unanchored steering note. Diff rejected at stage 7.

### The one rule broken

**Canon source.** `manifesto.md` §Runtime + `strategy-doc.md` §Commenting pattern + `components.md` §Comment.
**Rule as written:** every comment originates from a text selection and carries an anchor (prefix + quote + suffix, section slug, cluster).

### Proposed diff

- **Affordance.** `+ Add steering note` button in threads `inspector__group` header. Click spawns a draft `comment-new` at top of `.comment-stack` without a selection.
- **Class.** `button.comment-stack__add` (new sub-class of `comment-stack`).
- **Attribute.** `data-anchor="unanchored"` on the spawned `comment-thread` root.
- **Payload.** `kk:comment` payload anchor fields (`anchorQuote`, `anchorPrefix`, `anchorSuffix`, `cluster`, `sectionSlug`) become nullable. `action: 'new'` consumers null-check before rendering a quote block.
- **Rendering.** Thread renders identically to anchored thread; "Re: 'quote'" heading replaced by `t-caption--bold` "Steering note" label.
- **Lifecycle.** Identical to anchored threads (Approve / Reject / Leave / Archive).
- **Context stream.** Unanchored notes flow into every regeneration regardless of scope (`[Improve in place]` per section, `[Redo section]`, `[Redo whole doc]`).

### Why proposed

Gate amendment 4 reframes comments as global steering. The kit's anchored-only primitive forces operators to fake cross-cutting notes by anchoring to arbitrary spans, misleading the reader and leaking regen scope logic. Unanchored steering note resolves the mismatch with one primitive, narrow blast radius, clean rollback.

### Blast radius

`kk:comment` payload null-check; `docs/integration/comment.md` gains an "unanchored" section; `kit.js` `.comment-stack` handles a second insertion path; kit version bump (designer recommended v0.13.1 — let v0.13.0 Approve+Archive stabilise first); `strategy-doc.md` §Commenting pattern second paragraph; `components.md` §Comment description extended; one new i18n key (`addSteeringNote` default "What should every run know?"). No tokens. No layout. No accessibility floor lowered.

### Rollback

Six-file revert. Persisted unanchored rows stay valid as `comment` rows with null anchors — no data loss.

### Visible-context-stream count line (proposed alongside the diff, not requiring it)

Each per-section control block carries a count line: `N threads · M steering notes` (plain `t-caption`, no new component). Makes the steering legible. Reviewer recommended back-porting this regardless of diff acceptance.

(Diff rejected at stage 7. Count-line back-ported. See §7.)

---

## Stage 7 — DS reviewer

**Role.** `kk-role-ds-reviewer`. Comparative review of the three hand-offs + separate evaluation of the manifest diff. Does not pick — clarifies. Human picks.

### Matrix

| | Conservative | UX-driven | Revolutionary |
|---|---|---|---|
| Primary signal | Doc body prose. Inspector and control blocks stay 20% by construction. | Threads, once review starts. Stages compress; threads claim the inspector attention zone. | Doc body prose plus the "what feeds this regen" count line on every control block. |
| Best-served scenario | DS-strict build. Frontend reviewer audits pass cleanly with zero escalations. | Dense-review session with many threads on a long strategy. | Cross-cutting steering — voice, tone, verb discipline — applied over the whole doc without faking anchors. |
| Worst-served scenario | Dense review. Equal-weight three-button control block buries the default scope; operator reads frequency wrong. | Clean happy path with zero threads. Minimized stages card + empty threads group read as busywork. | A consumer that wants comment = marginalia only. Two mental models. |
| 80/20 at screen | Doc body 80% by default ratios. No overrides. | Same, plus inspector re-ranks so threads sit above stages. | Same as conservative. Adds count line per control block. |
| 80/20 at card | Signoff shout is the one shout; control blocks static with no primary; zero primaries in delivered inspector cards. | Control blocks get one primary each; rare scopes behind collapsible. | Control blocks get one primary plus two labelled-secondaries. |
| Inventions | Zero. | Zero. Eight ergonomic moves, all composition. | Three, all covered by one diff entry. |

### Findings

- **Conservative no-primary-in-control-block.** Rule text "one primary per card" forbids multiple, not zero. Both UX-driven and revolutionary read the frequency-ranked default deserves the primary slot. Map amendment 2 more literally.
- **UX-driven R6.** Concept-1 drawings show past sections as collapsed text — not as `card--interactive[data-state=minimized]`. Defensible delta but shifts scan density slightly.
- **Revolutionary `.control-block` modifier.** Semantic sugar with no CSS. Drop on reviewer request.
- **Context-stream visibility (amendment 4).** Only revolutionary surfaces a count line. Both conservative and UX-driven rely on operator inferring what feeds each regen. Recommend back-porting the count-line pattern regardless of pick.

### Diff recommendation

**Accept-worthy with one correction and one scope note.** If accepted, `kk-ds-maintainer` updates manifesto §Runtime, components §Comment, strategy-doc §Commenting pattern, docs/integration/comment.md, manifesto §Runtime i18n. Bump to **v0.13.1** (let v0.13.0 stabilise first).

**Correction.** Diff sidecar says "add `comment-stack__add` to allowlist in §What's forbidden." Allowlist is prefix-based; `comment-stack__add` already starts with `comment`. Document under §Comment instead.

**Scope note.** Diff proposes new public method `KK.addSteeringNote()`. Manifesto explicitly constrains public surface. Use delegated-click on `[data-kk="add-steering-note"]` instead — keeps minimal-surface rule intact.

### Clarifying conclusion (not a pick)

- **If minimum risk, max kit fidelity** → conservative. Stage 10 consistency review passes on the first run.
- **If best ergonomics inside kit rules** → UX-driven. Maps amendment 2 onto kit's native `card--interactive` mechanic; threads claim the attention zone.
- **If kit evolves around the job** → revolutionary + accept the diff. Honest blast radius, clean rollback.

### User feedback — stage 7 gate (verbatim)

> I want conservative with my comments that I gave before. And I think this step was unnecessary, considering the previous ideation. Noting for the retro.

**Chosen hand-off: conservative** (`04-conservative.md`).
**Revolutionary diff: rejected.**

### The nine amendments to apply at stage 8

Seven from stage-3 gate (carried forward):

1. Comment threads in inspector = flat list. No grouping.
2. Regeneration scopes per section control block: `[Improve in place]` default · `[Redo section]` rare · `[Redo whole doc]` rarest.
3. Research controls: `[Implement comments in research]` · `[Redo research]` (replace, confirm inline via `card--shout` per conservative spec) · `[+ Add research]` (additive, prompt seeded from note + session intro summary). Depth deferred.
4. Comments as context stream — open comments feed every regeneration globally.
5. Comment lifecycle using kit v0.13.0: Approve (→ doc + resolved state) · Reject with answer (next round) · Leave unanswered (skipped next batch, still strategy context). Archive via kebab → hidden + data preserved.
6. Resolved + archived stop traveling.
7. Kit v0.13.0 SHIPPED (commit `cc2af02`, tag `v0.13.0`).

Two from DS reviewer (soft-friction fixes, back-ported into conservative):

8. **Control block gets a primary button.** `[Improve in place]` → `button.button--primary`. `[Redo section]` + `[Redo whole doc]` → secondaries. Restores 80/20.
9. **Context-stream count line as plain `t-caption`.** Revolutionary made thread-count visibility explicit; back-port to conservative as unstyled `t-caption`. No new component.

### Retro note (recorded, not actioned this session)

> I think this step was unnecessary, considering the previous ideation.

Pipeline v2 may make stages 4-7 conditional when stage-3 concept + gate amendments are highly specific. Meta-retro after stage 10 ships.

---

# §C Final assignment for the FE engineer

This is the locked spec. If §B disagrees, §B wins.

## Build scope

**One screen, high fidelity:** **review state of the working layout** (concept 1, step 5). All other steps are spec context — your markup must be coherent for a future pass to extend, but only review state ships built.

## Hard rules

1. **Kit only.** Every class resolves to `components.md` or canonical `index.html`. Tokens from `tokens.json`. No invention. No off-grid spacing. No custom keyframes.
2. **Three-column shell.** `app[data-view="doc"]` → `sidebar` + `doc#doc` + `inspector`. Middle scrolls; sidebar + inspector pinned.
3. **Operator-only markup.** No role switcher, no auth gating.
4. **Russian content; English placeholder comments.** Strategy subsections in Russian per prototype-alpha voice anchor. Stage-9 copywriter fills final strings.
5. **No emoji** in any UI string.
6. **Sign keeps working whenever any strategy subsection has text.** Steps list is guidance, not gates.
7. **Kit v0.13.0** — Approve + Archive kebab actions, resolved-state visual, archive-hidden, `kk:comment` events. Consume; do not rebuild.

## The nine amendments (apply all)

(Reproduced verbatim from §B Stage 7. These are load-bearing.)

1. Flat thread list in `comment-stack`. No grouping, no section sort.
2. Strategy control block: `[Improve in place]` (`button.button--primary`) · `[Redo section]` (secondary) · `[Redo whole doc]` (secondary).
3. Research control block: `[Implement comments in research]` (`button.button--primary`) · `[Redo research]` (secondary, inline `card--shout` confirm) · `[+ Add research]` (secondary, additive, seeded prompt). Depth deferred.
4. Open comments are a global context stream feeding every regeneration. Resolved + archived drop out.
5. Lifecycle paths: Approve (kebab on `data-role="agent-proposal"` message) · Reject with answer (operator reply) · Leave unanswered · Archive (kebab on seed message).
6. Resolved + archived stop traveling.
7. Kit v0.13.0 shipped (`cc2af02`, `v0.13.0`). Consume.
8. Control block carries one primary (`[Improve in place]`).
9. Plain `t-caption` count line on every control block: `N threads · M open notes`.

## Inventory you may use

**Typography:** `t-hero`, `t-display`, `t-display--medium`, `t-body`, `t-title`, `t-subtitle`, `t-caption`, `t-caption--bold`, `t-micro`, `t-mono`, `t-muted`, `t-subtle`.
**Card:** `card`, `card--interactive`, `card--shout`, `card__heading`, `card__collapsible`, `card__collapsible-inner`, `data-state="active"|"minimized"`, `data-cta="active"|"minimized"`.
**Field:** `field`, `field--row`, `field__label`, `field__input`, `field__fake-caret`.
**Button:** `button`, `button--primary`.
**Tag / Switch:** `tag`, `tag--bold`, `switch`.
**Comment (v0.13.0):** `comment-stack`, `comment-new`, `comment-thread`, `comment-thread__preview`, `comment-thread__ellipsis`, `comment-thread__list`, `comment-thread__reply`, `comment-msg`, `comment-msg__header`, `comment__menu`, `comment__menu-popover`, `comment__menu-item`, `data-message-id`, `data-role="agent-proposal"`, `data-archived`.
**Sidebar:** `sidebar`, `sidebar__header`, `sidebar__nav`, `sidebar__footer`, `toc__indicator`, `nav-group`, `nav-group__items`.
**Doc body:** `doc`, `doc__section`, `doc__spec`, `doc__spec-row`, `doc__spec-key`, `doc__spec-value`, `doc__signoff-stats`, `doc__signoff-signature`, `doc__signoff-signature-img`, `stat`, `highlight`.
**Inspector:** `inspector`, `inspector__group`.
**App shell:** `app[data-view="doc"]`.

If you need anything not on this list, stop and ask. Invention is forbidden.

## Behaviors you wire

| Module | Owner | Your job |
|---|---|---|
| `scroll-spy` | kit | Make sure every `doc__section` has an `id`. |
| `column-reveal` | kit | Nothing. |
| `inspector-card-stack` | kit | Render threads as siblings inside `comment-stack`. |
| `comment-kebab-menus` (v0.13.0) | kit | Stamp `data-role="agent-proposal"` on agent-reply messages. Listen to `kk:comment`. |
| `narrow-view-toggle` | kit | Nothing. |
| `KK.enableCommentSelectionFlow()` | you | Call once after mount. |

### `kk:comment` event handler (you write)

| `event.detail.action` | What you do |
|---|---|
| `'new'` | Append `comment-thread` to `comment-stack` in insertion order. Anchor metadata in `event.detail.anchor`. |
| `'reply'` | Append `comment-msg` to thread's `comment-thread__list`. |
| `'approve'` | Find doc body's highlighted span matching the thread's anchor; replace span text with the agent-proposal message body. Kit collapses thread to resolved-state visual. |
| `'archive'` | Set `data-archived` on thread (kit owns the `display: none`). |
| `'delete'` | Remove the message DOM node. |

### Confirm modal — `[Redo research]` only

Kit ships no modal. Inflate an inline `card.card--shout` inside the research control block. Two buttons: `[Redo research]` primary, `[Cancel]` secondary. On primary: replace research section, archive any threads anchored to research 1.

### Sign click → resort sequence (~20 lines)

1. Capture click on `button.button--primary` inside `card.card--shout` of `doc__section#signoff`.
2. Build delivered DOM: insert `doc__section#signed-title` at top with filled stats + `signature.svg`; reorder existing sections to delivered order; rename brief heading to "Research brief"; consolidate research runs into one `## Research`; detach control blocks; detach signoff shout.
3. Fade transition: `--duration-slow` (320ms) + `--ease-in-out` on section opacity. **No keyframes, no slide animations.**
4. Sidebar TOC swap: hard, synced to reflow endpoint. No cross-fade.
5. Call `KK.refresh()`.

## Done means

- Review state renders pixel-coherent with stage-4 ASCII (§B Stage 4 — review state ASCII).
- Selection in doc body opens draft in inspector; commit creates thread; Approve replaces highlighted text in doc body; Archive hides thread.
- Strategy control block fires `[Improve in place]` / `[Redo section]` / `[Redo whole doc]`. Research card fires its three. `[Redo research]` shows inline confirm shout.
- Sign click reflows the doc to delivered layout, fades sections, swaps TOC labels, calls `KK.refresh()`.
- Zero invented classes. Every string is a placeholder comment for stage 9. No emoji.

## Source files (cross-reference, in order of authority)

1. This document (§B + §C).
2. `04-conservative.md` — chosen hand-off, full markup spec.
3. `07-ds-reviewer.md` — reviewer's amendment list (the nine).
4. `03-concept-1.md` — happy-path walkthrough, all seven steps.
5. `02-art-director.md` — Signed workshop direction.
6. `01-analyst.md` — original brief decomposition + locked decisions.
7. `.claude/skills/kk-design-system/components.md` — class reference.
8. `.claude/skills/kk-design-system/patterns/strategy-doc.md` — pattern reference.

End of assignment.
