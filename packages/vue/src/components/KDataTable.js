import { h } from 'vue'

/* Data table — product rows at density. Header micros over a strong
   hairline, numbers right-aligned tabular. Columns take a string or
   { label, num }. Body rows come through the default slot as <tr>
   elements built from KDataCell. */
export default {
  name: 'KDataTable',
  props: {
    columns: { type: Array, required: true },
  },
  setup(props, { slots }) {
    return () =>
      h('table', { class: 'data-table' }, [
        h('thead', [
          h(
            'tr',
            props.columns.map((c) => {
              const col = typeof c === 'string' ? { label: c } : c
              return h(
                'th',
                { scope: 'col', ...(col.num ? { class: 'data-table__num' } : {}) },
                col.label,
              )
            }),
          ),
        ]),
        h('tbody', slots.default?.()),
      ])
  },
}
