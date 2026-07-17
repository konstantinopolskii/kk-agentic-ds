import { h } from 'vue'

/* Field, input form — a label and an input sharing one row, or a bare
   input with the fake caret marking where typing lands. No box, no
   outline; focus inverts the row. Placeholders are real examples,
   never labels. */
export default {
  name: 'KField',
  props: {
    label: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    textarea: { type: Boolean, default: false },
    row: { type: Boolean, default: false },
    fakeCaret: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h('label', { class: props.row ? 'field field--row' : 'field' }, [
        props.label ? h('span', { class: 't-caption--bold field__label' }, props.label) : null,
        h(props.textarea ? 'textarea' : 'input', {
          class: 't-caption field__input',
          ...(props.textarea ? {} : { type: props.type }),
          value: props.modelValue,
          ...(props.placeholder ? { placeholder: props.placeholder } : {}),
          onInput: (e) => emit('update:modelValue', e.target.value),
        }),
        props.fakeCaret ? h('span', { class: 'field__fake-caret', 'aria-hidden': 'true' }) : null,
      ])
  },
}
