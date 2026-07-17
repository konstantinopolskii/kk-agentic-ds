import { h, computed, provide } from 'vue'

/* Chip wrap — owns the 8 px gaps. With v-model it becomes a segment
   group: child chips carrying a value read their pressed state from
   the model and clicking one selects it. Without v-model the chips
   stand alone on their own pressed props. */
export default {
  name: 'KChipWrap',
  props: {
    modelValue: { type: [String, Number], default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    provide('kk-chip-group', {
      selected: computed(() => props.modelValue),
      select: (value) => emit('update:modelValue', value),
    })
    return () => h('div', { class: 'chip-wrap' }, slots.default?.())
  },
}
