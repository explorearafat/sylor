import React, { useState } from 'react';
import { X, Copy, CheckCheck, FileCode2, Terminal, Shield, Check } from 'lucide-react';

interface AgentManifestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentManifestModal: React.FC<AgentManifestModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'json' | 'yaml'>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonConfig = `{
  "$schema": "https://sylor.dev/schemas/v1/agent.json",
  "name": "my-production-app",
  "version": "1.0.0",
  "engine": {
    "model": "gemini-2.5-flash",
    "temperature": 0.1,
    "maxVerificationTurns": 3,
    "astPrecisionMode": "strict"
  },
  "context": {
    "include": ["src/**/*", "package.json", "tsconfig.json"],
    "exclude": ["node_modules", "dist", ".git", "**/*.log"],
    "maxTokenBudget": 48000
  },
  "mcpServers": {
    "github": {
      "command": "mcp-server-git",
      "permissions": ["repo:read", "pr:write"]
    },
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": ["--root", "."]
    },
    "postgres": {
      "command": "mcp-server-postgres",
      "env": { "PG_READONLY": "true" }
    }
  },
  "verification": {
    "commands": [
      "npm run lint",
      "npm run test:unit"
    ],
    "autoRollbackOnFailure": true
  }
}`;

  const yamlConfig = `# Sylor Agent Configuration Blueprint
version: "1.0"
runtime:
  mode: "deterministic-agent"
  ast_precision: "strict"
  max_healing_turns: 3

boundaries:
  allow_file_creation: true
  allow_file_deletion: false
  allow_shell_commands:
    - "npm run build"
    - "npm run lint"
    - "npm test"

mcp_servers:
  - id: "github"
    transport: "stdio"
    permissions: ["repo:read"]
  - id: "filesystem"
    transport: "stdio"
    permissions: ["fs:read", "fs:write"]

verification_loop:
  enabled: true
  require_green_build_before_commit: true
`;

  const contentToCopy = activeTab === 'json' ? jsonConfig : yamlConfig;

  const handleCopy = () => {
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf9f7] border border-[#d8d5cb] rounded-[12px] w-full max-w-[680px] shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e6e2] bg-[#f5f3ee]">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-[#141413] text-[#faf9f7] text-[10px] font-mono flex items-center justify-center font-bold">
              S
            </div>
            <div>
              <h2 id="modal-title" className="text-[14px] font-semibold text-[#141413]">
                Sylor Agent Blueprint Manifest
              </h2>
              <span className="text-[11px] font-mono text-[#8a8880]">
                Repository-level configuration specification
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-[4px] text-[#6e6d68] hover:text-[#141413] hover:bg-[#eae6de] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab selector & Copy button */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#f0ede6] border-b border-[#e2ded6]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1 text-[12px] font-mono rounded-[4px] transition-colors ${
                activeTab === 'json'
                  ? 'bg-[#141413] text-[#faf9f7] font-medium'
                  : 'text-[#6e6d68] hover:text-[#141413]'
              }`}
            >
              sylor.config.json
            </button>
            <button
              onClick={() => setActiveTab('yaml')}
              className={`px-3 py-1 text-[12px] font-mono rounded-[4px] transition-colors ${
                activeTab === 'yaml'
                  ? 'bg-[#141413] text-[#faf9f7] font-medium'
                  : 'text-[#6e6d68] hover:text-[#141413]'
              }`}
            >
              agent.blueprint.yaml
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono text-[#141413] bg-[#faf9f7] border border-[#d6d3c9] hover:bg-[#ffffff] transition-colors"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Manifest</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-y-auto bg-[#faf9f7]">
          <pre className="p-4 bg-[#f2efe8] rounded-[6px] border border-[#e2dfd7] text-[12px] font-mono text-[#2c2b28] leading-relaxed overflow-x-auto">
            <code>{contentToCopy}</code>
          </pre>

          <div className="mt-4 flex items-start gap-2 text-[12px] text-[#6e6d68] leading-relaxed">
            <Shield className="w-4 h-4 text-[#141413] shrink-0 mt-0.5" />
            <span>
              Place this file in the root of your project directory. Sylor automatically detects and binds to declared tool boundaries without requiring environment variables in source control.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#f5f3ee] border-t border-[#e8e6e2] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[13px] font-medium text-[#faf9f7] bg-[#141413] rounded-[6px] hover:bg-[#2b2a28] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
