import { describe, it } from 'vitest'
import { expectParity } from './util'
import KAvatarSfc from '../../sfc/components/KAvatar.vue'
import KAvatarOracle from '../../src/components/KAvatar.js'

describe('KAvatar parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KAvatarSfc, KAvatarOracle, [
      { name: 'initials', slots: { default: () => 'AK' } },
      { name: 'empty', props: {} },
    ])
  })
})
