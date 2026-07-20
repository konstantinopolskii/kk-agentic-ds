/* Behavior for KSidebarNav + KBook — 1:1 port of the sidebar TOC
   generator (js/kit.js 1940-2133) and the scroll-spy module
   (js/kit.js 260-441), scoped to one (book, nav) pair instead of
   kit.js's document-level singletons (document.getElementById('toc'),
   document.querySelector('.book')). Call once, after both elements
   are in the DOM (e.g. a shell's onMounted); returns a dispose
   function that disconnects the observer and removes every listener
   this call added — kit.js itself never tears down since it is a
   page-level singleton, but a composable scoped to a component
   instance must give that instance a clean unmount path.

   Two passes, same order KK.init()/KK.refresh() run them:
     1. buildSidebarToc — stamps ids on every book__section (any
        depth) and its direct h2/h3 children (hand-authored ids win),
        then (unless nav carries data-nav="manual") rebuilds the nav's
        children from the heading rank: multi-h1, h2+h3, or flat.
     2. initScrollSpy — IntersectionObserver drives the active nav
        link + translate3d TOC indicator; clicking a nav link glides
        the book to the target section and pins the indicator until
        the glide settles. */
function slugify(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const glideIds = new WeakMap<HTMLElement, number>()
function glideScroll(el: HTMLElement, target: number, duration: number) {
  const startTop = el.scrollTop
  const distance = target - startTop
  if (Math.abs(distance) < 1) return
  const startTime = performance.now()
  const myId = (glideIds.get(el) ?? 0) + 1
  glideIds.set(el, myId)
  function step(now: number) {
    if (glideIds.get(el) !== myId) return
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    el.scrollTop = startTop + distance * eased
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function getPrimaryHeading(section: Element): Element | null {
  return section.querySelector('h1, h2, h3')
}

// Heading text minus any post-<br> sub-label (kit.js 1973-1988).
function headingLabel(h: Element | null): string {
  if (!h) return ''
  let label = ''
  for (let i = 0; i < h.childNodes.length; i++) {
    const n = h.childNodes[i]
    if (n.nodeName === 'BR') break
    label += n.textContent || ''
  }
  return label.trim()
}

function stampHeadingIds(book: HTMLElement) {
  const allSections = book.querySelectorAll('article.book__section')
  allSections.forEach((section) => {
    if (!section.id) {
      const h = getPrimaryHeading(section)
      if (h) {
        const id = slugify(headingLabel(h))
        if (id) section.id = id
      }
    }
    section.querySelectorAll(':scope > h2, :scope > h3').forEach((h) => {
      if (!h.id) {
        const id = slugify(headingLabel(h))
        if (id) (h as HTMLElement).id = id
      }
    })
  })
}

interface NavItem {
  label: string
  href: string
}

function buildSidebarToc(book: HTMLElement, nav: HTMLElement) {
  if (nav.getAttribute('data-nav') === 'manual') return

  stampHeadingIds(book)

  const topSections = Array.from(book.querySelectorAll(':scope > article.book__section'))
  if (topSections.length === 0) return

  function topHeadingTag(section: Element): string | null {
    const h = getPrimaryHeading(section)
    return h ? h.tagName : null
  }

  const h1Sections = topSections.filter((s) => topHeadingTag(s) === 'H1')
  const multiH1 = h1Sections.length >= 2
  const anyH3 = topSections.some((s) => s.querySelector(':scope > h3') !== null)

  // Clear nav, preserving the indicator span.
  let indicator = nav.querySelector<HTMLElement>('.toc__indicator')
  Array.from(nav.children).forEach((child) => {
    if (child !== indicator) nav.removeChild(child)
  })
  if (!indicator) {
    indicator = document.createElement('span')
    indicator.className = 'toc__indicator'
    indicator.setAttribute('aria-hidden', 'true')
    nav.appendChild(indicator)
  }

  function makeGroup(headLabel: string | null, headHref: string | null, items: NavItem[]) {
    const section = document.createElement('section')
    section.className = 'nav-group'
    if (headLabel && headHref) {
      const head = document.createElement('a')
      head.className = 't-subtitle nav-group__head'
      head.setAttribute('href', '#' + headHref)
      head.textContent = headLabel
      section.appendChild(head)
    }
    if (items && items.length) {
      const ul = document.createElement('ul')
      ul.className = 'nav-group__items'
      items.forEach((it) => {
        if (!it.label || !it.href) return
        const li = document.createElement('li')
        li.className = 't-caption'
        const a = document.createElement('a')
        a.setAttribute('href', '#' + it.href)
        a.textContent = it.label
        li.appendChild(a)
        ul.appendChild(li)
      })
      if (ul.children.length) section.appendChild(ul)
    }
    return section
  }

  if (multiH1) {
    topSections.forEach((s) => {
      const primary = getPrimaryHeading(s)
      if (!primary || primary.tagName !== 'H1') return
      const label = headingLabel(primary)
      const href = s.id
      if (!href || !label) return

      const nested = Array.from(s.querySelectorAll('article.book__section'))
      const items = nested
        .map((inner) => {
          const h = getPrimaryHeading(inner)
          if (!h || h.tagName !== 'H2') return null
          return { label: headingLabel(h), href: inner.id }
        })
        .filter((it): it is NavItem => !!it)

      nav.appendChild(makeGroup(label, href, items))
    })
  } else if (anyH3) {
    topSections.forEach((s) => {
      const primary = getPrimaryHeading(s)
      if (!primary) return
      if (primary.tagName === 'H1') return // lead article

      const label = headingLabel(primary)
      const href = s.id
      if (!href || !label) return

      const h3s = Array.from(s.querySelectorAll(':scope > h3'))
      const items = h3s
        .map((h3) => ({ label: headingLabel(h3), href: (h3 as HTMLElement).id }))
        .filter((it) => it.label && it.href)

      nav.appendChild(makeGroup(label, href, items))
    })
  } else {
    const items = topSections
      .map((s) => {
        const primary = getPrimaryHeading(s)
        if (!primary) return null
        if (primary.tagName === 'H1') return null // lead article
        return { label: headingLabel(primary), href: s.id }
      })
      .filter((it): it is NavItem => !!(it && it.label && it.href))

    if (items.length) nav.appendChild(makeGroup(null, null, items))
  }
}

function initScrollSpy(book: HTMLElement, nav: HTMLElement): () => void {
  if (!('IntersectionObserver' in window)) return () => {}

  const indicator = nav.querySelector<HTMLElement>('.toc__indicator')

  function firstAnchoredId(): string | null {
    const a = nav.querySelector('a[href^="#"]')
    return a ? a.getAttribute('href')!.slice(1) : null
  }
  function anchoredOrFirst(id: string | null): string | null {
    if (id && nav.querySelector(`a[href="#${id}"]`)) return id
    return firstAnchoredId()
  }

  function moveIndicator(activeEl: Element | null) {
    if (!indicator) return
    if (!activeEl) {
      indicator.classList.remove('is-positioned')
      return
    }
    const navRect = nav.getBoundingClientRect()
    const elRect = activeEl.getBoundingClientRect()
    const top = elRect.top - navRect.top
    indicator.style.transform = `translate3d(0,${top}px,0)`
    indicator.style.height = elRect.height + 'px'
    if (!indicator.classList.contains('is-positioned')) {
      indicator.classList.add('is-positioned')
      requestAnimationFrame(() => {
        indicator.classList.add('is-tracking')
      })
    }
  }

  function scrollActiveIntoView(activeEl: Element | null) {
    if (!activeEl) return
    const sidebar = activeEl.closest('.sidebar') as HTMLElement | null
    if (!sidebar || getComputedStyle(sidebar).display === 'none') return
    const group = (activeEl.closest('.nav-group') as HTMLElement | null) || (activeEl as HTMLElement)
    const sRect = sidebar.getBoundingClientRect()
    const gRect = group.getBoundingClientRect()
    if (gRect.top >= sRect.top && gRect.bottom <= sRect.bottom) return
    let delta: number
    if (gRect.top < sRect.top || gRect.height > sRect.height) {
      delta = gRect.top - sRect.top
    } else {
      delta = gRect.bottom - sRect.bottom
    }
    glideScroll(sidebar, sidebar.scrollTop + delta, 320)
  }

  function setActive(id: string | null) {
    let activeAnchor: Element | null = null
    nav.querySelectorAll('a[href^="#"]').forEach((a) => {
      const key = a.getAttribute('href')!.slice(1)
      const on = key === id
      const p = a.parentElement
      if (p) p.classList.toggle('is-active', on)
      if (on) activeAnchor = a
    })
    nav.querySelectorAll('.nav-group').forEach((group) => {
      group.classList.toggle('is-active', !!(activeAnchor && group.contains(activeAnchor)))
    })
    moveIndicator(activeAnchor)
    scrollActiveIntoView(activeAnchor)
  }

  const visible = new Set<string>()
  let scrollLocked = false
  let pendingRelease: (() => void) | null = null
  let pendingTimeoutId: ReturnType<typeof setTimeout> | null = null

  function bestVisible(): string | null {
    const liveSections = book.querySelectorAll('.book__section')
    for (let i = 0; i < liveSections.length; i++) {
      if (visible.has(liveSections[i].id)) return liveSections[i].id
    }
    return null
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add((entry.target as HTMLElement).id)
        else visible.delete((entry.target as HTMLElement).id)
      })
      if (scrollLocked) return
      setActive(anchoredOrFirst(bestVisible()))
    },
    { root: book, rootMargin: '0px 0px -60% 0px', threshold: 0 },
  )

  const firstSections = book.querySelectorAll('.book__section')
  firstSections.forEach((s) => observer.observe(s))
  const firstId = firstSections[0]?.id ?? null
  setActive(anchoredOrFirst(firstId))

  function onResize() {
    const activeAnchor = nav.querySelector(
      '.nav-group__items li.is-active > a, .nav-group.is-active > a.nav-group__head',
    )
    if (activeAnchor) moveIndicator(activeAnchor)
  }
  window.addEventListener('resize', onResize)

  function onNavClick(e: Event) {
    const a = (e.target as HTMLElement).closest('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')!.slice(1)
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()

    setActive(id)
    history.replaceState(null, '', '#' + id)

    if (pendingRelease) pendingRelease()
    scrollLocked = true
    const release = () => {
      if (pendingTimeoutId) clearTimeout(pendingTimeoutId)
      scrollLocked = false
      book.removeEventListener('scrollend', release)
      book.removeEventListener('wheel', release)
      book.removeEventListener('touchstart', release)
      pendingRelease = null
      pendingTimeoutId = null
      setActive(anchoredOrFirst(bestVisible()))
    }
    pendingRelease = release
    book.addEventListener('scrollend', release, { once: true })
    book.addEventListener('wheel', release, { once: true, passive: true })
    book.addEventListener('touchstart', release, { once: true, passive: true })
    pendingTimeoutId = setTimeout(release, 1500)

    const top = Math.max(
      0,
      book.scrollTop + target.getBoundingClientRect().top - book.getBoundingClientRect().top - 20,
    )
    glideScroll(book, top, 320)
  }
  nav.addEventListener('click', onNavClick)

  return function dispose() {
    observer.disconnect()
    window.removeEventListener('resize', onResize)
    nav.removeEventListener('click', onNavClick)
    if (pendingRelease) pendingRelease()
  }
}

/* Call after both elements are mounted (e.g. from a shell's onMounted).
   Returns a dispose function; call it from onBeforeUnmount. */
export function useScrollSpy(book: HTMLElement, nav: HTMLElement): () => void {
  buildSidebarToc(book, nav)
  return initScrollSpy(book, nav)
}
