import { h } from 'vue'

/* Code — inline surface chip hugging the line, or block paragraph
   with a 4 px gray left rail. Commissioner, regular, no bold, no
   caps, no scale shift. */
export default {
  name: 'KCode',
  props: {
    block: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      props.block
        ? h('pre', { class: 't-code t-code--block' }, slots.default?.())
        : h('span', { class: 't-code' }, slots.default?.())
  },
}
