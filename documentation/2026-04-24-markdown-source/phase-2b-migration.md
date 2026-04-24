---
session: 2026-04-24-markdown-source
stage: phase-2b
role: ds-manager + ds-maintainer
input: phase-2a-audit.md + index.html (767 lines) + every markdown canon file + 12 SKILL.md + 4 non-skill canon
output: manifesto.md expanded to 685 lines, components.md stubbed, 12 skill files + pipeline.md + voice.md + strategy-doc.md + integration/comment.md updated, index.html cross-ref hrefs repointed
gate: KK stamp on commit + push
---

# Phase 2b migration — markdown-as-source

Prose migration from `index.html` to `manifesto.md`, component inventory absorbed into `manifesto.md § Components`, `components.md` retired as a thin re-export stub for v1.3.0, canon-load references across 12 SKILL.md files + 4 non-skill canon files repointed to `manifesto.md § Components`.

## Per-block migration log (32 rows)

Mapping follows the §1 prose inventory from `phase-2a-audit.md`. `index.html` line numbers reference the pre-migration file (767 lines). Destination subsections follow the new manifesto.md TOC.

| Block (id) | Source lines | Destination | Disposition |
|---|---|---|---|
| `doc__intro` para 1 | 106-110 | `manifesto.md § Why this exists` opener | Migrated |
| `doc__intro` para 2 | 111-115 | `manifesto.md § Why this exists` opener | Migrated |
| `doc__intro` para 3 | 116-123 | KEEP IN INDEX | Shell-framing (Phase 3 handles) |
| `doc__signoff` stats + signature | 125-147 | KEEP IN INDEX | Structural shell, Phase 3 rewrites stats; signoff rule relaxed to "two or four" in manifesto |
| `<h2>Meanings</h2>` marker | 151 | DROP | Phase 3 removes structural marker |
| `#philosophy` | 153-162 | `manifesto.md § Philosophy` | Canon held; index duplicate dropped at Phase 3 |
| `#why` | 164-191 | `manifesto.md § Why this exists` | Canon held; index duplicate drops at Phase 3 |
| `#jobs` body para | 193-202 | `manifesto.md § Job stories` | Canon held |
| `#jobs` example (voice transcription) | 211 (Example spec row) | `manifesto.md § Job stories` — new Example paragraph | Migrated |
| `#jobs` anti-pattern | 214-215 | `manifesto.md § Job stories` | Canon held |
| `#ttv` | 221-231 | `manifesto.md § Time to value` | Canon held |
| `<h2>Principles</h2>` marker | 235 | DROP | Phase 3 |
| `#signal` | 237-247 | `manifesto.md § Principles § Pure signal` | Canon held |
| `#expected` | 249-279 | `manifesto.md § Principles § Expected patterns` | Canon held |
| `#eighty-twenty` body | 281-290 | `manifesto.md § Principles § Eighty / twenty` | Canon held |
| `#eighty-twenty` screen/panel/card spec rows | 293-305 | `manifesto.md § Principles § Eighty / twenty` — three bullets | Migrated |
| `#chunking` body | 309-324 | `manifesto.md § Principles § Chunking` | Canon held + fractal paragraph expanded |
| `#chunking` fractal spec-list | 325-353 | `manifesto.md § Principles § Chunking` — five bullets | Migrated (concrete counts kept per ruling 4 + Q2 recommendation) |
| `#contrast` | 356-373 | `manifesto.md § Principles § Radical contrast` | Canon held |
| `#ipad` | 375-390 | `manifesto.md § Principles § The iPad feel` | Canon held |
| `<h2>Inventory</h2>` marker | 396 | DROP | Phase 3 |
| `#components` pointer card | 398-413 | KEEP IN INDEX | Shell card, Phase 3 handles |
| `#patterns` pointer card | 415-427 | KEEP IN INDEX | Shell card |
| `#pipeline` pointer card | 429-441 | KEEP IN INDEX | Shell card |
| `#foundations` pointer card | 443-459 | KEEP IN INDEX | Shell card |
| `<h2>Voice</h2>` marker | 466 | DROP | Phase 3 |
| `#ai-tells` intro two paragraphs | 478-484 | `voice.md § No AI tells` opener | Migrated (one paragraph, merged "leak the same tics" with the Wikipedia-inventory framing) |
| `#ai-tells` card 1 (words + verbs) | 486-512 | `voice.md § No AI tells § Words and verbs to cut` | Canon held, index duplicate drops at Phase 3 |
| `#ai-tells` card 2 (sentence shapes) | 514-544 | `voice.md § No AI tells § Sentence shapes to cut` | Canon held |
| `#ai-tells` card 3 (structures) | 546-576 | `voice.md § No AI tells § Structures and signals to cut` | Canon held |
| `<h2>Practice</h2>` marker | 584 | DROP | Phase 3 |
| `#practice` pointer card | 586-603 | KEEP IN INDEX | Shell card; href to `components.md` repointed to `manifesto.md § Components` |
| `#evolve` | 605-633 | `manifesto.md § Protocols § Evolve` | Migrated (full five-step protocol + paragraph intro) |
| `<h2>Audit</h2>` marker | 637 | DROP | Phase 3 |
| `#backlog` | 639-653 | `manifesto.md § Protocols § Backlog` | Migrated |
| `#ideation` | 655-700 | `manifesto.md § Protocols § Ideation § Auto-sync inspector comments to Claude` | Migrated (one card, seven bullets) |
| `<h2>Distribution</h2>` marker | 706 | DROP | Phase 3 |
| `#distribution` pointer card | 708-720 | KEEP IN INDEX | Shell card |
| Inspector shell | 729-738 | KEEP IN INDEX | Not prose |
| FAB + nav scripts | 746-765 | KEEP IN INDEX | Not prose |

Plus two new manifesto sections that absorb content that wasn't in any single index block:

- `manifesto.md § Ship discipline` — new section. Carries the browser-check discipline the proposal flagged (§Verification discipline (every phase)) and the bundle rule + semver ship protocol extracted from `kk-ds-maintainer/SKILL.md` so the canon reader sees ship rules next to the protocols that need them. Skill file still owns the operational detail.

## Drift resolutions (12 rows)

Follows the §2 drift inventory from `phase-2a-audit.md`.

| Drift | Before | After | Where |
|---|---|---|---|
| Radii count | "two radii plus one pill alias" | "Four radii: 12 px for buttons… 16 px for preview frames and medium surfaces; 24 px for cards…; 9999 px for pills" | `manifesto.md § Foundations § Radii` |
| Nine components | "Nine components in the kit" | Section opens "Nine components plus pattern primitives" — same concrete count, names the pattern primitive shelf alongside | `manifesto.md § Components` opener |
| 9 color tokens | "9 color tokens, and not one more" | "Nine tokens: two backgrounds, two surface tints, two hairlines, three text alphas" | `manifesto.md § Foundations § Color` (unchanged — accurate + concrete per ruling 4) |
| Color breakdown 2/2/2/3 | "two backgrounds, two surface tints, two hairlines, three text alphas" | Same — kept concrete | `manifesto.md § Foundations § Color` |
| Seven sizes type scale | "seven sizes (66 to 14 px)" | Same — kept concrete | `manifesto.md § Foundations § Type` |
| Three weights | "three weights used in the kit (regular, medium, bold)" | Same — kept concrete | `manifesto.md § Foundations § Type` |
| 12 spacing tokens | "12 spacing tokens on a 4px grid" | Relocated to `manifesto.md § Principles § Chunking` as one of the five fractal examples ("Twelve tokens split into micro, standard, macro bands") | Chunking subsection |
| Four easing curves | "four easing curves" | "Four easing curves, four roles" — kept concrete | `manifesto.md § Foundations § Motion` |
| Eleven patterns | `index.html` line 423 "Eleven patterns" | Untouched (stays in `index.html` pointer card; Phase 3 will verify) | `index.html` pointer card |
| Eight stages, eleven roles | `index.html` line 432 | Kept concrete per audit §2 row 10 — pipeline canon framing | `manifesto.md § Pipeline` still says "eight stages" + "eleven role skills" |
| 49 sections, 9 components signoff stats | Signoff stats `49 sections`, `9 components`, `9 color tokens`, `2 radii` | Phase 2b relaxes the signoff count rule to "two or four" valid; Phase 3 rewrites the actual index stats | `manifesto.md § Components § Signoff` — "Two or four `.stat` children are valid shapes" |
| ai-tells duplication | `index.html § ai-tells` mirrored `voice.md § No AI tells` | `voice.md` is now the sole source; index duplicate drops at Phase 3; voice.md gained the two-paragraph intro | `voice.md § No AI tells` (opener paragraph added) |

## Skill canon load updates (16 files)

Every file that previously loaded `components.md` now points at `manifesto.md § Components` (or a specific subsection). The stub keeps both paths resolving through v1.3.0.

| File | Before | After |
|---|---|---|
| `skills/kk-design-system/SKILL.md` | `components.md` in read order + two references | Read order drops `components.md`; §Components lives in `manifesto.md`; stub note added at bottom |
| `skills/kk-design-system/pipeline.md` | 9 references across §Role roster stages + §Meta-reviewer rubric | Every reference repointed to `manifesto.md § Components` or subsection |
| `skills/kk-design-system/voice.md` | "See `components.md` → Signoff." | "See `manifesto.md § Components § Signoff`." + AI-tells intro paragraph added |
| `skills/kk-design-system/patterns/strategy-doc.md` | Two references (Signoff, Comment) | `manifesto.md § Components § Signoff`, `manifesto.md § Components § Comment` |
| `skills/kk-role-design-director/SKILL.md` | `components.md` §Typography + §Card + §Patterns | `manifesto.md § Components § Typography utility classes + § Card + § Patterns (Three columns, Card stack, Narrow)` |
| `skills/kk-role-designer/SKILL.md` | `components.md` full file + inventory-check reference | `manifesto.md` full file (includes §Components) + `manifesto.md § Components` in body |
| `skills/kk-role-ds-manager/SKILL.md` | `components.md` full file + two body references | `manifesto.md` full file + `manifesto.md § Components` in body |
| `skills/kk-role-design-engineer/SKILL.md` | `components.md` full file + Inventory-check reference | `manifesto.md` full file (includes §Components) + `manifesto.md § Components` in body |
| `skills/kk-role-consistency-ds/SKILL.md` | `components.md` full file + four vectors references | `manifesto.md` full file (includes §Components) + `manifesto.md § Components` in body (description frontmatter untouched — major semver gate) |
| `skills/kk-role-consistency-jobstory/SKILL.md` | Anti-reference to `components.md` + cross-check wording | `manifesto.md § Components` in anti-reference + cross-check wording |
| `skills/kk-role-fresh-eyes-jobstory/SKILL.md` | Anti-reference + "Read components.md" wording | `manifesto.md § Components` in anti-reference + wording |
| `skills/kk-role-meta-reviewer/SKILL.md` | `components.md` §Typography utility classes | `manifesto.md § Components § Typography utility classes` |
| `skills/kk-role-meta-retro/SKILL.md` | `components.md` full file + canon-target example | Removed (manifesto full file carries it) + canon-target example repointed |
| `skills/kk-role-pattern-discoverer/SKILL.md` | `components.md` in reference set | `manifesto.md` (includes §Components) |
| `skills/kk-ds-maintainer/SKILL.md` | Three references (inherited + bundle + hidden failure mode) | `manifesto.md § Components` in all three; bundle list keeps `components.md` stub note |
| `skills/kk-ds-supervisor/SKILL.md` (deprecated) | Two references | `manifesto.md § Components` in both |
| `skills/kk-ds-frontend/SKILL.md` (deprecated) | Two references | `manifesto.md § Components` in both |
| `docs/integration/comment.md` | One reference | `manifesto.md § Components` |
| `index.html` pointer card href (line 598) | Hyperlink to `components.md` | Hyperlink to `manifesto.md` with label `manifesto.md § Components` |
| `index.html` comment at line 581 | Inline HTML comment mentioning `components.md` | Updated to `manifesto.md § Components` |

Files counted: 19 total — 12 SKILL.md + pipeline.md + voice.md + strategy-doc.md + components.md (rewritten as stub) + index.html + integration/comment.md + the manifesto itself (target). The audit's "16 files" figure tallied SKILL.md + non-skill canon without counting the rewritten components.md + index.html + integration doc; this report expands the count.

Frontmatter `description` field on `kk-role-consistency-ds/SKILL.md` mentions `components.md` verbatim — left untouched per the maintainer rule that description changes trigger a major semver bump. The stub keeps that description accurate until v2.0.0.

## Manifesto final line count

685 lines. Fits the 500-700 band per user ruling 3. Audit estimate was 548; actual came higher because:

- §Typography rhythm stayed verbatim (115 lines carried over, not absorbed into a shorter form).
- §Runtime stayed verbatim (100+ lines of lifecycle events + integration convention).
- §Ship discipline added a net-new section (~30 lines) that absorbs the proposal's verification discipline and the bundle / semver rules the maintainer skill carried.

Coherence holds by skim: Why → Philosophy → Job stories → Time to value → Principles → Foundations → Components → Runtime → Protocols → Pipeline → Documentation contract → Ship discipline. One reader path.

## Open questions surfaced during execution

1. **Audit Q1 (doc__intro split).** Executed the recommended split: paragraphs 1-2 migrated to `manifesto.md § Why this exists` opener; paragraph 3 stays in `index.html` shell. Phase 3 removes 1-2 from index.
2. **Audit Q2 (chunking concrete vs abstract).** Kept concrete per audit recommendation. Five fractal examples with counts live in `manifesto.md § Principles § Chunking`.
3. **Audit Q3 (backlog/ideation split).** Kept in manifesto.md § Protocols. §Ideation carries the one parked idea. Flag: if a second idea lands and §Ideation crosses ~80 lines, split to `ideation.md` next release.
4. **Audit Q4 (signoff stats count).** Resolved by user ruling — "two or four" shapes valid, no forced count. Relaxed in `manifesto.md § Components § Signoff`. Phase 3 writes the actual index stats.
5. **Audit Q5 (parent SKILL.md read order).** Dropped `components.md` from the explicit read order in `skills/kk-design-system/SKILL.md § Hard rules § 1`; read order now four files (`manifesto.md → tokens.json → voice.md → pipeline.md`). §Reference files section keeps a note that `components.md` is a stub pointing at `manifesto.md § Components`.
6. **Audit Q6 (signoff example prescriptive vs loose).** Loosened to "two or four valid" per user ruling 3.
7. **Audit Q7 (1.3.0 vs 2.0.0).** 1.3.0 path chosen. `components.md` stays as stub this release. Machine version in `package.json` / `plugin.json` not bumped in this commit — Phase 4 maintainer ship owns that.

Judgement call worth flagging: the frontmatter `description` on `kk-role-consistency-ds/SKILL.md` still says "paired with components.md and tokens.json". Changing the description is a major-semver action per the maintainer rule. The stub keeps the description factually accurate today. Phase 4 (or the v2.0.0 follow-up) rewrites it to "paired with manifesto.md § Components and tokens.json" as part of the stub removal.

Line count of `components.md` stub: 39 lines. Previous: 274. Retirement path clean.

## Hand-off

Phase 3 design engineer: rewrites `index.html` structural shell. Every migrated block deletes from index; shell keeps the six pointer cards + signoff + inspector + FAB affordances. Target under 400 lines.

Phase 4 maintainer: bumps `package.json` + `plugin.json` to `1.3.0`, tags `v1.3.0`, pushes main + tag.
