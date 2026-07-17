import { h } from 'vue'

/* Card heading — h3.t-title plus optional caption subtitle. muted
   demotes the subtitle to metadata, the shout-card pairing. */
export default {
  name: 'KCardHeading',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    muted: { type: Boolean, default: false },
  },
  setup(props) {
    return () =>
      h('div', { class: 'card__heading' }, [
        h('h3', { class: 't-title' }, props.title),
        props.subtitle
          ? h('p', { class: props.muted ? 't-caption t-muted' : 't-caption' }, props.subtitle)
          : null,
      ])
  },
}
