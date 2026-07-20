import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KBookSfc from '../../sfc/components/KBook.vue'
import KBookOracle from '../../src/components/KBook.js'

describe('KBook parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KBookSfc, KBookOracle, [
      { name: 'default id', slots: { default: () => 'Section content' } },
      { name: 'custom id', props: { id: 'reading' }, slots: { default: () => 'Section content' } },
      {
        name: 'rich slot',
        slots: { default: () => [h('article', { class: 'book__section' }, 'One')] },
      },
    ])
  })
})
