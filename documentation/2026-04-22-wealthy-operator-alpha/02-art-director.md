---
session: 2026-04-22-wealthy-operator-alpha
stage: 2
role: art-director
input: documentation/2026-04-22-wealthy-operator-alpha/01-analyst.md
output: iteration 2 — five directions on flow shape, three-column kit respected; iteration 1 archived
gate: pending — human picks one direction from iteration 2
style: caveman full
note: ASCII thumbnails per direction retained from iteration 1 (session-level skill override)
---

# Art-director — Wealthy operator alpha (iteration 2)

Stage 2, iteration 2. Iteration 1 rejected at gate. Iteration 2 respects three-column kit shell + frames directions on FLOW across seven stages.

## Raw input — iteration 2

User feedback on iteration 1, verbatim:

> 1. Stupid and shitty direction. Doesn't make any sense, ignores current layout. 2. Shit. Skeleton idea is interesting, but layout is broken. 3. Stream is a bad idea - violates the layout. 4. Interesting direction with the highlights in text and stage in the right part. I see it as the main card on the top with the stages and steps needed to perform, plys actions that operator might need to have on each step, the general ones. Plus comments below for the agents with replies from agents. 5. No. Just no. Violates 3 column structure and needs to much of the additional components. Such changes are necessary only in case we are defining something truly distinctive from the actual admins we have. 6. Big Crown is interesting. But I would love to see it in the inspector. I want another iteration of art-director. And I want more focus on the flows now as well, not just one page. One page is for high fidelity.

## Constraints carried into iteration 2

Locked before drawing:

- **Kit shell is three columns.** Sidebar | doc body | inspector. No split columns, no one-column variants, no reorganization. Kit-canonical only.
- **Inspector = workflow card on top + comment thread stack below.** Matches `wealthy-pipeline-handoff.md §3.1`. Not a thin strip. Not empty.
- **Doc body carries all stage content.** Brief summary, research prompt draft, findings, strategy draft, signed body. No content in inspector except threads.
- **Threads pin in inspector stack, anchored to highlights in doc body.** Kit default comment flow.
- **Directions differ on FLOW shape across seven stages**, not on layout invention. Each direction must describe behaviour at brief / prompt / research / draft / review / signoff / delivered.
- **Stage-8 high-fidelity build covers one page** — the review state. Think phase ideates end-to-end.

### Correction on earlier amendment

My iteration-1 read of amendment 1 was over-strict — I stripped inspector to "stage + action button only". Corrected reading: research PROMPT CONTENT renders in doc body (not inside an editor embedded in the workflow card). Workflow card + thread stack in inspector stay canonical.

## Iteration 2 — directions

Five. All kit-canonical shell. Each carries one ASCII at review state + a flow strip across seven stages.

### 1. Workshop — accumulative doc

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
│         ││                       ││ ┌ @pricing┐ │
│         ││                       ││ │ thread…  ││
│         ││                       ││ └──────────┘│
└─────────┘└───────────────────────┘└─────────────┘
```

**Flow across seven stages.**
- **Brief.** Doc body empty except title. Workflow card = brief form (mentee, depth switch, goal, materials).
- **Prompt.** Doc gains `## Prompt` section with agent's draft prompt as readable text. Workflow card = "Prompt drafted. Read + commit." Operator comments via selection; threads pin below workflow.
- **Research.** Doc gains `## Research` section with source list. Workflow = "Findings ready. Greenlight or request more."
- **Draft.** Doc gains `## Strategy draft`, streams in. Workflow = "Drafting…" with counter.
- **Review.** Workflow shifts to "Review. Redo w/ notes + Sign." Highlights render in draft. Threads accumulate in stack.
- **Signoff.** Operator clicks Sign. Workflow card flips to signed state. Stats + signature row append to doc bottom.
- **Delivered.** Workflow shows "Delivered · share URL · patch." Patch-edit path lives here.

**Primary signal.** The growing document. Every stage's output survives visibly.
**Guardrails.** No collapsing of past stages into metadata. No stage-switcher (forward motion only, though past sections readable). Doc body never reshapes — only grows.
**Kit surface.** Three-columns, Typography, Card (interactive workflow + static archived sections), Comment (thread stack), Spec list (brief block + signoff stats), Signoff, Nav.

---

### 2. Crown-in-inspector — drama per stage

**Intent.** Inspector workflow card is a shout card per stage. Large hero line + context line + one primary action. Each stage transition shifts crown loudly. Below: comment stack as usual.

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
│         ││                       ││ ┌ @pricing┐ │
│         ││                       ││ │ thread…  ││
│         ││                       ││ └──────────┘│
└─────────┘└───────────────────────┘└─────────────┘
```

**Flow across seven stages.**
- **Brief.** Crown: "Brief." Hero line. Below the crown title, embedded brief form (mentee, depth, goal). Primary: "Start research."
- **Prompt.** Crown swaps to "Prompt review. Agent drafted. Your call." Doc body shows prompt. Primary: "Commit prompt."
- **Research.** Crown: "Research · 12 sources." Doc body shows findings list. Primary: "Greenlight draft" or secondary "Run more."
- **Draft.** Crown: "Drafting…" with live section count. Doc body streams.
- **Review.** Crown: "Review · 7 threads." Primary: "Redo w/ notes" + secondary "Sign".
- **Signoff.** Crown: "Sign the strategy." One primary: "Sign." On click, crown collapses to signed badge.
- **Delivered.** Crown: "Delivered · share URL." Secondary: "Patch."

**Primary signal.** Inspector crown. Each stage feels like a named moment, not a step in a list.
**Guardrails.** One crown per moment. No competing inspector cards above threads. Crown never scrolls out.
**Kit surface.** Three-columns, Card (shout for crown, static for archive, thread for comments), Typography (t-display + t-title in crown), Comment, Signoff, Nav.

---

### 3. Timeline-native — progress-forward

**Intent.** Workflow card in inspector renders as a vertical timeline of the seven stages. Current stage expanded with controls; past stages collapse to one-line summary + stats; future stages disabled. Threads pin below the timeline card.

```
┌ nav ────┐┌────── doc body ──────┐┌─ inspector ─┐
│ Brief   ││ # Strategy            ││ ┌────────────┐
│ Prompt  ││                       ││ │ Brief   ✓  │
│ Research││ ## Strategy draft     ││ │ Prompt  ✓  │
│ Draft   ││ ### Targeting         ││ │ Research✓  │
│ Review●││ Sofia's first ═══     ││ │ Draft   ✓  │
│ Signoff ││ months═══ text…       ││ │────────────│
│         ││                       ││ │◉ Review    │
│         ││ ### Pricing           ││ │ 7 threads  │
│         ││ ═══text═══            ││ │ 3 replies  │
│         ││                       ││ │ pending    │
│         ││                       ││ │            │
│         ││                       ││ │ [Redo w/   │
│         ││                       ││ │  notes]    │
│         ││                       ││ │────────────│
│         ││                       ││ │ Signoff    │
│         ││                       ││ │ Delivered  │
│         ││                       ││ └────────────┘
│         ││                       ││ ┌ @target ─┐│
│         ││                       ││ │ thread…  ││
│         ││                       ││ └──────────┘│
└─────────┘└───────────────────────┘└─────────────┘
```

**Flow across seven stages.**
- Every stage: timeline visible. Current row expanded with controls. Past rows show "✓ · [one-line result]" (e.g. "Prompt ✓ · 2 threads accepted, 1 rejected").
- **Brief.** Expanded row = brief form.
- **Prompt.** Past row "Brief ✓". Expanded "Prompt" with "Commit" button.
- **Research.** Past rows collapse; expanded "Research" with greenlight + run-more.
- **Draft.** Expanded "Draft" with streaming indicator.
- **Review.** Expanded "Review" with thread count + Redo.
- **Signoff.** Expanded "Signoff" with Sign button; on sign, row collapses to "Signed · [date]".
- **Delivered.** Final row active with share URL + patch affordance.

**Primary signal.** The timeline itself. Operator sees distance covered + distance remaining at every moment.
**Guardrails.** No hidden timeline (always visible in inspector). Past stages never clickable-to-edit (peek only). Expanded row contents are the only action surface.
**Kit surface.** Three-columns, Card (interactive timeline row as one card type), Spec list (collapsed row summary), Typography, Comment, Signoff, Nav.

---

### 4. Artefact-in-becoming — signed template from minute one

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
│         ││ [pending]             ││ ┌ @pricing┐ │
│         ││                       ││ │ thread…  ││
│         ││ ┌── Signoff ────────┐ ││ └──────────┘│
│         ││ │ Pending signature │ ││             │
│         ││ │ 3 revs · 7 hits   │ ││             │
│         ││ │ 0 edits pending   │ ││             │
│         ││ └───────────────────┘ ││             │
└─────────┘└───────────────────────┘└─────────────┘
```

**Flow across seven stages.**
- **Brief.** Doc body already shows title + "## Targeting (pending)" + "## Pricing (pending)" + "## Next steps (pending)" + signoff block in pending state. Workflow card = brief form.
- **Prompt.** Workflow card cycles to prompt review. Prompt renders above the pending sections (or as section stub). Signoff block stays.
- **Research.** Workflow = findings control. Research note appears as a collapsed source-count inside relevant section placeholders or a research log between sections.
- **Draft.** Placeholders fill with agent-written content. Signoff block still pending.
- **Review.** Highlights on filled sections. Threads in inspector stack. Workflow = Redo + Sign.
- **Signoff.** Pending signoff block flips to signed: stats filled, signature glyph renders.
- **Delivered.** Share URL appears under signature. Patch-edit log append-row visible below signature.

**Primary signal.** The always-visible signed-deliverable skeleton. Operator sees the finish before the work.
**Guardrails.** No "new document" empty state. Placeholders never hidden. Signoff block renders in every stage (pending until signed).
**Kit surface.** Three-columns, Card (workflow + threads), Signoff (pending + signed variants), Spec list (stats), Typography, Nav.

---

### 5. Propose-and-review ledger — universal mechanic

**Intent.** Every stage IS a propose-and-review moment. Workflow card always reads "Agent proposes: [thing]. Approve or comment." Operator either approves (advances) or opens threads (stays in stage, iterates). No special "review" visual — review state is just "draft stage" with denser highlights.

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
│         ││                       ││ ┌ @target ─┐│
│         ││                       ││ │ thread…  ││
│         ││                       ││ └──────────┘│
│         ││                       ││ ┌ @pricing┐ │
│         ││                       ││ │ thread…  ││
│         ││                       ││ └──────────┘│
└─────────┘└───────────────────────┘└─────────────┘
```

**Flow across seven stages.**
- **Brief.** Workflow: "Agent proposes: research depth deep ($20), goal Sofia → founder." Operator approves or edits via thread.
- **Prompt.** "Agent proposes: [prompt text]." Approve to advance, or open threads on the prompt.
- **Research.** "Agent proposes: these 12 sources." Approve or thread.
- **Draft.** "Agent proposes: strategy draft." Approve advances to signoff; open threads stay in draft.
- **Review.** Same mechanic — but operator opens MORE threads because body is the richest. Visually identical to draft stage.
- **Signoff.** "Agent proposes: sign with these stats." Approve = sign.
- **Delivered.** No more propose-review — delivery is final. Patch path available.

**Primary signal.** The approve-or-thread action pair. Same shape every stage.
**Guardrails.** No special review-state UI. Review is not a mode; it's a density of threading. No hidden stages — operator sees what the agent proposes at every turn.
**Kit surface.** Three-columns, Card (interactive workflow + comment threads), Typography, Comment, Signoff, Nav.

---

## Iteration 1 — archived (rejected at gate)

Preserved for retro. Six directions, ASCII thumbnails, gate rejection reasons.

Gate feedback per direction:

1. **Thread-forward** → "Stupid and shitty direction. Doesn't make any sense, ignores current layout." Split doc column violated three-column pattern.
2. **Signed-first** → "Shit. Skeleton idea is interesting, but layout is broken." Skeleton idea survives in iteration 2 direction 4 ("Artefact-in-becoming") under kit-canonical shell.
3. **Stream-mode** → "Stream is a bad idea - violates the layout." Single-column violates three-column rule.
4. **Workshop** → "Interesting direction with the highlights in text and stage in the right part… main card on the top with the stages and steps needed to perform, plus actions operator might need to have on each step, the general ones. Plus comments below for the agents with replies from agents." Seed survives + evolved in iteration 2 direction 1.
5. **Correspondence** → "No. Just no. Violates 3 column structure and needs to much of the additional components. Such changes are necessary only in case we are defining something truly distinctive from the actual admins we have." Rejected.
6. **Stage-crown** → "Big Crown is interesting. But I would love to see it in the inspector." Seed survives + evolved in iteration 2 direction 2 ("Crown-in-inspector").

Iteration-1 ASCII thumbnails (full sketches) in git history of this file. Full directions were:

- 1 Thread-forward — marginalia strategy (split doc column)
- 2 Signed-first — pride shell (layout broken per gate)
- 3 Stream-mode — single column
- 4 Workshop — minimal chrome with ~80px inspector strip
- 5 Correspondence — dialogue as structure
- 6 Stage-crown — big crown at doc top (user: move crown to inspector)

Rejected probes from iteration 1 still stand:

- **Deadline pressure (30s).** Contradicts multi-day audit claim.
- **Form-mode (inspector dominates content).** Contradicts amendment — inspector does not carry stage content.

## Skill-override note

`kk-role-art-director/SKILL.md` §"What you do not do" forbids ASCII at stage 2. User overrode in iteration 1 and the override stands for iteration 2. One thumbnail per direction, review-state focused. Concept agents at stage 3 still produce full ASCII mockups per step + JSON component trees.

Retro should decide: canon change ("art-director may include one thumbnail per direction when breadth is abstract") or permanent session-only pattern.

## Gate

Passed through five rounds of synthesis on iteration 2. Final chosen direction is a composite — elements from iteration-2 directions 1 (workshop + steps), 2 (shout aesthetic, relocated), 4 (signed skeleton, signature relocated). Directions 3 and 5 rejected.

## Chosen direction — Signed workshop

### Essence

Kit-canonical three columns. Strategy is a single document with TWO layouts — working (during operator build) and delivered (after sign). Sign triggers a doc resort: signoff block flies from bottom to top, sections re-sort into delivery order.

Actions redistribute out of inspector into three doc-body homes:
- Brief input block at top of doc.
- Per-section control blocks beneath each research + strategy section (thread count + local redo).
- Signoff block at doc bottom (kit shout, step-by-step gate toward sign).

Inspector becomes a light status layer: stages card on top, future-reserved space (agent summary + clarifying questions — not built this session), threads stack below.

### Doc body — working layout

| Section | Content |
|---|---|
| `## Brief` | Input block: transcription selector, CV attach, mentor notes, depth switch. Goal auto-derived from transcription (no goal field). |
| `## Research N` (one per run) | Sources list with inline prune affordance. Control block beneath: `N threads · [Redo research]`. |
| `## Strategy` | Meat. Subsections per prototype-alpha voice anchor (Что обсудили, Точка А, Точка Б, Видение + бизнес-модель, Позиционирование, Гипотезы + каналы, Рынок, Ближайшие шаги, Как мы работаем). Control block beneath: `N threads · [Redo draft]`. |
| `## Additional notes` | Optional operator notes. |
| `## Signoff` (shout) | Stats row (revs · research hits · edits pending). Guided step list: resolve open threads, redo draft/research with notes, final read-through, [Sign]. Operator can sign any time — steps are guidance not gates. |

### Doc body — delivered layout (post-sign resort)

| Section | Content |
|---|---|
| Signed title block (top) | Strategy for {mentee} · by {operator} · date · stats · signature glyph. |
| `## Strategy` | Meat first. |
| `## Research brief` | Operator's `## Brief` renamed for client. |
| `## Research` | Consolidated accepted sources across all runs. |
| `## Additional notes` · `## Way of work` · `## Next steps` | |

Control blocks disappear on delivered. Inspector simplifies to share URL + [Copy] + [Patch] + edit log card.

### Inspector

**Working:** stages card (seven stages, past ✓, current ●, future disabled), future-reserved space (agent summary + clarifying Qs — next version), thread stack below (kit Comment). Threads pin as operator opens them; clicking a control block's thread count scrolls inspector stack to anchor.

**Delivered:** delivered status card (share URL + [Copy] + [Patch]) + edit-log card.

### Sidebar

Scroll-spy TOC of current layout. Relabels on resort.

### Stage-8 high-fidelity slice

Review state. Doc mid-work with strategy drafted + threads accumulated + signoff block pending. Embodies every mechanic that propagates to other stages (threads on any section, redo affordances via control blocks, signoff orchestration at bottom, stages card in inspector).

### Voice + content anchor

prototype-alpha's strategy text per operator: section structure and tone inherited. Copywriter stage 9 resolves final copy.

### Kit inventory

No new components. Uses: Three-columns pattern, Card (static for stages + control blocks; shout for signoff block; interactive thread stack), Field (brief inputs), Switch (depth), Typography, Nav (scroll-spy), Comment (thread stack), Signoff (adapted for working → delivered resort), Spec list (stats).

### Working-layout ASCII

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
│           ││ · source 1 ═══ ✕               ││ │ Qs, next ││
│           ││ · source 2    ✕               ││ │ version) ││
│           ││ ┌ 2 threads · redo rsrch ──┐   ││ └──────────┘│
│           ││ └──────────────────────────┘   ││             │
│           ││ ## Strategy                     ││ ┌ @src1 ───┐│
│           ││ ### Point A  ═══text═══        ││ │ thread…  ││
│           ││ ### Point B  ═══text═══        ││ └──────────┘│
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

### Delivered-layout ASCII

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

### Scope note

Stage-8 build = REVIEW state of working layout only. Concepts at stage 3 cover the whole flow so the review state's decisions propagate coherently, but only review ships high-fidelity first.

## Hand-off

Spawned three concepts in parallel on Signed workshop (stage 3):

- `03-concept-1.md` — happy-path walkthrough (clean run, light threads, single research). **Chosen at stage-3 gate.**
- `03-concept-2.md` — thread-heavy walkthrough. Archived. Gate feedback: thread grouping + reject-with-why modal simplified out.
- `03-concept-3.md` — multi-research + patch walkthrough. Archived. Mechanics partially carried forward into gate amendments (research iteration, post-sign patch bounds).

Stage-3 gate passed on concept 1 + gate amendments. Gate amendments recorded in `03-concept-1.md` §Gate amendments — load-bearing for stages 4/5/6.

Kit v0.13.0 in flight via `kk-ds-maintainer` (background): Comment component gains `Approve` + `Archive thread` kebab actions, resolved-state visual, archive-hidden state, and `kk:comment` event extensions (`approve`, `archive`).

Stages 4/5/6 spawned in parallel: conservative (`04-conservative.md`), UX-driven (`05-ux.md`), revolutionary (`06-revolutionary.md`). DS reviewer at stage 7 after all three land.
