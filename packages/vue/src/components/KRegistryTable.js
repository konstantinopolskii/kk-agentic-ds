import { h } from 'vue'

/* Registry table — dense two-column inventory for kit docs only.
   Header cells at t-caption; body rows come through the default
   slot as <tr> of td.t-body cells. */
export default {
  name: 'KRegistryTable',
  props: {
    columns: { type: Array, required: true },
  },
  setup(props, { slots }) {
    return () =>
      h('table', { class: 'registry-table' }, [
        h('thead', [h('tr', props.columns.map((label) => h('th', { class: 't-caption' }, label)))]),
        h('tbody', slots.default?.()),
      ])
  },
}
