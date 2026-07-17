import { h } from 'vue'

/* Sidebar nav — scroll-spy navigation with the TOC indicator. By
   default the shell ships empty and js/kit.js auto-fills it from the
   book's heading rank at KK.init(). manual opts out and preserves
   hand-curated KNavGroup children. */
export default {
  name: 'KSidebarNav',
  props: {
    id: { type: String, default: 'toc' },
    manual: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'nav',
        {
          class: 'sidebar__nav',
          id: props.id,
          ...(props.manual ? { 'data-nav': 'manual' } : {}),
        },
        [h('span', { class: 'toc__indicator', 'aria-hidden': 'true' }), slots.default?.()],
      )
  },
}
