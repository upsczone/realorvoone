import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  BookmarkCheck, 
  Trash2, 
  Sparkles 
} from 'lucide-react';

export const SavedQuestionsPage: React.FC = () => {
  const { 
    goBack, 
    savedQuestions, 
    toggleSaveQuestion, 
    appLang, 
    theme 
  } = useApp();

  const isDark = theme === 'dark';
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const filtered = selectedSubject === 'All'
    ? savedQuestions
    : savedQuestions.filter(q => q.subject === selectedSubject);

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* Back button */}
      <button
        onClick={goBack}
        className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex items-center justify-between gap-4 ${
        isDark ? 'bg-[#111726] border-indigo-500/30' : 'bg-white border-indigo-200 shadow-md'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 flex items-center justify-center shrink-0">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Saved Questions</h1>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-500 border border-indigo-500/30">
                {savedQuestions.length} Bookmarks
              </span>
            </div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              High-yield questions bookmarked during practice and mock tests
            </p>
          </div>
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {['All', 'Quantitative Aptitude', 'General Intelligence & Reasoning', 'General Awareness', 'General Science', 'English Language'].map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
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

      {/* List */}
      {filtered.length === 0 ? (
        <div className={`p-16 rounded-3xl border text-center flex flex-col items-center justify-center ${
          isDark ? 'bg-[#111726] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <BookmarkCheck className="w-12 h-12 mb-3 opacity-60 text-slate-500" />
          <h3 className="text-base font-bold">No Saved Questions</h3>
          <p className="text-xs mt-1 max-w-xs">
            Save tricky problems while solving mocks or 01 Practice to review them here anytime.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q, idx) => (
            <div 
              key={q.id}
              className={`p-6 rounded-3xl border space-y-3 ${
                isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-750">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-indigo-500">{q.subject}</span>
                  <span>·</span>
                  <span>{q.topic}</span>
                </div>

                <button
                  onClick={() => toggleSaveQuestion(q)}
                  className="text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-semibold leading-relaxed">
                {q.questionText[appLang]}
              </p>

              <div className={`p-3.5 rounded-xl border text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-emerald-500 font-bold block mb-1">
                  Correct Answer: Option {String.fromCharCode(65 + q.correctAnswerIndex)} ({q.options[appLang][q.correctAnswerIndex]})
                </span>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {q.explanation[appLang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
