import { h } from 'vue'

/* Switch — binary toggle. The label names the setting, not the state.
   Thumb is .switch__track::after; the track span stays empty. Keyboard
   operable through the checkbox underneath. */
export default {
  name: 'KSwitch',
  props: {
    label: { type: String, required: true },
    modelValue: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h('label', { class: 'switch' }, [
        h('input', {
          class: 'switch__input',
          type: 'checkbox',
          checked: props.modelValue,
          onChange: (e) => emit('update:modelValue', e.target.checked),
        }),
        h('span', { class: 'switch__track' }),
        h('span', { class: 't-caption' }, props.label),
      ])
  },
}
