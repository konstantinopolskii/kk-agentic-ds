import { createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KBook, KBookSection, KFigure, KList, KMedia, KQuote, KStat } from "@konstantinopolskii/vue";
//#region sfc/pages/13-blogpost.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "book__signoff" };
var _hoisted_2 = { class: "book__signoff-stats" };
var diagramMarksHtml = "<line x1=\"100\" y1=\"150\" x2=\"620\" y2=\"150\" /><circle cx=\"100\" cy=\"150\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"360\" cy=\"150\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"620\" cy=\"150\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><text x=\"0\" y=\"154\" font-size=\"13\" fill=\"currentColor\" stroke=\"none\">Tokens</text><line x1=\"100\" y1=\"108\" x2=\"620\" y2=\"108\" /><circle cx=\"100\" cy=\"108\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"360\" cy=\"108\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"620\" cy=\"108\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><text x=\"0\" y=\"112\" font-size=\"13\" fill=\"currentColor\" stroke=\"none\">Components</text><polyline points=\"100,178 360,122 620,38\" /><circle cx=\"100\" cy=\"178\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"360\" cy=\"122\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"620\" cy=\"38\" r=\"3\" fill=\"currentColor\" stroke=\"none\" /><text x=\"0\" y=\"42\" font-size=\"13\" fill=\"currentColor\" stroke=\"none\">Patterns</text><text x=\"100\" y=\"196\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\" text-anchor=\"middle\">0.1.0</text><text x=\"360\" y=\"196\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\" text-anchor=\"middle\">1.6.0</text><text x=\"620\" y=\"196\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\" text-anchor=\"middle\">1.11.0</text>";
//#endregion
//#region sfc/pages/13-blogpost.vue
var _13_blogpost_default = /* @__PURE__ */ defineComponent({
	__name: "13-blogpost",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KBook), { id: "doc" }, {
				default: withCtx(() => [
					createVNode(unref(KBookSection), null, {
						default: withCtx(() => [
							_cache[0] || (_cache[0] = createElementVNode("p", { class: "t-micro t-muted" }, "Design systems", -1)),
							_cache[1] || (_cache[1] = createElementVNode("h1", { class: "t-hero" }, "The kit grows patterns, not vocabulary", -1)),
							_cache[2] || (_cache[2] = createElementVNode("p", { class: "t-title" }, "The token count, the component count, and the forbidden list stay fixed by design, even as the pattern count keeps climbing.", -1)),
							createVNode(unref(KMedia), {
								title: "Konstantin Konstantinopolskii",
								meta: "July 17, 2026 · 6 min read",
								micro: true,
								initials: "KK"
							})
						]),
						_: 1
					}),
					createVNode(unref(KBookSection), { id: "budget" }, {
						default: withCtx(() => [..._cache[3] || (_cache[3] = [
							createElementVNode("h2", { class: "t-display" }, "The element budget stays fixed", -1),
							createElementVNode("p", { class: "t-body" }, "The kit ships nine color tokens, three font weights across seven sizes, four corner radii, and twelve spacing steps. Release notes add new patterns and new rows to the component registry. They do not add columns to vars.css.", -1),
							createElementVNode("p", { class: "t-body" }, "A tenth token means editing vars.css, tokens.json, and the forbidden list in the same commit, then checking every consuming product that assumed nine. The evolve protocol exists to make that cost visible before a maintainer signs off, not after a product breaks downstream.", -1)
						])]),
						_: 1
					}),
					createVNode(unref(KBookSection), { id: "pattern-requests" }, {
						default: withCtx(() => [_cache[5] || (_cache[5] = createElementVNode("h2", { class: "t-display" }, "Most component requests are pattern requests", -1)), createVNode(unref(KQuote), { cite: "Priya Chandrasekaran, design lead" }, {
							default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode(" A new component is a permanent tax on every review that follows it. Most requests for one disappear the moment you ask which pattern already carries the job. ", -1)])]),
							_: 1
						})]),
						_: 1
					}),
					createVNode(unref(KBookSection), { id: "rules" }, {
						default: withCtx(() => [
							_cache[8] || (_cache[8] = createElementVNode("h2", { class: "t-display" }, "Three rules keep the count honest", -1)),
							createVNode(unref(KFigure), null, {
								default: withCtx(() => [(openBlock(), createElementBlock("svg", {
									viewBox: "0 0 640 200",
									xmlns: "http://www.w3.org/2000/svg",
									stroke: "currentColor",
									"stroke-width": "1",
									fill: "none",
									"aria-hidden": "true",
									innerHTML: diagramMarksHtml
								})), _cache[6] || (_cache[6] = createElementVNode("figcaption", null, "Three points on the kit's own timeline. Token count and component count hold flat; pattern count is the only line that climbs.", -1))]),
								_: 1
							}),
							createVNode(unref(KList), null, {
								default: withCtx(() => [..._cache[7] || (_cache[7] = [
									createElementVNode("li", null, "A new component ships only once three separate products ask for it.", -1),
									createElementVNode("li", null, "Every addition updates the forbidden list and the registry table in one commit.", -1),
									createElementVNode("li", null, "A pattern recombines existing components; it never introduces a class the registry doesn't already carry.", -1)
								])]),
								_: 1
							})
						]),
						_: 1
					}),
					createVNode(unref(KBookSection), { id: "related" }, {
						default: withCtx(() => [
							_cache[9] || (_cache[9] = createElementVNode("h2", { class: "t-display" }, "Related", -1)),
							createVNode(unref(KMedia), {
								href: "#",
								square: true,
								title: "The chart policy has no exceptions",
								meta: "June 2, 2026 · 5 min read",
								micro: true
							}),
							createVNode(unref(KMedia), {
								href: "#",
								square: true,
								title: "Sentence case is a discipline",
								meta: "June 19, 2026 · 4 min read",
								micro: true
							}),
							createVNode(unref(KMedia), {
								href: "#",
								square: true,
								title: "Why only the middle column scrolls",
								meta: "July 8, 2026 · 5 min read",
								micro: true
							})
						]),
						_: 1
					}),
					createElementVNode("div", _hoisted_1, [createElementVNode("div", _hoisted_2, [createVNode(unref(KStat), {
						value: "4",
						text: "drafts before this one."
					}), createVNode(unref(KStat), {
						value: "0",
						text: "new components proposed."
					})]), _cache[10] || (_cache[10] = createElementVNode("div", { class: "book__signoff-signature" }, [createElementVNode("p", { class: "t-caption" }, [
						createTextVNode(" Signed by "),
						createElementVNode("span", { class: "t-caption--bold" }, "Konstantin Konstantinopolskii,"),
						createElementVNode("br"),
						createTextVNode(" founder at "),
						createElementVNode("span", { class: "t-caption--bold" }, "kk.consulting"),
						createElementVNode("br"),
						createElementVNode("span", { class: "t-muted" }, "2026-07-17, single-column reading shell.")
					]), createElementVNode("img", {
						class: "book__signoff-signature-img",
						src: "../../signature.svg",
						alt: "Signature"
					})], -1))])
				]),
				_: 1
			});
		};
	}
});
//#endregion
export { _13_blogpost_default as default };
