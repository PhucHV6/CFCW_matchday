
import React, { useState } from 'react';
import { Persona, TicketOffer, Match } from '../types';
import { OFFERS_BY_PERSONA, HOSPITALITY_PACKAGES } from '../constants';

interface Props {
  persona: Persona | 'ALL';
  selectedMatch?: Match | null;
  onSelect: (o: TicketOffer) => void;
  onBack: () => void;
  onFilterHospitality: () => void;
  onBrowseAll: () => void;
}

const Offers: React.FC<Props> = ({ persona, selectedMatch, onSelect, onBack, onFilterHospitality, onBrowseAll }) => {
  const primaryBlue = "#001489";

  // Logic to determine which offers to display
  let offers: TicketOffer[] = [];
  if (persona === 'ALL') {
    const allBase = Object.values(OFFERS_BY_PERSONA).flat();
    const uniqueBase = Array.from(new Map(allBase.map(item => [item.id, item])).values())
      .filter(o => o.id !== 'bg-hospitality');
    offers = [...uniqueBase, ...HOSPITALITY_PACKAGES];
  } else if (selectedMatch) {
    // Flow: Match-First (Big Game Hunter)
    offers = OFFERS_BY_PERSONA[Persona.BIG_GAMES];
  } else if (persona === Persona.DIE_HARD) {
    offers = OFFERS_BY_PERSONA[Persona.DIE_HARD];
  } else {
    // Flow: Experience-First (Weekend Outing)
    const personaOffers = (OFFERS_BY_PERSONA[persona] || []).filter(o => o.id !== 'bg-hospitality');
    const squadBundle = OFFERS_BY_PERSONA[Persona.FRIENDS_OUTING].find(o => o.id === 'squad-bundle');
    const baseList = [...personaOffers];
    if (squadBundle && !baseList.find(o => o.id === squadBundle.id)) {
      baseList.push(squadBundle);
    }
    offers = [...baseList, ...HOSPITALITY_PACKAGES];
  }

  return (
    <div className="px-6 py-8 animate-in slide-in-from-right duration-500">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tight">
              {selectedMatch ? `vs ${selectedMatch.opponent.split(' ').slice(-1)[0]}` : (persona === 'ALL' ? 'All Experiences' : 'Matchday Offers')}
            </h2>
            {selectedMatch && <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{selectedMatch.date}</p>}
          </div>
        </div>
        {!selectedMatch && persona !== 'ALL' && (
          <button onClick={onBrowseAll} className="text-xs font-bold text-blue-600 hover:underline">Browse all</button>
        )}
      </div>

      <div className="space-y-6">
        {offers.map((offer) => {
          const isHospitality = offer.id.startsWith('h-') || offer.id === 'bg-hospitality';
          const isCustom = offer.id === 'h-custom';

          return (
            <div key={offer.id} className={`group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 ${isHospitality ? 'hover:border-[#DBA111]' : 'hover:border-blue-600'}`}>
              <div className={`h-52 overflow-hidden relative ${offer.isSoldOut ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                   {offer.tag && (
                     <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg ${isHospitality ? 'bg-[#DBA111] text-white' : 'bg-[#034694] text-white'}`}>
                       {offer.tag}
                     </span>
                   )}
                   {offer.isSoldOut && <span className="bg-slate-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Sold Out</span>}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl shadow-lg border border-white">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">
                     {isCustom ? 'Starting from' : 'Price from'}
                   </p>
                   <p className="text-2xl font-black text-blue-900 leading-none">
                     {isCustom ? 'from ' : ''}£{offer.price}
                   </p>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight italic">{offer.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium">{offer.description}</p>
                
                <div className="space-y-3 mb-8">
                  {offer.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${isHospitality ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                        <i className="fa-solid fa-check"></i>
                      </div>
                      {benefit}
                    </div>
                  ))}
                </div>

                <button 
                  disabled={offer.isSoldOut}
                  onClick={() => onSelect(offer)}
                  className={`w-full font-black uppercase tracking-[0.2em] py-4 rounded-2xl transition-all active:scale-95 text-white ${offer.isSoldOut ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : (isHospitality ? 'bg-[#DBA111] hover:bg-[#c48f0e]' : 'bg-[#034694] hover:bg-blue-800')}`}
                >
                  {offer.isSoldOut ? 'Sold Out' : (selectedMatch ? 'Secure Seats' : 'Select Experience')}
                </button>
                
                {/* Small Contextual Links for Sold Out items */}
                {offer.isSoldOut && persona === Persona.DIE_HARD && (
                  <div className="mt-4 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-500">
                    <button 
                      onClick={onFilterHospitality}
                      className="text-[10px] font-black uppercase tracking-widest text-[#001489] hover:underline flex items-center gap-2 group"
                    >
                      <i className="fa-solid fa-calendar-days text-[9px] text-blue-400 group-hover:text-blue-600"></i>
                      Browse for individual match
                    </button>
                    <button 
                      className="text-[10px] font-black uppercase tracking-widest text-[#001489] hover:underline flex items-center gap-2 group"
                    >
                      <i className="fa-solid fa-circle-info text-[9px] text-slate-400 group-hover:text-blue-600"></i>
                      FAQ | First to know 26/27 season
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
