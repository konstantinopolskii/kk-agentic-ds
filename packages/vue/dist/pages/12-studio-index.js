import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KButton, KCard, KCardHeading, KCardStack } from "@konstantinopolskii/vue";
//#region sfc/pages/12-studio-index.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "book__section book__section--fill" };
//#endregion
//#region sfc/pages/12-studio-index.vue
var _12_studio_index_default = /* @__PURE__ */ defineComponent({
	__name: "12-studio-index",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [createElementVNode("article", _hoisted_1, [createVNode(unref(KCard), { variant: "shout" }, {
						default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("div", { class: "card__heading" }, [createElementVNode("h1", { class: "t-hero" }, "Buckwheat"), createElementVNode("p", { class: "t-title" }, "Digging out of the mess, one grain at a time. A two-person studio that ships tools for money and work, then keeps them alive for a decade.")], -1), createElementVNode("p", { class: "t-micro t-subtle" }, "Two people and a cat · 2014 to 2026 · both tools still shipping", -1)])]),
						_: 1
					})]), createVNode(unref(KBookSection), { id: "deck" }, {
						default: withCtx(() => [createVNode(unref(KCardStack), { columns: true }, {
							default: withCtx(() => [createVNode(unref(KCard), {
								variant: "link",
								href: "10-tzlvt-landing.html"
							}, {
								default: withCtx(() => [createVNode(unref(KCardHeading), {
									title: "Tzlvt",
									subtitle: "Controls the budget in a plain calculator. One number a day. Ten years free."
								}), createVNode(unref(KButton), { as: "span" }, {
									default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("Open Tzlvt", -1)])]),
									_: 1
								})]),
								_: 1
							}), createVNode(unref(KCard), {
								variant: "link",
								href: "#"
							}, {
								default: withCtx(() => [createVNode(unref(KCardHeading), {
									title: "Coin",
									subtitle: "Career leverage with the market behind it, from 158 000 real cases. Paid."
								}), createVNode(unref(KButton), { as: "span" }, {
									default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("Open Coin", -1)])]),
									_: 1
								})]),
								_: 1
							})]),
							_: 1
						})]),
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
export { _12_studio_index_default as default };
