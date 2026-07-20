import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KFrontSfc from '../../sfc/components/KFront.vue'
import KFrontOracle from '../../src/components/KFront.js'

describe('KFront parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KFrontSfc, KFrontOracle, [
      { name: 'default slot', slots: { default: () => 'Masthead' } },
      {
        name: 'rich slot',
        slots: { default: () => [h('header', { class: 'front__masthead' }, 'Hero')] },
      },
    ])
  })
})
