import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KBookSection, KCard, KCode } from "@konstantinopolskii/vue";
//#region sfc/pages/pattern-doc-section.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "t-body" };
//#endregion
//#region sfc/pages/pattern-doc-section.vue
var pattern_doc_section_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-doc-section",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KBookSection), null, {
				default: withCtx(() => [
					_cache[4] || (_cache[4] = createElementVNode("h2", { class: "t-display" }, [
						createTextVNode(" Buttons"),
						createElementVNode("br"),
						createElementVNode("span", { class: "t-display--medium t-muted" }, "Secondary, primary")
					], -1)),
					createElementVNode("p", _hoisted_1, [
						_cache[1] || (_cache[1] = createTextVNode(" Full-width by default, ", -1)),
						createVNode(unref(KCode), null, {
							default: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode("12px", -1)])]),
							_: 1
						}),
						_cache[2] || (_cache[2] = createTextVNode(" radius, bold label. Imperative verbs. One primary per card. ", -1))
					]),
					createVNode(unref(KCard), null, {
						default: withCtx(() => [..._cache[3] || (_cache[3] = [
							createElementVNode("p", { class: "t-caption" }, "Pick a theme for the next document pass.", -1),
							createElementVNode("button", { class: "button t-subtitle" }, "Pick tokens", -1),
							createElementVNode("button", { class: "button button--primary t-subtitle" }, "Apply tokens", -1)
						])]),
						_: 1
					})
				]),
				_: 1
			});
		};
	}
});
//#endregion
export { pattern_doc_section_default as default };
