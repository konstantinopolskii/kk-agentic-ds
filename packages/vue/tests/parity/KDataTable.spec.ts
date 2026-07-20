import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KDataTableSfc from '../../sfc/components/KDataTable.vue'
import KDataTableOracle from '../../src/components/KDataTable.js'

describe('KDataTable parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KDataTableSfc, KDataTableOracle, [
      { name: 'string columns', props: { columns: ['Product', 'Revenue'] } },
      {
        name: 'object columns with num',
        props: { columns: [{ label: 'Product' }, { label: 'Revenue', num: true }] },
      },
      {
        name: 'mixed columns with rows',
        props: { columns: ['Product', { label: 'Revenue', num: true }] },
        slots: {
          default: () =>
            h('tr', [h('td', 'Widget'), h('td', { class: 'data-table__num' }, '1,204')]),
        },
      },
    ])
  })
})
