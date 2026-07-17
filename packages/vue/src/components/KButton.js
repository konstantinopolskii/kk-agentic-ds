import { h } from 'vue'

/* Button — canonical: <button class="button t-subtitle">, primary adds
   button--primary. Inside a link card the same shape renders as a
   <span> labeling the destination (as="span"). No other knobs: the
   canon has two buttons, so the component has one boolean. */
export default {
  name: 'KButton',
  props: {
    primary: { type: Boolean, default: false },
    as: {
      type: String,
      default: 'button',
      validator: (v) => ['button', 'span'].includes(v),
    },
    type: { type: String, default: 'button' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as,
        {
          class: props.primary ? 'button button--primary t-subtitle' : 'button t-subtitle',
          ...(props.as === 'button' ? { type: props.type } : {}),
        },
        slots.default?.(),
      )
  },
}
