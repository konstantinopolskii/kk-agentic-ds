import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KCardCollapsibleSfc from '../../sfc/components/KCardCollapsible.vue'
import KCardCollapsibleOracle from '../../src/components/KCardCollapsible.js'

describe('KCardCollapsible parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KCardCollapsibleSfc, KCardCollapsibleOracle, [
      { name: 'slot absent, not flush' },
      { name: 'slot absent, flush', props: { flush: true } },
      { name: 'wrapped body', slots: { default: () => 'Revealed prose.' } },
      { name: 'flush drops wrapper', props: { flush: true }, slots: { default: () => 'Owns its own bleed.' } },
      {
        name: 'rich slot wrapped',
        slots: { default: () => [h('p', null, 'One'), h('p', null, 'Two')] },
      },
      {
        name: 'rich slot flush',
        props: { flush: true },
        slots: { default: () => [h('div', { class: 'field' }, 'Field'), h('div', { class: 'field' }, 'Field')] },
      },
    ])
  })
})
