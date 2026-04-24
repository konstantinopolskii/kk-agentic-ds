# 2026-04-24 markdown-as-source initiative — not accepted

**Status: not accepted. Do not tag v1.3.0.**

## What landed on origin

All commits reachable from `main`, none tagged:

- `js/md.js` — custom tiny markdown renderer with `data-md-heading-offset` contract + kit CSS class map + scroll-spy re-registration event.
- `demos/md-renderer-smoke/` — three-column smoke test rendering three sample `.md` files through kit typography. Passed round 6 Jobs cold read.
- `skills/kk-design-system/manifesto.md` — 685 lines. Absorbed prose from `index.html` plus §Components, §Protocols, §Ship discipline, §Foundations § Typography rhythm (Lebedev's 14 rules + kit addenda + new shell-chrome rule + new shell-dup ship-check).
- `skills/kk-design-system/components.md` — 35-line stub pointing every consumer at `manifesto.md § Components § <name>`.
- `skills/kk-design-system/voice.md` — adjusted where the absorbed manifesto conflicted.
- 17 SKILL.md + non-skill files updated to load `manifesto.md § Components` instead of `components.md`.
- `index.html` — 767 → 324 lines, reshelled as a thin three-column page with six pointer cards pointing at external kit surfaces and a `data-md-src` container rendering `manifesto.md` inline.
- `style.css` additions: asymmetric heading margins, prose list primitives, quote rule, shell-chrome gap rules, card-inspector divider, preview-frame + preview-frame__iframe primitives, many rule-12 / rule-13 fixes, demoted-h5 path.
- `patterns.html` reshelled in a separate thread of this session (inspector-preview UX, 11 patterns).
- `package.json` + `.claude-plugin/plugin.json` bumped to 1.3.0 in lockstep.
- `CHANGELOG.md` 1.3.0 release entry.

## Not accepted — user's reason, verbatim

> Look. The key problem is that we now have several different documents with md. The main document at the same time looks too much detailed with technical stuff instead of serving philosophy of the system. Same time we also show a lot of different cards in the foundation part, while it's definetely not the thing which I would prefer to start. Before the whole document was more like a thing that was describing how the whole system works, the purpose, the key thing about the agents, and so on. This could be a great starting document. Short. Understandable both by agents and human. Now. The other problem is that now we have lot's of different documents. For example, we have foundation. Which is perfect. But it lists the components and elements and so on in the html format. While expected to be the md. WE have the index prototype for that, it lives in demo. And we should keep all necessary components and it. And in the md iwth foundation we should point on the specific parts of that document, explaining the key details. Same with patterns. It should be the .md file. All the files we observe through the system with agents that serves as documentation should be the .md. And our index.html should be our way to discover those elements from the human side.

## What this means

- No tag. v1.3.0 does not ship.
- The renderer infrastructure is real and correct.
- The content architecture is wrong.
- The main manifesto must return to short philosophy — purpose, how the system works, the agents, how the pipeline fits. Readable at one sitting by human or agent.
- Components and patterns move to `.md` documentation that **points at** the `demos/fundamental--accepted/` and `patterns.html` HTML prototypes for the actual element inventory. The `.md` holds the key details and the navigation into the prototype; the prototype holds the live components.
- Every file the agent reads as documentation is `.md`.
- `index.html` at the repo root is the human-side discovery surface — renders the canon `.md` files + links to the demos.

## Pointer to full retro

`proposals/2026-04-24-retro.md` — Joan Didion whole-initiative retro. Names the pattern that shipped (one home per fact promised, three homes delivered) and 7 proposed changes. Proposals 1, 2, 4, 5, 6 were executed before this rejection. Proposals 3 and 7 were deferred. None of that rework addresses the content-architecture failure named above.

## Next session

Cleared context. Run the standard agent pipeline against the critique above.
