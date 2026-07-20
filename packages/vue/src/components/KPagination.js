import { h } from 'vue'

/* Pagination — numeral row with prev/next chevrons and a single ink
   current page. Collapses runs of hidden pages to one gap when the page
   count outruns the window. Chevrons are CSS-drawn (empty edge buttons),
   never a font glyph. Presentational: emits `change` with the target
   page number; the consumer owns the fetch and feeds `current` back. */
export default {
  name: 'KPagination',
  props: {
    pages: { type: Number, required: true },
    current: { type: Number, default: 1 },
    window: { type: Number, default: 5 },
  },
  emits: ['change'],
  setup(props, { emit }) {
    function range(a, b) {
      const out = []
      for (let i = a; i <= b; i++) out.push(i)
      return out
    }

    // Sequence of page numbers, with 'gap' markers where the window
    // skips a run. First and last page are always present.
    function pageItems() {
      const pages = props.pages
      const current = props.current
      const win = Math.max(1, props.window)
      if (pages <= win + 2) return range(1, pages)

      const half = Math.floor(win / 2)
      let start = Math.max(2, current - half)
      const end = Math.min(pages - 1, start + win - 1)
      start = Math.max(2, end - win + 1)

      const items = [1]
      if (start > 2) items.push('gap')
      for (let i = start; i <= end; i++) items.push(i)
      if (end < pages - 1) items.push('gap')
      items.push(pages)
      return items
    }

    return () => {
      const pages = props.pages
      const current = props.current
      const children = []

      children.push(
        h('button', {
          class: 'pagination__edge',
          'data-dir': 'prev',
          'aria-label': 'Previous page',
          type: 'button',
          disabled: current <= 1,
          onClick: () => {
            if (current > 1) emit('change', current - 1)
          },
        }),
      )

      pageItems().forEach((item) => {
        if (item === 'gap') {
          children.push(h('span', { class: 'pagination__gap', 'aria-hidden': 'true' }, '…'))
          return
        }
        children.push(
          h(
            'button',
            {
              class: 'pagination__page',
              type: 'button',
              ...(item === current ? { 'aria-current': 'page' } : {}),
              onClick: () => emit('change', item),
            },
            String(item),
          ),
        )
      })

      children.push(
        h('button', {
          class: 'pagination__edge',
          'data-dir': 'next',
          'aria-label': 'Next page',
          type: 'button',
          disabled: current >= pages,
          onClick: () => {
            if (current < pages) emit('change', current + 1)
          },
        }),
      )

      return h('nav', { class: 'pagination', 'aria-label': 'Pagination' }, children)
    }
  },
}
