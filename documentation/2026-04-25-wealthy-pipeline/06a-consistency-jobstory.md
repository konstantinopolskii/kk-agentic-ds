---
session: 2026-04-25-wealthy-pipeline
stage: 6a
role: consistency-jobstory
input: demos/wealthy-pipeline/index.html (built prototype, cold read)
output: per-block 0.2-second read across 9 visual blocks; 5 unclarity flags
gate: feeds stage 7
---

Cold read of the shipped prototype. Zero upstream context. Steve Jobs at 0.2 seconds: anything that takes a moment to parse is a defect.

## Raw input

- `demos/wealthy-pipeline/index.html` — the prototype.

## Block — Sidebar (left column)

### What I see
A column with three groups under the title "Strategy". First group "Doc" has two items: Brief, Research. Middle group "Strategy" has nine Russian items (Что обсудили, Точка А, Точка Б, Видение и бизнес-модель, Позиционирование, Гипотезы и каналы, Рынок, Ближайшие шаги, Как мы работаем). Bottom group "Margin" has two items: Additional notes, Signoff. Footer reads "2026, kk.consulting" and "Wealthy pipeline · stage 5 of 7".

### What I can do
Click any item to jump to a section. Hover items for visual feedback.

### What this is for
Table of contents for the strategy document. Footer tells me which stage I'm at (5 of 7) and the product name.

### What's great
Footer carries the stage position cleanly. Bilingual mix (English chrome, Russian content) is honest about who reads what.

### What could be better
The middle group label "Strategy" sits inside a doc that's also titled "Strategy" — at 0.2 seconds, I'm not sure if the group is the strategy SECTION of the doc or the doc itself. Repeating the doc's name as a TOC group label is friction.

The third group label "Margin" is jargon. A reader does not know what "Margin" means in this context. "Closing", "End", or just removing the group label would read clearer.

## Block — Hero

### What I see
A single very large line: "Strategy for Sofia".

### What I can do
Nothing. It's the title.

### What this is for
This is a strategy document for someone named Sofia. Sofia is the subject; whoever wrote it is implicit.

### What's great
Name first. The doc announces its subject before any chrome. Loud, single phrase, no decoration.

### What could be better
Nothing. Reads at 0.2 seconds.

## Block — Brief section

### What I see
Heading "Brief". One body line: "Single-line summary of the engagement Konstantin committed at brief stage." Static card with four spec rows: Transcription / Nelli call, 2026-04-15 · CV / sofia-cv.pdf · Mentor notes / 3 paragraphs · Depth / Deep.

### What I can do
Read the spec. The card has no buttons, no affordances. Read-only.

### What this is for
A record of the brief inputs that produced this strategy. Frozen evidence.

### What's great
Spec reads cleanly — keys left, values right. No edit affordance keeps the eye on the strategy below.

### What could be better
The body line "Single-line summary of the engagement Konstantin committed at brief stage." is meta-prose describing itself rather than carrying actual content. At 0.2 seconds I'm reading a sentence that explains what this section IS rather than what it SAYS. That's a placeholder that escaped. The intro should be the actual summary — "Founder coaching for Sofia, scaling solo SaaS" or whatever the brief said — not a description of the section.

## Block — Research section

### What I see
Heading "Research". Body line "12 sources accepted, 3 pruned." Static card with twelve numbered source rows (rank · headline + URL). Below the sources, a second card with the count "2 threads" and three stacked buttons: "Implement comments in research" (primary, dark), "Redo research", "Add research".

### What I can do
Read the sources. Click any of three buttons. Primary is the dark one with the longest label.

### What this is for
Research summary the agent built. The control card under it lets me act on whatever feedback I left as comments.

### What's great
Source list is dense but each row scans cleanly: number, headline, URL. Useful at a glance.

### What could be better
Primary button label "Implement comments in research" is six words. At 0.2 seconds, "Apply comments" or "Implement notes" would read faster. Long primary labels feel like instructions rather than actions.

The control card's count "2 threads" is small. I cannot tell at 0.2s whether the threads are pending my action or already replied to by the agent. The card needs a state signal beyond the count alone.

## Block — Strategy section

### What I see
Heading "Strategy" with a smaller muted subtitle "Sofia's first months as a solo founder". Then nine Russian subsections, each a heading plus a paragraph. Some paragraphs carry inline highlighted spans (different surface treatment around specific phrases). At the bottom, a control card with "7 threads" and three buttons: "Improve in place" (primary), "Redo section", "Redo whole doc".

### What I can do
Read all nine subsections. Click any of three buttons at the bottom. Select text to do something — the highlights suggest selecting text leaves a mark.

### What this is for
The strategy itself. Nine named subsections is the doc shape. The control at the bottom acts on the comments I've left.

### What's great
Subtitle in muted weight gives the section a single-sentence frame without competing with the heading. The 9 subsections give the strategy a known structure — operator scans subsection by subsection.

### What could be better
The relationship between the inline highlights and the inspector comment threads is not self-evident at 0.2 seconds. Highlights mark text visually, but I do not know whether clicking a highlight does anything, whether each highlight maps to a thread, or whether they're decorative. Mapping is implicit — the connection should announce itself.

The strategy section's control card sits at the bottom AFTER the ninth subsection. At 0.2 seconds I read "Improve in place" and don't immediately know what "in place" refers to — the section, the highlight, the doc? The label is cute but ambiguous.

"Redo whole doc" as a button label feels heavy on a per-section card. If this control belongs to the strategy section, "Redo whole doc" reaches outside its own scope. Why is it on this card? At 0.2 seconds the scope drift is a defect.

## Block — Additional notes section

### What I see
Heading "Additional notes". One subtle gray line: "Optional. Notes added here render below the strategy."

### What I can do
Nothing visible. The text says notes go "here" but there is no input field, no button, no click affordance.

### What this is for
A slot where the operator could add free-form notes for the client.

### What's great
Muted weight tells me it's optional without shouting.

### What could be better
At 0.2 seconds I do not know how to add notes. The prose says "added here" but offers no affordance. If notes are addable, the section should show an input or a "+ Add note" button. If notes are NOT addable in this state, the prose should not invite me to add them. Defect: the empty state describes a behaviour that does not exist on screen.

## Block — Signoff shout (book column, bottom)

### What I see
A dramatic dark card. Heading "Sign and deliver" in white. Two stats: "2 revisions before sealing." and "9 edits pending." A four-step ordered list: read end to end · resolve threads · sign now to deliver · patch typos. Muted line: "Will be signed by Konstantin Konstantinopolskii, kk.consulting." Primary button at the bottom: "Sign and deliver".

### What I can do
Click "Sign and deliver" — the loud, single primary action.

### What this is for
The end of the doc. The act of shipping. Stats earn the signature; steps frame what to consider.

### What's great
The inversion (black surface, white text) marks this as the moment. Sign button is unmistakable — one action, loud, last. Stats anchor the work that earned this. The "will be signed by" line names the operator before the act.

### What could be better
The card heading "Sign and deliver" matches the primary button label "Sign and deliver" verbatim. At 0.2 seconds I read the same words twice in the same card. The heading should set a frame, the button should carry the action — repetition wastes a slot. Heading should read something like "Ready to deliver" or "Sign off"; let the button own the verb.

The stats and the steps speak in different voices: stats are facts (numbers + nouns), steps are directives. Mixing them in one card makes the eye switch register mid-card. Either bury the steps less prominently or align tone.

"9 edits pending" — at 0.2s I don't know what an "edit" is in this context. Is that an operator edit or an agent edit? A pending action of mine, or a pending action of the agent? The label could be sharper.

## Block — Inspector stage card group (right column, top)

### What I see
A heading reading "5 of 7 · Review" (with "5 of 7" rendered in a small bold span and "Review" in larger text). Below the heading, a separate static card with one line: "9 open threads to resolve."

### What I can do
Nothing. Both cards are read-only.

### What this is for
Stage indicator. I am at stage 5 of 7, called Review. Nine threads need handling.

### What's great
Position + stage name fit on one line. Read-only is the right register — actions live elsewhere.

### What could be better
The heading "5 of 7 · Review" is rendered in t-display weight (the same rank as the book's section headings). At 0.2 seconds the inspector heading competes with book section headings for visual weight. The inspector should be quieter than the book per the document-first commitment of the layout. A smaller heading (t-title or t-subtitle) would read just as clearly.

Two separate cards (heading-card + info-card) for what feels like one composite indicator is a split. At 0.2s I see two boxes for one piece of metadata. Combine into one card with a heading + caption inside, OR drop the heading-card entirely and let the info-card carry both lines.

## Block — Comments group (right column, below stage)

### What I see
A heading "Comments (7 open · 2 resolved)". Below it a stack of nine cards. The first is expanded showing two messages — one from "Konstantin Konstantinopolskii" and one from "Claude" — plus a kebab on each and a reply field. Six cards below it are minimized, each showing a single message preview. Two cards at the bottom are checkmark-stamped with snippet + byline.

### What I can do
Click any minimized card to expand it. Click any kebab for actions. Type in the reply field at the bottom of the expanded card.

### What this is for
The comment thread stack. I leave threads on the doc; the agent replies; I approve or reject.

### What's great
Expanded vs minimized contrast is sharp. Resolved threads with their check stamp + snippet read as past work, not pending. The single active thread anchors my attention.

### What could be better
The agent reply inside the active thread reads "нетворкинг с фаундерами в Берлине" — three Russian words. At 0.2 seconds I do not know that this is a PROPOSED REPLACEMENT for the highlighted text in the doc body. It looks like just another message in a conversation. The connection between agent reply and the body's highlight is the product's whole mechanic, and it is implicit. If I'm an operator who has not used this product before, the link is invisible until I explore.

The heading "Comments (7 open · 2 resolved)" carries the count but uses three nested spans (count, label, count, label) inside one h2. At 0.2 seconds the heading reads as "Comments seven open two resolved" without a clear hierarchy. The numbers should anchor first; "Comments" is the label.

The minimized threads each show a single-message preview. At 0.2 seconds, six near-identical previews stack and blur — without distinguishing signals (anchor snippet, section name, urgency), they read as wallpaper. Each preview should at least surface the section anchor (which strategy subsection the thread relates to) so the eye can scan.

## Summary

**Read least clearly:** Comments group — the agent-reply-as-replacement mechanic is invisible at 0.2 seconds, and minimized thread previews wallpaper without anchor signals. The product's load-bearing interaction needs a clearer signal that an agent message is a proposed replacement, not just chat.

**Read most clearly:** Hero ("Strategy for Sofia") and signoff shout. Both announce themselves in one phrase + one action. No friction.

Five blocks carry §5 flags worth meta-reviewer attention:
- Sidebar — "Strategy" group label clashes with doc title; "Margin" group is jargon.
- Brief — meta-prose intro that should be actual content.
- Strategy — "Improve in place" / "Redo whole doc" labels carry scope ambiguity.
- Additional notes — empty-state prose invites action without affordance.
- Comments group — agent-reply-as-replacement mechanic invisible.

Plus signoff heading-vs-button label duplication.

## Cold-read rerun — 2026-04-26

Reread the patched prototype after the reiterate cycle closed seven voice flags. Question: do the structural unclarities persist?

### Block — Sidebar

**Closed.** Nothing. The sidebar wasn't touched.

**Persists.** "Strategy" group label inside a doc titled "Strategy" — two strategies, same word at 0.2s. "Margin" group label is still jargon.

### Block — Hero

**Status.** Was already clean. Stays clean.

### Block — Brief

**Closed.** The intro now reads `Audit and strategy for Sofia, solo SaaS founder.` — actual content. At 0.2s I see what the engagement IS. The meta-prose flag is closed.

**Persists.** Nothing.

### Block — Research

**Closed.** Primary button now reads `Apply comments` (14 chars). Reads fast.

**Persists.** The control card carries `2 threads` and three buttons. At 0.2s I still do not know whether those 2 threads have agent replies waiting, are open without replies, or are ready to approve. The state signal that 06a flagged on the original read is unaffected by the copy revision — it is a structural ambiguity.

I also still cannot tell at 0.2s where the "comments" the button promises to "apply" actually live. They live in the inspector? They live attached to the sources? The connection between the section's threads and the action button's scope is implicit.

### Block — Strategy

**Closed.** Nothing — strategy section's own copy was not touched. The 06c flags on this block (ALL CAPS in t-5 thread + reply placeholder) lived in the inspector, not in the strategy body.

**Persists.** All three structural unclarities from the original 06a remain:
- The inline highlights mark text but at 0.2s I do not know clicking them does anything, whether each maps to a thread, or whether they are decorative.
- `Improve in place` — improve what in place? Selection? Section? Still ambiguous.
- `Redo whole doc` on a per-section card still reaches outside the section's scope.

Plus: 9 inverted highlights along the strategy section continue to crowd the noise budget. The patch did not address density.

### Block — Additional notes

**Closed.** Empty placeholder now reads `Empty. Add notes at brief stage.` — names the state + redirects the action honestly. The empty-state-shape flag closes cleanly. At 0.2s I know it is empty AND where to act.

**Persists.** Nothing.

### Block — Signoff shout

**Closed.** Heading now `Ready to sign`, button keeps `Sign and deliver`. Different words, different jobs. The repetition flag closes. Plus the stat `2 revisions before signing.` (was "sealing") — literal verb, no metaphor.

**Persists.** Two structural points remain:
- `9 edits pending` — at 0.2s I still cannot tell what an "edit" is. Is it an open thread? An agent reply awaiting approve? An operator pending typing? The label needs a sharper word — "9 open threads" would echo the inspector card and remove the ambiguity.
- The card mixes registers — the two stats are facts, the four steps are directives. At 0.2s the eye switches mode mid-card. Either bury the steps less prominently or align tone.

### Block — Inspector stage card

**Closed.** Nothing — this block was not touched.

**Persists.** The heading uses `t-display` rank (38px) which competes with book section headings for visual weight. The inspector should be quieter than the book per the document-first commitment. Plus the two-card composite (heading-card + caption-card) reads as a split for what should be one composite indicator at 0.2s.

### Block — Inspector comments group

**Closed.** The reply placeholder (`Sharpen the verb. Make it concrete.`) and thread t-5's note (no more ALL CAPS) read clean now.

**Persists — biggest flag of the rerun.** The agent reply inside thread t-1 reads `нетворкинг с фаундерами в Берлине`. At 0.2s this still looks like a chat message, not like a PROPOSED REPLACEMENT for the highlighted text in the doc body. The product's load-bearing mechanic — Approve substitutes the agent's text into the document — has no visual announcement. An operator who has not used the product before cannot deduce this from the pixels.

Plus: 6 minimized threads stack uniformly. At 0.2s they wallpaper — no anchor signal on the preview row indicating which strategy subsection each thread relates to. The eye scans through near-identical previews looking for distinction.

### Rerun summary

**Eight items closed by the patch:**
1. Brief intro reads as content.
2. Research primary tightened.
3. Additional notes empty state honest.
4. Signoff heading-button differentiated.
5. "Sealing" → "signing".
6. Reply placeholder demonstrates a real reply.
7. ALL CAPS body dropped.
8. Cyrillic typo fixed.

**Six structural unclarities persist:**
1. **Comments group — agent-reply-as-replacement invisible.** The product's hottest mechanic does not announce itself at 0.2 seconds. **Biggest defect of the entire prototype.**
2. **Strategy highlights ↔ threads** — connection is implicit; selection mechanic invisible at rest.
3. **Strategy `Improve in place` / `Redo whole doc`** — scope ambiguity persists; "in place" is locative jargon and whole-doc reaches outside the section.
4. **Sidebar group labels** — "Strategy" inside a Strategy doc, "Margin" jargon.
5. **Inspector stage card** — t-display weight competes with book; two-card composite splits the indicator.
6. **Signoff `edits pending`** — semantics still unclear; mixed register stats vs steps.

Plus minor: Research control card lacks state signal beyond bare count.

**Verdict on the question the art-director asked.** Voice cleanup closed the prose-discipline flags. The structural unclarities — the ones that determine whether an unfamiliar operator GETS what is happening at 0.2 seconds — were not touched. Six persist. Jobs would still bounce the prototype on a clarity read.
