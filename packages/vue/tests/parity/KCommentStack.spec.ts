import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KCommentStackSfc from '../../sfc/components/KCommentStack.vue'
import KCommentStackOracle from '../../src/components/KCommentStack.js'

describe('KCommentStack parity', () => {
  it('matches the h() oracle with and without slot content', async () => {
    await expectParity(KCommentStackSfc, KCommentStackOracle, [
      { name: 'empty' },
      {
        name: 'pre-rendered thread',
        slots: { default: () => h('div', { class: 'card comment-thread' }, 'Thread') },
      },
    ])
  })
})
