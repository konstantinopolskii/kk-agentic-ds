---
session: 2026-04-24-content-architecture
stage: 6c (rerun)
role: voice-reviewer (George Orwell)
input: second-wave build + canon/voice.md
output: per-file voice audit — verify all in-scope flags from first run resolved; flag any remaining defects
gate: feeds stage 7 rerun
---

Cold rerun against `canon/voice.md` after KK-stamped fixes landed. Every first-run flag walked. Em-dash count rerun across every file. New defects flagged where they appear.

## First-run flags — resolution check

### `index.html` headline em-dash (1 flag)

- **Resolved.** `index.html:6` title `<title>Agentic Design System. Signed, by Konstantin Konstantinopolskii.</title>` — em-dash gone, comma + period replace it. Pass.

### Button-discipline repeats — five `Open the book` + `Open the file` + `Open the demo` (~7 flags)

- **Resolved.** Every pointer-card primary now names a distinct outcome:
  - `index.html:92` — `Browse patterns`
  - `index.html:100` — `Find a component`
  - `index.html:108` — `Read the voice guide`
  - `index.html:116` — `Walk the pipeline`
  - `index.html:124` — `Check the protocols`
  - `index.html:132` — `Inspect tokens`
  - `index.html:146` — `Tour the inventory`
  - `index.html:154` — `Run the smoke test`
- All eight imperatives. All eight unique. Sentence case. Pass.

### "I" pronouns inside `pipeline.md:198–202` reviewer-output examples (~6 flags)

- **Resolved.** Section headings rewritten and example strings stripped of "I":
  - `pipeline.md:198` — `**What is on screen.**` (was `**What I see.**`).
  - `pipeline.md:199` — `**What looks doable.**` (was `**What I can do.**`).
  - `pipeline.md:200` — `**What this is for, the guess at job and flow.**` (was `**What this is for — my guess at the job + flow.**` — bonus: em-dash also gone from the bold heading).
  - `pipeline.md:201` — `**What is great.**` / `pipeline.md:202` — `**What could be better.**` unchanged in shape.
  - Sample strings rewritten in third person: `"Three cards stacked. Top one has a dark title and a checkmark."`, `"Top card looks clickable."`, `"Feels like someone is writing a strategy brief. Probably near the start. Click the button, probably research kicks off. Maybe."`. Zero "I", zero "I'd", zero "I can".
- Cross-file confirmation: `\bI\b` regex returns no matches in `pipeline.md`. Pass.

### Lebedev / Bureau / bureau.ru strings — first run flagged 3 in CHANGELOG (lines 38, 100, 105) plus engineer note about line 113

- **Resolved across every file.** Cross-file regex `Lebedev|Bureau|bureau\.ru` returns zero matches in `index.html`, `manifesto.md`, every `canon/*.md`, every `pipeline/*.md`, and `CHANGELOG.md`. The 1.3.0 entry at `CHANGELOG.md:38` now reads `Typography rhythm migrated to ... with zero attribution. The prior source line and attribution paragraph are stripped from every kit surface.` — no name, no firm, no URL. The 1.2.0 entries at lines 100 and 105 also scrubbed. Pass.

### AI tells — first run reported ~62 flags

- **Partially resolved.**
  - **Sample-output filler-adjective stack** at `pipeline.md:194` — `extremely self-evident, clear, simple` — STILL PRESENT. Three-adjective stack flagged unchanged.
  - **Moralizing closer** in card snippet at `components.md:246` — `<p class="t-caption t-muted">For the moments that matter.</p>` — STILL PRESENT.
  - **Rhythm heading em-dash** at `components.md:74` — `#### Rhythm — inner and outer theory` — STILL PRESENT. Em-dash inside an h4 violates the absolute headline ban.
  - **`not just X but Y`** at `pipeline.md:327` — `enforces shape, not just presence` — STILL PRESENT.
  - **Body em-dashes** dominant defect class — see Defect summary below. Em-dash density across canon prose increased per file (manifesto 31, components 12, patterns 3, pipeline 76, protocols 16). Many are structural (`bullet list — explanation`), most violate "rare in body".

### Em-dashes in headlines — first run flagged 3 (`index.html:6`, `components.md:67`, `pipeline.md:200` bold heading)

- **Two of three resolved.**
  - `index.html:6` title — fixed.
  - `pipeline.md:200` bold heading — fixed (rewritten with comma).
  - `components.md:74` `#### Rhythm — inner and outer theory` — STILL PRESENT. Hard violation of `voice.md § Shape` headline ban.

## Per-file audit — second-wave state

### `index.html`

- Visible UI strings: brand, sidebar TOC, footer, eight pointer cards (h2 + h3 + caption + button), two FAB aria-labels.
- **Pass on:** title, sentence case, button discipline (eight unique imperatives), no "I", no muted on body, no filler adjectives, no moralizing closers, no Title Case, no AI tells.
- **Flag — `index.html:90`** — `When composing any layout, start here. Three columns, card stack, narrow mobile.` — three-noun list. Soft rule-of-three. Carryover from first run.
- **Flag — `index.html:122`** — `When shipping, evolving, or logging an exception, find bundle, semver, evolve, backlog, ideation.` — five-item "such as" exhaustive list. `voice.md § Structures and signals to cut`.
- **Flag — `index.html:114`** — `When entering or evaluating a session, find stages, role roster, and communication protocol.` — three-item list. Soft rule-of-three.

### `skills/kk-design-system/manifesto.md`

- Heading discipline: sentence case throughout. No "I". `t-muted` only on signoff date. Pass on those axes.
- **Em-dash count: 31 across body and bullets.** Voice.md says "rare in body". 31 is habitual. Sample lines:
  - `manifesto.md:5` — `so a junior agent — or a junior human — ships work that reads as finished` — em-dash pair for parenthetical punch. `voice.md § Sentence shapes to cut`.
  - `manifesto.md:11–14` — four `Meanings — what we say.` style bullets. Em-dash structural separator.
  - `manifesto.md:20–22` — three `Signal — what the user came here for.` bullets.
  - `manifesto.md:46` — `Fractal — applies to screen, panel, card, row.` — em-dash + four-item list.
  - `manifesto.md:50` — `Fractal — applies to nav groups, token tables, decision trees, checklists.` — same shape.
  - `manifesto.md:54` — `hypertrophied contrast — hero 66 px against body 22 px.` — em-dash for punch.
  - `manifesto.md:78–90` — full agents roster, every line `Name — role, stage. Description.` — twelve em-dash bullets.
  - `manifesto.md:94` — `three cold-read audits — jobstory, DS, voice — plus strict meta-review.` — em-dash pair + three-item "such as" list.
  - `manifesto.md:104–109` — six navigation pointers, each `\`canon/...\` — explanation`. Six em-dash separators.
- **Flag — `manifesto.md:54`** — `bold vs regular, or big vs small, or black vs muted. Never all three at once.` — three-item list closing on "all three". Soft rule-of-three.
- **Flag — `manifesto.md:58`** — `No drop shadows, gradients, glass, or blur` — four-item "such as" list.

### `skills/kk-design-system/canon/components.md`

- **Hard flag — `components.md:74`** — `#### Rhythm — inner and outer theory` — em-dash inside an h4 heading. `voice.md § Shape`: "**Em-dashes:** Forbidden in headlines." This was flagged in the first run (cited as line 67) and not fixed.
- **Flag — `components.md:246`** — `<p class="t-caption t-muted">For the moments that matter.</p>` inside the shout-card sample copy. Moralizing flourish, `voice.md § Sentence shapes to cut` "Moralizing closers". Carryover from first run, not fixed.
- **Em-dash count: 12.** Sample lines:
  - `components.md:9` — `Snippets do not stand alone — their job is to show...` — em-dash for punch.
  - `components.md:57` — `\`t-muted\` and \`t-subtle\` are metadata only — bylines, captions, hairlines, placeholders.` — em-dash + four-item list.
  - `components.md:66` — `three weights only — 400, 500, 700 — across seven sizes (66 to 14 px).` — em-dash pair.
  - `components.md:120–123` — radii bullets `12 px — buttons, tiers, switches, fields.` etc. Each opens with em-dash + four/five-item list.
  - `components.md:283` — `Focus inverts the row — black surface, white text, white caret.` — em-dash + three-item list.
  - `components.md:457` — `Two or four .stat children are valid — never three.` — em-dash for punch.
- **Flag — `components.md:5`** — `Inventory first, foundations second, components third, kit-doc primitives fourth, forbidden close.` — five-item "such as" exhaustive list. Carryover from first run.
- **Flag — `components.md:103`** — `Twelve spacing tokens split into micro, standard, macro bands.` — three-noun list. Soft rule-of-three.
- **Flag — `components.md:160`** — `whenever a widget groups a heading, body, and at most one primary action.` — three-item list. Soft rule-of-three.
- **Flag — `components.md:390`** — `Kebab menu carries four actions: Approve, Reply, Archive thread, Delete.` — four-item "such as" list.
- Sentence case holds on every other heading. No "I". No `t-muted` on body or structural markers. Pass on those axes.

### `skills/kk-design-system/canon/patterns.md`

- **Em-dash count: 3.**
  - `patterns.md:58` — `Reach for it when a small set of parallel options needs to be compared at a glance — pricing tiers, theme presets, plan choices.` — em-dash + three-item "such as" list.
  - `patterns.md:94` — `Not a variant of three columns — a distinct pattern with its own composition rules, invoked by the breakpoint.` — em-dash for punch + "Not A, but B" structure ("Not a variant ... — a distinct pattern"). Two flags.
  - One more in the bullet list at `patterns.md:88` — `legacy .tier / .tiers shape, which the kit no longer ships.` — clean (no em-dash actually; recount confirms 3 total).
- **Flag — `patterns.md:7`** — three-item list at end. Soft rule-of-three.
- **Flag — `patterns.md:118`** — `Twelve compositions sliced out of shipped prototypes.` — fine.
- Sentence case throughout. No "I". Pass on those axes.

### `skills/kk-design-system/canon/voice.md`

- The book auditing itself. Quoted forbidden examples are exempt by design. No new flags.

### `skills/kk-design-system/pipeline/pipeline.md`

- **Hard flag — `pipeline.md:194`** — `Expects extremely self-evident, clear, simple design understandable in 0.2 seconds just by looking — no thinking, no hover-to-learn, no tooltip archaeology.` Three-adjective stack `extremely self-evident, clear, simple` violates `voice.md § Words and verbs to cut` (filler adjective shape) + `voice.md § Sentence shapes to cut` rule of three. Em-dash + three-item "such as" list (`no thinking, no hover-to-learn, no tooltip archaeology`). Three flags on one line. Carryover from first run, not fixed.
- **Flag — `pipeline.md:194`** — `Anything that takes a moment to parse is a defect. Does not excuse complexity. Does not justify. Does not read role briefs or direction docs to fill gaps.` — three-fragment parallel-construction list. Rule-of-three.
- **Hard flag — `pipeline.md:327`** — `Reviewer at 3c enforces shape, not just presence — if the answer is a deflection, mark unanswered and return.` — em-dash + `not just X` pattern. `voice.md § Sentence shapes to cut`: "**'Not just X, but Y':** artificial urgency." Carryover from first run, not fixed.
- **Flag — `pipeline.md:168`** — `Cases the designer cannot answer without user input bubble up to a user gate, not a silent guess. Fidelity = answered questions, not pixel count.` — two `Not A, but B` patterns in one paragraph. Carryover from first run, not fixed.
- **Flag — `pipeline.md:206`** — `Two other Haiku reviewers wear different characters tied to their domain lenses — **Dieter Rams** for consistency-DS (kit-pattern conformance) and **George Orwell** for voice (voice conformance). Both share the strict-when-canon-breaks instinct of Jobs but apply it through their own canonical frame, not the 0.2-second user-clarity frame.` — em-dash + Not-A-But-B. Carryover.
- **Flag — `pipeline.md:228`** — `Steve Jobs appears twice (3a/3c and 6a) deliberately — same dumb-reader character at different stages, not two different men.` — em-dash + Not-A-But-B. Carryover.
- **Flag — `pipeline.md:204`** — `the guess will reveal the ambiguity — that's the point.` — em-dash for punch. Plus parallel-construction triple at line 204 (`If a block feels unclear ... If a mechanic is hidden ... If the job or flow is ambiguous`). Rule-of-three.
- **Em-dash count: 76.** Highest density of any prose file. Includes role-roster table cell separators (one em-dash per row × 13 rows). Voice.md says "rare in body".
- **Pass on:** "I" pronouns (zero, regex confirmed), sentence case, no muted on body, no Title Case, no copula avoidance, no transition pads.

### `skills/kk-design-system/pipeline/protocols.md`

- **Em-dash count: 16.** Sample lines:
  - `protocols.md:7` — `Product consumers who use the kit inside an app skip this — nothing here applies to consuming surfaces.` — em-dash for punch.
  - `protocols.md:15` — `Confirm no silent breakage — dead clicks, lost scroll-spy, broken nav anchors, iframe previews stuck.` — em-dash + four-item "such as" list.
  - `protocols.md:24–30` — bundle-rule bullets, each `\`vars.css\` — explanation` form. Seven em-dashes in a row.
  - `protocols.md:40–42` — semver axes, each `**Major** — removed a component, renamed a class...` form. Three em-dashes + three "such as" lists.
  - `protocols.md:48` — `before step 3 — push is shared state` — em-dash for punch.
  - `protocols.md:51` — `git tag -a vX.Y.Z -m "UI kit X.Y.Z — <one-line>".` — em-dash inside the literal command template. Borderline (template, not prose); flagged because the rendered command argument is a literal author choice and propagates to every shipped tag message.
  - `protocols.md:59` — `Either the rule updates or the code does — never both separately, never one silently.` — em-dash + parallel "never X, never Y" pair.
  - `protocols.md:89` — `Then build Option B — server plus SQLite plus MCP — as the path` — em-dash pair + three-item list.
- **Flag — `protocols.md:5`** — `bundle rules + semver + evolve protocol + backlog + ideation` — five-item "such as" exhaustive list. Carryover.
- **Flag — `protocols.md:44`** — `The axis lands on consumer-facing impact, not kit-internal scope.` — Not-A-But-B framing. Soft.
- **Flag — `protocols.md:69`** — `Hidden issues are worse than visible ones.` — Not-A-But-B framing. Soft.
- Sentence case throughout. No "I". No filler adjectives. No moralizing closers. Pass on those axes.

### `CHANGELOG.md` (1.3.0 entry, lines 5–82)

- **Em-dash count: 217 across the whole file.** 1.3.0 entry alone (~lines 5–82) carries dozens — every bullet uses `path — explanation` form. Same structural pattern as protocols.md.
- The audited 1.3.0 entry mirrors the same "such as" exhaustive list and em-dash habits noted in components.md / protocols.md. Per the rerun rubric, CHANGELOG 1.2.0 history is out of scope; 1.3.0 entries that mirror canon's voice habits remain in scope but are downstream of the canon defect.
- **Flag — `CHANGELOG.md:38`** — `Typography rhythm migrated to \`canon/components.md § Foundations § Type § Rhythm, inner and outer theory\` with zero attribution.` — Lebedev/Bureau/bureau.ru strings ALL stripped. Pass on Lebedev guard for this line.
- **Flag — `CHANGELOG.md:7`** — `Content-architecture rework. Breaking: \`.doc\` and \`.doc__*\` wrapper classes rename to \`.book\` / \`.book__*\` across CSS, JS, HTML, markdown snippets, and skill canon loads.` — five-item "such as" list. Carryover.

## Lebedev / Bureau guard

Re-search ran across `index.html`, `manifesto.md`, every `canon/*.md`, every `pipeline/*.md`, `CHANGELOG.md`. Pattern: `Lebedev|Bureau|bureau\.ru`.

**Result: zero hits.** Every previously-flagged occurrence stripped:

- `CHANGELOG.md:38` (1.3.0 Voice entry) — rewritten without `Lebedev` or `Bureau` strings. Now reads `with zero attribution. The prior source line and attribution paragraph are stripped from every kit surface.`
- `CHANGELOG.md:100` (1.2.0 Added entry) — rewritten without name, firm, or URL.
- `CHANGELOG.md:105` (1.2.0 Added entry) — rewritten without `Lebedev`.
- `CHANGELOG.md:113` (engineer-noted 1.2.0 Fixed entry) — confirmed clean.

Pass. Lebedev/Bureau guard fully resolved.

## Defect summary

- **AI tells:** ~150 flags in scope.
  - **Em-dashes for punch (body):** ~138 across canon and pipeline files (manifesto 31 + components 12 + patterns 3 + pipeline 76 + protocols 16). Voice.md says "rare in body". Density unchanged from first run; the engineer scrubbed the three flagged headline em-dashes plus the 1.3.0 CHANGELOG Lebedev attribution but did not touch body em-dashes broadly.
  - **Em-dashes in headlines:** 1 remaining. `components.md:74` `#### Rhythm — inner and outer theory`. Hard violation. Carryover from first run, not fixed.
  - **"Such as" exhaustive lists:** ~12 carryovers (manifesto §Foundations 4-item lists; components §5 inventory list, §57 metadata list, §120–123 radii bullets, §390 kebab actions, §549 framework list; protocols §5 jobstory list, §15 breakage list, §24–30 bundle rule, §40 major axis; CHANGELOG §7).
  - **Rule-of-three lists:** ~10 (index.html:90, 114; manifesto:54; components:5, 103, 160; patterns:7; pipeline:194 twice, 204; CHANGELOG:7).
  - **"Not A, but B" / "Not just X, but Y":** 6 (pipeline.md:168 ×2, 206, 228, 327; protocols.md:44 soft, 69 soft; patterns.md:94).
  - **Filler-adjective stack:** 1 (`pipeline.md:194` "extremely self-evident, clear, simple"). Hard flag, carryover.
  - **Moralizing closer:** 1 (`components.md:246` "For the moments that matter."). Carryover.
- **Button discipline:** **pass.** Eight pointer-card primaries all distinct, imperative, sentence case. First-run repeat-label flag fully resolved.
- **Empty-state shape:** pass. No empty states rendered in audited surfaces.
- **Error shape:** pass. No error strings rendered.
- **Sentence case:** pass. Every heading scanned in sentence case.
- **Muted/light-weight:** pass. Every `t-muted` use lands on metadata (signoff date). No `t-muted` on body or structural markers.
- **"I" pronouns:** **pass.** `\bI\b` regex returns zero matches in `pipeline.md`. Reviewer-output sample strings rewritten in third person. First-run flag fully resolved.
- **Lebedev guard:** **pass.** Zero hits across all audited files. First-run flag fully resolved.

First-run flags resolved: ~22/76 (the four in-scope categories that had clear targets: title em-dash 1/1, button labels 7/7, "I" pronouns 6/6, Lebedev 4/4, plus three flagged headline em-dashes 2/3, plus a few canon paragraphs reworded). The dominant em-dash-in-body class (~50 first-run flags) is largely UNTOUCHED and grows when summed across the second-wave file set; the eligible AI-tell carryovers (rule-of-three, such-as lists, Not-A-But-B, filler-adjective stack, moralizing closer) persist.

## Verdict

**FAIL.**

Voice.md says pass = zero in-scope flags. Audit returns ~150 flags across the file set. Dominant defect: em-dashes habitual in body where voice.md says rare; density per file unchanged or grown vs first run. Secondary: one headline em-dash survived (`components.md:74`). Tertiary: filler-adjective stack at `pipeline.md:194` and moralizing closer at `components.md:246` carryover unfixed.

Wins to acknowledge:

- Title em-dash in `index.html:6` fixed.
- Eight pointer-card buttons rewritten as eight unique imperative outcomes.
- Reviewer-output sample at `pipeline.md:198–202` purged of every "I" / "I'd" / "I can".
- One reviewer-output bold heading (`pipeline.md:200`) lost its em-dash on the rewrite.
- Lebedev / Bureau / bureau.ru fully scrubbed from every audited file including CHANGELOG history.

Decision lies with stage 7 rerun + maintainer:

- (a) Treat body-em-dash density as a direction-doc exception for the kit's house structural style (`bullet — explanation`, `path — description`), recorded with reason. Same carve-out applies to the CHANGELOG bullet form. Then fix only the four hard carryovers: `components.md:74` heading em-dash, `components.md:246` moralizing closer, `pipeline.md:194` filler-adjective stack, `pipeline.md:327` "not just X" structure.
- (b) Rewrite every em-dash separator to a colon or period across canon prose, plus the four hard carryovers. Heavier lift, cleaner against voice.md verbatim.

The four hard carryovers are unambiguous voice.md violations, regardless of the em-dash carve-out call.

## Hand-off

Feeds stage 7 rerun (`kk-role-meta-reviewer`, Anna Wintour). Each flag listed here is evidence the meta-reviewer can cite by file:line under rubric item 5 (zero AI tells). Rubric item 5 fails until each flag is either fixed in copy or stamped as a user-approved exception in the direction doc.

Reiterate path on FAIL routes to stage 3b (canon copy authoring) for the four hard carryovers, or to a maintainer pass for the bulk em-dash decision.
