import { describe, it } from 'vitest'
import { expectParity } from './util'
import KCardHeadingSfc from '../../sfc/components/KCardHeading.vue'
import KCardHeadingOracle from '../../src/components/KCardHeading.js'

describe('KCardHeading parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KCardHeadingSfc, KCardHeadingOracle, [
      { name: 'title only', props: { title: 'Growth plan' } },
      { name: 'title + empty subtitle', props: { title: 'Growth plan', subtitle: '' } },
      { name: 'title + subtitle', props: { title: 'Growth plan', subtitle: 'Q3 review' } },
      {
        name: 'title + subtitle muted',
        props: { title: 'Growth plan', subtitle: 'Q3 review', muted: true },
      },
      { name: 'muted with no subtitle', props: { title: 'Growth plan', muted: true } },
    ])
  })
})
