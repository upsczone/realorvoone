import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ApiService } from '../services/api';
import { TestRanker } from '../types';
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  BookMarked, 
  ArrowRight, 
  ChevronRight, 
  TrendingUp, 
  LayoutDashboard, 
  Sparkles,
  Medal,
  Crown,
  Users,
  Timer
} from 'lucide-react';

export const ResultScreen: React.FC = () => {
  const { currentResult, navigateTo, theme, user, appLang } = useApp();
  const isDark = theme === 'dark';
  const [testRankers, setTestRankers] = useState<TestRanker[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (currentResult) {
      setLoadingLeaderboard(true);
      ApiService.getTestSpecificLeaderboard(currentResult.testId, currentResult, user)
        .then(rankers => {
          if (isMounted) {
            setTestRankers(rankers);
            setLoadingLeaderboard(false);
          }
        })
        .catch(() => {
          if (isMounted) setLoadingLeaderboard(false);
        });
    }
    return () => { isMounted = false; };
  }, [currentResult, user]);

  if (!currentResult) {
    return (
      <div className="p-12 text-center">
        <p className="text-slate-400 text-sm">No test result available.</p>
        <button
          onClick={() => navigateTo('dashboard')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const isUserInTop10 = (currentResult.userRank || 999) <= 10;
  const userTimeFormatted = `${Math.floor(currentResult.timeTakenSeconds / 60)}m ${currentResult.timeTakenSeconds % 60}s`;

  return (
    <div className={`pb-28 pt-6 px-4 sm:px-6 max-w-3xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* 1. Scorecard Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-2xl ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-br from-white via-indigo-50/50 to-white border-slate-200'
      }`}>
        <div className="relative z-10 text-center space-y-3">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 text-xs font-bold font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>TEST COMPLETED · {currentResult.examType}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {currentResult.testTitle}
          </h1>

          {/* Big Score Display */}
          <div className="py-2">
            <span className="text-4xl sm:text-5xl font-black font-mono text-indigo-500">
              {currentResult.score}
            </span>
            <span className={`text-lg sm:text-xl font-bold font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {' '}/ {currentResult.totalMarks} Marks
            </span>
          </div>

          <p className={`text-xs sm:text-sm max-w-md mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            You performed better than <strong className="text-emerald-500 font-bold">{currentResult.percentile}%</strong> of candidates across India.
          </p>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 max-w-xl mx-auto font-mono text-xs">
            <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>All-India Rank</span>
              <strong className="text-amber-500 text-base">#{currentResult.userRank}</strong>
            </div>

            <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Accuracy</span>
              <strong className="text-emerald-500 text-base">{currentResult.accuracy}%</strong>
            </div>

            <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Correct / Wrong</span>
              <strong className="text-base">
                <span className="text-emerald-500">{currentResult.correctCount}</span>
                <span className="text-slate-400"> / </span>
                <span className="text-rose-500">{currentResult.incorrectCount}</span>
              </strong>
            </div>

            <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Time Taken</span>
              <strong className="text-base">
                {userTimeFormatted}
              </strong>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Questions added to Mistake Book (Count) */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDark ? 'bg-[#111726] border-rose-500/30' : 'bg-rose-50/50 border-rose-200'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center shrink-0">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base">
                {currentResult.mistakeCountAdded} {appLang === 'hi' ? 'गलत प्रश्न मिस्टेक बुक में जोड़े गए' : 'Questions Added to Mistake Book'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/30 font-mono">
                Auto Synced
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {appLang === 'hi' 
                ? 'आपके द्वारा गलत किए गए सभी प्रश्न व्यक्तिगत मिस्टेक बुक में सहेज दिए गए हैं।' 
                : 'Every incorrect answer has been stored in your personal Mistake Book for targeted re-attempts.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('mistake_book')}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <span>{appLang === 'hi' ? 'मिस्टेक बुक खोलें' : 'Open Mistake Book'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. TEST-SPECIFIC LEADERBOARD (As requested: "Result page par ho leaderboard bhi dikhao us test ka only") */}
      <div className={`rounded-3xl border p-5 sm:p-6 shadow-xl transition-all ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200/90 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
              <h2 className="font-extrabold text-base sm:text-lg tracking-tight">
                {appLang === 'hi' ? 'इस टेस्ट की लीडरबोर्ड' : 'Test Leaderboard'}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 font-mono">
                {appLang === 'hi' ? 'केवल इस टेस्ट के टॉप 10' : 'This Test Only'}
              </span>
            </div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>{currentResult.testTitle}</strong> · {currentResult.totalParticipants.toLocaleString()} {appLang === 'hi' ? 'अभ्यर्थियों में रैंकिंग' : 'candidates participated'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
            <Users className="w-3.5 h-3.5 text-amber-500" />
            <span>Top 10 Rankers</span>
          </div>
        </div>

        {/* Top 10 Rankers List */}
        <div className="space-y-2">
          {testRankers.map((ranker) => {
            const isFirst = ranker.rank === 1;
            const isSecond = ranker.rank === 2;
            const isThird = ranker.rank === 3;
            const isCurrent = ranker.isCurrentUser;

            let rankBadge = (
              <span className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}>
                #{ranker.rank}
              </span>
            );

            if (isFirst) {
              rankBadge = (
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                  🥇
                </div>
              );
            } else if (isSecond) {
              rankBadge = (
                <div className="w-7 h-7 rounded-xl bg-slate-400/20 border border-slate-400/40 text-slate-300 flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                  🥈
                </div>
              );
            } else if (isThird) {
              rankBadge = (
                <div className="w-7 h-7 rounded-xl bg-amber-700/20 border border-amber-700/40 text-amber-600 flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                  🥉
                </div>
              );
            }

            return (
              <div
                key={ranker.rank}
                className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isCurrent
                    ? isDark
                      ? 'bg-indigo-950/40 border-indigo-500/60 ring-2 ring-indigo-500/30'
                      : 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-400/30'
                    : isDark
                    ? 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-white'
                }`}
              >
                {/* Left: Rank & Candidate */}
                <div className="flex items-center gap-3 min-w-0">
                  {rankBadge}

                  <img
                    src={ranker.avatar}
                    alt={ranker.name}
                    className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-700/50"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-xs sm:text-sm truncate">
                        {ranker.name}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-indigo-500 text-white font-mono shrink-0">
                          YOU
                        </span>
                      )}
                    </div>
                    {ranker.stateOrCity && (
                      <span className={`text-[11px] block truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {ranker.stateOrCity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Score, Accuracy, Time */}
                <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-right font-mono">
                  <div>
                    <span className="text-[10px] block text-slate-400">Score</span>
                    <strong className="text-xs sm:text-sm text-indigo-500 font-black">
                      {ranker.score}
                    </strong>
                    <span className="text-[10px] text-slate-400">/{ranker.totalMarks}</span>
                  </div>

                  <div className="hidden xs:block">
                    <span className="text-[10px] block text-slate-400">Accuracy</span>
                    <span className="text-xs font-bold text-emerald-500">
                      {ranker.accuracy}%
                    </span>
                  </div>

                  <div className="hidden sm:block">
                    <span className="text-[10px] block text-slate-400">Time</span>
                    <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {ranker.timeTaken}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* If user ranked outside Top 10, display user's rank highlight row */}
        {!isUserInTop10 && (
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="text-center py-1 text-slate-500 text-xs font-mono font-bold tracking-widest">
              ······ {appLang === 'hi' ? 'इस टेस्ट में आपकी स्थिति' : 'YOUR STANDING IN THIS TEST'} ······
            </div>

            <div className={`mt-2 p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-md ${
              isDark 
                ? 'bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 border-indigo-500/50' 
                : 'bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border-indigo-300'
            }`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold font-mono text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-md">
                  #{currentResult.userRank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm">{user.name}</strong>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-indigo-500 text-white font-mono uppercase">
                      YOU
                    </span>
                  </div>
                  <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Percentile: <strong className="text-emerald-500">{currentResult.percentile}%</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right font-mono shrink-0">
                <div>
                  <span className="text-[10px] block text-slate-400">Your Score</span>
                  <strong className="text-sm font-black text-indigo-500">
                    {currentResult.score} / {currentResult.totalMarks}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] block text-slate-400">Accuracy</span>
                  <strong className="text-sm font-bold text-emerald-500">
                    {currentResult.accuracy}%
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Rankings synchronized for this test paper</span>
          <span className="font-mono">api.upsczone.in</span>
        </div>
      </div>

      {/* 4. Primary Button: VIEW FULL ANALYSIS */}
      <div className="pt-2 space-y-3">
        <button
          onClick={() => navigateTo('full_analysis')}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
        >
          <span>{appLang === 'hi' ? 'फुल एनालिसिस देखें (कमजोर क्षेत्र, समाधान)' : 'View Full Analysis (Weak Areas, Recommendations & Solutions)'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigateTo('dashboard')}
          className={`w-full py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>{appLang === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard'}</span>
        </button>
      </div>

    </div>
  );
};
