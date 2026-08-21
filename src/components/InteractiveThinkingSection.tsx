import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ArrowRight, CheckCircle2, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { THINKING_TASKS } from '../data';

export const InteractiveThinkingSection: React.FC = () => {
  const [activeTaskId, setActiveTaskId] = useState<string>(THINKING_TASKS[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeTask = THINKING_TASKS.find((t) => t.id === activeTaskId) || THINKING_TASKS[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStepIndex((prev) => {
          if (prev < activeTask.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeTask]);

  const handleTaskChange = (taskId: string) => {
    setActiveTaskId(taskId);
    setActiveStepIndex(0);
    setIsPlaying(true);
  };

  const handleReplay = () => {
    setActiveStepIndex(0);
    setIsPlaying(true);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveStepIndex((prev) => Math.min(prev + 1, activeTask.steps.length - 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section
      id="how-sylor-thinks"
      aria-labelledby="thinking-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e8e6e2]">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
              Cognitive Breakdown
            </span>
            <h2
              id="thinking-heading"
              className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.05]"
            >
              Give it a problem.
            </h2>
            <p className="text-[16px] text-[#737373] mt-2">
              Watch how an agent can break it down.
            </p>
          </div>

          
          <div className="flex flex-wrap gap-2">
            {THINKING_TASKS.map((task) => (
              <button
                key={task.id}
                onClick={() => handleTaskChange(task.id)}
                className={`text-[12px] px-3 py-1.5 rounded-[4px] border transition-all ${
                  activeTaskId === task.id
                    ? 'bg-[#111111] text-[#faf9f7] border-[#111111] font-semibold'
                    : 'bg-white text-[#555555] border-[#e8e6e2] hover:bg-[#f3f1ed]'
                }`}
              >
                {task.title}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Thinking Canvas */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Stepper (col-span-5) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mb-3">
              Task Prompt:
            </div>
            <div className="p-4 bg-white border border-[#e8e6e2] rounded-[8px] mb-6 shadow-sm">
              <span className="text-[14px] font-medium text-[#111111] leading-relaxed">
                "{activeTask.prompt}"
              </span>
            </div>

            <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mb-3">
              Reasoning Sequence:
            </div>

            <div className="space-y-2">
              {activeTask.steps.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPassed = idx < activeStepIndex;

                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStepIndex(idx);
                    }}
                    className={`cursor-pointer p-3 rounded-[6px] border transition-all ${
                      isActive
                        ? 'bg-[#111111] text-[#faf9f7] border-[#111111] shadow-sm'
                        : isPassed
                        ? 'bg-[#f4f2ee] text-[#111111] border-[#e8e6e2]'
                        : 'bg-white text-[#8a8880] border-[#f0eee9] hover:bg-[#faf9f7]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] font-bold opacity-60">
                          {step.number}
                        </span>
                        <span className="text-[13px] font-medium">
                          {step.phase}
                        </span>
                      </div>
                      {isPassed && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      {isActive && (
                        <span className="text-[9px] font-mono uppercase bg-white/15 px-1.5 py-0.5 rounded text-emerald-400">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#e8e6e2]">
              <div className="flex items-center gap-2">
                {!isPlaying ? (
                  <button
                    onClick={handleReplay}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#faf9f7] bg-[#111111] rounded-[4px] hover:bg-[#2c2b29] transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Replay</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111] bg-[#e8e5dc] rounded-[4px] hover:bg-[#dedad0] transition-all"
                  >
                    <span>Pause</span>
                  </button>
                )}

                <button
                  onClick={handlePrev}
                  disabled={activeStepIndex === 0}
                  className="px-2.5 py-1.5 text-[11px] font-mono text-[#555555] bg-white border border-[#e8e6e2] rounded-[4px] hover:bg-[#f3f1ed] disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeStepIndex === activeTask.steps.length - 1}
                  className="px-2.5 py-1.5 text-[11px] font-mono text-[#555555] bg-white border border-[#e8e6e2] rounded-[4px] hover:bg-[#f3f1ed] disabled:opacity-40"
                >
                  Next
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#737373]">
                Step {activeStepIndex + 1} of {activeTask.steps.length}
              </span>
            </div>
          </div>

          {/* Right Column: Deep Insight & Artifact Preview (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] border-b border-[#f0eee9] pb-4 mb-6">
                <span className="uppercase tracking-wider font-semibold text-[#111111]">
                  Stage Detail • {activeTask.steps[activeStepIndex].phase}
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                  Target: {activeTask.steps[activeStepIndex].fileOrArtifact}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-[20px] font-semibold text-[#111111] mb-3">
                  {activeTask.steps[activeStepIndex].action}
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">
                  {activeTask.steps[activeStepIndex].insight}
                </p>
              </div>

              <div className="p-4 bg-[#faf9f7] border border-[#e8e6e2] rounded-[8px] mb-6">
                <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mb-2">
                  Ground Truth Verification:
                </div>
                <div className="text-[13px] font-mono text-[#111111]">
                  {activeTask.finalVerification}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#f0eee9] text-[12px] text-[#737373]">
                <span>AST grounded • Zero hallucinations</span>
                <span>Deterministic closure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
