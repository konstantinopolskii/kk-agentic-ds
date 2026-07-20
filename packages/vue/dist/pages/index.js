import { Fragment, createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, renderList, unref, withCtx } from "vue";
import { KApp, KBook, KBookSection, KMedia } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/index.vue
var pages_default = /* @__PURE__ */ defineComponent({
	__name: "index",
	setup(__props) {
		const productSurfaces = [
			{
				href: "./01-rank-tracker-v2.html",
				initials: "01",
				title: "Rank tracker",
				meta: "Board shell: groups rail, keyword work list, analytics rail. Study 1, lab components."
			},
			{
				href: "./04-joi-onboarding.html",
				initials: "04",
				title: "Onboarding steps",
				meta: "Step counter, field rows, chip multi-select, pinned primary. Study 4."
			},
			{
				href: "./05-joi-settings.html",
				initials: "05",
				title: "Settings list",
				meta: "Shout upsell, switch rows, value rows. Study 5."
			},
			{
				href: "./07-flashcard.html",
				initials: "07",
				title: "Flashcard",
				meta: "One word on a shout card. Study 7."
			},
			{
				href: "./08-status-feed.html",
				initials: "08",
				title: "Status feed",
				meta: "Media rows, avatars, count tags, one primary. Study 8."
			},
			{
				href: "./09-create-transfer.html",
				initials: "09",
				title: "Create a transfer",
				meta: "One-card form: chips, file rows, fields, one commit. Study 9."
			}
		];
		const profilesAndMedia = [{
			href: "./03-identity-hero-v2.html",
			initials: "03",
			title: "Identity hero",
			meta: "Muted name, loud statement, role chips, metric row. Study 3."
		}, {
			href: "./06-person-page.html",
			initials: "06",
			title: "Person page",
			meta: "Shout hero, metric row, filmography table. Study 6."
		}];
		const landingsAndIndexes = [
			{
				href: "./10-tzlvt-landing-v2.html",
				initials: "10",
				title: "App landing",
				meta: "One column, four proof sections, one shout. Study 10."
			},
			{
				href: "./11-community-page.html",
				initials: "11",
				title: "Community page",
				meta: "Roster prose, projects table, subscribe shout. Study 11."
			},
			{
				href: "./12-studio-index-v2.html",
				initials: "12",
				title: "Studio index",
				meta: "Hero word, two link cards, one screen. Study 12."
			}
		];
		const commissioned = [{
			href: "./13-blogpost.html",
			initials: "13",
			title: "Blogpost, one column",
			meta: "Article header, byline row, quote, figure, related rows, signoff."
		}, {
			href: "./14-newsfront-v2.html",
			initials: "14",
			title: "News front, multi column",
			meta: "Lead story, latest rail, desk grid. The front shell."
		}];
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "single" }, {
				default: withCtx(() => [createVNode(unref(KBook), { id: "doc" }, {
					default: withCtx(() => [
						createVNode(unref(KBookSection), null, {
							default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("h1", { class: "t-hero" }, "Reference recreations", -1), createElementVNode("p", { class: "t-body" }, [
								createTextVNode("Eleven reference designs and two commissioned surfaces, rebuilt with kit classes. Each page answers one study from the "),
								createElementVNode("a", { href: "../../doc.html?src=./references/registry.md" }, "reference registry"),
								createTextVNode(": same structure, kit material. One exception to the zero-custom-CSS rule: the rank tracker runs on "),
								createElementVNode("span", { class: "t-code" }, "lab.css"),
								createTextVNode(", the experiment layer for components the canon does not carry yet.")
							], -1)])]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "product-surfaces" }, {
							default: withCtx(() => [_cache[1] || (_cache[1] = createElementVNode("h2", { class: "t-display" }, "Product surfaces", -1)), (openBlock(), createElementBlock(Fragment, null, renderList(productSurfaces, (row) => {
								return createVNode(unref(KMedia), {
									key: row.href,
									href: row.href,
									initials: row.initials,
									title: row.title,
									meta: row.meta,
									micro: ""
								}, null, 8, [
									"href",
									"initials",
									"title",
									"meta"
								]);
							}), 64))]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "profiles-and-media" }, {
							default: withCtx(() => [_cache[2] || (_cache[2] = createElementVNode("h2", { class: "t-display" }, "Profiles and media", -1)), (openBlock(), createElementBlock(Fragment, null, renderList(profilesAndMedia, (row) => {
								return createVNode(unref(KMedia), {
									key: row.href,
									href: row.href,
									initials: row.initials,
									title: row.title,
									meta: row.meta,
									micro: ""
								}, null, 8, [
									"href",
									"initials",
									"title",
									"meta"
								]);
							}), 64))]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "landings-and-indexes" }, {
							default: withCtx(() => [_cache[3] || (_cache[3] = createElementVNode("h2", { class: "t-display" }, "Landings and indexes", -1)), (openBlock(), createElementBlock(Fragment, null, renderList(landingsAndIndexes, (row) => {
								return createVNode(unref(KMedia), {
									key: row.href,
									href: row.href,
									initials: row.initials,
									title: row.title,
									meta: row.meta,
									micro: ""
								}, null, 8, [
									"href",
									"initials",
									"title",
									"meta"
								]);
							}), 64))]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "commissioned" }, {
							default: withCtx(() => [
								_cache[4] || (_cache[4] = createElementVNode("h2", { class: "t-display" }, "Commissioned surfaces", -1)),
								_cache[5] || (_cache[5] = createElementVNode("p", { class: "t-body" }, "No single reference parent. Composed from the common moves the registry names.", -1)),
								(openBlock(), createElementBlock(Fragment, null, renderList(commissioned, (row) => {
									return createVNode(unref(KMedia), {
										key: row.href,
										href: row.href,
										initials: row.initials,
										title: row.title,
										meta: row.meta,
										micro: ""
									}, null, 8, [
										"href",
										"initials",
										"title",
										"meta"
									]);
								}), 64))
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
export { pages_default as default };
