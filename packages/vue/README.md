# @konstantinopolskii/vue

Vue 3 layer for the KK agentic design system, 2.0. Single-file components are the one authoring surface. They own structure and behavior; `../../vars.css` + `../../style.css` own every pixel. No component ships styles: no scoped CSS, no CSS-in-JS, no utility classes. A component that needs new CSS goes through the evolve protocol in the kit repo first.

## Install and use

Import components and composables from `dist`, the built ESM output. `vue` is external; bring your own Vue 3.

```js
import { KButton, KModal, toast } from '../../packages/vue/dist/index.js'
```

The export surface is `sfc/index.ts`. Groups:

- **prose** · `KTag`, `KAvatar`, `KQuote`, `KDivider`, `KList`, `KCode`, `KFigure`
- **controls** · `KButton`, `KChip`, `KChipWrap`, `KField`, `KFieldRow`, `KSwitch`
- **cards** · `KCard`, `KCardHeading`, `KCardBody`, `KCardCollapsible`, `KCardStack`
- **data** · `KMetric`, `KSpark`, `KSparkLabels`, `KDataTable`, `KDataCell`, `KSpecList`, `KStat`, `KSignoff`
- **kit-doc** · `KPreviewFrame`, `KRegistryTable`, `KMedia`
- **interactive** · `KModal`, `KDropdown`, `KTabs`, `KTooltip`, `KToast`, `KPagination`
- **comments** · `KCommentNew`, `KCommentThread`, `KCommentStack`
- **shells** · `KApp`, `KBook`, `KBookSection`, `KSidebar`, `KSidebarNav`, `KNavGroup`, `KInspector`, `KInspectorGroup`, `KPanels`, `KFront` + `KFrontMasthead`, `KFrontRail`, `KFrontDesks`
- **composables** · `toast`, `useScrollSpy`, `useNarrowView`, `useColumnReveal`, `useInspectorStack`, `useDeck`, `useCommentFlow`, `useCommentStore`, `useCommentSecret`, `useCommentMenus`
- **markdown** · `renderMarkdown`

## Behavior model

Components wire their own behavior on mount. No separate script binds to the rendered DOM. `KApp` runs the `[data-view]` toggle; `KSidebarNav` auto-fills the TOC from the book's headings via `useScrollSpy` (pass `manual` to keep hand-curated `KNavGroup` children instead); `KModal`, `KDropdown`, `KTabs`, `KTooltip` are self-contained. Shells that own page-level behavior take a `:behavior="false"` prop to opt out, for a hand-rolled page that wants the markup without the wiring.

`toast()` is a standalone service, not a component. Call it from anywhere and it builds its own stack on `document.body`.

```js
toast('Draft saved', { action: 'Undo', onAction: () => undo() })
```

The comment flow (draft, thread, menus, persistence) is composed from `useCommentFlow` and `useCommentStore`. A page wires only the composables it needs.

## Markdown

`renderMarkdown(md, { headingOffset })` turns markdown into kit-classed HTML: the same dialect `js/md.js` rendered, ported 1:1 and gated byte-identical by `md_check.mjs`. Pure string in, string out — no DOM, no fetch, SSR-safe. Pages either bake content at build time (`?raw` import, see `sfc/pages/manifesto.vue`) or fetch and inject after mount (see `sfc/pages/doc-viewer.vue`). `headingOffset` shifts every heading rank down; 0 means the document's own `#` is the page hero.

## Build and test

```
npm run build      # vite build → dist/index.js + bundled dist/index.d.ts
npm test           # vitest run
npm run typecheck  # vue-tsc --noEmit
```

The parity gates, each scoped to one surface:

- **`tests/parity`** · every component against the frozen `h()` oracle at `src/`, markup for markup.
- **`page_check.mjs`** · SSR structural parity for `sfc/pages/*.vue` against the frozen statics in `demos/reference-recreations`. Normalizes serialization artifacts (attribute order, class token order, void self-close) so pages use real components, not markup hacks. 20/20.
- **`patterns_check.mjs`** · same check for the pattern pages against `demos/fundamental--accepted`. 14/14.
- **`md_check.mjs`** · `renderMarkdown` against the frozen `js/md.js` in a real DOM, byte-exact, across three samples plus the manifesto itself. 4/4.
- **`manifesto_check.mjs`** · the manifesto page: SSR renders, book equals `renderMarkdown` output, generated root `index.html` in sync with the source.
- **pixel harness** (`parity/`) · `static*.html` goldens against `vue*.html` twins, screenshot-diffed at fixed viewports through headless Chrome. 0 pixels different.

## Static pages

Pages live in `sfc/pages/*.vue` and build through `vite.pages.config.ts` into `dist/pages/<name>.js`, one module per page, with `vue` and the kit external. `ssg.mjs` renders any page module to a self-contained HTML file: SSR body paints with zero JS, then a module script hydrates the same component in place over an importmap.

```
npx vite build -c vite.pages.config.ts
node ssg.mjs dist/pages/<name>.js <out.html> --title "Page title" [--css href ...]
```

`--css` adds a page-local stylesheet after `style.css`, emitted verbatim. Only the board and poster recreations need it: their layout lives in `demos/reference-recreations/lab.css`, the experiment sheet the canon does not carry, copied to `demos/generated/lab.css` so the gallery is self-contained. Every other page renders on `vars.css` + `style.css` alone.

Generated sets: `demos/generated/` (reference recreations), `demos/generated/fundamental/` (pattern pages), `demos/kit-snapshot/`, `demos/comments/`, `demos/md-renderer-smoke/`, and the repo root `index.html` + `doc.html`.

## Legacy

`src/` is the frozen `h()` oracle. Never edit it: it exists only for the parity tests to gate against. `../../js/kit.js` and `../../js/md.js` are frozen for the old static demos; nothing in this package loads them — `md_check.mjs` reads `md.js` only as the parser's parity oracle.
