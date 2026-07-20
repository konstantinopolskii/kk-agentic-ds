import { Fragment, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, openBlock, unref, withCtx } from "vue";
import { KApp, KCard, KCardHeading, KInspector, KInspectorGroup, KSidebar, KSidebarNav, renderMarkdown } from "@konstantinopolskii/vue";
//#region ../../skills/kk-design-system/manifesto.md?raw
var manifesto_default$1 = "# The Agentic Design System\n\nA design system for AI-assisted product work. A thin set of components, rules, and role skills that ship coherent screens before human review. Three readers: the maintainer shipping tags, the pipeline agent loading canon at role spawn, the human at the repo root discovering the system.\n\nAgentic because AI does most of the drafting. The rules here exist so a junior agent, or a junior human, ships work that reads as finished before anyone opens it.\n\n## Why this exists\n\nFour layers stack inside every screen we ship.\n\n- Meanings. What we say. Voice, labels, job stories.\n- Perception. What the reader sees first. Signal, hierarchy, contrast.\n- Matter. What we render. Components, tokens, grid.\n- Pipeline. How we work on it. Stages, role skills, gates.\n\nEach layer has canonical rules. Each layer has a file. The manifesto is the opening read; the other canon files are the rest of the library.\n\nThree names for the shape of a finished screen: signal, noise, magic.\n\n- Signal. What the user came here for. Obvious under a second.\n- Noise. Everything else. Isolated, demoted, or removed.\n- Magic. Not placed. Emerges after signal is clear and noise is gone. Last step, never first.\n\nAfter this read, we know which book to open next, and why.\n\n## Philosophy\n\nA product is a document. The document is the UI. The system treats both as one object.\n\nRules are canonical. The reading is prose. This is a book, not a spec.\n\n## Principles\n\nSix principles. One short paragraph each. Everything downstream leans on them.\n\n### Pure signal\n\nUtilitarian modernism, not postmodern complexity. Effort spent decoding the interface is proportional to how bad it is. Beauty is a side effect of clarity.\n\n### Expected patterns\n\nKnown patterns cost nothing. Fighting them raises cognitive load for no gain. Red button cancels. X closes. Back arrow goes back. Hamburger opens navigation. No reinventing what every reader already recognizes.\n\n### Eighty / twenty\n\nPrimary signal takes 80% of visual weight. Secondary fits in 20%. Fractal. Applies to screen, panel, card, row. Empty space counts toward the 80%.\n\n### Chunking\n\nWorking memory handles about seven items. Past seven, scanning degrades into a wall. When a collection grows past seven, break it into categories. Each category becomes its own shorter list. Fractal. Applies to nav groups, token tables, decision trees, checklists.\n\n### Radical contrast\n\nGray mush is the default AI failure mode: muted everything, contrast nowhere, signal lost. The cure is hypertrophied contrast. Hero 66 px against body 22 px. One distinction step between two elements: bold vs regular, or big vs small, or black vs muted. Never all three at once.\n\n### The iPad feel\n\nThree panes in one frame, each with its own scroll. Only the middle column moves during reading. Soft corners on every surface inside. Crisp edges outside, where the document meets the screen. No skeuomorphism, no liquid glass. No drop shadows, gradients, glass, or blur, except for active elements rendered on a black or inverted background where a soft shadow is permitted as material affordance. The floating action button at narrow viewports qualifies because its rest state sits on a black background.\n\n## Job stories\n\nJob stories, not user stories. A user hires a product for a job; the frame is the hire, not the persona. One priority job per screen. Secondary scenarios are isolated or hidden until requested.\n\nFormula: `context + motivation = step → value`.\n\nAnti-pattern: designing from a component first, then inventing a job to justify it.\n\nExample. Voice transcription during an interview. Context: the interviewer cannot look away. Motivation: do not lose the question. Step: glance. Value: keep flow. So the screen is huge question cards that swipe themselves, every control hidden.\n\n## Time to value\n\nPath length is measured in time to the first insight, not clicks. A principle shaping design decisions, not a KPI tracked on a dashboard. Cut steps where possible. Deliver value before the first tap when possible. The fastest path from land to insight wins, regardless of click count.\n\n## Agents\n\nRole skills drive the pipelines that live in this kit. Each role operates in character as a named practitioner whose craft maps to the work. Two pipelines today: `kk-design-system` (11 roles, ships UI prototypes) and `kk-charter-system` (9 roles, ships per-direction strategic charters). Five roles are shared. Short roster here; full detail at `pipeline/pipeline.md § Role roster`.\n\nShared across both pipelines:\n\n- Margaret Hamilton, analyst, stage 1. Apollo-era decomposition rigor refuses to ship unspecified paths.\n- Steve Jobs, fresh-eyes jobstory, stages 3a and 3c. Reads as the intended user with a 0.2-second clarity bar.\n- George Orwell, voice, stage 6c (kk-ds) / 6b (kk-charter). Six rules for clear prose, ancestor of the AI-tells inventory.\n- Erika Hall, meta-reviewer, stage 7. Rubric-gated critique that rejects \"it's fine\".\n- Joan Didion, meta-retro, on demand. Observes the pattern that was there all along.\n\nSpecific to `kk-design-system`:\n\n- Paula Scher, design director, stage 2. Brings multiple directions, commits to one, writes the direction doc.\n- Susan Kare, designer, stage 3b. Answers every fresh-eyes question in full, by hand, no state skipped.\n- Muriel Cooper, DS manager, stage 4. Catalogues designer hand-offs into a component list and a task split.\n- Sara Soueidan, design engineer, stage 5. Ships piece by piece, honors the kit, saves each piece as it lands.\n- Steve Jobs, consistency-jobstory, stage 6a. Same 0.2-second bar on the built prototype.\n- Dieter Rams, consistency-DS, stage 6b. Ten Principles eye, flags inventory drift on sight.\n- Jina Anne, pattern discoverer, post-pipeline. Cataloguer whose craft is naming systems.\n- Rachel Andrew, maintainer. Spec revisions with bundle discipline, tag and push before close.\n\nSpecific to `kk-charter-system`:\n\n- Tina Brown, charter director, stage 2. Reshapes a portfolio of categories before the writers finish protesting; locks the direction map.\n- Janet Malcolm, charter writer, stage 3b (×N parallel). Builds each direction's charter from documentary evidence, cites every claim, refuses gloss.\n- Indra Nooyi, portfolio manager, stage 4. Pulled PepsiCo's portfolio into one ranking; same craft consolidates dates and conflicts across charters.\n- Jan Tschichold, consistency-charter, stage 6a. Penguin Books's compositional grammar — refuses drift between directions on the same imprint.\n\n## Pipeline\n\nEight stages across three phases. Think (stages 1–2) produces approved intent plus direction with per-pattern tasks. Design (stages 3a–3c, N designers in parallel) produces high-fidelity per-pattern answers to fresh-eyes questions. Build (stages 4–7) produces a shipping prototype, three cold-read audits across jobstory, DS, voice, plus strict meta-review. Meta-retro runs on demand; reiterate-from-any-stage is user-triggered.\n\nEvery kit-touching session starts by picking a path. Read `pipeline/pipeline.md § Entry point matching — the recipe map` before code touches disk. Default is the full walk; deviations need a stamp. Architectural impact picks the recipe, not diff size — a three-line CSS edit can still walk the canon path if it changes structural behavior.\n\nFull stages, gates, inputs, outputs at `pipeline/pipeline.md`.\n\nA sibling pipeline lives in this kit: `kk-charter-system` ships per-direction strategic charters instead of UI prototypes. Same eight-stage shape, same gating discipline, five shared roles. Orchestrator + manifesto + pipeline at `../kk-charter-system/`.\n\n## Navigation\n\nPattern-first reading order. Start at patterns because a layout composes from patterns first; drill into components only when a pattern uses a part we need to customize.\n\n- `canon/patterns.md`. Start here for layout composition. Three-column shell, product shells with their density rhythm, card stack, narrow mobile, plus the full pattern registry.\n- `canon/components.md`. Drill from a pattern into its parts. Foundations, component inventory, forbidden list, typography rhythm.\n- `canon/voice.md`. Words the system speaks. Shape rules, label discipline, the AI-tells inventory.\n- `pipeline/pipeline.md`. How sessions run. Eight stages, eleven role skills, entry-point matching.\n- `pipeline/protocols.md`. Ship, bundle, semver, evolve, backlog, ideation. Maintainer rules for kit evolution.\n- `tokens.json`. Machine-readable source of truth for color, space, radii, type, motion.\n- `../kk-charter-system/`. Sibling pipeline that ships strategic charters; orchestrator, manifesto, pipeline. Five roles shared with this one.\n\nEvery canon doc ships signed. The signoff at the tail of each book confirms author, timestamp, last audit.\n\n## Signoff\n\n<div class=\"book__signoff\">\n  <div class=\"book__signoff-stats\">\n    <div class=\"stat t-caption\">\n      <div><span class=\"t-caption--bold\">200</span> lines from 685.</div>\n    </div>\n    <div class=\"stat t-caption\">\n      <div><span class=\"t-caption--bold\">9</span> sections, one sitting.</div>\n    </div>\n  </div>\n  <div class=\"book__signoff-signature\">\n    <p class=\"t-caption\">\n      Signed by <span class=\"t-caption--bold\">Konstantin Konstantinopolskii,</span><br />\n      founder at <span class=\"t-caption--bold\">kk.consulting</span><br />\n      <span class=\"t-muted\">2026-04-24, content-architecture session.</span>\n    </p>\n    <img class=\"book__signoff-signature-img\" src=\"signature.svg\" alt=\"Signature\" />\n  </div>\n</div>\n";
//#endregion
//#region sfc/pages/manifesto.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["innerHTML"];
var _hoisted_2 = {
	class: "fab fab--nav",
	"data-view-target": "nav",
	type: "button",
	"aria-label": "Open the sidebar"
};
var _hoisted_3 = {
	width: "18",
	height: "14",
	viewBox: "0 0 18 14",
	fill: "none",
	"aria-hidden": "true",
	innerHTML: "<rect width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"/><rect y=\"6\" width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"/><rect y=\"12\" width=\"18\" height=\"2\" rx=\"1\" fill=\"currentColor\"/>"
};
//#endregion
//#region sfc/pages/manifesto.vue
var manifesto_default = /* @__PURE__ */ defineComponent({
	__name: "manifesto",
	setup(__props) {
		const bookHtml = renderMarkdown(manifesto_default$1, { headingOffset: 0 });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createVNode(unref(KApp), { view: "doc" }, {
					default: withCtx(() => [
						createVNode(unref(KSidebar), null, {
							footer: withCtx(() => [..._cache[0] || (_cache[0] = [
								createTextVNode("2026, fuckgrechka.ru", -1),
								createElementVNode("br", null, null, -1),
								createTextVNode("Powered by kk.consulting", -1)
							])]),
							default: withCtx(() => [_cache[1] || (_cache[1] = createElementVNode("div", { class: "sidebar__header t-title" }, [
								createTextVNode("Agentic"),
								createElementVNode("br"),
								createTextVNode("Design\xA0System")
							], -1)), createVNode(unref(KSidebarNav))]),
							_: 1
						}),
						createElementVNode("main", {
							class: "book",
							id: "doc",
							innerHTML: unref(bookHtml)
						}, null, 8, _hoisted_1),
						createVNode(unref(KInspector), { label: "Open a book" }, {
							default: withCtx(() => [createVNode(unref(KInspectorGroup), null, {
								default: withCtx(() => [
									createVNode(unref(KCard), { variant: "heading" }, {
										default: withCtx(() => [..._cache[2] || (_cache[2] = [createElementVNode("h2", { class: "t-display" }, "Open a book", -1)])]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./doc.html?src=./skills/kk-design-system/canon/patterns.md"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Patterns",
											subtitle: "When composing any layout, start here. Three columns, card stack, narrow mobile."
										}), _cache[3] || (_cache[3] = createElementVNode("span", { class: "button t-subtitle" }, "Browse patterns", -1))]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./doc.html?src=./skills/kk-design-system/canon/components.md"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Components",
											subtitle: "When drilling from a pattern into a part, find every foundation, component, and forbidden thing."
										}), _cache[4] || (_cache[4] = createElementVNode("span", { class: "button t-subtitle" }, "Find a component", -1))]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./doc.html?src=./skills/kk-design-system/canon/voice.md"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Voice",
											subtitle: "When writing a string, find shape rules and the AI-tells inventory in one place."
										}), _cache[5] || (_cache[5] = createElementVNode("span", { class: "button t-subtitle" }, "Read the voice guide", -1))]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./doc.html?src=./skills/kk-design-system/pipeline/pipeline.md"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Pipeline",
											subtitle: "When entering or evaluating a session, find stages, role roster, and communication protocol."
										}), _cache[6] || (_cache[6] = createElementVNode("span", { class: "button t-subtitle" }, "Walk the pipeline", -1))]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./doc.html?src=./skills/kk-design-system/pipeline/protocols.md"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Protocols",
											subtitle: "When shipping, evolving, or logging an exception, find bundle, semver, evolve, backlog, ideation."
										}), _cache[7] || (_cache[7] = createElementVNode("span", { class: "button t-subtitle" }, "Check the protocols", -1))]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./skills/kk-design-system/tokens.json"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Tokens",
											subtitle: "When code needs a design token, read the machine-readable source of truth."
										}), _cache[8] || (_cache[8] = createElementVNode("span", { class: "button t-subtitle" }, "Inspect tokens", -1))]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./doc.html?src=./references/registry.md"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Reference registry",
											subtitle: "Twelve measured studies behind the 1.12.0 components. Common moves, taxonomy, mappings."
										}), _cache[9] || (_cache[9] = createElementVNode("span", { class: "button t-subtitle" }, "Study the references", -1))]),
										_: 1
									})
								]),
								_: 1
							}), createVNode(unref(KInspectorGroup), null, {
								default: withCtx(() => [
									createVNode(unref(KCard), { variant: "heading" }, {
										default: withCtx(() => [..._cache[10] || (_cache[10] = [createElementVNode("h2", { class: "t-display" }, "Demos", -1)])]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./demos/fundamental--accepted/index.html"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Fundamental",
											subtitle: "Live component inventory. Deep-link target for every canon class."
										}), _cache[11] || (_cache[11] = createElementVNode("span", { class: "button t-subtitle" }, "Tour the inventory", -1))]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./demos/md-renderer-smoke/index.html"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Renderer smoke",
											subtitle: "Side-by-side markdown render vs source. Ship-time check for the .md pipeline."
										}), _cache[12] || (_cache[12] = createElementVNode("span", { class: "button t-subtitle" }, "Run the smoke test", -1))]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./demos/comments/index.html"
									}, {
										default: withCtx(() => [..._cache[13] || (_cache[13] = [createElementVNode("div", { class: "card__heading" }, [createElementVNode("h3", { class: "t-title" }, "Comment persistence"), createElementVNode("p", { class: "t-caption" }, [
											createTextVNode("Highlight, comment, reload. "),
											createElementVNode("code", { class: "t-code" }, "localStorage"),
											createTextVNode(" by default; switch off or pass a custom adapter.")
										])], -1), createElementVNode("span", { class: "button t-subtitle" }, "Try the loop", -1)])]),
										_: 1
									}),
									createVNode(unref(KCard), {
										variant: "link",
										href: "./demos/generated/index.html"
									}, {
										default: withCtx(() => [createVNode(unref(KCardHeading), {
											title: "Reference recreations",
											subtitle: "Fourteen product surfaces rebuilt in kit vocabulary: dashboards, feeds, landings, blogpost, news front."
										}), _cache[14] || (_cache[14] = createElementVNode("span", { class: "button t-subtitle" }, "Open the gallery", -1))]),
										_: 1
									})
								]),
								_: 1
							})]),
							_: 1
						})
					]),
					_: 1
				}),
				createElementVNode("button", _hoisted_2, [(openBlock(), createElementBlock("svg", _hoisted_3))]),
				_cache[15] || (_cache[15] = createElementVNode("button", {
					class: "fab fab--inspector",
					"data-view-target": "inspector",
					type: "button",
					"aria-label": "Open a book"
				}, [createElementVNode("span", { class: "fab__count" }, "11")], -1))
			], 64);
		};
	}
});
//#endregion
export { manifesto_default as default };
