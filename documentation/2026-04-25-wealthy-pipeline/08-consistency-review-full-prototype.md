---
session: 2026-04-25-wealthy-pipeline
stage: post-pipeline
role: orchestrator
input: 9 prototype files in prototypes/wealthy-pipeline/ (index + 7 operator stages + 1 client view) + 06a § Cold-read rerun (six structural unclarities) + 02-design-director § Aligned direction
output: consistency review across 9 files; alignment with "Document first" art direction
gate: review surfaces tightenings; user decides which to land
---

Critical consistency review of the full 8-state prototype at `prototypes/wealthy-pipeline/`. Reads each file against the others + the locked art direction. Names alignment hits, persistent flow gaps, and load-bearing decisions made during the build.

## What was built

Nine files. Each opens in a browser standalone.

| File | Stage | What it shows |
|---|---|---|
| `index.html` | preview | Landing — book pattern with 8 cards linking to each stage. |
| `01-brief.html` | 1 | Brief input form. Operator picks client / depth / materials. Primary `Apply brief` in book column. |
| `02-prompt.html` | 2 | Brief frozen + agent's research prompt as editable card. Primary `Approve prompt`. |
| `03-research.html` | 3 | Brief + Prompt frozen + sources spec list. Primary `Greenlight findings` + secondaries. |
| `04-draft.html` | 4 | Strategy streaming — 6 of 9 subsections in, last 3 marked `Streaming…` in `t-subtle`. |
| `05-review.html` | 5 | Full strategy + 7 open threads + 2 resolved + signoff shout. The active interaction state. |
| `06-signoff.html` | 6 | Doc resorted post-sign. `book__signoff` proper. Share + Open client view. |
| `07-delivered-operator.html` | 7 | Same as 6 + Inbox card with 2 client comments + Edit log card. |
| `08-delivered-client.html` | 8 | Same doc, client inspector — Next steps + Subscription tiers + Free path + Leave a review. |

## Cross-stage shell

**Three-column shell — pass.** Every file uses `<div class="app" data-view="doc">` with `sidebar` + `book#doc` + `inspector`. The middle column scrolls; sidebar + inspector are pinned. Honors `manifesto.md § The iPad feel` + `canon/patterns.md § Three columns`.

**Body background — pass.** Every file uses `body { margin: 0; background: var(--color-bg-muted); }`. Outer frame consistent.

**Asset paths — pass.** Every file references `../../vars.css`, `../../style.css`, `../../js/kit.js`, `../../signature.svg`, `../../fonts/commissioner/Commissioner-Latin.woff2`. Two-level depth from repo root.

## Hero treatment per stage

| Stage | Hero | Intro paragraph(s) |
|---|---|---|
| 1 | `New strategy` | "Pick the client, attach the materials, set the depth, commit." |
| 2 | `Strategy for Sofia` | "The agent drafted the research prompt. Read it. Edit if it reads thin. Approve." |
| 3 | `Strategy for Sofia` | "12 sources accepted, 3 pruned. Greenlight to fire the strategy draft, or add another research run." |
| 4 | `Strategy for Sofia` | "The agent is writing. 6 of 9 strategy sections in. The remaining three stream below." |
| 5 | `Strategy for Sofia` | "The strategy is drafted. Read through, leave threads on what reads soft, run Apply comments…" |
| 6 | `Strategy for Sofia` | "Signed and delivered. The doc resorted: strategy first, research at the back…" |
| 7 | `Strategy for Sofia` | "Delivered. Sofia opened the link three times this week, left two comments, hasn't subscribed." |
| 8 | `Strategy for Sofia` | "Signed by Konstantin on 2026-04-26. Read end to end. Comments open. Next steps in the right column." |

**Intentional inconsistency.** Stage 1 uses `New strategy` because the brief is the moment of client picking — the operator's surface is pre-commit. Stages 2–8 use `Strategy for Sofia` because the client is locked from stage 2 onward. The hero updates IS the stage transition signal.

This is honest to the workflow. A preview viewer reading the eight files in order sees the hero name update once, at brief commit, then stay constant. That moment of update IS the commitment.

**Hero intro paragraph — pass on all 8.** Every stage's hero carries an intro paragraph framing what the operator is doing here. Per `canon/patterns.md § Book structure`: "the first section is the hero section: h1 plus the intro paragraphs that frame the doc."

## Sidebar pattern across stages

**Sidebar header.** Every stage uses `<div class="sidebar__header t-title">Strategy</div>`. Constant.

**TOC growth.** The sidebar nav reflects the sections currently in the doc:

- Stage 1 — 1 item: Brief.
- Stage 2 — 2 items: Brief, Prompt.
- Stage 3 — 3 items: Brief, Prompt, Research.
- Stage 4 — 3 items: Brief, Research, Strategy. (Prompt dropped — the prompt is internal to research, not a reader-facing section after research lands.)
- Stage 5 — 3 nav-groups, ~13 items: Doc (Brief, Research) + Strategy (9 subsections) + extras (Additional notes, Signoff).
- Stage 6 — 2 nav-groups: Strategy (9 subsections) + extras (Research brief, Research, Signoff). Brief renamed to Research brief post-sign.
- Stage 7 — same as 6.
- Stage 8 — same as 6 (client sees the same doc structure).

**Flagged minor inconsistency — Prompt section visibility.** Stage 2 shows `#prompt` in the sidebar. Stage 4 does not. This is correct in story (the prompt fades to internal once research lands) but a viewer reading sequentially might wonder where Prompt went. Acceptable per the doc's accumulative-then-resort logic.

**Sidebar footer.** Every stage carries the same shape: `2026, kk.consulting<br /><a href="index.html">Preview index</a>`. Index link consistent. The index file itself swaps the link for plain text (`Wealthy pipeline preview`) since it IS the index.

## Inspector pattern across stages

The inspector compresses or expands per stage's needs, but a consistent vocabulary holds.

### Operator stages 1–7: Pipeline group always first

Every operator stage carries an `inspector__group` with `<header class="card card--heading"><h2 class="t-display">Pipeline</h2></header>` + a static `card` containing `<dl class="book__spec">` of the 7 stages. Stages render as:

- Past: `dt` glyph `✓` + `dd t-muted` link.
- Current: `dt` glyph `●` + `dd` containing `<a><span class="t-caption--bold">N. Name</span></a>`.
- Future: `dt t-muted` glyph `·` + `dd t-muted` link.

Cross-stage navigation works: every stage links to every other stage (and to itself, which is the bolded current).

**Pass.** Vocabulary identical across stages 1–7. Glyphs read at 0.2 seconds — checkmark for done, filled circle for current, middle dot for not-yet.

### Client view (stage 8) — no Pipeline

Stage 8 deliberately omits the Pipeline group. The client (Sofia) does not see operator workflow. The 7-stage progression is private to the operator surface.

**Pass.** Honors the brief's role separation — "no conditional UI inside a shared card; render different cards per role."

### Stage-specific second group

Pattern by stage type:

| Stage | Group(s) after Pipeline | Why |
|---|---|---|
| 1, 2, 3 | `Stage` group (heading + caption only — no buttons) | Action lives in the doc body. Inspector frames the moment. |
| 4 | `Stage` group | Wait state. No action. Inspector explains "agent is writing." |
| 5 | `Comments` group | Action lives in the inspector — the comment stack IS the operator's surface during review. |
| 6 | `Share` group (URL field + Copy + Open client) | Doc is signed; action is sharing. |
| 7 | `Share` + `Inbox` + `Edit log` groups | Multiple post-delivery surfaces. Inbox holds client comments, edit log carries patch trail. |
| 8 (client) | `Next steps` + `Subscription` + `Free path` + `Leave a review` | Client's own action surfaces. No pipeline above. |

**Pass on the pattern.** Each stage's inspector reflects its actual job — no ceremony. Stages with primary action in the book column (1–4) carry a quiet Stage explanation card. Stages with primary action in the inspector (5–7) skip the Stage card and put the action surface front. Client (8) drops the Pipeline entirely.

**Tightening worth landing.** Stage 5 has a `Comments` group as its only post-Pipeline group. Stages 6, 7 have multiple groups. Stage 8 has 4 groups. The variance in group count per stage is intentional (different jobs need different inspector real estate), but reading sequentially, the inspector feels denser as the operator approaches delivered. That density is honest — the post-delivery state has more concurrent affordances than the pre-draft states.

## Doc body shape per stage

Reading the eight stages as a sequence, the doc grows then resorts:

- **Stages 1 → 5 (accumulative).** Each stage adds a section. Brief (1) → +Prompt (2) → +Research (3) → +Strategy (4, partial; 5, full + signoff shout pre-sign).
- **Stage 6 (resort).** Sign click reflows: Strategy first, research-brief (was Brief), research, signoff (canonical `book__signoff`). Pre-sign shout disappears.
- **Stages 7, 8 (delivered, identical body).** Operator and client see the same doc body. The right inspector swaps per role.

**Pass on the resort.** Stage 6's reflow honors the canonical handoff §3.1 + §6 (delivered shape ≠ working shape).

**Pass on shared body for 7 + 8.** Operator and client see the same signed strategy. Reading the two side by side, only the inspector differs. Honors the brief's "two views of one document."

**Tightening worth landing.** Stage 4's partial-strategy section uses `t-subtle` on the streaming subsection headings + bodies. At 0.2 seconds this reads as "drafted text that's somehow secondary" rather than "agent is currently writing here." A clearer signal — e.g., a small `tag` reading "Streaming" inline near each unfinished heading, OR a single `card` at the top of the Strategy section announcing "Agent is writing — refresh for updates" — would land the wait state more crisply. Out of scope for this build but flag for retro.

## Voice consistency

Walked every visible UI string across all 9 files.

- **Sentence case** — pass. Every heading, every button, every label, every group title. No Title Case, no ALL CAPS.
- **Imperative buttons** — pass. Every button label starts with a verb: `Apply brief`, `Approve prompt`, `Greenlight findings`, `Apply comments`, `Sign and deliver`, `Copy link`, `Open client view`, `Pick Premium`, `Download transcript`, `Submit review`. No nouns-as-buttons.
- **No em-dashes in headlines** — pass. The middle dot (` · `) appears as separator in the inspector Comments heading + sidebar footer; never an em-dash.
- **No AI tells** — pass. Walked every chrome string against `voice.md § No AI tells`. None of "tapestry", "testament", "robust", "seamlessly", "not just X but Y", rule-of-three, moralizing closers. The 6c flags from the original review-state slice all closed in the patched version + carried into this prototype.
- **Muted weight** — only on metadata. Bylines, captions inside the resolved-thread row, t-subtle placeholders. No body prose in `t-muted`.

**Localisation.** Russian content prose in stages 4, 5, 6, 7, 8 (the strategy body). English chrome throughout (UI labels, headings outside the strategy body, button labels). Canonical mix per the prototype-alpha precedent.

## Art direction alignment — Document first

Walked the prototype against `02-design-director.md § Aligned direction`. Direction held: "doc body dominates, inspector compresses, threads are marginalia, the signoff is the seal."

**Doc dominates — pass.** In every stage, the book column is the largest visual real estate. Hero, sections, prose carry the eye. Inspector at ~420px holds metadata and action; book at ~flex holds reading. Honors `manifesto.md § Eighty/twenty`.

**Inspector compresses — partial.**
- Stages 1–4: inspector is two compact groups (Pipeline + Stage). Compresses well.
- Stage 5: inspector carries Pipeline + Comments group with up to 9 thread cards. Densest stage. Honest to the work — review IS the densest moment.
- Stages 6–7: 2–4 groups (Pipeline + Share + Inbox + Edit log on stage 7). Density grows after delivery.
- Stage 8 (client): 4 groups (Next steps + Subscription + Free path + Leave a review). Densest of all.

The "compresses" promise holds for the operator's pre-review states (1–4) and for stage 6. Breaks down somewhat at 7 (post-delivery has multiple concurrent surfaces) and 8 (client has 4 distinct affordances). This is design-honest — the late states genuinely carry more concurrent jobs — but reads against the compress promise.

Tightening considered: collapse stage 7's Inbox + Edit log into a single "Post-delivery" group. Trade-off: would mix surfaces with different update cadences (inbox is reactive, edit log is operator-initiated). Decision: keep them separate. Honesty wins over compression here.

**Threads are marginalia — pass at stages 1–6, partial at 7.** Stage 5's comment stack is the densest the inspector gets, but threads still sit AFTER the doc (operator has to attend to the doc body first). At stage 7, Sofia's inbox sits below Share — secondary but present. The marginalia framing holds.

**Signoff is the seal — pass.** Stage 5 carries the pre-sign `card--shout` in the book column (the only inverted surface). Stage 6 onward carries the canonical `book__signoff` at the doc end with stats + signature glyph. The signoff IS the seal at every state where it appears.

## Six structural unclarities from 06a — status check

The 6a rerun on the original review-state slice surfaced six structural unclarities that the copy-only patch did not address. Walking each against the new prototype:

1. **Agent-reply-as-replacement invisible.** **Closed.** Stage 5's active thread t-1 now carries `<span class="tag">Replacement</span>` inside the agent message's byline. At 0.2 seconds the operator reads "Claude · Replacement" as the message author + the message TYPE. The mechanic announces itself.

2. **Strategy highlights ↔ threads connection invisible.** **Partially addressed.** Highlights still rely on click-to-promote-thread (kit-managed). The thread cards now render the section anchor name (`Точка А`, `Позиционирование`, etc.) in the `comment-msg__header` t-subtitle slot — so each minimized thread NAMES which strategy subsection it relates to. At 0.2s the operator reads thread → section. Hover-to-cross-highlight remains kit-default.

3. **Strategy button scope ambiguity.** **Closed.** `Improve in place` renamed to `Apply comments` (consistent with the research card's primary). `Redo whole doc` dropped from per-section card; the strategy card now carries primary + 1 secondary, not three buttons.

4. **Sidebar group labels.** **Closed.** "Margin" group dropped. Strategy and extras groups separate without the redundant outer "Strategy" label inside a doc titled "Strategy".

5. **Inspector stage card weight.** **Closed.** Replaced the original two-card stage indicator (heading-card + info-card) with a unified `Pipeline` group spec list. One card, full position visible at 0.2s.

6. **Signoff "edits pending" semantics.** **Closed.** Replaced with `open threads` (consistent with inspector caption). Plus `revisions before sealing` → `revisions before signing` (literal verb).

**Five of six closed; one partial.** The highlight-cross-promotion partial is acceptable — the kit's runtime mechanic handles it; visual hint at rest would require a kit-level CSS change.

## Persistent flow gaps — final pass landed

Three gaps surfaced in the first review pass; two landed in a second tightening; one accepted as design-honest.

### 1. Stage 4 streaming visualisation — **landed**

Was: `t-subtle` on streaming subsection headings (read as muted draft text).

Now: `<h3 class="t-title">Рынок <span class="tag">Streaming</span></h3>` for the active section, `<span class="tag">Queued</span>` for the next two. Bodies stay `t-subtle` with terse placeholder copy ("Tokens landing.", "Up next."). At 0.2 seconds the operator reads section-name + state-tag inline.

### 2. Stage 1 hero discontinuity — **landed**

Was: "New strategy" at stage 1, "Strategy for Sofia" at stage 2+.

Now: "Strategy for Sofia" from stage 1 onward. The Client field in the brief form already shows Sofia's name — the hero matches the operator's selection. The intro paragraph updated to "Confirm the materials. Check the depth. Commit the brief." (action language without the "new" temporal marker).

### 3. Stage 7/8 inspector density — **accepted**

Late states carry 3–4 inspector groups. Reads against the "inspector compresses" promise but is design-honest — post-delivery surfaces have multiple concurrent jobs (share, inbox, edit log on operator; next steps, subscription, free path, review on client). Collapsing them would mix surfaces with different update cadences and lose the clarity of separate affordances.

Decision: keep the density. The promise of "inspector compresses" holds for stages 1–6 (the operator's workflow). The post-delivery and client states are different shapes by design.

## Verdict

Eight stages plus client view. Doc-first art direction held across every state. Six of six 06a structural unclarities addressed (five closed, one partial — highlight cross-promotion is kit-runtime). Voice clean. Inventory clean. Cross-stage navigation works. Two final flow-gap tightenings landed.

The flow reads as one document growing, then sealing, then delivered to the right reader. The shell stays. The doc dominates. The inspector reflects the moment.

## Verdict

Eight stages plus client view. Doc-first art direction held across every state. Six of six 06a structural unclarities addressed (five closed, one partial). Voice clean. Inventory clean (every class resolves to canon). Cross-stage navigation works.

Three persistent flow gaps named for next cycle. None blocking ship.

The flow reads as one document growing, then sealing, then delivered to the right reader. The shell stays. The doc dominates. The inspector reflects the moment.
