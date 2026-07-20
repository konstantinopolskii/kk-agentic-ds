import { Fragment, createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, renderList, toDisplayString, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KCard, KCardHeading, KChip, KChipWrap, KDataCell, KDataTable, KInspector, KMetric, KSidebar, KSidebarNav, KSpark, KSparkLabels, KSpecList } from "@konstantinopolskii/vue";
//#region sfc/pages/01-rank-tracker.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "metric-row" };
var introText = "Tracking kk.consulting's brand campaign, Jan 1 – Jul 17, 2026.";
//#endregion
//#region sfc/pages/01-rank-tracker.vue
var _01_rank_tracker_default = /* @__PURE__ */ defineComponent({
	__name: "01-rank-tracker",
	setup(__props) {
		const columns = [
			"Keyword",
			{
				label: "Position",
				num: true
			},
			{
				label: "Change",
				num: true
			},
			"Trend",
			{
				label: "Volume",
				num: true
			}
		];
		const keywordRows = [
			{
				keyword: "design system audit",
				position: 3,
				delta: "↑ 2",
				flat: false,
				volume: "12 400",
				trend: "rising",
				values: [
					40,
					45,
					50,
					55,
					60,
					70,
					80,
					88
				]
			},
			{
				keyword: "product strategy sprint",
				position: 7,
				delta: "↑ 1",
				flat: false,
				volume: "3 200",
				trend: "rising",
				values: [
					48,
					50,
					52,
					55,
					58,
					60,
					63,
					66
				]
			},
			{
				keyword: "agentic pipeline",
				position: 11,
				delta: "0",
				flat: true,
				volume: "880",
				trend: "steady",
				values: [
					45,
					47,
					44,
					46,
					47,
					45,
					46,
					47
				]
			},
			{
				keyword: "design consultancy pricing",
				position: 14,
				delta: "↓ 3",
				flat: false,
				volume: "1 900",
				trend: "falling",
				values: [
					70,
					66,
					62,
					58,
					52,
					46,
					40,
					35
				]
			},
			{
				keyword: "ui kit for startups",
				position: 5,
				delta: "↑ 4",
				flat: false,
				volume: "2 700",
				trend: "rising",
				values: [
					30,
					36,
					42,
					50,
					58,
					66,
					75,
					85
				]
			},
			{
				keyword: "brand identity workshop",
				position: 9,
				delta: "↑ 1",
				flat: false,
				volume: "1 500",
				trend: "rising",
				values: [
					48,
					49,
					50,
					52,
					53,
					55,
					56,
					58
				]
			},
			{
				keyword: "hire a design consultant",
				position: 6,
				delta: "↓ 1",
				flat: false,
				volume: "4 100",
				trend: "falling",
				values: [
					60,
					59,
					58,
					57,
					56,
					55,
					53,
					50
				]
			},
			{
				keyword: "token based design system",
				position: 2,
				delta: "↑ 3",
				flat: false,
				volume: "970",
				trend: "rising",
				values: [
					55,
					60,
					66,
					72,
					78,
					84,
					90,
					95
				]
			},
			{
				keyword: "voice and tone guidelines",
				position: 16,
				delta: "↓ 2",
				flat: false,
				volume: "640",
				trend: "falling",
				values: [
					50,
					46,
					42,
					40,
					37,
					34,
					31,
					28
				]
			},
			{
				keyword: "figma to code handoff",
				position: 8,
				delta: "0",
				flat: true,
				volume: "2 200",
				trend: "steady",
				values: [
					50,
					52,
					49,
					51,
					50,
					52,
					51,
					50
				]
			}
		];
		const detailSpark = [
			20,
			24,
			30,
			34,
			40,
			45,
			52,
			58,
			66,
			74,
			82,
			90
		];
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "doc" }, {
				default: withCtx(() => [
					createVNode(unref(KSidebar), { title: "Rank tracker" }, {
						default: withCtx(() => [createVNode(unref(KSidebarNav), {
							id: "toc",
							manual: ""
						}, {
							default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("section", { class: "nav-group" }, [createElementVNode("ul", { class: "nav-group__items" }, [
								createElementVNode("li", { class: "t-caption t-caption--bold" }, [createElementVNode("a", {
									href: "#",
									"aria-current": "page"
								}, "Keywords")]),
								createElementVNode("li", { class: "t-caption" }, [createElementVNode("a", { href: "#" }, "Competitors")]),
								createElementVNode("li", { class: "t-caption" }, [createElementVNode("a", { href: "#" }, "Reports")]),
								createElementVNode("li", { class: "t-caption" }, [createElementVNode("a", { href: "#" }, "Settings")])
							])], -1)])]),
							_: 1
						})]),
						_: 1
					}),
					createVNode(unref(KBook), { id: "doc" }, {
						default: withCtx(() => [createVNode(unref(KBookSection), null, {
							default: withCtx(() => [
								_cache[5] || (_cache[5] = createElementVNode("h1", { class: "t-hero" }, "Keywords", -1)),
								createElementVNode("p", { class: "t-body" }, toDisplayString(introText)),
								createVNode(unref(KChipWrap), null, {
									default: withCtx(() => [
										createVNode(unref(KChip), { pressed: "" }, {
											default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("All keywords", -1)])]),
											_: 1
										}),
										createVNode(unref(KChip), null, {
											default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("Winners", -1)])]),
											_: 1
										}),
										createVNode(unref(KChip), null, {
											default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("Losers", -1)])]),
											_: 1
										}),
										createVNode(unref(KChip), null, {
											default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("Starred", -1)])]),
											_: 1
										})
									]),
									_: 1
								}),
								createVNode(unref(KDataTable), { columns }, {
									default: withCtx(() => [(openBlock(), createElementBlock(Fragment, null, renderList(keywordRows, (row) => {
										return createElementVNode("tr", { key: row.keyword }, [
											createVNode(unref(KDataCell), { lead: "" }, {
												default: withCtx(() => [createTextVNode(toDisplayString(row.keyword), 1)]),
												_: 2
											}, 1024),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [createTextVNode(toDisplayString(row.position), 1)]),
												_: 2
											}, 1024),
											createVNode(unref(KDataCell), {
												delta: "",
												flat: row.flat
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(row.delta), 1)]),
												_: 2
											}, 1032, ["flat"]),
											createVNode(unref(KDataCell), null, {
												default: withCtx(() => [createVNode(unref(KSpark), {
													values: row.values,
													label: `Position, 8 weeks, ${row.trend}`
												}, null, 8, ["values", "label"])]),
												_: 2
											}, 1024),
											createVNode(unref(KDataCell), { num: "" }, {
												default: withCtx(() => [createTextVNode(toDisplayString(row.volume), 1)]),
												_: 2
											}, 1024)
										]);
									}), 64))]),
									_: 1
								})
							]),
							_: 1
						})]),
						_: 1
					}),
					createVNode(unref(KInspector), { label: "Keyword detail" }, {
						default: withCtx(() => [createVNode(unref(KCard), null, {
							default: withCtx(() => [
								createVNode(unref(KCardHeading), {
									title: "design system audit",
									subtitle: "Position history, 12 weeks",
									muted: ""
								}),
								createElementVNode("div", _hoisted_1, [createVNode(unref(KMetric), {
									value: "3",
									label: "Position",
									delta: "↑ 2"
								}), createVNode(unref(KMetric), {
									value: "12 400",
									label: "Volume"
								})]),
								createVNode(unref(KSpark), {
									panel: "",
									values: detailSpark,
									label: "Position, 12 weeks, rising"
								}),
								createVNode(unref(KSparkLabels), { labels: [
									"Week 1",
									"Week 6",
									"Week 12"
								] })
							]),
							_: 1
						}), createVNode(unref(KCard), null, {
							default: withCtx(() => [createVNode(unref(KSpecList), {
								variant: "plain",
								rows: [
									{
										key: "Landing page",
										values: ["/kit"]
									},
									{
										key: "First seen",
										values: ["Jan 3, 2026"]
									},
									{
										key: "Best position",
										values: ["2"]
									}
								]
							})]),
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
export { _01_rank_tracker_default as default };
