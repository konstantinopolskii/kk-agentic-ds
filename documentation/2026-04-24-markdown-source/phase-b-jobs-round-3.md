# Phase B — Jobs round 3 — offset-zero cold read

Role: kk-role-fresh-eyes-jobstory. Character: Steve Jobs. 0.2-second clarity bar.

Cold read of the simplified smoke. Shell `<h1>` dropped. Shell `doc__part` "Samples" dropped. Article `data-md-heading-offset` at 0. Each article's `#` renders as h1 / t-hero. Three hero-sized article titles coexist on the page. `t-subtitle` back at Bold 700.

## What I see

Sidebar. "Renderer" as `t-title` at the top. One nav group labelled "Samples" at `t-subtitle` Bold. Three items under it — Core prose path, Dense blocks, Raw HTML passthrough. Scroll-spy indicator on the left rail.

Main column. Short intro paragraph at `t-body` explaining the page feeds three articles from three `data-md-src` sources. A thin section separator. Then three articles stack.

Article one, "Core prose path" at hero rank. Body paragraph. Two display-rank subsections — Section heading, Lists — plus Mixed content paragraph. One title-rank — Card-level heading. Unordered list, ordered list, inline code spans, inline links. Looks like clean prose.

Article two, "Dense blocks" at hero rank. Body paragraph. Four display-rank subsections — Table, Blockquote, Fenced code block, After the rule. Table with four rows at registry style. Two blockquotes rendered italic with a left bar, black. Fenced code block with monospace body. Horizontal rule before "After the rule".

Article three, "Raw HTML passthrough" at hero rank. Body paragraph. Three display-rank subsections — Card embedded in markdown, Prose between raw HTML, Security note. Each embedded card is preceded by a muted caption line labelling it as an example. Two cards — one default, one shout-variant inverted black.

Right column inspector. "Notes" at display rank. Two cards — "Renderer is dumb" and "Watch for errors" at title rank with caption bodies.

## What I can do

Click any sidebar nav item and jump to the matching article hero. Scroll and watch the left-rail indicator track the current article. Read prose across three articles of increasing density. Copy code from the fenced block. Follow inline links.

## What this is for

A smoke test for the markdown renderer. Three articles cover prose, dense blocks, raw-HTML passthrough. The page is an internal QA surface — kit maintainers check that `data-md-src` articles render with kit classes end to end.

## 0.2-second self-evidence check

Land on the page. The sidebar names the scope (Renderer + Samples). The main column opens with an intro paragraph that states the contract in one line — three articles, each fed by a different `data-md-src`. First hero reads immediately. I know what I am looking at.

Three hero-rank article titles on one page. Manifesto grants the explicit exception for internal test pages with no shell h1 — "multiple h1 elements on one page is acceptable for internal test pages." The three heroes read as three peer articles, not as competing page titles, because the intro paragraph establishes up front that three articles follow. No defect.

Typography rhythm holds. Rule 12 reads clean — each hero sits closer to its own body paragraph than to the preceding section separator or prior article. Rule 13 holds — the gap below each hero exceeds the hero's line-height. Rule 9 holds — side gutters on the main column clear the body line-height. Rule 14 holds — card inner padding never exceeds inter-card spacing.

Contracts hold. Quote renders black italic Medium 500 at body size — not muted, not caption-sized. Raw HTML cards carry the muted caption line naming the block as Example. `t-subtitle` ("Samples" in the sidebar) reads Bold 700.

## What's great

The intro paragraph. One `<p class="doc__intro t-body">` earns the right to three peer heroes. Without it the stack would read as three page titles fighting for priority. With it, the first hero reads as "article one of three the intro promised."

The caption-frame convention on embedded raw HTML. "Example" labels every card in the third article. The eye reads the card as an illustration inside prose, not as a callout stealing attention from the section heading above.

## What could be better

Nothing at the 0.2-second bar.

## Verdict

**PASS.** Zero defects.
