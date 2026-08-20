import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SylorLogo } from './SylorLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      aria-label="Footer"
      className="py-8 border-t border-[#e8e6e2] bg-[#faf9f7] text-[12px] font-mono text-[#8a8880]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand and Copyright */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <SylorLogo size={20} showBubbles={false} />
            <span className="font-semibold text-[#141413] tracking-tight text-[13px]">
              Sylor
            </span>
          </div>
          <span className="text-[#c8c5bc]">/</span>
          <span>© 2026</span>
          <span className="text-[#c8c5bc]">/</span>
          <span className="hidden sm:inline">The Architecture of Intent</span>
        </div>

        {/* Status and Back to Top */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-[#5e5d58]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>All Systems Nominal</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="flex items-center gap-1 text-[#6e6d68] hover:text-[#141413] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] rounded p-1"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
