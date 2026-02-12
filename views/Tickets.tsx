
import React from 'react';

interface Props {
  onSelectMatch: () => void;
}

const Tickets: React.FC<Props> = ({ onSelectMatch }) => {
  return (
    <div className="px-6 py-8 animate-in slide-in-from-right duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 mb-2">My Tickets</h2>
        <p className="text-slate-500 text-sm">Your digital wallet for all CFCW fixtures.</p>
      </div>

      <div className="space-y-6">
        {/* Active/Live Ticket */}
        <div 
          onClick={onSelectMatch}
          className="group relative cursor-pointer bg-blue-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-200 overflow-hidden active:scale-95 transition-all"
        >
          <div className="absolute top-0 right-0 p-6">
            <span className="flex items-center gap-1.5 text-[10px] font-black text-red-400 uppercase tracking-widest bg-red-400/10 px-3 py-1.5 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Match Live
            </span>
          </div>

          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 mb-4">Stamford Bridge • Today</p>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1">
                <h3 className="text-2xl font-black italic uppercase leading-none mb-1">Chelsea vs Arsenal</h3>
                <p className="text-sm text-blue-100/60 font-medium">WSL Matchday 12</p>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-6 mt-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">Seating</p>
                <p className="font-bold">Westview • Block 5 • Row K</p>
              </div>
              <div className="bg-white text-blue-900 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest">
                Go to Match Centre
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 translate-x-16"></div>
        </div>

        {/* Upcoming Ticket */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden opacity-80">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Kingsmeadow • Sunday, Oct 24</p>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 text-slate-900">
              <h3 className="text-xl font-black italic uppercase leading-none mb-1">Chelsea vs Man City</h3>
              <p className="text-xs text-slate-500 font-medium">WSL Matchday 13</p>
            </div>
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
              <i className="fa-solid fa-lock"></i>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-slate-50 pt-6 mt-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
              <p className="font-bold text-slate-900">Tickets released in 4 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-emerald-50 rounded-3xl p-6 border border-emerald-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-white text-emerald-500 rounded-2xl flex items-center justify-center text-xl shadow-sm">
          <i className="fa-solid fa-mobile-screen-button"></i>
        </div>
        <div>
          <h4 className="font-bold text-emerald-900 text-sm">SafeTix™ Enabled</h4>
          <p className="text-xs text-emerald-600">Your tickets are dynamically encrypted for security.</p>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
