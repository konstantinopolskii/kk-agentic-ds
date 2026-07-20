import { h } from 'vue'

/* Tabs — underlined tab strip over stacked panels. One step of
   contrast: the selected tab goes full ink with a 2 px underline,
   the rest stay muted. Pass tab labels via `tabs`; author each
   panel's body in the matching `panel-0`, `panel-1`, … slot.
   `modelValue` is the selected index. Emits the canon DOM only —
   kit.js `initTabs()` owns click + arrow-key selection. */
export default {
  name: 'KTabs',
  props: {
    id: { type: String, required: true },
    tabs: {
      type: Array,
      required: true,
      validator: (t) => Array.isArray(t) && t.every((tab) => tab && typeof tab.label === 'string'),
    },
    modelValue: { type: Number, default: 0 },
  },
  setup(props, { slots }) {
    return () => {
      const selected = props.modelValue

      const list = h(
        'div',
        { class: 'tabs__list', role: 'tablist' },
        props.tabs.map((tab, i) =>
          h(
            'button',
            {
              class: 'tabs__tab',
              role: 'tab',
              id: `${props.id}-t${i}`,
              'aria-controls': `${props.id}-p${i}`,
              'aria-selected': i === selected ? 'true' : 'false',
            },
            tab.label,
          ),
        ),
      )

      const panels = props.tabs.map((tab, i) =>
        h(
          'div',
          {
            class: 'tabs__panel',
            role: 'tabpanel',
            id: `${props.id}-p${i}`,
            'aria-labelledby': `${props.id}-t${i}`,
            hidden: i !== selected,
          },
          slots[`panel-${i}`]?.(),
        ),
      )

      return h('div', { class: 'tabs', 'data-tabs': '' }, [list, ...panels])
    }
  },
}
