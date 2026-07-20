import { describe, it } from 'vitest'
import { expectParity } from './util'
import KFrontMastheadSfc from '../../sfc/components/KFrontMasthead.vue'
import KFrontMastheadOracle from '../../src/components/KFrontMasthead.js'

describe('KFrontMasthead parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KFrontMastheadSfc, KFrontMastheadOracle, [
      { name: 'title only', props: { title: 'The Daily Kit' } },
      {
        name: 'title + dateline',
        props: { title: 'The Daily Kit', dateline: 'July 20, 2026' },
      },
    ])
  })
})
