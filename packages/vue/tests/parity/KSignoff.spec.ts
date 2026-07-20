import { describe, it } from 'vitest'
import { expectParity } from './util'
import KSignoffSfc from '../../sfc/components/KSignoff.vue'
import KSignoffOracle from '../../src/components/KSignoff.js'

describe('KSignoff parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KSignoffSfc, KSignoffOracle, [
      {
        name: 'two stats',
        props: {
          stats: [
            { value: '42', text: 'deliverables shipped' },
            { value: '3.2x', text: 'faster than baseline' },
          ],
          author: 'Konstantin Konstantinopolskii',
          role: 'Design lead',
          org: 'Directions',
          stamp: 'July 2026',
          signatureSrc: '/signature.svg',
        },
      },
      {
        name: 'four stats',
        props: {
          stats: [
            { value: '42', text: 'deliverables shipped' },
            { value: '3.2x', text: 'faster than baseline' },
            { value: '8', text: 'reviewers signed off' },
            { value: '100%', text: 'parity coverage' },
          ],
          author: 'Konstantin Konstantinopolskii',
          role: 'Design lead',
          org: 'Directions',
          stamp: 'July 2026',
          signatureSrc: '/signature.svg',
        },
      },
    ])
  })
})
