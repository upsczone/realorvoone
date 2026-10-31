import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_QUESTIONS, TOP_STUDENTS_LEADERBOARD } from '../data/mockData';
import { 
  ArrowLeft, 
  TrendingDown, 
  TrendingUp, 
  Play, 
  Bookmark, 
  BookmarkCheck, 
  Trophy, 
  Lock, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  Coins
} from 'lucide-react';

export const FullAnalysisPage: React.FC = () => {
  const { 
    currentResult, 
    goBack, 
    navigateTo, 
    user, 
    appLang, 
    toggleSaveQuestion, 
    isQuestionSaved, 
    theme,
    startTest,
    tests
  } = useApp();

  const isDark = theme === 'dark';

  if (!currentResult) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400 text-sm">No analysis data found.</p>
        <button onClick={goBack} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold">
          Go Back
        </button>
      </div>
    );
  }

  const isPremium = user.isPremium;

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-5xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Result</span>
        </button>

        <span className="text-xs font-mono text-indigo-500 font-bold uppercase tracking-wider">
          Deep Diagnostic Report
        </span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Full Test Performance Analysis
        </h1>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {currentResult.testTitle} · Score: <strong className="text-indigo-500">{currentResult.score}/{currentResult.totalMarks}</strong> · Rank: <strong className="text-amber-500">#{currentResult.userRank}</strong>
        </p>
      </div>

      {/* 1. Weak Areas & Strong Areas Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Weak Areas */}
        <div className={`p-5 rounded-2xl border ${
          isDark ? 'bg-[#111726] border-rose-500/20' : 'bg-white border-rose-200'
        }`}>
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingDown className="w-4 h-4" />
            <span>Weak Areas (Focus Topics)</span>
          </div>

          {currentResult.weakAreas.length > 0 ? (
            <div className="space-y-3">
              {currentResult.weakAreas.map((area, idx) => (
                <div key={idx} className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold">{area.topic}</span>
                    <span className="font-mono text-rose-500 font-bold">{area.accuracy}%</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{area.subject}</span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full" 
                      style={{ width: `${Math.max(10, area.accuracy)}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Excellent! No weak areas flagged in this test.</p>
          )}
        </div>

        {/* Strong Areas */}
        <div className={`p-5 rounded-2xl border ${
          isDark ? 'bg-[#111726] border-emerald-500/20' : 'bg-white border-emerald-200'
        }`}>
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Strong Areas (High Dominance)</span>
          </div>

          {currentResult.strongAreas.length > 0 ? (
            <div className="space-y-3">
              {currentResult.strongAreas.map((area, idx) => (
                <div key={idx} className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold">{area.topic}</span>
                    <span className="font-mono text-emerald-500 font-bold">{area.accuracy}%</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{area.subject}</span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${Math.max(20, area.accuracy)}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Practice more to establish strong subjects.</p>
          )}
        </div>

      </div>

      {/* 2. Recommended Tests for Weak and Strong Areas */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Recommended Remedial Tests
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Curated drills specifically tailored to fix weak topics and amplify strengths
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentResult.recommendedTests.map((rec) => (
            <div 
              key={rec.id}
              className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] mb-1">
                  <span className={`font-bold ${
                    rec.type === 'weak_fix' ? 'text-rose-500' : 'text-emerald-500'
                  }`}>
                    {rec.type === 'weak_fix' ? 'Weak Topic Fix' : 'Strength Level Up'}
                  </span>
                  <span>·</span>
                  <span className="text-slate-400 font-mono">{rec.duration}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm line-clamp-1">{rec.title}</h4>
                <span className="text-[11px] text-slate-400">{rec.subject}</span>
              </div>

              <button
                onClick={() => {
                  const targetMock = tests.find(t => t.category === 'subject') || tests[0];
                  startTest(targetMock);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Practice</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Question-by-Question Solution Review:
             ANSWERS ARE SHOWN, BUT EXPLANATION IS LOCKED FOR FREE USERS!
             "questions ke answer dikhai denge lekin question ki explanation lock hogi. Usko unlock krne ke liye premium chahiye"
      */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Questions & Answer Key
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review all questions with correct answer key · Language dynamically follows Header toggle
            </p>
          </div>
          {!isPremium && (
            <span className="text-[11px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
              <Lock className="w-3 h-3" />
              <span>Explanations Locked</span>
            </span>
          )}
        </div>

        <div className="space-y-4">
          {ALL_QUESTIONS.slice(0, 5).map((q, idx) => {
            const isSaved = isQuestionSaved(q.id);
            const correctOptChar = String.fromCharCode(65 + q.correctAnswerIndex);
            const correctOptText = q.options[appLang][q.correctAnswerIndex];

            return (
              <div 
                key={q.id} 
                className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
              >
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-indigo-500">Q{idx + 1}</span>
                    <span>·</span>
                    <span className="font-medium">{q.subject}</span>
                    <span>·</span>
                    <span>{q.topic}</span>
                  </div>

                  <button
                    onClick={() => toggleSaveQuestion(q)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs border transition-colors cursor-pointer ${
                      isSaved 
                        ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-500 font-semibold' 
                        : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-indigo-500" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                {/* Question Text */}
                <p className="text-sm font-semibold mb-3 leading-relaxed">
                  {q.questionText[appLang]}
                </p>

                {/* Correct Answer Display (Shown to user as requested) */}
                <div className={`p-3 rounded-lg border text-xs mb-3 flex items-center justify-between ${
                  isDark ? 'bg-slate-950/70 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-500 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Correct Answer: Option {correctOptChar} — {correctOptText}</span>
                  </div>
                </div>

                {/* Question Explanation: LOCKED for free users, UNLOCKED for premium! */}
                {isPremium ? (
                  <div className={`p-3 rounded-lg border text-xs space-y-1 ${
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    <span className="text-indigo-500 font-bold block mb-0.5">Step-by-Step Explanation:</span>
                    <p className="leading-relaxed">{q.explanation[appLang]}</p>
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-xl border border-amber-500/30 p-4 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-amber-500">
                          Explanation Locked (Premium One Only)
                        </h4>
                        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Step-by-step shortcuts & teacher solutions require Premium One access.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigateTo('subscription')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>Unlock (₹99 / mo)</span>
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Leaderboard & Top 10 Students */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider mb-0.5">
              <Trophy className="w-4 h-4" />
              <span>Test Leaderboard & Top 10 Rankers</span>
            </div>
            <p className="text-xs text-slate-400">
              Benchmark your score against top national rankers
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 border-b border-slate-700/60 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Accuracy</th>
                <th className="py-2.5 px-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-750 font-mono">
              {TOP_STUDENTS_LEADERBOARD.slice(0, 10).map((student) => (
                <tr key={student.rank} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-400">#{student.rank}</td>
                  <td className="py-2.5 px-3 font-sans font-medium flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-indigo-400 font-bold shrink-0">
                      {student.name.charAt(0)}
                    </div>
                    <span>{student.name}</span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-amber-500">{student.score}</td>
                  <td className="py-2.5 px-3 text-emerald-500">{student.accuracy}%</td>
                  <td className="py-2.5 px-3 text-slate-400">{student.timeTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
