import { h } from 'vue'

/* Modal — centered dialog over a scrim. One surface: heading (ink title
   plus optional muted subtitle), body (default slot), foot (action
   buttons via the foot slot). The trigger lives in page markup as
   [data-modal-open="id"]; open/close is driven by KK.openModal /
   KK.closeModal from js/kit.js. Emits exactly the DOM the kit's
   initModal() binds — no styles, no class/style props. */
export default {
  name: 'KModal',
  props: {
    id: { type: String, required: true },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () => {
      const titleId = props.id + '-t'

      const heading = [h('h3', { class: 't-title', id: titleId }, props.title)]
      if (props.subtitle) {
        heading.push(h('p', { class: 't-caption t-muted' }, props.subtitle))
      }

      const dialogChildren = [
        h(
          'button',
          { class: 'modal__close', 'data-modal-close': '', 'aria-label': 'Close' },
          '×',
        ),
        h('div', { class: 'modal__heading' }, heading),
        h('div', { class: 'modal__body' }, slots.default?.()),
      ]
      if (slots.foot) {
        dialogChildren.push(h('div', { class: 'modal__foot' }, slots.foot()))
      }

      return h(
        'div',
        { class: 'modal', id: props.id, 'data-state': 'closed', 'aria-hidden': 'true' },
        [
          h('div', { class: 'modal__scrim', 'data-modal-close': '' }),
          h(
            'div',
            {
              class: 'modal__dialog',
              role: 'dialog',
              'aria-modal': 'true',
              'aria-labelledby': titleId,
            },
            dialogChildren,
          ),
        ],
      )
    }
  },
}
