import React from 'react';
import { ExternalLink, BookOpen, Github, Layers, Apple, Monitor, Cpu, Download } from 'lucide-react';
import { SylorLogo } from './SylorLogo';

interface HeroProps {
  onOpenDownloadModal?: () => void;
  onOpenConfig?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownloadModal, onOpenConfig }) => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative pt-32 md:pt-44 pb-20 md:pb-28 max-w-[1200px] mx-auto px-6 md:px-8 border-b border-[#e8e6e2]"
    >
      
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-[#8a8880] border-b border-[#e8e6e2] pb-4 mb-12">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#141413] font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#141413]"></span>
            Sylor System Core
          </span>
          <span className="text-[#d8d5cb]">/</span>
          <span>Open Protocol • Local-First Architecture</span>
        </div>
        <div className="flex items-center gap-4 text-[#8a8880] text-[10px] uppercase tracking-wider">
          <span>Native Binaries</span>
          <span className="text-[#d8d5cb]">/</span>
          <span>Zero Telemetry</span>
        </div>
      </div>

      
      <div className="max-w-[880px]">
        <div className="inline-flex items-center gap-2 mb-6">
          <SylorLogo size={32} showBubbles={false} />
          <span className="text-[12px] font-mono font-bold text-[#8a8880] uppercase tracking-[0.25em]">
            SYLOR
          </span>
        </div>

        <h1
          id="hero-title"
          className="text-[46px] sm:text-[64px] md:text-[76px] font-semibold text-[#141413] leading-[0.95] tracking-[-0.045em] mb-6 select-none text-depth-hero"
        >
          Ready to build with Sylor?
        </h1>

        <p className="text-[20px] sm:text-[25px] md:text-[28px] text-[#242320] leading-snug font-medium mb-5 tracking-[-0.02em] text-depth-subtle">
          One agent. Your environment. Project context. Tools. MCP. Skills. Workflows. Control.
        </p>

        <p className="text-[16px] sm:text-[18px] text-[#63615a] max-w-[680px] leading-relaxed font-normal mb-10">
          Try the live web agent to start working with project-aware agent intelligence on your local codebase today.
        </p>

        
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-install-btn"
              onClick={onOpenDownloadModal}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[14px] font-mono font-bold uppercase tracking-wider text-[#faf9f7] bg-[#141413] rounded-[6px] hover:bg-[#2b2a28] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413]"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows</span>
            </button>

            <a
              href="https://trysylor.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-[13px] font-mono font-bold uppercase tracking-wider text-[#555] hover:text-[#141413] bg-[#f5f3ee] hover:bg-[#eae7df] border border-[#e4e1d8] rounded-[6px] transition-colors"
            >
              <span>Test Sylor</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {onOpenConfig && (
              <button
                onClick={onOpenConfig}
                className="inline-flex items-center gap-1.5 px-5 py-4 text-[13px] font-mono text-[#555] hover:text-[#141413] bg-[#f5f3ee] hover:bg-[#eae7df] border border-[#e4e1d8] rounded-[6px] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Manifest Spec</span>
              </button>
            )}
          </div>

          <div className="text-[13px] font-mono text-[#737373]">
            Free for Windows 10 &amp; 11 · macOS &amp; Linux coming soon.
          </div>

          
          <div className="pt-6 border-t border-[#e8e6e2] flex flex-wrap items-center gap-6 sm:gap-10 text-[14px] text-[#555]">
            <a
              href="#capabilities"
              className="flex items-center gap-2 hover:text-[#111111] transition-colors font-medium"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Documentation</span>
            </a>

            <a
              href="https://github.com/explorearafat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#111111] transition-colors font-medium"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub</span>
            </a>

            <a
              href="#extensibility"
              className="flex items-center gap-2 hover:text-[#111111] transition-colors font-medium"
            >
              <Layers className="w-4 h-4" />
              <span>Explore MCP Servers</span>
            </a>
          </div>

          
          <div className="flex items-center gap-4 text-[12px] font-mono text-[#8a8880] pt-2">
            <span className="flex items-center gap-1.5 hover:text-[#141413] transition-colors">
              <Apple className="w-3.5 h-3.5" /> macOS (Apple Silicon / Intel)
            </span>
            <span className="text-[#d8d5cb]">•</span>
            <span className="flex items-center gap-1.5 hover:text-[#141413] transition-colors">
              <Monitor className="w-3.5 h-3.5" /> Windows x64
            </span>
            <span className="text-[#d8d5cb]">•</span>
            <span className="flex items-center gap-1.5 hover:text-[#141413] transition-colors">
              <Cpu className="w-3.5 h-3.5" /> Linux AppImage
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
