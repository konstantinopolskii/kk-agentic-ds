import { h } from 'vue'

/* Field, display form — a read-only label and value sharing one row.
   The 0.5 px divider between consecutive fields comes from the CSS,
   never above the first or below the last. */
export default {
  name: 'KFieldRow',
  props: {
    label: { type: String, required: true },
    value: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'field field--row' }, [
        h('span', { class: 't-caption--bold field__label' }, props.label),
        h('span', { class: 't-caption field__value' }, slots.default ? slots.default() : props.value),
      ])
  },
}
