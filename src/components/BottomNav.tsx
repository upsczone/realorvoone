import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, FileText, Newspaper, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../utils/translations';

export const BottomNav: React.FC = () => {
  const { currentPage, navigateTo, theme, appLang } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-lg border-t px-2 py-1.5 transition-colors ${
      isDark ? 'bg-[#090d16]/95 border-slate-800' : 'bg-white/95 border-amber-200/60 shadow-lg shadow-amber-500/5'
    }`}>
      <div className="max-w-md mx-auto flex items-center justify-between relative px-1">
        
        {/* 1. Dashboard - Unique Color: Indigo */}
        <button
          onClick={() => navigateTo('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            currentPage === 'dashboard' 
              ? 'text-indigo-500 font-extrabold' 
              : isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 mb-1 transition-transform ${currentPage === 'dashboard' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight">{t('dashboard', appLang)}</span>
        </button>

        {/* 2. Test - Unique Color: Emerald */}
        <button
          onClick={() => navigateTo('test')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            currentPage === 'test' || currentPage === 'test_details'
              ? 'text-emerald-500 font-extrabold' 
              : isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'
          }`}
        >
          <FileText className={`w-5 h-5 mb-1 transition-transform ${currentPage === 'test' || currentPage === 'test_details' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight">{t('test', appLang)}</span>
        </button>

        {/* 3. PRACTICE - Flagship 01 Centerpiece (NO "Drill" label, strictly "01" icon) - Unique Color: Vibrant Amber/Gold */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-6 relative">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => navigateTo('practice')}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all border cursor-pointer ${
              currentPage === 'practice'
                ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black shadow-amber-500/40 border-amber-300 ring-2 ring-amber-400/30'
                : isDark 
                  ? 'bg-gradient-to-b from-slate-900 to-[#121826] hover:bg-slate-850 text-amber-400 border-amber-500/40 shadow-slate-950/80' 
                  : 'bg-gradient-to-b from-white to-amber-50 hover:bg-amber-50 text-amber-600 border-amber-300 shadow-amber-500/10'
            }`}
            aria-label="Practice 01"
          >
            {/* ONLY 01, NO DRILL */}
            <span className="font-black text-2xl leading-none tracking-tighter">01</span>
          </motion.button>
          <span className={`text-[10px] font-bold mt-1 tracking-tight ${
            currentPage === 'practice' 
              ? 'text-amber-500 font-extrabold' 
              : isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {t('practice', appLang)}
          </span>
        </div>

        {/* 4. Current Affairs - Unique Color: Rose (renamed from CA Cards) */}
        <button
          onClick={() => navigateTo('current_affairs')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            currentPage === 'current_affairs' || currentPage === 'current_affairs_detail'
              ? 'text-rose-500 font-extrabold' 
              : isDark ? 'text-slate-400 hover:text-rose-400' : 'text-slate-500 hover:text-rose-600'
          }`}
        >
          <Newspaper className={`w-5 h-5 mb-1 transition-transform ${currentPage === 'current_affairs' || currentPage === 'current_affairs_detail' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight">{t('currentAffairs', appLang)}</span>
        </button>

        {/* 5. Leaderboard - Unique Color: Royal Gold/Yellow */}
        <button
          onClick={() => navigateTo('leaderboard')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            currentPage === 'leaderboard' 
              ? 'text-yellow-500 font-extrabold' 
              : isDark ? 'text-slate-400 hover:text-yellow-400' : 'text-slate-500 hover:text-yellow-600'
          }`}
        >
          <Trophy className={`w-5 h-5 mb-1 transition-transform ${currentPage === 'leaderboard' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight">{t('leaderboard', appLang)}</span>
        </button>

      </div>
    </div>
  );
};
