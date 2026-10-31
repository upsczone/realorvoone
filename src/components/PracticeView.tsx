import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_QUESTIONS } from '../data/mockData';
import { ApiService } from '../services/api';
import { 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';

export const PracticeView: React.FC = () => {
  const { 
    addCoins, 
    user, 
    toggleSaveQuestion, 
    isQuestionSaved, 
    addQuestionToMistakes,
    showToast,
    appLang,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [questionsList, setQuestionsList] = useState<Question[]>(ALL_QUESTIONS);

  useEffect(() => {
    let mounted = true;
    ApiService.getQuestions({ lang: appLang, limit: 50 }).then(res => {
      if (mounted && res.questions && res.questions.length > 0) {
        setQuestionsList(res.questions);
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, [appLang]);
  
  // Exact Exam Marking: +1.0 for Right, -0.33 for Wrong as requested
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const netScore = Math.max(0, Number((correctCount * 1.0 - wrongCount * 0.33).toFixed(2)));
  const solvedCount = correctCount + wrongCount;

  // Subject filtering
  const filteredQuestions = selectedSubject === 'All' 
    ? questionsList 
    : questionsList.filter(q => q.subject === selectedSubject);

  const currentQ: Question = filteredQuestions[currentIndex] || questionsList[0] || ALL_QUESTIONS[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswerIndex;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      addCoins(1, 'Correct Practice (+1.0 Mark)');
    } else {
      setWrongCount(prev => prev + 1);
      addQuestionToMistakes(currentQ, '01 Rapid Practice', idx);
      showToast('Wrong! -0.33 Negative. Added to Mistake Book 📕');
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const isSaved = isQuestionSaved(currentQ.id);

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* 1. Practice Mode Top Banner */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border shadow-lg ${
        isDark 
          ? 'bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 border-indigo-500/30' 
          : 'bg-gradient-to-r from-indigo-50 via-white to-cyan-50 border-indigo-200'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white font-black flex items-center justify-center text-xl shadow-md shrink-0">
            01
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight">01 Rapid Practice</h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-500/20 text-indigo-500 rounded-sm font-mono">
                +1.0 / -0.33 Negative
              </span>
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Exam marking scheme · +1 for right, -0.33 negative marking
            </p>
          </div>
        </div>

        {/* Live Score Counter with Exam Marking (+1.0, -0.33) */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <span>Score:</span>
            <strong className="text-emerald-500 font-bold">{netScore}</strong>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-500">+{correctCount}</span>
            <span className="text-rose-500">-{wrongCount}</span>
          </div>

          <div className={`px-2.5 py-1.5 rounded-xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            <span>Solved: <strong>{solvedCount}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Subject Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {['All', 'Quantitative Aptitude', 'General Intelligence & Reasoning', 'General Awareness', 'General Science', 'English Language'].map((sub) => (
          <button
            key={sub}
            onClick={() => {
              setSelectedSubject(sub);
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedSubject === sub
                ? 'bg-indigo-600 text-white shadow-sm'
                : isDark ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {sub === 'All' ? 'All Subjects' : sub}
          </button>
        ))}
      </div>

      {/* 3. Question Card */}
      <div className={`rounded-3xl border p-6 md:p-8 shadow-xl relative ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-750 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-indigo-500">{currentQ.subject}</span>
            <span>·</span>
            <span>{currentQ.topic}</span>
            <span>·</span>
            <span className="font-mono">{currentQ.difficulty}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveQuestion(currentQ)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-500' 
                  : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
              title={isSaved ? 'Bookmarked' : 'Save question'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-indigo-500" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <span className="font-mono text-slate-400 text-xs">
              Q {currentIndex + 1} of {filteredQuestions.length}
            </span>
          </div>
        </div>

        {/* Question Text (controlled smoothly by header appLang) */}
        <div className="mb-6">
          <p className="text-base sm:text-lg font-semibold leading-relaxed whitespace-pre-line">
            {currentQ.questionText[appLang]}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options[appLang].map((optText, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswerIndex;
            
            let btnStyle = isDark ? 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 text-slate-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
            
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-500 font-semibold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-500 font-semibold';
              } else {
                btnStyle = 'opacity-50 border-transparent';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer disabled:cursor-default ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono ${
                    isSelected ? 'bg-indigo-600 text-white' : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{optText}</span>
                </div>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation when Answered */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-5 border-t border-slate-750"
            >
              <div className={`p-4 rounded-xl border mb-4 text-xs ${
                selectedOption === currentQ.correctAnswerIndex 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {selectedOption === currentQ.correctAnswerIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Correct! +1.0 Mark (+2 oc awarded)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>Incorrect! -0.33 Penalty (Saved to Mistake Book)</span>
                    </>
                  )}
                </div>
                <div className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <strong className="block mb-0.5">Step-by-step Solution:</strong>
                  {currentQ.explanation[appLang]}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setIsAnswered(false);
                  }}
                  className={`px-3 py-2 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-white hover:bg-slate-850' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-try Question</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};
