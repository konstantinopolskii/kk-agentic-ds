import { h } from 'vue'

/* Avatar — initials on a surface disc. Empty stays a plain disc. */
export default {
  name: 'KAvatar',
  setup(props, { slots }) {
    return () => h('span', { class: 'avatar' }, slots.default?.())
  },
}
