import React, { useState } from 'react';
import { CAPABILITY_TOGGLE_ITEMS } from '../data';
import { Check, X, ArrowRight, ShieldCheck, Database, Globe, FolderGit2, GitBranch, Sparkles, BookOpen, Layers } from 'lucide-react';

export const ConfigurableToolsSection: React.FC = () => {
  const [toggles, setToggles] = useState<{ [id: string]: boolean }>({
    filesystem: true,
    github: true,
    browser: true,
    mcp: true,
    skills: true,
    database: false
  });

  const toggleCapability = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="choose-tools"
      aria-labelledby="tools-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div className="max-w-[720px] mb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Modular Capabilities
          </span>
          <h2
            id="tools-heading"
            className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.05]"
          >
            Sylor doesn't have to work alone.
          </h2>
          <p className="text-[16px] text-[#737373] mt-3 leading-relaxed">
            Configure tools, MCP servers, and skills around your stack. As you enable or disable capabilities, Sylor dynamically adjusts its execution graph.
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] uppercase tracking-wider pb-2 border-b border-[#e8e6e2]">
              <span>Capability</span>
              <span>State</span>
            </div>

            {CAPABILITY_TOGGLE_ITEMS.map((item) => {
              const isEnabled = toggles[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleCapability(item.id)}
                  className={`cursor-pointer p-4 rounded-[8px] border transition-all ${
                    isEnabled
                      ? 'bg-white border-[#111111]/30 shadow-sm'
                      : 'bg-[#f5f3ee]/50 border-[#e8e6e2] opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[14px] font-semibold text-[#111111]">
                      {item.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isEnabled
                          ? 'bg-[#111111] text-[#faf9f7]'
                          : 'bg-[#e8e6e2] text-[#737373]'
                      }`}
                    >
                      {isEnabled ? 'ON' : 'OFF'}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#555555] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}

            <div className="p-3 bg-[#f5f3ee] border border-[#e8e6e2] rounded-[6px] text-[11px] text-[#737373] font-mono">
              Configurable demonstration — Sylor integrates with open standards.
            </div>
          </div>

          {/* Right Column: Reactive Dynamic Workflow Graph (col-span-7) */}
          <div className="lg:col-span-7 bg-white border border-[#e8e6e2] rounded-[12px] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] border-b border-[#f0eee9] pb-4 mb-6">
              <span className="font-semibold text-[#111111] uppercase tracking-wider">
                Reactive Execution Pipeline
              </span>
              <span className="text-emerald-700 font-mono text-[10px] uppercase">
                {Object.values(toggles).filter(Boolean).length} Active Channels
              </span>
            </div>

            <div className="space-y-4">
              {/* Node 1: Request */}
              <div className="flex items-center gap-3 p-3 bg-[#faf9f7] rounded-[6px] border border-[#e8e6e2]">
                <span className="font-mono text-[11px] font-bold text-[#737373]">01</span>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-[#111111]">Intent & Scope Intake</div>
                  <div className="text-[11px] text-[#737373]">Parses developer request into goal specifications</div>
                </div>
              </div>

              {/* Node 2: Skills (if on) */}
              {toggles.skills && (
                <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-[6px] border border-emerald-200/80 animate-fade-in">
                  <span className="font-mono text-[11px] font-bold text-emerald-800">02</span>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-emerald-950 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Repo Markdown Skills Loaded</span>
                    </div>
                    <div className="text-[11px] text-emerald-700">Applies project-specific rules, design tokens, and coding playbooks</div>
                  </div>
                </div>
              )}

              {/* Node 3: Context & AST */}
              <div className="flex items-center gap-3 p-3 bg-[#faf9f7] rounded-[6px] border border-[#e8e6e2]">
                <span className="font-mono text-[11px] font-bold text-[#737373]">03</span>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-[#111111]">Tree-Sitter AST & Symbol Graph</div>
                  <div className="text-[11px] text-[#737373]">Maps module closures, exports, and type definitions</div>
                </div>
              </div>

              {/* Node 4: Database Lens (if on) */}
              {toggles.database && (
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-[6px] border border-blue-200/80 animate-fade-in">
                  <span className="font-mono text-[11px] font-bold text-blue-800">04</span>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-blue-950 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" />
                      <span>Database Schema Introspection</span>
                    </div>
                    <div className="text-[11px] text-blue-700">Validates SQL tables, foreign keys, and migration dry-runs</div>
                  </div>
                </div>
              )}

              {/* Node 5: Filesystem AST Mutation (if on) */}
              {toggles.filesystem && (
                <div className="flex items-center gap-3 p-3 bg-[#111111] text-[#faf9f7] rounded-[6px] shadow-sm">
                  <span className="font-mono text-[11px] font-bold text-[#8a8880]">05</span>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-white flex items-center gap-1.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-white" />
                      <span>AST-Anchored Surgical Diff Engine</span>
                    </div>
                    <div className="text-[11px] text-[#b0ada5]">Targeted block replacement preserving style, whitespace, and comments</div>
                  </div>
                </div>
              )}

              {/* Node 6: Browser CDP Verification (if on) */}
              {toggles.browser && (
                <div className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-[6px] border border-amber-200/80 animate-fade-in">
                  <span className="font-mono text-[11px] font-bold text-amber-800">06</span>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-amber-950 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Headless Chrome Layout & Console Audit</span>
                    </div>
                    <div className="text-[11px] text-amber-800">Detects DOM overflow, uncaught exceptions, and responsive layout faults</div>
                  </div>
                </div>
              )}

              {/* Node 7: GitHub PR Sync (if on) */}
              {toggles.github && (
                <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-[6px] border border-purple-200/80 animate-fade-in">
                  <span className="font-mono text-[11px] font-bold text-purple-800">07</span>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-purple-950 flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Git Branch & PR Synchronization</span>
                    </div>
                    <div className="text-[11px] text-purple-700">Prepares clean branch commits with human-reviewable changelog</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#f0eee9] flex items-center justify-between text-[11px] text-[#737373] font-mono">
              <span>The agent adapts to your environment.</span>
              <span>Open MCP 1.0 architecture</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
