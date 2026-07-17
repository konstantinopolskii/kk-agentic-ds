import { h } from 'vue'

/* Figure — media or diagram with an optional caption underneath. */
export default {
  name: 'KFigure',
  props: {
    caption: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h('figure', { class: 'figure' }, [
        slots.default?.(),
        props.caption ? h('figcaption', props.caption) : null,
      ])
  },
}
