import { Fragment, createElementBlock, createElementVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KCard, KCardHeading, KSpecList } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/pattern-spec-list.vue
var pattern_spec_list_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-spec-list",
	setup(__props) {
		const weightRows = [
			{
				key: "Regular",
				values: ["reads too thin at 400", "Regular sits on 500."]
			},
			{
				key: "Medium",
				values: ["subtitle under display", "500, paired with bold 700 headline."]
			},
			{
				key: "Bold",
				values: ["headings, labels", "700, one step up from the 500 body."]
			}
		];
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createVNode(unref(KCard), null, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("dl", { class: "book__spec" }, [
						createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--ease-out")]), createElementVNode("dd", { class: "book__spec-value" }, "Hover, focus, state flips.")]),
						createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--ease-spring")]), createElementVNode("dd", { class: "book__spec-value" }, "Switch thumbs, small confirmations.")]),
						createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--ease-swing")]), createElementVNode("dd", { class: "book__spec-value" }, "Long reveals, column arrivals.")])
					], -1)])]),
					_: 1
				}),
				createVNode(unref(KCard), null, {
					default: withCtx(() => [createVNode(unref(KCardHeading), { title: "Scale" }), _cache[1] || (_cache[1] = createElementVNode("dl", { class: "book__spec book__spec--value" }, [
						createElementVNode("div", { class: "book__spec-row" }, [
							createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-4")]),
							createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "16px")]),
							createElementVNode("dd", { class: "book__spec-value" }, "row to row.")
						]),
						createElementVNode("div", { class: "book__spec-row" }, [
							createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-6")]),
							createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "24px")]),
							createElementVNode("dd", { class: "book__spec-value" }, "card gaps, text rail.")
						]),
						createElementVNode("div", { class: "book__spec-row" }, [
							createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-8")]),
							createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "32px")]),
							createElementVNode("dd", { class: "book__spec-value" }, "section to section.")
						])
					], -1))]),
					_: 1
				}),
				createVNode(unref(KCard), null, {
					default: withCtx(() => [createVNode(unref(KCardHeading), { title: "Weight rules" }), createVNode(unref(KSpecList), {
						variant: "triple",
						rows: weightRows
					})]),
					_: 1
				})
			], 64);
		};
	}
});
//#endregion
export { pattern_spec_list_default as default };
