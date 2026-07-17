import { h } from 'vue'

/* Comment thread — interactive card with the collapsible message
   list. Structure only: kebab menu, edit flow, archive, and reply
   behavior live in js/kit.js, which binds to this same DOM. Messages
   carry data-message-id; agent messages carry data-author-role. */
export default {
  name: 'KCommentThread',
  props: {
    title: { type: String, required: true },
    state: {
      type: String,
      default: 'minimized',
      validator: (v) => ['active', 'minimized'].includes(v),
    },
    archived: { type: Boolean, default: false },
    messages: { type: Array, required: true },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          class: 'card card--interactive comment-thread',
          'data-state': props.state,
          ...(props.archived ? { 'data-archived': 'true' } : {}),
        },
        [
          h('div', { class: 'card__heading' }, [h('h3', { class: 't-title' }, props.title)]),
          h('div', { class: 'card__collapsible' }, [
            h(
              'div',
              { class: 'card__collapsible-inner' },
              props.messages.map((msg) =>
                h(
                  'div',
                  {
                    class: 'comment-msg',
                    'data-message-id': msg.id,
                    ...(msg.role === 'agent' ? { 'data-author-role': 'agent' } : {}),
                  },
                  [h('p', { class: 't-caption' }, msg.body)],
                ),
              ),
            ),
          ]),
        ],
      )
  },
}
