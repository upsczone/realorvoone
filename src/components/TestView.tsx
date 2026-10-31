import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Coins, 
  Search, 
  Layers, 
  FileCheck, 
  History, 
  Award,
  ChevronRight,
  Sparkles,
  Info,
  Trophy,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  BarChart2,
  Calendar,
  RotateCcw
} from 'lucide-react';
import { TestCategory, TestPaper, TestResult } from '../types';
import { t } from '../utils/translations';

export const TestView: React.FC = () => {
  const { 
    user, 
    tests, 
    openTestDetails, 
    unlockTestWithCoins, 
    navigateTo, 
    setTargetCategory,
    testAttempts,
    resultsHistory,
    openTestResult,
    openTestAnalysis,
    theme,
    appLang
  } = useApp();

  const isDark = theme === 'dark';
  const [mainTab, setMainTab] = useState<'explore' | 'history'>('explore');
  const [activeCategory, setActiveCategory] = useState<TestCategory | 'all'>('mock');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tests based on category, search, and exam
  const filteredTests = tests.filter((test) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = test.title.toLowerCase().includes(q);
      const matchExam = test.examType.toLowerCase().includes(q);
      const matchSubject = test.subject?.toLowerCase().includes(q);
      if (!matchTitle && !matchExam && !matchSubject) return false;
    }

    if (activeCategory === 'exambased') {
      return test.examType === user.targetExam || test.category === 'exambased';
    } else if (activeCategory !== 'all') {
      if (test.category !== activeCategory) return false;
    }

    const isSSCExam = test.examType.startsWith('SSC');
    const matchesCategory = user.targetCategory === 'SSC' ? isSSCExam : !isSSCExam;
    return matchesCategory || test.examType === user.targetExam;
  });

  // Calculate stats for History view
  const totalAttempts = resultsHistory.length;
  const avgScore = totalAttempts > 0 
    ? (resultsHistory.reduce((acc, r) => acc + r.score, 0) / totalAttempts).toFixed(1) 
    : '0';
  const avgAccuracy = totalAttempts > 0 
    ? (resultsHistory.reduce((acc, r) => acc + r.accuracy, 0) / totalAttempts).toFixed(1) 
    : '0';
  const bestRank = totalAttempts > 0 
    ? Math.min(...resultsHistory.map(r => r.userRank || 9999)) 
    : null;

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* 1. Header with Exam Category Switcher & View Switcher */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 ${
        isDark ? 'border-slate-800' : 'border-amber-200'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>{appLang === 'hi' ? 'ऑफिशियल टीसीएस परीक्षा पैटर्न' : 'Official TCS Pattern'}</span>
            <span>·</span>
            <span>{appLang === 'hi' ? 'द्विभाषी (English & हिन्दी)' : 'Bilingual (English & Hindi)'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('test', appLang)} & CBT Mocks
          </h1>
        </div>

        {/* Primary View Mode Switch: Explore Tests vs Attempt History */}
        <div className={`flex items-center p-1 rounded-2xl border self-start sm:self-auto ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-300 shadow-xs'
        }`}>
          <button
            onClick={() => setMainTab('explore')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mainTab === 'explore'
                ? 'bg-emerald-600 text-white shadow-sm'
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{appLang === 'hi' ? 'टेस्ट सीरीज' : 'Explore Tests'}</span>
          </button>
          <button
            onClick={() => setMainTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mainTab === 'history'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-extrabold'
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{appLang === 'hi' ? 'प्रयास इतिहास' : 'Attempt History'}</span>
            {resultsHistory.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                mainTab === 'history' ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-500/20 text-amber-500'
              }`}>
                {resultsHistory.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* VIEW A: EXPLORE TESTS */}
      {mainTab === 'explore' && (
        <div className="space-y-6">
          {/* Exam Category Switcher (SSC vs Railway) */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className={`flex items-center p-1 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-200 shadow-xs'
            }`}>
              <button
                onClick={() => setTargetCategory('SSC')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  user.targetCategory === 'SSC'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SSC Exams
              </button>
              <button
                onClick={() => setTargetCategory('Railway')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  user.targetCategory === 'Railway'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Railway Exams
              </button>
            </div>

            {/* Quick Link to History */}
            {resultsHistory.length > 0 && (
              <button
                onClick={() => setMainTab('history')}
                className={`text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-800'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>{appLang === 'hi' ? 'पिछला इतिहास देखें' : 'View Attempt History'} ({resultsHistory.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Test Navigation Tabs: Subject wise, Mock Test, PYQs, {Exam base} */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveCategory('mock')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === 'mock'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : isDark ? 'bg-slate-900 text-slate-400 hover:text-white border-slate-800' : 'bg-white text-slate-700 hover:text-slate-900 border-amber-200/80 shadow-xs'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{appLang === 'hi' ? 'फुल मॉक टेस्ट' : 'Mock Test'}</span>
            </button>

            <button
              onClick={() => setActiveCategory('subject')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === 'subject'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : isDark ? 'bg-slate-900 text-slate-400 hover:text-white border-slate-800' : 'bg-white text-slate-700 hover:text-slate-900 border-amber-200/80 shadow-xs'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{appLang === 'hi' ? 'विषयवार टेस्ट' : 'Subject Wise'}</span>
            </button>

            <button
              onClick={() => setActiveCategory('pyq')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === 'pyq'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : isDark ? 'bg-slate-900 text-slate-400 hover:text-white border-slate-800' : 'bg-white text-slate-700 hover:text-slate-900 border-amber-200/80 shadow-xs'
              }`}
            >
              <History className="w-4 h-4" />
              <span>{appLang === 'hi' ? 'पिछले वर्षों के प्रश्न (PYQs)' : 'PYQs (Previous Years)'}</span>
            </button>

            <button
              onClick={() => setActiveCategory('exambased')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === 'exambased'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-emerald-400 shadow-md'
                  : isDark ? 'bg-slate-900 text-teal-400 hover:text-white border-teal-500/30' : 'bg-white text-teal-700 hover:text-teal-900 border-teal-300 shadow-xs'
              }`}
            >
              <Award className="w-4 h-4 text-teal-400" />
              <span>{user.targetExam} ({appLang === 'hi' ? 'विशेष परीक्षा' : 'Exam Base'})</span>
            </button>
          </div>

          {/* Search & Info Bar */}
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-amber-200 shadow-xs'
          }`}>
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={appLang === 'hi' ? 'मॉक टेस्ट, PYQ या विषय खोजें...' : 'Search mocks, PYQs, topics...'}
                className={`w-full border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-hidden ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-500' : 'bg-amber-50/50 border-amber-200 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 self-end sm:self-auto">
              <span>{appLang === 'hi' ? 'कुल उपलब्ध:' : 'Showing'} <strong className={isDark ? 'text-white' : 'text-slate-900'}>{filteredTests.length}</strong> {appLang === 'hi' ? 'टेस्ट' : 'tests'}</span>
            </div>
          </div>

          {/* Test Paper Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTests.map((test) => {
              const attemptsMade = testAttempts[test.id] || 0;
              const hasUsedFreeAttempt = attemptsMade >= 1;

              return (
                <div
                  key={test.id}
                  onClick={() => openTestDetails(test)}
                  className={`rounded-3xl border p-5 sm:p-6 flex flex-col justify-between transition-all cursor-pointer group ${
                    isDark 
                      ? 'bg-[#111726] border-slate-800 hover:border-emerald-500/50 shadow-sm' 
                      : 'bg-white border-amber-200/80 hover:border-emerald-400 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Meta Row */}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-500">{test.examType}</span>
                        <span>·</span>
                        <span>{test.totalQuestions} {appLang === 'hi' ? 'प्रश्न' : 'Questions'}</span>
                        <span>·</span>
                        <span>{test.durationMinutes} {appLang === 'hi' ? 'मिनट' : 'Mins'}</span>
                      </div>

                      {/* Free attempt status per test */}
                      <div className="font-mono text-[11px]">
                        {user.isPremium ? (
                          <span className="text-emerald-500 font-semibold">Unlimited PRO</span>
                        ) : hasUsedFreeAttempt ? (
                          <span className="text-amber-500 font-semibold">{t('freeAttemptUsed', appLang)}</span>
                        ) : (
                          <span className="text-emerald-500 font-semibold">{t('freeAttemptAvailable', appLang)}</span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-base group-hover:text-emerald-500 transition-colors line-clamp-1">
                      {test.title}
                    </h3>
                    <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {test.description}
                    </p>

                    {/* Score & Marking scheme */}
                    <div className={`flex items-center gap-4 mt-3 pt-3 border-t text-xs ${
                      isDark ? 'border-slate-800 text-slate-300' : 'border-amber-100 text-slate-700'
                    }`}>
                      <div>
                        <span className="text-slate-400 block text-[10px]">{appLang === 'hi' ? 'कुल अंक' : 'Total Marks'}</span>
                        <span className="font-mono font-bold">{test.totalMarks}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">{appLang === 'hi' ? 'सही अंक' : 'Positive'}</span>
                        <span className="font-mono font-bold text-emerald-500">+{test.marksPerQuestion}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">{appLang === 'hi' ? 'नेगेटिव' : 'Negative'}</span>
                        <span className="font-mono font-bold text-rose-500">-{test.negativeMarking}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">{appLang === 'hi' ? 'भाषा' : 'Language'}</span>
                        <span className="font-semibold">En / Hi</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className={`mt-5 pt-3 border-t flex items-center justify-between ${
                    isDark ? 'border-slate-800/80' : 'border-amber-100'
                  }`}>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {test.attemptsCount.toLocaleString()} {appLang === 'hi' ? 'छात्र दे चुके हैं' : 'candidates'}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>{t('viewDetails', appLang)}</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW B: ATTEMPT HISTORY */}
      {mainTab === 'history' && (
        <div className="space-y-6">
          
          {/* History Header & Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <FileCheck className="w-4 h-4 text-indigo-500" />
                <span className="text-[11px] font-semibold">{appLang === 'hi' ? 'कुल प्रयास' : 'Total Tests'}</span>
              </div>
              <strong className="text-2xl font-mono font-black">{totalAttempts}</strong>
            </div>

            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Award className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-semibold">{appLang === 'hi' ? 'औसत स्कोर' : 'Avg Score'}</span>
              </div>
              <strong className="text-2xl font-mono font-black text-emerald-500">{avgScore}</strong>
            </div>

            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Target className="w-4 h-4 text-amber-500" />
                <span className="text-[11px] font-semibold">{appLang === 'hi' ? 'सटीकता' : 'Avg Accuracy'}</span>
              </div>
              <strong className="text-2xl font-mono font-black text-amber-500">{avgAccuracy}%</strong>
            </div>

            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] font-semibold">{appLang === 'hi' ? 'सर्वश्रेष्ठ रैंक' : 'Best Rank'}</span>
              </div>
              <strong className="text-2xl font-mono font-black text-amber-400">
                {bestRank ? `#${bestRank}` : '—'}
              </strong>
            </div>
          </div>

          {/* Attempts List */}
          {resultsHistory.length === 0 ? (
            <div className={`p-12 text-center rounded-3xl border ${
              isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-amber-200 shadow-xs'
            }`}>
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto mb-4">
                <History className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg mb-1">
                {appLang === 'hi' ? 'कोई प्रयास रिकॉर्ड नहीं मिला' : 'No Test Attempts Yet'}
              </h3>
              <p className={`text-xs max-w-sm mx-auto mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {appLang === 'hi' 
                  ? 'अपना पहला CBT मॉक टेस्ट दें और अपने स्कोरकार्ड, रैंक एवं विस्तृत समाधान यहाँ देखें।' 
                  : 'Take your first CBT mock test to see your scorecards, rankings, and deep question solutions here.'}
              </p>
              <button
                onClick={() => setMainTab('explore')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                {appLang === 'hi' ? 'मॉक टेस्ट शुरू करें' : 'Browse Available Tests'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {appLang === 'hi' ? 'आपके द्वारा दिए गए टेस्ट' : 'Your Completed Tests'} ({resultsHistory.length})
                </h2>
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {appLang === 'hi' ? 'नवीनतम पहले' : 'Latest First'}
                </span>
              </div>

              {resultsHistory.map((result, idx) => (
                <div
                  key={result.id || idx}
                  className={`rounded-3xl border p-5 sm:p-6 transition-all ${
                    isDark 
                      ? 'bg-[#111726] border-slate-800 hover:border-slate-700' 
                      : 'bg-white border-amber-200/90 hover:border-amber-300 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Left: Title, Exam Badge, Date */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-indigo-500 uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                          {result.examType}
                        </span>
                        <span className="text-slate-400 font-mono flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{result.date || 'Today'}</span>
                        </span>
                        {result.userRank && (
                          <span className="text-amber-500 font-mono font-bold flex items-center gap-1">
                            <Trophy className="w-3.5 h-3.5" />
                            <span>Rank #{result.userRank}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold tracking-tight truncate">
                        {result.testTitle}
                      </h3>

                      {/* Performance Pills */}
                      <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                        <div className="flex items-center gap-1 font-mono">
                          <span className="text-slate-400">{appLang === 'hi' ? 'स्कोर:' : 'Score:'}</span>
                          <strong className="text-indigo-500 text-sm font-black">{result.score}</strong>
                          <span className="text-slate-400">/{result.totalMarks}</span>
                        </div>
                        <span className="text-slate-400">·</span>
                        <div className="flex items-center gap-1 font-mono">
                          <span className="text-slate-400">{appLang === 'hi' ? 'सटीकता:' : 'Accuracy:'}</span>
                          <strong className="text-emerald-500 font-bold">{result.accuracy}%</strong>
                        </div>
                        <span className="text-slate-400">·</span>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-emerald-500 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{result.correctCount}</span>
                          </span>
                          <span className="text-rose-500 flex items-center gap-0.5">
                            <XCircle className="w-3 h-3" />
                            <span>{result.incorrectCount}</span>
                          </span>
                          <span className="text-slate-400">
                            {result.unattemptedCount} {appLang === 'hi' ? 'छोड़े' : 'skipped'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/40">
                      
                      {/* View Scorecard */}
                      <button
                        onClick={() => openTestResult(result)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                          isDark 
                            ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700' 
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <BarChart2 className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{appLang === 'hi' ? 'स्कोरकार्ड' : 'Scorecard'}</span>
                      </button>

                      {/* View Full Analysis & Solutions */}
                      <button
                        onClick={() => openTestAnalysis(result)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{appLang === 'hi' ? 'फुल एनालिसिस व उत्तर' : 'View Full Analysis'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
