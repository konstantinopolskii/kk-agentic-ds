import { h } from 'vue'

/* Inspector group — a titled cluster of cards. Hairlines between
   sibling cards come from the CSS; heading cards are excluded. */
export default {
  name: 'KInspectorGroup',
  setup(props, { slots }) {
    return () => h('section', { class: 'inspector__group' }, slots.default?.())
  },
}
