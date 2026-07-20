<script setup lang="ts">
/* Comment thread — interactive card with the collapsible message
   list. Structure only: kebab menu, edit flow, archive, and reply
   behavior live in js/kit.js, which binds to this same DOM. Messages
   carry data-message-id; agent messages carry data-author-role. */
export interface KCommentThreadMessage {
  id: string | number
  body: string
  role?: string
}

withDefaults(
  defineProps<{
    title: string
    state?: 'active' | 'minimized'
    archived?: boolean
    messages: KCommentThreadMessage[]
  }>(),
  { state: 'minimized', archived: false },
)
</script>

<template>
  <div
    class="card card--interactive comment-thread"
    :data-state="state"
    :data-archived="archived ? 'true' : undefined"
  >
    <div class="card__heading"><h3 class="t-title">{{ title }}</h3></div>
    <div class="card__collapsible">
      <div class="card__collapsible-inner">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="comment-msg"
          :data-message-id="msg.id"
          :data-author-role="msg.role === 'agent' ? 'agent' : undefined"
        >
          <p class="t-caption">{{ msg.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
