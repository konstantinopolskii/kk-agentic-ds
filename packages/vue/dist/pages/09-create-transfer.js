import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KCard, KCardHeading, KChip, KChipWrap, KMedia } from "@konstantinopolskii/vue";
//#region sfc/pages/09-create-transfer.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "book__section book__section--fill" };
//#endregion
//#region sfc/pages/09-create-transfer.vue
var _09_create_transfer_default = /* @__PURE__ */ defineComponent({
	__name: "09-create-transfer",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [createElementVNode("article", _hoisted_1, [createVNode(unref(KCard), null, {
						default: withCtx(() => [
							createVNode(unref(KCardHeading), { title: "Create a transfer" }),
							createVNode(unref(KChipWrap), null, {
								default: withCtx(() => [createVNode(unref(KChip), { pressed: true }, {
									default: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode("Get a link", -1)])]),
									_: 1
								}), createVNode(unref(KChip), { pressed: false }, {
									default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("Send as email", -1)])]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(unref(KMedia), {
								title: "Upload files",
								meta: "Up to 3 GB on the free plan",
								micro: "",
								initials: "+"
							}),
							_cache[2] || (_cache[2] = createElementVNode("label", { class: "field" }, [createElementVNode("input", {
								class: "t-caption field__input",
								type: "text",
								placeholder: "Email"
							})], -1)),
							_cache[3] || (_cache[3] = createElementVNode("label", { class: "field" }, [createElementVNode("input", {
								class: "t-caption field__input",
								type: "text",
								placeholder: "Title and message"
							})], -1)),
							_cache[4] || (_cache[4] = createElementVNode("div", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Expires in"), createElementVNode("span", { class: "field__value t-caption" }, "3 days")], -1)),
							_cache[5] || (_cache[5] = createElementVNode("div", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Downloads"), createElementVNode("span", { class: "field__value t-caption" }, "Up to 50")], -1)),
							_cache[6] || (_cache[6] = createElementVNode("button", { class: "button t-subtitle" }, "Transfer", -1))
						]),
						_: 1
					})])]),
					_: 1
				})]),
				_: 1
			});
		};
	}
});
//#endregion
export { _09_create_transfer_default as default };
