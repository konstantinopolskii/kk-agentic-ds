import { h } from 'vue'

/* Tag — canonical: <span class="tag">. Never a link, never a button.
   Bold variant marks a state worth ink. */
export default {
  name: 'KTag',
  props: {
    bold: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      h('span', { class: props.bold ? 'tag tag--bold' : 'tag' }, slots.default?.())
  },
}
