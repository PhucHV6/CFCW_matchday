
import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
}

const AccountCreation: React.FC<Props> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(onComplete, 1200);
  };

  return (
    <div className="px-6 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center text-3xl mb-6">
           <i className="fa-solid fa-check-double"></i>
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Payment Confirmed!</h2>
        <p className="text-slate-500">Your tickets are reserved. Now, let's create your Fan ID to access them on matchday.</p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Chelsea Fan ID</label>
             <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-600 transition-colors" />
          </div>
          <div className="space-y-1">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
             <input type="email" placeholder="blue@chelseafc.com" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-600 transition-colors" />
          </div>
          <div className="space-y-1">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
             <input type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-600 transition-colors" />
          </div>
        </div>

        <button 
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-[#034694] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-xl shadow-blue-50"
        >
          {loading ? 'Creating Fan ID...' : 'Join the Pride & Get Tickets'}
        </button>

        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Or SSO</span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <button onClick={handleRegister} className="w-full py-4 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AccountCreation;
