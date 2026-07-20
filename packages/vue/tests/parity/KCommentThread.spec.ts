import { describe, it } from 'vitest'
import { expectParity } from './util'
import KCommentThreadSfc from '../../sfc/components/KCommentThread.vue'
import KCommentThreadOracle from '../../src/components/KCommentThread.js'

describe('KCommentThread parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KCommentThreadSfc, KCommentThreadOracle, [
      {
        name: 'minimized, single user message',
        props: {
          title: 'Sofia Hlazunova',
          messages: [{ id: 'm-01', body: 'The tag row needs one more variant.' }],
        },
      },
      {
        name: 'active state',
        props: {
          title: 'Sofia Hlazunova',
          state: 'active',
          messages: [{ id: 'm-01', body: 'The tag row needs one more variant.' }],
        },
      },
      {
        name: 'archived thread',
        props: {
          title: 'Sofia Hlazunova',
          archived: true,
          messages: [{ id: 'm-01', body: 'The tag row needs one more variant.' }],
        },
      },
      {
        name: 'agent message carries data-author-role',
        props: {
          title: 'Sofia Hlazunova',
          messages: [
            { id: 'm-01', body: 'The tag row needs one more variant.' },
            { id: 'm-03', body: 'Added a bold tag at the end of the row.', role: 'agent' },
          ],
        },
      },
      {
        name: 'multi-message thread, active + archived combined',
        props: {
          title: 'Konstantin Konstantinopolskii',
          state: 'active',
          archived: true,
          messages: [
            { id: 'm-01', body: 'First' },
            { id: 'm-02', body: 'Second' },
            { id: 'm-03', body: 'Third', role: 'agent' },
          ],
        },
      },
    ])
  })
})
