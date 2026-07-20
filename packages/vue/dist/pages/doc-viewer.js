import { Fragment, createElementBlock, createElementVNode, createStaticVNode, createTextVNode, createVNode, defineComponent, onBeforeUnmount, onMounted, openBlock, ref, renderList, toDisplayString, unref, withCtx } from "vue";
import { KApp, KCard, KCardHeading, KInspector, KInspectorGroup, KSidebar, renderMarkdown, useScrollSpy } from "@konstantinopolskii/vue";
//#region sfc/pages/doc-viewer.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "button t-subtitle" };
var NO_BOOK_HTML = "<article class=\"book__section\"><h1 class=\"t-hero\">No book selected</h1><p class=\"t-body\">This page renders one canon file, named by the src query param. Pick a book from the shelf on the right, or return to the system root.</p></article>";
//#endregion
//#region sfc/pages/doc-viewer.vue
var doc_viewer_default = /* @__PURE__ */ defineComponent({
	__name: "doc-viewer",
	setup(__props) {
		const bookRef = ref(null);
		const navRef = ref(null);
		let disposeSpy;
		const shelfBooks = [
			{
				href: "./doc.html?src=./skills/kk-design-system/canon/patterns.md",
				srcPath: "skills/kk-design-system/canon/patterns.md",
				title: "Patterns",
				subtitle: "When composing any layout, start here. Three columns, card stack, narrow mobile.",
				button: "Browse patterns"
			},
			{
				href: "./doc.html?src=./skills/kk-design-system/canon/components.md",
				srcPath: "skills/kk-design-system/canon/components.md",
				title: "Components",
				subtitle: "When drilling from a pattern into a part, find every foundation, component, and forbidden thing.",
				button: "Find a component"
			},
			{
				href: "./doc.html?src=./skills/kk-design-system/canon/voice.md",
				srcPath: "skills/kk-design-system/canon/voice.md",
				title: "Voice",
				subtitle: "When writing a string, find shape rules and the AI-tells inventory in one place.",
				button: "Read the voice guide"
			},
			{
				href: "./doc.html?src=./skills/kk-design-system/pipeline/pipeline.md",
				srcPath: "skills/kk-design-system/pipeline/pipeline.md",
				title: "Pipeline",
				subtitle: "When entering or evaluating a session, find stages, role roster, and communication protocol.",
				button: "Walk the pipeline"
			},
			{
				href: "./doc.html?src=./skills/kk-design-system/pipeline/protocols.md",
				srcPath: "skills/kk-design-system/pipeline/protocols.md",
				title: "Protocols",
				subtitle: "When shipping, evolving, or logging an exception, find bundle, semver, evolve, backlog, ideation.",
				button: "Check the protocols"
			}
		];
		const hiddenSrcPath = ref(null);
		function unavailableHtml(src) {
			return "<p class=\"t-caption t-muted\">Markdown source unavailable: " + src + "</p>";
		}
		function wireSpy() {
			if (disposeSpy || !bookRef.value || !navRef.value) return;
			disposeSpy = useScrollSpy(bookRef.value, navRef.value);
		}
		onMounted(async () => {
			const src = new URLSearchParams(window.location.search).get("src") || "";
			if (!(!!src && !/^[a-z][a-z0-9+.-]*:|^\/\/|\.\./i.test(src))) {
				if (bookRef.value) bookRef.value.innerHTML = NO_BOOK_HTML;
				wireSpy();
				return;
			}
			hiddenSrcPath.value = src.replace(/^\.\//, "");
			const name = (src.split("/").pop() || "").replace(/\.md$/, "");
			if (name) document.title = name.charAt(0).toUpperCase() + name.slice(1) + ". The Agentic Design System.";
			try {
				const res = await fetch(src);
				if (!res.ok) throw new Error("HTTP " + res.status);
				const text = await res.text();
				if (bookRef.value) bookRef.value.innerHTML = renderMarkdown(text, { headingOffset: 0 });
			} catch {
				if (bookRef.value) bookRef.value.innerHTML = unavailableHtml(src);
			}
			wireSpy();
		});
		onBeforeUnmount(() => {
			disposeSpy?.();
			disposeSpy = void 0;
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(KApp), { view: "doc" }, {
				default: withCtx(() => [
					createVNode(unref(KSidebar), null, {
						footer: withCtx(() => [..._cache[1] || (_cache[1] = [
							createTextVNode("2026, fuckgrechka.ru", -1),
							createElementVNode("br", null, null, -1),
							createTextVNode("Powered by kk.consulting", -1)
						])]),
						default: withCtx(() => [_cache[2] || (_cache[2] = createElementVNode("div", { class: "sidebar__header t-title" }, [
							createTextVNode("Agentic"),
							createElementVNode("br"),
							createTextVNode("Design\xA0System")
						], -1)), createElementVNode("nav", {
							ref_key: "navRef",
							ref: navRef,
							class: "sidebar__nav",
							id: "toc"
						}, [..._cache[0] || (_cache[0] = [createElementVNode("span", {
							class: "toc__indicator",
							"aria-hidden": "true"
						}, null, -1)])], 512)]),
						_: 1
					}),
					createElementVNode("main", {
						id: "doc",
						ref_key: "bookRef",
						ref: bookRef,
						class: "book"
					}, null, 512),
					createVNode(unref(KInspector), { label: "Open another book" }, {
						default: withCtx(() => [createVNode(unref(KInspectorGroup), null, {
							default: withCtx(() => [createVNode(unref(KCard), { variant: "heading" }, {
								default: withCtx(() => [..._cache[3] || (_cache[3] = [createElementVNode("h2", { class: "t-display" }, "Open another book", -1)])]),
								_: 1
							}), (openBlock(), createElementBlock(Fragment, null, renderList(shelfBooks, (book) => {
								return createVNode(unref(KCard), {
									key: book.href,
									variant: "link",
									href: book.href,
									hidden: hiddenSrcPath.value === book.srcPath ? true : void 0
								}, {
									default: withCtx(() => [createVNode(unref(KCardHeading), {
										title: book.title,
										subtitle: book.subtitle
									}, null, 8, ["title", "subtitle"]), createElementVNode("span", _hoisted_1, toDisplayString(book.button), 1)]),
									_: 2
								}, 1032, ["href", "hidden"]);
							}), 64))]),
							_: 1
						}), createVNode(unref(KInspectorGroup), null, {
							default: withCtx(() => [createVNode(unref(KCard), { variant: "heading" }, {
								default: withCtx(() => [..._cache[4] || (_cache[4] = [createElementVNode("h2", { class: "t-display" }, "Return", -1)])]),
								_: 1
							}), createVNode(unref(KCard), {
								variant: "link",
								href: "./index.html"
							}, {
								default: withCtx(() => [createVNode(unref(KCardHeading), {
									title: "The system root",
									subtitle: "Manifesto, principles, agents, and the shelf of every book and demo."
								}), _cache[5] || (_cache[5] = createElementVNode("span", { class: "button t-subtitle" }, "Back to the manifesto", -1))]),
								_: 1
							})]),
							_: 1
						})]),
						_: 1
					})
				]),
				_: 1
			}), _cache[6] || (_cache[6] = createStaticVNode("<button class=\"fab fab--nav\" data-view-target=\"nav\" type=\"button\" aria-label=\"Open the sidebar\"><svg width=\"18\" height=\"14\" viewBox=\"0 0 18 14\" fill=\"none\" aria-hidden=\"true\"><rect width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"></rect><rect y=\"6\" width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"></rect><rect y=\"12\" width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"></rect></svg></button><button class=\"fab fab--inspector\" data-view-target=\"inspector\" type=\"button\" aria-label=\"Open another book\"><span class=\"fab__count\">6</span></button>", 2))], 64);
		};
	}
});
//#endregion
export { doc_viewer_default as default };
