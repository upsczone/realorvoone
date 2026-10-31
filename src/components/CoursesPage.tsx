import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Video, 
  FileText, 
  Award, 
  ChevronRight,
  Maximize2,
  Volume2,
  Share2,
  Lock,
  Layers
} from 'lucide-react';
import { Course, CourseLesson, SubjectType, ExamCategory } from '../types';

export const CoursesPage: React.FC = () => {
  const { 
    goBack, 
    courses, 
    selectedCourse, 
    setSelectedCourse, 
    selectedLesson, 
    setSelectedLesson,
    navigateTo,
    tests,
    startTest,
    theme,
    appLang,
    showToast,
    user
  } = useApp();

  const isDark = theme === 'dark';

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamFilter, setSelectedExamFilter] = useState<'All' | ExamCategory>('All');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');
  const [filterType, setFilterType] = useState<'All' | 'Free' | 'PRO'>('All');

  // Video player simulator state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'formulas'>('notes');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  // Filtered courses
  const filteredCourses = courses.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.titleHi && c.titleHi.includes(searchQuery)) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesExam = selectedExamFilter === 'All' || c.exam === selectedExamFilter || c.exam === 'Both';
    const matchesSubject = selectedSubjectFilter === 'All' || c.subject === selectedSubjectFilter;
    const matchesAccess = filterType === 'All' || (filterType === 'Free' ? !c.isPro : c.isPro);

    return matchesSearch && matchesExam && matchesSubject && matchesAccess;
  });

  const subjectsList: string[] = [
    'All',
    'Quantitative Aptitude',
    'General Intelligence & Reasoning',
    'General Awareness',
    'General Science'
  ];

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
  };

  const handleSelectLesson = (lesson: CourseLesson) => {
    setSelectedLesson(lesson);
    setIsPlaying(false);
  };

  const handleToggleCompleteLesson = (lessonId: string) => {
    setCompletedLessonIds(prev => 
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
    showToast(completedLessonIds.includes(lessonId) ? 'Lesson marked incomplete' : 'Lesson completed! (+5 XP)');
  };

  const handleStartConnectedQuiz = (quizId?: string) => {
    if (!quizId) {
      navigateTo('test');
      return;
    }
    const testToStart = tests.find(t => t.id === quizId) || tests[0];
    if (testToStart) {
      startTest(testToStart);
    }
  };

  // -------------------------------------------------------------
  // VIEW 3: DETAILED LESSON VIEW
  // -------------------------------------------------------------
  if (selectedCourse && selectedLesson) {
    const isCompleted = completedLessonIds.includes(selectedLesson.id);

    return (
      <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-5xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedLesson(null)}
            className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Lessons ({selectedCourse.title})</span>
          </button>

          <span className="text-xs font-mono font-bold text-amber-500">
            {selectedCourse.examBadge}
          </span>
        </div>

        {/* Video Player Frame Simulation */}
        <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
          isDark ? 'bg-black border-slate-800' : 'bg-slate-950 border-slate-800 text-white'
        }`}>
          {/* Simulated Video Screen */}
          <div className="relative aspect-video w-full bg-gradient-to-tr from-slate-950 via-slate-900 to-[#10192e] flex flex-col justify-between p-4 sm:p-6">
            
            {/* Top Bar of player */}
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 border border-amber-500/30">
                HD 1080p · {selectedLesson.durationMinutes} mins
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => showToast('Lesson link copied!')}
                  className="p-2 rounded-xl bg-black/50 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="flex flex-col items-center justify-center text-center my-auto z-10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
                title={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                <Play className={`w-8 h-8 ${isPlaying ? 'fill-slate-950' : 'ml-1'}`} />
              </button>
              <span className="mt-3 text-xs sm:text-sm font-bold text-white drop-shadow-md">
                {isPlaying ? 'Playing Lecture: 04:12 / ' + selectedLesson.durationMinutes + ':00' : 'Click to Play Lecture'}
              </span>
            </div>

            {/* Bottom Controls Bar */}
            <div className="bg-black/70 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between gap-3 text-xs z-10 text-white">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="font-bold text-amber-400 hover:underline"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <span className="text-slate-400 font-mono text-[11px]">
                  {isPlaying ? '04:12' : '00:00'} / {selectedLesson.durationMinutes}:00
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex-1 max-w-xs h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                <div className={`h-full bg-amber-500 rounded-full ${isPlaying ? 'w-1/4' : 'w-0'} transition-all`} />
              </div>

              <div className="flex items-center gap-2">
                {/* Playback speed selector */}
                {[1, 1.25, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackSpeed(speed);
                      showToast(`Speed: ${speed}x`);
                    }}
                    className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold transition-colors ${
                      playbackSpeed === speed 
                        ? 'bg-amber-500 text-slate-950' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Lesson Title & Completion Action */}
        <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div>
            <span className="text-xs font-mono font-bold text-indigo-500 block mb-1">
              {selectedCourse.subject} · {selectedCourse.instructor}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {appLang === 'hi' && selectedLesson.titleHi ? selectedLesson.titleHi : selectedLesson.title}
            </h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Exam-aligned lesson with verified shortcut approaches and formula derivations
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleToggleCompleteLesson(selectedLesson.id)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500'
                  : isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
            </button>

            {selectedLesson.practiceQuizId && (
              <button
                onClick={() => handleStartConnectedQuiz(selectedLesson.practiceQuizId)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Practice Quiz (+1.0/-0.33)</span>
              </button>
            )}
          </div>
        </div>

        {/* Lesson Notes & Formula Bank Tabs */}
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          {/* Tabs */}
          <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Lecture Notes & Transcript</span>
            </button>

            {selectedLesson.keyFormulas && selectedLesson.keyFormulas.length > 0 && (
              <button
                onClick={() => setActiveTab('formulas')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'formulas'
                    ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/30'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Essential Formula Bank ({selectedLesson.keyFormulas.length})</span>
              </button>
            )}
          </div>

          {/* Tab 1: Transcript */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className={`p-5 rounded-2xl border leading-relaxed text-xs sm:text-sm ${
                isDark ? 'bg-slate-900/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <strong className="block text-indigo-400 font-bold mb-2">Core Theory & Shortcuts:</strong>
                {appLang === 'hi' ? selectedLesson.transcriptHi : selectedLesson.transcriptEn}
              </div>
            </div>
          )}

          {/* Tab 2: Formulas */}
          {activeTab === 'formulas' && selectedLesson.keyFormulas && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedLesson.keyFormulas.map((form, fIdx) => (
                  <div
                    key={fIdx}
                    className={`p-4 rounded-2xl border font-mono text-xs sm:text-sm font-semibold flex items-center gap-3 ${
                      isDark ? 'bg-slate-950 border-amber-500/30 text-amber-300' : 'bg-amber-50/60 border-amber-200 text-amber-900'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold shrink-0">
                      #{fIdx + 1}
                    </span>
                    <span>{form}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: COURSE LESSONS & SYLLABUS VIEW
  // -------------------------------------------------------------
  if (selectedCourse) {
    const totalLessonsCount = selectedCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0);

    return (
      <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-5xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        
        {/* Back to courses list */}
        <button
          onClick={() => setSelectedCourse(null)}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>

        {/* Course Banner Header */}
        <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
          isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  {selectedCourse.examBadge}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {selectedCourse.subject}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {appLang === 'hi' && selectedCourse.titleHi ? selectedCourse.titleHi : selectedCourse.title}
              </h1>
              <p className={`text-xs leading-relaxed max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {appLang === 'hi' ? selectedCourse.descriptionHi : selectedCourse.description}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono shrink-0">
              <div className="text-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] text-slate-400 block">Lessons</span>
                <strong className="text-amber-500 text-base">{totalLessonsCount}</strong>
              </div>
              <div className="text-center p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                <span className="text-[10px] text-slate-400 block">Hours</span>
                <strong className="text-indigo-500 text-base">{selectedCourse.totalDurationHours}h</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Modules & Lessons List */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Course Syllabus & Video Chapters
          </h2>

          {selectedCourse.modules.map((mod, modIdx) => (
            <div
              key={mod.id}
              className={`rounded-3xl border overflow-hidden ${
                isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
                isDark ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs font-mono">
                    {modIdx + 1}
                  </span>
                  <h3 className="font-bold text-sm">
                    {appLang === 'hi' && mod.titleHi ? mod.titleHi : mod.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {mod.lessons.length} Lessons
                </span>
              </div>

              {/* Lessons inside Module */}
              <div className="divide-y divide-slate-800/40">
                {mod.lessons.map((lesson, lIdx) => {
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson)}
                      className={`p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isDark ? 'hover:bg-slate-850' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Play className="w-4 h-4 ml-0.5 fill-amber-500" />}
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm truncate">
                            {appLang === 'hi' && lesson.titleHi ? lesson.titleHi : lesson.title}
                          </h4>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                            <span className="flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.durationMinutes} mins</span>
                            </span>
                            <span>·</span>
                            <span className="text-indigo-400">Video + Formulas</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectLesson(lesson);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Start Lesson
                        </button>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 1: FULL COURSES CATALOG
  // -------------------------------------------------------------
  return (
    <div className={`pb-28 pt-4 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
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

      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDark ? 'bg-[#111726] border-amber-500/30' : 'bg-white border-amber-300 shadow-md'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Structured Courses & Video Lessons</h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Handcrafted syllabus courses for SSC & Railway with lesson transcripts, formulas & quizzes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
            {courses.length} Comprehensive Masterclasses
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-3 ${
        isDark ? 'bg-[#111726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses by topic, syllabus, instructor, or exam..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm border transition-colors outline-none ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-amber-500' 
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500'
            }`}
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Exam Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {(['All', 'SSC', 'Railway'] as const).map((ex) => (
              <button
                key={ex}
                onClick={() => setSelectedExamFilter(ex)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedExamFilter === ex
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : isDark 
                    ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {ex === 'All' ? 'All Exams' : ex}
              </button>
            ))}
          </div>

          {/* Access Filter (All / Free / PRO) */}
          <div className="flex items-center gap-1.5">
            {(['All', 'Free', 'PRO'] as const).map((acc) => (
              <button
                key={acc}
                onClick={() => setFilterType(acc)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterType === acc
                    ? 'bg-indigo-600 text-white'
                    : isDark 
                    ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {acc}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1">
          {subjectsList.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubjectFilter(sub)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedSubjectFilter === sub
                  ? 'bg-amber-500/15 text-amber-500 border border-amber-500/40 font-bold'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Catalog Grid */}
      {filteredCourses.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border ${
          isDark ? 'bg-[#111726] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          <BookOpen className="w-10 h-10 mx-auto text-slate-500 mb-3" />
          <h3 className="font-bold text-base">No courses matched your filters</h3>
          <p className="text-xs mt-1">Try clearing your search query or switching subject filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredCourses.map((course) => {
            return (
              <div
                key={course.id}
                onClick={() => handleSelectCourse(course)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isDark 
                    ? 'bg-[#111726] border-slate-800 hover:border-amber-500/40 hover:bg-[#141b2d]' 
                    : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/30">
                      {course.examBadge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-500 text-[10px]">({course.ratingCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-extrabold tracking-tight group-hover:text-amber-500 transition-colors leading-snug">
                    {appLang === 'hi' && course.titleHi ? course.titleHi : course.title}
                  </h3>

                  {/* Subject & Instructor */}
                  <p className="text-xs font-semibold text-indigo-400 mt-1">
                    {course.subject} · {course.instructor}
                  </p>

                  {/* Description */}
                  <p className={`text-xs mt-2.5 line-clamp-2 leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {appLang === 'hi' ? course.descriptionHi : course.description}
                  </p>
                </div>

                {/* Footer Metrics */}
                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{course.totalDurationHours} hrs</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{course.totalLessons} Lessons</span>
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCourse(course);
                    }}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <span>View Lessons</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
