---
session: 2026-04-24-content-architecture
stage: 3b
role: designer
character: Susan Kare — state-thoughtful, pixel-honest
input: 02-design-director.md §Pattern blocks §4. protocols + 01-analyst.md §Per-document jobstories §protocols.md + 03a-fresh-eyes-pre-protocols.md + manifesto.md §Ship discipline §Bundle rule §Semver §Protocols §Evolve §Backlog §Ideation + voice.md
output: full draft prose for pipeline/protocols.md, checklist-shaped, maintainer-only, 14 pre-questions answered verbatim
gate: pending — hand to stage 3c fresh-eyes post-designer
---

Stage 3b drafts the protocols book from the fresh-eyes question list. Pre-commit gate shape, not essay. Maintainer opens this file top-to-bottom before a kit change leaves disk; every bullet is checkable.

## Jobstory under test

When shipping, evolving, or logging an exception, we want bundle rules + semver + evolve protocol + backlog + ideation in one doc, so every kit change follows the same discipline.

## Pattern block scope

Pattern block 4 of six — `pipeline/protocols.md`. New file. Migrates §Ship discipline, §Bundle rule, §Semver, §Evolve protocol, §Backlog, §Ideation out of `manifesto.md`. No new rules. No new components.

## Pre-question answers

Every numbered question 1–14 from `03a-fresh-eyes-pre-protocols.md` answered below, verbatim question then answer.

**1. Numbered checklist shape — top-to-bottom readable in thirty seconds?**

Yes. Six sections, each a numbered list or scannable inventory. Ship discipline carries six checkable items. Bundle rule carries seven. Semver carries four push steps plus three axis rules. Evolve protocol carries five steps. Backlog + Ideation carry list entries, not prose. Opening hero + one-paragraph framing sit above. Total body under ninety lines.

**2. Landing mid-task — which section owns my current action?**

Section order maps to the commit arc. Pre-commit sanity → §Ship discipline. About to stage files → §Bundle rule. About to tag → §Semver. Hit a conflict between code and canon → §Evolve protocol. Know something is wrong and cannot fix now → §Backlog. Tempted to propose a new idea → §Ideation first, check whether it was already considered. Reader following the section order follows the commit arc.

**3. Bundle-rule file list walkable without scroll?**

Seven items, numbered list, one line each, ~90 lines above the list. Fits one laptop screen. No scroll to walk from item 1 to item 7.

**4. Semver four-step sequence walkable without git-docs detour?**

Each of the four steps carries the exact command verbatim — `git commit`, `git tag -a vX.Y.Z -m "..."`, `git push origin main`, `git push origin vX.Y.Z`. Reader copies from the book, not from git docs. Annotated-tag flag called out explicitly.

**5. Evolve protocol — decision path or principles-only?**

Five-step sequence, each step is an action verb. Step 1 names the conflict out loud. Step 2 decides which side is right today. Step 3 updates both in one PR. Step 4 logs to §Backlog if blocked. Step 5 signs the change. No principles-only prose — every step produces an artefact.

**6. Backlog scannable as list, not embedded prose?**

Yes. §Backlog is a numbered list of parked items. When empty, one sentence: "Empty right now. Last audit cleared the list." Never prose paragraphs. Ideation same shape — one entry per considered-but-not-built idea, bold title, six bulleted fields under each (Goal, Options, Problem, Parked, Revisit if).

**7. Framing as maintainer-only visible at 0.2s?**

Opening paragraph, first sentence: "This book is for the human editing the kit itself. Product consumers who use the kit in their app skip this — nothing here applies to you." No burying. First line under the hero declares the audience.

**8. Reading flow — landed from what, going to what?**

Landed from: finished a kit change locally, about to commit. Going to: hit every protocol step, then push commit + push tag, session closes with a clean tree on a pushed tag. Stated plainly in the opening paragraph.

**9. Reference vs read-through — which?**

Both modes supported. First read is top-to-bottom onboarding (ten minutes). Subsequent opens are reference — maintainer jumps to the section owning the current action. Section titles match the action names so the TOC works as a jump menu.

**10. Bundle-rule file list canonical or extensible?**

Canonical today. Seven file types. Extensible via the evolve protocol — a new file type joins the bundle only after §Evolve runs (state the conflict, decide, update both in one PR, log, sign). No silent additions.

**11. Semver major/minor/patch — renames mapped to axis?**

Yes. §Semver carries worked examples per axis. The `.doc` → `.book` rename this session is the major example, called out verbatim: class rename that breaks every consumer selector → major bump. Minor example: new token added. Patch example: typo fix. Reader maps their change to an axis before touching `package.json`.

**12. Evolve five-step — code and doc in different PRs, what gives?**

Step 3 reads "update both in the same PR" by default. Carve-out: if the code and doc genuinely cannot land together (separate repos, separate permissions, separate release cadences), log the split to §Backlog at step 4 and ship a paired PR pointer in both commits. The rule holds: drift between code and canon is the failure mode; two linked PRs landing within one business day counts as "together" for practical purposes.

**13. Backlog vs Ideation — crisp split?**

Crisp. §Backlog = the prototype does this wrong on purpose and will fix it; every entry ends with a fix target. §Ideation = considered this idea, chose not to build; every entry ends with a "Parked" line and a "Revisit if" trigger. Entry shape differs: Backlog rows are short (title + wrongness + fix target); Ideation rows are long (title + goal + options considered + problem + parked + revisit).

**14. Checklist-shaped or essay-shaped at 0.2s?**

Checklist at 0.2s. Numbered lists dominate every section. No paragraphs over three sentences except the opening framing. Ship discipline and Bundle rule render as pre-ship gates — every bullet is an action the maintainer either did or did not do.

## States

One state — static reference text inside a `.book` wrapper. No interactive state, no toggles, no runtime switches. The kit renders the file; the maintainer reads it. Scroll-spy TOC in the sidebar shows position. That is the full state model.

## Interaction variants

None. The book is read. Internal anchors resolve inside the file (heading ids via kit nav generation). Deep-link targets use standard markdown header slugs — `#ship-discipline`, `#bundle-rule`, `#semver`, `#evolve-protocol`, `#backlog`, `#ideation`.

## Edge cases

- **Empty backlog.** One sentence: "Empty right now. Last audit cleared the list." Never an empty bulleted list — an empty list reads as broken markdown. Prose placeholder reads as intentional.
- **Empty ideation.** Same shape, but current state ships with one entry migrated from manifesto (auto-sync inspector comments to Claude).
- **Mid-migration conflict.** If code lands in one commit and canon in the next, §Evolve step 3's "same PR" reads as aspirational. Step 4 logs the split to §Backlog. Maintainer closes the backlog item when both sides sync.
- **Patch release with no consumer-visible change.** §Semver still requires the four push steps. Tag is the ship artefact; skipping the tag is vapourware regardless of scope.
- **Renamed class that breaks one consumer but not the kit itself.** Major bump. The axis is consumer-facing breaks, not kit-internal impact.

## Example content

Full draft prose for `pipeline/protocols.md` below. Renders inside `.book` wrapper at the consumer end. Heading offsets resolve via `data-md-heading-offset="0"` — file owns its own hierarchy.

````markdown
# Protocols

Maintainer-facing rules for kit evolution and ship. Pre-commit gate, pre-tag gate, conflict-resolution walk, parked-issue log, considered-but-not-built log.

Jobstory: when shipping, evolving, or logging an exception, we want bundle rules + semver + evolve protocol + backlog + ideation in one doc, so every kit change follows the same discipline.

This book is for the human editing the kit itself. Product consumers who use the kit inside an app skip this — nothing here applies to consuming surfaces. Reader landed here from a finished kit change on disk; reader leaves with a pushed commit plus a pushed annotated tag. Open top-to-bottom once for onboarding; on subsequent ship cycles, jump to the section owning the current action.

## Ship discipline

Every browser-affecting change ends with a verified console and screenshot in the self-doc. Reading the code is not enough. Walk the list before staging.

1. Screenshot the rendered page before and after the change. The diff reads in one glance.
2. Open the devtools console. Zero errors, zero warnings. Capture the console state. Paste into the phase's self-doc.
3. Click every interactive affordance on the page once. Confirm no silent breakage — dead clicks, lost scroll-spy, broken nav anchors, iframe previews stuck.
4. For the renderer specifically: open the smoke-test page covering every supported markdown construct. Render-vs-source side by side. Console clean.
5. Any regression found post-ship routes back to the phase owner, not a hotfix patch.
6. Before shipping a markdown-rendered page, grep the shell for every claim the rendered content also carries. Pointer-card copy, nav labels, signoff stats that restate facts from the rendered body fail the one-home rule. Remove shell-side claims or migrate them to the rendered source.

## Bundle rule

Every kit change moves a fixed set of files together. If one is missing, the PR is not ready. Walk the list before staging.

1. The code — `vars.css`, `style.css`, `js/kit.js`, `js/md.js`, or the skill file being changed.
2. The doc — `index.html` plus the markdown under `skills/kk-design-system/` (`manifesto.md`, `canon/*.md`, `pipeline/*.md`) — whichever section owns the rule.
3. The skill reference files — `tokens.json`, `canon/voice.md`, `manifesto.md`. These are what the agent reads. Drift between CSS and skill reference files is the worst failure mode, because the agent trusts the skill files.
4. `CHANGELOG.md` — one entry, in the format Added / Removed / Moved.
5. `package.json` plus `.claude-plugin/plugin.json` — version bumps in lockstep. Semver axis picked per the next section.
6. `SKILL.md` — if the change affects agent behaviour, update the skill's hard rules too.
7. Integration doc at `docs/integration/<component>.md` — required when the change touches a component's consumer-facing API.

Adding an eighth file type runs the evolve protocol first. No silent extensions.

## Semver

A version bump without a pushed tag is vapourware. Consumers cannot see work that lives only in the maintainer's working tree.

### Axes

- **Major** — removed a component, renamed a class, changed a skill's `description` trigger phrase, broke a consumer's selector. Worked example: the `.doc` → `.book` wrapper rename this session renames every `.doc__*` class across CSS, JS, HTML, markdown snippets. Every consumer selector targeting `.doc` breaks. Major bump.
- **Minor** — added a component, added a token, added a skill recipe. Additive only. Consumers on the previous minor keep working.
- **Patch** — fix, typo, clarification, non-breaking internal refactor.

The axis lands on consumer-facing impact, not kit-internal scope. A one-line CSS change that renames a class is major. A 400-line internal refactor that preserves every public selector is patch.

### Push steps

Every kit change ends with four steps, in order. Confirm with the human before step 3 — push is shared state and cannot be undone quickly.

1. **Commit.** Stage explicit paths. Commit message: `UI kit X.Y.Z: short description`. Body names what changed using the CHANGELOG's Added / Removed / Moved breakdown.
2. **Tag.** `git tag -a vX.Y.Z -m "UI kit X.Y.Z — <one-line>"`. Annotated tags only.
3. **Push main.** `git push origin main`. Consumer repos pull from origin, not the maintainer's disk.
4. **Push the tag.** `git push origin vX.Y.Z`. Tags do not auto-push with commits.

Close every session with `git status -sb` showing a clean tree on a pushed tag, or flag what is still pending.

## Evolve protocol

Rules in the kit canon are canonical. Code that disagrees with canon is wrong unless canon is. Either the rule updates or the code does — never both separately, never one silently.

On conflict, walk the five steps in order.

1. State the conflict out loud. Name the rule, name the code. No silent overrides.
2. Decide which side is right for the product today, not for the version that wrote the rule.
3. Update both in the same PR. The rule moves in the canon markdown; the code moves in the kit. Carve-out: if code and doc genuinely cannot land in one PR (separate repos, separate release cadences), ship paired PRs within one business day and log the split at step 4.
4. Log the conflict in §Backlog until both sides ship.
5. Sign the change.

Unresolved issues live in §Backlog openly. Hidden issues are worse than visible ones.

## Backlog

Things the prototype does wrong on purpose, unfixed. No priorities, no owners yet. When one lands, move it out of the list and into the section that now describes the fixed behaviour.

Empty right now. Last audit cleared the list.

## Ideation

Ideas the project considered but did not build. Kept here so the reasoning survives and future sessions do not re-propose them without knowing the history.

### Auto-sync inspector comments to Claude

- **Goal.** Let the maintainer leave comments in the inspector; have Claude pick them up across sessions and improve the doc automatically.
- **Option A.** File System Access API. Browser writes threads to `comments.json`. No server, but Chromium-only and requires a local HTTP server (not `file://`). First commit needs a file-picker click.
- **Option B.** Local Node server plus SQLite plus MCP. Browser posts each comment; Claude reads and resolves through an MCP tool. Works everywhere; needs a running process.
- **Option C.** Manual export button that downloads a file. Simple. Extra click each time.
- **Round-trip problem.** When Claude marks a thread resolved, the browser does not know. Next write overwrites the resolution unless the browser reads the file first, hides resolved threads on load, and merges state on write. Doable, not cheap.
- **Parked.** Current volume of review feedback does not justify the plumbing. Writing notes directly into the doc or conversation works for now.
- **Revisit if.** Reviews start coming in across many sessions and manual capture gets lossy. Then build Option B — server plus SQLite plus MCP — as the path that covers all browsers and handles the round-trip cleanly.

## Signoff

Last edit: 2026-04-24. Maintainer: Konstantin Konstantinopolskii (kk.consulting).
````

## UI copy drafts

Every user-facing string in the rendered book, audit-ready against voice.md. Strings below render verbatim in `pipeline/protocols.md`.

1. Hero title: `Protocols`
2. Hero subtitle paragraph: `Maintainer-facing rules for kit evolution and ship. Pre-commit gate, pre-tag gate, conflict-resolution walk, parked-issue log, considered-but-not-built log.`
3. Jobstory line: `Jobstory: when shipping, evolving, or logging an exception, we want bundle rules + semver + evolve protocol + backlog + ideation in one doc, so every kit change follows the same discipline.`
4. Maintainer-only framing: `This book is for the human editing the kit itself. Product consumers who use the kit inside an app skip this — nothing here applies to consuming surfaces.`
5. Ship discipline hero: `Ship discipline`
6. Ship discipline intro: `Every browser-affecting change ends with a verified console and screenshot in the self-doc. Reading the code is not enough. Walk the list before staging.`
7. Bundle rule hero: `Bundle rule`
8. Bundle rule intro: `Every kit change moves a fixed set of files together. If one is missing, the PR is not ready. Walk the list before staging.`
9. Bundle extension note: `Adding an eighth file type runs the evolve protocol first. No silent extensions.`
10. Semver hero: `Semver`
11. Semver intro: `A version bump without a pushed tag is vapourware. Consumers cannot see work that lives only in the maintainer's working tree.`
12. Semver axis sub-head: `Axes`
13. Semver push sub-head: `Push steps`
14. Semver closer: `Close every session with \`git status -sb\` showing a clean tree on a pushed tag, or flag what is still pending.`
15. Evolve hero: `Evolve protocol`
16. Evolve intro: `Rules in the kit canon are canonical. Code that disagrees with canon is wrong unless canon is. Either the rule updates or the code does — never both separately, never one silently.`
17. Evolve closer: `Unresolved issues live in §Backlog openly. Hidden issues are worse than visible ones.`
18. Backlog hero: `Backlog`
19. Backlog intro: `Things the prototype does wrong on purpose, unfixed. No priorities, no owners yet. When one lands, move it out of the list and into the section that now describes the fixed behaviour.`
20. Backlog empty state: `Empty right now. Last audit cleared the list.`
21. Ideation hero: `Ideation`
22. Ideation intro: `Ideas the project considered but did not build. Kept here so the reasoning survives and future sessions do not re-propose them without knowing the history.`
23. Ideation entry title: `Auto-sync inspector comments to Claude`
24. Signoff line: `Last edit: 2026-04-24. Maintainer: Konstantin Konstantinopolskii (kk.consulting).`

Voice audit self-pass:
- No "I", no first-person singular. "We" in jobstory; subject-less sentences elsewhere.
- Em-dashes scrubbed from every headline. Present only in body where a period cannot do the same work (Axes bullets, Evolve step 3 carve-out).
- Sentence case in every heading.
- No AI-tells inventory hits: no "vibrant / pivotal / seamless", no "−ing filler", no "not just X, but Y", no rule-of-three padding, no moralizing closers, no weasel attribution.
- Body text and structural markers in black, Medium 500. No muted default. Signoff's timestamp line is metadata — stays in body weight, body color per voice.md §Muted text.

## Kit inventory check

Every class and token used in the book below appears in the current kit. No inventions.

- `.book` wrapper — per direction doc, renamed from `.doc` in pattern block 6.
- `t-hero`, `t-display`, `t-title`, `t-body`, `t-caption`, `t-micro` — typography utility classes, canonical.
- `t-list` on `<ol>` / `<ul>` — canonical list class, kit inventory.
- `t-mono` for inline `git` commands — canonical.
- No `.doc__*` classes anywhere. Every wrapper reference reads `.book`.
- No new tokens. No new components. No new CSS.
- No Lebedev attribution. The book does not reference typography rhythm at all — out of scope for protocols.

Inventory check: **pass**.

## Gate

Pending. Hand to stage 3c (fresh-eyes post-designer mode, Jobs character) for the 14-question validation walk.

## Hand-off

`kk-role-fresh-eyes-jobstory` in post-designer mode for pattern block 4 — protocols. Input: this file plus `03a-fresh-eyes-pre-protocols.md`. Expected output: per-question pass / fail with evidence. Unanswered questions return to the designer for another pass.
