import { h } from 'vue'

/* Chip — canonical: <button class="chip" type="button" aria-pressed>.
   A chip never navigates; pressed state is the only state. */
export default {
  name: 'KChip',
  props: {
    pressed: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () =>
      h(
        'button',
        {
          class: 'chip',
          type: 'button',
          'aria-pressed': String(props.pressed),
          onClick: (e) => emit('click', e),
        },
        slots.default?.(),
      )
  },
}
