import { h } from 'vue'

/* Stat — a lone number inside prose. Bold value, regular sentence.
   Lives in signoff stats grids; panels reach for metric instead. */
export default {
  name: 'KStat',
  props: {
    value: { type: String, required: true },
    text: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h('div', { class: 'stat t-caption' }, [
        h('div', [h('span', { class: 't-caption--bold' }, props.value), ` ${props.text}`]),
      ])
  },
}
