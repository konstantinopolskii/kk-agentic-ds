import { describe, it } from 'vitest'
import { expectParity } from './util'
import KQuoteSfc from '../../sfc/components/KQuote.vue'
import KQuoteOracle from '../../src/components/KQuote.js'

describe('KQuote parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KQuoteSfc, KQuoteOracle, [
      { name: 'no cite', slots: { default: () => 'Do simple things, well.' } },
      {
        name: 'with cite',
        props: { cite: 'Ada Lovelace' },
        slots: { default: () => 'The Analytical Engine weaves algebraic patterns.' },
      },
      { name: 'cite, slot absent', props: { cite: 'Anonymous' } },
      { name: 'fully empty', props: {} },
    ])
  })
})
