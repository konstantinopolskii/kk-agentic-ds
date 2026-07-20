import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBookSection, KButton, KCard, KCardHeading, KMedia } from "@konstantinopolskii/vue";
//#region sfc/pages/08-status-feed.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "book" };
var _hoisted_2 = { class: "book__section book__section--fill" };
//#endregion
//#region sfc/pages/08-status-feed.vue
var _08_status_feed_default = /* @__PURE__ */ defineComponent({
	__name: "08-status-feed",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createElementVNode("main", _hoisted_1, [createElementVNode("article", _hoisted_2, [createVNode(unref(KCard), { variant: "shout" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("h2", { class: "t-display" }, "Clique", -1), createElementVNode("p", { class: "t-micro t-subtle" }, "Four friends online right now", -1)])]),
					_: 1
				})]), createVNode(unref(KBookSection), null, {
					default: withCtx(() => [createVNode(unref(KCard), null, {
						default: withCtx(() => [
							createVNode(unref(KCardHeading), { title: "Poke friends" }),
							createVNode(unref(KMedia), {
								title: "Giana Rosser",
								meta: "Last of Us",
								micro: ""
							}, {
								trail: withCtx(() => [createVNode(unref(KButton), { caption: "" }, {
									default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("Poke", -1)])]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(unref(KMedia), {
								title: "Daniil Starling",
								meta: "Meeting till 15:00",
								micro: ""
							}, {
								trail: withCtx(() => [createVNode(unref(KButton), { caption: "" }, {
									default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("Poke", -1)])]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(unref(KMedia), {
								title: "Toki",
								meta: "11 291 km away",
								micro: ""
							}, {
								trail: withCtx(() => [createVNode(unref(KButton), { caption: "" }, {
									default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("Poke", -1)])]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(unref(KMedia), {
								title: "Sam Mamedov",
								meta: "Back in an hour",
								micro: ""
							}, {
								trail: withCtx(() => [createVNode(unref(KButton), { caption: "" }, {
									default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("Poke", -1)])]),
									_: 1
								})]),
								_: 1
							})
						]),
						_: 1
					})]),
					_: 1
				})])]),
				_: 1
			});
		};
	}
});
//#endregion
export { _08_status_feed_default as default };
