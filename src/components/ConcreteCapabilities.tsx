import React, { useState } from 'react';
import { CONCRETE_CAPABILITY_CATEGORIES } from '../data';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const ConcreteCapabilities: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(CONCRETE_CAPABILITY_CATEGORIES[0].id);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const selectedCategoryData =
    CONCRETE_CAPABILITY_CATEGORIES.find((cat) => cat.id === activeCategory) || CONCRETE_CAPABILITY_CATEGORIES[0];

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div className="max-w-[760px] mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Concrete Capabilities
          </span>
          <h2
            id="capabilities-heading"
            className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.08] text-depth-heading"
          >
            What Sylor can actually do.
          </h2>
          <p className="mt-5 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
            Sylor is not a general-purpose chat interface. It is an agentic development environment built with specific, deterministic operations.
          </p>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pb-6 border-b border-[#e8e6e2]">
          {CONCRETE_CAPABILITY_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-left p-4 rounded-[6px] transition-all border ${
                  isSelected
                    ? 'bg-[#ffffff] border-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                    : 'bg-[#f4f2ee] border-transparent hover:border-[#e8e6e2] text-[#737373]'
                }`}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 text-[#737373]">
                  {cat.tag}
                </span>
                <span
                  className={`text-[15px] font-semibold block ${
                    isSelected ? 'text-[#111111]' : 'text-[#737373]'
                  }`}
                >
                  {cat.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Dense Editorial List & Interactive Detail Panel */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Dense List Column */}
          <div className="lg:col-span-7 bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e8e6e2]">
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#111111]">
                {selectedCategoryData.title} Capabilities
              </span>
              <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider">
                Hover to inspect mechanism
              </span>
            </div>

            <div className="space-y-2">
              {selectedCategoryData.items.map((item) => {
                const isHovered = hoveredItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    className={`p-3.5 rounded-[6px] border transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-white border-[#111111] shadow-sm'
                        : 'bg-[#faf9f7] border-[#e8e6e2] hover:border-[#d0cdc4]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[11px] font-bold text-[#737373] mt-0.5">
                          {item.number}
                        </span>
                        <div>
                          <div className="text-[14px] font-semibold text-[#111111]">
                            {item.title}
                          </div>
                          <p className="text-[13px] text-[#737373] mt-0.5 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-[#8a8880] shrink-0 mt-0.5 transition-transform ${
                          isHovered ? 'translate-x-1 text-[#111111]' : ''
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Technical Inspector & Grounding Details */}
          <div className="lg:col-span-5 bg-[#faf9f7] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] font-bold font-mono uppercase tracking-[0.18em] text-[#737373] block mb-2">
                Operational Discipline
              </span>
              <h3 className="text-[20px] font-semibold text-[#111111] tracking-tight">
                {selectedCategoryData.title} & Execution Safety
              </h3>
              <p className="text-[14px] text-[#737373] mt-2 leading-relaxed">
                {selectedCategoryData.description}
              </p>
            </div>

            {/* Focused Item Snapshot */}
            <div className="pt-5 border-t border-[#e8e6e2] bg-[#f4f2ee] p-4 rounded-[6px] border border-[#e8e6e2]">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#737373] block mb-1">
                Selected Operation Spec
              </span>
              {hoveredItemId ? (
                (() => {
                  const currentItem = selectedCategoryData.items.find((i) => i.id === hoveredItemId);
                  return (
                    <div>
                      <div className="text-[14px] font-semibold text-[#111111]">
                        {currentItem?.title}
                      </div>
                      <div className="mt-2 text-[12px] font-mono text-[#111111] bg-white p-2.5 rounded border border-[#e8e6e2]">
                        <span className="text-[#737373]">Engine: </span>
                        {currentItem?.techDetail}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-[12px] font-mono text-[#737373]">
                  Hover over any item in the list to view its underlying AST / protocol mechanism.
                </div>
              )}
            </div>

            <div className="pt-2 text-[12px] text-[#737373] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Zero hallucinations. Grounded directly in your file system.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
