# Patterns library initiative

Date: 2026-04-23
Owner: KK
Status: aligned, awaiting build kickoff
Stamp: not accepted

## Why

Atoms and elements live in `index.html` (kit catalog). Patterns have no home. A `patterns.md` bloats one file. Patterns inlined into `index.html` bloat the canon. Patterns shipped inside accepted prototypes are not findable from a central registry, so designers reach by memory or skip them.

We need a thin registry that points at real patterns living in real prototypes, with zero canon duplication.

## What we are building

A new `patterns.html` at repo root, sibling of `index.html`. Same visual language, driven by `vars.css` + `style.css`.

Three sections:
- Atoms. Short description, link to its instance inside `demos/fundamental--accepted/`.
- Elements. Short description, link to its instance inside `demos/fundamental--accepted/`.
- Patterns. Short description, link to source demo, iframe of the sliced pattern under a collapsed disclosure.

Source of truth for each entry is the demo it points to. The registry stores no markup, only references.

`patterns.html` does not point at `index.html`. It points at demos.

## Folder layout

```
/index.html                          kit canon, maintainer-facing (slimmed after fundamental ships)
/patterns.html                       registry, consumer-facing
/demos/<slug>--accepted/             accepted prototypes only (the --accepted suffix is the stamp)
  index.html                         the prototype
  patterns/
    <pattern-slug>.html              sliced pattern, iframe target
/prototypes/<slug>/                  prototypes that did not pass acceptance, kept for history
```

Existing `prototype-alpha/` and `prototype-operator-alpha/` move into `prototypes/`. Both failed.

## Acceptance

A prototype becomes registry-eligible only when KK stamps it explicitly. The stamp lives in the folder name as the `--accepted` suffix:
- before stamp: `demos/<slug>/`
- after stamp: `demos/<slug>--accepted/`

Double-dash separator chosen so no natural slug collides and no shell-glob escaping is needed.

The discovery pass runs only against folders carrying the suffix. Failed or in-flight prototypes are invisible to the registry.

## Pipeline placement

Pattern discovery is a new pass, separate from the design pipeline (which ends at stage 7 meta-reviewer). Triggered by the acceptance stamp.

New role skill: `kk-role-pattern-discoverer`, sonnet thinking.

Input: one accepted prototype folder.

Output:
- sliced pattern files at `demos/<slug>--accepted/patterns/<pattern-slug>.html`
- appended entries in `patterns.html` for new atoms, elements, patterns surfaced by this prototype that are not already in the registry

Cross-prototype dedup rule: first-accepted wins. When a pattern already in the registry appears in a later accepted prototype, the discoverer adds the new prototype as an additional usage on the existing entry. No second entry is created. The first registered slice remains canonical.

The discoverer never edits canon (`index.html`, `vars.css`, `style.css`, `skills/`).

## Pattern eligibility rubric

The discoverer applies this rubric to every candidate composition. A composition qualifies as a pattern only if every "must" answers yes.

Must:
1. Composes two or more atoms or elements (a single atom or element alone is not a pattern).
2. Has a nameable function (e.g. "list with detail panel", "filter bar", "field with helper and error", "empty state with primary action").
3. Reusable across at least two conceivable contexts. Not specific to one screen's narrative.
4. Self-contained — the slice can be lifted into a standalone html fragment without breaking visually or semantically.
5. Stable boundary — there is an unambiguous start and end to the markup that defines the pattern.

Disqualifies:
- One-off layout decisions tied to a specific screen narrative.
- A single atom or element with no real composition.
- Compositions whose boundaries blur into surrounding markup.
- Decorative arrangements with no nameable function.

Output discipline: when a candidate fails the rubric, the discoverer logs it in the run report with the reason but does not register it.

## First execution: `fundamental`

The first accepted prototype is `fundamental`. It is `index.html` with the catalog ceremony removed: every atom present once, every element present once, every composition already living in the canon retained as plain composition. No fake product surface, no invented narrative. Document-shaped, not product-shaped.

The patterns we register from `fundamental` are the ones already present in the canon. Discovery here is more cataloging than invention.

Hard constraints:
- Every atom in `index.html` is present and used in `fundamental`.
- Every element in `index.html` is present and used in `fundamental`.
- No catalog ceremony: no didactic group headings explaining what an atom is, no usage notes, no "this is the disabled state" labels next to demos. Plain composition only.
- Visual language matches `index.html` (driven by `vars.css` + `style.css`).

Lifecycle, owners, and reviews live in the Execution plan section below.

## Execution plan

Three phases. Phases 1 and 2 can run in parallel.

### Phase 1: build `fundamental`

Owner: `kk-role-design-engineer` (Bret Victor).

Input: this initiative doc + `index.html`.

Job: ship `demos/fundamental/index.html`. Strip catalog ceremony, retain every atom and every element in plain composition. The rest of the design pipeline (analyst, design director, designer, ds-manager) is skipped — the source IS the design and the spec is this doc.

Reviews on the build:
- 6a `kk-role-consistency-jobstory` — **skipped.** `fundamental` is kit-internal, not product-shaped. There is no analyst jobstory for stage 7 to gate the cold read against.
- 6b `kk-role-consistency-ds` (Dieter Rams) — runs. Perfect fit for kit-internal: every class matches a kit pattern, nothing off-inventory, off-grid, or off-token.
- 6c `kk-role-voice-reviewer` (George Orwell) — runs against whatever visible strings exist, even if minimal.
- 7 `kk-role-meta-reviewer` (Anna Wintour) — runs on an adjusted rubric. Drops the 6a-vs-analyst comparison item. Adds: "every atom present, every element present, no ceremony retained."

If 7 passes, KK stamps. Folder renames to `demos/fundamental--accepted/`.

### Phase 2: author the discoverer skill

Owner: `kk-ds-maintainer`.

Deliverables:
- `skills/kk-role-pattern-discoverer/SKILL.md` with frontmatter (model, character: Jina Anne, voice), §Character body paragraph, the rubric from this doc, input/output contract.
- A row added to `pipeline.md §Role roster`.
- A note in `pipeline.md` capturing the post-pipeline placement of pattern discovery and the kit-internal review adaptation (next section).
- Kit version bump.

Can run in parallel with Phase 1 — the rubric is settled, so the skill does not need `fundamental` to exist.

### Phase 3: deploy the discoverer

Spawn `kk-role-pattern-discoverer` as a subagent against `demos/fundamental--accepted/`.

Outputs:
- sliced patterns at `demos/fundamental--accepted/patterns/<pattern-slug>.html`
- `patterns.html` created at repo root, populated with the first set of atom, element, and pattern entries
- run report listing rejected candidates with reason

Follow-up pass after Phase 3: slim `index.html` by reviewing for removal anything not pulled into `fundamental` and not referenced by `patterns.html`.

## Review-stage applicability — general principle

Pipeline-v3 review stages were designed for product-shaped artifacts. Kit-internal artifacts (`fundamental`, slimmed `index.html`, future docs) need an adapted sweep:

- 6a is product-only. No analyst jobstory exists for kit-internal artifacts, so the cold-read-vs-brief comparison at stage 7 cannot run.
- 6b is universal. Kit audit applies to anything using the kit.
- 6c is universal. Voice applies to any visible prose.
- 7 runs on an adjusted rubric for kit-internal artifacts: drop the 6a-vs-analyst item, add an artifact-specific completeness item.

Bake this into `pipeline.md` when maintainer authors the discoverer skill (Phase 2).

## Discoverer character — proposal

Constraint from KK: real woman, famous, smart, who worked with system design in digital space.

Recommendation: **Jina Anne.**

Why:
- Built Salesforce Lightning Design System — one of the first large-scale corporate digital design systems.
- Founded the Design Systems Conference, the discipline's central gathering.
- Co-spec'd the W3C Design Tokens work — formalized the practice of inventorying design primitives.
- Treats design systems as a discipline of naming and inventory, which is exactly the discoverer's craft (read a prototype, name the patterns, register the slices).
- Domain-fit before fame: she is the most senior practitioner whose actual work is what this role does.

Alternatives if KK wants a different angle:
- **Diana Mounter** — leads Primer at GitHub. Strong production DS practitioner. Slightly less public than Jina.
- **Ellen Lupton** — Cooper Hewitt curator, "Thinking with Type" author. Wider mass fame, but her domain is print typography and curation, not digital systems. Misses the domain-fit bar by some distance.

If KK accepts: discoverer voice will be measured, taxonomic, low-drama. Names the pattern, cites the slice, applies the rubric, files. No theatrics.

## Resolved this round

- `fundamental` shape: stripped `index.html`, document-shaped. Every atom, every element, in plain composition. Not a product surface.
- Acceptance mark: `--accepted` suffix on folder name (double dash, no brackets, no shell escaping required).
- Discoverer thinking level: sonnet.
- Discoverer character: Jina Anne. Confirmed.

## Resolved round 1

- Initiative doc home: `proposals/`. README widened to cover initiatives.
- Atom and element coverage in `fundamental`: exhaustive.
- `prototypes/` folder for failed prototypes. `prototype-alpha/` and `prototype-operator-alpha/` migrate there.
- `index.html` future: slimmed after `fundamental` and `patterns.html` are accepted.
- Cross-prototype dedup: first-accepted wins.
- Pattern eligibility rubric drafted.

## Out of scope for the first pass

- Pattern versioning across prototype evolutions.
- Auto-rebuild of the registry when a referenced demo changes.
- Consumer-facing `kk-design-system` skill updates teaching the registry.
- Migrating existing prototypes' patterns retroactively (none accepted, none eligible).
