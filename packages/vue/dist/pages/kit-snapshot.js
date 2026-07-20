import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, ref, toDisplayString, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KButton, KCard, KCardBody, KCardCollapsible, KCardHeading, KCardStack, KChip, KChipWrap, KCode, KCommentNew, KCommentThread, KDataCell, KDataTable, KDivider, KDropdown, KField, KFieldRow, KFigure, KInspector, KInspectorGroup, KList, KMedia, KMetric, KModal, KPagination, KPreviewFrame, KQuote, KRegistryTable, KSidebar, KSidebarNav, KSignoff, KSpark, KSparkLabels, KSpecList, KStat, KSwitch, KTabs, KTag, KToast, KTooltip, toast } from "@konstantinopolskii/vue";
//#region sfc/pages/kit-snapshot.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "card" };
var _hoisted_2 = { class: "card" };
var _hoisted_3 = { class: "t-caption" };
var _hoisted_4 = { class: "card" };
var _hoisted_5 = { class: "card" };
var _hoisted_6 = { class: "card" };
var _hoisted_7 = { class: "card" };
var _hoisted_8 = { class: "card" };
var _hoisted_9 = { class: "card" };
var _hoisted_10 = { class: "chip-wrap" };
var _hoisted_11 = { class: "card" };
var _hoisted_12 = { class: "card" };
var _hoisted_13 = { class: "card" };
var _hoisted_14 = { class: "card" };
var _hoisted_15 = { class: "card" };
var _hoisted_16 = { class: "card" };
var _hoisted_17 = { class: "card" };
var _hoisted_18 = { class: "card" };
var _hoisted_19 = { class: "card" };
var _hoisted_20 = { class: "card" };
var _hoisted_21 = { class: "card" };
var _hoisted_22 = { class: "card" };
var _hoisted_23 = { class: "card" };
var _hoisted_24 = ["aria-expanded", "onClick"];
var _hoisted_25 = { class: "card" };
var _hoisted_26 = { class: "card" };
var _hoisted_27 = { class: "t-caption" };
var _hoisted_28 = { class: "card" };
var _hoisted_29 = { class: "card" };
var codeBlockSample = "import { toast } from '@konstantinopolskii/vue'\n<KModal v-model=\"open\" title=\"Publish\" />";
//#endregion
//#region sfc/pages/kit-snapshot.vue
var kit_snapshot_default = /* @__PURE__ */ defineComponent({
	__name: "kit-snapshot",
	setup(__props) {
		const modalOpen = ref(false);
		const listItemsPeer = [
			"Black dot marks each peer item.",
			"The gutter holds the marker.",
			"Hairlines rule the rows."
		];
		const listItemsOrdered = [
			"First the conflict is named.",
			"Then one side is chosen.",
			"Then rule and code move together."
		];
		const specRows = [
			{
				key: "Radius",
				values: ["24 px", "The dialog and shout-card case."]
			},
			{
				key: "Hairline",
				values: ["0.5 px", "Every border the kit draws."]
			},
			{
				key: "Grid",
				values: ["4 px", "Every space token is a multiple."]
			}
		];
		const dataTableColumns = [
			"Keyword",
			{
				label: "Rank",
				num: true
			},
			{
				label: "Δ",
				num: true
			}
		];
		const sparkValues = [
			40,
			55,
			48,
			62,
			70,
			88
		];
		const sparkLabels = [
			"6 wk ago",
			"Peak",
			"This wk"
		];
		const registryColumns = ["Component", "Role"];
		const acctTabs = [
			{ label: "Overview" },
			{ label: "Members" },
			{ label: "Billing" }
		];
		const signoffStats = [{
			value: "50",
			text: "components on this page."
		}, {
			value: "2.1.0",
			text: "the kit version it maps."
		}];
		const inspectorMessages = [{
			id: "m1",
			body: "Six new components land in 1.16.0: modal, dropdown, tabs, tooltip, toast, pagination."
		}, {
			id: "m2",
			role: "agent",
			body: "All manifesto-clean: shadows only on the inverted tooltip and toast."
		}];
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "doc" }, {
				default: withCtx(() => [
					createVNode(unref(KSidebar), { title: "Kit snapshot" }, {
						footer: withCtx(() => [..._cache[3] || (_cache[3] = [
							createTextVNode("UI kit 2.1.0", -1),
							createElementVNode("br", null, null, -1),
							createTextVNode("50 components, one page.", -1)
						])]),
						default: withCtx(() => [createVNode(unref(KSidebarNav))]),
						_: 1
					}),
					createVNode(unref(KBook), { id: "doc" }, {
						default: withCtx(() => [
							createVNode(unref(KBookSection), null, {
								default: withCtx(() => [..._cache[4] || (_cache[4] = [createElementVNode("div", { class: "card card--shout" }, [createElementVNode("h1", { class: "t-hero" }, "Every component"), createElementVNode("p", { class: "t-caption t-subtle" }, "The whole kit on one surface. Built from the Vue layer, styled by the kit, each component driving its own behavior.")], -1)])]),
								_: 1
							}),
							_cache[69] || (_cache[69] = createElementVNode("h2", { class: "book__part" }, "Prose", -1)),
							createVNode(unref(KBookSection), { id: "typography" }, {
								default: withCtx(() => [..._cache[5] || (_cache[5] = [createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Typography"), createElementVNode("p", { class: "t-caption t-muted" }, "One scale, one weight step. Ink carries signal; muted carries context.")], -1), createElementVNode("div", { class: "card" }, [
									createElementVNode("p", { class: "t-hero" }, "Hero 66"),
									createElementVNode("p", { class: "t-display" }, "Display 38"),
									createElementVNode("p", { class: "t-title" }, "Title 22"),
									createElementVNode("p", { class: "t-body" }, "Body 22 — the reading size for prose that runs more than a line."),
									createElementVNode("p", { class: "t-subtitle" }, "Subtitle 18"),
									createElementVNode("p", { class: "t-caption" }, "Caption 16 — dense supporting copy."),
									createElementVNode("p", { class: "t-micro t-muted" }, "Micro 14, muted — the smallest label the kit ships.")
								], -1)])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "lists" }, {
								default: withCtx(() => [_cache[6] || (_cache[6] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Lists"), createElementVNode("p", { class: "t-caption t-muted" }, "Hairlined, caption-sized. Bullet for peers, decimal for order.")], -1)), createElementVNode("div", _hoisted_1, [
									createVNode(unref(KList), { items: listItemsPeer }),
									createVNode(unref(KDivider)),
									createVNode(unref(KList), {
										ordered: "",
										items: listItemsOrdered
									})
								])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "code" }, {
								default: withCtx(() => [_cache[10] || (_cache[10] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Code"), createElementVNode("p", { class: "t-caption t-muted" }, "Monospace chip inline, block for a run of lines.")], -1)), createElementVNode("div", _hoisted_2, [createElementVNode("p", _hoisted_3, [
									_cache[8] || (_cache[8] = createTextVNode("Call ", -1)),
									createVNode(unref(KCode), null, {
										default: withCtx(() => [..._cache[7] || (_cache[7] = [createTextVNode("toast()", -1)])]),
										_: 1
									}),
									_cache[9] || (_cache[9] = createTextVNode(" after a draft saves.", -1))
								]), createVNode(unref(KCode), { block: "" }, {
									default: withCtx(() => [createTextVNode(toDisplayString(codeBlockSample))]),
									_: 1
								})])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "quote" }, {
								default: withCtx(() => [_cache[12] || (_cache[12] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Quote"), createElementVNode("p", { class: "t-caption t-muted" }, "One pulled line, attributed.")], -1)), createElementVNode("div", _hoisted_4, [createVNode(unref(KQuote), { cite: "Rachel Andrew" }, {
									default: withCtx(() => [..._cache[11] || (_cache[11] = [createTextVNode("Every change is bundled, documented, tagged, and released. Nothing half-shipped.", -1)])]),
									_: 1
								})])]),
								_: 1
							}),
							_cache[70] || (_cache[70] = createElementVNode("h2", { class: "book__part" }, "Controls", -1)),
							createVNode(unref(KBookSection), { id: "buttons" }, {
								default: withCtx(() => [_cache[16] || (_cache[16] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Buttons"), createElementVNode("p", { class: "t-caption t-muted" }, "Full-width affordance. Primary is ink; secondary is hairline.")], -1)), createElementVNode("div", _hoisted_5, [
									createVNode(unref(KButton), { primary: "" }, {
										default: withCtx(() => [..._cache[13] || (_cache[13] = [createTextVNode("Publish deliverable", -1)])]),
										_: 1
									}),
									createVNode(unref(KButton), null, {
										default: withCtx(() => [..._cache[14] || (_cache[14] = [createTextVNode("Save draft", -1)])]),
										_: 1
									}),
									createVNode(unref(KButton), { caption: "" }, {
										default: withCtx(() => [..._cache[15] || (_cache[15] = [createTextVNode("Caption button", -1)])]),
										_: 1
									})
								])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "chips" }, {
								default: withCtx(() => [_cache[21] || (_cache[21] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Chips"), createElementVNode("p", { class: "t-caption t-muted" }, "Pressable pills that select among peers. One pressed at a time.")], -1)), createElementVNode("div", _hoisted_6, [createVNode(unref(KChipWrap), null, {
									default: withCtx(() => [
										createVNode(unref(KChip), { pressed: "" }, {
											default: withCtx(() => [..._cache[17] || (_cache[17] = [createTextVNode("This week", -1)])]),
											_: 1
										}),
										createVNode(unref(KChip), null, {
											default: withCtx(() => [..._cache[18] || (_cache[18] = [createTextVNode("This month", -1)])]),
											_: 1
										}),
										createVNode(unref(KChip), null, {
											default: withCtx(() => [..._cache[19] || (_cache[19] = [createTextVNode("This quarter", -1)])]),
											_: 1
										}),
										createVNode(unref(KChip), null, {
											default: withCtx(() => [..._cache[20] || (_cache[20] = [createTextVNode("All time", -1)])]),
											_: 1
										})
									]),
									_: 1
								})])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "fields" }, {
								default: withCtx(() => [_cache[22] || (_cache[22] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Fields"), createElementVNode("p", { class: "t-caption t-muted" }, "Label and value share a row. No box, no fill at rest.")], -1)), createElementVNode("div", _hoisted_7, [
									createVNode(unref(KField), {
										label: "Workspace name",
										"model-value": "Client charter",
										placeholder: "Name this workspace"
									}),
									createVNode(unref(KField), {
										label: "Brief",
										textarea: "",
										placeholder: "What is this document for?"
									}),
									createVNode(unref(KFieldRow), {
										label: "Owner",
										value: "Konstantin K."
									})
								])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "switches" }, {
								default: withCtx(() => [_cache[23] || (_cache[23] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Switches"), createElementVNode("p", { class: "t-caption t-muted" }, "Binary toggle. The label names the setting, never the state.")], -1)), createElementVNode("div", _hoisted_8, [createVNode(unref(KSwitch), {
									label: "Lock after publish",
									"model-value": ""
								}), createVNode(unref(KSwitch), {
									label: "Notify the workspace",
									"model-value": false
								})])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "tags" }, {
								default: withCtx(() => [_cache[27] || (_cache[27] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Tags"), createElementVNode("p", { class: "t-caption t-muted" }, "Metadata pills. Never clickable.")], -1)), createElementVNode("div", _hoisted_9, [createElementVNode("div", _hoisted_10, [
									createVNode(unref(KTag), null, {
										default: withCtx(() => [..._cache[24] || (_cache[24] = [createTextVNode("Draft", -1)])]),
										_: 1
									}),
									createVNode(unref(KTag), null, {
										default: withCtx(() => [..._cache[25] || (_cache[25] = [createTextVNode("Strategy", -1)])]),
										_: 1
									}),
									createVNode(unref(KTag), { bold: "" }, {
										default: withCtx(() => [..._cache[26] || (_cache[26] = [createTextVNode("Signed", -1)])]),
										_: 1
									})
								])])]),
								_: 1
							}),
							_cache[71] || (_cache[71] = createElementVNode("h2", { class: "book__part" }, "Content", -1)),
							createVNode(unref(KBookSection), { id: "cards" }, {
								default: withCtx(() => [
									_cache[31] || (_cache[31] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Cards"), createElementVNode("p", { class: "t-caption t-muted" }, "Every widget is one. Five variants share one shape.")], -1)),
									createVNode(unref(KCard), { variant: "static" }, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Static card",
											subtitle: "Transparent at rest"
										}), createVNode(unref(KCardBody), null, {
											default: withCtx(() => [..._cache[28] || (_cache[28] = [createElementVNode("p", { class: "t-caption" }, "The default container. It holds content and never lights up.", -1)])]),
											_: 1
										})]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "interactive",
										state: "active"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Interactive card",
											subtitle: "Sticky active state"
										}), createVNode(unref(KCardCollapsible), null, {
											default: withCtx(() => [..._cache[29] || (_cache[29] = [createElementVNode("p", { class: "t-caption" }, "The collapsible body reveals under the heading when the card is active.", -1)])]),
											_: 1
										})]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "#cards"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Link card",
											subtitle: "The whole surface navigates"
										})]),
										_: 1
									}),
									createVNode(unref(KCard), { variant: "shout" }, {
										default: withCtx(() => [..._cache[30] || (_cache[30] = [createElementVNode("h3", { class: "t-title" }, "Shout card", -1), createElementVNode("p", { class: "t-caption t-subtle" }, "Inverted surface. One per column, for the single loudest thing.", -1)])]),
										_: 1
									})
								]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "spec-list" }, {
								default: withCtx(() => [_cache[32] || (_cache[32] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Spec list"), createElementVNode("p", { class: "t-caption t-muted" }, "Key and value rows inside a card. Plain, value, or triple.")], -1)), createElementVNode("div", _hoisted_11, [createVNode(unref(KSpecList), {
									variant: "value",
									rows: specRows
								})])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "media" }, {
								default: withCtx(() => [_cache[33] || (_cache[33] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Media rows"), createElementVNode("p", { class: "t-caption t-muted" }, "Leading figure, two-line body, trailing meta.")], -1)), createElementVNode("div", _hoisted_12, [
									createVNode(unref(KMedia), {
										title: "Konstantin K.",
										meta: "Signed the charter 2 hours ago",
										initials: "KK",
										"trail-tag": "Owner"
									}),
									createVNode(unref(KDivider)),
									createVNode(unref(KMedia), {
										title: "Forecast module",
										meta: "Updated by the pipeline",
										square: "",
										micro: ""
									})
								])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "figure" }, {
								default: withCtx(() => [_cache[35] || (_cache[35] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Figure"), createElementVNode("p", { class: "t-caption t-muted" }, "Framed block with a caption.")], -1)), createElementVNode("div", _hoisted_13, [createVNode(unref(KFigure), { caption: "A framed figure sits on the same rail as prose." }, {
									default: withCtx(() => [..._cache[34] || (_cache[34] = [createElementVNode("div", { class: "card card--shout" }, [createElementVNode("p", { class: "t-title" }, "Framed")], -1)])]),
									_: 1
								})])]),
								_: 1
							}),
							_cache[72] || (_cache[72] = createElementVNode("h2", { class: "book__part" }, "Data", -1)),
							createVNode(unref(KBookSection), { id: "metric" }, {
								default: withCtx(() => [
									_cache[36] || (_cache[36] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Metric and stat"), createElementVNode("p", { class: "t-caption t-muted" }, "Number first. The delta glyph carries direction, never a color.")], -1)),
									createVNode(unref(KCardStack), { columns: "" }, {
										default: withCtx(() => [
											createElementVNode("div", _hoisted_14, [createVNode(unref(KMetric), {
												value: "$48.2k",
												label: "Signed this quarter",
												delta: "↑ 12%"
											})]),
											createElementVNode("div", _hoisted_15, [createVNode(unref(KMetric), {
												value: "19",
												label: "Live deliverables",
												delta: "↓ 2"
											})]),
											createElementVNode("div", _hoisted_16, [createVNode(unref(KMetric), {
												value: "4.0s",
												label: "Median render",
												delta: "↑ 0.3s"
											})])
										]),
										_: 1
									}),
									createElementVNode("div", _hoisted_17, [createVNode(unref(KStat), {
										value: "50",
										text: "components catalogued."
									}), createVNode(unref(KStat), {
										value: "7",
										text: "foundations rule the rest."
									})])
								]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "data-table" }, {
								default: withCtx(() => [_cache[46] || (_cache[46] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Data table"), createElementVNode("p", { class: "t-caption t-muted" }, "Dense rows, right-aligned tabular numbers, deltas in text.")], -1)), createElementVNode("div", _hoisted_18, [createVNode(unref(KDataTable), { columns: dataTableColumns }, {
									default: withCtx(() => [
										createElementVNode("tr", null, [
											createVNode(unref(KDataCell), { lead: "" }, {
												default: withCtx(() => [..._cache[37] || (_cache[37] = [createTextVNode("strategy consulting", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[38] || (_cache[38] = [createTextVNode("3", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { delta: "" }, {
												default: withCtx(() => [..._cache[39] || (_cache[39] = [createTextVNode("↑ 2", -1)])]),
												_: 1
											})
										]),
										createElementVNode("tr", null, [
											createVNode(unref(KDataCell), { lead: "" }, {
												default: withCtx(() => [..._cache[40] || (_cache[40] = [createTextVNode("charter template", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[41] || (_cache[41] = [createTextVNode("7", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), {
												delta: "",
												flat: ""
											}, {
												default: withCtx(() => [..._cache[42] || (_cache[42] = [createTextVNode("0", -1)])]),
												_: 1
											})
										]),
										createElementVNode("tr", null, [
											createVNode(unref(KDataCell), { lead: "" }, {
												default: withCtx(() => [..._cache[43] || (_cache[43] = [createTextVNode("deliverable review", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [..._cache[44] || (_cache[44] = [createTextVNode("12", -1)])]),
												_: 1
											}),
											createVNode(unref(KDataCell), { delta: "" }, {
												default: withCtx(() => [..._cache[45] || (_cache[45] = [createTextVNode("↓ 4", -1)])]),
												_: 1
											})
										])
									]),
									_: 1
								})])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "spark" }, {
								default: withCtx(() => [_cache[47] || (_cache[47] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Spark"), createElementVNode("p", { class: "t-caption t-muted" }, "Monochrome trend marks. History demotes; the current period keeps full ink.")], -1)), createElementVNode("div", _hoisted_19, [createVNode(unref(KSpark), {
									panel: "",
									emphasize: 5,
									label: "Six weeks of signed value, trending up",
									values: sparkValues
								}), createVNode(unref(KSparkLabels), { labels: sparkLabels })])]),
								_: 1
							}),
							_cache[73] || (_cache[73] = createElementVNode("h2", { class: "book__part" }, "Kit-doc", -1)),
							createVNode(unref(KBookSection), { id: "preview-frame" }, {
								default: withCtx(() => [_cache[48] || (_cache[48] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Preview frame"), createElementVNode("p", { class: "t-caption t-muted" }, "Scaled iframe for doc surfaces. Renders at 400%, scales to 0.25.")], -1)), createElementVNode("div", _hoisted_20, [createVNode(unref(KPreviewFrame), {
									src: "../reference-recreations/13-blogpost.html",
									title: "Blog post preview"
								})])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "registry-table" }, {
								default: withCtx(() => [_cache[50] || (_cache[50] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Registry table"), createElementVNode("p", { class: "t-caption t-muted" }, "Dense two-column inventory for kit docs only.")], -1)), createElementVNode("div", _hoisted_21, [createVNode(unref(KRegistryTable), { columns: registryColumns }, {
									default: withCtx(() => [..._cache[49] || (_cache[49] = [
										createElementVNode("tr", null, [createElementVNode("td", { class: "t-body" }, "modal"), createElementVNode("td", { class: "t-body" }, "One decision over a scrim.")], -1),
										createElementVNode("tr", null, [createElementVNode("td", { class: "t-body" }, "dropdown"), createElementVNode("td", { class: "t-body" }, "Menu button and popover.")], -1),
										createElementVNode("tr", null, [createElementVNode("td", { class: "t-body" }, "toast"), createElementVNode("td", { class: "t-body" }, "Transient confirmation.")], -1)
									])]),
									_: 1
								})])]),
								_: 1
							}),
							_cache[74] || (_cache[74] = createElementVNode("h2", { class: "book__part" }, "Interactive", -1)),
							createVNode(unref(KBookSection), { id: "modal" }, {
								default: withCtx(() => [
									_cache[53] || (_cache[53] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Modal"), createElementVNode("p", { class: "t-caption t-muted" }, "One decision held over a scrim. White dialog, no shadow. Opens with a trigger, closes on ×, scrim, or Escape.")], -1)),
									createElementVNode("div", _hoisted_22, [createElementVNode("button", {
										class: "button button--primary t-subtitle",
										type: "button",
										onClick: _cache[0] || (_cache[0] = ($event) => modalOpen.value = true)
									}, "Publish deliverable")]),
									createVNode(unref(KModal), {
										id: "snapshot-modal",
										title: "Publish deliverable",
										subtitle: "This shares the signed charter with the client workspace.",
										modelValue: modalOpen.value,
										"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => modalOpen.value = $event)
									}, {
										foot: withCtx(() => [..._cache[51] || (_cache[51] = [createElementVNode("button", {
											class: "button t-subtitle",
											type: "button",
											"data-modal-close": ""
										}, "Cancel", -1), createElementVNode("button", {
											class: "button button--primary t-subtitle",
											type: "button",
											"data-modal-close": ""
										}, "Publish", -1)])]),
										default: withCtx(() => [_cache[52] || (_cache[52] = createTextVNode("The document locks after publish. Reopen it from the workspace to draft a revision.", -1))]),
										_: 1
									}, 8, ["modelValue"])
								]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "dropdown" }, {
								default: withCtx(() => [_cache[57] || (_cache[57] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Dropdown"), createElementVNode("p", { class: "t-caption t-muted" }, "Menu button and popover. Picks one action. Escape and outside-click close it.")], -1)), createElementVNode("div", _hoisted_23, [createVNode(unref(KDropdown), { label: "Export" }, {
									trigger: withCtx(({ open, toggle }) => [createElementVNode("button", {
										class: "dropdown__trigger button t-subtitle",
										type: "button",
										"aria-haspopup": "menu",
										"aria-expanded": open ? "true" : "false",
										onClick: toggle
									}, "Export", 8, _hoisted_24)]),
									default: withCtx(() => [
										_cache[54] || (_cache[54] = createElementVNode("button", {
											class: "dropdown__item",
											role: "menuitem",
											type: "button"
										}, "Download PDF", -1)),
										_cache[55] || (_cache[55] = createElementVNode("button", {
											class: "dropdown__item",
											role: "menuitem",
											type: "button"
										}, "Copy share link", -1)),
										_cache[56] || (_cache[56] = createElementVNode("button", {
											class: "dropdown__item",
											role: "menuitem",
											type: "button"
										}, "Send to inspector", -1))
									]),
									_: 1
								})])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "tabs" }, {
								default: withCtx(() => [_cache[61] || (_cache[61] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Tabs"), createElementVNode("p", { class: "t-caption t-muted" }, "One surface, peer views under a shared strip. Arrow keys move and select.")], -1)), createElementVNode("div", _hoisted_25, [createVNode(unref(KTabs), {
									id: "acct",
									tabs: acctTabs
								}, {
									"panel-0": withCtx(() => [..._cache[58] || (_cache[58] = [createElementVNode("p", { class: "t-caption" }, "Nine seats in use across two workspaces.", -1)])]),
									"panel-1": withCtx(() => [..._cache[59] || (_cache[59] = [createElementVNode("p", { class: "t-caption" }, "Invite a teammate by email to add them to this workspace.", -1)])]),
									"panel-2": withCtx(() => [..._cache[60] || (_cache[60] = [createElementVNode("p", { class: "t-caption" }, "Next invoice posts on 1 August for $240.", -1)])]),
									_: 1
								})])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "tooltip" }, {
								default: withCtx(() => [_cache[64] || (_cache[64] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Tooltip"), createElementVNode("p", { class: "t-caption t-muted" }, "One line of hint on hover or keyboard focus. Inverted bubble, never load-bearing.")], -1)), createElementVNode("div", _hoisted_26, [createElementVNode("p", _hoisted_27, [
									_cache[62] || (_cache[62] = createTextVNode("Net revenue ", -1)),
									createVNode(unref(KTooltip), { text: "Gross minus refunds and platform fees." }),
									_cache[63] || (_cache[63] = createTextVNode(" is the figure the charter reports.", -1))
								])])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "toast" }, {
								default: withCtx(() => [_cache[66] || (_cache[66] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Toast"), createElementVNode("p", { class: "t-caption t-muted" }, "Transient confirmation. Inverted, bottom-center, self-clearing after four seconds.")], -1)), createElementVNode("div", _hoisted_28, [
									createElementVNode("button", {
										class: "button t-subtitle",
										type: "button",
										onClick: _cache[2] || (_cache[2] = ($event) => unref(toast)("Draft saved", { action: "Undo" }))
									}, "Save draft"),
									_cache[65] || (_cache[65] = createElementVNode("p", { class: "t-micro t-muted" }, "Static specimen:", -1)),
									createElementVNode("div", null, [createVNode(unref(KToast), {
										text: "Draft saved",
										action: "Undo"
									})])
								])]),
								_: 1
							}),
							createVNode(unref(KBookSection), { id: "pagination" }, {
								default: withCtx(() => [_cache[67] || (_cache[67] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Pagination"), createElementVNode("p", { class: "t-caption t-muted" }, "Page numerals with CSS-drawn prev and next chevrons. One ink current page.")], -1)), createElementVNode("div", _hoisted_29, [createVNode(unref(KPagination), {
									pages: 12,
									current: 4,
									window: 5
								})])]),
								_: 1
							}),
							_cache[75] || (_cache[75] = createElementVNode("h2", { class: "book__part" }, "Page archetypes", -1)),
							createVNode(unref(KBookSection), { id: "archetypes" }, {
								default: withCtx(() => [_cache[68] || (_cache[68] = createElementVNode("div", { class: "card" }, [createElementVNode("h3", { class: "t-title" }, "Whole-page shells"), createElementVNode("p", { class: "t-caption t-muted" }, "Front, panels, and single are 100vh archetypes. They own the page, so they live in their own demos rather than a doc column.")], -1)), createVNode(unref(KCardStack), { columns: "" }, {
									default: withCtx(() => [
										createVNode(unref(KCard), {
											variant: "link",
											href: "../reference-recreations/14-newsfront.html"
										}, {
											default: withCtx(() => [createVNode(unref(KCardHeading), {
												title: "Front",
												subtitle: "Masthead, rail, desks"
											})]),
											_: 1
										}),
										createVNode(unref(KCard), {
											variant: "link",
											href: "../reference-recreations/12-studio-index.html"
										}, {
											default: withCtx(() => [createVNode(unref(KCardHeading), {
												title: "Panels",
												subtitle: "Spanning grid of cards"
											})]),
											_: 1
										}),
										createVNode(unref(KCard), {
											variant: "link",
											href: "../reference-recreations/07-flashcard.html"
										}, {
											default: withCtx(() => [createVNode(unref(KCardHeading), {
												title: "Single",
												subtitle: "One centered column"
											})]),
											_: 1
										})
									]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(unref(KBookSection), null, {
								default: withCtx(() => [createVNode(unref(KSignoff), {
									stats: signoffStats,
									author: "Konstantin Konstantinopolskii",
									role: "founder",
									org: "kk.consulting",
									stamp: "2026-07-20, snapshot session.",
									"signature-src": "../../signature.svg"
								})]),
								_: 1
							})
						]),
						_: 1
					}),
					createVNode(unref(KInspector), null, {
						default: withCtx(() => [createVNode(unref(KInspectorGroup), null, {
							default: withCtx(() => [
								createVNode(unref(KCard), { variant: "heading" }, {
									default: withCtx(() => [..._cache[76] || (_cache[76] = [createElementVNode("h3", { class: "t-title" }, "Inspector", -1)])]),
									_: 1
								}),
								createVNode(unref(KCommentThread), {
									title: "On the interactive set",
									state: "active",
									messages: inspectorMessages
								}),
								createVNode(unref(KCommentNew), {
									title: "Add a comment",
									placeholder: "Type a comment"
								})
							]),
							_: 1
						})]),
						_: 1
					})
				]),
				_: 1
			});
		};
	}
});
//#endregion
export { kit_snapshot_default as default };
