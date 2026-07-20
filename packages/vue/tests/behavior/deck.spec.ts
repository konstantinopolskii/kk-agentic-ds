import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useDeck } from '../../sfc/composables/useDeck'

// happy-dom resolves matchMedia against an internal viewport that plain
// `window.innerWidth = n` assignment does not update — the dedicated
// happyDOM.setInnerWidth API is what actually moves the breakpoint.
function setViewportWidth(width: number) {
  ;(window as unknown as { happyDOM: { setInnerWidth: (w: number) => void } }).happyDOM.setInnerWidth(width)
}

let host: HTMLDivElement

beforeEach(() => {
  host = document.createElement('div')
  document.body.appendChild(host)
})

afterEach(() => {
  host.remove()
  setViewportWidth(1024)
})

function buildDeck(): HTMLElement {
  host.innerHTML = `
    <div class="deck">
      <div class="deck-card"><button class="deck-card__select">Choose</button></div>
      <div class="deck-card"><button class="deck-card__select">Choose</button></div>
    </div>
  `
  return host.querySelector('.deck') as HTMLElement
}

describe('useDeck behavior', () => {
  it('the first card is active on bind', () => {
    const deck = buildDeck()
    const dispose = useDeck(deck)
    const cards = deck.querySelectorAll('.deck-card')
    expect(cards[0].classList.contains('active')).toBe(true)
    expect(cards[1].classList.contains('active')).toBe(false)
    dispose()
  })

  it('desktop: mouseenter makes a card active', () => {
    setViewportWidth(1280) // above the 1024px mobile-stack breakpoint
    const deck = buildDeck()
    const dispose = useDeck(deck)
    const cards = deck.querySelectorAll('.deck-card')

    cards[1].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    expect(cards[1].classList.contains('active')).toBe(true)
    expect(cards[0].classList.contains('active')).toBe(false)

    dispose()
  })

  it('mobile: a horizontal drag past the threshold advances the active card', () => {
    setViewportWidth(375) // below the 1024px mobile-stack breakpoint
    const deck = buildDeck()
    const dispose = useDeck(deck)
    const wrapper = deck

    wrapper.dispatchEvent(new TouchEvent('touchstart', { changedTouches: [{ clientX: 200, clientY: 0 } as Touch] }))
    wrapper.dispatchEvent(
      new TouchEvent('touchmove', { changedTouches: [{ clientX: 150, clientY: 0 } as Touch], cancelable: true }),
    )

    const cards = deck.querySelectorAll('.deck-card')
    expect(cards[1].classList.contains('active')).toBe(true)

    dispose()
  })

  it('clicking the active card toggles Chosen', () => {
    setViewportWidth(1280)
    const deck = buildDeck()
    const dispose = useDeck(deck)
    const cards = deck.querySelectorAll('.deck-card')

    ;(cards[0] as HTMLElement).click()

    const btn = cards[0].querySelector('.deck-card__select') as HTMLElement
    expect(btn.classList.contains('is-chosen')).toBe(true)
    expect(btn.textContent).toContain('Chosen')

    dispose()
  })

  it('choosing a different card clears the previous choice', () => {
    setViewportWidth(1280)
    const deck = buildDeck()
    const dispose = useDeck(deck)
    const cards = deck.querySelectorAll('.deck-card')

    ;(cards[0] as HTMLElement).click()
    cards[1].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    ;(cards[1] as HTMLElement).click()

    const btn0 = cards[0].querySelector('.deck-card__select') as HTMLElement
    const btn1 = cards[1].querySelector('.deck-card__select') as HTMLElement
    expect(btn0.classList.contains('is-chosen')).toBe(false)
    expect(btn0.textContent).toBe('Choose')
    expect(btn1.classList.contains('is-chosen')).toBe(true)

    dispose()
  })

  it('is idempotent — binding an already-bound wrapper a second time is a no-op', () => {
    setViewportWidth(1280)
    const deck = buildDeck()
    const dispose1 = useDeck(deck)
    const dispose2 = useDeck(deck)
    dispose2()
    expect(deck.getAttribute('data-kk-deck-bound')).toBe('true')
    dispose1()
  })
})
