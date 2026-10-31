import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Gift, 
  Copy, 
  Check, 
  Coins, 
  Users, 
  Share2, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReferPage: React.FC = () => {
  const { goBack, user, simulateReferral, showToast, theme } = useApp();
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);
  const [friendName, setFriendName] = useState('');

  const handleCopy = () => {
    navigator.clipboard?.writeText(user.referralCode);
    setCopied(true);
    showToast('Referral code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = friendName.trim() || `Candidate ${Math.floor(Math.random() * 900 + 100)}`;
    simulateReferral(name);
    setFriendName('');
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const referralCount = user.referrals.length;
  const progressPercent = Math.min(100, Math.round((referralCount / 3) * 100));

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
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#111726] border-emerald-500/30' 
          : 'bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-emerald-200 shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-bold font-mono">
              <Gift className="w-4 h-4" />
              <span>REFER & EARN</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Refer 3 Friends → Get 7 Days Free Premium
            </h1>
            <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Earn <strong className="text-amber-500 font-mono">+50 oc coins</strong> for every single friend who signs up with your referral code.
            </p>
          </div>

          <div className={`p-4 rounded-2xl border text-center font-mono ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <span className="text-[10px] text-slate-400 block">Total Referrals</span>
            <strong className="text-2xl font-black text-emerald-500">{referralCount}</strong>
          </div>
        </div>
      </div>

      {/* 3-Friend Milestone Tracker */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-400">Milestone Progress</span>
          <span className="font-mono text-emerald-500 font-bold">{referralCount} of 3 Friends</span>
        </div>

        {/* Bar */}
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
          <div className={`p-3 rounded-xl border ${referralCount >= 1 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500' : 'border-slate-800 text-slate-500'}`}>
            <strong className="block">Friend 1</strong>
            <span className="font-mono text-[11px]">+50 oc</span>
          </div>
          <div className={`p-3 rounded-xl border ${referralCount >= 2 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500' : 'border-slate-800 text-slate-500'}`}>
            <strong className="block">Friend 2</strong>
            <span className="font-mono text-[11px]">+50 oc</span>
          </div>
          <div className={`p-3 rounded-xl border ${referralCount >= 3 ? 'border-amber-500/40 bg-amber-500/10 text-amber-500 font-bold' : 'border-slate-800 text-slate-500'}`}>
            <strong className="block">Friend 3</strong>
            <span className="font-mono text-[11px]">7 Days PRO 🎉</span>
          </div>
        </div>
      </div>

      {/* Unique Referral Code Box */}
      <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Your Personal Referral Code
        </label>
        
        <div className="flex items-center gap-2">
          <div className={`flex-1 p-3.5 rounded-xl border font-mono text-lg font-bold text-emerald-500 tracking-wider text-center select-all ${
            isDark ? 'bg-slate-950 border-slate-750' : 'bg-slate-50 border-slate-300'
          }`}>
            {user.referralCode}
          </div>
          <button
            onClick={handleCopy}
            className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Live Referral Simulator for Instant Verification */}
      <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <h3 className="text-sm font-bold text-emerald-500 mb-1">
          Live Referral Simulator
        </h3>
        <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Simulate a friend joining right now to test the +50 oc reward and 7-day pass unlock live:
        </p>

        <form onSubmit={handleSimulate} className="flex gap-2">
          <input
            type="text"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            placeholder="Friend's name (e.g. Priyanshu Singh)"
            className={`flex-1 px-4 py-2.5 rounded-xl text-xs border focus:outline-hidden ${
              isDark ? 'bg-slate-950 border-slate-750 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
          >
            Simulate Referral (+50 oc)
          </button>
        </form>
      </div>

      {/* Referrals History List */}
      <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Your Referrals History ({user.referrals.length})
        </h3>
        
        <div className="space-y-2">
          {user.referrals.map((ref) => (
            <div 
              key={ref.id}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-xs flex items-center justify-center">
                  {ref.friendName.charAt(0)}
                </div>
                <span className="font-semibold">{ref.friendName}</span>
              </div>

              <div className="flex items-center gap-3 font-mono">
                <span className="text-slate-400 text-[11px]">{ref.date}</span>
                <span className="text-amber-500 font-bold">+{ref.coinsAwarded} oc</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
