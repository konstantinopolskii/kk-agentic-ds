---
session: 2026-04-24-content-architecture
stage: 3a
role: fresh-eyes-jobstory (pre-designer mode)
input: documentation/2026-04-24-content-architecture/02-design-director.md §Pattern blocks §1. manifesto + 01-analyst.md §Per-document jobstories §manifesto.md
output: naive-user question list for the manifesto book — 27 questions across five sections
gate: pending — feeds stage 3b designer
---

Pre-designer question list for the manifesto book. Cold read. Jobs lens. Ungenerous.

## Jobstory under test

When opening the system cold, we want purpose + fit-together in one sitting, so we re-ground without scrolling past inventory.

## What I'd want to see first

1. What is this? Needs a one-sentence answer at the top, not a concept.
2. Who is this for — a maintainer, an agent, a new consumer, all three?
3. Is there a TL;DR, or do I have to finish the read to know whether this matters to me?
4. What will I be able to do after reading this?
5. Why the word "manifesto" — is this a spec, an essay, or a pitch? That label sets expectations before the first paragraph.

## What I'd try to do

6. Click §Agents in the sidebar TOC to jump. Does that work, and does the scroll-spy track back as I scroll?
7. Click a pointer card in the inspector to open patterns.md. Does the middle column swap in-place, or does the whole page reload? If reload, do I lose my scroll position?
8. Select the whole manifesto and copy it. Does selection render inverted per the kit's selection rule, and does the copy come out clean?
9. Ctrl-F for "pipeline". Do the matches highlight visibly against the black text?
10. Open on a phone. Does the narrow pattern keep the inspector pointers reachable, or do the pointers disappear behind a tap?

## What this is for

11. Is this the home of the system, or a document about the system? It may be both — but the opening needs to be unambiguous.
12. What did I just do before I landed here — clicked a link, cloned a repo, got spawned by a pipeline stage? Each entry path implies a different first read.
13. What am I supposed to read next — patterns, components, pipeline, protocols? In what order?
14. Why is patterns.md first and components.md second in the §Navigation reading order? Most design systems go small to big. This reverses that. The reason needs to be one line, visible here.

## Unclarities

15. "Four layers: meanings, perception, matter, pipeline." What do these mean? Are they explained in the ~200-line manifesto, or does a reader have to navigate elsewhere? If explained, the explanation needs to fit the line budget.
16. "Signal / noise / magic." Principles, metrics, or metaphors? The distinction matters — a metric I can measure, a principle I can follow, a metaphor I can ignore.
17. "Agentic." Is this a design system for AI-assisted product work, a design system used by agents at render time, or both? The word does heavy lifting and needs a direct definition.
18. What is a pattern vs a component, exactly? Pattern-first reading order depends on the reader knowing the difference at the navigation step. If the distinction lives in the §Philosophy section, §Navigation reads blind.
19. "Job stories" — different from user stories? If yes, how? If no, why rename?
20. "Time to value" — a KPI the maintainer tracks, or a principle shaping design decisions? Reads as MBA jargon without context.
21. §Agents — does this section name pipeline slots only, or also the characters (Paula Scher, Steve Jobs, Margaret Hamilton, Joan Didion, etc.)? If characters, is the rationale for each name visible, or does a reader have to find the role-roster table elsewhere?
22. Signoff at the tail — is this a recurring affordance across every kit doc (components.md, patterns.md, protocols.md, pipeline.md), or unique to the manifesto?
23. The tone brief says "humanistic, direct, LLM-tips-and-captions friendly." What does that produce on the page? A reader has no way to check "LLM-tips-and-captions friendly" without a sample.

## 0.2-second check

24. "The KK Agentic Design System." At 0.2 seconds, does the name alone tell a cold reader what this does? "Agentic" is jargon for most readers. If a subtitle carries the one-line what, fine — but the name alone fails.
25. Visible-without-scroll portion of the manifesto. Enough to decide whether to keep reading? If the hero + first paragraph carry the purpose, yes. If the first paragraph is setup for §Why this exists, no.
26. §Navigation at the end. Reads as "where next after the read" or as a TOC the reader should have seen at the top? The jobstory says "one sitting" — end-placement fits. But the sidebar TOC already gives the navigation into the manifesto itself, so the end-navigation needs to be visibly cross-doc, not same-doc-TOC.
27. Agent loading this file. At 0.2 seconds of parsing, clear which sections matter for the current pipeline stage (analyst reads §Job stories, designer reads §Principles, DS manager reads §Components — but §Components is gone from this book, so the map needs to point out)?

## All questions

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

## Gate

Pending. Designer runs next at stage 3b for this pattern block.

## Hand-off

`kk-role-designer` for pattern block 1 — manifesto. Input: this file + `documentation/2026-04-24-content-architecture/02-design-director.md § Pattern blocks § 1. manifesto`.
