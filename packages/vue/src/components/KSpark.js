import { h } from 'vue'

/* Spark — canonical: bar heights are data (--v percent per bar), the
   chart is monochrome ink, the label states the trend in words.
   Inline sparks render as <span>, panel scale as <div>. `soft` lists
   bar indices demoted to the 20% hairline tone (secondary series). */
export default {
  name: 'KSpark',
  props: {
    values: { type: Array, required: true },
    label: { type: String, required: true },
    panel: { type: Boolean, default: false },
    soft: { type: Array, default: () => [] },
  },
  setup(props) {
    return () =>
      h(
        props.panel ? 'div' : 'span',
        {
          class: props.panel ? 'spark spark--panel' : 'spark',
          role: 'img',
          'aria-label': props.label,
        },
        props.values.map((v, i) =>
          h('span', {
            class: props.soft.includes(i) ? 'spark__bar spark__bar--soft' : 'spark__bar',
            style: { '--v': `${v}%` },
          }),
        ),
      )
  },
}
