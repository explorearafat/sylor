import React, { useState } from 'react';
import { CORE_CAPABILITIES, ECOSYSTEM_CAPABILITIES } from '../data';
import { CapabilityItem } from '../types';
import { Sparkles, ArrowRight, Zap, Code, Shield } from 'lucide-react';

export const TwoSidedMatrix: React.FC = () => {
  const [selectedCap, setSelectedCap] = useState<CapabilityItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="matrix"
      aria-labelledby="matrix-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[720px] mb-16 md:mb-20">
          <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#8a8880] block mb-3">
            Two-Sided Architecture
          </span>
          <h2
            id="matrix-heading"
            className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#141413] tracking-[-0.04em] leading-[1.08] text-depth-heading"
          >
            Internal comprehension meets external extensibility.
          </h2>
          <p className="mt-5 text-[17px] text-[#6e6d68] leading-relaxed">
            Sylor balances deep semantic code comprehension on the left with open protocol tool orchestration on the right.
          </p>
        </div>

        {/* Two-Sided Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch">
          {/* Left Column: Core Cognitive Capabilities */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8e6e2]">
              <span className="text-[12px] font-mono uppercase tracking-wider text-[#141413] font-medium">
                Cognitive Core (Internal)
              </span>
              <span className="text-[11px] font-mono text-[#8a8880]">05 Subsystems</span>
            </div>

            <div className="space-y-4">
              {CORE_CAPABILITIES.map((cap, idx) => {
                const isHovered = hoveredId === cap.id;
                const isSelected = selectedCap?.id === cap.id;
                return (
                  <div
                    key={cap.id}
                    onMouseEnter={() => setHoveredId(cap.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedCap(isSelected ? null : cap)}
                    className={`group cursor-pointer transition-all duration-300 py-3.5 px-4 rounded-[6px] border ${
                      isSelected
                        ? 'bg-[#f2efe9] border-[#c8c5bc] shadow-sm'
                        : isHovered
                        ? 'bg-[#f7f5f0] border-[#d8d5cb] translate-x-1.5'
                        : 'bg-transparent border-transparent hover:border-[#e8e6e2]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-[#8a8880]">
                          0{idx + 1}
                        </span>
                        <h4 className="text-[16px] font-medium text-[#141413] tracking-[-0.01em]">
                          {cap.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#8a8880]">
                        {cap.latency}
                      </span>
                    </div>

                    <div className="mt-1 pl-7 text-[13px] text-[#6e6d68] line-clamp-1 group-hover:line-clamp-none transition-all">
                      {cap.subtitle}
                    </div>

                    {(isHovered || isSelected) && (
                      <div className="mt-2.5 pl-7 pt-2.5 border-t border-[#e2dfd7] text-[13px] text-[#42413e] leading-relaxed animate-in fade-in duration-200">
                        {cap.description}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {cap.features.map((feat, fi) => (
                            <span
                              key={fi}
                              className="text-[11px] font-mono bg-[#eae7df] text-[#484642] px-2 py-0.5 rounded"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Column: Sylor Nexus Spine */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-8 lg:py-0 border-y lg:border-y-0 lg:border-x border-[#e8e6e2] px-4">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Central Spine Node */}
              <div className="w-[1px] h-8 lg:h-16 bg-[#d8d5cb]"></div>

              <div className="relative group">
                <div className="w-16 h-16 rounded-[12px] bg-[#141413] text-[#faf9f7] flex flex-col items-center justify-center shadow-md transition-transform group-hover:scale-105">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8a69e]">
                    Core
                  </span>
                  <span className="text-[18px] font-semibold tracking-tighter">
                    SYLOR
                  </span>
                </div>
                <div className="absolute -inset-1.5 rounded-[14px] border border-[#141413]/10 pointer-events-none"></div>
              </div>

              <div className="text-[11px] font-mono text-[#8a8880] uppercase tracking-wider max-w-[120px]">
                Deterministic Bus
              </div>

              <div className="w-[1px] h-8 lg:h-16 bg-[#d8d5cb]"></div>
            </div>
          </div>

          {/* Right Column: Ecosystem & Extensibility Capabilities */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8e6e2]">
              <span className="text-[12px] font-mono uppercase tracking-wider text-[#141413] font-medium">
                Ecosystem & Tools (External)
              </span>
              <span className="text-[11px] font-mono text-[#8a8880]">05 Integrations</span>
            </div>

            <div className="space-y-4">
              {ECOSYSTEM_CAPABILITIES.map((cap, idx) => {
                const isHovered = hoveredId === cap.id;
                const isSelected = selectedCap?.id === cap.id;
                return (
                  <div
                    key={cap.id}
                    onMouseEnter={() => setHoveredId(cap.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedCap(isSelected ? null : cap)}
                    className={`group cursor-pointer transition-all duration-300 py-3.5 px-4 rounded-[6px] border ${
                      isSelected
                        ? 'bg-[#f2efe9] border-[#c8c5bc] shadow-sm'
                        : isHovered
                        ? 'bg-[#f7f5f0] border-[#d8d5cb] -translate-x-1.5'
                        : 'bg-transparent border-transparent hover:border-[#e8e6e2]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-[#8a8880]">
                          0{idx + 1}
                        </span>
                        <h4 className="text-[16px] font-medium text-[#141413] tracking-[-0.01em]">
                          {cap.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#8a8880]">
                        {cap.latency}
                      </span>
                    </div>

                    <div className="mt-1 pl-7 text-[13px] text-[#6e6d68] line-clamp-1 group-hover:line-clamp-none transition-all">
                      {cap.subtitle}
                    </div>

                    {(isHovered || isSelected) && (
                      <div className="mt-2.5 pl-7 pt-2.5 border-t border-[#e2dfd7] text-[13px] text-[#42413e] leading-relaxed animate-in fade-in duration-200">
                        {cap.description}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {cap.features.map((feat, fi) => (
                            <span
                              key={fi}
                              className="text-[11px] font-mono bg-[#eae7df] text-[#484642] px-2 py-0.5 rounded"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Deep-Dive Banner */}
        {selectedCap && (
          <div className="mt-12 p-6 bg-[#f3f1ed] border border-[#e2dfd7] rounded-[8px] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#8a8880] mb-1">
                Active Architectural Inspector • {selectedCap.protocol}
              </div>
              <div className="text-[16px] font-medium text-[#141413]">
                {selectedCap.title} — {selectedCap.description}
              </div>
            </div>
            <button
              onClick={() => setSelectedCap(null)}
              className="text-[12px] font-mono text-[#6e6d68] hover:text-[#141413] px-3 py-1.5 rounded border border-[#d8d5cb] bg-[#faf9f7] self-start md:self-auto"
            >
              Dismiss Inspector
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
