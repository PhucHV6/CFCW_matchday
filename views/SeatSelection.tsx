
import React, { useState } from 'react';

interface Props {
  onNext: (upgraded: boolean) => void;
  onBack: () => void;
}

const SeatSelection: React.FC<Props> = ({ onNext, onBack }) => {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);

  const handleSelect = (block: string) => {
    setSelectedBlock(block);
  };

  const handleConfirm = () => {
    if (!selectedBlock) return;
    
    if (selectedBlock === 'westview') {
      onNext(true);
    } else {
      // Trigger upsell only when clicking confirm for non-westview
      setShowUpsell(true);
    }
  };

  return (
    <div className="px-6 py-8 animate-in slide-in-from-right duration-500">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="text-2xl font-black text-slate-900">Where will you sit?</h2>
      </div>

      {/* Interactive Map Visual */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm mb-8">
        <div className="relative aspect-square w-full max-w-sm mx-auto flex flex-col items-center justify-center bg-emerald-50 border-4 border-emerald-100 rounded-full overflow-hidden shadow-inner">
          {/* Pitch */}
          <div className="absolute inset-8 border-2 border-white/50 rounded-full flex items-center justify-center opacity-40 pointer-events-none">
             <div className="w-0.5 h-full bg-white"></div>
             <div className="absolute w-20 h-20 border-2 border-white rounded-full"></div>
          </div>

          <div className="z-10 w-full h-full flex flex-col justify-between p-4">
            <button 
              onClick={() => handleSelect('standard')}
              className={`h-16 w-32 mx-auto rounded-b-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${selectedBlock === 'standard' ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 scale-110' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
            >
              Matthew Harding
            </button>
            <div className="flex justify-between flex-1 items-center gap-12">
               <button 
                 onClick={() => handleSelect('westview')}
                 className={`w-16 h-40 rounded-r-2xl border-2 font-black text-[10px] uppercase tracking-widest [writing-mode:vertical-rl] transition-all ${selectedBlock === 'westview' ? 'bg-blue-900 border-blue-900 text-white shadow-xl shadow-blue-200 scale-110' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
               >
                 Westview Premium
               </button>
               <button 
                 onClick={() => handleSelect('east')}
                 className={`w-16 h-40 rounded-l-2xl border-2 font-black text-[10px] uppercase tracking-widest [writing-mode:vertical-rl] transition-all ${selectedBlock === 'east' ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 scale-110' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
               >
                 East Stand Family
               </button>
            </div>
            <button 
              onClick={() => handleSelect('shed')}
              className={`h-16 w-32 mx-auto rounded-t-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${selectedBlock === 'shed' ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 scale-110' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
            >
              The Shed End
            </button>
          </div>
        </div>

        {selectedBlock && (
          <div className="mt-8 p-6 bg-slate-50 rounded-3xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg text-slate-900 capitalize">{selectedBlock.replace('-',' ')} Section</h4>
              <span className="text-blue-600 font-black">£{selectedBlock === 'westview' ? '45.00' : '25.00'}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
               <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                 <i className="fa-solid fa-couch"></i> Padded Seats
               </span>
               {selectedBlock === 'westview' ? (
                 <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                   <i className="fa-solid fa-martini-glass"></i> Private Bar
                 </span>
               ) : (
                 <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                   <i className="fa-solid fa-burger"></i> Near F&B Hub
                 </span>
               )}
            </div>
            <p className="text-xs text-slate-500 italic">
               {selectedBlock === 'westview' ? "High-definition view from the central tier. Direct access to the premium 360-degree bar." : "Passionate atmosphere near the goal mouth. Great for groups and fan chants."}
            </p>
          </div>
        )}
      </div>

      <button 
        disabled={!selectedBlock}
        onClick={handleConfirm}
        className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all ${selectedBlock ? 'bg-blue-600 text-white shadow-blue-100 active:scale-[0.98]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
      >
        Confirm Seating
      </button>

      {/* Contextual Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowUpsell(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-300">
             <div className="h-32 bg-blue-900 relative">
               <img src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-30" alt="Westview" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="bg-[#DBA111] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Special Upgrade</span>
               </div>
             </div>
             <div className="p-8 text-center">
               <h3 className="text-2xl font-bold mb-2">Upgrade to Westview?</h3>
               <p className="text-sm text-slate-500 mb-6">Experience the game with <span className="font-bold text-slate-900">extra legroom</span> and access to the <span className="font-bold text-slate-900">exclusive lounge</span> for just <span className="text-blue-600 font-black">£20 more</span>.</p>
               <div className="flex flex-col gap-3">
                 <button 
                  onClick={() => { setSelectedBlock('westview'); setShowUpsell(false); }}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-[0.98]"
                 >
                   Yes, Upgrade Now
                 </button>
                 <button 
                  onClick={() => onNext(false)}
                  className="w-full text-slate-400 font-bold py-2 text-sm active:scale-[0.98]"
                 >
                   No, stay with {selectedBlock?.replace('-',' ')}
                 </button>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
