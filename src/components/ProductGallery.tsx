import React, { useState } from 'react';
import { PRODUCT_UI_SCREENS } from '../data';
import {
  Layout,
  GitGraph,
  SplitSquareVertical,
  Layers,
  CheckCircle,
  Settings,
  Shield,
  FileCode,
  Check,
  Play,
  Terminal,
  Activity,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { SylorLogo } from './SylorLogo';

export const ProductGallery: React.FC = () => {
  const [activeScreenId, setActiveScreenId] = useState<string>(PRODUCT_UI_SCREENS[0].id);

  const activeScreen = PRODUCT_UI_SCREENS.find((s) => s.id === activeScreenId) || PRODUCT_UI_SCREENS[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'workspace':
        return <Layout className="w-4 h-4" />;
      case 'ast-context':
        return <GitGraph className="w-4 h-4" />;
      case 'surgical-diff':
        return <SplitSquareVertical className="w-4 h-4" />;
      case 'mcp-skills':
        return <Layers className="w-4 h-4" />;
      case 'verification-engine':
        return <CheckCircle className="w-4 h-4" />;
      case 'settings-memory':
        return <Settings className="w-4 h-4" />;
      default:
        return <Layout className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="product-gallery"
      aria-labelledby="gallery-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e8e6e2]">
          <div className="max-w-[700px]">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
              Product Interface
            </span>
            <h2
              id="gallery-heading"
              className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.06]"
            >
              Inside Sylor.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
              Designed as a calm, high-density environment where you observe decisions, inspect changes, and verify code with mathematical clarity.
            </p>
          </div>

          <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider shrink-0 bg-[#f4f2ee] px-3 py-1.5 rounded border border-[#e8e6e2]">
            Native Desktop Interface
          </div>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-10 pb-6 border-b border-[#e8e6e2]">
          {PRODUCT_UI_SCREENS.map((screen) => {
            const isSelected = screen.id === activeScreenId;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveScreenId(screen.id)}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-[6px] text-[12px] font-medium text-left transition-all border ${
                  isSelected
                    ? 'bg-white border-[#111111] text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-semibold'
                    : 'bg-[#f4f2ee] border-transparent text-[#737373] hover:text-[#111111] hover:border-[#e8e6e2]'
                }`}
              >
                <span className={isSelected ? 'text-[#111111]' : 'text-[#737373]'}>
                  {getIcon(screen.id)}
                </span>
                <span className="truncate">{screen.title}</span>
              </button>
            );
          })}
        </div>

        {/* Screen Visual Mockup Area & Annotations */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Display (col-span-8) */}
          <div className="lg:col-span-8 bg-[#111111] text-[#faf9f7] rounded-[10px] border border-[#2c2b29] shadow-lg overflow-hidden flex flex-col">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#181818] border-b border-[#2c2b29] text-[11px] font-mono text-[#8a8880]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70"></span>
                <span className="ml-2 text-[#b0ada5] font-semibold flex items-center gap-1.5">
                  <SylorLogo size={13} showBubbles={false} />
                  <span>Sylor — {activeScreen.title}</span>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[10px]">
                <span className="text-emerald-400">● AST Index Synchronized</span>
                <span className="text-[#666]">|</span>
                <span>Branch: main</span>
              </div>
            </div>

            {/* Custom Interactive UI Mockup per screen */}
            <div className="p-5 sm:p-7 min-h-[380px] flex flex-col justify-between font-mono">
              {activeScreenId === 'workspace' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-[#1e1e1e] p-3 rounded border border-[#333]">
                    <div className="flex items-center gap-2 text-[12px] text-emerald-400">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      <span>Task in progress: Implement dark mode provider & state</span>
                    </div>
                    <span className="text-[10px] text-[#888] bg-[#2a2a2a] px-2 py-0.5 rounded">
                      Step 3 / 4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-[#181818] p-3.5 rounded border border-[#2a2a2a] space-y-2">
                      <span className="text-[10px] text-[#888] uppercase tracking-wider block">
                        Reasoning & Plan
                      </span>
                      <div className="text-[#ccc] space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Check className="w-3 h-3" />
                          <span>1. Read ThemeContext & tokens</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Check className="w-3 h-3" />
                          <span>2. Generate color palette variables</span>
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold">
                          <Play className="w-3 h-3 text-amber-400" />
                          <span>3. Patch Header & ToggleButton</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#777]">
                          <span className="w-3 h-3"></span>
                          <span>4. Run Vitest & TypeScript check</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#181818] p-3.5 rounded border border-[#2a2a2a] space-y-2">
                      <span className="text-[10px] text-[#888] uppercase tracking-wider block">
                        Active Tool Execution
                      </span>
                      <div className="text-[11px] text-[#ddd] bg-[#121212] p-2.5 rounded border border-[#222]">
                        <span className="text-amber-400">Tool:</span> edit_file
                        <br />
                        <span className="text-[#888]">Path:</span> src/components/Header.tsx
                        <br />
                        <span className="text-emerald-400">Status:</span> Surgical block replaced (L42-L58)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeScreenId === 'ast-context' && (
                <div className="space-y-4">
                  <div className="bg-[#181818] p-4 rounded border border-[#2a2a2a]">
                    <span className="text-[10px] text-[#888] uppercase tracking-wider block mb-3">
                      AST Semantic Dependency Graph
                    </span>
                    <div className="space-y-2 text-[12px]">
                      <div className="flex items-center justify-between p-2 bg-[#222] rounded border border-[#333]">
                        <span className="text-emerald-400 font-semibold">App.tsx</span>
                        <span className="text-[10px] text-[#888]">Root Component (Imports 6 modules)</span>
                      </div>
                      <div className="pl-6 border-l border-[#333] space-y-1.5">
                        <div className="flex items-center justify-between p-1.5 bg-[#1a1a1a] rounded text-[11px]">
                          <span className="text-cyan-400">useTheme() Hook</span>
                          <span className="text-[#666]">src/hooks/useTheme.ts</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 bg-[#1a1a1a] rounded text-[11px]">
                          <span className="text-cyan-400">ThemeProvider Component</span>
                          <span className="text-[#666]">src/context/ThemeContext.tsx</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeScreenId === 'surgical-diff' && (
                <div className="space-y-3 text-[11px]">
                  <div className="flex items-center justify-between bg-[#181818] px-3 py-2 rounded border border-[#2a2a2a]">
                    <span className="text-cyan-300 font-semibold">src/components/ThemeToggle.tsx</span>
                    <span className="text-emerald-400">+14 lines, -2 lines</span>
                  </div>
                  <div className="bg-[#141414] p-3 rounded border border-[#222] text-[11px] leading-relaxed overflow-x-auto">
                    <div className="text-[#e06c75]">- const isDark = false;</div>
                    <div className="text-emerald-400 font-bold">+ const {`{ theme, toggleTheme }`} = useTheme();</div>
                    <div className="text-[#888]">  return (</div>
                    <div className="text-emerald-400 font-bold">+   &lt;button onClick={'{toggleTheme}'} aria-label="Toggle theme"&gt;</div>
                    <div className="text-emerald-400 font-bold">+     {`{theme === 'dark' ? <SunIcon /> : <MoonIcon />}`}</div>
                    <div className="text-emerald-400 font-bold">+   &lt;/button&gt;</div>
                    <div className="text-[#888]">  );</div>
                  </div>
                </div>
              )}

              {activeScreenId === 'mcp-skills' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-[#181818] p-3.5 rounded border border-[#2a2a2a]">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-2">
                        Connected MCP Servers
                      </span>
                      <div className="space-y-1.5 text-[#ccc]">
                        <div className="flex justify-between">
                          <span>github.com/mcp</span>
                          <span className="text-emerald-400">Connected</span>
                        </div>
                        <div className="flex justify-between">
                          <span>postgres-local</span>
                          <span className="text-emerald-400">Connected</span>
                        </div>
                        <div className="flex justify-between">
                          <span>puppeteer-browser</span>
                          <span className="text-emerald-400">Connected</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#181818] p-3.5 rounded border border-[#2a2a2a]">
                      <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-2">
                        Loaded Project Skills
                      </span>
                      <div className="space-y-1.5 text-[#ccc]">
                        <div>• code-style-enforcer.md</div>
                        <div>• react-performance.md</div>
                        <div>• security-sanitizer.md</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeScreenId === 'verification-engine' && (
                <div className="space-y-3 text-[11px]">
                  <div className="bg-[#141414] p-4 rounded border border-[#2a2a2a] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <Check className="w-4 h-4" />
                      <span>TypeScript Compiler (tsc --noEmit): 0 errors</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <Check className="w-4 h-4" />
                      <span>ESLint: 0 syntax issues</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <Check className="w-4 h-4" />
                      <span>Vitest: 18 tests passed across 4 suites (142ms)</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#888] italic">
                    Self-healing activated if any check fails before showing final output.
                  </div>
                </div>
              )}

              {activeScreenId === 'settings-memory' && (
                <div className="space-y-3 text-[11px]">
                  <div className="bg-[#181818] p-3.5 rounded border border-[#2a2a2a] space-y-2">
                    <span className="text-[10px] text-[#888] uppercase tracking-wider block">
                      Local Project Settings (.sylor/config.json)
                    </span>
                    <div className="text-[#ccc] space-y-1">
                      <div>"strictAstDiff": true,</div>
                      <div>"verificationHook": "npm run test:fast",</div>
                      <div>"telemetry": "off",</div>
                      <div>"maxParallelTools": 6</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Footer */}
              <div className="mt-4 pt-3 border-t border-[#222] flex items-center justify-between text-[10px] text-[#777]">
                <span>Rendering view: {activeScreen.title}</span>
                <span className="text-emerald-400">Zero Cloud Leakage • Local AST Cache</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Highlights & Description (col-span-4) */}
          <div className="lg:col-span-4 bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#737373] block mb-2">
                Screen Architecture
              </span>
              <h3 className="text-[22px] font-semibold text-[#111111] tracking-tight">
                {activeScreen.title}
              </h3>
              <p className="text-[14px] text-[#737373] mt-2 leading-relaxed">
                {activeScreen.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#e8e6e2] space-y-2.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111] block mb-1">
                Engine Capabilities
              </span>
              {activeScreen.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-[#111111]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]"></span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e8e6e2] text-[12px] font-mono text-[#737373]">
              Deterministic feedback loop between agent thoughts and code state.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
