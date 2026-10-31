import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Newspaper, 
  Sparkles, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  Calendar,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { t } from '../utils/translations';

export const CurrentAffairsView: React.FC = () => {
  const { 
    currentAffairs, 
    markCurrentAffairRead, 
    openTestDetails, 
    openCurrentAffairsDetail,
    tests, 
    theme,
    appLang 
  } = useApp();
  
  const isDark = theme === 'dark';
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredCards = selectedCategory === 'All'
    ? currentAffairs
    : currentAffairs.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[activeCardIndex] || currentAffairs[0];

  const handleNext = () => {
    if (activeCardIndex < filteredCards.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeCardIndex > 0) {
      setActiveCardIndex(prev => prev - 1);
    }
  };

  const caTest = tests.find(t => t.id === 'test-sub-gk-01') || tests[0];

  const title = appLang === 'hi' && currentCard.titleHi ? currentCard.titleHi : currentCard.title;
  const summary = appLang === 'hi' && currentCard.summaryHi ? currentCard.summaryHi : currentCard.summary;
  const takeaway = appLang === 'hi' && currentCard.takeawayHi ? currentCard.takeawayHi : currentCard.takeaway;
  const likelyQuestion = appLang === 'hi' && currentCard.likelyQuestionHi ? currentCard.likelyQuestionHi : currentCard.likelyQuestion;

  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 ${
        isDark ? 'border-slate-800' : 'border-amber-200'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>{appLang === 'hi' ? 'दैनिक परीक्षा डाइजेस्ट' : 'Daily Exam Digest'}</span>
            <span>·</span>
            <span>SSC & Railway Special</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {appLang === 'hi' ? 'आज के करेंट अफेयर्स' : 'Today\'s Current Affairs'}
          </h1>
        </div>

        {/* Start CA Test Button */}
        <button
          onClick={() => openTestDetails(caTest)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>{appLang === 'hi' ? 'करेंट अफेयर्स टेस्ट दें' : 'Start CA Speed Test'}</span>
        </button>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {['All', 'National', 'Science & Tech', 'Economy', 'Railway', 'Sports'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveCardIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : isDark 
                  ? 'bg-slate-900 text-slate-400 hover:text-white border-slate-800' 
                  : 'bg-white text-slate-700 hover:text-slate-900 border-amber-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Flashcard View */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all ${
              isDark 
                ? 'bg-[#111726] border-slate-800' 
                : 'bg-gradient-to-br from-[#fffdf5] via-[#fff9e6] to-[#ffecb3] border-amber-300 shadow-amber-500/10'
            }`}
          >
            {/* Top row */}
            <div className={`flex items-center justify-between text-xs pb-3 border-b mb-4 ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-amber-200/70 text-slate-500'
            }`}>
              <div className="flex items-center gap-2">
                <span className="font-bold text-rose-500">{currentCard.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{currentCard.date}</span>
                </span>
                <span>·</span>
                <span>{currentCard.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                {currentCard.isRead && (
                  <span className="text-emerald-500 flex items-center gap-1 text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Read</span>
                  </span>
                )}
                <span className="font-mono text-slate-400 text-xs">
                  {activeCardIndex + 1} of {filteredCards.length}
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-extrabold mb-4 leading-snug">
              {title}
            </h2>

            {/* Summary */}
            <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              {summary}
            </p>

            {/* High-Yield Exam Takeaway Box */}
            <div className={`p-4 rounded-2xl border mb-4 ${
              isDark 
                ? 'bg-slate-900/90 border-amber-500/30 text-amber-300' 
                : 'bg-amber-100/70 border-amber-300 text-amber-950 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="uppercase tracking-wider text-[11px]">
                  {appLang === 'hi' ? 'परीक्षा हेतु मुख्य तथ्य (Takeaway)' : 'Exam High-Yield Takeaway'}
                </span>
              </div>
              <p className="text-xs font-mono leading-relaxed">
                {takeaway}
              </p>
            </div>

            {/* Expected Question Box */}
            <div className={`p-4 rounded-2xl border text-xs mb-6 ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white/80 border-amber-200 text-slate-700'
            }`}>
              <div className="flex items-center gap-2 text-indigo-500 font-bold mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>{appLang === 'hi' ? 'संभावित परीक्षा प्रश्न' : 'Probable Exam Question'}</span>
              </div>
              <p className="italic">
                "{likelyQuestion}"
              </p>
            </div>

            {/* Primary Action Button: Read Full In-Depth Details */}
            <div className="mb-6">
              <button
                onClick={() => openCurrentAffairsDetail(currentCard)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>{appLang === 'hi' ? 'पूरा विस्तृत विश्लेषण पढ़ें' : 'Read Full In-Depth Analysis & Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card Footer Actions */}
            <div className={`flex items-center justify-between pt-4 border-t ${
              isDark ? 'border-slate-800' : 'border-amber-200/70'
            }`}>
              <button
                onClick={() => markCurrentAffairRead(currentCard.id)}
                disabled={currentCard.isRead}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentCard.isRead 
                    ? 'text-slate-400' 
                    : 'text-indigo-500 hover:text-indigo-600 bg-indigo-500/10'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{currentCard.isRead ? (appLang === 'hi' ? 'पढ़ा हुआ' : 'Completed') : (appLang === 'hi' ? 'पढ़ा हुआ मार्क करें (+2 oc)' : 'Mark as Read (+2 oc)')}</span>
              </button>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={activeCardIndex === 0}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-amber-200 text-slate-700 shadow-xs'
                  }`}
                  aria-label="Previous card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeCardIndex === filteredCards.length - 1}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-amber-200 text-slate-700 shadow-xs'
                  }`}
                  aria-label="Next card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
