import { h } from 'vue'

/* Toast — one inverted status message. The kit's imperative KK.toast()
   builds and animates these at runtime; this emitter renders a single
   static toast for snapshots and server-rendered markup. Inverted
   surface, an optional action button, always a dismiss ×. */
export default {
  name: 'KToast',
  props: {
    text: { type: String, required: true },
    action: { type: String, default: '' },
  },
  setup(props) {
    return () => {
      const children = [h('span', { class: 'toast__text' }, props.text)]
      if (props.action) {
        children.push(
          h('button', { class: 'toast__action', type: 'button' }, props.action),
        )
      }
      children.push(
        h(
          'button',
          { class: 'toast__close', type: 'button', 'aria-label': 'Dismiss' },
          '×',
        ),
      )
      return h('div', { class: 'toast', 'data-state': 'open', role: 'status' }, children)
    }
  },
}
