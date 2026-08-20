import React from 'react';
import { PHILOSOPHY_ITEMS } from '../data';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[760px] mb-16">
          <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#8a8880] block mb-3">
            Why Sylor
          </span>
          <h2
            id="philosophy-heading"
            className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#141413] tracking-[-0.04em] leading-[1.08] text-depth-heading"
          >
            The shift from passive chat to active agent.
          </h2>
          <p className="mt-5 text-[17px] text-[#6e6d68] leading-relaxed">
            Chat models hallucinate disconnected snippets. Sylor operates as a disciplined,
            context-aware software engineer integrated into your actual environment.
          </p>
        </div>

        {/* Philosophy Comparison Table */}
        <div className="border border-[#e4e1d8] rounded-[12px] overflow-hidden bg-[#fbfaf8]">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#f3f1ed] p-4 sm:p-5 border-b border-[#e4e1d8] font-mono text-[12px] uppercase tracking-wider text-[#787670]">
            <div className="md:col-span-3">Dimension</div>
            <div className="md:col-span-4 text-[#8a8880] hidden md:block">Generic Chatbot</div>
            <div className="md:col-span-5 text-[#141413] font-semibold hidden md:block">
              Sylor AI Agent
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#e8e6e2]">
            {PHILOSOPHY_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-4 md:gap-6 items-start hover:bg-[#faf8f4] transition-colors"
              >
                <div className="md:col-span-3">
                  <span className="text-[15px] font-medium text-[#141413]">
                    {item.dimension}
                  </span>
                </div>

                {/* Chat Model Column */}
                <div className="md:col-span-4 space-y-1">
                  <span className="md:hidden text-[11px] font-mono uppercase text-[#8a8880] block">
                    Generic Chatbot:
                  </span>
                  <div className="flex items-start gap-2 text-[14px] text-[#787670] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bbb8af] mt-2 shrink-0"></span>
                    <span>{item.chatModel}</span>
                  </div>
                </div>

                {/* Sylor Agent Column */}
                <div className="md:col-span-5 space-y-1">
                  <span className="md:hidden text-[11px] font-mono uppercase text-[#141413] font-semibold block">
                    Sylor Agent:
                  </span>
                  <div className="flex items-start gap-2 text-[14px] text-[#141413] font-medium leading-relaxed bg-[#f2efe8]/60 p-2.5 rounded-[6px] border border-[#e5e2d9]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#141413] mt-2 shrink-0"></span>
                    <span>{item.sylorAgent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
