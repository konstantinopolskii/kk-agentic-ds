import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KCard, KCardCollapsible, KCardHeading, KCardStack } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/pattern-card-stack.vue
var pattern_card_stack_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-card-stack",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KCardStack), null, {
				default: withCtx(() => [
					createVNode(unref(KCard), {
						variant: "interactive",
						state: "active"
					}, {
						default: withCtx(() => [
							createVNode(unref(KCardHeading), {
								title: "Pick a direction",
								subtitle: "Pick the direction for the next document pass."
							}),
							createVNode(unref(KCardCollapsible), { flush: true }, {
								default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("label", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Name"), createElementVNode("input", {
									class: "t-caption field__input",
									type: "text",
									placeholder: "sofia@kk.consulting"
								})], -1), createElementVNode("label", { class: "field" }, [createElementVNode("input", {
									class: "t-caption field__input",
									type: "text",
									placeholder: "drop the shout card, tighten the stack"
								})], -1)])]),
								_: 1
							}),
							_cache[1] || (_cache[1] = createElementVNode("button", {
								class: "button t-subtitle",
								"data-cta": "minimized"
							}, "Pick", -1)),
							_cache[2] || (_cache[2] = createElementVNode("button", {
								class: "button button--primary t-subtitle",
								"data-cta": "active"
							}, "Apply direction", -1))
						]),
						_: 1
					}),
					createVNode(unref(KCard), { variant: "interactive" }, {
						default: withCtx(() => [
							createVNode(unref(KCardHeading), {
								title: "Scope the change",
								subtitle: "Name the tokens the agent may touch."
							}),
							createVNode(unref(KCardCollapsible), { flush: true }, {
								default: withCtx(() => [..._cache[3] || (_cache[3] = [createElementVNode("label", { class: "switch t-caption" }, [
									createElementVNode("input", {
										type: "checkbox",
										class: "switch__input",
										checked: ""
									}),
									createElementVNode("span", { class: "switch__track" }),
									createTextVNode(" Color tokens ")
								], -1), createElementVNode("label", { class: "switch t-caption" }, [
									createElementVNode("input", {
										type: "checkbox",
										class: "switch__input"
									}),
									createElementVNode("span", { class: "switch__track" }),
									createTextVNode(" Type tokens ")
								], -1)])]),
								_: 1
							}),
							_cache[4] || (_cache[4] = createElementVNode("button", {
								class: "button t-subtitle",
								"data-cta": "minimized"
							}, "Choose", -1)),
							_cache[5] || (_cache[5] = createElementVNode("button", {
								class: "button button--primary t-subtitle",
								"data-cta": "active"
							}, "Apply scope", -1))
						]),
						_: 1
					}),
					createVNode(unref(KCard), { variant: "interactive" }, {
						default: withCtx(() => [
							createVNode(unref(KCardHeading), {
								title: "Commit the change",
								subtitle: "Write the memo and ship."
							}),
							createVNode(unref(KCardCollapsible), { flush: true }, {
								default: withCtx(() => [..._cache[6] || (_cache[6] = [createElementVNode("label", { class: "field" }, [createElementVNode("input", {
									class: "t-caption field__input",
									type: "text",
									placeholder: "v1.2.0. stack tightened, shout demoted"
								})], -1)])]),
								_: 1
							}),
							_cache[7] || (_cache[7] = createElementVNode("button", {
								class: "button t-subtitle",
								"data-cta": "minimized"
							}, "Draft", -1)),
							_cache[8] || (_cache[8] = createElementVNode("button", {
								class: "button button--primary t-subtitle",
								"data-cta": "active"
							}, "Ship the change", -1))
						]),
						_: 1
					})
				]),
				_: 1
			});
		};
	}
});
//#endregion
export { pattern_card_stack_default as default };
