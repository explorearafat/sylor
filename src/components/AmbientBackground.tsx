import React, { useEffect, useRef } from 'react';

/**
 * A single fixed, non-interactive ambient field that sits behind the entire page
 * (-z-10). It is the site-wide "background design": a warm paper wash + vignette,
 * a masked architectural blueprint grid, three slowly drifting aurora light-leaks
 * in the Sylor palette, a cursor-tracking warm glow, and a faint film grain.
 *
 * Performance contract: every animated layer moves ONLY via `transform`/`opacity`,
 * so the browser keeps the work on the GPU compositor (no layout, no repaint). The
 * drift animations are pure CSS keyframes; the pointer glow is a single element we
 * translate inside a rAF loop with heavy easing. Reduced-motion and coarse (touch)
 * pointers get the static composition and never attach the pointer listener.
 */
export const AmbientBackground: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    // No cursor to track on touch; and honor the user's reduced-motion choice.
    const wantsStatic =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
    if (wantsStatic) return;

    const RADIUS = 300; // half the glow's box, so we can center it on the cursor.
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.3;
    let curX = targetX;
    let curY = targetY;
    let raf = 0;
    let dirty = true;

    const onMove = (e: PointerEvent): void => {
      targetX = e.clientX;
      targetY = e.clientY;
      dirty = true;
    };

    const tick = (): void => {
      // Heavy easing gives a smooth, lazy trail; skip work once it has settled.
      const dx = targetX - curX;
      const dy = targetY - curY;
      if (dirty || Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
        curX += dx * 0.08;
        curY += dy * 0.08;
        el.style.transform = `translate3d(${curX - RADIUS}px, ${curY - RADIUS}px, 0)`;
        dirty = false;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base warm wash + vignette toward the edges. */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_0%,#fdfcfa_0%,#faf9f7_46%,#f2f0ea_100%)]" />

      {/* Architectural blueprint grid, masked to fade out toward the edges. */}
      <div className="absolute inset-0 ambient-grid" />

      {/* Aurora light-leaks — brand terracotta, warm amber, cool slate for depth. */}
      <div
        className="ambient-orb"
        style={{
          top: '-14%',
          left: '-8%',
          width: '48vw',
          height: '48vw',
          background:
            'radial-gradient(circle at 50% 50%, rgba(231,100,77,0.17), transparent 66%)',
          animation: 'auroraDriftA 26s ease-in-out infinite',
        }}
      />
      <div
        className="ambient-orb"
        style={{
          top: '-6%',
          right: '-12%',
          width: '42vw',
          height: '42vw',
          background:
            'radial-gradient(circle at 50% 50%, rgba(240,168,104,0.14), transparent 66%)',
          animation: 'auroraDriftB 32s ease-in-out infinite',
        }}
      />
      <div
        className="ambient-orb"
        style={{
          bottom: '-20%',
          left: '18%',
          width: '46vw',
          height: '46vw',
          background:
            'radial-gradient(circle at 50% 50%, rgba(91,107,140,0.11), transparent 66%)',
          animation: 'auroraDriftC 38s ease-in-out infinite',
        }}
      />

      {/* Cursor-tracking warm glow (desktop only; positioned via transform). */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(231,100,77,0.10), transparent 60%)',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
      />

      {/* Film grain for a premium paper texture. */}
      <div className="absolute inset-0 ambient-grain" />
    </div>
  );
};
