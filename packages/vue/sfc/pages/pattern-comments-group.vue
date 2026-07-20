<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/comments-group.html,
   the frozen static oracle for patterns_check.mjs. KInspectorGroup for
   the titled cluster, KCard variant="heading" for the header, KCommentStack
   for the stack shell. The three thread bodies (open, resolved, archived)
   have no K component for their preview/kebab/resolved-stamp chrome — same
   raw markup as pattern-comment-thread.vue and
   pattern-comment-thread-resolved.vue, this is the shape useCommentFlow's
   builders construct at runtime. data-can-approve, data-resolved,
   data-archived, data-message-id, data-author-role are kit.js/
   useCommentFlow-only attributes reproduced here purely for SSR parity;
   no Vue component in this kit emits them. */
import { KInspectorGroup, KCard, KCardCollapsible, KCommentStack } from '@konstantinopolskii/vue'
</script>

<template>
  <div class="wrap">
    <KInspectorGroup>
      <KCard variant="heading">
        <h2 class="t-display">Comments</h2>
      </KCard>

      <KCommentStack>
        <!-- Open thread with kebab and agent reply. -->
        <KCard variant="interactive" class="comment-thread" data-can-approve="true">
          <div class="comment-thread__preview">
            <div class="comment-msg" data-message-id="m-01">
              <div class="comment-msg__header">
                <div class="t-subtitle">Sofia Hlazunova</div>
                <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
              </div>
              <p class="t-caption">The tag row needs one more variant to cover the metadata case.</p>
              <div class="comment__menu-popover" role="menu">
                <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
              </div>
            </div>
            <div class="comment-thread__ellipsis" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <div class="comment-msg" data-message-id="m-03" data-author-role="agent">
              <div class="comment-msg__header">
                <div class="t-subtitle">Claude</div>
                <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
              </div>
              <p class="t-caption">Added a bold tag at the end of the row. Take a look.</p>
              <div class="comment__menu-popover" role="menu">
                <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
              </div>
            </div>
          </div>
          <KCardCollapsible :flush="true">
            <div class="comment-thread__list">
              <div class="comment-msg" data-message-id="m-01">
                <div class="comment-msg__header">
                  <div class="t-subtitle">Sofia Hlazunova</div>
                  <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
                </div>
                <p class="t-caption">The tag row needs one more variant to cover the metadata case.</p>
                <div class="comment__menu-popover" role="menu">
                  <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
                </div>
              </div>
              <div class="comment-msg" data-message-id="m-02">
                <div class="comment-msg__header">
                  <div class="t-subtitle">Konstantin Konstantinopolskii</div>
                  <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
                </div>
                <p class="t-caption">Claude, add a bold tag to the row.</p>
                <div class="comment__menu-popover" role="menu">
                  <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
                </div>
              </div>
              <div class="comment-msg" data-message-id="m-03" data-author-role="agent">
                <div class="comment-msg__header">
                  <div class="t-subtitle">Claude</div>
                  <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
                </div>
                <p class="t-caption">Added a bold tag at the end of the row. Take a look.</p>
                <div class="comment__menu-popover" role="menu">
                  <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
                </div>
              </div>
            </div>
            <label class="field comment-thread__reply">
              <input class="t-caption field__input" type="text" placeholder="looks right now, thank you" />
              <span class="field__fake-caret" aria-hidden="true"></span>
            </label>
          </KCardCollapsible>
        </KCard>

        <!-- Resolved thread. -->
        <KCard variant="interactive" class="comment-thread" data-resolved="true" data-state="minimized">
          <div class="comment-thread__preview">
            <div class="comment-thread__resolved">
              <span class="comment-thread__resolved-stamp t-caption" aria-hidden="true" v-html="'&amp;check;'"></span>
              <span class="comment-thread__resolved-snippet t-caption">The signoff timestamp should carry the timezone.</span>
              <span class="comment-thread__resolved-byline t-caption t-muted">Konstantin Konstantinopolskii</span>
            </div>
          </div>
        </KCard>

        <!-- Archived thread — DOM retained, hidden by CSS. -->
        <KCard variant="interactive" class="comment-thread" data-archived="true">
          <div class="comment-thread__preview">
            <div class="comment-msg" data-message-id="m-99">
              <div class="comment-msg__header">
                <div class="t-subtitle">Sofia Hlazunova</div>
                <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
              </div>
              <p class="t-caption">Early tag sizing notes. Superseded by v1.1.</p>
              <div class="comment__menu-popover" role="menu">
                <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
              </div>
            </div>
          </div>
        </KCard>
      </KCommentStack>
    </KInspectorGroup>
  </div>
</template>
