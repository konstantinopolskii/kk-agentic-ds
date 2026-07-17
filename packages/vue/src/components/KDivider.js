import { h } from 'vue'

/* Divider — 0.5 px hairline break between sections inline with text. */
export default {
  name: 'KDivider',
  setup() {
    return () => h('hr', { class: 'divider' })
  },
}
