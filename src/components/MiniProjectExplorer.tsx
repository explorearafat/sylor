import React, { useState } from 'react';
import { Folder, FolderOpen, FileCode, FileJson, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Lock } from 'lucide-react';

export const MiniProjectExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('src/services/auth.ts');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasScanned, setHasScanned] = useState<boolean>(true);

  const FILE_DETAILS: { [path: string]: { type: string; summary: string; astInsight: string; safetyNote: string } } = {
    'src/components/Dashboard.tsx': {
      type: 'React 18 Component',
      summary: 'Main analytics view rendering 4 metrics cards and responsive chart container.',
      astInsight: 'Exports default Dashboard component. Imports Lucide icons and useAuth hook.',
      safetyNote: 'No state mutations or side effects in component body.'
    },
    'src/services/auth.ts': {
      type: 'TypeScript Service',
      summary: 'Handles session cookie verification and token validation.',
      astInsight: 'Exports verifySession(token: string) and createSession(userId: string).',
      safetyNote: 'Zero hardcoded secrets. Reads process.env with secure runtime fallback.'
    },
    'src/services/api.ts': {
      type: 'HTTP Client Service',
      summary: 'Typed fetch wrapper configuring base URL and authorization headers.',
      astInsight: 'Exports apiClient with GET/POST/PUT interceptors.',
      safetyNote: 'Rate limiting and 401 token refresh interceptor in place.'
    },
    'package.json': {
      type: 'Manifest & Dependencies',
      summary: 'Declares React 18, Tailwind CSS, Lucide icons, and TypeScript 5.4.',
      astInsight: 'Vite build scripts configured for port 3000 container ingress.',
      safetyNote: 'All dependencies pinned with verified lockfile hashes.'
    },
    'tsconfig.json': {
      type: 'TypeScript Compiler Config',
      summary: 'Strict type checking enabled with ESNext module resolution.',
      astInsight: 'Strict null checks = true, noImplicitAny = true.',
      safetyNote: 'Zero-tolerance compilation invariant enforcement.'
    },
    '.env.example': {
      type: 'Environment Template',
      summary: 'Documents required runtime environment variables without storing secrets.',
      astInsight: 'Defines AUTH_SECRET, DATABASE_URL, and API_BASE_URL templates.',
      safetyNote: 'Sylor masks sensitive variables and never leaks keys into git commits.'
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 800);
  };

  const currentInfo = FILE_DETAILS[selectedFile] || FILE_DETAILS['src/services/auth.ts'];

  return (
    <section
      id="project-explorer"
      aria-labelledby="explorer-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[720px] mb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Context Grounding
          </span>
          <h2
            id="explorer-heading"
            className="text-[32px] sm:text-[42px] md:text-[50px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.05]"
          >
            Sylor doesn't start with your prompt alone.
          </h2>
          <p className="text-[16px] text-[#737373] mt-3 leading-relaxed">
            It starts with the environment around it. Before suggesting any change, Sylor indexes AST symbols, imports, environment safety boundaries, and compiler constraints.
          </p>
        </div>

        {/* Interactive Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive File Tree (col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-[#e8e6e2] rounded-[10px] p-5 shadow-sm">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] border-b border-[#f0eee9] pb-3 mb-4">
              <span className="font-semibold text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                <FolderOpen className="w-4 h-4" />
                my-project/
              </span>
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="text-[10px] font-mono uppercase bg-[#f5f3ee] hover:bg-[#eae7df] border border-[#e8e6e2] px-2 py-1 rounded text-[#111111] font-semibold transition-colors"
              >
                {isScanning ? 'Indexing AST...' : 'Re-index Project'}
              </button>
            </div>

            <div className="space-y-1 font-mono text-[13px]">
              <div className="text-[#737373] pl-2 py-1 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5" />
                <span>src/</span>
              </div>

              <div className="pl-6 space-y-1">
                <div className="text-[#737373] py-0.5 flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5" />
                  <span>components/</span>
                </div>
                <div className="pl-5 space-y-1">
                  <button
                    onClick={() => setSelectedFile('src/components/Dashboard.tsx')}
                    className={`w-full text-left flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                      selectedFile === 'src/components/Dashboard.tsx'
                        ? 'bg-[#111111] text-[#faf9f7]'
                        : 'text-[#555555] hover:bg-[#f5f3ee]'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Dashboard.tsx</span>
                  </button>
                </div>

                <div className="text-[#737373] py-0.5 flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5" />
                  <span>services/</span>
                </div>
                <div className="pl-5 space-y-1">
                  <button
                    onClick={() => setSelectedFile('src/services/auth.ts')}
                    className={`w-full text-left flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                      selectedFile === 'src/services/auth.ts'
                        ? 'bg-[#111111] text-[#faf9f7]'
                        : 'text-[#555555] hover:bg-[#f5f3ee]'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>auth.ts</span>
                  </button>
                  <button
                    onClick={() => setSelectedFile('src/services/api.ts')}
                    className={`w-full text-left flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                      selectedFile === 'src/services/api.ts'
                        ? 'bg-[#111111] text-[#faf9f7]'
                        : 'text-[#555555] hover:bg-[#f5f3ee]'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>api.ts</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-[#f0eee9] pl-2 space-y-1">
                <button
                  onClick={() => setSelectedFile('package.json')}
                  className={`w-full text-left flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                    selectedFile === 'package.json'
                      ? 'bg-[#111111] text-[#faf9f7]'
                      : 'text-[#555555] hover:bg-[#f5f3ee]'
                  }`}
                >
                  <FileJson className="w-3.5 h-3.5" />
                  <span>package.json</span>
                </button>
                <button
                  onClick={() => setSelectedFile('tsconfig.json')}
                  className={`w-full text-left flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                    selectedFile === 'tsconfig.json'
                      ? 'bg-[#111111] text-[#faf9f7]'
                      : 'text-[#555555] hover:bg-[#f5f3ee]'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>tsconfig.json</span>
                </button>
                <button
                  onClick={() => setSelectedFile('.env.example')}
                  className={`w-full text-left flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                    selectedFile === '.env.example'
                      ? 'bg-[#111111] text-[#faf9f7]'
                      : 'text-[#555555] hover:bg-[#f5f3ee]'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>.env.example</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: AST Symbol Grounding Inspector (col-span-7) */}
          <div className="lg:col-span-7 bg-white border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] border-b border-[#f0eee9] pb-4 mb-6">
              <span className="uppercase tracking-wider font-semibold text-[#111111] font-mono">
                {selectedFile}
              </span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold font-mono">
                AST Indexed
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block mb-1">
                  File Classification
                </span>
                <h3 className="text-[18px] font-semibold text-[#111111]">
                  {currentInfo.type}
                </h3>
                <p className="text-[13px] text-[#555555] mt-1">
                  {currentInfo.summary}
                </p>
              </div>

              <div className="p-4 bg-[#faf9f7] border border-[#e8e6e2] rounded-[8px]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block mb-2">
                  AST Symbol Knowledge
                </span>
                <p className="text-[13px] font-mono text-[#111111] leading-relaxed">
                  {currentInfo.astInsight}
                </p>
              </div>

              <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-[8px]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Environment Safety Guard
                </span>
                <p className="text-[13px] text-emerald-950">
                  {currentInfo.safetyNote}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f0eee9] flex items-center justify-between text-[11px] text-[#737373] font-mono">
              <span>Deterministic context mapping</span>
              <span>Zero prompt hallucinations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
