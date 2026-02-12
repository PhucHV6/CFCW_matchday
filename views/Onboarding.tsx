import React from 'react';
import { Persona } from '../types';

interface Props {
  onSelect: (p: Persona) => void;
}

const Onboarding: React.FC<Props> = ({ onSelect }) => {
  const primaryBlue = "#001489";

  return (
    <div className="px-4 py-6 animate-in fade-in duration-1000 max-w-lg mx-auto">
      {/* Hero Banner - Resized for mobile */}
      <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-xl border-2 border-white">
        <img 
          src="https://img.chelseafc.com/image/upload/f_auto,ar_16:9,w_500,c_fill,g_auto,dpr_2.0,q_90/video/2026/02/06/16x9_Rosenior_on_Wolves_a__EPL_2025-26.jpg" 
          className="w-full h-full object-cover" 
          alt="Chelsea Women at Stamford Bridge" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#034694] via-blue-900/20 to-transparent flex flex-col justify-end p-8 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1 w-6 bg-[#DBA111] rounded-full"></span>
            <p className="text-[#DBA111] text-[10px] font-black uppercase tracking-[0.3em]">CFCW Official</p>
          </div>
          <h2 className="text-3xl font-black italic uppercase leading-none mb-1 tracking-tighter text-white">Pride of London.</h2>
          <p className="text-blue-200 text-sm font-medium">Personalize your matchday.</p>
        </div>
      </div>

      <div className="mb-6 text-center">
        <h3 className={`text-xl font-black mb-1 tracking-tight italic uppercase text-[${primaryBlue}]`}>Choose Your Vibe</h3>
        <p className="text-slate-500 text-xs">Customizing your experience...</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Die-Hard Fan */}
        <button 
          onClick={() => onSelect(Persona.DIE_HARD)}
          className="group w-full bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:border-blue-600 hover:shadow-xl transition-all duration-500 text-left flex flex-col"
        >
          <div className="h-32 w-full overflow-hidden shrink-0 relative">
            <img 
              src="https://img.chelseafc.com/image/upload/f_auto,w_600,q_90/v1749645250/site-sections/tickets/women/CFC_Women_True_Blues.jpg" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Season Ticket Holders" 
            />
            <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest text-blue-600 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
              Always Blue
            </span>
          </div>
          <div className="p-5 flex-1 relative">
            <p className={`font-black text-lg uppercase tracking-tight mb-1 text-[${primaryBlue}]`}>Die-Hard Fan</p>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Season tickets are for you. Access every home minute.</p>
            <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </div>
          </div>
        </button>

        {/* Weekend Outing */}
        <button 
          onClick={() => onSelect(Persona.FRIENDS_OUTING)}
          className="group w-full bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:border-blue-600 hover:shadow-xl transition-all duration-500 text-left flex flex-col"
        >
          <div className="h-32 w-full overflow-hidden shrink-0 relative">
            <img 
              src="https://img.chelseafc.com/image/upload/f_auto,w_600,q_90/v1749643514/site-sections/tickets/women/CFC_Women_Family_Stand.jpg" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Social Group Matchday" 
            />
            <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
              Squad Goals
            </span>
          </div>
          <div className="p-5 flex-1 relative">
            <p className={`font-black text-lg uppercase tracking-tight mb-1 text-[${primaryBlue}]`}>Weekend Outing</p>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Select variety of bundle or premium experiences.</p>
            <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </div>
          </div>
        </button>

        {/* Big Game Hunter */}
        <button 
          onClick={() => onSelect(Persona.BIG_GAMES)}
          className="group w-full bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:border-blue-600 hover:shadow-xl transition-all duration-500 text-left flex flex-col"
        >
          <div className="h-32 w-full overflow-hidden shrink-0 relative">
            <img 
              src="https://img.chelseafc.com/image/upload/f_auto,g_center,w_600,q_90/v1749643518/site-sections/tickets/women/CFC_Women_Vibes.jpg" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Major Match" 
            />
            <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest text-amber-600 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
              Match Hunting
            </span>
          </div>
          <div className="p-5 flex-1 relative">
            <p className={`font-black text-lg uppercase tracking-tight mb-1 text-[${primaryBlue}]`}>Big Game Hunter</p>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Hunt the tickets for big matches. Focus on showdowns.</p>
            <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-8 text-center pb-8">
        <button className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-all py-3 px-6 border border-slate-200 rounded-full hover:border-blue-200 active:scale-95 shadow-sm">
          Browse all as guest
        </button>
      </div>
    </div>
  );
};

export default Onboarding;