import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KCard, KCardHeading, KInspector, KInspectorGroup, KNavGroup, KSidebar, KSidebarNav } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/pattern-three-column-shell.vue
var pattern_three_column_shell_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-three-column-shell",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), null, {
				default: withCtx(() => [
					createVNode(unref(KSidebar), { title: "Fundamental" }, {
						footer: withCtx(() => [..._cache[0] || (_cache[0] = [
							createTextVNode(" 2026, kk.consulting", -1),
							createElementVNode("br", null, null, -1),
							createTextVNode(" Fundamental demo ", -1)
						])]),
						default: withCtx(() => [createVNode(unref(KSidebarNav), null, {
							default: withCtx(() => [createVNode(unref(KNavGroup), {
								head: "Prose",
								items: [{
									label: "Opening",
									href: "#opening"
								}, {
									label: "Reading",
									href: "#reading"
								}]
							})]),
							_: 1
						})]),
						_: 1
					}),
					createVNode(unref(KBook), { id: "doc" }, {
						default: withCtx(() => [
							createVNode(unref(KBookSection), null, {
								default: withCtx(() => [..._cache[1] || (_cache[1] = [createElementVNode("h1", { class: "t-hero" }, "Fundamental", -1), createElementVNode("p", { class: "t-body" }, " The middle column is what we read. Sidebar on the left carries the map. Inspector on the right carries actions and comments. ", -1)])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "opening" }, {
								default: withCtx(() => [..._cache[2] || (_cache[2] = [createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" Opening"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium t-muted" }, "Hero, intro, part break")
								], -1), createElementVNode("p", { class: "t-body" }, " Document-shaped. Seven parts, each a section in the middle column. The sidebar tracks position; the inspector holds state. ", -1)])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "reading" }, {
								default: withCtx(() => [..._cache[3] || (_cache[3] = [createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" Reading"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium t-muted" }, "Body, caption, micro")
								], -1), createElementVNode("p", { class: "t-body" }, " Paragraphs set in body type. Over three sentences, the paragraph becomes a list or a spec card. ", -1)])]),
								_: 1
							})
						]),
						_: 1
					}),
					createVNode(unref(KInspector), null, {
						default: withCtx(() => [createVNode(unref(KInspectorGroup), null, {
							default: withCtx(() => [createVNode(unref(KCard), { variant: "heading" }, {
								default: withCtx(() => [..._cache[4] || (_cache[4] = [createElementVNode("h2", { class: "t-display" }, "Tweak", -1)])]),
								_: 1
							}), createVNode(unref(KCard), {
								variant: "interactive",
								state: "active"
							}, {
								default: withCtx(() => [
									createVNode(unref(KCardHeading), {
										title: "Tweak the tokens",
										subtitle: "Brief the agent, pick a direction, scope, commit."
									}),
									_cache[5] || (_cache[5] = createElementVNode("button", {
										class: "button t-subtitle",
										"data-cta": "minimized"
									}, "Configure", -1)),
									_cache[6] || (_cache[6] = createElementVNode("button", {
										class: "button button--primary t-subtitle",
										"data-cta": "active"
									}, "Apply tweak", -1))
								]),
								_: 1
							})]),
							_: 1
						})]),
						_: 1
					})
				]),
				_: 1
			});
		};
	}
});
//#endregion
export { pattern_three_column_shell_default as default };
