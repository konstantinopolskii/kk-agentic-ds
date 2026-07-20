import { Fragment, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, onBeforeUnmount, onMounted, openBlock, ref, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KCard, KCardBody, KCardCollapsible, KCardHeading, KCardStack, KCode, KCommentStack, KField, KFigure, KInspector, KInspectorGroup, KList, KQuote, KSidebar, KSidebarNav, KSpecList, KTag, useDeck } from "@konstantinopolskii/vue";
//#region sfc/pages/pattern-index.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "t-caption" };
var _hoisted_2 = { class: "t-micro t-muted" };
var _hoisted_3 = { class: "t-body" };
var _hoisted_4 = { class: "t-body" };
var _hoisted_5 = { class: "t-body" };
var _hoisted_6 = { class: "t-body" };
var _hoisted_7 = { class: "t-body" };
var _hoisted_8 = { class: "t-caption" };
var _hoisted_9 = { class: "t-caption" };
var _hoisted_10 = { class: "t-caption" };
var _hoisted_11 = { class: "t-body" };
var _hoisted_12 = {
	class: "fab fab--nav",
	"data-view-target": "nav",
	type: "button",
	"aria-label": "Navigation"
};
var _hoisted_13 = {
	width: "18",
	height: "14",
	viewBox: "0 0 18 14",
	fill: "none",
	"aria-hidden": "true",
	innerHTML: "<rect width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"/><rect y=\"6\" width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"/><rect y=\"12\" width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"/>"
};
//#endregion
//#region sfc/pages/pattern-index.vue
var pattern_index_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-index",
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
		const bodyDeckEl = ref(null);
		const inspectorDeckEl = ref(null);
		let disposeBodyDeck;
		let disposeInspectorDeck;
		onMounted(() => {
			if (bodyDeckEl.value) disposeBodyDeck = useDeck(bodyDeckEl.value);
			if (inspectorDeckEl.value) disposeInspectorDeck = useDeck(inspectorDeckEl.value);
		});
		onBeforeUnmount(() => {
			disposeBodyDeck?.();
			disposeInspectorDeck?.();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createVNode(unref(KApp), null, {
					default: withCtx(() => [
						createVNode(unref(KSidebar), { title: "Fundamental" }, {
							footer: withCtx(() => [..._cache[0] || (_cache[0] = [
								createTextVNode(" 2026, kk.consulting", -1),
								createElementVNode("br", null, null, -1),
								createTextVNode(" Fundamental demo ", -1)
							])]),
							default: withCtx(() => [createVNode(unref(KSidebarNav))]),
							_: 1
						}),
						createVNode(unref(KBook), { id: "doc" }, {
							default: withCtx(() => [
								createVNode(unref(KBookSection), null, {
									default: withCtx(() => [..._cache[1] || (_cache[1] = [
										createElementVNode("h1", { class: "t-hero" }, "Fundamental", -1),
										createElementVNode("p", { class: "t-body" }, " Every atom the kit owns, composed the way the kit composes. A document that reads itself. ", -1),
										createElementVNode("p", { class: "t-body" }, " Seven parts, sidebar on the left, margin on the right. The middle column is what we read. ", -1)
									])]),
									_: 1
								}),
								_cache[115] || (_cache[115] = createElementVNode("h2", { class: "book__part" }, "Prose", -1)),
								createVNode(unref(KBookSection), { id: "opening" }, {
									default: withCtx(() => [..._cache[2] || (_cache[2] = [
										createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Opening"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Hero, intro, part break")
										], -1),
										createElementVNode("p", { class: "t-body" }, " Commissioner is the only typeface. Regular sits on Medium 500 so the body holds weight on screen. Bold is for headings and the short emphasis that earns it. ", -1),
										createElementVNode("p", {
											class: "t-body",
											innerHTML: " The hero runs at <span class=\"t-code\">66 / 66</span>. Body at <span class=\"t-code\">22 / 32</span>. A 3&times; jump between the two is what the kit calls radical contrast. "
										}, null, -1)
									])]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "navigation" }, {
									default: withCtx(() => [..._cache[3] || (_cache[3] = [createElementVNode("h2", { class: "t-display" }, [
										createTextVNode(" Navigation"),
										createElementVNode("br"),
										createElementVNode("span", { class: "t-display--medium t-muted" }, "Sidebar TOC, scroll-spy, nav groups")
									], -1), createElementVNode("p", { class: "t-body" }, " The sidebar to the left carries the doc-internal TOC. Nav groups chunk one to nine items each. Scroll-spy tracks the active section; the indicator slides between rows on scroll. ", -1)])]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "reading" }, {
									default: withCtx(() => [
										_cache[10] || (_cache[10] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Reading"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Body, caption, micro")
										], -1)),
										_cache[11] || (_cache[11] = createElementVNode("p", { class: "t-body" }, " Paragraphs set in body type. Over three sentences, the paragraph becomes a list or a spec card. This one holds three and stops. ", -1)),
										createElementVNode("p", _hoisted_1, [
											_cache[5] || (_cache[5] = createTextVNode(" Caption sits at ", -1)),
											createVNode(unref(KCode), null, {
												default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("16 / 24", -1)])]),
												_: 1
											}),
											_cache[6] || (_cache[6] = createTextVNode(". It is the workhorse inside cards. ", -1))
										]),
										createElementVNode("p", _hoisted_2, [
											_cache[8] || (_cache[8] = createTextVNode(" Micro is ", -1)),
											createVNode(unref(KCode), null, {
												default: withCtx(() => [..._cache[7] || (_cache[7] = [createTextVNode("14 / 20", -1)])]),
												_: 1
											}),
											_cache[9] || (_cache[9] = createTextVNode(", reserved for metadata and citations. ", -1))
										])
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "lists" }, {
									default: withCtx(() => [
										_cache[15] || (_cache[15] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Lists"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Ordered, unordered, inline")
										], -1)),
										_cache[16] || (_cache[16] = createElementVNode("p", { class: "t-body" }, " An unordered list for items where order carries no weight. A numbered list for steps and rank. Both sit on the same rail. ", -1)),
										createVNode(unref(KList), { items: [
											"Pure signal before decoration.",
											"Expected patterns cost nothing.",
											"Eighty to twenty at every nesting.",
											"Chunk past seven items.",
											"Radical contrast, one distinction step."
										] }),
										createVNode(unref(KList), {
											ordered: "",
											items: [
												"Name the job before drawing.",
												"Reach for the closest kit component.",
												"Compose. Do not invent.",
												"Sign."
											]
										}),
										createElementVNode("p", _hoisted_3, [
											_cache[13] || (_cache[13] = createTextVNode(" A sentence can carry an inline value like ", -1)),
											createVNode(unref(KCode), null, {
												default: withCtx(() => [..._cache[12] || (_cache[12] = [createTextVNode("--space-4", -1)])]),
												_: 1
											}),
											_cache[14] || (_cache[14] = createTextVNode(" without breaking the rhythm. Numbers, tokens, and the occasional softer beat all sit on the same line. ", -1))
										])
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "figures" }, {
									default: withCtx(() => [
										_cache[19] || (_cache[19] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Figures"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Quote, figure, citation")
										], -1)),
										createVNode(unref(KQuote), { cite: "Konstantin Konstantinopolskii" }, {
											default: withCtx(() => [..._cache[17] || (_cache[17] = [createTextVNode(" Beauty is a side effect of clarity. ", -1)])]),
											_: 1
										}),
										_cache[20] || (_cache[20] = createElementVNode("p", { class: "t-body" }, " A quote sits black at body weight with a 4 px left rail. Citation sits below in micro. ", -1)),
										createVNode(unref(KFigure), { caption: "Signature, SVG, right-hand rail of every signoff." }, {
											default: withCtx(() => [..._cache[18] || (_cache[18] = [createElementVNode("img", {
												src: "../../signature.svg",
												alt: "Handwritten signature of Konstantin Konstantinopolskii"
											}, null, -1)])]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "preview-frame" }, {
									default: withCtx(() => [..._cache[21] || (_cache[21] = [createElementVNode("h2", { class: "t-display" }, [
										createTextVNode(" Preview frame"),
										createElementVNode("br"),
										createElementVNode("span", { class: "t-display--medium t-muted" }, "Scaled iframe for doc surfaces")
									], -1), createElementVNode("p", { class: "t-body" }, " A clipped wrapper with an iframe rendering at 400% and scaling to 0.25. Kit docs only. Product prose does not embed iframes. ", -1)])]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "registry-table" }, {
									default: withCtx(() => [..._cache[22] || (_cache[22] = [createElementVNode("h2", { class: "t-display" }, [
										createTextVNode(" Registry table"),
										createElementVNode("br"),
										createElementVNode("span", { class: "t-display--medium t-muted" }, "Dense two-column inventory")
									], -1), createElementVNode("p", { class: "t-body" }, " Resets browser table defaults, applies hairline borders and text tokens, keeps links inheriting surface type. First column reserves 30% width and forbids wrapping. ", -1)])]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "spec-list" }, {
									default: withCtx(() => [..._cache[23] || (_cache[23] = [createElementVNode("h2", { class: "t-display" }, [
										createTextVNode(" Spec list"),
										createElementVNode("br"),
										createElementVNode("span", { class: "t-display--medium t-muted" }, "Key and value rows")
									], -1), createElementVNode("p", { class: "t-body" }, " The workhorse for key-value rows inside a card. Two, three, or four-column shapes only. Key cells render at Medium 500, full black. ", -1)])]),
									_: 1
								}),
								_cache[116] || (_cache[116] = createElementVNode("h2", { class: "book__part" }, "Spec", -1)),
								createVNode(unref(KBookSection), { id: "material" }, {
									default: withCtx(() => [..._cache[24] || (_cache[24] = [createElementVNode("h2", { class: "t-display" }, [
										createTextVNode(" Material"),
										createElementVNode("br"),
										createElementVNode("span", { class: "t-display--medium t-muted" }, "No gradients, shadows, glass, blur")
									], -1), createElementVNode("p", { class: "t-body" }, " Depth comes from hierarchy and spacing, not from effects. Each skeuomorphic trick fakes light the screen cannot carry. ", -1)])]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "color" }, {
									default: withCtx(() => [
										_cache[26] || (_cache[26] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Color"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Nine tokens")
										], -1)),
										_cache[27] || (_cache[27] = createElementVNode("p", { class: "t-body" }, " Two backgrounds, two surface tints, two hairlines, three text alphas. Text is black. Muted and subtle carry metadata only. ", -1)),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [..._cache[25] || (_cache[25] = [createElementVNode("dl", { class: "book__spec" }, [
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "swatch" }, [createElementVNode("span", {
													class: "swatch__dot",
													style: { "background": "var(--color-bg)" }
												}), createElementVNode("span", { class: "t-code" }, "--color-bg")])]), createElementVNode("dd", { class: "book__spec-value" }, "Primary background. White.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "swatch" }, [createElementVNode("span", {
													class: "swatch__dot",
													style: { "background": "var(--color-bg-muted)" }
												}), createElementVNode("span", { class: "t-code" }, "--color-bg-muted")])]), createElementVNode("dd", { class: "book__spec-value" }, "Soft frame outside the app.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "swatch" }, [createElementVNode("span", {
													class: "swatch__dot",
													style: { "background": "var(--color-surface-overlay)" }
												}), createElementVNode("span", { class: "t-code" }, "--color-surface-overlay")])]), createElementVNode("dd", { class: "book__spec-value" }, "The 3% overlay. Hover, focus, active share it.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "swatch" }, [createElementVNode("span", {
													class: "swatch__dot",
													style: { "background": "var(--color-surface-strong)" }
												}), createElementVNode("span", { class: "t-code" }, "--color-surface-strong")])]), createElementVNode("dd", { class: "book__spec-value" }, "Row hover, button rest.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "swatch" }, [createElementVNode("span", {
													class: "swatch__dot",
													style: { "background": "var(--color-border)" }
												}), createElementVNode("span", { class: "t-code" }, "--color-border")])]), createElementVNode("dd", { class: "book__spec-value" }, "Hairline dividers.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "swatch" }, [createElementVNode("span", {
													class: "swatch__dot",
													style: { "background": "var(--color-border-strong)" }
												}), createElementVNode("span", { class: "t-code" }, "--color-border-strong")])]), createElementVNode("dd", { class: "book__spec-value" }, "Focus rings, deeper rules.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "swatch" }, [createElementVNode("span", {
													class: "swatch__dot",
													style: { "background": "var(--color-text)" }
												}), createElementVNode("span", { class: "t-code" }, "--color-text")])]), createElementVNode("dd", { class: "book__spec-value" }, "Primary text. Pure black.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "swatch" }, [createElementVNode("span", {
													class: "swatch__dot",
													style: { "background": "var(--color-text-muted)" }
												}), createElementVNode("span", { class: "t-code" }, "--color-text-muted")])]), createElementVNode("dd", { class: "book__spec-value" }, "Metadata: bylines, captions, hairlines.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "swatch" }, [createElementVNode("span", {
													class: "swatch__dot",
													style: { "background": "var(--color-text-subtle)" }
												}), createElementVNode("span", { class: "t-code" }, "--color-text-subtle")])]), createElementVNode("dd", { class: "book__spec-value" }, "Placeholders, softest labels.")])
											], -1)])]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "space" }, {
									default: withCtx(() => [
										_cache[32] || (_cache[32] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Space"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "A 4px grid")
										], -1)),
										createElementVNode("p", _hoisted_4, [
											_cache[29] || (_cache[29] = createTextVNode(" Every gap, padding, margin snaps to a multiple of 4. A ", -1)),
											createVNode(unref(KCode), null, {
												default: withCtx(() => [..._cache[28] || (_cache[28] = [createTextVNode("13px", -1)])]),
												_: 1
											}),
											_cache[30] || (_cache[30] = createTextVNode(" gap means we need a different component. ", -1))
										]),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [createVNode(unref(KCardHeading), { title: "Scale" }), _cache[31] || (_cache[31] = createElementVNode("dl", { class: "book__spec book__spec--value" }, [
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-1")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "4px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "tag gaps, micro stacks.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-2")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "8px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "tight adjacency.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-3")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "12px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "card inset.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-4")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "16px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "row to row.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-5")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "20px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "section inner padding.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-6")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "24px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "card gaps, text rail.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-7")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "28px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "rare, when 24 reads cramped.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-8")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "32px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "section to section.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-10")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "40px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "block separation in long-form.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-12")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "48px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "part breaks.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-15")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "60px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "around the hero.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--space-20")]),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "80px")]),
													createElementVNode("dd", { class: "book__spec-value" }, "end of document.")
												])
											], -1))]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "type" }, {
									default: withCtx(() => [
										_cache[34] || (_cache[34] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Type"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "One font, three weights, seven sizes")
										], -1)),
										_cache[35] || (_cache[35] = createElementVNode("p", { class: "t-body" }, " Commissioner. Regular 500, Medium 500, Bold 700. Seven sizes from hero down to micro. ", -1)),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [createVNode(unref(KCardHeading), { title: "Scale" }), _cache[33] || (_cache[33] = createElementVNode("dl", { class: "book__spec book__spec--value" }, [
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, "Hero"),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "66 / 66")]),
													createElementVNode("dd", { class: "book__spec-value" }, "the document's own title.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, "Display"),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "38 / 38")]),
													createElementVNode("dd", { class: "book__spec-value" }, "section headings.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, "Body"),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "22 / 32")]),
													createElementVNode("dd", { class: "book__spec-value" }, "long-form reading text.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, "Title"),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "22 / 28")]),
													createElementVNode("dd", { class: "book__spec-value" }, "card headings.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, "Subtitle"),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "18 / 24")]),
													createElementVNode("dd", { class: "book__spec-value" }, "nav headers, spec keys.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, "Caption"),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "16 / 24")]),
													createElementVNode("dd", { class: "book__spec-value" }, "UI labels, body inside cards.")
												]),
												createElementVNode("div", { class: "book__spec-row" }, [
													createElementVNode("dt", { class: "book__spec-key" }, "Micro"),
													createElementVNode("dd", { class: "book__spec-value" }, [createElementVNode("span", { class: "t-code" }, "14 / 20")]),
													createElementVNode("dd", { class: "book__spec-value" }, "captions, citations, metadata.")
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
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "radii" }, {
									default: withCtx(() => [_cache[44] || (_cache[44] = createElementVNode("h2", { class: "t-display" }, [
										createTextVNode(" Radii"),
										createElementVNode("br"),
										createElementVNode("span", { class: "t-display--medium t-muted" }, "Four values")
									], -1)), createElementVNode("p", _hoisted_5, [
										createVNode(unref(KCode), null, {
											default: withCtx(() => [..._cache[36] || (_cache[36] = [createTextVNode("12 px", -1)])]),
											_: 1
										}),
										_cache[40] || (_cache[40] = createTextVNode(" for buttons and fields, ", -1)),
										createVNode(unref(KCode), null, {
											default: withCtx(() => [..._cache[37] || (_cache[37] = [createTextVNode("16 px", -1)])]),
											_: 1
										}),
										_cache[41] || (_cache[41] = createTextVNode(" for preview frames, ", -1)),
										createVNode(unref(KCode), null, {
											default: withCtx(() => [..._cache[38] || (_cache[38] = [createTextVNode("24 px", -1)])]),
											_: 1
										}),
										_cache[42] || (_cache[42] = createTextVNode(" for cards, ", -1)),
										createVNode(unref(KCode), null, {
											default: withCtx(() => [..._cache[39] || (_cache[39] = [createTextVNode("9999 px", -1)])]),
											_: 1
										}),
										_cache[43] || (_cache[43] = createTextVNode(" for pills and thumbs. A fifth radius is forbidden. ", -1))
									])]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "motion" }, {
									default: withCtx(() => [
										_cache[51] || (_cache[51] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Motion"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Four easings, four durations")
										], -1)),
										createElementVNode("p", _hoisted_6, [
											_cache[46] || (_cache[46] = createTextVNode(" Default is ", -1)),
											_cache[47] || (_cache[47] = createElementVNode("span", {
												class: "t-code",
												innerHTML: "200ms &times; ease-out"
											}, null, -1)),
											_cache[48] || (_cache[48] = createTextVNode(" on transform and opacity. Reduced motion collapses every duration to ", -1)),
											createVNode(unref(KCode), null, {
												default: withCtx(() => [..._cache[45] || (_cache[45] = [createTextVNode("0.01ms", -1)])]),
												_: 1
											}),
											_cache[49] || (_cache[49] = createTextVNode(". ", -1))
										]),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [..._cache[50] || (_cache[50] = [createElementVNode("dl", { class: "book__spec" }, [
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--ease-out")]), createElementVNode("dd", { class: "book__spec-value" }, "Hover, focus, state flips.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--ease-spring")]), createElementVNode("dd", { class: "book__spec-value" }, "Switch thumbs, small confirmations.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--ease-swing")]), createElementVNode("dd", { class: "book__spec-value" }, "Long reveals, column arrivals.")]),
												createElementVNode("div", { class: "book__spec-row" }, [createElementVNode("dt", { class: "book__spec-key" }, [createElementVNode("span", { class: "t-code" }, "--ease-in-out")]), createElementVNode("dd", { class: "book__spec-value" }, "Motion that continues past the frame.")])
											], -1)])]),
											_: 1
										})
									]),
									_: 1
								}),
								_cache[117] || (_cache[117] = createElementVNode("h2", { class: "book__part" }, "Controls", -1)),
								createVNode(unref(KBookSection), { id: "cards" }, {
									default: withCtx(() => [
										_cache[57] || (_cache[57] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Cards"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Static, interactive, shout")
										], -1)),
										_cache[58] || (_cache[58] = createElementVNode("p", { class: "t-body" }, " Every widget is a card. Transparent at rest, 3% on touch. Three variants, one HTML shape. ", -1)),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [createVNode(unref(KCardHeading), {
												title: "Static card",
												subtitle: "A caption under the title. Raw paragraphs pick up the 12px inset without a card__body wrapper."
											}), _cache[52] || (_cache[52] = createElementVNode("p", { class: "t-caption" }, "Transparent until a pointer enters.", -1))]),
											_: 1
										}),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [createVNode(unref(KCardHeading), { title: "With body wrapper" }), createVNode(unref(KCardBody), null, {
												default: withCtx(() => [..._cache[53] || (_cache[53] = [createElementVNode("p", { class: "t-caption" }, "The card__body wrapper carries the 24px rail when the inner content is not a raw paragraph, list, or spec.", -1), createElementVNode("p", { class: "t-caption" }, "Two lines, one rail.", -1)])]),
												_: 1
											})]),
											_: 1
										}),
										createVNode(unref(KCard), { tight: true }, {
											default: withCtx(() => [..._cache[54] || (_cache[54] = [createElementVNode("p", { class: "t-caption" }, "Tight card. Smaller inset, tighter gap. For dense stacks.", -1)])]),
											_: 1
										}),
										createVNode(unref(KCard), { variant: "shout" }, {
											default: withCtx(() => [createVNode(unref(KCardHeading), {
												title: "Shout card",
												subtitle: "Inverted. One per column.",
												muted: true
											}), _cache[55] || (_cache[55] = createElementVNode("p", { class: "t-caption" }, "Black surface, white content. Reserved for the one card that should interrupt the column.", -1))]),
											_: 1
										}),
										createVNode(unref(KCard), { variant: "heading" }, {
											default: withCtx(() => [..._cache[56] || (_cache[56] = [createElementVNode("h2", { class: "t-display" }, "Heading card", -1)])]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "fields" }, {
									default: withCtx(() => [
										_cache[61] || (_cache[61] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Fields"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "A row, a label, a value")
										], -1)),
										_cache[62] || (_cache[62] = createElementVNode("p", { class: "t-body" }, " A label and a value share one row. No box, no outline. Hover fills the row with 3%. Focus inverts to black with a white caret. ", -1)),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [
												createVNode(unref(KField), {
													label: "Base",
													row: "",
													modelValue: "16px"
												}),
												_cache[59] || (_cache[59] = createElementVNode("label", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Ratio"), createElementVNode("span", { class: "t-caption field__value" }, "1.25")], -1)),
												_cache[60] || (_cache[60] = createElementVNode("label", { class: "field" }, [createElementVNode("input", {
													class: "t-caption field__input",
													type: "text",
													placeholder: "sofia@kk.consulting"
												}), createElementVNode("span", {
													class: "field__fake-caret",
													"aria-hidden": "true"
												})], -1))
											]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "buttons" }, {
									default: withCtx(() => [
										_cache[67] || (_cache[67] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Buttons"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Secondary, primary")
										], -1)),
										createElementVNode("p", _hoisted_7, [
											_cache[64] || (_cache[64] = createTextVNode(" Full-width by default, ", -1)),
											createVNode(unref(KCode), null, {
												default: withCtx(() => [..._cache[63] || (_cache[63] = [createTextVNode("12px", -1)])]),
												_: 1
											}),
											_cache[65] || (_cache[65] = createTextVNode(" radius, bold label. Imperative verbs. One primary per card. ", -1))
										]),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [..._cache[66] || (_cache[66] = [
												createElementVNode("p", { class: "t-caption" }, "Pick a theme for the next document pass.", -1),
												createElementVNode("button", { class: "button t-subtitle" }, "Pick tokens", -1),
												createElementVNode("button", { class: "button button--primary t-subtitle" }, "Apply tokens", -1)
											])]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "tags" }, {
									default: withCtx(() => [
										_cache[79] || (_cache[79] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Tags"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Metadata only")
										], -1)),
										_cache[80] || (_cache[80] = createElementVNode("p", { class: "t-body" }, " A tag labels a thing. If it looks clickable, reach for a button. ", -1)),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [createElementVNode("p", _hoisted_8, [
												_cache[71] || (_cache[71] = createTextVNode(" Version ", -1)),
												createVNode(unref(KCode), null, {
													default: withCtx(() => [..._cache[68] || (_cache[68] = [createTextVNode("v1.1.0", -1)])]),
													_: 1
												}),
												_cache[72] || (_cache[72] = createTextVNode(" ships with ", -1)),
												createVNode(unref(KCode), null, {
													default: withCtx(() => [..._cache[69] || (_cache[69] = [createTextVNode("9", -1)])]),
													_: 1
												}),
												_cache[73] || (_cache[73] = createTextVNode(" components and ", -1)),
												createVNode(unref(KCode), null, {
													default: withCtx(() => [..._cache[70] || (_cache[70] = [createTextVNode("0", -1)])]),
													_: 1
												}),
												_cache[74] || (_cache[74] = createTextVNode(" brand colors. ", -1))
											]), createElementVNode("p", _hoisted_9, [
												createVNode(unref(KTag), null, {
													default: withCtx(() => [..._cache[75] || (_cache[75] = [createTextVNode("Foundations", -1)])]),
													_: 1
												}),
												createVNode(unref(KTag), null, {
													default: withCtx(() => [..._cache[76] || (_cache[76] = [createTextVNode("9 components", -1)])]),
													_: 1
												}),
												createVNode(unref(KTag), null, {
													default: withCtx(() => [..._cache[77] || (_cache[77] = [createTextVNode("18 Apr '26", -1)])]),
													_: 1
												}),
												createVNode(unref(KTag), { bold: true }, {
													default: withCtx(() => [..._cache[78] || (_cache[78] = [createTextVNode("Signed", -1)])]),
													_: 1
												})
											])]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "code" }, {
									default: withCtx(() => [
										_cache[91] || (_cache[91] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Code"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Inline + block")
										], -1)),
										_cache[92] || (_cache[92] = createElementVNode("p", { class: "t-body" }, " One class for inline tokens, keywords, paths, durations, version tags. Surface chip, regular weight, muted text. The block variant carries a left rail for multi-line code paragraphs. ", -1)),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [createElementVNode("p", _hoisted_10, [
												_cache[85] || (_cache[85] = createTextVNode(" Use ", -1)),
												createVNode(unref(KCode), null, {
													default: withCtx(() => [..._cache[81] || (_cache[81] = [createTextVNode(".t-code", -1)])]),
													_: 1
												}),
												_cache[86] || (_cache[86] = createTextVNode(" on a ", -1)),
												createVNode(unref(KCode), null, {
													default: withCtx(() => [..._cache[82] || (_cache[82] = [createTextVNode("span", -1)])]),
													_: 1
												}),
												_cache[87] || (_cache[87] = createTextVNode(" to mark a token like ", -1)),
												createVNode(unref(KCode), null, {
													default: withCtx(() => [..._cache[83] || (_cache[83] = [createTextVNode("--space-4", -1)])]),
													_: 1
												}),
												_cache[88] || (_cache[88] = createTextVNode(" or a duration like ", -1)),
												createVNode(unref(KCode), null, {
													default: withCtx(() => [..._cache[84] || (_cache[84] = [createTextVNode("200ms", -1)])]),
													_: 1
												}),
												_cache[89] || (_cache[89] = createTextVNode(". ", -1))
											]), _cache[90] || (_cache[90] = createElementVNode("p", { class: "t-code--block t-caption" }, [
												createTextVNode(" git tag -a v1.3.0 -m \"UI kit 1.3.0 — content architecture\""),
												createElementVNode("br"),
												createTextVNode(" git push origin main"),
												createElementVNode("br"),
												createTextVNode(" git push origin v1.3.0 ")
											], -1))]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "switches" }, {
									default: withCtx(() => [
										_cache[94] || (_cache[94] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Switches"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Binary toggle")
										], -1)),
										_cache[95] || (_cache[95] = createElementVNode("p", { class: "t-body" }, " Off is the border tint, on is full text color. Use a switch when the change commits instantly. ", -1)),
										createVNode(unref(KCard), null, {
											default: withCtx(() => [..._cache[93] || (_cache[93] = [
												createElementVNode("label", { class: "switch t-caption" }, [
													createElementVNode("input", {
														type: "checkbox",
														class: "switch__input",
														checked: ""
													}),
													createElementVNode("span", { class: "switch__track" }),
													createTextVNode(" Color tokens ")
												], -1),
												createElementVNode("label", { class: "switch t-caption" }, [
													createElementVNode("input", {
														type: "checkbox",
														class: "switch__input",
														checked: ""
													}),
													createElementVNode("span", { class: "switch__track" }),
													createTextVNode(" Type tokens ")
												], -1),
												createElementVNode("label", { class: "switch t-caption" }, [
													createElementVNode("input", {
														type: "checkbox",
														class: "switch__input"
													}),
													createElementVNode("span", { class: "switch__track" }),
													createTextVNode(" Motion tokens ")
												], -1)
											])]),
											_: 1
										})
									]),
									_: 1
								}),
								_cache[118] || (_cache[118] = createElementVNode("h2", { class: "book__part" }, "Collections", -1)),
								createVNode(unref(KBookSection), { id: "stack" }, {
									default: withCtx(() => [
										_cache[105] || (_cache[105] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Card stack"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "One active, the rest minimized")
										], -1)),
										_cache[106] || (_cache[106] = createElementVNode("p", { class: "t-body" }, " Interactive cards stack vertically. One active at a time. Inactive cards collapse to heading and minimized button. ", -1)),
										createVNode(unref(KCardStack), null, {
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
															default: withCtx(() => [..._cache[96] || (_cache[96] = [createElementVNode("label", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Name"), createElementVNode("input", {
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
														_cache[97] || (_cache[97] = createElementVNode("button", {
															class: "button t-subtitle",
															"data-cta": "minimized"
														}, "Pick", -1)),
														_cache[98] || (_cache[98] = createElementVNode("button", {
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
															default: withCtx(() => [..._cache[99] || (_cache[99] = [createElementVNode("label", { class: "switch t-caption" }, [
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
														_cache[100] || (_cache[100] = createElementVNode("button", {
															class: "button t-subtitle",
															"data-cta": "minimized"
														}, "Choose", -1)),
														_cache[101] || (_cache[101] = createElementVNode("button", {
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
															default: withCtx(() => [..._cache[102] || (_cache[102] = [createElementVNode("label", { class: "field" }, [createElementVNode("input", {
																class: "t-caption field__input",
																type: "text",
																placeholder: "v1.2.0. stack tightened, shout demoted"
															})], -1)])]),
															_: 1
														}),
														_cache[103] || (_cache[103] = createElementVNode("button", {
															class: "button t-subtitle",
															"data-cta": "minimized"
														}, "Draft", -1)),
														_cache[104] || (_cache[104] = createElementVNode("button", {
															class: "button button--primary t-subtitle",
															"data-cta": "active"
														}, "Ship the change", -1))
													]),
													_: 1
												})
											]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "comment" }, {
									default: withCtx(() => [_cache[110] || (_cache[110] = createElementVNode("h2", { class: "t-display" }, [
										createTextVNode(" Comment"),
										createElementVNode("br"),
										createElementVNode("span", { class: "t-display--medium t-muted" }, "Draft and thread")
									], -1)), createElementVNode("p", _hoisted_11, [
										_cache[108] || (_cache[108] = createTextVNode(" Two shapes, one pattern. Draft uses the shout variant. Thread uses the interactive card with a collapsible reveal. Kebab menu carries Approve, Reply, Archive thread, Delete. Runtime events live in ", -1)),
										createVNode(unref(KCode), null, {
											default: withCtx(() => [..._cache[107] || (_cache[107] = [createTextVNode("docs/integration/comment.md", -1)])]),
											_: 1
										}),
										_cache[109] || (_cache[109] = createTextVNode(". ", -1))
									])]),
									_: 1
								}),
								createVNode(unref(KBookSection), { id: "deck" }, {
									default: withCtx(() => [
										_cache[112] || (_cache[112] = createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Deck"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Browse without consequence")
										], -1)),
										_cache[113] || (_cache[113] = createElementVNode("p", { class: "t-body" }, " A horizontal stack. One card active, the rest fanned back in perspective. Live inside a shout card. ", -1)),
										createVNode(unref(KCard), { variant: "shout" }, {
											default: withCtx(() => [createElementVNode("div", {
												class: "deck",
												ref_key: "bodyDeckEl",
												ref: bodyDeckEl
											}, [..._cache[111] || (_cache[111] = [
												createElementVNode("div", { class: "deck-card active" }, [
													createElementVNode("p", { class: "t-caption--bold" }, "Monochrome"),
													createElementVNode("p", { class: "t-caption" }, "Pure black on white. Nine tokens, no brand."),
													createElementVNode("button", {
														class: "tag deck-card__select",
														type: "button"
													}, "Choose")
												], -1),
												createElementVNode("div", { class: "deck-card" }, [
													createElementVNode("p", { class: "t-caption--bold" }, "Muted warm"),
													createElementVNode("p", { class: "t-caption" }, "Same tokens, 2% warm tint in neutrals."),
													createElementVNode("button", {
														class: "tag deck-card__select",
														type: "button"
													}, "Choose")
												], -1),
												createElementVNode("div", { class: "deck-card" }, [
													createElementVNode("p", { class: "t-caption--bold" }, "Cool gray"),
													createElementVNode("p", { class: "t-caption" }, "Slight blue cast in the neutral scale."),
													createElementVNode("button", {
														class: "tag deck-card__select",
														type: "button"
													}, "Choose")
												], -1),
												createElementVNode("div", { class: "deck-card" }, [
													createElementVNode("p", { class: "t-caption--bold" }, "High contrast"),
													createElementVNode("p", { class: "t-caption" }, "Pure black text, borders at 20%."),
													createElementVNode("button", {
														class: "tag deck-card__select",
														type: "button"
													}, "Choose")
												], -1),
												createElementVNode("div", { class: "deck-card" }, [
													createElementVNode("p", { class: "t-caption--bold" }, "Ink"),
													createElementVNode("p", { class: "t-caption" }, "Inverted. White on black. Full system."),
													createElementVNode("button", {
														class: "tag deck-card__select",
														type: "button"
													}, "Choose")
												], -1)
											])], 512)]),
											_: 1
										})
									]),
									_: 1
								}),
								_cache[119] || (_cache[119] = createElementVNode("h2", { class: "book__part" }, "Margin", -1)),
								createVNode(unref(KBookSection), { id: "signoff" }, {
									default: withCtx(() => [..._cache[114] || (_cache[114] = [
										createElementVNode("h2", { class: "t-display" }, [
											createTextVNode(" Signoff"),
											createElementVNode("br"),
											createElementVNode("span", { class: "t-display--medium t-muted" }, "Stats, byline, signature")
										], -1),
										createElementVNode("p", { class: "t-body" }, " The canonical ending. Stats sit on the left rail. Byline and signature close the document on the right. ", -1),
										createElementVNode("div", { class: "book__signoff" }, [createElementVNode("div", { class: "book__signoff-stats" }, [createElementVNode("div", { class: "stat t-caption" }, [createElementVNode("div", null, [createElementVNode("span", { class: "t-caption--bold" }, "9"), createTextVNode(" components in the kit.")]), createElementVNode("div", null, [createElementVNode("span", { class: "t-caption--bold" }, "9"), createTextVNode(" color tokens, and not one more.")])]), createElementVNode("div", { class: "stat t-caption" }, [createElementVNode("div", null, [createElementVNode("span", { class: "t-caption--bold" }, "12"), createTextVNode(" spacing tokens on a 4px grid.")]), createElementVNode("div", null, [createElementVNode("span", { class: "t-caption--bold" }, "7"), createTextVNode(" type sizes, three weights.")])])]), createElementVNode("div", { class: "book__signoff-signature" }, [createElementVNode("p", { class: "t-caption" }, [
											createTextVNode(" Signed by "),
											createElementVNode("span", { class: "t-caption--bold" }, [createTextVNode("Konstantin Konstantinopolskii,"), createElementVNode("br")]),
											createTextVNode(" founder at "),
											createElementVNode("span", { class: "t-caption--bold" }, [createTextVNode("kk.consulting"), createElementVNode("br")]),
											createElementVNode("span", { class: "t-muted" }, "23 April '26 at 17:30 Tbilisi Time.")
										]), createElementVNode("img", {
											class: "book__signoff-signature-img",
											src: "../../signature.svg",
											alt: "Handwritten signature of Konstantin Konstantinopolskii"
										})])], -1)
									])]),
									_: 1
								})
							]),
							_: 1
						}),
						createVNode(unref(KInspector), null, {
							default: withCtx(() => [createVNode(unref(KInspectorGroup), null, {
								default: withCtx(() => [
									createVNode(unref(KCard), { variant: "heading" }, {
										default: withCtx(() => [..._cache[120] || (_cache[120] = [createElementVNode("h2", { class: "t-display" }, "Tweak", -1)])]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "interactive",
										state: "active"
									}, {
										default: withCtx(() => [
											createVNode(unref(KCardHeading), {
												title: "Tweak the tokens",
												subtitle: "Brief the agent, pick a direction, scope, commit."
											}),
											createVNode(unref(KCardCollapsible), { flush: true }, {
												default: withCtx(() => [
													createElementVNode("div", {
														class: "deck",
														ref_key: "inspectorDeckEl",
														ref: inspectorDeckEl
													}, [..._cache[121] || (_cache[121] = [
														createElementVNode("div", { class: "deck-card active" }, [
															createElementVNode("p", { class: "t-caption--bold" }, "Monochrome"),
															createElementVNode("p", { class: "t-caption" }, "Pure black on white. Nine tokens, no brand."),
															createElementVNode("button", {
																class: "tag deck-card__select",
																type: "button"
															}, "Choose")
														], -1),
														createElementVNode("div", { class: "deck-card" }, [
															createElementVNode("p", { class: "t-caption--bold" }, "Muted warm"),
															createElementVNode("p", { class: "t-caption" }, "Same tokens, 2% warm tint in neutrals."),
															createElementVNode("button", {
																class: "tag deck-card__select",
																type: "button"
															}, "Choose")
														], -1),
														createElementVNode("div", { class: "deck-card" }, [
															createElementVNode("p", { class: "t-caption--bold" }, "Ink"),
															createElementVNode("p", { class: "t-caption" }, "Inverted. White on black."),
															createElementVNode("button", {
																class: "tag deck-card__select",
																type: "button"
															}, "Choose")
														], -1)
													])], 512),
													_cache[122] || (_cache[122] = createElementVNode("label", { class: "switch t-caption" }, [
														createElementVNode("input", {
															type: "checkbox",
															class: "switch__input",
															checked: ""
														}),
														createElementVNode("span", { class: "switch__track" }),
														createTextVNode(" Color tokens ")
													], -1)),
													_cache[123] || (_cache[123] = createElementVNode("label", { class: "switch t-caption" }, [
														createElementVNode("input", {
															type: "checkbox",
															class: "switch__input"
														}),
														createElementVNode("span", { class: "switch__track" }),
														createTextVNode(" Type tokens ")
													], -1)),
													_cache[124] || (_cache[124] = createElementVNode("div", { class: "card__heading" }, [createElementVNode("h4", { class: "t-subtitle" }, "Scope"), createElementVNode("p", { class: "t-caption" }, "Token sets the agent may touch.")], -1)),
													_cache[125] || (_cache[125] = createElementVNode("label", { class: "field" }, [createElementVNode("input", {
														class: "t-caption field__input",
														type: "text",
														placeholder: "bump radius to 16, leave weights alone"
													})], -1)),
													_cache[126] || (_cache[126] = createElementVNode("label", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Version"), createElementVNode("input", {
														class: "t-caption field__input",
														type: "text",
														value: "v1.2.0"
													})], -1))
												]),
												_: 1
											}),
											_cache[127] || (_cache[127] = createElementVNode("button", {
												class: "button t-subtitle",
												"data-cta": "minimized"
											}, "Configure", -1)),
											_cache[128] || (_cache[128] = createElementVNode("button", {
												class: "button button--primary t-subtitle",
												"data-cta": "active"
											}, "Apply tweak", -1))
										]),
										_: 1
									}),
									createVNode(unref(KCard), { variant: "interactive" }, {
										default: withCtx(() => [
											createVNode(unref(KCardHeading), {
												title: "Templates",
												subtitle: "Saved configurations from earlier tweaks."
											}),
											createVNode(unref(KCardCollapsible), { flush: true }, {
												default: withCtx(() => [..._cache[129] || (_cache[129] = [
													createElementVNode("label", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Memo"), createElementVNode("span", { class: "t-caption field__value" }, "monochrome, bold")], -1),
													createElementVNode("label", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Call"), createElementVNode("span", { class: "t-caption field__value" }, "muted warm, balanced")], -1),
													createElementVNode("label", { class: "field field--row" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Notes"), createElementVNode("span", { class: "t-caption field__value" }, "high contrast, bold")], -1)
												])]),
												_: 1
											}),
											_cache[130] || (_cache[130] = createElementVNode("button", {
												class: "button t-subtitle",
												"data-cta": "minimized"
											}, "Browse", -1)),
											_cache[131] || (_cache[131] = createElementVNode("button", {
												class: "button button--primary t-subtitle",
												"data-cta": "active"
											}, "Apply template", -1))
										]),
										_: 1
									})
								]),
								_: 1
							}), createVNode(unref(KInspectorGroup), null, {
								default: withCtx(() => [createVNode(unref(KCard), { variant: "heading" }, {
									default: withCtx(() => [..._cache[132] || (_cache[132] = [createElementVNode("h2", { class: "t-display" }, "Comments", -1)])]),
									_: 1
								}), createVNode(unref(KCommentStack), null, {
									default: withCtx(() => [
										createVNode(unref(KCard), {
											variant: "interactive",
											class: "comment-thread",
											"data-can-approve": "true"
										}, {
											default: withCtx(() => [_cache[134] || (_cache[134] = createElementVNode("div", { class: "comment-thread__preview" }, [
												createElementVNode("div", {
													class: "comment-msg",
													"data-message-id": "m-01"
												}, [
													createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Sofia Hlazunova"), createElementVNode("button", {
														class: "comment__menu",
														type: "button",
														"aria-label": "Message actions",
														"aria-expanded": "false"
													}, [createElementVNode("span")])]),
													createElementVNode("p", { class: "t-caption" }, "The tag row needs one more variant to cover the metadata case."),
													createElementVNode("div", {
														class: "comment__menu-popover",
														role: "menu"
													}, [
														createElementVNode("button", {
															class: "comment__menu-item comment__menu-item--approve t-caption",
															type: "button",
															role: "menuitem"
														}, "Approve"),
														createElementVNode("button", {
															class: "comment__menu-item t-caption",
															type: "button",
															role: "menuitem"
														}, "Edit"),
														createElementVNode("button", {
															class: "comment__menu-item t-caption",
															type: "button",
															role: "menuitem"
														}, "Reply"),
														createElementVNode("button", {
															class: "comment__menu-item t-caption",
															type: "button",
															role: "menuitem"
														}, "Archive thread"),
														createElementVNode("button", {
															class: "comment__menu-item t-caption",
															type: "button",
															role: "menuitem"
														}, "Delete")
													])
												]),
												createElementVNode("div", {
													class: "comment-thread__ellipsis",
													"aria-hidden": "true"
												}, [
													createElementVNode("span"),
													createElementVNode("span"),
													createElementVNode("span")
												]),
												createElementVNode("div", {
													class: "comment-msg",
													"data-message-id": "m-03",
													"data-author-role": "agent"
												}, [
													createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Claude"), createElementVNode("button", {
														class: "comment__menu",
														type: "button",
														"aria-label": "Message actions",
														"aria-expanded": "false"
													}, [createElementVNode("span")])]),
													createElementVNode("p", { class: "t-caption" }, "Added a bold tag at the end of the row. Take a look."),
													createElementVNode("div", {
														class: "comment__menu-popover",
														role: "menu"
													}, [
														createElementVNode("button", {
															class: "comment__menu-item comment__menu-item--approve t-caption",
															type: "button",
															role: "menuitem"
														}, "Approve"),
														createElementVNode("button", {
															class: "comment__menu-item t-caption",
															type: "button",
															role: "menuitem"
														}, "Edit"),
														createElementVNode("button", {
															class: "comment__menu-item t-caption",
															type: "button",
															role: "menuitem"
														}, "Reply"),
														createElementVNode("button", {
															class: "comment__menu-item t-caption",
															type: "button",
															role: "menuitem"
														}, "Archive thread"),
														createElementVNode("button", {
															class: "comment__menu-item t-caption",
															type: "button",
															role: "menuitem"
														}, "Delete")
													])
												])
											], -1)), createVNode(unref(KCardCollapsible), { flush: true }, {
												default: withCtx(() => [..._cache[133] || (_cache[133] = [createElementVNode("div", { class: "comment-thread__list" }, [
													createElementVNode("div", {
														class: "comment-msg",
														"data-message-id": "m-01"
													}, [
														createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Sofia Hlazunova"), createElementVNode("button", {
															class: "comment__menu",
															type: "button",
															"aria-label": "Message actions",
															"aria-expanded": "false"
														}, [createElementVNode("span")])]),
														createElementVNode("p", { class: "t-caption" }, "The tag row needs one more variant to cover the metadata case."),
														createElementVNode("div", {
															class: "comment__menu-popover",
															role: "menu"
														}, [
															createElementVNode("button", {
																class: "comment__menu-item comment__menu-item--approve t-caption",
																type: "button",
																role: "menuitem"
															}, "Approve"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Edit"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Reply"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Archive thread"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Delete")
														])
													]),
													createElementVNode("div", {
														class: "comment-msg",
														"data-message-id": "m-02"
													}, [
														createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Konstantin Konstantinopolskii"), createElementVNode("button", {
															class: "comment__menu",
															type: "button",
															"aria-label": "Message actions",
															"aria-expanded": "false"
														}, [createElementVNode("span")])]),
														createElementVNode("p", { class: "t-caption" }, "Claude, add a bold tag to the row."),
														createElementVNode("div", {
															class: "comment__menu-popover",
															role: "menu"
														}, [
															createElementVNode("button", {
																class: "comment__menu-item comment__menu-item--approve t-caption",
																type: "button",
																role: "menuitem"
															}, "Approve"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Edit"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Reply"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Archive thread"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Delete")
														])
													]),
													createElementVNode("div", {
														class: "comment-msg",
														"data-message-id": "m-03",
														"data-author-role": "agent"
													}, [
														createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Claude"), createElementVNode("button", {
															class: "comment__menu",
															type: "button",
															"aria-label": "Message actions",
															"aria-expanded": "false"
														}, [createElementVNode("span")])]),
														createElementVNode("p", { class: "t-caption" }, "Added a bold tag at the end of the row. Take a look."),
														createElementVNode("div", {
															class: "comment__menu-popover",
															role: "menu"
														}, [
															createElementVNode("button", {
																class: "comment__menu-item comment__menu-item--approve t-caption",
																type: "button",
																role: "menuitem"
															}, "Approve"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Edit"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Reply"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Archive thread"),
															createElementVNode("button", {
																class: "comment__menu-item t-caption",
																type: "button",
																role: "menuitem"
															}, "Delete")
														])
													])
												], -1), createElementVNode("label", { class: "field comment-thread__reply" }, [createElementVNode("input", {
													class: "t-caption field__input",
													type: "text",
													placeholder: "looks right now, thank you"
												}), createElementVNode("span", {
													class: "field__fake-caret",
													"aria-hidden": "true"
												})], -1)])]),
												_: 1
											})]),
											_: 1
										}),
										createVNode(unref(KCard), {
											variant: "interactive",
											class: "comment-thread",
											"data-resolved": "true",
											"data-state": "minimized"
										}, {
											default: withCtx(() => [..._cache[135] || (_cache[135] = [createElementVNode("div", { class: "comment-thread__preview" }, [createElementVNode("div", { class: "comment-thread__resolved" }, [
												createElementVNode("span", {
													class: "comment-thread__resolved-stamp t-caption",
													"aria-hidden": "true",
													innerHTML: "&check;"
												}),
												createElementVNode("span", { class: "comment-thread__resolved-snippet t-caption" }, "The signoff timestamp should carry the timezone."),
												createElementVNode("span", { class: "comment-thread__resolved-byline t-caption t-muted" }, "Konstantin Konstantinopolskii")
											])], -1)])]),
											_: 1
										}),
										createVNode(unref(KCard), {
											variant: "interactive",
											class: "comment-thread",
											"data-archived": "true"
										}, {
											default: withCtx(() => [..._cache[136] || (_cache[136] = [createElementVNode("div", { class: "comment-thread__preview" }, [createElementVNode("div", {
												class: "comment-msg",
												"data-message-id": "m-99"
											}, [
												createElementVNode("div", { class: "comment-msg__header" }, [createElementVNode("div", { class: "t-subtitle" }, "Sofia Hlazunova"), createElementVNode("button", {
													class: "comment__menu",
													type: "button",
													"aria-label": "Message actions",
													"aria-expanded": "false"
												}, [createElementVNode("span")])]),
												createElementVNode("p", { class: "t-caption" }, "Early tag sizing notes. Superseded by v1.1."),
												createElementVNode("div", {
													class: "comment__menu-popover",
													role: "menu"
												}, [
													createElementVNode("button", {
														class: "comment__menu-item comment__menu-item--approve t-caption",
														type: "button",
														role: "menuitem"
													}, "Approve"),
													createElementVNode("button", {
														class: "comment__menu-item t-caption",
														type: "button",
														role: "menuitem"
													}, "Edit"),
													createElementVNode("button", {
														class: "comment__menu-item t-caption",
														type: "button",
														role: "menuitem"
													}, "Reply"),
													createElementVNode("button", {
														class: "comment__menu-item t-caption",
														type: "button",
														role: "menuitem"
													}, "Archive thread"),
													createElementVNode("button", {
														class: "comment__menu-item t-caption",
														type: "button",
														role: "menuitem"
													}, "Delete")
												])
											])], -1)])]),
											_: 1
										})
									]),
									_: 1
								})]),
								_: 1
							})]),
							_: 1
						})
					]),
					_: 1
				}),
				createElementVNode("button", _hoisted_12, [(openBlock(), createElementBlock("svg", _hoisted_13))]),
				_cache[137] || (_cache[137] = createElementVNode("button", {
					class: "fab fab--inspector",
					"data-view-target": "inspector",
					type: "button",
					"aria-label": "Comments"
				}, [createElementVNode("span", { class: "fab__count" }, "2")], -1)),
				_cache[138] || (_cache[138] = createElementVNode("button", {
					class: "fab fab--comment",
					type: "button",
					"aria-label": "Add a comment"
				}, "Add a comment", -1))
			], 64);
		};
	}
});
//#endregion
export { pattern_index_default as default };
