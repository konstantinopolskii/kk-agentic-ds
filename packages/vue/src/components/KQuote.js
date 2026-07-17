import { h } from 'vue'

/* Quote — black, Medium 500, body-sized, 4 px left border. Content,
   not metadata. The cite child picks up its own "— " prefix. */
export default {
  name: 'KQuote',
  props: {
    cite: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h('blockquote', { class: 'quote' }, [
        slots.default?.(),
        props.cite ? h('cite', props.cite) : null,
      ])
  },
}
