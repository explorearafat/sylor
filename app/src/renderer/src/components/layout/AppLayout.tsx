import { Group, Panel, Separator, useDefaultLayout } from 'react-resizable-panels'
import { ConversationRail } from '@renderer/components/ConversationRail'
import { ChatPanel } from '@renderer/components/ChatPanel'
import { PreviewPanel } from '@renderer/components/PreviewPanel'
import { useAppStore } from '@renderer/store/useAppStore'

/**
 * A thin, hoverable resize separator. Hover/drag styling is driven by the
 * `data-separator` attribute the library sets (data-separator-state).
 */
function Handle() {
  return (
    <Separator className="w-px cursor-col-resize bg-border/60 transition-colors data-[separator-state=hover]:bg-primary data-[separator-state=drag]:bg-primary" />
  )
}

/**
 * Chat-first workspace layout (Claude-desktop style). Left: the collapsible
 * ConversationRail. Center: the ChatPanel, full width. The right-side live
 * preview panel (Phase 2) slides in when Sylor builds something previewable.
 *
 * react-resizable-panels v4 treats bare numeric sizes as pixels, so percentage
 * sizes are passed as strings (e.g. "22" === 22%).
 */
export function AppLayout() {
  const root = useDefaultLayout({ id: 'sylor.root' })
  const railOpen = useAppStore((s) => s.railOpen)
  const previewOpen = useAppStore((s) => s.previewOpen)

  return (
    <Group
      orientation="horizontal"
      id="sylor.root"
      className="h-full"
      defaultLayout={root.defaultLayout}
      onLayoutChanged={root.onLayoutChanged}
    >
      {railOpen && (
        <>
          <Panel id="rail" defaultSize="18" minSize="12" maxSize="26">
            <ConversationRail />
          </Panel>
          <Handle />
        </>
      )}

      <Panel id="chat" defaultSize="82" minSize="30">
        <ChatPanel />
      </Panel>

      {previewOpen && (
        <>
          <Handle />
          <Panel id="preview" defaultSize="42" minSize="24" maxSize="62">
            <PreviewPanel />
          </Panel>
        </>
      )}
    </Group>
  )
}
