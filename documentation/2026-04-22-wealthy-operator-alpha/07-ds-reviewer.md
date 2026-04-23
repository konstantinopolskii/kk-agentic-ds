---
session: 2026-04-22-wealthy-operator-alpha
stage: 7
role: ds-reviewer
input: documentation/2026-04-22-wealthy-operator-alpha/{04-conservative,05-ux,06-revolutionary,06-revolutionary-manifest-diff}.md
output: comparative review of three hand-offs plus separate evaluation of the unanchored-steering-note diff
gate: pending — human picks one hand-off and accepts or rejects the diff
---

# DS review — 2026-04-22-wealthy-operator-alpha

Three hand-offs landed on the Signed workshop happy-path concept. All three respect the three-column shell, the flat thread stack, the Approve/Archive lifecycle, and the doc-body-resort-on-sign behaviour. They diverge on how the control-block scope ladder lands, how the inspector ranks stages vs threads, how dense the sidebar gets, and — only in the revolutionary — whether a comment must carry a text anchor.

## Matrix

| | Conservative | UX-driven | Revolutionary |
|---|---|---|---|
| Primary signal | Doc body prose. Inspector and control blocks stay 20% by construction. | Threads, once review starts. Stages compress; threads claim the inspector attention zone. | Doc body prose plus the "what feeds this regen" count line on every control block. |
| Best-served scenario | DS-strict build. Frontend reviewer audits pass cleanly with zero escalations. | Dense-review session with many threads on a long strategy. Operator works the stack, not the map. | Cross-cutting steering — voice, tone, verb discipline — applied over the whole doc without faking anchors. |
| Worst-served scenario | Dense review. Equal-weight three-button control block buries the default scope; operator reads frequency wrong. | Clean happy path with zero threads. Minimized stages card + empty threads group read as busywork. R8 three-column stages-spec carries summary copy that never shows up in a clean run. | A consumer that wants comment = marginalia only. The unanchored primitive is a second concept to teach. |
| 80/20 at screen | Doc body is 80% by default three-column ratios. No overrides. | Same, plus inspector re-ranks so threads (the 80% of review work) sit above stages (reference). Fractal 80/20 extended to the right column. | Same as conservative. No inspector re-rank. Adds a count line to every control block as "what feeds this" — 20% noise inside the 20% block. |
| 80/20 at card | Signoff shout is the one shout in the doc; control blocks are static with no primary; zero primaries in delivered inspector cards. All defensible, one flag raised by designer. | Control blocks get one primary each (`[Improve in place]` / `[Implement comments in research]`) with the rare scopes behind the collapsible. Brief card promotes transcription label via `t-caption--bold`. Stages card compresses to minimized past step 3. | Control blocks get one primary (`[Improve in place]`) plus two labelled-secondary buttons. Rule held, not broken. Scope ladder carried by verb hierarchy, not by promote/collapse. |
| Inventions | Zero. | Zero. Eight ergonomic moves, all composition. | Three, all covered by one diff entry: `button.comment-stack__add`, `data-anchor="unanchored"` attribute, and the "Steering note" label variant on `comment-thread`. Control-block `.control-block` sugar flagged as droppable on reviewer request. |
| Diff evaluation | n/a | n/a | Pass — single high-leverage entry, blast radius named, rollback viable, reason tied to gate amendment 4. One correction and one scope warning — see §Diff recommendation. |

## Conservative

Optimizes for **kit fidelity and reviewability** — every class cross-references `components.md`, every token falls inside `tokens.json`, and the designer flags two soft-rule frictions proactively (no primary inside the control block, inline shout for `[Redo research]` confirm). Costs pay at review-state ergonomics. The three regen buttons render at equal visual weight so the operator has to read labels to remember which one is the default scope — directly contradicting gate amendment 2's frequency ranking. Past-section density is concept-literal collapsed static text, which scans worse than UX-driven's `card--interactive[data-state=minimized]` mechanic. Stages card is two-column `doc__spec` with no room for past-stage summaries. The resort-on-sign plan is "one pass with kit transitions, no custom keyframes" — delivers the reflow but accepts the rough read as the cost of strict discipline. The amendment-adherence table passes on every row: flat threads, scope ladder declared (if flat-equal), Approve+Archive lifecycle via v0.13.0, context-stream filtering via `data-state` + `data-archived`. The kind of human who picks this is the one who wants the stage-8 build to land with zero friction at stage 10 consistency review — no risk of a kit-rule escalation, no invention, no "did the designer invent a modal" conversation.

## UX-driven

Optimizes for **ergonomics inside the kit** — eight moves, each one uses an existing kit mechanic to serve the job story better than the conservative literal read. The scope ladder (R2) uses `card--interactive[data-state=minimized]` so the default scope gets the primary-button 80% weight on every control block and the rare scopes collapse behind the reveal; this is the kit's native frequency-hierarchy mechanic and it maps one-to-one to gate amendment 2. Inspector reorder (R1) puts threads in the attention zone and minimizes stages past step 3 — good for a threaded review, neutral for a clean happy path. Sidebar thread-density glyph (R4) turns the TOC into a heat map by appending `t-micro t-muted` counts (metadata, so muted is permitted). The cost is conceptual weight — an operator on a one-thread happy run reads a bunch of "0" glyphs and a stages card that hides itself, both of which are setup for a scenario that barely happens. R6 (past sections as minimized interactive cards) is good UX but breaks the concept's "doc body accumulates, past stages survived visibly" framing — the sections do survive, but only as heading + one-line summary, which is closer to conservative's collapsed text than the concept drawings imply. The research-confirm question is flagged to stage 8 with a browser `confirm()` fallback, matching conservative's worry. The kind of human who picks this is the one who wants the build to read right in the dense-review session the prototype is actually demoing.

## Revolutionary

Optimizes for **the kit growing one primitive to serve cross-cutting steering**. The diff is narrow — one affordance (`+ Add steering note`), one attribute (`data-anchor="unanchored"`), one payload change (anchor fields become nullable), one i18n key, one paragraph added to `strategy-doc.md`. Every other surface sits on the kit literally. Control-block scope ladder is conservative's flat three-button shape with the verb hierarchy carrying the frequency — not UX-driven's promote/collapse mechanic. Inspector stack matches concept 1's literal order (stages top, future-reserved middle, threads below). The diff resolves a genuine tension named in gate amendment 4: comments-as-context-stream versus anchor-as-required — today an operator must fake an anchor to drop a cross-cutting voice note, which misleads the reader and leaks scope logic. The designer's self-restraint is the load-bearing move — one break with a diff, everything else kit-canonical. The cost is onboarding: every consumer of the Comment component now has two mental models (anchored marginalia and unanchored steering), and `docs/integration/comment.md` gains a second section. The resort animation stays concept-literal (kit transitions only) — not richer than conservative. The kind of human who picks this is the one who believes the job is steering, not marginalia, and is willing to pay the one-concept-more tax on every future consumer to make that primitive first-class.

## Scoped audits

Six axes, one row per hand-off.

| Axis | Conservative | UX-driven | Revolutionary |
|---|---|---|---|
| Kit inventory fidelity | Pass. Every class in `components.md`; zero invented. Two soft flags raised by designer. | Pass. Zero invented. R2 + R6 use `card--interactive[data-state=minimized]` as designed. | One diff, three inventions, all covered by the diff entry. `.control-block` modifier flagged as droppable — reviewer recommends dropping since it is semantic sugar only. |
| 80/20 discipline | Screen + card level both pass. Zero-primary control block is a defensible read of "one primary per card" (the rule forbids multiple primaries, not zero). Flagged by designer. | Screen pass. Card-level pass — primary lives on each control block as the default scope. R8 three-column stages-spec is extra surface on past stages that may not pull its weight in happy path. | Pass. Three buttons per control block, one primary; kit rule held via verb hierarchy. Count line `N threads · M steering notes` is inside the 20%. |
| Voice / copy consistency | All strings placeholders per voice.md; imperative verbs named; no real copy decided (correct for stage 4). | Same. R3 promotes transcription label to `t-caption--bold` — a weight distinction, not a copy one. | Same. One new placeholder `addSteeringNote` defined with default "What should every run know?" — imperative-adjacent, operator-facing question, passes the AI-tells filter. |
| Behaviour-chain honesty | Every behaviour names its kit module (scroll-spy, inspector-card-stack, comment-kebab-menus, selection-flow opt-in). Resort plan is minimal DOM reflow + `KK.refresh()`. Confirm modal flagged — inline shout proposed with explicit "escalate if rejected" clause. | Control-block open/close, stages minimize-after-step-3, past-section minimize, sidebar glyph — each behaviour traces to a kit mechanic. Research confirm flagged to stage 8 with browser-native `confirm()` fallback. | Kit behaviours unchanged except the diff surface. `KK.addSteeringNote()` (or delegated click) is proposed — small, public-API-consistent with existing `KK.enableCommentSelectionFlow()`. |
| Amendment adherence (1: flat threads) | Pass. Explicit, `comment-stack` in insertion order, no grouping. | Pass. R5 calls it out explicitly to stage 8. | Pass. Unanchored threads sit as siblings, same stack. |
| Amendment adherence (2: scope ladder) | Equal-weight three buttons, all secondary. Preserves 80/20 at the block level but hides the frequency ranking — the default is not visually default. Flagged by designer. | Primary surfaces the default (`[Improve in place]` / `[Implement comments in research]`), collapsible reveals rare + rarest. Cleanest mapping of the amendment. | Primary on default, verb-hierarchy on rare + rarest. Cleanly held. |
| Amendment adherence (3: research controls) | `[Implement comments in research]` + `[Redo research]` (inline-shout confirm) + `[+ Add research]`. Confirm flagged. | Same actions, collapsible reveal, browser `confirm()` fallback flagged. | Same actions, native `confirm()` fallback for `[Redo research]`. |
| Amendment adherence (4: context stream) | Behaviour described; consumers filter on `data-state` + `data-archived`. No visible count on the control block — operator does not see what feeds a regen. | Same filtering plan. No visible per-regen count either. | Count line `N threads · M steering notes` on every control block — makes the context stream visible. Plus the unanchored primitive that amendment 4 implies. |
| Amendment adherence (5: Approve+Archive lifecycle) | Kit v0.13.0 consumed; kebab items, approve swap, archive hide, all through `kk:comment`. | Same plan. | Same plan. Unanchored threads share identical lifecycle. |
| Amendment adherence (6: resolved+archived drop out) | Consumer filter named. | Same. | Same. Extended to unanchored threads. |
| Amendment adherence (7: kit v0.13.0 consumed not re-built) | Pass. | Pass. | Pass. Diff scoped to v0.13.1 per designer recommendation — v0.13.0 Approve+Archive ships first. |
| Resort-on-sign feasibility | Minimal two-step DOM reflow + `KK.refresh()`. Opacity fade via `--duration-slow` + `--ease-in-out`. Rough read accepted. | Kit class swap drives the resort. No keyframe invention. Nav hard-swap synced to reflow endpoint. Similar delivery quality. | Kit transitions only, concept-literal. No extra animation work from the diff. |

### Findings worth surfacing

- **Conservative's no-primary-in-control-block.** `components.md §Card` rule text: "One primary per card." Zero primaries is not forbidden by the prose, but the UX-driven and revolutionary reads agree the frequency-ranked default deserves the primary slot. If the reviewer is asked to pick one reading, UX-driven and revolutionary match amendment 2's intent more literally.
- **UX-driven R6 vs. concept framing.** Concept 1 drawings show past sections as collapsed text — not as `card--interactive[data-state=minimized]`. R6 is an ergonomic improvement but shifts the scan density slightly further from the direction's "accumulative doc, past stages visibly survived" framing. Defensible, worth naming.
- **Revolutionary `.control-block` modifier.** Semantic sugar with no CSS; the designer offered to drop it. Reviewer recommends dropping to keep the invention count at three-covered-by-diff rather than four.
- **Context-stream visibility (amendment 4).** Only the revolutionary surfaces a count line on every control block. Both conservative and UX-driven rely on the operator inferring what feeds each regen. If the human picks conservative or UX-driven, recommend back-porting the count-line pattern regardless of whether the diff is accepted — it is a plain `t-caption`, no invention, and it makes the steering legible.

## Diff recommendation

**Accept-worthy, with one correction and one scope note.**

The diff resolves a real mismatch between the anchored-comment primitive and gate amendment 4's context-stream framing. The proposed change touches five canon files (manifesto §Runtime, components §Comment + §What's forbidden, strategy-doc §Commenting pattern, docs/integration/comment.md, plus one new i18n key) and zero tokens. Blast radius is named honestly. Rollback is six file touches plus a clean revert commit — no data loss because null-anchor rows are valid `comment` rows in any consumer schema. Accessibility floors unchanged.

If accepted, `kk-ds-maintainer` runs before stage 8 and touches:

- `manifesto.md` §Runtime → Comment lifecycle events (payload shape becomes nullable, note added).
- `components.md` §Comment (description extended) + §What's forbidden (class-prefix allowlist adds `comment-stack__add`).
- `skills/kk-design-system/patterns/strategy-doc.md` §Commenting pattern (second paragraph added).
- `docs/integration/comment.md` (new "Unanchored steering notes" section plus Flask/Next.js/Rails snippets and the null-not-empty-string anti-pattern).
- `manifesto.md` §Runtime i18n block (new `addSteeringNote` key + default "What should every run know?").
- Kit bump to **v0.13.1** (diff's own recommendation — let v0.13.0 Approve+Archive stabilise first, then layer the unanchored primitive on top).

**Correction.** The diff sidecar says "add `comment-stack__add` to the permitted sub-classes of `comment-stack`" in `components.md` §What's forbidden. The current allowlist is prefix-based (`sidebar`, `doc`, `comment`, etc.) — `comment-stack__add` already starts with `comment`, so no allowlist edit is needed. The maintainer should instead document the new class under §Comment rather than touching §What's forbidden.

**Scope note.** The diff proposes a new public method `KK.addSteeringNote()` as one option for the trigger path. Manifesto §Runtime explicitly constrains the public surface to `KK.init()`, `KK.refresh()`, `KK.enableCommentSelectionFlow()` and says "Consumers that need a deeper API wait for the next release — forcing the minimal surface keeps upgrade paths clean." Adding `KK.addSteeringNote()` widens the public surface; the delegated-click alternative (kit binds on `[data-kk="add-steering-note"]` or similar, no new public method) keeps the minimal-surface rule intact. Maintainer should pick the delegated path.

If the diff is rejected, the revolutionary hand-off falls back to the UX-driven variant per `pipeline.md §Revolutionary protocol`, and context-stream visibility should be back-ported via the plain-`t-caption` count line on every control block.

## Clarifying conclusion — not a pick

One sentence each.

- **If the human wants minimum risk and maximum kit fidelity**, they pick **conservative** because every class traces to `components.md`, every flag is disclosed upfront, and stage 10 consistency review will pass on the first run.
- **If the human wants the best ergonomics inside kit rules**, they pick **UX-driven** because the scope ladder (R2) maps amendment 2's frequency hierarchy onto the kit's native `card--interactive` mechanic, and the inspector reorder (R1) puts threads in the attention zone where the review-state job actually lives.
- **If the human wants the kit to evolve around the job**, they pick **revolutionary + accept the diff** because the unanchored steering note is the one primitive the context-stream model needs, the blast radius is honest, and the rollback is a clean six-file revert.

## Gate — passed

User pick, verbatim:

> I want conservative with my comments that I gave before. And I think this step was unnecessary, considering the previous ideation. Noting for the retro.

**Chosen hand-off: conservative** (`04-conservative.md`).
**Revolutionary diff: rejected.** Archived for future retro / possible kit evolution in a later session.

## Amendments to apply at stage 8

From stage-3 gate (carried forward, embedded in all designer prompts):

1. Comment threads in inspector = flat list. No grouping.
2. Regeneration scopes per section control block: `[Improve in place]` default / common · `[Redo section]` rare · `[Redo whole doc]` rarest.
3. Research controls: `[Implement comments in research]` · `[Redo research]` (replace, confirm inline via `card--shout` per conservative spec) · `[+ Add research]` (additive, prompt seeded from note + session intro summary). Depth deferred.
4. Comments as context stream — open comments feed every regeneration globally.
5. Comment lifecycle using kit v0.13.0: Approve (→ doc + resolved state) · Reject with answer (next round) · Leave unanswered (skipped next batch, still strategy context). Archive via kebab → hidden + data preserved.
6. Resolved + archived stop traveling.
7. Kit v0.13.0 SHIPPED (commit `cc2af02`, tag `v0.13.0`).

From DS reviewer (soft-friction fixes):

8. **Control block gets a primary button.** `[Improve in place]` → `button.button--primary`. `[Redo section]` + `[Redo whole doc]` → secondaries. Restores 80/20.
9. **Context-stream count line as plain `t-caption`.** Revolutionary made thread-count visibility globally explicit; back-port to conservative as unstyled `t-caption`. No new component.

## Retro note

> I think this step was unnecessary, considering the previous ideation.

Recorded to session README §Retro candidates. Pipeline v2 may make stages 4-7 conditional when stage-3 concept + gate amendments are already highly specific. Meta-retro after stage 10 ships.

## Hand-off

→ Stage 8, `kk-role-frontend-engineer`. Input: `04-conservative.md` + this file §Amendments. Output: `prototype-operator-alpha/` + `08-frontend-engineer.md`. Build scope: REVIEW STATE of working layout (stage-1 vertical-slice lock). Placeholder copy per kit convention.
