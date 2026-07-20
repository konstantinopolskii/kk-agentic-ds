import { describe, it } from 'vitest'
import { expectParity } from './util'
import KPaginationSfc from '../../sfc/components/KPagination.vue'
import KPaginationOracle from '../../src/components/KPagination.js'

describe('KPagination parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KPaginationSfc, KPaginationOracle, [
      { name: 'defaults (current + window unset)', props: { pages: 3 } },
      { name: 'small range, no gap', props: { pages: 5, current: 1 } },
      { name: 'exact window+2 boundary, no gap', props: { pages: 7, current: 1 } },
      { name: 'gap right only, prev disabled', props: { pages: 8, current: 1 } },
      { name: 'gap left only, next disabled', props: { pages: 8, current: 8 } },
      { name: 'gaps both sides', props: { pages: 20, current: 10 } },
      { name: 'custom window override', props: { pages: 10, current: 5, window: 3 } },
    ])
  })
})
