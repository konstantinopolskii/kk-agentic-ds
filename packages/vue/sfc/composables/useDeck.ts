/* Deck behavior — 1:1 port of js/kit.js 700-821. No K component owns
   this: the 3D card-stack deck is legacy markup (.deck > .deck-card),
   so this composable takes the deck root element directly instead of
   kit.js's document.querySelectorAll('.deck') sweep. Desktop hovers a
   card to the front; mobile drags horizontally past a 30px threshold.
   Either way, tapping the already-front card toggles "Chosen" on its
   .deck-card__select button (exclusive within the deck), and the
   deck snaps back to the chosen card on mouseleave.

   kit.js reads KK.config.i18n.deckChoose/deckChosen for the select
   button's label text; there is no equivalent global config in the
   Vue port, so those two strings are an explicit `i18n` argument
   (same English defaults kit.js ships). Call once per deck element
   (e.g. from a consumer's onMounted); returns a dispose function. */
function attrEscape(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export interface DeckI18n {
  deckChoose: string
  deckChosen: string
}

const defaultI18n: DeckI18n = { deckChoose: 'Choose', deckChosen: 'Chosen' }

export function useDeck(wrapper: HTMLElement, i18n: DeckI18n = defaultI18n): () => void {
  if (wrapper.getAttribute('data-kk-deck-bound') === 'true') return () => {}
  const cards = Array.from(wrapper.querySelectorAll<HTMLElement>('.deck-card'))
  if (cards.length === 0) return () => {}

  const isMobileStack = window.matchMedia('(max-width: 1024px)').matches
  let currentIndex = 0
  const disposers: Array<() => void> = []

  function setActiveCard(index: number) {
    cards.forEach((c) => c.classList.remove('active'))
    cards[index].classList.add('active')
    currentIndex = index
  }

  function setChosen(card: HTMLElement) {
    wrapper.querySelectorAll('.deck-card__select.is-chosen').forEach((other) => {
      if (other.closest('.deck-card') === card) return
      other.classList.remove('is-chosen')
      other.textContent = i18n.deckChoose
    })
    const btn = card.querySelector<HTMLElement>('.deck-card__select')
    if (!btn) return
    if (btn.classList.contains('is-chosen')) {
      btn.classList.remove('is-chosen')
      btn.textContent = i18n.deckChoose
    } else {
      btn.classList.add('is-chosen')
      btn.innerHTML =
        '<span class="deck-card__check" aria-hidden="true"></span>' + attrEscape(i18n.deckChosen)
    }
  }

  setActiveCard(0)

  if (isMobileStack) {
    // Touch handlers live on the wrapper, not on an overlay — an
    // overlay would swallow every tap and route the synthesized
    // click to a non-card target.
    wrapper.style.touchAction = 'pan-y'

    let touchStartX = 0
    let touchStartY = 0
    let lastSwitchX = 0
    let isHSwipe = false

    function onTouchStart(e: TouchEvent) {
      touchStartX = e.changedTouches[0].clientX
      touchStartY = e.changedTouches[0].clientY
      lastSwitchX = touchStartX
      isHSwipe = false
    }
    function onTouchMove(e: TouchEvent) {
      const cx = e.changedTouches[0].clientX
      const cy = e.changedTouches[0].clientY
      const dx = Math.abs(cx - touchStartX)
      const dy = Math.abs(cy - touchStartY)
      if (!isHSwipe && (dx > 10 || dy > 10)) isHSwipe = dx > dy
      if (isHSwipe) {
        e.preventDefault()
        const drag = cx - lastSwitchX
        if (Math.abs(drag) >= 30) {
          setActiveCard(
            drag > 0 ? (currentIndex > 0 ? currentIndex - 1 : cards.length - 1) : (currentIndex + 1) % cards.length,
          )
          lastSwitchX = cx
        }
      }
    }
    // Suppress the click that a horizontal swipe synthesizes on
    // touchend, so a swipe-to-advance doesn't accidentally toggle
    // "Chosen" on the card under the finger.
    function onClickCapture(e: MouseEvent) {
      if (isHSwipe) {
        e.stopPropagation()
        e.preventDefault()
        isHSwipe = false
      }
    }

    wrapper.addEventListener('touchstart', onTouchStart, { passive: true })
    wrapper.addEventListener('touchmove', onTouchMove, { passive: false })
    wrapper.addEventListener('click', onClickCapture, true)

    disposers.push(() => {
      wrapper.removeEventListener('touchstart', onTouchStart)
      wrapper.removeEventListener('touchmove', onTouchMove)
      wrapper.removeEventListener('click', onClickCapture, true)
    })
  } else {
    const enterHandlers: Array<[HTMLElement, () => void]> = []
    cards.forEach((card, index) => {
      const handler = () => setActiveCard(index)
      card.addEventListener('mouseenter', handler)
      enterHandlers.push([card, handler])
    })

    // When the cursor leaves the stack, snap back to the chosen
    // card. Hovering is browsing; a choice outranks it.
    function onMouseLeave() {
      const chosenBtn = wrapper.querySelector('.deck-card__select.is-chosen')
      if (!chosenBtn) return
      const chosenCard = chosenBtn.closest('.deck-card') as HTMLElement | null
      const idx = chosenCard ? cards.indexOf(chosenCard) : -1
      if (idx !== -1 && idx !== currentIndex) setActiveCard(idx)
    }
    wrapper.addEventListener('mouseleave', onMouseLeave)

    disposers.push(() => {
      enterHandlers.forEach(([card, handler]) => card.removeEventListener('mouseenter', handler))
      wrapper.removeEventListener('mouseleave', onMouseLeave)
    })
  }

  // Per-card click. A wrapper-level listener would resolve against
  // closest('.deck-card'), which fails when a sibling inside the
  // wrapper catches the tap.
  const clickHandlers: Array<[HTMLElement, () => void]> = []
  cards.forEach((card, index) => {
    const handler = () => {
      if (!card.classList.contains('active')) {
        setActiveCard(index)
        return
      }
      setChosen(card)
    }
    card.addEventListener('click', handler)
    clickHandlers.push([card, handler])
  })
  disposers.push(() => {
    clickHandlers.forEach(([card, handler]) => card.removeEventListener('click', handler))
  })

  wrapper.setAttribute('data-kk-deck-bound', 'true')

  return function dispose() {
    disposers.forEach((d) => d())
    wrapper.removeAttribute('data-kk-deck-bound')
  }
}
