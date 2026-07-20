import { createBlock, createElementVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KCard, KCardHeading, KCardStack } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/pattern-card-stack-columns.vue
var pattern_card_stack_columns_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-card-stack-columns",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KCardStack), { columns: true }, {
				default: withCtx(() => [
					createVNode(unref(KCard), null, {
						default: withCtx(() => [createVNode(unref(KCardHeading), {
							title: "Free",
							subtitle: "For getting started."
						}), _cache[0] || (_cache[0] = createElementVNode("button", { class: "button t-subtitle" }, "Pick free", -1))]),
						_: 1
					}),
					createVNode(unref(KCard), null, {
						default: withCtx(() => [createVNode(unref(KCardHeading), {
							title: "Pro",
							subtitle: "For working teams."
						}), _cache[1] || (_cache[1] = createElementVNode("button", { class: "button button--primary t-subtitle" }, "Pick pro", -1))]),
						_: 1
					}),
					createVNode(unref(KCard), null, {
						default: withCtx(() => [createVNode(unref(KCardHeading), {
							title: "Team",
							subtitle: "For shipping at scale."
						}), _cache[2] || (_cache[2] = createElementVNode("button", { class: "button t-subtitle" }, "Pick team", -1))]),
						_: 1
					})
				]),
				_: 1
			});
		};
	}
});
//#endregion
export { pattern_card_stack_columns_default as default };
