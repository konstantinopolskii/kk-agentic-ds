import { h } from 'vue'

/* Tooltip — a one-line hint on an inline trigger. The bubble is an
   inverted (black) surface that sits above the trigger and never takes
   the pointer. `label` is the trigger content (a help badge, default
   "?"); `text` is the bubble copy. Author a richer trigger via the
   trigger slot. Open/close on hover, focus, and Escape is wired by
   initTooltip() in js/kit.js — this emitter only ships the markup. */
let uid = 0

export default {
  name: 'KTooltip',
  props: {
    text: { type: String, default: '' },
    label: { type: String, default: '?' },
  },
  setup(props, { slots }) {
    const bubbleId = `tooltip-${(uid += 1)}-b`
    return () =>
      h('span', { class: 'tooltip', 'data-tooltip': '' }, [
        h(
          'button',
          {
            class: 'tooltip__trigger',
            type: 'button',
            'aria-describedby': bubbleId,
          },
          slots.trigger ? slots.trigger() : props.label,
        ),
        h(
          'span',
          {
            class: 'tooltip__bubble',
            role: 'tooltip',
            id: bubbleId,
            'data-state': 'closed',
          },
          props.text,
        ),
      ])
  },
}
