import { h } from 'vue'

/* Card stack — one active per stack. Structure only: promotion,
   glide, and collapse animation belong to js/kit.js, which binds to
   the same DOM this component emits. Load kit.js and call KK.init()
   after mount for the behavior. */
export default {
  name: 'KCardStack',
  props: {
    columns: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        { class: props.columns ? 'card-stack card-stack--columns' : 'card-stack' },
        slots.default?.(),
      )
  },
}
