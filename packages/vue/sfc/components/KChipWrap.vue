<script setup lang="ts">
/* Chip wrap — owns the 8 px gaps. With v-model it becomes a segment
   group: child chips carrying a value read their pressed state from
   the model and clicking one selects it. Without v-model the chips
   stand alone on their own pressed props. */
import { computed, provide } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
  }>(),
  { modelValue: undefined },
)

const emit = defineEmits<{ 'update:modelValue': [value: string | number | undefined] }>()

provide('kk-chip-group', {
  selected: computed(() => props.modelValue),
  select: (value: string | number | undefined) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="chip-wrap"><slot /></div>
</template>
