import { createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KButton, KCard, KCardHeading, KFieldRow, KFigure, KFront, KFrontDesks, KFrontRail, KMedia } from "@konstantinopolskii/vue";
//#region sfc/pages/14-newsfront.vue?vue&type=script&setup=true&lang.ts
var leadSvgMarksHtml = "<rect x=\"1\" y=\"1\" width=\"638\" height=\"358\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" /><line x1=\"160\" y1=\"0\" x2=\"160\" y2=\"360\" stroke=\"currentColor\" stroke-width=\"1\" /><line x1=\"320\" y1=\"0\" x2=\"320\" y2=\"360\" stroke=\"currentColor\" stroke-width=\"1\" /><line x1=\"480\" y1=\"0\" x2=\"480\" y2=\"360\" stroke=\"currentColor\" stroke-width=\"1\" /><line x1=\"0\" y1=\"180\" x2=\"640\" y2=\"180\" stroke=\"currentColor\" stroke-width=\"1\" /><circle cx=\"80\" cy=\"90\" r=\"52\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" /><rect x=\"200\" y=\"38\" width=\"80\" height=\"104\" fill=\"currentColor\" /><circle cx=\"400\" cy=\"90\" r=\"52\" fill=\"currentColor\" /><rect x=\"520\" y=\"38\" width=\"80\" height=\"104\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" /><rect x=\"40\" y=\"218\" width=\"80\" height=\"104\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" /><circle cx=\"240\" cy=\"270\" r=\"52\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" /><rect x=\"360\" y=\"218\" width=\"80\" height=\"104\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" /><circle cx=\"560\" cy=\"270\" r=\"52\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" />";
//#endregion
//#region sfc/pages/14-newsfront.vue
var _14_newsfront_default = /* @__PURE__ */ defineComponent({
	__name: "14-newsfront",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "front" }, {
				default: withCtx(() => [createVNode(unref(KFront), null, {
					default: withCtx(() => [
						_cache[18] || (_cache[18] = createElementVNode("header", { class: "front__masthead" }, [createElementVNode("h1", { class: "t-hero" }, "The Specimen"), createElementVNode("p", { class: "t-micro t-muted" }, "Design's daily record · Friday, July 18, 2026 · Issue 214")], -1)),
						createVNode(unref(KCard), {
							variant: "link",
							href: "#",
							lead: true
						}, {
							default: withCtx(() => [
								createVNode(unref(KFigure), { caption: "Specimen sheet: Studio Ostra for The Specimen" }, {
									default: withCtx(() => [(openBlock(), createElementBlock("svg", {
										viewBox: "0 0 640 360",
										xmlns: "http://www.w3.org/2000/svg",
										role: "img",
										"aria-label": "Abstract specimen sheet: one filled glyph block among outlined ones",
										innerHTML: leadSvgMarksHtml
									}))]),
									_: 1
								}),
								_cache[1] || (_cache[1] = createElementVNode("p", { class: "t-micro t-muted" }, "Tooling · Exclusive", -1)),
								_cache[2] || (_cache[2] = createElementVNode("div", { class: "card__heading" }, [createElementVNode("h2", { class: "t-display" }, "Rill ships an agent-readable component format"), createElementVNode("p", { class: "t-body" }, "Every component now exports as structured JSON next to the visual file, and three plugin makers say the bridge from design to code just lost weeks of glue work. The format lands in the stable channel Monday; the spec is open from day one.")], -1)),
								createVNode(unref(KMedia), {
									title: "Renata Sokol",
									meta: "Today, 09:40 · 6 min read",
									micro: true,
									initials: "RS"
								}),
								createVNode(unref(KButton), { as: "span" }, {
									default: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode("Read the story", -1)])]),
									_: 1
								})
							]),
							_: 1
						}),
						createVNode(unref(KFrontRail), { title: "Latest" }, {
							default: withCtx(() => [
								_cache[6] || (_cache[6] = createElementVNode("a", {
									class: "media",
									href: "#"
								}, [createElementVNode("div", { class: "media__body" }, [createElementVNode("p", { class: "t-caption--bold" }, "Two foundries settle the variable-font licensing dispute"), createElementVNode("p", { class: "t-micro t-muted" }, "10:12 · Type")])], -1)),
								_cache[7] || (_cache[7] = createElementVNode("a", {
									class: "media",
									href: "#"
								}, [createElementVNode("div", { class: "media__body" }, [createElementVNode("p", { class: "t-caption--bold" }, "Regulator rules a retailer's checkout fails contrast standards"), createElementVNode("p", { class: "t-micro t-muted" }, "09:55 · Accessibility")])], -1)),
								_cache[8] || (_cache[8] = createElementVNode("a", {
									class: "media",
									href: "#"
								}, [createElementVNode("div", { class: "media__body" }, [createElementVNode("p", { class: "t-caption--bold" }, "Two token-format specs merge into one open standard"), createElementVNode("p", { class: "t-micro t-muted" }, "09:20 · Tooling")])], -1)),
								_cache[9] || (_cache[9] = createElementVNode("a", {
									class: "media",
									href: "#"
								}, [createElementVNode("div", { class: "media__body" }, [createElementVNode("p", { class: "t-caption--bold" }, "A 40-year-old branding studio closes its Chicago office"), createElementVNode("p", { class: "t-micro t-muted" }, "08:41 · Business")])], -1)),
								_cache[10] || (_cache[10] = createElementVNode("a", {
									class: "media",
									href: "#"
								}, [createElementVNode("div", { class: "media__body" }, [createElementVNode("p", { class: "t-caption--bold" }, "Design-hiring budgets flat for a third year, survey finds"), createElementVNode("p", { class: "t-micro t-muted" }, "08:05 · Business")])], -1)),
								createVNode(unref(KCard), null, {
									default: withCtx(() => [
										createVNode(unref(KCardHeading), { title: "The numbers" }),
										createVNode(unref(KFieldRow), { label: "Foundry deals, YTD" }, {
											default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("14 ", -1), createElementVNode("span", { class: "t-caption--bold" }, "↑ 4", -1)])]),
											_: 1
										}),
										createVNode(unref(KFieldRow), { label: "Median design salary" }, {
											default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("$118K ", -1), createElementVNode("span", { class: "t-caption--bold" }, "↑ 2%", -1)])]),
											_: 1
										}),
										createVNode(unref(KFieldRow), { label: "Open design roles" }, {
											default: withCtx(() => [..._cache[5] || (_cache[5] = [createTextVNode("8 210 ", -1), createElementVNode("span", { class: "t-caption--bold" }, "↓ 6%", -1)])]),
											_: 1
										})
									]),
									_: 1
								})
							]),
							_: 1
						}),
						createVNode(unref(KFrontDesks), null, {
							default: withCtx(() => [
								createVNode(unref(KCard), {
									variant: "link",
									href: "#"
								}, {
									default: withCtx(() => [
										_cache[12] || (_cache[12] = createElementVNode("p", { class: "t-micro t-muted" }, "Product", -1)),
										createVNode(unref(KCardHeading), {
											title: "A prototyping tool adds native voice-interface previews",
											subtitle: "The beta reaches every paid seat next month; early testers already script full call flows."
										}),
										createVNode(unref(KButton), { as: "span" }, {
											default: withCtx(() => [..._cache[11] || (_cache[11] = [createTextVNode("Open product", -1)])]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KCard), {
									variant: "link",
									href: "#"
								}, {
									default: withCtx(() => [
										_cache[14] || (_cache[14] = createElementVNode("p", { class: "t-micro t-muted" }, "Craft", -1)),
										_cache[15] || (_cache[15] = createElementVNode("div", { class: "card__heading" }, [createElementVNode("h3", { class: "t-title" }, "Drawing a typeface for low vision took six months of testing"), createElementVNode("p", { class: "t-caption" }, "Every counter and stroke answered to readers, not to the designer's eye.")], -1)),
										createVNode(unref(KButton), { as: "span" }, {
											default: withCtx(() => [..._cache[13] || (_cache[13] = [createTextVNode("Open craft", -1)])]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KCard), {
									variant: "link",
									href: "#"
								}, {
									default: withCtx(() => [
										_cache[17] || (_cache[17] = createElementVNode("p", { class: "t-micro t-muted" }, "Field notes", -1)),
										createVNode(unref(KCardHeading), {
											title: "Inside the studio that still ships everything on paper first",
											subtitle: "Sketchbooks outnumber laptops three to one on this floor, and the work shows it."
										}),
										createVNode(unref(KButton), { as: "span" }, {
											default: withCtx(() => [..._cache[16] || (_cache[16] = [createTextVNode("Open field notes", -1)])]),
											_: 1
										})
									]),
									_: 1
								})
							]),
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
export { _14_newsfront_default as default };
