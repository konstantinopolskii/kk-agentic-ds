import { h } from 'vue'

/* Chip wrap — the group that owns the 8 px gaps between chips. */
export default {
  name: 'KChipWrap',
  setup(_, { slots }) {
    return () => h('div', { class: 'chip-wrap' }, slots.default?.())
  },
}
