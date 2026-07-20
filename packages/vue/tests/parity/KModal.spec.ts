import { describe, it } from 'vitest'
import { expectParity } from './util'
import KModalSfc from '../../sfc/components/KModal.vue'
import KModalOracle from '../../src/components/KModal.js'

describe('KModal parity', () => {
  it('matches the h() oracle across all variants (closed state)', async () => {
    await expectParity(KModalSfc, KModalOracle, [
      { name: 'default', props: { id: 'm1', title: 'Publish deliverable' } },
      {
        name: 'with subtitle',
        props: {
          id: 'm2',
          title: 'Publish deliverable',
          subtitle: 'This shares the signed charter with the client workspace.',
        },
      },
      {
        name: 'with body slot',
        props: { id: 'm3', title: 'Archive thread' },
        slots: { default: () => 'This cannot be undone.' },
      },
      {
        name: 'with foot slot',
        props: { id: 'm4', title: 'Publish deliverable' },
        slots: {
          default: () => 'Body copy.',
          foot: () => 'Cancel Publish',
        },
      },
      {
        name: 'subtitle + foot slot',
        props: {
          id: 'm5',
          title: 'Publish deliverable',
          subtitle: 'Shares the signed charter.',
        },
        slots: {
          default: () => 'Body copy.',
          foot: () => 'Cancel Publish',
        },
      },
      {
        name: 'empty title',
        props: { id: 'm6' },
      },
    ])
  })
})
