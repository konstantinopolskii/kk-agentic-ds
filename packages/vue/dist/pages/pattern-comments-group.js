import { createElementBlock, createElementVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KCard, KCardCollapsible, KCommentStack, KInspectorGroup } from "@konstantinopolskii/vue";
//#region sfc/pages/pattern-comments-group.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "wrap" };
//#endregion
//#region sfc/pages/pattern-comments-group.vue
var pattern_comments_group_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-comments-group",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createVNode(unref(KInspectorGroup), null, {
				default: withCtx(() => [createVNode(unref(KCard), { variant: "heading" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("h2", { class: "t-display" }, "Comments", -1)])]),
					_: 1
				}), createVNode(unref(KCommentStack), null, {
					default: withCtx(() => [
						createVNode(unref(KCard), {
							variant: "interactive",
							class: "comment-thread",
							"data-can-approve": "true"
						}, {
							default: withCtx(() => [_cache[2] || (_cache[2] = createElementVNode("div", { class: "comment-thread__preview" }, [
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
								default: withCtx(() => [..._cache[1] || (_cache[1] = [createElementVNode("div", { class: "comment-thread__list" }, [
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
						}),
						createVNode(unref(KCard), {
							variant: "interactive",
							class: "comment-thread",
							"data-resolved": "true",
							"data-state": "minimized"
						}, {
							default: withCtx(() => [..._cache[3] || (_cache[3] = [createElementVNode("div", { class: "comment-thread__preview" }, [createElementVNode("div", { class: "comment-thread__resolved" }, [
								createElementVNode("span", {
									class: "comment-thread__resolved-stamp t-caption",
									"aria-hidden": "true",
									innerHTML: "&check;"
								}),
								createElementVNode("span", { class: "comment-thread__resolved-snippet t-caption" }, "The signoff timestamp should carry the timezone."),
								createElementVNode("span", { class: "comment-thread__resolved-byline t-caption t-muted" }, "Konstantin Konstantinopolskii")
							])], -1)])]),
							_: 1
						}),
						createVNode(unref(KCard), {
							variant: "interactive",
							class: "comment-thread",
							"data-archived": "true"
						}, {
							default: withCtx(() => [..._cache[4] || (_cache[4] = [createElementVNode("div", { class: "comment-thread__preview" }, [createElementVNode("div", {
								class: "comment-msg",
								"data-message-id": "m-99"
							}, [
								createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Sofia Hlazunova"), createElementVNode("button", {
									class: "comment__menu",
									type: "button",
									"aria-label": "Message actions",
									"aria-expanded": "false"
								}, [createElementVNode("span")])]),
								createElementVNode("p", { class: "t-caption" }, "Early tag sizing notes. Superseded by v1.1."),
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
							])], -1)])]),
							_: 1
						})
					]),
					_: 1
				})]),
				_: 1
			})]);
		};
	}
});
//#endregion
export { pattern_comments_group_default as default };
