import React, { useState } from 'react';
import { Download, FolderOpen, MessageSquareCode, CheckCircle2, ArrowRight, Monitor, Apple, Cpu } from 'lucide-react';
import { INSTALL_PLATFORMS } from '../data';

interface InstallationPreviewProps {
  onOpenDownloadModal: () => void;
}

export const InstallationPreview: React.FC<InstallationPreviewProps> = ({ onOpenDownloadModal }) => {
  const [activeTab, setActiveTab] = useState<'macos' | 'windows' | 'linux'>('macos');

  const activePlatform = INSTALL_PLATFORMS.find((p) => p.id === activeTab) || INSTALL_PLATFORMS[1];

  return (
    <section
      id="quick-start"
      aria-labelledby="install-preview-heading"
      className="py-20 md:py-28 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e8e6e2]">
          <div className="max-w-[680px]">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
              Frictionless Onboarding
            </span>
            <h2
              id="install-preview-heading"
              className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.06] text-depth-heading"
            >
              From download to first task.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
              No complex Docker setups or cloud proxies. Sylor runs natively on your machine and binds directly to your local project.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenDownloadModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-mono uppercase tracking-wider font-semibold text-[#faf9f7] bg-[#111111] rounded-[4px] hover:bg-[#2c2b29] transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install Sylor</span>
            </button>
          </div>
        </div>

        {/* 3-Step Visual Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Step 01 */}
          <div className="bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e8e6e2]">
                <span className="text-[12px] font-mono font-bold text-[#111111]">01</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] bg-white border border-[#e8e6e2] px-2 py-0.5 rounded">
                  Install
                </span>
              </div>
              <h3 className="text-[18px] font-semibold text-[#111111] tracking-tight">
                Install Sylor
              </h3>
              <p className="text-[14px] text-[#737373] mt-2 leading-relaxed">
                Download the lightweight native binary for macOS, Windows, or Linux. Starts in under 3 seconds.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e8e6e2] flex items-center gap-2 text-[11px] font-mono text-[#737373]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Available for macOS, Windows, Linux</span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e8e6e2]">
                <span className="text-[12px] font-mono font-bold text-[#111111]">02</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] bg-white border border-[#e8e6e2] px-2 py-0.5 rounded">
                  Grounding
                </span>
              </div>
              <h3 className="text-[18px] font-semibold text-[#111111] tracking-tight">
                Choose your project
              </h3>
              <p className="text-[14px] text-[#737373] mt-2 leading-relaxed">
                Open any directory or Git repository. Sylor builds an AST symbol graph without modifying files.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e8e6e2] flex items-center gap-2 text-[11px] font-mono text-[#737373]">
              <FolderOpen className="w-3.5 h-3.5 text-[#111111]" />
              <span>TS, Python, Go, Rust, React</span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e8e6e2]">
                <span className="text-[12px] font-mono font-bold text-[#111111]">03</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] bg-white border border-[#e8e6e2] px-2 py-0.5 rounded">
                  Execution
                </span>
              </div>
              <h3 className="text-[18px] font-semibold text-[#111111] tracking-tight">
                Tell Sylor what to build
              </h3>
              <p className="text-[14px] text-[#737373] mt-2 leading-relaxed">
                Describe a feature, refactor, or bug. Sylor plans the steps, makes surgical edits, and verifies the build.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e8e6e2] flex items-center gap-2 text-[11px] font-mono text-[#737373]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Review full diff before accepting</span>
            </div>
          </div>
        </div>

        {/* Minimal Flow Sequence Indicator */}
        <div className="mt-10 p-5 bg-[#faf9f7] border border-[#e8e6e2] rounded-[10px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-[12px] font-mono text-[#111111]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded flex items-center justify-center bg-[#111111] text-[#faf9f7] text-[10px] font-bold">
                01
              </span>
              <span>Install Sylor</span>
            </div>
            <span className="hidden md:inline text-[#737373]">→</span>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded flex items-center justify-center bg-[#111111] text-[#faf9f7] text-[10px] font-bold">
                02
              </span>
              <span>Open a project</span>
            </div>
            <span className="hidden md:inline text-[#737373]">→</span>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded flex items-center justify-center bg-[#111111] text-[#faf9f7] text-[10px] font-bold">
                03
              </span>
              <span>Give Sylor a task</span>
            </div>
            <span className="hidden md:inline text-[#737373]">→</span>

            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <span className="w-5 h-5 rounded flex items-center justify-center bg-emerald-600 text-white text-[10px] font-bold">
                04
              </span>
              <span>Sylor plans & executes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
