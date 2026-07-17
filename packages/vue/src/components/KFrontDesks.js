import { h } from 'vue'

/* Front desks — the section grid under the hairline. Three-up link
   cards. */
export default {
  name: 'KFrontDesks',
  setup(props, { slots }) {
    return () => h('section', { class: 'front__desks' }, slots.default?.())
  },
}
