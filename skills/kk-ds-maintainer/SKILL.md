---
name: kk-ds-maintainer
description: Maintainer mode for editing the KK Agentic Design System repo itself — adding, removing, renaming components, tokens, classes, or manifesto rules. Use ONLY inside the ui-kit prototype repo when editing the kit itself (vars.css, style.css, index.html doc sections, skills/, fonts/). Do NOT use when consuming the kit in another product — that is the kk-design-system skill. This skill overrides the consumer skill's "never invent" clause with the evolve-a-rule protocol and enforces the bundle that must ship with every kit change.
metadata:
  version: 0.1.0
  parent: kk-design-system
  scope: maintainer-only
---

# Maintainer

You are inside the KK Agentic Design System repo. This is the source of truth for every consumer. Everything the consumer skill forbids inventing is invented here. That permission is narrow and comes with a protocol — follow it exactly or the kit drifts.

## When this skill applies

- Editing `vars.css`, `style.css`, `fonts/`, `index.html` (the manifesto doc), or any file under `skills/`.
- Adding, removing, renaming components, tokens, utility classes, CSS selectors, or manifesto rules.
- Bumping versions, editing `CHANGELOG.md`, changing `.claude-plugin/plugin.json`.
- Refactoring the kit's internals.

## When this skill does NOT apply

- Building a product that consumes `@kk/design-system`. That job belongs to `kk-design-system`.
- Editing a consumer project that happens to live in a subfolder of this repo. If the edit does not change the kit, treat it as a consumer task.

## Inherited rules — still binding

Read before changing anything:

- `../kk-design-system/manifesto.md` — principles apply to every addition.
- `../kk-design-system/voice.md` — every line of prose, every label, every commit message must pass the AI-tells inventory. Maintainer changes get the same voice scrutiny as consumer output.
- `../kk-design-system/pipeline.md` — stages 1 through 5 still run. Maintainer work is allowed to expand the inventory during stage 2; it is never allowed to skip stages.
- `../kk-design-system/components.md` and `../kk-design-system/tokens.json` — the artifacts you are about to edit. Read both before changing either.

## The evolve protocol — mandatory for every addition, removal, or rename

From `#evolve` in `index.html`. Walk it in order. No shortcuts.

### 1. State the conflict
Say it out loud, in the PR description or the conversation. "The kit has no way to express X." Or: "Rule Y in the manifesto blocks Z, and Z is required for the Wealthy strategy-doc pattern." Never a silent override.

### 2. Decide which side is right — for the product today
Not for the version of the kit that wrote the rule. The rule might be wrong. The code might be wrong. Pick one. Defend it in one sentence.

### 3. Update the rule and the code in the same PR
The manifesto and the CSS move together. `SKILL.md` and `components.md` move together. Never one without the other.

### 4. Log it
Either in `#backlog` of `index.html` (unresolved, visible) or in `CHANGELOG.md` (shipping). Hidden issues are worse than visible ones.

### 5. Sign
No anonymous kit changes. PR author, commit author, and the doc's signoff block all name the human.

## The bundle — every kit change moves these files together

Any edit that touches what consumers see must ship with this set. If one is missing, the PR is not ready.

1. **The code** — `vars.css`, `style.css`, or the skill file you're changing.
2. **The doc** — `index.html`, whichever section owns the rule (manifesto foundations, component page, voice rules, whichever applies).
3. **The skill reference files** — `skills/kk-design-system/tokens.json`, `components.md`, `voice.md`, `manifesto.md`. These are what the agent reads. Drift between CSS and skill reference files is the worst failure mode, because the agent trusts the skill files.
4. **`CHANGELOG.md`** — one entry, in the format: Added / Removed / Moved.
5. **`package.json`** + **`.claude-plugin/plugin.json`** version bump, in lockstep. Semver:
   - **Major** — removed a component, renamed a class, changed a skill's `description` trigger phrase, broke a consumer's selector.
   - **Minor** — added a component, added a token, added a skill recipe, additive only.
   - **Patch** — fix, typo, clarification, non-breaking internal refactor.
6. **Skill SKILL.md** — if the change affects agent behavior, update the skill's hard rules too.

## Supervision still runs

After any visual or component change, invoke `kk-ds-supervisor` against the affected demo or doc section. The supervisor does not know you are the maintainer — that's the point. If it rejects your addition, that means the new thing does not yet justify itself. Return to step 2 of evolve and decide whether to reshape it or drop it.

## What you do differently from the consumer skill

| Task | Consumer skill | Maintainer skill |
|---|---|---|
| See a need for a new component | Reject. Compose from existing. | Run evolve. May add. |
| See an off-grid value | Reject. | Reject, or add a new token via evolve. |
| Change a voice rule | Not applicable. | Allowed via evolve. Update `voice.md` + `#ai-tells` section + any voice examples in the same PR. |
| Edit a skill's trigger `description` | Forbidden. | Allowed — but always treat as a **major** semver bump. The agent may stop invoking the skill on the same prompts after a description change. |
| Delete a component | Not applicable. | Allowed via evolve. Must check `git grep` across the consumer repos you know about before removing. |

## Hidden failure modes — watch for these

- **Drift between CSS and skill reference files.** The agent reads `tokens.json` and `components.md`, not the raw CSS. Add a token to `vars.css` but forget `tokens.json`, and the agent will keep rejecting the new token as off-grid even after it ships to consumers.
- **Doc change without skill change.** Update `#ai-tells` in `index.html` but not `voice.md`, and humans reading the doc see the new rule while agents do not. The two surfaces diverge silently.
- **Version bump without CHANGELOG.** The GitHub release body reads from `CHANGELOG.md`. Silent bumps ship empty release notes and Renovate PRs with no context.
- **Local edits inside a consumer's `node_modules` or git submodule.** Never. Land changes here, tag, release.
- **Renaming without a deprecation path.** If a class or token is renamed, the old name either stays as an alias for one minor version, or the bump is major. Never silently drop a name consumers depend on.

## Voice — for maintainer output

Same rules as everywhere else. Commit messages, PR descriptions, changelogs, code comments — all pass `voice.md`. No AI tells. No em-dashes in headlines. No muted defaults. No moralizing closers. Sentence case.

## When in doubt

Ask. The user's standing rule: "I am a human, better ask than assume." A manifesto edit is always worth confirming before drafting. Maintainer decisions are harder to undo than consumer ones — one change here ripples to every project that installs the package.
