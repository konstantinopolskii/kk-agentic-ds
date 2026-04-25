---
session: 2026-04-24-content-architecture
stage: 6c (retrospective on v1.4.0)
role: voice-reviewer (George Orwell)
input: v1.4.0 newly-written prose + canon/voice.md
output: per-file voice audit on new prose only — AI tells, em-dashes, sentence case, "I" pronouns, button discipline, Lebedev guard
gate: feeds stage 7 retrospective
---

## Per-file audit — new prose only

Cold read against `canon/voice.md`. Scope is prose written for v1.4.0: the `Book structure` entry in `patterns.md`, the registry-row addition + intro tweak in `patterns.md`, the `Kit addenda` count tweak in `components.md`, the new top-of-file comment paragraph in `js/md.js`, the `wrapInSections()` block comment in `js/md.js`, the rewritten `Paragraph-rhythm rule` comment in `style.css`, the new hero `margin-bottom` comment in `style.css`, and the v1.4.0 entry in `CHANGELOG.md`. Pre-existing canon prose excluded.

### `skills/kk-design-system/canon/patterns.md` — § Book structure (new entry, lines 5–37)

- **AI tells.** Scanned full inventory. No filler adjectives (no vibrant/pivotal/intricate/robust/seamless/comprehensive/holistic). No buzzy nouns (no tapestry/journey/realm/ecosystem). No `−ing` filler verbs (no showcasing/fostering/highlighting/emphasizing/reflecting). No copula avoidance (no serves as/represents/stands as/features/boasts). No padding transitions (no Additionally/Moreover/Furthermore/In conclusion). No "Not just X but Y", no "Not A but B". No moralizing closer — list ends on the renderer fact, not on a lesson. No summary block. No weasel attribution. No exhaustive "such as" list. Line 36 "Subsequent sections carry a hairline top border, 32 px top padding, 20 px top margin." reads as three items but the items are numeric specs, not adjectives — outside the rule-of-three target. **Pass.**
- **Sentence case in headings.** Heading "Book structure" — sentence case. **Pass.**
- **Em-dashes.** Zero in this section. **Pass.**
- **"I" pronouns.** Zero. Voice is "we" or no subject (e.g. "Reach for this structure…"). **Pass.**
- **Muted / light defaults.** Not applicable to source markdown (no inline color or weight overrides written). **Pass.**
- **Lebedev / Bureau guard.** No external-authority weasel attribution. **Pass.**

### `skills/kk-design-system/canon/patterns.md` — registry intro (line 152) + new row (lines 162–165) + signoff stat bumps (lines 222, 225)

- **AI tells.** Line 152 "Twelve compositions sliced out of shipped prototypes plus one structural wrapper. Each sliced row points at a live preview. The structural wrapper has no preview slice." — terse, factual, no tells. New registry row description "Structural article wrapping every prose unit. First section holds the hero; each h2 starts a new section." — clean. **Pass.**
- **Sentence case.** No new headings. **Pass.**
- **Em-dashes.** Zero. **Pass.**
- **"I" pronouns.** Zero. **Pass.**

### `skills/kk-design-system/canon/components.md` — § Rhythm § Kit addenda (line 97)

Single-word change: "Five rules" → "Four rules" plus removal of one bullet. Surrounding prose pre-existing.

- **Orphan punctuation / residue.** Diff confirms clean bullet removal; preceding bullet ends in period, no trailing colon or stray comma. **Pass.**
- **AI tells in newly-written tokens.** "Four rules the kit layers on top of the fourteen" — same shape as the prior sentence, no new tells introduced. **Pass.**

### `js/md.js` — top-of-file comment paragraph (lines 24–29)

> "Section auto-wrap: the renderer wraps each h2-rooted region in `<article class=\"book__section\">`. The first article spans the source's h1, preamble, and intro paragraphs (everything before the first h2). Each subsequent h2 starts a new article. Hand-authored markup follows the same convention — every prose unit lives inside a `.book__section`. See `canon/patterns.md § Book structure`."

- **AI tells.** No filler adjectives, no buzzy nouns, no `−ing` filler, no copula avoidance, no padding transitions, no rule-of-three adjective list, no moralizing closer. **Pass.**
- **Em-dashes.** One em-dash on line 28 ("same convention — every prose unit"). voice.md: "Em-dashes: Forbidden in headlines. Rare in body." This is body comment prose, not a headline; one occurrence across the full v1.4.0 new-prose surface qualifies as rare. **Pass (within the "rare in body" allowance).** Flag-adjacent — noting for stage 7 awareness.
- **Sentence case.** No headings. **Pass.**
- **"I" pronouns.** Zero. **Pass.**

### `js/md.js` — `wrapInSections()` block comment (lines 104–109)

> "Section auto-wrap. Splits the rendered HTML on every `<h2 …>` opener and wraps each h2-rooted region in `<article class=\"book__section\">`. The first article spans pre-h2 content (h1, preamble, intros). Each subsequent h2 starts a new article. Source markdown without an h2 wraps as a single section."

- **AI tells.** None across the full inventory. Verbs are "Splits", "wraps", "spans", "starts" — concrete, not copula-avoidance. **Pass.**
- **Em-dashes.** Zero. **Pass.**
- **"I" pronouns.** Zero. **Pass.**

### `style.css` — Paragraph-rhythm rule comment (rewritten)

> "Paragraph-rhythm rule. Every prose unit in `.book` lives inside a `.book__section`, including the hero region (h1 + intro paragraphs). Section children carry the 20 px paragraph rhythm; prose at `.book` level is not a supported authoring shape."

- **AI tells.** No tells. "is not a supported authoring shape" reads as factual constraint, not weasel. **Pass.**
- **Em-dashes.** Zero. **Pass.**
- **"I" pronouns.** Zero. **Pass.**

### `style.css` — hero `margin-bottom` comment (new)

> "Hero-to-intro distance clears the hero's line-height (66 px) per inner-and-outer rule 13. The 60 px below-gap, plus the next paragraph's leading slack, lands above the 66 px floor. Same visual relationship the old `.book__intro` `padding-top` carried, now expressed inside the section."

- **AI tells.** None. **Pass.**
- **Em-dashes.** Zero. **Pass.**
- **"I" pronouns.** Zero. **Pass.**

### `CHANGELOG.md` — 1.4.0 entry (lines 5–25)

- **AI tells.** Inventory walk. No filler adjectives. No buzzy nouns. No `−ing` filler. No copula avoidance. No padding transitions ("Additionally/Moreover/Furthermore/In conclusion" — all absent). No "Not just X but Y", no "Not A but B". No rule-of-three adjective list. No em-dash for punch. No moralizing closer — entry ends on "the sole determinant of hero-to-paragraph distance inside a section.", a structural fact. No summary block. No weasel attribution. No exhaustive "such as" list (one "e.g." with two examples — within budget). Mechanical boldface absent. **Pass.**
- **Sentence case.** Top heading "1.4.0, 2026-04-25" carries no Title Case. Subheadings `### Breaking`, `### Added`, `### Removed`, `### Changed` are single capitalized words — sentence case as intended. **Pass.**
- **Em-dashes.** Zero. **Pass.**
- **"I" pronouns.** Zero. Voice is no-subject throughout ("Section convention universalized.", "Hero clears its own line-height…"). **Pass.**
- **Muted / light defaults.** Not applicable to changelog markdown. **Pass.**
- **Lebedev / Bureau guard.** No weasel attribution. **Pass.**

## Defect summary

| Category | Count | Files |
|---|---|---|
| AI tells | 0 | — |
| Em-dashes (in-rule violation) | 0 | — |
| Em-dashes (rare-in-body, noted) | 1 | `js/md.js:28` |
| Sentence case | 0 | — |
| "I" pronouns | 0 | — |
| Muted / light defaults | 0 | — |
| Lebedev / Bureau guard | 0 | — |
| Button label discipline | n/a (no new UI strings) | — |

Total in-scope flags: **0**.

## Notable observations

The new `Book structure` pattern entry holds the voice well. The opening sentence ("Every prose unit in `.book` lives inside an `<article class=\"book__section\">`.") names the rule in one breath and reads at the 0.2-second bar. The `Rules:` list ends on a renderer mechanic ("The renderer does it."), which is the right register for canon — no moralizing, no closer. The CHANGELOG entry's no-subject opener ("Section convention universalized.") stays clean of "I" and reads as factual rather than narrated. The single em-dash in `js/md.js:28` is the only place across all newly-written v1.4.0 prose where a period would have done the same work; flagging for awareness, not for fix — within the "rare in body" budget.

## Verdict

**PASS.** Zero in-scope flags across newly-written v1.4.0 prose. The em-dash in `js/md.js:28` is noted but sits inside the "rare in body" allowance, not above it. No v1.4.1 voice fix required.

## Hand-off

Feeds stage 7 retrospective. The retrospective should record that v1.4.0 shipped without 6c review and the retrospective audit returned clean. The single em-dash note in `js/md.js:28` is for awareness — if a future edit touches that comment, prefer a period.
