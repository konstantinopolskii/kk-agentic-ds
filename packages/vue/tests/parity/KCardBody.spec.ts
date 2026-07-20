import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KCardBodySfc from '../../sfc/components/KCardBody.vue'
import KCardBodyOracle from '../../src/components/KCardBody.js'

describe('KCardBody parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KCardBodySfc, KCardBodyOracle, [
      { name: 'slot absent' },
      { name: 'simple text slot', slots: { default: () => 'Prose lives here.' } },
      {
        name: 'rich slot',
        slots: { default: () => [h('p', null, 'First graf'), h('p', null, 'Second graf')] },
      },
    ])
  })
})
