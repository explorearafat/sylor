import React, { useState } from 'react';
import { Layers, BookOpen, Wrench, Network, Check, Copy } from 'lucide-react';

export const McpInteractiveContext: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mcp' | 'skills' | 'tools' | 'connections'>('mcp');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TAB_DATA = {
    mcp: {
      title: 'Model Context Protocol (MCP)',
      subtitle: 'Connect Sylor to external capabilities via open standard.',
      description: 'An open JSON-RPC 2.0 protocol standard created to connect AI agents with external systems, databases, developer tools, and microservices without proprietary vendor lock-in.',
      exampleCode: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/dev"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}`,
      highlights: [
        'Open industry standard (JSON-RPC 2.0)',
        'Local-first stdio or SSE transport',
        'Zero vendor lock-in'
      ]
    },
    skills: {
      title: 'Markdown Skills',
      subtitle: 'Give Sylor specialized behavior and reusable expertise.',
      description: 'Define domain-specific guidelines, team architectural patterns, and framework conventions in clean Markdown files committed directly to your repository.',
      exampleCode: `---
name: tailwind-design-tokens
description: Guidelines for applying our design tokens without style regressions
---

# Design System Guidelines
- Always use the semantic neutral scale: bg-[#faf9f7] and text-[#111111]
- For button padding, horizontal padding must be exactly 2x vertical padding
- All responsive containers must specify max-w-[1200px]`,
      highlights: [
        'Stored as simple .md files in your repo',
        'Auto-loaded when task matches skill scope',
        'No custom model fine-tuning required'
      ]
    },
    tools: {
      title: 'Local Environment Tools',
      subtitle: 'Let the agent interact with the environment safely.',
      description: 'Sylor can invoke local file operations, run linter checks, execute tests, and evaluate build artifacts inside your workspace sandbox with explicit human permission boundaries.',
      exampleCode: `// Invoking surgical file patch with syntax verification
const result = await sylor.tools.applyPatch({
  file: "src/services/billing.ts",
  targetContent: "const total = price * quantity;",
  replacementContent: "const total = Math.round(price * quantity * 100) / 100;",
  verifySyntax: true
});`,
      highlights: [
        'AST-anchored surgical replacements',
        'Sandboxed process execution',
        'Strict human permission gates'
      ]
    },
    connections: {
      title: 'System Connections',
      subtitle: 'Connect the systems your workflow depends on.',
      description: 'Seamlessly link your local IDE, terminal daemons, Docker containers, remote staging databases, and CI/CD pipelines into a single cohesive agentic workflow.',
      exampleCode: `# Sylor daemon connection status
$ sylor doctor
✓ Local workspace: /home/dev/projects/web-app (AST Indexed)
✓ TypeScript compiler: v5.4.5 (Green)
✓ MCP server (PostgreSQL): Connected (34 tables)
✓ MCP server (GitHub): Connected (@my-org)`,
      highlights: [
        'Works with your existing editors and CLI',
        'Seamless Docker and container awareness',
        'Fast local daemon with instant startup'
      ]
    }
  };

  const current = TAB_DATA[activeTab];

  return (
    <section
      id="context-ecosystem"
      aria-labelledby="context-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[720px] mb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Open Ecosystem
          </span>
          <h2
            id="context-heading"
            className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.05]"
          >
            Give Sylor more context.
          </h2>
          <p className="text-[16px] text-[#737373] mt-3 leading-relaxed">
            Sylor adapts to your architecture through open standards, committed repository skills, and safe local tool execution.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#e8e6e2] pb-4">
          <button
            onClick={() => setActiveTab('mcp')}
            className={`flex items-center gap-2 px-4 py-2 text-[13px] font-mono font-semibold rounded-[6px] transition-all ${
              activeTab === 'mcp'
                ? 'bg-[#111111] text-[#faf9f7]'
                : 'bg-white text-[#555555] hover:bg-[#f3f1ed] border border-[#e8e6e2]'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>MCP</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-4 py-2 text-[13px] font-mono font-semibold rounded-[6px] transition-all ${
              activeTab === 'skills'
                ? 'bg-[#111111] text-[#faf9f7]'
                : 'bg-white text-[#555555] hover:bg-[#f3f1ed] border border-[#e8e6e2]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Skills</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`flex items-center gap-2 px-4 py-2 text-[13px] font-mono font-semibold rounded-[6px] transition-all ${
              activeTab === 'tools'
                ? 'bg-[#111111] text-[#faf9f7]'
                : 'bg-white text-[#555555] hover:bg-[#f3f1ed] border border-[#e8e6e2]'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('connections')}
            className={`flex items-center gap-2 px-4 py-2 text-[13px] font-mono font-semibold rounded-[6px] transition-all ${
              activeTab === 'connections'
                ? 'bg-[#111111] text-[#faf9f7]'
                : 'bg-white text-[#555555] hover:bg-[#f3f1ed] border border-[#e8e6e2]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Connections</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white border border-[#e8e6e2] rounded-[12px] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left explanation (col-span-5) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block mb-1">
                  Active Context Layer
                </span>
                <h3 className="text-[22px] font-semibold text-[#111111]">
                  {current.title}
                </h3>
              </div>

              <p className="text-[14px] font-medium text-[#111111]">
                {current.subtitle}
              </p>

              <p className="text-[13px] text-[#555555] leading-relaxed">
                {current.description}
              </p>

              <div className="pt-4 border-t border-[#f0eee9] space-y-2">
                <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mb-2">
                  Key Principles:
                </div>
                {current.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-[#333333]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]"></span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right code snippet (col-span-7) */}
            <div className="lg:col-span-7">
              <div className="bg-[#111111] text-[#faf9f7] rounded-[8px] p-5 font-mono text-[12px] leading-relaxed relative overflow-x-auto shadow-inner">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[10px] text-[#8a8880]">
                  <span>Specification Preview</span>
                  <button
                    onClick={() => handleCopy(current.exampleCode)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[#d8d5cb] whitespace-pre font-mono">
                  {current.exampleCode}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
