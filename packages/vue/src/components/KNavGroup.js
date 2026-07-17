import { h } from 'vue'

/* Nav group — one to nine items under a bold head. The anchor head
   is preferred (clickable, scroll-spy-aware); a head without href
   renders the legacy non-clickable h4. */
export default {
  name: 'KNavGroup',
  props: {
    head: { type: String, required: true },
    href: { type: String, default: '' },
    items: { type: Array, required: true },
  },
  setup(props) {
    return () =>
      h('section', { class: 'nav-group' }, [
        props.href
          ? h('a', { class: 't-subtitle nav-group__head', href: props.href }, props.head)
          : h('h4', { class: 't-subtitle' }, props.head),
        h(
          'ul',
          { class: 'nav-group__items' },
          props.items.map((item) =>
            h('li', { class: 't-caption' }, [
              h(
                'a',
                { href: item.href, ...(item.current ? { 'aria-current': 'true' } : {}) },
                item.label,
              ),
            ]),
          ),
        ),
      ])
  },
}
