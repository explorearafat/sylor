import React, { useState, useEffect } from 'react';
import { Download, ArrowUpRight, Cpu } from 'lucide-react';
import { SylorLogo } from './SylorLogo';

interface NavigationProps {
  onOpenConfig?: () => void;
  onOpenDownloadModal?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenConfig, onOpenDownloadModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = [
        'hero',
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

      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
            onClick={() => scrollTo('product-gallery')}
            className={`transition-colors hover:text-[#111111] focus:outline-none ${
              activeSection === 'product-gallery' ? 'text-[#111111] border-b border-[#111111] pb-0.5' : ''
            }`}
          >
            Product
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
        <div className="flex items-center gap-3">
          {onOpenConfig && (
            <button
              onClick={onOpenConfig}
              className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#737373] hover:text-[#111111] transition-colors px-2.5 py-1 rounded border border-[#e8e6e2] hover:bg-[#f3f1ed]"
              title="Inspect agent configuration schema"
            >
              <Cpu className="w-3 h-3" />
              <span>Manifest</span>
            </button>
          )}

          <button
            onClick={onOpenDownloadModal || (() => scrollTo('install'))}
            className="group inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-mono font-bold uppercase tracking-wider text-[#faf9f7] bg-[#111111] rounded-[4px] hover:bg-[#2c2b29] transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install Sylor</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
