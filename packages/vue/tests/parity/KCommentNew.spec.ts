import { describe, it } from 'vitest'
import { expectParity } from './util'
import KCommentNewSfc from '../../sfc/components/KCommentNew.vue'
import KCommentNewOracle from '../../src/components/KCommentNew.js'

describe('KCommentNew parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KCommentNewSfc, KCommentNewOracle, [
      { name: 'default' },
      { name: 'custom title', props: { title: 'Leave feedback' } },
      { name: 'custom placeholder', props: { placeholder: 'Say something' } },
      { name: 'with draft text', props: { modelValue: 'Looks right now, thank you' } },
      { name: 'custom commit label', props: { commitLabel: 'Post' } },
      {
        name: 'fully customized',
        props: {
          title: 'Leave feedback',
          placeholder: 'Say something',
          modelValue: 'Almost there',
          commitLabel: 'Post',
        },
      },
    ])
  })
})
