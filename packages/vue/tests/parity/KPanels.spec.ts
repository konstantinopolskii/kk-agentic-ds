import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KPanelsSfc from '../../sfc/components/KPanels.vue'
import KPanelsOracle from '../../src/components/KPanels.js'

describe('KPanels parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KPanelsSfc, KPanelsOracle, [
      { name: 'default slot', slots: { default: () => 'Panel card' } },
      {
        name: 'rich slot',
        slots: { default: () => [h('div', { class: 'card panel--half' }, 'One')] },
      },
    ])
  })
})
