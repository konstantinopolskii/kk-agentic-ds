/* patterns.js — local behavioural layer for patterns.html only.
 *
 * Wires the pattern registry's click-to-preview flow:
 *   - scoped to [data-preview-src] under #patterns — atoms + elements
 *     live in tables and navigate via target="_blank", not the inspector
 *   - clicking a trigger sets src on the inspector's
 *     <iframe data-preview-target> and flips data-state="active" on
 *     the trigger, demoting any sibling trigger to nothing.
 *
 * This file is loaded only by patterns.html. The maintainer may
 * promote the handler into kit.js as a generic [data-preview-src]
 * module if a second consumer ever lands. Flagged in
 * documentation/2026-04-23-fundamental/phase-3-patterns-rework.md.
 */
(function () {
  'use strict';

  function init() {
    var frame = document.querySelector('iframe[data-preview-target]');
    if (!frame) return;

    var scope = document.querySelector('#patterns');
    if (!scope) return;

    var triggers = scope.querySelectorAll('[data-preview-src]');
    if (!triggers.length) return;

    function setActive(el) {
      triggers.forEach(function (t) {
        if (t === el) t.setAttribute('data-state', 'active');
        else t.removeAttribute('data-state');
      });
    }

    function load(src, label) {
      if (!src) return;
      if (frame.getAttribute('src') === src) return;
      frame.setAttribute('src', src);
      if (label) frame.setAttribute('title', label + ' preview');
    }

    scope.addEventListener('click', function (e) {
      // Escape hatch — the "Open in new tab" link inside a card must
      // not drive the inspector; let the native anchor behaviour win.
      if (e.target.closest('[data-preview-escape]')) return;

      var trigger = e.target.closest('[data-preview-src]');
      if (!trigger || !scope.contains(trigger)) return;
      e.preventDefault();
      var src = trigger.getAttribute('data-preview-src');
      var label = trigger.getAttribute('data-preview-label') || '';
      load(src, label);
      setActive(trigger);
    });

    // Default preview on first paint. The first [data-preview-default]
    // trigger wins; fall back to the first [data-preview-src] in the
    // patterns section if no default is flagged.
    var initial = scope.querySelector('[data-preview-default]')
               || triggers[0];
    if (initial) {
      load(
        initial.getAttribute('data-preview-src'),
        initial.getAttribute('data-preview-label') || ''
      );
      setActive(initial);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
