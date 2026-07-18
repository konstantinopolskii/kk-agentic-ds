import { h } from 'vue'

/* Spark — canonical: bar heights are data (--v percent per bar), the
   chart is monochrome ink, the label states the trend in words.
   Inline sparks render as <span>, panel scale as <div>. `soft` lists
   bar indices demoted to the 20% hairline tone (secondary series).
   `emphasize` inverts the spend: one index keeps full ink, every
   other bar demotes — the canon default for panel sparks, where the
   history is context and the current period is the message. */
export default {
  name: 'KSpark',
  props: {
    values: { type: Array, required: true },
    label: { type: String, required: true },
    panel: { type: Boolean, default: false },
    soft: { type: Array, default: () => [] },
    emphasize: { type: Number, default: null },
  },
  setup(props) {
    const isSoft = (i) =>
      props.emphasize !== null ? i !== props.emphasize : props.soft.includes(i)
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
            class: isSoft(i) ? 'spark__bar spark__bar--soft' : 'spark__bar',
            style: { '--v': `${v}%` },
          }),
        ),
      )
  },
}
