import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createApp, h, nextTick, ref, type App } from 'vue'
import KModal from '../../sfc/components/KModal.vue'

let host: HTMLDivElement
let app: App | null = null

beforeEach(() => {
  host = document.createElement('div')
  document.body.appendChild(host)
})

afterEach(() => {
  app?.unmount()
  app = null
  host.remove()
  document.documentElement.style.overflow = ''
})

/* v-model needs a reactive parent — createApp(comp, props) alone can't
   flip modelValue after mount, so we wrap in a tiny host component that
   owns the ref and forwards update:modelValue back into it. */
function mountModal(id: string) {
  const open = ref(false)
  app = createApp({
    setup() {
      return () =>
        h(
          KModal,
          {
            id,
            title: 'Publish deliverable',
            modelValue: open.value,
            'onUpdate:modelValue': (v: boolean) => {
              open.value = v
            },
          },
          { default: () => h('button', { class: 'body-btn' }, 'Body action') },
        )
    },
  })
  app.mount(host)
  return { open }
}

function modalEl(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement
}

describe('KModal behavior', () => {
  it('v-model open flips data-state + aria-hidden', async () => {
    const { open } = mountModal('m-state')
    const modal = modalEl('m-state')
    expect(modal.getAttribute('data-state')).toBe('closed')
    expect(modal.getAttribute('aria-hidden')).toBe('true')

    open.value = true
    await nextTick()
    expect(modal.getAttribute('data-state')).toBe('open')
    expect(modal.getAttribute('aria-hidden')).toBe('false')

    open.value = false
    await nextTick()
    expect(modal.getAttribute('data-state')).toBe('closed')
    expect(modal.getAttribute('aria-hidden')).toBe('true')
  })

  it('Escape closes and emits update:modelValue', async () => {
    const { open } = mountModal('m-esc')
    open.value = true
    await nextTick()
    expect(modalEl('m-esc').getAttribute('data-state')).toBe('open')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(open.value).toBe(false)
    expect(modalEl('m-esc').getAttribute('data-state')).toBe('closed')
  })

  it('scrim click closes', async () => {
    const { open } = mountModal('m-scrim')
    open.value = true
    await nextTick()

    const scrim = modalEl('m-scrim').querySelector('.modal__scrim') as HTMLElement
    scrim.click()
    await nextTick()
    expect(open.value).toBe(false)
  })

  it('[data-modal-close] closes', async () => {
    const { open } = mountModal('m-close')
    open.value = true
    await nextTick()

    const closeBtn = modalEl('m-close').querySelector('.modal__close') as HTMLElement
    closeBtn.click()
    await nextTick()
    expect(open.value).toBe(false)
  })

  it('focus lands in the dialog on open', async () => {
    const { open } = mountModal('m-focus')
    open.value = true
    await nextTick()

    const dialog = modalEl('m-focus').querySelector('.modal__dialog') as HTMLElement
    expect(dialog.contains(document.activeElement)).toBe(true)
  })

  it('locks documentElement overflow while open, releases on close', async () => {
    const { open } = mountModal('m-scroll')
    expect(document.documentElement.style.overflow).toBe('')

    open.value = true
    await nextTick()
    expect(document.documentElement.style.overflow).toBe('hidden')

    open.value = false
    await nextTick()
    expect(document.documentElement.style.overflow).toBe('')
  })
})
