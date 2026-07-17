import { h } from 'vue'

/* List — caption-sized hairlined list. Bullet (ul) or decimal (ol)
   markers in the left gutter, Bold 700. Pass strings via items or
   author <li> elements in the default slot. */
export default {
  name: 'KList',
  props: {
    ordered: { type: Boolean, default: false },
    items: { type: Array, default: null },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.ordered ? 'ol' : 'ul',
        { class: 't-list' },
        slots.default ? slots.default() : (props.items || []).map((item) => h('li', item)),
      )
  },
}
