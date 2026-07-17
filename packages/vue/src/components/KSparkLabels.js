import { h } from 'vue'

/* Spark labels — direct labels under a panel spark. First, peak,
   last. A legend is a failure to label directly. */
export default {
  name: 'KSparkLabels',
  props: {
    labels: { type: Array, required: true },
  },
  setup(props) {
    return () =>
      h('div', { class: 'spark-labels' }, props.labels.map((label) => h('span', label)))
  },
}
