import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KCardStackSfc from '../../sfc/components/KCardStack.vue'
import KCardStackOracle from '../../src/components/KCardStack.js'

describe('KCardStack parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KCardStackSfc, KCardStackOracle, [
      { name: 'slot absent' },
      { name: 'default stack', slots: { default: () => 'Card A' } },
      { name: 'columns stack', props: { columns: true }, slots: { default: () => 'Card A' } },
      {
        name: 'rich slot, multiple cards',
        slots: { default: () => [h('div', { class: 'card' }, 'One'), h('div', { class: 'card' }, 'Two')] },
      },
    ])
  })
})
