# Phase B voice — round 2 cold read

Stage 6c voice reviewer. Cold read of the built prototype against `voice.md`. No upstream context. In character as George Orwell.

## Verdict

**FAIL** — 1 defect.

## Defect list

1. `demos/md-renderer-smoke/sample-a.md:31` — body prose carries inline bold: `**bold text**` inside "A paragraph can carry **bold text**, a [link](#anchor), and `inline code` in one line."
   - **Rule broken:** `voice.md` §Shape, "**Bold:** Headings only. Not body scanning." Bold is forbidden inside body copy; it is reserved for headings.
   - **Note:** this is the same class of defect round 1 flagged for italic inline. The renderer smoke test can prove its inline-bold path with the token `**bold text**` wrapped in a code span (`` `**bold text**` ``) or the author can cut the demonstration from body prose. Canon does not grant an exemption for "feature demonstration".

## Block-by-block walk

### Block — `index.html` shell (sidebar, doc header, inspector)

- AI tells: pass.
- Button labels: no buttons rendered. Pass by absence.
- Empty states: none rendered. Pass by absence.
- Error messages: none rendered. Pass by absence.
- Sentence case: every visible heading in sentence case. Pass.
- Em-dash + italics: none in headlines. Pass.
- Muted + light weight: `t-caption` used for sidebar items and inspector captions, which are metadata. Footer `t-caption` metadata. Pass.

### Block — `sample-a.md` (core prose)

- AI tells: pass. No filler adjectives, no -ing labels, no copula avoidance, no rule of three, no moralizing closer.
- Button labels: no buttons. Pass by absence.
- Empty states: none. Pass by absence.
- Error messages: none. Pass by absence.
- Sentence case: headings at L1, L5, L9, L15, L29 all sentence case. Pass.
- Em-dash + italics:
  - L31 contains one em-dash in body prose ("per voice canon — see Sample B."). `voice.md` permits em-dashes in body as "rare". A single body em-dash in three markdown files qualifies as rare. Pass.
  - No italics outside quotes. Pass.
- Muted + light weight: no `t-muted` or light-weight markers authored in this file. Pass.
- **Bold discipline (voice.md §Shape bullet 3):** **FLAG** — L31, inline `**bold text**` inside body paragraph. Bold is reserved for headings; rendering bold mid-paragraph violates canon.

### Block — `sample-b.md` (dense blocks)

- AI tells: pass. Blockquote at L16 is a direct lift from `voice.md` itself, not an AI tell.
- Button labels: none. Pass by absence.
- Empty states: none. Pass by absence.
- Error messages: none. Pass by absence.
- Sentence case: all headings sentence case. Table header cells "Class", "Role", "Size" are single-word column labels, sentence case. Table body cells "Document title", "Section heading", "Body text", "UI labels" all sentence case. Pass.
- Em-dash + italics: none in headlines. "italic face" appears inside a blockquote describing the kit's `quote` class — prose discussing italic, not rendered italic. Pass.
- Muted + light weight: none authored. Pass.

### Block — `sample-c.md` (raw HTML passthrough)

- AI tells: pass. L3 "Markdown cannot express the kit's card, field, or stat patterns" lists three named kit patterns — factual enumeration of kit primitives, not the rule-of-three adjective pattern voice.md forbids.
- Button labels: none. Pass by absence.
- Empty states: none rendered. Pass by absence.
- Error messages: none. Pass by absence.
- Sentence case: every heading sentence case. Card titles "Card from markdown", "Shout card" sentence case. Pass.
- Em-dash + italics: none in headlines. No italics. Pass.
- Muted + light weight: `t-muted` applied to `t-caption` spans labelled "Example" (L7, L21) and to card captions L12, L26 — all metadata by content (example markers, provenance notes). Pass per §Muted text allowance for metadata.

## Summary

Block with the most flags: `sample-a.md` — one defect at L31, inline bold inside body prose.

Block with zero flags: `sample-b.md`, `sample-c.md`, `index.html` shell — each pass all seven vectors.

Round 1 removed italic from body; round 2 finds bold in the same paragraph by the same logic. The defect is local. Cut `**bold text**` down to `` `**bold text**` `` (code span showing the markdown source) or move the demonstration into a list of tokens, and the file passes. Canon is canon.
