import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KChipSfc from '../../sfc/components/KChip.vue'
import KChipOracle from '../../src/components/KChip.js'

describe('KChip parity', () => {
  it('matches the h() oracle across all variants (standalone, no group context)', async () => {
    await expectParity(KChipSfc, KChipOracle, [
      { name: 'default', slots: { default: () => 'Filter' } },
      { name: 'pressed', props: { pressed: true }, slots: { default: () => 'Active' } },
      { name: 'value set but ungrouped', props: { value: 'a' }, slots: { default: () => 'A' } },
      { name: 'numeric value ungrouped', props: { value: 2, pressed: true }, slots: { default: () => '2' } },
      {
        name: 'rich slot',
        slots: { default: () => [h('span', { class: 't-muted' }, 'Case'), ' load'] },
      },
    ])
  })
})
