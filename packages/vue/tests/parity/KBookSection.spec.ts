import { describe, it } from 'vitest'
import { expectParity } from './util'
import KBookSectionSfc from '../../sfc/components/KBookSection.vue'
import KBookSectionOracle from '../../src/components/KBookSection.js'

describe('KBookSection parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KBookSectionSfc, KBookSectionOracle, [
      { name: 'no id', slots: { default: () => 'Body copy' } },
      { name: 'with id', props: { id: 'overview' }, slots: { default: () => 'Body copy' } },
    ])
  })
})
