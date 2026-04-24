---
session: 2026-04-24-content-architecture
stage: 3a
role: fresh-eyes-jobstory (pre-designer mode)
input: documentation/2026-04-24-content-architecture/02-design-director.md §Pattern blocks §2. patterns + 01-analyst.md §Per-document jobstories §patterns.md
output: naive-user question list for the patterns book — 16 questions across five sections
gate: pending — feeds stage 3b designer
---

Pre-designer question list for the patterns book. Cold read. Jobs lens. Ungenerous.

## Jobstory under test

When composing any layout, we start here. Canonical patterns with live previews. We only drill into components.md when a pattern uses a part we need to customize.

## What I'd want to see first

1. Which pattern do I use for what I'm building? A decision tree, a table, or a wall of headings?
2. What is a "pattern" vs a "component"? If I don't know the distinction at 0.2s, pattern-first reading fails.
3. Is there a preview I can see at a glance, or do I have to click every link to know what each looks like?

## What I'd try to do

4. Click a preview-frame to see the pattern live. Does it open in-page, open a new tab, or navigate away?
5. Copy the HTML snippet under a pattern and paste it into my own file — does it work standalone, or does it need surrounding markup I don't see in the snippet?
6. Drill from a pattern into a component it uses. Does the doc link me straight to that component in `components.md`, or do I have to search?
7. Scroll the 11-pattern registry table. Is it one screen, two, ten?

## What this is for

8. I'm composing a new layout. What's my starting question — "which shell?", "which stack?", "which recipe?" The book's opening needs to match the question I walked in with.
9. What comes before arriving here — I read the manifesto and got sent to patterns first. What comes next — pick a pattern, copy it, customize?
10. Is this a catalogue I browse, or a decision tree I walk?

## Unclarities

11. Three top-level patterns (three columns, card stack, narrow mobile) + 11 in the registry table. Why the split? Are the three "canonical" and the 11 "supplementary"? Or are they peers rendered differently?
12. "Narrow mobile" — is this a pattern or a responsive variant of the others? If variant, why does it get top-level billing?
13. The registry table absorbs root `patterns.html`. A reader who knew the old file — where do they notice the URL changed?
14. Preview-frame deep links point at `demos/fundamental--accepted/patterns/<slug>.html`. If a slug is missing on disk, does the link break silently or show an empty preview?

## 0.2-second check

15. At 0.2s, is it obvious which pattern covers "a strategy document with inspector"? Name + one-liner + preview thumbnail should answer this. A reader who has to click three things has failed the bar.
16. At 0.2s, is it obvious which pattern is the most-used one — the three-columns default? Visual weight should carry it above the card stack and narrow-mobile.

## All questions

1. Which pattern for what I'm building — decision tree, table, or headings?
2. Pattern vs component distinction at 0.2s.
3. Preview visible at a glance, or click-to-see?
4. Preview-frame click — in-page, new tab, navigate?
5. HTML snippet copy-paste — standalone, or needs surrounding markup?
6. Drill from pattern to component — direct link, or search?
7. Registry table size — one screen, many?
8. Opening question match — "which shell / stack / recipe?"
9. Reading flow — prior step was manifesto; next step is pick + copy?
10. Catalogue vs decision tree?
11. Three top-level vs 11 registry — canonical vs supplementary, or peers?
12. Narrow-mobile — pattern or responsive variant?
13. Root patterns.html absorbed — old URL handling?
14. Preview-frame slug missing on disk — broken link or empty preview?
15. Strategy-doc pattern obvious at 0.2s?
16. Three-columns visible as the default / most-used?

## Gate

Pending. Designer runs next.

## Hand-off

`kk-role-designer` for pattern block 2 — patterns. Input: this file + `documentation/2026-04-24-content-architecture/02-design-director.md § Pattern blocks § 2. patterns`.
