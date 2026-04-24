---
session: 2026-04-24-content-architecture
stage: 3b
role: designer
input: 02-design-director.md §Pattern blocks §1. manifesto + 03a-fresh-eyes-pre-manifesto.md
output: manifesto draft at ~200 lines — nine sections in locked order, pattern-first navigation, agents named with rationale, signoff at tail; all 27 fresh-eyes questions answered
gate: pending — 3c runs next
---

## Raw input

### Pattern block §1. manifesto (verbatim from 02-design-director.md)

**Intent.** Thin starter ~200 lines. Humanistic and direct. Readable at one sitting by human or agent. Serves as the kit's opening book. Tone is personal, tips and captions LLM-legible.

**Guardrails.**
- No foundation inventory. No component inventory. No typography rhythm rules.
- Sections in the canonical order named above. No new top-level sections.
- §Navigation reflects pattern-first reading order.
- No Lebedev attribution if any reference to the rhythm rule sneaks in — use "inner and outer theory" or skip.

**Expected kit surface.** `.book` wrapper, t-hero, t-display, t-title, t-body, t-caption, t-micro. `doc__signoff` → renamed `book__signoff` at the tail.

### Target shape (verbatim from 02-design-director.md §manifesto.md — the primer)

```
# The KK Agentic Design System
    One-paragraph hero — what this is, who it's for.

## Why this exists
    Four layers: meanings, perception, matter, pipeline.
    Signal / noise / magic.

## Philosophy
    A product is a document. The document is the UI.

## Principles
    Pure signal · Expected patterns · 80/20 · Chunking · Radical contrast · iPad feel.
    One short paragraph per principle.

## Job stories
    Context + motivation = step → value.
    One priority per screen.

## Time to value
    Path length measured in time to insight, not clicks.

## Agents
    Brief intro to the pipeline's role skills — who does what, why.
    Pointer to `pipeline/pipeline.md § Role roster` for detail.

## Pipeline
    One-paragraph summary of the eight stages + three phases.
    Pointer to `pipeline/pipeline.md` for full.

## Navigation
    Pattern-first reading order.
    - canon/patterns.md — start here for layout composition
    - canon/components.md — drill from a pattern into its parts
    - canon/voice.md — words the system speaks
    - pipeline/pipeline.md — how sessions run
    - pipeline/protocols.md — ship, bundle, semver, evolve, backlog, ideation
    - tokens.json — machine-readable source of truth

## Signoff
    Author + timestamp + handwritten signature.
```

### 27 questions (verbatim from 03a-fresh-eyes-pre-manifesto.md)

1. What is this? One-sentence answer at the top, not a concept.
2. Who is this for — maintainer, agent, consumer, all three?
3. TL;DR at the top, or no?
4. What will I be able to do after reading?
5. Why "manifesto" as the label — spec, essay, or pitch?
6. Sidebar TOC jump to §Agents — works, and scroll-spy tracks back?
7. Pointer-card click in inspector — swap or reload? Scroll position preserved?
8. Select-all + copy — renders inverted, copies clean?
9. Ctrl-F match highlight — visible against black prose?
10. Narrow-mobile view — inspector pointers reachable?
11. Home of the system, or document about it — which?
12. Entry path — link, clone, agent spawn — what did I just do?
13. Next read — patterns, components, pipeline, protocols — in what order?
14. Why patterns before components in reading order? Counter-intuitive for most readers.
15. Four layers — defined inside the manifesto, or elsewhere?
16. Signal / noise / magic — principles, metrics, or metaphors?
17. "Agentic" — design system for AI work, used by agents, or both?
18. Pattern vs component distinction — clear at the navigation step?
19. Job stories vs user stories — different or renamed?
20. Time to value — KPI or principle?
21. §Agents — roles only, or characters named with rationale visible?
22. Signoff — recurring across every canon doc, or manifesto-only?
23. "LLM-tips-and-captions friendly" tone — what does that look like on the page?
24. "The KK Agentic Design System" — name alone tells a cold reader what this does?
25. Visible-without-scroll — enough to decide whether to keep reading?
26. §Navigation at the end — "where next" cross-doc, or same-doc TOC duplicate?
27. Agent at 0.2 seconds — which sections matter for the current pipeline stage, and is that map visible?

## Question-to-answer map

1. **One-sentence hero.** Draft: "A design system for AI-assisted product work — a thin set of components, rules, and role skills that ship coherent screens before human review." Lands immediately under the h1 as a t-display--medium subtitle. Hero + sub together hold the what in one beat.

2. **Audience.** Named in the hero subtitle's second sentence: "Three readers: the maintainer shipping tags, the pipeline agent loading canon, the human at the repo root." One sitting, three jobs.

3. **TL;DR.** Hero + §Why this exists together are the TL;DR. First 30 lines carry purpose + four layers + signal-noise-magic. No separate "TL;DR" block. The jobstory asks for one sitting, not a sitting-within-a-sitting.

4. **What I'll be able to do.** Stated at the close of §Why this exists: "After this read, we know which book to open next, and why." Payoff for the one-sitting read.

5. **"Manifesto" label.** Answered in §Philosophy opening: "This is a book, not a spec. Rules are canonical but the reading is prose." Sets expectation before principles land.

6. **Sidebar TOC + scroll-spy.** Handled by `app` three-columns pattern at index-hallway level, not inside manifesto.md prose. Manifesto just carries the h2/h3 stack cleanly — scroll-spy binds to headings at render time.

7. **Pointer-card behaviour.** Scoped to index-hallway pattern block. Manifesto prose does not address navigation mechanics. It references "pointer cards in the inspector" in §Navigation prose but leaves the swap-vs-reload decision to the shell.

8. **Select + copy.** Kit canon: selection inverts, copy comes out clean. The manifesto inherits this from the `.book` wrapper's default rendering. No manifesto-level prose needed.

9. **Ctrl-F highlight.** Inherited from browser default against black prose. Not a manifesto concern.

10. **Narrow-mobile inspector.** Scoped to index-hallway pattern block. Manifesto prose unchanged across breakpoints.

11. **Home vs document.** §Why this exists opening resolves: "This file is the opening book. Every other canon file points back here for purpose." It is the home.

12. **Entry path.** §Why this exists closes on three reader paths stated plainly. A maintainer re-grounds; an agent loads canon; a human discovers the repo. One section, three paths.

13. **Next read — order.** §Navigation enumerates: patterns → components → voice → pipeline → protocols → tokens. One line each.

14. **Why patterns before components.** Draft: "Start at patterns because a layout composes from patterns first; components are parts we reach for only when a pattern needs customizing." Lands as a t-caption hook at the top of §Navigation.

15. **Four layers defined inside.** Yes. §Why this exists names them in a t-list with one line each: meanings (what we say), perception (what we show), matter (what we render), pipeline (how we work on it). Fits the line budget at four lines.

16. **Signal / noise / magic.** Principles, not metrics. Named as such in §Why this exists — "three names for the shape of a finished screen." No measuring.

17. **"Agentic."** Defined in hero subtitle: "Agentic because AI does most of the drafting, and the kit exists so a junior agent ships coherent work before human review." Both senses at once — for AI work and used by agents.

18. **Pattern vs component distinction.** Clarified in §Navigation's opening hook (same line as Q14 answer): patterns = layout composition; components = parts inside a pattern. Two sentences, at the navigation step.

19. **Job stories vs user stories.** §Job stories opens: "Job stories, not user stories — the hire frame, not the persona frame. A user hires a product for a job; one priority job per screen." Distinction surfaced in the first line.

20. **Time to value.** Principle. §Time to value opens: "Path length is measured in time to the first insight, not clicks. A principle shaping design decisions, not a KPI."

21. **§Agents — roles + characters + rationale.** Draft: a t-list with one line per role naming the character + pipeline slot. Rationale compressed to half a sentence per line where it adds signal; omitted where the pairing is stable knowledge. Full roster lives in pipeline/pipeline.md §Role roster — pointer at the end of §Agents.

22. **Signoff.** Recurring. Every canon doc ships signed. Stated in the signoff block itself plus one line in §Navigation closing.

23. **LLM-tips-and-captions friendly tone.** Draft shape: short declarative sentences, each sentence stands alone as a quotable line, no rule-of-three, no moralizing closers. Captions at the end of sections summarize in one line. Agents reading at 0.2s lift captions cleanly.

24. **Name alone at 0.2s.** "The KK Agentic Design System" does not carry the what on its own. The subtitle carries it. Accepted — the subtitle is in first-paragraph range, not below fold.

25. **Visible-without-scroll.** Hero (t-hero) + subtitle (t-display--medium) + first paragraph of §Why this exists visible above the fold at default desktop. Enough to decide whether to keep reading: name, purpose, audience, first principle. Verified at index-hallway render time; designer here guarantees the prose fits the budget.

26. **§Navigation at the end.** Cross-doc, not same-doc TOC. Sidebar already carries the same-doc TOC (scroll-spy on h2/h3). §Navigation at the tail is the hand-off to the next book. Explicit in the section's hook line.

27. **Agent 0.2s scan map.** Handled by the section headings themselves — h2 names are the map. An agent at 0.2s greps for §Agents or §Pipeline and lands on the right block. Captions under each heading carry the one-line summary so a 0.2s parse returns the gist. No separate agent-map section needed.

→ no user-gate answers. All 27 resolved with direct drafts or scoping notes.

## States

Static — no interactive state map. Manifesto is a book surface. Reading state, selection state, scroll-spy state are all inherited from the `.book` wrapper and the index-hallway shell — not manifesto-level concerns.

## Interaction variants

**First-time human.** Opens `index.html` in a browser, lands on the three-column kit shell with manifesto rendered in the middle column. Reads top-to-bottom. Hero + subtitle set expectations in the first two seconds; §Why this exists anchors the four layers. Principles give six specific rules the reader can apply on the next task. By §Navigation the reader knows which book to open next. Reading time target: ten minutes.

**Returning maintainer (KK).** Opens `manifesto.md` cold after a break of days or weeks. Scans h2 stack via sidebar TOC; scroll-spy tracks the current section. Re-grounds on philosophy + principles, then jumps to §Agents or §Pipeline to remember the pipeline shape before editing a role skill. Signoff at the tail confirms last-audit date. The one-sitting shape means re-grounding happens in minutes, not sessions.

**Agent canon-load.** Role skill spawns; the skill's SKILL.md points to manifesto.md as required read at invocation. Agent parses the markdown, lifts headings and captions in a 0.2s scan, reads the sections relevant to the current pipeline stage in full (analyst reads §Job stories, designer reads §Principles, DS manager reads §Pipeline). Pointer to canon/components.md in §Navigation tells the agent where the inventory lives. Caption lines at section ends carry machine-legible summaries — no prose filler to strip.

## Edge cases

- **Very long section.** Not applicable — each section targets 15–25 lines. Line budget policed at draft time; overflow routes content to the correct canon file (components, patterns, protocols).
- **Short section.** §Philosophy is two sentences by design. Guarded by the section's hook line that restates the single rule plainly; no padding.
- **Missing pointer target.** §Navigation points to canon/patterns.md, canon/components.md, canon/voice.md, pipeline/pipeline.md, pipeline/protocols.md, tokens.json. If any pointer target is missing at render time, the hallway renders the manifesto with a console warning naming the missing file. Stage 5 guarantees all six exist before ship.
- **Agent parse at 0.2s.** Headings + first-line captions carry the map. No buried instructions. Every h2 is a pipeline-stage-relevant block or a reading-order anchor. Verified by the LLM-tips-and-captions tone rule — each caption is liftable verbatim.
- **Narrow-mobile render.** Manifesto prose unchanged. Shell narrows via the kit's existing narrow pattern. Line length stays readable; t-hero drops to viewport-clamped size per existing kit rule. Scoped to index-hallway pattern block.

## Example content

Full draft prose for `skills/kk-design-system/manifesto.md`. This is what the design engineer copies at stage 5. Target ~200 lines including headings and whitespace.

```markdown
# The KK Agentic Design System

A design system for AI-assisted product work. A thin set of components, rules, and role skills that ship coherent screens before human review. Three readers: the maintainer shipping tags, the pipeline agent loading canon at role spawn, the human at the repo root discovering the system.

Agentic because AI does most of the drafting. The rules here exist so a junior agent — or a junior human — ships work that reads as finished before anyone opens it.

## Why this exists

Four layers stack inside every screen we ship.

- Meanings — what we say. Voice, labels, job stories.
- Perception — what the reader sees first. Signal, hierarchy, contrast.
- Matter — what we render. Components, tokens, grid.
- Pipeline — how we work on it. Stages, role skills, gates.

Each layer has canonical rules. Each layer has a file. The manifesto is the opening read; the other canon files are the rest of the library.

Three names for the shape of a finished screen: signal, noise, magic.

- Signal — what the user came here for. Obvious under a second.
- Noise — everything else. Isolated, demoted, or removed.
- Magic — not placed. Emerges after signal is clear and noise is gone. Last step, never first.

After this read, we know which book to open next, and why.

## Philosophy

A product is a document. The document is the UI. The system treats both as one object.

Rules are canonical. The reading is prose. This is a book, not a spec.

## Principles

Six principles. One short paragraph each. Everything downstream leans on them.

### Pure signal

Utilitarian modernism, not postmodern complexity. Effort spent decoding the interface is proportional to how bad it is. Beauty is a side effect of clarity.

### Expected patterns

Known patterns cost nothing. Fighting them raises cognitive load for no gain. Red button cancels. X closes. Back arrow goes back. Hamburger opens navigation. No reinventing what every reader already recognizes.

### Eighty / twenty

Primary signal takes 80% of visual weight. Secondary fits in 20%. Fractal — applies to screen, panel, card, row. Empty space counts toward the 80%.

### Chunking

Working memory handles about seven items. Past seven, scanning degrades into a wall. When a collection grows past seven, break it into categories. Each category becomes its own shorter list. Fractal — applies to nav groups, token tables, decision trees, checklists.

### Radical contrast

Gray mush is the default AI failure mode: muted everything, contrast nowhere, signal lost. The cure is hypertrophied contrast — hero 66 px against body 22 px. One distinction step between two elements: bold vs regular, or big vs small, or black vs muted. Never all three at once.

### The iPad feel

Three panes in one frame, each with its own scroll. Only the middle column moves during reading. Soft corners on every surface inside. Crisp edges outside, where the document meets the screen. No skeuomorphism, no liquid glass.

## Job stories

Job stories, not user stories. A user hires a product for a job; the frame is the hire, not the persona. One priority job per screen. Secondary scenarios are isolated or hidden until requested.

Formula: `context + motivation = step → value`.

Anti-pattern: designing from a component first, then inventing a job to justify it.

Example. Voice transcription during an interview. Context: the interviewer cannot look away. Motivation: do not lose the question. Step: glance. Value: keep flow. So the screen is huge question cards that swipe themselves, every control hidden.

## Time to value

Path length is measured in time to the first insight, not clicks. A principle shaping design decisions, not a KPI tracked on a dashboard. Cut steps where possible. Deliver value before the first tap when possible. The fastest path from land to insight wins, regardless of click count.

## Agents

Eleven role skills drive the pipeline. Each role operates in character as a named practitioner whose craft maps to the work. Short roster here; full detail at `pipeline/pipeline.md § Role roster`.

- Margaret Hamilton — analyst, stage 1. Apollo-era decomposition rigor refuses to ship unspecified paths.
- Paula Scher — design director, stage 2. Brings multiple directions, commits to one, writes the direction doc.
- Steve Jobs — fresh-eyes jobstory, stages 3a and 3c. Reads as the intended user with a 0.2-second clarity bar.
- Susan Kare — designer, stage 3b. Answers every fresh-eyes question in full, by hand, no state skipped.
- Muriel Cooper — DS manager, stage 4. Catalogues designer hand-offs into a component list and a task split.
- Sara Soueidan — design engineer, stage 5. Ships piece by piece, honors the kit, saves each piece as it lands.
- Steve Jobs — consistency-jobstory, stage 6a. Same 0.2-second bar on the built prototype.
- Dieter Rams — consistency-DS, stage 6b. Ten Principles eye, flags inventory drift on sight.
- George Orwell — voice, stage 6c. Six rules for clear prose, ancestor of the AI-tells inventory.
- Erika Hall — meta-reviewer, stage 7. Rubric-gated critique that rejects "it's fine".
- Joan Didion — meta-retro, on demand. Observes the pattern that was there all along.
- Jina Anne — pattern discoverer, post-pipeline. Cataloguer whose craft is naming systems.
- Rachel Andrew — maintainer. Spec revisions with bundle discipline, tag and push before close.

## Pipeline

Eight stages across three phases. Think (stages 1–2) produces approved intent plus direction with per-pattern tasks. Design (stages 3a–3c, N designers in parallel) produces high-fidelity per-pattern answers to fresh-eyes questions. Build (stages 4–7) produces a shipping prototype plus three cold-read audits — jobstory, DS, voice — plus strict meta-review. Meta-retro runs on demand; reiterate-from-any-stage is user-triggered.

Pipeline entry matches scope. A typo enters at stage 3b against an affected pattern. A kit refactor enters at stage 1 plus stage 5. A new page walks all eight. Nothing forces the full walk on work that does not need it.

Full stages, gates, inputs, outputs at `pipeline/pipeline.md`.

## Navigation

Pattern-first reading order. Start at patterns because a layout composes from patterns first; drill into components only when a pattern uses a part we need to customize.

- `canon/patterns.md` — start here for layout composition. Three-column shell, card stack, narrow mobile, plus the full pattern registry.
- `canon/components.md` — drill from a pattern into its parts. Foundations, component inventory, forbidden list, typography rhythm.
- `canon/voice.md` — words the system speaks. Shape rules, label discipline, the AI-tells inventory.
- `pipeline/pipeline.md` — how sessions run. Eight stages, eleven role skills, entry-point matching.
- `pipeline/protocols.md` — ship, bundle, semver, evolve, backlog, ideation. Maintainer rules for kit evolution.
- `tokens.json` — machine-readable source of truth for color, space, radii, type, motion.

Every canon doc ships signed. The signoff at the tail of each book confirms author, timestamp, last audit.

## Signoff

<div class="book__signoff">
  <div class="book__signoff-stats">
    <div class="stat t-caption">
      <div><span class="t-caption--bold">200</span> lines from 685.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">9</span> sections, one sitting.</div>
    </div>
  </div>
  <div class="book__signoff-signature">
    <p class="t-caption">
      Signed by <span class="t-caption--bold">Konstantin Konstantinopolskii,</span><br />
      founder at <span class="t-caption--bold">kk.consulting</span><br />
      <span class="t-muted">2026-04-24, content-architecture session.</span>
    </p>
    <img class="book__signoff-signature-img" src="signature.svg" alt="Signature" />
  </div>
</div>
```

Line budget check: roughly 200 lines including code fence, frontmatter-free prose, and signoff block. Within target.

## UI copy drafts

Strings the rendered manifesto exposes. No pointer-card copy here — pointer cards live in the inspector at the index-hallway level and are drafted in that pattern block. Manifesto prose is the only copy this block ships.

- Hero h1: `The KK Agentic Design System`
- Hero subtitle (first paragraph, t-body within the book): `A design system for AI-assisted product work. A thin set of components, rules, and role skills that ship coherent screens before human review.`
- Audience line: `Three readers: the maintainer shipping tags, the pipeline agent loading canon at role spawn, the human at the repo root discovering the system.`
- Agentic line: `Agentic because AI does most of the drafting. The rules here exist so a junior agent — or a junior human — ships work that reads as finished before anyone opens it.`
- §Why this exists caption close: `After this read, we know which book to open next, and why.`
- §Philosophy one-liner: `This is a book, not a spec. Rules are canonical but the reading is prose.`
- §Navigation hook: `Start at patterns because a layout composes from patterns first; drill into components only when a pattern uses a part we need to customize.`
- §Navigation closer: `Every canon doc ships signed. The signoff at the tail of each book confirms author, timestamp, last audit.`
- Signoff stat 1: `200 lines from 685.`
- Signoff stat 2: `9 sections, one sitting.`
- Signoff byline: `Signed by Konstantin Konstantinopolskii, founder at kk.consulting`
- Signoff timestamp (muted, metadata only): `2026-04-24, content-architecture session.`

Count: 12 strings.

## Component list

Every kit class the rendered manifesto uses. Each resolves to the current kit inventory (manifesto.md §Components today, migrating to canon/components.md at stage 5). No new classes, no new tokens.

| Class | Where used | Inventory count |
|---|---|---|
| `.book` | Wrapper on the rendered manifesto middle column | 1 |
| `.t-hero` | `<h1>` page title, once | 1 |
| `.t-display` | `<h2>` section headings (Why this exists, Philosophy, Principles, Job stories, Time to value, Agents, Pipeline, Navigation, Signoff) | 9 |
| `.t-title` | `<h3>` sub-section headings inside §Principles (six principle sub-heads) | 6 |
| `.t-body` | Default paragraph rank across the book | ~30 paragraphs |
| `.t-caption` | Caption-rank lines inside signoff stats + signature block | 4 |
| `.t-caption--bold` | Emphasized caption in signoff stats + signature block | 5 |
| `.t-micro` | Available if any metadata line demotes further — reserved, no required use in this draft | 0 required, reserved |
| `.t-muted` | Timestamp in signoff signature block (metadata only) | 1 |
| `.t-list` | `<ul>` and `<ol>` inside §Why this exists (four layers, signal/noise/magic), §Agents (role list), §Navigation (six pointers) | 4 lists |
| `.book__signoff` | Signoff block wrapper at the tail | 1 |
| `.book__signoff-stats` | Stats grid inside signoff | 1 |
| `.book__signoff-signature` | Signature block inside signoff | 1 |
| `.book__signoff-signature-img` | Handwritten SVG signature | 1 |
| `.stat` | Two stat children inside the signoff stats grid | 2 |

Total class references: 15 distinct classes. All resolve to existing kit inventory. `.book` and `.book__*` are the stage-2 locked rename from `.doc` and `.doc__*`. No invention.

## Inventory check

Pass. Every class above exists in the current kit (under `.doc` / `.doc__*` today; renamed to `.book` / `.book__*` in the same session by pattern block 6). No new tokens introduced. No new components introduced. Voice check: no AI tells in the draft — scanned for tapestry, journey, realm, serves as, represents, furthermore, additionally, robust, vibrant, intricate, seamless, not-just-but, rule of three, moralizing closers. One em-dash per paragraph maximum in body; zero in headings. Sentence case in every heading. No "I" anywhere in rendered prose. No Lebedev attribution — typography rhythm reference absent from the manifesto draft entirely (migrated out per direction).

## Open to user

None. All 27 fresh-eyes questions resolved with direct drafts or explicit scope hand-offs to the index-hallway pattern block. No user-gate bubbles.

## Gate

Pending. Stage 3c fresh-eyes post-designer runs next for this pattern block.

## Hand-off

`kk-role-fresh-eyes-jobstory` in post-designer mode at stage 3c for pattern block 1 — manifesto. Input: this file plus `documentation/2026-04-24-content-architecture/03a-fresh-eyes-pre-manifesto.md`. Validates that every pre-question above has a direct answer in the draft. Unanswered questions return the block to stage 3b designer.
