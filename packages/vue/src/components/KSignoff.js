import { h } from 'vue'
import KStat from './KStat.js'

/* Signoff — canonical document ending. Stats grid (two or four,
   never three) + byline + handwritten signature SVG. Every doc
   ships signed. */
export default {
  name: 'KSignoff',
  props: {
    stats: {
      type: Array,
      required: true,
      validator: (v) => v.length === 2 || v.length === 4,
    },
    author: { type: String, required: true },
    role: { type: String, required: true },
    org: { type: String, required: true },
    stamp: { type: String, required: true },
    signatureSrc: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h('div', { class: 'book__signoff' }, [
        h(
          'div',
          { class: 'book__signoff-stats' },
          props.stats.map((stat) => h(KStat, { value: stat.value, text: stat.text })),
        ),
        h('div', { class: 'book__signoff-signature' }, [
          h('p', { class: 't-caption' }, [
            'Signed by ',
            h('span', { class: 't-caption--bold' }, `${props.author},`),
            h('br'),
            `${props.role} at `,
            h('span', { class: 't-caption--bold' }, props.org),
            h('br'),
            h('span', { class: 't-muted' }, props.stamp),
          ]),
          h('img', {
            class: 'book__signoff-signature-img',
            src: props.signatureSrc,
            alt: 'Signature',
          }),
        ]),
      ])
  },
}
