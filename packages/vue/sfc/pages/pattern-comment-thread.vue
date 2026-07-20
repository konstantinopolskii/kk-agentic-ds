<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/comment-thread.html,
   the frozen static oracle for patterns_check.mjs. KCommentStack for the
   outer shell, KCard/KCardCollapsible for the thread's card chrome
   (flush: the message list manages its own bleed). Everything below the
   card__collapsible-inner line — preview, ellipsis, message headers,
   kebab menu, popover items, reply field — has no K component (this
   is exactly the raw markup shape useCommentFlow's buildThread/
   buildMessage/renderPreview construct at runtime), so it stays raw
   markup. data-can-approve, data-message-id, data-author-role are
   kit.js/useCommentFlow-only attributes reproduced here purely for SSR
   parity; no Vue component in this kit emits them. */
import { KCommentStack, KCard, KCardCollapsible } from '@konstantinopolskii/vue'
</script>

<template>
  <KCommentStack>
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
  </KCommentStack>
</template>
