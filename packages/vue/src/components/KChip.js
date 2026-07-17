import { h, inject } from 'vue'

/* Chip — a tag the user can press. Selects among peers; never
   navigates. Inside a v-model chip wrap, value wires the chip into
   the segment group; standalone chips use the pressed prop. */
export default {
  name: 'KChip',
  props: {
    pressed: { type: Boolean, default: false },
    value: { type: [String, Number], default: undefined },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const group = inject('kk-chip-group', null)
    const grouped = () => group && props.value !== undefined
    return () =>
      h(
        'button',
        {
          class: 'chip',
          type: 'button',
          'aria-pressed': String(grouped() ? group.selected.value === props.value : props.pressed),
          onClick: (e) => {
            if (grouped()) group.select(props.value)
            emit('click', e)
          },
        },
        slots.default?.(),
      )
  },
}
