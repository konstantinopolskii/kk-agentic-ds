(function () {
  'use strict';

  var app = document.querySelector('.app');
  var doc = document.getElementById('doc');
  var inspector = document.querySelector('.inspector');
  var state = window.PROTO.state;

  // URL params — role and stage are the two handles Konstantin asked for.
  var params = new URLSearchParams(window.location.search);
  var roleParam = params.get('role');
  var stageParam = parseInt(params.get('stage'), 10);
  if (roleParam === 'client' || roleParam === 'operator') state.role = roleParam;
  if (stageParam >= 1 && stageParam <= 7) state.stage = stageParam;
  app.setAttribute('data-role', state.role);
  app.setAttribute('data-stage', String(state.stage));

  // Stage pill → stage switch. Active pill wears .tag--bold.
  function paintActivePill() {
    app.querySelectorAll('[data-stage-pill]').forEach(function (p) {
      var on = parseInt(p.getAttribute('data-stage'), 10) === state.stage;
      p.classList.toggle('tag--bold', on);
      p.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  app.querySelectorAll('[data-stage-pill]').forEach(function (pill) {
    pill.addEventListener('click', function () {
      var s = parseInt(pill.getAttribute('data-stage'), 10);
      if (!s) return;
      state.stage = s;
      app.setAttribute('data-stage', String(s));
      paintActivePill();
    });
  });
  paintActivePill();

  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 7) {
      state.stage = n;
      app.setAttribute('data-stage', String(n));
      paintActivePill();
      e.preventDefault();
    }
  });

  // Card stack controller — one active card per inspector group.
  function collapseGroup(group) {
    group.querySelectorAll('.card--interactive[data-state="active"]').forEach(function (c) {
      c.removeAttribute('data-state');
    });
  }
  function promoteCard(card) {
    var group = card.closest('.inspector__group');
    if (!group) return;
    if (card.getAttribute('data-state') !== 'active') {
      collapseGroup(group);
      card.setAttribute('data-state', 'active');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  inspector.addEventListener('click', function (e) {
    var min = e.target.closest('[data-cta="minimized"]');
    if (!min) return;
    var card = min.closest('.card--interactive');
    if (card) promoteCard(card);
  });

  // -----------------------------------------------------------------
  // Comments
  // -----------------------------------------------------------------

  var operatorStack = document.getElementById('commentStackOperator');
  var clientStack = document.getElementById('commentStackClient');

  function escapeHTML(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  // Wrap first occurrence of `quote` inside `section` in a .highlight span,
  // tagged with the thread id. Walks text nodes so surrounding markup stays.
  function wrapAnchor(sectionId, quote, threadId) {
    var section = document.getElementById(sectionId);
    if (!section) return null;
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
      span.setAttribute('data-thread', threadId);
      span.textContent = match;
      parent.insertBefore(span, node);
      if (after) parent.insertBefore(document.createTextNode(after), node);
      parent.removeChild(node);
      return span;
    }
    return null;
  }

  function threadCardHTML(thread) {
    var author = escapeHTML(thread.author);
    var msg = escapeHTML(thread.message);
    var hasProposal = !!thread.agentProposal;
    var proposal = hasProposal ? escapeHTML(thread.agentProposal) : '';
    var resolved = thread.status === 'resolved-accepted' || thread.status === 'resolved-rejected';
    return '' +
      '<div class="card card--interactive comment-thread" data-thread-id="' + thread.id + '" data-status="' + thread.status + '">' +
        '<div class="comment-thread__preview">' +
          '<div class="comment-msg">' +
            '<div class="comment-msg__header"><div class="t-subtitle">' + author + '</div></div>' +
            '<p class="t-caption">' + msg + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="card__collapsible"><div class="card__collapsible-inner">' +
          '<div class="comment-thread__list">' +
            '<div class="comment-msg">' +
              '<div class="comment-msg__header"><div class="t-subtitle">' + author + '</div></div>' +
              '<p class="t-caption">' + msg + '</p>' +
            '</div>' +
            (hasProposal ? (
              '<div class="comment-msg">' +
                '<div class="comment-msg__header"><div class="t-subtitle">Агент</div></div>' +
                '<p class="t-caption">' + proposal + '</p>' +
              '</div>'
            ) : '') +
          '</div>' +
          (hasProposal && !resolved ? (
            '<hr class="divider" />' +
            '<p class="t-caption t-muted">Агент предлагает заменить выделенный фрагмент на этот текст.</p>' +
            '<button class="button t-subtitle" type="button" data-action="reject">Отклонить</button>' +
            '<button class="button button--primary t-subtitle" type="button" data-action="accept">Принять</button>'
          ) : '') +
          (resolved ? (
            '<p class="t-caption t-muted">Закрыт: ' + (thread.status === 'resolved-accepted' ? 'принято' : 'отклонено') + '</p>'
          ) : '') +
        '</div></div>' +
      '</div>';
  }

  // Seed the operator stack and anchor spans.
  window.PROTO.threads.forEach(function (t) {
    if (t.status !== 'resolved-accepted') wrapAnchor(t.section, t.anchorQuote, t.id);
    if (operatorStack) operatorStack.insertAdjacentHTML('beforeend', threadCardHTML(t));
  });

  doc.addEventListener('click', function (e) {
    var h = e.target.closest('.highlight');
    if (!h) return;
    var id = h.getAttribute('data-thread');
    var target = document.querySelector('.comment-thread[data-thread-id="' + id + '"]');
    if (target) {
      doc.querySelectorAll('.highlight').forEach(function (s) { s.classList.remove('highlight--active'); });
      h.classList.add('highlight--active');
      promoteCard(target);
    }
  });

  function resolveCard(card, status) {
    var id = card.getAttribute('data-thread-id');
    var t = window.PROTO.threads.find(function (tt) { return tt.id === id; });
    if (t) t.status = status;
    var span = doc.querySelector('.highlight[data-thread="' + id + '"]');
    if (span && status === 'resolved-accepted' && t && t.agentProposal) {
      span.textContent = t.agentProposal;
      span.classList.remove('highlight--active');
    }
    card.outerHTML = threadCardHTML(t);
    updateThreadCounters();
  }
  inspector.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var card = btn.closest('.comment-thread');
    if (!card) return;
    var action = btn.getAttribute('data-action');
    if (action === 'accept') resolveCard(card, 'resolved-accepted');
    if (action === 'reject') resolveCard(card, 'resolved-rejected');
  });

  function updateThreadCounters() {
    var open = window.PROTO.threads.filter(function (t) { return t.status === 'open'; }).length;
    var resolved = window.PROTO.threads.filter(function (t) {
      return t.status === 'resolved-accepted' || t.status === 'resolved-rejected';
    }).length;
    app.querySelectorAll('[data-proto="threadsOpen"],[data-proto="threadsOpenInline"]').forEach(function (el) {
      el.textContent = open;
    });
    app.querySelectorAll('[data-proto="threadsResolved"],[data-proto="threadsResolvedInline"]').forEach(function (el) {
      el.textContent = resolved;
    });
  }
  updateThreadCounters();

  // Selection → draft card.
  var pendingSpan = null;
  var draftSeq = 0;

  function makeDraft(quote) {
    var stack = state.role === 'operator' ? operatorStack : clientStack;
    if (!stack) return;
    var empty = stack.querySelector('.card:not(.card--interactive)');
    if (empty && empty.textContent.indexOf('Пока пусто') !== -1) empty.remove();
    stack.querySelectorAll('.comment-new').forEach(function (c) { c.remove(); });

    var id = 'draft-' + (++draftSeq);
    var html = '' +
      '<div class="card card--interactive card--shout comment-new" data-state="active" data-draft-id="' + id + '">' +
        '<div class="comment-new__header">' +
          '<div class="t-subtitle">' + (state.role === 'operator' ? 'Konstantin Konstantinopolskii' : 'Нелли Кам') + '</div>' +
          '<p class="t-caption comment-new__preview">' + escapeHTML(quote.slice(0, 80)) + (quote.length > 80 ? '…' : '') + '</p>' +
        '</div>' +
        '<div class="card__collapsible"><div class="card__collapsible-inner">' +
          '<label class="field comment-new__field">' +
            '<input class="t-caption field__input" type="text" placeholder="Ваш комментарий" data-draft-input />' +
            '<span class="field__fake-caret" aria-hidden="true"></span>' +
          '</label>' +
        '</div></div>' +
      '</div>';
    stack.insertAdjacentHTML('afterbegin', html);
    var card = stack.querySelector('[data-draft-id="' + id + '"]');
    collapseGroup(card.closest('.inspector__group'));
    card.setAttribute('data-state', 'active');
    var input = card.querySelector('[data-draft-input]');
    setTimeout(function () { input && input.focus(); }, 60);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        card.remove();
        if (pendingSpan) { unwrapPending(); }
        window.getSelection().removeAllRanges();
      }
      if (e.key === 'Enter' && input.value.trim()) {
        commitDraft(card, quote, input.value.trim());
      }
    });
  }

  function unwrapPending() {
    if (!pendingSpan || !pendingSpan.parentNode) { pendingSpan = null; return; }
    var parent = pendingSpan.parentNode;
    while (pendingSpan.firstChild) parent.insertBefore(pendingSpan.firstChild, pendingSpan);
    parent.removeChild(pendingSpan);
    parent.normalize();
    pendingSpan = null;
  }

  function commitDraft(card, quote, message) {
    var id = 't-' + Date.now();
    var section = pendingSpan ? pendingSpan.closest('.doc__section') : null;
    if (pendingSpan) {
      pendingSpan.setAttribute('data-thread', id);
      pendingSpan = null;
    }
    var thread = {
      id: id,
      section: section ? section.id : null,
      anchorQuote: quote,
      author: state.role === 'operator' ? 'Konstantin Konstantinopolskii' : 'Нелли Кам',
      authorRole: state.role,
      message: message,
      agentProposal: null,
      status: 'open',
      createdAt: 'сейчас'
    };
    window.PROTO.threads.push(thread);
    card.outerHTML = threadCardHTML(thread);
    updateThreadCounters();
    if (state.role === 'client') {
      state.clientComments += 1;
      updateClientComments();
    }
    window.getSelection().removeAllRanges();
  }

  function updateClientComments() {
    app.querySelectorAll('[data-proto="clientCommentCount"]').forEach(function (el) {
      el.textContent = state.clientComments;
    });
  }
  updateClientComments();

  doc.addEventListener('mouseup', function () {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    var range = sel.getRangeAt(0);
    if (!doc.contains(range.commonAncestorContainer)) return;
    var text = sel.toString().trim();
    if (text.length < 3) return;
    if (range.cloneContents().querySelector('.highlight')) return;
    try {
      var span = document.createElement('span');
      span.className = 'highlight';
      range.surroundContents(span);
      pendingSpan = span;
    } catch (err) {
      pendingSpan = null;
    }
    makeDraft(text);
  });

  // -----------------------------------------------------------------
  // Client — tier cards, review form, sign form
  // -----------------------------------------------------------------

  function renderTiers() {
    var stack = document.getElementById('tierStack');
    if (!stack) return;
    stack.innerHTML = window.PROTO.tiers.map(function (t) {
      var items = t.lineItems.map(function (li) { return '<li>' + escapeHTML(li) + '</li>'; }).join('');
      return '' +
        '<div class="card card--interactive" data-tier="' + t.id + '">' +
          '<div class="card__heading">' +
            '<h3 class="t-title">' + escapeHTML(t.name) + '</h3>' +
            '<span class="t-caption--bold" data-price-gated="' + (t.priceGated ? 'true' : 'false') + '">' + escapeHTML(t.price) + '</span>' +
          '</div>' +
          '<div class="card__collapsible"><div class="card__collapsible-inner">' +
            '<ul class="t-list">' + items + '</ul>' +
          '</div></div>' +
          '<button class="button t-subtitle" data-cta="minimized">Подробнее</button>' +
          '<a class="button button--primary t-subtitle" data-cta="active" href="' + escapeHTML(t.href) + '" target="_blank" rel="noopener">' + escapeHTML(t.cta) + '</a>' +
        '</div>';
    }).join('');
  }
  renderTiers();

  // Stars — kit .tag elements; filled stars wear .tag--bold.
  var selectedRating = 0;
  app.querySelectorAll('[data-star]').forEach(function (s) {
    s.addEventListener('click', function () {
      selectedRating = parseInt(s.getAttribute('data-rating'), 10);
      app.querySelectorAll('[data-star]').forEach(function (x) {
        var n = parseInt(x.getAttribute('data-rating'), 10);
        var on = n <= selectedRating;
        x.classList.toggle('tag--bold', on);
        x.setAttribute('aria-checked', on ? 'true' : 'false');
      });
    });
  });

  // Review submit
  var reviewForm = document.getElementById('reviewForm');
  var reviewError = document.querySelector('[data-review-error]');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = reviewForm.querySelector('textarea[name="text"]').value.trim();
      if (!selectedRating || !text) {
        if (reviewError) reviewError.hidden = false;
        return;
      }
      if (reviewError) reviewError.hidden = true;
      try {
        localStorage.setItem('proto.review', JSON.stringify({
          rating: selectedRating,
          text: text,
          public: reviewForm.querySelector('[name="public"]').checked,
          commentCount: state.clientComments,
          at: new Date().toISOString()
        }));
      } catch (_) { /* ignore quota or privacy errors */ }
      state.reviewShared = true;
      app.setAttribute('data-reviewed', 'true');
      updateClientShout();
      var submit = reviewForm.querySelector('button[type="submit"]');
      submit.textContent = 'Отзыв отправлен';
      submit.disabled = true;
      setTimeout(function () {
        document.getElementById('sign-transcript').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    });
  }

  // Sign transcript submit — produces a .md download and flags state.
  var signForm = document.getElementById('signForm');
  if (signForm) {
    signForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!signForm.querySelector('[name="consent"]').checked) return;
      var name = signForm.querySelector('[name="name"]').value.trim() || 'Клиент';
      var email = signForm.querySelector('[name="email"]').value.trim();
      downloadTranscript(name, email);
      state.transcriptSigned = true;
      app.setAttribute('data-transcript-signed', 'true');
      updateClientShout();
    });
  }

  function downloadTranscript(name, email) {
    var header = '# Транскрипция интро-звонка\n\n' +
      '- Менти: Нелли Кам\n' +
      '- Консультант: Konstantin Konstantinopolskii\n' +
      '- Дата: 21 апреля 2026\n' +
      '- Длительность: 32 минуты\n' +
      '- Подписано: ' + name + (email ? ' (' + email + ')' : '') + '\n\n---\n\n';
    var body = '' +
      '[00:00] Konstantin: Как твои дела?\n' +
      '[00:07] Konstantin: Я прочитал все твои документы.\n' +
      '[04:10] Nelly: Ассистентка забирает рутину. Я оставляю себе интересные задачи.\n' +
      '[07:21] Nelly: Но на это надо и внимание, и конвертировать.\n' +
      '[10:19] Nelly: К психиатру я не ходила, диагноза нет.\n' +
      '[12:54] Nelly: Сейчас у меня начато очень много всего.\n' +
      '[14:24] Konstantin: Gross — это до налогов, net — после.\n' +
      '[16:17] Konstantin: Как человек в плакатах может сделать большие деньги?\n' +
      '[20:22] Nelly: И обычно им это норм.\n' +
      '[25:00] Konstantin: Ты работаешь с Америкой.\n' +
      '[27:30] Konstantin: Ок.\n' +
      '[29:14] Konstantin: Кайф было бы выстроить через нетвор, а не через стандартный хайринг.\n' +
      '[31:14] Konstantin: Все.\n';
    var blob = new Blob([header + body], { type: 'text/markdown;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Nelly-Kam-transcript.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Client shout card — primary CTA and status labels rotate with state.
  function updateClientShout() {
    var title = app.querySelector('[data-proto="clientShoutTitle"]');
    var body = app.querySelector('[data-proto="clientShoutBody"]');
    var primary = app.querySelector('[data-proto="clientShoutPrimary"]');
    var access = app.querySelector('[data-proto="accessLabel"]');
    var transcript = app.querySelector('[data-proto="transcriptLabel"]');
    var prices = app.querySelector('[data-proto="pricesLabel"]');
    if (!primary) return;

    if (!state.reviewShared) {
      title.textContent = 'Документ открыт';
      body.textContent = 'Читайте стратегию сверху вниз. Выделяйте куски, чтобы оставить комментарий. Они придут Konstantin вместе с отзывом.';
      primary.textContent = 'Оставить отзыв';
      primary.setAttribute('data-target', '#review');
      access.textContent = 'Бесплатный, полный текст стратегии';
      transcript.textContent = 'Откроется после отзыва';
      prices.textContent = 'Цены раскроются после отзыва';
    } else if (!state.transcriptSigned) {
      title.textContent = 'Отзыв получен';
      body.textContent = 'Теперь доступны транскрипция и тарифы. Подпишите транскрипцию, если хотите скачать.';
      primary.textContent = 'Подписать транскрипцию';
      primary.setAttribute('data-target', '#sign-transcript');
      access.textContent = 'Бесплатный плюс транскрипция';
      transcript.textContent = 'Доступна, подпишите ниже';
      prices.textContent = 'Цены видны в блоке тарифов';
    } else {
      title.textContent = 'Транскрипция подписана';
      body.textContent = 'Можно перейти к тарифам или вернуться к документу. Комментарии всё ещё принимаются.';
      primary.textContent = 'Открыть тарифы';
      primary.setAttribute('data-target', '#tierStack');
      access.textContent = 'Бесплатный плюс транскрипция';
      transcript.textContent = 'Скачана';
      prices.textContent = 'Цены видны, переход через Boosty';
    }
  }
  updateClientShout();

  var clientShoutPrimary = document.getElementById('clientShoutPrimary');
  if (clientShoutPrimary) {
    clientShoutPrimary.addEventListener('click', function (e) {
      var target = clientShoutPrimary.getAttribute('data-target');
      if (target) {
        e.preventDefault();
        var el = document.querySelector(target) || document.getElementById(target.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Stage 4 primary — "Собрать правки агентом" advances to stage 5 and
  // rebuilds threads with agent proposals.
  app.querySelectorAll('[data-stage-card="4"] [data-cta="active"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.stage = 5;
      app.setAttribute('data-stage', '5');
      paintActivePill();
      if (operatorStack) {
        operatorStack.innerHTML = '';
        window.PROTO.threads.forEach(function (t) {
          operatorStack.insertAdjacentHTML('beforeend', threadCardHTML(t));
        });
      }
    });
  });

  // Stage 6 primary — sign and send, jumps to stage 7.
  app.querySelectorAll('[data-stage-card="6"] [data-cta="active"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.stage = 7;
      app.setAttribute('data-stage', '7');
      paintActivePill();
    });
  });

  // Stages 1, 2, 3, 5 primary — advance one step.
  [1, 2, 3, 5].forEach(function (n) {
    app.querySelectorAll('[data-stage-card="' + n + '"] [data-cta="active"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.stage = Math.min(7, n + 1);
        app.setAttribute('data-stage', String(state.stage));
        paintActivePill();
      });
    });
  });

})();
