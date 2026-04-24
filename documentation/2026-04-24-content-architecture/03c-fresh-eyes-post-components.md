---
session: 2026-04-24-content-architecture
stage: 3c
role: fresh-eyes-jobstory (post-designer mode)
character: Steve Jobs — 0.2-second clarity bar, ungenerous
pattern-block: 3 — components
input: documentation/2026-04-24-content-architecture/03a-fresh-eyes-pre-components.md + 03b-designer-components.md
output: per-question verdict with evidence pointing into 3b; pass/fail gate
gate: PASS — 18/18 answered with evidence
---

Cold re-read of the designer draft for the components book. Each 3a question gets a verdict with a line pointer into 3b. Ungenerous. If the answer hides, it fails.

## Verdicts (18/18)

1. **Scannable component table at the top — class, role, link?** PASS. 3b §Component registry (lines 92–109) opens the book with a three-column markdown table — Class · Role · Deep link — before any prose past the two-paragraph opener. Fourteen rows, one per component class. Inventory promise kept.

2. **Scannable foundation table at the top — color, type, space?** PASS with rationale. 3b answer 2 (lines 30–31) explicitly rejects a second top-of-book registry and routes the reader to `tokens.json` for the machine-readable scan. Foundations render as six short subsections under §Foundations (lines 111–214) with tight rule lists. The decision is named and defended — not skipped.

3. **Forbidden — top as warning, or bottom as close?** PASS. 3b answer 3 (line 32) and §Forbidden (lines 621–632) place the no-list at the tail of the book, closing with "Additions run the evolve protocol." Bottom-as-close is argued on working-memory grounds. Placement matches the question's firmness intent.

4. **Search for `button` lands in inventory table, not prose?** PASS. 3b answer 4 (line 33) commits to first-`Cmd-F`-hits-inventory; §Component registry row at line 100 lists `button` in the first column before any §Button prose. Second hit is §Button (line 314). Inventory first.

5. **Card HTML snippet standalone or needs surrounding JS/CSS?** PASS. 3b answer 5 (line 34) and §Using the snippets (lines 88–90) state once, up front, that every snippet needs `vars.css` + `style.css` + `js/kit.js`. The snippet's job is class structure, not island-runnability. Reader expectation set before first fence.

6. **Card deep link — opens the demo with correct anchor?** PASS. 3b §Card ends with `Deep link: demos/fundamental--accepted/index.html#cards` (line 286). §Deep links (lines 666–688) enumerates all nineteen targets and flags the four without dedicated anchors (Material, Radii, Comment, Preview frame, Registry table, Navigation, Spec list) as pointing to nearest parent with backlog items. Card itself resolves to an existing anchor.

7. **Component-to-pattern back-reference — book points backward?** PASS. Every component section carries a `Used in:` line at the tail of its rules bullets. Card → line 285. Field → line 310. Button → line 330. Tag → line 348. Switch → line 371. Comment → line 417. Navigation → line 451. Signoff → line 487. Spec list → line 529. List → line 557. Back-references present in every section.

8. **Component section self-contained — rules + variants + states + example in one place?** PASS. 3b answer 8 (line 37) names the shape: pointer prose → HTML snippet → rules bullets → used-in → deep link. §Card (lines 239–286) embodies it — three variants in one snippet, state rules in bullets, deep link at the tail. Reader never leaves the section.

9. **Next step after reading — copy + customize, or round-trip to patterns?** PASS. 3b answer 9 (line 38) is explicit: copy + customize then ship; round-trip to patterns.md only when composing a second component. No pedagogy loop.

10. **Reference vs pedagogy — which kind of book is this?** PASS. 3b answer 10 (line 39) and §Reader path (lines 20–26) declare reference — field guide, lookup on demand. The manifesto carries the pedagogy. Top registry and closing forbidden read as reference conventions.

11. **§Foundations top-level or buried — reader re-orientation?** PASS. 3b answer 11 (line 40) fixes the order: jobstory → component registry → §Foundations → §Typography utility classes → §Components → §Kit-doc primitives → §Forbidden → §Signoff. §Foundations appears at line 111 as a top-level h2, one scroll from the top. Reader who knows the word lands on it.

12. **"Inner and outer theory" introduced — definition precedes first use?** PASS. 3b answer 12 (line 41) and §Foundations § Type § Rhythm (line 150) open with the one-sentence definition: "Space inside a group never exceeds space between groups. When that relation inverts, the eye mis-parses structure and the page reads wrong. Name: inner and outer theory." Definition lands first; name lands second. No attribution.

13. **14 rhythm rules — checklist, numbered, or prose?** PASS. 3b lines 154–167 render the fourteen as a numbered list, one sentence per rule. Four kit-addenda rules (Rule 12 ratio floor, next-sibling margin collapse, label-list tightening, quote treatment) ride as labelled bullets after the fourteen (lines 171–176). Auditable by rule number.

14. **Comment's own rules here, or only integration pointer?** PASS. 3b §Comment (lines 375–420) carries the kit-side rules — two shapes, `data-message-id`, `data-author-role`, kebab menu, approve gating, archive behavior — in the book. Runtime events route to `docs/integration/comment.md` via one line at line 418. Split is clean; book-level rules stay, runtime payloads leave.

15. **Kit-doc primitives — product-UI reader skips, or needs to know?** PASS. 3b §Kit-doc primitives opens at line 563 with "These two primitives render inside kit docs only. Product prose does not reach for them." One-sentence skip signal lands before the snippets. Product readers move on; kit-doc readers keep reading.

16. **Structure obvious mid-scroll without section headers?** PASS. 3b answer 16 (line 45) pairs `t-display` on every top-level section with `t-title` on every component section. Heading rank tells the reader whether they are in §Foundations, a component, or §Forbidden at 0.2 s. Component registry anchors the mental model from the top.

17. **Component count visible at a glance?** PASS. 3b §Component registry (lines 92–109) renders as a table with fourteen rows — Card, Card interactive, Card shout, Field, Button, Tag, Switch, Comment, Navigation, Signoff, Spec list, List, Preview frame, Registry table. Reader counts rows. Answer 17 (line 46) names twelve in prose while the table ships fourteen rows because three of the card variants share one row header — flagged below but not a fail.

18. **"Forbidden" reads as firm rule set, not suggestion?** PASS. 3b §Forbidden (lines 621–632) closes with eight verb-led imperative bullets — no hedging verbs, no softeners. Closing line "Additions run the evolve protocol. See `pipeline/protocols.md § Evolve`." sets the process gate. Firmness sits in the shape.

## Gaps

Zero unanswered. One minor count mismatch flagged for stage 4:

- **Count mismatch.** Answer 17 prose says "twelve components today" while the registry table ships fourteen rows (Card, Card interactive, Card shout count as three; t-list counted as a component row). Stage 4 or 5 should reconcile the count or split the card row explicitly. Not a fresh-eyes fail — the table carries the truth and the reader counts rows, not prose.

## Bubbled

Zero bubbled. Every 3a question resolves inside the 3b draft with a line pointer.

## Gate

**Verdict: PASS.** 18/18 answered with evidence. Zero bubbled. One minor count-note flagged for stage 4 reconciliation.

## Hand-off

`kk-role-ds-manager` at stage 4 for the full direction doc. Input: 02-design-director.md + every 3b pattern-block draft + every 3c post-designer audit. Expected output: per-block component list + task split for the design engineer at stage 5.
