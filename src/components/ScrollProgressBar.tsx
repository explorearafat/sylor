import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (barRef.current) {
            const currentProgress = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = scrollHeight > 0 ? Math.min(Math.max(currentProgress / scrollHeight, 0), 1) : 0;
            barRef.current.style.transform = `scaleX(${ratio})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-transparent pointer-events-none origin-left">
      <div
        ref={barRef}
        className="h-full w-full bg-[#141413] origin-left will-change-transform shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const isVisible = currentScroll > 450;
          setVisible((prev) => (prev !== isVisible ? isVisible : prev));

          if (isVisible) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
              const currentPercent = Math.round((currentScroll / scrollHeight) * 100);
              setProgress((prev) => (Math.abs(prev - currentPercent) >= 2 ? currentPercent : prev));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 p-2.5 sm:px-3 sm:py-2 bg-[#141413] text-[#faf9f7] rounded-[8px] text-[11px] font-mono uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:bg-[#2b2a28] active:scale-95 transition-all duration-300 transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Top</span>
      <span className="text-[10px] text-[#8a8880] border-l border-[#444] pl-1.5">{progress}%</span>
    </button>
  );
};
