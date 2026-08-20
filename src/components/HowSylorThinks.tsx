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
  ChevronRight
} from 'lucide-react';

export const HowSylorThinks: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>(THOUGHT_STAGES[0].id);

  const activeStage =
    THOUGHT_STAGES.find((s) => s.id === activeStageId) || THOUGHT_STAGES[0];

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

  return (
    <section
      id="how-sylor-thinks"
      aria-labelledby="thinks-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[760px] mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Agent Cognition
          </span>
          <h2
            id="thinks-heading"
            className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.06] text-depth-heading"
          >
            One request. A chain of decisions.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
            Sylor does not jump blindly into rewriting code. Every prompt triggers an 8-stage sequence designed to maintain codebase integrity.
          </p>
        </div>

        {/* 8-Stage Sequential Navigation Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pb-6 border-b border-[#e8e6e2]">
          {THOUGHT_STAGES.map((stage) => {
            const isSelected = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-3 text-left rounded-[6px] transition-all border ${
                  isSelected
                    ? 'bg-white border-[#111111] text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-semibold'
                    : 'bg-[#f4f2ee] border-transparent text-[#737373] hover:text-[#111111] hover:border-[#e8e6e2]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#737373]">
                    {stage.stepNumber}
                  </span>
                  <span className={isSelected ? 'text-[#111111]' : 'text-[#737373]'}>
                    {getStageIcon(stage.id)}
                  </span>
                </div>
                <div className="text-[12px] leading-tight truncate">
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Interactive Deep Dive Panel */}
        <div className="mt-8 bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stage Explanation & Action */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold text-[#737373]">
                  STAGE {activeStage.stepNumber}
                </span>
                <span className="text-[#d8d5cb]">/</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#111111]">
                  {activeStage.title}
                </span>
              </div>

              <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#111111] tracking-tight">
                {activeStage.shortSummary}
              </h3>
              <p className="text-[15px] text-[#737373] mt-3 leading-relaxed">
                {activeStage.fullDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-[#e8e6e2]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373] block mb-2">
                Primary Agent Action
              </span>
              <div className="p-3.5 bg-white rounded-[6px] border border-[#e8e6e2] font-mono text-[13px] text-[#111111]">
                {activeStage.agentAction}
              </div>
            </div>
          </div>

          {/* Right Column: Codebase Impact & Artifact */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#faf9f7] p-5 sm:p-6 rounded-[8px] border border-[#e8e6e2] space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373] block">
                Codebase Impact & Verification Guard
              </span>
              <div className="text-[14px] text-[#111111] leading-relaxed">
                {activeStage.codebaseImpact}
              </div>

              <div className="pt-4 border-t border-[#e8e6e2]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373] block mb-1.5">
                  Generated Artifact / Trace
                </span>
                <div className="p-3 bg-[#f4f2ee] rounded border border-[#e8e6e2] font-mono text-[11px] text-[#111111]">
                  {activeStage.outputArtifact}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
