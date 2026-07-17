import { h } from 'vue'

/* Book — the reading column. Owns the scroll in the doc shell. */
export default {
  name: 'KBook',
  props: {
    id: { type: String, default: 'doc' },
  },
  setup(props, { slots }) {
    return () => h('main', { class: 'book', id: props.id }, slots.default?.())
  },
}
