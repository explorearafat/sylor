import React, { useState } from 'react';
import { Terminal, ShieldCheck, Cpu, Play, CheckCircle2, RefreshCw } from 'lucide-react';

export const DeterministicVmInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flow' | 'context' | 'manifest'>('flow');

  return (
    <section
      id="vm-inspector"
      aria-labelledby="vm-inspector-heading"
      className="py-20 md:py-28 border-b border-[#e8e6e2] bg-[#f8f7f4]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Description */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#141413]"></span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#8a8880]">
                Live Runtime Inspector
              </span>
            </div>

            <h2
              id="vm-inspector-heading"
              className="text-[32px] sm:text-[44px] font-medium text-[#141413] tracking-[-0.04em] leading-[1.05] mb-5 text-depth-heading"
            >
              Sylor Deterministic VM Engine
            </h2>

            <p className="text-[16px] text-[#5e5d58] leading-relaxed mb-6">
              Sylor runs inside a deterministic state machine that guarantees syntactic invariant checks, automated blast-radius containment, and sandboxed tool executions before any AST mutation touches disk.
            </p>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-white border border-[#e4e1d8] rounded-[8px]">
                <div className="text-[11px] font-mono text-[#8a8880] uppercase tracking-wider mb-1">
                  Latency Guarantee
                </div>
                <div className="text-[20px] font-semibold text-[#141413]">
                  0ms Local
                </div>
                <div className="text-[11px] text-[#737373] mt-1">
                  Runs directly on client hardware
                </div>
              </div>

              <div className="p-4 bg-white border border-[#e4e1d8] rounded-[8px]">
                <div className="text-[11px] font-mono text-[#8a8880] uppercase tracking-wider mb-1">
                  Rollback Guarantee
                </div>
                <div className="text-[20px] font-semibold text-[#141413]">
                  Instant AST Undo
                </div>
                <div className="text-[11px] text-[#737373] mt-1">
                  Atomic transaction boundaries
                </div>
              </div>
            </div>
          </div>

          {/* Right: The VM Inspector Box */}
          <div className="lg:col-span-6">
            <div className="bg-[#f3f1ed] border border-[#e2dfd7] rounded-[12px] p-6 shadow-sm">
              {/* Minimal Header */}
              <div className="flex items-center justify-between border-b border-[#e2dfd7] pb-3.5 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#141413]"></span>
                  <span className="text-[12px] font-mono font-medium text-[#141413] uppercase tracking-wider">
                    Sylor Deterministic VM
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-[#faf9f7] border border-[#e2dfd7] rounded-[4px] p-0.5 text-[10px] font-mono">
                  <button
                    onClick={() => setActiveTab('flow')}
                    className={`px-2.5 py-1 rounded-[3px] transition-colors ${
                      activeTab === 'flow' ? 'bg-[#141413] text-[#faf9f7]' : 'text-[#6e6d68] hover:text-[#141413]'
                    }`}
                  >
                    Pipeline
                  </button>
                  <button
                    onClick={() => setActiveTab('context')}
                    className={`px-2.5 py-1 rounded-[3px] transition-colors ${
                      activeTab === 'context' ? 'bg-[#141413] text-[#faf9f7]' : 'text-[#6e6d68] hover:text-[#141413]'
                    }`}
                  >
                    Context
                  </button>
                  <button
                    onClick={() => setActiveTab('manifest')}
                    className={`px-2.5 py-1 rounded-[3px] transition-colors ${
                      activeTab === 'manifest' ? 'bg-[#141413] text-[#faf9f7]' : 'text-[#6e6d68] hover:text-[#141413]'
                    }`}
                  >
                    Config
                  </button>
                </div>
              </div>

              {/* Tab Views */}
              {activeTab === 'flow' && (
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono text-[#8a8880] uppercase tracking-wider mb-2">
                    Active Execution Loop
                  </div>
                  
                  {[
                    { step: '01', title: 'Intent Resolution', desc: 'Syntactic boundary extraction', status: 'Passed' },
                    { step: '02', title: 'AST Graph Ingestion', desc: 'Symbol cross-reference indexing', status: 'Ready' },
                    { step: '03', title: 'Topological Plan', desc: 'Dependency-isolated task DAG', status: 'Optimal' },
                    { step: '04', title: 'MCP Tool Dispatch', desc: 'Sandboxed FS & Git execution', status: 'Bound' },
                    { step: '05', title: 'Verification Guard', desc: 'Typecheck & test invariants', status: 'Active' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#faf9f7] border border-[#e4e1d8] rounded-[6px] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono font-medium text-[#8a8880] bg-[#edeae3] px-1.5 py-0.5 rounded">
                          {item.step}
                        </span>
                        <div>
                          <div className="text-[13px] font-medium text-[#141413]">{item.title}</div>
                          <div className="text-[11px] text-[#6e6d68]">{item.desc}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'context' && (
                <div className="p-3.5 bg-[#faf9f7] border border-[#e4e1d8] rounded-[6px] font-mono text-[11px] text-[#3a3936] space-y-2">
                  <div className="text-[#8a8880]">// Local Workspace Symbol Graph</div>
                  <div className="text-[#141413] font-semibold">Indexed Target: ./src/core</div>
                  <div className="pl-2 border-l border-[#d8d5cb] space-y-1">
                    <div>• TreeSitterParser [TSX, Rust, Python]</div>
                    <div>• AST Nodes: 14,290 symbols</div>
                    <div>• Blast Radius Limit: 3 files / 420 lines</div>
                    <div>• Rollback Stack: Initialized</div>
                  </div>
                  <div className="pt-2 border-t border-[#edeae3] text-emerald-700 font-medium">
                    Status: AST Graph Synchronized (0ms latency)
                  </div>
                </div>
              )}

              {activeTab === 'manifest' && (
                <div className="p-3.5 bg-[#141413] text-[#faf9f7] rounded-[6px] font-mono text-[11px] space-y-1 overflow-x-auto">
                  <div className="text-[#8c8a82]">{"// sylor.config.json"}</div>
                  <div>{"{"}</div>
                  <div className="pl-3 text-[#d4d1c8]">
                    "version": <span className="text-[#7ec699]">"1.0"</span>,
                  </div>
                  <div className="pl-3 text-[#d4d1c8]">
                    "verification": <span className="text-[#e5c07b]">"compiler_strict"</span>,
                  </div>
                  <div className="pl-3 text-[#d4d1c8]">
                    "mcpServers": [<span className="text-[#7ec699]">"git"</span>, <span className="text-[#7ec699]">"fs"</span>, <span className="text-[#7ec699]">"cdp"</span>],
                  </div>
                  <div className="pl-3 text-[#d4d1c8]">
                    "telemetry": <span className="text-[#e06c75]">false</span>
                  </div>
                  <div>{"}"}</div>
                </div>
              )}

              {/* Bottom Status Ribbon */}
              <div className="mt-4 pt-3.5 border-t border-[#e2dfd7] flex items-center justify-between text-[11px] font-mono text-[#8a8880]">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Engine Ready
                </span>
                <span>v1.0.0-stable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
