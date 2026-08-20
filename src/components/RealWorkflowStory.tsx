import React, { useState } from 'react';
import { WORKFLOW_STORY_STEPS } from '../data';
import { Check, ChevronRight, FileCode, CheckCircle2, Terminal } from 'lucide-react';

export const RealWorkflowStory: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const currentStep = WORKFLOW_STORY_STEPS[activeStepIndex];

  return (
    <section
      id="workflow-story"
      aria-labelledby="story-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[760px] mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Case Study Walkthrough
          </span>
          <h2
            id="story-heading"
            className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.06] text-depth-heading"
          >
            A real workflow: Adding dark mode.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
            Follow the complete chronological trace of Sylor receiving a single developer request, inspecting dependencies, writing theme providers, and verifying UI tokens.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-6 border-b border-[#e8e6e2]">
          {WORKFLOW_STORY_STEPS.map((step, idx) => {
            const isSelected = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 text-left rounded-[6px] transition-all border ${
                  isSelected
                    ? 'bg-white border-[#111111] text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-semibold'
                    : 'bg-[#f4f2ee] border-transparent text-[#737373] hover:text-[#111111] hover:border-[#e8e6e2]'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px] font-mono font-bold uppercase text-[#737373]">
                  <span>Step 0{idx + 1}</span>
                  <span className="text-[9px] px-1 bg-[#e8e6e2] rounded">{step.phase}</span>
                </div>
                <div className="text-[13px] leading-tight truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Chronological View */}
        <div className="mt-8 bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: What Sylor Did (col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[11px] font-mono text-[#737373]">
                <span className="font-bold text-[#111111]">STEP 0{activeStepIndex + 1} OF 04</span>
                <span>/</span>
                <span className="uppercase">{currentStep.phase}</span>
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#111111] tracking-tight">
                {currentStep.title}
              </h3>
              <p className="text-[15px] text-[#737373] mt-3 leading-relaxed">
                {currentStep.action}
              </p>
            </div>

            <div className="pt-4 border-t border-[#e8e6e2] space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373] block mb-1">
                Files Inspected or Modified
              </span>
              <div className="space-y-1.5 font-mono text-[12px]">
                {currentStep.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-white rounded border border-[#e8e6e2] flex items-center gap-2 text-[#111111]"
                  >
                    <FileCode className="w-3.5 h-3.5 text-[#737373]" />
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Code Snippet / Output / Proof (col-span-6) */}
          <div className="lg:col-span-6 bg-[#faf9f7] p-5 sm:p-7 rounded-[8px] border border-[#e8e6e2] space-y-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373] block mb-2">
                Execution Artifact / Verification Output
              </span>
              <div className="p-3.5 bg-[#f4f2ee] rounded border border-[#e8e6e2] font-mono text-[12px] text-[#111111] leading-relaxed whitespace-pre-wrap">
                {currentStep.codeDiffSnippet}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e8e6e2] flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2 text-emerald-800 font-medium font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{currentStep.verificationStatus}</span>
              </div>

              {activeStepIndex < WORKFLOW_STORY_STEPS.length - 1 && (
                <button
                  onClick={() => setActiveStepIndex((prev) => prev + 1)}
                  className="flex items-center gap-1 text-[12px] font-mono font-semibold text-[#111111] hover:underline"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
