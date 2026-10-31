import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  TestPaper, 
  MistakeItem, 
  Question, 
  TestResult, 
  ExamCategory, 
  ExamType,
  CurrentAffairCard,
  ExamNote,
  LeaderboardStudent,
  PageType,
  ThemeType,
  Course,
  CourseLesson,
  PartnerVendorMe
} from '../types';
import { 
  MOCK_TESTS, 
  INITIAL_MISTAKE_ITEMS, 
  SAMPLE_RECENT_RESULT,
  CURRENT_AFFAIRS_CARDS,
  EXAM_NOTES,
  TOP_STUDENTS_LEADERBOARD,
  ALL_QUESTIONS,
  MOCK_COURSES
} from '../data/mockData';
import { ApiService, API_BASE_URL, getPartnerApiKey, setPartnerApiKey } from '../services/api';

export type NavTab = 'dashboard' | 'test' | 'practice' | 'current_affairs' | 'leaderboard';

interface AppContextType {
  // Navigation & Page State (No popups - full pages)
  currentPage: PageType;
  navigateTo: (page: PageType, payload?: any) => void;
  goBack: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;

  // Theme (Dark / Light / Auto Time-based)
  theme: 'dark' | 'light';
  themePreference: ThemeType;
  toggleTheme: () => void;
  setTheme: (t: ThemeType) => void;

  // Language preference for questions, solutions & content (en / hi)
  appLang: 'en' | 'hi';
  setAppLang: (lang: 'en' | 'hi') => void;

  // User & Auth
  user: UserProfile;
  isAuthenticated: boolean;
  userPhone: string | null;
  loginWithGoogle: () => void;
  logout: () => void;
  submitPhoneNumber: (phone: string) => { success: boolean; message: string };
  updateUserName: (name: string) => void;
  setTargetExam: (exam: ExamType) => void;
  setTargetCategory: (category: ExamCategory) => void;

  // Streak & Coins
  addCoins: (amount: number, reason?: string) => void;
  claimDailyStreak: () => void;
  hasClaimedToday: boolean;

  // Referrals
  simulateReferral: (friendName: string) => void;

  // Subscription & Coins Purchase
  activateSubscription: (plan: 'Monthly' | 'Yearly') => void;
  buyPremiumWithCoins: (plan: 'Monthly' | 'Yearly') => boolean;

  // Tests & Attempt Limits (Free tier: 1 attempt per test)
  tests: TestPaper[];
  selectedTestForDetails: TestPaper | null;
  openTestDetails: (test: TestPaper) => void;
  activeTestPaper: TestPaper | null;
  startTest: (test: TestPaper) => void;
  cancelTest: () => void;
  completeTest: (result: TestResult) => void;
  unlockTestWithCoins: (testId: string) => boolean;
  testAttempts: Record<string, number>;
  canAttemptTest: (testId: string) => { allowed: boolean; reason?: string };

  // Results & History
  currentResult: TestResult | null;
  resultsHistory: TestResult[];
  openTestResult: (result: TestResult) => void;
  openTestAnalysis: (result: TestResult) => void;

  // Mistake Book & Saved Questions
  mistakeItems: MistakeItem[];
  addQuestionToMistakes: (question: Question, testTitle: string, userWrongIndex: number) => void;
  markMistakeMastered: (id: string) => void;
  removeMistake: (id: string) => void;

  savedQuestions: Question[];
  toggleSaveQuestion: (question: Question) => void;
  isQuestionSaved: (questionId: string) => boolean;

  // Practice Mode state (Marking: +1.0 right, -0.33 wrong)
  practiceSubject: string;
  setPracticeSubject: (sub: string) => void;

  // Current Affairs & Notes
  currentAffairs: CurrentAffairCard[];
  selectedCurrentAffair: CurrentAffairCard | null;
  setSelectedCurrentAffair: (ca: CurrentAffairCard | null) => void;
  openCurrentAffairsDetail: (ca: CurrentAffairCard) => void;
  markCurrentAffairRead: (id: string) => void;
  notes: ExamNote[];
  selectedNote: ExamNote | null;
  setSelectedNote: (note: ExamNote | null) => void;
  // Structured Courses & Video Lessons
  courses: Course[];
  selectedCourse: Course | null;
  setSelectedCourse: (c: Course | null) => void;
  selectedLesson: CourseLesson | null;
  setSelectedLesson: (l: CourseLesson | null) => void;
  openCourseDetails: (course: Course) => void;
  openLessonDetails: (course: Course, lesson: CourseLesson) => void;

  // Onboarding Setup Guide Tour
  showOnboardingGuide: boolean;
  completeOnboardingGuide: () => void;
  openOnboardingGuide: () => void;

  // UPSC Zone Partner API (FastAPI backend at api.upsczone.in)
  apiBaseUrl: string;
  partnerApiKey: string;
  updatePartnerApiKey: (key: string) => Promise<boolean>;
  apiStatus: 'connected' | 'unauthorized' | 'ready';
  partnerMe: PartnerVendorMe | null;
  syncWithApi: () => Promise<void>;
  isSyncingApi: boolean;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const REGISTERED_PHONES_KEY = 'orvo_one_registered_phones';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page Routing State (all popups replaced with full dedicated pages)
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [pageHistory, setPageHistory] = useState<PageType[]>(['dashboard']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme State: Dark, Light, or Auto (Time-based: 6am - 6pm Light, 6pm - 6am Dark)
  const [themePreference, setThemePreference] = useState<ThemeType>(() => {
    return (localStorage.getItem('orvo_one_theme') as ThemeType) || 'auto';
  });

  const [currentHour, setCurrentHour] = useState(() => new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const theme: 'dark' | 'light' = themePreference === 'auto'
    ? ((currentHour >= 6 && currentHour < 18) ? 'light' : 'dark')
    : themePreference;

  const setTheme = (t: ThemeType) => {
    setThemePreference(t);
    localStorage.setItem('orvo_one_theme', t);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Onboarding Setup Guide Tour (First-time user guide)
  const [showOnboardingGuide, setShowOnboardingGuide] = useState<boolean>(() => {
    return !localStorage.getItem('orvo_one_onboarding_completed');
  });

  const completeOnboardingGuide = () => {
    localStorage.setItem('orvo_one_onboarding_completed', 'true');
    setShowOnboardingGuide(false);
  };

  const openOnboardingGuide = () => {
    setShowOnboardingGuide(true);
  };

  // Structured Courses State
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(null);

  const openCourseDetails = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
    navigateTo('courses');
  };

  const openLessonDetails = (course: Course, lesson: CourseLesson) => {
    setSelectedCourse(course);
    setSelectedLesson(lesson);
    navigateTo('courses');
  };

  // Language state (Header switch controls whole app questions/solutions)
  const [appLang, setAppLangState] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem('orvo_one_lang') as 'en' | 'hi') || 'en';
  });

  const setAppLang = (lang: 'en' | 'hi') => {
    setAppLangState(lang);
    localStorage.setItem('orvo_one_lang', lang);
    showToast(lang === 'en' ? 'Switched to English' : 'भाषा: हिन्दी');
  };

  // User State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('orvo_one_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      name: 'Rahul Sharma',
      email: 'rahul.aspirant@gmail.com',
      targetExam: 'SSC CGL',
      targetCategory: 'SSC',
      ocCoins: 250,
      streakDays: 5,
      lastActiveDate: new Date().toISOString().split('T')[0],
      isPremium: false,
      referralCode: 'ORVO-RAHUL-78',
      referrals: [
        { id: 'ref-1', friendName: 'Vikas Kumar', date: '25 Oct 2026', coinsAwarded: 50 },
        { id: 'ref-2', friendName: 'Priya Meena', date: '26 Oct 2026', coinsAwarded: 50 }
      ]
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('orvo_one_auth') === 'true';
  });

  const [userPhone, setUserPhone] = useState<string | null>(() => {
    return localStorage.getItem('orvo_one_phone') || '+91 9876543210';
  });

  const [hasClaimedToday, setHasClaimedToday] = useState(false);

  // Tests & Attempt Tracking (Free user can attempt every test 1 time)
  const [tests, setTests] = useState<TestPaper[]>(MOCK_TESTS);
  const [selectedTestForDetails, setSelectedTestForDetails] = useState<TestPaper | null>(MOCK_TESTS[0]);
  const [activeTestPaper, setActiveTestPaper] = useState<TestPaper | null>(null);
  const [currentResult, setCurrentResult] = useState<TestResult | null>(SAMPLE_RECENT_RESULT);
  const [resultsHistory, setResultsHistory] = useState<TestResult[]>([SAMPLE_RECENT_RESULT]);

  const [testAttempts, setTestAttempts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('orvo_one_test_attempts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default: first mock attempted 1 time
    return { 'test-mock-cgl-01': 1 };
  });

  // Mistakes & Saved Questions
  const [mistakeItems, setMistakeItems] = useState<MistakeItem[]>(() => {
    const saved = localStorage.getItem('orvo_one_mistakes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_MISTAKE_ITEMS;
  });

  const [savedQuestions, setSavedQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('orvo_one_saved_questions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [ALL_QUESTIONS[0], ALL_QUESTIONS[7]];
  });

  // Practice State
  const [practiceSubject, setPracticeSubject] = useState<string>('All Subjects');

  // CA & Notes
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffairCard[]>(CURRENT_AFFAIRS_CARDS);
  const [selectedCurrentAffair, setSelectedCurrentAffair] = useState<CurrentAffairCard | null>(CURRENT_AFFAIRS_CARDS[0]);
  const [notes] = useState<ExamNote[]>(EXAM_NOTES);
  const [selectedNote, setSelectedNote] = useState<ExamNote | null>(EXAM_NOTES[0]);

  // UPSC Zone Partner API (FastAPI backend at https://api.upsczone.in)
  const apiBaseUrl = API_BASE_URL;
  const [partnerApiKey, setPartnerApiKeyState] = useState<string>(() => getPartnerApiKey());
  const [apiStatus, setApiStatus] = useState<'connected' | 'unauthorized' | 'ready'>('ready');
  const [partnerMe, setPartnerMe] = useState<PartnerVendorMe | null>(null);
  const [isSyncingApi, setIsSyncingApi] = useState<boolean>(false);

  const syncWithApi = async () => {
    setIsSyncingApi(true);
    try {
      // 1. Check partner account if key is configured
      const me = await ApiService.getPartnerMe();
      if (me) {
        setPartnerMe(me);
        setApiStatus('connected');
      } else if (getPartnerApiKey()) {
        setApiStatus('unauthorized');
      } else {
        setApiStatus('ready');
      }

      // 2. Fetch Test Series
      const testList = await ApiService.getTestSeries(appLang);
      if (testList && testList.length > 0) {
        setTests(testList);
      }

      // 3. Fetch Current Affairs
      const caRes = await ApiService.getCurrentAffairs({ lang: appLang, limit: 30 });
      if (caRes?.articles && caRes.articles.length > 0) {
        setCurrentAffairs(caRes.articles);
      }

      // 4. Fetch GS Courses
      const gsCourses = await ApiService.getGsCourses(appLang);
      if (gsCourses && gsCourses.length > 0) {
        setCourses(gsCourses);
      }
    } catch (e) {
      console.warn('API sync completed with fallback dataset:', e);
    } finally {
      setIsSyncingApi(false);
    }
  };

  const updatePartnerApiKey = async (key: string): Promise<boolean> => {
    setPartnerApiKey(key);
    setPartnerApiKeyState(key);
    try {
      const me = await ApiService.getPartnerMe();
      if (me) {
        setPartnerMe(me);
        setApiStatus('connected');
        showToast(`Connected to UPSC Zone API! Plan: ${me.plan || 'Partner'}`);
        await syncWithApi();
        return true;
      } else {
        setApiStatus(key ? 'unauthorized' : 'ready');
        showToast(key ? 'Invalid API Key. Please verify your uzk_ key.' : 'API Key cleared.');
        return false;
      }
    } catch (e) {
      showToast('Could not verify API key with api.upsczone.in');
      return false;
    }
  };

  // Sync with FastAPI backend on load and language change
  useEffect(() => {
    syncWithApi();
  }, [appLang]);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('orvo_one_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orvo_one_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    if (userPhone) {
      localStorage.setItem('orvo_one_phone', userPhone);
    }
  }, [userPhone]);

  useEffect(() => {
    localStorage.setItem('orvo_one_test_attempts', JSON.stringify(testAttempts));
  }, [testAttempts]);

  useEffect(() => {
    localStorage.setItem('orvo_one_mistakes', JSON.stringify(mistakeItems));
  }, [mistakeItems]);

  useEffect(() => {
    localStorage.setItem('orvo_one_saved_questions', JSON.stringify(savedQuestions));
  }, [savedQuestions]);

  // Page Navigation Handlers
  const navigateTo = (page: PageType, payload?: any) => {
    if (payload) {
      if (page === 'test_details') setSelectedTestForDetails(payload);
      if (page === 'current_affairs_detail') setSelectedCurrentAffair(payload);
      if (page === 'notes' && payload.id) setSelectedNote(payload);
    }
    setPageHistory(prev => [...prev, page]);
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setPageHistory(prev => {
      if (prev.length > 1) {
        const next = [...prev];
        next.pop();
        const lastPage = next[next.length - 1];
        setCurrentPage(lastPage);
        return next;
      }
      setCurrentPage('dashboard');
      return ['dashboard'];
    });
  };

  // Auth Handlers
  const loginWithGoogle = () => {
    setIsAuthenticated(true);
    showToast(`Welcome back, ${user.name}!`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('orvo_one_auth');
    showToast('Logged out successfully.');
  };

  const submitPhoneNumber = (phone: string): { success: boolean; message: string } => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return { success: false, message: 'Mobile number must start with 6, 7, 8, or 9.' };
    }

    let registeredPhones: string[] = [];
    try {
      const stored = localStorage.getItem(REGISTERED_PHONES_KEY);
      if (stored) registeredPhones = JSON.parse(stored);
    } catch (e) {
      registeredPhones = [];
    }

    const dummyUsedNumbers = ['9999999999', '9876543211'];
    if (registeredPhones.includes(cleanPhone) || dummyUsedNumbers.includes(cleanPhone)) {
      return { success: false, message: 'This mobile number is already registered with another account. Please use a unique number.' };
    }

    registeredPhones.push(cleanPhone);
    localStorage.setItem(REGISTERED_PHONES_KEY, JSON.stringify(registeredPhones));
    setUserPhone(`+91 ${cleanPhone}`);
    showToast('Phone verified! +25 oc coins added as welcome bonus 🪙');
    addCoins(25, 'Mobile verification bonus');
    return { success: true, message: 'Phone number verified successfully!' };
  };

  const updateUserName = (name: string) => {
    setUser(prev => ({ ...prev, name }));
    showToast('Profile updated!');
  };

  const setTargetExam = (exam: ExamType) => {
    const isSSC = exam.startsWith('SSC');
    setUser(prev => ({
      ...prev,
      targetExam: exam,
      targetCategory: isSSC ? 'SSC' : 'Railway'
    }));
    showToast(`Target exam set to ${exam}`);
  };

  const setTargetCategory = (category: ExamCategory) => {
    const defaultExam = category === 'SSC' ? 'SSC CGL' : 'RRB NTPC';
    setUser(prev => ({
      ...prev,
      targetCategory: category,
      targetExam: defaultExam
    }));
  };

  const addCoins = (amount: number, reason?: string) => {
    setUser(prev => ({
      ...prev,
      ocCoins: prev.ocCoins + amount
    }));
    if (reason) {
      showToast(`+${amount} oc coins! (${reason})`);
    }
  };

  const claimDailyStreak = () => {
    if (hasClaimedToday) return;
    setHasClaimedToday(true);
    setUser(prev => ({
      ...prev,
      streakDays: prev.streakDays + 1,
      ocCoins: prev.ocCoins + 10
    }));
    showToast('🔥 Streak kept alive! +10 oc coins added');
  };

  const simulateReferral = (friendName: string) => {
    const newRef = {
      id: `ref-${Date.now()}`,
      friendName,
      date: 'Today',
      coinsAwarded: 50
    };
    
    setUser(prev => {
      const updatedReferrals = [...prev.referrals, newRef];
      const qualifiesForPremium = updatedReferrals.length >= 3 && !prev.isPremium;
      return {
        ...prev,
        ocCoins: prev.ocCoins + 50,
        referrals: updatedReferrals,
        isPremium: qualifiesForPremium ? true : prev.isPremium,
        subscriptionPlan: qualifiesForPremium ? 'Monthly' : prev.subscriptionPlan,
        subscriptionValidUntil: qualifiesForPremium ? 'Active (7 Days Free Referral Pass)' : prev.subscriptionValidUntil
      };
    });

    showToast(`🎉 ${friendName} joined! You earned +50 oc coins.`);
  };

  const activateSubscription = (plan: 'Monthly' | 'Yearly') => {
    setUser(prev => ({
      ...prev,
      isPremium: true,
      subscriptionPlan: plan,
      subscriptionValidUntil: plan === 'Monthly' ? 'Active (Valid 30 Days)' : 'Active (Valid 365 Days)'
    }));
    setTests(prev => prev.map(t => ({ ...t, isUnlocked: true })));
    showToast(`🌟 Premium Activated! ${plan} plan is now active.`);
  };

  // Buy Premium with OC Coins as requested (1000 coins for 1 month, 5000 coins for 1 year)
  const buyPremiumWithCoins = (plan: 'Monthly' | 'Yearly'): boolean => {
    const coinCost = plan === 'Monthly' ? 1000 : 5000;
    if (user.ocCoins < coinCost) {
      showToast(`Insufficient coins! Need ${coinCost} oc. Current balance: ${user.ocCoins} oc.`);
      return false;
    }

    setUser(prev => ({
      ...prev,
      ocCoins: prev.ocCoins - coinCost,
      isPremium: true,
      subscriptionPlan: plan,
      subscriptionValidUntil: plan === 'Monthly' ? 'Active (Paid via OC Coins - 30 Days)' : 'Active (Paid via OC Coins - 365 Days)'
    }));
    setTests(prev => prev.map(t => ({ ...t, isUnlocked: true })));
    showToast(`🌟 Premium Unlocked using ${coinCost} oc coins!`);
    return true;
  };

  const openTestResult = (result: TestResult) => {
    setCurrentResult(result);
    navigateTo('result');
  };

  const openTestAnalysis = (result: TestResult) => {
    setCurrentResult(result);
    navigateTo('full_analysis');
  };

  // Test Attempt Verification (Free tier: every test 1 time allowed)
  const canAttemptTest = (testId: string): { allowed: boolean; reason?: string } => {
    const test = tests.find(t => t.id === testId);
    if (!test) return { allowed: false, reason: 'Test not found' };

    // Premium user has unlimited attempts
    if (user.isPremium) return { allowed: true };

    // If test is locked by OC coin cost and not unlocked
    if (test.isPremium && !test.isUnlocked) {
      return { 
        allowed: false, 
        reason: `This premium test requires ${test.ocCost} oc coins or Premium One pass.` 
      };
    }

    // Free user rule: 1 attempt per test allowed!
    const attempts = testAttempts[testId] || 0;
    if (attempts >= 1) {
      return { 
        allowed: false, 
        reason: 'Free tier allows 1 attempt per test. Upgrade to Premium One or unlock re-attempt with 50 oc.' 
      };
    }

    return { allowed: true };
  };

  const openTestDetails = (test: TestPaper) => {
    setSelectedTestForDetails(test);
    navigateTo('test_details');
  };

  const startTest = (test: TestPaper) => {
    const check = canAttemptTest(test.id);
    if (!check.allowed) {
      showToast(check.reason || 'Test attempt restricted.');
      navigateTo('subscription');
      return;
    }

    setActiveTestPaper(test);
    setCurrentPage('exam_player');
  };

  const cancelTest = () => {
    setActiveTestPaper(null);
    setCurrentPage('test');
  };

  const completeTest = (result: TestResult) => {
    setActiveTestPaper(null);
    setCurrentResult(result);
    setResultsHistory(prev => [result, ...prev]);
    addCoins(15, 'Test Completion Reward');

    // Record attempt for this specific test
    setTestAttempts(prev => {
      const updated = {
        ...prev,
        [result.testId]: (prev[result.testId] || 0) + 1
      };
      localStorage.setItem('orvo_one_test_attempts', JSON.stringify(updated));
      return updated;
    });

    // Navigate to core Result screen
    setCurrentPage('result');
  };

  const unlockTestWithCoins = (testId: string): boolean => {
    const targetTest = tests.find(t => t.id === testId);
    if (!targetTest) return false;

    if (user.ocCoins < targetTest.ocCost) {
      showToast(`Need ${targetTest.ocCost} oc coins. Current balance: ${user.ocCoins} oc.`);
      navigateTo('coin_store');
      return false;
    }

    setUser(prev => ({
      ...prev,
      ocCoins: prev.ocCoins - targetTest.ocCost
    }));

    setTests(prev => prev.map(t => t.id === testId ? { ...t, isUnlocked: true } : t));
    showToast(`Unlocked "${targetTest.title}" with ${targetTest.ocCost} oc!`);
    return true;
  };

  const addQuestionToMistakes = (question: Question, testTitle: string, userWrongIndex: number) => {
    const exists = mistakeItems.find(m => m.question.id === question.id);
    if (exists) {
      setMistakeItems(prev => prev.map(m => m.id === exists.id ? { ...m, attemptCount: m.attemptCount + 1 } : m));
      return;
    }

    const newItem: MistakeItem = {
      id: `mstk-${Date.now()}-${question.id}`,
      question,
      testTitle,
      userSelectedWrongIndex: userWrongIndex,
      dateAdded: 'Today',
      attemptCount: 1,
      isMastered: false
    };

    setMistakeItems(prev => [newItem, ...prev]);
  };

  const markMistakeMastered = (id: string) => {
    setMistakeItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isMastered: !item.isMastered };
      }
      return item;
    }));
    addCoins(5, 'Mastered Mistake Question');
    showToast('Question marked mastered! +5 oc awarded 🪙');
  };

  const removeMistake = (id: string) => {
    setMistakeItems(prev => prev.filter(item => item.id !== id));
    showToast('Question removed from Mistake Book');
  };

  const toggleSaveQuestion = (question: Question) => {
    const exists = savedQuestions.some(q => q.id === question.id);
    if (exists) {
      setSavedQuestions(prev => prev.filter(q => q.id !== question.id));
      showToast('Removed from Saved Questions');
    } else {
      setSavedQuestions(prev => [question, ...prev]);
      showToast('Saved to your Bookmarks 🔖');
    }
  };

  const isQuestionSaved = (questionId: string) => {
    return savedQuestions.some(q => q.id === questionId);
  };

  const markCurrentAffairRead = (id: string) => {
    setCurrentAffairs(prev => prev.map(c => c.id === id ? { ...c, isRead: true } : c));
    addCoins(2, 'Read Current Affairs');
  };

  const openCurrentAffairsDetail = (ca: CurrentAffairCard) => {
    setSelectedCurrentAffair(ca);
    markCurrentAffairRead(ca.id);
    navigateTo('current_affairs_detail');
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      navigateTo,
      goBack,
      isMenuOpen,
      setIsMenuOpen,
      theme,
      themePreference,
      toggleTheme,
      setTheme,
      appLang,
      setAppLang,
      user,
      isAuthenticated,
      userPhone,
      loginWithGoogle,
      logout,
      submitPhoneNumber,
      updateUserName,
      setTargetExam,
      setTargetCategory,
      addCoins,
      claimDailyStreak,
      hasClaimedToday,
      simulateReferral,
      activateSubscription,
      buyPremiumWithCoins,
      tests,
      selectedTestForDetails,
      openTestDetails,
      activeTestPaper,
      startTest,
      cancelTest,
      completeTest,
      unlockTestWithCoins,
      testAttempts,
      canAttemptTest,
      currentResult,
      resultsHistory,
      openTestResult,
      openTestAnalysis,
      mistakeItems,
      addQuestionToMistakes,
      markMistakeMastered,
      removeMistake,
      savedQuestions,
      toggleSaveQuestion,
      isQuestionSaved,
      practiceSubject,
      setPracticeSubject,
      currentAffairs,
      selectedCurrentAffair,
      setSelectedCurrentAffair,
      openCurrentAffairsDetail,
      markCurrentAffairRead,
      notes,
      selectedNote,
      setSelectedNote,
      courses,
      selectedCourse,
      setSelectedCourse,
      selectedLesson,
      setSelectedLesson,
      openCourseDetails,
      openLessonDetails,
      showOnboardingGuide,
      completeOnboardingGuide,
      openOnboardingGuide,
      apiBaseUrl,
      partnerApiKey,
      updatePartnerApiKey,
      apiStatus,
      partnerMe,
      syncWithApi,
      isSyncingApi,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
