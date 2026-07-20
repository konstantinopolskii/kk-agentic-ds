<script setup lang="ts">
import KField from './KField.vue'

/* Comment draft — the shout card that invites input. Inspector only.
   v-model carries the draft text; commit emits it and clears. */
withDefaults(
  defineProps<{
    title?: string
    placeholder?: string
    modelValue?: string
    commitLabel?: string
  }>(),
  {
    title: 'Add a comment',
    placeholder: 'Type a comment',
    modelValue: '',
    commitLabel: 'Commit',
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string]; commit: [value: string] }>()
</script>

<template>
  <div class="card card--shout comment-new">
    <div class="card__heading"><h3 class="t-title">{{ title }}</h3></div>
    <KField
      textarea
      :placeholder="placeholder"
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
    />
    <button
      class="button button--primary t-subtitle"
      type="button"
      @click="emit('commit', modelValue)"
    >{{ commitLabel }}</button>
  </div>
</template>
