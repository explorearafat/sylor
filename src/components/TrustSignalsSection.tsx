import React from 'react';
import { TRUST_SIGNALS } from '../data';
import { HardDrive, ShieldCheck, TerminalSquare, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SylorLogo } from './SylorLogo';

export const TrustSignalsSection: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'trust-local':
        return <HardDrive className="w-5 h-5" />;
      case 'trust-diffs':
        return <ShieldCheck className="w-5 h-5" />;
      case 'trust-lockin':
        return <TerminalSquare className="w-5 h-5" />;
      case 'trust-tools':
        return <RefreshCw className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="trust-and-purpose"
      aria-labelledby="trust-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[760px] mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Developer Trust & Privacy
          </span>
          <h2
            id="trust-heading"
            className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.06]"
          >
            Built for software engineers who care about control.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
            No telemetry bloat, no forced cloud hosting, and zero proprietary lock-in.
          </p>
        </div>

        {/* 4 Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-16 border-b border-[#e8e6e2]">
          {TRUST_SIGNALS.map((signal) => (
            <div
              key={signal.id}
              className="bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 bg-white rounded border border-[#e8e6e2] w-fit mb-4 text-[#111111]">
                  {getIcon(signal.id)}
                </div>
                <h3 className="text-[17px] font-semibold text-[#111111] tracking-tight">
                  {signal.title}
                </h3>
                <p className="text-[14px] text-[#737373] mt-2 leading-relaxed">
                  {signal.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e8e6e2] text-[11px] font-mono text-[#737373]">
                {signal.meta}
              </div>
            </div>
          ))}
        </div>

        {/* Why Sylor Exists (Thoughtful Editorial Paragraph) */}
        <div className="mt-16 bg-[#faf9f7] border border-[#e8e6e2] rounded-[10px] p-8 sm:p-12">
          <div className="max-w-[840px] space-y-6">
            <div className="flex items-center gap-3">
              <SylorLogo size={22} showBubbles={false} />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#737373]">
                Why Sylor Exists
              </span>
            </div>

            <h3 className="text-[26px] sm:text-[34px] font-medium text-[#111111] tracking-[-0.03em] leading-tight">
              Software engineering requires architectural discipline, not copy-paste chat hallucinations.
            </h3>

            <p className="text-[16px] sm:text-[17px] text-[#555] leading-[1.7]">
              Software development has become fragmented across scattered documentation, boilerplate generation, and brittle chat assistants. We built Sylor because software engineers need an agent that operates with true architectural awareness — reading entire project graphs, constructing surgical multi-file diffs, invoking standardized MCP protocols, and self-verifying against compiler invariants before presenting the finished work.
            </p>

            <div className="pt-4 flex items-center gap-4 text-[12px] font-mono text-[#737373]">
              <span>Grounded in AST</span>
              <span>•</span>
              <span>Tool-driven execution</span>
              <span>•</span>
              <span>Self-healing verification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
