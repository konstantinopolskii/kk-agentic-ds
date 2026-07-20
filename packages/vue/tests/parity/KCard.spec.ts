import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KCardSfc from '../../sfc/components/KCard.vue'
import KCardOracle from '../../src/components/KCard.js'

describe('KCard parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KCardSfc, KCardOracle, [
      { name: 'static default', slots: { default: () => 'Body copy' } },
      { name: 'slot absent' },
      { name: 'interactive no state', props: { variant: 'interactive' }, slots: { default: () => 'Row' } },
      {
        name: 'interactive state active',
        props: { variant: 'interactive', state: 'active' },
        slots: { default: () => 'Row' },
      },
      {
        name: 'interactive state minimized',
        props: { variant: 'interactive', state: 'minimized' },
        slots: { default: () => 'Row' },
      },
      {
        name: 'state ignored off interactive',
        props: { variant: 'static', state: 'active' },
        slots: { default: () => 'Row' },
      },
      {
        name: 'link with href',
        props: { variant: 'link', href: '/docs/intro' },
        slots: { default: () => 'Open the doc' },
      },
      { name: 'link without href', props: { variant: 'link' }, slots: { default: () => 'Open' } },
      { name: 'shout', props: { variant: 'shout' }, slots: { default: () => 'Headline' } },
      { name: 'heading', props: { variant: 'heading' }, slots: { default: () => 'Group title' } },
      { name: 'selectable', props: { selectable: true }, slots: { default: () => 'Pick me' } },
      { name: 'tight', props: { tight: true }, slots: { default: () => 'Snug' } },
      { name: 'span third', props: { span: 'third' }, slots: { default: () => 'Panel' } },
      { name: 'span half', props: { span: 'half' }, slots: { default: () => 'Panel' } },
      { name: 'span two-thirds', props: { span: 'two-thirds' }, slots: { default: () => 'Panel' } },
      { name: 'span full', props: { span: 'full' }, slots: { default: () => 'Panel' } },
      { name: 'lead', props: { lead: true }, slots: { default: () => 'Front page' } },
      {
        name: 'every modifier combined',
        props: {
          variant: 'interactive',
          state: 'active',
          selectable: true,
          tight: true,
          span: 'half',
          lead: true,
        },
        slots: { default: () => 'Kitchen sink' },
      },
      {
        name: 'rich slot',
        slots: { default: () => [h('h3', { class: 't-title' }, 'Heading'), h('p', null, 'Body')] },
      },
    ])
  })
})
