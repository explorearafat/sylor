import React from 'react';
import { Instagram, Facebook, Github, ArrowUpRight } from 'lucide-react';

export const DeveloperSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="Developer Information"
      className="py-16 md:py-20 border-t border-[#e8e6e2] bg-[#fbfaf8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="max-w-[700px]">
          
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8a8880] block mb-3">
            Origin
          </span>

          
          <p className="text-[17px] sm:text-[18px] text-[#2c2b28] leading-[1.65]">
            Built independently by <strong className="font-semibold text-[#141413]">Arafat</strong> — a developer
            exploring AI agents, automation, cybersecurity, and the future of software development.
          </p>

          
          <div className="mt-6 flex flex-wrap items-center gap-6 text-[13px] font-mono">
            
            <a
              href="https://instagram.com/explorearafat"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[#6e6d68] hover:text-[#141413] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] rounded py-1"
            >
              <Instagram className="w-4 h-4 text-[#8a8880] group-hover:text-[#141413] transition-colors" />
              <span>explorearafat</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            
            <a
              href="https://facebook.com/exploreeyasin"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[#6e6d68] hover:text-[#141413] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] rounded py-1"
            >
              <Facebook className="w-4 h-4 text-[#8a8880] group-hover:text-[#141413] transition-colors" />
              <span>exploreeyasin</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            
            <a
              href="https://github.com/explorearafat"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[#6e6d68] hover:text-[#141413] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] rounded py-1"
            >
              <Github className="w-4 h-4 text-[#8a8880] group-hover:text-[#141413] transition-colors" />
              <span>explorearafat</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
