import { describe, it } from 'vitest'
import { expectParity } from './util'
import KStatSfc from '../../sfc/components/KStat.vue'
import KStatOracle from '../../src/components/KStat.js'

describe('KStat parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KStatSfc, KStatOracle, [
      { name: 'default', props: { value: '42', text: 'deliverables shipped' } },
      { name: 'longer sentence', props: { value: '3.2x', text: 'faster than baseline' } },
    ])
  })
})
