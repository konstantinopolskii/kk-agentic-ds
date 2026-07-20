/* Behavior for KApp — 1:1 port of the narrow-view [data-view] toggle
   (js/kit.js 443-474), scoped to one .app element instead of kit.js's
   document.querySelector('.app') singleton. Buttons anywhere on the
   page carrying [data-view-target="nav"|"inspector"|"doc"] flip the
   app's data-view; tapping the active target again returns to "doc"
   (except doc itself, which never toggles). Clicking a TOC link while
   a narrow view is open snaps back to "doc" so the reader lands on
   the section they picked. Call after the app element is mounted;
   returns a dispose function for onBeforeUnmount. */
export function useNarrowView(app: HTMLElement): () => void {
  function onDocClick(e: MouseEvent) {
    const el = (e.target as HTMLElement).closest('[data-view-target]') as HTMLElement | null
    if (!el) return
    const target = el.getAttribute('data-view-target')
    if (!target) return
    const next = app.getAttribute('data-view') === target && target !== 'doc' ? 'doc' : target
    app.setAttribute('data-view', next)
  }

  const toc = app.querySelector<HTMLElement>('#toc')
  function onTocClick(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('a[href^="#"]')) app.setAttribute('data-view', 'doc')
  }

  document.addEventListener('click', onDocClick)
  toc?.addEventListener('click', onTocClick)

  return function dispose() {
    document.removeEventListener('click', onDocClick)
    toc?.removeEventListener('click', onTocClick)
  }
}
