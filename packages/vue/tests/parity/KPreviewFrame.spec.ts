import { describe, it } from 'vitest'
import { expectParity } from './util'
import KPreviewFrameSfc from '../../sfc/components/KPreviewFrame.vue'
import KPreviewFrameOracle from '../../src/components/KPreviewFrame.js'

describe('KPreviewFrame parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KPreviewFrameSfc, KPreviewFrameOracle, [
      { name: 'default', props: { src: '/demo/button.html', title: 'Button demo' } },
      { name: 'different src and title', props: { src: '/demo/card.html', title: 'Card demo' } },
    ])
  })
})
