import { createBlock, createElementVNode, createTextVNode, createVNode, defineComponent, onBeforeUnmount, onMounted, openBlock, ref, toDisplayString, unref, withCtx } from "vue";
import { KApp, KBookSection, KButton, KCard, KCardCollapsible, KCardHeading, KCode, KCommentStack, KInspectorGroup, KList, KSidebar, KSidebarNav, KSignoff, KTag, useCommentFlow, useCommentMenus, useCommentSecret, useCommentStore, useInspectorStack } from "@konstantinopolskii/vue";
//#region sfc/pages/comments-demo.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "t-body" };
var offSnippet = "useCommentStore(bookRef, inspectorRef, { enabled: false })\n// or: { adapter: 'none' } — same effect, reads as intent at the call site.";
var customAdapterSnippet = "const adapter: CommentStoreAdapter = {\n  load()  { /* return a CommentSnapshot or null */ },\n  save(snap) { /* snap: { v: 1, savedAt, stack } */ },\n  clear() { /* remove */ },\n}\nuseCommentStore(bookRef, inspectorRef, { adapter })";
//#endregion
//#region sfc/pages/comments-demo.vue
var comments_demo_default = /* @__PURE__ */ defineComponent({
	__name: "comments-demo",
	setup(__props) {
		function readMode() {
			if (typeof window === "undefined") return "on";
			const m = new URLSearchParams(window.location.search).get("persist");
			return m === "off" || m === "memory" ? m : "on";
		}
		const mode = readMode();
		const displayMode = ref("on");
		onMounted(() => {
			displayMode.value = readMode();
		});
		let memorySnapshot = null;
		const storeOptions = mode === "off" ? { enabled: false } : mode === "memory" ? { adapter: {
			load: () => memorySnapshot,
			save: (snap) => {
				memorySnapshot = snap;
			},
			clear: () => {
				memorySnapshot = null;
			}
		} } : { adapter: "localStorage" };
		const bookRef = ref(null);
		const inspectorRef = ref(null);
		useCommentFlow(bookRef, inspectorRef, { currentAuthor: "Demo reader" });
		useCommentMenus(inspectorRef);
		const { clear } = useCommentStore(bookRef, inspectorRef, storeOptions);
		const { extractComments, copyComments } = useCommentSecret(inspectorRef);
		let disposeInspectorStack;
		onMounted(() => {
			if (inspectorRef.value) disposeInspectorStack = useInspectorStack(inspectorRef.value);
		});
		onBeforeUnmount(() => disposeInspectorStack?.());
		function onExtract() {
			const arr = extractComments();
			console.log("extractComments returned", arr.length, "thread(s):", arr);
		}
		function onCopy() {
			const arr = copyComments();
			console.log("copyComments wrote JSON to clipboard.", arr.length, "thread(s).");
		}
		const howToSteps = [
			"Highlight a sentence in the doc.",
			"A draft opens here. Type, hit enter.",
			"Reload. The thread and highlight come back.",
			"Use a kebab to reply, edit, approve, or archive.",
			"Use the buttons below to extract, copy, or clear."
		];
		const signoffStats = [{
			value: "3",
			text: "adapter shapes."
		}, {
			value: "200 ms",
			text: "save debounce."
		}];
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KApp), { view: "doc" }, {
				default: withCtx(() => [
					createVNode(unref(KSidebar), { title: "Comment persistence" }, {
						footer: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode("kit 2.1.1, comments demo", -1)])]),
						default: withCtx(() => [createVNode(unref(KSidebarNav))]),
						_: 1
					}),
					createElementVNode("main", {
						id: "doc",
						ref_key: "bookRef",
						ref: bookRef,
						class: "book"
					}, [
						createVNode(unref(KBookSection), null, {
							default: withCtx(() => [
								_cache[14] || (_cache[14] = createElementVNode("h1", { class: "t-hero" }, "Comment persistence", -1)),
								_cache[15] || (_cache[15] = createElementVNode("p", { class: "t-body" }, " Highlight a sentence below. A draft opens in the inspector. Type a comment, hit enter. Reload the page — the thread and the highlight come back. ", -1)),
								_cache[16] || (_cache[16] = createElementVNode("p", { class: "t-body" }, [
									createElementVNode("code", { class: "t-code" }, "useCommentStore"),
									createTextVNode(" ships a "),
									createElementVNode("code", { class: "t-code" }, "localStorage"),
									createTextVNode(" adapter by default. It writes a snapshot 200 ms after the last stack mutation; the next mount restores the thread stack and re-wraps doc highlights from each thread's own anchor metadata. ")
								], -1)),
								createElementVNode("p", _hoisted_1, [
									_cache[1] || (_cache[1] = createTextVNode(" Three URL modes test the three adapter shapes: ", -1)),
									_cache[2] || (_cache[2] = createElementVNode("code", { class: "t-code" }, "?persist=on", -1)),
									_cache[3] || (_cache[3] = createTextVNode(" (default), ", -1)),
									_cache[4] || (_cache[4] = createElementVNode("code", { class: "t-code" }, "?persist=off", -1)),
									_cache[5] || (_cache[5] = createTextVNode(", ", -1)),
									_cache[6] || (_cache[6] = createElementVNode("code", { class: "t-code" }, "?persist=memory", -1)),
									_cache[7] || (_cache[7] = createTextVNode(". Current mode: ", -1)),
									createVNode(unref(KTag), { bold: "" }, {
										default: withCtx(() => [createTextVNode(toDisplayString(displayMode.value), 1)]),
										_: 1
									}),
									_cache[8] || (_cache[8] = createTextVNode(". Switch: ", -1)),
									_cache[9] || (_cache[9] = createElementVNode("a", { href: "?persist=on" }, "on", -1)),
									_cache[10] || (_cache[10] = createTextVNode(" · ", -1)),
									_cache[11] || (_cache[11] = createElementVNode("a", { href: "?persist=off" }, "off", -1)),
									_cache[12] || (_cache[12] = createTextVNode(" · ", -1)),
									_cache[13] || (_cache[13] = createElementVNode("a", { href: "?persist=memory" }, "memory", -1))
								])
							]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "how-to-try" }, {
							default: withCtx(() => [..._cache[17] || (_cache[17] = [
								createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" How to try it"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium" }, "Five steps, end to end")
								], -1),
								createElementVNode("p", { class: "t-body" }, " Highlight the next paragraph, then the one after it. A separate draft opens for each selection. Type a sentence into either field, hit enter, and watch the thread land in the stack on the right. ", -1),
								createElementVNode("p", { class: "t-body" }, "This sentence is a good first target. Drag across it now.", -1),
								createElementVNode("p", { class: "t-body" }, " This second sentence runs across an em dash and a few words, to prove the highlight survives the kind of body prose the kit actually ships. ", -1),
								createElementVNode("p", { class: "t-body" }, " Reload the page. Both threads come back, highlights and all. Replies inside a thread persist the same way. Drafts persist mid-typing — the save observer watches character data on the stack, not just child additions. ", -1)
							])]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "what-persists" }, {
							default: withCtx(() => [..._cache[18] || (_cache[18] = [
								createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" What persists"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium" }, "The full comment loop")
								], -1),
								createElementVNode("p", { class: "t-body" }, " Threads with anchor, author, and body. Replies inside a thread. Resolved threads (Approve from the kebab) and archived threads (Archive thread from the kebab). Drafts mid-typing. Highlights on the doc body, re-wrapped from the anchor metadata each thread carries on its dataset. ", -1),
								createElementVNode("p", { class: "t-body" }, [
									createTextVNode(" The snapshot is the stack's "),
									createElementVNode("code", { class: "t-code" }, "innerHTML"),
									createTextVNode(" plus a "),
									createElementVNode("code", { class: "t-code" }, "savedAt"),
									createTextVNode(" timestamp. No separate highlights array — "),
									createElementVNode("code", { class: "t-code" }, "data-kk-anchor-quote"),
									createTextVNode(" on the thread is the source of truth for re-wrapping. ")
								], -1)
							])]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "switch-off" }, {
							default: withCtx(() => [
								_cache[19] || (_cache[19] = createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" Switching it off"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium" }, "For DB-backed apps")
								], -1)),
								_cache[20] || (_cache[20] = createElementVNode("p", { class: "t-body" }, [
									createTextVNode(" Apps that route the "),
									createElementVNode("code", { class: "t-code" }, "kk:comment"),
									createTextVNode(" event to their own backend should not also write to localStorage. Pass "),
									createElementVNode("code", { class: "t-code" }, "enabled: false"),
									createTextVNode(" to "),
									createElementVNode("code", { class: "t-code" }, "useCommentStore"),
									createTextVNode(": ")
								], -1)),
								createVNode(unref(KCode), { block: "" }, {
									default: withCtx(() => [createTextVNode(toDisplayString(offSnippet))]),
									_: 1
								}),
								_cache[21] || (_cache[21] = createElementVNode("p", { class: "t-body" }, [
									createTextVNode(" Append "),
									createElementVNode("code", { class: "t-code" }, "?persist=off"),
									createTextVNode(" to this page's URL (or use the switch above) to see it live. The stack stays empty across reloads. "),
									createElementVNode("code", { class: "t-code" }, "useCommentStore"),
									createTextVNode("'s returned "),
									createElementVNode("code", { class: "t-code" }, "clear()"),
									createTextVNode(" stays callable; it just has nothing to clear. ")
								], -1))
							]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "custom-adapter" }, {
							default: withCtx(() => [
								_cache[22] || (_cache[22] = createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" Custom adapter"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium" }, "Three methods, your store")
								], -1)),
								_cache[23] || (_cache[23] = createElementVNode("p", { class: "t-body" }, [
									createTextVNode(" Pass an object carrying "),
									createElementVNode("code", { class: "t-code" }, "load"),
									createTextVNode(", "),
									createElementVNode("code", { class: "t-code" }, "save"),
									createTextVNode(", and "),
									createElementVNode("code", { class: "t-code" }, "clear"),
									createTextVNode(" as the "),
									createElementVNode("code", { class: "t-code" }, "adapter"),
									createTextVNode(" option. "),
									createElementVNode("code", { class: "t-code" }, "useCommentStore"),
									createTextVNode(" calls "),
									createElementVNode("code", { class: "t-code" }, "load()"),
									createTextVNode(" once at mount, "),
									createElementVNode("code", { class: "t-code" }, "save(snapshot)"),
									createTextVNode(" on every batch of stack mutations (200 ms debounce), and "),
									createElementVNode("code", { class: "t-code" }, "clear()"),
									createTextVNode(" only when the consumer calls the composable's own returned "),
									createElementVNode("code", { class: "t-code" }, "clear()"),
									createTextVNode(": ")
								], -1)),
								createVNode(unref(KCode), { block: "" }, {
									default: withCtx(() => [createTextVNode(toDisplayString(customAdapterSnippet))]),
									_: 1
								}),
								_cache[24] || (_cache[24] = createElementVNode("p", { class: "t-body" }, [
									createTextVNode(" Append "),
									createElementVNode("code", { class: "t-code" }, "?persist=memory"),
									createTextVNode(" to this page's URL (or use the switch above) to see a custom adapter at work. The snapshot lives in a plain JS closure. The stack survives in-tab navigation; a full reload resets it. ")
								], -1))
							]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "api" }, {
							default: withCtx(() => [..._cache[25] || (_cache[25] = [
								createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" Public API"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium" }, "Three always-on methods")
								], -1),
								createElementVNode("p", { class: "t-body" }, [
									createElementVNode("code", { class: "t-code" }, "useCommentSecret"),
									createTextVNode("'s "),
									createElementVNode("code", { class: "t-code" }, "extractComments()"),
									createTextVNode(" walks the live stack and returns an array of threads with anchor metadata plus messages — same shape as the "),
									createElementVNode("code", { class: "t-code" }, "kk:comment"),
									createTextVNode(" event payload. "),
									createElementVNode("code", { class: "t-code" }, "copyComments()"),
									createTextVNode(" returns the same array and writes pretty-printed JSON to the clipboard. "),
									createElementVNode("code", { class: "t-code" }, "useCommentStore"),
									createTextVNode("'s "),
									createElementVNode("code", { class: "t-code" }, "clear()"),
									createTextVNode(" wipes the adapter and reloads. ")
								], -1),
								createElementVNode("p", { class: "t-body" }, "Three buttons in the inspector run each method against this page. Open the browser console first; output lands there.", -1)
							])]),
							_: 1
						}),
						createVNode(unref(KBookSection), { id: "anchor" }, {
							default: withCtx(() => [..._cache[26] || (_cache[26] = [
								createElementVNode("h2", { class: "t-display" }, [
									createTextVNode(" Anchor metadata"),
									createElementVNode("br"),
									createElementVNode("span", { class: "t-display--medium" }, "How highlights find their way home")
								], -1),
								createElementVNode("p", { class: "t-body" }, [
									createTextVNode(" Each thread mirrors the selection that made it. "),
									createElementVNode("code", { class: "t-code" }, "useCommentFlow"),
									createTextVNode(" writes "),
									createElementVNode("code", { class: "t-code" }, "data-kk-anchor-quote"),
									createTextVNode(", "),
									createElementVNode("code", { class: "t-code" }, "-prefix"),
									createTextVNode(", "),
									createElementVNode("code", { class: "t-code" }, "-suffix"),
									createTextVNode(", and "),
									createElementVNode("code", { class: "t-code" }, "-section-slug"),
									createTextVNode(" onto the thread at draft commit. "),
									createElementVNode("code", { class: "t-code" }, "useCommentStore"),
									createTextVNode("'s restore reads those attributes, finds the section, walks text nodes for the first single-node match, and wraps it as "),
									createElementVNode("code", { class: "t-code" }, "<span class=\"highlight\" data-comment-id=\"…\">"),
									createTextVNode(". ")
								], -1),
								createElementVNode("p", { class: "t-body" }, [
									createTextVNode(" Selections that crossed element boundaries on first wrap (across a "),
									createElementVNode("code", { class: "t-code" }, "<strong>"),
									createTextVNode(", for example) restore as a single-node match only. The thread restores intact; the doc-side highlight is partially lost. Same trade-off as the pre-2.0 kit.js implementation this composable replaces. ")
								], -1)
							])]),
							_: 1
						}),
						createVNode(unref(KSignoff), {
							stats: signoffStats,
							author: "Konstantin Konstantinopolskii",
							role: "founder",
							org: "kk.consulting",
							stamp: "2026-07-20, comment persistence demo.",
							"signature-src": "../../signature.svg"
						})
					], 512),
					createElementVNode("aside", {
						ref_key: "inspectorRef",
						ref: inspectorRef,
						class: "inspector",
						"aria-label": "Comments"
					}, [createVNode(unref(KInspectorGroup), null, {
						default: withCtx(() => [createVNode(unref(KCard), { variant: "interactive" }, {
							default: withCtx(() => [createVNode(unref(KCardHeading), {
								title: "How to use this page",
								subtitle: "Highlight any sentence on the left to draft a comment. Reload to see persistence. Switch modes via the links above the doc, or edit the URL directly."
							}), createVNode(unref(KCardCollapsible), null, {
								default: withCtx(() => [createVNode(unref(KList), {
									ordered: "",
									items: howToSteps
								})]),
								_: 1
							})]),
							_: 1
						}), createVNode(unref(KCard), {
							variant: "interactive",
							id: "api-panel"
						}, {
							default: withCtx(() => [createVNode(unref(KCardHeading), {
								title: "Run the public API",
								subtitle: "Output lands in the browser console. Open it before clicking."
							}), createVNode(unref(KCardCollapsible), null, {
								default: withCtx(() => [
									_cache[30] || (_cache[30] = createElementVNode("p", { class: "t-body" }, "Each button runs against the current state of the comment stack on this page.", -1)),
									createVNode(unref(KButton), { onClick: onExtract }, {
										default: withCtx(() => [..._cache[27] || (_cache[27] = [createTextVNode("Extract comments", -1)])]),
										_: 1
									}),
									createVNode(unref(KButton), { onClick: onCopy }, {
										default: withCtx(() => [..._cache[28] || (_cache[28] = [createTextVNode("Copy as JSON", -1)])]),
										_: 1
									}),
									createVNode(unref(KButton), {
										primary: "",
										onClick: unref(clear)
									}, {
										default: withCtx(() => [..._cache[29] || (_cache[29] = [createTextVNode("Clear and reload", -1)])]),
										_: 1
									}, 8, ["onClick"])
								]),
								_: 1
							})]),
							_: 1
						})]),
						_: 1
					}), createVNode(unref(KCommentStack))], 512)
				]),
				_: 1
			});
		};
	}
});
//#endregion
export { comments_demo_default as default };
