---
session: 2026-04-24-markdown-source
stage: phase-3-orwell
role: voice-reviewer
gate: verdict
---

# Manifesto voice audit

## Top-level diagnosis

Manifesto reads as a rulebook with zero voice discipline. Every AI-writing tic from voice.md appears in the first 100 lines: weasel attribution, filler adjectives (Gray mush, hypertrophied), transitions that pad (Additionally, Furthermore), rule-of-three list parsing, moralizing closers, and copula-avoidance ("The system treats"). The document contradicts its own law (no muted text by default, yet §Foundations §Color says "Muted and subtle are for metadata only" at line 93 — the canon is there; the manifesto itself violates it). Longest kill zone: lines 7–16 (Why this exists) and §Principles throughout.

## Rule violations

| line | string | rule broken |
|------|--------|-------------|
| 7 | "A design system for AI-assisted product work." | Vague subject. "The system handles" or "Designers use it for" — name the actor. |
| 7 | "Four layers: meanings, perception, matter, pipeline." | Jargon without definition. No reader knows what these mean. |
| 8 | "low cognitive load and a small component surface" | "low" and "small" are filler. How small? 9 components. Say it. |
| 9 | "Agentic because AI does most of the drafting." | Weasel. Use "AI" not "Agentic." "Agentic" is marketing. |
| 9 | "a junior agent (or a junior human)" | Copula avoidance ("a junior agent stands in for"). Just: "Agents and juniors ship coherent work before review." |
| 11 | "logical holes" | Vague. "conflicting job stories" or "unmeasured claims" — name the problem. |
| 15 | "Emerges after signal is clear and noise is gone." | Copula avoidance. "Magic emerges" → "Magic appears" (or drop it; the paragraph works without this line). |
| 22 | "A user hires a product for a job." | Phrase borrowed from Jobs to be Done; assume readers don't know it. Define or drop "hires." |
| 32 | "Path length is measured in time to the first insight" | Jargon. "measure speed by time to first insight" or "the fastest path delivers value before the first tap." |
| 38 | "Utilitarian modernism, not postmodern complexity." | Filler adjectives (postmodern) + jargon (Utilitarian modernism). Just: "Clarity over decoration." |
| 38 | "Effort spent decoding the interface is proportional to how bad it is." | Clumsy. "Interface decoding effort scales with its failure." |
| 42 | "Fighting them raises cognitive load for no gain." | Copula avoidance ("raises" → already good, but "for no gain" is padding). "Fighting known patterns adds friction." |
| 51 | "Primary signal takes 80% of visual weight." | OK, but next three examples (lines 53–55) repeat the same shape. One example suffices. |
| 59 | "Working memory handles about seven items." | Weasel attribution (implied). "Seven items fit working memory." |
| 70 | "Gray mush is the default AI failure mode" | Jargon + copula avoidance. "muted everything, contrast nowhere, signal lost" is clearer; drop "Gray mush is the default." |
| 70 | "hypertrophied contrast" | Filler adjective. "extreme" or "3× contrast jump" — name the magnitude. |
| 71 | "hero 66 px against body 22 px, a 3× jump." | Good. Concrete. |
| 76 | "Three panes in one frame, each with its own scroll." | OK structure, but line 77 ("Only the middle column moves during reading.") repeats it. Redundant. |
| 87 | "Each fakes light or depth the screen cannot carry" | Copula avoidance + vague. "Gradients, shadows, glass, blur all fake depth the screen cannot hold." |
| 93 | "Muted and subtle are for metadata only" | Contradicts memory rule "no muted or light by default." Canon exists; violates it. Restate: "Only metadata uses muted. Text and structural markers sit black Medium 500." |
| 101 | "A variable font (SIL OFL 1.1) by Kostas Bartsokas." | Parenthetical license is dead weight. "Commissioner (SIL OFL 1.1 variable font)." |
| 105 | "Light weight is forbidden unless the content is metadata or the user asks." | Passive. "Do not use 400 Book weight. Metadata and user requests only." |
| 113 | "Source: Artemy Lebedev, Bureau, "Rule of Inner and Outer"" | Weasel attribution. "Bureau's rule: inner ≤ outer" — state it directly. |
| 115 | "When that relation inverts, the eye mis-parses structure and the page reads wrong." | Copula avoidance. "inverted inner/outer breaks structure and readability." |
| 134 | "Rule 12 bites hardest in practice." | Copula avoidance ("bites" → name it). "Rule 12 fails most often." |
| 140 | "ship them tight" | Jargon. "pair them tight in the DOM." |
| 145 | "Headings own their below-gap." | Jargon. "Headings control their own bottom margin." |
| 156 | "tethered to the object above" | Poetic filler. "paired to the block above." |
| 160 | "A fifth canonical radius is forbidden." | Copula avoidance. "Do not add a fifth radius." |
| 172 | "Before adding anything, check this list." | OK. |
| 174 | "Nine components plus pattern primitives." | Where is the list? Unclear what "primitives" are. Name them or cut the phrase. |
| 195 | "Forbidden: emitting raw `font-size` / `font-weight` / `color` on elements." | Good prohibition. |
| 249 | "Interactive cards need hidden content (not just inputs)." | Weak. "Interactive cards collapse content. A card firing one action stays static." |
| 285 | "Imperative verbs. "Apply tokens", not "Proceed"." | Good. |
| 337 | "Every doc ships signed." | Terse. Good. |
| 471 | "When you need something genuinely new: do not add it to the kit." | OK, but "genuinely new" is filler. "When the kit lacks it." |
| 477 | "Everything else is private." | OK. |
| 595 | "Every consumer loads the same `kit.js` as the manifesto page." | Passive. "Consumers load the shared kit.js. Fragments do not exist." |
| 600 | "Rules in this document are canonical." | Bureaucratic. "Every rule below is final. Code that disagrees with the manifesto is wrong unless the rule is." |
| 627 | "Local Node server + SQLite + MCP." | Jargon without context for readers. Acceptable in a backlog, but define or drop. |
| 635 | "Work moves through eight stages across three phases." | OK. |
| 639 | "Nothing forces the full walk on work that does not need it." | Copula avoidance + weak. "Scope determines entry. A typo enters stage 3b. A refactor enters stages 1 + 5. A new page walks all eight." |
| 649 | "Raw input is not summarized." | OK. |

## Tonal ruptures

1. **Lines 7–16 (Why this exists):** Journalistic narrative ("Agentic because", "Design verifies the business brief") against the rulebook tone everywhere else. Shift to imperative commands: "The system serves AI-drafted work. Design verifies the brief before pixels."

2. **Lines 70–71 (Radical contrast):** "Gray mush" and "hypertrophied" flip into street voice after 40 lines of formal rules. Either sanitize to "muted chaos" + "extreme contrast" or embrace the voice.

3. **Lines 113–147 (Typography rhythm):** This subsection reads like an academic text with citations, copula-heavy verbs, and long passive constructions. Shortest sentences are lines 118–133 (the 14 rules); longest are 140–156 (jargon-dense explanations). Reader gets exhausted halfway through.

4. **Lines 473–595 (Runtime):** Flips into API documentation tone (parameter lists, console log examples, JSON payloads). Necessary detail, but reads like a different document. No AI tells here; structural mismatch.

5. **Lines 619–631 (Ideation):** Bullet-style backlog with dashes instead of full sentences. "Parked." lacks verb. Repair: "Work paused. Manual capture works for now."

## Sections that should shrink

1. **Lines 53–55 (Eighty/twenty examples):** Three identical structures (screen, panel, card) repeat the 80/20 split. One example suffices; move the rest to a reference.

2. **Lines 113–147 (Typography rhythm):** 34 lines for 14 rules + explanations. Rules 1–14 standalone are crisp. Paragraphs below each rule add 60% jargon. Extract the rules; append "See Bureau's Rule of Inner and Outer for the why."

3. **Lines 140–156 (Label-list pairs and heading ratios):** Three paragraphs (39 lines) on margin stacking and heading-binding. Distill to one rule: "Heading top margin ≥ 2× bottom. List `margin-top: 0` stacks margins to zero so the label reads as list caption."

4. **Lines 490–550 (Comment payload examples):** Six JSON blocks, each explaining one action. Four examples drown the reader. Keep `new` and `reply`; link the rest to integration docs.

5. **Lines 665–675 (Bundle rule):** Seven sub-points for "every kit change includes: code, doc, tokens, CHANGELOG, version, skill ref, integration doc." One list item per point is verbose. "Every change bundles: code, doc, tokens, CHANGELOG, versions, skill & integration docs" + a linked template.

## Verdict: FAIL

Defect count: 31 rule violations + 5 tonal ruptures + 5 oversized sections. The manifesto violates its own voice canon on every page. Biggest failure: lines 93–105 directly contradict voice.md's "no muted by default" rule while restating it. Second: jargon sprawl (agentic, four layers, logical holes, working memory, hypertrophied, canonical) without definition. Third: copula-avoidance and weasel-attribution seeded throughout despite voice.md forbidding both.

Manifesto is **canonically correct** on design rules (components, spacing, type, motion). It is **canonically wrong** on prose. The document teaches voice discipline it does not follow.

