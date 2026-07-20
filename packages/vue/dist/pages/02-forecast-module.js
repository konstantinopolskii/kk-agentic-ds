import { createBlock, createElementVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KCard, KCardHeading, KMetric, KPanels, KSpark, KSparkLabels, KSpecList } from "@konstantinopolskii/vue";
//#region sfc/pages/02-forecast-module.vue?vue&type=script&setup=true&lang.ts
var softCount = 8;
//#endregion
//#region sfc/pages/02-forecast-module.vue
var _02_forecast_module_default = /* @__PURE__ */ defineComponent({
	__name: "02-forecast-module",
	setup(__props) {
		const sparkValues = [
			42,
			38,
			46,
			52,
			58,
			50,
			34,
			40,
			70,
			80,
			90,
			100
		];
		const softIndices = Array.from({ length: softCount }, (_, i) => i);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "panels" }, {
				default: withCtx(() => [createVNode(unref(KPanels), null, {
					default: withCtx(() => [
						createVNode(unref(KCard), { span: "third" }, {
							default: withCtx(() => [createVNode(unref(KMetric), {
								value: "12 400",
								label: "Sessions in June",
								delta: "↑ 8% vs May"
							})]),
							_: 1
						}),
						createVNode(unref(KCard), { span: "third" }, {
							default: withCtx(() => [createVNode(unref(KMetric), {
								value: "386",
								label: "Conversions in June",
								delta: "↑ 12% vs May"
							})]),
							_: 1
						}),
						createVNode(unref(KCard), { span: "third" }, {
							default: withCtx(() => [createVNode(unref(KMetric), {
								value: "92%",
								label: "Forecast confidence"
							})]),
							_: 1
						}),
						createVNode(unref(KCard), { span: "full" }, {
							default: withCtx(() => [
								createVNode(unref(KCardHeading), {
									title: "Monthly forecast",
									subtitle: "Organic sessions, actuals against forecast",
									muted: ""
								}),
								createVNode(unref(KMetric), {
									value: "148 000",
									label: "Forecast for December",
									delta: "↑ 12% vs last December"
								}),
								createVNode(unref(KSpark), {
									panel: "",
									values: sparkValues,
									soft: unref(softIndices),
									label: "Organic sessions by month. January 96 000, rising and dipping through summer, then climbing from September to a December forecast of 148 000."
								}, null, 8, ["soft"]),
								createVNode(unref(KSparkLabels), { labels: [
									"Jan",
									"Jun",
									"Dec"
								] }),
								_cache[0] || (_cache[0] = createElementVNode("p", { class: "t-micro t-muted" }, "Jan 96 000 · Jun 118 000 · Dec 148 000 forecast", -1))
							]),
							_: 1
						}),
						createVNode(unref(KCard), { span: "half" }, {
							default: withCtx(() => [createVNode(unref(KCardHeading), {
								title: "Search Console is disconnected",
								subtitle: "The forecast runs on data last synced July 2. Reconnect to resume daily updates."
							}), _cache[1] || (_cache[1] = createElementVNode("button", { class: "button button--primary t-subtitle" }, "Reconnect Search Console", -1))]),
							_: 1
						}),
						createVNode(unref(KCard), { span: "half" }, {
							default: withCtx(() => [createVNode(unref(KCardHeading), { title: "How the forecast reads" }), createVNode(unref(KSpecList), {
								variant: "plain",
								rows: [
									{
										key: "Model",
										values: ["Seasonal fit on 24 months"]
									},
									{
										key: "Updated",
										values: ["Daily at 06:00"]
									},
									{
										key: "Confidence",
										values: ["92% on current pace"]
									}
								]
							})]),
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
export { _02_forecast_module_default as default };
