import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KInspectorGroupSfc from '../../sfc/components/KInspectorGroup.vue'
import KInspectorGroupOracle from '../../src/components/KInspectorGroup.js'

describe('KInspectorGroup parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KInspectorGroupSfc, KInspectorGroupOracle, [
      { name: 'default slot', slots: { default: () => 'Card one' } },
      {
        name: 'rich slot',
        slots: { default: () => [h('div', { class: 'card' }, 'One'), h('div', { class: 'card' }, 'Two')] },
      },
    ])
  })
})
