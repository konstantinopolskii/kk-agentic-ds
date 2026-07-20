import { createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KCard, KCardHeading, KInspectorGroup } from "@konstantinopolskii/vue";
//#region sfc/pages/pattern-narrow.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	class: "sidebar sidebar--collapsed",
	"aria-label": "Navigation"
};
var _hoisted_2 = {
	class: "button button--icon",
	"aria-label": "Open navigation"
};
var _hoisted_3 = {
	width: "18",
	height: "14",
	viewBox: "0 0 18 14",
	fill: "none",
	"aria-hidden": "true",
	innerHTML: "<rect width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"/><rect y=\"6\" width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"/><rect y=\"12\" width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"/>"
};
var _hoisted_4 = {
	class: "inspector inspector--modal",
	"aria-hidden": "true"
};
//#endregion
//#region sfc/pages/pattern-narrow.vue
var pattern_narrow_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-narrow",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), null, {
				default: withCtx(() => [
					createElementVNode("aside", _hoisted_1, [createElementVNode("button", _hoisted_2, [(openBlock(), createElementBlock("svg", _hoisted_3))])]),
					createVNode(unref(KBook), { id: "doc" }, {
						default: withCtx(() => [
							createVNode(unref(KBookSection), null, {
								default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("h1", { class: "t-hero" }, "Narrow", -1), createElementVNode("p", { class: "t-body" }, " Below 800 px the book takes the full column. Sidebar collapses behind a hamburger. Inspector slides over as a modal sheet. ", -1)])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "full-width" }, {
								default: withCtx(() => [..._cache[1] || (_cache[1] = [createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" Full width"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium t-muted" }, "Book column carries the read")
								], -1), createElementVNode("p", { class: "t-body" }, " Only one column shows at a time. The hamburger on the left opens the sidebar; the FAB on the right opens the inspector. ", -1)])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "slide-over" }, {
								default: withCtx(() => [..._cache[2] || (_cache[2] = [createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" Slide over"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium t-muted" }, "Inspector as a sheet")
								], -1), createElementVNode("p", { class: "t-body" }, " Tapping the inspector FAB reveals the inspector as a modal sheet above the book. Tap outside to dismiss. ", -1)])]),
								_: 1
							})
						]),
						_: 1
					}),
					createElementVNode("aside", _hoisted_4, [createVNode(unref(KInspectorGroup), null, {
						default: withCtx(() => [createVNode(unref(KCard), { variant: "heading" }, {
							default: withCtx(() => [..._cache[3] || (_cache[3] = [createElementVNode("h2", { class: "t-display" }, "Sheet", -1)])]),
							_: 1
						}), createVNode(unref(KCard), { variant: "interactive" }, {
							default: withCtx(() => [
								createVNode(unref(KCardHeading), {
									title: "Modal inspector",
									subtitle: "Opens from the right at narrow widths. Same content, different shell."
								}),
								_cache[4] || (_cache[4] = createElementVNode("button", {
									class: "button t-subtitle",
									"data-cta": "minimized"
								}, "Close", -1)),
								_cache[5] || (_cache[5] = createElementVNode("button", {
									class: "button button--primary t-subtitle",
									"data-cta": "active"
								}, "Confirm", -1))
							]),
							_: 1
						})]),
						_: 1
					})])
				]),
				_: 1
			});
		};
	}
});
//#endregion
export { pattern_narrow_default as default };
