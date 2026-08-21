import React, { useState } from 'react';
import { STAGES_DATA } from '../data';
import { 
  FolderTree, 
  GitBranch, 
  FileCode2, 
  Wrench, 
  CheckCircle2, 
  SlidersHorizontal, 
  ArrowRight, 
  Check, 
  Sparkles,
  ShieldCheck,
  Terminal,
  Layers,
  Cpu
} from 'lucide-react';

export const StageStorytelling: React.FC = () => {
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);

  const getStageIcon = (id: string) => {
    switch (id) {
      case 'stage-01': return <FolderTree className="w-4 h-4" />;
      case 'stage-02': return <GitBranch className="w-4 h-4" />;
      case 'stage-03': return <FileCode2 className="w-4 h-4" />;
      case 'stage-04': return <Wrench className="w-4 h-4" />;
      case 'stage-05': return <CheckCircle2 className="w-4 h-4" />;
      case 'stage-06': return <SlidersHorizontal className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const scrollToStage = (stageId: string) => {
    const el = document.getElementById(stageId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="stages"
      aria-labelledby="stages-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e8e6e2]">
          <div>
            <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#8a8880] block mb-3">
              Sequential Execution Lifecycle
            </span>
            <h2
              id="stages-heading"
              className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#141413] tracking-[-0.04em] leading-[1.05] text-depth-heading"
            >
              Stage-by-stage progression.
            </h2>
          </div>
          <p className="text-[16px] text-[#6e6d68] max-w-[440px] leading-relaxed">
            Sylor operates through a disciplined multi-stage state machine that isolates discovery, planning, mutation, and verification.
          </p>
        </div>

        
        <div className="py-6 border-b border-[#e8e6e2] overflow-x-auto scrollbar-none sticky top-16 z-20 bg-[#fbfaf8]/90 backdrop-blur-md">
          <div className="flex items-center gap-2 min-w-max">
            {STAGES_DATA.map((stage) => (
              <button
                key={stage.id}
                onClick={() => scrollToStage(stage.id)}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-[6px] text-[12px] font-medium text-[#6e6d68] hover:text-[#141413] hover:bg-[#edeae3] border border-[#e4e1d8] transition-all bg-[#faf9f7]"
              >
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#ebe8e0] text-[#555] group-hover:bg-[#141413] group-hover:text-[#faf9f7] transition-colors">
                  {stage.number}
                </span>
                <span>{stage.title}</span>
              </button>
            ))}
          </div>
        </div>

        
        <div className="mt-16 space-y-20 relative">
          
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-[#e8e6e2] via-[#d4d1c8] to-[#e8e6e2] -translate-x-1/2 pointer-events-none" />

          {STAGES_DATA.map((stage, index) => {
            const isEven = index % 2 === 0; 
            const isOdd = !isEven;           

            return (
              <div
                key={stage.id}
                id={stage.id}
                onMouseEnter={() => setHoveredStageId(stage.id)}
                onMouseLeave={() => setHoveredStageId(null)}
                className="relative scroll-mt-28"
              >
                
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 z-10 items-center justify-center w-8 h-8 rounded-full bg-[#141413] text-[#faf9f7] font-mono text-[11px] font-bold shadow-md ring-4 ring-[#fbfaf8]">
                  {stage.number}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  <div className={`lg:col-span-6 ${isOdd ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="bg-[#faf9f7] border border-[#e4e1d8] rounded-[10px] p-6 sm:p-8 hover:border-[#141413]/40 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                      {/* Step Header */}
                      <div className="flex items-center justify-between gap-2 text-[12px] font-mono uppercase tracking-wider text-[#8a8880] mb-4 pb-3 border-b border-[#ece9e1]">
                        <span className="flex items-center gap-2 text-[#141413] font-medium">
                          {getStageIcon(stage.id)}
                          Stage {stage.number}
                          <span className="text-[#c8c5bc]">/</span>
                          <span className="text-[#141413] font-semibold">{stage.title}</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#edeae3] text-[#63615a]">
                          Sequence {index + 1} of 6
                        </span>
                      </div>

                      {/* Main Headline & Description */}
                      <h3 className="text-[22px] sm:text-[28px] font-medium text-[#141413] tracking-[-0.03em] leading-[1.2] mb-4">
                        {stage.headline}
                      </h3>

                      <p className="text-[15px] sm:text-[16px] text-[#5e5d58] leading-relaxed mb-6">
                        {stage.description}
                      </p>

                      {/* System Specifications Checklist */}
                      <div className="space-y-2.5 pt-5 border-t border-[#ece9e1]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8880] block mb-2 font-semibold">
                          System Specifications
                        </span>
                        {stage.technicalDetails.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-[13px] text-[#42413e]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#141413] mt-1.5 shrink-0"></span>
                            <span className="leading-snug">{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Metrics Badges */}
                      <div className="mt-6 pt-5 border-t border-[#ece9e1] flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-6">
                          {stage.metrics.map((m, i) => (
                            <div key={i}>
                              <span className="block text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">
                                {m.label}
                              </span>
                              <span className="text-[15px] font-mono font-semibold text-[#141413]">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#141413] font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Deterministic Contract</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Component (Pipeline State Graph & Invariant preview) */}
                  <div className={`lg:col-span-6 ${isOdd ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="bg-[#f3f1ed] border border-[#e4e1d8] rounded-[10px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#141413]/30 transition-all">
                      {/* Sub-header */}
                      <div className="flex items-center justify-between border-b border-[#e2dfd7] pb-3 mb-5">
                        <div className="flex items-center gap-2 text-[12px] font-mono text-[#141413] font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                          <span>Pipeline State Graph</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider px-2 py-0.5 bg-[#eae7df] rounded">
                          Live Vector • Stage {stage.number}
                        </span>
                      </div>

                      {/* Flow Nodes (4 Step Vector) */}
                      <div className="space-y-2.5">
                        {stage.visualFlow.map((nodeText, idx) => (
                          <div key={idx} className="relative">
                            <div className="flex items-center justify-between bg-[#faf9f7] border border-[#e4e1d8] rounded-[6px] px-3.5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-[4px] bg-[#ebe7df] text-[#141413] text-[11px] font-mono flex items-center justify-center font-bold">
                                  0{idx + 1}
                                </span>
                                <span className="text-[13px] font-medium text-[#141413]">
                                  {nodeText}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-[11px] font-mono text-[#787670]">
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Ready</span>
                              </div>
                            </div>

                            {idx < stage.visualFlow.length - 1 && (
                              <div className="flex justify-center py-0.5">
                                <div className="w-[1px] h-2 bg-[#d8d4ca]"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* AST Contract Inspection Code Block */}
                      <div className="mt-5 pt-4 border-t border-[#e2dfd7]">
                        <div className="text-[11px] font-mono text-[#8a8880] mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="w-3 h-3 text-[#141413]" />
                            <span>AST CONTRACT INSPECTION</span>
                          </span>
                          <span className="text-emerald-700 font-semibold">STATUS: DETERMINISTIC</span>
                        </div>

                        <div className="p-3.5 bg-[#eae7df]/90 rounded-[6px] text-[12px] font-mono text-[#383734] space-y-1 overflow-x-auto border border-[#dbd7cc]">
                          <div className="text-[#8c8a82]">// Stage {stage.number} Execution Invariant</div>
                          <div>
                            <span className="text-[#964f28] font-bold">invariant</span>{' '}
                            <span className="text-[#141413] font-semibold">Stage_{stage.title.replace(/\s+/g, '_')}</span> {'{'}
                          </div>
                          <div className="pl-4">
                            deterministic: <span className="text-[#2b6cb0]">true</span>;
                          </div>
                          <div className="pl-4">
                            blastRadiusContainment: <span className="text-[#2b6cb0]">true</span>;
                          </div>
                          <div className="pl-4">
                            protocol: <span className="text-[#386b3b]">"mcp://sylor.runtime/{stage.id}"</span>;
                          </div>
                          <div>{'}'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
