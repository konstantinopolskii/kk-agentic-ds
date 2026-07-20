import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KCard, KChip, KChipWrap, KField } from "@konstantinopolskii/vue";
//#region sfc/pages/04-joi-onboarding.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "book__section book__section--stage" };
var _hoisted_2 = { class: "book__section book__section--stage" };
//#endregion
//#region sfc/pages/04-joi-onboarding.vue
var _04_joi_onboarding_default = /* @__PURE__ */ defineComponent({
	__name: "04-joi-onboarding",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [createElementVNode("article", _hoisted_1, [createVNode(unref(KCard), null, {
						default: withCtx(() => [
							_cache[0] || (_cache[0] = createElementVNode("p", { class: "t-micro t-muted" }, "Step 1 of 6", -1)),
							_cache[1] || (_cache[1] = createElementVNode("div", { class: "card__heading" }, [createElementVNode("h2", { class: "t-display" }, "Set your wake-up and wind-down hours")], -1)),
							createVNode(unref(KField), {
								row: "",
								label: "Wake up",
								modelValue: "09:00"
							}),
							createVNode(unref(KField), {
								row: "",
								label: "Wind down",
								modelValue: "21:00"
							}),
							_cache[2] || (_cache[2] = createElementVNode("button", { class: "button button--primary t-subtitle" }, "Next", -1))
						]),
						_: 1
					})]), createElementVNode("article", _hoisted_2, [createVNode(unref(KCard), null, {
						default: withCtx(() => [
							_cache[10] || (_cache[10] = createElementVNode("p", { class: "t-micro t-muted" }, "Step 6 of 6", -1)),
							_cache[11] || (_cache[11] = createElementVNode("div", { class: "card__heading" }, [createElementVNode("h2", { class: "t-display" }, "Pick a few habits to kickstart your daily routine")], -1)),
							createVNode(unref(KChipWrap), null, {
								default: withCtx(() => [
									createVNode(unref(KChip), { pressed: true }, {
										default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("Exercise", -1)])]),
										_: 1
									}),
									createVNode(unref(KChip), { pressed: true }, {
										default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("Meditate", -1)])]),
										_: 1
									}),
									createVNode(unref(KChip), { pressed: true }, {
										default: withCtx(() => [..._cache[5] || (_cache[5] = [createTextVNode("Read books", -1)])]),
										_: 1
									}),
									createVNode(unref(KChip), { pressed: false }, {
										default: withCtx(() => [..._cache[6] || (_cache[6] = [createTextVNode("Plan a day", -1)])]),
										_: 1
									}),
									createVNode(unref(KChip), { pressed: false }, {
										default: withCtx(() => [..._cache[7] || (_cache[7] = [createTextVNode("Do yoga", -1)])]),
										_: 1
									}),
									createVNode(unref(KChip), { pressed: false }, {
										default: withCtx(() => [..._cache[8] || (_cache[8] = [createTextVNode("Write in journal", -1)])]),
										_: 1
									}),
									createVNode(unref(KChip), { pressed: false }, {
										default: withCtx(() => [..._cache[9] || (_cache[9] = [createTextVNode("Healthy breakfast", -1)])]),
										_: 1
									})
								]),
								_: 1
							}),
							_cache[12] || (_cache[12] = createElementVNode("button", { class: "button button--primary t-subtitle" }, "Continue with three habits", -1))
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
export { _04_joi_onboarding_default as default };
