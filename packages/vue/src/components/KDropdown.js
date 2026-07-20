import { h, ref } from 'vue'

/* Dropdown — a menu-button popover. The trigger reuses the .button shape;
   the popover is a role="menu" list of .dropdown__item buttons. Pass plain
   strings or {label,value} objects via items, or author the rows in the
   default slot. Override the trigger through the trigger slot (receives
   { open, toggle }). Emits `select` with the chosen item. Open/close state
   is local so the component works standalone; kit.js drives the same DOM in
   server-rendered pages. */
export default {
  name: 'KDropdown',
  props: {
    label: { type: String, default: 'Options' },
    items: { type: Array, default: () => [] },
  },
  emits: ['select'],
  setup(props, { slots, emit }) {
    const open = ref(false)
    const toggle = () => { open.value = !open.value }
    const norm = (it) => (typeof it === 'string' ? { label: it, value: it } : it)
    const choose = (it) => { emit('select', it); open.value = false }

    return () => {
      const trigger = slots.trigger
        ? slots.trigger({ open: open.value, toggle })
        : h(
            'button',
            {
              class: 'dropdown__trigger button t-subtitle',
              'aria-haspopup': 'menu',
              'aria-expanded': String(open.value),
              onClick: toggle,
            },
            props.label,
          )

      const rows = slots.default
        ? slots.default()
        : props.items.map((it) => {
            const o = norm(it)
            return h(
              'button',
              {
                class: 'dropdown__item',
                role: 'menuitem',
                type: 'button',
                onClick: () => choose(it),
              },
              o.label,
            )
          })

      return h('div', { class: 'dropdown', 'data-dropdown': '' }, [
        trigger,
        h(
          'div',
          { class: 'dropdown__popover', role: 'menu', 'data-state': open.value ? 'open' : 'closed' },
          rows,
        ),
      ])
    }
  },
}
