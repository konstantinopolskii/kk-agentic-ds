import { h } from 'vue'
import KField from './KField.js'

/* Comment draft — the shout card that invites input. Inspector only.
   v-model carries the draft text; commit emits it and clears. */
export default {
  name: 'KCommentNew',
  props: {
    title: { type: String, default: 'Add a comment' },
    placeholder: { type: String, default: 'Type a comment' },
    modelValue: { type: String, default: '' },
    commitLabel: { type: String, default: 'Commit' },
  },
  emits: ['update:modelValue', 'commit'],
  setup(props, { emit }) {
    return () =>
      h('div', { class: 'card card--shout comment-new' }, [
        h('div', { class: 'card__heading' }, [h('h3', { class: 't-title' }, props.title)]),
        h(KField, {
          textarea: true,
          placeholder: props.placeholder,
          modelValue: props.modelValue,
          'onUpdate:modelValue': (v) => emit('update:modelValue', v),
        }),
        h(
          'button',
          {
            class: 'button button--primary t-subtitle',
            type: 'button',
            onClick: () => emit('commit', props.modelValue),
          },
          props.commitLabel,
        ),
      ])
  },
}
