import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Coins, 
  Flame, 
  Gift, 
  FileText, 
  BookMarked, 
  Crown, 
  Sparkles,
  Lock,
  Play
} from 'lucide-react';

export const CoinStorePage: React.FC = () => {
  const { 
    goBack, 
    user, 
    tests, 
    unlockTestWithCoins, 
    navigateTo, 
    buyPremiumWithCoins,
    theme 
  } = useApp();

  const isDark = theme === 'dark';
  const lockedTests = tests.filter(t => t.isPremium && !t.isUnlocked && !user.isPremium);

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

      {/* Wallet Balance Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border text-center ${
        isDark 
          ? 'bg-gradient-to-b from-[#161c2c] to-[#0e1320] border-amber-500/30' 
          : 'bg-gradient-to-b from-amber-50 to-white border-amber-200 shadow-md'
      }`}>
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto mb-3 shadow-md">
          <Coins className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono">
          Orvo Coins (oc) Wallet
        </span>
        <div className="mt-1 flex items-baseline justify-center gap-1.5">
          <span className="text-4xl sm:text-5xl font-black font-mono tabular-nums">{user.ocCoins}</span>
          <span className="text-sm sm:text-base font-bold text-amber-500">oc</span>
        </div>
        <p className={`text-xs mt-1 max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Earn oc through daily practice & referrals. Use coins to buy Premium or unlock tests!
        </p>
      </div>

      {/* Buy Premium Pass with OC Coins */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-[#111726] border-amber-500/30' : 'bg-white border-amber-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-sm sm:text-base">Buy Premium Pass with OC Coins</h3>
          </div>
          <span className="text-xs font-mono text-amber-500 font-bold">Zero Cash Needed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className="font-bold text-sm block">1 Month Pass</span>
              <span className="text-xs text-amber-500 font-mono font-bold">1,000 oc coins</span>
            </div>
            <button
              onClick={() => buyPremiumWithCoins('Monthly')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Buy with 1000 oc
            </button>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className="font-bold text-sm block">1 Year Pass</span>
              <span className="text-xs text-amber-500 font-mono font-bold">5,000 oc coins</span>
            </div>
            <button
              onClick={() => buyPremiumWithCoins('Yearly')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Buy with 5000 oc
            </button>
          </div>
        </div>
      </div>

      {/* How to Earn More OC Coins */}
      <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Ways to Earn More OC Coins
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <Gift className="w-5 h-5 text-emerald-500 mb-2" />
            <strong className="text-sm block">+50 oc</strong>
            <span className="text-[11px] text-slate-400">Per referral friend</span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <Flame className="w-5 h-5 text-amber-500 mb-2" />
            <strong className="text-sm block">+10 oc</strong>
            <span className="text-[11px] text-slate-400">Daily practice streak</span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <FileText className="w-5 h-5 text-indigo-500 mb-2" />
            <strong className="text-sm block">+15 oc</strong>
            <span className="text-[11px] text-slate-400">Finish any CBT mock</span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <BookMarked className="w-5 h-5 text-rose-500 mb-2" />
            <strong className="text-sm block">+5 oc</strong>
            <span className="text-[11px] text-slate-400">Master mistake question</span>
          </div>
        </div>
      </div>

      {/* Unlock Tests with Coins */}
      <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Individual Test Unlocks with OC Coins
        </h3>

        {lockedTests.length === 0 ? (
          <p className="text-xs text-emerald-500 font-semibold p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            ✓ All mock tests are currently unlocked on your account!
          </p>
        ) : (
          <div className="space-y-3">
            {lockedTests.map((t) => (
              <div 
                key={t.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className="text-[11px] text-indigo-500 font-bold block">{t.examType}</span>
                  <h4 className="font-bold text-xs sm:text-sm">{t.title}</h4>
                </div>

                <button
                  onClick={() => unlockTestWithCoins(t.id)}
                  className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 border border-amber-500/40 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Unlock ({t.ocCost} oc)</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
