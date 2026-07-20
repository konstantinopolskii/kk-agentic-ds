import { describe, it } from 'vitest'
import { expectParity } from './util'
import KSparkSfc from '../../sfc/components/KSpark.vue'
import KSparkOracle from '../../src/components/KSpark.js'

describe('KSpark parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KSparkSfc, KSparkOracle, [
      { name: 'inline default', props: { values: [10, 40, 70, 100], label: 'Trending up' } },
      { name: 'panel', props: { values: [10, 40, 70, 100], label: 'Trending up', panel: true } },
      {
        name: 'soft indices',
        props: { values: [10, 40, 70, 100], label: 'Trending up', soft: [0, 1] },
      },
      {
        name: 'emphasize',
        props: { values: [10, 40, 70, 100], label: 'Trending up', emphasize: 2 },
      },
      {
        name: 'emphasize overrides soft',
        props: {
          values: [10, 40, 70, 100],
          label: 'Trending up',
          soft: [0, 1],
          emphasize: 3,
        },
      },
      {
        name: 'panel with soft',
        props: { values: [5, 15, 25], label: 'Panel history', panel: true, soft: [0] },
      },
    ])
  })
})
