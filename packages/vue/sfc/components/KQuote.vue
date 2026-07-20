<script setup lang="ts">
/* Quote — black, Medium 500, body-sized, 4 px left border. Content,
   not metadata. The cite child picks up its own "— " prefix. */
withDefaults(defineProps<{ cite?: string }>(), { cite: '' })
</script>

<template>
  <blockquote class="quote"><slot
  /><cite v-if="cite">{{ cite }}</cite></blockquote>
</template>
