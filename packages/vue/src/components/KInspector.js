import { h } from 'vue'

/* Inspector — the right column. Actions, comments, pointer groups. */
export default {
  name: 'KInspector',
  props: {
    label: { type: String, default: 'Actions and comments' },
  },
  setup(props, { slots }) {
    return () => h('aside', { class: 'inspector', 'aria-label': props.label }, slots.default?.())
  },
}
