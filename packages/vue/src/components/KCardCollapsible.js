import { h } from 'vue'

/* Card collapsible — the hidden body an interactive card reveals when
   active. Outer grid animates rows; inner holds the content. The slot
   wraps in .card__body, the kit's content-injection wrapper, so prose
   lands on the same text rail as the card's heading. flush drops the
   wrapper for children that manage their own bleed: fields, decks,
   comment lists. */
export default {
  name: 'KCardCollapsible',
  props: {
    flush: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'card__collapsible' }, [
        h(
          'div',
          { class: 'card__collapsible-inner' },
          props.flush
            ? slots.default?.()
            : [h('div', { class: 'card__body' }, slots.default?.())],
        ),
      ])
  },
}
