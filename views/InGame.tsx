
import React, { useState, useEffect } from 'react';

interface Props {
  onMatchEnd: () => void;
}

const InGame: React.FC<Props> = ({ onMatchEnd }) => {
  const [gameMinute, setGameMinute] = useState(64);
  const [stats, setStats] = useState({
    possession: 56,
    running: 8.4,
    pass: 82
  });
  const [notif, setNotif] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameMinute(m => Math.min(90, m + 1));
      setStats(s => ({
        ...s,
        possession: Math.min(62, Math.max(48, s.possession + (Math.random() - 0.5) * 4)),
        running: +(s.running + 0.1).toFixed(1)
      }));
    }, 10000);

    // Goal Trigger Simulation
    const goalTimeout = setTimeout(() => {
      setNotif("GOAL! ⚽ Lauren James strikes! 20% OFF drinks at the Westview Bar for 15 mins!");
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(goalTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-900 text-white selection:bg-blue-600">
      {/* Dynamic Push Notification Overlay */}
      {notif && (
        <div className="fixed top-20 left-6 right-6 z-[100] animate-in slide-in-from-top duration-500">
          <div className="bg-amber-400 text-slate-900 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border-2 border-amber-300">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-slate-900 text-amber-400 rounded-full flex items-center justify-center text-lg">
                 <i className="fa-solid fa-beer-mug-empty"></i>
               </div>
               <p className="text-xs font-black leading-tight uppercase tracking-tight">{notif}</p>
             </div>
             <button onClick={() => setNotif(null)} className="text-slate-900/50"><i className="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      )}

      <div className="px-6 pt-10 pb-20">
        {/* Live Scoreboard */}
        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <span className="flex items-center gap-1.5 text-[10px] font-black text-red-400 uppercase tracking-widest bg-red-400/10 px-2 py-1 rounded-full animate-pulse">
               <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Live
             </span>
          </div>
          
          <div className="flex justify-between items-center mb-6">
             <div className="flex flex-col items-center flex-1">
                <div className="w-16 h-16 bg-white p-2 rounded-full shadow-lg mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png" className="w-full h-full object-contain" alt="CFC" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Chelsea</span>
             </div>
             
             <div className="flex flex-col items-center">
                <div className="text-5xl font-black italic tracking-tighter">2 - 0</div>
                <div className="text-sm font-bold mt-1 text-white/50">{gameMinute}'</div>
             </div>

             <div className="flex flex-col items-center flex-1">
                <div className="w-16 h-16 bg-white p-2 rounded-full shadow-lg mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png" className="w-full h-full object-contain" alt="AFC" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Arsenal</span>
             </div>
          </div>
          <div className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40">WSL • Stamford Bridge</div>
        </div>

        {/* Live HUD Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-white/10 rounded-3xl p-5 border border-white/5 backdrop-blur-sm">
             <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Possession</span>
               <span className="text-lg font-black">{Math.round(stats.possession)}%</span>
             </div>
             <div className="h-1.5 bg-blue-900 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 transition-all duration-1000" style={{ width: `${stats.possession}%` }}></div>
             </div>
           </div>
           <div className="bg-white/10 rounded-3xl p-5 border border-white/5 backdrop-blur-sm">
             <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Pass Acc.</span>
               <span className="text-lg font-black">{stats.pass}%</span>
             </div>
             <div className="h-1.5 bg-blue-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 transition-all duration-1000" style={{ width: `${stats.pass}%` }}></div>
             </div>
           </div>
        </div>

        {/* Player Spotlight HUD */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 mb-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                  <i className="fa-solid fa-person-running"></i>
                </div>
                <div>
                   <h4 className="font-black text-xl italic uppercase leading-none mb-1">Star Tracker</h4>
                   <p className="text-xs font-bold text-blue-200">Lauren James • FW</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">Distance Covered</p>
                    <p className="text-4xl font-black italic tracking-tighter">{stats.running} <span className="text-lg">KM</span></p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">Top Speed</p>
                    <p className="text-2xl font-black italic tracking-tighter">32.4 <span className="text-xs">KM/H</span></p>
                 </div>
              </div>
           </div>
        </div>

        {/* F&B Collection Card */}
        <div className="bg-white rounded-[2.5rem] p-8 text-slate-900 shadow-2xl mb-8">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
                 <i className="fa-solid fa-qrcode"></i>
              </div>
              <div>
                 <h4 className="font-black text-lg leading-none mb-1">Ready for Collection</h4>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pre-ordered Extras</p>
              </div>
           </div>
           
           <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center">
              <div className="w-48 h-48 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-4 mb-4 shadow-sm">
                 <i className="fa-solid fa-qrcode text-9xl text-slate-200"></i>
              </div>
              <div className="text-center">
                 <p className="font-black text-slate-900">Burger & Beer Combo × 2</p>
                 <p className="text-xs text-slate-400 mt-1">Collection Point: <span className="text-blue-600 font-bold">Westview Bar • Kiosk 4</span></p>
              </div>
           </div>
        </div>

        <button 
          onClick={onMatchEnd}
          className="w-full py-4 text-blue-300/40 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white transition-colors"
        >
          [ Dev: Skip to Full Time ]
        </button>
      </div>
    </div>
  );
};

export default InGame;
