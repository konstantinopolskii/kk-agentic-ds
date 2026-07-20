<script setup lang="ts">
/* Figure — media or diagram with an optional caption underneath. */
withDefaults(defineProps<{ caption?: string }>(), { caption: '' })
</script>

<template>
  <figure class="figure"><slot
  /><figcaption v-if="caption">{{ caption }}</figcaption></figure>
</template>
