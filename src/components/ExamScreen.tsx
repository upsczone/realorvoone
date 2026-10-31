import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TestPaper, QuestionStatus, UserAnswerRecord, TestResult, AreaPerformance, RecommendedTest } from '../types';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookmarkCheck, 
  Send,
  X,
  LayoutGrid,
  CheckCircle2,
  RotateCcw,
  Flag,
  Keyboard,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface ExamScreenProps {
  testPaper: TestPaper;
  onClose: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({ testPaper, onClose }) => {
  const { 
    completeTest, 
    addQuestionToMistakes, 
    toggleSaveQuestion, 
    isQuestionSaved,
    appLang,
    theme,
    user
  } = useApp();

  const isDark = theme === 'dark';
  const questions = testPaper.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [questionStatuses, setQuestionStatuses] = useState<Record<string, QuestionStatus>>(() => {
    const init: Record<string, QuestionStatus> = {};
    questions.forEach((q, i) => {
      init[q.id] = i === 0 ? 'not_answered' : 'not_visited';
    });
    return init;
  });

  // Mobile Question Palette Drawer state
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  // Timer countdown
  const [secondsRemaining, setSecondsRemaining] = useState(testPaper.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = questions[currentIndex];
  const currentAnswer = selectedAnswers[currentQ.id] ?? null;
  const currentStatus = questionStatuses[currentQ.id];

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (index: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: index
    }));
  };

  const handleClearResponse = () => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQ.id]: 'not_answered'
    }));
  };

  const handleSaveAndNext = () => {
    const isAnswered = selectedAnswers[currentQ.id] !== undefined && selectedAnswers[currentQ.id] !== null;
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQ.id]: isAnswered ? 'answered' : 'not_answered'
    }));

    if (currentIndex < questions.length - 1) {
      const nextQ = questions[currentIndex + 1];
      if (questionStatuses[nextQ.id] === 'not_visited') {
        setQuestionStatuses(prev => ({ ...prev, [nextQ.id]: 'not_answered' }));
      }
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    const isAnswered = selectedAnswers[currentQ.id] !== undefined && selectedAnswers[currentQ.id] !== null;
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQ.id]: isAnswered ? 'answered_and_marked' : 'marked_for_review'
    }));

    if (currentIndex < questions.length - 1) {
      const nextQ = questions[currentIndex + 1];
      if (questionStatuses[nextQ.id] === 'not_visited') {
        setQuestionStatuses(prev => ({ ...prev, [nextQ.id]: 'not_answered' }));
      }
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    const targetQ = questions[idx];
    if (questionStatuses[targetQ.id] === 'not_visited') {
      setQuestionStatuses(prev => ({ ...prev, [targetQ.id]: 'not_answered' }));
    }
    setCurrentIndex(idx);
    setShowMobilePalette(false);
  };

  // Keyboard navigation for Desktop CBT approach
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if modal is open or user is in input
      if (showSubmitModal) return;

      const key = e.key.toLowerCase();
      if (key === 'n' || e.key === 'ArrowRight') {
        handleSaveAndNext();
      } else if (key === 'p' || e.key === 'ArrowLeft') {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
      } else if (key === 'm') {
        handleMarkForReviewAndNext();
      } else if (key === 'c') {
        handleClearResponse();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIdx = parseInt(e.key, 10) - 1;
        if (optionIdx >= 0 && optionIdx < (currentQ.options[appLang]?.length || 4)) {
          handleSelectOption(optionIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, showSubmitModal, appLang, selectedAnswers]);

  // Submit test calculations
  const handleSubmitTest = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    const userAnswers: UserAnswerRecord[] = [];
    const topicPerformanceMap: Record<string, { topic: string; subject: any; total: number; correct: number }> = {};

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id] ?? null;
      const status = questionStatuses[q.id] || 'not_visited';
      const isAttempted = selected !== null;

      if (!topicPerformanceMap[q.topic]) {
        topicPerformanceMap[q.topic] = {
          topic: q.topic,
          subject: q.subject,
          total: 0,
          correct: 0
        };
      }
      topicPerformanceMap[q.topic].total += 1;

      if (!isAttempted) {
        unattemptedCount += 1;
        userAnswers.push({
          questionId: q.id,
          selectedOptionIndex: null,
          status,
          timeSpentSeconds: 45
        });
      } else {
        const isCorrect = selected === q.correctAnswerIndex;
        if (isCorrect) {
          correctCount += 1;
          topicPerformanceMap[q.topic].correct += 1;
        } else {
          incorrectCount += 1;
          addQuestionToMistakes(q, testPaper.title, selected);
        }
        userAnswers.push({
          questionId: q.id,
          selectedOptionIndex: selected,
          status,
          timeSpentSeconds: 52,
          isCorrect
        });
      }
    });

    // Marks calculation
    const marksFromCorrect = correctCount * testPaper.marksPerQuestion;
    const marksDeducted = incorrectCount * testPaper.negativeMarking;
    const marksObtained = Math.max(0, Number((marksFromCorrect - marksDeducted).toFixed(2)));

    // Accuracy
    const totalAttempted = correctCount + incorrectCount;
    const accuracy = totalAttempted > 0 ? Number(((correctCount / totalAttempted) * 100).toFixed(1)) : 0;

    // Weak & strong analysis
    const weakAreas: AreaPerformance[] = [];
    const strongAreas: AreaPerformance[] = [];

    Object.values(topicPerformanceMap).forEach(tp => {
      const acc = tp.total > 0 ? (tp.correct / tp.total) * 100 : 0;
      if (acc < 50) {
        weakAreas.push({
          topic: tp.topic,
          subject: tp.subject,
          totalQuestions: tp.total,
          correctQuestions: tp.correct,
          accuracy: Number(acc.toFixed(1)),
          status: 'weak'
        });
      } else {
        strongAreas.push({
          topic: tp.topic,
          subject: tp.subject,
          totalQuestions: tp.total,
          correctQuestions: tp.correct,
          accuracy: Number(acc.toFixed(1)),
          status: 'strong'
        });
      }
    });

    const recommendedTests: RecommendedTest[] = [];
    if (weakAreas.length > 0) {
      recommendedTests.push({
        id: `rec-weak-${Date.now()}`,
        title: `${weakAreas[0].topic} Diagnostic Practice`,
        type: 'weak_fix',
        topic: weakAreas[0].topic,
        subject: weakAreas[0].subject,
        questionsCount: 10,
        duration: '10 min'
      });
    }

    if (strongAreas.length > 0) {
      recommendedTests.push({
        id: `rec-strong-${Date.now()}`,
        title: `${strongAreas[0].topic} Advanced Level Challenge`,
        type: 'strong_level_up',
        topic: strongAreas[0].topic,
        subject: strongAreas[0].subject,
        questionsCount: 15,
        duration: '15 min'
      });
    }

    const result: TestResult = {
      id: `res-${Date.now()}`,
      testId: testPaper.id,
      testTitle: testPaper.title,
      examType: testPaper.examType,
      date: 'Just now',
      totalMarks: testPaper.totalMarks,
      score: marksObtained,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracy,
      percentile: Number((88 + (marksObtained / testPaper.totalMarks) * 10).toFixed(1)),
      userRank: Math.max(1, Math.floor(1800 - marksObtained * 35)),
      totalParticipants: testPaper.attemptsCount + 1,
      timeTakenSeconds: testPaper.durationMinutes * 60 - secondsRemaining,
      weakAreas,
      strongAreas,
      recommendedTests,
      mistakeCountAdded: incorrectCount,
      userAnswers
    };

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    completeTest(result);
  };

  // Status counters
  const answeredCount = Object.values(questionStatuses).filter(s => s === 'answered').length;
  const markedCount = Object.values(questionStatuses).filter(s => s === 'marked_for_review' || s === 'answered_and_marked').length;
  const notAnsweredCount = Object.values(questionStatuses).filter(s => s === 'not_answered').length;
  const notVisitedCount = Object.values(questionStatuses).filter(s => s === 'not_visited').length;

  const isSaved = isQuestionSaved(currentQ.id);

  // Helper for Palette JSX
  const renderPaletteContent = () => (
    <div className="flex flex-col h-full">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
        Question Palette Matrix
      </h2>

      {/* Status Legend */}
      <div className={`grid grid-cols-2 gap-2 text-[11px] mb-4 p-3 rounded-2xl border ${
        isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-amber-50/70 border-amber-200/80 text-slate-700'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-[10px]">
            {answeredCount}
          </span>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-rose-600 text-white font-mono font-bold flex items-center justify-center text-[10px]">
            {notAnsweredCount}
          </span>
          <span>Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-purple-600 text-white font-mono font-bold flex items-center justify-center text-[10px]">
            {markedCount}
          </span>
          <span>Marked Review</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-5 h-5 rounded-md font-mono font-bold flex items-center justify-center text-[10px] ${
            isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'
          }`}>
            {notVisitedCount}
          </span>
          <span>Not Visited</span>
        </div>
      </div>

      {/* Question Number Matrix */}
      <div className="grid grid-cols-5 gap-2 flex-1 auto-rows-max overflow-y-auto pr-1">
        {questions.map((q, idx) => {
          const status = questionStatuses[q.id];
          const isCurrent = idx === currentIndex;

          let badgeBg = isDark ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-slate-100 text-slate-700 border border-slate-200';
          if (status === 'answered') badgeBg = 'bg-emerald-600 text-white border border-emerald-500';
          else if (status === 'not_answered') badgeBg = 'bg-rose-600 text-white border border-rose-500';
          else if (status === 'marked_for_review') badgeBg = 'bg-purple-600 text-white border border-purple-500';
          else if (status === 'answered_and_marked') badgeBg = 'bg-purple-600 text-white ring-2 ring-emerald-400';

          return (
            <button
              key={q.id}
              onClick={() => handleJumpToQuestion(idx)}
              className={`h-9 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${badgeBg} ${
                isCurrent ? 'ring-2 ring-amber-500 scale-105 z-10 shadow-sm' : ''
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Quick Exit Action */}
      <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <button
          onClick={onClose}
          className="w-full py-2 text-xs text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
        >
          Exit Test (Discard)
        </button>
      </div>
    </div>
  );

  return (
    <div className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-colors ${
      isDark ? 'bg-[#080c14] text-slate-100' : 'bg-[#f8f9fa] text-slate-900'
    }`}>
      
      {/* 1. Official CBT Header */}
      <header className={`h-14 sm:h-16 border-b px-3 sm:px-6 flex items-center justify-between gap-3 shrink-0 ${
        isDark ? 'bg-[#0e1422] border-slate-800' : 'bg-white border-amber-200 shadow-xs'
      }`}>
        
        {/* Left: Test Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-sm">
            01
          </div>
          <div className="min-w-0">
            <h1 className={`font-bold text-xs sm:text-sm truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {testPaper.title}
            </h1>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span className="font-semibold">{testPaper.examType}</span>
              <span>·</span>
              <span className="text-emerald-500 font-mono font-bold">+{testPaper.marksPerQuestion}</span>
              <span className="text-rose-500 font-mono font-bold">-{testPaper.negativeMarking}</span>
            </div>
          </div>
        </div>

        {/* Right: Mobile Palette Toggle, Timer & Submit */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Mobile Palette Button (Hides palette by default on mobile) */}
          <button
            onClick={() => setShowMobilePalette(true)}
            className={`lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-500/50' 
                : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 shadow-xs'
            }`}
            title="Open Question Palette Matrix"
          >
            <LayoutGrid className="w-4 h-4 text-amber-500" />
            <span className="font-mono">{answeredCount}/{questions.length}</span>
          </button>

          {/* Countdown Timer */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs sm:text-sm font-bold ${
            isDark 
              ? 'bg-slate-900 border-slate-800 text-amber-400' 
              : 'bg-amber-50 border-amber-200 text-amber-700'
          }`}>
            <Clock className="w-4 h-4 text-amber-500" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          {/* Simple Submit Test Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-3 sm:px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer border border-emerald-500 shadow-xs"
          >
            Submit
          </button>
        </div>

      </header>

      {/* 2. Main Question Stage & Desktop Split */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        
        {/* Left Side: Question Canvas */}
        <div className={`flex-1 flex flex-col min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 ${
          isDark ? 'border-r border-slate-800' : 'border-r border-slate-200 bg-white'
        }`}>
          
          {/* Question Subheader */}
          <div className={`flex items-center justify-between pb-3 mb-4 border-b text-xs ${
            isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
          }`}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-indigo-500">Q{currentIndex + 1} of {questions.length}</span>
              <span>·</span>
              <span className="font-medium text-slate-400 hidden xs:inline">{currentQ.subject}</span>
              <span className="hidden xs:inline">·</span>
              <span className="text-amber-500 font-semibold">{currentQ.topic}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveQuestion(currentQ)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border transition-colors cursor-pointer ${
                  isSaved 
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-500 font-semibold' 
                    : isDark 
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' 
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-indigo-500" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span className="hidden xs:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                Marks: +{testPaper.marksPerQuestion}, -{testPaper.negativeMarking}
              </span>
            </div>
          </div>

          {/* Question Body */}
          <div className="mb-6 flex-1">
            <p className={`text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line select-text ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {currentQ.questionText[appLang] || currentQ.questionText.en}
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-3 mb-6">
            {(currentQ.options[appLang] || currentQ.options.en).map((optText, idx) => {
              const isSelected = currentAnswer === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium ring-2 ring-indigo-500/30'
                        : 'bg-amber-500/15 border-amber-500 text-slate-950 font-bold ring-2 ring-amber-500/20'
                      : isDark
                      ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 text-slate-300'
                      : 'bg-slate-50/80 hover:bg-amber-50/40 border-slate-200 text-slate-800'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                    isSelected 
                      ? 'bg-amber-500 text-slate-950' 
                      : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{optText}</span>
                  
                  {/* Desktop Hotkey Indicator badge [1], [2], [3], [4] */}
                  <span className="hidden lg:inline text-[10px] font-mono opacity-50 px-1.5 py-0.5 rounded border border-slate-700">
                    [{idx + 1}]
                  </span>
                </button>
              );
            })}
          </div>

          {/* 
            Desktop CBT Action Bar (Docked right under options, no floating buttons):
            Includes hotkeys [N], [P], [M], [C]
          */}
          <div className={`pt-4 border-t hidden lg:flex items-center justify-between gap-3 shrink-0 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearResponse}
                disabled={currentAnswer === null}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
                <span className="font-mono text-[10px] opacity-60">[C]</span>
              </button>

              <button
                onClick={handleMarkForReviewAndNext}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Mark for Review & Next</span>
                <span className="font-mono text-[10px] opacity-60">[M]</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => currentIndex > 0 && setCurrentIndex(prev => prev - 1)}
                disabled={currentIndex === 0}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
                <span className="font-mono text-[10px] opacity-60">[P]</span>
              </button>

              <button
                onClick={handleSaveAndNext}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-mono text-[10px] opacity-80">[N]</span>
              </button>
            </div>
          </div>

          {/* Desktop Hotkey Assist Footer */}
          <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-500 pt-2 font-mono">
            <Keyboard className="w-3.5 h-3.5 text-slate-400" />
            <span>Fast CBT Navigation: [1-4] Options · [N] Next · [P] Prev · [M] Mark Review · [C] Clear</span>
          </div>

        </div>

        {/* 
          Right Side: Question Palette (Visible on Desktop lg:, Hidden on Mobile)
        */}
        <div className={`hidden lg:flex w-80 lg:w-96 flex-col p-4 sm:p-5 shrink-0 overflow-y-auto ${
          isDark ? 'bg-[#0b0f17] border-l border-slate-800' : 'bg-white border-l border-slate-200 shadow-sm'
        }`}>
          {renderPaletteContent()}
        </div>

      </div>

      {/* Mobile Bottom Thumb Bar (Only visible on mobile screens < lg) */}
      <div className={`lg:hidden p-3 border-t flex items-center justify-between gap-2 shrink-0 ${
        isDark ? 'bg-[#0e1422] border-slate-800' : 'bg-white border-slate-200 shadow-md'
      }`}>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClearResponse}
            disabled={currentAnswer === null}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            Clear
          </button>

          <button
            onClick={handleMarkForReviewAndNext}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-purple-950/40 text-purple-300 border border-purple-500/30 transition-colors cursor-pointer"
          >
            Review
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => currentIndex > 0 && setCurrentIndex(prev => prev - 1)}
            disabled={currentIndex === 0}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            Prev
          </button>

          <button
            onClick={handleSaveAndNext}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 text-slate-950 shadow-md transition-all cursor-pointer"
          >
            Save & Next
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Question Palette Drawer */}
      <AnimatePresence>
        {showMobilePalette && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs lg:hidden">
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setShowMobilePalette(false)} 
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className={`relative w-full max-w-xs sm:max-w-sm h-full border-l flex flex-col p-5 shadow-2xl z-10 overflow-y-auto ${
                isDark ? 'bg-[#0e1422] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-amber-500" />
                  <span className="font-extrabold text-sm">Question Palette</span>
                </div>
                <button
                  onClick={() => setShowMobilePalette(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderPaletteContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Submit Confirmation Dialog */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${
                isDark ? 'bg-[#111726] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <h3 className="text-lg font-bold mb-2">Submit Examination</h3>
              <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Are you sure you want to finish the test? Review your attempt summary below:
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px]">Total Questions</span>
                  <strong className="text-base">{questions.length}</strong>
                </div>
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px]">Answered</span>
                  <strong className="text-emerald-500 text-base">{answeredCount}</strong>
                </div>
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px]">Marked Review</span>
                  <strong className="text-purple-500 text-base">{markedCount}</strong>
                </div>
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px]">Unanswered</span>
                  <strong className="text-rose-500 text-base">{notAnsweredCount + notVisitedCount}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Continue Test
                </button>
                <button
                  onClick={handleSubmitTest}
                  className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Yes, Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
