import { describe, it } from 'vitest'
import { expectParity } from './util'
import KFigureSfc from '../../sfc/components/KFigure.vue'
import KFigureOracle from '../../src/components/KFigure.js'

describe('KFigure parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KFigureSfc, KFigureOracle, [
      { name: 'no caption', slots: { default: () => 'diagram content' } },
      {
        name: 'with caption',
        props: { caption: 'Figure 1: pipeline' },
        slots: { default: () => 'diagram content' },
      },
      { name: 'caption, slot absent', props: { caption: 'Figure 2: empty' } },
      { name: 'fully empty', props: {} },
    ])
  })
})
