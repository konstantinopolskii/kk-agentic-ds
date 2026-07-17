import { h } from 'vue'

/* Spec list — key-value rows inside a card. Three shapes: plain
   (key + value), value (key + value + prose), triple (claim /
   reality / resolution). Two, three, or four columns only. */
export default {
  name: 'KSpecList',
  props: {
    variant: {
      type: String,
      default: 'plain',
      validator: (v) => ['plain', 'value', 'triple'].includes(v),
    },
    rows: { type: Array, required: true },
  },
  setup(props) {
    const classes = {
      plain: 'book__spec',
      value: 'book__spec book__spec--value',
      triple: 'book__spec book__spec--triple',
    }
    return () =>
      h(
        'dl',
        { class: classes[props.variant] },
        props.rows.map((row) =>
          h('div', { class: 'book__spec-row' }, [
            h('dt', { class: 'book__spec-key' }, row.key),
            ...row.values.map((value) => h('dd', { class: 'book__spec-value' }, value)),
          ]),
        ),
      )
  },
}
