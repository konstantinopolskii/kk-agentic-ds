---
session: 2026-04-22-wealthy-operator-alpha
stage: 3
role: concept
input: documentation/2026-04-22-wealthy-operator-alpha/02-art-director.md (chosen direction — Signed workshop)
output: concept #2 of 3 — thread-heavy walkthrough; many threads, stacked rejections, reject-with-why modal, double redo cycle
gate: pending — human picks one concept at stage-3 gate
---

# Concept 2 — Signed workshop, thread-heavy walkthrough

Scenario: operator enters review with the draft already on disk. Opens ten threads across research (2) and strategy (8). Fires Redo draft. Agent returns batch replies. Operator walks the stack, approves three, rejects one with a written reason (UI refuses empty rejection). Fires Redo draft again on the rejected subset. Resolves remaining threads. Signs.

Concept frames how the kit behaves under thread density — how control blocks in the doc body talk to the inspector stack, how the signoff block's guided step list reorders under pressure, how reject-with-why pins reason as a first-class data field rather than a UI afterthought.

## Fat marker problem

Operator under thread pressure must see exactly what blocks sign — and the agent must never receive a silent rejection.

## ASCII flows

Seven steps. Review state is the densest; it earns the deepest ASCII.

### Step 1 — Enter review (10 threads spread, pre-Redo)

Draft on disk. Operator has walked doc and dropped ten threads: two on research sources, eight across strategy subsections. Inspector stack grouped by section. Signoff step 1 says "Resolve 10 open threads".

```
┌ Brief ────┐┌──────────── doc body ────────────┐┌─── inspector ────┐
│ Research 1││ # Strategy for Sofia              ││ ┌ Stages ───────┐│
│ Strategy  ││                                   ││ │ Brief    ✓    ││
│  Что обс. ││ ## Brief                          ││ │ Prompt   ✓    ││
│  Точка А  ││ ┌ Input ────────────────────┐    ││ │ Research ✓    ││
│  Точка Б  ││ │ transcription [Nelli call]│    ││ │ Draft    ✓    ││
│  Видение  ││ │ depth: deep ($20)          │    ││ │◉Review        ││
│  Позиц.   ││ └───────────────────────────┘    ││ │ Signoff       ││
│  Гипотезы ││ ┌ 0 threads · edit brief ─┐      ││ │ Delivered     ││
│  Рынок    ││ └──────────────────────────┘     ││ └───────────────┘│
│  Шаги     ││                                   ││ ┌ future ───────┐│
│  Как раб. ││ ## Research 1                     ││ │ (reserved:    ││
│ Notes     ││ · src 1 ═══ quote                 ││ │  agent        ││
│ Signoff   ││ · src 2     quote                 ││ │  summary +    ││
│           ││ · src 3     quote                 ││ │  clarify Qs)  ││
│           ││ ┌ 2 threads · [Redo research] ┐   ││ └───────────────┘│
│           ││ └──────────────────────────────┘  ││                  │
│           ││                                   ││ ┌ Threads (10) ─┐│
│           ││ ## Strategy                       ││ │ [collapse all]││
│           ││ ### Что обсудили ═══ text         ││ │               ││
│           ││ ### Точка А       ═══ text        ││ │ ▾ Research 1 2││
│           ││ ### Точка Б       ═══ text        ││ │   @src1 quote ││
│           ││ ### Видение + биз ═══ text        ││ │   @src2 quote ││
│           ││ ### Позициониров  ═══ text        ││ │               ││
│           ││ ### Гипотезы      ═══ text        ││ │ ▾ Strategy  8 ││
│           ││ ### Рынок         ═══ text        ││ │   @Что-обс.   ││
│           ││ ### Ближайшие     ═══ text        ││ │   @Точка А ×2 ││
│           ││ ### Как работаем  ═══ text        ││ │   @Точка Б    ││
│           ││ ┌ 8 threads · [Redo draft] ─┐     ││ │   @Видение    ││
│           ││ └────────────────────────────┘    ││ │   @Позиц.     ││
│           ││                                   ││ │   @Гипотезы   ││
│           ││ ## Additional notes               ││ │   @Рынок      ││
│           ││ (empty)                           ││ │               ││
│           ││                                   ││ └───────────────┘│
│           ││ ╔═══ Signoff ═══════════════════╗ ││                  │
│           ││ ║ 3 revs · 10 hits               ║ ││                  │
│           ││ ║ 0 edits pending                ║ ││                  │
│           ││ ║ Steps to sign:                 ║ ││                  │
│           ││ ║ 1. Resolve 10 open threads     ║ ││                  │
│           ││ ║ 2. [Redo draft] with notes (8) ║ ││                  │
│           ││ ║ 3. [Redo research] (2)         ║ ││                  │
│           ││ ║ 4. Final read-through          ║ ││                  │
│           ││ ║ 5. [Sign]                      ║ ││                  │
│           ││ ╚════════════════════════════════╝ ││                  │
└───────────┘└───────────────────────────────────┘└──────────────────┘
```

Two control blocks live simultaneously — `2 threads · [Redo research]` + `8 threads · [Redo draft]`. Signoff step list promotes [Redo draft] first (higher count, bigger blocker). [Redo research] is step 3. Operator can fire either, in either order — signoff guides, not gates.

Inspector thread stack grouped by section header. Each group collapsible. "Threads (10)" heading carries total + [collapse all]. Points A gets count badge `×2` because two threads pin to the same subsection.

### Step 2 — Fire [Redo draft] (agent batch-replies to 8)

Operator clicks [Redo draft] under the strategy control block. Modal confirms: "Redo strategy draft. Agent receives 8 open threads as notes. Continue?" Confirm. State flips.

```
┌ Brief ────┐┌──────────── doc body ────────────┐┌─── inspector ────┐
│ Research 1││ ## Strategy (regenerating…)       ││ ┌ Stages ───────┐│
│ Strategy  ││ ### Что обсудили ═══ text         ││ │◉Review        ││
│  Что обс. ││ ### Точка А       ═══ text        ││ │   Redo draft  ││
│  …        ││ … (dimmed, last draft pinned)     ││ │   running     ││
│ Signoff   ││                                   ││ └───────────────┘│
│           ││ ┌ 8 threads · redoing… ───┐       ││                  │
│           ││ └──────────────────────────┘      ││ ┌ Threads (10) ─┐│
│           ││                                   ││ │ ▾ Research 1 2││
│           ││ ┌ 2 threads · [Redo research] ┐   ││ │   @src1       ││
│           ││ └──────────────────────────────┘  ││ │   @src2       ││
│           ││                                   ││ │ ▾ Strategy  8 ││
│           ││ ╔═══ Signoff ════════════════════╗││ │   (awaiting   ││
│           ││ ║ Steps to sign:                 ║││ │    replies…) ││
│           ││ ║ 1. Redo draft · running        ║││ │               ││
│           ││ ║ 2. Resolve 10 open threads     ║││ └───────────────┘│
│           ││ ║ 3. [Redo research] (2)         ║││                  │
│           ││ ║ 4. [Sign]                      ║││                  │
│           ││ ╚════════════════════════════════╝││                  │
└───────────┘└───────────────────────────────────┘└──────────────────┘
```

Draft body dims. Control block swaps label to "redoing…". Signoff step 1 updates live — "Redo draft · running". Inspector shows strategy group in waiting state.

### Step 3 — Batch replies arrive (stack with agent message on each thread)

Agent returns. Each of the 8 strategy threads gains a reply message under the seed. Thread card expands to show latest reply at top with [Approve] + [Reject] pair.

```
┌ Threads (10) ──────────────────┐
│ [collapse all]                 │
│                                │
│ ▾ Research 1 · 2 threads       │
│   ┌ @src1 ─────────────────┐   │
│   │ operator seed quote     │   │
│   │ (no agent reply — not   │   │
│   │  part of this redo)     │   │
│   └─────────────────────────┘   │
│                                │
│ ▾ Strategy · 8 threads         │
│   ┌ @Что-обсудили ─────────┐   │
│   │ ◆ Agent reply (new)     │   │
│   │   "rewrote opener per…" │   │
│   │ [Approve] [Reject]      │   │
│   │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │   │
│   │ operator seed           │   │
│   └─────────────────────────┘   │
│   ┌ @Точка А · 1 ──────────┐   │
│   │ ◆ Agent reply (new)     │   │
│   │ [Approve] [Reject]      │   │
│   │ seed                    │   │
│   └─────────────────────────┘   │
│   ┌ @Точка А · 2 ──────────┐   │
│   │ ◆ Agent reply (new)     │   │
│   │ [Approve] [Reject]      │   │
│   │ seed                    │   │
│   └─────────────────────────┘   │
│   ┌ @Точка Б ──────────────┐   │
│   │ ◆ Agent reply (new)     │   │
│   │ [Approve] [Reject]      │   │
│   │ seed                    │   │
│   └─────────────────────────┘   │
│   ┌ @Видение ──────────────┐   │
│   │ ◆ Agent reply           │   │
│   │ [Approve] [Reject]      │   │
│   │ seed                    │   │
│   └─────────────────────────┘   │
│   (Позиц, Гипотезы, Рынок —    │
│    scroll)                     │
└────────────────────────────────┘
```

Stack scales by three rules. Group by section (research vs strategy). Collapse-all at top. Long strategy group scrolls inside the group frame — research group stays pinned to top. Count badge `×N` on subsections with multiple threads in same anchor.

Signoff step list:

```
Steps to sign:
1. Walk 8 agent replies (approve or reject)
2. Resolve 2 research threads
3. [Redo research] (2)
4. [Sign]
```

### Step 4 — Approve three (green check on thread, count drops)

Operator approves @Что-обсудили, @Точка А · 1, @Точка Б. Thread cards collapse to `✓ resolved` summary. Strategy group count drops from 8 → 5. Signoff step 1 reads "Walk 5 agent replies".

```
┌ Threads (10 · 3 resolved) ─────┐
│                                │
│ ▾ Strategy · 5 open · 3 ✓      │
│   ┌ @Что-обсудили ✓ ──────┐   │
│   │ resolved · approved    │   │
│   └─────────────────────────┘   │
│   ┌ @Точка А · 1 ✓ ───────┐   │
│   │ resolved · approved    │   │
│   └─────────────────────────┘   │
│   ┌ @Точка А · 2 ────────┐    │
│   │ ◆ Agent reply          │   │
│   │ [Approve] [Reject]     │   │
│   └─────────────────────────┘   │
│   ┌ @Точка Б ✓ ───────────┐   │
│   │ resolved · approved    │   │
│   └─────────────────────────┘   │
│   ┌ @Видение ─────────────┐   │
│   │ ◆ Agent reply          │   │
│   │ [Approve] [Reject]     │   │
│   └─────────────────────────┘   │
│   (Позиц, Гипотезы, Рынок)     │
└────────────────────────────────┘
```

### Step 5 — Reject @Точка А · 2 (modal refuses empty reason)

Operator clicks [Reject] on @Точка А · 2. Reject-with-why surface opens INLINE inside the thread card. Not a modal — modals break the stack rhythm and steal focus. Inline keeps the reject bound to the thread it belongs to. Submission disabled until textarea carries ≥ 1 non-whitespace char.

Empty-state attempt:

```
┌ @Точка А · 2 ─────────────────┐
│ ◆ Agent reply                  │
│ "shifted framing to…"          │
│                                │
│ ┌ Why reject? (required) ────┐ │
│ │                             │ │
│ │ [cursor blinks]             │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│ ▲ Reason required. Agent needs  │
│   the "why" to redo it right.   │
│ [Send rejection] (disabled)     │
│ [Cancel]                        │
│                                │
│ seed                           │
└────────────────────────────────┘
```

Operator types. Button enables. Submit.

```
┌ @Точка А · 2 ─────────────────┐
│ ◆ Agent reply                  │
│ "shifted framing to…"          │
│                                │
│ ┌ Why reject? (required) ────┐ │
│ │ Still frames her as mentee, │ │
│ │ not founder. Inverted.      │ │
│ └─────────────────────────────┘ │
│ [Send rejection] (enabled)     │
│ [Cancel]                        │
│                                │
│ seed                           │
└────────────────────────────────┘
```

On send: thread card flips to `✗ rejected · reason captured` with the reason text preserved inline (NOT hidden behind a tooltip — reject-with-why is the single most valuable data field; it stays visible). Strategy group count: 5 open → 4 open + 1 rejected.

### Step 6 — Second [Redo draft] on rejected subset

Operator clicks [Redo draft] a second time. This time modal confirms: "Redo strategy draft. Agent receives 1 rejection reason + 4 still-open threads as notes. Continue?"

```
╔═══ Redo draft — confirm ═════════════╗
║ Agent will redo strategy with:        ║
║                                       ║
║ · 1 rejected reply (reason included)  ║
║ · 4 open threads (seed only)          ║
║                                       ║
║ · 3 approved stay as-is.              ║
║                                       ║
║ [Cancel]          [Redo draft]        ║
╚═══════════════════════════════════════╝
```

Operator confirms. Agent reruns. Second batch arrives — only on the five threads sent (1 rejected + 4 open). Approved three stay green and untouched.

Signoff step 1 during rerun: "Redo draft · running (2nd pass)".

### Step 7 — Resolve the rest + research + sign

Operator walks the 5 new replies, approves all 5. Strategy group: 0 open. Moves to research. Approves 2 research threads OR fires [Redo research] — here, approves them inline without a redo. Research group: 0 open.

All threads resolved. Signoff step list collapses:

```
╔═══ Signoff ═══════════════════════════╗
║ 4 revs · 10 hits                       ║
║ 0 edits pending                        ║
║ 10 threads resolved · 1 reject data    ║
║                                        ║
║ Steps to sign:                         ║
║ 1. ✓ All threads resolved              ║
║ 2. ✓ Redo draft committed (2 passes)   ║
║ 3. Final read-through                  ║
║ 4. [Sign]                              ║
╚════════════════════════════════════════╝
```

[Sign] enables only when steps 1 + 2 are checked. Read-through is operator judgement, no UI gate. Click [Sign] → doc resort fires (per art-director §Delivered layout). Inspector flips from working state to delivered state (share URL + copy + patch + edit log card).

## Component trees

### Tree — dense review state (step 3, densest)

```json
{
  "app[data-view=doc]": [
    { "sidebar": [
      "sidebar__header",
      { "sidebar__nav": [
        { "nav-group#brief": ["t-subtitle", "nav-group__items"] },
        { "nav-group#research": ["t-subtitle", "nav-group__items"] },
        { "nav-group#strategy": ["t-subtitle", "nav-group__items (9 subsections)"] },
        { "nav-group#notes": ["t-subtitle"] },
        { "nav-group#signoff": ["t-subtitle"] }
      ] },
      "sidebar__footer"
    ] },
    { "doc#doc": [
      "t-hero",
      { "doc__section#brief": [
        "t-display",
        { "card": [
          "field.field--row (transcription)",
          "field.field--row (CV)",
          "field.field--row (mentor notes)",
          "switch (depth)"
        ] },
        { "card": ["t-caption (0 threads)", "button (edit brief)"] }
      ] },
      { "doc__section#research-1": [
        "t-display",
        { "card": [{ "doc__spec": ["doc__spec-row (source list)"] }] },
        { "card": ["t-caption (2 threads)", "button.button--primary (Redo research)"] }
      ] },
      { "doc__section#strategy": [
        "t-display",
        { "doc__section#что-обсудили": ["t-display--medium", "t-body"] },
        { "doc__section#точка-а": ["t-display--medium", "t-body"] },
        { "doc__section#точка-б": ["t-display--medium", "t-body"] },
        { "doc__section#видение": ["t-display--medium", "t-body"] },
        { "doc__section#позиц": ["t-display--medium", "t-body"] },
        { "doc__section#гипотезы": ["t-display--medium", "t-body"] },
        { "doc__section#рынок": ["t-display--medium", "t-body"] },
        { "doc__section#шаги": ["t-display--medium", "t-body"] },
        { "doc__section#как-работаем": ["t-display--medium", "t-body"] },
        { "card": ["t-caption (8 threads)", "button.button--primary (Redo draft)"] }
      ] },
      { "doc__section#notes": ["t-display", "t-body"] },
      { "card.card--shout#signoff": [
        "card__heading (t-title)",
        { "doc__signoff-stats": [
          "stat (3 revs)",
          "stat (10 hits)",
          "stat (0 edits pending)"
        ] },
        { "doc__spec": ["doc__spec-row (step 1)", "doc__spec-row (step 2)", "doc__spec-row (step 3)", "doc__spec-row (step 4)", "doc__spec-row (step 5)"] },
        "button.button--primary (Sign, disabled)"
      ] }
    ] },
    { "inspector": [
      { "inspector__group#stages": [
        { "card": [
          "card__heading (t-title)",
          { "doc__spec": ["doc__spec-row × 7 (stages)"] }
        ] }
      ] },
      { "inspector__group#future": [
        { "card": ["card__heading (t-title)", "t-caption t-muted (reserved)"] }
      ] },
      { "inspector__group#threads": [
        { "card": [
          "card__heading (t-title · 10 threads)",
          "button (collapse all)"
        ] },
        { "comment-group#research": [
          "t-subtitle (Research · 2)",
          "comment-thread.card.card--interactive (@src1)",
          "comment-thread.card.card--interactive (@src2)"
        ] },
        { "comment-group#strategy": [
          "t-subtitle (Strategy · 8)",
          "comment-thread.card.card--interactive (@что-обсудили)",
          "comment-thread.card.card--interactive (@точка-а-1)",
          "comment-thread.card.card--interactive (@точка-а-2)",
          "comment-thread.card.card--interactive (@точка-б)",
          "comment-thread.card.card--interactive (@видение)",
          "comment-thread.card.card--interactive (@позиц)",
          "comment-thread.card.card--interactive (@гипотезы)",
          "comment-thread.card.card--interactive (@рынок)"
        ] }
      ] }
    ] }
  ]
}
```

### Tree — thread card with reject-with-why inline field (step 5)

```json
{
  "comment-thread.card.card--interactive": [
    { "card__heading": ["t-title (@Точка А · 2)", "t-caption t-muted (anchor)"] },
    { "card__collapsible": [
      { "card__collapsible-inner": [
        { "comment-msg (agent reply)": ["t-caption--bold (Agent)", "t-body (reply text)"] },
        { "field#reject-reason": [
          "t-caption--bold field__label (Why reject? required)",
          "field__input (textarea)",
          "t-micro t-muted (error: 'Reason required. Agent needs the why to redo it right.')"
        ] },
        "button.button--primary (Send rejection, disabled until reason present)",
        "button (Cancel)",
        { "comment-msg (operator seed)": ["t-caption--bold (Operator)", "t-body (seed text)"] }
      ] }
    ] }
  ]
}
```

Resolves against `components.md`: card + card--interactive for thread shape, field for the why input with inline error using t-micro + t-muted, button pair, comment-msg for message rows.

## Appetite

**A week.** Review state with thread density is the payoff page. Thread stack grouping, control-block-to-inspector anchor scroll, inline reject-with-why, two-pass redo state machine, and signoff step-list reactivity are the mechanics that make the whole pipeline feel real. Worth a full week of stage-4/5/6 + build.

## Rabbit holes

- **Thread virtualization for 50+ threads.** Ten scales. Fifty needs windowing. Leave for a post-ship pass — this session's cap is "scroll inside the group frame". Reject virtualization if proposed.
- **Bulk approve / bulk reject.** Tempting under density. Violates the core rule: reject-with-why per thread. Each rejection needs its own reason. No bulk reject. Bulk approve might be acceptable but slides toward silent review — leave it out this round.
- **Live-typing agent indicators.** Draft regeneration is not chat. Agent finishes then posts. No typing shimmers, no streaming preview per thread.
- **Custom anchor labels per thread.** Tempting to let operators rename threads. Adds state without job value — anchor label comes from section slug and stays stable.
- **Thread resolution undo.** Approve/reject are final per pass. Operator who misclicks runs another redo cycle with a new thread. Undo adds a state machine arm that saves 30 seconds and costs a week.

## No-gos

- **Silent rejection.** Rejection without a reason is forbidden at the UI level. Button disabled. Error visible. Not a friendly nudge — a hard refusal.
- **Reject-reason hidden behind tooltip or expand.** Reason renders inline on the rejected thread card and stays visible in the resolved state.
- **Second column for threads.** Violates three-column shell. Threads stay in inspector.
- **Modal for reject-with-why.** Tested mentally — modal steals focus from the thread card and breaks stack scrolling rhythm. Inline field inside the thread card only.
- **Signoff as gate for [Sign].** Signoff step list is guidance. Operator can still sign with open threads — UI warns, does not block. Only rule that DOES block: [Sign] disabled while a redo is running. Preserves atomic state.
- **Cross-thread dependencies.** Each thread is independent. No "if you reject @Точка А, also revisit @Точка Б" magic. Operator decides the scope each Redo cycle.

## Chosen concept

<!-- appended by human at stage-3 gate if this concept wins -->
