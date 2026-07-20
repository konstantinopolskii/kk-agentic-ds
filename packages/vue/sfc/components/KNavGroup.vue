<script setup lang="ts">
/* Nav group — one to nine items under a bold head. The anchor head
   is preferred (clickable, scroll-spy-aware); a head without href
   renders the legacy non-clickable h4. */
interface NavItem {
  label: string
  href: string
  current?: boolean
}

withDefaults(
  defineProps<{
    head: string
    href?: string
    items: NavItem[]
  }>(),
  { href: '' },
)
</script>

<template>
  <section class="nav-group">
    <a v-if="href" class="t-subtitle nav-group__head" :href="href">{{ head }}</a>
    <h4 v-else class="t-subtitle">{{ head }}</h4>
    <ul class="nav-group__items">
      <li v-for="(item, i) in items" :key="i" class="t-caption">
        <a :href="item.href" :aria-current="item.current ? 'true' : undefined">{{ item.label }}</a>
      </li>
    </ul>
  </section>
</template>
