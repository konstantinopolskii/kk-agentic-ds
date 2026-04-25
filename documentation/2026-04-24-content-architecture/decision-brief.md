# Decision brief — what KK needs to choose before v1.3.0 ships

**For the helper agent in a fresh chat window.** This file is the full briefing. Read this end-to-end, then help KK think through five decisions. Do not run pipeline stages, do not edit kit files, do not make changes. Your job is to explain in plainer language if KK asks, look up details by reading the linked files in this folder, and help him land on five clear answers. When done, KK takes those answers back to the main session.

If KK asks for more detail on any cluster, the named source files below carry the full evidence. Do not try to reconstruct the main session conversation — read the artifacts in this folder.

---

## The situation in three sentences

The pipeline rebuilt the kit's content architecture — manifesto thinned, foundations + components + forbidden moved into `canon/components.md`, patterns moved into `canon/patterns.md`, ship/bundle/semver/evolve/backlog/ideation moved into `pipeline/protocols.md`, root `patterns.html` deleted, `index.html` rewritten as a three-column hallway shell, `.doc` wrapper renamed to `.book`. The build is on origin at commit `7b99537`. Stage 7 (the strict meta-reviewer) said FAIL — three of six rubric items failed. Before tag `v1.3.0` ships, KK has to decide what to fix and what to accept.

---

## The four clusters of problems

### Cluster A — Old kit problems that were already there

These are bugs in `style.css` and `vars.css` that existed before this session even started. The pipeline noticed them but they are not this session's scope.

What's broken (21 flags total):

- **Drop shadows on a couple of components.** Drop shadows are forbidden by the manifesto. Two cases — `.fab` (the floating action button at narrow widths) and `.comment__menu-popover` (the kebab menu inside a comment thread) — both ship with subtle shadows.
- **Blur effect in keyframe animation.** The `inspector-card-focus` keyframes use a blur. Blur is forbidden.
- **Fifth radius value.** The kit allows four corner radii (12, 16, 24, 9999 px). The `.deck-card` component uses 20px — a fifth, off-spec value.
- **Off-grid spacing.** Spacing must be multiples of 4 px. Some places use 18 px, 6 px, 3 px, 2 px, 14 px, 21 px, 70 px, 1 px borders, 3 px underline offsets — none of these are valid.
- **Off-token weight.** The `.t-mono` utility class uses font-weight 600. The kit only ships 400, 500, and 700 weights.
- **ALL CAPS via text-transform.** The `.tag--inline` class transforms its content to uppercase. ALL CAPS is forbidden.
- **Off-palette color.** `#cccccc` appears as a hard-coded color value somewhere — not a kit token.
- **Inline 48px font-size** at narrow viewport. Inline font-size is forbidden; everything goes through utility classes.
- **300ms transition.** The kit's motion canon is 200ms default. 300ms is off-token.

**Why this is out of scope.** None of these were introduced by this session. The session was content architecture — moving prose around, renaming `.doc` to `.book`, restructuring docs. The CSS bugs above are separate kit-cleanup work.

**Choice:** park Cluster A for a future kit-cleanup session — yes/no?

If KK wants to deal with this now, the work runs as a separate stage 5 pass focused only on `style.css` + `vars.css`, then re-runs 6b. It's not a small job — 21 individual fixes, each potentially with downstream visual impact. Estimate: a full session by itself.

Source: `06b-consistency-ds.md` carries all evidence with file:line cites.

---

### Cluster B — The forbidden list is incomplete

`canon/components.md` ends with a "Forbidden" section. It lists every CSS class prefix the kit allows. Anything starting with a prefix not on that list is forbidden.

Right now the list names 16 prefixes. The kit actually ships 11 more prefixes the list doesn't mention:

`toc-`, `fab`, `tier`, `deck`, `highlight`, `figure`, `aside`, `quote`, `divider`, `avatar`, `checkbox`

Why this matters: the list is supposed to be the rule. If shipped classes use prefixes not on the list, the kit ships breaking its own rule.

**Two fixes:**

1. **Add the 11 missing prefixes to the forbidden list** so the list matches reality. ~5 minutes of editing. The kit becomes consistent with its own rules.
2. **Remove the 11 prefixes from the kit** by deleting those CSS classes and any HTML using them. Bigger surgery, loses features (FAB on narrow, deck pattern, highlight spans, avatars in signoff, checkboxes in switch markup, etc).

**Recommendation:** option 1. Option 2 is a proper kit refactor that needs its own pipeline run.

**Choice:** add the 11 missing prefixes to the allowed list — yes/no?

Source: `07-meta-reviewer.md § In-scope vs out-of-scope flag triage`.

---

### Cluster C — The new prose has voice problems

This is the biggest cluster, ~30 in-scope flags inside the newly-written canon books. The pipeline migrated content from the 685-line manifesto into the new thinner canon files, and along the way the voice rules got bent.

What's broken:

- **Em-dashes habitual in body.** The voice rule says "rare in body" — meaning em-dashes should be reserved for genuinely unusual punctuation, not used as a default rhythm tool. Reality: roughly 50 em-dashes across the new canon files (manifesto, components, patterns, pipeline, protocols, index.html). Most can become periods or commas without losing meaning.
- **AI tells in migrated prose.** Filler verbs and transitions that signal AI writing — "additionally", "moreover", "furthermore", "serves as", "represents", "showcasing", filler adjectives like "robust", "comprehensive", "seamless". Need to be cut or replaced with concrete language.
- **Five identical primary CTAs.** The new `index.html` shell has eight pointer cards in the inspector — six for canon files, two for demos. Five of the canon cards all say "Open the book" as their primary button. The voice rule says primary and secondary button labels never repeat. Each card needs a unique label naming what's inside, like "Browse patterns" / "Find a component" / "Read the voice guide" / "Walk the pipeline" / "Check the protocols".
- **`pipeline/protocols.md` is missing the canonical `book__signoff` block at the end.** Every kit doc ends signed (author + timestamp + handwritten signature SVG). Protocols ships without one. ~5 lines to add.
- **`pipeline/pipeline.md` examples use "I" pronouns.** When pipeline.md shows what a Jobs-character reviewer writes ("What I'd want to see first", "What I'd try to do"), it uses first-person "I". The voice rule says no "I" in rendered prose. BUT — these strings are *examples of what a role character outputs*, not the system speaking in its own voice. Could go either way: strict reading = fix them; pragmatic reading = role-character outputs are exempt because they're literally a stage's voice contract.

**Choice:**
- Fix the em-dashes — yes/no?
- Fix the AI tells — yes/no?
- Rewrite the five duplicate button labels — yes/no?
- Add the missing signoff block to protocols.md — yes/no?
- Fix the "I" pronouns in pipeline.md examples — yes/no/exempt-as-role-quotes?

Source: `06c-voice.md` carries the full flag list with file:line cites.

---

### Cluster D — Old CHANGELOG has Lebedev mentions

KK asked the kit to never credit "Artemy Lebedev" or "Bureau" for the typography rules — those rules are referred to as "inner and outer theory" or described directly. The new canon docs strip the attribution. But the `CHANGELOG.md` has three historical entries (lines 38, 100, 105) that mention "Lebedev" and "Bureau" because they were written before the directive landed.

**Three options:**

1. **Strip retroactively.** Edit the old changelog entries to remove "Lebedev" / "Bureau". Cleanest end state. Loses the historical accuracy of what the changelog said at the time.
2. **Leave history alone.** CHANGELOG is a record of what changed when. Past entries reflect what the kit said at that time. The directive applies going forward, not retroactively.
3. **Add a footer note.** Leave the entries verbatim but append a note: "As of 2026-04-25, attribution to specific designers/firms in canon prose was retired. This historical record preserves what the kit said at the time of each release."

**Choice:** which option — 1, 2, or 3?

Source: `06c-voice.md § Lebedev / Bureau guard`.

---

## How the pipeline handles fix-vs-ship

Per the kit's reiterate protocol:

- **Path (a) — Fix and re-dispatch.** KK names which clusters to fix and the stage that owns each fix. Those stages re-run with the fix list. Then 6b/6c/7 re-run on the new build. If 7 PASSes, ship.
- **Path (b) — Ship with named exceptions.** KK green-lights the ship even with known problems. Each accepted problem becomes a line in `documentation/2026-04-24-content-architecture/README.md § Exceptions shipped`, with a one-line reason. Tag `v1.3.0` ships immediately.

A mix is allowed — fix some clusters, accept others as exceptions, ship.

---

## What KK needs to bring back to the main session

Five answers, copy-paste-ready:

1. **Cluster A** — park for separate kit-cleanup session — yes/no?
2. **Cluster B** — add the 11 missing prefixes to the forbidden list — yes/no?
3. **Cluster C** — which sub-items get fixed:
   - Em-dashes — yes/no?
   - AI tells — yes/no?
   - Five duplicate button labels — yes/no?
   - Missing signoff in protocols.md — yes/no?
   - "I" pronouns in pipeline.md examples — yes/no/exempt?
4. **Cluster D** — option 1 / 2 / 3?
5. **After any fixes land and stage 7 PASSes — ship as v1.3.0?** yes/no?

If KK wants the helper agent to draft proposed copy for any of the C fixes (e.g., five non-duplicate button labels, or a sample em-dash-stripped paragraph), it can — but only as proposals KK reviews. The actual edits happen back in the main session.

---

## Pointers to the source artifacts

If the helper agent wants to read original evidence:

- `documentation/2026-04-24-content-architecture/01-analyst.md` — locked decisions at session start
- `documentation/2026-04-24-content-architecture/02-design-director.md` — six pattern blocks + chosen direction
- `documentation/2026-04-24-content-architecture/04-ds-manager.md` — 17-task split that stage 5 executed
- `documentation/2026-04-24-content-architecture/05-design-engineer.md` — what shipped
- `documentation/2026-04-24-content-architecture/06b-consistency-ds.md` — Cluster A + B evidence
- `documentation/2026-04-24-content-architecture/06c-voice.md` — Cluster C + D evidence
- `documentation/2026-04-24-content-architecture/07-meta-reviewer.md` — rubric verdict + reiterate routing

The shipped build itself is at the repo root — `index.html`, `style.css`, `js/kit.js`, `skills/kk-design-system/manifesto.md`, `skills/kk-design-system/canon/*`, `skills/kk-design-system/pipeline/*`. Read any of these directly to inspect the actual rendered state.
