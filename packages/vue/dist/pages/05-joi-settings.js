import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KCard, KCardHeading, KField, KSwitch, KTag } from "@konstantinopolskii/vue";
//#region sfc/pages/05-joi-settings.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "field field--row" };
//#endregion
//#region sfc/pages/05-joi-settings.vue
var _05_joi_settings_default = /* @__PURE__ */ defineComponent({
	__name: "05-joi-settings",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [createVNode(unref(KBookSection), null, {
						default: withCtx(() => [
							_cache[7] || (_cache[7] = createElementVNode("h2", { class: "t-display" }, "Settings", -1)),
							createVNode(unref(KCard), null, {
								default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("div", { class: "media" }, [createElementVNode("div", { class: "media__body" }, [createElementVNode("p", { class: "t-caption--bold" }, "Joi plus"), createElementVNode("p", { class: "t-micro t-muted" }, "Subscription or one-time purchase")]), createElementVNode("div", { class: "media__trail" }, [createElementVNode("button", { class: "button button--primary t-caption--bold" }, "Upgrade")])], -1)])]),
								_: 1
							}),
							createVNode(unref(KCard), null, {
								default: withCtx(() => [
									createVNode(unref(KCardHeading), { title: "Account" }),
									createVNode(unref(KField), {
										row: "",
										label: "Display name",
										modelValue: "Alexey"
									}),
									createElementVNode("div", _hoisted_1, [_cache[2] || (_cache[2] = createElementVNode("span", { class: "t-caption--bold field__label" }, "Subscription", -1)), createVNode(unref(KTag), null, {
										default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("Free", -1)])]),
										_: 1
									})])
								]),
								_: 1
							}),
							createVNode(unref(KCard), null, {
								default: withCtx(() => [
									createVNode(unref(KCardHeading), { title: "Connections" }),
									createVNode(unref(KSwitch), {
										label: "Apple calendars",
										"model-value": ""
									}),
									createVNode(unref(KSwitch), {
										label: "Reminders",
										"model-value": ""
									}),
									createVNode(unref(KSwitch), {
										label: "HealthKit",
										"model-value": false
									})
								]),
								_: 1
							}),
							createVNode(unref(KCard), null, {
								default: withCtx(() => [
									createVNode(unref(KCardHeading), { title: "Preferences" }),
									_cache[3] || (_cache[3] = createElementVNode("div", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Choose calendars"), createElementVNode("span", { class: "t-caption t-muted" }, "Two of five")], -1)),
									_cache[4] || (_cache[4] = createElementVNode("div", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Tasks"), createElementVNode("span", { class: "t-caption t-muted" }, "Grouped by project")], -1)),
									_cache[5] || (_cache[5] = createElementVNode("div", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "App icon"), createElementVNode("span", { class: "t-caption t-muted" }, "Classic")], -1)),
									_cache[6] || (_cache[6] = createElementVNode("div", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Notifications"), createElementVNode("span", { class: "t-caption t-muted" }, "Morning summary only")], -1))
								]),
								_: 1
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
export { _05_joi_settings_default as default };
