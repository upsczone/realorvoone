import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Crown, 
  BookMarked, 
  BookmarkCheck, 
  Gift, 
  Coins, 
  FileText, 
  Smartphone, 
  LogOut, 
  LogIn, 
  Settings,
  ChevronRight,
  Sun,
  Moon,
  CheckCircle2,
  GraduationCap,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ExamType } from '../types';

export const MenuDrawer: React.FC = () => {
  const { 
    isMenuOpen, 
    setIsMenuOpen, 
    user, 
    isAuthenticated,
    userPhone,
    logout,
    loginWithGoogle,
    navigateTo,
    mistakeItems,
    savedQuestions,
    setTargetExam,
    openOnboardingGuide,
    theme,
    toggleTheme
  } = useApp();

  const isDark = theme === 'dark';
  const unresolvedMistakesCount = mistakeItems.filter(m => !m.isMastered).length;

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
          {/* Backdrop dismiss */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setIsMenuOpen(false)}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className={`relative w-full max-w-sm sm:max-w-md h-full border-l flex flex-col shadow-2xl z-10 overflow-y-auto ${
              isDark ? 'bg-[#101624] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header */}
            <div className={`p-5 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                  01
                </div>
                <span className="font-extrabold text-base tracking-tight">Orvo One</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Brief */}
            <div className={`p-5 border-b ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-bold text-lg flex items-center justify-center ring-2 ring-indigo-500/30">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base truncate">{user.name}</h4>
                  <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user.email}</p>
                  
                  <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                    <span className="text-emerald-500 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{userPhone || '+91 9876543210'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Bar in Profile */}
              <div className={`grid grid-cols-2 gap-2 mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] text-slate-400 block">Practice Streak</span>
                  <span className="font-mono text-sm font-bold text-amber-500">🔥 {user.streakDays} Days</span>
                </div>
                <div 
                  onClick={() => navigateTo('coin_store')}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-colors ${
                    isDark ? 'bg-slate-800/50 border-slate-700/50 hover:border-amber-500/50' : 'bg-white border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 block">OC Balance</span>
                  <span className="font-mono text-sm font-bold text-amber-500">🪙 {user.ocCoins} oc</span>
                </div>
              </div>
            </div>

            {/* Menu Nav Links - Navigating to Full Pages (No popups) */}
            <div className="p-3 space-y-1.5 flex-1">
              
              {/* Subscription Details Page */}
              <button
                onClick={() => navigateTo('subscription')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 hover:border-amber-500/50 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-amber-500">Orvo One Pass</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded-sm">
                        From ₹99
                      </span>
                    </div>
                    <span className={`text-xs block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {user.isPremium ? (user.subscriptionValidUntil || 'Active') : 'Unlock unlimited tests & solutions'}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Mistake Book Page */}
              <button
                onClick={() => navigateTo('mistake_book')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors text-left group cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Mistake Book</span>
                    <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Re-attempt questions you got wrong</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {unresolvedMistakesCount > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/30">
                      {unresolvedMistakesCount}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Saved Questions Page */}
              <button
                onClick={() => navigateTo('saved_questions')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors text-left group cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                    <BookmarkCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Saved Questions</span>
                    <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Personal revision collection</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">{savedQuestions.length}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Refer Program Page */}
              <button
                onClick={() => navigateTo('refer_earn')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors text-left group cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Refer & Earn</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-500/20 text-emerald-600 rounded-sm">
                        +50 oc
                      </span>
                    </div>
                    <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Refer 3 friends → 7 days free pass</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* OC Coins & Store Page */}
              <button
                onClick={() => navigateTo('coin_store')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors text-left group cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm">OC Coins Store</span>
                    <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Buy tests or premium with oc coins</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Read Notes Page */}
              <button
                onClick={() => navigateTo('notes')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors text-left group cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Read Notes</span>
                    <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Formulas, Polity & Science capsules</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Video Courses Page */}
              <button
                onClick={() => navigateTo('courses')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors text-left group cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Video Courses</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-500/20 text-amber-500 rounded-sm">
                        Chapters
                      </span>
                    </div>
                    <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Full syllabus, lectures & formulas</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* App Setup Guide */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openOnboardingGuide();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors text-left group cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm">App Setup Guide</span>
                    <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Learn how to use CBT & 01 Practice</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Settings Page (Theme Switcher, Profile) */}
              <button
                onClick={() => navigateTo('settings')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors text-left group cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-500/10 text-slate-400">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Settings</span>
                    <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Theme switcher, profile & phone</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            {/* Footer with Google Auth and Logout */}
            <div className={`p-4 border-t ${isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50'}`}>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-rose-500 hover:bg-rose-500/10 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out ({user.name})</span>
                </button>
              ) : (
                <button
                  onClick={loginWithGoogle}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Continue with Google</span>
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
