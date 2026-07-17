import { h } from 'vue'

/* Card collapsible — the hidden body an interactive card reveals
   when active. Outer grid animates rows; inner holds the content. */
export default {
  name: 'KCardCollapsible',
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'card__collapsible' }, [
        h('div', { class: 'card__collapsible-inner' }, slots.default?.()),
      ])
  },
}
