import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const DeterministicVmInspector: React.FC = () => {
  const [activeLoopStep, setActiveLoopStep] = useState<number>(0);

  const loopSteps = [
    {
      step: '01',
      title: 'Intent Resolution',
      desc: 'Syntactic boundary extraction & AST intent parsing',
      badge: 'Passed',
      badgeClass: 'text-emerald-900 bg-emerald-100/90 border-emerald-300',
      detail: 'AST Tree-sitter boundary parsed in 1.2ms without side effects',
      noteColor: 'bg-[#fef9c3] border-[#fde047]', 
      pinColor: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]',
      tilt: '-rotate-1',
    },
    {
      step: '02',
      title: 'AST Graph Ingestion',
      desc: 'Symbol cross-reference indexing & type tree mapping',
      badge: 'Ready',
      badgeClass: 'text-blue-900 bg-blue-100/90 border-blue-300',
      detail: '14,290 symbols indexed across workspace in background thread',
      noteColor: 'bg-[#e0f2fe] border-[#bae6fd]', 
      pinColor: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
      tilt: 'rotate-1',
    },
    {
      step: '03',
      title: 'Topological Plan',
      desc: 'Dependency-isolated task DAG & blast-radius calculation',
      badge: 'Optimal',
      badgeClass: 'text-purple-900 bg-purple-100/90 border-purple-300',
      detail: 'DAG generated with 0 circular loops, 3 atomic checkpoints',
      noteColor: 'bg-[#f3e8ff] border-[#e9d5ff]', 
      pinColor: 'from-[#a855f7] via-[#9333ea] to-[#7e22ce]',
      tilt: '-rotate-1',
    },
    {
      step: '04',
      title: 'MCP Tool Dispatch',
      desc: 'Sandboxed FS, Git execution & subprocess sandboxing',
      badge: 'Bound',
      badgeClass: 'text-amber-900 bg-amber-100/90 border-amber-300',
      detail: 'Direct STDIO protocol connection to local MCP servers',
      noteColor: 'bg-[#ffedd5] border-[#fed7aa]', 
      pinColor: 'from-[#f97316] via-[#ea580c] to-[#c2410c]',
      tilt: 'rotate-1.5',
    },
    {
      step: '05',
      title: 'Verification Guard',
      desc: 'Typecheck, test invariants & rollback stack validation',
      badge: 'Active',
      badgeClass: 'text-emerald-900 bg-emerald-100/90 border-emerald-300',
      detail: 'Zero runtime mutations commit before compiler invariance pass',
      noteColor: 'bg-[#dcfce7] border-[#bbf7d0]', 
      pinColor: 'from-[#10b981] via-[#059669] to-[#047857]',
      tilt: '-rotate-1',
    },
  ];

  return (
    <section
      id="vm-inspector"
      aria-labelledby="vm-inspector-heading"
      className="py-20 md:py-28 border-b border-[#e8e6e2] bg-[#f8f7f4]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 bg-[#ebe8e0] rounded-full border border-[#dedad0]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#55534e]">
                Live Runtime Inspector
              </span>
            </div>

            <h2
              id="vm-inspector-heading"
              className="text-[32px] sm:text-[42px] font-medium text-[#141413] tracking-[-0.04em] leading-[1.08] mb-5 text-depth-heading"
            >
              Sylor Deterministic VM
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#5e5d58] leading-relaxed mb-6">
              Sylor executes inside an isolated deterministic virtual machine. It strictly enforces topological plan construction, blast-radius limits, and zero-mutation dry runs before touching your codebase.
            </p>

            <div className="grid grid-cols-2 gap-3.5 text-left mb-6">
              <div className="p-4 bg-[#faf9f7] border border-[#e4e1d8] rounded-[8px] hover:border-[#141413]/30 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <div className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider mb-1">
                  Latency Guarantee
                </div>
                <div className="text-[18px] sm:text-[20px] font-semibold text-[#141413] font-mono">
                  0ms Local
                </div>
                <div className="text-[11px] text-[#737373] mt-1">
                  Native binary on hardware
                </div>
              </div>

              <div className="p-4 bg-[#faf9f7] border border-[#e4e1d8] rounded-[8px] hover:border-[#141413]/30 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <div className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider mb-1">
                  Rollback Guarantee
                </div>
                <div className="text-[18px] sm:text-[20px] font-semibold text-[#141413] font-mono">
                  Instant Undo
                </div>
                <div className="text-[11px] text-[#737373] mt-1">
                  Atomic AST transaction stack
                </div>
              </div>
            </div>

            
            <div className="relative mt-7 pt-4 pb-2 flex justify-start">
              
              <div className="relative w-full max-w-[420px] bg-[#fbf7e8] border border-[#e8dfc5] p-5 pt-6 rounded-[2px] shadow-[0_12px_28px_rgba(0,0,0,0.08),0_3px_8px_rgba(0,0,0,0.04)] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300 ease-out">
                
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c84032] via-[#a82a1e] to-[#731911] shadow-[0_3px_6px_rgba(0,0,0,0.35)] border border-[#e26d60] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                  </div>
                  <div className="w-1 h-2.5 bg-black/20 blur-[0.5px] -mt-0.5 rounded-b-full"></div>
                </div>

                
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#e8debe]/60 backdrop-blur-[1px] rotate-[-1deg] border border-[#d8cdab]/50 shadow-sm pointer-events-none -z-0"></div>

                
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between border-b border-[#e2d8b8] pb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8a8060] font-semibold flex items-center gap-1">
                      <span>📌</span> INVARIANT NOTICE
                    </span>
                    <span className="text-[9.5px] font-mono text-[#9a9072] bg-[#f0e8d0] px-1.5 py-0.5 rounded">
                      SPEC #0x4A
                    </span>
                  </div>

                  <p className="text-[13.5px] sm:text-[14px] text-[#2c281e] font-mono leading-relaxed italic">
                    "Every tool invocation is treated as a sandboxed pure function with explicit verification invariants."
                  </p>

                  <div className="pt-1.5 flex items-center justify-between text-[10.5px] font-mono text-[#786e52]">
                    <span>— SYLOR DETERMINISTIC CORE</span>
                    <span className="text-[#a09476]">VERIFIED INVARIANT</span>
                  </div>
                </div>

                
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-tl from-[#e0d6b6] to-transparent pointer-events-none rounded-tl-sm"></div>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-7">
            <div className="space-y-4 py-2">
              {loopSteps.map((item, i) => {
                const isLeft = i % 2 === 0;
                const isSelected = activeLoopStep === i;

                return (
                  <div
                    key={i}
                    className={`flex ${isLeft ? 'justify-start sm:pr-12' : 'justify-end sm:pl-12'}`}
                  >
                    {/* Sticky Note Sheet with Pin & Shadow */}
                    <div
                      onClick={() => setActiveLoopStep(i)}
                      className={`relative w-full sm:w-[92%] p-4 pt-5 rounded-[3px] border transition-all duration-200 cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:scale-[1.01] ${item.noteColor} ${item.tilt} hover:rotate-0 ${
                        isSelected ? 'ring-2 ring-[#141413] shadow-[0_10px_25px_rgba(0,0,0,0.14)]' : ''
                      }`}
                    >
                      {/* Realistic Pushpin */}
                      <div className="absolute -top-2.5 left-6 z-20 flex flex-col items-center pointer-events-none">
                        <div
                          className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.pinColor} shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/60 flex items-center justify-center`}
                        >
                          <div className="w-1 h-1 rounded-full bg-white/70"></div>
                        </div>
                        <div className="w-0.5 h-2 bg-black/20 -mt-0.5"></div>
                      </div>

                      {/* Small Tape Strip on Top Right */}
                      <div className="absolute -top-2 right-4 w-12 h-3.5 bg-black/[0.04] backdrop-blur-[1px] rotate-[2deg] border border-black/[0.05] pointer-events-none"></div>

                      {/* Sticky Note Header */}
                      <div className="flex items-center justify-between gap-2 border-b border-black/[0.08] pb-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-[3px] bg-black/[0.08] text-[#141413] text-[11px] font-mono font-bold flex items-center justify-center">
                            {item.step}
                          </span>
                          <span className="text-[13px] font-mono font-bold text-[#141413]">
                            {item.title}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${item.badgeClass}`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* Sticky Note Description */}
                      <p className="text-[12px] font-mono text-[#3f3e3a] leading-snug">
                        {item.desc}
                      </p>

                      {/* Extended Detail */}
                      <div className="mt-2.5 pt-2 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-mono text-[#5c5b56]">
                        <span className="flex items-center gap-1.5">
                          <ArrowRight className="w-3 h-3 text-[#141413]" />
                          <span>{item.detail}</span>
                        </span>
                        <span className="text-[9.5px] opacity-60 font-semibold uppercase">
                          {isLeft ? 'LEFT PIN' : 'RIGHT PIN'}
                        </span>
                      </div>

                      {/* Dog-ear corner fold */}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-black/[0.07] pointer-events-none rounded-tl-sm"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
