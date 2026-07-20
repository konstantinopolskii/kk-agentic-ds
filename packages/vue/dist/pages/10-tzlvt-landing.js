import { createBlock, createElementVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KCard, KCardHeading, KCardStack, KFieldRow } from "@konstantinopolskii/vue";
//#region sfc/pages/10-tzlvt-landing.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "book__section book__section--fill" };
//#endregion
//#region sfc/pages/10-tzlvt-landing.vue
var _10_tzlvt_landing_default = /* @__PURE__ */ defineComponent({
	__name: "10-tzlvt-landing",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [
						createElementVNode("article", _hoisted_1, [
							_cache[1] || (_cache[1] = createElementVNode("h1", { class: "t-hero" }, "Money that lasts until payday", -1)),
							_cache[2] || (_cache[2] = createElementVNode("p", { class: "t-title" }, "Tzlvt divides what you have by the days until income. You get one number a day. Hold it and the month holds.", -1)),
							createVNode(unref(KCard), { variant: "shout" }, {
								default: withCtx(() => [..._cache[0] || (_cache[0] = [
									createElementVNode("div", { class: "metric" }, [createElementVNode("p", { class: "metric__value" }, "631"), createElementVNode("p", { class: "metric__label" }, "Today's budget, from 18 939 across 30 days")], -1),
									createElementVNode("button", { class: "button button--primary t-subtitle" }, "Start the budget", -1),
									createElementVNode("p", { class: "t-micro t-subtle" }, "4.7 from 1 000+ ratings · iOS, Android, and the browser", -1)
								])]),
								_: 1
							})
						]),
						createVNode(unref(KBookSection), { id: "how" }, {
							default: withCtx(() => [
								_cache[3] || (_cache[3] = createElementVNode("h2", { class: "t-display" }, "One number, recalculated as you live", -1)),
								createVNode(unref(KCardStack), { columns: "" }, {
									default: withCtx(() => [createVNode(unref(KCard), null, {
										default: withCtx(() => [
											createVNode(unref(KCardHeading), { title: "The arithmetic" }),
											createVNode(unref(KFieldRow), {
												label: "You have",
												value: "18 939"
											}),
											createVNode(unref(KFieldRow), {
												label: "Next income",
												value: "Aug 1"
											}),
											createVNode(unref(KFieldRow), {
												label: "Days left",
												value: "30"
											}),
											createVNode(unref(KFieldRow), {
												label: "Today",
												value: "631"
											})
										]),
										_: 1
									}), createVNode(unref(KCard), null, {
										default: withCtx(() => [
											createVNode(unref(KCardHeading), { title: "The day" }),
											createVNode(unref(KFieldRow), {
												label: "Groceries",
												value: "−340"
											}),
											createVNode(unref(KFieldRow), {
												label: "Metro",
												value: "−62"
											}),
											createVNode(unref(KFieldRow), {
												label: "Coffee",
												value: "−180"
											}),
											createVNode(unref(KFieldRow), {
												label: "Tomorrow",
												value: "633"
											})
										]),
										_: 1
									})]),
									_: 1
								}),
								_cache[4] || (_cache[4] = createElementVNode("ul", { class: "t-list" }, [
									createElementVNode("li", null, "Overspend today and tomorrow's number shrinks."),
									createElementVNode("li", null, "Save today and tomorrow's number grows."),
									createElementVNode("li", null, "Log income and the day rate rises on the spot.")
								], -1))
							]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "free" }, {
							default: withCtx(() => [..._cache[5] || (_cache[5] = [
								createElementVNode("h2", { class: "t-display" }, "Ten years free", -1),
								createElementVNode("p", { class: "t-body" }, "No ads and no subscriptions. The paid sibling pays the bills, so the budget stays free for the people who need the number most.", -1),
								createElementVNode("p", { class: "t-caption t-muted" }, "Written about by Meduza, vc.ru, and Lifehacker.", -1),
								createElementVNode("button", { class: "button button--primary t-subtitle" }, "Get the app", -1)
							])]),
							_: 1
						})
					]),
					_: 1
				})]),
				_: 1
			});
		};
	}
});
//#endregion
export { _10_tzlvt_landing_default as default };
