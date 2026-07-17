import { h } from 'vue'

/* Card — every widget is one. Five variants share one shape: static
   (default), interactive (sticky active/minimized), link (anchor,
   whole surface navigates), shout (inverted, one per column),
   heading (inspector group header, never lights up).
   Placement modifiers are canon too: span puts the card on the
   panels grid, lead makes it the front-page lead story. */
export default {
  name: 'KCard',
  props: {
    variant: {
      type: String,
      default: 'static',
      validator: (v) => ['static', 'interactive', 'link', 'shout', 'heading'].includes(v),
    },
    href: { type: String, default: '' },
    tight: { type: Boolean, default: false },
    selectable: { type: Boolean, default: false },
    state: {
      type: String,
      default: null,
      validator: (v) => v === null || ['active', 'minimized'].includes(v),
    },
    span: {
      type: String,
      default: null,
      validator: (v) => v === null || ['third', 'half', 'two-thirds', 'full'].includes(v),
    },
    lead: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const variantClass = {
      static: '',
      interactive: ' card--interactive',
      link: ' card--link',
      shout: ' card--shout',
      heading: ' card--heading',
    }
    return () => {
      const cls =
        'card' +
        variantClass[props.variant] +
        (props.selectable ? ' card--selectable' : '') +
        (props.tight ? ' card--tight' : '') +
        (props.span ? ` panel--${props.span}` : '') +
        (props.lead ? ' front__lead' : '')
      const el = props.variant === 'link' ? 'a' : props.variant === 'heading' ? 'header' : 'div'
      return h(
        el,
        {
          class: cls,
          ...(props.variant === 'link' ? { href: props.href } : {}),
          ...(props.variant === 'interactive' && props.state ? { 'data-state': props.state } : {}),
        },
        slots.default?.(),
      )
    }
  },
}
