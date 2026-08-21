import React, { useState } from 'react';
import { REAL_USER_SCENARIOS } from '../data';
import { FileCode, ShieldCheck } from 'lucide-react';

export const RealScenarios: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(REAL_USER_SCENARIOS[0].id);

  const activeScenario =
    REAL_USER_SCENARIOS.find((s) => s.id === activeScenarioId) || REAL_USER_SCENARIOS[0];

  return (
    <section
      id="scenarios"
      aria-labelledby="scenarios-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div className="max-w-[760px] mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Real Developer Scenarios
          </span>
          <h2
            id="scenarios-heading"
            className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.06] text-depth-heading"
          >
            Give Sylor a real problem.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
            See how Sylor navigates complex, multi-file developer requests from initial command to verified, production-ready code.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 pb-6 border-b border-[#e8e6e2]">
          {REAL_USER_SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`p-3.5 text-left rounded-[6px] transition-all border ${
                  isSelected
                    ? 'bg-white border-[#111111] text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-semibold'
                    : 'bg-[#f4f2ee] border-transparent text-[#737373] hover:text-[#111111] hover:border-[#e8e6e2]'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373] mb-1">
                  {scenario.category}
                </div>
                <div className="text-[13px] leading-snug line-clamp-2">
                  {scenario.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Scenario Deep Dive Workspace Card */}
        <div className="mt-8 bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-9 space-y-8">
          {/* Top: User Request Prompt */}
          <div className="bg-white border border-[#e8e6e2] rounded-[8px] p-5">
            <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#737373] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
              <span>User Prompt to Sylor</span>
            </div>
            <div className="text-[16px] sm:text-[18px] font-mono text-[#111111] font-medium leading-relaxed">
              "{activeScenario.userPrompt}"
            </div>
          </div>

          {/* Middle: 3-Column Execution Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Step-by-Step Plan (col-span-5) */}
            <div className="lg:col-span-5 bg-[#faf9f7] border border-[#e8e6e2] rounded-[8px] p-5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#111111] pb-3 mb-3 border-b border-[#e8e6e2]">
                  Plan & Tool Invocations
                </div>
                <div className="space-y-3">
                  {activeScenario.planSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#111111]">
                      <span className="font-mono text-[11px] font-bold text-[#737373] mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e8e6e2] flex items-center justify-between text-[11px] font-mono text-[#737373]">
                <span>Total execution time: {activeScenario.executionTime}</span>
                <span className="text-emerald-700 font-semibold">0 hallucinations</span>
              </div>
            </div>

            {/* Files Touched & Diffs (col-span-4) */}
            <div className="lg:col-span-4 bg-[#faf9f7] border border-[#e8e6e2] rounded-[8px] p-5">
              <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#111111] pb-3 mb-3 border-b border-[#e8e6e2]">
                Files Modified Surgically
              </div>
              <div className="space-y-2 font-mono text-[12px]">
                {activeScenario.filesModified.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-[#f4f2ee] rounded border border-[#e8e6e2] text-[#111111]"
                  >
                    <FileCode className="w-3.5 h-3.5 text-[#737373] shrink-0" />
                    <span className="truncate">{file}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Proof (col-span-3) */}
            <div className="lg:col-span-3 bg-[#faf9f7] border border-[#e8e6e2] rounded-[8px] p-5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#111111] pb-3 mb-3 border-b border-[#e8e6e2]">
                  Verification Proof
                </div>
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded text-[12px] text-emerald-900 leading-relaxed font-mono">
                  {activeScenario.verificationProof}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e8e6e2] flex items-center gap-1.5 text-[11px] text-[#737373]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Deterministic invariant check passed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
