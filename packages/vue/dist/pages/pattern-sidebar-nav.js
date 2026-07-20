import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KNavGroup, KSidebar, KSidebarNav } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/pattern-sidebar-nav.vue
var pattern_sidebar_nav_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-sidebar-nav",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), null, {
				default: withCtx(() => [createVNode(unref(KSidebar), { title: "Fundamental" }, {
					footer: withCtx(() => [..._cache[0] || (_cache[0] = [
						createTextVNode(" 2026, kk.consulting", -1),
						createElementVNode("br", null, null, -1),
						createTextVNode(" Fundamental demo ", -1)
					])]),
					default: withCtx(() => [createVNode(unref(KSidebarNav), null, {
						default: withCtx(() => [
							createVNode(unref(KNavGroup), {
								head: "Prose",
								items: [
									{
										label: "Opening",
										href: "#opening"
									},
									{
										label: "Reading",
										href: "#reading"
									},
									{
										label: "Lists",
										href: "#lists"
									},
									{
										label: "Figures",
										href: "#figures"
									}
								]
							}),
							createVNode(unref(KNavGroup), {
								head: "Spec",
								items: [
									{
										label: "Color",
										href: "#color"
									},
									{
										label: "Space",
										href: "#space"
									},
									{
										label: "Type",
										href: "#type"
									},
									{
										label: "Motion",
										href: "#motion"
									}
								]
							}),
							createVNode(unref(KNavGroup), {
								head: "Controls",
								items: [
									{
										label: "Cards",
										href: "#cards"
									},
									{
										label: "Fields",
										href: "#fields"
									},
									{
										label: "Buttons",
										href: "#buttons"
									},
									{
										label: "Tags",
										href: "#tags"
									},
									{
										label: "Switches",
										href: "#switches"
									}
								]
							}),
							createVNode(unref(KNavGroup), {
								head: "Margin",
								items: [{
									label: "Signoff",
									href: "#signoff"
								}]
							})
						]),
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
export { pattern_sidebar_nav_default as default };
