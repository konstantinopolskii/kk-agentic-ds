# Changelog

Every release names: what was added, what was removed, what moved. Consumers read this when bumping versions.

## 1.2.0 — 2026-04-23

Pattern discoverer role, plus four canon-kit defects surfaced during the first fundamental build. The 2026-04-23 patterns-library initiative split kit work into a canon track (atoms and elements in `index.html`) and a pattern registry track (`patterns.html` at repo root, thin index over `demos/<slug>--accepted/`). A discovery pass was missing from the pipeline — stage 7 meta-reviewer ends the product-shaped walk, but no role owns the post-acceptance pattern catalogue. This release adds `kk-role-pattern-discoverer`, wires it into the roster as a post-pipeline pass, and bakes the kit-internal review adaptation (skip 6a, keep 6b + 6c, adjusted 7 rubric) into `pipeline.md` so future kit-internal artefacts route through the right sweep. The fundamental build also exposed two kit.js behaviour bugs, one canon-doc drift on the signoff pattern, and one token-drift on the color swatches in `index.html`. All four ship in the same bundle.

### Added
- `skills/kk-role-pattern-discoverer/SKILL.md` — Sonnet, Jina Anne. Triggered by the `--accepted` suffix on a prototype folder. Slices qualifying compositions to `demos/<slug>--accepted/patterns/<pattern-slug>.html` and appends entries to `patterns.html`. First-accepted wins on cross-prototype dedup. Never edits canon. Full pattern-eligibility rubric (five must-clauses plus disqualifiers) carried in the skill body.
- `skills/kk-design-system/pipeline.md § Role roster` — pattern-discoverer row (stage column `— (post)`, Jina Anne, Design Systems Conference + W3C Design Tokens citation).
- `skills/kk-design-system/pipeline.md § Post-pipeline pattern discovery` — new subsection placing the pass outside the eight-stage walk, trigger by `--accepted` stamp, dedup rule, canon read-only constraint.
- `skills/kk-design-system/pipeline.md § Kit-internal review adaptation` — new subsection. 6a skipped for kit-internal artifacts, 6b and 6c universal, 7 runs on an adjusted rubric that drops the 6a-vs-analyst comparison and adds an artifact-specific completeness item declared at walk start.
- `skills/kk-design-system/components.md § Signoff` — one-line rule that `doc__signoff-stats` grids into three columns, two `.stat` children plus a trailing empty column for asymmetric breathing room. Ship two stats, never three.
- `style.css § Registry surfaces` — `.registry-frame` + `.registry-frame--tall` + `.registry-disclosure` primitives for iframe pattern previews and collapsed-by-default disclosures in kit docs.
- `skills/kk-design-system/components.md § Registry surfaces` — new section documenting the three classes + modifier.

### Fixed
- `js/kit.js` — empty `comment-new` now dismisses on demote. The MutationObserver bailed on `!tid` before reaching the dismiss branch, so the pre-rendered static demo draft (no `data-thread-id`) became a zombie preview card on blur. Reordered: the empty-draft dismiss runs first and independent of thread id; the highlight-mark branch keeps its tid gate.
- `style.css` — `.comment__menu-popover` now opens on dots-button click. The old selector `.comment__menu[aria-expanded="true"] ~ .comment__menu-popover` required siblings, but the button sits inside `.comment-msg__header` while the popover is a child of `.comment-msg`. Rewrote as `.comment-msg:has(.comment__menu[aria-expanded="true"]) > .comment__menu-popover`, matching the `:has()` usage already in the file.
- `index.html § Color` — six swatches (`--color-surface-overlay`, `--color-surface-strong`, `--color-border`, `--color-border-strong`, `--color-text-muted`, `--color-text-subtle`) were emitting raw `rgba(0,0,0,0.X)` inline. Swapped to `var(--color-*)` to match the first two swatches in the list and the fundamental demo.
- `js/kit.js` — resolved and archived comment threads no longer re-expand on click. `handleTrigger` had no guard for terminal-state threads, so any click on a resolved preview promoted the card to `data-state="active"` with no content to reveal. Added an early return for `data-resolved="true"` or `data-archived="true"` before the `card--interactive` promote branch.
- `style.css` — `.comment__menu-popover` no longer truncates when the message sits near the bottom of an open thread. Popover lives inside `.card__collapsible-inner` which carries `overflow: hidden` for the slide transition. Added a `:has()` rule that flips the inner to `overflow: visible` while any menu popover is open, mirroring the existing deck-escape rule. Returns to `overflow: hidden` on close.

### Removed
- Nothing. Additive release.

### Moved
- `package.json` version `1.1.0` → `1.2.0`. Minor bump — one new role skill, additive.
- `package.json` `files` array — added `skills/kk-role-pattern-discoverer/` after the other `kk-role-*` entries.
- `.claude-plugin/plugin.json` version `0.4.0` → `1.2.0`. Bump in lockstep with `package.json` after a drift window across the 1.0.x and 1.1.0 cycles. Plugin `skills` array unchanged — the discoverer is kit-internal, matching the precedent that no `kk-role-*` skill is listed there.

### Open
- `patterns.html` not created in this release. Phase 3 of the initiative deploys the discoverer against `demos/fundamental--accepted/`, which creates the file and populates the first entry set.

## 1.1.0 — 2026-04-23

Stage 6c voice reviewer + voice discipline extended to every role that writes UI text, prototype prose, or pattern descriptions. v1.0.0's pipeline-v3 folded the dedicated UX-copy-review role into meta-reviewer's rubric item 5 (one line on a six-item Opus rubric). User flagged the dilution — voice defects written at stage 3b would survive until stage 7, then require an expensive reiterate loop. This release restores a dedicated cold-read voice auditor parallel with 6a + 6b, and tightens voice.md canon load on the four roles that author prose for prototype or docs.

### Added
- `skills/kk-role-voice-reviewer/SKILL.md` — Haiku, George Orwell. Stage 6c. Cold reads every visible UI string against `voice.md` — AI tells, button-label discipline, empty-state shape, error shape, sentence case, em-dash and italics rules, muted and light-weight rules. Flags file:line + string + rule broken. No pass/fail — feeds stage 7 meta-reviewer's rubric item 5.
- `skills/kk-design-system/pipeline.md § Stage 6c — Voice` — new stage section.
- `skills/kk-design-system/pipeline.md § Role roster` — voice reviewer row added.
- Canon-load entries for `voice.md` on four roles that were previously missing or partial: `kk-role-analyst` (job stories + open questions), `kk-role-design-director` (direction doc + pattern descriptions), `kk-role-ds-manager` (component map prose), `kk-role-design-engineer` (upgraded from `§AI tells` to full `voice.md` — carries designer strings + writes dummy text).

### Removed
- Nothing. Additive release.

### Moved
- `skills/kk-design-system/pipeline.md` intro: "Ten role skills" → "Eleven role skills".
- `skills/kk-design-system/pipeline.md § Parallel spawning` — stage-6 parallel updates from "6a + 6b" to "6a + 6b + 6c". Spawning owner is the design engineer at stage-5 ship.
- `skills/kk-design-system/pipeline.md § Meta-reviewer rubric` item 5 — now names stage 6c as the evidence source. Flags must be either fixed in copy or stamped as user-approved exceptions in the direction doc.
- `skills/kk-design-system/pipeline.md § Dumb-reviewer character` — footnote extended. Steve Jobs governs fresh-eyes + consistency-jobstory (0.2-second user-clarity frame). Dieter Rams (6b) and George Orwell (6c) are Haiku reviewers with canon-framed lenses — kit-pattern conformance and voice conformance respectively.
- `skills/kk-design-system/pipeline.md § Stage 7 Meta-reviewer` canon input — now reads 06c alongside 06a + 06b + upstream chain.
- `skills/kk-design-system/manifesto.md § Pipeline` — "three cold-read audits (jobstory, DS, voice)" replaces the two-audit phrasing; role count ten → eleven.
- `package.json` version `1.0.2` → `1.1.0`. Minor bump — added a new role skill.
- `package.json` description — role count ten → eleven.
- `package.json` `files` array — added `skills/kk-role-voice-reviewer/`.

### Open
- The three parallel 6a + 6b + 6c reviewers produce three distinct artefact files. Meta-reviewer reads all three. Wall-clock cost of stage 6 stays unchanged because the three run in parallel.
- Three other roles already carried `voice.md` in their canon load prior to this release: `kk-role-designer` (full file), `kk-role-meta-retro` (full file), `kk-ds-maintainer` (inherited rules). No change for those three.
- Reviewer-only roles (fresh-eyes-jobstory, consistency-jobstory, consistency-ds, meta-reviewer) do not author UI text or prototype prose. Their canon loads remain role-specific; voice is not added to their load lists.

## 1.0.2 — 2026-04-23

Convention parity for §Character body paragraphs. The four role SKILL.md files that carried character only in frontmatter (analyst, ds-manager, design-engineer, meta-retro) now carry the same 2-3 sentence §Character body section the seven other roles already had — who this person is, the work they are famous for, why the match holds. All eleven roles now share the convention. Patch-level: no mandate, trigger description, or consumer API changed.

### Added
- `skills/kk-role-analyst/SKILL.md § Character` — Margaret Hamilton body paragraph (NASA Apollo lead, coined "software engineering", Apollo 11 priority-display system).
- `skills/kk-role-ds-manager/SKILL.md § Character` — Muriel Cooper body paragraph (first MIT Press art director, MIT Press colophon, Visible Language Workshop).
- `skills/kk-role-design-engineer/SKILL.md § Character` — Sara Soueidan body paragraph (independent front-end engineer, accessible-component deep-dive series).
- `skills/kk-role-meta-retro/SKILL.md § Character` — Joan Didion body paragraph (American essayist, *Slouching Towards Bethlehem*, *The White Album*, pattern-observer).

### Removed
- Nothing. Patch release.

### Moved
- `package.json` version `1.0.1` → `1.0.2`. Patch bump — §Character convention parity; no mandate, trigger description, or consumer API changed.

### Open
- Nothing pending from v1.0.0 + v1.0.1 character work. Convention now uniform across eleven roles.

## 1.0.1 — 2026-04-23

Character swaps for four roles after v1.0.0 ship — user flagged that the original picks were famous but not domain-fit. Each new pick is a practitioner whose actual craft matches the role's work. Every role SKILL.md also gains a §Character body section that expands on the match — the frontmatter carries name + voice, the body carries the why-this-person reference the agent reads at invocation. Patch-level: no role mandate changed, no stage mechanics changed, no consumer-visible API changed.

### Added
- `skills/kk-role-design-director/SKILL.md § Character` — Paula Scher body paragraph (Pentagram partner, The Public Theater / Citi / Tiffany / MoMA / Windows 8, multi-direction client presentation that commits hard to one).
- `skills/kk-role-designer/SKILL.md § Character` — Susan Kare body paragraph (original Macintosh icon designer, every state of every icon in full variant sets at 16×16).
- `skills/kk-role-meta-reviewer/SKILL.md § Character` — Erika Hall body paragraph (Mule Design co-founder, *Just Enough Research*, *Conversational Design*, evidence-gated critique). Replaces prior Anna Wintour paragraph in the same section.
- `skills/kk-ds-maintainer/SKILL.md § Character` — Rachel Andrew body paragraph (CSS Grid spec co-editor at W3C, former Smashing Magazine editor-in-chief, bundle discipline).
- `skills/kk-design-system/pipeline.md § Role roster` — footnote pointing agents to each skill's own §Character section for the full reference.

### Removed
- Nothing. Patch release.

### Moved
- `skills/kk-role-design-director/SKILL.md` frontmatter `character.name` — Charlotte Perriand → Paula Scher. Perriand was a designer, not a director; Scher's strategic-commitment work is the prototype.
- `skills/kk-role-designer/SKILL.md` frontmatter `character.name` + voice — Hella Jongerius → Susan Kare. Kare is the prototype for "every state of every variant answered".
- `skills/kk-role-meta-reviewer/SKILL.md` frontmatter `character.name` + voice — Anna Wintour → Erika Hall. Wintour was cultural shorthand for ruthless; Hall is the actual rubric-gated UX reviewer.
- `skills/kk-ds-maintainer/SKILL.md` frontmatter `character.name` + voice — Jessica Hische → Rachel Andrew. Hische is a letterer; Andrew runs production CSS systems with explicit version discipline.
- `skills/kk-design-system/pipeline.md § Role roster` — the four swapped rows rewritten with why-this-person descriptions tied to each practitioner's actual work.
- `package.json` version `1.0.0` → `1.0.1`. Patch bump — character metadata only; no mandate, trigger description, or consumer API changed.

### Open
- Seven other roles (analyst, fresh-eyes, ds-manager, design-engineer, consistency-jobstory, consistency-ds, meta-retro) carry character in frontmatter + some have body paragraphs, others do not. Asymmetric. Not bundled here — user may extend the §Character body-paragraph convention to all roles in a future patch.

## 1.0.0 — 2026-04-23

Pipeline-v3. Eight stages. Ten role skills. Three-track designer parallel collapses to N-per-pattern on one designer track. UX writer role eliminated — designers ship UI copy drafts. Revolutionary protocol deleted — user-approved exceptions replace it. Fresh-eyes jobstory loop (Steve Jobs character, Haiku) frames designer output via pre-question + post-validation. DS Manager absorbs PM role. Design Engineer refined from frontend engineer. Stage-10 reviewer trio becomes two dumb consistency officers (Steve Jobs + Dieter Rams) + one strict meta-reviewer (Anna Wintour, Opus, rubric-gated). Every role carries `model:` + `character:` frontmatter. `kk-ds-frontend` + `kk-ds-supervisor` deprecated, retained for historical session playback. See `proposals/2026-04-23-retro.md` for the full proposal set.

### Added
- `skills/kk-role-design-director/SKILL.md` — Opus, Charlotte Perriand. Brings multiple directions at session open; aligns on one with the human; writes the direction document with pattern blocks, exceptions, alignment transcript. Replaces the deleted `kk-role-art-director`.
- `skills/kk-role-designer/SKILL.md` — Sonnet, Hella Jongerius. Single-track designer, one per pattern block, N parallel. Answers 3a fresh-eyes questions in ASCII across states, variants, edge cases, example content, UI copy drafts. Replaces the deleted `kk-role-designer-conservative`.
- `skills/kk-role-design-engineer/SKILL.md` — Sonnet, Sara Soueidan. Refined frontend engineer. Piece-by-piece landing, state fidelity, designer copy verbatim, dummy text flagged only. DS-engineer mode retained for kit refactors. Replaces the deleted `kk-role-frontend-engineer`.
- `skills/kk-role-fresh-eyes-jobstory/SKILL.md` — Haiku, Steve Jobs. Two modes: pre-designer (3a, naive question list per pattern) + post-designer (3c, pass/fail per question).
- `skills/kk-role-ds-manager/SKILL.md` — Sonnet, Muriel Cooper. Stage 4 PM-absorbing catalog role. Per-block component map, build-order task split, kit-demo references.
- `skills/kk-role-consistency-jobstory/SKILL.md` — Haiku, Steve Jobs. Stage 6a cold-read jobstory audit. Zero upstream context, five-section output.
- `skills/kk-role-consistency-ds/SKILL.md` — Haiku, Dieter Rams. Stage 6b cold-read strict audit against `components.md` + `tokens.json`. Class resolution, token compliance, off-grid spacing, pattern-language drift.
- `skills/kk-role-meta-reviewer/SKILL.md` — Opus, Anna Wintour. Stage 7 rubric-gated verdict. Rejects "it's fine" replies. Six rubric items, each answered with file:line evidence or left open.
- `skills/kk-design-system/pipeline.md` — §Fidelity contract, §Reiterate protocol, §Meta-reviewer rubric, §Dumb-reviewer character, §Role roster sections. Full v3 stage list. Updated §Parallel spawning, §Entry point matching, §Failure mode.
- `proposals/README.md` — convention note for retro-produced proposal files.
- Every role + maintainer SKILL.md `metadata:` — `model:` + `character:` keys. Model tiered Haiku / Sonnet / Opus by role capability. Character tiered women (clever) / men (dumb-reviewer) per role-roster mapping.

### Removed
- `skills/kk-role-art-director/` — replaced by `kk-role-design-director` (renamed + remandated).
- `skills/kk-role-designer-conservative/` — replaced by `kk-role-designer` (renamed + single-track mandate).
- `skills/kk-role-frontend-engineer/` — replaced by `kk-role-design-engineer` (renamed + piece-by-piece + designer-copy-verbatim mandate).
- `skills/kk-role-designer-ux/` — eliminated. Single-track designer only.
- `skills/kk-role-designer-revolutionary/` — eliminated. Canon changes route via `kk-ds-maintainer` retros only.
- `skills/kk-role-ds-reviewer/` — eliminated. Three-hand-off comparative role has no subject under v3.
- `skills/kk-role-concept/` — eliminated. Concept stage collapses into the design-director's direction document.
- `skills/kk-role-ux-copywriter/` — eliminated. Designers ship UI copy drafts at 3b; no separate writer.
- `skills/kk-role-ux-copy-reviewer/` — eliminated. Voice binding enforced at meta-reviewer rubric item 5.
- `skills/kk-design-system/manifesto.md § Revolutionary protocol` — section deleted. Replacement affordance: user-agreed exceptions in the direction doc, logged via meta-reviewer rubric item 6.

### Moved
- `skills/kk-design-system/manifesto.md § Pipeline` — updated to name eight stages, ten roles, no in-pipeline canon changes.
- `skills/kk-ds-frontend/SKILL.md` + `skills/kk-ds-supervisor/SKILL.md` — frontmatter marked `status: deprecated` with `replaced-by:` pointers. Files retained for historical session playback.
- `package.json` version `0.13.0` → `1.0.0`. Major bump: nine role-skill `description:` trigger phrases changed (renames, new mandates, deprecations), pipeline stage numbers renumbered consumer-visible, six role skills deleted. Backward-incompatible with pipeline-v2 session folders.
- `package.json` description field — eight-stage pipeline-v3 summary.
- `package.json` `files` array — pruned six deleted role skill dirs, added five new ones, tracked the three renames.
- Role SKILL.md `metadata.version` unchanged per precedent.

### Open
- `.claude-plugin/plugin.json` still reads `0.4.0`; `package.json` sits at `1.0.0`. Drift flagged in 0.12.1; not bundled here per the proposal's scope discipline. Resync remains its own decision.
- Existing `documentation/<session>/` folders under the v2 schema (e.g. `2026-04-22-wealthy-operator-alpha`) remain under pipeline-v2 filenames. Not backported. Only new sessions use v3 schema.

## 0.13.0 — 2026-04-22

Comment: `Approve` + `Archive thread` actions in kebab menu. Resolved threads collapse to checkmark + replacement snippet. Archived threads hidden via `data-archived` (data preserved for future UI). `kk:comment` event gains `approve` (carries `replacementText` + anchor for doc-body sync) and `archive` (thread kept, not removed) action types.

### Added
- `js/kit.js` — two new menu items (`Approve`, `Archive thread`) in `buildMessage`. New kebab branches in the selection-flow click handler: `Approve` validates the thread's last list message carries `data-author-role="agent"`, collapses the thread to a resolved row, and emits `action: 'approve'` with `replacementText` + full anchor triple + `cluster` + `sectionSlug`. `Archive thread` sets `data-archived="true"` and emits `action: 'archive'` with `threadRemoved: false`.
- `js/kit.js` — `commitDraft` now mirrors the draft's anchor metadata (`kkAnchorQuote`, `kkAnchorPrefix`, `kkAnchorSuffix`, `kkSectionSlug`, `kkCluster`) onto the new thread's dataset. Approve re-reads from the thread at action time.
- `js/kit.js` — `refreshApproveAvailability` runs on every kebab open and toggles `data-can-approve="true"` on the thread based on the last list message's `data-author-role`. CSS hides the Approve item when the attribute is absent.
- `style.css` — archived-thread hide rule (`.comment-stack > .comment-thread[data-archived="true"] { display: none; }`). Resolved-thread layout (`.comment-thread__resolved` flexbox row: stamp + snippet + byline). Approve-gating rule (`.comment-thread:not([data-can-approve="true"]) .comment__menu-item--approve { display: none; }`).
- `index.html § Comment` — Lifecycle spec list gains Approve and Archive thread rows. Intro body gains a paragraph naming the four kebab actions. Example stack gains a static resolved-thread card under the existing interactive thread.
- `index.html` — every existing `.comment__menu-popover` (14 total across the doc) updated to carry the four menu items in the new order.
- `skills/kk-design-system/components.md § Comment` — added a paragraph on the 0.13.0 menu surface: four actions, Approve gating on `data-author-role="agent"`, Archive's `data-archived` hide.
- `skills/kk-design-system/manifesto.md` — `action: 'approve'` and `action: 'archive'` payload shapes. Note on `data-author-role` as consumer-owned classification. Total action list updated to five.
- `docs/integration/comment.md` — `approve` and `archive` event sections, full Flask / Next.js / Rails snippets for both, new data-attribute rows (`data-author-role`, `data-resolved`, `data-archived`), and a 0.13.0 row in the version-history table.

### Removed
- Nothing. Additive release.

### Moved
- `package.json` version `0.12.1` → `0.13.0`. Minor bump: two new public action types on the `kk:comment` event, one new `data-*` attribute consumers may set (`data-author-role`), two new CSS state attributes kit writes (`data-resolved`, `data-archived`). Backward-compatible.
- `js/kit.js` `KK.version` string `0.11.0` → `0.13.0` (had been stale since 0.12.0).
- Role SKILL.md `metadata.version` unchanged per precedent.

### Open
- `.claude-plugin/plugin.json` still reads `0.4.0`; `package.json` sits at `0.13.0`. Drift flagged in 0.12.1. Resync remains its own decision, not bundled here.
- Archived threads have no re-surface UI. Data is preserved; the toggle lands when a consumer asks for it.

## 0.12.1 — 2026-04-22

Card rail patch. The "half + half" inset contract now covers raw prose direct-children. Before, kit components paid their 12px half and landed on the 24px rail; a bare `<p>`, `<ol>`, `<ul>`, or `<dl>` dropped inside `.card` paid nothing and sat at the 12px shell. Six call sites in `index.html` exhibited the drift, including the "Empty right now" backlog card and the "Why not auto-merge" caveat card under the iteration section.

The fix is kit-side: the rail contract absorbs raw text and list children. Authors do not wrap a one-line empty state in `card__body` just to get on the rail.

### Added
- `style.css` — new rule `.card > p, .card > ol, .card > ul, .card > dl { padding-left/right: var(--card-inset-x); }` placed alongside the existing `.card > .deck` and `.card > .button` direct-child inset rules. Comment block names the failure mode it closes and the older selector it supersedes.
- `index.html § Card` — two-sentence addition under the variants intro, naming the rail as the default and calling out raw paragraphs and lists.
- `skills/kk-design-system/components.md § Card` — raw-prose code example plus a Rules bullet covering `<p>`/`<ol>`/`<ul>`/`<dl>`.

### Removed
- `style.css` — old rule `.doc .card > .doc__spec { padding-left/right: var(--card-inset-x); }`. `.doc__spec` is always a `<dl>`, so the new `.card > dl` selector covers it in every context. Removing the duplicate leaves one rail path with one owning comment.

### Moved
- `package.json` version `0.12.0` → `0.12.1`. Patch bump: card layout fix, no consumer-visible API change beyond previously off-rail prose now landing on the rail.
- The six existing off-rail call sites in `index.html` (raw `<p>`/`<ol>` direct children of `.card` at lines 2376, 2409, 2606, 2739, 2773, 2876) now render on the 24px rail without any HTML edit. No call-site churn.

### Open
- `.claude-plugin/plugin.json` still reads `0.4.0`; package.json sits at `0.12.1` after this bump. The two have drifted since the 0.4.0 ship and the maintainer skill's lockstep rule is honored only in the breach. Resyncing is its own decision and is not bundled here.

## 0.12.0 — 2026-04-22

Agent communication protocol lands. Every role skill in the pipeline now speaks to the user in caveman register by default: articles, filler, pleasantries, and hedging dropped from conversation output. Structured artefacts (code, file paths, frontmatter, ASCII mockups, JSON component trees, manifest-diff entries, blockquoted user input) render untouched. Auto-clarity carve-out drops caveman for multi-step sequences, destructive confirmations, and clarification requests. User override: `stop caveman` reverts; `/caveman lite` or `/caveman ultra` switches intensity. Source inspiration: JuliusBrussee/caveman.

Scope boundary called out inside the protocol itself: this governs agent-to-user conversation. `voice.md` continues to govern rendered document prose and UI labels. When writing to an artefact, voice.md wins; when replying in conversation, the new protocol wins.

### Added
- `skills/kk-design-system/pipeline.md § Protocols → Agent communication protocol` — new subsection placed between Revolutionary protocol and Documentation contract. Carries the five rule bullets (drop articles / filler / pleasantries / hedging; fragments OK; unchanged surfaces; unchanged structured artefacts; auto-clarity carve-out), the two override commands, and the voice.md boundary.
- Cross-reference line `- ../kk-design-system/pipeline.md — §Agent communication protocol` added to the canon-load block of every role skill: `kk-role-analyst`, `kk-role-art-director`, `kk-role-concept`, `kk-role-designer-conservative`, `kk-role-designer-ux`, `kk-role-designer-revolutionary`, `kk-role-ds-reviewer`, `kk-role-frontend-engineer`, `kk-role-ux-copywriter`, `kk-role-ux-copy-reviewer`, `kk-role-meta-retro` (noted inline since meta-retro loads the full file), `kk-ds-frontend`, `kk-ds-supervisor`. Thirteen skills total.

### Moved
- `package.json` version `0.11.1` → `0.12.0`. Minor bump: additive behavioural rule across every pipeline role.
- Eleven `skills/kk-role-*/SKILL.md` hardlinks into `.claude/skills/` re-linked after the Edit tool's atomic-rename broke them mid-session. Verified via `stat -f "%i"` parity on both paths after re-link. Second session in a row with this failure mode — the maintainer skill's hidden-failure-mode entry continues to earn its place.

### Open
- Nothing carried.

## 0.11.1 — 2026-04-22

Propagation patch. The integration-doc convention established in 0.11.0 now lives as system rule in the skills that would otherwise not know about it. Also captures one hardlink drift issue that surfaced during the 0.11.1 edits themselves.

### Added
- `kk-ds-maintainer` SKILL.md bundle rule gains item 7: integration doc at `docs/integration/<component>.md` required when a change touches a component's consumer-facing API. If the doc does not exist yet and the change creates the first public API for the component, the doc is created in the same PR.
- `kk-ds-maintainer` hidden failure modes gain two entries:
  - **Public API change without integration-doc update.** Events, config keys, and data attributes are public API; shipping them without updating the doc leaves consumers to read source.
  - **Hardlink drift between `skills/` and `.claude/skills/` after edits.** Some editors (Claude Code's Edit tool included) break hardlinks via atomic write-and-rename. Verify with `stat -f "%i %N"` on both paths; re-link with `rm + ln` if inodes diverge.
- `kk-role-frontend-engineer` SKILL.md DS-engineer mode gains a bullet: flag integration-doc impact when a refactor adds or changes a component's consumer-facing API. If the doc exists, update inline; if not and the change creates the first public API, propose creating it.
- `manifesto.md § Runtime` gains a general integration-docs paragraph under Comment lifecycle events, generalising from "here's the Comment doc" to "here's the convention, today only Comment qualifies".

### Moved
- `package.json` version `0.11.0` → `0.11.1`.
- One hardlink between `skills/kk-role-frontend-engineer/SKILL.md` and its `.claude/skills/` sibling went stale mid-session because the Edit tool rewrote via atomic rename. Re-linked before ship.

### Open
- Nothing carried.

## 0.11.0 — 2026-04-22

Third `kk:comment` action lands: `delete`. Every `.comment-msg` gets a stable `data-message-id` so deletes address messages by identity, not DOM position. New `docs/integration/comment.md` carries the full consumer-facing surface (the three actions, config, data attributes, three framework patterns, anti-patterns) — first file under the integration-docs convention, written while the API is fresh.

### Added
- `action: 'delete'` in the `kk:comment` event. Detail: `{ action, threadId, messageId, threadRemoved }`. `threadRemoved` is true when deleting the last message drops the whole thread card; consumer picks whether to delete the server-side thread too or just the one message.
- `data-message-id` on every `.comment-msg`. Kit stamps it at creation time; server-rendered pre-existing messages can set their own (server ids) and kit respects them.
- `ensureMessageId` helper inside `initCommentSelectionFlow`; one-time scan stamps any pre-rendered message missing an id.
- `messageId` field added to existing `action: 'new'` and `action: 'reply'` event payloads. Additive — consumers that did not destructure it keep working; consumers that need delete tracking now have the handle.
- `docs/integration/comment.md` — full integration doc for the comment component. Sections: enable-or-own decision, events (all three actions), data attributes, config, Flask + Next.js + Rails patterns, anti-patterns, per-component version history.
- Cross-link from `components.md` § Comment → `docs/integration/comment.md`.

### Moved
- Manifesto § Runtime → Comment lifecycle events updated to include the delete action, the `messageId` field on all three actions, and a pointer to the integration doc.
- `package.json` version `0.10.0` → `0.11.0`. Kit's `window.KK.version` bumped in lockstep.

### Open
- `action: 'resolve'` and an edit action. Neither has a real consumer request; deferred.

## 0.10.0 — 2026-04-22

Comment lifecycle events. Consumers that use `KK.enableCommentSelectionFlow()` and need to persist comments to a backend (Flask portal, Next.js API, Rails controller) now listen for `kk:comment` — a `CustomEvent` dispatched on `.comment-stack` — instead of re-implementing the selection flow or observing DOM mutations. Framework-neutral JS event shape (camelCase) keeps the universal consumer story clean; Python/Ruby/PHP backends rename on their POST body.

### Added
- `kk:comment` `CustomEvent` on `.comment-stack`, bubbles to `document`. Two actions in 0.10.0:
  - `action: 'new'` — draft committed, thread card created. Detail: `{ action, threadId, anchorQuote, anchorPrefix, anchorSuffix, cluster, sectionSlug, text }`.
  - `action: 'reply'` — message appended to an existing thread. Detail: `{ action, threadId, text }`.
- Anchor prefix/suffix capture in the selection flow. Pulls the ±20 chars around the first occurrence of the selected text inside the nearest `.doc__section` (falls back to the nearest paragraph-like parent). Feeds fuzzy re-anchoring on the consumer's server side; no numeric offsets, no hash fingerprints.
- `[data-cluster]` ancestor read at anchor time. Consumers annotate top-level sections with `data-cluster="strategy"` / `"call"` / `"research"` / etc., and kit reports it in the event. `null` if the attribute isn't set.
- `§ Runtime → Comment lifecycle events` in `manifesto.md`. Payload spec + a universal consumer snippet.

### Moved
- Kit ships `version: '0.10.0'` in its `window.KK` object as well as `package.json`, kept in lockstep.
- Selection flow's `captureAnchorContext()` helper is internal to `initCommentSelectionFlow`; not part of the public API surface, which stays at four entries (`init`, `refresh`, `enableCommentSelectionFlow`, `config`).

### Open
- `action: 'delete'` and `action: 'resolve'`. Both blocked on adding per-message stable ids inside kit (messages currently tracked by DOM position). Not in scope for 0.10.0; landed when a consumer needs them.

## 0.9.1 — 2026-04-22

Maintainer skill patch. Prompted by a real incident where four kit versions (0.6, 0.7, 0.8, 0.9) shipped to disk and to CHANGELOG but never reached origin because the maintainer skill did not mandate commit + tag + push explicitly. A sibling agent fetched the repo, saw v0.4.0, and flagged it.

### Added
- `Ship protocol` section in `skills/kk-ds-maintainer/SKILL.md`. Four mandatory steps: commit with explicit paths, annotated tag (`vX.Y.Z`), push main, push tag. Requires human OK before the push step. Naming-matches the existing `v0.2.0`–`v0.5.0` tag convention.
- Two new hidden failure modes in the maintainer skill: **Unshipped versions** (version bump without a pushed tag) and **Role skills under `.claude/skills/` instead of `skills/`** (local runtime cache vs canonical shipping path; hardlink from one into the other inside this repo).

### Moved
- `package.json` version `0.9.0` → `0.9.1`.

### Open
- Nothing carried.

## 0.9.0 — 2026-04-22

`KK.refresh()` is real now. Consumers that inject new DOM after the initial load (SPA-style swaps, lazy-loaded sections, route-driven content) call `KK.refresh()` to wire up new elements without teardown or a page reload. Closes the last open item from 0.7.0.

### Added
- Idempotent re-scan inside every auto-init module. Each module tracks whether its global listeners are bound; subsequent calls only pick up new iterable elements.
- Per-wrapper `data-kk-deck-bound="true"` marker on `.deck` elements. Bound wrappers skip re-init; new wrappers bind on `KK.refresh()`.
- `bound` state map inside kit.js covering scroll-spy, narrow-view toggle, column reveal, inspector stack, comment menus. Delegation-based modules (narrow-view, inspector stack, comment menus) already picked up new children for free; the sentinel prevents redundant listener re-attachment.
- Scroll-spy now queries `.doc__section` live on every callback, so SPA-added sections participate in the "first visible" calculation without a teardown. Nav links also live-queried so new links get `.is-active` state.

### Moved
- `KK.refresh()` from no-op stub to a real function that calls each auto-init in sequence. Safe to over-call. Bound elements are skipped; unbound elements get wired.
- Scroll-spy internal `sections` / `links` closures replaced with live queries at call sites. Small perf cost on every callback, acceptable given the call rate.
- `package.json` version: `0.8.0` → `0.9.0`.

### Open
- Nothing carried. Backlog is empty.

## 0.8.0 — 2026-04-22

Kit polish. Four baked-in English strings in `js/kit.js` move to overridable config. Doc-spec tables cap their first two columns at 30% each so prose-heavy value columns get room to breathe. Prototype-alpha's Russian deck labels come back — the 0.7.0 regression is resolved.

### Added
- `window.KK.config.i18n` — overridable text strings for kit.js-generated DOM. Four keys: `addComment`, `reply`, `deckChoose`, `deckChosen`. Defaults ship in English. Consumers set the object before loading `js/kit.js` to change them.
- `attrEscape` helper inside `kit.js` — minimal HTML-attribute escape used when injecting i18n strings into innerHTML placeholder contexts.
- Config override pattern documented in `manifesto.md § Runtime` with a Russian example.
- `prototype-alpha/index.html` now sets `KK.config.i18n` to Russian before loading kit.js.

### Removed
- Hardcoded strings `"Add a comment"`, `"Reply…"`, `"Choose"`, `"Chosen"` inside kit.js module bodies. All four read from `KK.config.i18n` now.

### Moved
- `.doc__spec` grid columns: `minmax(140px, max-content) 1fr` → `minmax(140px, 30%) 1fr`. Key column caps at 30%.
- `.doc__spec--value` grid columns: now `minmax(120px, 30%) minmax(60px, 30%) 1fr`. Key and middle-value each cap at 30%; prose gets the rest.
- `.doc__spec--triple` grid columns: `1fr 1fr 1fr` → `minmax(0, 30%) minmax(0, 30%) 1fr`. First two cap at 30%; third takes the remainder. Affects Claim/Reality/Resolution-style tables where the third column carries the prose.
- `package.json` version: `0.7.0` → `0.8.0`.

### Open
- **`KK.refresh()` still a stub.** Carried over from 0.7.0. SPA re-bind support remains a 0.9.0 concern.
- Deck's initial button text lives in consumer HTML, not config. If a consumer sets `deckChoose: 'Выбрать'` but writes `<button>Choose</button>` in the HTML, the first paint mismatches. Documented in manifesto; no code-level enforcement yet.

## 0.7.0 — 2026-04-22

Kit behaviour extracted. Seven JS modules that used to live inline in `index.html` now ship as a shared `js/kit.js`. Any consumer that loads the file gets scroll-spy, deck controller, card stack, column reveal, narrow-view toggle, and comment kebab menus for free. The selection-to-draft comment flow is opt-in via `KK.enableCommentSelectionFlow()` to avoid colliding with prototypes that own a localized selection handler. First pipeline-v2 run — analyst at stage 1, frontend engineer in DS-engineer mode at stage 8, reviewers at stage 10, no design phase.

### Added
- `js/kit.js` — 979 lines. Six auto-init modules (scroll-spy, narrow-view toggle, column reveal, inspector card stack, comment menus, deck) plus one opt-in module (selection-to-draft comment flow). Public API on `window.KK`: `init`, `refresh`, `enableCommentSelectionFlow`.
- `documentation/2026-04-22-kit-js-extraction/` — session artifacts. First session produced under pipeline-v2.
- `## Runtime` section in `manifesto.md` naming `js/kit.js` and the public API surface.
- `js/kit.js` reference in `index.html` across `#skill` (kit ships two ways), `#install` (package contents), and `#ownership` (kit files list).

### Removed
- Inline `<script>` block at the bottom of `index.html` (lines 3218-4306 in 0.6.0, ~1088 lines). Content moved verbatim to `js/kit.js` with one rename for clarity (`setActive` → `promoteCard` inside the inspector stack module).
- Duplicate deck controller in `prototype-alpha/app.js` (102 lines). Kit.js owns the deck; prototype-alpha trusts it.

### Moved
- `index.html` now loads `./js/kit.js` via `<script src>`. A second inline `<script>` calls `KK.enableCommentSelectionFlow()` so the manifesto page keeps its live comment demo.
- `prototype-alpha/index.html` loads `../js/kit.js` before `data.js` + `app.js`. No call to `enableCommentSelectionFlow` — the prototype owns its own Russian-labeled selection flow.
- `prototype-alpha/app.js` line count: 618 → 516.
- `index.html` line count: 4326 → 3243.
- `package.json` `files` array: added `js/` directory.
- `kk-role-frontend-engineer` SKILL.md: `../kit.js` → `../js/kit.js`. Added a note on when to call `KK.enableCommentSelectionFlow()`.

### Open
- **i18n config deferred to 0.8.0.** Three strings bake in English inside `js/kit.js`: `"Add a comment"` (draft placeholder), `"Choose"` / `"Chosen"` (deck button label swap), `"Reply…"` (thread reply placeholder). Prototypes that need other locales currently must either fork the kit (anti-pattern) or avoid the opt-in comment flow. 0.8.0 adds `KK.config.i18n` for these.
- **`KK.refresh()` is a stub.** SPA consumers that mount content after load need a re-query path. Real behaviour lands in 0.8.0.
- **One known regression:** `prototype-alpha` deck labels revert from Russian «Выбрать» / «Выбрано» to English "Choose" / "Chosen". Resolves when 0.8.0 ships i18n config.

## 0.6.0 — 2026-04-22

Pipeline overhaul. The five-stage pipeline (hypothesis, iteration, contrast, supervision, magic) is replaced by a ten-stage pipeline organised into three phases: think (stages 1-3), hand-off (stages 4-7), build (stages 8-10), plus an on-demand meta-retro. Nine new role skills ship. Documentation contract and revolutionary protocol formalised.

### Added
- `skills/kk-design-system/doc-format.md` — shared output contract for every role skill. Frontmatter spec, disk artifact body structure, conversation return shape, README template.
- Eleven new role skills under `skills/kk-role-*/`:
  - `kk-role-analyst` — stage 1. Decomposes the brief, produces job stories and open questions.
  - `kk-role-art-director` — stage 2. Produces five or more directions with intent and guardrails.
  - `kk-role-concept` — stage 3. Spawned 3-5 in parallel. ASCII flows, JSON component trees, shape-up framing.
  - `kk-role-designer-conservative` — stage 4. Strict kit inventory, no inventions.
  - `kk-role-designer-ux` — stage 5. Reorganises within kit rules, no inventions.
  - `kk-role-designer-revolutionary` — stage 6. May break rules with a matching `manifest-diff.md` entry.
  - `kk-role-ds-reviewer` — stage 7. Comparative review of three hand-offs, no ranking.
  - `kk-role-frontend-engineer` — stage 8. Ships prototype structure with placeholder copy comments.
  - `kk-role-ux-copywriter` — stage 9. Fills every placeholder, enforces voice consistency.
  - `kk-role-ux-copy-reviewer` — stage 10 (parallel). Voice, AI-tells, button discipline.
  - `kk-role-meta-retro` — on-demand. Reads session documentation, proposes canon updates.
- `documentation/2026-04-22-wealthy-alpha/` — twelve files from the alpha session that triggered the pipeline redesign. Reference material for every role skill.
- `prototype-alpha/` — the alpha build (renamed from `prototype/`) preserved as voice and content reference.
- `manifesto.md` § Pipeline — short section pointing at `pipeline.md`.
- `manifesto.md` § Documentation contract — short section pointing at `doc-format.md`.
- `manifesto.md` § Revolutionary protocol — short section with the diff shape.
- `index.html` mirrored sections: `#think`, `#handoff`, `#build`, `#meta-retro`, `#doc-contract`, `#revolutionary`. Sidebar Pipeline nav group updated to match.

### Removed
- `index.html` articles `#hypothesis`, `#iteration`, `#boost`, `#supervision`, `#implementation`, `#magic`. Content replaced by the three-phase structure.

### Moved
- `skills/kk-design-system/pipeline.md` rewritten end to end. Ten stages, three phases, gates, inputs, outputs, canon-load per role.
- `skills/kk-ds-supervisor/SKILL.md` frontmatter description: stage 4 supervisor becomes stage 10 consistency reviewer, also runs as stage 7 DS reviewer when invoked comparatively.
- `skills/kk-ds-frontend/SKILL.md` frontmatter description: stage 4 code pass becomes stage 10 frontend reviewer.
- `skills/kk-design-system/SKILL.md` frontmatter description: names the ten-stage pipeline and the nine role skills.
- `package.json` `files` array: added eleven `skills/kk-role-*/` entries plus `skills/kk-ds-maintainer/`.
- `prototype-alpha/index.html` font preload reference: `fonts/manrope/Manrope-Latin.woff2` → `fonts/commissioner/Commissioner-Latin.woff2`. Carryover from the 0.5.0 font swap.

### Open
- `kit.js` extraction is deferred to 0.7.0. The shared behavioural JS (scroll-spy, deck controller, card stack, comment menu, FABs, selection-to-highlight) still lives inline in `index.html` and is not reachable by prototypes. The next release dogfoods the new pipeline by running the extraction through `kk-role-analyst` plus `kk-role-frontend-engineer`.

## 0.5.0 — 2026-04-22

Typeface swap. Commissioner replaces Manrope. Both ship under SIL OFL 1.1, so this is a visual call, not a license fix. Commissioner's humanist letterforms read warmer at hero (66 px) and display (38 px) sizes than Manrope's grotesque, which suits the signed-deliverable tone of the kit.

### Added
- `fonts/commissioner/Commissioner-Latin.woff2` — weights 200–800, Latin + Western European script coverage.
- `fonts/commissioner/Commissioner-Cyrillic.woff2` — weights 200–800, Russian, Ukrainian, Belarusian, and allied scripts.
- `fonts/commissioner/OFL.txt` — SIL OFL 1.1 license for the Commissioner files.

### Removed
- `fonts/manrope/` — all Manrope `.woff2` files and the OFL license. Not purged from git history this time; the outgoing typeface was itself redistributable, so the binaries can stay in prior commits.

### Moved
- `--font-body` in `vars.css` and `type.family` in `tokens.json` now resolve to `Commissioner`. System fallbacks unchanged.
- `style.css` `@font-face` blocks point at `fonts/commissioner/*.woff2`; `index.html` preload points at the Latin subset.
- Typography rule in `manifesto.md` names Commissioner. Regular-on-Medium guidance carries over unchanged.
- `kk-design-system` skill `description` in `SKILL.md` frontmatter now reads "Commissioner typography" instead of "Manrope typography".
- Type credit in `index.html` now reads "Commissioner. A variable font (SIL OFL 1.1) by Kostas Bartsokas."

### Open
- Nothing carried over.

## 0.4.0 — 2026-04-21

Typeface swap. PP Neue Montreal was never licensed for redistribution inside an npm package — Pangram Pangram's EULA §3.7 prohibits distributing copies or uploading the font publicly. The kit now ships Manrope, a variable font under SIL OFL 1.1.

### Added
- `fonts/manrope/Manrope-Latin.woff2` — weights 200–800, Latin + Western European script coverage.
- `fonts/manrope/Manrope-Cyrillic.woff2` — weights 200–800, Russian, Ukrainian, Belarusian, and allied scripts.
- `fonts/manrope/OFL.txt` — SIL OFL 1.1 license for the Manrope files.
- Single `<link rel="preload">` in `index.html` pointing at the Latin subset; Cyrillic lazy-loads via `unicode-range`.

### Removed
- `fonts/montreal/` and every PP Neue Montreal `.woff` / `.woff2` binary. Purged from the entire git history with `git filter-repo --path fonts/ --invert-paths`; all prior commits and tags rewritten. Old commit SHAs are dead.
- The legacy `.woff` fallback. Manrope ships `.woff2` only — evergreen browsers cover it, IE11 is not a support floor.

### Moved
- `--font-body` in `vars.css` and `type.family` in `tokens.json` now resolve to `Manrope`, falling back to the system stack.
- `style.css` `@font-face` blocks collapsed from three weight-specific declarations to two subset-specific declarations. Variable-weight axis (`font-weight: 200 800`) covers the full range per subset.
- Typography rule in `manifesto.md` names Manrope and explains why the 400 axis is still skipped at body size.
- `kk-design-system` skill `description` (in `SKILL.md` frontmatter) now reads "Manrope typography" instead of "PP Neue Montreal". The skill `homepage` field updated to the real repo URL.

### Open
- Nothing carried over. Backlog is empty.

## 0.3.1 — 2026-04-21

Resolves the mobile padding drift open item from 0.3.0.

### Fixed
- Phone columns now fill the viewport. The 0.3.0 phone grid `.app { grid-template-columns: 1fr }` was losing the cascade to the tablet rule `.app[data-view="nav"] { grid-template-columns: minmax(220px, var(--sidebar-w)) 1fr }` on specificity (0,1,0 vs 0,2,0), so sidebar stayed pinned at 260 px even at 392 px viewport. Phone selector raised to `.app[data-view]` to tie on specificity and win on source order.
- Inspector goes flush on phone. Zero horizontal column padding so shout cards own the full viewport width; card-internal `--card-inset-x` (12 px) is the only horizontal rhythm.
- Doc and nav move to a 24 px rail on phone (`--space-6`, up from 16 px).
- Nav-group dividers run edge-to-edge on phone. `left: 0; right: 0;` override for `.nav-group::after`.
- Doc intro sits snug against the top of the column on phones. `.doc__intro { padding-top: 0 }`.

### Added
- `viewport-fit=cover` on the meta viewport so iOS safe areas are reported; pages can draw under the status bar and home indicator.
- `html, body { width: 100% }` in the base reset (defensive).

### Moved
- `homepage` in `package.json` and `.claude-plugin/plugin.json` updated from the placeholder `github.com/kk-consulting/kk-design-system` to the actual repo `github.com/konstantinopolskii/kk-agentic-ds`. Added a `repository` field to `package.json` so `npm` can resolve the git install.

## 0.3.0 — 2026-04-21

### Added
- Global `::selection` rule in `style.css`. Selection renders inverted using `--color-text` on `--color-bg`. No native blue, no custom color. Documented as a color foundation in `manifesto.md`.
- `Dismiss` row under `#states` in `index.html`. Clicking empty space inside the inspector collapses whatever is active.

### Fixed
- 3D card stack on mobile. Tap handlers now scope per card; the runtime overlay that swallowed every touch is gone.
- Comment selection. The native range re-anchors onto the freshly-wrapped `.highlight` spans, so `⌘/Ctrl+C` copies the marked text again.
- Inspector glide scroll when a draft dismisses mid-promotion. `setActive` defers its layout measurement one frame so the `MutationObserver` that removes an empty draft flushes before `cardRect.top` is read.
- Tablet column resize across 1025–1440 px. `.app` grid-template-columns uses clamp-based widths, so sidebar and inspector shrink smoothly with the viewport instead of gluing to their max until the tablet breakpoint. `#columns` spec table updated.

### Moved
- `clearDomSelection` helper removed from `index.html`. Unused after the selection-preserving rewrite.

### Open
- Mobile padding drift logged in `#backlog` with specifics: phone `.doc` rail is 16 px, `.inspector` rail is 8 px. Unify or justify — pending review.

## 0.2.0 — 2026-04-21

### Added
- Frontend sub-skill `kk-ds-frontend` in `skills/kk-ds-frontend/` — stage 4 code pass. Rewrites the stage-three draft for semantics, accessibility, JS simplicity, mobile behavior, and cross-browser safety. Visual is frozen; kit classes, tokens, and layout structure stay untouched. Runs before `kk-ds-supervisor`.
- `#implementation` section in `index.html` describing the new stage-4 role.

### Moved
- Stage 4 in `pipeline.md` expanded into two sub-stages: `4a` frontend rewrite, `4b` supervisor audit. Supervisor behavior and output shape unchanged.
- `#stack` card in `index.html` now lists three skills. Supervisor entry narrowed to "stage 4, audit".
- Step 4 row in the `#pipeline` overview card names both roles.

## 0.1.0 — 2026-04-21

### Added
- npm package `@kk/design-system` shipping `vars.css`, `style.css`, `fonts/`, `signature.svg`.
- Claude skill `kk-design-system` in `skills/kk-design-system/` — SKILL.md, tokens.json, manifesto.md, pipeline.md, components.md, voice.md, patterns/strategy-doc.md.
- Supervisor sub-skill `kk-ds-supervisor` in `skills/kk-ds-supervisor/` — stage 4 audit.
- Claude Code plugin manifest at `.claude-plugin/plugin.json`.
- Postinstall symlinks `skills/` into consumer's `.claude/skills/`.

### Removed
- Old copy-files install instructions from the documentation.
