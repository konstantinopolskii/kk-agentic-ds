import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KCard, KCardHeading, KMedia, KMetric, KQuote } from "@konstantinopolskii/vue";
//#region sfc/pages/03-identity-hero.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "metric-row" };
var _hoisted_2 = { class: "metric-row" };
var _hoisted_3 = { class: "metric-row" };
//#endregion
//#region sfc/pages/03-identity-hero.vue
var _03_identity_hero_default = /* @__PURE__ */ defineComponent({
	__name: "03-identity-hero",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [
						createVNode(unref(KBookSection), null, {
							default: withCtx(() => [createVNode(unref(KMedia), {
								title: "Kostia Konstantinopolskii",
								meta: "kk.consulting, Amsterdam, since 2012",
								initials: "KK"
							}), _cache[0] || (_cache[0] = createElementVNode("p", { class: "t-title" }, "Growth expert. 30K MAU app owner. $1M+ B2B cases. 18 mentees holding $700K ARR. Two cats.", -1))]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "founder" }, {
							default: withCtx(() => [
								_cache[2] || (_cache[2] = createElementVNode("h1", { class: "t-hero" }, "Founder", -1)),
								_cache[3] || (_cache[3] = createElementVNode("p", { class: "t-title" }, "Scaling a self-built budgeting app from 30K users toward 1M. Fully self-funded.", -1)),
								createElementVNode("div", _hoisted_1, [
									_cache[1] || (_cache[1] = createElementVNode("div", { class: "metric" }, [
										createElementVNode("p", { class: "metric__value" }, "30K"),
										createElementVNode("p", { class: "metric__label" }, "Users monthly"),
										createElementVNode("p", { class: "metric__delta" }, [createTextVNode("↑ 100% "), createElementVNode("span", { class: "t-muted" }, "organic")])
									], -1)),
									createVNode(unref(KMetric), {
										value: "5K",
										label: "Users daily"
									}),
									createVNode(unref(KMetric), {
										value: "4.7",
										label: "From 1 000+ reviews"
									})
								]),
								_cache[4] || (_cache[4] = createElementVNode("p", { class: "t-caption t-muted" }, "Top-12 budget apps, featured by T-Bank.", -1))
							]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "strategist" }, {
							default: withCtx(() => [
								_cache[5] || (_cache[5] = createElementVNode("h2", { class: "t-display" }, "Strategist", -1)),
								_cache[6] || (_cache[6] = createElementVNode("p", { class: "t-title" }, "Growth strategy for B2B products that already work and want to grow up.", -1)),
								createElementVNode("div", _hoisted_2, [
									createVNode(unref(KMetric), {
										value: "$1M+",
										label: "Case value delivered"
									}),
									createVNode(unref(KMetric), {
										value: "14",
										label: "Years in product"
									}),
									createVNode(unref(KMetric), {
										value: "9",
										label: "Ventures built"
									})
								]),
								_cache[7] || (_cache[7] = createElementVNode("p", { class: "t-caption t-muted" }, "Strategy sprints, growth audits, and the numbers to defend both.", -1))
							]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "mentor" }, {
							default: withCtx(() => [
								_cache[9] || (_cache[9] = createElementVNode("h2", { class: "t-display" }, "Mentor", -1)),
								_cache[10] || (_cache[10] = createElementVNode("p", { class: "t-title" }, "Founders through the jump from first revenue to a business that holds.", -1)),
								createElementVNode("div", _hoisted_3, [createVNode(unref(KMetric), {
									value: "18",
									label: "Mentees today"
								}), createVNode(unref(KMetric), {
									value: "$700K",
									label: "Their combined ARR"
								})]),
								createVNode(unref(KQuote), { cite: "Priya Nandakumar, mentee, fintech founder" }, {
									default: withCtx(() => [..._cache[8] || (_cache[8] = [createTextVNode(" Kostia rebuilt our onboarding funnel in six weeks. Conversion went from 2.1% to 6.4%, and we closed the round that same quarter. ", -1)])]),
									_: 1
								})
							]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "now" }, {
							default: withCtx(() => [
								_cache[12] || (_cache[12] = createElementVNode("h2", { class: "t-display" }, "Now", -1)),
								_cache[13] || (_cache[13] = createElementVNode("p", { class: "t-body" }, "Current work is design systems for agent pipelines: kit vocabulary an agent reads instead of inventing parts on every job. The kit ships 19 components on 7 foundations; two consulting clients run it inside their agent builds today.", -1)),
								createVNode(unref(KCard), null, {
									default: withCtx(() => [createVNode(unref(KCardHeading), {
										title: "Working sessions",
										subtitle: "90 minutes, one decision made before you leave."
									}), _cache[11] || (_cache[11] = createElementVNode("button", { class: "button button--primary t-subtitle" }, "Book a working session", -1))]),
									_: 1
								}),
								_cache[14] || (_cache[14] = createElementVNode("p", { class: "t-micro t-muted" }, "Amsterdam · kk.consulting · the cats stay in every reference.", -1))
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
export { _03_identity_hero_default as default };
