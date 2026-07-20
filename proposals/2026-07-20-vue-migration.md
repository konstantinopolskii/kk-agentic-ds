# Moving the library to Vue: the full option space

Initiative outline. Not canon until stamped. Written to map every path before a Fable
session executes one. No code changes ship with this document.

## The ask

"Move the whole library to Vue instead." The word that decides the work is *instead* —
instead of what. This document names every thing "instead" could replace, prices each,
and states what each one wins and burns. It does not pick one. That call is the user's.

## Alignment, 2026-07-20

The user answered the pivot. Recorded here so the executing session inherits the goal,
not just the option list.

**Business goal.** Keep every feature, every pixel, and the way the kit feels. Make the
library manageable and sustainable with Vue as the one authoring surface.

**The four answers.**

1. *Consumers, next year:* the user's own Vue apps, agents generating pages, and static
   sites/docs. Not external strangers.
2. *The pain to kill — all four:* the three-layer sync burden; `h()` render functions
   hostile to reading; behavior living outside components in `kit.js`; no real toolchain
   (no types, no build, no per-component tests, no HMR).
3. *The agentic-HTML story:* survives **via Vue**. Agents author Vue going forward. Canon
   becomes Vue-truth. Old static pages stay frozen but working.
4. *Maintainer:* the user plus Claude sessions — optimize for agent-editable code with
   strong verification gates.

**The decision this produces: Option B, executed fully, with static-as-artifact.**

One authoring surface — `.vue` single-file components. Everything else derives or freezes:

- `style.css` + `vars.css` — unchanged. The style survives byte-for-byte; no restyle risk.
- The 50 `h()` emitters — replaced by SFCs with templates.
- `js/kit.js` — behavior ports 1:1 into library composables (`useModal`, `useDropdown`,
  `useTabs`, `useTooltip`, `useToast`, `usePagination`, `useScrollSpy`, deck, comments,
  column reveal). Vue consumers import a component and it works; no `KK.init()`.
- Canon — rewritten to document the Vue API. The markup/class contract does not vanish;
  it stops being hand-maintained prose and becomes an automated gate (SSR-render each
  component, assert emitted classes against the CSS contract).
- The static story — static HTML becomes **generated output** of the same Vue components
  (`renderToString` → static page). Proven viable: 20/20 SSR-identical today. Static
  stops being a second authoring surface and becomes a build artifact, which is what
  kills the sync burden without killing the static product.

**Survives:** all behavior (behavior-parity gate), all pixels (CSS untouched), the 20
recreations + kit snapshot (re-pointed at SFCs, zero-pixel gate re-run), the pipeline /
supervisor / maintainer discipline.

**Freezes:** the existing static `.html` demos and `kit.js` — still served, marked
legacy, no new development.

**Retires:** the `h()` emitter layer; hand-maintained HTML canon.

**Default calls, open to override:** semver 2.0.0 in lockstep with the kit (authoring
surface change is major); freeze old static pages rather than regenerate; TypeScript in
SFCs; staged waves, each gated — toolchain scaffold → behavior composables with a parity
checklist → SFC conversion leaf-to-shell with the SSR-markup gate per wave → demos
re-pointed with the zero-pixel gate → canon rewrite → legacy freeze → ship 2.0.0.

The option space below is kept for the record; the sections on B describe the chosen
path's mechanics, and the pivot-question framing explains why C was not taken (static
consumers remain) and why A alone was not enough (all four pains must die, and A kills
only the toolchain one).

## What already holds today

The kit is three layers, on purpose:

1. **CSS + tokens** — `vars.css` + `style.css`, shipped as `@konstantinopolskii/design-system`.
   Nine color tokens, three weights, seven sizes, four radii, seven keyframes. This layer
   owns every pixel. It is the source of truth.
2. **Vue layer** — `packages/vue`, already published-shaped as `@konstantinopolskii/vue`
   `0.1.0`: ESM, `main: src/index.js`, `peerDependencies.vue ^3.5`, `files: ["src"]`.
   50 components, each a thin `h()` emitter of canonical markup. No styles, no class or
   style props. The canon's variants are the API; off-canon output is unrepresentable.
3. **Behavior** — `js/kit.js`, a framework-agnostic plain script. Delegated document
   listeners, idempotent, `KK.init()` / `KK.refresh()`. Owns modal, dropdown, tabs,
   tooltip, toast, pagination, scroll-spy, deck, comment flows.

Two more surfaces sit on top and matter to any migration:

- **Canon / skills** (`skills/kk-design-system/`) — the agent-facing source of truth. It
  describes **HTML markup and class names**. This is the product's actual differentiator:
  an agent authors canonical HTML, the CSS makes it correct. The Vue layer is a convenience
  binding over that same markup, not a second truth.
- **The static story** — every demo exists as plain HTML (`NN-name.html`) and, since the
  port, as a Vue twin (`NN-name.vue.html`). Proven identical: 20/20 SSR-identical, 20/20
  at zero changed pixels. The Vue layer is a faithful re-emitter, not a reinterpretation.

So the Vue package is already ~80% of the cheapest option. What is missing is packaging
polish, types, a behavior-bootstrap, docs, and a publish — not a rewrite.

## The pivot question, under every option

**Who authors, and in what language?**

- If the answer is *agents and humans author canonical HTML, and Vue is a binding for
  teams who want components* — the canon stays HTML-truth and Vue is a projection of it.
  That points at options A, D, E.
- If the answer is *the future is humans authoring `.vue` single-file components, and the
  HTML/agent path is legacy* — the canon becomes Vue-truth and the raw-markup story is
  demoted. That points at options B, C.

Everything below is a consequence of this one choice. Decide it first.

---

## Option A — Package the current layer

Ship `@konstantinopolskii/vue` as a real, serious package. Keep all three layers exactly
as they are.

- **Do:** add TypeScript declarations (`.d.ts` per component, or a single `index.d.ts`);
  keep the buildless ESM entry (or add an optional bundled build); write a Vue **plugin**
  that wraps `KK.init` / `KK.refresh` so consumers never touch kit.js directly (`app.use(KitBehavior)`
  runs init after mount and refresh on route change); document the one CSS import
  (`import '@konstantinopolskii/design-system/style.css'`); write per-component usage docs;
  publish both packages to npm with pinned peer ranges.
- **Effort:** Small–Medium. Mostly packaging, types, one plugin, docs.
- **Wins:** Real install-and-import DX. Fastest path to "a Vue app can use the kit." Keeps
  the doctrine, the framework-agnostic kit.js, and the static story fully intact. Adds types.
- **Costs:** Components stay `h()` — contributors write render functions, not templates.
  Behavior stays external; Vue developers expect self-contained components and must instead
  install a plugin.
- **Risks:** Low. The one sharp edge is the mount-then-`replaceWith` **detach pattern** the
  demos use to produce static DOM. A real app must NOT detach — it keeps components live and
  reactive, and lets the behavior plugin bind. The docs must make this unmistakable, or a
  consumer copies the demo pattern and loses reactivity.

## Option B — Vue-first single-file components

Rewrite the 50 as `.vue` SFCs with templates. CSS stays the source of truth (still
`vars.css` + `style.css`, imported globally — not scoped). Behavior moves into **composables**
(`useModal`, `useDropdown`, `useTabs`, `useTooltip`, `useToast`, `usePagination`,
`useScrollSpy`, `useDeck`, `useComments`), or keeps a thin kit.js bridge for the hardest ones.

- **Effort:** Large. 50 SFC rewrites, a behavior port, and a re-run of the full parity suite
  to prove the SFCs still emit canonical markup.
- **Wins:** Idiomatic Vue authoring. Self-contained components — no external init step. Real
  reactivity in place (live `v-model`, not the detach-static trick). Best DX for both
  contributors and Vue-app consumers.
- **Costs:** Unless kit.js is retired, you maintain behavior twice (delegated script **and**
  composables). The canon describes HTML markup, not SFC templates — so canon and the Vue
  API drift unless one is generated from the other. The agent-authors-HTML story weakens:
  agents target raw markup, humans target SFCs, and the two must stay in lockstep by hand.
- **Risks:** Medium–High. This shifts the authoring surface. The kit's value is "author
  canonical HTML, CSS makes it right." SFCs move authoring into Vue. If agents still emit
  HTML while humans write SFCs, drift between the two is the dominant, permanent failure mode
  — exactly the drift the maintainer protocol is built to prevent, now structural.

## Option C — Full Vue, retire kit.js and the static story

Everything becomes Vue. Behavior lives only in Vue. `js/kit.js` is deleted, the static HTML
demos are dropped, the framework-agnostic claim is retired. CSS could stay global or move to
scoped/module CSS per component.

- **Effort:** Extra-large. Full rewrite, plus retiring two subsystems, plus rebuilding every
  demo as Vue, plus rewriting the canon to describe a Vue API instead of HTML and classes.
- **Wins:** One surface. A clean, single-implementation Vue library with no dual maintenance.
- **Costs:** This is a different product. The canon — the real differentiator — would describe
  Vue components, not HTML/CSS, so the agentic-HTML authoring model is gone. Every non-Vue
  consumer loses the kit entirely. The static demos, the parity proofs, and the "any renderer"
  reach all go away.
- **Risks:** High. Correct only if the entire future is Vue-only apps **and** agents are
  expected to author Vue. Otherwise it trades the kit's widest advantage for tidiness.

## Option D — Dual-publish, Vue as a first-class sibling

Keep the CSS + kit.js core, ship the polished Vue package (Option A), and optionally add SFC
wrappers (Option B) as an alternate entry point. Consumers pick their surface.

- **Effort:** Medium, and ongoing.
- **Wins:** Maximal reach. No bridges burned. HTML consumers, script consumers, and Vue
  consumers all served.
- **Costs:** The largest surface to keep in sync. Every kit change must land in CSS, canon,
  the h() layer, and any SFC layer together.
- **Risks:** Medium — drift, the maintainer skill's named worst-case, multiplied by the number
  of parallel surfaces.

## Option E — Generate the Vue layer from one spec

The components are deterministic emitters of canonical markup. So generate them. Author one
machine-readable component spec (an extension of the canon), and a codegen produces the Vue
layer — and React, Svelte, web components, whatever — from it. One source, many outputs.

- **Effort:** Large upfront (build the spec format + the generator), then near-zero per
  component thereafter.
- **Wins:** Zero drift by construction — the canon stays the single source and every binding
  is derived, never hand-kept. Framework-agnostic and Vue-first at the same time. New
  frameworks are almost free.
- **Costs:** You build and maintain a code generator. The spec must capture real logic, not
  just markup — a handful of components carry it (`pagination`'s window collapsing, `spark`'s
  `soft`/`emphasize` demotion, `chip-wrap`'s selection provide/inject, `data-table`'s slot
  rows). Those need either a richer spec or a per-component escape hatch.
- **Risks:** Medium — generator complexity, and the escape hatches for the ~6 logic-heavy
  components have to stay clean or the "one source" claim leaks.

---

## Cross-cutting concerns, whichever option wins

- **CSS delivery is the doctrine anchor.** Keep the global `vars.css` + `style.css` import.
  It is the source of truth and the thing the canon and the parity proofs are written against.
  Moving to scoped/module CSS per component forks the stylesheet, breaks canon coupling, and
  voids parity. Only Option C would even consider it, and it should not.
- **Behavior: bridge or port.** Keeping `kit.js` and calling `refresh()` on mount/route-change
  is the cheap, proven route (A, D). Porting to composables is the clean-Vue route (B, C) and
  costs a second implementation until the script is retired.
- **The detach pattern is demo-only.** `mount(host)` then `replaceWith(...host.children)`
  exists to produce static DOM identical to the hand-written HTML, for the parity proof. A
  real app never does this — it keeps the app live. Any packaging doc must say so loudly.
- **Types are a real DX win.** A serious Vue package wants `.d.ts` (hand-written) or a move to
  TS source with a build. Needed for autocomplete, prop validation, and confidence.
- **SSR / Nuxt already works.** The `h()` layer renders under `@vue/server-renderer` today
  (that is how parity is proven). SFCs SSR too. Keep `setup` free of direct DOM so it stays
  SSR-safe.
- **Canon coupling is the strategic knot.** Canon describes HTML + classes — the agent contract.
  Decide explicitly whether canon stays HTML-truth (agents author HTML; Vue is a projection) or
  becomes Vue-truth (agents author Vue). Do not let it drift by accident; that decision is the
  migration.
- **Versioning.** `packages/vue` is `0.1.0`, decoupled from kit `1.16.0`. Decide the coupling:
  lockstep (one version, one release, simplest to reason about) or independent semver (the Vue
  binding versions on its own cadence). Lockstep matches the current bundle discipline.

## A staged path, offered not chosen

If the pivot question answers "canon stays HTML-truth, Vue is a binding":

1. **Ship Option A now.** Cheap, reversible, immediately useful. A Vue app can install and use
   the kit this week. Types, a behavior plugin, docs, publish.
2. **Prototype Option E next.** Prove the codegen on ten components. If it holds, it is the
   drift-proof long game and makes B's ergonomics reachable without B's dual-maintenance cost.
3. **Treat B / C as only-if-Vue-only-future.** They are correct only if authoring itself moves
   to Vue. They are not cheaper or safer than A + E; they are a different product.

If the pivot answers "the future is Vue authoring," B is the honest target and C the endgame —
but go in knowing the canon and the agentic-HTML story are being rewritten, not extended.

## What not to do

- Do not scope the CSS per component. It forks the source of truth.
- Do not maintain two behavior implementations silently. If kit.js and composables both exist,
  one must generate or wrap the other, on the record.
- Do not let the canon drift from whichever surface is truth. Pick the truth, write it down,
  gate on it.
- Do not copy the demo detach pattern into the packaged consumer path. It is a parity tool,
  not a usage pattern.

## Decision the user owns

1. The pivot: canon stays HTML-truth, or becomes Vue-truth?
2. Given that, which option (A / B / C / D / E), or a staged combination?
3. Version coupling: lockstep with the kit, or independent semver?

Once stamped, this routes to `kk-ds-maintainer` for the bundle discipline (code + canon +
CHANGELOG + version + integration docs) on whatever surface the decision makes canonical.
