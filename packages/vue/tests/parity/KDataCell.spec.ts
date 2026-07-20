import { describe, it } from 'vitest'
import { expectParity } from './util'
import KDataCellSfc from '../../sfc/components/KDataCell.vue'
import KDataCellOracle from '../../src/components/KDataCell.js'

describe('KDataCell parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KDataCellSfc, KDataCellOracle, [
      { name: 'default', slots: { default: () => 'Widget' } },
      { name: 'lead', props: { lead: true }, slots: { default: () => 'Widget' } },
      { name: 'num', props: { num: true }, slots: { default: () => '1,204' } },
      { name: 'delta', props: { delta: true }, slots: { default: () => '↑ 12%' } },
      {
        name: 'delta flat',
        props: { delta: true, flat: true },
        slots: { default: () => '0%' },
      },
      {
        name: 'lead wins over num',
        props: { lead: true, num: true },
        slots: { default: () => 'Widget' },
      },
      {
        name: 'delta wins over num',
        props: { delta: true, num: true },
        slots: { default: () => '↓ 4%' },
      },
    ])
  })
})
