/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MenuDrawer } from './components/MenuDrawer';
import { DashboardView } from './components/DashboardView';
import { TestView } from './components/TestView';
import { PracticeView } from './components/PracticeView';
import { CurrentAffairsView } from './components/CurrentAffairsView';
import { CurrentAffairsDetailPage } from './components/CurrentAffairsDetailPage';
import { LeaderboardView } from './components/LeaderboardView';
import { ExamScreen } from './components/ExamScreen';
import { ResultScreen } from './components/ResultScreen';
import { TestDetailsPage } from './components/TestDetailsPage';
import { FullAnalysisPage } from './components/FullAnalysisPage';
import { MistakeBookPage } from './components/MistakeBookPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { ReferPage } from './components/ReferPage';
import { CoinStorePage } from './components/CoinStorePage';
import { SavedQuestionsPage } from './components/SavedQuestionsPage';
import { NotesPage } from './components/NotesPage';
import { CoursesPage } from './components/CoursesPage';
import { SettingsPage } from './components/SettingsPage';
import { SetupGuideModal } from './components/SetupGuideModal';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    currentPage, 
    activeTestPaper, 
    cancelTest, 
    theme,
    toastMessage
  } = useApp();

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-indigo-600 selection:text-white relative transition-colors duration-200 ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-gradient-to-br from-[#fffdf5] via-[#fffbf0] to-[#fef8e7] text-slate-900'
    }`}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-18 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl border text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 max-w-[90vw] ${
              isDark 
                ? 'bg-slate-900/95 border-indigo-500/40 text-slate-100 shadow-slate-950/80' 
                : 'bg-white/95 border-amber-300 text-slate-900 shadow-amber-500/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Top Header - hidden during live exam player to provide distraction-free TCS CBT experience */}
      {currentPage !== 'exam_player' && <Header />}

      {/* Dynamic Content View - Clean Page-based Routing with zero popups */}
      <main className="flex-1 w-full">
        {currentPage === 'dashboard' && <DashboardView />}
        {currentPage === 'test' && <TestView />}
        {currentPage === 'test_details' && <TestDetailsPage />}
        {currentPage === 'exam_player' && (
          activeTestPaper 
            ? <ExamScreen testPaper={activeTestPaper} onClose={cancelTest} />
            : <TestView />
        )}
        {currentPage === 'result' && <ResultScreen />}
        {currentPage === 'full_analysis' && <FullAnalysisPage />}
        {currentPage === 'practice' && <PracticeView />}
        {currentPage === 'current_affairs' && <CurrentAffairsView />}
        {currentPage === 'current_affairs_detail' && <CurrentAffairsDetailPage />}
        {currentPage === 'leaderboard' && <LeaderboardView />}
        {currentPage === 'mistake_book' && <MistakeBookPage />}
        {currentPage === 'subscription' && <SubscriptionPage />}
        {currentPage === 'refer_earn' && <ReferPage />}
        {currentPage === 'coin_store' && <CoinStorePage />}
        {currentPage === 'saved_questions' && <SavedQuestionsPage />}
        {currentPage === 'notes' && <NotesPage />}
        {currentPage === 'courses' && <CoursesPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>

      {/* Floating Bottom Nav - hidden during live exam player */}
      {currentPage !== 'exam_player' && <BottomNav />}

      {/* First-Time User Setup Guide Modal Tour */}
      <SetupGuideModal />

      {/* Side Menu Drawer */}
      <MenuDrawer />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
