<script setup lang="ts">
/* Front desks — the section grid under the hairline. Three-up link
   cards. The defineOptions call is deliberate: a script block with no
   statements emits no d.ts module and breaks the type bundle. */
defineOptions({ name: 'KFrontDesks' })
</script>

<template>
  <section class="front__desks">
    <slot />
  </section>
</template>
