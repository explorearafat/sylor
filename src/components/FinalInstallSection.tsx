import React from 'react';
import { ExternalLink, BookOpen, Github, Layers, Download } from 'lucide-react';
import { SylorLogo } from './SylorLogo';

interface FinalInstallSectionProps {
  onOpenDownloadModal?: () => void;
}

export const FinalInstallSection: React.FC<FinalInstallSectionProps> = ({ onOpenDownloadModal }) => {
  return (
    <section
      id="install"
      aria-labelledby="final-install-heading"
      className="py-28 md:py-40 border-t border-[#e8e6e2] bg-[#f4f2ee] relative overflow-hidden text-[#111111]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="max-w-[820px] mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white border border-[#e8e6e2] shadow-sm mb-2">
            <SylorLogo size={32} showBubbles={false} />
          </div>

          <h2
            id="final-install-heading"
            className="text-[44px] sm:text-[56px] md:text-[68px] font-semibold text-[#111111] tracking-[-0.05em] leading-[0.95] text-depth-hero"
          >
            Ready to build with Sylor?
          </h2>

          <p className="text-[18px] sm:text-[22px] text-[#444] leading-snug font-medium max-w-[680px] mx-auto">
            One agent. Your environment. Project context. Tools. MCP. Skills. Workflows. Control.
          </p>

          <p className="text-[14px] text-[#737373] max-w-[520px] mx-auto leading-relaxed">
            Try the live web agent to start working with project-aware agent intelligence on your local codebase today.
          </p>

          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDownloadModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[14px] font-mono font-bold uppercase tracking-wider text-[#faf9f7] bg-[#111111] rounded-[6px] hover:bg-[#2c2b29] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.12)] focus:outline-none"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows</span>
            </button>

            <a
              href="https://trysylor.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-[14px] font-mono font-bold uppercase tracking-wider text-[#555] hover:text-[#111111] bg-white hover:bg-[#eae7df] border border-[#e4e1d8] rounded-[6px] transition-colors focus:outline-none"
            >
              <span>Test Sylor</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="text-[12px] font-mono text-[#737373]">
            Free for Windows 10 &amp; 11 · macOS &amp; Linux coming soon.
          </div>

          
          <div className="pt-8 border-t border-[#e8e6e2] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[13px] text-[#555]">
            <a
              href="#capabilities"
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Documentation</span>
            </a>

            <a
              href="https://github.com/explorearafat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View GitHub</span>
            </a>

            <a
              href="#extensibility"
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Explore MCP Servers</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
