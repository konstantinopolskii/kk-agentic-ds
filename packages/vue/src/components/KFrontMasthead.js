import { h } from 'vue'

/* Front masthead — hero title over a micro dateline. Once per front. */
export default {
  name: 'KFrontMasthead',
  props: {
    title: { type: String, required: true },
    dateline: { type: String, default: '' },
  },
  setup(props) {
    return () =>
      h('header', { class: 'front__masthead' }, [
        h('h1', { class: 't-hero' }, props.title),
        props.dateline ? h('p', { class: 't-micro t-muted' }, props.dateline) : null,
      ])
  },
}
