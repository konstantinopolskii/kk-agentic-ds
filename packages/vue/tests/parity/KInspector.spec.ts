import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KInspectorSfc from '../../sfc/components/KInspector.vue'
import KInspectorOracle from '../../src/components/KInspector.js'

describe('KInspector parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KInspectorSfc, KInspectorOracle, [
      { name: 'default label', slots: { default: () => 'Card stack' } },
      { name: 'custom label', props: { label: 'Comments' }, slots: { default: () => 'Card stack' } },
      {
        name: 'rich slot',
        slots: { default: () => [h('div', { class: 'card' }, 'Interactive')] },
      },
    ])
  })
})
