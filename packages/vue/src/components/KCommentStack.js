import { h } from 'vue'

/* Comment stack — the inspector container the kit's comment system
   owns at runtime. Ship it empty (or with pre-rendered threads):
   kit.js mounts selection drafts into it, forms threads on commit,
   and persists the stack. Shipping your own stack also tells kit.js
   not to auto-mount a second surface. */
export default {
  name: 'KCommentStack',
  setup(props, { slots }) {
    return () => h('div', { class: 'comment-stack' }, slots.default?.())
  },
}
