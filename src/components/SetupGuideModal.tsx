import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  Sparkles, 
  Zap, 
  BookMarked, 
  Flame, 
  Coins, 
  X,
  FileCheck2,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ExamType } from '../types';

export const SetupGuideModal: React.FC = () => {
  const { 
    showOnboardingGuide, 
    completeOnboardingGuide, 
    user, 
    setTargetExam, 
    theme,
    appLang
  } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const isDark = theme === 'dark';

  if (!showOnboardingGuide) return null;

  const examsList: ExamType[] = [
    'SSC CGL',
    'SSC CHSL',
    'SSC MTS',
    'RRB NTPC',
    'RRB Group D',
    'RRB ALP'
  ];

  const steps = [
    {
      title: appLang === 'hi' ? 'अपना मुख्य परीक्षा लक्ष्य चुनें' : 'Choose Your Target Exam',
      subtitle: appLang === 'hi' 
        ? 'Orvo One आपके चुने हुए लक्ष्य के अनुसार टेस्ट और प्रैक्टिस को अनुकूलित करता है' 
        : 'Orvo One customizes all tests, notes, and practice for your target exam',
      badge: 'Step 1 of 4',
      icon: <Target className="w-6 h-6 text-indigo-500" />
    },
    {
      title: appLang === 'hi' ? 'CBT टेस्ट सीरीज और 1-फ्री प्रयास नियम' : 'Official CBT Simulator & Free Attempt',
      subtitle: appLang === 'hi'
        ? 'TCS वास्तविक परीक्षा जैसा इंटरफेस और विस्तृत स्कोर कार्ड'
        : 'Real exam hall simulator with instant percentile & rank prediction',
      badge: 'Step 2 of 4',
      icon: <FileCheck2 className="w-6 h-6 text-emerald-500" />
    },
    {
      title: appLang === 'hi' ? '01 रैपिड प्रैक्टिस (+1.0 / -0.33) और OC सिक्के' : '01 Rapid Practice & Earn OC Coins',
      subtitle: appLang === 'hi'
        ? 'नेविगेशन बार का मुख्य 01 बटन: दैनिक 5 महत्वपूर्ण प्रश्न'
        : 'The large 01 center button gives you rapid bite-sized practice daily',
      badge: 'Step 3 of 4',
      icon: <Zap className="w-6 h-6 text-amber-500" />
    },
    {
      title: appLang === 'hi' ? 'मिस्टेक बुक और आज का करेंट अफेयर्स' : 'Mistake Book & Daily Current Affairs',
      subtitle: appLang === 'hi'
        ? 'गलत प्रश्नों को स्वचालित रूप से सहेजें और दोबारा हल करें'
        : 'Turn your exam mistakes into strengths with auto-catalogued errors',
      badge: 'Step 4 of 4',
      icon: <BookMarked className="w-6 h-6 text-rose-500" />
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboardingGuide();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDark ? 'bg-[#0f1422] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
              01
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight">Orvo One Guide</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {steps[currentStep].badge}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={completeOnboardingGuide}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Skip Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="px-5 pt-4 flex gap-1.5">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'bg-amber-500'
                  : idx < currentStep
                  ? 'bg-emerald-500'
                  : isDark
                  ? 'bg-slate-800'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Step Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              {steps[currentStep].icon}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                {steps[currentStep].title}
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {steps[currentStep].subtitle}
              </p>
            </div>
          </div>

          {/* STEP 0: EXAM SELECTION */}
          {currentStep === 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Tap your target exam:
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {examsList.map((ex) => {
                  const isSelected = user.targetExam === ex;
                  return (
                    <button
                      key={ex}
                      onClick={() => setTargetExam(ex)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 text-indigo-500 ring-2 ring-indigo-500/30 font-bold'
                          : isDark
                          ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{ex}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                isDark ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-amber-50/60 border-amber-200/80 text-slate-700'
              }`}>
                💡 <span className="font-semibold">Note:</span> You can switch exams anytime from the header selector or profile menu.
              </div>
            </div>
          )}

          {/* STEP 1: CBT TEST SIMULATOR */}
          {currentStep === 1 && (
            <div className="space-y-3 pt-2">
              <div className={`p-4 rounded-2xl border space-y-2.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-500 font-mono">1-FREE ATTEMPT RULE</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Every full mock test, subject test, and previous year paper can be attempted <strong>1 time for FREE</strong> by any student.
                </p>
                <div className="pt-2 border-t border-slate-800/60 grid grid-cols-2 gap-2 text-[11px]">
                  <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-slate-400 block text-[10px]">Free Tier</span>
                    <strong className="text-emerald-500">1 Full Attempt + Score</strong>
                  </div>
                  <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-slate-400 block text-[10px]">PRO Tier / OC</span>
                    <strong className="text-amber-500">Unlimited + Solutions</strong>
                  </div>
                </div>
              </div>

              <div className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                isDark ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
              }`}>
                🎯 <strong>CBT Controls:</strong> Supports question palette, mark for review, and instant percentile analytics based on 25,000+ real aspirants.
              </div>
            </div>
          )}

          {/* STEP 2: 01 RAPID PRACTICE */}
          {currentStep === 2 && (
            <div className="space-y-3 pt-2">
              <div className={`p-4 rounded-2xl border text-center space-y-2 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500 text-white font-extrabold flex items-center justify-center text-xl shadow-md">
                  01
                </div>
                <h3 className="font-bold text-sm">Exam-Accurate Marking Scheme</h3>
                <div className="flex items-center justify-center gap-3 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/30">
                    Correct: +1.0 Marks
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 font-bold border border-rose-500/30">
                    Wrong: -0.33 Marks
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${
                  isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <Coins className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="block text-slate-200 dark:text-slate-100">+1 OC Coin</strong>
                    <span className="text-[11px] text-slate-400">Per practice completed</span>
                  </div>
                </div>
                <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${
                  isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <Flame className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="block text-slate-200 dark:text-slate-100">Daily Streak</strong>
                    <span className="text-[11px] text-slate-400">Bonus oc every 7 days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MISTAKE BOOK & CURRENT AFFAIRS */}
          {currentStep === 3 && (
            <div className="space-y-3 pt-2">
              <div className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
                  <BookMarked className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">Smart Mistake Book</h4>
                  <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Whenever you make a mistake in any mock test, it is automatically captured here. Review, re-attempt, and mark mastered.
                  </p>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">Today Current Affairs & Static GK</h4>
                  <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Daily bite-sized bilingual cards with static GK connections and 1-click exam practice tests.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
        }`}>
          {currentStep > 0 ? (
            <button
              onClick={handlePrev}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                isDark ? 'border-slate-800 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={completeOnboardingGuide}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors px-2 cursor-pointer"
            >
              Skip
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <span>{currentStep === steps.length - 1 ? 'Start Learning' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </div>
  );
};
