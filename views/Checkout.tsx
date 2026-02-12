
import React, { useState } from 'react';
import { TicketOffer, AddOn } from '../types';

interface Props {
  offer: TicketOffer;
  addOns: AddOn[];
  isUpgraded: boolean;
  count: number;
  onSuccess: () => void;
}

const Checkout: React.FC<Props> = ({ offer, addOns, isUpgraded, count, onSuccess }) => {
  const [splitPayment, setSplitPayment] = useState(false);
  const [processing, setProcessing] = useState(false);

  const ticketPrice = offer.price + (isUpgraded ? 20 : 0);
  const addOnsTotal = addOns.reduce((sum, a) => sum + a.price, 0) * count;
  const total = (ticketPrice * count) + addOnsTotal;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(onSuccess, 1800);
  };

  if (processing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-pulse">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-blue-200">
           <i className="fa-solid fa-lock text-white text-3xl"></i>
        </div>
        <h2 className="text-2xl font-black mb-2">Verifying Payment</h2>
        <p className="text-sm text-slate-500">Connecting to Chelsea FC secure payment hub...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 animate-in slide-in-from-right duration-500">
      <h2 className="text-3xl font-black text-slate-900 mb-8">Summary</h2>

      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tighter leading-none mb-1">{offer.title}</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{count} {isUpgraded ? 'Westview Premium' : 'General Admission'} Tickets</p>
          </div>
          <p className="font-black text-xl">£{ticketPrice * count}</p>
        </div>

        {addOns.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-slate-50">
            {addOns.map(addon => (
              <div key={addon.id} className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">{addon.name} × {count}</span>
                <span className="font-black">£{addon.price * count}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-100 flex justify-between items-end">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Total Due</span>
          <span className="text-4xl font-black text-blue-900 tracking-tighter">£{total}</span>
        </div>
      </div>

      {/* Social Cart / Split Payment Section */}
      <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-lg">
                <i className="fa-solid fa-people-arrows"></i>
             </div>
             <div>
                <h4 className="font-black text-emerald-900 leading-none">Split with Friends?</h4>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1">Social Cart Feature</p>
             </div>
          </div>
          <button 
            onClick={() => setSplitPayment(!splitPayment)}
            className={`w-14 h-7 rounded-full relative transition-colors ${splitPayment ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-sm ${splitPayment ? 'left-8' : 'left-1'}`}></div>
          </button>
        </div>
        
        {splitPayment && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-xs text-emerald-700 leading-relaxed mb-4 italic">We'll reserve these seats for 15 minutes. Share the payment link with your squad. When they pay their share, tickets will be released to everyone's wallets.</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50 transition-colors">
                <i className="fa-brands fa-whatsapp"></i> WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50 transition-colors">
                <i className="fa-solid fa-copy"></i> Copy Link
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button 
          onClick={handlePay}
          className="w-full bg-black text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
        >
          <i className="fa-brands fa-apple text-2xl"></i> Pay with Apple Pay
        </button>
        <button 
          onClick={handlePay}
          className="w-full bg-white border border-slate-200 text-slate-900 font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
        >
          Credit / Debit Card
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-400 mt-10 px-10 leading-relaxed uppercase tracking-widest font-medium">
        SSL Secure Payment Gateway. Powered by Triple Jump & Ticketmaster Presence.
      </p>
    </div>
  );
};

export default Checkout;
