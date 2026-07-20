<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/comment-thread-resolved.html,
   the frozen static oracle for patterns_check.mjs. KCommentStack for the
   outer shell; the resolved-thread shape (stamp + snippet + byline) has
   no K component — KCommentThread only renders the plain title + message
   list shape — so it stays raw markup, matching the exact structure
   useCommentFlow's renderResolved() builds at runtime. The stamp glyph
   is written via v-html: a plain "&check;" text node would be HTML-
   entity-decoded by the template compiler then re-serialized as the
   raw ✓ character, byte-diverging from this oracle's literal entity. */
import { KCommentStack } from '@konstantinopolskii/vue'
</script>

<template>
  <KCommentStack>
    <div class="card card--interactive comment-thread" data-resolved="true" data-state="minimized">
      <div class="comment-thread__preview">
        <div class="comment-thread__resolved">
          <span class="comment-thread__resolved-stamp t-caption" aria-hidden="true" v-html="'&amp;check;'"></span>
          <span class="comment-thread__resolved-snippet t-caption">The signoff timestamp should carry the timezone.</span>
          <span class="comment-thread__resolved-byline t-caption t-muted">Konstantin Konstantinopolskii</span>
        </div>
      </div>
    </div>
  </KCommentStack>
</template>
