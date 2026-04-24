---
session: 2026-04-24-content-architecture
stage: 3a
role: fresh-eyes-jobstory (pre-designer mode)
input: documentation/2026-04-24-content-architecture/02-design-director.md §Pattern blocks §4. protocols + 01-analyst.md §Per-document jobstories §protocols.md
output: naive-user question list for the protocols book — 14 questions across five sections
gate: pending — feeds stage 3b designer
---

Pre-designer question list for the protocols book. Cold read. Jobs lens. Ungenerous.

## Jobstory under test

When shipping, evolving, or logging an exception, we want bundle rules + semver + evolve protocol + backlog + ideation in one doc, so every kit change follows the same discipline.

## What I'd want to see first

1. A numbered checklist. Ship. Bundle. Semver. Evolve. Backlog. Ideation. Readable top-down in thirty seconds before a commit.
2. A visible "am I about to ship?" entry. If I landed here mid-task, the book needs to orient me to which section owns my current action.

## What I'd try to do

3. Walk the bundle rule's file list before a commit. Is every file I touched represented? Can I check off each without scrolling?
4. Walk the semver four-step sequence before a tag push. Commit → tag → push main → push tag. Can I do this without context-switching to git docs?
5. Read the evolve protocol to decide: add a new token, or re-purpose an existing one? Does the book give a decision path, or just principles?
6. Check backlog for existing issues before proposing a new parked item. Is the backlog a list I can scan, or embedded in prose?

## What this is for

7. This is maintainer-only — a reader not shipping the kit skips it. Is that framing obvious at 0.2s, or does a product consumer waste time reading?
8. What comes before — I finished a kit change and am about to commit. What comes next — I hit every protocol step, then push + tag.
9. Is this a reference (open on demand) or a read-through (onboard once)?

## Unclarities

10. Bundle rule names seven file types (code, doc, skill reference, CHANGELOG, package.json + plugin.json, SKILL.md, integration doc). Is this list canonical, or do future additions extend it? If canonical, what changes when a new file type enters the kit?
11. Semver's major/minor/patch axes — when does a rename qualify as major vs minor? The `.doc` → `.book` rename this session triggers major. Reader needs to map "rename = breaking for consumers" to "major bump" without guessing.
12. Evolve protocol's five steps — clear sequencing? What happens if step 3 ("update both in the same PR") is impossible because code and doc live in different PRs?
13. Backlog vs Ideation distinction — Backlog = known wrong on purpose; Ideation = considered but not built. Overlap is possible; reader needs the split crisp.

## 0.2-second check

14. At 0.2s, does the book read as a pre-ship gate (checklist-shaped) or as prose essay? Pre-ship gate wins the jobstory. Essay shape fails readers mid-commit.

## All questions

1. Numbered checklist shape — top-to-bottom readable in thirty seconds?
2. Landing mid-task — which section owns my current action?
3. Bundle-rule file list walkable without scroll?
4. Semver four-step sequence walkable without git-docs detour?
5. Evolve protocol — decision path or principles-only?
6. Backlog scannable as list, not embedded prose?
7. Framing as maintainer-only visible at 0.2s?
8. Reading flow — landed from what, going to what?
9. Reference vs read-through — which?
10. Bundle-rule file list canonical or extensible?
11. Semver major/minor/patch — renames mapped to axis?
12. Evolve five-step — code and doc in different PRs, what gives?
13. Backlog vs Ideation — crisp split?
14. Checklist-shaped or essay-shaped at 0.2s?

## Gate

Pending. Designer runs next.

## Hand-off

`kk-role-designer` for pattern block 4 — protocols. Input: this file + `documentation/2026-04-24-content-architecture/02-design-director.md § Pattern blocks § 4. protocols`.
