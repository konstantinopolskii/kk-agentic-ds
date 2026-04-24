---
session: 2026-04-24-content-architecture
stage: 6c
role: voice-reviewer (George Orwell)
input: built prototype + canon/voice.md
output: per-file voice audit — AI tells, button discipline, empty-state shape, error shape, sentence case, em-dashes, muted/light defaults, Lebedev guard
gate: feeds stage 7
---

Cold read of every visible string in the built prototype + every paragraph of canon against `canon/voice.md`. Flag list only — no rewrites.

## Per-file audit

### `index.html`

Visible UI strings: sidebar header, TOC labels, footer, eight pointer cards (h2 + h3 + caption + button), two FAB aria-labels.

- **index.html:6** — `<title>Agentic Design System — signed, by Konstantin Konstantinopolskii</title>` — em-dash inside what reads as a headline title string. Rule broken: `voice.md § Shape` "**Em-dashes:** Forbidden in headlines. Rare in body."
- **index.html:59** — `2026, fuckgrechka.ru` — sidebar footer claim with no surrounding context. Not a defect against voice.md per se (metadata in `t-caption`, allowed muted). Borderline; flagged for human eyes given the offhand register.
- **index.html:90** — `When composing any layout, start here. Three columns, card stack, narrow mobile.` — second sentence is a three-item list of nouns. Rule broken: `voice.md § Sentence shapes to cut` "**Rule of three:** three-item adjective lists for fake completeness". The list here is nouns, not adjectives, so soft flag — pattern is the rule-of-three completeness gesture; the items are also the contents of the patterns book, so factual rather than padding. Soft flag retained.
- **index.html:92, 100, 108, 116, 124** — five card primaries reading `Open the book`. Rule broken: `voice.md § Labels and interface text` "**Primary vs secondary:** labels never repeat. Secondary 'Pick tokens'; primary 'Apply tokens'." Each card is a separate action surface, so the repeat is across cards rather than primary-vs-secondary inside one card; still, button discipline requires distinct outcomes — five identical labels collapse the affordance into wallpaper. Hard flag against the "Name the outcome" line of `voice.md § Labels and interface text`.
- **index.html:132** — `Open the file` — singular variant of the same card-button pattern. Same flag class as the five above; less severe because it differs from the five `Open the book` siblings.
- **index.html:146, 154** — `Open the demo` — repeats across the two demo cards. Same `voice.md § Labels and interface text` button-repeat flag.
- **index.html:122** — `When shipping, evolving, or logging an exception, find bundle, semver, evolve, backlog, ideation.` — five-item "such as" list past the heading. Rule broken: `voice.md § Structures and signals to cut` "**'Such as' exhaustive lists:** naming five examples proves the category isn't clear. Give one, or name the category."
- **index.html:228** — `aria-label="Open a book"` — duplicates the inspector's own `aria-label="Open a book"` at line 80, and the inspector's heading "Open a book" at line 84. The string is correct against voice.md (imperative, sentence case). No flag.

No "I" pronouns. No Title Case headings. No moralizing closers. No filler adjectives. No `t-muted` on body.

### `skills/kk-design-system/manifesto.md`

- **manifesto.md:5** — `Agentic because AI does most of the drafting. The rules here exist so a junior agent — or a junior human — ships work that reads as finished before anyone opens it.` — em-dash pair for parenthetical punch. Rule broken: `voice.md § Sentence shapes to cut` "**Em-dashes for punch:** a period almost always does the same job."
- **manifesto.md:46** — `Primary signal takes 80% of visual weight. Secondary fits in 20%. Fractal — applies to screen, panel, card, row.` — em-dash + four-item "such as" list. Rules broken: em-dash for punch; rule-of-three / "such as" exhaustive list (`voice.md § Structures and signals to cut`).
- **manifesto.md:50** — `Past seven, scanning degrades into a wall.` — fine. Adjacent line **manifesto.md:50** `Fractal — applies to nav groups, token tables, decision trees, checklists.` — em-dash + four-item list. Same two rules broken as 46.
- **manifesto.md:54** — `One distinction step between two elements: bold vs regular, or big vs small, or black vs muted. Never all three at once.` — three-item list with explicit "all three at once" closer. Rule broken: `voice.md § Sentence shapes to cut` "**Rule of three:** three-item adjective lists for fake completeness". Soft flag — the three items are the canonical distinction axes, so factual; pattern is still the rule-of-three.
- **manifesto.md:64** — `Formula: \`context + motivation = step → value\`.` — fine.
- **manifesto.md:68** — `Example. Voice transcription during an interview. Context: the interviewer cannot look away. Motivation: do not lose the question. Step: glance. Value: keep flow. So the screen is huge question cards that swipe themselves, every control hidden.` — fine, factual.
- **manifesto.md:80** — `Margaret Hamilton — analyst, stage 1. Apollo-era decomposition rigor refuses to ship unspecified paths.` — em-dash. Rule broken: em-dash for punch (`voice.md § Sentence shapes to cut`). Repeats on lines 81–91 (every roster row uses the em-dash). Twelve em-dash flags total in roster.
- **manifesto.md:104–109** — `- \`canon/patterns.md\` — start here for layout composition.` and five sibling lines. Em-dashes as structural separators in a bullet list. Repeated em-dash flag (six rows).
- **manifesto.md:128** — `<span class="t-muted">2026-04-24, content-architecture session.</span>` — `t-muted` on a date stamp. Allowed under `voice.md § Muted text` ("Allowed only for metadata — bylines, captions, hairlines"). No flag.
- No "I". Sentence case headings throughout. No filler adjectives. No moralizing closers.

### `skills/kk-design-system/canon/components.md`

- **components.md:3** — `Jobstory: when drilling from a pattern into its parts, find every foundation, component, and forbidden thing in one book with deep links into live examples, so we use kit vocabulary and never invent.` — three-item list "every foundation, component, and forbidden thing". Pattern: rule-of-three. Soft flag.
- **components.md:5** — `This book is reference. Inventory first, foundations second, components third, kit-doc primitives fourth, forbidden close.` — five-item ordinal list. Rule broken: `voice.md § Structures and signals to cut` "**'Such as' exhaustive lists**" — naming five proves the category isn't clear.
- **components.md:43** — `Each fakes light or depth the screen cannot carry; each trades clarity for decoration.` — fine.
- **components.md:50** — `\`t-muted\` and \`t-subtle\` are metadata only — bylines, captions, hairlines, placeholders.` — em-dash + four-item list. Em-dash + rule-of-three / "such as" list flags.
- **components.md:59** — `Commissioner. A variable font (SIL OFL 1.1) by Kostas Bartsokas. Three weights used in the kit (Regular 500, Medium 500, Bold 700), seven sizes (66 to 14 px). No italics.` — fine.
- **components.md:67** — heading `#### Rhythm — inner and outer theory`. Rule broken: `voice.md § Shape` "**Em-dashes:** Forbidden in headlines."
- **components.md:88** — `Rule 12 bites hardest. A heading with equal top and bottom margins visually groups with the wrong paragraph. Rule 13 is the second most-broken: a heading whose next line sits closer than its own line-height reads as cramped.` — fine.
- **components.md:90** — `**Kit addenda.** Four rules the kit layers on top of the fourteen:` then lines 92–95 each open `- **Rule 12 ratio floor.** ... 1.5:1 reads roughly equal at the 0.2-second bar; 2:1 reads as clear lead.` — fine.
- **components.md:95** — `**Quote treatment.** Quotes render black, Medium 500, body-sized (22 / 32), with a 4 px left border. No italic. A quote is content, not metadata.` — fine.
- **components.md:103** — `Twelve spacing tokens split into micro, standard, macro bands.` — three-item list. Soft rule-of-three flag.
- **components.md:113–116** — radii bullets `- \`12 px\` — buttons, tiers, switches, fields.` etc. Each bullet uses an em-dash to introduce a four- or five-item list. Em-dash + "such as" list flags. Lines 113, 114, 115, 116 all carry both flags.
- **components.md:125–129** — motion bullets. `- Ease-out for functional settles.` plus four siblings. Lines 125–128 are four parallel one-liners; flag as rule-of-three / "such as" list pattern (`voice.md § Structures and signals to cut`).
- **components.md:141–152** — typography utility table. Column 3 entries use sentence-case prose, fine. No flag.
- **components.md:160** — `Reach for a card whenever a widget groups a heading, body, and at most one primary action.` — three-item list. Soft rule-of-three.
- **components.md:190** — `<p class="t-caption t-muted">For the moments that matter.</p>` — sample copy inside the components snippet. Visible UI string. Reads as a moralizing flourish; rule broken: `voice.md § No AI tells § Sentence shapes to cut` "**Moralizing closers:** 'Ultimately, this reminds us…'". Soft flag — it is example copy in a snippet, not shipped product copy. Still rendered visibly inside the rendered manifesto's components book, so audited.
- **components.md:198–202** — card rules list, five items each ending in periods. `- Interactive cards need hidden content. A card that only fires an action stays static.` etc. Five items. "Such as" list flag.
- **components.md:226–229** — field rules list, four items. Four-item list flag.
- **components.md:243–249** — button rules list, seven items. Long bullet list — borderline. Inside the list: line 247 `Sentence case. No Title Case. No ALL CAPS.` is a three-fragment rule statement; this is canon prose stating the rule, not a defect.
- **components.md:255** — `Metadata, not action. If it looks clickable, it is a button.` — fine.
- **components.md:265–267** — tag rules. `- Reach for a tag to name a category, a count, or a state that the user cannot change from here.` — three-item list. Rule-of-three flag.
- **components.md:286–290** — switch rules. Five items. "Such as" list flag.
- **components.md:296** — `Two shapes, one pattern. Draft (shout) and thread (interactive card with collapsible reveal). Lives in the inspector.` — fine.
- **components.md:329–337** — comment rules. Seven items, mostly factual. Borderline.
- **components.md:334** — `Kebab menu carries four actions: Approve, Reply, Archive thread, Delete.` — four-item "such as" list. Flag.
- **components.md:343** — `Sidebar nav with scroll-spy indicator. \`sidebar__nav\` wraps \`nav-group\` sections; \`toc__indicator\` animates between active items.` — fine.
- **components.md:364–370** — navigation rules. Five items. "Such as" list flag.
- **components.md:374** — `Canonical document ending. Stats + byline + handwritten signature SVG. Every doc ships signed.` — three-noun list ("Stats + byline + handwritten signature SVG"). Soft rule-of-three.
- **components.md:399–406** — signoff rules. Seven items, mostly factual.
- **components.md:399** — `\`book__signoff-stats\` grids into three columns. Two or four \`.stat\` children are valid — never three.` — em-dash for punch. Em-dash flag.
- **components.md:412** — `The workhorse for key-value rows inside a card. Three shapes.` — fine.
- **components.md:443–448** — spec list rules. Four items. Borderline.
- **components.md:454** — `Caption-sized hairlined list for prose or tabular data. Both \`<ul>\` (disc marker) and \`<ol>\` (decimal marker). Hairline separates each item from the next. \`js/md.js\` emits this class automatically for markdown-rendered lists.` — fine.
- **components.md:470–475** — list rules. Four items.
- **components.md:482** — `These two primitives render inside kit docs only. Product prose does not reach for them.` — fine.
- **components.md:486** — `Document-surface primitive for kit docs that embed component or pattern slices. The wrapper clips. The inner iframe renders at 400% and scales to 0.25 so the reader sees the preview at full container width regardless of the slice's internal viewport.` — fine.
- **components.md:497–504** — preview frame rules. Five items. "Such as" list flag.
- **components.md:510** — `Document-surface primitive for dense two-column inventories on kit registry pages. Resets browser table defaults, applies the kit's hairline border and text tokens, and keeps links inheriting surface type.` — three-item list of effects. Soft rule-of-three.
- **components.md:529–535** — registry table rules. Five items. "Such as" list flag.
- **components.md:542–549** — forbidden bullets. List of eight items. The first item is a long allowlist `t-, card, field, button, tag, switch, sidebar, book, nav-group, inspector, comment, stat, swatch, app, preview-frame, registry-table` — sixteen-item exhaustive list. Acceptable as a canonical allowlist (reference data, not prose).
- **components.md:546** — `Light weight (400 Book) and muted color on body or structural markers.` — fine, restates the rule.
- **components.md:548** — `Em-dashes in headlines.` — fine, restates the rule.
- **components.md:549** — `Utility-class frameworks (Tailwind, Bootstrap, Bulma).` — three-item list. Soft rule-of-three.
- No "I". Sentence case throughout. No filler adjectives. No copula avoidance.

### `skills/kk-design-system/canon/patterns.md`

- **patterns.md:7** — `Sidebar on the left, book in the middle, inspector on the right. Only the middle column scrolls during reading. This is the shell every kit canon file renders inside. Use it for any surface where the reader needs a map, a primary reading surface, and a margin for actions or references.` — three-item list at end of paragraph. Soft rule-of-three.
- **patterns.md:31** — `Interactive cards stacked vertically. One active at a time. Inactive cards collapse to heading plus minimized CTA; the active card shows its body and both CTAs. Use it wherever the reader picks one option out of a small group and needs to see every option without losing context.` — fine.
- **patterns.md:57** — `Below ~800px. The book column goes full width. The sidebar collapses behind a hamburger. The inspector slides over as a modal sheet. Not a variant of three columns — a distinct pattern with its own composition rules, invoked by the breakpoint.` — em-dash for punch. Em-dash flag.
- **patterns.md:81** — `Eleven compositions sliced out of shipped prototypes. Each row points at a live preview. Drill into \`components.md\` for the individual parts.` — fine.
- **patterns.md:93–135** — registry table rows. Each row is one factual sentence. Sample: line 93 `Sidebar, book, inspector. The default kit shell, full slice.` — three-item list noun head; soft rule-of-three. Line 110 `Three variants: plain, value, triple.` — three-item list. Line 134 `Stat pairs on the left rail; byline and signature on the right.` — fine.
- No "I". Sentence case throughout.

### `skills/kk-design-system/canon/voice.md`

The book auditing itself. Special case — every "forbidden" example is quoted to name the failure, so quoted strings inside this file are not flags.

- **voice.md:32** — `AI drafts leak the same tics. Cutting them is the fastest way to un-AI a passage. Based on the Wikipedia project's inventory of signs of AI writing; every item below is forbidden in prose and UI text unless the user asks for it explicitly.` — "Wikipedia project's inventory" is named source, not weasel attribution. Fine.
- **voice.md:35–39** — bullets enumerate forbidden words. Quoted strings are exempt.
- **voice.md:13** — restates the em-dash rule. Fine.
- **voice.md:46** — `**Em-dashes for punch:** a period almost always does the same job.` — fine, statement of rule.
- **voice.md:59** — `Every document ships signed. Author name, role, organization, timestamp, handwritten SVG. See \`manifesto.md § Components § Signoff\`.` — five-item list of signoff parts. Soft "such as" flag — it is a spec, not prose.
- No flags worth raising — voice.md is the canonical rule book and quotes its own forbidden examples on purpose.

### `skills/kk-design-system/pipeline/pipeline.md`

- **pipeline.md:1** — heading `# The pipeline`. Sentence case. Fine.
- **pipeline.md:3** — `Eight stages. Three phases. Eleven role skills. Do not skip stages inside a phase. Do not reorder them. Gates are either human approval, a peer-agent pass, or a rubric-gated verdict.` — three-item list closing the paragraph ("human approval, a peer-agent pass, or a rubric-gated verdict"). Rule-of-three flag.
- **pipeline.md:5** — `Entry point matches scope. A new page walks all eight stages. A copy tweak enters at stage 3b against an existing block. Kit refactoring enters at stage 5 in DS-engineer mode. Nothing forces the full walk on work that does not need it.` — fine.
- **pipeline.md:7** — `The point: AI agents draft most of our work. Without gates they produce gray mush, invent components, and ship the first plausible draft. The pipeline enforces breadth at the think phase, question-driven fidelity at the design phase, cold-read audits and strict rubric at the build phase. Each stage writes its own documentation artifact so retros never replay the conversation.` — three-item list "produce gray mush, invent components, and ship the first plausible draft" + three-item list "breadth ... fidelity ... cold-read audits and strict rubric". Two rule-of-three flags in one paragraph. The latter is also slightly self-promoting.
- **pipeline.md:21** — `The analyst pushes back. If the brief has holes, they surface here. No pixels yet.` — fine.
- **pipeline.md:36** — `Breadth on round one, commitment on round two. The pattern-block naming is the handoff contract — downstream designers spawn one per block.` — em-dash. Em-dash flag.
- **pipeline.md:51** — `Naive user POV. Zero design context — reading \`manifesto.md § Components\` would break the cold-read contract.` — em-dash. Em-dash flag.
- **pipeline.md:63** — `Single track. Strict kit inventory unless the direction doc's §Exceptions carries a user-stamped override for this pattern. UI copy drafts ship downstream — there is no separate copywriter.` — em-dash. Em-dash flag.
- **pipeline.md:87** — `Catalogue, not draw. Copy briefs out of scope — designers own UI copy.` — em-dash + "Not A, but B" structure. Rules broken: `voice.md § Sentence shapes to cut` "**'Not A, but B':** usually just say B." plus em-dash flag.
- **pipeline.md:99** — `Piece-by-piece means the human can peek mid-build. Short feedback loop. No placeholder-comment-for-copywriter convention — copywriter stage is gone.` — em-dash. Em-dash flag.
- **pipeline.md:111** — `Cold means cold. Reading the brief or direction doc would pollute the read — the reviewer's guesses are the signal.` — em-dash. Em-dash flag.
- **pipeline.md:123** — `Dumb-about-layout, strict-about-inventory.` — fine.
- **pipeline.md:135** — `Cold-reads strings against canon. Does not rewrite; names the defect.` — fine.
- **pipeline.md:147** — `Rejects "it's fine" replies. A rubric item is either answered with evidence (file:line citation) or left open. Open items fail the build until the user acts.` — fine.
- **pipeline.md:130** — `Per-block voice audit across AI-tells, button-label discipline, empty-state shape, error shape, sentence case, em-dash and italics rules, muted and light-weight rules.` — six-item "such as" list. "Such as" list flag.
- **pipeline.md:165–167** — fidelity contract list. Three-item ordered list. Fine, structural.
- **pipeline.md:168** — `The contract: every user-facing ambiguity surfaced at 3a has an answer in the 3b output. Cases the designer cannot answer without user input bubble up to a user gate, not a silent guess. Fidelity = answered questions, not pixel count.` — "Not A, but B" pattern at end ("not a silent guess"; "not pixel count"). Two `voice.md § Sentence shapes to cut` "Not A, but B" flags.
- **pipeline.md:189** — `**Zero AI-tells.** Full \`voice.md\` §No AI tells inventory applies. Evidence source: stage 6c voice reviewer's flag list. Each flag must be either fixed in copy or stamped as a user-approved exception in the direction doc. Unaddressed 6c flags fail this item.` — fine.
- **pipeline.md:194** — `Every Haiku "dumb" reviewer operates in character as **Steve Jobs himself**. Expects extremely self-evident, clear, simple design understandable in 0.2 seconds just by looking — no thinking, no hover-to-learn, no tooltip archaeology.` — em-dash + three-item list. Em-dash + rule-of-three flags. The list "extremely self-evident, clear, simple" earlier in the sentence is also a three-adjective stack. Filler adjectives — `voice.md § Words and verbs to cut`: "vibrant, pivotal, intricate, meticulous" — "extremely" + three-adjective stack pattern is the same shape. Flag.
- **pipeline.md:194** — `Anything that takes a moment to parse is a defect. Does not excuse complexity. Does not justify. Does not read role briefs or direction docs to fill gaps.` — three-item parallel-construction list. Rule-of-three flag.
- **pipeline.md:198–202** — five-section reviewer output spec. Each section opens `**What I see.**`, `**What I can do.**`, `**What this is for — my guess at the job + flow.**`, `**What's great.**`, `**What could be better.**`. **Multiple flags:**
  - **pipeline.md:200** heading `**What this is for — my guess at the job + flow.**` — em-dash inside a bold heading. `voice.md § Shape` em-dash forbidden in headlines.
  - **pipeline.md:198–202** — every example string opens with "I" (`"I can probably click the top card."`, `"Feels like someone's writing a strategy brief. I'd guess this is near the start."`). Rule broken: `voice.md § Shape` "**No 'I'.**" The content is sample reviewer output, not body prose, so pattern is naming what the reviewer says. Hard flag — the canon prose itself models I-pronoun output for downstream agents to copy. The body prose at line 198 also opens `1. **What I see.** Literal description.` — using "What I see" as a section heading is acceptable per canon ("What I see" is the role's labeled output), but the demonstration sentences inside use first-person "I" repeatedly (`"I can probably click..."`, `"I'd guess this is near the start."`). Multiple `voice.md` "no I" flags inside the example sentences.
- **pipeline.md:204** — `Reviewer never defers. If a block feels unclear, it says unclear. If a mechanic is hidden, it says hidden. If the job or flow is ambiguous at 0.2s, the guess will reveal the ambiguity — that's the point. Silence on a block = confirmed clarity.` — em-dash. Em-dash flag. Three-item parallel-construction list.
- **pipeline.md:206** — `Two other Haiku reviewers wear different characters tied to their domain lenses — **Dieter Rams** for consistency-DS (kit-pattern conformance) and **George Orwell** for voice (voice conformance). Both share the strict-when-canon-breaks instinct of Jobs but apply it through their own canonical frame, not the 0.2-second user-clarity frame.` — em-dash + "Not A, but B" structure ("not the 0.2-second user-clarity frame"). Em-dash + Not-A-But-B flags.
- **pipeline.md:228** — `Steve Jobs appears twice (3a/3c and 6a) deliberately — same dumb-reader character at different stages, not two different men.` — em-dash + Not-A-But-B. Em-dash + Not-A-But-B flags.
- **pipeline.md:236–242** — caveman protocol bullets. Five items. "Such as" list flag.
- **pipeline.md:238** — `Drop articles (a / an / the), filler (just, really, basically, actually, simply), pleasantries (sure, certainly, happy to), hedging.` — multiple "such as" exhaustive parentheticals.
- **pipeline.md:244–249** — overrides + scope-boundary list. Mixed rule references.
- **pipeline.md:249** — `Source inspiration: [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman).` — fine, attribution.
- **pipeline.md:282** — `Three parallel moments in pipeline-v3:` followed by two bullets. Two parallel moments, not three — the heading mis-counts. Factual defect, not a voice defect; flagged as a copy-trust issue under `voice.md § Length` "cut every word that doesn't change meaning" only loosely. Soft flag.
- **pipeline.md:298** — `Pipeline entry points, from lightest to heaviest:` then five bullets. "Such as" list — but this is a complete enumeration of canonical entry points. Acceptable as reference data.
- **pipeline.md:323** — `Agents like to patch.` — fine. Section heading `## Failure mode to watch for` — sentence case, fine.
- **pipeline.md:325** — `Second failure mode: stage 3c passing with hollow answers. "Answered" means the designer's 03b has a visible answer in ASCII or copy, not a sentence saying "this is handled". Reviewer at 3c enforces shape, not just presence — if the answer is a deflection, mark unanswered and return.` — em-dash + Not-A-But-B ("not just presence"). Em-dash + Not-A-But-B flags. Also `not just X but Y` pattern explicitly: `voice.md § Sentence shapes to cut` "**'Not just X, but Y':** artificial urgency. Say both facts directly." Hard flag.

### `skills/kk-design-system/pipeline/protocols.md`

- **protocols.md:5** — `Jobstory: when shipping, evolving, or logging an exception, we want bundle rules + semver + evolve protocol + backlog + ideation in one doc, so every kit change follows the same discipline.` — five-item "such as" list ("bundle rules + semver + evolve protocol + backlog + ideation"). "Such as" exhaustive list flag.
- **protocols.md:7** — `This book is for the human editing the kit itself. Product consumers who use the kit inside an app skip this — nothing here applies to consuming surfaces. Reader landed here from a finished kit change on disk; reader leaves with a pushed commit plus a pushed annotated tag. Open top-to-bottom once for onboarding; on subsequent ship cycles, jump to the section owning the current action.` — em-dash. Em-dash flag.
- **protocols.md:11** — `Every browser-affecting change ends with a verified console and screenshot in the self-doc. Reading the code is not enough. Walk the list before staging.` — fine.
- **protocols.md:14** — `Open the devtools console. Zero errors, zero warnings. Capture the console state. Paste into the phase's self-doc.` — fine.
- **protocols.md:15** — `Click every interactive affordance on the page once. Confirm no silent breakage — dead clicks, lost scroll-spy, broken nav anchors, iframe previews stuck.` — em-dash + four-item "such as" list. Em-dash + "such as" list flags.
- **protocols.md:24** — `The code — \`vars.css\`, \`style.css\`, \`js/kit.js\`, \`js/md.js\`, or the skill file being changed.` — em-dash + five-item "such as" list. Em-dash + "such as" list flags.
- **protocols.md:25** — `The doc — \`index.html\` plus the markdown under \`skills/kk-design-system/\` (\`manifesto.md\`, \`canon/*.md\`, \`pipeline/*.md\`) — whichever section owns the rule.` — two em-dashes + "such as" parenthetical. Two em-dash flags + "such as" list flag.
- **protocols.md:26** — `The skill reference files — \`tokens.json\`, \`canon/voice.md\`, \`manifesto.md\`. These are what the agent reads. Drift between CSS and skill reference files is the worst failure mode, because the agent trusts the skill files.` — em-dash + three-item "such as" list. Em-dash + rule-of-three flags.
- **protocols.md:27** — `\`CHANGELOG.md\` — one entry, in the format Added / Removed / Moved.` — em-dash + three-item list. Em-dash + rule-of-three.
- **protocols.md:28** — `\`package.json\` plus \`.claude-plugin/plugin.json\` — version bumps in lockstep. Semver axis picked per the next section.` — em-dash. Flag.
- **protocols.md:29** — `\`SKILL.md\` — if the change affects agent behaviour, update the skill's hard rules too.` — em-dash. Flag.
- **protocols.md:30** — `Integration doc at \`docs/integration/<component>.md\` — required when the change touches a component's consumer-facing API.` — em-dash. Flag.
- **protocols.md:32** — `Adding an eighth file type runs the evolve protocol first. No silent extensions.` — fine.
- **protocols.md:40** — `**Major** — removed a component, renamed a class, changed a skill's \`description\` trigger phrase, broke a consumer's selector. Worked example: the v1.3.0 wrapper rename renamed every legacy \`.doc\` / \`.doc__*\` class across CSS, JS, HTML, and markdown snippets to \`.book\` / \`.book__*\`. Every consumer selector targeting the old wrapper breaks. Major bump.` — em-dash + four-item "such as" list. Em-dash + "such as" list flags.
- **protocols.md:41** — `**Minor** — added a component, added a token, added a skill recipe. Additive only. Consumers on the previous minor keep working.` — em-dash + three-item list. Em-dash + rule-of-three flags.
- **protocols.md:42** — `**Patch** — fix, typo, clarification, non-breaking internal refactor.` — em-dash + four-item list. Em-dash + "such as" list flags.
- **protocols.md:44** — `The axis lands on consumer-facing impact, not kit-internal scope. A one-line CSS change that renames a class is major. A 400-line internal refactor that preserves every public selector is patch.` — Not-A-But-B-style framing in sentence one. Soft flag.
- **protocols.md:48** — `Every kit change ends with four steps, in order. Confirm with the human before step 3 — push is shared state and cannot be undone quickly.` — em-dash. Flag.
- **protocols.md:50–53** — push steps, four ordered bullets opening with imperative verbs (Commit / Tag / Push main / Push the tag). Fine.
- **protocols.md:55** — `Close every session with \`git status -sb\` showing a clean tree on a pushed tag, or flag what is still pending.` — fine.
- **protocols.md:59** — `Rules in the kit canon are canonical. Code that disagrees with canon is wrong unless canon is. Either the rule updates or the code does — never both separately, never one silently.` — em-dash + three-item "never X, never Y" list (one item dropped). Em-dash flag + Not-A-But-B / parallelism flag.
- **protocols.md:65** — `Update both in the same PR. The rule moves in the canon markdown; the code moves in the kit. Carve-out: if code and doc genuinely cannot land in one PR (separate repos, separate release cadences), ship paired PRs within one business day and log the split at step 4.` — fine.
- **protocols.md:69** — `Unresolved issues live in §Backlog openly. Hidden issues are worse than visible ones.` — Not-A-But-B-style framing ("better X than Y"). Soft flag.
- **protocols.md:73** — `Things the prototype does wrong on purpose, unfixed. No priorities, no owners yet. When one lands, move it out of the list and into the section that now describes the fixed behaviour.` — fine.
- **protocols.md:75** — `Empty right now. Last audit cleared the list.` — fine.
- **protocols.md:79** — `Ideas the project considered but did not build. Kept here so the reasoning survives and future sessions do not re-propose them without knowing the history.` — fine.
- **protocols.md:83** — heading `### Auto-sync inspector comments to Claude` — sentence case. Fine.
- **protocols.md:84–89** — bulleted plan. `- **Goal.** Let the maintainer leave comments in the inspector; have Claude pick them up across sessions and improve the doc automatically.` — fine. Lines 85–89 each bold-keyed — `**Option A.**`, `**Option B.**`, `**Option C.**`, `**Round-trip problem.**`, `**Parked.**`, `**Revisit if.**`. Fine, structural.
- **protocols.md:85** — `**Option A.** File System Access API. Browser writes threads to \`comments.json\`. No server, but Chromium-only and requires a local HTTP server (not \`file://\`). First commit needs a file-picker click.` — fine.
- **protocols.md:86** — `**Option B.** Local Node server plus SQLite plus MCP. Browser posts each comment; Claude reads and resolves through an MCP tool. Works everywhere; needs a running process.` — fine.
- **protocols.md:88** — `**Parked.** Current volume of review feedback does not justify the plumbing. Writing notes directly into the doc or conversation works for now.` — fine.
- **protocols.md:89** — `**Revisit if.** Reviews start coming in across many sessions and manual capture gets lossy. Then build Option B — server plus SQLite plus MCP — as the path that covers all browsers and handles the round-trip cleanly.` — em-dash + three-item list. Em-dash + rule-of-three flags.
- **protocols.md:93** — `Last edit: 2026-04-24. Maintainer: Konstantin Konstantinopolskii (kk.consulting).` — fine.

### `CHANGELOG.md` (1.3.0 entry only — lines 5–82)

- **CHANGELOG.md:7** — `Content-architecture rework. Breaking: \`.doc\` and \`.doc__*\` wrapper classes rename to \`.book\` / \`.book__*\` across CSS, JS, HTML, markdown snippets, and skill canon loads.` — five-item "such as" list. "Such as" list flag.
- **CHANGELOG.md:7 (continued)** — `The 2026-04-24 content-architecture session replaces the earlier (rejected, unshipped) 1.3.0 markdown-as-source content with a thin manifesto (200 lines from 685), a \`canon/\` folder (components, patterns, voice), and a \`pipeline/\` folder (pipeline, protocols).` — three-noun list inside parens repeated. Soft rule-of-three.
- **CHANGELOG.md:14** — `\`skills/kk-design-system/canon/components.md\` — foundations (Material, Color, Type, Space, Radii, Motion), typography rhythm (inner and outer theory — no attribution), typography utility registry, component sections (Card / Field / Button / Tag / Switch / Comment / Navigation / Signoff / Spec list / List), kit-doc primitives (Preview frame / Registry table), Forbidden close.` — em-dash + multiple "such as" exhaustive lists. Em-dash + "such as" list flags. The six-item Foundations list inside parens and the ten-item Components list inside parens both qualify.
- **CHANGELOG.md:15** — `\`skills/kk-design-system/canon/patterns.md\` — three top-level patterns (Three columns, Card stack, Narrow mobile) with HTML snippets and preview deep links, plus the 11-row registry absorbed from the deleted root \`patterns.html\`.` — em-dash + three-item list. Em-dash + rule-of-three.
- **CHANGELOG.md:17** — `\`skills/kk-design-system/pipeline/protocols.md\` — new book. Ship discipline, Bundle rule, Semver (with axes + push steps), Evolve protocol (five-step conflict walk), Backlog, Ideation. Migrated from the old manifesto's §Protocols and §Ship discipline.` — em-dash + six-item "such as" list. Em-dash + "such as" list flags.
- **CHANGELOG.md:18** — `\`skills/kk-design-system/pipeline/pipeline.md § Documentation contract\` — new sub-section. Absorbs the entire \`doc-format.md\` file.` — em-dash. Flag.
- **CHANGELOG.md:19** — `\`demos/fundamental--accepted/patterns/narrow.html\` — narrow-mobile pattern preview slice. Completes the registry's 11 previews.` — em-dash. Flag.
- **CHANGELOG.md:20** — `Seven new anchor ids in \`demos/fundamental--accepted/index.html\`: \`#material\`, \`#radii\`, \`#comment\`, \`#preview-frame\`, \`#registry-table\`, \`#navigation\`, \`#spec-list\`. Every canon deep link now resolves to a dedicated anchor.` — seven-item "such as" list. "Such as" list flag.
- **CHANGELOG.md:21** — `Root \`index.html\` rebuilt as a three-column hallway: sidebar scroll-spy TOC + \`<main class="book" data-md-src="./skills/kk-design-system/manifesto.md">\` middle column + inspector with eight \`card card--interactive\` pointer cards (Patterns, Components, Voice, Pipeline, Protocols, Tokens, Fundamental, Renderer smoke) split into two \`inspector__group\` tiers. Two FABs for narrow-mobile (nav + inspector).` — eight-item parens "such as" list. "Such as" list flag.
- **CHANGELOG.md:24** — `Root \`patterns.html\` — absorbed into \`canon/patterns.md § Registry of additional patterns\`.` — em-dash. Flag.
- **CHANGELOG.md:25–28** — five `Removed` bullets, each opening with em-dash. Five em-dash flags.
- **CHANGELOG.md:31** — `\`skills/kk-design-system/voice.md\` → \`skills/kk-design-system/canon/voice.md\`. Canon tri-set (patterns, components, voice) now sits in one folder.` — three-item list inside parens. Soft rule-of-three.
- **CHANGELOG.md:33** — `\`skills/kk-design-system/patterns/strategy-doc.md\` → \`proposals/strategy-doc-interim.md\`. Strategy doc is a product-deliverable recipe, not kit canon; interim home until a strategy prototype ships under \`demos/\`.` — Not-A-But-B framing ("not kit canon"). Soft flag.
- **CHANGELOG.md:34** — `\`manifesto.md\` thinned to ~200 lines — purpose, four layers, signal/noise/magic, philosophy, six principles (one paragraph each), job stories, time to value, agents roster, pipeline summary, navigation pointers, signoff. Foundation inventory, typography rhythm, component inventory, protocols, and ship discipline all migrated to their canonical homes under \`canon/\` and \`pipeline/\`.` — em-dash + eleven-item "such as" list. Em-dash + "such as" list flags.
- **CHANGELOG.md:35** — `Every SKILL.md canon-load reference repointed: \`doc-format.md\` → \`pipeline/pipeline.md § Documentation contract\`; \`patterns/*.md\` → \`canon/patterns.md\`; \`patterns/strategy-doc.md\` → \`../../proposals/strategy-doc-interim.md\`; \`patterns.html\` → \`canon/patterns.md § Registry of additional patterns\`.` — fine, structural mapping.
- **CHANGELOG.md:38** — `Typography rhythm migrated to \`canon/components.md § Foundations § Type § Rhythm — inner and outer theory\` with zero attribution. The "Source: Artemy Lebedev, Bureau" line and the attribution paragraph are stripped from every kit surface. Concept name: "inner and outer theory" or describe the rules directly.` — em-dash inside the section path is rendering of the heading, not a copy choice; flag the heading itself in `components.md:67`. The line itself uses no fresh em-dashes. The line **does** use the literal strings `Lebedev` and `Bureau` — see Lebedev guard below.
- **CHANGELOG.md:41** — `\`kit.js § initScrollSpy\` + \`initCommentSelectionFlow\` — selector relaxed from \`document.getElementById('doc')\` to \`document.querySelector('.book') || document.getElementById('doc')\`. Contract preserves the \`id="doc"\` fallback so consumers who kept the old id on their main element keep working through the rename transition.` — em-dash. Flag.
- **CHANGELOG.md:44** — `\`js/md.js\` and \`demos/md-renderer-smoke/\` — renderer infrastructure carried from the earlier (unshipped) 1.3.0 cycle. Every supported construct renders the same way; only class names inside \`CLASS_MAP\` and class-string literals shifted under the rename.` — em-dash. Flag.
- **CHANGELOG.md:45** — `\`tokens.json\` — no new tokens, no new values.` — em-dash. Flag.
- **CHANGELOG.md:46** — `\`docs/integration/comment.md\` — runtime events, config keys, consumer integration patterns unchanged; class references inside code fences renamed in lockstep with the kit.` — em-dash + three-item list. Em-dash + rule-of-three.

CHANGELOG voice density: the 1.3.0 entry is em-dash heavy by structure (every bullet uses `path — explanation` form). Flag count is therefore inflated. Voice.md does not carve out an exception for changelog bullets; rule applies. Decision lies with the maintainer at stage 7 — either treat the changelog as an exception in the direction doc, or rewrite to colon form (`path: explanation`).

## Lebedev / Bureau guard

Search ran across `index.html`, `manifesto.md`, every `canon/*.md`, every `pipeline/*.md`, `CHANGELOG.md`.

Hits:

- **CHANGELOG.md:38** — `The "Source: Artemy Lebedev, Bureau" line and the attribution paragraph are stripped from every kit surface.` — meta-mention of the removed attribution. Flagged because the strings `Lebedev` and `Bureau` are present in a shipped surface (the changelog), even quoted. The voice directive is a hard ban; the changelog still names the attribution it claims to have stripped.
- **CHANGELOG.md:100** — `\`skills/kk-design-system/manifesto.md § Foundations § Typography rhythm\` — new subsection carrying Artemy Lebedev's fourteen rules from the Bureau article "Rule of Inner and Outer" (bureau.ru/soviet/20140818/). Core principle **inner ≤ outer** stated up front, fourteen rules enumerated, three emphasis paragraphs on the rules that bite hardest in practice (12, 13, 14). Source credited verbatim.` — historical 1.2.0 entry. Hits: `Lebedev`, `Bureau`, `bureau.ru/soviet/20140818/`. Three flags in one bullet.
- **CHANGELOG.md:105** — `\`skills/kk-design-system/manifesto.md § Typography rhythm\` — heading-offset paragraph. Contract documented alongside Lebedev's fourteen rules so downstream roles encounter it on the canon load.` — historical 1.2.0 entry. Hit: `Lebedev`.

All hits sit in `CHANGELOG.md`. None in `index.html`, `manifesto.md`, `canon/*.md`, or `pipeline/*.md`. The 1.3.0 entry references the removed attribution to record the strip; the 1.2.0 entry records the original add. Maintainer call: scrub historical entries, or accept the changelog as a record-of-changes surface where prior names persist.

Zero hits in audited prose canon and the shipped shell. Hits live only in changelog history.

## Defect summary

- **AI tells:** ~62 flags total.
  - Em-dashes for punch (body): ~50 instances across `manifesto.md` (~18), `components.md` (~6), `patterns.md` (1), `pipeline.md` (~10), `protocols.md` (~14), `CHANGELOG.md 1.3.0` (~12), `index.html` title (1).
  - Em-dashes in headlines: 3 (`index.html:6` title, `components.md:67` heading, `pipeline.md:200` bold heading).
  - "Such as" exhaustive lists: ~22 across all files.
  - Rule-of-three lists: ~14 across all files.
  - "Not A, but B" / "Not just X, but Y": 6 (`pipeline.md:87`, `pipeline.md:168` x2, `pipeline.md:206`, `pipeline.md:228`, `pipeline.md:325`, `protocols.md:44` soft, `protocols.md:69` soft, `CHANGELOG.md:33` soft).
  - Filler-adjective stack (`extremely self-evident, clear, simple`): 1 (`pipeline.md:194`).
  - Moralizing closer: 1 (`components.md:190` "For the moments that matter.").
- **Button discipline:** 5 flags.
  - `index.html:92, 100, 108, 116, 124` — five identical primaries `Open the book`. Outcomes are not named distinctly per surface.
  - `index.html:146, 154` — `Open the demo` repeats across two cards.
- **Empty-state shape:** pass. No empty states rendered in the audited surfaces.
- **Error shape:** pass. No error strings rendered.
- **Sentence case:** pass. Every heading scanned is sentence case.
- **Em-dashes:** 53 flags (3 in headlines per voice.md absolute ban; ~50 in body where voice.md says "rare" — tolerance exceeded by orders of magnitude).
- **Muted/light-weight:** pass. Every `t-muted` use is on metadata (timestamp, signoff date). No `t-muted` on body or structural markers.
- **"I" pronouns:** ~6 flags inside `pipeline.md:198–202` example reviewer-output strings ("I can probably click...", "I'd guess this is near the start.", "Click the button, probably research kicks off.", "Maybe."). Canon prose models I-pronoun output for downstream agents; voice.md bans I-pronouns in rendered prose. Conflict.
- **Lebedev guard:** 3 flags in `CHANGELOG.md` (lines 38, 100, 105). Zero in shipped canon prose or shell.

Total: ~76 flags across all categories.

## Notable observations

- Sentence case discipline holds across every heading audited. Zero Title Case slips.
- Every `t-muted` use lands on metadata (signoff dates, captions). Muted-by-default ban holds.
- No filler-adjective leaks (vibrant, pivotal, intricate, meticulous, robust, seamless, breathtaking, rich, comprehensive, holistic) outside the one stack at `pipeline.md:194`.
- No buzzy nouns (tapestry, testament, landscape, journey, ecosystem, realm). Clean.
- No copula avoidance (serves as, represents, stands as, features, boasts) detected.
- No transition-pad words (Additionally, Moreover, Furthermore, In conclusion). Clean.
- No moralizing closers ("Ultimately, this reminds us…") outside the `components.md:190` snippet copy "For the moments that matter."
- No summary blocks ("Key takeaways", "In summary"). Clean.
- No weasel attribution ("industry reports show", "experts argue"). Clean.
- Voice on the index hallway shell is tight — short captions, factual, imperative button verbs. The repeating `Open the book` label is the only structural defect on the rendered shell.
- The em-dash count is the dominant defect class. Voice.md says "rare in body"; ~50 em-dashes in body across canon counts as habitual, not rare. The kit's house style as written is em-dash-heavy.

## Verdict

**FAIL.**

Voice.md says pass = zero flags. Audit returns ~76 flags across ten files. Dominant defect: em-dashes habitual in body where voice.md says rare. Secondary: button-label repetition on the eight pointer cards. Third: I-pronouns embedded in `pipeline.md` reviewer-output examples. Fourth: Lebedev/Bureau strings persist in CHANGELOG history.

Decision lies with stage 7 meta-reviewer + maintainer:

- (a) Treat em-dash density and pointer-card button-label repetition as direction-doc exceptions for this session, recorded with reasons.
- (b) Reiterate to stage 3b/5 to scrub em-dashes to colons or periods, vary the eight pointer-card button labels, and rewrite `pipeline.md:198–202` example reviewer output without "I".

The Lebedev guard hits sit in the changelog only. Maintainer call whether the historical 1.2.0 entry needs scrubbing or whether the changelog is a record-of-changes carve-out.

## Hand-off

Feeds stage 7 meta-reviewer (`kk-role-meta-reviewer`, Anna Wintour). Each flag listed here is evidence the meta-reviewer can cite by file:line under rubric item 5 (zero AI tells). Rubric item 5 fails until each flag is either fixed in copy or stamped as a user-approved exception in the direction doc.

Reiterate path on FAIL routes to stage 3b (canon copy authoring) or stage 5 (shell-side strings + button labels) per `pipeline.md § Reiterate protocol`.
