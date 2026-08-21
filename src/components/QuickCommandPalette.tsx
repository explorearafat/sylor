import React, { useState, useEffect } from 'react';
import { Search, Terminal, ExternalLink, BookOpen, Layers, X, ArrowRight, Cpu } from 'lucide-react';

interface QuickCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDownloadModal?: () => void;
  onOpenManifest?: () => void;
}

export const QuickCommandPalette: React.FC<QuickCommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenManifest,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    {
      id: 'test-sylor',
      title: 'Test Sylor Web App (trysylor.vercel.app)',
      category: 'Try Live',
      icon: ExternalLink,
      action: () => {
        onClose();
        window.open('https://trysylor.vercel.app', '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'manifest',
      title: 'Open Agent Manifest Spec',
      category: 'Protocol',
      icon: Cpu,
      action: () => {
        onClose();
        if (onOpenManifest) onOpenManifest();
      },
    },
    {
      id: 'vm',
      title: 'Deterministic VM Inspector',
      category: 'Runtime',
      icon: Terminal,
      action: () => {
        onClose();
        document.getElementById('vm-inspector')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'stages',
      title: 'Stage-by-Stage Progression (01-06)',
      category: 'Execution',
      icon: ArrowRight,
      action: () => {
        onClose();
        document.getElementById('stages')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'mcp',
      title: 'MCP Server Extensibility Matrix',
      category: 'Tools',
      icon: Layers,
      action: () => {
        onClose();
        document.getElementById('extensibility')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'capabilities',
      title: 'Concrete Capabilities Index',
      category: 'Features',
      icon: BookOpen,
      action: () => {
        onClose();
        document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:px-6">
      
      <div
        className="fixed inset-0 bg-[#141413]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      
      <div className="relative w-full max-w-xl bg-[#faf9f7] border border-[#d8d5cb] rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center px-4 py-3.5 border-b border-[#e8e6e2] bg-[#f5f3ee]">
          <Search className="w-4 h-4 text-[#8a8880] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section... (Press Esc to exit)"
            className="w-full bg-transparent border-none text-[14px] text-[#141413] placeholder-[#8a8880] focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8a8880] hover:text-[#141413] hover:bg-[#e8e6e2] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-[8px] text-left hover:bg-[#edeae3] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-[#faf9f7] border border-[#e4e1d8] text-[#141413] group-hover:border-[#141413] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-[#141413]">
                        {item.title}
                      </div>
                      <div className="text-[11px] font-mono text-[#8a8880]">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#8a8880] opacity-0 group-hover:opacity-100 transition-opacity">
                    Jump ↵
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-[13px] font-mono text-[#8a8880]">
              No commands matching "{query}"
            </div>
          )}
        </div>

        
        <div className="px-4 py-2.5 bg-[#f0ede6] border-t border-[#e8e6e2] flex items-center justify-between text-[11px] font-mono text-[#8a8880]">
          <span>Navigate with mouse or keyboard</span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-[#faf9f7] border border-[#d8d5cb] rounded text-[10px] text-[#141413]">
              ESC
            </kbd>
            to close
          </span>
        </div>
      </div>
    </div>
  );
};
