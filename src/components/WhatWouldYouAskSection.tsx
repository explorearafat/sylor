import React from 'react';
import { CURATED_QUESTIONS } from '../data';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';

interface WhatWouldYouAskProps {
  onSelectPrompt: (prompt: string) => void;
}

export const WhatWouldYouAskSection: React.FC<WhatWouldYouAskProps> = ({ onSelectPrompt }) => {
  return (
    <section
      id="curated-prompts"
      aria-labelledby="prompts-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[720px] mb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Real Prompts
          </span>
          <h2
            id="prompts-heading"
            className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.05]"
          >
            What would you ask an agent?
          </h2>
          <p className="text-[16px] text-[#737373] mt-3 leading-relaxed">
            Click any prompt below to run it through the simulated reasoning workflow.
          </p>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CURATED_QUESTIONS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group cursor-pointer bg-white border border-[#e8e6e2] rounded-[10px] p-6 shadow-sm hover:border-[#111111] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373] bg-[#f5f3ee] px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#737373] group-hover:text-[#111111] transition-colors">
                    <span>Try</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-[16px] font-semibold text-[#111111] mb-1.5 group-hover:text-[#111111]">
                  {item.title}
                </h3>
                <p className="text-[12px] text-[#737373] mb-4">
                  {item.subtitle}
                </p>

                <div className="p-3 bg-[#faf9f7] border border-[#e8e6e2] rounded-[6px] text-[12px] font-mono text-[#444444] group-hover:bg-[#f5f3ee] transition-colors">
                  "{item.prompt}"
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f0eee9] flex items-center justify-between text-[11px] text-[#8a8880] font-mono">
                <span>Runs in agent loop</span>
                <span className="text-emerald-700 font-semibold">Simulated demo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
