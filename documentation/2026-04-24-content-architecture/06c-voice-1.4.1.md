---
session: 2026-04-24-content-architecture
stage: 6c (v1.4.1)
role: voice-reviewer (George Orwell)
input: v1.4.1 newly-written prose
output: voice audit on the patch's prose only
gate: feeds stage 7
---

## Per-file audit — v1.4.1 new prose only

Cold read against `canon/voice.md`. Scope is prose written for v1.4.1: the `1.4.1` entry in `CHANGELOG.md`, the wrap-before-unstash comment block in `js/md.js`, and the `stampSectionIds()` script comment in `index.html`. Pre-existing prose excluded.

### `CHANGELOG.md` — § 1.4.1 (lines 5–15)

- **AI tells.** Inventory walk. Filler adjectives — none ("idempotent" is technical-precise, not Wikipedia-list filler). Buzzy nouns — none. `−ing` filler — none. Copula avoidance — none. Padding transitions (Additionally/Moreover/Furthermore/In conclusion) — none. "Not just X but Y" / "Not A but B" — none. Rule of three — none. Moralizing closer — entry ends on "Sidebar TOC anchors resolve again.", a structural fact. Summary block — none. Weasel attribution — "surfaced by the retrospective stage 6b consistency-DS pass" names the source, passes. Exhaustive "such as" — none. Mechanical boldface — none. **Pass.**
- **Em-dashes.** One in body at line 11: "Replaced the function body with `stampSectionIds()` — idempotent walker that finds each ...". Period would do the same job ("Replaced the function body with `stampSectionIds()`. The walker finds each ..."). Voice canon: "Em-dashes for punch: a period almost always does the same job." **Flag — em-dash for punch.**
- **Sentence case.** Top heading "1.4.1, 2026-04-25" — no Title Case. `### Fixed` — single capitalized word, sentence case. **Pass.**
- **"I" pronouns.** Zero. Voice is no-subject throughout ("Patch.", "Reversed to ...", "Replaced the function body ..."). **Pass.**
- **Muted / light defaults.** Not applicable to changelog markdown. **Pass.**

### `js/md.js` — wrap-before-unstash comment (lines 272–276)

> "Wrap before unstash. Raw HTML blocks are sentinel tokens during the wrap pass, so the regex split on `<h2>` only finds md-emitted heading tags. Unstashing afterward restores raw HTML inside whichever section it landed in. Reversing the order would let an `<h2>` nested inside a raw HTML block split that block mid-way."

- **AI tells.** Inventory walk. No filler adjectives, no buzzy nouns, no `−ing` filler, no copula avoidance, no padding transitions, no rule-of-three list, no moralizing closer. Verbs are "are", "finds", "restores", "would let" — concrete. **Pass.**
- **Em-dashes.** Zero. **Pass.**
- **Sentence case.** No headings. **Pass.**
- **"I" pronouns.** Zero. **Pass.**

### `index.html` — `stampSectionIds()` script comment (lines 180–184)

> "md.js produces `<article class=\"book__section\">` elements as direct children of .book — the first article carries h1 + preamble, each subsequent article opens with an h2.t-display. This pass walks the sections and stamps each h2-rooted article with a slug id derived from its heading text. The lead article (h1) does not get an id."

- **AI tells.** No filler adjectives, no buzzy nouns, no `−ing` filler, no copula avoidance, no padding transitions, no rule-of-three. No moralizing closer — ends on the lead-article exception, a fact. **Pass.**
- **Em-dashes.** One in body at line 181: "as direct children of .book — the first article carries h1 + preamble, each subsequent ...". Period would do the same job ("... children of .book. The first article carries ..."). **Flag — em-dash for punch.**
- **Sentence case.** No headings. **Pass.**
- **"I" pronouns.** Zero. **Pass.**

## Defect summary

| Category | Count | Files |
|---|---|---|
| AI tells | 0 | — |
| Em-dashes (for-punch flags) | 2 | `CHANGELOG.md:11`, `index.html:181` |
| Sentence case | 0 | — |
| "I" pronouns | 0 | — |
| Muted / light defaults | 0 | — |
| Button label discipline | n/a (no new UI strings) | — |

Total in-scope flags: **2** — both em-dashes-for-punch.

## Notable observations

v1.4.0 retrospective passed one em-dash in `js/md.js:28` as "rare in body". v1.4.1 introduces two more across a much smaller surface (one paragraph in CHANGELOG, one short script comment, one short md.js comment). Two em-dashes on three small prose blocks is not "rare" — it is the default. Both flagged sites read just as well with a period. The pattern wants attention before it normalizes.

The rest of the patch's prose is clean. md.js:272–276 holds voice — short, verbal, no tells, ends on the consequence of reversing order. The CHANGELOG body sentences carrying the technical narrative ("wrap ran AFTER unstash", "the hook walked the already-wrapped articles, found no top-level h2 children, double-wrapped every section") are factual reconstructions, not padding. "AFTER" in caps is emphasis, not voice drift — the mechanic is the bug.

## Verdict

**PASS, with em-dash flags.** Two for-punch em-dashes are below the threshold to fail the build but above the v1.4.0 "rare" allowance. Recommend stage 7 record them as a voice nag, and a Haiku follow-up swap both for periods.

## Hand-off

Feeds stage 7. Two specific edits the retrospective should consider routing to a Haiku fix:

- `CHANGELOG.md:11` — replace " — idempotent walker that" with ". The idempotent walker"
- `index.html:181` — replace " — the first article" with ". The first article"

Both edits one-line, no semantic change, brings the patch's em-dash density back inside the canon's "rare in body" rule.
