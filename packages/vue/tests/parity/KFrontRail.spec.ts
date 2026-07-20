import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KFrontRailSfc from '../../sfc/components/KFrontRail.vue'
import KFrontRailOracle from '../../src/components/KFrontRail.js'

describe('KFrontRail parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KFrontRailSfc, KFrontRailOracle, [
      { name: 'no title', slots: { default: () => 'Latest item' } },
      { name: 'with title', props: { title: 'Latest' }, slots: { default: () => 'Latest item' } },
      {
        name: 'rich slot',
        props: { title: 'Latest' },
        slots: { default: () => [h('div', { class: 'media-row' }, 'Row')] },
      },
    ])
  })
})
