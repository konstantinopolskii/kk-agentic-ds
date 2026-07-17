import { h } from 'vue'

/* Sidebar — brand header, nav, footer. The left column of the
   reading shell. */
export default {
  name: 'KSidebar',
  props: {
    title: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h('aside', { class: 'sidebar', 'aria-label': 'Navigation' }, [
        props.title ? h('div', { class: 'sidebar__header t-title' }, props.title) : null,
        slots.default?.(),
        slots.footer ? h('footer', { class: 'sidebar__footer t-caption' }, slots.footer()) : null,
      ])
  },
}
