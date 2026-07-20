import { createElementBlock, createStaticVNode, defineComponent, openBlock } from "vue";
//#region sfc/pages/pattern-signoff.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "book__signoff" };
//#endregion
//#region sfc/pages/pattern-signoff.vue
var pattern_signoff_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-signoff",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<div class=\"book__signoff-stats\"><div class=\"stat t-caption\"><div><span class=\"t-caption--bold\">9</span> components in the kit.</div><div><span class=\"t-caption--bold\">9</span> color tokens, and not one more.</div></div><div class=\"stat t-caption\"><div><span class=\"t-caption--bold\">12</span> spacing tokens on a 4px grid.</div><div><span class=\"t-caption--bold\">7</span> type sizes, three weights.</div></div></div><div class=\"book__signoff-signature\"><p class=\"t-caption\"> Signed by <span class=\"t-caption--bold\">Konstantin Konstantinopolskii,<br></span> founder at <span class=\"t-caption--bold\">kk.consulting<br></span><span class=\"t-muted\">23 April &#39;26 at 17:30 Tbilisi Time.</span></p><img class=\"book__signoff-signature-img\" src=\"../../../signature.svg\" alt=\"Handwritten signature of Konstantin Konstantinopolskii\"></div>", 2)])]);
		};
	}
});
//#endregion
export { pattern_signoff_default as default };
