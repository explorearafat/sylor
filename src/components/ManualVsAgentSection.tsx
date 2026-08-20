import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, User, Cpu } from 'lucide-react';

export const ManualVsAgentSection: React.FC = () => {
  const [mode, setMode] = useState<'manual' | 'agent'>('agent');

  const MANUAL_STEPS = [
    { number: '01', title: 'Search across 20+ files', detail: 'Grepping regex patterns, finding broken symbol references manually.' },
    { number: '02', title: 'Read framework documentation', detail: 'Switching context between browser tabs and stackoverflow threads.' },
    { number: '03', title: 'Construct mental model', detail: 'Remembering all call sites and potential regression points in memory.' },
    { number: '04', title: 'Manual line-by-line edits', detail: 'Typing changes across 5 separate files while trying not to introduce syntax bugs.' },
    { number: '05', title: 'Fix broken type imports', detail: 'Resolving circular imports and missing TypeScript exports.' },
    { number: '06', title: 'Run tests & hit regressions', detail: 'Fixing failing snapshot tests and unexpected runtime exceptions.' },
    { number: '07', title: 'Repeat debug cycle', detail: 'Manually re-testing edge cases in the local browser.' }
  ];

  const AGENT_STEPS = [
    { number: '01', title: 'Describe the goal', detail: 'Specify your intent in plain technical language directly in your editor.' },
    { number: '02', title: 'Sylor understands', detail: 'Automatically indexes AST symbols, imports, and repo Markdown skills.' },
    { number: '03', title: 'Sylor plans', detail: 'Formulates an atomic execution DAG with clear rollback safety gates.' },
    { number: '04', title: 'Sylor works', detail: 'Applies surgical AST diffs and verifies TypeScript compilation.' },
    { number: '05', title: 'You review', detail: 'Inspect clean, verified git diffs with full human control.' }
  ];

  return (
    <section
      id="before-after"
      aria-labelledby="comparison-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e8e6e2]">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
              Workflow Compression
            </span>
            <h2
              id="comparison-heading"
              className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.05]"
            >
              Feel the difference.
            </h2>
            <p className="text-[16px] text-[#737373] mt-2">
              Compressing the distance between intention and implementation.
            </p>
          </div>

          {/* Interactive Toggle Switch */}
          <div className="inline-flex p-1 bg-[#eae7df] rounded-[8px] border border-[#d8d5cb]">
            <button
              onClick={() => setMode('manual')}
              className={`flex items-center gap-2 px-4 py-2 text-[12px] font-mono font-semibold rounded-[6px] transition-all ${
                mode === 'manual'
                  ? 'bg-[#111111] text-[#faf9f7] shadow-sm'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>MANUAL (Without Agent)</span>
            </button>

            <button
              onClick={() => setMode('agent')}
              className={`flex items-center gap-2 px-4 py-2 text-[12px] font-mono font-semibold rounded-[6px] transition-all ${
                mode === 'agent'
                  ? 'bg-[#111111] text-[#faf9f7] shadow-sm'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AGENT (With Sylor)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Workflow View */}
        <div className="mt-10">
          {mode === 'manual' ? (
            <div className="bg-white border border-[#e8e6e2] rounded-[12px] p-6 sm:p-8 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] border-b border-[#f0eee9] pb-4 mb-6">
                <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  High Cognitive Friction & Context Switching
                </span>
                <span>7 Sequential Manual Cycles</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MANUAL_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="p-4 bg-[#faf9f7] border border-[#e8e6e2] rounded-[8px]"
                  >
                    <span className="font-mono text-[11px] font-bold text-[#8a8880] block mb-2">
                      {step.number}
                    </span>
                    <h3 className="text-[14px] font-semibold text-[#111111] mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-[12px] text-[#737373] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-[#f0eee9] text-[13px] text-[#737373] italic text-center">
                Manual workflows require juggling dozens of mental context variables across multiple editors and browser tabs.
              </div>
            </div>
          ) : (
            <div className="bg-[#111111] text-[#faf9f7] border border-[#2c2b29] rounded-[12px] p-6 sm:p-8 shadow-md animate-fade-in">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8a8880] border-b border-white/10 pb-4 mb-6">
                <span className="text-emerald-400 bg-white/10 px-2 py-0.5 rounded font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Compressed Agentic Execution
                </span>
                <span className="text-[#b0ada5]">Closed-Loop Verification</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {AGENT_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="p-4 bg-white/5 border border-white/10 rounded-[8px] hover:bg-white/10 transition-colors"
                  >
                    <span className="font-mono text-[11px] font-bold text-emerald-400 block mb-2">
                      {step.number}
                    </span>
                    <h3 className="text-[14px] font-semibold text-white mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-[12px] text-[#b0ada5] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <blockquote className="text-[16px] sm:text-[18px] text-[#faf9f7] font-medium max-w-[720px] mx-auto leading-relaxed">
                  "Sylor does not replace engineering judgement. It compresses the distance between intention and implementation."
                </blockquote>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
