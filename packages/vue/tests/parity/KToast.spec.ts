import { describe, it } from 'vitest'
import { expectParity } from './util'
import KToastSfc from '../../sfc/components/KToast.vue'
import KToastOracle from '../../src/components/KToast.js'

describe('KToast parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KToastSfc, KToastOracle, [
      { name: 'text only', props: { text: 'Saved' } },
      { name: 'text + action', props: { text: 'Draft saved', action: 'Undo' } },
    ])
  })
})
