import React, { useState, useEffect } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { SylorLogo } from './SylorLogo';

interface PersistentBottomBarProps {
  onOpenDownloadModal?: () => void;
  hasTriedDemo?: boolean;
  onScrollToDemo?: () => void;
}

export const PersistentBottomBar: React.FC<PersistentBottomBarProps> = ({
  hasTriedDemo,
  onScrollToDemo
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400;
          setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      role="region"
      aria-label="Quick action bar"
      className={`fixed bottom-5 right-5 sm:right-8 z-40 transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2.5 p-1.5 pl-3.5 bg-[#111111]/90 backdrop-blur-md text-[#faf9f7] rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all hover:bg-[#111111]">
        <div className="flex items-center gap-2 text-[12px] font-semibold tracking-tight pr-1">
          <SylorLogo size={16} showBubbles={false} />
          <span className="font-mono text-[11px] text-[#b0ada5]">Sylor</span>
        </div>

        {!hasTriedDemo && onScrollToDemo ? (
          <button
            onClick={onScrollToDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-medium text-[#faf9f7] hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-95"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>Try Workflow</span>
          </button>
        ) : null}

        <a
          href="https://trysylor.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111] bg-white rounded-full hover:bg-[#eae7df] active:scale-95 transition-all shadow-sm"
        >
          <span>Test Sylor</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
