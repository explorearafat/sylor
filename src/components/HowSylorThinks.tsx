import React, { useState } from 'react';
import { THOUGHT_STAGES } from '../data';
import {
  MessageSquare,
  Search,
  Brain,
  ListOrdered,
  Wrench,
  FileEdit,
  CheckCircle,
  CheckCheck,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  GitCommit
} from 'lucide-react';

export const HowSylorThinks: React.FC = () => {
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);

  const getStageIcon = (id: string) => {
    switch (id) {
      case 'stage-request':
        return <MessageSquare className="w-4 h-4" />;
      case 'stage-context':
        return <Search className="w-4 h-4" />;
      case 'stage-understanding':
        return <Brain className="w-4 h-4" />;
      case 'stage-plan':
        return <ListOrdered className="w-4 h-4" />;
      case 'stage-tools':
        return <Wrench className="w-4 h-4" />;
      case 'stage-implementation':
        return <FileEdit className="w-4 h-4" />;
      case 'stage-verification':
        return <CheckCircle className="w-4 h-4" />;
      case 'stage-result':
        return <CheckCheck className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
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
      id="how-sylor-thinks"
      aria-labelledby="thinks-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e8e6e2]">
          <div className="max-w-[680px]">
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#8a8880] block mb-3 font-semibold">
              Cognitive Architecture & Workflow
            </span>
            <h2
              id="thinks-heading"
              className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#141413] tracking-[-0.04em] leading-[1.05] text-depth-heading"
            >
              One request. A chain of decisions.
            </h2>
          </div>
          <p className="text-[15px] sm:text-[16px] text-[#6e6d68] max-w-[440px] leading-relaxed">
            Sylor does not jump blindly into rewriting code. Every prompt triggers an 8-stage sequence designed to maintain codebase integrity and zero hallucinations.
          </p>
        </div>

        
        <div className="py-5 border-b border-[#e8e6e2] overflow-x-auto scrollbar-none sticky top-16 z-20 bg-[#fbfaf8]/95 backdrop-blur-md">
          <div className="flex items-center gap-2 min-w-max">
            {THOUGHT_STAGES.map((stage) => (
              <button
                key={stage.id}
                onClick={() => scrollToStage(stage.id)}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-[12px] font-medium text-[#6e6d68] hover:text-[#141413] hover:bg-[#edeae3] border border-[#e4e1d8] transition-all bg-[#faf9f7]"
              >
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#ebe8e0] text-[#555] group-hover:bg-[#141413] group-hover:text-[#faf9f7] transition-colors font-bold">
                  {stage.stepNumber}
                </span>
                <span className="text-[12px] tracking-tight">{stage.title}</span>
              </button>
            ))}
          </div>
        </div>

        
        <div className="mt-16 space-y-20 relative">
          
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[1px] bg-gradient-to-b from-[#e8e6e2] via-[#d4d1c8] to-[#e8e6e2] -translate-x-1/2 pointer-events-none" />

          {THOUGHT_STAGES.map((stage, index) => {
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
                  {stage.stepNumber}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  <div className={`lg:col-span-6 ${isOdd ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="bg-[#faf9f7] border border-[#e4e1d8] rounded-[10px] p-6 sm:p-8 hover:border-[#141413]/40 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                      {/* Step Header */}
                      <div className="flex items-center justify-between gap-2 text-[12px] font-mono uppercase tracking-wider text-[#8a8880] mb-4 pb-3 border-b border-[#ece9e1]">
                        <span className="flex items-center gap-2 text-[#141413] font-medium">
                          {getStageIcon(stage.id)}
                          <span className="font-bold text-[#8a8880]">STAGE {stage.stepNumber}</span>
                          <span className="text-[#c8c5bc]">/</span>
                          <span className="text-[#141413] font-semibold">{stage.title}</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#edeae3] text-[#63615a] font-semibold">
                          Step {index + 1} of 8
                        </span>
                      </div>

                      {/* Main Short Summary & Full Description */}
                      <h3 className="text-[20px] sm:text-[24px] font-medium text-[#141413] tracking-[-0.03em] leading-[1.2] mb-3">
                        {stage.shortSummary}
                      </h3>

                      <p className="text-[14.5px] sm:text-[15.5px] text-[#5e5d58] leading-relaxed mb-6">
                        {stage.fullDescription}
                      </p>

                      {/* Primary Agent Action */}
                      <div className="pt-4 border-t border-[#ece9e1]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8880] block mb-2 font-semibold flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-[#141413]" />
                          Primary Agent Action
                        </span>
                        <div className="p-3.5 bg-[#f3f0e8] rounded-[6px] border border-[#e2ded4] font-mono text-[12.5px] text-[#2c2b28] flex items-center gap-2 overflow-x-auto leading-relaxed shadow-sm">
                          <ArrowRight className="w-3.5 h-3.5 text-[#141413] shrink-0" />
                          <span>{stage.agentAction}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Component (Codebase Impact & Artifact Spec) */}
                  <div className={`lg:col-span-6 ${isOdd ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="bg-[#f3f1ed] border border-[#e4e1d8] rounded-[10px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#141413]/30 transition-all">
                      {/* Sub-header */}
                      <div className="flex items-center justify-between border-b border-[#e2dfd7] pb-3 mb-5">
                        <div className="flex items-center gap-2 text-[12px] font-mono text-[#141413] font-semibold">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Codebase Impact & Verification</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#787670] uppercase tracking-wider px-2 py-0.5 bg-[#eae7df] rounded font-medium">
                          AST Safe • Stage {stage.stepNumber}
                        </span>
                      </div>

                      {/* Impact Description */}
                      <div className="p-4 bg-[#faf9f7] border border-[#e4e1d8] rounded-[6px] text-[13.5px] text-[#3f3e3a] leading-relaxed mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#8a8880] mb-1.5 font-semibold">
                          Invariant Safety Gate
                        </div>
                        <div>{stage.codebaseImpact}</div>
                      </div>

                      {/* Generated Artifact / Trace */}
                      <div className="p-4 bg-[#eae7df]/80 border border-[#dbd7cc] rounded-[6px]">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#706e68] mb-2">
                          <span className="flex items-center gap-1.5 font-semibold text-[#141413]">
                            <Layers className="w-3.5 h-3.5 text-[#141413]" />
                            <span>GENERATED ARTIFACT / TRACE</span>
                          </span>
                          <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            VALIDATED
                          </span>
                        </div>

                        <div className="p-2.5 bg-white rounded border border-[#d8d4ca] font-mono text-[12px] text-[#141413] font-semibold flex items-center justify-between shadow-xs">
                          <span>{stage.outputArtifact}</span>
                          <span className="text-[10px] text-[#8a8880] font-normal font-mono">0 side-effects</span>
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
