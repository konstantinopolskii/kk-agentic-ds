---
session: 2026-04-24-markdown-source
stage: phase-3-jobs
role: fresh-eyes-jobstory
gate: verdict
---

# Manifesto Page: Cold Read

## What I see

A three-column shell (sidebar nav, main doc, inspector) announcing a design system called "Agentic Design System." The page splits into pointer cards (Inventory + Distribution) pointing to external demos and registries, then a full manifesto markdown blob that renders client-side. At the bottom, stats + a signed-date signoff claim 12 top sections, 9 components, 9 color tokens. The whole thing hinges on JavaScript to fetch, render, and rewrap markdown—a runtime dependency on every page load.

## What I can do

Click buttons to open external pages (fundamental demo, patterns registry, pipeline markdown, maintainer skill). Search the sidebar TOC to jump to sections. Select text to draft comments into a right-panel inspector. The page is readable but only if the markdown fetch succeeds.

## What this is for — my guess

This is the kit's public anchor—where a designer or engineer first lands to understand what the system is, what it contains (inventory), how to use it (distribution), and why it exists (meanings, philosophy, principles, matter, protocols). It's the "single source of truth" for the design system's scope and governance.

## What's great

1. Sidebar nav with hierarchical grouping (Inventory, Distribution, Meanings, Principles, Matter, Protocols, Surfaces) gives clear wayfinding.
2. Pointer cards are consistent in layout and tone—each card names the thing, describes it, links to it.
3. Signoff with stats (9 components, 4 radii, 9 colors, 12 sections) is concrete and memorable.
4. Signed date and founder credit at the bottom add authority and ownership.
5. Hand-written signature SVG reinforces the personal/authentic tone the system claims to have.

## What could be better

1. Manifesto renders client-side from markdown — no fallback if JS fails or fetch times out — index.html:212
2. TOC links point to anchor ids that don't exist until post-render wraps manifesto sections — breaks scroll-spy on page load before JS fires — index.html:206-332
3. "Agentic Design System" title appears in two places (tab title, sidebar header) with inconsistent capitalization + line break — feels ad-hoc — index.html:6, 21
4. Pointer cards have inconsistent CTA labels: "Open fundamental" vs. "Open the registry" vs. "Read pipeline.md" vs. "Open the maintainer skill" — no single verb — index.html:116, 133, 147, 201
5. Distribution section claims "evolve and ship protocols govern how it changes" but then only links to one place (the maintainer skill) — why two sections if one owns the answer? — index.html:172-203
6. Five external links in the Foundations pointer card (demo, tokens.json, manifesto.md, swatches fragment) but only one CTA button — the "Also:" microcopy is a cop-out — index.html:156-167
7. Sidebar footer says "fuckgrechka.ru" — crude domain name on an official kit page reads as either a joke or a mistake; if a joke, it's not clear to a first-time reader — index.html:90
8. Stats at the end (12 top-level sections, 9 components, 9 color tokens, 4 radii) are accurate but buried in tiny text after 30 screens of scrolling — should anchor the hero or open the nav — index.html:216-225
9. Comment inspector on the right side is empty by default and takes up 25% of the viewport on desktop—no content, no hint of what it is, just dead space — index.html:244-253
10. FABs (floating action buttons for mobile) have zero visual affordance on desktop—three unlabeled icon buttons at the bottom right that do nothing until you're on mobile — index.html:347-357
11. Slugify function in the post-render script doesn't handle em-dashes, accented characters, or non-Latin script—if the manifesto ever has those, anchors break — index.html:270-277
12. "Pipeline" appears in two nav groups (Inventory → Pipeline, Protocols → Pipeline) with the same label but different links—one is a card, one is a sidebar link—confusing — index.html:31, 74
13. Section ids are slugified from heading text at runtime—brittle if markdown changes; no schema binding between nav and content — index.html:301-302
14. Data attributes `data-md-src` and `data-md-heading-offset` are non-standard and undocumented in the HTML; consumers won't know what they do — index.html:212
15. Signature image loads from repo root (`./signature.svg`) but lives at the same level as index.html—if repo is served from a subpath, link breaks — index.html:235
16. No meta description or og:image tags—zero SEO or social preview —
17. No cache headers or version query params on manifest render—js/md.js always fetches fresh, no offline mode — index.html:8-9, 265
18. Comment stack in the inspector has no persistence layer—selections draft to memory only; refresh wipes them — index.html:251
19. "Powered by kk.consulting" in footer is a brand claim, not a legal credit—doesn't disclose that this is a system by Konstantin Konstantinopolskii for his own use — index.html:91
20. Viewport meta tag uses `viewport-fit=cover` (notch-aware) but no safe-area insets in CSS—on iPhone with notch, top content may render under the camera — index.html:5

## Verdict: FAIL

The page has a strong editorial voice and a clear structure, but it's held together by runtime JavaScript in ways that break accessibility, resilience, and crawlability. The manifesto should pre-render or ship as inline HTML, not async-fetch-and-wrap on every load. The pointer cards are good, but the nav duplication (Pipeline twice, Meanings/Philosophy appear as links in two groups) and dead UI (empty inspector, mobile-only FABs) add noise. The tone and stats are solid, but the execution feels like a prototype shipped too early. Fix the JS dependency, dedupe the nav, and give the inspector a reason to exist on desktop.

