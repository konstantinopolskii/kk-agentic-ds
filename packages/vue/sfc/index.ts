/* KK agentic design system — Vue SFC layer (2.0).
   One authoring surface: single-file components with TypeScript.
   Components own structure and behavior; vars.css + style.css own
   every pixel. No component ships styles; the canon's variants are
   the API. The retired h() layer at ../src is the frozen markup
   oracle — tests/parity gates every component against it. */

// Prose
export { default as KTag } from './components/KTag.vue'
export { default as KAvatar } from './components/KAvatar.vue'
export { default as KQuote } from './components/KQuote.vue'
export { default as KDivider } from './components/KDivider.vue'
export { default as KList } from './components/KList.vue'
export { default as KCode } from './components/KCode.vue'
export { default as KFigure } from './components/KFigure.vue'

// Controls
export { default as KButton } from './components/KButton.vue'
export { default as KChip } from './components/KChip.vue'
export { default as KChipWrap } from './components/KChipWrap.vue'
export { default as KField } from './components/KField.vue'
export { default as KFieldRow } from './components/KFieldRow.vue'
export { default as KSwitch } from './components/KSwitch.vue'

// Cards
export { default as KCard } from './components/KCard.vue'
export { default as KCardHeading } from './components/KCardHeading.vue'
export { default as KCardBody } from './components/KCardBody.vue'
export { default as KCardCollapsible } from './components/KCardCollapsible.vue'
export { default as KCardStack } from './components/KCardStack.vue'

// Data
export { default as KMetric } from './components/KMetric.vue'
export { default as KSpark } from './components/KSpark.vue'
export { default as KSparkLabels } from './components/KSparkLabels.vue'
export { default as KDataTable } from './components/KDataTable.vue'
export { default as KDataCell } from './components/KDataCell.vue'
export { default as KSpecList } from './components/KSpecList.vue'
export { default as KStat } from './components/KStat.vue'
export { default as KSignoff } from './components/KSignoff.vue'

// Kit doc
export { default as KPreviewFrame } from './components/KPreviewFrame.vue'
export { default as KRegistryTable } from './components/KRegistryTable.vue'
export { default as KMedia } from './components/KMedia.vue'

// Interactive
export { default as KModal } from './components/KModal.vue'
export { default as KDropdown } from './components/KDropdown.vue'
export { default as KTabs } from './components/KTabs.vue'
export { default as KTooltip } from './components/KTooltip.vue'
export { default as KToast } from './components/KToast.vue'
export { default as KPagination } from './components/KPagination.vue'

// Comments
export { default as KCommentNew } from './components/KCommentNew.vue'
export { default as KCommentThread } from './components/KCommentThread.vue'
export { default as KCommentStack } from './components/KCommentStack.vue'

// Shells
export { default as KApp } from './components/KApp.vue'
export { default as KBook } from './components/KBook.vue'
export { default as KBookSection } from './components/KBookSection.vue'
export { default as KSidebar } from './components/KSidebar.vue'
export { default as KSidebarNav } from './components/KSidebarNav.vue'
export { default as KNavGroup } from './components/KNavGroup.vue'
export { default as KInspector } from './components/KInspector.vue'
export { default as KInspectorGroup } from './components/KInspectorGroup.vue'
export { default as KPanels } from './components/KPanels.vue'
export { default as KFront } from './components/KFront.vue'
export { default as KFrontMasthead } from './components/KFrontMasthead.vue'
export { default as KFrontRail } from './components/KFrontRail.vue'
export { default as KFrontDesks } from './components/KFrontDesks.vue'

// Behavior layer — kit.js ports. Shells wire the page-level ones on
// mount (opt out per instance via :behavior="false"); they are exported
// for hand-rolled markup that skips the shell components.
export { toast } from './composables/toast'
export type { ToastOptions } from './composables/toast'
export { useScrollSpy } from './composables/useScrollSpy'
export { useNarrowView } from './composables/useNarrowView'
export { useColumnReveal } from './composables/useColumnReveal'
export { useInspectorStack } from './composables/useInspectorStack'
export { useDeck } from './composables/useDeck'
export type { DeckI18n } from './composables/useDeck'
export { useCommentFlow } from './composables/useCommentFlow'
export type { UseCommentFlowOptions, CommentEventDetail } from './composables/useCommentFlow'
export { useCommentStore } from './composables/useCommentStore'
export type {
  UseCommentStoreOptions,
  CommentStoreAdapter,
  CommentSnapshot,
} from './composables/useCommentStore'
export { useCommentSecret, extractCommentsFromStack } from './composables/useCommentSecret'
export type { CommentThreadData, CommentThreadMessageData } from './composables/useCommentSecret'
