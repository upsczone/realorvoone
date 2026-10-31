import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Coins, 
  BookMarked, 
  Sparkles, 
  FileText, 
  Newspaper, 
  Play, 
  TrendingUp, 
  Target, 
  Clock, 
  ChevronRight, 
  Zap, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { t } from '../utils/translations';

export const DashboardView: React.FC = () => {
  const { 
    user, 
    navigateTo, 
    claimDailyStreak, 
    hasClaimedToday, 
    tests, 
    openTestDetails, 
    mistakeItems,
    theme,
    appLang,
    currentAffairs,
    openCurrentAffairsDetail
  } = useApp();

  const isDark = theme === 'dark';
  const unresolvedMistakes = mistakeItems.filter(m => !m.isMastered);

  // Recommended tests for user's selected target exam
  const recommendedTests = tests.filter(t => t.examType === user.targetExam || t.category === 'mock').slice(0, 3);
  const caTest = tests.find(t => t.id === 'test-sub-gk-01') || tests[0];
  const latestCa = currentAffairs[0];

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* 1. Top Greeting Card - Rich Golden Gradient in Light Mode */}
      <div className={`relative overflow-hidden rounded-3xl border p-6 md:p-8 shadow-xl transition-all ${
        isDark 
          ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800 shadow-slate-950/50' 
          : 'bg-gradient-to-r from-[#fffbf0] via-[#fff5d6] to-[#ffecb3] border-amber-300 shadow-amber-500/10'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                isDark 
                  ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' 
                  : 'bg-amber-400/30 text-amber-900 border-amber-400/50'
              }`}>
                {t('targetExam', appLang)}: {user.targetExam}
              </span>
              <span className="text-slate-400">·</span>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-amber-800'}`}>
                {t('oneDayExams', appLang)}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {t('greetingHii', appLang)} {user.name} 👋
            </h1>
            <p className={`text-xs sm:text-sm max-w-xl ${isDark ? 'text-slate-300' : 'text-amber-950/80 font-medium'}`}>
              {t('streakMotivation', appLang)}{' '}
              <span className="font-bold text-amber-500 font-mono">{user.streakDays}</span>{' '}
              {t('ofYourStreak', appLang)}
            </p>
          </div>

          {/* Quick Streak & Coin Action Widget */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={claimDailyStreak}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                hasClaimedToday
                  ? isDark 
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' 
                    : 'bg-amber-100 border-amber-300 text-amber-800'
                  : isDark 
                    ? 'bg-slate-900 border-amber-500/40 text-amber-400 hover:bg-amber-500/10' 
                    : 'bg-white border-amber-400 text-amber-700 hover:bg-amber-50 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{user.streakDays} {t('streakDays', appLang)}</span>
              </div>
              <span className={`text-[10px] mt-0.5 font-semibold ${isDark ? 'text-slate-400' : 'text-amber-700'}`}>
                {hasClaimedToday ? t('claimedToday', appLang) : t('claimDailyBonus', appLang)}
              </span>
            </button>

            <button
              onClick={() => navigateTo('coin_store')}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                isDark 
                  ? 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 text-amber-400' 
                  : 'border-amber-400 bg-white hover:bg-amber-50 text-amber-800 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>{user.ocCoins} oc</span>
              </div>
              <span className={`text-[10px] mt-0.5 font-semibold ${isDark ? 'text-slate-400' : 'text-amber-700'}`}>
                {t('coinWallet', appLang)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Summary of Activities */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('summaryOfActivities', appLang)}
          </h2>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {t('updatedInRealTime', appLang)}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          <div className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs hover:border-amber-300'
          }`}>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">{t('testsAttempted', appLang)}</span>
              <FileText className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-mono text-2xl font-bold tabular-nums">06</div>
            <div className="text-[11px] text-emerald-500 mt-1 flex items-center gap-1 font-semibold">
              <span>+2 this week</span>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs hover:border-amber-300'
          }`}>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">{t('averageAccuracy', appLang)}</span>
              <Target className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="font-mono text-2xl font-bold tabular-nums">87.4%</div>
            <div className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Target: &gt;90%
            </div>
          </div>

          <div className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs hover:border-amber-300'
          }`}>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">{t('overallPercentile', appLang)}</span>
              <TrendingUp className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="font-mono text-2xl font-bold tabular-nums">94.6%</div>
            <div className="text-[11px] text-indigo-500 mt-1 font-semibold">
              {t('top2Percentile', appLang)}
            </div>
          </div>

          <div className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs hover:border-amber-300'
          }`}>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">{t('questionsSolved', appLang)}</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-mono text-2xl font-bold tabular-nums">418</div>
            <div className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Across 4 subjects
            </div>
          </div>

        </div>
      </div>

      {/* 3. High Impact Actions: Mistake Book, Start CA Test, Read Today Current Affairs, Read Notes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('highImpactActions', appLang)}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card A: Mistake Book */}
          <div 
            onClick={() => navigateTo('mistake_book')}
            className={`group rounded-3xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
              isDark 
                ? 'bg-[#111726] hover:bg-[#151c2e] border-slate-800 hover:border-rose-500/40' 
                : 'bg-white hover:bg-rose-50/30 border-amber-200/80 hover:border-rose-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center">
                  <BookMarked className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-500 border border-rose-500/30 font-mono">
                  {unresolvedMistakes.length} mistakes
                </span>
              </div>
              <h3 className="font-bold text-base group-hover:text-rose-500 transition-colors">
                {t('mistakeBookTitle', appLang)}
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('mistakeBookDesc', appLang)}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-750 flex items-center justify-between text-xs font-bold text-rose-500">
              <span>{t('openMistakeBook', appLang)}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card B: Start Current Affairs Test */}
          <div 
            onClick={() => openTestDetails(caTest)}
            className={`group rounded-3xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
              isDark 
                ? 'bg-[#111726] hover:bg-[#151c2e] border-slate-800 hover:border-amber-500/40' 
                : 'bg-white hover:bg-amber-50/40 border-amber-200/80 hover:border-amber-400 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-600 font-mono">
                  10 MCQs
                </span>
              </div>
              <h3 className="font-bold text-base group-hover:text-amber-500 transition-colors">
                {t('startCaTestTitle', appLang)}
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('startCaTestDesc', appLang)}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-750 flex items-center justify-between text-xs font-bold text-amber-500">
              <span>{t('takeCaTest', appLang)}</span>
              <Play className="w-3.5 h-3.5 fill-amber-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card C: Read Today Current Affairs (UPDATED as requested, with Full Details page integration) */}
          <div 
            onClick={() => {
              if (latestCa) {
                openCurrentAffairsDetail(latestCa);
              } else {
                navigateTo('current_affairs');
              }
            }}
            className={`group rounded-3xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
              isDark 
                ? 'bg-[#111726] hover:bg-[#151c2e] border-slate-800 hover:border-rose-500/40' 
                : 'bg-white hover:bg-rose-50/30 border-amber-200/80 hover:border-rose-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center">
                  <Newspaper className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  Today's Capsule
                </span>
              </div>
              <h3 className="font-bold text-base group-hover:text-rose-500 transition-colors">
                {t('readTodayCaTitle', appLang)}
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('readTodayCaDesc', appLang)}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-750 flex items-center justify-between text-xs font-bold text-rose-500">
              <span>{t('exploreCards', appLang)}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card D: Read Notes */}
          <div 
            onClick={() => navigateTo('notes')}
            className={`group rounded-3xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
              isDark 
                ? 'bg-[#111726] hover:bg-[#151c2e] border-slate-800 hover:border-cyan-500/40' 
                : 'bg-white hover:bg-cyan-50/30 border-amber-200/80 hover:border-cyan-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-cyan-500 font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  Quick Revision
                </span>
              </div>
              <h3 className="font-bold text-base group-hover:text-cyan-500 transition-colors">
                {t('readNotesTitle', appLang)}
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('readNotesDesc', appLang)}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-750 flex items-center justify-between text-xs font-bold text-cyan-500">
              <span>{t('openNotes', appLang)}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* 4. Recommended Tests Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('recommendedForYou', appLang)}
            </h2>
            <span className="text-xs text-indigo-500 font-mono font-bold">({user.targetExam})</span>
          </div>

          <button
            onClick={() => navigateTo('test')}
            className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('viewAllTests', appLang)}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedTests.map((tItem) => (
            <div
              key={tItem.id}
              onClick={() => openTestDetails(tItem)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isDark 
                  ? 'bg-[#111726] hover:bg-[#151c2e] border-slate-800 hover:border-indigo-500/40 shadow-lg' 
                  : 'bg-white hover:bg-amber-50/30 border-amber-200/80 hover:border-amber-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isDark ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  }`}>
                    {tItem.examType}
                  </span>
                  
                  {tItem.isPremium ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      PREMIUM
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      FREE (1 Attempt)
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm sm:text-base group-hover:text-indigo-500 transition-colors line-clamp-2">
                  {tItem.title}
                </h3>
                <p className={`text-xs mt-1.5 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {tItem.description}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <div className="flex items-center gap-3">
                  <span>{tItem.totalQuestions} Qs</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{tItem.durationMinutes}m</span>
                  </span>
                </div>

                <span className="font-bold text-indigo-500 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{t('viewDetails', appLang)}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
