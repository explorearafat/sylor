import React from 'react';
import { ExternalLink, BookOpen, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SylorLogo } from './SylorLogo';

interface OneMoreThingProps {
  onOpenDownloadModal?: () => void;
}

export const OneMoreThingSection: React.FC<OneMoreThingProps> = ({ onOpenDownloadModal }) => {
  const PILLARS = [
    { title: 'MCP Protocols', desc: 'Open standard for tools, databases, and microservices' },
    { title: 'Markdown Skills', desc: 'Custom architectural guidelines committed to git' },
    { title: 'Local Tools', desc: 'Surgical AST diffs and sandboxed command execution' },
    { title: 'Deep Context', desc: 'Tree-Sitter AST graphs and dependency symbol maps' },
    { title: 'Flexible Models', desc: 'Bring your own API keys or local LLM runtimes' },
    { title: 'Closed Loop', desc: 'Automated compiler, test, and lint self-healing' }
  ];

  return (
    <section
      id="conclusion"
      aria-labelledby="conclusion-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#111111] text-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="max-w-[760px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <SylorLogo size={24} showBubbles={false} />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#b0ada5]">
              SYLOR CORE
            </span>
          </div>

          <h2
            id="conclusion-heading"
            className="text-[36px] sm:text-[48px] md:text-[56px] font-medium text-white tracking-[-0.04em] leading-[1.05] mb-6"
          >
            You've been exploring the interface.
          </h2>

          <p className="text-[16px] sm:text-[18px] text-[#b0ada5] leading-relaxed mb-10 max-w-[620px] mx-auto">
            Sylor is designed to be configured around you. Now bring the same clarity, speed, and safety into your actual local repository.
          </p>

          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left mb-12">
            {PILLARS.map((p, i) => (
              <div
                key={i}
                className="p-4 bg-white/5 border border-white/10 rounded-[8px] hover:bg-white/10 transition-colors"
              >
                <span className="text-[13px] font-semibold text-white block mb-1">
                  {p.title}
                </span>
                <span className="text-[11px] text-[#8a8880] leading-relaxed block">
                  {p.desc}
                </span>
              </div>
            ))}
          </div>

          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://trysylor.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[13px] font-mono font-bold uppercase tracking-wider text-[#111111] bg-white rounded-[6px] hover:bg-[#eae7df] transition-all shadow-md focus:outline-none"
            >
              <span>Test Sylor</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="#architecture"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-[13px] font-mono uppercase tracking-wider text-[#faf9f7] hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-[6px] transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Documentation</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
