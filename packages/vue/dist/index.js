import { Fragment, Teleport, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, guardReactiveProps, inject, mergeProps, nextTick, normalizeClass, normalizeProps, normalizeStyle, onBeforeUnmount, onMounted, openBlock, provide, ref, renderList, renderSlot, resolveDynamicComponent, toDisplayString, unref, watch, withCtx } from "vue";
//#endregion
//#region sfc/components/KTag.vue
var KTag_default = /* @__PURE__ */ defineComponent({
	__name: "KTag",
	props: { bold: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", { class: normalizeClass(__props.bold ? "tag tag--bold" : "tag") }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region sfc/components/KAvatar.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$43 = { class: "avatar" };
//#endregion
//#region sfc/components/KAvatar.vue
var KAvatar_default = /* @__PURE__ */ defineComponent({
	__name: "KAvatar",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", _hoisted_1$43, [renderSlot(_ctx.$slots, "default")]);
		};
	}
});
//#endregion
//#region sfc/components/KQuote.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$42 = { class: "quote" };
var _hoisted_2$23 = { key: 0 };
//#endregion
//#region sfc/components/KQuote.vue
var KQuote_default = /* @__PURE__ */ defineComponent({
	__name: "KQuote",
	props: { cite: { default: "" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("blockquote", _hoisted_1$42, [renderSlot(_ctx.$slots, "default"), __props.cite ? (openBlock(), createElementBlock("cite", _hoisted_2$23, toDisplayString(__props.cite), 1)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region sfc/components/KDivider.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$41 = { class: "divider" };
//#endregion
//#region sfc/components/KDivider.vue
var KDivider_default = /* @__PURE__ */ defineComponent({
	__name: "KDivider",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("hr", _hoisted_1$41);
		};
	}
});
//#endregion
//#region sfc/components/KList.vue
var KList_default = /* @__PURE__ */ defineComponent({
	__name: "KList",
	props: {
		ordered: {
			type: Boolean,
			default: false
		},
		items: { default: null }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.ordered ? "ol" : "ul"), { class: "t-list" }, {
				default: withCtx(() => [_ctx.$slots.default ? renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 0) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(__props.items || [], (item, i) => {
					return openBlock(), createElementBlock("li", { key: i }, toDisplayString(item), 1);
				}), 128))]),
				_: 3
			});
		};
	}
});
//#endregion
//#region sfc/components/KCode.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$40 = {
	key: 0,
	class: "t-code t-code--block"
};
var _hoisted_2$22 = {
	key: 1,
	class: "t-code"
};
//#endregion
//#region sfc/components/KCode.vue
var KCode_default = /* @__PURE__ */ defineComponent({
	__name: "KCode",
	props: { block: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		return (_ctx, _cache) => {
			return __props.block ? (openBlock(), createElementBlock("pre", _hoisted_1$40, [renderSlot(_ctx.$slots, "default")])) : (openBlock(), createElementBlock("span", _hoisted_2$22, [renderSlot(_ctx.$slots, "default")]));
		};
	}
});
//#endregion
//#region sfc/components/KFigure.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$39 = { class: "figure" };
var _hoisted_2$21 = { key: 0 };
//#endregion
//#region sfc/components/KFigure.vue
var KFigure_default = /* @__PURE__ */ defineComponent({
	__name: "KFigure",
	props: { caption: { default: "" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("figure", _hoisted_1$39, [renderSlot(_ctx.$slots, "default"), __props.caption ? (openBlock(), createElementBlock("figcaption", _hoisted_2$21, toDisplayString(__props.caption), 1)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region sfc/components/KButton.vue
var KButton_default = /* @__PURE__ */ defineComponent({
	__name: "KButton",
	props: {
		primary: {
			type: Boolean,
			default: false
		},
		as: { default: "button" },
		type: { default: "button" },
		cta: { default: null },
		caption: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.as), {
				class: normalizeClass("button" + (__props.primary ? " button--primary" : "") + (__props.caption ? " t-caption--bold" : " t-subtitle")),
				type: __props.as === "button" ? __props.type : void 0,
				"data-cta": __props.cta ?? void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"class",
				"type",
				"data-cta"
			]);
		};
	}
});
//#endregion
//#region sfc/components/KChip.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$38 = ["aria-pressed"];
//#endregion
//#region sfc/components/KChip.vue
var KChip_default = /* @__PURE__ */ defineComponent({
	__name: "KChip",
	props: {
		pressed: {
			type: Boolean,
			default: false
		},
		value: { default: void 0 }
	},
	emits: ["click"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const group = inject("kk-chip-group", null);
		function onClick(e) {
			if (group && props.value !== void 0) group.select(props.value);
			emit("click", e);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("button", {
				class: "chip",
				type: "button",
				"aria-pressed": (unref(group) && __props.value !== void 0 ? unref(group).selected.value === __props.value : __props.pressed) ? "true" : "false",
				onClick
			}, [renderSlot(_ctx.$slots, "default")], 8, _hoisted_1$38);
		};
	}
});
//#endregion
//#region sfc/components/KChipWrap.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$37 = { class: "chip-wrap" };
//#endregion
//#region sfc/components/KChipWrap.vue
var KChipWrap_default = /* @__PURE__ */ defineComponent({
	__name: "KChipWrap",
	props: { modelValue: { default: void 0 } },
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		provide("kk-chip-group", {
			selected: computed(() => props.modelValue),
			select: (value) => emit("update:modelValue", value)
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$37, [renderSlot(_ctx.$slots, "default")]);
		};
	}
});
//#endregion
//#region sfc/components/KField.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$36 = {
	key: 0,
	class: "t-caption--bold field__label"
};
var _hoisted_2$20 = {
	key: 1,
	class: "field__fake-caret",
	"aria-hidden": "true"
};
//#endregion
//#region sfc/components/KField.vue
var KField_default = /* @__PURE__ */ defineComponent({
	__name: "KField",
	props: {
		label: { default: "" },
		modelValue: { default: "" },
		placeholder: { default: "" },
		type: { default: "text" },
		textarea: {
			type: Boolean,
			default: false
		},
		row: {
			type: Boolean,
			default: false
		},
		fakeCaret: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		function onInput(e) {
			emit("update:modelValue", e.target.value);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("label", { class: normalizeClass(__props.row ? "field field--row" : "field") }, [
				__props.label ? (openBlock(), createElementBlock("span", _hoisted_1$36, toDisplayString(__props.label), 1)) : createCommentVNode("", true),
				(openBlock(), createBlock(resolveDynamicComponent(__props.textarea ? "textarea" : "input"), {
					class: "t-caption field__input",
					type: __props.textarea ? void 0 : __props.type,
					value: __props.modelValue,
					placeholder: __props.placeholder || void 0,
					onInput
				}, null, 40, [
					"type",
					"value",
					"placeholder"
				])),
				__props.fakeCaret ? (openBlock(), createElementBlock("span", _hoisted_2$20)) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
//#region sfc/components/KFieldRow.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$35 = { class: "field field--row" };
var _hoisted_2$19 = { class: "t-caption--bold field__label" };
var _hoisted_3$15 = { class: "t-caption field__value" };
//#endregion
//#region sfc/components/KFieldRow.vue
var KFieldRow_default = /* @__PURE__ */ defineComponent({
	__name: "KFieldRow",
	props: {
		label: {},
		value: { default: "" }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$35, [createElementVNode("span", _hoisted_2$19, toDisplayString(__props.label), 1), createElementVNode("span", _hoisted_3$15, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.value), 1)])])]);
		};
	}
});
//#endregion
//#region sfc/components/KSwitch.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$34 = { class: "switch" };
var _hoisted_2$18 = ["checked"];
var _hoisted_3$14 = { class: "t-caption" };
//#endregion
//#region sfc/components/KSwitch.vue
var KSwitch_default = /* @__PURE__ */ defineComponent({
	__name: "KSwitch",
	props: {
		label: {},
		modelValue: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		function onChange(e) {
			emit("update:modelValue", e.target.checked);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("label", _hoisted_1$34, [
				createElementVNode("input", {
					class: "switch__input",
					type: "checkbox",
					checked: __props.modelValue,
					onChange
				}, null, 40, _hoisted_2$18),
				_cache[0] || (_cache[0] = createElementVNode("span", { class: "switch__track" }, null, -1)),
				createElementVNode("span", _hoisted_3$14, toDisplayString(__props.label), 1)
			]);
		};
	}
});
//#endregion
//#region sfc/components/KCard.vue
var KCard_default = /* @__PURE__ */ defineComponent({
	__name: "KCard",
	props: {
		variant: { default: "static" },
		href: { default: "" },
		tight: {
			type: Boolean,
			default: false
		},
		selectable: {
			type: Boolean,
			default: false
		},
		state: { default: null },
		span: { default: null },
		lead: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const variantClass = {
			static: "",
			interactive: " card--interactive",
			link: " card--link",
			shout: " card--shout",
			heading: " card--heading"
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.variant === "link" ? "a" : __props.variant === "heading" ? "header" : "div"), {
				class: normalizeClass("card" + variantClass[__props.variant] + (__props.selectable ? " card--selectable" : "") + (__props.tight ? " card--tight" : "") + (__props.span ? ` panel--${__props.span}` : "") + (__props.lead ? " front__lead" : "")),
				href: __props.variant === "link" ? __props.href : void 0,
				"data-state": __props.variant === "interactive" && __props.state ? __props.state : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"class",
				"href",
				"data-state"
			]);
		};
	}
});
//#endregion
//#region sfc/components/KCardHeading.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$33 = { class: "card__heading" };
var _hoisted_2$17 = { class: "t-title" };
//#endregion
//#region sfc/components/KCardHeading.vue
var KCardHeading_default = /* @__PURE__ */ defineComponent({
	__name: "KCardHeading",
	props: {
		title: {},
		subtitle: { default: "" },
		muted: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$33, [createElementVNode("h3", _hoisted_2$17, toDisplayString(__props.title), 1), __props.subtitle ? (openBlock(), createElementBlock("p", {
				key: 0,
				class: normalizeClass(__props.muted ? "t-caption t-muted" : "t-caption")
			}, toDisplayString(__props.subtitle), 3)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region sfc/components/KCardBody.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$32 = { class: "card__body" };
//#endregion
//#region sfc/components/KCardBody.vue
var KCardBody_default = /* @__PURE__ */ defineComponent({
	__name: "KCardBody",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$32, [renderSlot(_ctx.$slots, "default")]);
		};
	}
});
//#endregion
//#region sfc/components/KCardCollapsible.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$31 = { class: "card__collapsible" };
var _hoisted_2$16 = { class: "card__collapsible-inner" };
var _hoisted_3$13 = {
	key: 1,
	class: "card__body"
};
//#endregion
//#region sfc/components/KCardCollapsible.vue
var KCardCollapsible_default = /* @__PURE__ */ defineComponent({
	__name: "KCardCollapsible",
	props: { flush: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$31, [createElementVNode("div", _hoisted_2$16, [__props.flush ? renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 0) : (openBlock(), createElementBlock("div", _hoisted_3$13, [renderSlot(_ctx.$slots, "default")]))])]);
		};
	}
});
//#endregion
//#region sfc/components/KCardStack.vue
var KCardStack_default = /* @__PURE__ */ defineComponent({
	__name: "KCardStack",
	props: { columns: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(__props.columns ? "card-stack card-stack--columns" : "card-stack") }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region sfc/components/KMetric.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$30 = { class: "metric" };
var _hoisted_2$15 = { class: "metric__value" };
var _hoisted_3$12 = {
	key: 0,
	class: "metric__label"
};
var _hoisted_4$6 = {
	key: 1,
	class: "metric__delta"
};
//#endregion
//#region sfc/components/KMetric.vue
var KMetric_default = /* @__PURE__ */ defineComponent({
	__name: "KMetric",
	props: {
		value: {},
		label: { default: "" },
		delta: { default: "" }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$30, [
				createElementVNode("p", _hoisted_2$15, toDisplayString(__props.value), 1),
				__props.label ? (openBlock(), createElementBlock("p", _hoisted_3$12, toDisplayString(__props.label), 1)) : createCommentVNode("", true),
				__props.delta ? (openBlock(), createElementBlock("p", _hoisted_4$6, toDisplayString(__props.delta), 1)) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
//#region sfc/components/KSpark.vue
var KSpark_default = /* @__PURE__ */ defineComponent({
	__name: "KSpark",
	props: {
		values: {},
		label: {},
		panel: {
			type: Boolean,
			default: false
		},
		soft: { default: () => [] },
		emphasize: { default: null }
	},
	setup(__props) {
		const props = __props;
		function isSoft(i) {
			return props.emphasize !== null ? i !== props.emphasize : props.soft.includes(i);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.panel ? "div" : "span"), {
				class: normalizeClass(__props.panel ? "spark spark--panel" : "spark"),
				role: "img",
				"aria-label": __props.label
			}, {
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.values, (v, i) => {
					return openBlock(), createElementBlock("span", {
						key: i,
						class: normalizeClass(isSoft(i) ? "spark__bar spark__bar--soft" : "spark__bar"),
						style: normalizeStyle({ "--v": `${v}%` })
					}, null, 6);
				}), 128))]),
				_: 1
			}, 8, ["class", "aria-label"]);
		};
	}
});
//#endregion
//#region sfc/components/KSparkLabels.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$29 = { class: "spark-labels" };
//#endregion
//#region sfc/components/KSparkLabels.vue
var KSparkLabels_default = /* @__PURE__ */ defineComponent({
	__name: "KSparkLabels",
	props: { labels: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$29, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.labels, (label, i) => {
				return openBlock(), createElementBlock("span", { key: i }, toDisplayString(label), 1);
			}), 128))]);
		};
	}
});
//#endregion
//#region sfc/components/KDataTable.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$28 = { class: "data-table" };
//#endregion
//#region sfc/components/KDataTable.vue
var KDataTable_default = /* @__PURE__ */ defineComponent({
	__name: "KDataTable",
	props: { columns: {} },
	setup(__props) {
		function col(c) {
			return typeof c === "string" ? { label: c } : c;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("table", _hoisted_1$28, [createElementVNode("thead", null, [createElementVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (c, i) => {
				return openBlock(), createElementBlock("th", mergeProps({
					key: i,
					scope: "col"
				}, { ref_for: true }, col(c).num ? { class: "data-table__num" } : {}), toDisplayString(col(c).label), 17);
			}), 128))])]), createElementVNode("tbody", null, [renderSlot(_ctx.$slots, "default")])]);
		};
	}
});
//#endregion
//#region sfc/components/KDataCell.vue
var KDataCell_default = /* @__PURE__ */ defineComponent({
	__name: "KDataCell",
	props: {
		lead: {
			type: Boolean,
			default: false
		},
		num: {
			type: Boolean,
			default: false
		},
		delta: {
			type: Boolean,
			default: false
		},
		flat: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const cls = computed(() => props.lead ? "data-table__lead" : props.delta ? `data-table__num data-table__delta${props.flat ? " data-table__delta--flat" : ""}` : props.num ? "data-table__num" : void 0);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("td", normalizeProps(guardReactiveProps(cls.value ? { class: cls.value } : {})), [renderSlot(_ctx.$slots, "default")], 16);
		};
	}
});
//#endregion
//#region sfc/components/KSpecList.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$27 = { class: "book__spec-key" };
//#endregion
//#region sfc/components/KSpecList.vue
var KSpecList_default = /* @__PURE__ */ defineComponent({
	__name: "KSpecList",
	props: {
		variant: { default: "plain" },
		rows: {}
	},
	setup(__props) {
		const classes = {
			plain: "book__spec",
			value: "book__spec book__spec--value",
			triple: "book__spec book__spec--triple"
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("dl", { class: normalizeClass(classes[__props.variant]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.rows, (row, i) => {
				return openBlock(), createElementBlock("div", {
					key: i,
					class: "book__spec-row"
				}, [createElementVNode("dt", _hoisted_1$27, toDisplayString(row.key), 1), (openBlock(true), createElementBlock(Fragment, null, renderList(row.values, (value, j) => {
					return openBlock(), createElementBlock("dd", {
						key: j,
						class: "book__spec-value"
					}, toDisplayString(value), 1);
				}), 128))]);
			}), 128))], 2);
		};
	}
});
//#endregion
//#region sfc/components/KStat.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$26 = { class: "stat t-caption" };
var _hoisted_2$14 = { class: "t-caption--bold" };
//#endregion
//#region sfc/components/KStat.vue
var KStat_default = /* @__PURE__ */ defineComponent({
	__name: "KStat",
	props: {
		value: {},
		text: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$26, [createElementVNode("div", null, [createElementVNode("span", _hoisted_2$14, toDisplayString(__props.value), 1), createTextVNode(" " + toDisplayString(__props.text), 1)])]);
		};
	}
});
//#endregion
//#region sfc/components/KSignoff.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$25 = { class: "book__signoff" };
var _hoisted_2$13 = { class: "book__signoff-stats" };
var _hoisted_3$11 = { class: "book__signoff-signature" };
var _hoisted_4$5 = { class: "t-caption" };
var _hoisted_5$5 = { class: "t-caption--bold" };
var _hoisted_6$3 = { class: "t-caption--bold" };
var _hoisted_7$2 = { class: "t-muted" };
var _hoisted_8 = ["src"];
//#endregion
//#region sfc/components/KSignoff.vue
var KSignoff_default = /* @__PURE__ */ defineComponent({
	__name: "KSignoff",
	props: {
		stats: {},
		author: {},
		role: {},
		org: {},
		stamp: {},
		signatureSrc: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$25, [createElementVNode("div", _hoisted_2$13, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.stats, (stat, i) => {
				return openBlock(), createBlock(KStat_default, {
					key: i,
					value: stat.value,
					text: stat.text
				}, null, 8, ["value", "text"]);
			}), 128))]), createElementVNode("div", _hoisted_3$11, [createElementVNode("p", _hoisted_4$5, [
				_cache[0] || (_cache[0] = createTextVNode("Signed by ", -1)),
				createElementVNode("span", _hoisted_5$5, toDisplayString(__props.author) + ",", 1),
				_cache[1] || (_cache[1] = createElementVNode("br", null, null, -1)),
				createTextVNode(toDisplayString(__props.role) + " at ", 1),
				createElementVNode("span", _hoisted_6$3, toDisplayString(__props.org), 1),
				_cache[2] || (_cache[2] = createElementVNode("br", null, null, -1)),
				createElementVNode("span", _hoisted_7$2, toDisplayString(__props.stamp), 1)
			]), createElementVNode("img", {
				class: "book__signoff-signature-img",
				src: __props.signatureSrc,
				alt: "Signature"
			}, null, 8, _hoisted_8)])]);
		};
	}
});
//#endregion
//#region sfc/components/KPreviewFrame.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$24 = { class: "preview-frame" };
var _hoisted_2$12 = ["src", "title"];
//#endregion
//#region sfc/components/KPreviewFrame.vue
var KPreviewFrame_default = /* @__PURE__ */ defineComponent({
	__name: "KPreviewFrame",
	props: {
		src: {},
		title: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$24, [createElementVNode("iframe", {
				class: "preview-frame__iframe",
				src: __props.src,
				title: __props.title,
				loading: "lazy"
			}, null, 8, _hoisted_2$12)]);
		};
	}
});
//#endregion
//#region sfc/components/KRegistryTable.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$23 = { class: "registry-table" };
//#endregion
//#region sfc/components/KRegistryTable.vue
var KRegistryTable_default = /* @__PURE__ */ defineComponent({
	__name: "KRegistryTable",
	props: { columns: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("table", _hoisted_1$23, [createElementVNode("thead", null, [createElementVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (label, i) => {
				return openBlock(), createElementBlock("th", {
					key: i,
					class: "t-caption"
				}, toDisplayString(label), 1);
			}), 128))])]), createElementVNode("tbody", null, [renderSlot(_ctx.$slots, "default")])]);
		};
	}
});
//#endregion
//#region sfc/components/KMedia.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$22 = {
	key: 1,
	class: "media__figure media__figure--square"
};
var _hoisted_2$11 = {
	key: 2,
	class: "avatar media__figure"
};
var _hoisted_3$10 = { class: "media__body" };
var _hoisted_4$4 = { class: "t-caption--bold" };
var _hoisted_5$4 = {
	key: 3,
	class: "tag media__trail"
};
var _hoisted_6$2 = {
	key: 4,
	class: "media__trail"
};
//#endregion
//#region sfc/components/KMedia.vue
var KMedia_default = /* @__PURE__ */ defineComponent({
	__name: "KMedia",
	props: {
		title: {},
		meta: { default: "" },
		micro: {
			type: Boolean,
			default: false
		},
		href: { default: "" },
		initials: { default: "" },
		square: {
			type: Boolean,
			default: false
		},
		trailTag: { default: "" }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.href ? "a" : "div"), {
				class: "media",
				href: __props.href ? __props.href : void 0
			}, {
				default: withCtx(() => [
					_ctx.$slots.figure ? renderSlot(_ctx.$slots, "figure", {}, void 0, void 0, 0) : __props.square ? (openBlock(), createElementBlock("span", _hoisted_1$22)) : (openBlock(), createElementBlock("span", _hoisted_2$11, toDisplayString(__props.initials || void 0), 1)),
					createElementVNode("div", _hoisted_3$10, [createElementVNode("p", _hoisted_4$4, toDisplayString(__props.title), 1), __props.meta ? (openBlock(), createElementBlock("p", {
						key: 0,
						class: normalizeClass(__props.micro ? "t-micro t-muted" : "t-caption t-muted")
					}, toDisplayString(__props.meta), 3)) : createCommentVNode("", true)]),
					__props.trailTag ? (openBlock(), createElementBlock("span", _hoisted_5$4, toDisplayString(__props.trailTag), 1)) : _ctx.$slots.trail ? (openBlock(), createElementBlock("div", _hoisted_6$2, [renderSlot(_ctx.$slots, "trail")])) : createCommentVNode("", true)
				]),
				_: 3
			}, 8, ["href"]);
		};
	}
});
//#endregion
//#region sfc/composables/useModal.ts
function useModal(isOpen, setOpen, dialogRef) {
	let opener = null;
	function focusables(dialog) {
		return Array.prototype.filter.call(dialog.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])"), (el) => el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	}
	function anyOpen() {
		return !!document.querySelector(".modal[data-state=\"open\"]");
	}
	function onKeydown(e) {
		if (e.key === "Escape") {
			e.preventDefault();
			setOpen(false);
			return;
		}
		if (e.key !== "Tab") return;
		const dialog = dialogRef.value;
		if (!dialog) return;
		const f = focusables(dialog);
		if (!f.length) {
			e.preventDefault();
			return;
		}
		const first = f[0];
		const last = f[f.length - 1];
		const active = document.activeElement;
		if (!dialog.contains(active)) {
			e.preventDefault();
			first.focus();
		} else if (e.shiftKey && active === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && active === last) {
			e.preventDefault();
			first.focus();
		}
	}
	function onRootClick(e) {
		if (e.target.closest("[data-modal-close]")) setOpen(false);
	}
	function open() {
		opener = document.activeElement;
		document.documentElement.style.overflow = "hidden";
		document.addEventListener("keydown", onKeydown);
		const dialog = dialogRef.value;
		if (!dialog) return;
		const f = focusables(dialog);
		if (f.length) f[0].focus();
		else {
			if (!dialog.hasAttribute("tabindex")) dialog.setAttribute("tabindex", "-1");
			dialog.focus();
		}
	}
	function close() {
		document.removeEventListener("keydown", onKeydown);
		if (!anyOpen()) document.documentElement.style.overflow = "";
		if (opener && typeof opener.focus === "function" && opener.isConnected) opener.focus();
		opener = null;
	}
	watch(isOpen, (v) => v ? open() : close(), { flush: "post" });
	onMounted(() => {
		if (isOpen()) open();
	});
	onBeforeUnmount(() => {
		document.removeEventListener("keydown", onKeydown);
	});
	return { onRootClick };
}
//#endregion
//#region sfc/components/KModal.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$21 = [
	"id",
	"data-state",
	"aria-hidden"
];
var _hoisted_2$10 = ["aria-labelledby"];
var _hoisted_3$9 = { class: "modal__heading" };
var _hoisted_4$3 = ["id"];
var _hoisted_5$3 = {
	key: 0,
	class: "t-caption t-muted"
};
var _hoisted_6$1 = { class: "modal__body" };
var _hoisted_7$1 = {
	key: 0,
	class: "modal__foot"
};
//#endregion
//#region sfc/components/KModal.vue
var KModal_default = /* @__PURE__ */ defineComponent({
	__name: "KModal",
	props: {
		id: {},
		title: { default: "" },
		subtitle: { default: "" },
		modelValue: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const titleId = computed(() => props.id + "-t");
		const mounted = ref(false);
		onMounted(() => {
			mounted.value = true;
		});
		const dialogRef = ref(null);
		const { onRootClick } = useModal(() => props.modelValue, (value) => emit("update:modelValue", value), dialogRef);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Teleport, {
				to: "body",
				disabled: !mounted.value
			}, [createElementVNode("div", {
				id: __props.id,
				class: "modal",
				"data-state": __props.modelValue ? "open" : "closed",
				"aria-hidden": __props.modelValue ? "false" : "true",
				onClick: _cache[0] || (_cache[0] = (...args) => unref(onRootClick) && unref(onRootClick)(...args))
			}, [_cache[2] || (_cache[2] = createElementVNode("div", {
				class: "modal__scrim",
				"data-modal-close": ""
			}, null, -1)), createElementVNode("div", {
				ref_key: "dialogRef",
				ref: dialogRef,
				class: "modal__dialog",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": titleId.value
			}, [
				_cache[1] || (_cache[1] = createElementVNode("button", {
					class: "modal__close",
					"data-modal-close": "",
					"aria-label": "Close"
				}, "×", -1)),
				createElementVNode("div", _hoisted_3$9, [createElementVNode("h3", {
					class: "t-title",
					id: titleId.value
				}, toDisplayString(__props.title), 9, _hoisted_4$3), __props.subtitle ? (openBlock(), createElementBlock("p", _hoisted_5$3, toDisplayString(__props.subtitle), 1)) : createCommentVNode("", true)]),
				createElementVNode("div", _hoisted_6$1, [renderSlot(_ctx.$slots, "default")]),
				_ctx.$slots.foot ? (openBlock(), createElementBlock("div", _hoisted_7$1, [renderSlot(_ctx.$slots, "foot")])) : createCommentVNode("", true)
			], 8, _hoisted_2$10)], 8, _hoisted_1$21)], 8, ["disabled"]);
		};
	}
});
//#endregion
//#region sfc/composables/useDropdown.ts
function useDropdown(isOpen, close, rootRef) {
	function focusTrigger() {
		rootRef.value?.querySelector(".dropdown__trigger")?.focus();
	}
	function onDocClick(e) {
		if (!isOpen()) return;
		const root = rootRef.value;
		if (root && !root.contains(e.target)) close();
	}
	function onKeydown(e) {
		if (e.key === "Escape") {
			if (!isOpen()) return;
			close();
			focusTrigger();
			return;
		}
		if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
			if (!isOpen()) return;
			const pop = rootRef.value?.querySelector(".dropdown__popover[data-state=\"open\"]");
			if (!pop || !(e.target instanceof Node) || !pop.contains(e.target)) return;
			const list = Array.from(rootRef.value?.querySelectorAll(".dropdown__item") ?? []);
			if (!list.length) return;
			e.preventDefault();
			const i = list.indexOf(document.activeElement);
			let next;
			if (e.key === "Home") next = 0;
			else if (e.key === "End") next = list.length - 1;
			else if (e.key === "ArrowDown") next = i < 0 ? 0 : (i + 1) % list.length;
			else next = i <= 0 ? list.length - 1 : i - 1;
			list[next].focus();
		}
	}
	onMounted(() => {
		document.addEventListener("click", onDocClick);
		document.addEventListener("keydown", onKeydown);
	});
	onBeforeUnmount(() => {
		document.removeEventListener("click", onDocClick);
		document.removeEventListener("keydown", onKeydown);
	});
}
//#endregion
//#region sfc/components/KDropdown.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$20 = ["aria-expanded"];
var _hoisted_2$9 = ["data-state"];
var _hoisted_3$8 = ["onClick"];
//#endregion
//#region sfc/components/KDropdown.vue
var KDropdown_default = /* @__PURE__ */ defineComponent({
	__name: "KDropdown",
	props: {
		label: { default: "Options" },
		items: { default: () => [] }
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const open = ref(false);
		const rootRef = ref(null);
		function toggle() {
			open.value = !open.value;
		}
		function norm(it) {
			return typeof it === "string" ? {
				label: it,
				value: it
			} : it;
		}
		function choose(it) {
			emit("select", it);
			open.value = false;
			nextTick(() => rootRef.value?.querySelector(".dropdown__trigger")?.focus());
		}
		watch(open, (is) => {
			if (!is) return;
			nextTick(() => {
				if (open.value) rootRef.value?.querySelector(".dropdown__item")?.focus();
			});
		});
		useDropdown(() => open.value, () => {
			open.value = false;
		}, rootRef);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "rootRef",
				ref: rootRef,
				class: "dropdown",
				"data-dropdown": ""
			}, [renderSlot(_ctx.$slots, "trigger", {
				open: open.value,
				toggle
			}, () => [createElementVNode("button", {
				class: "dropdown__trigger button t-subtitle",
				"aria-haspopup": "menu",
				"aria-expanded": open.value ? "true" : "false",
				onClick: toggle
			}, toDisplayString(__props.label), 9, _hoisted_1$20)]), createElementVNode("div", {
				class: "dropdown__popover",
				role: "menu",
				"data-state": open.value ? "open" : "closed"
			}, [renderSlot(_ctx.$slots, "default", {}, () => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (it, i) => {
				return openBlock(), createElementBlock("button", {
					key: i,
					class: "dropdown__item",
					role: "menuitem",
					type: "button",
					onClick: ($event) => choose(it)
				}, toDisplayString(norm(it).label), 9, _hoisted_3$8);
			}), 128))])], 8, _hoisted_2$9)], 512);
		};
	}
});
//#endregion
//#region sfc/composables/useTabs.ts
function useTabs(listRef, select) {
	function onKeydown(e) {
		const list = listRef.value;
		if (!list) return;
		const target = e.target.closest?.(".tabs__tab");
		if (!target) return;
		const tabs = Array.from(list.querySelectorAll(".tabs__tab"));
		const i = tabs.indexOf(target);
		if (i === -1) return;
		let next = null;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				next = tabs[(i + 1) % tabs.length];
				break;
			case "ArrowLeft":
			case "ArrowUp":
				next = tabs[(i - 1 + tabs.length) % tabs.length];
				break;
			case "Home":
				next = tabs[0];
				break;
			case "End":
				next = tabs[tabs.length - 1];
				break;
			default: return;
		}
		e.preventDefault();
		select(tabs.indexOf(next));
		next.focus();
	}
	return { onKeydown };
}
//#endregion
//#region sfc/components/KTabs.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$19 = {
	class: "tabs",
	"data-tabs": ""
};
var _hoisted_2$8 = [
	"id",
	"aria-controls",
	"aria-selected",
	"onClick"
];
var _hoisted_3$7 = [
	"id",
	"aria-labelledby",
	"hidden"
];
//#endregion
//#region sfc/components/KTabs.vue
var KTabs_default = /* @__PURE__ */ defineComponent({
	__name: "KTabs",
	props: {
		id: {},
		tabs: {},
		modelValue: { default: 0 }
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const selected = ref(props.modelValue);
		watch(() => props.modelValue, (v) => {
			selected.value = v;
		});
		function select(i) {
			selected.value = i;
			emit("update:modelValue", i);
		}
		const listRef = ref(null);
		const { onKeydown } = useTabs(listRef, select);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$19, [createElementVNode("div", {
				ref_key: "listRef",
				ref: listRef,
				class: "tabs__list",
				role: "tablist",
				onKeydown: _cache[0] || (_cache[0] = (...args) => unref(onKeydown) && unref(onKeydown)(...args))
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.tabs, (tab, i) => {
				return openBlock(), createElementBlock("button", {
					key: i,
					id: `${__props.id}-t${i}`,
					class: "tabs__tab",
					role: "tab",
					"aria-controls": `${__props.id}-p${i}`,
					"aria-selected": i === selected.value ? "true" : "false",
					onClick: ($event) => select(i)
				}, toDisplayString(tab.label), 9, _hoisted_2$8);
			}), 128))], 544), (openBlock(true), createElementBlock(Fragment, null, renderList(__props.tabs, (_, i) => {
				return openBlock(), createElementBlock("div", {
					key: i,
					id: `${__props.id}-p${i}`,
					class: "tabs__panel",
					role: "tabpanel",
					"aria-labelledby": `${__props.id}-t${i}`,
					hidden: i !== selected.value
				}, [renderSlot(_ctx.$slots, `panel-${i}`)], 8, _hoisted_3$7);
			}), 128))]);
		};
	}
});
//#endregion
//#region sfc/components/KTooltip.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$18 = ["data-state"];
var uid = 0;
var closeActive = null;
//#endregion
//#region sfc/components/KTooltip.vue
var KTooltip_default = /* @__PURE__ */ defineComponent({
	__name: "KTooltip",
	props: {
		text: { default: "" },
		label: { default: "?" }
	},
	setup(__props) {
		const bubbleId = `tooltip-${uid += 1}-b`;
		const open = ref(false);
		const rootEl = ref(null);
		function hide() {
			open.value = false;
			if (closeActive === hide) closeActive = null;
		}
		function show() {
			if (closeActive && closeActive !== hide) closeActive();
			open.value = true;
			closeActive = hide;
		}
		function onFocusOut(e) {
			const related = e.relatedTarget;
			if (related && rootEl.value?.contains(related)) return;
			hide();
		}
		function onKeydown(e) {
			if (e.key === "Escape") hide();
		}
		onMounted(() => document.addEventListener("keydown", onKeydown));
		onBeforeUnmount(() => {
			document.removeEventListener("keydown", onKeydown);
			hide();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				ref_key: "rootEl",
				ref: rootEl,
				class: "tooltip",
				"data-tooltip": "",
				onMouseenter: show,
				onMouseleave: hide,
				onFocusin: show,
				onFocusout: onFocusOut
			}, [createElementVNode("button", {
				class: "tooltip__trigger",
				type: "button",
				"aria-describedby": bubbleId
			}, [renderSlot(_ctx.$slots, "trigger", {}, () => [createTextVNode(toDisplayString(__props.label), 1)])]), createElementVNode("span", {
				class: "tooltip__bubble",
				role: "tooltip",
				id: bubbleId,
				"data-state": open.value ? "open" : "closed"
			}, toDisplayString(__props.text), 9, _hoisted_1$18)], 544);
		};
	}
});
//#endregion
//#region sfc/components/KToast.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$17 = {
	class: "toast",
	"data-state": "open",
	role: "status"
};
var _hoisted_2$7 = { class: "toast__text" };
var _hoisted_3$6 = {
	key: 0,
	class: "toast__action",
	type: "button"
};
//#endregion
//#region sfc/components/KToast.vue
var KToast_default = /* @__PURE__ */ defineComponent({
	__name: "KToast",
	props: {
		text: {},
		action: { default: "" }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$17, [
				createElementVNode("span", _hoisted_2$7, toDisplayString(__props.text), 1),
				__props.action ? (openBlock(), createElementBlock("button", _hoisted_3$6, toDisplayString(__props.action), 1)) : createCommentVNode("", true),
				_cache[0] || (_cache[0] = createElementVNode("button", {
					class: "toast__close",
					type: "button",
					"aria-label": "Dismiss"
				}, "×", -1))
			]);
		};
	}
});
//#endregion
//#region sfc/components/KPagination.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$16 = {
	class: "pagination",
	"aria-label": "Pagination"
};
var _hoisted_2$6 = ["disabled"];
var _hoisted_3$5 = {
	key: 0,
	class: "pagination__gap",
	"aria-hidden": "true"
};
var _hoisted_4$2 = ["aria-current", "onClick"];
var _hoisted_5$2 = ["disabled"];
//#endregion
//#region sfc/components/KPagination.vue
var KPagination_default = /* @__PURE__ */ defineComponent({
	__name: "KPagination",
	props: {
		pages: {},
		current: { default: 1 },
		window: { default: 5 }
	},
	emits: ["change", "update:current"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		function range(a, b) {
			const out = [];
			for (let i = a; i <= b; i++) out.push(i);
			return out;
		}
		const pageItems = computed(() => {
			const pages = props.pages;
			const current = props.current;
			const win = Math.max(1, props.window);
			if (pages <= win + 2) return range(1, pages);
			const half = Math.floor(win / 2);
			let start = Math.max(2, current - half);
			const end = Math.min(pages - 1, start + win - 1);
			start = Math.max(2, end - win + 1);
			const items = [1];
			if (start > 2) items.push("gap");
			for (let i = start; i <= end; i++) items.push(i);
			if (end < pages - 1) items.push("gap");
			items.push(pages);
			return items;
		});
		function go(page) {
			emit("change", page);
			emit("update:current", page);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("nav", _hoisted_1$16, [
				createElementVNode("button", {
					class: "pagination__edge",
					"data-dir": "prev",
					"aria-label": "Previous page",
					type: "button",
					disabled: __props.current <= 1,
					onClick: _cache[0] || (_cache[0] = ($event) => __props.current > 1 && go(__props.current - 1))
				}, null, 8, _hoisted_2$6),
				(openBlock(true), createElementBlock(Fragment, null, renderList(pageItems.value, (item, idx) => {
					return openBlock(), createElementBlock(Fragment, { key: idx }, [item === "gap" ? (openBlock(), createElementBlock("span", _hoisted_3$5, "…")) : (openBlock(), createElementBlock("button", {
						key: 1,
						class: "pagination__page",
						type: "button",
						"aria-current": item === __props.current ? "page" : void 0,
						onClick: ($event) => go(item)
					}, toDisplayString(item), 9, _hoisted_4$2))], 64);
				}), 128)),
				createElementVNode("button", {
					class: "pagination__edge",
					"data-dir": "next",
					"aria-label": "Next page",
					type: "button",
					disabled: __props.current >= __props.pages,
					onClick: _cache[1] || (_cache[1] = ($event) => __props.current < __props.pages && go(__props.current + 1))
				}, null, 8, _hoisted_5$2)
			]);
		};
	}
});
//#endregion
//#region sfc/components/KCommentNew.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$15 = { class: "card card--shout comment-new" };
var _hoisted_2$5 = { class: "card__heading" };
var _hoisted_3$4 = { class: "t-title" };
//#endregion
//#region sfc/components/KCommentNew.vue
var KCommentNew_default = /* @__PURE__ */ defineComponent({
	__name: "KCommentNew",
	props: {
		title: { default: "Add a comment" },
		placeholder: { default: "Type a comment" },
		modelValue: { default: "" },
		commitLabel: { default: "Commit" }
	},
	emits: ["update:modelValue", "commit"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$15, [
				createElementVNode("div", _hoisted_2$5, [createElementVNode("h3", _hoisted_3$4, toDisplayString(__props.title), 1)]),
				createVNode(KField_default, {
					textarea: "",
					placeholder: __props.placeholder,
					"model-value": __props.modelValue,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", $event))
				}, null, 8, ["placeholder", "model-value"]),
				createElementVNode("button", {
					class: "button button--primary t-subtitle",
					type: "button",
					onClick: _cache[1] || (_cache[1] = ($event) => emit("commit", __props.modelValue))
				}, toDisplayString(__props.commitLabel), 1)
			]);
		};
	}
});
//#endregion
//#region sfc/components/KCommentThread.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$14 = ["data-state", "data-archived"];
var _hoisted_2$4 = { class: "card__heading" };
var _hoisted_3$3 = { class: "t-title" };
var _hoisted_4$1 = { class: "card__collapsible" };
var _hoisted_5$1 = { class: "card__collapsible-inner" };
var _hoisted_6 = ["data-message-id", "data-author-role"];
var _hoisted_7 = { class: "t-caption" };
//#endregion
//#region sfc/components/KCommentThread.vue
var KCommentThread_default = /* @__PURE__ */ defineComponent({
	__name: "KCommentThread",
	props: {
		title: {},
		state: { default: "minimized" },
		archived: {
			type: Boolean,
			default: false
		},
		messages: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "card card--interactive comment-thread",
				"data-state": __props.state,
				"data-archived": __props.archived ? "true" : void 0
			}, [createElementVNode("div", _hoisted_2$4, [createElementVNode("h3", _hoisted_3$3, toDisplayString(__props.title), 1)]), createElementVNode("div", _hoisted_4$1, [createElementVNode("div", _hoisted_5$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.messages, (msg) => {
				return openBlock(), createElementBlock("div", {
					key: msg.id,
					class: "comment-msg",
					"data-message-id": msg.id,
					"data-author-role": msg.role === "agent" ? "agent" : void 0
				}, [createElementVNode("p", _hoisted_7, toDisplayString(msg.body), 1)], 8, _hoisted_6);
			}), 128))])])], 8, _hoisted_1$14);
		};
	}
});
//#endregion
//#region sfc/components/KCommentStack.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$13 = { class: "comment-stack" };
//#endregion
//#region sfc/components/KCommentStack.vue
var KCommentStack_default = /* @__PURE__ */ defineComponent({
	__name: "KCommentStack",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$13, [renderSlot(_ctx.$slots, "default")]);
		};
	}
});
//#endregion
//#region sfc/composables/useColumnReveal.ts
var COLUMNS = [
	{
		selector: ".book",
		keyframe: "reveal-from-below"
	},
	{
		selector: ".sidebar",
		keyframe: "reveal-from-left"
	},
	{
		selector: ".inspector",
		keyframe: "reveal-from-right"
	}
];
var STAGGER_STEP_MS = 48;
var STAGGER_CAP = 12;
var COLUMN_OFFSET_MS = 160;
function useColumnReveal(app) {
	function revealColumn(col, baseDelay) {
		const column = app.querySelector(col.selector);
		if (!column) return;
		if (getComputedStyle(column).display === "none") return;
		const children = column.children;
		for (let i = 0; i < children.length; i++) {
			const el = children[i];
			const delay = baseDelay + Math.min(i, STAGGER_CAP) * STAGGER_STEP_MS;
			el.style.animation = "none";
			el.offsetWidth;
			el.style.animation = `${col.keyframe} var(--dur-long) var(--ease-swing) ${delay}ms both`;
		}
	}
	function isVisible(selector) {
		const el = app.querySelector(selector);
		return !!(el && getComputedStyle(el).display !== "none");
	}
	const wasVisible = {};
	COLUMNS.forEach((col) => {
		wasVisible[col.selector] = isVisible(col.selector);
	});
	const observer = new MutationObserver(() => {
		COLUMNS.forEach((col) => {
			const now = isVisible(col.selector);
			if (now && !wasVisible[col.selector]) revealColumn(col, 0);
			wasVisible[col.selector] = now;
		});
	});
	observer.observe(app, {
		attributes: true,
		attributeFilter: ["data-view"]
	});
	let cascadeIndex = 0;
	COLUMNS.forEach((col) => {
		if (!isVisible(col.selector)) return;
		revealColumn(col, cascadeIndex * COLUMN_OFFSET_MS);
		cascadeIndex++;
	});
	return function dispose() {
		observer.disconnect();
	};
}
//#endregion
//#region sfc/composables/useNarrowView.ts
function useNarrowView(app) {
	function onDocClick(e) {
		const el = e.target.closest("[data-view-target]");
		if (!el) return;
		const target = el.getAttribute("data-view-target");
		if (!target) return;
		const next = app.getAttribute("data-view") === target && target !== "doc" ? "doc" : target;
		app.setAttribute("data-view", next);
	}
	const toc = app.querySelector("#toc");
	function onTocClick(e) {
		if (e.target.closest("a[href^=\"#\"]")) app.setAttribute("data-view", "doc");
	}
	document.addEventListener("click", onDocClick);
	toc?.addEventListener("click", onTocClick);
	return function dispose() {
		document.removeEventListener("click", onDocClick);
		toc?.removeEventListener("click", onTocClick);
	};
}
//#endregion
//#region sfc/components/KApp.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$12 = ["data-view"];
//#endregion
//#region sfc/components/KApp.vue
var KApp_default = /* @__PURE__ */ defineComponent({
	__name: "KApp",
	props: {
		view: { default: "doc" },
		behavior: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => {
			switch (props.view) {
				case "single": return "app app--single";
				case "panels": return "app app--panels";
				case "front": return "app app--front";
				default: return "app";
			}
		});
		const rootEl = ref(null);
		let disposeColumnReveal;
		let disposeNarrowView;
		onMounted(() => {
			if (!props.behavior || !rootEl.value) return;
			disposeColumnReveal = useColumnReveal(rootEl.value);
			disposeNarrowView = useNarrowView(rootEl.value);
		});
		onBeforeUnmount(() => {
			disposeColumnReveal?.();
			disposeNarrowView?.();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "rootEl",
				ref: rootEl,
				class: normalizeClass(classes.value),
				"data-view": __props.view === "doc" ? "doc" : void 0
			}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_1$12);
		};
	}
});
//#endregion
//#region sfc/components/KBook.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$11 = ["id"];
//#endregion
//#region sfc/components/KBook.vue
var KBook_default = /* @__PURE__ */ defineComponent({
	__name: "KBook",
	props: { id: { default: "doc" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("main", {
				class: "book",
				id: __props.id
			}, [renderSlot(_ctx.$slots, "default")], 8, _hoisted_1$11);
		};
	}
});
//#endregion
//#region sfc/components/KBookSection.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$10 = ["id"];
//#endregion
//#region sfc/components/KBookSection.vue
var KBookSection_default = /* @__PURE__ */ defineComponent({
	__name: "KBookSection",
	props: { id: { default: "" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("article", {
				class: "book__section",
				id: __props.id || void 0
			}, [renderSlot(_ctx.$slots, "default")], 8, _hoisted_1$10);
		};
	}
});
//#endregion
//#region sfc/components/KSidebar.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$9 = {
	class: "sidebar",
	"aria-label": "Navigation"
};
var _hoisted_2$3 = {
	key: 0,
	class: "sidebar__header t-title"
};
var _hoisted_3$2 = {
	key: 1,
	class: "sidebar__footer t-caption"
};
//#endregion
//#region sfc/components/KSidebar.vue
var KSidebar_default = /* @__PURE__ */ defineComponent({
	__name: "KSidebar",
	props: { title: { default: "" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("aside", _hoisted_1$9, [
				__props.title ? (openBlock(), createElementBlock("div", _hoisted_2$3, toDisplayString(__props.title), 1)) : createCommentVNode("", true),
				renderSlot(_ctx.$slots, "default"),
				_ctx.$slots.footer ? (openBlock(), createElementBlock("footer", _hoisted_3$2, [renderSlot(_ctx.$slots, "footer")])) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
//#region sfc/composables/useScrollSpy.ts
function slugify(text) {
	return (text || "").toLowerCase().replace(/[–—]/g, "-").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}
var glideIds$1 = /* @__PURE__ */ new WeakMap();
function glideScroll$1(el, target, duration) {
	const startTop = el.scrollTop;
	const distance = target - startTop;
	if (Math.abs(distance) < 1) return;
	const startTime = performance.now();
	const myId = (glideIds$1.get(el) ?? 0) + 1;
	glideIds$1.set(el, myId);
	function step(now) {
		if (glideIds$1.get(el) !== myId) return;
		const elapsed = now - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3);
		el.scrollTop = startTop + distance * eased;
		if (progress < 1) requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}
function getPrimaryHeading(section) {
	return section.querySelector("h1, h2, h3");
}
function headingLabel(h) {
	if (!h) return "";
	let label = "";
	for (let i = 0; i < h.childNodes.length; i++) {
		const n = h.childNodes[i];
		if (n.nodeName === "BR") break;
		label += n.textContent || "";
	}
	return label.trim();
}
function stampHeadingIds(book) {
	book.querySelectorAll("article.book__section").forEach((section) => {
		if (!section.id) {
			const h = getPrimaryHeading(section);
			if (h) {
				const id = slugify(headingLabel(h));
				if (id) section.id = id;
			}
		}
		section.querySelectorAll(":scope > h2, :scope > h3").forEach((h) => {
			if (!h.id) {
				const id = slugify(headingLabel(h));
				if (id) h.id = id;
			}
		});
	});
}
function buildSidebarToc(book, nav) {
	if (nav.getAttribute("data-nav") === "manual") return;
	stampHeadingIds(book);
	const topSections = Array.from(book.querySelectorAll(":scope > article.book__section"));
	if (topSections.length === 0) return;
	function topHeadingTag(section) {
		const h = getPrimaryHeading(section);
		return h ? h.tagName : null;
	}
	const multiH1 = topSections.filter((s) => topHeadingTag(s) === "H1").length >= 2;
	const anyH3 = topSections.some((s) => s.querySelector(":scope > h3") !== null);
	let indicator = nav.querySelector(".toc__indicator");
	Array.from(nav.children).forEach((child) => {
		if (child !== indicator) nav.removeChild(child);
	});
	if (!indicator) {
		indicator = document.createElement("span");
		indicator.className = "toc__indicator";
		indicator.setAttribute("aria-hidden", "true");
		nav.appendChild(indicator);
	}
	function makeGroup(headLabel, headHref, items) {
		const section = document.createElement("section");
		section.className = "nav-group";
		if (headLabel && headHref) {
			const head = document.createElement("a");
			head.className = "t-subtitle nav-group__head";
			head.setAttribute("href", "#" + headHref);
			head.textContent = headLabel;
			section.appendChild(head);
		}
		if (items && items.length) {
			const ul = document.createElement("ul");
			ul.className = "nav-group__items";
			items.forEach((it) => {
				if (!it.label || !it.href) return;
				const li = document.createElement("li");
				li.className = "t-caption";
				const a = document.createElement("a");
				a.setAttribute("href", "#" + it.href);
				a.textContent = it.label;
				li.appendChild(a);
				ul.appendChild(li);
			});
			if (ul.children.length) section.appendChild(ul);
		}
		return section;
	}
	if (multiH1) topSections.forEach((s) => {
		const primary = getPrimaryHeading(s);
		if (!primary || primary.tagName !== "H1") return;
		const label = headingLabel(primary);
		const href = s.id;
		if (!href || !label) return;
		const items = Array.from(s.querySelectorAll("article.book__section")).map((inner) => {
			const h = getPrimaryHeading(inner);
			if (!h || h.tagName !== "H2") return null;
			return {
				label: headingLabel(h),
				href: inner.id
			};
		}).filter((it) => !!it);
		nav.appendChild(makeGroup(label, href, items));
	});
	else if (anyH3) topSections.forEach((s) => {
		const primary = getPrimaryHeading(s);
		if (!primary) return;
		if (primary.tagName === "H1") return;
		const label = headingLabel(primary);
		const href = s.id;
		if (!href || !label) return;
		const items = Array.from(s.querySelectorAll(":scope > h3")).map((h3) => ({
			label: headingLabel(h3),
			href: h3.id
		})).filter((it) => it.label && it.href);
		nav.appendChild(makeGroup(label, href, items));
	});
	else {
		const items = topSections.map((s) => {
			const primary = getPrimaryHeading(s);
			if (!primary) return null;
			if (primary.tagName === "H1") return null;
			return {
				label: headingLabel(primary),
				href: s.id
			};
		}).filter((it) => !!(it && it.label && it.href));
		if (items.length) nav.appendChild(makeGroup(null, null, items));
	}
}
function initScrollSpy(book, nav) {
	if (!("IntersectionObserver" in window)) return () => {};
	const indicator = nav.querySelector(".toc__indicator");
	function firstAnchoredId() {
		const a = nav.querySelector("a[href^=\"#\"]");
		return a ? a.getAttribute("href").slice(1) : null;
	}
	function anchoredOrFirst(id) {
		if (id && nav.querySelector(`a[href="#${id}"]`)) return id;
		return firstAnchoredId();
	}
	function moveIndicator(activeEl) {
		if (!indicator) return;
		if (!activeEl) {
			indicator.classList.remove("is-positioned");
			return;
		}
		const navRect = nav.getBoundingClientRect();
		const elRect = activeEl.getBoundingClientRect();
		const top = elRect.top - navRect.top;
		indicator.style.transform = `translate3d(0,${top}px,0)`;
		indicator.style.height = elRect.height + "px";
		if (!indicator.classList.contains("is-positioned")) {
			indicator.classList.add("is-positioned");
			requestAnimationFrame(() => {
				indicator.classList.add("is-tracking");
			});
		}
	}
	function scrollActiveIntoView(activeEl) {
		if (!activeEl) return;
		const sidebar = activeEl.closest(".sidebar");
		if (!sidebar || getComputedStyle(sidebar).display === "none") return;
		const group = activeEl.closest(".nav-group") || activeEl;
		const sRect = sidebar.getBoundingClientRect();
		const gRect = group.getBoundingClientRect();
		if (gRect.top >= sRect.top && gRect.bottom <= sRect.bottom) return;
		let delta;
		if (gRect.top < sRect.top || gRect.height > sRect.height) delta = gRect.top - sRect.top;
		else delta = gRect.bottom - sRect.bottom;
		glideScroll$1(sidebar, sidebar.scrollTop + delta, 320);
	}
	function setActive(id) {
		let activeAnchor = null;
		nav.querySelectorAll("a[href^=\"#\"]").forEach((a) => {
			const on = a.getAttribute("href").slice(1) === id;
			const p = a.parentElement;
			if (p) p.classList.toggle("is-active", on);
			if (on) activeAnchor = a;
		});
		nav.querySelectorAll(".nav-group").forEach((group) => {
			group.classList.toggle("is-active", !!(activeAnchor && group.contains(activeAnchor)));
		});
		moveIndicator(activeAnchor);
		scrollActiveIntoView(activeAnchor);
	}
	const visible = /* @__PURE__ */ new Set();
	let scrollLocked = false;
	let pendingRelease = null;
	let pendingTimeoutId = null;
	function bestVisible() {
		const liveSections = book.querySelectorAll(".book__section");
		for (let i = 0; i < liveSections.length; i++) if (visible.has(liveSections[i].id)) return liveSections[i].id;
		return null;
	}
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) visible.add(entry.target.id);
			else visible.delete(entry.target.id);
		});
		if (scrollLocked) return;
		setActive(anchoredOrFirst(bestVisible()));
	}, {
		root: book,
		rootMargin: "0px 0px -60% 0px",
		threshold: 0
	});
	const firstSections = book.querySelectorAll(".book__section");
	firstSections.forEach((s) => observer.observe(s));
	setActive(anchoredOrFirst(firstSections[0]?.id ?? null));
	function onResize() {
		const activeAnchor = nav.querySelector(".nav-group__items li.is-active > a, .nav-group.is-active > a.nav-group__head");
		if (activeAnchor) moveIndicator(activeAnchor);
	}
	window.addEventListener("resize", onResize);
	function onNavClick(e) {
		const a = e.target.closest("a[href^=\"#\"]");
		if (!a) return;
		const id = a.getAttribute("href").slice(1);
		const target = document.getElementById(id);
		if (!target) return;
		e.preventDefault();
		setActive(id);
		history.replaceState(null, "", "#" + id);
		if (pendingRelease) pendingRelease();
		scrollLocked = true;
		const release = () => {
			if (pendingTimeoutId) clearTimeout(pendingTimeoutId);
			scrollLocked = false;
			book.removeEventListener("scrollend", release);
			book.removeEventListener("wheel", release);
			book.removeEventListener("touchstart", release);
			pendingRelease = null;
			pendingTimeoutId = null;
			setActive(anchoredOrFirst(bestVisible()));
		};
		pendingRelease = release;
		book.addEventListener("scrollend", release, { once: true });
		book.addEventListener("wheel", release, {
			once: true,
			passive: true
		});
		book.addEventListener("touchstart", release, {
			once: true,
			passive: true
		});
		pendingTimeoutId = setTimeout(release, 1500);
		glideScroll$1(book, Math.max(0, book.scrollTop + target.getBoundingClientRect().top - book.getBoundingClientRect().top - 20), 320);
	}
	nav.addEventListener("click", onNavClick);
	return function dispose() {
		observer.disconnect();
		window.removeEventListener("resize", onResize);
		nav.removeEventListener("click", onNavClick);
		if (pendingRelease) pendingRelease();
	};
}
function useScrollSpy(book, nav) {
	buildSidebarToc(book, nav);
	return initScrollSpy(book, nav);
}
//#endregion
//#region sfc/components/KSidebarNav.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$8 = ["id", "data-nav"];
//#endregion
//#region sfc/components/KSidebarNav.vue
var KSidebarNav_default = /* @__PURE__ */ defineComponent({
	__name: "KSidebarNav",
	props: {
		id: { default: "toc" },
		manual: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const rootEl = ref(null);
		let dispose;
		onMounted(() => {
			if (!rootEl.value) return;
			const book = document.querySelector(".book") ?? document.getElementById("doc");
			if (!book) return;
			dispose = useScrollSpy(book, rootEl.value);
		});
		onBeforeUnmount(() => dispose?.());
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("nav", {
				ref_key: "rootEl",
				ref: rootEl,
				class: "sidebar__nav",
				id: __props.id,
				"data-nav": __props.manual ? "manual" : void 0
			}, [_cache[0] || (_cache[0] = createElementVNode("span", {
				class: "toc__indicator",
				"aria-hidden": "true"
			}, null, -1)), renderSlot(_ctx.$slots, "default")], 8, _hoisted_1$8);
		};
	}
});
//#endregion
//#region sfc/components/KNavGroup.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$7 = { class: "nav-group" };
var _hoisted_2$2 = ["href"];
var _hoisted_3$1 = {
	key: 1,
	class: "t-subtitle"
};
var _hoisted_4 = { class: "nav-group__items" };
var _hoisted_5 = ["href", "aria-current"];
//#endregion
//#region sfc/components/KNavGroup.vue
var KNavGroup_default = /* @__PURE__ */ defineComponent({
	__name: "KNavGroup",
	props: {
		head: {},
		href: { default: "" },
		items: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("section", _hoisted_1$7, [__props.href ? (openBlock(), createElementBlock("a", {
				key: 0,
				class: "t-subtitle nav-group__head",
				href: __props.href
			}, toDisplayString(__props.head), 9, _hoisted_2$2)) : (openBlock(), createElementBlock("h4", _hoisted_3$1, toDisplayString(__props.head), 1)), createElementVNode("ul", _hoisted_4, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, i) => {
				return openBlock(), createElementBlock("li", {
					key: i,
					class: "t-caption"
				}, [createElementVNode("a", {
					href: item.href,
					"aria-current": item.current ? "true" : void 0
				}, toDisplayString(item.label), 9, _hoisted_5)]);
			}), 128))])]);
		};
	}
});
//#endregion
//#region sfc/composables/useInspectorStack.ts
var glideIds = /* @__PURE__ */ new WeakMap();
function glideScroll(el, target, duration) {
	const startTop = el.scrollTop;
	const distance = target - startTop;
	if (Math.abs(distance) < 1) return;
	const startTime = performance.now();
	const myId = (glideIds.get(el) ?? 0) + 1;
	glideIds.set(el, myId);
	function step(now) {
		if (glideIds.get(el) !== myId) return;
		const elapsed = now - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3);
		el.scrollTop = startTop + distance * eased;
		if (progress < 1) requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}
function useInspectorStack(inspector) {
	function collapseAllActive() {
		inspector.querySelectorAll(".card--interactive[data-state=\"active\"]").forEach((c) => {
			const collapsible = c.querySelector(".card__collapsible");
			if (collapsible) collapsible.style.transition = "none";
			c.removeAttribute("data-state");
			if (collapsible) {
				collapsible.offsetHeight;
				collapsible.style.transition = "";
			}
		});
	}
	function promoteCard(card) {
		if (card.getAttribute("data-state") !== "active") {
			collapseAllActive();
			card.setAttribute("data-state", "active");
			requestAnimationFrame(() => {
				const focused = document.activeElement;
				if (focused && card.contains(focused) && focused.matches("input, textarea")) focused.blur();
			});
		}
		requestAnimationFrame(() => {
			if (!card.isConnected) return;
			const inspectorRect = inspector.getBoundingClientRect();
			const cardRect = card.getBoundingClientRect();
			const target = inspector.scrollTop + (cardRect.top - inspectorRect.top);
			glideScroll(inspector, Math.max(0, target), 320);
		});
	}
	function handleTrigger(e) {
		const eventTarget = e.target;
		if (eventTarget.closest(".comment__menu, .comment__menu-popover")) return;
		if (eventTarget.closest("a.card, .card--link")) return;
		const card = eventTarget.closest(".card");
		if (!card) {
			if (e.type === "click") collapseAllActive();
			return;
		}
		if (card.classList.contains("card--heading")) return;
		if (card.getAttribute("data-resolved") === "true" || card.getAttribute("data-archived") === "true") return;
		if (card.classList.contains("card--interactive")) promoteCard(card);
		else {
			collapseAllActive();
			const inspectorRect = inspector.getBoundingClientRect();
			const cardRect = card.getBoundingClientRect();
			const target = inspector.scrollTop + (cardRect.top - inspectorRect.top);
			glideScroll(inspector, Math.max(0, target), 320);
		}
	}
	inspector.addEventListener("click", handleTrigger);
	inspector.addEventListener("focusin", handleTrigger);
	return function dispose() {
		inspector.removeEventListener("click", handleTrigger);
		inspector.removeEventListener("focusin", handleTrigger);
	};
}
//#endregion
//#region sfc/components/KInspector.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$6 = ["aria-label"];
//#endregion
//#region sfc/components/KInspector.vue
var KInspector_default = /* @__PURE__ */ defineComponent({
	__name: "KInspector",
	props: { label: { default: "Actions and comments" } },
	setup(__props) {
		const rootEl = ref(null);
		let dispose;
		onMounted(() => {
			if (!rootEl.value) return;
			dispose = useInspectorStack(rootEl.value);
		});
		onBeforeUnmount(() => dispose?.());
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("aside", {
				ref_key: "rootEl",
				ref: rootEl,
				class: "inspector",
				"aria-label": __props.label
			}, [renderSlot(_ctx.$slots, "default")], 8, _hoisted_1$6);
		};
	}
});
//#endregion
//#region sfc/components/KInspectorGroup.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = { class: "inspector__group" };
//#endregion
//#region sfc/components/KInspectorGroup.vue
var KInspectorGroup_default = /* @__PURE__ */ defineComponent({
	__name: "KInspectorGroup",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("section", _hoisted_1$5, [renderSlot(_ctx.$slots, "default")]);
		};
	}
});
//#endregion
//#region sfc/components/KPanels.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = { class: "panels" };
//#endregion
//#region sfc/components/KPanels.vue
var KPanels_default = /* @__PURE__ */ defineComponent({
	__name: "KPanels",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$4, [renderSlot(_ctx.$slots, "default")]);
		};
	}
});
//#endregion
//#region sfc/components/KFront.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = { class: "front" };
//#endregion
//#region sfc/components/KFront.vue
var KFront_default = /* @__PURE__ */ defineComponent({
	__name: "KFront",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$3, [renderSlot(_ctx.$slots, "default")]);
		};
	}
});
//#endregion
//#region sfc/components/KFrontMasthead.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "front__masthead" };
var _hoisted_2$1 = { class: "t-hero" };
var _hoisted_3 = {
	key: 0,
	class: "t-micro t-muted"
};
//#endregion
//#region sfc/components/KFrontMasthead.vue
var KFrontMasthead_default = /* @__PURE__ */ defineComponent({
	__name: "KFrontMasthead",
	props: {
		title: {},
		dateline: { default: "" }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("header", _hoisted_1$2, [createElementVNode("h1", _hoisted_2$1, toDisplayString(__props.title), 1), __props.dateline ? (openBlock(), createElementBlock("p", _hoisted_3, toDisplayString(__props.dateline), 1)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region sfc/components/KFrontRail.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "front__rail" };
var _hoisted_2 = {
	key: 0,
	class: "t-title"
};
//#endregion
//#region sfc/components/KFrontRail.vue
var KFrontRail_default = /* @__PURE__ */ defineComponent({
	__name: "KFrontRail",
	props: { title: { default: "" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("aside", _hoisted_1$1, [__props.title ? (openBlock(), createElementBlock("h3", _hoisted_2, toDisplayString(__props.title), 1)) : createCommentVNode("", true), renderSlot(_ctx.$slots, "default")]);
		};
	}
});
//#endregion
//#region sfc/components/KFrontDesks.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "front__desks" };
//#endregion
//#region sfc/components/KFrontDesks.vue
var KFrontDesks_default = /* @__PURE__ */ defineComponent({
	name: "KFrontDesks",
	__name: "KFrontDesks",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("section", _hoisted_1, [renderSlot(_ctx.$slots, "default")]);
		};
	}
});
//#endregion
//#region sfc/composables/toast.ts
function toastStackEl() {
	const existing = document.querySelector(".toast-stack[data-toast-stack]");
	if (existing) return existing;
	const stack = document.createElement("div");
	stack.className = "toast-stack";
	stack.setAttribute("data-toast-stack", "");
	stack.setAttribute("aria-live", "polite");
	stack.setAttribute("aria-atomic", "false");
	document.body.appendChild(stack);
	return stack;
}
function dismissToast(toastEl) {
	if (!toastEl || toastEl.getAttribute("data-state") === "closed") return;
	toastEl.setAttribute("data-state", "closed");
	let removed = false;
	function remove() {
		if (removed) return;
		removed = true;
		toastEl?.parentNode?.removeChild(toastEl);
	}
	toastEl.addEventListener("transitionend", remove, { once: true });
	setTimeout(remove, 400);
}
function toast(text, opts = {}) {
	if (typeof document === "undefined") return void 0;
	const stack = toastStackEl();
	const toastEl = document.createElement("div");
	toastEl.className = "toast";
	toastEl.setAttribute("role", "status");
	toastEl.setAttribute("data-state", "closed");
	const span = document.createElement("span");
	span.className = "toast__text";
	span.textContent = text == null ? "" : String(text);
	toastEl.appendChild(span);
	if (opts.action) {
		const action = document.createElement("button");
		action.className = "toast__action";
		action.type = "button";
		action.textContent = String(opts.action);
		action.addEventListener("click", () => {
			if (typeof opts.onAction === "function") opts.onAction();
			dismissToast(toastEl);
		});
		toastEl.appendChild(action);
	}
	const close = document.createElement("button");
	close.className = "toast__close";
	close.type = "button";
	close.setAttribute("aria-label", "Dismiss");
	close.textContent = "×";
	close.addEventListener("click", () => dismissToast(toastEl));
	toastEl.appendChild(close);
	stack.appendChild(toastEl);
	toastEl.offsetWidth;
	toastEl.setAttribute("data-state", "open");
	const duration = typeof opts.duration === "number" ? opts.duration : 4e3;
	if (duration > 0) setTimeout(() => dismissToast(toastEl), duration);
	return toastEl;
}
//#endregion
//#region sfc/composables/useDeck.ts
function attrEscape(s) {
	return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
var defaultI18n = {
	deckChoose: "Choose",
	deckChosen: "Chosen"
};
function useDeck(wrapper, i18n = defaultI18n) {
	if (wrapper.getAttribute("data-kk-deck-bound") === "true") return () => {};
	const cards = Array.from(wrapper.querySelectorAll(".deck-card"));
	if (cards.length === 0) return () => {};
	const isMobileStack = window.matchMedia("(max-width: 1024px)").matches;
	let currentIndex = 0;
	const disposers = [];
	function setActiveCard(index) {
		cards.forEach((c) => c.classList.remove("active"));
		cards[index].classList.add("active");
		currentIndex = index;
	}
	function setChosen(card) {
		wrapper.querySelectorAll(".deck-card__select.is-chosen").forEach((other) => {
			if (other.closest(".deck-card") === card) return;
			other.classList.remove("is-chosen");
			other.textContent = i18n.deckChoose;
		});
		const btn = card.querySelector(".deck-card__select");
		if (!btn) return;
		if (btn.classList.contains("is-chosen")) {
			btn.classList.remove("is-chosen");
			btn.textContent = i18n.deckChoose;
		} else {
			btn.classList.add("is-chosen");
			btn.innerHTML = "<span class=\"deck-card__check\" aria-hidden=\"true\"></span>" + attrEscape(i18n.deckChosen);
		}
	}
	setActiveCard(0);
	if (isMobileStack) {
		wrapper.style.touchAction = "pan-y";
		let touchStartX = 0;
		let touchStartY = 0;
		let lastSwitchX = 0;
		let isHSwipe = false;
		function onTouchStart(e) {
			touchStartX = e.changedTouches[0].clientX;
			touchStartY = e.changedTouches[0].clientY;
			lastSwitchX = touchStartX;
			isHSwipe = false;
		}
		function onTouchMove(e) {
			const cx = e.changedTouches[0].clientX;
			const cy = e.changedTouches[0].clientY;
			const dx = Math.abs(cx - touchStartX);
			const dy = Math.abs(cy - touchStartY);
			if (!isHSwipe && (dx > 10 || dy > 10)) isHSwipe = dx > dy;
			if (isHSwipe) {
				e.preventDefault();
				const drag = cx - lastSwitchX;
				if (Math.abs(drag) >= 30) {
					setActiveCard(drag > 0 ? currentIndex > 0 ? currentIndex - 1 : cards.length - 1 : (currentIndex + 1) % cards.length);
					lastSwitchX = cx;
				}
			}
		}
		function onClickCapture(e) {
			if (isHSwipe) {
				e.stopPropagation();
				e.preventDefault();
				isHSwipe = false;
			}
		}
		wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
		wrapper.addEventListener("touchmove", onTouchMove, { passive: false });
		wrapper.addEventListener("click", onClickCapture, true);
		disposers.push(() => {
			wrapper.removeEventListener("touchstart", onTouchStart);
			wrapper.removeEventListener("touchmove", onTouchMove);
			wrapper.removeEventListener("click", onClickCapture, true);
		});
	} else {
		const enterHandlers = [];
		cards.forEach((card, index) => {
			const handler = () => setActiveCard(index);
			card.addEventListener("mouseenter", handler);
			enterHandlers.push([card, handler]);
		});
		function onMouseLeave() {
			const chosenBtn = wrapper.querySelector(".deck-card__select.is-chosen");
			if (!chosenBtn) return;
			const chosenCard = chosenBtn.closest(".deck-card");
			const idx = chosenCard ? cards.indexOf(chosenCard) : -1;
			if (idx !== -1 && idx !== currentIndex) setActiveCard(idx);
		}
		wrapper.addEventListener("mouseleave", onMouseLeave);
		disposers.push(() => {
			enterHandlers.forEach(([card, handler]) => card.removeEventListener("mouseenter", handler));
			wrapper.removeEventListener("mouseleave", onMouseLeave);
		});
	}
	const clickHandlers = [];
	cards.forEach((card, index) => {
		const handler = () => {
			if (!card.classList.contains("active")) {
				setActiveCard(index);
				return;
			}
			setChosen(card);
		};
		card.addEventListener("click", handler);
		clickHandlers.push([card, handler]);
	});
	disposers.push(() => {
		clickHandlers.forEach(([card, handler]) => card.removeEventListener("click", handler));
	});
	wrapper.setAttribute("data-kk-deck-bound", "true");
	return function dispose() {
		disposers.forEach((d) => d());
		wrapper.removeAttribute("data-kk-deck-bound");
	};
}
//#endregion
//#region sfc/composables/useCommentFlow.ts
function el(tag, className) {
	const node = document.createElement(tag);
	if (className) node.className = className;
	return node;
}
function useCommentFlow(bookRef, inspectorRef, options) {
	const currentAuthor = options.currentAuthor;
	const addCommentLabel = options.addCommentLabel ?? "Add a comment";
	const replyLabel = options.replyLabel ?? "Reply…";
	let doc = null;
	let inspector = null;
	let commentStack = null;
	let observer = null;
	let fab = null;
	function nodeInDoc(node) {
		while (node && node !== document) {
			if (node === doc) return true;
			node = node.parentNode;
		}
		return false;
	}
	function wrapRangeAsHighlight(range) {
		const spans = [];
		const startContainer = range.startContainer;
		const startOffset = range.startOffset;
		const endContainer = range.endContainer;
		const endOffset = range.endOffset;
		const root = range.commonAncestorContainer;
		const textNodes = [];
		if (root.nodeType === Node.TEXT_NODE) textNodes.push(root);
		else {
			const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
			let n;
			while (n = walker.nextNode()) if (range.intersectsNode(n)) textNodes.push(n);
		}
		textNodes.forEach((tn) => {
			const so = tn === startContainer ? startOffset : 0;
			const eo = tn === endContainer ? endOffset : tn.data.length;
			if (so >= eo) return;
			const mid = tn.data.slice(so, eo);
			if (!mid.trim()) return;
			const before = tn.data.slice(0, so);
			const after = tn.data.slice(eo);
			const span = el("span", "highlight");
			span.appendChild(document.createTextNode(mid));
			const parent = tn.parentNode;
			if (!parent) return;
			if (before) parent.insertBefore(document.createTextNode(before), tn);
			parent.insertBefore(span, tn);
			if (after) parent.insertBefore(document.createTextNode(after), tn);
			parent.removeChild(tn);
			spans.push(span);
		});
		return spans;
	}
	function unwrapHighlight(spans) {
		if (!spans) return;
		(Array.isArray(spans) ? spans : [spans]).forEach((span) => {
			const parent = span?.parentNode;
			if (!span || !parent) return;
			while (span.firstChild) parent.insertBefore(span.firstChild, span);
			parent.removeChild(span);
			parent.normalize();
		});
	}
	function setAppSelection(on) {
		const app = document.querySelector(".app");
		if (!app) return;
		if (on) app.setAttribute("data-selection", "true");
		else app.removeAttribute("data-selection");
	}
	function buildDraft(author, threadId) {
		const d = el("div", "card card--interactive comment-new");
		d.setAttribute("data-thread-id", threadId);
		const header = el("div", "comment-new__header");
		const name = el("div", "t-subtitle");
		name.textContent = author;
		const preview = el("p", "t-caption comment-new__preview");
		header.append(name, preview);
		const collapsible = el("div", "card__collapsible");
		const inner = el("div", "card__collapsible-inner");
		const label = el("label", "field comment-new__field");
		const input = el("input", "t-caption field__input");
		input.type = "text";
		input.placeholder = addCommentLabel;
		const caret = el("span", "field__fake-caret");
		caret.setAttribute("aria-hidden", "true");
		label.append(input, caret);
		inner.append(label);
		collapsible.append(inner);
		d.append(header, collapsible);
		return d;
	}
	function removeDraftAndUnwrapMarks(draft) {
		if (!draft || !doc || !inspector) return;
		const tid = draft.dataset.threadId;
		if (tid) doc.querySelectorAll(`.highlight[data-comment-id="${tid}"]`).forEach((span) => {
			unwrapHighlight([span]);
		});
		draft.remove();
		if (!inspector.querySelector(".card.comment-new")) setAppSelection(false);
	}
	function ensureMessageId(msg) {
		if (!msg.dataset.messageId) msg.dataset.messageId = "m" + Date.now() + "-" + Math.floor(Math.random() * 1e3);
		return msg.dataset.messageId;
	}
	function buildMessage(author, body) {
		const msg = el("div", "comment-msg");
		const header = el("div", "comment-msg__header");
		const name = el("div", "t-subtitle");
		name.textContent = author;
		const menuBtn = el("button", "comment__menu");
		menuBtn.type = "button";
		menuBtn.setAttribute("aria-label", "Message actions");
		menuBtn.setAttribute("aria-expanded", "false");
		menuBtn.appendChild(el("span"));
		header.append(name, menuBtn);
		const bodyEl = el("p", "t-caption");
		bodyEl.textContent = body;
		const popover = el("div", "comment__menu-popover");
		popover.setAttribute("role", "menu");
		[
			["comment__menu-item comment__menu-item--approve t-caption", "Approve"],
			["comment__menu-item t-caption", "Edit"],
			["comment__menu-item t-caption", "Reply"],
			["comment__menu-item t-caption", "Archive thread"],
			["comment__menu-item t-caption", "Delete"]
		].forEach(([cls, label]) => {
			const item = el("button", cls);
			item.type = "button";
			item.setAttribute("role", "menuitem");
			item.textContent = label;
			popover.appendChild(item);
		});
		msg.append(header, bodyEl, popover);
		ensureMessageId(msg);
		return msg;
	}
	function renderPreview(thread) {
		const list = thread.querySelector(".comment-thread__list");
		const preview = thread.querySelector(".comment-thread__preview");
		if (!list || !preview) return;
		const msgs = list.querySelectorAll(":scope > .comment-msg");
		preview.innerHTML = "";
		if (msgs.length === 0) return;
		preview.appendChild(msgs[0].cloneNode(true));
		if (msgs.length > 2) {
			const dots = el("div", "comment-thread__ellipsis");
			dots.setAttribute("aria-hidden", "true");
			dots.append(el("span"), el("span"), el("span"));
			preview.appendChild(dots);
		}
		if (msgs.length > 1) preview.appendChild(msgs[msgs.length - 1].cloneNode(true));
	}
	function buildThread(author, body, threadId) {
		const thread = el("div", "card card--interactive comment-thread");
		if (threadId) thread.setAttribute("data-thread-id", threadId);
		thread.appendChild(el("div", "comment-thread__preview"));
		const editSlot = el("div", "comment-thread__edit");
		const editInner = el("div", "comment-thread__edit-inner");
		const editLabel = el("label", "field comment-thread__edit-field");
		const editInput = el("input", "t-caption field__input");
		editInput.type = "text";
		editLabel.appendChild(editInput);
		editInner.appendChild(editLabel);
		editSlot.appendChild(editInner);
		thread.appendChild(editSlot);
		const collapsible = el("div", "card__collapsible");
		const inner = el("div", "card__collapsible-inner");
		const list = el("div", "comment-thread__list");
		const replyLabelEl = el("label", "field comment-thread__reply");
		const replyInput = el("input", "t-caption field__input");
		replyInput.type = "text";
		replyInput.placeholder = replyLabel;
		const caret = el("span", "field__fake-caret");
		caret.setAttribute("aria-hidden", "true");
		replyLabelEl.append(replyInput, caret);
		inner.append(list, replyLabelEl);
		collapsible.appendChild(inner);
		thread.appendChild(collapsible);
		list.appendChild(buildMessage(author, body));
		renderPreview(thread);
		return thread;
	}
	function ensureEditSlot(thread) {
		let slot = thread.querySelector(":scope > .comment-thread__edit");
		if (slot) return slot;
		slot = el("div", "comment-thread__edit");
		const inner = el("div", "comment-thread__edit-inner");
		const label = el("label", "field comment-thread__edit-field");
		const input = el("input", "t-caption field__input");
		input.type = "text";
		label.appendChild(input);
		inner.appendChild(label);
		slot.appendChild(inner);
		const collapsible = thread.querySelector(":scope > .card__collapsible");
		if (collapsible) thread.insertBefore(slot, collapsible);
		else thread.appendChild(slot);
		return slot;
	}
	function enterEditMode(thread, msg) {
		const bodyEl = msg.querySelector(".t-caption");
		const bodyText = bodyEl ? bodyEl.textContent || "" : "";
		const input = ensureEditSlot(thread).querySelector(".field__input");
		input.value = bodyText;
		input.setAttribute("value", bodyText);
		thread.setAttribute("data-editing", "true");
		thread.setAttribute("data-edit-message-id", msg.dataset.messageId || "");
		requestAnimationFrame(() => {
			input.focus();
			const len = input.value.length;
			try {
				input.setSelectionRange(len, len);
			} catch {}
		});
	}
	function exitEditMode(thread, opts) {
		const commit = !!opts?.commit;
		const input = thread.querySelector(":scope > .comment-thread__edit")?.querySelector(".field__input");
		const msgId = thread.getAttribute("data-edit-message-id") || "";
		thread.removeAttribute("data-editing");
		thread.removeAttribute("data-edit-message-id");
		if (!commit || !input) {
			if (input) {
				input.value = "";
				input.removeAttribute("value");
			}
			return;
		}
		const newText = input.value.trim();
		input.value = "";
		input.removeAttribute("value");
		if (!newText || !msgId) return;
		const msg = thread.querySelector(".comment-thread__list")?.querySelector(`.comment-msg[data-message-id="${msgId}"]`);
		if (!msg) return;
		const bodyEl = msg.querySelector(".t-caption");
		if (bodyEl && bodyEl.textContent !== newText) {
			bodyEl.textContent = newText;
			renderPreview(thread);
			commentStack?.dispatchEvent(new CustomEvent("kk:comment", {
				bubbles: true,
				detail: {
					action: "edit",
					threadId: thread.dataset.threadId || "",
					messageId: msgId,
					text: newText
				}
			}));
		}
	}
	function captureAnchorContext(quote, anchorEl) {
		if (!anchorEl?.closest) return {
			prefix: "",
			suffix: ""
		};
		const full = (anchorEl.closest(".book__section") || anchorEl.closest("p, dd, li") || anchorEl.parentNode)?.textContent || "";
		const idx = full.indexOf(quote);
		if (idx === -1) return {
			prefix: "",
			suffix: ""
		};
		return {
			prefix: full.slice(Math.max(0, idx - 20), idx),
			suffix: full.slice(idx + quote.length, idx + quote.length + 20)
		};
	}
	function commitDraft(draft) {
		if (!commentStack || !inspector) return;
		const inp = draft.querySelector(".comment-new__field .field__input");
		if (!inp) return;
		const text = inp.value.trim();
		if (!text) return;
		const tid = draft.dataset.threadId || "";
		const thread = buildThread(currentAuthor, text, tid);
		const anchorQuote = draft.dataset.kkAnchorQuote || "";
		const anchorPrefix = draft.dataset.kkAnchorPrefix || "";
		const anchorSuffix = draft.dataset.kkAnchorSuffix || "";
		const sectionSlug = draft.dataset.kkSectionSlug || "";
		const cluster = draft.dataset.kkCluster || null;
		thread.dataset.kkAnchorQuote = anchorQuote;
		thread.dataset.kkAnchorPrefix = anchorPrefix;
		thread.dataset.kkAnchorSuffix = anchorSuffix;
		thread.dataset.kkSectionSlug = sectionSlug;
		if (cluster) thread.dataset.kkCluster = cluster;
		const seedMsg = thread.querySelector(".comment-thread__list > .comment-msg");
		const mid = seedMsg ? seedMsg.dataset.messageId || "" : "";
		draft.replaceWith(thread);
		requestAnimationFrame(() => thread.click());
		if (!inspector.querySelector(".card.comment-new")) setAppSelection(false);
		commentStack.dispatchEvent(new CustomEvent("kk:comment", {
			bubbles: true,
			detail: {
				action: "new",
				threadId: tid,
				messageId: mid,
				anchorQuote,
				anchorPrefix,
				anchorSuffix,
				cluster,
				sectionSlug,
				text
			}
		}));
	}
	function maybeOpenFromSelection() {
		if (!doc || !commentStack) return;
		const sel = window.getSelection();
		if (!sel || sel.isCollapsed) return;
		if (!nodeInDoc(sel.anchorNode) || !nodeInDoc(sel.focusNode)) return;
		const range = sel.getRangeAt(0).cloneRange();
		const quoteText = sel.toString();
		const spans = wrapRangeAsHighlight(range);
		if (!spans.length) return;
		const first = spans[0].firstChild;
		const last = spans[spans.length - 1].firstChild;
		if (first && last) {
			const restored = document.createRange();
			restored.setStart(first, 0);
			restored.setEnd(last, last.data.length);
			sel.removeAllRanges();
			sel.addRange(restored);
		}
		const threadId = "c" + Date.now() + "-" + Math.floor(Math.random() * 1e3);
		spans.forEach((span) => span.setAttribute("data-comment-id", threadId));
		const ctx = captureAnchorContext(quoteText, spans[0]);
		const sectionEl = spans[0].closest(".book__section");
		const clusterEl = spans[0].closest("[data-cluster]");
		const draft = buildDraft(currentAuthor, threadId);
		draft.dataset.kkAnchorQuote = quoteText;
		draft.dataset.kkAnchorPrefix = ctx.prefix;
		draft.dataset.kkAnchorSuffix = ctx.suffix;
		draft.dataset.kkSectionSlug = sectionEl ? sectionEl.id : "";
		draft.dataset.kkCluster = clusterEl ? clusterEl.getAttribute("data-cluster") || "" : "";
		commentStack.insertBefore(draft, commentStack.firstChild);
		setAppSelection(true);
		requestAnimationFrame(() => draft.click());
	}
	function renderResolved(thread, replacementText, approvedBy) {
		const snippetMax = 40;
		const snippet = replacementText.length > snippetMax ? replacementText.slice(0, snippetMax - 1) + "…" : replacementText;
		thread.setAttribute("data-resolved", "true");
		thread.setAttribute("data-state", "minimized");
		const preview = thread.querySelector(".comment-thread__preview");
		if (!preview) return;
		preview.innerHTML = "";
		const resolved = el("div", "comment-thread__resolved");
		const stamp = el("span", "comment-thread__resolved-stamp t-caption");
		stamp.setAttribute("aria-hidden", "true");
		stamp.textContent = "✓";
		const snippetEl = el("span", "comment-thread__resolved-snippet t-caption");
		snippetEl.textContent = snippet;
		const byline = el("span", "comment-thread__resolved-byline t-caption t-muted");
		byline.textContent = approvedBy;
		resolved.append(stamp, snippetEl, byline);
		preview.appendChild(resolved);
	}
	function onDocMouseUp() {
		maybeOpenFromSelection();
	}
	function onDocKeyUp(e) {
		if (e.shiftKey && (e.key.indexOf("Arrow") === 0 || e.key === "Home" || e.key === "End")) maybeOpenFromSelection();
	}
	function onStackClickCommit(e) {
		const trigger = e.target.closest("[data-action=\"commit\"]");
		if (!trigger) return;
		const draft = trigger.closest(".card.comment-new");
		if (!draft) return;
		e.stopPropagation();
		commitDraft(draft);
	}
	function onStackKeydown(e) {
		const target = e.target;
		const draftInput = target.closest(".card.comment-new .comment-new__field .field__input");
		if (draftInput) {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				commitDraft(draftInput.closest(".card.comment-new"));
				return;
			}
			if (e.key === "Escape") {
				e.preventDefault();
				removeDraftAndUnwrapMarks(draftInput.closest(".card.comment-new"));
				return;
			}
		}
		const editInput = target.closest(".comment-thread__edit .field__input");
		if (editInput) {
			const editThread = editInput.closest(".comment-thread");
			if (editThread && e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				exitEditMode(editThread, { commit: true });
				return;
			}
			if (editThread && e.key === "Escape") {
				e.preventDefault();
				exitEditMode(editThread, { commit: false });
				return;
			}
		}
		const replyInput = target.closest(".comment-thread__reply .field__input");
		if (replyInput && e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			const body = replyInput.value.trim();
			if (!body) return;
			const thread = replyInput.closest(".comment-thread");
			const list = thread.querySelector(".comment-thread__list");
			const replyMsg = buildMessage(currentAuthor, body);
			list.appendChild(replyMsg);
			replyInput.value = "";
			renderPreview(thread);
			commentStack?.dispatchEvent(new CustomEvent("kk:comment", {
				bubbles: true,
				detail: {
					action: "reply",
					threadId: thread.dataset.threadId || "",
					messageId: replyMsg.dataset.messageId || "",
					text: body
				}
			}));
		}
	}
	function onStackInput(e) {
		const target = e.target;
		const di = target.closest(".card.comment-new .comment-new__field .field__input");
		if (di) {
			const preview = di.closest(".card.comment-new")?.querySelector(".comment-new__preview");
			if (preview) preview.textContent = di.value;
			return;
		}
		const ei = target.closest(".comment-thread__edit .field__input");
		if (ei) ei.setAttribute("value", ei.value);
	}
	function onDocKeydownEscapeDraft(e) {
		if (e.key !== "Escape" || !inspector) return;
		const activeDraft = inspector.querySelector(".card.comment-new[data-state=\"active\"]");
		if (!activeDraft) return;
		if (activeDraft.contains(document.activeElement)) return;
		e.preventDefault();
		removeDraftAndUnwrapMarks(activeDraft);
	}
	function onDocKeydownTypeToFocus(e) {
		if (e.key.length !== 1 || !inspector) return;
		if (e.ctrlKey || e.metaKey || e.altKey) return;
		const activeCard = inspector.querySelector(".comment-stack .card--interactive[data-state=\"active\"]");
		if (!activeCard) return;
		let inp;
		if (activeCard.getAttribute("data-editing") === "true") inp = activeCard.querySelector(".comment-thread__edit .field__input");
		else inp = activeCard.querySelector(".comment-new__field .field__input, .comment-thread__reply .field__input");
		if (!inp || document.activeElement === inp) return;
		const ae = document.activeElement;
		if (ae?.tagName) {
			const t = ae.tagName;
			if (t === "INPUT" || t === "TEXTAREA" || ae.isContentEditable) return;
			if (t === "BUTTON" || t === "A" || t === "SELECT") return;
		}
		inp.focus();
	}
	function onDocClickHighlight(e) {
		if (!commentStack) return;
		const mark = e.target.closest(".highlight");
		if (!mark) return;
		const id = mark.getAttribute("data-comment-id");
		if (!id) return;
		const card = commentStack.querySelector(`[data-thread-id="${id}"]`);
		if (!card) return;
		const app = document.querySelector(".app");
		let swapped = false;
		if (app && window.matchMedia("(max-width: 768px)").matches) {
			if (app.getAttribute("data-view") !== "inspector") {
				app.setAttribute("data-view", "inspector");
				swapped = true;
			}
		}
		if (swapped) requestAnimationFrame(() => card.click());
		else card.click();
	}
	function onFabClick() {
		document.querySelector(".app")?.setAttribute("data-view", "inspector");
	}
	function onMutation(mutations) {
		if (!doc) return;
		mutations.forEach((m) => {
			if (m.type !== "attributes" || m.attributeName !== "data-state") return;
			const card = m.target;
			if (!card.classList?.contains("card--interactive")) return;
			const isActive = card.getAttribute("data-state") === "active";
			if (!isActive && card.getAttribute("data-editing") === "true") exitEditMode(card, { commit: false });
			if (!isActive && card.classList.contains("comment-new")) {
				const inp = card.querySelector(".comment-new__field .field__input");
				if (!(inp ? inp.value.trim() : "")) {
					removeDraftAndUnwrapMarks(card);
					return;
				}
				const preview = card.querySelector(".comment-new__preview");
				if (preview && inp) preview.textContent = inp.value;
			}
			const tid = card.getAttribute("data-thread-id");
			if (!tid) return;
			const marks = doc.querySelectorAll(`.highlight[data-comment-id="${tid}"]`);
			marks.forEach((span) => {
				if (isActive) span.classList.add("highlight--active");
				else span.classList.remove("highlight--active");
			});
			if (isActive && marks.length) marks[0].scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		});
	}
	function onStackKebabAction(e) {
		if (!commentStack) return;
		const item = e.target.closest(".comment__menu-item");
		if (!item) return;
		const thread = item.closest(".comment-thread");
		if (!thread) return;
		const msg = item.closest(".comment-msg");
		const label = (item.textContent || "").trim();
		if (label === "Reply") {
			if (thread.getAttribute("data-state") !== "active") thread.click();
			const reply = thread.querySelector(".comment-thread__reply .field__input");
			if (reply) requestAnimationFrame(() => reply.focus());
			return;
		}
		if (label === "Edit") {
			if (!msg) return;
			if (thread.getAttribute("data-state") !== "active") thread.click();
			enterEditMode(thread, msg);
			return;
		}
		if (label === "Approve") {
			const approveList = thread.querySelector(".comment-thread__list");
			const approveMsgs = approveList ? approveList.querySelectorAll(":scope > .comment-msg") : [];
			const lastMsg = approveMsgs.length ? approveMsgs[approveMsgs.length - 1] : null;
			if (!lastMsg || lastMsg.getAttribute("data-author-role") !== "agent") return;
			const approveBody = lastMsg.querySelector(".t-caption");
			const replacementText = approveBody ? (approveBody.textContent || "").trim() : "";
			let approvedBy = "";
			const approveHeader = lastMsg.querySelector(".comment-msg__header .t-subtitle");
			if (approveHeader) approvedBy = (approveHeader.textContent || "").trim();
			const approveThreadId = thread.dataset.threadId || "";
			const approveMessageId = lastMsg.dataset.messageId || "";
			renderResolved(thread, replacementText, approvedBy);
			commentStack.dispatchEvent(new CustomEvent("kk:comment", {
				bubbles: true,
				detail: {
					action: "approve",
					threadId: approveThreadId,
					messageId: approveMessageId,
					replacementText,
					anchorQuote: thread.dataset.kkAnchorQuote || "",
					anchorPrefix: thread.dataset.kkAnchorPrefix || "",
					anchorSuffix: thread.dataset.kkAnchorSuffix || "",
					cluster: thread.dataset.kkCluster || null,
					sectionSlug: thread.dataset.kkSectionSlug || ""
				}
			}));
			return;
		}
		if (label === "Archive thread") {
			thread.setAttribute("data-archived", "true");
			thread.setAttribute("data-state", "minimized");
			const archivedThreadId = thread.dataset.threadId || "";
			commentStack.dispatchEvent(new CustomEvent("kk:comment", {
				bubbles: true,
				detail: {
					action: "archive",
					threadId: archivedThreadId,
					threadRemoved: false
				}
			}));
			return;
		}
		if (label === "Delete") {
			if (!msg) return;
			const list = thread.querySelector(".comment-thread__list");
			if (!list) return;
			const listMsgs = Array.from(list.querySelectorAll(":scope > .comment-msg"));
			let targetMsg = msg;
			if (msg.closest(".comment-thread__preview")) {
				const idx = Array.from(thread.querySelectorAll(".comment-thread__preview > .comment-msg")).indexOf(msg);
				if (idx === 0 && listMsgs.length) targetMsg = listMsgs[0];
				else if (idx === 1 && listMsgs.length > 1) targetMsg = listMsgs[listMsgs.length - 1];
				else targetMsg = null;
			}
			if (!targetMsg) return;
			const deletedThreadId = thread.dataset.threadId || "";
			const deletedMessageId = targetMsg.dataset.messageId || "";
			targetMsg.remove();
			const threadRemoved = list.querySelectorAll(":scope > .comment-msg").length === 0;
			if (threadRemoved) thread.remove();
			else renderPreview(thread);
			commentStack.dispatchEvent(new CustomEvent("kk:comment", {
				bubbles: true,
				detail: {
					action: "delete",
					threadId: deletedThreadId,
					messageId: deletedMessageId,
					threadRemoved
				}
			}));
		}
	}
	function bind() {
		doc = bookRef.value;
		inspector = inspectorRef.value;
		if (!doc || !inspector) return;
		commentStack = inspector.querySelector(".comment-stack");
		if (!commentStack) return;
		commentStack.querySelectorAll(".comment-msg").forEach((m) => ensureMessageId(m));
		doc.addEventListener("mouseup", onDocMouseUp);
		doc.addEventListener("keyup", onDocKeyUp);
		doc.addEventListener("click", onDocClickHighlight);
		commentStack.addEventListener("click", onStackClickCommit);
		commentStack.addEventListener("click", onStackKebabAction);
		commentStack.addEventListener("keydown", onStackKeydown);
		commentStack.addEventListener("input", onStackInput);
		document.addEventListener("keydown", onDocKeydownEscapeDraft);
		document.addEventListener("keydown", onDocKeydownTypeToFocus);
		fab = document.querySelector(".fab--comment");
		fab?.addEventListener("click", onFabClick);
		observer = new MutationObserver(onMutation);
		observer.observe(inspector, {
			attributes: true,
			attributeFilter: ["data-state"],
			subtree: true
		});
	}
	function unbind() {
		doc?.removeEventListener("mouseup", onDocMouseUp);
		doc?.removeEventListener("keyup", onDocKeyUp);
		doc?.removeEventListener("click", onDocClickHighlight);
		commentStack?.removeEventListener("click", onStackClickCommit);
		commentStack?.removeEventListener("click", onStackKebabAction);
		commentStack?.removeEventListener("keydown", onStackKeydown);
		commentStack?.removeEventListener("input", onStackInput);
		document.removeEventListener("keydown", onDocKeydownEscapeDraft);
		document.removeEventListener("keydown", onDocKeydownTypeToFocus);
		fab?.removeEventListener("click", onFabClick);
		observer?.disconnect();
		doc = null;
		inspector = null;
		commentStack = null;
		observer = null;
		fab = null;
	}
	onMounted(bind);
	onBeforeUnmount(unbind);
}
//#endregion
//#region sfc/composables/useCommentStore.ts
function isFullAdapter(a) {
	const c = a;
	return !!c && typeof c.load === "function" && typeof c.save === "function" && typeof c.clear === "function";
}
function resolveAdapter(options) {
	if (options.adapter === "none") return null;
	if (options.adapter && typeof options.adapter === "object") return isFullAdapter(options.adapter) ? options.adapter : null;
	const key = options.key ?? "kk:comments:" + (typeof location !== "undefined" ? location.pathname : "/");
	return {
		load() {
			try {
				const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
				return raw ? JSON.parse(raw) : null;
			} catch {
				return null;
			}
		},
		save(snap) {
			try {
				window.localStorage.setItem(key, JSON.stringify(snap));
			} catch {}
		},
		clear() {
			try {
				window.localStorage.removeItem(key);
			} catch {}
		}
	};
}
function rewrapQuoteInScope(scope, quote, threadId) {
	if (!scope || !quote) return;
	const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null);
	let node;
	while (node = walker.nextNode()) {
		const textNode = node;
		if (textNode.parentElement?.closest(".highlight")) continue;
		const idx = textNode.data.indexOf(quote);
		if (idx < 0) continue;
		const mid = textNode.splitText(idx);
		mid.splitText(quote.length);
		const span = document.createElement("span");
		span.className = "highlight";
		span.setAttribute("data-comment-id", threadId);
		span.appendChild(document.createTextNode(mid.data));
		mid.parentNode?.replaceChild(span, mid);
		return;
	}
}
function rewrapAllHighlights(doc, stack) {
	stack.querySelectorAll(".comment-thread[data-thread-id], .card.comment-new[data-thread-id]").forEach((t) => {
		const id = t.getAttribute("data-thread-id");
		const quote = t.dataset.kkAnchorQuote || "";
		if (!id || !quote) return;
		const sectionId = t.dataset.kkSectionSlug || "";
		rewrapQuoteInScope((sectionId ? document.getElementById(sectionId) : null) || doc, quote, id);
	});
}
function useCommentStore(bookRef, inspectorRef, options = {}) {
	let adapter = null;
	let doc = null;
	let stack = null;
	let saveObserver = null;
	let saveTimer = null;
	function onMdRendered() {
		if (doc && stack) rewrapAllHighlights(doc, stack);
	}
	function scheduleSave() {
		if (!adapter || !stack) return;
		if (saveTimer) clearTimeout(saveTimer);
		saveTimer = setTimeout(() => {
			adapter.save({
				v: 1,
				savedAt: Date.now(),
				stack: stack.innerHTML
			});
		}, 200);
	}
	function clear() {
		adapter?.clear();
		location.reload();
	}
	function bind() {
		if (options.enabled === false) return;
		adapter = resolveAdapter(options);
		if (!adapter) return;
		doc = bookRef.value;
		stack = inspectorRef.value?.querySelector(".comment-stack") ?? null;
		if (!doc || !stack) return;
		let snapshot = null;
		try {
			snapshot = adapter.load();
		} catch {
			snapshot = null;
		}
		const compatibleSchema = !snapshot || snapshot.v == null || snapshot.v === 1;
		if (snapshot && compatibleSchema && typeof snapshot.stack === "string") {
			stack.innerHTML = snapshot.stack;
			rewrapAllHighlights(doc, stack);
		}
		document.addEventListener("kk:md-rendered", onMdRendered);
		saveObserver = new MutationObserver(scheduleSave);
		saveObserver.observe(stack, {
			childList: true,
			subtree: true,
			characterData: true
		});
	}
	function unbind() {
		document.removeEventListener("kk:md-rendered", onMdRendered);
		saveObserver?.disconnect();
		saveObserver = null;
		if (saveTimer) clearTimeout(saveTimer);
		saveTimer = null;
		adapter = null;
		doc = null;
		stack = null;
	}
	onMounted(bind);
	onBeforeUnmount(unbind);
	return { clear };
}
//#endregion
//#region sfc/composables/useCommentSecret.ts
function extractCommentsFromStack(stack) {
	if (!stack) return [];
	const threads = stack.querySelectorAll(".comment-thread");
	const out = [];
	threads.forEach((t) => {
		const listMsgs = t.querySelectorAll(".comment-thread__list > .comment-msg");
		const messages = [];
		listMsgs.forEach((m) => {
			const sub = m.querySelector(".t-subtitle");
			const body = m.querySelector("p.t-caption");
			messages.push({
				messageId: m.dataset.messageId || "",
				author: sub ? (sub.textContent || "").trim() : "",
				body: body ? (body.textContent || "").trim() : "",
				role: m.getAttribute("data-author-role") || "user"
			});
		});
		out.push({
			threadId: t.getAttribute("data-thread-id") || "",
			resolved: t.getAttribute("data-resolved") === "true",
			archived: t.getAttribute("data-archived") === "true",
			anchorQuote: t.dataset.kkAnchorQuote || "",
			anchorPrefix: t.dataset.kkAnchorPrefix || "",
			anchorSuffix: t.dataset.kkAnchorSuffix || "",
			sectionSlug: t.dataset.kkSectionSlug || "",
			cluster: t.dataset.kkCluster || null,
			messages
		});
	});
	return out;
}
var HIDDEN_HEADING_STYLE = "position:absolute;top:0;left:0;right:0;height:24px;margin:0;padding:0;opacity:0;font-size:0;line-height:0;cursor:default;z-index:1;";
function useCommentSecret(inspectorRef) {
	function stackEl() {
		return inspectorRef.value?.querySelector(".comment-stack") ?? null;
	}
	function extractComments() {
		return extractCommentsFromStack(stackEl());
	}
	function copyComments() {
		const data = extractComments();
		const json = JSON.stringify(data, null, 2);
		if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) navigator.clipboard.writeText(json);
		return data;
	}
	function onClick(e) {
		if (!e.target.closest("[data-kk-action=\"copy-comments\"]")) return;
		e.preventDefault();
		e.stopPropagation();
		copyComments();
	}
	function bind() {
		const inspector = inspectorRef.value;
		if (!inspector) return;
		if (!inspector.querySelector(".comment-stack")) return;
		if (!inspector.querySelector("[data-kk-action=\"copy-comments\"]")) {
			const heading = document.createElement("h2");
			heading.textContent = "Comments";
			heading.setAttribute("aria-hidden", "true");
			heading.setAttribute("data-kk-action", "copy-comments");
			heading.style.cssText = HIDDEN_HEADING_STYLE;
			if (getComputedStyle(inspector).position === "static") inspector.style.position = "relative";
			inspector.insertBefore(heading, inspector.firstChild);
		}
		document.addEventListener("click", onClick);
	}
	function unbind() {
		document.removeEventListener("click", onClick);
	}
	onMounted(bind);
	onBeforeUnmount(unbind);
	return {
		extractComments,
		copyComments
	};
}
//#endregion
export { KApp_default as KApp, KAvatar_default as KAvatar, KBook_default as KBook, KBookSection_default as KBookSection, KButton_default as KButton, KCard_default as KCard, KCardBody_default as KCardBody, KCardCollapsible_default as KCardCollapsible, KCardHeading_default as KCardHeading, KCardStack_default as KCardStack, KChip_default as KChip, KChipWrap_default as KChipWrap, KCode_default as KCode, KCommentNew_default as KCommentNew, KCommentStack_default as KCommentStack, KCommentThread_default as KCommentThread, KDataCell_default as KDataCell, KDataTable_default as KDataTable, KDivider_default as KDivider, KDropdown_default as KDropdown, KField_default as KField, KFieldRow_default as KFieldRow, KFigure_default as KFigure, KFront_default as KFront, KFrontDesks_default as KFrontDesks, KFrontMasthead_default as KFrontMasthead, KFrontRail_default as KFrontRail, KInspector_default as KInspector, KInspectorGroup_default as KInspectorGroup, KList_default as KList, KMedia_default as KMedia, KMetric_default as KMetric, KModal_default as KModal, KNavGroup_default as KNavGroup, KPagination_default as KPagination, KPanels_default as KPanels, KPreviewFrame_default as KPreviewFrame, KQuote_default as KQuote, KRegistryTable_default as KRegistryTable, KSidebar_default as KSidebar, KSidebarNav_default as KSidebarNav, KSignoff_default as KSignoff, KSpark_default as KSpark, KSparkLabels_default as KSparkLabels, KSpecList_default as KSpecList, KStat_default as KStat, KSwitch_default as KSwitch, KTabs_default as KTabs, KTag_default as KTag, KToast_default as KToast, KTooltip_default as KTooltip, extractCommentsFromStack, toast, useColumnReveal, useCommentFlow, useCommentSecret, useCommentStore, useDeck, useInspectorStack, useNarrowView, useScrollSpy };
