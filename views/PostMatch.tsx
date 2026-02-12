
import React, { useState } from 'react';

const PostMatch: React.FC = () => {
  const [feedback, setFeedback] = useState(0);
  const [voted, setVoted] = useState(false);

  return (
    <div className="px-6 py-12 animate-in slide-in-from-right duration-500">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-blue-600 text-white rounded-full mx-auto flex items-center justify-center text-5xl mb-8 shadow-2xl shadow-blue-200">
           <i className="fa-solid fa-flag-checkered"></i>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2 italic uppercase">London is Still Blue.</h2>
        <p className="text-slate-500 text-sm">Full Time: CFCW 3 - 1 ARS. Hope you enjoyed the Pride!</p>
      </div>

      {/* MOTM Vote */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm mb-8">
        <h3 className="font-black text-xl mb-6 text-slate-900 uppercase tracking-tighter">Vote Woman of the Match</h3>
        {!voted ? (
          <div className="grid grid-cols-3 gap-3">
             {['James', 'Kerr', 'Cuthbert'].map((name, i) => (
               <button 
                 key={name}
                 onClick={() => setVoted(true)}
                 className="flex flex-col items-center gap-2 group"
               >
                  <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 border border-slate-100 overflow-hidden group-hover:border-blue-600 transition-all group-hover:scale-105">
                     <img src={`https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=150&sig=${i}`} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-600">{name}</span>
               </button>
             ))}
          </div>
        ) : (
          <div className="text-center py-4 text-emerald-600 font-bold flex items-center justify-center gap-2 animate-in zoom-in duration-300">
             <i className="fa-solid fa-circle-check"></i> Thank you for voting!
          </div>
        )}
      </div>

      {/* Quick Survey */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm mb-12">
        <h3 className="font-black text-xl mb-2 text-slate-900 uppercase tracking-tighter">Rate the Atmosphere</h3>
        <p className="text-xs text-slate-400 mb-6">Your feedback helps us improve the matchday experience.</p>
        <div className="flex justify-between">
           {[1, 2, 3, 4, 5].map(star => (
             <button 
               key={star}
               onClick={() => setFeedback(star)}
               className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${feedback >= star ? 'bg-amber-400 text-white' : 'bg-slate-50 text-slate-200'}`}
             >
               <i className="fa-solid fa-star"></i>
             </button>
           ))}
        </div>
      </div>

      {/* Personalized Next Offer */}
      <div className="bg-[#034694] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></div>
         <div className="relative z-10">
            <h4 className="text-3xl font-black italic uppercase leading-none mb-3">Same Time Next Week?</h4>
            <p className="text-blue-100 text-sm mb-8 leading-relaxed">Since you loved <span className="text-white font-bold underline decoration-[#DBA111]">Westview Hospitality</span>, we've unlocked a 15% discount for the next home clash vs Manchester City.</p>
            
            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 flex justify-between items-center mb-6">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Next Match</p>
                 <p className="font-bold">CFCW vs Man City</p>
               </div>
               <div className="text-right flex flex-col items-end">
                 <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Member Price</p>
                 <div className="flex items-center gap-2">
                   <span className="text-sm text-blue-300 line-through font-bold">£45.00</span>
                   <p className="text-2xl font-black italic tracking-tighter">£38.25</p>
                 </div>
               </div>
            </div>

            <button className="w-full bg-[#DBA111] text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-blue-900/50 hover:bg-[#c48f0e] active:scale-95 transition-all">
              Claim Loyalty Discount
            </button>
         </div>
      </div>

      <div className="mt-12 text-center pb-8">
        <button className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-blue-600 transition-colors">Return to Fan Dashboard</button>
      </div>
    </div>
  );
};

export default PostMatch;
