# Pagination — integration

How a consumer wires the kit's pagination component to a data source. Covers the DOM contract beyond the `components.md § Pagination` inventory: the event, the data attributes, the optimistic aria-current, and the Vue emitter.

Scope: pagination only. This file does not cover data table, status feed, or any other component that hosts a pager.

## Presentational, event-driven

Pagination owns none of the data. It renders a numeral row, moves `aria-current` to the clicked page, and fires one event carrying the target page number. The consumer listens, fetches the slice, and re-renders the pager with the new `current`. There is no `KK.*` method — the event is the whole contract.

## Data attributes

Set in the markup; the kit reads them.

| Attribute | Element | Meaning |
|-----------|---------|---------|
| `aria-current="page"` | `.pagination__page` | The active page. Exactly one per nav. The kit moves it on click. |
| `data-dir="prev"` / `data-dir="next"` | `.pagination__edge` | Which direction the edge steps. The kit resolves it to the current page ± 1. |
| `disabled` | `.pagination__edge` | First-page prev / last-page next. The kit ignores clicks on it. |
| `aria-hidden="true"` | `.pagination__gap` | The collapsed run. Never clickable, carries no page number. |

## DOM event: `kk:page-change`

Dispatched on the `.pagination` nav, bubbling, whenever a page or an enabled edge is clicked to a page other than the current one.

```js
document.querySelector('.pagination').addEventListener('kk:page-change', function (e) {
  var page = e.detail.page;        // the target page number (Number)
  var previous = e.detail.previous; // the page it moved from, or null
  loadThreads(page);
});
```

`detail.page` is the resolved target: the clicked numeral, or `previous ± 1` for an edge. Edge clicks fire even when the target page is not currently drawn — the row shows a window, and stepping past its end is valid. In that case the kit leaves `aria-current` where it was and expects the consumer to re-render the numerals for the new page.

### Optimistic marker

On click the kit moves `aria-current` to the matching visible numeral before the event fires, so the row updates without waiting on the fetch. If the fetch fails, re-render the pager with the old `current` to correct it. If the target page has no visible button (an edge stepping past the window), the marker stays put until you re-render.

## Behavior module

`initPagination()` binds one delegated `click` listener on `document`, guarded so `KK.refresh()` never double-binds. It is called from `KK.init()` and `KK.refresh()` alongside the other `init*` modules. A page injected after load is picked up with no extra wiring, because the listener is delegated.

## Vue: `KPagination`

The Vue emitter is the framework-native path. It computes the window and gaps from props and emits `change` with the target page number.

```html
<KPagination :pages="12" :current="4" :window="5" @change="onPage" />
```

| Prop | Type | Default | Meaning |
|------|------|---------|---------|
| `pages` | Number | required | Total page count. |
| `current` | Number | `1` | The active page. |
| `window` | Number | `5` | Numerals shown around the current page before gaps collapse the rest. |

```js
function onPage(page) {   // Number: the target page
  fetchPage(page)         // then update `current` from the response
}
```

`change` is the emitter's equivalent of the DOM `kk:page-change` event. The component is controlled: it does not hold its own `current`. Feed the new page back through the `current` prop after the fetch resolves.

## Common mistakes

- Removing a disabled edge instead of keeping it at `0.3` opacity. The row must not reflow as the user reaches the ends.
- Two numerals carrying `aria-current="page"`. There is exactly one active page per nav.
- Wiring the edge chevrons with a font glyph (`‹` `›`). They are CSS-drawn; the empty `.pagination__edge` button draws its own chevron.
- Treating `kk:page-change` as confirmed navigation. It is a request. The consumer decides whether the fetch succeeds and re-renders accordingly.
