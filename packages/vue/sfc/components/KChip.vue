<script setup lang="ts">
/* Chip — a tag the user can press. Selects among peers; never
   navigates. Inside a v-model chip wrap, value wires the chip into
   the segment group; standalone chips use the pressed prop. */
import { inject, type ComputedRef } from 'vue'

interface ChipGroup {
  selected: ComputedRef<string | number | undefined>
  select: (value: string | number | undefined) => void
}

const props = withDefaults(
  defineProps<{
    pressed?: boolean
    value?: string | number
  }>(),
  { pressed: false, value: undefined },
)

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const group = inject<ChipGroup | null>('kk-chip-group', null)

function onClick(e: MouseEvent) {
  if (group && props.value !== undefined) group.select(props.value)
  emit('click', e)
}
</script>

<template>
  <button
    class="chip"
    type="button"
    :aria-pressed="(group && value !== undefined ? group.selected.value === value : pressed) ? 'true' : 'false'"
    @click="onClick"
  ><slot
  /></button>
</template>
