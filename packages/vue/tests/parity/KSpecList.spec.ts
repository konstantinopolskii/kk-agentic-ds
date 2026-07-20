import { describe, it } from 'vitest'
import { expectParity } from './util'
import KSpecListSfc from '../../sfc/components/KSpecList.vue'
import KSpecListOracle from '../../src/components/KSpecList.js'

describe('KSpecList parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KSpecListSfc, KSpecListOracle, [
      {
        name: 'plain default',
        props: { rows: [{ key: 'Format', values: ['PDF'] }] },
      },
      {
        name: 'value variant',
        props: {
          variant: 'value',
          rows: [{ key: 'Format', values: ['PDF', 'Exported for print'] }],
        },
      },
      {
        name: 'triple variant',
        props: {
          variant: 'triple',
          rows: [
            { key: 'Claim', values: ['Fast', 'Actually slow', 'Cache added'] },
          ],
        },
      },
      {
        name: 'multiple rows',
        props: {
          rows: [
            { key: 'Format', values: ['PDF'] },
            { key: 'Pages', values: ['12'] },
          ],
        },
      },
    ])
  })
})
