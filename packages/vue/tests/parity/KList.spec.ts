import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KListSfc from '../../sfc/components/KList.vue'
import KListOracle from '../../src/components/KList.js'

describe('KList parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KListSfc, KListOracle, [
      { name: 'unordered items', props: { items: ['One', 'Two'] } },
      { name: 'ordered items', props: { ordered: true, items: ['First', 'Second'] } },
      {
        name: 'default slot wins over items',
        props: { items: ['ignored'] },
        slots: { default: () => [h('li', 'Custom A'), h('li', 'Custom B')] },
      },
      { name: 'ordered slot', props: { ordered: true }, slots: { default: () => h('li', 'Only') } },
      { name: 'no items, no slot', props: {} },
    ])
  })
})
