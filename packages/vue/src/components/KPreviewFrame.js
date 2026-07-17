import { h } from 'vue'

/* Preview frame — kit-doc primitive. The wrapper clips; the iframe
   renders at 400% and scales to 0.25. Both classes are load-bearing. */
export default {
  name: 'KPreviewFrame',
  props: {
    src: { type: String, required: true },
    title: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h('div', { class: 'preview-frame' }, [
        h('iframe', {
          class: 'preview-frame__iframe',
          src: props.src,
          title: props.title,
          loading: 'lazy',
        }),
      ])
  },
}
