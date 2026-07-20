<script setup lang="ts">
/* List — caption-sized hairlined list. Bullet (ul) or decimal (ol)
   markers in the left gutter, Bold 700. Pass strings via items or
   author <li> elements in the default slot. */
withDefaults(defineProps<{ ordered?: boolean; items?: string[] | null }>(), {
  ordered: false,
  items: null,
})
</script>

<template>
  <component :is="ordered ? 'ol' : 'ul'" class="t-list"><template v-if="$slots.default"><slot
    /></template><template v-else><li v-for="(item, i) in items || []" :key="i">{{ item }}</li></template></component>
</template>
