<script setup lang="ts">
/* Switch — binary toggle. The label names the setting, not the state.
   Thumb is .switch__track::after; the track span stays empty. Keyboard
   operable through the checkbox underneath. */
withDefaults(
  defineProps<{
    label: string
    modelValue?: boolean
  }>(),
  { modelValue: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<template>
  <label class="switch">
    <input class="switch__input" type="checkbox" :checked="modelValue" @change="onChange" />
    <span class="switch__track"></span>
    <span class="t-caption">{{ label }}</span>
  </label>
</template>
