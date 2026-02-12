
import React, { useState } from 'react';
import { Match, Persona } from '../types';
import { MATCHES } from '../constants';

interface Props {
  persona: Persona | null;
  onSelect: (m: Match, type?: 'TICKET_ONLY' | 'EXPERIENCE') => void;
  onBack: () => void;
}

const MatchSelection: React.FC<Props> = ({ persona, onSelect, onBack }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getOpponentLogo = (opponent: string) => {
    if (opponent.toLowerCase().includes('city')) return 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png';
    if (opponent.toLowerCase().includes('arsenal')) return 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png';
    if (opponent.toLowerCase().includes('west ham')) return 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/West_Ham_United_FC_logo.svg/1200px-West_Ham_United_FC_logo.svg.png';
    if (opponent.toLowerCase().includes('liverpool')) return 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png';
    return 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/1200px-Brighton_%26_Hove_Albion_logo.svg.png';
  };

  const getStatusDisplay = (status: Match['status']) => {
    switch (status) {
      case 'SELLING_FAST':
        return { text: 'Selling Fast', color: 'text-amber-500', dot: 'bg-amber-500 animate-pulse' };
      case 'SOLD_OUT':
        return { text: 'Sold Out', color: 'text-slate-400', dot: 'bg-slate-300' };
      default:
        return { text: 'Available', color: 'text-emerald-500', dot: 'bg-emerald-500' };
    }
  };

  return (
    <div className="px-6 py-8 animate-in slide-in-from-right duration-500">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div>
          <h2 className="text-2xl font-black italic uppercase tracking-tight">Select a Match</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Fixtures 24/25</p>
        </div>
      </div>

      <div className="space-y-4">
        {MATCHES.map((m) => {
          const status = getStatusDisplay(m.status);
          const [datePart, timePart] = m.date.split(' • ');
          const isExpanded = expandedId === m.id;

          return (
            <div
              key={m.id}
              className={`w-full bg-white border border-slate-100 rounded-[2.5rem] transition-all duration-500 shadow-sm relative group overflow-hidden flex flex-col ${m.status === 'SOLD_OUT' ? 'opacity-60 grayscale' : 'hover:shadow-xl'}`}
            >
              <button 
                onClick={() => {
                  if (persona === Persona.BIG_GAMES) {
                    setExpandedId(isExpanded ? null : m.id);
                  } else {
                    onSelect(m); // Experience-First Flow (just select match)
                  }
                }}
                disabled={m.status === 'SOLD_OUT'}
                className="w-full p-8 text-left focus:outline-none relative z-10"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${status.color}`}>{status.text}</span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#001489]/60">{m.league} • {m.round}</div>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.stadium}</div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col items-center flex-1">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png" className="w-14 h-14 object-contain mb-3" alt="CFCW" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Chelsea</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-black italic tracking-tighter text-[#001489]">{timePart}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{datePart}</span>
                  </div>

                  <div className="flex flex-col items-center flex-1">
                    <img src={getOpponentLogo(m.opponent)} className="w-14 h-14 object-contain mb-3" alt={m.opponent} />
                    <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[80px] text-center">{m.opponent.split(' ').slice(-1)[0]}</span>
                  </div>
                </div>
              </button>

              {/* Match-First Flow (Big Game Hunter) Options */}
              {persona === Persona.BIG_GAMES && (
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] border-t border-slate-50' : 'max-h-0'}`}>
                  <div className="p-8 grid grid-cols-1 gap-3 bg-slate-50/50">
                    <button 
                      onClick={() => onSelect(m, 'TICKET_ONLY')}
                      className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl group/btn hover:border-blue-600 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-lg">
                          <i className="fa-solid fa-ticket-simple"></i>
                        </div>
                        <div className="text-left">
                          <p className="font-black text-sm uppercase tracking-tight">Ticket Only</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">General Admission</p>
                        </div>
                      </div>
                      <span className="font-black text-[#001489]">from £45</span>
                    </button>

                    <div className="w-full flex items-center justify-between p-5 bg-slate-100 border border-slate-200 rounded-2xl opacity-60">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-200 text-slate-400 rounded-xl flex items-center justify-center text-lg">
                          <i className="fa-solid fa-calendar-check"></i>
                        </div>
                        <div className="text-left">
                          <p className="font-black text-sm uppercase tracking-tight">Season Ticket</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Waitlist for 25/26</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sold Out</span>
                    </div>

                    <button 
                      onClick={() => onSelect(m, 'EXPERIENCE')}
                      className="w-full flex items-center justify-between p-5 bg-[#034694] rounded-2xl group/btn hover:bg-blue-800 transition-all shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center text-lg">
                          <i className="fa-solid fa-sparkles"></i>
                        </div>
                        <div className="text-left">
                          <p className="font-black text-sm uppercase tracking-tight text-white">Select all experience</p>
                          <p className="text-[10px] text-blue-100/60 font-bold uppercase tracking-widest">VIP & Member Access</p>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-right text-xs text-white/50 group-hover/btn:translate-x-1 transition-transform"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchSelection;
