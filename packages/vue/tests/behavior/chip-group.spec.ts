/* Chip group behavior: chips inside a v-model KChipWrap form a segment
   group — clicking one selects it and flips aria-pressed on the pair.
   A chip outside any wrap is standalone: it only ever reflects the
   pressed prop handed to it. */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createApp, defineComponent, h, nextTick, ref } from 'vue'
import KChipWrap from '../../sfc/components/KChipWrap.vue'
import KChip from '../../sfc/components/KChip.vue'

let host: HTMLDivElement

beforeEach(() => {
  host = document.createElement('div')
  document.body.appendChild(host)
})

afterEach(() => {
  host.remove()
})

describe('chip group', () => {
  it('clicking a grouped chip updates the model and flips aria-pressed', async () => {
    const Harness = defineComponent({
      setup() {
        const selected = ref<string | undefined>(undefined)
        return () =>
          h(
            KChipWrap,
            {
              modelValue: selected.value,
              'onUpdate:modelValue': (v: string | number | undefined) => {
                selected.value = v as string | undefined
              },
            },
            {
              default: () => [
                h(KChip, { value: 'a' }, { default: () => 'A' }),
                h(KChip, { value: 'b' }, { default: () => 'B' }),
              ],
            },
          )
      },
    })

    const app = createApp(Harness)
    app.mount(host)

    const [chipA, chipB] = Array.from(host.querySelectorAll('button.chip'))
    expect(chipA.getAttribute('aria-pressed')).toBe('false')
    expect(chipB.getAttribute('aria-pressed')).toBe('false')

    ;(chipA as HTMLElement).click()
    await nextTick()
    expect(chipA.getAttribute('aria-pressed')).toBe('true')
    expect(chipB.getAttribute('aria-pressed')).toBe('false')

    ;(chipB as HTMLElement).click()
    await nextTick()
    expect(chipA.getAttribute('aria-pressed')).toBe('false')
    expect(chipB.getAttribute('aria-pressed')).toBe('true')

    app.unmount()
  })

  it('a standalone chip (no wrap) reflects only the pressed prop', async () => {
    const app = createApp(KChip, { pressed: true })
    app.mount(host)

    const chip = host.querySelector('button.chip')!
    expect(chip.getAttribute('aria-pressed')).toBe('true')

    // Clicking does not self-toggle — standalone chips carry no
    // internal state, only the parent-supplied pressed prop.
    ;(chip as HTMLElement).click()
    await nextTick()
    expect(chip.getAttribute('aria-pressed')).toBe('true')

    app.unmount()
  })

  it('a standalone chip defaults to aria-pressed false', () => {
    const app = createApp(KChip)
    app.mount(host)

    const chip = host.querySelector('button.chip')!
    expect(chip.getAttribute('aria-pressed')).toBe('false')

    app.unmount()
  })
})
