import { createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KCard, KCardCollapsible, KCardHeading, KField, KInspectorGroup } from "@konstantinopolskii/vue";
//#region sfc/pages/pattern-inspector-group.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "wrap" };
//#endregion
//#region sfc/pages/pattern-inspector-group.vue
var pattern_inspector_group_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-inspector-group",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createVNode(unref(KInspectorGroup), null, {
				default: withCtx(() => [
					createVNode(unref(KCard), { variant: "heading" }, {
						default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("h2", { class: "t-display" }, "Tweak", -1)])]),
						_: 1
					}),
					createVNode(unref(KCard), {
						variant: "interactive",
						state: "active"
					}, {
						default: withCtx(() => [
							createVNode(unref(KCardHeading), {
								title: "Tweak the tokens",
								subtitle: "Brief the agent, pick a direction, scope, commit."
							}),
							createVNode(unref(KCardCollapsible), { flush: true }, {
								default: withCtx(() => [
									_cache[1] || (_cache[1] = createElementVNode("label", { class: "switch t-caption" }, [
										createElementVNode("input", {
											type: "checkbox",
											class: "switch__input",
											checked: ""
										}),
										createElementVNode("span", { class: "switch__track" }),
										createTextVNode(" Color tokens ")
									], -1)),
									_cache[2] || (_cache[2] = createElementVNode("label", { class: "switch t-caption" }, [
										createElementVNode("input", {
											type: "checkbox",
											class: "switch__input"
										}),
										createElementVNode("span", { class: "switch__track" }),
										createTextVNode(" Type tokens ")
									], -1)),
									createVNode(unref(KField), {
										label: "Version",
										row: "",
										modelValue: "v1.2.0"
									})
								]),
								_: 1
							}),
							_cache[3] || (_cache[3] = createElementVNode("button", {
								class: "button t-subtitle",
								"data-cta": "minimized"
							}, "Configure", -1)),
							_cache[4] || (_cache[4] = createElementVNode("button", {
								class: "button button--primary t-subtitle",
								"data-cta": "active"
							}, "Apply tweak", -1))
						]),
						_: 1
					}),
					createVNode(unref(KCard), { variant: "interactive" }, {
						default: withCtx(() => [
							createVNode(unref(KCardHeading), {
								title: "Templates",
								subtitle: "Saved configurations from earlier tweaks."
							}),
							createVNode(unref(KCardCollapsible), { flush: true }, {
								default: withCtx(() => [..._cache[5] || (_cache[5] = [createElementVNode("label", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Memo"), createElementVNode("span", { class: "t-caption field__value" }, "monochrome, bold")], -1), createElementVNode("label", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Call"), createElementVNode("span", { class: "t-caption field__value" }, "muted warm, balanced")], -1)])]),
								_: 1
							}),
							_cache[6] || (_cache[6] = createElementVNode("button", {
								class: "button t-subtitle",
								"data-cta": "minimized"
							}, "Browse", -1)),
							_cache[7] || (_cache[7] = createElementVNode("button", {
								class: "button button--primary t-subtitle",
								"data-cta": "active"
							}, "Apply template", -1))
						]),
						_: 1
					})
				]),
				_: 1
			})]);
		};
	}
});
//#endregion
export { pattern_inspector_group_default as default };
