---
session: 2026-04-23-fundamental
stage: post-pipeline
role: maintainer
input: index.html (pre-slim: 3304 lines)
output: index.html (post-slim: 765 lines), cut inventory
gate: no gate (maintainer self-doc)
---

# Phase 3 follow-up — slim index.html

Patterns-library initiative §Phase 3 §Follow-up. With `demos/fundamental--accepted/index.html` and `patterns.html` carrying the kit's inventory (atoms, elements, patterns, component demos, state galleries), `index.html` no longer needs to be a kit catalogue. This pass strips the catalogue so the canon doc reads as a focused manifesto: philosophy, foundations-why, ai-tells inventory, evolve protocol, backlog, ideation.

## Sections cut

- §Components part — card, field, button, tag, switch, 3D card stack, navigation, comment, signoff. Nine subsections, each with a spec card plus a live demo. Component contracts now live in `skills/kk-design-system/components.md`; plain-composition examples live in `demos/fundamental--accepted/index.html`.
- §Patterns part — three columns, scrolling, states, forms, narrow. Shell patterns documented here with spec cards + behavioural detail. Now carried as sliced patterns in `patterns.html` (three-column shell, sidebar nav, etc.) plus plain composition in fundamental. Narrow breakpoints + reveal timing are also present in the fundamental demo as used behaviour.
- §Voice — Tone of voice + Text as interface. Both duplicated `voice.md §Shape` and `voice.md §Labels and interface text` line for line. §No AI tells retained here as the kit's public-facing inventory.
- §Pipeline part — Why a pipeline, Think, Hand-off, Build, Meta retro, Documentation contract, Revolutionary protocol. Stale canon: described an old ten-stage pipeline-v2 with role names (`kk-role-designer-conservative`, `kk-role-designer-ux`, `kk-role-designer-revolutionary`) that pipeline-v3 retired. `pipeline.md` carries the current eight-stage, eleven-role spec.
- §Practice — Component index, How to reuse, Don't invent, How to add, What to think about. "What the kit contains" + quick-reference checklist. Inventory lives in `components.md` + `patterns.html`; the add-new process is the `kk-ds-maintainer` evolve protocol. §How to evolve a rule retained.
- §Distribution part — Skill for agents, Install and update, Update flow, Guards and checks. Stale (mentions "three skills" when the kit now ships eleven role skills + maintainer + consumer). The bundle rule + ship protocol live in `skills/kk-ds-maintainer/SKILL.md`. Install flow lives in the root README.
- §Foundations inventory — color swatch table, type scale / weights / lists / content blocks / inline marks tables, space micro / standard / macro tables, radii table, motion easings / durations tables. Philosophy paragraphs kept; token inventories now in the fundamental demo + `tokens.json`.
- Inspector demo content — Tweak / Templates / Share interactive cards and two pre-seeded comment threads (~300 lines). Pure product demo. Replaced with an empty `comment-stack` so the selection-to-draft flow the manifesto describes still works live in the doc.
- Sidebar nav groups pointing at removed sections — Components, Patterns, Pipeline, Distribution. Sidebar Voice group trimmed to one link (ai-tells). Sidebar Practice group trimmed to one link (evolve). A new Surfaces group added with links to `patterns.html` + fundamental.

## Sections kept

Philosophy:
- §philosophy, §why, §jobs, §ttv — full. Meanings part intact.
- §signal, §expected, §eighty-twenty, §chunking, §contrast, §ipad — full. Principles part intact.

Foundations-why:
- §material, §color, §type, §space, §radii, §motion — prose only. Tables cut. Each section now carries the WHY (why nine tokens, why Commissioner, why 4px grid, why two radii, why 200ms ease-out).

Voice:
- §ai-tells — full. The three cards (words / verbs, sentence shapes, structures / signals) stay verbatim.

Protocols:
- §evolve — full. The kit's self-evolution contract.

Audit:
- §backlog — full. Kit's visible-issues register.
- §ideation — full. Parked ideas with reasoning so future sessions don't re-propose.

Shell:
- Sidebar (brand + footer + trimmed nav groups), doc hero + intro + signoff, empty inspector column for layout + live selection-to-draft flow, FABs, kit.js bootstrap.

## Post-slim line count

- Pre-slim: **3304 lines**
- Post-slim: **765 lines**
- Reduction: **2539 lines (77%)**

## Judgement calls

- §Distribution: arguably a WHY-the-kit-ships doc. Cut because the concrete content was stale (wrong skill count, outdated role list, references to `#supervision` / `#iteration` anchors that never existed in the file). Consumer-facing install flow belongs in README; agent-facing bundle rules live in `kk-ds-maintainer/SKILL.md`. If KK wants a public ship narrative, better to write it fresh than to resurrect this.
- Tone of voice + Text as interface: kept voice.md as the single source and dropped both. One-sentence case for keeping tone: humans read the manifesto page directly. Countervail: humans can read `voice.md` just as easily, and the page already links the fundamental + patterns registry. If the manifesto should carry a short voice primer visible to humans, restore §tone as a 10-row spec card.
- Inspector shell: kept an empty `comment-stack` rather than removing the inspector column entirely, because the three-column grid in `style.css` always renders three tracks, and because the selection-to-draft flow is a kit behaviour the manifesto's copy references. If the empty column reads as a defect, the alternative is a CSS branch making `.app:not(:has(.comment-stack > *))` collapse to two columns — out of scope for a slim pass.
- Broken anchors: the pre-slim file carried `href="#supervision"` and `href="#iteration"` pointing at ids that never existed. Both lived inside §Distribution and §Guards sections that this pass removed, so the dangling links went with them.

## Open question for KK

The §ai-tells inventory is the only Voice content left on the manifesto page. It is already in `voice.md §No AI tells` verbatim. Should it stay on the page for human readability, or should the manifesto link to `voice.md` and let the rules live in one place? Arguments either way:
- Keep inline: the inventory is the kit's most-shown public artefact; humans reading the manifesto expect to see it without opening a skill file.
- Move out: double-source drift (the `feedback_respect_manifesto` rule means both surfaces must stay in sync; a cut would let `voice.md` own the list unambiguously).

No change made pending KK's call.
