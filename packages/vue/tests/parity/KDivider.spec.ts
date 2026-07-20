import { describe, it } from 'vitest'
import { expectParity } from './util'
import KDividerSfc from '../../sfc/components/KDivider.vue'
import KDividerOracle from '../../src/components/KDivider.js'

describe('KDivider parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KDividerSfc, KDividerOracle, [
      { name: 'default', props: {} },
      { name: 'ignores slot content', slots: { default: () => 'should not render' } },
    ])
  })
})
