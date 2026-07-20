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
- **composables** · `toast`, `useScrollSpy`, `useNarrowView`, `useColumnReveal`, `useInspectorStack`, `useDeck`, `useCommentFlow`, `useCommentStore`, `useCommentSecret`

## Behavior model

Components wire their own behavior on mount. No separate script binds to the rendered DOM. `KApp` runs the `[data-view]` toggle; `KSidebarNav` auto-fills the TOC from the book's headings via `useScrollSpy` (pass `manual` to keep hand-curated `KNavGroup` children instead); `KModal`, `KDropdown`, `KTabs`, `KTooltip` are self-contained. Shells that own page-level behavior take a `:behavior="false"` prop to opt out, for a hand-rolled page that wants the markup without the wiring.

`toast()` is a standalone service, not a component. Call it from anywhere and it builds its own stack on `document.body`.

```js
toast('Draft saved', { action: 'Undo', onAction: () => undo() })
```

The comment flow (draft, thread, menus, persistence) is composed from `useCommentFlow` and `useCommentStore`. A page wires only the composables it needs.

## Build and test

```
npm run build      # vite build → dist/index.js + bundled dist/index.d.ts
npm test           # vitest run
npm run typecheck  # vue-tsc --noEmit
```

Three parity gates, each stricter than the last:

- **`tests/parity`** · every component against the frozen `h()` oracle at `../../src`, markup for markup.
- **`port_check.mjs`** · SSR structural parity, 20 pages rendered through the Vue module and diffed against the frozen static demos in `demos/reference-recreations`. 20/20.
- **pixel harness** (`parity/`) · `static*.html` goldens against `vue*.html` twins, screenshot-diffed at fixed viewports through headless Chrome. 0 pixels different.

## Static pages

`ssg.mjs` renders any page module to a self-contained HTML file: SSR body paints with zero JS, then a module script hydrates the same component in place.

```
node ssg.mjs <page-module.js> <out.html> --title "Page title"
```

## Legacy

`../../src` is the frozen `h()` oracle. Never edit it: it exists only for the parity tests to gate against. `../../js/kit.js` is frozen for the old static demos; nothing in this package loads it.
