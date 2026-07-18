import { h } from 'vue'

/* Card body — the kit's content-injection wrapper. Half-inset puts
   children on the 24 px text rail; flex column with the space-4 gap.
   KCardCollapsible wraps its slot in one automatically; reach for it
   directly when a static card groups injected prose. */
export default {
  name: 'KCardBody',
  setup(props, { slots }) {
    return () => h('div', { class: 'card__body' }, slots.default?.())
  },
}
