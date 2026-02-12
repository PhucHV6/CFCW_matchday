
import React, { useState, useEffect } from 'react';
import { AppStage, Persona, TicketOffer, AddOn, Match } from './types';
import Onboarding from './views/Onboarding';
import MatchSelection from './views/MatchSelection';
import Offers from './views/Offers';
import SeatSelection from './views/SeatSelection';
import Essentials from './views/Essentials';
import Checkout from './views/Checkout';
import AccountCreation from './views/AccountCreation';
import InGame from './views/InGame';
import PostMatch from './views/PostMatch';
import Tickets from './views/Tickets';
import { OFFERS_BY_PERSONA } from './constants';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.ONBOARDING);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [viewAll, setViewAll] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<TicketOffer | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [isUpgraded, setIsUpgraded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  const goHome = () => {
    setPersona(null);
    setSelectedMatch(null);
    setSelectedOffer(null);
    setViewAll(false);
    setStage(AppStage.ONBOARDING);
  };
  
  const goTickets = () => setStage(AppStage.MY_TICKETS);

  const renderContent = () => {
    switch (stage) {
      case AppStage.ONBOARDING:
        return <Onboarding onSelect={(p) => { 
          setPersona(p); 
          setViewAll(false);
          if (p === Persona.BIG_GAMES) {
            setStage(AppStage.MATCH_SELECTION);
          } else {
            setStage(AppStage.OFFERS); 
          }
        }} />;
      
      case AppStage.MATCH_SELECTION:
        return (
          <MatchSelection 
            persona={persona}
            onSelect={(m, type) => {
              setSelectedMatch(m);
              // FLOW: Match-First paths
              if (type === 'TICKET_ONLY') {
                const gaOffer = OFFERS_BY_PERSONA[Persona.BIG_GAMES].find(o => o.id === 'bg-ticket');
                setSelectedOffer(gaOffer || null);
                setStage(AppStage.SEAT_MAP);
              } else if (type === 'EXPERIENCE') {
                setStage(AppStage.OFFERS);
              } else {
                // Flow: Experience-First (Already had an offer selected)
                setStage(AppStage.SEAT_MAP);
              }
            }}
            onBack={() => {
              if (selectedOffer) setStage(AppStage.OFFERS);
              else setStage(AppStage.ONBOARDING);
            }}
          />
        );

      case AppStage.OFFERS:
        return (
          <Offers 
            persona={viewAll ? 'ALL' : persona!} 
            selectedMatch={selectedMatch}
            onSelect={(o) => { 
              setSelectedOffer(o); 
              if (selectedMatch) {
                // If match already selected (Match-First), go to seat map
                setStage(AppStage.SEAT_MAP);
              } else {
                // If match not selected (Experience-First), go to match selection
                setStage(AppStage.MATCH_SELECTION);
              }
            }}
            onBack={() => {
              if (selectedMatch) setStage(AppStage.MATCH_SELECTION);
              else goHome();
            }}
            onFilterHospitality={() => {
              setPersona(Persona.BIG_GAMES);
              setStage(AppStage.MATCH_SELECTION);
            }}
            onBrowseAll={() => {
              setViewAll(true);
              setSelectedMatch(null);
              setSelectedOffer(null);
            }}
          />
        );

      case AppStage.SEAT_MAP:
        return (
          <SeatSelection 
            onNext={(upgraded) => { setIsUpgraded(upgraded); setStage(AppStage.ESSENTIALS); }}
            onBack={() => setStage(AppStage.OFFERS)}
          />
        );
      case AppStage.ESSENTIALS:
        return (
          <Essentials 
            onNext={(addons) => { setSelectedAddOns(addons); setStage(AppStage.CHECKOUT); }}
            onBack={() => setStage(AppStage.SEAT_MAP)}
          />
        );
      case AppStage.CHECKOUT:
        return (
          <Checkout 
            offer={selectedOffer!} 
            addOns={selectedAddOns} 
            isUpgraded={isUpgraded}
            count={persona === Persona.FRIENDS_OUTING ? 4 : 1}
            onSuccess={() => setStage(AppStage.ACCOUNT_CREATION)}
          />
        );
      case AppStage.ACCOUNT_CREATION:
        return <AccountCreation onComplete={() => setStage(AppStage.MY_TICKETS)} />;
      case AppStage.MY_TICKETS:
        return <Tickets onSelectMatch={() => setStage(AppStage.IN_GAME)} />;
      case AppStage.IN_GAME:
        return <InGame onMatchEnd={() => setStage(AppStage.POST_MATCH)} />;
      case AppStage.POST_MATCH:
        return <PostMatch />;
      default:
        return <Onboarding onSelect={setPersona} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#001489] selection:bg-blue-100">
      <header className={`sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between backdrop-blur-md border-b transition-all duration-300 ${stage === AppStage.IN_GAME ? 'bg-blue-900 border-blue-800 text-white' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={goHome}
            className="w-10 h-10 bg-[#034694] rounded-full flex items-center justify-center p-1.5 shadow-sm active:scale-90 transition-transform"
          >
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png" alt="CFC" className="w-full h-full object-contain" />
          </button>
          <div className="cursor-pointer" onClick={goHome}>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] leading-none ${stage === AppStage.IN_GAME ? 'text-blue-300' : 'text-slate-400'}`}>CFC Women</p>
            <h1 className={`font-extrabold text-lg leading-tight tracking-tight ${stage === AppStage.IN_GAME ? 'text-white' : 'text-[#001489]'}`}>Matchday Central</h1>
          </div>
        </div>
        
        {stage !== AppStage.ONBOARDING && stage !== AppStage.POST_MATCH && stage !== AppStage.IN_GAME && stage !== AppStage.MY_TICKETS && (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => {
              const stagesOrder = [AppStage.ONBOARDING, AppStage.MATCH_SELECTION, AppStage.OFFERS, AppStage.SEAT_MAP, AppStage.ESSENTIALS];
              const currentStepIndex = stagesOrder.indexOf(stage);
              return (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= currentStepIndex ? 'w-4 bg-blue-600' : 'w-2 bg-slate-200'}`}></div>
              );
            })}
          </div>
        )}
      </header>

      <main className="max-w-2xl mx-auto pb-24">
        {renderContent()}
      </main>

      {(stage === AppStage.IN_GAME || stage === AppStage.MY_TICKETS || stage === AppStage.POST_MATCH) && (
        <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200 py-3 px-8 flex justify-between items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
           <button onClick={goHome} className={`flex flex-col items-center gap-1 ${stage !== AppStage.MY_TICKETS ? 'text-blue-600' : 'text-slate-400'}`}>
             <i className="fa-solid fa-house-chimney text-lg"></i>
             <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
           </button>
           <button onClick={goTickets} className={`flex flex-col items-center gap-1 ${stage === AppStage.MY_TICKETS ? 'text-blue-600' : 'text-slate-400'}`}>
             <i className="fa-solid fa-ticket-simple text-lg"></i>
             <span className="text-[10px] font-bold uppercase tracking-wider">Tickets</span>
           </button>
           <button className="flex flex-col items-center gap-1 text-slate-400">
             <i className="fa-solid fa-burger text-lg"></i>
             <span className="text-[10px] font-bold uppercase tracking-wider">Orders</span>
           </button>
           <button className="flex flex-col items-center gap-1 text-slate-400">
             <i className="fa-solid fa-ellipsis text-lg"></i>
             <span className="text-[10px] font-bold uppercase tracking-wider">More</span>
           </button>
        </nav>
      )}
    </div>
  );
};

export default App;
