import { h } from 'vue'

/* Book section — one article per section; the id anchors the nav. */
export default {
  name: 'KBookSection',
  props: {
    id: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'article',
        { class: 'book__section', ...(props.id ? { id: props.id } : {}) },
        slots.default?.(),
      )
  },
}
