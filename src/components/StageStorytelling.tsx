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
  RotateCw,
  Sparkles,
  Check
} from 'lucide-react';

export const StageStorytelling: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = STAGES_DATA[activeStageIndex];

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

  return (
    <section
      id="stages"
      aria-labelledby="stages-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
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
          <p className="text-[16px] text-[#6e6d68] max-w-[420px] leading-relaxed">
            Sylor operates through a disciplined multi-stage state machine that isolates discovery, planning, mutation, and verification.
          </p>
        </div>

        {/* Stage Navigation Stepper */}
        <div className="py-6 border-b border-[#e8e6e2] overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {STAGES_DATA.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-[6px] text-[13px] font-medium transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] ${
                    isActive
                      ? 'bg-[#141413] text-[#faf9f7] shadow-sm'
                      : 'text-[#6e6d68] hover:text-[#141413] hover:bg-[#edeae3]/70'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-[#2b2a28] text-[#d4d1c8]'
                        : 'bg-[#e9e6df] text-[#7a7872] group-hover:bg-[#dfdbd2]'
                    }`}
                  >
                    {stage.number}
                  </span>
                  <span>{stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Interactive Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-wider text-[#8a8880] mb-4">
                <span className="flex items-center gap-1.5 text-[#141413] font-medium">
                  {getStageIcon(activeStage.id)}
                  Stage {activeStage.number}
                </span>
                <span className="text-[#c8c5bc]">/</span>
                <span>{activeStage.title}</span>
              </div>

              <h3 className="text-[28px] sm:text-[36px] font-medium text-[#141413] tracking-[-0.035em] leading-[1.18]">
                {activeStage.headline}
              </h3>

              <p className="mt-6 text-[17px] text-[#5e5d58] leading-[1.65]">
                {activeStage.description}
              </p>

              {/* Technical bullet points */}
              <div className="mt-8 space-y-3 pt-6 border-t border-[#e8e6e2]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8880] block mb-2">
                  System Specifications
                </span>
                {activeStage.technicalDetails.map((detail, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px] text-[#42413e]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#141413] mt-2 shrink-0"></span>
                    <span className="leading-normal">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics and Controls */}
            <div className="mt-10 pt-6 border-t border-[#e8e6e2] flex items-center justify-between">
              <div className="flex items-center gap-8">
                {activeStage.metrics.map((m, i) => (
                  <div key={i}>
                    <span className="block text-[11px] font-mono text-[#8a8880] uppercase tracking-wider">
                      {m.label}
                    </span>
                    <span className="text-[16px] font-mono font-medium text-[#141413]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={activeStageIndex === 0}
                  onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 text-[12px] font-mono text-[#6e6d68] hover:text-[#141413] disabled:opacity-30 disabled:pointer-events-none rounded border border-[#e4e1d8] bg-[#f5f3ee]"
                >
                  Prev
                </button>
                <button
                  disabled={activeStageIndex === STAGES_DATA.length - 1}
                  onClick={() => setActiveStageIndex((prev) => Math.min(STAGES_DATA.length - 1, prev + 1))}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-[12px] font-mono text-[#faf9f7] bg-[#141413] hover:bg-[#2b2a28] disabled:opacity-30 disabled:pointer-events-none rounded"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual Architecture Column */}
          <div className="lg:col-span-6">
            <div className="bg-[#f3f1ed] border border-[#e4e1d8] rounded-[10px] p-6 sm:p-8">
              {/* Minimal header */}
              <div className="flex items-center justify-between border-b border-[#e2dfd7] pb-4 mb-6">
                <div className="flex items-center gap-2 text-[12px] font-mono text-[#6e6d68]">
                  <span className="w-2 h-2 rounded-full bg-[#141413]"></span>
                  <span>Pipeline State Graph</span>
                </div>
                <span className="text-[11px] font-mono text-[#8a8880] uppercase tracking-wider">
                  Live Vector
                </span>
              </div>

              {/* Stage Flow Nodes */}
              <div className="space-y-4">
                {activeStage.visualFlow.map((nodeText, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center justify-between bg-[#faf9f7] border border-[#e4e1d8] rounded-[6px] px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-[4px] bg-[#ebe7df] text-[#141413] text-[11px] font-mono flex items-center justify-center font-medium">
                          0{idx + 1}
                        </span>
                        <span className="text-[14px] font-medium text-[#141413]">
                          {nodeText}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-[#787670]">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Ready</span>
                      </div>
                    </div>

                    {/* Connecting line */}
                    {idx < activeStage.visualFlow.length - 1 && (
                      <div className="flex justify-center py-1">
                        <div className="w-[1px] h-3 bg-[#d8d4ca]"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Dynamic stage diagnostic preview (code-like typography, not a terminal) */}
              <div className="mt-6 pt-5 border-t border-[#e2dfd7]">
                <div className="text-[11px] font-mono text-[#8a8880] mb-2 flex items-center justify-between">
                  <span>AST CONTRACT INSPECTION</span>
                  <span className="text-emerald-700">STATUS: DETERMINISTIC</span>
                </div>
                <div className="p-3.5 bg-[#eae7df]/80 rounded-[6px] text-[12px] font-mono text-[#383734] space-y-1 overflow-x-auto">
                  <div className="text-[#8c8a82]">// Stage {activeStage.number} Execution Invariant</div>
                  <div>
                    <span className="text-[#964f28]">invariant</span>{' '}
                    <span className="text-[#141413]">Stage_{activeStage.title}</span> {'{'}
                  </div>
                  <div className="pl-4">
                    deterministic: <span className="text-[#2b6cb0]">true</span>;
                  </div>
                  <div className="pl-4">
                    blastRadiusContainment: <span className="text-[#2b6cb0]">true</span>;
                  </div>
                  <div className="pl-4">
                    protocol: <span className="text-[#386b3b]">"mcp://sylor.runtime/{activeStage.id}"</span>;
                  </div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
