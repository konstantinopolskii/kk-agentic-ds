import { createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KCard, KChip, KChipWrap, KDataCell, KDataTable, KFigure } from "@konstantinopolskii/vue";
//#region sfc/pages/06-person-page.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "book__section book__section--fill book__section--stage" };
var _hoisted_2 = {
	viewBox: "0 0 440 330",
	xmlns: "http://www.w3.org/2000/svg",
	stroke: "currentColor",
	"stroke-width": "1",
	fill: "none",
	"aria-hidden": "true",
	innerHTML: "<g transform=\"translate(20,15)\"><path d=\"M255,45 C225,40 200,52 190,78 C185,92 195,98 188,113 C182,126 172,122 162,136 C152,150 148,158 166,164 C176,168 168,177 170,184 C173,192 187,193 185,202 C183,210 176,212 178,222 C180,233 196,239 206,251 C214,261 220,270 224,284\"/><path d=\"M255,45 C288,50 308,72 313,98 C318,124 302,138 308,163 C312,183 298,194 293,214\"/><path d=\"M188,101 C196,97 206,98 212,104\"/><path d=\"M224,284 C254,277 296,279 328,268\"/></g>"
};
//#endregion
//#region sfc/pages/06-person-page.vue
var _06_person_page_default = /* @__PURE__ */ defineComponent({
	__name: "06-person-page",
	setup(__props) {
		const columns = [
			{ label: "Film" },
			{
				label: "Year",
				num: true
			},
			{
				label: "Rating",
				num: true
			}
		];
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [
						createElementVNode("article", _hoisted_1, [createVNode(unref(KCard), { variant: "shout" }, {
							default: withCtx(() => [createVNode(unref(KFigure), null, {
								default: withCtx(() => [(openBlock(), createElementBlock("svg", _hoisted_2))]),
								_: 1
							}), _cache[0] || (_cache[0] = createElementVNode("div", null, [
								createElementVNode("h1", { class: "t-hero" }, "Margot Robbie"),
								createElementVNode("p", { class: "t-caption" }, [
									createElementVNode("span", { class: "t-caption--bold" }, "8 of 32"),
									createTextVNode(),
									createElementVNode("span", { class: "t-muted" }, "movies watched")
								]),
								createElementVNode("p", { class: "t-caption" }, [
									createElementVNode("span", { class: "t-caption--bold" }, "195 151"),
									createTextVNode(),
									createElementVNode("span", { class: "t-muted" }, "fans on Must")
								]),
								createElementVNode("p", { class: "t-caption" }, [
									createElementVNode("span", { class: "t-caption--bold" }, "7.6"),
									createTextVNode(),
									createElementVNode("span", { class: "t-muted" }, "average rating")
								])
							], -1))]),
							_: 1
						})]),
						createVNode(unref(KBookSection), { id: "filmography" }, {
							default: withCtx(() => [
								_cache[19] || (_cache[19] = createElementVNode("h2", { class: "t-display" }, "Filmography", -1)),
								createVNode(unref(KChipWrap), null, {
									default: withCtx(() => [
										createVNode(unref(KChip), { pressed: true }, {
											default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("All", -1)])]),
											_: 1
										}),
										createVNode(unref(KChip), { pressed: false }, {
											default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("Want", -1)])]),
											_: 1
										}),
										createVNode(unref(KChip), { pressed: false }, {
											default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("Watched", -1)])]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KDataTable), { columns }, {
									default: withCtx(() => [
										createElementVNode("tr", null, [
											createVNode(unref(KDataCell), { lead: "" }, {
												default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("The Wolf of Wall Street", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[5] || (_cache[5] = [createTextVNode("2013", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[6] || (_cache[6] = [createTextVNode("8.2", -1)])]),
												_: 1
											})
										]),
										createElementVNode("tr", null, [
											createVNode(unref(KDataCell), { lead: "" }, {
												default: withCtx(() => [..._cache[7] || (_cache[7] = [createTextVNode("Suicide Squad", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[8] || (_cache[8] = [createTextVNode("2016", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[9] || (_cache[9] = [createTextVNode("5.9", -1)])]),
												_: 1
											})
										]),
										createElementVNode("tr", null, [
											createVNode(unref(KDataCell), { lead: "" }, {
												default: withCtx(() => [..._cache[10] || (_cache[10] = [createTextVNode("I, Tonya", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[11] || (_cache[11] = [createTextVNode("2017", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[12] || (_cache[12] = [createTextVNode("7.5", -1)])]),
												_: 1
											})
										]),
										createElementVNode("tr", null, [
											createVNode(unref(KDataCell), { lead: "" }, {
												default: withCtx(() => [..._cache[13] || (_cache[13] = [createTextVNode("Once Upon a Time in Hollywood", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[14] || (_cache[14] = [createTextVNode("2019", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[15] || (_cache[15] = [createTextVNode("7.6", -1)])]),
												_: 1
											})
										]),
										createElementVNode("tr", null, [
											createVNode(unref(KDataCell), { lead: "" }, {
												default: withCtx(() => [..._cache[16] || (_cache[16] = [createTextVNode("Barbie", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[17] || (_cache[17] = [createTextVNode("2023", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[18] || (_cache[18] = [createTextVNode("6.9", -1)])]),
												_: 1
											})
										])
									]),
									_: 1
								})
							]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "about" }, {
							default: withCtx(() => [..._cache[20] || (_cache[20] = [
								createElementVNode("h2", { class: "t-display" }, "About", -1),
								createElementVNode("p", { class: "t-body" }, "Margot Robbie started acting on the Australian soap opera Neighbours in 2008 and moved to Los Angeles in 2011.", -1),
								createElementVNode("p", { class: "t-body" }, "She co-founded the production company LuckyChap Entertainment in 2014, with producing credits on Promising Young Woman, Saltburn, and Barbie.", -1)
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
export { _06_person_page_default as default };
