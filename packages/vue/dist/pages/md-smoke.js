import { Fragment, createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, renderList, toDisplayString, unref, withCtx } from "vue";
import { KApp, KBookSection, KCard, KCardHeading, KCardStack, KInspector, KInspectorGroup, KSidebar, KSidebarNav, renderMarkdown } from "@konstantinopolskii/vue";
//#region ../../demos/md-renderer-smoke/sample-a.md?raw
var sample_a_default = "# Core prose path\n\nThree articles below, each fed by a different `data-md-src`. Every article is a `doc__section` with the same scaffolding as `index.html`. What you see here is what kit docs look like when their body is rendered from markdown.\n\nExercises the core prose path. Every heading level, body paragraphs, unordered and ordered lists, internal and external links, and inline code spans.\n\n## Section heading\n\nA body paragraph. The renderer wraps it in `<p class=\"t-body\">`. The surrounding utility class comes from the kit, not this file.\n\n### Card-level heading\n\nShort body under a card-level heading. Links render inline: the [fundamental demo](../fundamental--accepted/index.html) lives next door, and the [patterns registry](../../patterns.html) sits at the repo root.\n\nUnder the article's `data-md-heading-offset=\"0\"` contract, source `#` lands at h1 / t-hero, `##` at h2 / t-display, `###` at h3 / t-title, `####` at h4 / t-subtitle. Source `#####` and deeper demote to `<p class=\"t-caption\">` regular because the kit has no heading rank below subtitle.\n\n## Lists\n\nUnordered list:\n\n- First item, unmarked.\n- Second item with a [link](https://example.com).\n- Third item with `inline code`.\n\nOrdered list:\n\n1. Fetch the markdown.\n2. Render to HTML with kit classes.\n3. Inject into the container.\n\n## Mixed content paragraph\n\nA paragraph can carry a [link](#anchor) and `inline code` in one line. Each runs through the inline pass after the block pass settles. Bold and italic render in their sanctioned contexts only. Bold lives in headings. Italic lives in quotes. See Sample B for the quote demo.\n";
//#endregion
//#region ../../demos/md-renderer-smoke/sample-b.md?raw
var sample_b_default = "# Dense blocks\n\nExercises the denser block types. Tables render with `registry-table`. Blockquotes render with `quote`. Code fences render `pre > code` with `t-mono`.\n\n## Table\n\n| Class | Role | Size |\n|---|---|---|\n| `t-hero` | Document title | 66 / 66 |\n| `t-display` | Section heading | 38 / 38 |\n| `t-body` | Body text | 22 / 32 |\n| `t-caption` | UI labels | 16 / 24 |\n\n## Blockquote\n\n> The document is the UI. Words are 90% of the design. Getting the voice wrong breaks the system more visibly than any missing pixel.\n\n## Fenced code block\n\n```\n// kit.js public surface\nKK.init();\nKK.refresh();\nKK.enableCommentSelectionFlow();\n```\n\n## Horizontal rule\n\nA paragraph above a horizontal rule. The rule below renders from `---` on its own line and acts as an inline separator between this paragraph and the quote that follows.\n\n---\n\n> A blockquote after the rule. Renders with the kit's `quote` class: solid left rule, body-sized, black.\n";
//#endregion
//#region ../../demos/md-renderer-smoke/sample-c.md?raw
var sample_c_default = "# Raw HTML passthrough\n\nMarkdown cannot express the kit's card, field, or stat patterns. Authors drop raw HTML inline. The renderer passes it through unchanged.\n\n## Card embedded in markdown\n\n<div class=\"card\">\n  <div class=\"card__heading\">\n    <h3 class=\"t-title\">Card from markdown</h3>\n    <p class=\"t-caption t-muted\">Authored as raw HTML inside a .md file.</p>\n  </div>\n  <p class=\"t-body\">Body paragraph inside the card. The kit's card CSS still applies. No renderer magic needed beyond passthrough.</p>\n</div>\n\n<p class=\"t-caption t-muted\">Example</p>\n\n## Prose between raw HTML\n\nA paragraph between two raw HTML blocks. The block pass resumes after the card closes.\n\n<div class=\"card card--shout\">\n  <div class=\"card__heading\">\n    <h3 class=\"t-title\">Shout card</h3>\n    <p class=\"t-caption t-muted\">Raw HTML, one per column.</p>\n  </div>\n  <p class=\"t-body\">Everything inside inverts against the kit's shout surface.</p>\n</div>\n\n<p class=\"t-caption t-muted\">Example</p>\n\n## Security note\n\nMarkdown source is author-controlled. The `.md` files live in the repo alongside the renderer. Passthrough is safe by construction. A future use case that renders user-submitted markdown requires a sanitiser at the render boundary.\n";
//#endregion
//#region sfc/pages/md-smoke.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	id: "doc",
	class: "book"
};
var _hoisted_2 = { class: "t-caption t-muted" };
var _hoisted_3 = { class: "card" };
var _hoisted_4 = ["innerHTML"];
var _hoisted_5 = { class: "card" };
var _hoisted_6 = { class: "t-code t-code--block" };
//#endregion
//#region sfc/pages/md-smoke.vue
var md_smoke_default = /* @__PURE__ */ defineComponent({
	__name: "md-smoke",
	setup(__props) {
		const samples = [
			{
				id: "sample-a",
				file: "sample-a.md",
				raw: sample_a_default,
				rendered: renderMarkdown(sample_a_default, { headingOffset: 0 })
			},
			{
				id: "sample-b",
				file: "sample-b.md",
				raw: sample_b_default,
				rendered: renderMarkdown(sample_b_default, { headingOffset: 0 })
			},
			{
				id: "sample-c",
				file: "sample-c.md",
				raw: sample_c_default,
				rendered: renderMarkdown(sample_c_default, { headingOffset: 0 })
			}
		];
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "doc" }, {
				default: withCtx(() => [
					createVNode(unref(KSidebar), { title: "Renderer" }, {
						footer: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode("renderMarkdown() smoke test", -1)])]),
						default: withCtx(() => [createVNode(unref(KSidebarNav))]),
						_: 1
					}),
					createElementVNode("main", _hoisted_1, [(openBlock(), createElementBlock(Fragment, null, renderList(samples, (sample) => {
						return createVNode(unref(KBookSection), {
							key: sample.id,
							id: sample.id
						}, {
							default: withCtx(() => [createElementVNode("p", _hoisted_2, toDisplayString(sample.file), 1), createVNode(unref(KCardStack), { columns: "" }, {
								default: withCtx(() => [createElementVNode("div", _hoisted_3, [_cache[1] || (_cache[1] = createElementVNode("h3", { class: "t-title" }, "Render", -1)), createElementVNode("div", { innerHTML: sample.rendered }, null, 8, _hoisted_4)]), createElementVNode("div", _hoisted_5, [_cache[2] || (_cache[2] = createElementVNode("h3", { class: "t-title" }, "Source", -1)), createElementVNode("pre", null, [createElementVNode("code", _hoisted_6, toDisplayString(sample.raw), 1)])])]),
								_: 2
							}, 1024)]),
							_: 2
						}, 1032, ["id"]);
					}), 64))]),
					createVNode(unref(KInspector), { label: "Inspector" }, {
						default: withCtx(() => [createVNode(unref(KInspectorGroup), null, {
							default: withCtx(() => [
								createVNode(unref(KCard), { variant: "heading" }, {
									default: withCtx(() => [..._cache[3] || (_cache[3] = [createElementVNode("h2", { class: "t-display" }, "Notes", -1)])]),
									_: 1
								}),
								createVNode(unref(KCard), null, {
									default: withCtx(() => [createVNode(unref(KCardHeading), {
										title: "Renderer is dumb",
										subtitle: "Each article.book__section pairs one sample's render output with its raw source. wrapInSections still owns the nested structure inside the render side."
									})]),
									_: 1
								}),
								createVNode(unref(KCard), null, {
									default: withCtx(() => [createVNode(unref(KCardHeading), {
										title: "Fully baked, no fetch",
										subtitle: "renderMarkdown() runs at setup time against a build-time ?raw import — no client fetch, no kk:md-rendered event to wait on. Check devtools for zero console errors."
									})]),
									_: 1
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
export { md_smoke_default as default };
