import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  FileText, 
  Award, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const TestDetailsPage: React.FC = () => {
  const { 
    selectedTestForDetails, 
    startTest, 
    goBack, 
    user, 
    testAttempts, 
    unlockTestWithCoins,
    navigateTo,
    theme,
    addCoins
  } = useApp();

  const isDark = theme === 'dark';
  const test = selectedTestForDetails;

  if (!test) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-slate-400">No test selected.</p>
        <button onClick={goBack} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold">
          Go Back
        </button>
      </div>
    );
  }

  const attemptsUsed = testAttempts[test.id] || 0;
  const isLockedByCoinCost = test.isPremium && !test.isUnlocked && !user.isPremium;
  const hasExhaustedFreeAttempt = !user.isPremium && attemptsUsed >= 1;

  const handleStart = () => {
    startTest(test);
  };

  const handleReattemptWithCoins = () => {
    if (user.ocCoins < 50) {
      navigateTo('coin_store');
      return;
    }
    addCoins(-50, 'Re-attempt unlock');
    startTest(test);
  };

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* Top Navigation */}
      <button
        onClick={goBack}
        className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Tests</span>
      </button>

      {/* Main Test Header Card */}
      <div className={`rounded-3xl border p-6 sm:p-8 shadow-xl relative overflow-hidden ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-indigo-500 uppercase tracking-wider">{test.examType}</span>
              <span className="text-slate-400">·</span>
              <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{test.category.toUpperCase()}</span>
              {test.year && (
                <>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400 font-mono">{test.year}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {test.title}
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {test.description}
            </p>
          </div>

          {/* Quick CTA Container */}
          <div className="shrink-0 flex flex-col gap-2">
            {isLockedByCoinCost ? (
              <button
                onClick={() => unlockTestWithCoins(test.id)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Coins className="w-4 h-4" />
                <span>Unlock for {test.ocCost} oc</span>
              </button>
            ) : hasExhaustedFreeAttempt ? (
              <div className="space-y-2">
                <button
                  onClick={() => navigateTo('subscription')}
                  className="w-full px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Premium (Unlimited)</span>
                </button>
                <button
                  onClick={handleReattemptWithCoins}
                  className="w-full px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Re-attempt (50 oc)</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleStart}
                className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Test Now</span>
              </button>
            )}

            <div className="text-[11px] text-center text-slate-400 font-mono">
              {user.isPremium ? (
                <span className="text-emerald-500 font-semibold">Unlimited Premium Attempts</span>
              ) : (
                <span>Attempts: {attemptsUsed} / 1 Free</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Free Tier Attempt Warning if used */}
      {hasExhaustedFreeAttempt && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">You have completed your 1 Free Attempt for this test</h4>
            <p className="text-slate-300 leading-relaxed">
              In Orvo One free tier, each test paper can be attempted once. Upgrade to <strong>Orvo One Premium</strong> (₹99/mo) for unlimited attempts or use <strong>50 oc coins</strong> to unlock another attempt.
            </p>
          </div>
        </div>
      )}

      {/* Test Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-[11px] text-slate-400 block font-medium">Questions</span>
          <strong className="text-xl font-bold font-mono">{test.totalQuestions} MCQs</strong>
          <span className="text-[10px] text-slate-500 block mt-0.5">Objective format</span>
        </div>

        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-[11px] text-slate-400 block font-medium">Duration</span>
          <strong className="text-xl font-bold font-mono">{test.durationMinutes} Minutes</strong>
          <span className="text-[10px] text-slate-500 block mt-0.5">Strict timer</span>
        </div>

        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-[11px] text-slate-400 block font-medium">Total Marks</span>
          <strong className="text-xl font-bold font-mono">{test.totalMarks} Marks</strong>
          <span className="text-[10px] text-emerald-500 block mt-0.5">+{test.marksPerQuestion} per right</span>
        </div>

        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-[11px] text-slate-400 block font-medium">Negative Marking</span>
          <strong className="text-xl font-bold font-mono text-rose-500">-{test.negativeMarking}</strong>
          <span className="text-[10px] text-slate-500 block mt-0.5">Standard exam penalty</span>
        </div>
      </div>

      {/* Syllabus & Exam Pattern Breakdown */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
          Sectional Pattern & Weightage
        </h3>

        <div className="space-y-3">
          {[
            { section: 'Quantitative Aptitude', questions: 'Arithmetic & Geometry', weightage: 'High' },
            { section: 'General Intelligence & Reasoning', questions: 'Syllogism, Series, Coding-Decoding', weightage: 'High' },
            { section: 'General Awareness & Science', questions: 'Polity, History, Physics, Current Affairs', weightage: 'Moderate' },
            { section: 'English / Science Specific', questions: 'Grammar, Vocabulary & Rail Aptitude', weightage: 'High' },
          ].map((sec, i) => (
            <div key={i} className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <span className="font-bold text-sm block">{sec.section}</span>
                <span className="text-slate-400">{sec.questions}</span>
              </div>
              <span className="font-mono text-indigo-500 font-semibold">{sec.weightage} Priority</span>
            </div>
          ))}
        </div>
      </div>

      {/* CBT Examination Guidelines */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          TCS Computer Based Test (CBT) Instructions
        </h3>
        <ul className="space-y-2 text-xs text-slate-400 leading-relaxed list-disc list-inside">
          <li>The countdown timer at the top right of your screen will show the time remaining to complete the examination.</li>
          <li>Clicking <strong>Save & Next</strong> saves your current answer and advances to the next question.</li>
          <li>Clicking <strong>Mark for Review & Next</strong> flags the question for later re-examination.</li>
          <li>Translation switch in the header allows you to switch between <strong>English</strong> and <strong>हिन्दी</strong> at any time.</li>
          <li>Test automatically evaluates when the timer expires or when you click <strong>Submit Test</strong>.</li>
        </ul>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-between items-center">
        <button
          onClick={goBack}
          className={`px-5 py-2.5 rounded-xl border text-xs font-semibold ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          Cancel & Return
        </button>

        {!hasExhaustedFreeAttempt && !isLockedByCoinCost && (
          <button
            onClick={handleStart}
            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Start Test ({attemptsUsed === 0 ? 'Free Attempt 1/1' : 'Attempt Test'})
          </button>
        )}
      </div>

    </div>
  );
};
