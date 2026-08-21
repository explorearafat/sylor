import React, { useState } from 'react';
import { X, Download, ExternalLink, Terminal, Check, Copy, Monitor, Apple, Cpu, ShieldCheck } from 'lucide-react';
import { INSTALL_PLATFORMS } from '../data';
import { SylorLogo } from './SylorLogo';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlatform?: 'windows' | 'macos' | 'linux';
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  initialPlatform = 'macos'
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'macos' | 'linux'>(initialPlatform);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const currentPlatformData = INSTALL_PLATFORMS.find((p) => p.id === selectedPlatform) || INSTALL_PLATFORMS[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTrigger = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111111]/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[620px] bg-[#faf9f7] border border-[#e8e6e2] rounded-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden text-[#111111]"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e6e2] bg-[#f4f2ee]">
          <div className="flex items-center gap-2.5">
            <SylorLogo size={20} showBubbles={false} />
            <div className="text-[13px] font-bold tracking-tight text-[#111111]">
              Install Sylor
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] bg-[#e8e6e2] px-2 py-0.5 rounded">
              v1.0.4 Release
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 text-[#737373] hover:text-[#111111] hover:bg-[#e8e6e2] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="p-4 bg-white border border-[#e8e6e2] rounded-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <div className="text-[13px] font-semibold text-[#111111] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Test Sylor Live in Browser</span>
              </div>
              <p className="text-[12px] text-[#737373] mt-0.5">
                Instant access at trysylor.vercel.app with zero configuration.
              </p>
            </div>
            <a
              href="https://trysylor.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#faf9f7] bg-[#111111] hover:bg-[#2c2b29] rounded-[4px] transition-all shrink-0"
            >
              <span>Open trysylor</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <h3 id="download-modal-title" className="text-[16px] font-semibold tracking-tight text-[#111111]">
              Or download native desktop binary
            </h3>
            <p className="text-[13px] text-[#737373] mt-1 leading-relaxed">
              Sylor runs as a native, secure desktop agent that connects directly to your local editor and workspace.
            </p>
          </div>

          
          <div className="grid grid-cols-3 gap-2 p-1 bg-[#f4f2ee] rounded-[6px] border border-[#e8e6e2]">
            <button
              onClick={() => setSelectedPlatform('windows')}
              className={`flex items-center justify-center gap-2 py-2 text-[12px] font-medium rounded-[4px] transition-all ${
                selectedPlatform === 'windows'
                  ? 'bg-white text-[#111111] shadow-sm font-semibold'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Windows</span>
            </button>

            <button
              onClick={() => setSelectedPlatform('macos')}
              className={`flex items-center justify-center gap-2 py-2 text-[12px] font-medium rounded-[4px] transition-all ${
                selectedPlatform === 'macos'
                  ? 'bg-white text-[#111111] shadow-sm font-semibold'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>macOS</span>
            </button>

            <button
              onClick={() => setSelectedPlatform('linux')}
              className={`flex items-center justify-center gap-2 py-2 text-[12px] font-medium rounded-[4px] transition-all ${
                selectedPlatform === 'linux'
                  ? 'bg-white text-[#111111] shadow-sm font-semibold'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Linux</span>
            </button>
          </div>

          {/* Active Platform Download Details */}
          <div className="p-5 bg-[#f4f2ee] rounded-[8px] border border-[#e8e6e2] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#e8e6e2]">
              <div>
                <div className="text-[14px] font-semibold text-[#111111]">
                  {currentPlatformData.primaryPackage}
                </div>
                <div className="text-[11px] font-mono text-[#737373]">
                  {currentPlatformData.osTag} • {currentPlatformData.fileSize}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shrink-0">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified SHA-256</span>
              </div>
            </div>

            {/* Primary Download Button */}
            <button
              onClick={handleDownloadTrigger}
              disabled={isDownloading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-[13px] font-semibold uppercase tracking-wider text-[#faf9f7] bg-[#111111] rounded-[4px] hover:bg-[#2c2b29] transition-all shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111]"
            >
              {isDownloading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Preparing Binary ({currentPlatformData.name})...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download for {currentPlatformData.name}</span>
                </>
              )}
            </button>

            {/* CLI Command Alternative */}
            <div className="pt-3 border-t border-[#e8e6e2]">
              <div className="flex items-center justify-between mb-1.5 text-[10px] font-bold font-mono uppercase tracking-wider text-[#737373]">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 h-3" />
                  <span>Or install via Terminal</span>
                </span>
                <button
                  onClick={() => handleCopy(currentPlatformData.cliCommand)}
                  className="flex items-center gap-1 text-[#111111] hover:underline"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy command</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-[#faf9f7] rounded border border-[#e8e6e2] font-mono text-[11px] text-[#111111] overflow-x-auto flex items-center justify-between">
                <code>{currentPlatformData.cliCommand}</code>
              </div>
            </div>
          </div>

          {/* Quick Guidance Footer */}
          <div className="text-[12px] text-[#737373] flex items-center justify-between border-t border-[#e8e6e2] pt-4">
            <span>Requires zero cloud configuration to start.</span>
            <span className="font-mono text-[11px] text-[#111111]">Zero telemetry by default</span>
          </div>
        </div>
      </div>
    </div>
  );
};
