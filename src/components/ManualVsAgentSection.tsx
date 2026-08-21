import React, { useState } from 'react';
import { ArrowRight, AlertCircle, Sparkles, User, Cpu } from 'lucide-react';

export const ManualVsAgentSection: React.FC = () => {
  const [mode, setMode] = useState<'manual' | 'agent'>('agent');

  const MANUAL_STEPS = [
    { number: '01', title: 'Search across 20+ files', detail: 'Grepping regex patterns, finding broken symbol references manually.', tilt: '-rotate-1', noteColor: 'bg-[#fef9c3] border-[#fde047]', pinColor: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]' },
    { number: '02', title: 'Read framework docs', detail: 'Switching context between browser tabs and stackoverflow threads.', tilt: 'rotate-1', noteColor: 'bg-[#ffedd5] border-[#fed7aa]', pinColor: 'from-[#f97316] via-[#ea580c] to-[#c2410c]' },
    { number: '03', title: 'Construct mental model', detail: 'Remembering all call sites and potential regression points in memory.', tilt: '-rotate-1', noteColor: 'bg-[#fef08a] border-[#facc15]', pinColor: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]' },
    { number: '04', title: 'Manual line edits', detail: 'Typing changes across 5 separate files while trying not to introduce syntax bugs.', tilt: 'rotate-1.5', noteColor: 'bg-[#fee2e2] border-[#fca5a5]', pinColor: 'from-[#dc2626] via-[#b91c1c] to-[#7f1d1d]' },
    { number: '05', title: 'Fix broken imports', detail: 'Resolving circular imports and missing TypeScript exports.', tilt: '-rotate-1', noteColor: 'bg-[#ffedd5] border-[#fed7aa]', pinColor: 'from-[#f97316] via-[#ea580c] to-[#c2410c]' },
    { number: '06', title: 'Run tests & regressions', detail: 'Fixing failing snapshot tests and unexpected runtime exceptions.', tilt: 'rotate-1', noteColor: 'bg-[#fee2e2] border-[#fca5a5]', pinColor: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]' },
    { number: '07', title: 'Repeat debug cycle', detail: 'Manually re-testing edge cases in the local browser.', tilt: '-rotate-1', noteColor: 'bg-[#fef9c3] border-[#fde047]', pinColor: 'from-[#dc2626] via-[#b91c1c] to-[#7f1d1d]' }
  ];

  const AGENT_STEPS = [
    { number: '01', title: 'Describe the goal', detail: 'Specify your intent in plain technical language directly in your editor.', tilt: '-rotate-1', noteColor: 'bg-[#fef9c3] border-[#fde047]', pinColor: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]' },
    { number: '02', title: 'Sylor understands', detail: 'Automatically indexes AST symbols, imports, and repo Markdown skills.', tilt: 'rotate-1', noteColor: 'bg-[#e0f2fe] border-[#bae6fd]', pinColor: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]' },
    { number: '03', title: 'Sylor plans', detail: 'Formulates an atomic execution DAG with clear rollback safety gates.', tilt: '-rotate-1', noteColor: 'bg-[#f3e8ff] border-[#e9d5ff]', pinColor: 'from-[#a855f7] via-[#9333ea] to-[#7e22ce]' },
    { number: '04', title: 'Sylor works', detail: 'Applies surgical AST diffs and verifies TypeScript compilation.', tilt: 'rotate-1.5', noteColor: 'bg-[#ffedd5] border-[#fed7aa]', pinColor: 'from-[#f97316] via-[#ea580c] to-[#c2410c]' },
    { number: '05', title: 'You review', detail: 'Inspect clean, verified git diffs with full human control.', tilt: '-rotate-1', noteColor: 'bg-[#dcfce7] border-[#bbf7d0]', pinColor: 'from-[#10b981] via-[#059669] to-[#047857]' }
  ];

  const currentSteps = mode === 'manual' ? MANUAL_STEPS : AGENT_STEPS;

  return (
    <section
      id="before-after"
      aria-labelledby="comparison-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
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
              <span>MANUAL (7 Steps)</span>
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
              <span>AGENT (5 Steps)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Alternating Left-Right Sticky Notes */}
        <div className="mt-12 space-y-5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] border-b border-[#e8e6e2] pb-3">
            <span className={`px-2.5 py-1 rounded font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
              mode === 'manual' 
                ? 'text-amber-900 bg-amber-100 border border-amber-300' 
                : 'text-emerald-900 bg-emerald-100 border border-emerald-300'
            }`}>
              {mode === 'manual' ? <AlertCircle className="w-3.5 h-3.5 text-amber-700" /> : <Sparkles className="w-3.5 h-3.5 text-emerald-700" />}
              <span>{mode === 'manual' ? 'High Friction Manual Loop' : 'Deterministic Agentic Compression'}</span>
            </span>
            <span className="font-mono font-semibold text-[#141413]">
              {mode === 'manual' ? '7 Sequential Steps' : '5 Verified Stages'}
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {currentSteps.map((step, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`flex ${isLeft ? 'justify-start sm:pr-16 md:pr-32' : 'justify-end sm:pl-16 md:pl-32'}`}
                >
                  <div
                    className={`relative w-full sm:w-[92%] p-4 pt-5 rounded-[3px] border transition-all duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:scale-[1.01] ${step.noteColor} ${step.tilt} hover:rotate-0`}
                  >
                    {/* Realistic Pushpin */}
                    <div className="absolute -top-2.5 left-6 z-20 flex flex-col items-center pointer-events-none">
                      <div
                        className={`w-4 h-4 rounded-full bg-gradient-to-br ${step.pinColor} shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/60 flex items-center justify-center`}
                      >
                        <div className="w-1 h-1 rounded-full bg-white/70"></div>
                      </div>
                      <div className="w-0.5 h-2 bg-black/20 -mt-0.5"></div>
                    </div>

                    {/* Small Tape Strip */}
                    <div className="absolute -top-2 right-4 w-12 h-3.5 bg-black/[0.04] backdrop-blur-[1px] rotate-[2deg] border border-black/[0.05] pointer-events-none"></div>

                    {/* Sticky Note Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-black/[0.08] pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-[3px] bg-black/[0.08] text-[#141413] text-[11px] font-mono font-bold flex items-center justify-center">
                          {step.number}
                        </span>
                        <span className="text-[14px] font-mono font-bold text-[#141413]">
                          {step.title}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#666]">
                        {mode === 'manual' ? 'MANUAL' : 'AGENTIC'}
                      </span>
                    </div>

                    {/* Sticky Note Description */}
                    <p className="text-[12.5px] font-mono text-[#3f3e3a] leading-relaxed">
                      {step.detail}
                    </p>

                    {/* Footer tag */}
                    <div className="mt-2.5 pt-2 border-t border-black/[0.06] flex items-center justify-between text-[10.5px] font-mono text-[#5c5b56]">
                      <span className="flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-[#141413]" />
                        <span>{mode === 'manual' ? 'Context load: HIGH' : 'AST verified: 0 errors'}</span>
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

          {/* Hanging Quote Note at Bottom */}
          <div className="pt-8 flex justify-center">
            <div className="relative w-full max-w-[620px] bg-[#fbf7e8] border border-[#e8dfc5] p-5 pt-6 rounded-[2px] shadow-[0_12px_28px_rgba(0,0,0,0.08)] rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
              {/* Pushpin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c84032] via-[#a82a1e] to-[#731911] shadow-[0_3px_6px_rgba(0,0,0,0.35)] border border-[#e26d60] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                </div>
                <div className="w-1 h-2.5 bg-black/20 blur-[0.5px] -mt-0.5 rounded-b-full"></div>
              </div>

              <blockquote className="text-[15px] sm:text-[16px] text-[#2c281e] font-mono text-center leading-relaxed italic">
                "Sylor does not replace engineering judgement. It compresses the distance between intention and implementation."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
