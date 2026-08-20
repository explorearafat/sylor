import React from 'react';
import { Layers, ShieldCheck, Binary, Cpu, Workflow, TerminalSquare, Compass } from 'lucide-react';

export const EditorialArchitecture: React.FC = () => {
  return (
    <section
      id="architecture"
      aria-label="System Architecture"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e8e6e2]">
          <div>
            <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#8a8880] block mb-3">
              Architectural Sovereignty
            </span>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#141413] tracking-[-0.04em] leading-[1.05] text-depth-heading">
              Designed for deterministic software systems.
            </h2>
          </div>
          <p className="text-[16px] text-[#6e6d68] max-w-[440px] leading-relaxed">
            Sylor acts as the rigorous translation layer between high-level engineering intent and low-level code mutations.
          </p>
        </div>

        {/* Large Editorial Architectural Diagram */}
        <div className="mt-12 bg-[#f3f1ed] border border-[#e2dfd7] rounded-[16px] p-8 md:p-12 relative overflow-hidden">
          {/* Architectural Layer Diagram Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Layer 1 */}
            <div className="bg-[#faf9f7] border border-[#e4e1d8] rounded-[10px] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8a8880] mb-4">
                  <span>LAYER 01</span>
                  <span>INTAKE</span>
                </div>
                <div className="w-8 h-8 rounded-[6px] bg-[#141413] text-[#faf9f7] flex items-center justify-center mb-4">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#141413] tracking-tight">
                  Intent & Boundary Scoping
                </h3>
                <p className="mt-2 text-[14px] text-[#6e6d68] leading-relaxed">
                  Extracts constraints, blast radius limits, and explicit developer requirements from issue specs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#edeae3] font-mono text-[11px] text-[#787670]">
                AST Context Resolution: Active
              </div>
            </div>

            {/* Layer 2 (Central Engine) */}
            <div className="bg-[#141413] text-[#faf9f7] border border-[#141413] rounded-[10px] p-6 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#9e9c94] mb-4">
                  <span>LAYER 02</span>
                  <span>COGNITIVE CORE</span>
                </div>
                <div className="w-8 h-8 rounded-[6px] bg-[#faf9f7] text-[#141413] flex items-center justify-center mb-4">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#faf9f7] tracking-tight">
                  Sylor Deterministic VM
                </h3>
                <p className="mt-2 text-[14px] text-[#b5b3aa] leading-relaxed">
                  Synthesizes topological task graphs, orchestrates MCP tool invocations, and generates surgical diffs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2e2d2a] font-mono text-[11px] text-[#9e9c94]">
                Protocol: Model Context Protocol v1.0
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-[#faf9f7] border border-[#e4e1d8] rounded-[10px] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8a8880] mb-4">
                  <span>LAYER 03</span>
                  <span>VERIFICATION</span>
                </div>
                <div className="w-8 h-8 rounded-[6px] bg-[#141413] text-[#faf9f7] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#141413] tracking-tight">
                  Closed-Loop Feedback
                </h3>
                <p className="mt-2 text-[14px] text-[#6e6d68] leading-relaxed">
                  Runs local compiler passes, executes test suites, inspects browser rendering, and diagnoses failures.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#edeae3] font-mono text-[11px] text-[#787670]">
                Autonomous Self-Healing: Enabled
              </div>
            </div>
          </div>

          {/* Architectural Notes Footer */}
          <div className="mt-10 pt-8 border-t border-[#e2dfd7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[13px]">
            <div>
              <span className="font-mono text-[11px] uppercase text-[#8a8880] block mb-1">
                Zero Cloud Leakage
              </span>
              <p className="text-[#55534f]">
                Local workspace tokens remain contained inside designated process sandboxes.
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase text-[#8a8880] block mb-1">
                Syntactic Boundary Checks
              </span>
              <p className="text-[#55534f]">
                Guarantees complete syntactic validity before disk writes occur.
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase text-[#8a8880] block mb-1">
                Stateful Rollbacks
              </span>
              <p className="text-[#55534f]">
                Every execution step registers an inverse patch for instant reversibility.
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase text-[#8a8880] block mb-1">
                Custom Manifest Control
              </span>
              <p className="text-[#55534f]">
                Declare permissions, skills, and model budgets directly in your repo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
