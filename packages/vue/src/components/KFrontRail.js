import { h } from 'vue'

/* Front rail — the latest column. A tight stack of media rows under
   a title. */
export default {
  name: 'KFrontRail',
  props: {
    title: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h('aside', { class: 'front__rail' }, [
        props.title ? h('h3', { class: 't-title' }, props.title) : null,
        slots.default?.(),
      ])
  },
}
