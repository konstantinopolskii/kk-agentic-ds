import { describe, it, expect, afterEach, vi } from 'vitest'
import { toast } from '../../sfc/composables/toast'

afterEach(() => {
  document.querySelectorAll('.toast-stack').forEach((el) => el.remove())
  vi.useRealTimers()
})

describe('toast() behavior', () => {
  it('creates a stack on body and flips the toast to open', () => {
    const el = toast('Saved')!
    const stack = document.querySelector('.toast-stack[data-toast-stack]')
    expect(stack).not.toBeNull()
    expect(stack?.contains(el)).toBe(true)
    expect(el.getAttribute('data-state')).toBe('open')
    expect(el.querySelector('.toast__text')?.textContent).toBe('Saved')
  })

  it('reuses the existing stack on a second call', () => {
    const first = toast('First')!
    const second = toast('Second')!
    const stacks = document.querySelectorAll('.toast-stack[data-toast-stack]')
    expect(stacks.length).toBe(1)
    expect(stacks[0].contains(first)).toBe(true)
    expect(stacks[0].contains(second)).toBe(true)
  })

  it('runs onAction and dismisses when the action button is clicked', () => {
    const onAction = vi.fn()
    const el = toast('Draft saved', { action: 'Undo', onAction })!
    const action = el.querySelector('.toast__action') as HTMLButtonElement
    expect(action.textContent).toBe('Undo')

    action.click()
    expect(onAction).toHaveBeenCalledTimes(1)
    expect(el.getAttribute('data-state')).toBe('closed')
  })

  it('dismisses on × click', () => {
    const el = toast('Saved')!
    const close = el.querySelector('.toast__close') as HTMLButtonElement
    expect(close.getAttribute('aria-label')).toBe('Dismiss')

    close.click()
    expect(el.getAttribute('data-state')).toBe('closed')
  })

  it('is sticky when duration is 0', () => {
    vi.useFakeTimers()
    const el = toast('Sticky', { duration: 0 })!
    vi.advanceTimersByTime(10_000)
    expect(el.getAttribute('data-state')).toBe('open')
  })

  it('auto-dismisses after the default 4000ms', () => {
    vi.useFakeTimers()
    const el = toast('Auto')!
    expect(el.getAttribute('data-state')).toBe('open')

    vi.advanceTimersByTime(3999)
    expect(el.getAttribute('data-state')).toBe('open')

    vi.advanceTimersByTime(1)
    expect(el.getAttribute('data-state')).toBe('closed')

    // Fallback teardown (transitionend never fires under fake timers).
    vi.advanceTimersByTime(400)
    expect(el.parentNode).toBeNull()
  })
})
