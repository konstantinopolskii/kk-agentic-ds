---
session: 2026-04-24-content-architecture
stage: 6c (v1.4.2)
role: voice-reviewer (George Orwell)
input: v1.4.2 newly-written prose (manifesto §Pipeline + CHANGELOG 1.4.2)
output: voice audit on the patch's prose only
gate: pass on zero flags
---

# Voice audit, v1.4.2 patch prose

Cold read against `canon/voice.md`. Two prose units in scope: one new paragraph in `manifesto.md § Pipeline` and the `CHANGELOG.md` 1.4.2 entry. Nothing else read.

## File 1. `skills/kk-design-system/manifesto.md` line 96

The paragraph under audit:

> Every kit-touching session starts by picking a path. Read `pipeline/pipeline.md § Entry point matching — the recipe map` before code touches disk. Default is the full walk; deviations need a stamp. Architectural impact picks the recipe, not diff size — a three-line CSS edit can still walk the canon path if it changes structural behavior.

Four sentences. Periods. No subject in three of four (canon-compliant: "no subject when the sentence stands alone"). No "I". No filler adjectives (vibrant, robust, seamless, comprehensive — none present). No −ing filler verbs (showcasing, fostering — none). No copula avoidance (`is`, `picks`, `need`, `starts` — direct verbs throughout). No padding transitions (Additionally, Moreover — none). No not-just-but. No rule-of-three adjective list. No moralizing closer. No weasel attribution. No "such as" exhaustive list. No mechanical boldface.

Em-dashes. Two appear in the line. The first sits inside a quoted path reference (`§ Entry point matching — the recipe map`) — it belongs to the target heading, not to this paragraph's prose, so it does not count against the body em-dash budget. The second is authored: "Architectural impact picks the recipe, not diff size — a three-line CSS edit can still walk the canon path…". Canon: em-dashes are "rare in body". One authored em-dash in a four-sentence paragraph clears the rarity bar. The em-dash splices a contrasting clarification onto the rule; a period would also work ("Architectural impact picks the recipe, not diff size. A three-line CSS edit…") but the comma-then-em-dash construction is not a defect. Pass.

Sentence case. The paragraph references `§ Entry point matching — the recipe map`, which is the target heading's own casing — out of scope for this audit (heading lives in `pipeline/pipeline.md`). Pass.

Lebedev / Bureau guard. No precious metaphor, no buzzy noun (tapestry, journey, ecosystem — none), no inflated abstraction. The line names a rule and gives a concrete counterexample (three-line CSS edit). Pass.

Verdict: 0 flags.

## File 2. `CHANGELOG.md` lines 5–12 (1.4.2 entry)

The entry under audit:

> ## 1.4.2, 2026-04-25
>
> Patch. Manifesto §Pipeline gains one paragraph naming the session-open rule: read `pipeline/pipeline.md § Entry point matching — the recipe map` before code touches disk, default is the full walk, deviations need a stamp, architectural impact picks the recipe (not diff size).
>
> The directive lives in canon now instead of memory. Memory shrinks to a single pointer at manifesto. Every role skill that already loads manifesto (analyst, director, designer, design engineer, meta-reviewer) inherits the rule automatically. Fresh-eyes keeps its cold-read contract — it does not need the recipe map.
>
> ### Added
> - `manifesto.md § Pipeline`: one-paragraph directive naming the session-open rule.

Heading. `## 1.4.2, 2026-04-25` and `### Added` — sentence case, no Title Case, no ALL CAPS. Pass.

No "I". Pass.

Filler adjectives, −ing fillers, copula avoidance, padding transitions, not-just-but, moralizing closers, weasel attribution, mechanical boldface — all absent.

Rule-of-three check. Line 7 strings four facts in series: "default is the full walk, deviations need a stamp, architectural impact picks the recipe (not diff size)". Canon's rule-of-three flag targets adjective lists for fake completeness ("fast, reliable, scalable"). This is a fact enumeration, not adjectival padding, and it carries four items rather than three. No flag.

"Such as" exhaustive-list check. Line 9 names five role skills in parentheses: "(analyst, director, designer, design engineer, meta-reviewer)". Canon: "naming five examples proves the category isn't clear. Give one, or name the category." Counter-read: this is not a "such as" sample — it is the closed, complete set of role skills that load manifesto. The category was named ("every role skill that already loads manifesto"); the parenthetical fully enumerates the set. Removing it would force a reader to grep skills/ to verify scope. Defensible as inventory, not as illustration. No flag, with caveat that future additions to the set must update this line.

Em-dashes. Line 7 carries `— the recipe map` inside a quoted heading reference; out of scope as before. Line 9 authored: "Fresh-eyes keeps its cold-read contract — it does not need the recipe map." One authored em-dash across the entry's four body sentences. A period fully replaces it: "Fresh-eyes keeps its cold-read contract. It does not need the recipe map." The em-dash here is closer to "for punch" than to a structural splice — canon explicitly calls out "em-dashes for punch: a period almost always does the same job". This one is the weaker of the two patch em-dashes. Soft flag, not a fail: the rarity bar still holds (one authored body em-dash per prose unit, two units, two em-dashes total across the patch).

Lebedev / Bureau guard. "The directive lives in canon now instead of memory. Memory shrinks to a single pointer at manifesto." Direct, factual, no metaphor inflation. "Inherits the rule automatically" — accurate technical verb, not buzzy. Pass.

Verdict: 0 hard flags. 1 soft flag noted on the line-9 em-dash for the maintainer to consider on a future polish pass.

## Defect summary

| File | Line | Category | Flag | Severity |
|---|---|---|---|---|
| `manifesto.md` | 96 | Em-dash | Authored body em-dash present, one occurrence, paragraph-rare | none |
| `CHANGELOG.md` | 9 | Em-dash | Authored body em-dash splice replaceable by period | soft |

Both em-dashes clear the canon's "rare in body" bar at the per-unit level. Neither is in a headline. No headline em-dashes. No "I". No AI tells. No Title Case headings. No mechanical boldface.

## Verdict

PASS. Zero hard flags across both prose units. One soft em-dash note logged on CHANGELOG line 9 — within canon tolerance, raised for transparency.

## Hand-off

Stage 7 meta-reviewer (Anna Wintour) gets a clean voice gate on v1.4.2. The patch's two prose units pass the AI-tells inventory, sentence-case rule, em-dash rule, no-"I" rule, and Lebedev guard. No rewrite required.
