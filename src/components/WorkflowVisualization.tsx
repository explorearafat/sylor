import React, { useState, useEffect, useRef } from 'react';
import { WORKFLOW_NODES } from '../data';
import { WorkflowNodeData } from '../types';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const WorkflowVisualization: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<WorkflowNodeData>(WORKFLOW_NODES[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStepIndex, setSimStepIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      timer = setInterval(() => {
        setSimStepIndex((prev) => {
          const next = (prev + 1) % WORKFLOW_NODES.length;
          setSelectedNode(WORKFLOW_NODES[next]);
          if (next === WORKFLOW_NODES.length - 1) {
            
            setTimeout(() => setIsSimulating(false), 2200);
          }
          return next;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const handleStartSimulation = () => {
    setSimStepIndex(0);
    setSelectedNode(WORKFLOW_NODES[0]);
    setIsSimulating(true);
  };

  const handleStopSimulation = () => {
    setIsSimulating(false);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setSimStepIndex(0);
    setSelectedNode(WORKFLOW_NODES[0]);
  };

  return (
    <section
      ref={sectionRef}
      id="workflow"
      aria-labelledby="workflow-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e8e6e2] transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
              Node-Based Pipeline Graph
            </span>
            <h2
              id="workflow-heading"
              className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.05]"
            >
              The execution pipeline.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {!isSimulating ? (
              <button
                onClick={handleStartSimulation}
                className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-mono uppercase tracking-wider font-semibold text-[#faf9f7] bg-[#111111] rounded-[4px] hover:bg-[#2c2b29] transition-all shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Simulate Execution</span>
              </button>
            ) : (
              <button
                onClick={handleStopSimulation}
                className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-mono uppercase tracking-wider font-semibold text-[#111111] bg-[#e8e5dc] rounded-[4px] hover:bg-[#dedad0] transition-all"
              >
                <Pause className="w-3 h-3 fill-current" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="p-2 text-[#737373] hover:text-[#111111] rounded-[4px] border border-[#e8e6e2] bg-[#f4f2ee] transition-colors"
              title="Reset workflow"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Workflow Diagram & Inspector Container with Staggered Transition */}
        <div
          className={`mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main Visual Node Flow Column */}
          <div className="lg:col-span-7 bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e8e6e2]">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#737373]">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>DAG Execution Topology</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8880] border border-[#e8e6e2] px-2 py-0.5 rounded bg-white">
                {isSimulating ? `Active Node: ${simStepIndex + 1}/${WORKFLOW_NODES.length}` : 'Interactive DAG'}
              </span>
            </div>

            {/* Structured Node Graph Layout */}
            <div className="space-y-3.5">
              {WORKFLOW_NODES.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                const isCurrentSim = isSimulating && simStepIndex === index;
                const isPastSim = isSimulating && simStepIndex > index;

                return (
                  <div key={node.id} className="relative">
                    <button
                      onClick={() => {
                        setIsSimulating(false);
                        setSelectedNode(node);
                        setSimStepIndex(index);
                      }}
                      className={`w-full text-left transition-all duration-200 rounded-[6px] p-4 border focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] ${
                        isSelected || isCurrentSim
                          ? 'bg-[#ffffff] border-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                          : isPastSim
                          ? 'bg-[#faf9f7]/95 border-[#d8d5cb]'
                          : 'bg-[#faf9f7]/70 border-[#e8e6e2] hover:bg-[#ffffff] hover:border-[#c8c5bc]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold ${
                              isCurrentSim
                                ? 'bg-[#111111] text-[#faf9f7]'
                                : isSelected
                                ? 'bg-[#111111] text-[#faf9f7]'
                                : 'bg-[#e8e6e2] text-[#737373]'
                            }`}
                          >
                            0{index + 1}
                          </span>
                          <div>
                            <div className="text-[15px] font-semibold text-[#111111]">
                              {node.label}
                            </div>
                            <div className="text-[12px] text-[#737373] font-mono">
                              {node.role}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                              node.category === 'reasoning'
                                ? 'bg-[#faf6ee] text-[#7a6433] border-[#e8dfc8]'
                                : node.category === 'integration'
                                ? 'bg-[#f0f6f8] text-[#2c5364] border-[#d2e2e8]'
                                : node.category === 'verification'
                                ? 'bg-[#f0f7f2] text-[#2f5c3a] border-[#cbe3d3]'
                                : 'bg-[#f3f1ed] text-[#55534e] border-[#e8e6e2]'
                            }`}
                          >
                            {node.category}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 text-[#8a8880] transition-transform ${
                              isSelected ? 'translate-x-0.5 text-[#111111]' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </button>

                    {/* Connecting Vector Arrow */}
                    {index < WORKFLOW_NODES.length - 1 && (
                      <div className="flex justify-center my-1">
                        <div
                          className={`w-[1px] h-3.5 transition-colors ${
                            isSimulating && simStepIndex >= index ? 'bg-[#111111]' : 'bg-[#e0ddd5]'
                          }`}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Node Inspector Column */}
          <div className="lg:col-span-5 bg-[#faf9f7] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#e8e6e2]">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#737373]">
                Node Inspector
              </div>
              <span className="text-[10px] font-mono text-[#111111] bg-[#f4f2ee] px-2 py-0.5 rounded border border-[#e8e6e2]">
                ID: {selectedNode.id}
              </span>
            </div>

            {/* Active Node Detail */}
            <div>
              <h3 className="text-[20px] font-semibold text-[#111111] tracking-tight">
                {selectedNode.label}
              </h3>
              <p className="mt-2 text-[14px] text-[#737373] leading-relaxed">
                {selectedNode.description}
              </p>

              {/* In/Out Contracts */}
              <div className="mt-6 pt-5 border-t border-[#e8e6e2] space-y-4">
                <div>
                  <span className="text-[10px] font-bold font-mono uppercase tracking-[0.18em] text-[#737373] block mb-1.5">
                    Consumes (Inputs)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.inputs.map((inp, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono bg-[#f4f2ee] text-[#111111] border border-[#e8e6e2] px-2.5 py-0.5 rounded"
                      >
                        {inp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold font-mono uppercase tracking-[0.18em] text-[#737373] block mb-1.5">
                    Produces (Outputs)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.outputs.map((out, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono bg-[#f4f2ee] text-[#111111] border border-[#e8e6e2] px-2.5 py-0.5 rounded"
                      >
                        {out}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs Key-Value */}
              <div className="mt-6 pt-5 border-t border-[#e8e6e2]">
                <span className="text-[10px] font-bold font-mono uppercase tracking-[0.18em] text-[#737373] block mb-2">
                  Runtime Parameters
                </span>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {Object.entries(selectedNode.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-[#f4f2ee]">
                      <span className="text-[#737373]">{key}</span>
                      <span className="text-[#111111] font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet */}
              {selectedNode.codeSnippet && (
                <div className="mt-6 pt-5 border-t border-[#e8e6e2]">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-[0.18em] text-[#737373] block mb-2">
                    Execution Payload
                  </span>
                  <pre className="p-3 bg-[#f4f2ee] rounded text-[11px] font-mono text-[#111111] overflow-x-auto leading-relaxed border border-[#e8e6e2]">
                    <code>{selectedNode.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
