import { h } from 'vue'

/* Media row — leading figure, two-line body, trailing meta. Anchor
   form when href is set: one row, one destination, no trail button.
   trailTag renders the canonical tag trail; the #trail slot renders
   inside div.media__trail for the one-compact-button form. */
export default {
  name: 'KMedia',
  props: {
    title: { type: String, required: true },
    meta: { type: String, default: '' },
    micro: { type: Boolean, default: false },
    href: { type: String, default: '' },
    initials: { type: String, default: '' },
    square: { type: Boolean, default: false },
    trailTag: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.href ? 'a' : 'div',
        { class: 'media', ...(props.href ? { href: props.href } : {}) },
        [
          slots.figure
            ? slots.figure()
            : props.square
              ? h('span', { class: 'media__figure media__figure--square' })
              : h('span', { class: 'avatar media__figure' }, props.initials || undefined),
          h('div', { class: 'media__body' }, [
            h('p', { class: 't-caption--bold' }, props.title),
            props.meta
              ? h('p', { class: props.micro ? 't-micro t-muted' : 't-caption t-muted' }, props.meta)
              : null,
          ]),
          props.trailTag
            ? h('span', { class: 'tag media__trail' }, props.trailTag)
            : slots.trail
              ? h('div', { class: 'media__trail' }, slots.trail())
              : null,
        ],
      )
  },
}
