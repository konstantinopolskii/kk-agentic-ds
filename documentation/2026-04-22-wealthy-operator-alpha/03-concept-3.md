---
session: 2026-04-22-wealthy-operator-alpha
stage: 3
role: concept
input: documentation/2026-04-22-wealthy-operator-alpha/02-art-director.md §Chosen direction — Signed workshop
output: concept 3 of 3 — multi-research iteration, source prune, consolidation-on-sign, post-sign patch with edit log
gate: pending — human picks one concept of three
---

# Concept 3 — Signed workshop, multi-research + post-sign patch walkthrough

Stage 3, instance 3 of 3. Scenario: operator fires research twice (run 1 sparse, refines prompt, runs again), prunes two weak sources from run 1 inline, drafts, reviews, signs. Post-delivery, spots typo in Point B subsection, patches without reopening review. Patch appends row to edit log.

## Fat marker problem

Operator needs research that is good enough to build on — sparse first runs should accumulate, not throw away — and needs to fix a post-sign typo without dragging the whole doc back into review.

## Raw input

> Your assigned scenario: MULTI-RESEARCH + POST-SIGN PATCH WALKTHROUGH. Operator fires research twice (first run is sparse — operator judges the findings too thin, refines the prompt, runs again). Prunes two sources from run 1 that look irrelevant. Drafts, reviews with a few threads, signs. After delivery, finds a typo in a strategy subsection and patches it without reopening review. The patch appends a row to the edit log.

Per-section control block carries `N threads · [Redo research]` (replace semantics). Assigned scenario adds a second affordance, `[Run more research]` (accumulate semantics), to spawn `## Research 2` alongside `## Research 1`.

## Design decisions

Three calls this concept locks before drawing. The art-director set the shell and the resort trigger; concept 3 has to answer:

1. **Run-more vs redo.** Control block carries two buttons in this concept: `[Redo research]` replaces the run in place (destructive, confirm modal); `[Run more research]` spawns the next `## Research N+1` section below (additive, no confirm). Same control block, two semantics — labels and placements disambiguate.
2. **Source prune confirm.** Inline `✕` on a source is immediate (no modal). A sibling button `[Undo prune]` appears in the control block for 10 seconds after any prune action, text says `source 2 pruned · undo`. Destructive confirm reserved for destroying a whole run.
3. **Patch-edit scope.** Post-sign `[Patch]` in inspector unlocks ONE subsection at a time. Operator picks the subsection from a dropdown inside the patch card (`Strategy ▸ Point B`). Body renders edit-caret on that `### Point B` heading's content only; title stays locked; other sections stay read-only. Save commits, closes edit mode, appends edit-log row. No review loop reopened because patch-scope excludes signoff block and `## Research`.

## ASCII flows

Eleven steps. Emphasis on research iteration (steps 2-5), consolidation-on-sign (steps 7-8), patch UX (steps 9-11).

### Step 1 — Brief committed, research 1 launched

```
┌ Brief     ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Research 1││ # Strategy for Sofia            ││ ┌ Stages ──┐│
│ Strategy  ││                                 ││ │ Brief  ✓ ││
│ Signoff   ││ ## Brief                        ││ │ Prompt ✓ ││
│           ││ ┌ Input ────────────────────┐  ││ │◉Rsrch    ││
│           ││ │ Transcription [Nelli call]│  ││ │ Draft    ││
│           ││ │ CV            [attach]    │  ││ │ Review   ││
│           ││ │ Mentor notes  [paste]     │  ││ │ Signoff  ││
│           ││ │ depth: deep ($20)         │  ││ │ Delivered││
│           ││ └───────────────────────────┘  ││ └──────────┘│
│           ││ ┌ 0 threads · edit brief ──┐   ││             │
│           ││ └──────────────────────────┘   ││ ┌ future ──┐│
│           ││                                 ││ │ (agent   ││
│           ││ ## Research 1                   ││ │ summary +││
│           ││ ═══ running… 3 sources found ═══││ │ clarify  ││
│           ││                                 ││ │ Qs)      ││
│           ││ ┌ 0 threads · [ running ] ─┐   ││ └──────────┘│
│           ││ └──────────────────────────┘   ││             │
└───────────┘└─────────────────────────────────┘└─────────────┘
```

### Step 2 — Research 1 finished, operator reads, judges sparse

```
┌ Brief     ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Research 1││ ## Research 1                   ││ ┌ Stages ──┐│
│ Strategy  ││ · source 1  LinkedIn profile    ││ │◉Rsrch    ││
│ Signoff   ││ · source 2  medium article      ││ └──────────┘│
│           ││ · source 3  forum thread        ││             │
│           ││ · source 4  old blog post       ││ ┌ future ──┐│
│           ││ · source 5  twitter screenshot  ││ │ (agent   ││
│           ││                                 ││ │ summary +││
│           ││ ┌ 0 threads ───────────────┐   ││ │ clarify  ││
│           ││ │ [Redo research]          │   ││ │ Qs)      ││
│           ││ │ [Run more research]      │   ││ └──────────┘│
│           ││ └──────────────────────────┘   ││             │
│           ││                                 ││             │
│           ││ ## Strategy (pending)           ││             │
│           ││                                 ││             │
└───────────┘└─────────────────────────────────┘└─────────────┘
```

Operator judgement: 5 sources, three of them weak. Not enough signal. Two affordances in control block — redo (replace) vs run-more (accumulate). Operator picks run-more.

### Step 3 — Operator prunes sources 2 and 5 from run 1

```
┌ Brief     ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Research 1││ ## Research 1                   ││ ┌ Stages ──┐│
│ Research 2││ · source 1  LinkedIn profile    ││ │◉Rsrch    ││
│ Strategy  ││ · source 3  forum thread        ││ └──────────┘│
│ Signoff   ││ · source 4  old blog post       ││             │
│           ││                                 ││             │
│           ││ ┌ 0 threads · 2 pruned · undo ┐││             │
│           ││ │ [Redo research]              │││             │
│           ││ │ [Run more research] ◉        │││             │
│           ││ └──────────────────────────────┘││             │
│           ││                                 ││             │
│           ││ ## Research 2                   ││             │
│           ││ ═══ running (refined prompt) ═══││             │
│           ││ ┌ 0 threads · [ running ] ────┐││             │
│           ││ └──────────────────────────────┘││             │
└───────────┘└─────────────────────────────────┘└─────────────┘
```

Prune is immediate — no modal. Undo chip sits in the control block for 10s. Sidebar gains `Research 2` entry. Strategy section still pending because draft happens after operator greenlights findings.

### Step 4 — Run 2 lands, both runs coexist

```
┌ Brief     ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Research 1││ ## Research 1                   ││ ┌ Stages ──┐│
│ Research 2││ · source 1                      ││ │◉Rsrch    ││
│ Strategy  ││ · source 3                      ││ └──────────┘│
│ Signoff   ││ · source 4                      ││             │
│           ││ ┌ 0 threads · [redo] [run +] ┐ ││             │
│           ││ └────────────────────────────┘ ││             │
│           ││                                 ││             │
│           ││ ## Research 2                   ││             │
│           ││ · source 1  HBR deep-dive       ││             │
│           ││ · source 2  investor memo 2025  ││             │
│           ││ · source 3  podcast transcript  ││             │
│           ││ · source 4  case study          ││             │
│           ││ · source 5  academic paper      ││             │
│           ││ · source 6  founder interview   ││             │
│           ││ · source 7  market report       ││             │
│           ││ ┌ 0 threads · [redo] [run +] ┐ ││             │
│           ││ └────────────────────────────┘ ││             │
└───────────┘└─────────────────────────────────┘└─────────────┘
```

Two runs stand side by side. Each has its own control block. Operator judges run 2 good. No prune on run 2. Advances to draft (implicit — opens `[Redo draft]` on strategy section or agent proposes draft from both runs combined).

### Step 5 — Draft lands, review state

```
┌ Brief     ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Research 1││ ## Research 1  (3 sources)      ││ ┌ Stages ──┐│
│ Research 2││ ## Research 2  (7 sources)      ││ │ Rsrch  ✓ ││
│ Strategy  ││                                 ││ │ Draft  ✓ ││
│  Point A  ││ ## Strategy                     ││ │◉Review   ││
│  Point B  ││ ### Point A ═══Sofia's first═══ ││ │ Signoff  ││
│  …        ││ months═══ text…                 ││ └──────────┘│
│ Signoff   ││ ### Point B ═══pricing anchor═══││             │
│           ││ for alumni ring…                ││ ┌ @pointA ┐ │
│           ││ ### Point C ═══channels═══      ││ │ thread  │ │
│           ││                                 ││ └─────────┘ │
│           ││ ┌ 3 threads · [Redo draft] ─┐  ││ ┌ @pointB ┐ │
│           ││ └───────────────────────────┘  ││ │ thread  │ │
│           ││                                 ││ └─────────┘ │
│           ││ ╔══ Signoff (pending) ═════════╗││ ┌ @pointB ┐ │
│           ││ ║ 3 revs · 10 hits             ║││ │ thread  │ │
│           ││ ║ 2 edits pending              ║││ └─────────┘ │
│           ││ ║ 1. Resolve 3 threads         ║││             │
│           ││ ║ 2. [Sign]                    ║││             │
│           ││ ╚══════════════════════════════╝││             │
└───────────┘└─────────────────────────────────┘└─────────────┘
```

Three threads pinned to Point A / Point B / Point B. Operator resolves threads, rereads, hits Sign.

### Step 6 — Sign clicked, resort in flight (motion frame)

```
┌ Brief     ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ (relabel) ││ ╔═══════════════════════════════╗│┌ Stages ──┐│
│           ││ ║ Signed · resorting…           ║││ Review ✓ ││
│           ││ ║ Strategy for Sofia            ║││◉Signoff  ││
│           ││ ║ by Konstantin · 2026-04-23    ║│└──────────┘│
│           ││ ║ 3 revs · 10 hits              ║│            │
│           ││ ║ [signature glyph]             ║│            │
│           ││ ╚═══════════════════════════════╝│            │
│           ││                                 ││            │
│           ││ (sections flying into order…)   ││            │
│           ││ — Strategy first                ││            │
│           ││ — Research brief                ││            │
│           ││ — Research (consolidating…)     ││            │
│           ││ — Notes · Way of work · Next    ││            │
│           ││                                 ││            │
│           ││ control blocks fading           ││            │
└───────────┘└─────────────────────────────────┘└────────────┘
```

Signoff shout flies from bottom to top. Section order re-sorts to delivered layout. Research runs consolidate — see step 7 for the math.

### Step 7 — Delivered layout settled, consolidated Research section

```
┌ Signed    ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Strategy  ││ ┌ Signed ────────────────────┐ ││ ┌Delivered─┐│
│  Point A  ││ │ Strategy for Sofia          │ ││ │ share URL││
│  Point B  ││ │ by Konstantin · 2026-04-23  │ ││ │ [copy]   ││
│  Point C  ││ │ 3 revs · 10 hits            │ ││ │ [Patch]  ││
│ Rsrch br. ││ │ [signature glyph]           │ ││ └──────────┘│
│ Research  ││ └─────────────────────────────┘ ││ ┌edit log ─┐│
│ Notes     ││                                 ││ │ (empty)  ││
│ Way of w. ││ ## Strategy                     ││ └──────────┘│
│ Next step ││ ### Point A  ═══text═══        ││             │
│           ││ ### Point B  ═══text═══        ││             │
│           ││ ### Point C  ═══text═══        ││             │
│           ││                                 ││             │
│           ││ ## Research brief               ││             │
│           ││ [operator Brief, renamed]       ││             │
│           ││                                 ││             │
│           ││ ## Research                     ││             │
│           ││ · source 1  LinkedIn profile    ││             │
│           ││ · source 3  forum thread        ││             │
│           ││ · source 4  old blog post       ││             │
│           ││ · source 5  HBR deep-dive       ││             │
│           ││ · source 6  investor memo 2025  ││             │
│           ││ · source 7  podcast transcript  ││             │
│           ││ · source 8  case study          ││             │
│           ││ · source 9  academic paper      ││             │
│           ││ · source 10 founder interview   ││             │
│           ││ · source 11 market report       ││             │
│           ││                                 ││             │
│           ││ ## Additional notes             ││             │
│           ││ ## Way of work                  ││             │
│           ││ ## Next steps                   ││             │
└───────────┘└─────────────────────────────────┘└─────────────┘
```

Consolidation math (locked for this concept): unique accepted sources from all runs, in run-order, renumbered 1..N for client readability. Run identity dropped (no "from run 2"). Pruned sources excluded. Dedup is URL-match first; title+author fallback. See rabbit hole §A for edge cases.

### Step 8 — Operator spots typo in Point B subsection

```
┌ Signed    ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Strategy  ││ ## Strategy                     ││ ┌Delivered─┐│
│  Point A  ││ ### Point A  ═══text═══         ││ │ share URL││
│  Point B ●││ ### Point B                     ││ │ [copy]   ││
│  Point C  ││ ═══pricign anchor for alumni    ││ │ [Patch]  ││
│ Rsrch br. ││ ring is 3k eur/mo for 6 mo═══   ││ └──────────┘│
│ Research  ││ ### Point C  ═══text═══         ││ ┌edit log ─┐│
│ Notes     ││                                 ││ │ (empty)  ││
│ Way of w. ││                                 ││ └──────────┘│
└───────────┘└─────────────────────────────────┘└─────────────┘
```

Typo: `pricign` → `pricing`. Doc is read-only. Inspector `[Patch]` is the only unlock path.

### Step 9 — Patch clicked, subsection picker

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
│           ││                                 ││ │          ││
│           ││                                 ││ │ Strategy ││
│           ││                                 ││ │ ▸ Pt A   ││
│           ││                                 ││ │ ▸ Pt B ◉ ││
│           ││                                 ││ │ ▸ Pt C   ││
│           ││                                 ││ │ Notes    ││
│           ││                                 ││ │ ▸ …      ││
│           ││                                 ││ │          ││
│           ││                                 ││ │ [Unlock] ││
│           ││                                 ││ │ [Cancel] ││
│           ││                                 ││ └──────────┘│
└───────────┘└─────────────────────────────────┘└─────────────┘
```

Out-of-bounds entries NOT in picker: signed title block, signoff stats, signature glyph, `## Research`, `## Research brief`. Those stay immutable forever. See rabbit hole §B.

### Step 10 — Point B unlocked, typo edited

```
┌ Signed    ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Strategy  ││ ## Strategy                     ││ ┌ Patch ───┐│
│  Point A  ││ ### Point A  (locked)           ││ │ editing  ││
│  Point B ●││ ### Point B  ◉ editing          ││ │ Point B  ││
│  Point C  ││ ═══pricing anchor for alumni    ││ │          ││
│ Rsrch br. ││ ring is 3k eur/mo for 6 mo═══   ││ │ 1 change ││
│           ││ ### Point C  (locked)           ││ │ pending  ││
│           ││                                 ││ │          ││
│           ││                                 ││ │ [Save]   ││
│           ││                                 ││ │ [Cancel] ││
│           ││                                 ││ └──────────┘│
│           ││                                 ││ ┌edit log ─┐│
│           ││                                 ││ │ (empty)  ││
│           ││                                 ││ └──────────┘│
└───────────┘└─────────────────────────────────┘└─────────────┘
```

Caret active only inside Point B content. Heading `### Point B` locked. Change counter shows 1 pending edit. Save commits; Cancel reverts.

### Step 11 — Save, edit log appends row

```
┌ Signed    ┐┌─────────── doc body ───────────┐┌─ inspector ─┐
│ Strategy  ││ ### Point B                     ││ ┌Delivered─┐│
│  Point A  ││ ═══pricing anchor for alumni═══ ││ │ share URL││
│  Point B  ││ ring is 3k eur/mo for 6 months  ││ │ [copy]   ││
│  Point C  ││                                 ││ │ [Patch]  ││
│           ││                                 ││ └──────────┘│
│           ││                                 ││ ┌edit log ─┐│
│           ││                                 ││ │ 2026-04- ││
│           ││                                 ││ │ 23 14:02 ││
│           ││                                 ││ │ Point B  ││
│           ││                                 ││ │ ·before: ││
│           ││                                 ││ │ "pricign ││
│           ││                                 ││ │  anchor" ││
│           ││                                 ││ │ ·after:  ││
│           ││                                 ││ │ "pricing ││
│           ││                                 ││ │  anchor" ││
│           ││                                 ││ └──────────┘│
└───────────┘└─────────────────────────────────┘└─────────────┘
```

Edit-log entry shape: timestamp (date + HH:MM local), subsection slug, before-snippet (first differing ~20 chars), after-snippet (same window). Snippet is diff-centered, not whole-paragraph — keeps log readable. Signoff stats untouched (revs count is frozen at sign; patch is not a rev). Review loop never reopens.

## Component trees

Two trees. Working state with two research runs (step 4-5) and delivered state during patch (step 10).

### Working layout — two research runs + review state

```json
{
  "app[data-view=\"doc\"]": {
    "sidebar": [
      "sidebar__header",
      {
        "sidebar__nav#toc": [
          "toc__indicator",
          { "nav-group#brief": ["t-subtitle", "nav-group__items"] },
          { "nav-group#research-1": ["t-subtitle", "nav-group__items"] },
          { "nav-group#research-2": ["t-subtitle", "nav-group__items"] },
          { "nav-group#strategy": ["t-subtitle", "nav-group__items"] },
          { "nav-group#signoff": ["t-subtitle", "nav-group__items"] }
        ]
      },
      "sidebar__footer"
    ],
    "doc#doc": [
      "t-hero",
      {
        "doc__section#brief": [
          "t-display",
          { "card": [{ "field.field--row": ["field__label", "field__input"] }, "field", "field", "switch"] },
          { "card": ["t-caption", "button"] }
        ]
      },
      {
        "doc__section#research-1": [
          "t-display",
          { "card": [{ "doc__spec": ["doc__spec-row", "doc__spec-row", "doc__spec-row"] }] },
          { "card": ["t-caption", "button", "button"] }
        ]
      },
      {
        "doc__section#research-2": [
          "t-display",
          { "card": [{ "doc__spec": ["doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row"] }] },
          { "card": ["t-caption", "button", "button"] }
        ]
      },
      {
        "doc__section#strategy": [
          "t-display",
          { "doc__section#point-a": ["t-display", "t-body"] },
          { "doc__section#point-b": ["t-display", "t-body"] },
          { "doc__section#point-c": ["t-display", "t-body"] },
          { "card": ["t-caption", "button"] }
        ]
      },
      {
        "card.card--shout#signoff": [
          "card__heading",
          { "doc__signoff-stats": ["stat", "stat", "stat"] },
          "t-body",
          "button.button--primary"
        ]
      }
    ],
    "inspector": [
      { "inspector__group": [{ "card#stages": ["card__heading", { "doc__spec": ["doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row"] }] }] },
      { "inspector__group": [{ "card#future-reserved": ["card__heading", "t-caption"] }] },
      {
        "comment-stack": [
          { "card.card--interactive.comment-thread#thread-point-a": ["card__heading", "card__collapsible", "comment-msg", "comment-msg"] },
          { "card.card--interactive.comment-thread#thread-point-b-1": ["card__heading", "card__collapsible", "comment-msg"] },
          { "card.card--interactive.comment-thread#thread-point-b-2": ["card__heading", "card__collapsible", "comment-msg"] }
        ]
      }
    ]
  }
}
```

### Delivered layout — patch mode active on Point B

```json
{
  "app[data-view=\"doc\"]": {
    "sidebar": [
      "sidebar__header",
      {
        "sidebar__nav#toc": [
          "toc__indicator",
          { "nav-group#strategy": ["t-subtitle", "nav-group__items"] },
          { "nav-group#research-brief": ["t-subtitle", "nav-group__items"] },
          { "nav-group#research": ["t-subtitle", "nav-group__items"] },
          { "nav-group#notes": ["t-subtitle", "nav-group__items"] },
          { "nav-group#way-of-work": ["t-subtitle", "nav-group__items"] },
          { "nav-group#next-steps": ["t-subtitle", "nav-group__items"] }
        ]
      },
      "sidebar__footer"
    ],
    "doc#doc": [
      {
        "card#signed-title": [
          "card__heading",
          { "doc__signoff-stats": ["stat", "stat"] },
          "doc__signoff-signature"
        ]
      },
      {
        "doc__section#strategy": [
          "t-display",
          { "doc__section#point-a": ["t-display", "t-body"] },
          { "doc__section#point-b": ["t-display", "t-body"] },
          { "doc__section#point-c": ["t-display", "t-body"] }
        ]
      },
      { "doc__section#research-brief": ["t-display", { "card": [{ "doc__spec": ["doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row"] }] }] },
      { "doc__section#research": ["t-display", { "card": [{ "doc__spec": ["doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row"] }] }] },
      { "doc__section#notes": ["t-display", "t-body"] },
      { "doc__section#way-of-work": ["t-display", "t-body"] },
      { "doc__section#next-steps": ["t-display", "t-body"] }
    ],
    "inspector": [
      { "inspector__group": [{ "card#delivered-status": ["card__heading", "t-caption", "button", "button"] }] },
      { "inspector__group": [{ "card.card--interactive.card--shout#patch-active": ["card__heading", "card__collapsible", "t-caption", "button.button--primary", "button"] }] },
      { "inspector__group": [{ "card#edit-log": ["card__heading", { "doc__spec": ["doc__spec-row"] }] }] }
    ]
  }
}
```

Patch-active card takes `card--shout` because it is the single loudest action in the column while editing. Reverts to plain static status card after Save.

## Appetite

A week. The resort motion + patch-edit bounds are the heavy lifts. Multi-research accumulation is cheap (repeat a section pattern). Source prune + undo chip is cheap. Consolidation dedup is the tricky bit — budgeting it explicitly.

## Rabbit holes

### §A — Consolidation logic

Dedup key. URL-match is obvious. Edge cases that eat scope:

- Same source, two URLs (e.g. `medium.com/@x/foo` vs `x.medium.com/foo`). Canonicaliser needed or dedup misses.
- Same author, two pieces. Must NOT dedup — they are different sources.
- One source pruned in run 1, re-appears in run 2 unpruned. Does the prune carry? **Concept 3 says no** — prune is per-run. If run 2 surfaces the same URL and operator did not prune it there, it ships. Operator can re-prune before signing.
- Order in delivered. Run-order (all run 1 first, then run 2) keeps the audit story; chronological by publish date reads better for clients. **Concept 3 picks run-order** — faster to build, audit-honest. Reorder is a future-version rabbit hole.
- Renumbering. Client sees 1..N; internal run identity dropped. Accept that the signed artefact loses audit provenance unless operator keeps the working doc accessible. **Not solved in this session.**

### §B — Patch-edit bounds

What is patchable after sign:

- IN scope: any `### subsection` body text inside `## Strategy`, `## Additional notes`, `## Way of work`, `## Next steps`.
- OUT of scope forever: signed title block, signoff stats, signature glyph, section titles themselves (add/remove/rename), `## Research`, `## Research brief`, section order.

Why these bounds: signed stats + signature are the trust contract. Research section is the audit trail — mutating it post-sign turns the doc into a lie. Section rename/reorder is a structural change, not a typo fix — those route back to review.

Escape hatch: if operator needs a structural change post-sign, explicit affordance says `[Open new revision]` — creates a new doc under `rev 2`, preserves rev 1 in full. Not built this session but called out so the patch path does not creep.

### §C — Undo chip lifetime

10s feels right in spec but the number is arbitrary. Too short and operators panic-click; too long and chip clutter. Bump to 30s if user testing shows panic. Not a design decision — a tuning decision. Flag for stage 8.

### §D — Run identity in sidebar

Sidebar shows `Research 1`, `Research 2` in working state — operator needs to navigate between runs. In delivered, one `Research` entry only. Scroll-spy has to handle the relabel without breaking. Kit's `nav-group` supports this; worth a smoke test at stage 8.

### §E — Concurrent running of two research runs

Does operator fire run 2 while run 1 is still running? Current concept says no — only one `### running` allowed at a time, second click disabled until first settles. Future-version may allow parallel but the UI cost (two spinners, two streams) is not worth it this session.

## No-gos

- No diffing tool inside patch mode. Operator sees a plain caret and text; before/after captured at save time, not shown mid-edit.
- No thread-reopen on patched subsection. Threads closed at sign stay closed. If operator needs review, they use `[Open new revision]`.
- No source-level edit (fix a misspelled source title post-sign). Research section is frozen.
- No multi-subsection patch in one session. One at a time, Save between. Keeps the edit log atomic.
- No rollback of a patch from inside the log. Log is append-only history. If operator needs to revert, they patch again.
- No invented components. All of this resolves to kit inventory: Card (static + interactive + shout), Field, Button, Typography, Comment, Signoff, Spec list, Nav, Switch, Three-columns pattern.

## Gate

Pending. Human picks one of three concepts. Others archive.

## Hand-off

If chosen: spawn `kk-role-designer-conservative`, `kk-role-designer-ux`, `kk-role-designer-revolutionary` in parallel on this file. Each reads `03-concept-3.md` and produces a hand-off at stages 4, 5, 6.
