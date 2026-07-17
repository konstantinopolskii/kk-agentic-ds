import { h } from 'vue'

/* Metric — canonical: value first, label second, delta third. Delta
   direction rides the glyph the author writes (▲ ▼), never a color. */
export default {
  name: 'KMetric',
  props: {
    value: { type: [String, Number], required: true },
    label: { type: String, default: '' },
    delta: { type: String, default: '' },
  },
  setup(props) {
    return () =>
      h('div', { class: 'metric' }, [
        h('p', { class: 'metric__value' }, String(props.value)),
        props.label ? h('p', { class: 'metric__label' }, props.label) : null,
        props.delta ? h('p', { class: 'metric__delta' }, props.delta) : null,
      ])
  },
}
