import React from 'react';
import { TRUST_SIGNALS } from '../data';
import { HardDrive, ShieldCheck, TerminalSquare, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { SylorLogo } from './SylorLogo';

export const TrustSignalsSection: React.FC = () => {
  const getSignalConfig = (id: string, index: number) => {
    switch (id) {
      case 'trust-local':
        return {
          icon: <HardDrive className="w-4 h-4 text-[#854d0e]" />,
          tag: 'LOCAL HARDWARE FIRST',
          badgeClass: 'text-amber-900 bg-amber-100/90 border-amber-300',
          noteColor: 'bg-[#fef9c3] border-[#fde047]', 
          pinColor: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]',
          tilt: '-rotate-1',
          codeDetail: 'fs.readOnlyIsolation = true; telemetry = 0;',
        };
      case 'trust-diffs':
        return {
          icon: <ShieldCheck className="w-4 h-4 text-[#1e40af]" />,
          tag: 'ATOMIC GIT CONTROL',
          badgeClass: 'text-blue-900 bg-blue-100/90 border-blue-300',
          noteColor: 'bg-[#e0f2fe] border-[#bae6fd]', 
          pinColor: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
          tilt: 'rotate-1',
          codeDetail: 'git.stageExplicitApprovalRequired = true;',
        };
      case 'trust-lockin':
        return {
          icon: <TerminalSquare className="w-4 h-4 text-[#6b21a8]" />,
          tag: 'OPEN PROTOCOL SPEC',
          badgeClass: 'text-purple-900 bg-purple-100/90 border-purple-300',
          noteColor: 'bg-[#f3e8ff] border-[#e9d5ff]', 
          pinColor: 'from-[#a855f7] via-[#9333ea] to-[#7e22ce]',
          tilt: '-rotate-1',
          codeDetail: 'protocol = "mcp://2024-11-05"; format = "markdown";',
        };
      case 'trust-tools':
        return {
          icon: <RefreshCw className="w-4 h-4 text-[#065f46]" />,
          tag: 'UNIVERSAL COMPILER SUPPORT',
          badgeClass: 'text-emerald-900 bg-emerald-100/90 border-emerald-300',
          noteColor: 'bg-[#dcfce7] border-[#bbf7d0]', 
          pinColor: 'from-[#10b981] via-[#059669] to-[#047857]',
          tilt: 'rotate-1.5',
          codeDetail: 'toolchains = ["cargo", "tsc", "pytest", "go", "gcc"];',
        };
      default:
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-[#141413]" />,
          tag: 'ENGINEERING CONTRACT',
          badgeClass: 'text-neutral-900 bg-neutral-100 border-neutral-300',
          noteColor: 'bg-[#faf9f7] border-[#e8e6e2]',
          pinColor: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]',
          tilt: 'rotate-0',
          codeDetail: 'invariants = true;',
        };
    }
  };

  return (
    <section
      id="trust-and-purpose"
      aria-labelledby="trust-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e8e6e2]">
          <div className="max-w-[720px]">
            <span className="text-[11px] font-bold font-mono uppercase tracking-[0.2em] text-[#737373] block mb-3">
              Developer Trust & Privacy Guarantees
            </span>
            <h2
              id="trust-heading"
              className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.06] text-depth-heading"
            >
              Built for engineers who care about control.
            </h2>
          </div>
          <p className="text-[15px] sm:text-[16px] text-[#737373] max-w-[420px] leading-relaxed">
            No telemetry bloat, no forced cloud training, and zero proprietary lock-in. Your code remains your sovereign property.
          </p>
        </div>

        
        <div className="mt-14 space-y-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] border-b border-[#e8e6e2] pb-3">
            <span className="px-2.5 py-1 rounded bg-[#edeae3] font-semibold uppercase tracking-wider text-[#444] flex items-center gap-1.5 border border-[#ddd9ce]">
              <span>📌</span> Core Architectural Guarantees
            </span>
            <span className="font-mono font-semibold text-[#141413]">
              4 Sovereign Pillars
            </span>
          </div>

          <div className="space-y-6 pt-2">
            {TRUST_SIGNALS.map((signal, i) => {
              const isLeft = i % 2 === 0;
              const config = getSignalConfig(signal.id, i);

              return (
                <div
                  key={signal.id}
                  className={`flex ${isLeft ? 'justify-start sm:pr-16 md:pr-32' : 'justify-end sm:pl-16 md:pl-32'}`}
                >
                  <div
                    className={`relative w-full sm:w-[94%] p-5 pt-6 rounded-[3px] border transition-all duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:scale-[1.01] ${config.noteColor} ${config.tilt} hover:rotate-0`}
                  >
                    {/* Realistic 3D Pushpin */}
                    <div className="absolute -top-2.5 left-6 z-20 flex flex-col items-center pointer-events-none">
                      <div
                        className={`w-4 h-4 rounded-full bg-gradient-to-br ${config.pinColor} shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/60 flex items-center justify-center`}
                      >
                        <div className="w-1 h-1 rounded-full bg-white/70"></div>
                      </div>
                      <div className="w-0.5 h-2 bg-black/20 -mt-0.5"></div>
                    </div>

                    {/* Small Washi Tape Strip */}
                    <div className="absolute -top-2 right-4 w-12 h-3.5 bg-black/[0.04] backdrop-blur-[1px] rotate-[2deg] border border-black/[0.05] pointer-events-none"></div>

                    {/* Note Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-black/[0.08] pb-2.5 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded bg-black/[0.07] flex items-center justify-center">
                          {config.icon}
                        </div>
                        <h3 className="text-[16px] sm:text-[17px] font-mono font-bold text-[#141413] tracking-tight">
                          {signal.title}
                        </h3>
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${config.badgeClass}`}
                      >
                        {signal.meta}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[13.5px] sm:text-[14px] font-mono text-[#3a3934] leading-relaxed mb-3">
                      {signal.description}
                    </p>

                    {/* Code Contract Invariant */}
                    <div className="p-2.5 bg-black/[0.05] rounded border border-black/[0.06] font-mono text-[11px] text-[#2c2b28] overflow-x-auto flex items-center justify-between">
                      <span className="font-semibold">{config.codeDetail}</span>
                      <span className="text-[9.5px] text-[#666] uppercase font-bold tracking-wider pl-2">
                        {config.tag}
                      </span>
                    </div>

                    {/* Footer tag */}
                    <div className="mt-3 pt-2 border-t border-black/[0.06] flex items-center justify-between text-[10.5px] font-mono text-[#5c5b56]">
                      <span className="flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-[#141413]" />
                        <span>Verified Invariant Safe</span>
                      </span>
                      <span className="text-[9.5px] opacity-60 font-semibold uppercase">
                        {isLeft ? 'LEFT PIN • PILLAR ' + (i + 1) : 'RIGHT PIN • PILLAR ' + (i + 1)}
                      </span>
                    </div>

                    {/* Dog-ear corner fold */}
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-black/[0.07] pointer-events-none rounded-tl-sm"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Sylor Exists (Pinned Manifesto Parchment Note) */}
        <div className="mt-20 flex justify-center">
          <div className="relative w-full max-w-[900px] bg-[#fbf7e8] border border-[#e8dfc5] p-7 sm:p-10 pt-8 rounded-[3px] shadow-[0_16px_36px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] rotate-[-0.5deg] hover:rotate-0 transition-transform duration-300">
            {/* Center Pushpin */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c84032] via-[#a82a1e] to-[#731911] shadow-[0_3px_6px_rgba(0,0,0,0.35)] border border-[#e26d60] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
              </div>
              <div className="w-1 h-2.5 bg-black/20 blur-[0.5px] -mt-0.5 rounded-b-full"></div>
            </div>

            {/* Washi Tape Strip at Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#e8debe]/60 backdrop-blur-[1px] rotate-[-0.5deg] border border-[#d8cdab]/50 shadow-xs pointer-events-none -z-0"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-[#e2d8b8] pb-3">
                <div className="flex items-center gap-2.5">
                  <SylorLogo size={20} showBubbles={false} />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#706443]">
                    Why Sylor Exists • Engineering Manifesto
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-[#ede4c8] text-[#6b603d] px-2 py-0.5 rounded font-semibold">
                  DOC 0x01
                </span>
              </div>

              <h3 className="text-[22px] sm:text-[28px] md:text-[32px] font-mono font-bold text-[#1a1710] tracking-[-0.03em] leading-tight">
                Software engineering requires architectural discipline, not copy-paste chat hallucinations.
              </h3>

              <p className="text-[15px] sm:text-[16.5px] text-[#423c2d] font-mono leading-[1.7]">
                Software development has become fragmented across scattered documentation, boilerplate generation, and brittle chat assistants. We built Sylor because software engineers need an agent that operates with true architectural awareness — reading entire project graphs, constructing surgical multi-file diffs, invoking standardized MCP protocols, and self-verifying against compiler invariants before presenting the finished work.
              </p>

              <div className="pt-4 border-t border-[#e2d8b8] flex items-center justify-between flex-wrap gap-4 text-[12px] font-mono text-[#786c4a]">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#1a1710]">✓ Grounded in AST</span>
                  <span>•</span>
                  <span className="font-semibold text-[#1a1710]">✓ Tool-driven execution</span>
                  <span>•</span>
                  <span className="font-semibold text-[#1a1710]">✓ Self-healing verification</span>
                </div>
                <span className="text-[10.5px] text-[#91845f] uppercase tracking-wider font-semibold">
                  // ZERO TELEMETRY COMMITMENT
                </span>
              </div>
            </div>

            {/* Dog-ear corner fold */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-tl from-[#e0d6b6] to-transparent pointer-events-none rounded-tl-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
