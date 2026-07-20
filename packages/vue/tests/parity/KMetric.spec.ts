import { describe, it } from 'vitest'
import { expectParity } from './util'
import KMetricSfc from '../../sfc/components/KMetric.vue'
import KMetricOracle from '../../src/components/KMetric.js'

describe('KMetric parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KMetricSfc, KMetricOracle, [
      { name: 'value only', props: { value: '42' } },
      { name: 'numeric value', props: { value: 42 } },
      { name: 'with label', props: { value: '128', label: 'Active users' } },
      { name: 'with delta', props: { value: '128', delta: '↑ 12%' } },
      { name: 'label and delta', props: { value: '128', label: 'Active users', delta: '↓ 4%' } },
    ])
  })
})
