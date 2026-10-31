import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Play,
  Layers,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../utils/translations';

export const CurrentAffairsDetailPage: React.FC = () => {
  const { 
    selectedCurrentAffair, 
    goBack, 
    navigateTo, 
    appLang, 
    theme, 
    openTestDetails, 
    tests, 
    addCoins, 
    showToast,
    toggleSaveQuestion,
    isQuestionSaved
  } = useApp();

  const isDark = theme === 'dark';
  const ca = selectedCurrentAffair;

  // Interactive Question State
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  if (!ca) {
    return (
      <div className="p-12 text-center">
        <p className="text-slate-400 text-sm">No current affair article selected.</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          {t('back', appLang)}
        </button>
      </div>
    );
  }

  const title = appLang === 'hi' && ca.titleHi ? ca.titleHi : ca.title;
  const summary = appLang === 'hi' && ca.summaryHi ? ca.summaryHi : ca.summary;
  const takeaway = appLang === 'hi' && ca.takeawayHi ? ca.takeawayHi : ca.takeaway;
  const fullArticle = ca.fullArticle ? (appLang === 'hi' ? ca.fullArticle.hi : ca.fullArticle.en) : summary;
  const bulletPoints = ca.bulletPoints ? (appLang === 'hi' ? ca.bulletPoints.hi : ca.bulletPoints.en) : [];
  const staticGk = ca.staticGk ? (appLang === 'hi' ? ca.staticGk.hi : ca.staticGk.en) : [];
  const question = ca.practiceQuestion;

  const handleSelectQuizOption = (idx: number) => {
    if (hasAnswered || !question) return;
    setSelectedOpt(idx);
    setHasAnswered(true);

    if (idx === question.correctAnswerIndex) {
      addCoins(1, 'Current Affairs MCQ (+1 oc coin)');
      showToast('Correct! +1 oc coin earned 🪙');
    } else {
      showToast('Incorrect answer. Review the explanation below!');
    }
  };

  const caTest = tests.find(t => t.id === 'test-sub-gk-01') || tests[0];

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer py-1.5 px-3 rounded-xl border ${
            isDark 
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700' 
              : 'bg-white border-amber-200/80 text-amber-900 hover:bg-amber-50 shadow-xs'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('back', appLang)}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
            isDark 
              ? 'bg-slate-900/80 border-slate-800 text-indigo-400' 
              : 'bg-amber-100/60 border-amber-300 text-amber-800 font-bold'
          }`}>
            {ca.category}
          </span>
          <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{ca.readTime}</span>
          </span>
        </div>
      </div>

      {/* Hero Header Card with Golden Gradient in Light Mode */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-br from-[#fffdf5] via-[#fff8e7] to-[#fef0cd] border-amber-300 shadow-amber-500/10'
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{ca.date}</span>
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-[11px] font-bold text-amber-500">
            SSC & Railway Exam Capsule
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-snug">
          {title}
        </h1>

        {/* Key Exam Takeaway Banner */}
        <div className={`mt-5 p-4 rounded-2xl border flex items-start gap-3 ${
          isDark 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
            : 'bg-amber-100/70 border-amber-300 text-amber-950 shadow-xs'
        }`}>
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-medium leading-relaxed">
            <strong className="font-extrabold block mb-0.5 text-amber-500 uppercase tracking-wider text-[11px]">
              {appLang === 'hi' ? 'परीक्षा में सीधा पूछा जाने वाला तथ्य (Takeaway):' : 'Key Exam Takeaway:'}
            </strong>
            <span>{takeaway}</span>
          </div>
        </div>
      </div>

      {/* Main Full Article Body */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
        isDark 
          ? 'bg-[#101625] border-slate-800' 
          : 'bg-white border-amber-200/70 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800/60">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {appLang === 'hi' ? 'विस्तृत विश्लेषण एवं परीक्षा परिप्रेक्ष्य' : 'In-Depth Analysis & Exam Perspective'}
          </h2>
        </div>

        <div className="prose prose-invert max-w-none">
          {fullArticle.split('\n\n').map((para, i) => (
            <p key={i} className={`text-sm sm:text-base leading-relaxed mb-4 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {para}
            </p>
          ))}
        </div>

        {/* High-Yield Bullet Points */}
        {bulletPoints.length > 0 && (
          <div className={`mt-6 p-5 rounded-2xl border ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-amber-50/50 border-amber-200'
          }`}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{appLang === 'hi' ? 'परीक्षा हेतु मुख्य बुलेट बिंदु' : 'High-Yield Bullet Facts for Mocks'}</span>
            </h3>
            <ul className="space-y-2.5">
              {bulletPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Static GK Matrix (Crucial for SSC & Railway) */}
        {staticGk.length > 0 && (
          <div className={`mt-6 p-5 rounded-2xl border ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>{appLang === 'hi' ? 'संबंधित स्टैटिक जीके (Static GK Capsule)' : 'Connected Static GK Capsule'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {staticGk.map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-[#0d1320] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <span className={`block text-[11px] font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {item.label}
                  </span>
                  <span className={`block text-xs mt-0.5 leading-snug ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Model Exam Practice Question on this Topic */}
      {question && (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg ${
          isDark ? 'bg-[#101625] border-slate-800' : 'bg-white border-amber-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                01
              </span>
              <h3 className="text-sm font-extrabold">
                {appLang === 'hi' ? 'इस विषय पर संभावित परीक्षा प्रश्न' : 'Practice Exam MCQ on this Topic'}
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
              +1 Coin Reward
            </span>
          </div>

          <p className="text-sm sm:text-base font-semibold leading-relaxed mb-4">
            {question.questionText[appLang]}
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options[appLang].map((optText, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === question.correctAnswerIndex;
              let style = isDark 
                ? 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 text-slate-200' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

              if (hasAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-500/20 border-emerald-500 text-emerald-500 font-bold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-500/20 border-rose-500 text-rose-500 font-bold';
                } else {
                  style = 'opacity-50 border-transparent';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectQuizOption(idx)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer disabled:cursor-default ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono ${
                      isSelected ? 'bg-indigo-600 text-white' : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{optText}</span>
                  </div>

                  {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {hasAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                </button>
              );
            })}
          </div>

          {/* Explanation banner if answered */}
          {hasAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-750' : 'bg-amber-50/70 border-amber-200 text-slate-800'
              }`}
            >
              <strong className="text-indigo-500 block mb-1">
                {appLang === 'hi' ? 'उत्तर एवं व्याख्या:' : 'Explanation:'}
              </strong>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                {question.explanation[appLang]}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Action Footer: Take CA Test */}
      <div className={`p-5 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isDark ? 'bg-[#0d1320] border-slate-800' : 'bg-white border-amber-200 shadow-sm'
      }`}>
        <div>
          <h4 className="font-bold text-sm">
            {appLang === 'hi' ? 'दैनिक करेंट अफेयर्स टेस्ट दें' : 'Attempt Daily Current Affairs Test'}
          </h4>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {appLang === 'hi' ? '10 प्रश्न · 10 मिनट · वास्तविक परीक्षा पैटर्न' : '10 Questions · 10 Minutes · Real exam pattern'}
          </p>
        </div>

        <button
          onClick={() => openTestDetails(caTest)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{t('takeCaTest', appLang)}</span>
        </button>
      </div>

    </div>
  );
};
