# Protocols

Maintainer-facing rules for kit evolution and ship. Pre-commit gate, pre-tag gate, conflict-resolution walk, parked-issue log, considered-but-not-built log.

Jobstory: when shipping, evolving, or logging an exception, we want bundle rules + semver + evolve protocol + backlog + ideation in one doc, so every kit change follows the same discipline.

This book is for the human editing the kit itself. Product consumers who use the kit inside an app skip this. Nothing here applies to consuming surfaces. Reader landed here from a finished kit change on disk; reader leaves with a pushed commit plus a pushed annotated tag. Open top-to-bottom once for onboarding; on subsequent ship cycles, jump to the section owning the current action.

## Ship discipline

Every browser-affecting change ends with a verified console and screenshot in the self-doc. Reading the code is not enough. Walk the list before staging.

1. Screenshot the rendered page before and after the change. The diff reads in one glance.
2. Open the devtools console. Zero errors, zero warnings. Capture the console state. Paste into the phase's self-doc.
3. Click every interactive affordance on the page once. Confirm no silent breakage. Watch for dead clicks, lost scroll-spy, broken nav anchors, iframe previews stuck.
4. For the renderer specifically: open the smoke-test page covering every supported markdown construct. Render-vs-source side by side. Console clean.
5. Any regression found post-ship routes back to the phase owner, not a hotfix patch.
6. Before shipping a markdown-rendered page, grep the shell for every claim the rendered content also carries. Pointer-card copy, nav labels, signoff stats that restate facts from the rendered body fail the one-home rule. Remove shell-side claims or migrate them to the rendered source.

## Bundle rule

Every kit change moves a fixed set of files together. If one is missing, the PR is not ready. Walk the list before staging.

1. The code. `vars.css`, `style.css`, `js/kit.js`, `js/md.js`, or the skill file being changed.
2. The doc. `index.html` plus the markdown under `skills/kk-design-system/` (`manifesto.md`, `canon/*.md`, `pipeline/*.md`), whichever section owns the rule.
3. The skill reference files. `tokens.json`, `canon/voice.md`, `manifesto.md`. These are what the agent reads. Drift between CSS and skill reference files is the worst failure mode, because the agent trusts the skill files.
4. `CHANGELOG.md`. One entry, in the format Added / Removed / Moved.
5. `package.json` plus `.claude-plugin/plugin.json`. Version bumps in lockstep. Semver axis picked per the next section.
6. `SKILL.md`. If the change affects agent behaviour, update the skill's hard rules too.
7. Integration doc at `docs/integration/<component>.md`. Required when the change touches a component's consumer-facing API.

Adding an eighth file type runs the evolve protocol first. No silent extensions.

## Semver

A version bump without a pushed tag is vapourware. Consumers cannot see work that lives only in the maintainer's working tree.

### Axes

- **Major.** Removed a component, renamed a class, changed a skill's `description` trigger phrase, broke a consumer's selector. Worked example: the v1.3.0 wrapper rename renamed every legacy `.doc` / `.doc__*` class across CSS, JS, HTML, and markdown snippets to `.book` / `.book__*`. Every consumer selector targeting the old wrapper breaks. Major bump.
- **Minor.** Added a component, added a token, added a skill recipe. Additive only. Consumers on the previous minor keep working.
- **Patch.** Fix, typo, clarification, non-breaking internal refactor.

The axis lands on consumer-facing impact, not kit-internal scope. A one-line CSS change that renames a class is major. A 400-line internal refactor that preserves every public selector is patch.

### Push steps

Every kit change ends with four steps, in order. Confirm with the human before step 3. Push is shared state and cannot be undone quickly.

1. **Commit.** Stage explicit paths. Commit message: `UI kit X.Y.Z: short description`. Body names what changed using the CHANGELOG's Added / Removed / Moved breakdown.
2. **Tag.** `git tag -a vX.Y.Z -m "UI kit X.Y.Z: <one-line>"`. Annotated tags only.
3. **Push main.** `git push origin main`. Consumer repos pull from origin, not the maintainer's disk.
4. **Push the tag.** `git push origin vX.Y.Z`. Tags do not auto-push with commits.

Close every session with `git status -sb` showing a clean tree on a pushed tag, or flag what is still pending.

## Evolve protocol

Rules in the kit canon are canonical. Code that disagrees with canon is wrong unless canon is. Either the rule updates or the code does. Never both separately, never one silently.

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
- **Revisit if.** Reviews start coming in across many sessions and manual capture gets lossy. Then build Option B (server plus SQLite plus MCP) as the path that covers all browsers and handles the round-trip cleanly.

## Signoff

<div class="book__signoff">
  <div class="book__signoff-stats">
    <div class="stat t-caption">
      <div><span class="t-caption--bold">5</span> protocol sections.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">7</span> bundle files per ship.</div>
    </div>
  </div>
  <div class="book__signoff-signature">
    <p class="t-caption">
      Signed by <span class="t-caption--bold">Konstantin Konstantinopolskii,</span><br />
      kit maintainer at <span class="t-caption--bold">kk.consulting</span><br />
      <span class="t-muted">2026-04-25, content-architecture session.</span>
    </p>
    <img class="book__signoff-signature-img" src="../../../signature.svg" alt="Signature" />
  </div>
</div>
