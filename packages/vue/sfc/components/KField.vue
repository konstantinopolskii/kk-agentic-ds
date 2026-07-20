<script setup lang="ts">
/* Field, input form — a label and an input sharing one row, or a bare
   input with the fake caret marking where typing lands. No box, no
   outline; focus inverts the row. Placeholders are real examples,
   never labels. */
withDefaults(
  defineProps<{
    label?: string
    modelValue?: string
    placeholder?: string
    type?: string
    textarea?: boolean
    row?: boolean
    fakeCaret?: boolean
  }>(),
  {
    label: '',
    modelValue: '',
    placeholder: '',
    type: 'text',
    textarea: false,
    row: false,
    fakeCaret: false,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement | HTMLTextAreaElement).value)
}
</script>

<template>
  <label :class="row ? 'field field--row' : 'field'">
    <span v-if="label" class="t-caption--bold field__label">{{ label }}</span>
    <component
      :is="textarea ? 'textarea' : 'input'"
      class="t-caption field__input"
      :type="textarea ? undefined : type"
      :value="modelValue"
      :placeholder="placeholder || undefined"
      @input="onInput"
    />
    <span v-if="fakeCaret" class="field__fake-caret" aria-hidden="true"></span>
  </label>
</template>
