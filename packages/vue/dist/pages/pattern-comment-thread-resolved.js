import { createBlock, createElementVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KCommentStack } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/pattern-comment-thread-resolved.vue
var pattern_comment_thread_resolved_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-comment-thread-resolved",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KCommentStack), null, {
				default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("div", {
					class: "card card--interactive comment-thread",
					"data-resolved": "true",
					"data-state": "minimized"
				}, [createElementVNode("div", { class: "comment-thread__preview" }, [createElementVNode("div", { class: "comment-thread__resolved" }, [
					createElementVNode("span", {
						class: "comment-thread__resolved-stamp t-caption",
						"aria-hidden": "true",
						innerHTML: "&check;"
					}),
					createElementVNode("span", { class: "comment-thread__resolved-snippet t-caption" }, "The signoff timestamp should carry the timezone."),
					createElementVNode("span", { class: "comment-thread__resolved-byline t-caption t-muted" }, "Konstantin Konstantinopolskii")
				])])], -1)])]),
				_: 1
			});
		};
	}
});
//#endregion
export { pattern_comment_thread_resolved_default as default };
