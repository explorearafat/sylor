import React, { useState, useRef } from 'react';
import { INITIAL_MCP_SERVERS } from '../data';
import { McpServer } from '../types';
import { 
  GitBranch, 
  FolderGit2, 
  Globe, 
  Database, 
  Box, 
  Activity, 
  Cpu,
  Copy,
  CheckCheck
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const McpExtensibility: React.FC = () => {
  const [servers, setServers] = useState<McpServer[]>(INITIAL_MCP_SERVERS);
  const [copied, setCopied] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  });

  const toggleServer = (id: string) => {
    setServers((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, enabled: !srv.enabled } : srv))
    );
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitBranch': return <GitBranch className="w-4 h-4" />;
      case 'FolderGit2': return <FolderGit2 className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Box': return <Box className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  const enabledCount = servers.filter((s) => s.enabled).length;
  const totalTools = servers.filter((s) => s.enabled).reduce((acc, s) => acc + s.toolsCount, 0);

  const activeJson = {
    mcpServers: servers
      .filter((s) => s.enabled)
      .reduce((acc, s) => {
        acc[s.id] = {
          command: `mcp-${s.id}`,
          permissions: s.permissions,
          activeTools: s.toolsCount
        };
        return acc;
      }, {} as Record<string, any>)
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(activeJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="extensibility"
      aria-labelledby="mcp-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header with Intersection Animation */}
        <div
          className={`max-w-[760px] mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Open Protocol Standards
          </span>
          <h2
            id="mcp-heading"
            className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.08] text-depth-heading"
          >
            Give Sylor the tools you actually need.
          </h2>
          <p className="mt-5 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
            Sylor is not built around a fixed set of capabilities. Choose the MCP servers, skills,
            tools, and connections that fit your workflow.
          </p>
        </div>

        {/* Interactive Matrix Grid with Staggered Transition */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left: Server Switcher Table */}
          <div className="lg:col-span-7 bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e8e6e2]">
              <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#111111]">
                MCP Tool Registry
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#737373] border border-[#e8e6e2] px-2 py-0.5 rounded bg-white">
                {enabledCount} Active Servers • {totalTools} Bound Callables
              </div>
            </div>

            <div className="divide-y divide-[#e8e6e2]">
              {servers.map((server) => (
                <div
                  key={server.id}
                  className="py-4 flex items-center justify-between gap-4 group transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2 rounded-[4px] mt-0.5 transition-colors ${
                        server.enabled
                          ? 'bg-[#111111] text-[#faf9f7]'
                          : 'bg-[#e8e5dc] text-[#737373]'
                      }`}
                    >
                      {getIcon(server.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold text-[#111111]">
                          {server.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#737373]">
                          ({server.toolsCount} tools)
                        </span>
                      </div>
                      <p className="text-[13px] text-[#737373] mt-0.5 max-w-[420px] leading-relaxed">
                        {server.description}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleServer(server.id)}
                    aria-label={`Toggle ${server.name}`}
                    className={`shrink-0 px-3 py-1.5 rounded-[4px] font-mono text-[10px] font-bold uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] ${
                      server.enabled
                        ? 'bg-[#111111] text-[#faf9f7]'
                        : 'bg-[#e8e5dc] text-[#737373] hover:bg-[#dedad0]'
                    }`}
                  >
                    {server.enabled ? 'ACTIVE' : 'OFF'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Config Preview & Schema */}
          <div className="lg:col-span-5 bg-[#faf9f7] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e8e6e2]">
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#737373]">
                sylor.config.json
              </span>
              <button
                onClick={copyConfig}
                className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#111111] hover:bg-[#e8e5dc] px-2.5 py-1 rounded bg-[#f4f2ee] border border-[#e8e6e2] transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3 h-3 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-[#f4f2ee] rounded border border-[#e8e6e2] text-[11px] font-mono text-[#111111] overflow-x-auto leading-relaxed max-h-[340px]">
              <code>{JSON.stringify(activeJson, null, 2)}</code>
            </pre>

            <div className="mt-6 pt-4 border-t border-[#e8e6e2] text-[13px] text-[#737373] leading-relaxed">
              <span className="font-semibold text-[#111111]">Zero Vendor Lock-In:</span> Sylor connects to standard stdio and SSE MCP transports without requiring custom SDK re-compilations.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
