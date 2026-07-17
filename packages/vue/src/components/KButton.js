import { h } from 'vue'

/* Button — canonical: <button class="button t-subtitle">, primary adds
   button--primary. Inside a link card the same shape renders as a
   <span> labeling the destination (as="span"). Inside an interactive
   card, cta stamps data-cta so kit.js can wire the state buttons. */
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
    cta: {
      type: String,
      default: null,
      validator: (v) => v === null || ['minimized', 'active'].includes(v),
    },
    /* Media-trail form: the label drops to caption bold and the CSS
       auto-sizes the button off the full-width default. */
    caption: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.as,
        {
          class:
            'button' +
            (props.primary ? ' button--primary' : '') +
            (props.caption ? ' t-caption--bold' : ' t-subtitle'),
          ...(props.as === 'button' ? { type: props.type } : {}),
          ...(props.cta ? { 'data-cta': props.cta } : {}),
        },
        slots.default?.(),
      )
  },
}
