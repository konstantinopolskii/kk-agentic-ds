import { describe, it } from 'vitest'
import { expectParity } from './util'
import KSparkLabelsSfc from '../../sfc/components/KSparkLabels.vue'
import KSparkLabelsOracle from '../../src/components/KSparkLabels.js'

describe('KSparkLabels parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KSparkLabelsSfc, KSparkLabelsOracle, [
      { name: 'first peak last', props: { labels: ['Jan', 'Jun', 'Dec'] } },
      { name: 'single label', props: { labels: ['Now'] } },
    ])
  })
})
