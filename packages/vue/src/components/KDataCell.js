import { h } from 'vue'

/* Data table cell — the lead cell is bold, numeric cells right-align
   tabular, delta cells carry the glyph in text. Flat deltas demote
   to regular muted. delta implies num. */
export default {
  name: 'KDataCell',
  props: {
    lead: { type: Boolean, default: false },
    num: { type: Boolean, default: false },
    delta: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () => {
      const cls = props.lead
        ? 'data-table__lead'
        : props.delta
          ? `data-table__num data-table__delta${props.flat ? ' data-table__delta--flat' : ''}`
          : props.num
            ? 'data-table__num'
            : undefined
      return h('td', cls ? { class: cls } : {}, slots.default?.())
    }
  },
}
