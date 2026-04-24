---
session: 2026-04-24-markdown-source
stage: phase-1-fresh-eyes
role: fresh-eyes-jobstory
input: demos/md-renderer-smoke/ + screenshots
output: cold-read verdict
gate: informs KK's next move
---

# Fresh-eyes cold read — md-renderer smoke

Jobs. 0.2-second bar. No benefit of the doubt.

## What I see

Three-column page. Left sidebar: the word "Smoke," then a group "Samples" with three links — Sample A, Sample B, Sample C. Sample A is marked active with a thin black bar on the left. At the bottom of the sidebar, two muted lines: "md.js renderer" and "real kit shell preview."

Middle column: a big headline "md.js smoke test." Under it, a body paragraph explaining three articles below. Under that, a second, muted, smaller paragraph with a shell command. Then a very large heading "Samples." Then a huge four-line headline "Sample A — headings, paragraphs, lists, links, inline code." Then a body paragraph. Then more content flowing down: "Section heading" in display size, a paragraph, "Card-level heading" in bold body size, a paragraph, "Subtitle-level heading" in small caps-ish weight, a paragraph. Then "Lists" in display size. A label "Unordered list:" with three dashed items separated by hairlines. A label "Ordered list:" with three numbered items separated by hairlines. Then "Mixed content paragraph" in display. A paragraph. A horizontal rule. Then the next hero — "Sample B — tables, blockquotes, fenced code, horizontal rules" — five lines wrapped. A paragraph. Screenshot is cut here.

Right column: a heading "Notes," then two card-heading groups — "Renderer is dumb" with a caption, "Console" with a caption.

Backgrounds are flat white. Text is black. Monospace is used for inline code tokens inside body. Sidebar labels are black.

## What I can do

- Click Sample A, Sample B, Sample C in the sidebar. They look like anchors.
- Read the prose.
- Nothing else looks interactive. Cards on the right look static. The hairline rules under list items are visual, not controls.

## What this is for — my guess at the job + flow

Best guess: somebody is verifying that markdown fed through a renderer lands as kit-styled HTML. Three samples stress three parts of markdown: prose (A), denser blocks (B), raw HTML passthrough (C). The inspector cards on the right tell me the renderer is "dumb" and a console event fires per article. So this is a dev smoke test. A maintainer flips this page open and checks with their eye: does markdown render look like the rest of the kit.

At 0.2 seconds: I read "md.js smoke test" and I see a document. I don't immediately see that it's three articles — I have to scroll and count. The sidebar tells me there are three samples, so that helps. Passable clarity. Not instant, but understood in one beat.

What I don't get at 0.2s: why two intro paragraphs, with the second paragraph demoted to muted caption. Looks like two kinds of intros when it should be one.

## What's great

- The hero headline "md.js smoke test" lands left-aligned with no ornament. Quiet.
- Inline code tokens sit inside body prose without breaking the line. The monospace face is smaller and slightly condensed so the run doesn't balloon.
- The list items render as dashed entries with hairline separators. That's kit-consistent and I'd recognise this list pattern anywhere in the system.
- The sidebar active state — thin vertical black bar — is a one-pixel move and does its job.
- The inspector column holds its own vertical rhythm and doesn't compete with the doc column.

## What could be better

Typography violations first.

**1. Em-dash inside a headline.** "Sample A — headings, paragraphs, lists, links, inline code" and "Sample B — tables, blockquotes, fenced code, horizontal rules." Both hero headings carry a literal em-dash. The manifesto forbids em-dashes in headlines. Two defects. Non-negotiable.

**2. Rule 12 — Section heading groups with the wrong paragraph.** Under "Sample A —..." the heading "Section heading" has near-identical space above and below. The eye doesn't know whether it leads the paragraph below or closes the paragraph above. Same pattern repeats at "Card-level heading" and at "Subtitle-level heading." All three fail rule 12 on sight. Top margin must exceed bottom margin.

**3. Rule 12 — Sample B hero floats.** The Sample B hero has enormous empty space below it before "Exercises the denser block types..." The gap below the hero appears equal to or greater than the gap above. Rule 12 violated: a heading sits closer to what follows than what precedes. Heading should lead, not float.

**4. Rule 12 — "Samples" heading floats.** The h2 "Samples" sits between the intro block and the Sample A hero with what looks like symmetric space above and below. Ambiguous grouping. Fails rule 12.

**5. Rule 12 — "Lists" heading groups with what came before.** The h2 "Lists" has top space that looks roughly equal to bottom space to "Unordered list:" below. Same defect.

**6. Rule 14 — "Unordered list:" label sits as far from its items as from the previous paragraph.** The label is the list's caption. It should nest tighter with the list than with the surrounding prose. Inner-to-outer inverted. Same issue with "Ordered list:."

**7. Rule 13 candidate — the four-line Sample A headline.** The headline wraps four lines. Line-height on a headline that big is large. The gap from the last line of the hero to the paragraph below looks smaller than the hero's own line-height. Needs a ruler but it trips my eye. Flag.

**8. Rule 9 — page outer margin vs body line-height.** The sidebar text "Smoke" sits tight to the left viewport edge. The gap from the viewport edge to the sidebar group looks small, roughly in the range of the body line-height, possibly under it. If outer margin is below body line-height, rule 9 is violated at the viewport boundary. Needs measurement. Flag.

Now everything else.

**9. Two intros in two weights is one too many.** The top of the doc has a black body paragraph and then a muted caption paragraph under it. Two intros of different rank. A fresh reader does a double-take. Collapse into one or make one clearly metadata (footer row, e.g.).

**10. The "Subtitle-level heading" label weight is weaker than "Card-level heading" above it, which is weaker than "Section heading" above that.** Four heading tiers in a single article is showy for a smoke test. It reads as a demo of the type scale, not as content. Fine for a smoke test on purpose, but the tiers don't feel like a clean descent — card-level heading and subtitle-level heading look too close in weight/size to distinguish at 0.2s.

**11. The muted caption paragraph at the top carries a shell command wrapped in monospace.** A whole shell command ("python3 -m http.server 8765, then open http://localhost:8765/...") rendered as caption-muted prose. If I need to copy this, I can't tell it's a copyable command. Should be a fenced code block or have a copy affordance. Right now it reads as a footnote the user is supposed to ignore.

**12. Sample C content cannot be verified from the screenshots.** The full capture cuts at 3200px before Sample B's table, blockquote, code fence, rule, and before Sample C's cards render. I can judge only what shows. A fresh-eyes verdict on the whole smoke test needs a taller capture. Ask for one.

**13. The horizontal rule before Sample B's hero.** It renders as a faint line. Fine as a rule. But the Sample B hero immediately after has enormous top margin before the rule, and the rule itself sits closer to the paragraph above than to Sample B below. Group ambiguous.

## Verdict

FAIL with 13 flagged defects. Two are non-negotiable on sight (em-dash in headlines, ×2). Four more are rule-12 grouping failures inside single articles. The rest are rhythm and content-choice defects that add up.

Top three:

1. Em-dashes in hero headlines. Two instances. Manifesto violation.
2. Rule 12 failures across Section heading, Card-level heading, Subtitle-level heading, Samples h2, Lists h2, and Sample B hero. Heading top/bottom spacing roughly symmetric — the eye cannot tell what each heading leads.
3. "Unordered list:" and "Ordered list:" labels sit as far from their list items as from the prose above. Rule 14 inner-outer inverted.

Self-doc: `documentation/2026-04-24-markdown-source/phase-1-fresh-eyes-jobs.md`
