import { useState } from 'react'
import { useAppStore } from '@renderer/store/useAppStore'
import { useSessionStore } from '@renderer/store/useSessionStore'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'chat',
    label: 'Sessions',
    icon: (
      <path
        d="M3 4h14v9H8l-4 3v-3H3V4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    )
  },
  {
    id: 'files',
    label: 'Explorer',
    icon: (
      <path
        d="M3 5h5l1.5 2H17v8H3V5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    )
  },
  {
    id: 'git',
    label: 'Source Control',
    icon: (
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <circle cx="5" cy="5" r="2" />
        <circle cx="5" cy="15" r="2" />
        <circle cx="14" cy="8" r="2" />
        <path d="M5 7v6M5 13c0-3 9-1 9-3" />
      </g>
    )
  },
  {
    id: 'history',
    label: 'History',
    icon: (
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <circle cx="10" cy="10" r="7" />
        <path d="M10 6v4l3 2" strokeLinecap="round" />
      </g>
    )
  }
]

export function Sidebar() {
  const [active, setActive] = useState('chat')
  const setSettingsOpen = useAppStore((s) => s.setSettingsOpen)
  const setListOpen = useSessionStore((s) => s.setListOpen)

  const handleNav = (id: string): void => {
    setActive(id)
    // The "Sessions" rail button opens the session-history flyout.
    if (id === 'chat') setListOpen(true)
  }

  return (
    <div className="flex h-full flex-col justify-between border-r border-border bg-surface">
      <div className="flex flex-col items-center gap-1 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              title={item.label}
              onClick={() => handleNav(item.id)}
              className={
                'relative grid h-10 w-10 place-items-center rounded-lg transition-colors ' +
                (isActive ? 'text-primary' : 'text-muted hover:text-text')
              }
            >
              {isActive && (
                <span className="absolute left-0 h-5 w-[3px] -translate-x-1.5 rounded-full bg-primary" />
              )}
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                {item.icon}
              </svg>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col items-center gap-1 py-2">
        <button
          type="button"
          aria-label="Settings"
          title="Settings"
          onClick={() => setSettingsOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:text-text"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
