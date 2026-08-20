import React, { useState } from 'react';
import { DEVELOPER_PERSONAS } from '../data';
import { Sparkles, Shield, Compass, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

export const DeveloperPersonas: React.FC = () => {
  const [activePersonaId, setActivePersonaId] = useState<string>(DEVELOPER_PERSONAS[0].id);

  const activePersona =
    DEVELOPER_PERSONAS.find((p) => p.id === activePersonaId) || DEVELOPER_PERSONAS[0];

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

  return (
    <section
      id="developers"
      aria-labelledby="personas-heading"
      className="py-24 md:py-36 border-t border-[#e8e6e2] bg-[#faf9f7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[760px] mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373] block mb-3">
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

        {/* Persona Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pb-6 border-b border-[#e8e6e2]">
          {DEVELOPER_PERSONAS.map((persona) => {
            const isSelected = persona.id === activePersonaId;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersonaId(persona.id)}
                className={`p-4 text-left rounded-[6px] transition-all border ${
                  isSelected
                    ? 'bg-white border-[#111111] text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-semibold'
                    : 'bg-[#f4f2ee] border-transparent text-[#737373] hover:text-[#111111] hover:border-[#e8e6e2]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#737373]">
                    {persona.tagline}
                  </span>
                  <span className={isSelected ? 'text-[#111111]' : 'text-[#737373]'}>
                    {getPersonaIcon(persona.id)}
                  </span>
                </div>
                <div className="text-[14px] leading-snug">
                  {persona.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Persona Deep Dive */}
        <div className="mt-8 bg-[#f4f2ee] border border-[#e8e6e2] rounded-[10px] p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373] block mb-2">
                Core Need & Philosophy
              </span>
              <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#111111] tracking-tight">
                "{activePersona.quote}"
              </h3>
              <p className="text-[15px] text-[#737373] mt-3 leading-relaxed">
                {activePersona.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#e8e6e2]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373] block mb-2">
                Typical Sylor Task Prompt
              </span>
              <div className="p-3.5 bg-white rounded border border-[#e8e6e2] font-mono text-[12px] text-[#111111]">
                "{activePersona.typicalTask}"
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#faf9f7] p-6 rounded-[8px] border border-[#e8e6e2] space-y-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111] block pb-2 border-b border-[#e8e6e2]">
              Key Value Drivers
            </span>
            <div className="space-y-3">
              {activePersona.valueDrivers.map((driver, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[14px] text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{driver}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e8e6e2] text-[12px] font-mono text-[#737373]">
              Adapted for speed, correctness, and developer autonomy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
