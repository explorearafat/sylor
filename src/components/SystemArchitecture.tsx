import React, { useState } from 'react';
import { ARCHITECTURE_COMPONENTS } from '../data';
import {
  Brain,
  Database,
  Wrench,
  ShieldCheck,
  FolderGit2,
  ArrowDown,
  ArrowRight,
  Layers,
  Cpu
} from 'lucide-react';
import { SylorLogo } from './SylorLogo';

export const SystemArchitecture: React.FC = () => {
  const [selectedBlockId, setSelectedBlockId] = useState<string>(ARCHITECTURE_COMPONENTS[0].id);

  const selectedBlock =
    ARCHITECTURE_COMPONENTS.find((b) => b.id === selectedBlockId) || ARCHITECTURE_COMPONENTS[0];

  const getBlockIcon = (id: string) => {
    switch (id) {
      case 'arch-model':
        return <Brain className="w-4 h-4" />;
      case 'arch-context':
        return <Database className="w-4 h-4" />;
      case 'arch-protocols':
        return <Wrench className="w-4 h-4" />;
      case 'arch-verification':
        return <ShieldCheck className="w-4 h-4" />;
      case 'arch-workspace':
        return <FolderGit2 className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="architecture"
      aria-labelledby="arch-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div className="max-w-[760px] mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            System Design
          </span>
          <h2
            id="arch-heading"
            className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.06]"
          >
            Under the surface.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
            Sylor combines language model reasoning with strict deterministic tools, local AST indexing, and invariant verification loops.
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-3">
            {ARCHITECTURE_COMPONENTS.map((comp) => {
              const isSelected = comp.id === selectedBlockId;
              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedBlockId(comp.id)}
                  className={`p-5 rounded-[8px] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#111111] shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                      : 'bg-[#f4f2ee] border-[#e8e6e2] hover:border-[#cfcbc2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded ${
                          isSelected ? 'bg-[#111111] text-[#faf9f7]' : 'bg-[#e8e6e2] text-[#111111]'
                        }`}
                      >
                        {getBlockIcon(comp.id)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#737373] block">
                          {comp.role}
                        </span>
                        <h3 className="text-[16px] font-semibold text-[#111111]">
                          {comp.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#737373]">
                      <span>{comp.interfaces}</span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isSelected ? 'translate-x-1 text-[#111111]' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Block Deep Dive Inspector (col-span-5) */}
          <div className="lg:col-span-5 bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373]">
                  Subsystem Inspector
                </span>
                <span className="text-[#d8d5cb]">/</span>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold">Active Node</span>
              </div>
              <h3 className="text-[22px] font-semibold text-[#111111] tracking-tight">
                {selectedBlock.title}
              </h3>
              <p className="text-[14px] text-[#737373] mt-2 leading-relaxed">
                {selectedBlock.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#e8e6e2] space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111] block">
                Technical Specifications
              </span>
              <div className="p-3.5 bg-white rounded border border-[#e8e6e2] font-mono text-[12px] text-[#111111] leading-relaxed">
                {selectedBlock.techSpec}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e8e6e2] flex items-center justify-between text-[11px] font-mono text-[#737373]">
              <span>Role: {selectedBlock.role}</span>
              <span className="text-[#111111] font-semibold">{selectedBlock.interfaces}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
