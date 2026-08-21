import React, { useState, useEffect } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { SylorLogo } from './SylorLogo';

interface NavigationProps {
  onOpenConfig?: () => void;
  onOpenDownloadModal?: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenCommandPalette,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let ticking = false;
    let lastSection = 'hero';

    const sections = [
      'hero',
      'vm-inspector',
      'quick-start',
      'capabilities',
      'product-gallery',
      'scenarios',
      'how-sylor-thinks',
      'workflow',
      'workflow-story',
      'architecture',
      'extensibility',
      'philosophy',
      'developers',
      'trust-and-purpose',
      'install'
    ];

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 25;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          let currentSection = 'hero';
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const top = el.offsetTop;
              if (window.scrollY >= top - 250) {
                currentSection = sections[i];
                break;
              }
            }
          }

          if (currentSection !== lastSection) {
            lastSection = currentSection;
            setActiveSection(currentSection);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="main-navigation"
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf9f7]/92 backdrop-blur-md border-b border-[#e8e6e2] py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
          : 'bg-[#faf9f7]/70 backdrop-blur-sm py-5 border-b border-[#e8e6e2]/60'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] rounded"
          aria-label="Sylor Home"
        >
          <SylorLogo size={26} className="transition-transform group-hover:scale-105" />
          <span className="text-lg font-semibold tracking-tighter text-[#111111]">
            Sylor
          </span>
        </button>

        {/* Links with Geometric uppercase tracking */}
        <div className="hidden md:flex items-center space-x-7 text-[12px] font-medium text-[#737373] uppercase tracking-widest">
          <button
            onClick={() => scrollTo('vm-inspector')}
            className={`transition-colors hover:text-[#111111] focus:outline-none ${
              activeSection === 'vm-inspector' ? 'text-[#111111] border-b border-[#111111] pb-0.5' : ''
            }`}
          >
            Runtime
          </button>
          <button
            onClick={() => scrollTo('capabilities')}
            className={`transition-colors hover:text-[#111111] focus:outline-none ${
              activeSection === 'capabilities' || activeSection === 'scenarios'
                ? 'text-[#111111] border-b border-[#111111] pb-0.5'
                : ''
            }`}
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollTo('workflow')}
            className={`transition-colors hover:text-[#111111] focus:outline-none ${
              activeSection === 'workflow' || activeSection === 'how-sylor-thinks' || activeSection === 'workflow-story'
                ? 'text-[#111111] border-b border-[#111111] pb-0.5'
                : ''
            }`}
          >
            Workflow
          </button>
          <button
            onClick={() => scrollTo('extensibility')}
            className={`transition-colors hover:text-[#111111] focus:outline-none ${
              activeSection === 'extensibility' || activeSection === 'architecture'
                ? 'text-[#111111] border-b border-[#111111] pb-0.5'
                : ''
            }`}
          >
            Tools & MCP
          </button>
          <button
            onClick={() => scrollTo('install')}
            className={`transition-colors hover:text-[#111111] focus:outline-none ${
              activeSection === 'install' || activeSection === 'quick-start'
                ? 'text-[#111111] border-b border-[#111111] pb-0.5'
                : ''
            }`}
          >
            Install
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://trysylor.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#faf9f7] bg-[#141413] hover:bg-[#2b2a28] rounded-[5px] transition-all shadow-xs"
          >
            <span>Test Sylor</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 text-[11px] font-mono text-[#737373] hover:text-[#111111] transition-colors px-2.5 py-1.5 rounded border border-[#e8e6e2] hover:bg-[#f3f1ed] bg-[#faf9f7]"
              title="Open command palette (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-[9px] bg-[#edeae3] px-1.5 py-0.5 rounded text-[#555]">
                ⌘K
              </kbd>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
