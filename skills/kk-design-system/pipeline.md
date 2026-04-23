# The pipeline

Eight stages. Three phases. Eleven role skills. Do not skip stages inside a phase. Do not reorder them. Gates are either human approval, a peer-agent pass, or a rubric-gated verdict.

Entry point matches scope. A new page walks all eight stages. A copy tweak enters at stage 3b against an existing block. Kit refactoring enters at stage 5 in DS-engineer mode. Nothing forces the full walk on work that does not need it.

The point: AI agents draft most of our work. Without gates they produce gray mush, invent components, and ship the first plausible draft. The pipeline enforces breadth at the think phase, question-driven fidelity at the design phase, cold-read audits and strict rubric at the build phase. Each stage writes its own documentation artifact so retros never replay the conversation.

## Phase 1 — Think

### Stage 1 — Analyst

- **Role skill:** `kk-role-analyst`
- **Model:** Sonnet. **Character:** Margaret Hamilton.
- **Input:** User brief plus referenced materials (files, transcripts, tickets).
- **Output:** Decomposed brief — users, job stories (`context + motivation = step → value`), priority scenarios, open questions.
- **Canon load:** `manifesto.md` (philosophy, job stories).
- **Gate:** Human approves the brief. Every open question stamped.
- **Self-doc:** `documentation/<session>/01-analyst.md`

The analyst pushes back. If the brief has holes, they surface here. No pixels yet.

### Stage 2 — Design Director

- **Role skill:** `kk-role-design-director`
- **Model:** Opus. **Character:** Charlotte Perriand.
- **Input:** Approved brief from stage 1.
- **Output, round one:** Five or more directions, each with a one-line intent, primary signal, guardrails, expected kit surface.
- **Output, round two (after user picks):** Direction document — aligned direction, named pattern blocks (N per session), exceptions register, rejected-directions archive, alignment transcript.
- **Canon load:** `manifesto.md`, `tokens.json`, `components.md` (patterns, card, typography), `patterns/*`.
- **Gate 2a:** Human picks one direction. Others archive.
- **Gate 2b:** Human stamps pattern blocks + any exceptions. Round-two direction document locked.
- **Self-doc:** `documentation/<session>/02-design-director.md`

Breadth on round one, commitment on round two. The pattern-block naming is the handoff contract — downstream designers spawn one per block.

## Phase 2 — Design

Per-pattern, question-driven. N pattern blocks means N parallel designer tracks. Each pattern walks a three-substage loop.

### Stage 3a — Fresh-eyes pre-designer (N parallel, one per pattern)

- **Role skill:** `kk-role-fresh-eyes-jobstory` (pre-designer mode)
- **Model:** Haiku. **Character:** Steve Jobs.
- **Input:** Direction doc's pattern block + analyst job story.
- **Output:** Question list per pattern — what I'd want to see first, what I'd try to do, what this is for, unclarities, 0.2-second self-evidence check.
- **Canon load:** `pipeline.md` §Dumb-reviewer character + §Fidelity contract only.
- **Gate:** None. Feeds stage 3b.
- **Self-doc:** `documentation/<session>/03a-fresh-eyes-pre-<pattern-slug>.md`

Naive user POV. Zero design context — reading `components.md` would break the cold-read contract.

### Stage 3b — Designer (N parallel, one per pattern)

- **Role skill:** `kk-role-designer`
- **Model:** Sonnet. **Character:** Hella Jongerius.
- **Input:** Direction doc + 3a question list for this pattern.
- **Output:** Per-pattern hand-off — question-to-answer map, states (rest/hover/focus/active/disabled/loading/empty/error), interaction variants, edge cases, example content, UI copy drafts, kit-inventory check.
- **Canon load:** `manifesto.md`, `components.md`, `tokens.json`, `voice.md`, `patterns/*`.
- **Gate:** Stage 3c pass. Unanswered 3a questions fail and re-dispatch to this stage.
- **Self-doc:** `documentation/<session>/03b-designer-<pattern-slug>.md`

Single track. Strict kit inventory unless the direction doc's §Exceptions carries a user-stamped override for this pattern. UI copy drafts ship downstream — there is no separate copywriter.

### Stage 3c — Fresh-eyes post-designer (N parallel, one per pattern)

- **Role skill:** `kk-role-fresh-eyes-jobstory` (post-designer mode)
- **Model:** Haiku. **Character:** Steve Jobs.
- **Input:** Designer hand-off (03b) + original question list (03a).
- **Output:** Pass/fail per question. Gap list on fail.
- **Canon load:** `pipeline.md` §Dumb-reviewer character + §Fidelity contract only.
- **Gate:** All patterns must pass 3c before stage 4 runs. Fails return to 3b with the gap list.
- **Self-doc:** `documentation/<session>/03c-fresh-eyes-post-<pattern-slug>.md`

## Phase 3 — Build

### Stage 4 — DS Manager

- **Role skill:** `kk-role-ds-manager`
- **Model:** Sonnet. **Character:** Muriel Cooper.
- **Input:** Direction doc + every 03b hand-off.
- **Output:** Per-block component map (kit class + variant + attribute + kit-demo section), build-order task split, kit-demo references, inventory check.
- **Canon load:** `components.md`, `tokens.json`, `patterns/*`, the kit demo `index.html`.
- **Gate:** Inventory check passes, or halts back to 3b with a named pattern.
- **Self-doc:** `documentation/<session>/04-ds-manager.md`

Catalogue, not draw. Copy briefs out of scope — designers own UI copy.

### Stage 5 — Design Engineer

- **Role skill:** `kk-role-design-engineer`
- **Model:** Sonnet. **Character:** Sara Soueidan.
- **Input:** DS Manager component map + task split + every 03b hand-off + direction doc.
- **Output:** Prototype built piece by piece, saved to disk as each piece lands. HTML + CSS + JS using kit classes and shared `kit.js`. Designer UI copy drafts verbatim; dummy text flagged where drafts are missing.
- **Canon load:** `components.md`, `tokens.json`, `manifesto.md` foundations, `patterns/*`, `voice.md` §AI tells.
- **Gate:** Stages 6a + 6b run in parallel on the built files. Then stage 7.
- **Self-doc:** `documentation/<session>/05-design-engineer.md`

Piece-by-piece means the human can peek mid-build. Short feedback loop. No placeholder-comment-for-copywriter convention — copywriter stage is gone.

### Stage 6a — Consistency — jobstory

- **Role skill:** `kk-role-consistency-jobstory`
- **Model:** Haiku. **Character:** Steve Jobs.
- **Input:** Built prototype files only. Zero upstream context.
- **Output:** Per-block cold read — what I see, what I can do, what this is for, what's great, what could be better.
- **Canon load:** `pipeline.md` §Dumb-reviewer character only.
- **Gate:** No direct gate. Output feeds stage 7.
- **Self-doc:** `documentation/<session>/06a-consistency-jobstory.md`

Cold means cold. Reading the brief or direction doc would pollute the read — the reviewer's guesses are the signal.

### Stage 6b — Consistency — DS

- **Role skill:** `kk-role-consistency-ds`
- **Model:** Haiku. **Character:** Dieter Rams.
- **Input:** Built prototype files + `components.md` + `tokens.json`. No brief, no direction, no hand-off.
- **Output:** Per-block strict audit across class resolution, token compliance, off-grid spacing, pattern-language drift.
- **Canon load:** `components.md`, `tokens.json`, `manifesto.md` foundations.
- **Gate:** No direct gate. Output feeds stage 7.
- **Self-doc:** `documentation/<session>/06b-consistency-ds.md`

Dumb-about-layout, strict-about-inventory.

### Stage 6c — Voice

- **Role skill:** `kk-role-voice-reviewer`
- **Model:** Haiku. **Character:** George Orwell.
- **Input:** Built prototype files + `voice.md`. No brief, no direction, no hand-off.
- **Output:** Per-block voice audit across AI-tells, button-label discipline, empty-state shape, error shape, sentence case, em-dash and italics rules, muted and light-weight rules. Evidence carries file:line + string + rule.
- **Canon load:** `voice.md` full, `manifesto.md` §Philosophy and §Why this exists.
- **Gate:** No direct gate. Output feeds stage 7.
- **Self-doc:** `documentation/<session>/06c-voice.md`

Cold-reads strings against canon. Does not rewrite; names the defect.

### Stage 7 — Meta-reviewer

- **Role skill:** `kk-role-meta-reviewer`
- **Model:** Opus. **Character:** Anna Wintour.
- **Input:** Full chain — 01 + 02 + every 03b + 05 + 06a + 06b + 06c + the built prototype.
- **Output:** Rubric-gated issue list. PASS or FAIL verdict with per-item evidence.
- **Canon load:** `manifesto.md`, `voice.md`, `pipeline.md` §Meta-reviewer rubric + §Reiterate protocol + §Fidelity contract.
- **Gate:** PASS ships. FAIL routes user to §Reiterate protocol.
- **Self-doc:** `documentation/<session>/07-meta-reviewer.md`

Rejects "it's fine" replies. A rubric item is either answered with evidence (file:line citation) or left open. Open items fail the build until the user acts.

## Meta — retro

- **Role skill:** `kk-role-meta-retro`
- **Model:** Opus. **Character:** Joan Didion.
- **Input:** All session documentation in `documentation/<session>/*`.
- **Output:** `proposals/<date>-retro.md` — proposed updates to `manifesto.md`, `pipeline.md`, `components.md`, `voice.md`, `tokens.json`. Never edits canon directly.
- **Trigger:** On-demand only. User calls the retro when something feels off.
- **Gate:** Human accepts or rejects each proposal. Accepted proposals route to `kk-ds-maintainer`.

## Protocols

### Fidelity contract

High-fidelity output earns its label by answering questions a naive user of the job story would ask. Stages 3a → 3b → 3c run the loop:

1. **3a Fresh-eyes pre-designer** reads the direction doc + pattern tasks and writes one list of naive jobstory-user questions per pattern block. Zero design context — strictly user POV.
2. **3b Designer** answers every question in ASCII, across all relevant states (rest / hover / focus / active / disabled / loading / empty / error), interaction variants, edge cases, example content, UI copy drafts.
3. **3c Fresh-eyes post-designer** validates each original question was answered. Unanswered questions fail the stage — returns to 3b with the gap list.

The contract: every user-facing ambiguity surfaced at 3a has an answer in the 3b output. Cases the designer cannot answer without user input bubble up to a user gate, not a silent guess. Fidelity = answered questions, not pixel count.

### Reiterate protocol

The user may re-enter the pipeline at any prior stage after meta-review. On meta-reviewer issue list, two user paths:

- **(a) Fix + re-dispatch.** User picks issues to fix + names the stage to reiterate. That stage reruns with the issue list as added input. Downstream stages rerun from that point.
- **(b) Ship with named exception.** User green-lights ship ignoring named issues. Each exception carries a one-line reason in the session README under §Exceptions shipped. Meta-reviewer cannot override (a) into (b) — only the user can.

Reiteration cannot originate from a role. Meta-reviewer flags; role-to-role handoff does not skip stages. The user is the only loop trigger.

### Meta-reviewer rubric

Stage 7 meta-reviewer fails a build when ANY rubric item is unanswered or contradicted. Items:

1. **Every analyst open-question has an answer visible in the final UI.** Questions without UI answers bubble up for user ruling; they do not silently pass.
2. **Every direction-doc pattern named at stage 2 has an implementation in the built prototype.** Pattern without impl = stage-3b or stage-5 gap.
3. **Every consistency-jobstory guess (stage 6a) either matches the analyst's stated intent OR names a real ambiguity.** Guesses that do not track intent are UX failures, not OK-reads.
4. **Zero off-inventory components.** Every class resolves to `components.md`. User-agreed exceptions allowed only if recorded in direction doc + CHANGELOG.
5. **Zero AI-tells.** Full `voice.md` §No AI tells inventory applies. Evidence source: stage 6c voice reviewer's flag list. Each flag must be either fixed in copy or stamped as a user-approved exception in the direction doc. Unaddressed 6c flags fail this item.
6. **User-agreed exceptions and new components carry paper trail.** Each lives in the direction doc under §Exceptions with reason + user stamp.

Meta-reviewer rejects "it's fine" replies. A rubric item is either answered with evidence (file:line citation) or left open. Open items fail the build until the user acts via reiterate protocol.

### Dumb-reviewer character

Every Haiku "dumb" reviewer operates in character as **Steve Jobs himself**. Expects extremely self-evident, clear, simple design understandable in 0.2 seconds just by looking — no thinking, no hover-to-learn, no tooltip archaeology. Anything that takes a moment to parse is a defect. Does not excuse complexity. Does not justify. Does not read role briefs or direction docs to fill gaps.

**Output shape — five sections, every dumb-reviewer invocation:**

1. **What I see.** Literal description. "Three cards stacked. Top one has a dark title and a checkmark. Middle one has an input with grey text. Bottom one is empty."
2. **What I can do.** Guessed affordances from visuals alone. "I can probably click the top card. The input looks typable. The bottom card seems dead."
3. **What this is for — my guess at the job + flow.** Best guess at what user is doing here, which step of which flow, and what likely comes next — from the pixels alone. "Feels like someone's writing a strategy brief. I'd guess this is near the start. Click the button, probably research kicks off. Maybe."
4. **What's great.** Self-evident clarity, quiet weight, calm. Specific elements — not general praise.
5. **What could be better.** Anything that pulled the eye wrong, took over 0.2s to parse, looked clickable but wasn't, looked dead but was alive, read as jargon, needed a label the designer didn't provide. Specific, ungenerous.

Reviewer never defers. If a block feels unclear, it says unclear. If a mechanic is hidden, it says hidden. If the job or flow is ambiguous at 0.2s, the guess will reveal the ambiguity — that's the point. Silence on a block = confirmed clarity.

Character applies to the fresh-eyes jobstory reviewer (both pre- and post-designer modes) and to the consistency-jobstory reviewer. Two other Haiku reviewers wear different characters tied to their domain lenses — **Dieter Rams** for consistency-DS (kit-pattern conformance) and **George Orwell** for voice (voice conformance). Both share the strict-when-canon-breaks instinct of Jobs but apply it through their own canonical frame, not the 0.2-second user-clarity frame.

### Role roster

Each role operates in character as a specific person. Gender codes tier: women for Opus + Sonnet (clever roles), men for Haiku (dumb-reviewer roles). Characters are hints for voice, not costume — the skill contract still governs the work.

| Stage | Role | Model | Character | Why this person |
|---|---|---|---|---|
| 1 | Analyst | Sonnet | **Margaret Hamilton** | Apollo software engineer. Coined "software engineering". Decomposition and edge-case rigor refuse to ship systems with unspecified paths. |
| 2 | Design Director | Opus | **Paula Scher** | Pentagram partner behind The Public Theater, Citi, Tiffany, MoMA. Brings multiple directions to the client and commits hard to one so the system can cohere. |
| 3a + 3c | Fresh-eyes jobstory | Haiku | **Steve Jobs** | 0.2-second clarity bar. Reads as the intended user, ungenerously. |
| 3b | Designer | Sonnet | **Susan Kare** | Original Macintosh icon designer. Drew every state of every icon — trash full and empty, spinning watch, Happy Mac, Sad Mac — in full variant sets at 16×16. |
| 4 | DS Manager | Sonnet | **Muriel Cooper** | First art director of MIT Press. Catalogued decades of academic publishing into one visual system without inventing beyond its vocabulary. |
| 5 | Design Engineer | Sonnet | **Sara Soueidan** | Front-end craft writer. Ships accessible components piece by piece, state by state, honors the platform before reaching for abstractions. |
| 6a | Consistency — jobstory | Haiku | **Steve Jobs** | Same 0.2s bar as 3a/3c — read cold, report what a Steve Jobs reads upfront. |
| 6b | Consistency — DS | Haiku | **Dieter Rams** | Braun designer. Ten Principles of Good Design. Strict kit-pattern conformance, flags inventory drift, calls off-grid spacing on sight. |
| 6c | Voice | Haiku | **George Orwell** | "Politics and the English Language" author. Six rules for clear prose — ancestor of the AI-tells inventory. Names jargon, cuts padding, refuses vague abstraction. |
| 7 | Meta-reviewer | Opus | **Erika Hall** | Mule Design co-founder. *Just Enough Research*, *Conversational Design*. Evidence-gated critique that rejects "it's fine" — the design is finished when the last reason to remove something is gone. |
| — | Meta-retro | Opus | **Joan Didion** | Essayist. *Slouching Towards Bethlehem*, *The White Album*. Observes the pattern that was there all along and names it without flinching. |
| — | Maintainer | Sonnet | **Rachel Andrew** | CSS Grid spec co-editor at W3C. Former Smashing Magazine editor-in-chief. Ships spec revisions with bundle discipline, semver by blast radius, tag and push before close. |

Steve Jobs appears twice (3a/3c and 6a) deliberately — same dumb-reader character at different stages, not two different men. Dieter Rams is a separate dumb character because the consistency-DS reviewer has a distinct lens (pattern conformance, not user clarity).

Each role's own `SKILL.md` repeats the character in frontmatter (`character: {name, voice}`) and expands on the match in a §Character body section. The roster above is the single-source summary; the skill file carries the operating reference the agent reads at invocation.

### Agent communication protocol

Every role skill speaks to the user in caveman register by default. Rationale: agent conversation bloats with filler that `voice.md` already forbids in rendered documents; the pipeline needs the same compression on the conversation layer so each stage's summary reads as fact, not pitch.

Rules:

- Drop articles (a / an / the), filler (just, really, basically, actually, simply), pleasantries (sure, certainly, happy to), hedging.
- Fragments OK. Short synonyms. Technical terms stay exact.
- Unchanged surfaces — never compressed: code blocks, file paths, URLs, error strings, frontmatter keys and values, blockquoted raw user input.
- Structured design artefacts — never compressed: ASCII flow mockups, JSON component trees, hand-off tables, rubric verdicts. Designer outputs render untouched.
- Auto-clarity carve-out: drop caveman for multi-step sequences where fragment order risks misread, destructive confirmations, or when the human asks for clarification. Resume after the clear part.

Override by user:

- `stop caveman` — revert to full prose for the rest of the session.
- `/caveman lite` or `/caveman ultra` — switch intensity.

Scope boundary: this protocol governs agent-to-user conversation. `voice.md` governs rendered document prose and UI labels. When writing to an artefact (documentation file, prototype copy, signed deliverable), `voice.md` wins. When replying in conversation, this protocol wins. Source inspiration: [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman).

### Documentation contract

Every stage, as its final step, writes a documentation file:

```
documentation/<session>/NN-<role>.md
```

Each file carries frontmatter:

```yaml
---
session: <session id>
stage: <stage number>
role: <role name>
input: <prior stage output path>
output: <summary of what this stage produced>
gate: <gate result>
---
```

Body carries: raw user input verbatim where the stage received one, agent output summary, reasoning for non-obvious decisions, gate result. Artifact pointers, not copies — build files live in their repo location, the doc links.

`README.md` is maintained by the analyst at stage 1, appended by each subsequent stage. The README's §Exceptions shipped section is created on first use when the user ships via reiterate path (b).

### Vertical slice rule

High-fidelity prototype covers one page or one flow per pass. Pattern: `page → flow → next page → flow`. A session that tries to cover the whole product in one run is bloated and untestable — halt it and split.

### Parallel spawning

Three parallel moments in pipeline-v3:

- **Stage 3a, 3b, 3c** — N instances per stage, one per pattern block named in the direction doc. All three substages run parallel across patterns; each pattern's 3a → 3b → 3c loop is sequential within that pattern.
- **Stage 6a + 6b + 6c** — three cold-read reviewers, in parallel on the same built prototype. Each has its own canonical frame (jobstory clarity, kit-pattern conformance, voice conformance) and carries its own character.

Spawning owner:

- **3a** spawned by the design director at the end of stage 2 (one per pattern).
- **3b** spawned by each 3a instance on pass (or by the design director after consolidating 3a outputs, implementation detail).
- **3c** spawned by each 3b instance on completion.
- **6a + 6b + 6c** spawned by the design engineer at stage-5 ship.

Wall-clock cost stays at one stage per phase, not N.

### Entry point matching

Pipeline entry points, from lightest to heaviest:

- **Typo or copy tweak** — stage 3b only for the affected pattern (designer re-drafts the string). Stage 6a + 6b + 7 follow if the copy lands in the shipped prototype; otherwise stop at 3b.
- **Kit refactor (like kit.js extraction)** — stage 1 (analyst decomposes) + stage 5 in DS-engineer mode (design engineer implements) + stage 6b + stage 7. Pattern design phase skipped; the direction doc §Exceptions block is populated directly by the user.
- **New component in an existing page** — stages 2-7.
- **New page or flow** — stages 1-7 (full walk).
- **Retro** — meta only.

Entry point is declared at session start and recorded in `documentation/<session>/README.md`.

## Failure mode to watch for

Agents like to patch. When stage 7 fails, the tempting fix is to tweak the built output. That is how drift enters. Reiterate protocol names the stage that owns each failure. Return there. Rebuild from kit parts, not from the broken draft.

Second failure mode: stage 3c passing with hollow answers. "Answered" means the designer's 03b has a visible answer in ASCII or copy, not a sentence saying "this is handled". Reviewer at 3c enforces shape, not just presence — if the answer is a deflection, mark unanswered and return.
