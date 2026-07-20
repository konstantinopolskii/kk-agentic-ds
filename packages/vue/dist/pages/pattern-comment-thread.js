import { createBlock, createElementVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KCard, KCardCollapsible, KCommentStack } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/pattern-comment-thread.vue
var pattern_comment_thread_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-comment-thread",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KCommentStack), null, {
				default: withCtx(() => [createVNode(unref(KCard), {
					variant: "interactive",
					class: "comment-thread",
					"data-can-approve": "true"
				}, {
					default: withCtx(() => [_cache[1] || (_cache[1] = createElementVNode("div", { class: "comment-thread__preview" }, [
						createElementVNode("div", {
							class: "comment-msg",
							"data-message-id": "m-01"
						}, [
							createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Sofia Hlazunova"), createElementVNode("button", {
								class: "comment__menu",
								type: "button",
								"aria-label": "Message actions",
								"aria-expanded": "false"
							}, [createElementVNode("span")])]),
							createElementVNode("p", { class: "t-caption" }, "The tag row needs one more variant to cover the metadata case."),
							createElementVNode("div", {
								class: "comment__menu-popover",
								role: "menu"
							}, [
								createElementVNode("button", {
									class: "comment__menu-item comment__menu-item--approve t-caption",
									type: "button",
									role: "menuitem"
								}, "Approve"),
								createElementVNode("button", {
									class: "comment__menu-item t-caption",
									type: "button",
									role: "menuitem"
								}, "Edit"),
								createElementVNode("button", {
									class: "comment__menu-item t-caption",
									type: "button",
									role: "menuitem"
								}, "Reply"),
								createElementVNode("button", {
									class: "comment__menu-item t-caption",
									type: "button",
									role: "menuitem"
								}, "Archive thread"),
								createElementVNode("button", {
									class: "comment__menu-item t-caption",
									type: "button",
									role: "menuitem"
								}, "Delete")
							])
						]),
						createElementVNode("div", {
							class: "comment-thread__ellipsis",
							"aria-hidden": "true"
						}, [
							createElementVNode("span"),
							createElementVNode("span"),
							createElementVNode("span")
						]),
						createElementVNode("div", {
							class: "comment-msg",
							"data-message-id": "m-03",
							"data-author-role": "agent"
						}, [
							createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Claude"), createElementVNode("button", {
								class: "comment__menu",
								type: "button",
								"aria-label": "Message actions",
								"aria-expanded": "false"
							}, [createElementVNode("span")])]),
							createElementVNode("p", { class: "t-caption" }, "Added a bold tag at the end of the row. Take a look."),
							createElementVNode("div", {
								class: "comment__menu-popover",
								role: "menu"
							}, [
								createElementVNode("button", {
									class: "comment__menu-item comment__menu-item--approve t-caption",
									type: "button",
									role: "menuitem"
								}, "Approve"),
								createElementVNode("button", {
									class: "comment__menu-item t-caption",
									type: "button",
									role: "menuitem"
								}, "Edit"),
								createElementVNode("button", {
									class: "comment__menu-item t-caption",
									type: "button",
									role: "menuitem"
								}, "Reply"),
								createElementVNode("button", {
									class: "comment__menu-item t-caption",
									type: "button",
									role: "menuitem"
								}, "Archive thread"),
								createElementVNode("button", {
									class: "comment__menu-item t-caption",
									type: "button",
									role: "menuitem"
								}, "Delete")
							])
						])
					], -1)), createVNode(unref(KCardCollapsible), { flush: true }, {
						default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("div", { class: "comment-thread__list" }, [
							createElementVNode("div", {
								class: "comment-msg",
								"data-message-id": "m-01"
							}, [
								createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Sofia Hlazunova"), createElementVNode("button", {
									class: "comment__menu",
									type: "button",
									"aria-label": "Message actions",
									"aria-expanded": "false"
								}, [createElementVNode("span")])]),
								createElementVNode("p", { class: "t-caption" }, "The tag row needs one more variant to cover the metadata case."),
								createElementVNode("div", {
									class: "comment__menu-popover",
									role: "menu"
								}, [
									createElementVNode("button", {
										class: "comment__menu-item comment__menu-item--approve t-caption",
										type: "button",
										role: "menuitem"
									}, "Approve"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Edit"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Reply"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Archive thread"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Delete")
								])
							]),
							createElementVNode("div", {
								class: "comment-msg",
								"data-message-id": "m-02"
							}, [
								createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Konstantin Konstantinopolskii"), createElementVNode("button", {
									class: "comment__menu",
									type: "button",
									"aria-label": "Message actions",
									"aria-expanded": "false"
								}, [createElementVNode("span")])]),
								createElementVNode("p", { class: "t-caption" }, "Claude, add a bold tag to the row."),
								createElementVNode("div", {
									class: "comment__menu-popover",
									role: "menu"
								}, [
									createElementVNode("button", {
										class: "comment__menu-item comment__menu-item--approve t-caption",
										type: "button",
										role: "menuitem"
									}, "Approve"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Edit"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Reply"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Archive thread"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Delete")
								])
							]),
							createElementVNode("div", {
								class: "comment-msg",
								"data-message-id": "m-03",
								"data-author-role": "agent"
							}, [
								createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Claude"), createElementVNode("button", {
									class: "comment__menu",
									type: "button",
									"aria-label": "Message actions",
									"aria-expanded": "false"
								}, [createElementVNode("span")])]),
								createElementVNode("p", { class: "t-caption" }, "Added a bold tag at the end of the row. Take a look."),
								createElementVNode("div", {
									class: "comment__menu-popover",
									role: "menu"
								}, [
									createElementVNode("button", {
										class: "comment__menu-item comment__menu-item--approve t-caption",
										type: "button",
										role: "menuitem"
									}, "Approve"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Edit"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Reply"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Archive thread"),
									createElementVNode("button", {
										class: "comment__menu-item t-caption",
										type: "button",
										role: "menuitem"
									}, "Delete")
								])
							])
						], -1), createElementVNode("label", { class: "field comment-thread__reply" }, [createElementVNode("input", {
							class: "t-caption field__input",
							type: "text",
							placeholder: "looks right now, thank you"
						}), createElementVNode("span", {
							class: "field__fake-caret",
							"aria-hidden": "true"
						})], -1)])]),
						_: 1
					})]),
					_: 1
				})]),
				_: 1
			});
		};
	}
});
//#endregion
export { pattern_comment_thread_default as default };
