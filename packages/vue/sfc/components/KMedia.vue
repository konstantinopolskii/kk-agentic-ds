<script setup lang="ts">
/* Media row — leading figure, two-line body, trailing meta. Anchor
   form when href is set: one row, one destination, no trail button.
   trailTag renders the canonical tag trail; the #trail slot renders
   inside div.media__trail for the one-compact-button form. */
withDefaults(
  defineProps<{
    title: string
    meta?: string
    micro?: boolean
    href?: string
    initials?: string
    square?: boolean
    trailTag?: string
  }>(),
  { meta: '', micro: false, href: '', initials: '', square: false, trailTag: '' },
)
</script>

<template>
  <component :is="href ? 'a' : 'div'" class="media" :href="href ? href : undefined">
    <slot v-if="$slots.figure" name="figure" />
    <span v-else-if="square" class="media__figure media__figure--square" />
    <span v-else class="avatar media__figure">{{ initials || undefined }}</span>
    <div class="media__body">
      <p class="t-caption--bold">{{ title }}</p>
      <p v-if="meta" :class="micro ? 't-micro t-muted' : 't-caption t-muted'">{{ meta }}</p>
    </div>
    <span v-if="trailTag" class="tag media__trail">{{ trailTag }}</span>
    <div v-else-if="$slots.trail" class="media__trail">
      <slot name="trail" />
    </div>
  </component>
</template>
