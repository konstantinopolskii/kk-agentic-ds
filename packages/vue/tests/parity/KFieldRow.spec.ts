import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KFieldRowSfc from '../../sfc/components/KFieldRow.vue'
import KFieldRowOracle from '../../src/components/KFieldRow.js'

describe('KFieldRow parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KFieldRowSfc, KFieldRowOracle, [
      { name: 'label + value prop', props: { label: 'Owner', value: 'Jordan Wells' } },
      { name: 'label + empty value, no slot', props: { label: 'Notes' } },
      {
        name: 'label + slot overrides value',
        props: { label: 'Status', value: 'ignored-fallback' },
        slots: { default: () => 'Active' },
      },
      {
        name: 'label + rich slot',
        props: { label: 'Tags' },
        slots: { default: () => [h('span', { class: 't-muted' }, 'Beta'), ' program'] },
      },
    ])
  })
})
