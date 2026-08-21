import React from 'react';

export const IntroStatement: React.FC = () => {
  return (
    <section
      id="manifesto"
      aria-label="Sylor Manifesto"
      className="py-28 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="max-w-[820px]">
          
          <div className="flex items-center gap-3 text-[12px] font-mono uppercase tracking-[0.16em] text-[#8c8a83] mb-8">
            <span>Core Premise</span>
            <span className="w-8 h-[1px] bg-[#d8d5cb]"></span>
            <span>Rethinking The Coding Agent</span>
          </div>

          
          <h2 className="text-[34px] sm:text-[46px] md:text-[56px] font-medium text-[#141413] tracking-[-0.04em] leading-[1.08] text-depth-heading">
            Sylor is not just where you ask for code.
          </h2>

          
          <p className="mt-8 text-[18px] sm:text-[21px] md:text-[23px] text-[#5e5d58] leading-[1.6] font-normal">
            It is an environment where an agent can understand your project, plan work,
            use tools, modify systems, and adapt to the way you build.
          </p>

          
          <div className="mt-16 pt-10 border-t border-[#e8e6e2] grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-[32px] font-mono font-medium text-[#141413] tracking-tight">
                01
              </div>
              <div className="mt-1 text-[14px] font-medium text-[#141413]">
                Zero Blind Edits
              </div>
              <p className="mt-1 text-[13px] text-[#787670] leading-relaxed">
                Indexes project abstract syntax trees before issuing mutations.
              </p>
            </div>

            <div>
              <div className="text-[32px] font-mono font-medium text-[#141413] tracking-tight">
                02
              </div>
              <div className="mt-1 text-[14px] font-medium text-[#141413]">
                Open Protocols
              </div>
              <p className="mt-1 text-[13px] text-[#787670] leading-relaxed">
                Integrates via standard MCP servers without proprietary lock-in.
              </p>
            </div>

            <div>
              <div className="text-[32px] font-mono font-medium text-[#141413] tracking-tight">
                03
              </div>
              <div className="mt-1 text-[14px] font-medium text-[#141413]">
                Closed-Loop Verification
              </div>
              <p className="mt-1 text-[13px] text-[#787670] leading-relaxed">
                Compiles, tests, and self-heals until code is strictly green.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
