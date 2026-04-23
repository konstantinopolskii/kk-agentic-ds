---
session: 2026-04-22-wealthy-operator-alpha
stage: 3
role: concept
input: documentation/2026-04-22-wealthy-operator-alpha/02-art-director.md (Chosen direction — Signed workshop)
output: happy-path concept — clean run, single research, 0-2 threads, one redo, sign + resort to delivered
gate: pending — human picks one of three concepts
---

# Concept 1 — Happy-path walkthrough

Stage-3 concept #1 on Signed workshop direction. Scenario: operator walks brief → research → strategy → sign cleanly, single research run, minimal thread activity, one small redo, confident pass to delivered.

## Raw input

> Your assigned scenario: HAPPY-PATH WALKTHROUGH.
> Operator walks brief → research → strategy → sign cleanly. Light thread activity (0-2 total). Single research run, no prune. Minimal redo (maybe one "Redo draft with notes" on a small section). Operator's experience is fast and confident. Show the surface reading at each of the seven backend stages in the happiest case.

Prior stage output: `documentation/2026-04-22-wealthy-operator-alpha/02-art-director.md` — Signed workshop direction with working-layout spec, delivered-layout spec, control-block mechanic, stages card + future-reserved inspector block, signoff shout.

## Fat marker problem

Operator runs a clean strategy in under an hour. Every stage the doc visibly grows, inspector stages card ticks forward, signoff steps fill bottom-up. Operator never asks "where am I" or "what's next".

## ASCII flows

Seven steps, one per backend stage. Three columns kit-canonical throughout. `═══` marks highlight. `●` marks current stage. `✓` marks past. `·` marks future.

### Step 1 — Brief

Doc body is just title + brief input card + empty signoff shout. Inspector stages card shows Brief current. Operator fills inputs — transcription picker, CV attach, mentor notes, depth switch. No signoff steps satisfied yet.

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

Surface reading: "Tell me about the mentee. Nothing else exists yet."

### Step 2 — Research brief (agent drafts research prompt)

Brief card collapses to summary row with `[Edit brief]`. Agent drafts research prompt. New `## Research brief` section lands in doc body above research slot. Control block beneath: `0 threads · [Redo research brief]`. Stages card advances. Signoff step 1 goes from "Run research" to "1. Commit research brief" (unsatisfied).

```
+- sidebar ----+-------- doc body --------------------+- inspector ------+
| Brief      ✓ |                                      | + Stages -------+|
| Rsrch brief● | <t-hero> Strategy for Sofia          | | Brief       ✓ ||
| Research   · |                                      | | Rsrch brief ● ||
| Strategy   · | ## Brief (collapsed)                 | | Research    · ||
| Notes      · | +- card ---------------------------+ | | Strategy    · ||
| Signoff    · | | Sofia · deep · Nelli call · CV   | | | Notes       · ||
|              | | [Edit brief]                     | | | Signoff     · ||
|              | +----------------------------------+ | | Delivered   · ||
|              |                                      | +----------------+|
|              | ## Research brief                    | + future --------+|
|              | <t-body> ═══ Investigate Sofia's ═══ | | …              ||
|              | ═══ founder arc: prior exits, ═══    | +----------------+|
|              | ═══ signal themes, market beats. ═══ |                   |
|              | +- card --------------------------+  |                   |
|              | | 0 threads · [Redo brief]         | |                   |
|              | +----------------------------------+ |                   |
|              |                                      |                   |
|              | ## Signoff  (shout, pending)         |                   |
|              | 0 revs · 0 hits                      |                   |
|              | Steps: 1. Commit rsrch brief ●       |                   |
|              |        2. Run research               |                   |
|              |        3. Draft strategy             |                   |
|              |        4. Read + [Sign] (disabled)   |                   |
+--------------+--------------------------------------+-------------------+
```

Operator reads, accepts as-is (happy path). No thread opened.

### Step 3 — Research (single run, no prune)

Agent runs research. `## Research 1` section lands with source list. Happy-path operator glances, keeps all. Control block: `0 threads · [Redo research]`. Stages card: Research current. Signoff step 2 clears.

```
+- sidebar ----+-------- doc body --------------------+- inspector ------+
| Brief      ✓ | ## Brief  (collapsed)                | + Stages -------+|
| Rsrch brief✓ | ## Research brief  (collapsed)       | | Brief       ✓ ||
| Research   ● |                                      | | Rsrch brief ✓ ||
| Strategy   · | ## Research 1                        | | Research    ● ||
| Notes      · | · source 1  — yc founder profile     | | Strategy    · ||
| Signoff    · | · source 2  — exit archive 2021      | | Notes       · ||
|              | · source 3  — founder podcast s4e12  | | Signoff     · ||
|              | · source 4  — market map 2025 q4     | | Delivered   · ||
|              | · source 5  — sofia's public notes   | +----------------+|
|              | · source 6  — mentor thread archive  | + future --------+|
|              | · source 7  — pricing precedents     |                   |
|              | · source 8  — 3 more sources         |                   |
|              | +- card --------------------------+  |                   |
|              | | 0 threads · [Redo research]      | |                   |
|              | +----------------------------------+ |                   |
|              |                                      |                   |
|              | ## Signoff  (shout, pending)         |                   |
|              | 1 rev · 11 hits                      |                   |
|              | Steps: 1. ✓ Commit rsrch brief       |                   |
|              |        2. ✓ Run research             |                   |
|              |        3. Draft strategy ●           |                   |
|              |        4. Read + [Sign] (disabled)   |                   |
+--------------+--------------------------------------+-------------------+
```

Reading: sources land, none pruned, counter ticks.

### Step 4 — Draft (strategy streams in)

Agent writes `## Strategy` with prototype-alpha Russian subsection inventory. Streams section by section. Control block appears live under the section. Stages card: Strategy current. Signoff step 3 satisfies as last subsection lands.

```
+- sidebar ----+-------- doc body --------------------+- inspector ------+
| Brief      ✓ | ## Brief  (collapsed)                | + Stages -------+|
| Rsrch brief✓ | ## Research brief  (collapsed)       | | Brief       ✓ ||
| Research   ✓ | ## Research 1  (collapsed)           | | Rsrch brief ✓ ||
| Strategy   ● |                                      | | Research    ✓ ||
|  Обсудили    | ## Strategy                          | | Strategy    ● ||
|  Точка А     | ### Что обсудили                     | | Notes       · ||
|  Точка Б     | <t-body> ═══Sofia's first═══         | | Signoff     · ||
|  Видение     | ═══months as founder═══ text…        | | Delivered   · ||
|  Позицион-е  |                                      | +----------------+|
|  Гипотезы    | ### Точка А                          | + future --------+|
|  Рынок       | <t-body> ═══text═══                  | | …              ||
|  Шаги        | ### Точка Б                          | +----------------+|
|  Как работ-м | <t-body> ═══text═══                  |                   |
| Notes      · | ### Видение + бизнес-модель          |                   |
| Signoff    · | <t-body> ═══text═══ (streaming…)     |                   |
|              |                                      |                   |
|              | +- card --------------------------+  |                   |
|              | | 0 threads · [Redo draft]         | |                   |
|              | +----------------------------------+ |                   |
|              |                                      |                   |
|              | ## Signoff  (shout, pending)         |                   |
|              | 1 rev · 11 hits · 0 edits pending    |                   |
|              | Steps: 1. ✓  2. ✓                     |                   |
|              |        3. Draft strategy ●           |                   |
|              |        4. Read + [Sign] (disabled)   |                   |
+--------------+--------------------------------------+-------------------+
```

Surface reading: doc visibly fattens. Sidebar TOC grows subsection rows.

### Step 5 — Review (operator reads, opens one thread, runs one local redo)

Draft done. Operator reads top-down. On `### Позиционирование`, opens one thread ("sharpen verb"). Thread pins in inspector stack. Control block under Strategy updates: `1 thread · [Redo draft with notes]`. Operator clicks it → only that subsection redraws (agent targets the threaded subsection because note exists). Thread auto-resolves on operator's ack.

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

Surface reading: one thread, one redo on one subsection, sign button lights up. Final read-through is the last gate — guidance, not hard block.

### Step 6 — Signoff (moment of sign)

Operator clicks [Sign]. Doc resorts: signoff shout collapses to signed title block and flies to top. Sections reorder per delivered layout. Animation implied — sections slide to new positions, research-brief renames, research runs consolidate, control blocks evaporate, sidebar TOC relabels.

```
+- sidebar ----+-------- doc body --------------------+- inspector ------+
|  (relabeling)| <t-hero> Strategy for Sofia          | + Stages -------+|
|    ↓         | +- card (Signed, flying up) ------+  | | Brief       ✓ ||
| Strategy   ✓ | | Strategy for Sofia               |  | | Rsrch brief ✓ ||
| Rsrch brief✓ | | by Konstantin · 2026-04-22       |  | | Research    ✓ ||
| Research   ✓ | | 2 revs · 11 hits · 0 pending     |  | | Strategy    ✓ ||
| Notes      · | | [signature glyph]                |  | | Notes       ✓ ||
| Way of w.  · | +----------------------------------+  | | Signoff     ✓ ||
| Next steps · |                                      | | Delivered   ● ||
|              | ## Strategy     (sliding up)         | +----------------+|
|              | ## Research brief (slides down,      | + future --------+|
|              |   renamed from "Brief")              | | (dormant)      ||
|              | ## Research  (consolidating runs)    | +----------------+|
|              | ## Additional notes                  |                   |
|              | ## Way of work (new, from strategy   |                   |
|              |   "Как мы работаем" subsection)      |                   |
|              | ## Next steps (new, from strategy    |                   |
|              |   "Ближайшие шаги" subsection)       |                   |
|              |                                      |                   |
|              | (control blocks fading out)          |                   |
+--------------+--------------------------------------+-------------------+
```

Surface reading: sign click is the dramatic moment. The doc rearranges itself in front of the operator — working artefact becomes delivered artefact without navigation. One doc, two layouts, one animation.

### Step 7 — Delivered (clean read-only)

Post-resort steady state. Signed title block anchors top. Strategy first. No control blocks, no signoff shout, no brief input card. Inspector stages card shows Delivered current; future-reserved slot swaps to delivered-status card (share URL + copy + patch); thread stack dormant (all threads resolved).

```
+- sidebar ----+-------- doc body --------------------+- inspector ------+
| Strategy   ● | +- card (Signed title block) ------+ | + Stages -------+|
|  Что обсуд.  | | Strategy for Sofia                | | | Brief       ✓ ||
|  Точка А     | | by Konstantin · 2026-04-22        | | | Rsrch brief ✓ ||
|  Точка Б     | | 2 revs · 11 hits · 0 pending      | | | Research    ✓ ||
|  Видение     | | [signature glyph]                 | | | Strategy    ✓ ||
|  Позицион-е  | +-----------------------------------+ | | Notes       ✓ ||
|  Гипотезы    |                                      | | Signoff     ✓ ||
|  Рынок       | ## Strategy                          | | Delivered   ● ||
| Rsrch brief  | ### Что обсудили                     | +----------------+|
| Research     | ### Точка А                          | + Delivered ----+|
| Notes        | ### Точка Б                          | | share URL      ||
| Way of work  | ### Видение + бизнес-модель          | | [Copy]         ||
| Next steps   | ### Позиционирование                 | | [Patch]        ||
|              | ### Гипотезы + каналы                | +----------------+|
|              | ### Рынок                            | + Edit log -----+|
|              |                                      | | (none)         ||
|              | ## Research brief                    | +----------------+|
|              | [former Brief, renamed]              |                   |
|              |                                      |                   |
|              | ## Research                          |                   |
|              | · source 1 … · source 11             |                   |
|              | (consolidated, no run divisions)     |                   |
|              |                                      |                   |
|              | ## Additional notes                  |                   |
|              | ## Way of work                       |                   |
|              | ## Next steps                        |                   |
+--------------+--------------------------------------+-------------------+
```

Surface reading: read-only, quiet, client-shaped. Operator hands URL over. Done.

## Component trees

One tree per representative screen — working-review state (step 5) and delivered state (step 7). Block-level only, kit class names only.

### Working-review state (step 5)

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

### Delivered state (step 7)

```json
{
  "app[data-view=doc]": {
    "sidebar": ["sidebar__header", { "sidebar__nav": ["nav-group", "nav-group"] }, "sidebar__footer"],
    "doc#doc": [
      "t-hero",
      { "doc__section#signed-title": [
        { "card": ["card__heading", "doc__signoff-stats", "doc__signoff-signature"] }
      ]},
      { "doc__section#strategy": ["t-display", "t-display--medium", "t-body", "t-display--medium", "t-body", "t-display--medium", "t-body"] },
      { "doc__section#research-brief": ["t-display", "t-body"] },
      { "doc__section#research": ["t-display", "doc__spec"] },
      { "doc__section#additional-notes": ["t-display", "t-body"] },
      { "doc__section#way-of-work": ["t-display", "t-body"] },
      { "doc__section#next-steps": ["t-display", "t-body"] }
    ],
    "inspector": [
      { "inspector__group#stages": [{ "card": ["card__heading", "doc__spec"] }] },
      { "inspector__group#delivered": [{ "card": ["card__heading", "t-caption", "button", "button"] }] },
      { "inspector__group#edit-log": [{ "card": ["card__heading", "t-caption"] }] }
    ]
  }
}
```

Every class resolves against `components.md`: `t-*` typography utilities; `card` + `card--shout` + `card--interactive` variants; `card__heading` + `card__collapsible`; `button` + `button--primary`; `doc`, `doc__section`, `doc__spec`, `doc__signoff-stats`, `doc__signoff-signature`; `sidebar`, `sidebar__nav`, `nav-group`; `inspector`, `inspector__group`; `comment-thread`. No inventions.

## Appetite

**A week.** Working + delivered layouts + resort animation are the meat. Happy-path is the simplest of three scenarios — the week covers stage-8 review-state build plus enough resort-animation plumbing that sign feels earned. Shorter than a week skips the animation and the resort loses drama. A month over-engineers for edge cases this scenario explicitly defers.

## Rabbit holes

- **Resort animation choreography.** Sections sliding, renaming, consolidating, title-block flying — easy to spend days tuning. Constraint: one pass with kit transitions, no custom keyframes. If it reads rough, punt to stage-8 retro.
- **Sidebar relabel animation.** TOC rows rename ("Brief" → "Research brief") during resort. Tempting to cross-fade per row. Constraint: hard swap synced to doc-body resort endpoint.
- **Signoff steps as hard gates.** Art-director's spec says steps are guidance not gates. Happy path won't stress this, but a designer could misread and wire step-checking logic. Keep [Sign] enabled whenever draft exists.
- **Subsection-targeted redo.** "Redo draft with notes" firing only the threaded subsection is a nice touch but could balloon into per-subsection control blocks. Constraint: one control block per top-level section, agent reads thread anchors to decide scope.
- **Future-reserved inspector slot.** Spec says "agent summary + clarifying Qs — next version". Tempting to stub it. Constraint: render the slot as a labeled placeholder card, empty body, no logic.

## No-gos

- **No multi-run research UI.** Happy path is single run. Concepts 2 and 3 cover heavier cases.
- **No prune affordance in happy path.** Sources stay as agent delivered.
- **No reject-with-why thread flow.** One thread, auto-resolves on ack. Rich thread mechanics belong to concept 2.
- **No patch path.** Post-sign patch surfaces in inspector delivered card but happy path never clicks it. Concept 3 handles patch.
- **No stage-back-navigation.** Past stages in sidebar are read-only peek. No "return to brief" affordance.
- **No settings, no account, no share-permissions modal.** Share URL + copy + patch buttons render as flat affordances, no secondary flows.
- **No loading skeletons inside happy path.** Research and draft streams land as text; loading indicators are stage-8 detail, not concept-level.

## Gate

Pending — human picks one of three stage-3 concepts.

## Hand-off

On pick, three designers spawn in parallel on this file:
- `kk-role-designer-conservative` → `documentation/2026-04-22-wealthy-operator-alpha/04-conservative.md`
- `kk-role-designer-ux` → `documentation/2026-04-22-wealthy-operator-alpha/05-ux.md`
- `kk-role-designer-revolutionary` → `documentation/2026-04-22-wealthy-operator-alpha/06-revolutionary.md`

Stage-8 high-fidelity build still targets the review state (step 5 above) per art-director scope note.
