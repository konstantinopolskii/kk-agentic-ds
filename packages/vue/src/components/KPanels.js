import { h } from 'vue'

/* Panels — the 12-column dashboard grid inside app--panels. Children
   span full width by default; cards take a span prop (third, half,
   two-thirds, full) to claim their columns. */
export default {
  name: 'KPanels',
  setup(props, { slots }) {
    return () => h('div', { class: 'panels' }, slots.default?.())
  },
}
