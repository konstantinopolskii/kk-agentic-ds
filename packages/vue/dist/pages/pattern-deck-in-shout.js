import { createBlock, createElementVNode, defineComponent, onBeforeUnmount, onMounted, openBlock, ref, unref, withCtx } from "vue";
import { KCard, useDeck } from "@konstantinopolskii/vue";
//#endregion
//#region sfc/pages/pattern-deck-in-shout.vue
var pattern_deck_in_shout_default = /* @__PURE__ */ defineComponent({
	__name: "pattern-deck-in-shout",
	setup(__props) {
		const deckEl = ref(null);
		let dispose;
		onMounted(() => {
			if (deckEl.value) dispose = useDeck(deckEl.value);
		});
		onBeforeUnmount(() => dispose?.());
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(KCard), { variant: "shout" }, {
				default: withCtx(() => [createElementVNode("div", {
					class: "deck",
					ref_key: "deckEl",
					ref: deckEl
				}, [..._cache[0] || (_cache[0] = [
					createElementVNode("div", { class: "deck-card active" }, [
						createElementVNode("p", { class: "t-caption--bold" }, "Monochrome"),
						createElementVNode("p", { class: "t-caption" }, "Pure black on white. Nine tokens, no brand."),
						createElementVNode("button", {
							class: "tag deck-card__select",
							type: "button"
						}, "Choose")
					], -1),
					createElementVNode("div", { class: "deck-card" }, [
						createElementVNode("p", { class: "t-caption--bold" }, "Muted warm"),
						createElementVNode("p", { class: "t-caption" }, "Same tokens, 2% warm tint in neutrals."),
						createElementVNode("button", {
							class: "tag deck-card__select",
							type: "button"
						}, "Choose")
					], -1),
					createElementVNode("div", { class: "deck-card" }, [
						createElementVNode("p", { class: "t-caption--bold" }, "Cool gray"),
						createElementVNode("p", { class: "t-caption" }, "Slight blue cast in the neutral scale."),
						createElementVNode("button", {
							class: "tag deck-card__select",
							type: "button"
						}, "Choose")
					], -1),
					createElementVNode("div", { class: "deck-card" }, [
						createElementVNode("p", { class: "t-caption--bold" }, "High contrast"),
						createElementVNode("p", { class: "t-caption" }, "Pure black text, borders at 20%."),
						createElementVNode("button", {
							class: "tag deck-card__select",
							type: "button"
						}, "Choose")
					], -1),
					createElementVNode("div", { class: "deck-card" }, [
						createElementVNode("p", { class: "t-caption--bold" }, "Ink"),
						createElementVNode("p", { class: "t-caption" }, "Inverted. White on black. Full system."),
						createElementVNode("button", {
							class: "tag deck-card__select",
							type: "button"
						}, "Choose")
					], -1)
				])], 512)]),
				_: 1
			});
		};
	}
});
//#endregion
export { pattern_deck_in_shout_default as default };
