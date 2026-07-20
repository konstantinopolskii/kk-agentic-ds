import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KButton, KCard } from "@konstantinopolskii/vue";
//#region sfc/pages/07-flashcard.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "book__section book__section--fill" };
//#endregion
//#region sfc/pages/07-flashcard.vue
var _07_flashcard_default = /* @__PURE__ */ defineComponent({
	__name: "07-flashcard",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [createElementVNode("article", _hoisted_1, [createVNode(unref(KCard), { variant: "shout" }, {
						default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("h1", { class: "t-hero" }, "Exercise", -1), createElementVNode("p", { class: "t-caption t-subtle" }, "Tap to flip", -1)])]),
						_: 1
					})]), createVNode(unref(KBookSection), null, {
						default: withCtx(() => [createVNode(unref(KButton), null, {
							default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("Shuffle the deck", -1)])]),
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
export { _07_flashcard_default as default };
