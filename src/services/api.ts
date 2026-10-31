/**
 * UPSC Zone Partner & One-Day API Client Service for Orvo One
 * Connects to UPSC Zone Partner API (FastAPI backend) with Base URL: https://api.upsczone.in
 * Open API 3.1 Spec: /partner/openapi.json
 * Supports Bearer token and X-API-Key authentication (uzk_...)
 */

import { 
  TestPaper, 
  Question, 
  TestResult, 
  CurrentAffairCard, 
  LeaderboardStudent, 
  TestRanker,
  PartnerVendorMe,
  Course,
  ExamNote,
  UserProfile
} from '../types';
import { 
  MOCK_TESTS, 
  ALL_QUESTIONS, 
  CURRENT_AFFAIRS_CARDS, 
  TOP_STUDENTS_LEADERBOARD,
  MOCK_COURSES,
  EXAM_NOTES
} from '../data/mockData';

// Base URL: https://api.upsczone.in
export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'https://api.upsczone.in';

// Helper to get partner API key from localStorage or environment
export function getPartnerApiKey(): string {
  return localStorage.getItem('orvo_one_partner_api_key') || 
         (import.meta as any).env?.VITE_UPSCZONE_API_KEY || 
         (import.meta as any).env?.VITE_PARTNER_API_KEY || 
         '';
}

export function setPartnerApiKey(key: string): void {
  localStorage.setItem('orvo_one_partner_api_key', key.trim());
}

// Low-level HTTP request helper
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}, 
  fallbackData?: T
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const apiKey = getPartnerApiKey();
  const token = localStorage.getItem('orvo_one_auth_token') || apiKey;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (apiKey) {
    headers['X-API-Key'] = apiKey;
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[api.upsczone.in] ${endpoint} returned status ${response.status}`);
      if (fallbackData !== undefined) {
        return fallbackData;
      }
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.info(`[api.upsczone.in] Request ${endpoint} fallback:`, error);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw error;
  }
}

// Transform raw questions from Partner API to internal Question model
function normalizeQuestion(raw: any, index: number): Question {
  const id = raw.id || raw.question_id || `q-api-${index}`;
  const questionTextEn = raw.question_text?.en || raw.question_en || raw.text || raw.question || 'Question text';
  const questionTextHi = raw.question_text?.hi || raw.question_hi || raw.text_hi || questionTextEn;

  // Options normalization
  let rawOptions = raw.options || [];
  let optionsEn: string[] = [];
  let optionsHi: string[] = [];

  if (Array.isArray(rawOptions)) {
    if (typeof rawOptions[0] === 'object' && rawOptions[0] !== null) {
      optionsEn = rawOptions.map((o: any) => o.text_en || o.en || o.text || String(o));
      optionsHi = rawOptions.map((o: any) => o.text_hi || o.hi || o.text || String(o));
    } else {
      optionsEn = rawOptions.map(String);
      optionsHi = raw.options_hi ? raw.options_hi.map(String) : optionsEn;
    }
  }

  if (optionsEn.length === 0) {
    optionsEn = ['Option A', 'Option B', 'Option C', 'Option D'];
    optionsHi = ['विकल्प A', 'विकल्प B', 'विकल्प C', 'विकल्प D'];
  }

  const correctAnswerIndex = typeof raw.correct_option === 'number' 
    ? raw.correct_option 
    : typeof raw.correct_answer === 'number' 
    ? raw.correct_answer 
    : typeof raw.correctAnswerIndex === 'number' 
    ? raw.correctAnswerIndex 
    : 0;

  return {
    id,
    subject: raw.subject || raw.subject_name || 'General Awareness',
    topic: raw.topic || raw.topic_name || 'General Knowledge',
    exam: raw.exam || 'SSC CGL',
    difficulty: raw.difficulty || 'Medium',
    year: raw.year ? String(raw.year) : undefined,
    questionText: {
      en: questionTextEn,
      hi: questionTextHi
    },
    options: {
      en: optionsEn,
      hi: optionsHi
    },
    correctAnswerIndex,
    explanation: {
      en: raw.explanation?.en || raw.explanation_en || raw.explanation || 'Detailed solution provided on ORVO One PRO.',
      hi: raw.explanation?.hi || raw.explanation_hi || raw.explanation_hi || 'ओर्वो वन प्रो पर विस्तृत व्याख्या उपलब्ध है।'
    }
  };
}

// Transform raw test series from Partner API
function normalizeTestPaper(raw: any, index: number): TestPaper {
  const id = raw.id || raw.series_id || `test-api-${index}`;
  const totalQuestions = raw.total_questions || raw.questions_count || (raw.questions ? raw.questions.length : 25);
  const durationMinutes = raw.duration_minutes || raw.duration || 30;
  const marksPerQuestion = raw.marks_per_question || 2;
  const totalMarks = raw.total_marks || (totalQuestions * marksPerQuestion);
  const negativeMarking = raw.negative_marking || 0.5;

  let questions: Question[] = [];
  if (Array.isArray(raw.questions) && raw.questions.length > 0) {
    questions = raw.questions.map((q: any, qIdx: number) => normalizeQuestion(q, qIdx));
  } else {
    questions = ALL_QUESTIONS;
  }

  return {
    id,
    title: raw.title || raw.name || `Exam CBT Test #${index + 1}`,
    description: raw.description || 'Full TCS-pattern simulated exam paper with live percentile ranking.',
    category: (raw.category as any) || (raw.type === 'subject_wise' ? 'subject' : 'mock'),
    examType: raw.exam_type || raw.exam || 'SSC CGL',
    subject: raw.subject || undefined,
    totalQuestions,
    durationMinutes,
    totalMarks,
    negativeMarking,
    marksPerQuestion,
    isPremium: Boolean(raw.is_premium || raw.is_pro),
    ocCost: raw.oc_cost || 0,
    isUnlocked: raw.is_unlocked ?? !raw.is_premium,
    attemptsCount: raw.attempts_count || 12400,
    questions,
    year: raw.year ? String(raw.year) : '2026',
    shift: raw.shift || 'Shift 1'
  };
}

// Transform raw current affairs from Partner API
function normalizeCurrentAffair(raw: any, index: number): CurrentAffairCard {
  const id = raw.id || raw.affair_id || `ca-api-${index}`;
  return {
    id,
    title: raw.title || raw.headline || 'Current Affairs Update',
    titleHi: raw.title_hi || raw.headline_hi || raw.title,
    date: raw.published_at || raw.date || 'Today',
    category: raw.category || 'National',
    summary: raw.summary || raw.content_brief || 'Daily exam news summary.',
    summaryHi: raw.summary_hi || raw.summary,
    takeaway: raw.takeaway || 'Key Exam Takeaway',
    takeawayHi: raw.takeaway_hi || raw.takeaway,
    likelyQuestion: raw.likely_question || raw.sample_question || 'Direct One Day Exam Question',
    likelyQuestionHi: raw.likely_question_hi || raw.likely_question,
    readTime: raw.read_time || '3 min read',
    isRead: false,
    fullArticle: {
      en: raw.full_article_en || raw.content || raw.summary || '',
      hi: raw.full_article_hi || raw.content_hi || raw.summary_hi || raw.summary || ''
    },
    bulletPoints: {
      en: raw.bullet_points_en || raw.bullets || [raw.takeaway || 'High-probability question area for SSC & Railway.'],
      hi: raw.bullet_points_hi || raw.bullets_hi || [raw.takeaway_hi || 'एसएससी और रेलवे परीक्षा के लिए महत्वपूर्ण तथ्य।']
    },
    staticGk: {
      en: raw.static_gk_en || [{ label: 'Relevant Body', value: 'Government of India' }],
      hi: raw.static_gk_hi || [{ label: 'संबंधित संस्था', value: 'भारत सरकार' }]
    }
  };
}

export const ApiService = {
  // 1. Check Partner API Vendor Account + Usage
  // GET /api/v1/partner/me
  async getPartnerMe(): Promise<PartnerVendorMe | null> {
    return apiRequest<PartnerVendorMe | null>(
      '/api/v1/partner/me',
      { method: 'GET' },
      null
    );
  },

  // 2. List subjects (taxonomy)
  // GET /api/v1/partner/subjects?lang={lang}
  async getSubjects(lang: 'en' | 'hi' = 'en'): Promise<{ id: string; name: string; name_hi?: string; questions_count?: number }[]> {
    const raw = await apiRequest<any>(
      `/api/v1/partner/subjects?lang=${lang}`,
      { method: 'GET' },
      [
        { id: 'sub-quant', name: 'Quantitative Aptitude', name_hi: 'संख्यात्मक अभियोग्यता' },
        { id: 'sub-reasoning', name: 'General Intelligence & Reasoning', name_hi: 'तार्किक क्षमता व रीजनिंग' },
        { id: 'sub-ga', name: 'General Awareness', name_hi: 'सामान्य ज्ञान व करंट अफेयर्स' },
        { id: 'sub-english', name: 'English Language', name_hi: 'अंग्रेजी भाषा' },
        { id: 'sub-science', name: 'General Science', name_hi: 'सामान्य विज्ञान' }
      ]
    );

    if (Array.isArray(raw)) return raw;
    if (raw && typeof raw === 'object' && raw.data) return raw.data;
    if (raw && typeof raw === 'object' && raw.subjects) return raw.subjects;
    return Object.keys(raw).map(key => ({ id: key, name: typeof raw[key] === 'string' ? raw[key] : (raw[key].name || key) }));
  },

  // 3. List questions (cursor-paginated)
  // GET /api/v1/partner/questions
  async getQuestions(params: {
    cursor?: string;
    limit?: number;
    subject_id?: string;
    difficulty?: string;
    topic?: string;
    search?: string;
    lang?: string;
  } = {}): Promise<{ questions: Question[]; next_cursor?: string | null }> {
    const qp = new URLSearchParams();
    if (params.cursor) qp.append('cursor', params.cursor);
    if (params.limit) qp.append('limit', String(params.limit));
    if (params.subject_id) qp.append('subject_id', params.subject_id);
    if (params.difficulty) qp.append('difficulty', params.difficulty);
    if (params.topic) qp.append('topic', params.topic);
    if (params.search) qp.append('search', params.search);
    if (params.lang) qp.append('lang', params.lang);

    const raw = await apiRequest<any>(
      `/api/v1/partner/questions?${qp.toString()}`,
      { method: 'GET' },
      { items: ALL_QUESTIONS, next_cursor: null }
    );

    const items = raw.items || raw.data || (Array.isArray(raw) ? raw : ALL_QUESTIONS);
    return {
      questions: items.map((q: any, idx: number) => normalizeQuestion(q, idx)),
      next_cursor: raw.next_cursor || null
    };
  },

  // 4. Get a single question
  // GET /api/v1/partner/questions/{question_id}
  async getQuestionById(questionId: string, lang: 'en' | 'hi' = 'en'): Promise<Question | null> {
    const raw = await apiRequest<any>(
      `/api/v1/partner/questions/${questionId}?lang=${lang}`,
      { method: 'GET' },
      ALL_QUESTIONS.find(q => q.id === questionId) || null
    );
    if (!raw) return null;
    return normalizeQuestion(raw, 0);
  },

  // 5. List current affairs articles
  // GET /api/v1/partner/current-affairs
  async getCurrentAffairs(params: {
    cursor?: string;
    limit?: number;
    category?: string;
    lang?: string;
  } = {}): Promise<{ articles: CurrentAffairCard[]; next_cursor?: string | null }> {
    const qp = new URLSearchParams();
    if (params.cursor) qp.append('cursor', params.cursor);
    if (params.limit) qp.append('limit', String(params.limit || 20));
    if (params.category) qp.append('category', params.category);
    if (params.lang) qp.append('lang', params.lang);

    const raw = await apiRequest<any>(
      `/api/v1/partner/current-affairs?${qp.toString()}`,
      { method: 'GET' },
      { items: CURRENT_AFFAIRS_CARDS, next_cursor: null }
    );

    const items = raw.items || raw.data || (Array.isArray(raw) ? raw : CURRENT_AFFAIRS_CARDS);
    return {
      articles: items.map((ca: any, idx: number) => normalizeCurrentAffair(ca, idx)),
      next_cursor: raw.next_cursor || null
    };
  },

  // 6. Get a current affairs article
  // GET /api/v1/partner/current-affairs/{affair_id}
  async getCurrentAffairById(affairId: string, lang: 'en' | 'hi' = 'en'): Promise<CurrentAffairCard | null> {
    const raw = await apiRequest<any>(
      `/api/v1/partner/current-affairs/${affairId}?lang=${lang}`,
      { method: 'GET' },
      CURRENT_AFFAIRS_CARDS.find(c => c.id === affairId) || null
    );
    if (!raw) return null;
    return normalizeCurrentAffair(raw, 0);
  },

  // 7. List test series
  // GET /api/v1/partner/test-series
  async getTestSeries(lang: 'en' | 'hi' = 'en'): Promise<TestPaper[]> {
    const raw = await apiRequest<any>(
      `/api/v1/partner/test-series?lang=${lang}`,
      { method: 'GET' },
      MOCK_TESTS
    );

    const items = raw.items || raw.data || (Array.isArray(raw) ? raw : MOCK_TESTS);
    return items.map((tp: any, idx: number) => normalizeTestPaper(tp, idx));
  },

  // 8. Get a test series with its questions
  // GET /api/v1/partner/test-series/{series_id}
  async getTestSeriesById(seriesId: string, lang: 'en' | 'hi' = 'en'): Promise<TestPaper | null> {
    const raw = await apiRequest<any>(
      `/api/v1/partner/test-series/${seriesId}?lang=${lang}`,
      { method: 'GET' },
      MOCK_TESTS.find(t => t.id === seriesId) || null
    );
    if (!raw) return null;
    return normalizeTestPaper(raw, 0);
  },

  // 9. List GS courses
  // GET /api/v1/partner/gs-courses
  async getGsCourses(lang: 'en' | 'hi' = 'en'): Promise<Course[]> {
    const raw = await apiRequest<any>(
      `/api/v1/partner/gs-courses?lang=${lang}`,
      { method: 'GET' },
      MOCK_COURSES
    );
    const items = raw.items || raw.data || (Array.isArray(raw) ? raw : MOCK_COURSES);
    return items as Course[];
  },

  // 10. List NCERT courses
  // GET /api/v1/partner/ncert-courses
  async getNcertCourses(lang: 'en' | 'hi' = 'en'): Promise<Course[]> {
    const raw = await apiRequest<any>(
      `/api/v1/partner/ncert-courses?lang=${lang}`,
      { method: 'GET' },
      MOCK_COURSES
    );
    const items = raw.items || raw.data || (Array.isArray(raw) ? raw : MOCK_COURSES);
    return items as Course[];
  },

  // 11. Test-Specific Leaderboard (Only for the requested test)
  // GET /api/v1/app/test-series/{test_id}/leaderboard
  async getTestSpecificLeaderboard(
    testId: string, 
    currentResult?: TestResult | null, 
    user?: UserProfile | null
  ): Promise<TestRanker[]> {
    // Generate realistic and deterministic top 10 rankers tailored to THIS specific test
    const test = MOCK_TESTS.find(t => t.id === testId) || {
      totalMarks: currentResult?.totalMarks || 50,
      marksPerQuestion: 2,
      totalQuestions: 25,
      examType: currentResult?.examType || 'SSC CGL'
    };

    const maxMarks = currentResult?.totalMarks || test.totalMarks || 50;

    // Simulated top performers for this specific test
    const baseRankers = [
      { name: 'Aditya Raj Meena', city: 'Jaipur, RJ', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', pct: 0.98, acc: 98.0, time: '21m 15s' },
      { name: 'Pooja Vishwakarma', city: 'Prayagraj, UP', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', pct: 0.96, acc: 96.5, time: '22m 40s' },
      { name: 'Rohan Deshmukh', city: 'Pune, MH', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80', pct: 0.94, acc: 95.0, time: '23m 10s' },
      { name: 'Kavita Patel', city: 'Ahmedabad, GJ', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', pct: 0.92, acc: 94.0, time: '23m 55s' },
      { name: 'Vikram Singh Shekhawat', city: 'Jodhpur, RJ', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', pct: 0.90, acc: 92.5, time: '24m 18s' },
      { name: 'Sneha Banerjee', city: 'Kolkata, WB', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', pct: 0.88, acc: 92.0, time: '24m 50s' },
      { name: 'Aman Deep Sharma', city: 'Chandigarh, PB', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', pct: 0.86, acc: 90.0, time: '25m 20s' },
      { name: 'Deepak Tiwari', city: 'Patna, BR', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', pct: 0.84, acc: 89.5, time: '25m 45s' },
      { name: 'Suresh Yadav', city: 'Varanasi, UP', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80', pct: 0.82, acc: 88.0, time: '26m 12s' },
      { name: 'Ritu Choudhary', city: 'Sikar, RJ', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', pct: 0.80, acc: 87.5, time: '26m 40s' }
    ];

    const rankers: TestRanker[] = baseRankers.map((b, idx) => ({
      rank: idx + 1,
      name: b.name,
      avatar: b.avatar,
      score: Number((maxMarks * b.pct).toFixed(1)),
      totalMarks: maxMarks,
      accuracy: b.acc,
      timeTaken: b.time,
      stateOrCity: b.city,
      isCurrentUser: false
    }));

    // If current result exists and user ranked in top 10, mark user or insert user
    if (currentResult) {
      const userRank = currentResult.userRank || 14;
      const formattedUserTime = `${Math.floor(currentResult.timeTakenSeconds / 60)}m ${currentResult.timeTakenSeconds % 60}s`;

      if (userRank <= 10) {
        // Replace or adjust item at userRank - 1
        const targetIdx = Math.max(0, userRank - 1);
        rankers[targetIdx] = {
          rank: userRank,
          name: user?.name || 'Rahul Sharma (You)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          score: currentResult.score,
          totalMarks: currentResult.totalMarks,
          accuracy: currentResult.accuracy,
          timeTaken: formattedUserTime,
          stateOrCity: 'Your City',
          isCurrentUser: true
        };
      }
    }

    // Try fetching live test leaderboard from endpoint
    try {
      const live = await apiRequest<any>(
        `/api/v1/app/test-series/${testId}/leaderboard`,
        { method: 'GET' },
        rankers
      );
      if (Array.isArray(live) && live.length > 0) {
        return live.map((r, i) => ({
          rank: r.rank || i + 1,
          name: r.name || r.user_name || `Aspirant #${i + 1}`,
          avatar: r.avatar || `https://images.unsplash.com/photo-${1500000000000 + i}?w=100&auto=format&fit=crop&q=80`,
          score: r.score ?? 45,
          totalMarks: maxMarks,
          accuracy: r.accuracy ?? 92,
          timeTaken: r.time_taken || '24m 10s',
          stateOrCity: r.city || r.state || undefined,
          isCurrentUser: Boolean(r.is_current_user)
        }));
      }
    } catch (e) {
      // Return normalized simulated rankers for this test
    }

    return rankers;
  },

  // 12. Submit Test Result to backend
  // POST /api/v1/app/test-series/{test_id}/submit
  async submitTest(testId: string, result: TestResult): Promise<{ success: boolean; result: TestResult }> {
    return apiRequest(
      `/api/v1/app/test-series/${testId}/submit`,
      {
        method: 'POST',
        body: JSON.stringify(result)
      },
      { success: true, result }
    );
  }
};
