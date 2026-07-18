/* KK agentic design system — Vue layer.
   Components are thin emitters of canonical kit markup. They own
   structure and behavior; vars.css + style.css own every pixel. No
   component ships styles. No class or style props exist: the canon's
   variants are the API, and off-canon output is unrepresentable.
   Runtime behavior beyond simple state (scroll-spy, card stacks,
   comment flows) stays in js/kit.js, which binds to the same DOM
   these components emit. */

// Shells
export { default as KApp } from './components/KApp.js'
export { default as KSidebar } from './components/KSidebar.js'
export { default as KSidebarNav } from './components/KSidebarNav.js'
export { default as KNavGroup } from './components/KNavGroup.js'
export { default as KBook } from './components/KBook.js'
export { default as KBookSection } from './components/KBookSection.js'
export { default as KInspector } from './components/KInspector.js'
export { default as KInspectorGroup } from './components/KInspectorGroup.js'
export { default as KPanels } from './components/KPanels.js'
export { default as KFront } from './components/KFront.js'
export { default as KFrontMasthead } from './components/KFrontMasthead.js'
export { default as KFrontRail } from './components/KFrontRail.js'
export { default as KFrontDesks } from './components/KFrontDesks.js'

// Cards
export { default as KCard } from './components/KCard.js'
export { default as KCardHeading } from './components/KCardHeading.js'
export { default as KCardBody } from './components/KCardBody.js'
export { default as KCardCollapsible } from './components/KCardCollapsible.js'
export { default as KCardStack } from './components/KCardStack.js'

// Comments
export { default as KCommentNew } from './components/KCommentNew.js'
export { default as KCommentThread } from './components/KCommentThread.js'
export { default as KCommentStack } from './components/KCommentStack.js'

// Controls
export { default as KButton } from './components/KButton.js'
export { default as KChip } from './components/KChip.js'
export { default as KChipWrap } from './components/KChipWrap.js'
export { default as KField } from './components/KField.js'
export { default as KFieldRow } from './components/KFieldRow.js'
export { default as KSwitch } from './components/KSwitch.js'

// Content
export { default as KTag } from './components/KTag.js'
export { default as KAvatar } from './components/KAvatar.js'
export { default as KMedia } from './components/KMedia.js'
export { default as KQuote } from './components/KQuote.js'
export { default as KDivider } from './components/KDivider.js'
export { default as KList } from './components/KList.js'
export { default as KCode } from './components/KCode.js'
export { default as KFigure } from './components/KFigure.js'
export { default as KSpecList } from './components/KSpecList.js'
export { default as KStat } from './components/KStat.js'
export { default as KSignoff } from './components/KSignoff.js'

// Data
export { default as KMetric } from './components/KMetric.js'
export { default as KSpark } from './components/KSpark.js'
export { default as KSparkLabels } from './components/KSparkLabels.js'
export { default as KDataTable } from './components/KDataTable.js'
export { default as KDataCell } from './components/KDataCell.js'

// Kit-doc primitives
export { default as KPreviewFrame } from './components/KPreviewFrame.js'
export { default as KRegistryTable } from './components/KRegistryTable.js'
