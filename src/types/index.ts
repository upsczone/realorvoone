export type ExamCategory = 'SSC' | 'Railway';

export type ExamType = 
  | 'SSC CGL' 
  | 'SSC CHSL' 
  | 'SSC MTS' 
  | 'SSC GD' 
  | 'SSC CPO' 
  | 'RRB NTPC' 
  | 'RRB Group D' 
  | 'RRB ALP' 
  | 'RRB JE';

export type SubjectType = 
  | 'Quantitative Aptitude' 
  | 'General Intelligence & Reasoning' 
  | 'General Awareness' 
  | 'English Language' 
  | 'General Science';

export type ThemeType = 'dark' | 'light' | 'auto';

export type PageType = 
  | 'dashboard' 
  | 'test' 
  | 'practice' 
  | 'current_affairs' 
  | 'current_affairs_detail'
  | 'leaderboard'
  | 'test_details'
  | 'exam_player'
  | 'result'
  | 'full_analysis'
  | 'mistake_book'
  | 'subscription'
  | 'refer_earn'
  | 'coin_store'
  | 'saved_questions'
  | 'notes'
  | 'courses'
  | 'settings';

export type TestCategory = 'subject' | 'mock' | 'pyq' | 'exambased';

export type QuestionStatus = 
  | 'not_visited' 
  | 'not_answered' 
  | 'answered' 
  | 'marked_for_review' 
  | 'answered_and_marked';

export interface Question {
  id: string;
  subject: SubjectType;
  topic: string;
  exam: ExamType | 'General';
  year?: string;
  questionText: {
    en: string;
    hi: string;
  };
  options: {
    en: string[];
    hi: string[];
  };
  correctAnswerIndex: number;
  explanation: {
    en: string;
    hi: string;
  };
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface TestPaper {
  id: string;
  title: string;
  description: string;
  category: TestCategory;
  examType: ExamType;
  subject?: SubjectType;
  totalQuestions: number;
  durationMinutes: number;
  totalMarks: number;
  negativeMarking: number; // e.g., 0.50
  marksPerQuestion: number; // e.g., 2
  isPremium: boolean;
  ocCost: number; // OC coins required to unlock if free/not subscribed
  isUnlocked?: boolean;
  questions: Question[];
  attemptsCount: number;
  year?: string;
  shift?: string;
}

export interface UserAnswerRecord {
  questionId: string;
  selectedOptionIndex: number | null;
  status: QuestionStatus;
  timeSpentSeconds: number;
  isCorrect?: boolean;
}

export interface AreaPerformance {
  topic: string;
  subject: SubjectType;
  totalQuestions: number;
  correctQuestions: number;
  accuracy: number; // percentage
  status: 'weak' | 'strong' | 'neutral';
}

export interface RecommendedTest {
  id: string;
  title: string;
  type: 'weak_fix' | 'strong_level_up';
  topic: string;
  subject: SubjectType;
  questionsCount: number;
  duration: string;
}

export interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  examType: ExamType;
  date: string;
  totalMarks: number;
  score: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracy: number; // percentage
  percentile: number;
  userRank: number;
  totalParticipants: number;
  timeTakenSeconds: number;
  weakAreas: AreaPerformance[];
  strongAreas: AreaPerformance[];
  recommendedTests: RecommendedTest[];
  mistakeCountAdded: number;
  userAnswers: UserAnswerRecord[];
}

export interface TestRanker {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  timeTaken: string;
  isCurrentUser?: boolean;
  stateOrCity?: string;
}

export interface PartnerVendorMe {
  id: string;
  name: string;
  company: string;
  status: string;
  scopes: string[];
  plan: string;
  period: string;
  total_calls: number;
  free_calls: number;
  billable_calls: number;
  hard_cap_calls: number;
  rate_limit_per_min: number;
}

export interface LeaderboardStudent {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  timeTaken: string;
  exam: ExamType;
  isCurrentUser?: boolean;
}

export interface CurrentAffairCard {
  id: string;
  title: string;
  titleHi?: string;
  date: string;
  category: 'National' | 'International' | 'Economy' | 'Science & Tech' | 'Sports' | 'Appointments' | 'Railway' | 'Defense';
  summary: string;
  summaryHi?: string;
  takeaway: string;
  takeawayHi?: string;
  likelyQuestion: string;
  likelyQuestionHi?: string;
  readTime: string;
  isRead?: boolean;
  // Full Details Fields
  fullArticle?: {
    en: string;
    hi: string;
  };
  bulletPoints?: {
    en: string[];
    hi: string[];
  };
  staticGk?: {
    en: { label: string; value: string }[];
    hi: { label: string; value: string }[];
  };
  practiceQuestion?: Question;
}

export interface ExamNote {
  id: string;
  title: string;
  subject: SubjectType;
  exam: ExamType | 'All One Day Exams';
  readTime: string;
  summary: string;
  keyPoints: string[];
  formulaList?: string[];
}

export interface MistakeItem {
  id: string;
  question: Question;
  testTitle: string;
  userSelectedWrongIndex: number;
  dateAdded: string;
  attemptCount: number;
  isMastered: boolean;
  userNotes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  targetExam: ExamType;
  targetCategory: ExamCategory;
  ocCoins: number;
  streakDays: number;
  lastActiveDate: string;
  isPremium: boolean;
  subscriptionPlan?: 'Monthly' | 'Yearly';
  subscriptionValidUntil?: string;
  referralCode: string;
  referrals: {
    id: string;
    friendName: string;
    date: string;
    coinsAwarded: number;
  }[];
}

export interface CourseLesson {
  id: string;
  title: string;
  titleHi?: string;
  durationMinutes: number;
  type: 'video' | 'pdf' | 'quiz';
  videoPreviewUrl?: string;
  transcriptEn: string;
  transcriptHi: string;
  keyFormulas?: string[];
  practiceQuizId?: string;
  isCompleted?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  titleHi?: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  titleHi?: string;
  exam: ExamCategory | 'Both';
  examBadge: string;
  subject: SubjectType;
  instructor: string;
  rating: number;
  ratingCount: number;
  enrolledCount: number;
  totalDurationHours: number;
  totalLessons: number;
  isPro: boolean;
  ocCost: number;
  gradient: string;
  description: string;
  descriptionHi: string;
  modules: CourseModule[];
}
