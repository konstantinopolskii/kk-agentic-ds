<script setup lang="ts">
/* Card heading — h3.t-title plus optional caption subtitle. muted
   demotes the subtitle to metadata, the shout-card pairing. Markup
   contract is gated by tests/parity against the retired h() oracle. */
withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    muted?: boolean
  }>(),
  { subtitle: '', muted: false },
)
</script>

<template>
  <div class="card__heading">
    <h3 class="t-title">{{ title }}</h3>
    <p v-if="subtitle" :class="muted ? 't-caption t-muted' : 't-caption'">{{ subtitle }}</p>
  </div>
</template>
