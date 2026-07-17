import { h } from 'vue'

/* App shell — the outermost frame. doc is the three-column reading
   shell (data-view drives narrow-viewport column swapping); single,
   panels, and front are the one-column product shells. */
export default {
  name: 'KApp',
  props: {
    view: {
      type: String,
      default: 'doc',
      validator: (v) => ['doc', 'single', 'panels', 'front'].includes(v),
    },
  },
  setup(props, { slots }) {
    const shells = {
      doc: { class: 'app', 'data-view': 'doc' },
      single: { class: 'app app--single' },
      panels: { class: 'app app--panels' },
      front: { class: 'app app--front' },
    }
    return () => h('div', shells[props.view], slots.default?.())
  },
}
