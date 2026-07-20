import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KFrontDesksSfc from '../../sfc/components/KFrontDesks.vue'
import KFrontDesksOracle from '../../src/components/KFrontDesks.js'

describe('KFrontDesks parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KFrontDesksSfc, KFrontDesksOracle, [
      { name: 'default slot', slots: { default: () => 'Desk card' } },
      {
        name: 'rich slot',
        slots: { default: () => [h('a', { class: 'card card--link' }, 'Desk one')] },
      },
    ])
  })
})
