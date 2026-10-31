import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Coins, 
  Menu, 
  Sparkles, 
  ChevronDown, 
  Languages 
} from 'lucide-react';
import { ExamType } from '../types';

export const Header: React.FC = () => {
  const { 
    user, 
    setIsMenuOpen, 
    claimDailyStreak, 
    hasClaimedToday,
    setTargetExam,
    navigateTo,
    appLang,
    setAppLang,
    theme
  } = useApp();

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b backdrop-blur-md ${
      isDark 
        ? 'bg-[#090d16]/95 border-slate-800 text-slate-100' 
        : 'bg-white/95 border-amber-200/80 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 cursor-pointer select-none"
        >
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-extrabold flex items-center justify-center text-xs sm:text-sm shadow-md shadow-indigo-500/20 tracking-tighter shrink-0">
            01
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-base tracking-tight flex items-center gap-1 leading-tight">
              Orvo One
              {user.isPremium && (
                <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-wider px-1 py-0.2 rounded-sm bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  PRO
                </span>
              )}
            </span>
            <span className={`text-[9px] sm:text-[10px] hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              SSC & Railway
            </span>
          </div>
        </div>

        {/* Zone 2: Exam Switcher, Language Switcher, Streak & Coins */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5">
          
          {/* Target Exam Quick Dropdown */}
          <div className="relative">
            <select
              value={user.targetExam}
              onChange={(e) => setTargetExam(e.target.value as ExamType)}
              className={`appearance-none text-[10px] xs:text-[11px] sm:text-xs font-semibold py-1 sm:py-1.5 pl-1.5 sm:pl-2.5 pr-4 sm:pr-6 rounded-lg border cursor-pointer transition-colors max-w-[76px] xs:max-w-[92px] sm:max-w-none truncate ${
                isDark 
                  ? 'bg-slate-900 text-slate-200 border-slate-750 focus:border-indigo-500' 
                  : 'bg-slate-100 text-slate-800 border-slate-200 focus:border-indigo-600'
              }`}
            >
              <optgroup label="SSC Exams">
                <option value="SSC CGL">SSC CGL</option>
                <option value="SSC CHSL">SSC CHSL</option>
                <option value="SSC MTS">SSC MTS</option>
                <option value="SSC GD">SSC GD</option>
                <option value="SSC CPO">SSC CPO</option>
              </optgroup>
              <optgroup label="Railway Exams">
                <option value="RRB NTPC">RRB NTPC</option>
                <option value="RRB Group D">RRB Group D</option>
                <option value="RRB ALP">RRB ALP</option>
                <option value="RRB JE">RRB JE</option>
              </optgroup>
            </select>
            <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 absolute right-1 sm:right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Smooth Translation Switcher Button (Compact on mobile, full on desktop) */}
          <button
            onClick={() => setAppLang(appLang === 'en' ? 'hi' : 'en')}
            className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg border text-[10px] xs:text-[11px] sm:text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0 ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-850 text-slate-200 border-slate-750' 
                : 'bg-white hover:bg-amber-50 text-slate-900 border-amber-300 shadow-xs'
            }`}
            title="Toggle Language: English / हिन्दी"
          >
            <Languages className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-indigo-500 shrink-0" />
            
            {/* Mobile View: Clean Active Pill */}
            <span className="sm:hidden font-extrabold uppercase">
              {appLang === 'en' ? 'EN' : 'हि'}
            </span>

            {/* Desktop View: Dual EN / HI Switcher */}
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className={`px-1 py-0.2 rounded font-extrabold transition-colors ${
                appLang === 'en' 
                  ? 'bg-indigo-600 text-white' 
                  : isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                EN
              </span>
              <span className="text-slate-400 text-[10px]">·</span>
              <span className={`px-1 py-0.2 rounded font-extrabold transition-colors ${
                appLang === 'hi' 
                  ? 'bg-indigo-600 text-white' 
                  : isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                हिन्दी
              </span>
            </span>
          </button>

          {/* Daily Streak Counter (Desktop & Tablet) */}
          <button
            onClick={claimDailyStreak}
            title={hasClaimedToday ? 'Streak active today!' : 'Claim daily streak bonus!'}
            className={`hidden sm:flex items-center gap-1 px-2 py-1 sm:py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              hasClaimedToday 
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' 
                : isDark 
                  ? 'bg-slate-900 text-slate-300 border-slate-750 hover:border-amber-500/40' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-amber-500/40'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${hasClaimedToday ? 'text-amber-500 fill-amber-500' : 'text-amber-500'}`} />
            <span className="font-mono tabular-nums">{user.streakDays}d</span>
          </button>

          {/* OC Coins Button */}
          <button
            onClick={() => navigateTo('coin_store')}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[10px] xs:text-[11px] sm:text-xs font-semibold transition-all cursor-pointer shrink-0"
            title="Your Orvo Coins (oc). Click to open coin store."
          >
            <Coins className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-500 shrink-0" />
            <span className="font-mono tabular-nums font-bold">{user.ocCoins}</span>
            <span className="text-[10px] opacity-80 hidden md:inline">oc</span>
          </button>
        </div>

        {/* Zone 3: Menu Drawer & Pro Pill */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">

          {/* Premium Pass Pill (Desktop) */}
          {!user.isPremium ? (
            <button
              onClick={() => navigateTo('subscription')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>₹99 / mo</span>
            </button>
          ) : (
            <span className="hidden lg:inline-flex text-xs text-emerald-500 font-semibold px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
              PRO Pass
            </span>
          )}

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`p-1.5 sm:p-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs font-semibold hidden md:inline">Menu</span>
          </button>
        </div>

      </div>
    </header>
  );
};
