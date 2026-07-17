import { h } from 'vue'

/* Front — the news shell grid inside app--front. Masthead, lead
   story (a card with the lead prop), latest rail, section desks. */
export default {
  name: 'KFront',
  setup(props, { slots }) {
    return () => h('div', { class: 'front' }, slots.default?.())
  },
}
