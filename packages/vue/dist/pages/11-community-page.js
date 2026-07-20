import { Fragment, createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, renderList, toDisplayString, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KCard, KCardHeading, KDataCell, KDataTable, KList } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/11-community-page.vue
var _11_community_page_default = /* @__PURE__ */ defineComponent({
	__name: "11-community-page",
	setup(__props) {
		const thursdayItems = ["Name what works before what does not.", "Critique the work, never the person."];
		const columns = [
			"Project",
			"Members",
			{
				label: "Progress",
				num: true
			},
			"Target"
		];
		const projects = [
			{
				lead: "A type specimen site",
				members: "Sofia Marchetti, Yusuf Demir",
				progress: "80%",
				target: "September"
			},
			{
				lead: "An iOS habit app",
				members: "Anke Voss, Rafael Souza, Priya Nair",
				progress: "45%",
				target: "October"
			},
			{
				lead: "A print zine",
				members: "Tomas Novak",
				progress: "65%",
				target: "August"
			},
			{
				lead: "A weather widget kit",
				members: "Elin Andersson, Marco Ferrari",
				progress: "30%",
				target: "November"
			},
			{
				lead: "A modular font family",
				members: "Nadia Petrova, Julien Moreau, Hana Kobayashi",
				progress: "90%",
				target: "September"
			}
		];
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [
						createVNode(unref(KBookSection), null, {
							default: withCtx(() => [..._cache[0] || (_cache[0] = [
								createElementVNode("h1", { class: "t-hero" }, "Planetarium", -1),
								createElementVNode("p", { class: "t-title" }, "First month 1 €, then 9,50 € a month.", -1),
								createElementVNode("p", { class: "t-body" }, "A working community for designers who ship a project a season, with structured feedback every Thursday.", -1)
							])]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "members" }, {
							default: withCtx(() => [..._cache[1] || (_cache[1] = [createElementVNode("h2", { class: "t-display" }, "Members", -1), createElementVNode("p", { class: "t-body" }, [
								createElementVNode("a", { href: "#" }, "Sofia Marchetti"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Yusuf Demir"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Anke Voss"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Rafael Souza"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Priya Nair"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Tomas Novak"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Elin Andersson"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Marco Ferrari"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Nadia Petrova"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Julien Moreau"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Hana Kobayashi"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Liam O'Connor"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Greta Lindqvist"),
								createTextVNode(", "),
								createElementVNode("a", { href: "#" }, "Omar Farouk"),
								createTextVNode(", and 47 more.")
							], -1)])]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "thursdays" }, {
							default: withCtx(() => [
								_cache[2] || (_cache[2] = createElementVNode("h2", { class: "t-display" }, "How Thursdays work", -1)),
								_cache[3] || (_cache[3] = createElementVNode("p", { class: "t-body" }, "Online, 19:00, three slots of twenty minutes. Bring work in progress.", -1)),
								createVNode(unref(KList), { items: thursdayItems })
							]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "projects" }, {
							default: withCtx(() => [_cache[4] || (_cache[4] = createElementVNode("h2", { class: "t-display" }, "Active projects", -1)), createVNode(unref(KDataTable), { columns }, {
								default: withCtx(() => [(openBlock(), createElementBlock(Fragment, null, renderList(projects, (p) => {
									return createElementVNode("tr", { key: p.lead }, [
										createVNode(unref(KDataCell), { lead: "" }, {
											default: withCtx(() => [createTextVNode(toDisplayString(p.lead), 1)]),
											_: 2
										}, 1024),
										createVNode(unref(KDataCell), null, {
											default: withCtx(() => [createTextVNode(toDisplayString(p.members), 1)]),
											_: 2
										}, 1024),
										createVNode(unref(KDataCell), { num: "" }, {
											default: withCtx(() => [createTextVNode(toDisplayString(p.progress), 1)]),
											_: 2
										}, 1024),
										createVNode(unref(KDataCell), null, {
											default: withCtx(() => [createTextVNode(toDisplayString(p.target), 1)]),
											_: 2
										}, 1024)
									]);
								}), 64))]),
								_: 1
							})]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "join" }, {
							default: withCtx(() => [createVNode(unref(KCard), { variant: "shout" }, {
								default: withCtx(() => [createVNode(unref(KCardHeading), {
									title: "Join the season",
									subtitle: "Billing starts after the first month; leave any Thursday.",
									muted: ""
								}), _cache[5] || (_cache[5] = createElementVNode("button", { class: "button button--primary t-subtitle" }, "Join for the first month", -1))]),
								_: 1
							}), _cache[6] || (_cache[6] = createElementVNode("p", { class: "t-micro t-muted" }, [
								createTextVNode("Promo codes: "),
								createElementVNode("span", { class: "t-code" }, "FIRSTLIGHT"),
								createTextVNode(),
								createElementVNode("span", { class: "t-code" }, "ORBIT25")
							], -1))]),
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
export { _11_community_page_default as default };
