// Consumer wiring for the operator review-state prototype.
// Kit owns: scroll-spy, column-reveal, inspector card stack, kebab menus,
// selection-to-draft flow, highlight-active observer, approve/archive
// kebab actions, resolved-state collapse.
// Consumer owns: seeding threads + highlight spans from data.js, rewriting
// the doc body when kit emits kk:comment approve, updating the
// context-stream count line.

(function () {
  'use strict';

  var app = document.querySelector('.app');
  var doc = document.getElementById('doc');
  var commentStack = document.getElementById('commentStack');
  var contextCountEl = app.querySelector('[data-context-count]');

  // -----------------------------------------------------------------
  // Small helpers
  // -----------------------------------------------------------------

  function escapeHTML(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  // Walk text nodes inside a section, find the first occurrence of
  // `quote`, wrap it in a .highlight span carrying the kit's
  // data-comment-id. Surrounding markup stays intact. Matches the
  // anchor-wrapping shape kit uses for its own selection-flow spans
  // so click-promote-thread fires through the same CSS selector.
  //
  // Fallback: when the seed names a subsection slug that lands on a
  // heading rather than a section wrapper (strategy subsections are
  // flat h3 siblings inside one #strategy article, not nested
  // articles), walk the nearest enclosing .doc__section. Final
  // fallback is the whole #doc. Quotes are unique Russian strings, so
  // first-occurrence wins.
  function wrapAnchor(sectionId, quote, threadId) {
    var hit = document.getElementById(sectionId);
    var section = (hit && hit.classList && hit.classList.contains('doc__section'))
      ? hit
      : (hit && hit.closest ? hit.closest('.doc__section') : null) || doc;
    var walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      var idx = node.nodeValue.indexOf(quote);
      if (idx === -1) continue;
      var before = node.nodeValue.slice(0, idx);
      var match = node.nodeValue.slice(idx, idx + quote.length);
      var after = node.nodeValue.slice(idx + quote.length);
      var parent = node.parentNode;
      if (before) parent.insertBefore(document.createTextNode(before), node);
      var span = document.createElement('span');
      span.className = 'highlight';
      span.setAttribute('data-comment-id', threadId);
      span.textContent = match;
      parent.insertBefore(span, node);
      if (after) parent.insertBefore(document.createTextNode(after), node);
      parent.removeChild(node);
      return span;
    }
    return null;
  }

  // Build a kebab popover with the four v0.13.0 items. Approve is
  // gated by kit at open time via data-can-approve on the thread
  // (set by kit's refreshApproveAvailability against the last list
  // message's data-author-role). Seed messages also carry the
  // popover so Reply / Delete / Archive remain reachable; Approve
  // hides via CSS when the attribute is absent.
  function kebabPopoverHTML() {
    return '' +
      '<button class="comment__menu" type="button"' +
        ' aria-label="Действия треда"' +
        ' aria-expanded="false"><span></span></button>' +
      '<div class="comment__menu-popover" role="menu">' +
        // menu item: approve agent reply. Label text must match the kit's
        // label-based dispatch in kit.js (literal "Approve"). Localization
        // of this label is an open kit gap flagged in 08-frontend-engineer.md.
        '<button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>' +
        // menu item: reply. Literal "Reply" per kit label contract.
        '<button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>' +
        // menu item: archive thread. Literal "Archive thread" per kit label contract.
        '<button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>' +
        // menu item: delete. Literal "Delete" per kit label contract.
        '<button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>' +
      '</div>';
  }

  // One message row. Caller stamps data-author-role on the agent-proposal
  // message so the kit hides/shows Approve correctly. data-message-id is
  // mandatory per kit v0.13.0; consumer ships the id at first paint.
  function messageHTML(messageId, authorRole, author, body) {
    var roleAttr = authorRole ? ' data-author-role="' + authorRole + '"' : '';
    return '' +
      '<div class="comment-msg" data-message-id="' + escapeHTML(messageId) + '"' + roleAttr + '>' +
        '<div class="comment-msg__header">' +
          '<div class="t-subtitle">' + escapeHTML(author) + '</div>' +
          kebabPopoverHTML() +
        '</div>' +
        '<p class="t-caption">' + escapeHTML(body) + '</p>' +
      '</div>';
  }

  // One thread card. Preview shows the two-message condensed view kit
  // expects: first list message, optional ellipsis, last list message.
  // Here both messages are present so no ellipsis is needed (kit ships
  // an ellipsis only when list length > 2). Data attributes on the
  // thread card carry the anchor triple so kit's Approve re-emits the
  // full payload via kk:comment detail.
  function threadHTML(thread) {
    var seedMsgId = 'm-' + thread.id + '-seed';
    var agentMsgId = 'm-' + thread.id + '-agent';

    var seedHTML = messageHTML(seedMsgId, null, thread.seed.author, thread.seed.body);
    var agentHTML = messageHTML(agentMsgId, 'agent', thread.agentProposal.author, thread.agentProposal.body);

    return '' +
      '<div class="card card--interactive comment-thread"' +
        ' data-thread-id="' + escapeHTML(thread.id) + '"' +
        ' data-kk-anchor-quote="' + escapeHTML(thread.anchorQuote) + '"' +
        ' data-kk-section-slug="' + escapeHTML(thread.section) + '"' +
        ' data-state="minimized">' +
        '<div class="comment-thread__preview">' +
          seedHTML +
          agentHTML +
        '</div>' +
        '<div class="card__collapsible">' +
          '<div class="card__collapsible-inner">' +
            '<div class="comment-thread__list">' +
              seedHTML +
              agentHTML +
            '</div>' +
            '<label class="field comment-thread__reply">' +
              // input placeholder is handled by kit via KK.config.i18n.reply —
              // the localized value ("Ответить…") is injected by kit at render.
              '<input class="t-caption field__input" type="text" placeholder="Ответить…" />' +
              '<span class="field__fake-caret" aria-hidden="true"></span>' +
            '</label>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // -----------------------------------------------------------------
  // Seed: render threads + wrap anchors
  // -----------------------------------------------------------------

  function seed() {
    window.PROTO.threads.forEach(function (t) {
      wrapAnchor(t.section, t.anchorQuote, t.id);
      commentStack.insertAdjacentHTML('beforeend', threadHTML(t));
    });
    updateContextCount();
  }

  // -----------------------------------------------------------------
  // Context-stream count line
  // -----------------------------------------------------------------
  //
  // Per DS reviewer amendment 8: plain t-caption, kit-native, no new
  // component. Counts threads that feed the next regeneration — open
  // threads only (resolved + archived drop out per amendment 6). Kit
  // v0.13.0 marks resolved with data-resolved="true" and archived with
  // data-archived="true" on the .comment-thread.

  function updateContextCount() {
    if (!contextCountEl) return;
    var open = commentStack.querySelectorAll(
      '.comment-thread:not([data-resolved="true"]):not([data-archived="true"])'
    ).length;
    // Copy: "<N> <тред|треда|тредов> в контексте агента". Russian plural
    // rule — 1 тред, 2-4 треда, 5+ тредов. Up to 40 chars.
    var noun;
    var mod10 = open % 10;
    var mod100 = open % 100;
    if (mod10 === 1 && mod100 !== 11) noun = 'тред';
    else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) noun = 'треда';
    else noun = 'тредов';
    contextCountEl.textContent = open + ' ' + noun + ' в контексте агента';
    // Per-control-block tags also re-count. Strategy scope gets the
    // subsection-open count (five sub-anchors in strategy threads);
    // research gets two; brief gets zero. Kept static — a live per-scope
    // count would need section-to-thread mapping, which is the hand-off's
    // next iteration. Static count matches the review-state fixture.
  }

  // -----------------------------------------------------------------
  // kk:comment listener — approve + archive
  // -----------------------------------------------------------------
  //
  // Kit fires kk:comment at the .comment-stack and it bubbles. Consumer
  // listens once, branches on action. For approve: the anchor span
  // inside the doc body swaps its text to replacementText. For archive:
  // the DOM flag is already set by kit — consumer only needs to refresh
  // the context count. New / reply / delete are kit-side and do not
  // need consumer work for a static review-state fixture; persistence
  // belongs to the real backend.

  document.addEventListener('kk:comment', function (e) {
    var d = e.detail || {};

    if (d.action === 'approve') {
      var span = doc.querySelector('.highlight[data-comment-id="' + d.threadId + '"]');
      if (span && d.replacementText) {
        span.textContent = d.replacementText;
        span.classList.remove('highlight--active');
      }
      updateContextCount();
      return;
    }

    if (d.action === 'archive') {
      // Kit has already set data-archived="true" on the thread; CSS
      // hides it. The anchor span in the doc stays — amendment 6 says
      // archived threads drop from the agent's context stream, not from
      // the operator's visual record.
      updateContextCount();
      return;
    }

    // new / reply / delete — kit manages the DOM; consumer updates count
    // so resolution math stays honest if an operator test-drives the
    // draft flow during review.
    if (d.action === 'new' || d.action === 'delete' || d.action === 'reply') {
      updateContextCount();
    }
  });

  // -----------------------------------------------------------------
  // Mount
  // -----------------------------------------------------------------

  seed();

  // Kit's selection-to-draft flow is opt-in. Enables highlight-click →
  // thread promote, mouseup → draft card, Esc → dismiss, kebab Reply /
  // Delete / Approve / Archive. Kit auto-inits scroll-spy, card stack,
  // column reveal, kebab menus on DOMContentLoaded; enabling selection
  // after seed keeps the highlight observer aware of pre-seeded spans.
  KK.enableCommentSelectionFlow();

  // Control-block buttons render as inert in the static review fixture.
  // Click handlers would advance stage or mutate the doc — both out of
  // scope per stage-8 scope discipline (review state only).

})();
