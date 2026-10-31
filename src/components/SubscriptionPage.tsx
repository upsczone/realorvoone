import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Crown, 
  Check, 
  Sparkles, 
  Coins, 
  ShieldCheck, 
  Gift, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SubscriptionPage: React.FC = () => {
  const { 
    goBack, 
    activateSubscription, 
    buyPremiumWithCoins, 
    user, 
    navigateTo, 
    theme 
  } = useApp();

  const isDark = theme === 'dark';
  const [selectedPlan, setSelectedPlan] = useState<'Monthly' | 'Yearly'>('Yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayMoney = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      activateSubscription(selectedPlan);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }, 500);
  };

  const handlePayCoins = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const success = buyPremiumWithCoins(selectedPlan);
      if (success) {
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }, 500);
  };

  const coinCost = selectedPlan === 'Monthly' ? 1000 : 5000;

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* Back button */}
      <button
        onClick={goBack}
        className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-[#141b2c] to-[#0d121f] border-amber-500/30' 
          : 'bg-gradient-to-b from-amber-50/60 to-white border-amber-200 shadow-md'
      }`}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 text-xs font-bold mb-3 font-mono">
          <Crown className="w-4 h-4" />
          <span>ORVO ONE PASS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          Supercharge Your Exam Preparation
        </h1>
        <p className={`text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Unlimited CBT mocks for all SSC & Railway exams, full step-by-step solutions, and AI mistake diagnostics.
        </p>

        {user.isPremium && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Pass Currently Active: {user.subscriptionPlan} Plan</span>
          </div>
        )}
      </div>

      {/* Plan Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Monthly Plan */}
        <div
          onClick={() => setSelectedPlan('Monthly')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all ${
            selectedPlan === 'Monthly'
              ? 'bg-indigo-600/10 border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg'
              : isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-base">Monthly Sprint</span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-500 font-bold">
              30 Days
            </span>
          </div>
          
          <div className="flex items-baseline gap-1 my-3">
            <span className="text-3xl sm:text-4xl font-black font-mono">₹99</span>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/ month</span>
          </div>

          <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Ideal for 30-day revision before your upcoming SSC or Railway exam shift.
          </p>

          <div className={`pt-3 border-t text-xs font-mono ${isDark ? 'border-slate-800 text-amber-400' : 'border-slate-200 text-amber-600'}`}>
            🪙 Or buy for <strong>1,000 oc coins</strong>
          </div>
        </div>

        {/* Yearly Plan - Best Value */}
        <div
          onClick={() => setSelectedPlan('Yearly')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all relative ${
            selectedPlan === 'Yearly'
              ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
              : isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <span className="absolute -top-3 right-6 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-md">
            Save 58% · Best Value
          </span>

          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-base text-amber-500">Yearly All Access</span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-500 font-bold">
              365 Days
            </span>
          </div>
          
          <div className="flex items-baseline gap-1 my-3">
            <span className="text-3xl sm:text-4xl font-black font-mono">₹499</span>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/ year (₹41/mo)</span>
          </div>

          <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Covers complete SSC CGL, CHSL, MTS & RRB NTPC, Group D annual exam cycles.
          </p>

          <div className={`pt-3 border-t text-xs font-mono ${isDark ? 'border-slate-800 text-amber-400' : 'border-slate-200 text-amber-600'}`}>
            🪙 Or buy for <strong>5,000 oc coins</strong>
          </div>
        </div>

      </div>

      {/* Feature Matrix */}
      <div className={`p-6 rounded-3xl border space-y-3 text-xs ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-3">
          All Features Included in Orvo One Pass:
        </h3>

        {[
          'Unlimited attempts on all tests (Free tier limited to 1 attempt per test)',
          'Full question step-by-step explanations unlocked on all analysis screens',
          'Deep topic diagnostics with Weak Area Booster drills',
          'Complete access to 10,000+ Previous Year Papers (PYQs) with shift timings',
          'Automated Mistake Book synchronization with offline revision mode'
        ].map((perk, i) => (
          <div key={i} className="flex items-center gap-3">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="leading-relaxed font-medium">{perk}</span>
          </div>
        ))}
      </div>

      {/* Payment Action Buttons: Cash OR Coins */}
      <div className="space-y-3">
        <button
          onClick={handlePayMoney}
          disabled={isProcessing}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {isProcessing ? 'Activating...' : `Activate ${selectedPlan} Plan (Pay ₹${selectedPlan === 'Monthly' ? '99' : '499'})`}
          </span>
        </button>

        {/* Buy with Coins Button as requested: "premium ko coins se bhi buy kr skta hai" */}
        <button
          onClick={handlePayCoins}
          disabled={isProcessing}
          className={`w-full py-3.5 px-6 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isDark 
              ? 'bg-slate-900 border-amber-500/40 text-amber-400 hover:bg-amber-500/10' 
              : 'bg-white border-amber-300 text-amber-600 hover:bg-amber-50'
          }`}
        >
          <Coins className="w-4 h-4 text-amber-500" />
          <span>
            Buy {selectedPlan} Pass with {coinCost} oc Coins (Balance: {user.ocCoins} oc)
          </span>
        </button>
      </div>

      {/* Refer Free Alternative Link */}
      <div className="text-center pt-2">
        <button
          onClick={() => navigateTo('refer_earn')}
          className="text-xs text-emerald-500 hover:underline font-semibold inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Gift className="w-4 h-4" />
          <span>Want 7 days free premium? Refer 3 friends to get it free &rarr;</span>
        </button>
      </div>

    </div>
  );
};
