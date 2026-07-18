# @konstantinopolskii/vue

Vue 3 layer for the KK agentic design system. Components are thin emitters of canonical kit markup: they own structure and behavior, `vars.css` + `style.css` own every pixel. No build step — plain ESM modules with `h()` render functions.

## Base rules

1. **CSS is law.** No component ships styles. No scoped styles, no CSS-in-JS, no utility classes. A component that needs new CSS goes through the evolve protocol in the kit repo first.
2. **Props are the canon's variants, nothing else.** No `class` prop, no `style` prop. Off-canon output is unrepresentable.
3. **Every component answers to the parity harness.** Rendered output must match the canonical markup pixel for pixel.
4. **New components take behavior from a headless base and skin in kit vocabulary.** The skin lands in `style.css` so plain-HTML consumers get the same component.
5. **Voice lives in slots.** Components enforce structure, never copy.

## Behavior split

Components carry simple state: chip segment groups (`v-model` on `KChipWrap`), switch and field `v-model`, comment draft emit. Everything heavier — scroll-spy TOC, card-stack promotion, comment menus and edit flows, narrow-viewport column swaps — stays in `js/kit.js`, which binds to the same DOM these components emit. Load `kit.js` as a classic script in the head: it binds `KK.init` to DOMContentLoaded, which fires after module scripts run, so the Vue tree is mounted before the kit walks it. The behavior layer cannot tell the renderers apart.

`demo/index.html` is the live proof — a full doc shell rendered by Vue and driven by kit.js: column reveal cascade on first paint, auto-filled sidebar TOC with the gliding indicator, interactive card promotion (`inspector-card-focus`), and the whole comment flow (select text in the book, the draft appears in the stack, Enter forms the thread, localStorage persists it). Vue reactivity and kit DOM mutations coexist: a re-render patches only what Vue tracks and leaves the kit's injected nav, threads, highlights, and `data-state` flips alone.

`demo/panel.html` is the breadth proof — twenty product slices on the panels shell: forms, rosters, sparks, metrics, a data table with delta glyphs, switch stacks, live chip segments, one shout, and a full-span signoff. No kit.js needed; the panels shell has no book, sidebar, or inspector. Chip and switch state runs on Vue refs.

## Components

| Component | Canonical markup |
|---|---|
| `KApp` | `div.app` · `view`: doc, single, panels, front |
| `KSidebar` | `aside.sidebar` · `title`, `#footer` |
| `KSidebarNav` | `nav.sidebar__nav#toc` + `toc__indicator` · `manual` opts out of auto-fill |
| `KNavGroup` | `section.nav-group` · `head`, `href`, `items` |
| `KBook` / `KBookSection` | `main.book` / `article.book__section` |
| `KInspector` / `KInspectorGroup` | `aside.inspector` / `section.inspector__group` |
| `KPanels` | `div.panels` 12-column grid; cards claim columns via `span` |
| `KFront` + masthead, rail, desks | the news shell: `div.front`, `front__masthead`, `front__rail`, `front__desks` |
| `KCard` | `div.card` · `variant`: static, interactive, link, shout, heading · `state`, `tight`, `selectable`, `span`, `lead` |
| `KCardHeading` | `div.card__heading` · `title`, `subtitle`, `muted` |
| `KCardCollapsible` | `div.card__collapsible > div.card__collapsible-inner` |
| `KCardStack` | `div.card-stack` · `columns`; promotion runs in kit.js |
| `KCommentNew` | `card--shout.comment-new` draft · `v-model`, emits `commit` |
| `KCommentThread` | `card--interactive.comment-thread` · `messages` with ids and author roles |
| `KButton` | `button.button.t-subtitle` · `primary`, `as="span"`, `cta`, `caption` (media trail) |
| `KChip` / `KChipWrap` | `button.chip[aria-pressed]` in `div.chip-wrap` · wrap `v-model` + chip `value` = segment group |
| `KField` | `label.field` input or textarea · `v-model`, `row`, `fakeCaret` |
| `KFieldRow` | `div.field.field--row` display pair · `label`, `value` |
| `KSwitch` | `label.switch` checkbox + track · `v-model`, `label` |
| `KTag` | `span.tag` · `bold` |
| `KAvatar` | `span.avatar` |
| `KMedia` | `div.media` or `a.media` · `title`, `meta`, `micro`, `initials`, `square`, `trailTag`, `#trail`, `#figure` |
| `KQuote` | `blockquote.quote` · `cite` |
| `KDivider` | `hr.divider` |
| `KList` | `ul/ol.t-list` · `ordered`, `items` or `<li>` slot |
| `KCode` | `span.t-code` or `pre.t-code--block` · `block` |
| `KFigure` | `figure.figure` · `caption` |
| `KSpecList` | `dl.book__spec` · `variant`: plain, value, triple · `rows` |
| `KStat` / `KSignoff` | `div.stat` / `div.book__signoff` · stats (2 or 4, never 3), byline, signature |
| `KMetric` | `div.metric` · `value`, `label`, `delta` |
| `KSpark` / `KSparkLabels` | `span/div.spark` bars via `--v` / `div.spark-labels` |
| `KDataTable` / `KDataCell` | `table.data-table` · `columns`; cells `lead`, `num`, `delta`, `flat` |
| `KPreviewFrame` | `div.preview-frame > iframe` · kit docs only |
| `KRegistryTable` | `table.registry-table` · kit docs only |

## Parity harness

Each `static*.html` is a golden: hand-written canonical markup. The matching `vue*.html` renders the same surface through the components and swaps the mount div for its children so the DOM trees align. Both screenshot at the same viewport through headless Chrome; the diff must be zero pixels.

```
python3 -m http.server 8123          # repo root — ESM needs http, not file://
# screenshot both pages at the same viewport, ImageChops.difference, assert 0
```

| Pair | Surface | Viewport | Result |
|---|---|---|---|
| `static.html` / `vue.html` | buttons, chips, tags, metrics, sparks | 900×760 @2x | 2 736 000 px, 0 different |
| `static2.html` / `vue2.html` | all card variants, fields, switch, media, quote, lists, code, spec, tables, figure, signoff | 900×4400 @2x | 15 840 000 px, 0 different |
| `static3.html` / `vue3.html` | full doc shell: sidebar + manual nav, book, inspector, comments | 1400×900 @2x | 5 040 000 px, 0 different |

23 616 000 pixels compared, 0 different.
