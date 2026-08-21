import React from 'react';
import { DEVELOPER_PERSONAS } from '../data';
import { Sparkles, Shield, Compass, Terminal } from 'lucide-react';

export const DeveloperPersonas: React.FC = () => {
  const getPersonaIcon = (id: string) => {
    switch (id) {
      case 'persona-builder':
        return <Sparkles className="w-4 h-4" />;
      case 'persona-maintainer':
        return <Shield className="w-4 h-4" />;
      case 'persona-learner':
        return <Compass className="w-4 h-4" />;
      case 'persona-power':
        return <Terminal className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const personaNotes = [
    {
      ...DEVELOPER_PERSONAS[0],
      noteColor: 'bg-[#fef9c3] border-[#fde047]', 
      pinColor: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]',
      tilt: '-rotate-1',
    },
    {
      ...DEVELOPER_PERSONAS[1],
      noteColor: 'bg-[#e0f2fe] border-[#bae6fd]', 
      pinColor: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
      tilt: 'rotate-1',
    },
    {
      ...DEVELOPER_PERSONAS[2],
      noteColor: 'bg-[#f3e8ff] border-[#e9d5ff]', 
      pinColor: 'from-[#a855f7] via-[#9333ea] to-[#7e22ce]',
      tilt: '-rotate-1',
    },
    {
      ...DEVELOPER_PERSONAS[3],
      noteColor: 'bg-[#ffedd5] border-[#fed7aa]', 
      pinColor: 'from-[#f97316] via-[#ea580c] to-[#c2410c]',
      tilt: 'rotate-1.5',
    },
  ];

  return (
    <section
      id="developers"
      aria-labelledby="personas-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        <div className="max-w-[760px] mb-14">
          <span className="text-[11px] font-bold font-mono uppercase tracking-[0.2em] text-[#737373] block mb-3">
            Developer Fit
          </span>
          <h2
            id="personas-heading"
            className="text-[32px] sm:text-[42px] md:text-[48px] font-medium text-[#111111] tracking-[-0.04em] leading-[1.06] text-depth-heading"
          >
            Built for how you work.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#737373] leading-relaxed">
            Whether you are scaffolding zero-to-one prototypes or maintaining safety-critical production monorepos.
          </p>
        </div>

        
        <div className="space-y-6">
          {personaNotes.map((persona, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div
                key={persona.id}
                className={`flex ${isLeft ? 'justify-start sm:pr-16 md:pr-28' : 'justify-end sm:pl-16 md:pl-28'}`}
              >
                <div
                  className={`relative w-full sm:w-[94%] p-5 pt-6 rounded-[3px] border transition-all duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:scale-[1.01] ${persona.noteColor} ${persona.tilt} hover:rotate-0`}
                >
                  {/* Pushpin */}
                  <div className="absolute -top-2.5 left-6 z-20 flex flex-col items-center pointer-events-none">
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-br ${persona.pinColor} shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/60 flex items-center justify-center`}
                    >
                      <div className="w-1 h-1 rounded-full bg-white/70"></div>
                    </div>
                    <div className="w-0.5 h-2 bg-black/20 -mt-0.5"></div>
                  </div>

                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-black/[0.08] pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-black/[0.08] text-[#141413]">
                        {getPersonaIcon(persona.id)}
                      </span>
                      <span className="text-[15px] font-mono font-bold text-[#141413]">
                        {persona.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#666] bg-black/[0.05] px-2 py-0.5 rounded">
                      {persona.tagline}
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="text-[14px] sm:text-[15px] font-mono font-bold text-[#141413] italic mb-2">
                    "{persona.quote}"
                  </div>

                  {/* Description */}
                  <p className="text-[13px] font-mono text-[#3f3e3a] leading-relaxed mb-4">
                    {persona.description}
                  </p>

                  {/* Typical Prompt */}
                  <div className="p-3 bg-white/80 rounded border border-black/[0.08] font-mono text-[12px] text-[#222]">
                    <div className="text-[10px] font-bold text-[#777] uppercase tracking-wider mb-1">
                      Typical Developer Prompt:
                    </div>
                    <div>"{persona.typicalTask}"</div>
                  </div>

                  {/* Footer tag */}
                  <div className="mt-3 pt-2 border-t border-black/[0.06] flex items-center justify-between text-[10.5px] font-mono text-[#5c5b56]">
                    <span>Role: {persona.role}</span>
                    <span className="text-[9.5px] opacity-60 font-semibold uppercase">
                      {isLeft ? 'LEFT PIN' : 'RIGHT PIN'}
                    </span>
                  </div>

                  {/* Dog-ear fold */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-black/[0.07] pointer-events-none rounded-tl-sm"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
