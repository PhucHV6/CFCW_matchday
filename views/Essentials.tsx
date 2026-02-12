
import React, { useState } from 'react';
import { ADD_ONS } from '../constants';
import { AddOn } from '../types';

interface Props {
  onNext: (addons: AddOn[]) => void;
  onBack: () => void;
}

const Essentials: React.FC<Props> = ({ onNext, onBack }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectedList = ADD_ONS.filter(a => selectedIds.has(a.id));

  return (
    <div className="px-6 py-8 animate-in slide-in-from-right duration-500">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="text-2xl font-black text-slate-900">Matchday Essentials</h2>
      </div>

      <p className="text-sm text-slate-500 mb-8 leading-relaxed italic">
        "Pre-ordering F&B via our <span className="text-blue-600 font-bold">Triple Jump integration</span> saves you up to 20% vs matchday prices and lets you skip the queues."
      </p>

      <div className="space-y-4 mb-10">
        {ADD_ONS.map((addon) => (
          <button 
            key={addon.id}
            onClick={() => toggle(addon.id)}
            className={`w-full flex items-center gap-5 p-5 bg-white border-2 rounded-3xl transition-all duration-300 ${selectedIds.has(addon.id) ? 'border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${selectedIds.has(addon.id) ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
              <i className={`fa-solid ${addon.icon}`}></i>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-slate-900">{addon.name}</h3>
              <p className="text-xs text-slate-500">{addon.description}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                {addon.originalPrice && (
                  <span className="text-xs text-slate-400 line-through font-bold">£{addon.originalPrice}</span>
                )}
                <span className="font-black text-blue-900 text-lg leading-none">£{addon.price}</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] ${selectedIds.has(addon.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-transparent'}`}>
                <i className="fa-solid fa-check"></i>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-slate-200 p-6 md:relative md:bg-transparent md:border-none md:p-0">
        <button 
          onClick={() => onNext(selectedList)}
          className="w-full bg-[#034694] text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-100 active:scale-95 transition-all"
        >
          Review My Order ({selectedIds.size} extras)
        </button>
      </div>
    </div>
  );
};

export default Essentials;
