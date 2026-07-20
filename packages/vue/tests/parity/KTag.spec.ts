import { describe, it } from 'vitest'
import { expectParity } from './util'
import KTagSfc from '../../sfc/components/KTag.vue'
import KTagOracle from '../../src/components/KTag.js'

describe('KTag parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KTagSfc, KTagOracle, [
      { name: 'default', slots: { default: () => 'New' } },
      { name: 'bold', props: { bold: true }, slots: { default: () => 'Shipped' } },
      { name: 'empty slot', props: {} },
    ])
  })
})
