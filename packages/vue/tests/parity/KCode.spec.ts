import { describe, it } from 'vitest'
import { expectParity } from './util'
import KCodeSfc from '../../sfc/components/KCode.vue'
import KCodeOracle from '../../src/components/KCode.js'

describe('KCode parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KCodeSfc, KCodeOracle, [
      { name: 'inline', slots: { default: () => 'npm install' } },
      { name: 'block', props: { block: true }, slots: { default: () => 'const x = 1' } },
      { name: 'inline empty', props: {} },
      { name: 'block empty', props: { block: true } },
    ])
  })
})
