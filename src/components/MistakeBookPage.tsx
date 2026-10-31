import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  BookMarked, 
  CheckCircle2, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const MistakeBookPage: React.FC = () => {
  const { 
    goBack, 
    mistakeItems, 
    markMistakeMastered, 
    removeMistake,
    appLang,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [reattemptOption, setReattemptOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const filteredItems = selectedSubject === 'All'
    ? mistakeItems
    : mistakeItems.filter(m => m.question.subject === selectedSubject);

  const currentItem = filteredItems[activeItemIndex];

  const handleReattempt = (optIdx: number) => {
    setReattemptOption(optIdx);
    setShowExplanation(true);
    if (currentItem && optIdx === currentItem.question.correctAnswerIndex && !currentItem.isMastered) {
      markMistakeMastered(currentItem.id);
    }
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
        <span>Back to Dashboard</span>
      </button>

      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex items-center justify-between gap-4 ${
        isDark ? 'bg-[#111726] border-rose-500/30' : 'bg-white border-rose-200 shadow-md'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center shrink-0">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Mistake Book</h1>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/30">
                {mistakeItems.length} Mistakes
              </span>
            </div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Re-attempt tricky questions and eliminate recurring negative marks
            </p>
          </div>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {['All', 'Quantitative Aptitude', 'General Intelligence & Reasoning', 'General Awareness', 'General Science', 'English Language'].map((sub) => (
          <button
            key={sub}
            onClick={() => {
              setSelectedSubject(sub);
              setActiveItemIndex(0);
              setReattemptOption(null);
              setShowExplanation(false);
            }}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedSubject === sub
                ? 'bg-rose-600 text-white shadow-sm'
                : isDark ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {sub === 'All' ? 'All Subjects' : sub}
          </button>
        ))}
      </div>

      {/* Main Mistake Interactive Card */}
      {filteredItems.length === 0 ? (
        <div className={`p-16 rounded-3xl border text-center flex flex-col items-center justify-center ${
          isDark ? 'bg-[#111726] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mb-3 opacity-90" />
          <h3 className="text-base font-bold">No Mistakes in This Subject!</h3>
          <p className="text-xs mt-1 max-w-sm">
            All questions have either been mastered or you answered them correctly in your tests.
          </p>
        </div>
      ) : (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-750">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-rose-500">{currentItem.question.subject}</span>
              <span>·</span>
              <span>{currentItem.question.topic}</span>
              <span>·</span>
              <span className="font-mono">{currentItem.testTitle}</span>
            </div>

            <span className="font-mono text-slate-400 font-bold">
              {activeItemIndex + 1} of {filteredItems.length}
            </span>
          </div>

          {/* Question Text */}
          <p className="text-base sm:text-lg font-semibold leading-relaxed">
            {currentItem.question.questionText[appLang]}
          </p>

          {/* Re-attempt Options */}
          <div className="space-y-3">
            {currentItem.question.options[appLang].map((opt, idx) => {
              const isSelected = reattemptOption === idx;
              const isCorrect = idx === currentItem.question.correctAnswerIndex;
              const wasOriginallyWrong = idx === currentItem.userSelectedWrongIndex;

              let optStyle = isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
              if (showExplanation) {
                if (isCorrect) optStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-500 font-semibold';
                else if (isSelected) optStyle = 'bg-rose-500/15 border-rose-500 text-rose-500 font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleReattempt(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center font-bold ${
                      isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {wasOriginallyWrong && !showExplanation && (
                    <span className="text-[11px] text-rose-500 font-mono">
                      (Your initial incorrect choice)
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Solution & Mastery Action */}
          {showExplanation && (
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-500">Step-by-Step Solution:</span>
                <button
                  onClick={() => markMistakeMastered(currentItem.id)}
                  className="text-xs text-amber-500 hover:underline font-bold"
                >
                  {currentItem.isMastered ? '✓ Mastered (+5 oc awarded)' : 'Mark as Mastered (+5 oc)'}
                </button>
              </div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {currentItem.question.explanation[appLang]}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-750">
            <button
              onClick={() => removeMistake(currentItem.id)}
              className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove from Book</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setReattemptOption(null);
                  setShowExplanation(false);
                  if (activeItemIndex > 0) setActiveItemIndex(prev => prev - 1);
                }}
                disabled={activeItemIndex === 0}
                className={`px-3.5 py-1.5 text-xs rounded-lg border font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  setReattemptOption(null);
                  setShowExplanation(false);
                  if (activeItemIndex < filteredItems.length - 1) setActiveItemIndex(prev => prev + 1);
                }}
                disabled={activeItemIndex === filteredItems.length - 1}
                className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-lg text-white font-bold cursor-pointer disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
