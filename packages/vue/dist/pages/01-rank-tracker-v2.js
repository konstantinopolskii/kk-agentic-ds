import { Fragment, createCommentVNode, createElementBlock, createElementVNode, createStaticVNode, createTextVNode, createVNode, defineComponent, normalizeClass, openBlock, renderList, toDisplayString, unref, withCtx } from "vue";
import { KCard, KChip, KChipWrap, KFieldRow, KMetric, KSpark, KSparkLabels } from "@konstantinopolskii/vue";
//#region sfc/pages/01-rank-tracker-v2.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	class: "app app--board",
	"data-view": "board"
};
var _hoisted_2 = { class: "board__bar" };
var _hoisted_3 = { class: "board__controls" };
var _hoisted_4 = {
	class: "rail rail--groups",
	"aria-label": "Keyword groups"
};
var _hoisted_5 = ["data-state"];
var _hoisted_6 = { class: "group-card__title t-caption t-caption--bold" };
var _hoisted_7 = { class: "cols-groups" };
var _hoisted_8 = { class: "stat__v" };
var _hoisted_9 = {
	class: "rail",
	"aria-label": "Keyword list"
};
var _hoisted_10 = { class: "kw__title" };
var _hoisted_11 = { class: "t-caption t-caption--bold" };
var _hoisted_12 = { class: "cols-kw" };
var _hoisted_13 = { class: "stat" };
var _hoisted_14 = { class: "stat__v" };
var _hoisted_15 = { class: "stat-pair" };
var _hoisted_16 = { class: "stat" };
var _hoisted_17 = { class: "stat__v" };
var _hoisted_18 = { class: "stat__d" };
var _hoisted_19 = { class: "stat-pair" };
var _hoisted_20 = { class: "stat__v" };
var _hoisted_21 = { class: "stat" };
var _hoisted_22 = { class: "stat__v" };
var _hoisted_23 = { class: "stat__d stat__d--label" };
var _hoisted_24 = {
	class: "rail rail--detail",
	"aria-label": "Group detail"
};
var _hoisted_25 = { class: "metric-row" };
var _hoisted_26 = { class: "card__toprow" };
var _hoisted_27 = { class: "rail-duo" };
var _hoisted_28 = { class: "metric-row" };
//#endregion
//#region sfc/pages/01-rank-tracker-v2.vue
var _01_rank_tracker_v2_default = /* @__PURE__ */ defineComponent({
	__name: "01-rank-tracker-v2",
	setup(__props) {
		const groups = [
			{
				active: true,
				title: "All keywords",
				note: "Cannibalization · Missing pages · Low relevance",
				noteBold: true,
				stats: [
					{ value: "269" },
					{ value: "56%" },
					{
						value: "146.2K",
						delta: "↓ 19%"
					},
					{
						value: "0.7%",
						delta: "↑ 1%"
					},
					{ value: "8.4K" }
				]
			},
			{
				active: false,
				title: "Brand",
				note: "Brand keywords",
				noteBold: false,
				stats: [
					{ value: "2" },
					{ value: "2.1%" },
					{
						value: "6.6K",
						delta: "↓ 19%"
					},
					{
						value: "100%",
						delta: "–",
						flat: true
					},
					{ value: "23K" }
				]
			},
			{
				active: false,
				title: "First page",
				note: "Low relevance",
				noteBold: true,
				stats: [
					{ value: "4" },
					{ value: "45%" },
					{
						value: "260",
						delta: "↓ 19%"
					},
					{
						value: "35%",
						delta: "↑ 2%"
					},
					{ value: "23K" }
				]
			},
			{
				active: false,
				title: "Second page",
				note: "Test · Second launch",
				noteBold: false,
				stats: [
					{ value: "8" },
					{ value: "71%" },
					{
						value: "4.2K",
						delta: "↓ 19%"
					},
					{
						value: "19%",
						delta: "↑ 1.7%"
					},
					{ value: "23K" }
				]
			},
			{
				active: false,
				title: "Main keywords",
				note: "Cannibalization",
				noteBold: true,
				stats: [
					{ value: "87" },
					{ value: "55%" },
					{
						value: "54.4K",
						delta: "–",
						flat: true
					},
					{
						value: "1.9%",
						delta: "–",
						flat: true
					},
					{ value: "23K" }
				]
			},
			{
				active: false,
				title: "Working set",
				note: "Ideas to test",
				noteBold: false,
				stats: [
					{ value: "14" },
					{ value: "12%" },
					{
						value: "9.8K",
						delta: "↑ 6%"
					},
					{
						value: "0.2%",
						delta: "–",
						flat: true
					},
					{ value: "1.1K" }
				]
			}
		];
		const kws = [
			{
				title: "design system audit",
				tags: [
					"Kit",
					"Second launch",
					"+23"
				],
				serp: "100%",
				vol: "720",
				volDelta: "↑ 83%",
				sparkLabel: "Search volume, steady",
				sparkValues: [
					52,
					58,
					55,
					60,
					57,
					63,
					61,
					66
				],
				rank: "~13",
				pill: "↑ 6",
				pillQuiet: false,
				kd: "150",
				kdLabel: "Easy"
			},
			{
				title: "budget app for couples",
				tags: ["Seasonal"],
				serp: "44%",
				vol: "1.6K",
				volDelta: "↑ 26%",
				sparkLabel: "Search volume, steady",
				sparkValues: [
					48,
					52,
					50,
					55,
					53,
					58,
					60,
					64
				],
				rank: "~16",
				pill: "↑ 5",
				pillQuiet: false,
				kd: "219",
				kdLabel: "Easy"
			},
			{
				title: "agentic pipeline",
				tags: ["Test"],
				serp: "70%",
				vol: "18.1K",
				volDelta: "↓ 45%",
				sparkLabel: "Search volume, falling",
				sparkValues: [
					70,
					66,
					60,
					55,
					48,
					42,
					38,
					33
				],
				rank: "~99",
				pill: "–",
				pillQuiet: true,
				kd: "1.6K",
				kdLabel: "Hard"
			},
			{
				title: "token based design system",
				tags: ["Seasonal", "Test"],
				serp: "70%",
				vol: "2.9K",
				volDelta: "↓ 19%",
				sparkLabel: "Search volume, falling",
				sparkValues: [
					60,
					57,
					54,
					50,
					47,
					45,
					43,
					40
				],
				rank: "~99",
				pill: "–",
				pillQuiet: true,
				kd: "433",
				kdLabel: "Doable"
			},
			{
				title: "ui kit for startups",
				tags: [],
				serp: "100%",
				vol: "1.9K",
				volDelta: "↑ 81%",
				sparkLabel: "Search volume, seasonal",
				sparkValues: [
					30,
					55,
					38,
					62,
					42,
					70,
					48,
					78
				],
				rank: "~99",
				pill: "–",
				pillQuiet: true,
				kd: "393",
				kdLabel: "Hard"
			},
			{
				title: "voice and tone guidelines",
				tags: ["Test"],
				serp: "70%",
				vol: "1.9K",
				volDelta: "↑ 82%",
				sparkLabel: "Search volume, rising",
				sparkValues: [
					35,
					40,
					46,
					51,
					57,
					62,
					68,
					74
				],
				rank: "~32",
				pill: "↓ 4",
				pillQuiet: false,
				kd: "256",
				kdLabel: "Hard"
			},
			{
				title: "figma to code handoff",
				tags: ["Second launch"],
				serp: "55%",
				vol: "3.4K",
				volDelta: "↑ 12%",
				sparkLabel: "Search volume, steady",
				sparkValues: [
					50,
					53,
					51,
					55,
					53,
					57,
					55,
					59
				],
				rank: "~21",
				pill: "↑ 2",
				pillQuiet: false,
				kd: "512",
				kdLabel: "Doable"
			},
			{
				title: "design consultancy pricing",
				tags: ["Ideas"],
				serp: "62%",
				vol: "940",
				volDelta: "↓ 8%",
				sparkLabel: "Search volume, falling",
				sparkValues: [
					58,
					55,
					53,
					50,
					48,
					46,
					44,
					42
				],
				rank: "~34",
				pill: "↓ 3",
				pillQuiet: false,
				kd: "188",
				kdLabel: "Easy"
			},
			{
				title: "product strategy sprint",
				tags: ["Test"],
				serp: "81%",
				vol: "2.2K",
				volDelta: "↑ 9%",
				sparkLabel: "Search volume, steady",
				sparkValues: [
					52,
					54,
					53,
					56,
					54,
					57,
					56,
					58
				],
				rank: "~44",
				pill: "–",
				pillQuiet: true,
				kd: "305",
				kdLabel: "Doable"
			},
			{
				title: "hire a design consultant",
				tags: [],
				serp: "48%",
				vol: "4.1K",
				volDelta: "↓ 6%",
				sparkLabel: "Search volume, steady",
				sparkValues: [
					55,
					54,
					52,
					53,
					51,
					52,
					50,
					49
				],
				rank: "~7",
				pill: "↓ 1",
				pillQuiet: false,
				kd: "96",
				kdLabel: "Easy"
			}
		];
		const demandSpark = [
			44,
			40,
			48,
			45,
			52,
			49,
			56,
			53,
			60,
			58,
			66,
			74
		];
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createElementVNode("header", _hoisted_2, [_cache[6] || (_cache[6] = createStaticVNode("<div class=\"board__brand\"><span class=\"board__logo\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"3 17 9 11 13 14.5 21 6\"></polyline></svg></span><div><p class=\"t-micro t-muted\">kk.consulting · EN</p><p class=\"t-title\">Rank tracker</p></div></div>", 1)), createElementVNode("div", _hoisted_3, [
					createVNode(unref(KChipWrap), null, {
						default: withCtx(() => [
							createVNode(unref(KChip), { pressed: "" }, {
								default: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode("Strategy", -1)])]),
								_: 1
							}),
							createVNode(unref(KChip), { pressed: false }, {
								default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("Analysis", -1)])]),
								_: 1
							}),
							createVNode(unref(KChip), { pressed: false }, {
								default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("Competition", -1)])]),
								_: 1
							})
						]),
						_: 1
					}),
					createVNode(unref(KChipWrap), null, {
						default: withCtx(() => [createVNode(unref(KChip), { pressed: false }, {
							default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("Mobile", -1)])]),
							_: 1
						}), createVNode(unref(KChip), { pressed: "" }, {
							default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("Desktop", -1)])]),
							_: 1
						})]),
						_: 1
					}),
					_cache[5] || (_cache[5] = createElementVNode("p", { class: "t-caption" }, "Jun 8 – Jul 8, 2026", -1))
				])]),
				createElementVNode("aside", _hoisted_4, [
					_cache[7] || (_cache[7] = createElementVNode("div", { class: "rail__head" }, [createElementVNode("h2", { class: "t-subtitle" }, "Groups"), createElementVNode("p", { class: "t-micro t-muted" }, "6 tracked")], -1)),
					_cache[8] || (_cache[8] = createElementVNode("div", {
						class: "legend cols-groups",
						"aria-hidden": "true"
					}, [
						createElementVNode("span", null, "Kw."),
						createElementVNode("span", null, "Clicks"),
						createElementVNode("span", null, "Volume"),
						createElementVNode("span", null, "Visib."),
						createElementVNode("span", null, "Traffic")
					], -1)),
					(openBlock(), createElementBlock(Fragment, null, renderList(groups, (g, gi) => {
						return createElementVNode("div", {
							key: gi,
							class: "group-card",
							"data-state": g.active ? "active" : void 0
						}, [
							createElementVNode("p", _hoisted_6, toDisplayString(g.title), 1),
							createElementVNode("p", { class: normalizeClass(g.noteBold ? "group-card__note t-micro t-caption--bold" : "group-card__note t-micro t-muted") }, toDisplayString(g.note), 3),
							createElementVNode("div", _hoisted_7, [(openBlock(true), createElementBlock(Fragment, null, renderList(g.stats, (s, si) => {
								return openBlock(), createElementBlock("span", {
									key: si,
									class: "stat"
								}, [createElementVNode("span", _hoisted_8, toDisplayString(s.value), 1), s.delta !== void 0 ? (openBlock(), createElementBlock("span", {
									key: 0,
									class: normalizeClass(s.flat ? "stat__d stat__d--flat" : "stat__d")
								}, toDisplayString(s.delta), 3)) : createCommentVNode("", true)]);
							}), 128))])
						], 8, _hoisted_5);
					}), 64))
				]),
				createElementVNode("main", _hoisted_9, [
					_cache[9] || (_cache[9] = createElementVNode("div", { class: "rail__head" }, [createElementVNode("h1", { class: "t-subtitle" }, "All keywords"), createElementVNode("p", { class: "t-micro t-muted" }, "432 tracked · sorted by rank trend")], -1)),
					_cache[10] || (_cache[10] = createElementVNode("div", {
						class: "legend cols-kw",
						"aria-hidden": "true"
					}, [
						createElementVNode("span", null, "SERP"),
						createElementVNode("span", null, "Volume"),
						createElementVNode("span", null, "Rank"),
						createElementVNode("span", null, "Opportunity")
					], -1)),
					(openBlock(), createElementBlock(Fragment, null, renderList(kws, (k, ki) => {
						return createElementVNode("div", {
							key: ki,
							class: "kw"
						}, [createElementVNode("p", _hoisted_10, [createElementVNode("span", _hoisted_11, toDisplayString(k.title), 1), (openBlock(true), createElementBlock(Fragment, null, renderList(k.tags, (t, ti) => {
							return openBlock(), createElementBlock("span", {
								key: ti,
								class: "tag t-micro"
							}, toDisplayString(t), 1);
						}), 128))]), createElementVNode("div", _hoisted_12, [
							createElementVNode("span", _hoisted_13, [createElementVNode("span", _hoisted_14, toDisplayString(k.serp), 1)]),
							createElementVNode("span", _hoisted_15, [createElementVNode("span", _hoisted_16, [createElementVNode("span", _hoisted_17, toDisplayString(k.vol), 1), createElementVNode("span", _hoisted_18, toDisplayString(k.volDelta), 1)]), createVNode(unref(KSpark), {
								values: k.sparkValues,
								label: k.sparkLabel
							}, null, 8, ["values", "label"])]),
							createElementVNode("span", _hoisted_19, [createElementVNode("span", _hoisted_20, toDisplayString(k.rank), 1), createElementVNode("span", { class: normalizeClass(k.pillQuiet ? "pill pill--quiet" : "pill") }, toDisplayString(k.pill), 3)]),
							createElementVNode("span", _hoisted_21, [createElementVNode("span", _hoisted_22, toDisplayString(k.kd), 1), createElementVNode("span", _hoisted_23, toDisplayString(k.kdLabel), 1)])
						])]);
					}), 64))
				]),
				createElementVNode("aside", _hoisted_24, [
					_cache[21] || (_cache[21] = createElementVNode("div", { class: "rail__head" }, [createElementVNode("h2", { class: "t-subtitle" }, "All keywords"), createElementVNode("p", { class: "t-micro t-caption--bold" }, "3 critical issues")], -1)),
					createVNode(unref(KCard), { tight: true }, {
						default: withCtx(() => [
							_cache[11] || (_cache[11] = createElementVNode("div", { class: "card__toprow" }, [createElementVNode("h3", { class: "t-caption t-caption--bold" }, "Visibility"), createElementVNode("p", { class: "t-micro t-muted" }, "30 days")], -1)),
							createElementVNode("div", _hoisted_25, [createVNode(unref(KMetric), {
								value: "0.7%",
								label: "Desktop",
								delta: "↑ 1%"
							}), createVNode(unref(KMetric), {
								value: "0.5%",
								label: "Mobile",
								delta: "↓ 0.7%"
							})]),
							_cache[12] || (_cache[12] = createElementVNode("div", { class: "chart" }, [createElementVNode("div", {
								class: "chart__y",
								"aria-hidden": "true"
							}, [
								createElementVNode("span", null, "3%"),
								createElementVNode("span", null, "2%"),
								createElementVNode("span", null, "1%"),
								createElementVNode("span", null, "0%")
							]), createElementVNode("div", {
								class: "chart__plot",
								role: "img",
								"aria-label": "Visibility, 30 days: desktop climbs to 0.7 percent, mobile eases to 0.5"
							}, [createElementVNode("svg", {
								viewBox: "0 0 320 132",
								preserveAspectRatio: "none",
								fill: "none"
							}, [
								createElementVNode("line", {
									x1: "0",
									y1: "0.5",
									x2: "320",
									y2: "0.5",
									stroke: "rgba(0,0,0,0.1)",
									"vector-effect": "non-scaling-stroke"
								}),
								createElementVNode("line", {
									x1: "0",
									y1: "44",
									x2: "320",
									y2: "44",
									stroke: "rgba(0,0,0,0.1)",
									"vector-effect": "non-scaling-stroke"
								}),
								createElementVNode("line", {
									x1: "0",
									y1: "88",
									x2: "320",
									y2: "88",
									stroke: "rgba(0,0,0,0.1)",
									"vector-effect": "non-scaling-stroke"
								}),
								createElementVNode("line", {
									x1: "0",
									y1: "131.5",
									x2: "320",
									y2: "131.5",
									stroke: "rgba(0,0,0,0.2)",
									"vector-effect": "non-scaling-stroke"
								}),
								createElementVNode("polyline", {
									points: "0,110 20,96 40,90 60,102 80,108 100,104 120,98 140,100 160,94 180,98 200,92 220,96 240,90 260,94 280,92 300,88 320,90",
									stroke: "currentColor",
									"stroke-width": "1.5",
									"vector-effect": "non-scaling-stroke",
									style: { "color": "#000" }
								}),
								createElementVNode("polyline", {
									points: "0,114 20,112 40,104 60,110 80,116 100,112 120,108 140,112 160,106 180,110 200,108 220,112 240,106 260,110 280,108 300,112 320,110",
									stroke: "rgba(0,0,0,0.2)",
									"stroke-width": "1.5",
									"vector-effect": "non-scaling-stroke"
								})
							])])], -1)),
							createVNode(unref(KSparkLabels), { labels: [
								"Jun 8",
								"Jun 15",
								"Jun 22",
								"Jun 29",
								"Jul 8"
							] }),
							_cache[13] || (_cache[13] = createElementVNode("label", { class: "field" }, [createElementVNode("span", { class: "t-caption--bold field__label" }, "Annotate"), createElementVNode("input", {
								class: "field__input t-caption",
								type: "text",
								placeholder: "Note what moved this range"
							})], -1))
						]),
						_: 1
					}),
					createVNode(unref(KCard), { tight: true }, {
						default: withCtx(() => [
							_cache[14] || (_cache[14] = createElementVNode("div", { class: "card__toprow" }, [createElementVNode("h3", { class: "t-caption t-caption--bold" }, "Search demand"), createElementVNode("p", { class: "t-micro t-muted" }, "Monthly")], -1)),
							createElementVNode("div", _hoisted_26, [createVNode(unref(KMetric), {
								value: "146.2K",
								label: "Searches a month",
								delta: "↑ 7% YoY"
							}), createVNode(unref(KSpark), {
								style: {
									"width": "128px",
									"height": "40px"
								},
								values: demandSpark,
								label: "Search demand, 12 months, rising"
							})]),
							createVNode(unref(KFieldRow), {
								label: "Desktop",
								value: "36% · 52.6K"
							}),
							createVNode(unref(KFieldRow), {
								label: "Mobile",
								value: "64% · 93.8K"
							})
						]),
						_: 1
					}),
					createElementVNode("div", _hoisted_27, [createVNode(unref(KCard), { tight: true }, {
						default: withCtx(() => [_cache[15] || (_cache[15] = createElementVNode("h3", { class: "t-caption t-caption--bold" }, "SERP", -1)), createVNode(unref(KMetric), {
							value: "51%",
							label: "Organic clicks"
						})]),
						_: 1
					}), createVNode(unref(KCard), { tight: true }, {
						default: withCtx(() => [
							_cache[16] || (_cache[16] = createElementVNode("h3", { class: "t-caption t-caption--bold" }, "Opportunity", -1)),
							createVNode(unref(KMetric), {
								value: "233K",
								label: "Sessions to gain"
							}),
							_cache[17] || (_cache[17] = createElementVNode("div", {
								class: "scale",
								role: "img",
								"aria-label": "Opportunity by difficulty: 133 thousand hard, 67 thousand doable, 33 thousand easy"
							}, [
								createElementVNode("span", {
									class: "scale__a",
									style: { "flex-grow": "4" }
								}),
								createElementVNode("span", {
									class: "scale__b",
									style: { "flex-grow": "2" }
								}),
								createElementVNode("span", {
									class: "scale__c",
									style: { "flex-grow": "1" }
								})
							], -1)),
							_cache[18] || (_cache[18] = createElementVNode("p", { class: "t-micro t-muted" }, "Hard 133K · Doable 67K · Easy 33K", -1))
						]),
						_: 1
					})]),
					createVNode(unref(KCard), { tight: true }, {
						default: withCtx(() => [
							_cache[19] || (_cache[19] = createElementVNode("div", { class: "card__toprow" }, [createElementVNode("h3", { class: "t-caption t-caption--bold" }, "Suggestions"), createElementVNode("p", { class: "t-micro t-muted" }, "Refreshed daily")], -1)),
							createElementVNode("div", _hoisted_28, [createVNode(unref(KMetric), {
								value: "121K",
								label: "Sessions in reach"
							}), createVNode(unref(KMetric), {
								value: "78",
								label: "Keywords impacted"
							})]),
							_cache[20] || (_cache[20] = createElementVNode("button", {
								class: "button",
								type: "button"
							}, "Review suggestions", -1))
						]),
						_: 1
					})
				])
			]);
		};
	}
});
//#endregion
export { _01_rank_tracker_v2_default as default };
