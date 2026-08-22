import { useEffect, useState } from 'react'
import { OCTOPUS_BODY_PATH, OCTOPUS_BUBBLES } from '@renderer/components/SylorLogo'

const CREAM = '#fff7f0'
const INK = '#2b2a27'

/** Total time the overlay stays mounted (draw + hold + fade-out), in ms. */
const SPLASH_LIFETIME_MS = 1900

/**
 * Full-screen opening animation shown on every launch. The octopus outline
 * strokes itself in, its warm fill and face fade up, a few bubbles rise, and
 * the "Sylor" wordmark fades in — then the overlay fades out (CSS) and unmounts
 * (timer) to reveal the app. Sits above everything on a warm background that
 * tracks the active theme via `--color-bg`.
 */
export function SplashScreen() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setGone(true), SPLASH_LIFETIME_MS)
    return () => clearTimeout(t)
  }, [])

  if (gone) return null

  return (
    <div
      className="sylor-splash pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-bg"
      aria-hidden="true"
    >
      <div className="sylor-splash__mark">
        <svg width="112" height="112" viewBox="0 0 48 48" fill="none">
          {/* Outline strokes itself in first. */}
          <path
            className="sylor-splash__outline"
            d={OCTOPUS_BODY_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ color: 'var(--color-primary)' }}
          />
          {/* Warm fill fades up under the drawn outline. */}
          <path
            className="sylor-splash__body"
            d={OCTOPUS_BODY_PATH}
            style={{ fill: 'var(--color-primary)' }}
          />
          {/* Face fades in last. */}
          <g className="sylor-splash__face">
            <circle cx="17.5" cy="19" r="2.6" fill={CREAM} />
            <circle cx="24.5" cy="19" r="2.6" fill={CREAM} />
            <circle cx="18.1" cy="19.3" r="1.05" fill={INK} />
            <circle cx="25.1" cy="19.3" r="1.05" fill={INK} />
            <path
              d="M18.6 23.6 Q21 25.6 23.4 23.6"
              fill="none"
              stroke={CREAM}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
          {/* Bubbles rise, staggered. */}
          {OCTOPUS_BUBBLES.map(([cx, cy, r], i) => (
            <circle
              key={i}
              className="sylor-splash__bubble"
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth={r < 1.6 ? 1.1 : 1.5}
              style={{ color: 'var(--color-primary)', animationDelay: `${0.5 + i * 0.22}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="sylor-splash__word text-2xl font-semibold tracking-wide text-text">Sylor</div>
    </div>
  )
}
