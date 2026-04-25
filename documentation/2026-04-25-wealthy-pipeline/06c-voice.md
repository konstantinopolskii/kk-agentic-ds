---
session: 2026-04-25-wealthy-pipeline
stage: 6c
role: voice-reviewer
input: demos/wealthy-pipeline/index.html (built prototype) + canon/voice.md + manifesto.md §Philosophy
output: per-block voice audit, ~70 strings audited, 6 flags
gate: feeds stage 7
---

Cold voice audit. Read every visible English UI string against `voice.md`. Russian content prose is out of scope (the audit covers chrome only). Six defects flagged.

## Raw input

- `demos/wealthy-pipeline/index.html` — the prototype.
- `canon/voice.md` — full file.
- `manifesto.md § Philosophy` + §Why this exists.

## Block — Sidebar

### AI tells
Pass.

### Button labels
n/a — no buttons in this block.

### Empty states
n/a.

### Error messages
n/a.

### Sentence case
Pass. "Strategy", "Doc", "Margin" — single-word group labels capitalised. TOC items: "Brief", "Research", "Additional notes", "Signoff" — sentence case.

### Em-dash + italics
Pass. None.

### Muted + light weight
Pass. Footer renders in `t-caption` (Medium 500, full black) per kit defaults; `t-muted` not applied here.

## Block — Hero

### AI tells
Pass.

### Sentence case
Pass. "Strategy for Sofia" — sentence case.

### Em-dash + italics
Pass.

### Muted + light weight
Pass.

All other vectors n/a.

## Block — Brief section

### AI tells
**Flag.** `index.html:104` — body intro reads:

> Single-line summary of the engagement Konstantin committed at brief stage.

This is meta-prose describing the slot rather than carrying content. "Single-line summary" is the filler adjective pattern (`voice.md § No AI tells § Filler adjectives`). "Engagement" reads as corporate jargon (`voice.md § Shape`: "Short. Factual."). The whole sentence is a placeholder describing what this section IS rather than what it SAYS. The operator should see the actual brief summary; instead the operator sees a description of what a summary would look like.

### Button labels
n/a — no buttons in this block.

### Empty states
n/a — section is populated.

### Error messages
n/a.

### Sentence case
Pass. "Brief" h2; "Transcription", "CV", "Mentor notes", "Depth" spec keys.

### Em-dash + italics
Pass.

### Muted + light weight
Pass. Spec values render full black per kit default.

## Block — Research section

### AI tells
Pass on the body intro: "12 sources accepted, 3 pruned." — tight, factual. Pass on the source list (data, not chrome).

### Button labels
**Flag.** `index.html:218` — primary button label:

> Implement comments in research

28 characters. Voice.md § Labels and interface text: "Length: cut every word that doesn't change meaning." Button discipline: "imperative verbs. … Name the outcome." 28 chars exceeds the practical 24-char ceiling commonly read at 0.2 seconds without parsing. "Apply comments" (14 chars) or "Use comments" (12 chars) names the same outcome more tightly.

Pass on the other two: "Redo research" (13 chars), "Add research" (12 chars). Both imperative, sentence case.

### Empty states
n/a.

### Error messages
n/a.

### Sentence case
Pass. "Research" h2. Buttons sentence case.

### Em-dash + italics
Pass.

### Muted + light weight
Pass.

## Block — Strategy section

### AI tells
Pass. The h2 + subtitle pair "Strategy / Sofia's first months as a solo founder" — short, factual, no filler.

### Button labels
Pass. "Improve in place" (16 chars), "Redo section" (12 chars), "Redo whole doc" (14 chars). All imperative, sentence case, under 24.

(One concern: "Improve in place" reads as a phrase rather than an explicit verb-object — "in place" is locative jargon. Voice canon does not forbid; flag as soft if reviewer wants to tighten further. Hold.)

### Empty states
n/a — section populated.

### Error messages
n/a.

### Sentence case
Pass. h2 "Strategy". Russian h3 subsections follow Russian sentence-case convention.

### Em-dash + italics
Pass.

### Muted + light weight
Pass on the structural subtitle:

> `<span class="t-display--medium t-muted">Sofia's first months as a solo founder</span>`

Voice.md § Muted text: "Allowed only for metadata (bylines, captions, hairlines) or when the user explicitly asks." The subtitle here is structural (a frame line under the section heading), reading as metadata to the section. Borderline; the kit demo at `patterns/three-column-shell.html` uses the same `t-display--medium t-muted` shape for section subtitles, so it inherits canon precedent.

## Block — Additional notes section

### AI tells
Pass.

### Button labels
n/a — no buttons.

### Empty states
**Flag.** `index.html:296` — empty placeholder reads:

> Optional. Notes added here render below the strategy.

Voice.md § Labels and interface text: "Empty states: one sentence of purpose + one action that populates." This carries the purpose ("Optional. Notes…") but offers no action. The operator does not know HOW to add notes — there is no `<input>`, no "+ Add note" button, no clickable affordance described in the prose. Either:
- The empty state should name an action ("Click to add a note" or "Type below…"), or
- The section should not invite adding when the affordance does not exist.

The string passes individually but the empty-state SHAPE is incomplete.

### Error messages
n/a.

### Sentence case
Pass. "Additional notes" h2. Body sentence case.

### Em-dash + italics
Pass.

### Muted + light weight
Pass. `t-subtle` correctly applied to a placeholder per `voice.md § Muted text` carve-out.

## Block — Signoff shout

### AI tells
Borderline. `index.html:307` — the stat string:

> 2 revisions before sealing.

"Sealing" is a metaphor for signoff. Voice.md § No AI tells § Words to cut lists "Buzzy nouns: tapestry, testament, landscape, journey, ecosystem, realm" — "sealing" is not in the explicit forbidden list, but "metaphors that say nothing" is the rule. "Sealing" here is metaphorical (signoff is not literal seal-application). The kit's component name `book__signoff` uses neutral language; the body string here reaches for poetic register.

Mild flag. Reviewer's call: keep ("sealing" reads as the act-of-finalising; concrete enough) or replace with "before signing" or "before sign-off".

### Button labels
**Flag — heading-button repetition.** `index.html:303` (heading) and `index.html:323` (button) both read:

> Sign and deliver

Voice.md § Labels and interface text: "Primary vs secondary: labels never repeat." That rule is about primary vs secondary buttons inside one card. Heading-vs-button is not explicitly named. However, the rule's spirit — "cut every word that doesn't change meaning" — applies. The card heading and the action button carry the same words; the heading does not earn its slot when the button below it announces the same action.

Suggestion (out of scope per role contract; documented for stage 7): heading reads "Ready to deliver" or "Sign-off" while the button retains "Sign and deliver".

### Empty states
n/a.

### Error messages
n/a.

### Sentence case
Pass. "Sign and deliver" sentence case.

### Em-dash + italics
Pass on headlines (none).

The list step "Resolve threads where the agent's replacement reads better." carries "where… reads better" — colloquial, but no italics or em-dashes.

### Muted + light weight
Pass. Operator line is `t-caption t-muted` — pre-sign metadata, canonical use.

## Block — Inspector stage card

### AI tells
Pass. "5 of 7 · Review" — terse, factual. "9 open threads to resolve." — terse, action-oriented.

### Button labels
n/a — no buttons.

### Empty states
n/a — populated.

### Error messages
n/a.

### Sentence case
Pass.

### Em-dash + italics
Pass. Middle-dot separator (` · `) is not an em-dash.

### Muted + light weight
Pass.

## Block — Inspector comments group

### AI tells
**Flag.** `index.html:404` — reply field placeholder:

> Reply with a why, or approve via the kebab.

Voice.md § Labels and interface text: "Placeholders: real examples, not labels." This placeholder is neither a real example nor a label — it is INSTRUCTIONS embedded in a placeholder. Voice.md § Tooltips: "Tooltips: metadata only. A feature that needs a tooltip is a UI bug." A placeholder that explains the UI is a tooltip in disguise.

The placeholder should show what a real reply looks like ("Sharpen the verb" or "Try a different example") rather than instruct the user how the field works.

**Flag.** `index.html:557` — operator note inside thread t-5:

> Spell out — interview WHO, ASKING WHAT.

Voice.md § Forbidden list (bottom): "Italics, ALL CAPS, Title Case." ALL CAPS is FULLY forbidden, not just in headings. "WHO, ASKING WHAT" violates. Em-dash in body is "rare in body" — passes alone, but combined with the ALL CAPS the line reads as shouty.

The fix: replace ALL CAPS with bold or with explicit prose ("interview which founders, asking which questions").

**Flag.** `index.html:631` — operator note inside thread t-7:

> Replace 'за цикл' with 'за стратегию'. Сlearer to Sofia.

The word "Сlearer" starts with Cyrillic `С` (U+0421) instead of Latin `C` (U+0043). Visually identical glyphs, typographically broken — copy-paste, language-aware spell-checking, and search will all treat this as a different word than "Clearer". This is a typography defect, not a voice rule per se, but it reads as voice-adjacent because the string ships in the prototype's UI.

Voice.md does not explicitly cover mixed-script typos. Flag for stage 7 to route either to 6b (DS / typography) or back to 5 (engineer typo fix).

### Button labels
Pass. Kebab actions: "Approve", "Reply", "Archive thread", "Delete" — all imperative, sentence case, under 24 chars.

### Empty states
Out of slice — comments group is populated. The slice does not render the empty state. The 03b designer drafted "No threads yet. Select text in the strategy to start one." — that copy is not in the shipped file; the empty-state branch is not exercised.

### Error messages
n/a in this slice.

### Sentence case
Pass. "Comments (7 open · 2 resolved)". Author bylines render proper names.

### Em-dash + italics
Pass on bylines + headings. The body em-dash inside thread t-5's note is "rare in body" — allowed alone, but the ALL CAPS combination upgrades it to flag (see above).

### Muted + light weight
Pass. Resolved-thread bylines render `t-caption t-muted` per byline-as-metadata canon.

## Block — JS confirms / alerts (consumer JS)

### AI tells
Pass. "Replace the entire strategy? Open threads stay." / "Replace research findings? Open threads stay." / "Sign and deliver to Sofia? Open threads stay visible on her copy." — all factual question + factual reassurance. No fillers.

### Button labels
n/a (browser-native confirm renders OK / Cancel labels per the OS).

### Empty states / Error messages
n/a.

### Sentence case
Pass.

### Em-dash + italics
The mock-mode alert string `Signed — out of slice.` carries an em-dash in body. Voice.md "rare in body" — single occurrence, dev-mode only, not user-facing. Pass.

### Muted + light weight
n/a.

## Summary

**Most flags:** Inspector comments group (3 flags — instructional placeholder, ALL CAPS body, mixed-script typo).

**Zero flags:** Sidebar, Hero, Research source list, Inspector stage card.

Six distinct voice defects flagged for stage 7:

1. **Brief intro** (`index.html:104`): "Single-line summary of the engagement Konstantin committed at brief stage." — meta-prose + filler adjective ("single-line"). The intro should carry actual brief content, not describe the slot.

2. **Research primary button** (`index.html:218`): "Implement comments in research" — 28 chars exceeds practical button length ceiling. Tighten to "Apply comments" or similar.

3. **Additional notes empty state** (`index.html:296`): "Optional. Notes added here render below the strategy." — invites adding without naming an action. Empty-state shape is incomplete per voice canon.

4. **Signoff heading-button repetition** (`index.html:303` + `index.html:323`): both read "Sign and deliver". Heading does not earn its slot when the button announces the same words.

5. **Reply field placeholder** (`index.html:404`): "Reply with a why, or approve via the kebab." — instructional, not exemplary. Should show a real example reply, not explain the UI.

6. **Thread t-5 body** (`index.html:557`): "Spell out — interview WHO, ASKING WHAT." — ALL CAPS forbidden per voice.md § Forbidden list.

Plus one typography defect (not strict voice scope but voice-adjacent):

7. **Thread t-7 body** (`index.html:631`): "Сlearer to Sofia." — Cyrillic `С` instead of Latin `C` in "Clearer". Typo to fix at engineer level.

One borderline (reviewer's call):

- "2 revisions before sealing." — "sealing" is a soft metaphor where "signing" reads more directly. Voice canon does not name "sealing" as forbidden; soft suggestion only.

No HALT-class voice defects (no explicit AI-tell-inventory items like "tapestry / testament / journey / robust / seamlessly / not just X but Y / rule of three"). The prototype's chrome reads tight overall; the flags above are local cleanups, not structural drift.

## Reaudit pass — 2026-04-26

User picked path (a) at stage 7 FAIL. Stage 3b designer reran on the 4 affected patterns, stage 5 patched the prototype with the new strings + typo fix. Reauditing the seven flags.

| # | Old | New | Verdict |
|---|---|---|---|
| 1 | `Single-line summary of the engagement Konstantin committed at brief stage.` | `Audit and strategy for Sofia, solo SaaS founder.` | **Closed.** Factual content. No filler adjective. Names what the engagement IS. Sentence case. |
| 2 | `Implement comments in research` (28 chars) | `Apply comments` (14 chars) | **Closed.** Imperative verb. Names outcome. Under 24-char ceiling. |
| 3 | `Optional. Notes added here render below the strategy.` | `Empty. Add notes at brief stage.` | **Closed.** Names state ("Empty.") + names action ("Add notes at brief stage."). Honest about scope — review state does not allow add; brief stage does. |
| 4 | Heading `Sign and deliver` + button `Sign and deliver` | Heading `Ready to sign` + button `Sign and deliver` | **Closed.** Heading frames state, button carries verb. No repetition. |
| 5 | `Reply with a why, or approve via the kebab.` | `Sharpen the verb. Make it concrete.` | **Closed.** Real example. Demonstrates a typed reply rather than instructing. |
| 6 | `Spell out — interview WHO, ASKING WHAT.` | `Spell out: which founders, asking which questions.` | **Closed.** Em-dash → colon. ALL CAPS dropped. Explicit prose carries the emphasis. |
| 7 (typo) | `Сlearer to Sofia.` (Cyrillic `С`) | `Clearer to Sofia.` (Latin `C`) | **Closed.** Engineer-level fix. Single character swap; visually identical, typographically correct. |
| 8 (borderline) | `2 revisions before sealing.` | `2 revisions before signing.` | **Closed.** "Sealing" metaphor → "signing" literal. |

Plus one consistency tidy-up: a JS comment in the consumer code that mentioned the old action label was updated for code-reading hygiene (not visible UI; not a voice flag, just clean-up).

All 8 06c findings resolved. Direction doc § Exceptions remains empty (no exceptions stamped — all flags fixed via copy revision).

### Reaudit verdict

Zero open voice flags. Item 5 of the meta-reviewer rubric should now PASS on rerun.
