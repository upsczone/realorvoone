export type Language = 'en' | 'hi';

export const UI_TRANSLATIONS = {
  // Navigation
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  test: { en: 'Test Series', hi: 'टेस्ट सीरीज़' },
  practice: { en: 'Practice', hi: 'अभ्यास' },
  currentAffairs: { en: 'Current Affairs', hi: 'करेंट अफेयर्स' },
  leaderboard: { en: 'Leaderboard', hi: 'लीडरबोर्ड' },
  
  // Dashboard & Greetings
  greetingHii: { en: 'Hii', hi: 'नमस्ते' },
  targetExam: { en: 'Target', hi: 'लक्ष्य' },
  oneDayExams: { en: 'One Day Exams', hi: 'वन डे एग्ज़ाम्स' },
  streakMotivation: { 
    en: "Consistent daily testing is the secret to single-digit ranks. You're on day", 
    hi: "लगातार मॉक टेस्ट हल करना ही टॉप रैंक का असली राज़ है। आज आपका दिन" 
  },
  ofYourStreak: { en: 'of your streak!', hi: 'का स्ट्रीक है!' },
  streakDays: { en: 'Days', hi: 'दिन' },
  claimedToday: { en: 'Claimed Today', hi: 'आज क्लेम किया' },
  claimDailyBonus: { en: '+10 oc Claim', hi: '+10 oc क्लेम करें' },
  coinWallet: { en: 'Coin Wallet', hi: 'सिक्का वॉलेट' },

  // Summary of Activities
  summaryOfActivities: { en: 'Summary of Activities', hi: 'गतिविधियों का सारांश' },
  updatedInRealTime: { en: 'Updated in real-time', hi: 'रियल-टाइम में अपडेटेड' },
  testsAttempted: { en: 'Tests Attempted', hi: 'दिए गए टेस्ट' },
  averageAccuracy: { en: 'Average Accuracy', hi: 'औसत सटीकता' },
  overallPercentile: { en: 'Overall Percentile', hi: 'ऑल इंडिया परसेंटाइल' },
  questionsSolved: { en: 'Questions Solved', hi: 'हल किए प्रश्न' },
  top2Percentile: { en: 'Top 2% Percentile', hi: 'शीर्ष 2% में' },

  // High Impact Actions
  highImpactActions: { en: 'High Impact Quick Actions', hi: 'महत्वपूर्ण त्वरित कार्य' },
  mistakeBookTitle: { en: 'Mistake Book', hi: 'मिस्टेक बुक' },
  mistakeBookDesc: { 
    en: 'Review mistakes from your mocks. Re-attempt and master them.', 
    hi: 'मॉक टेस्ट की गलतियों को दोबारा हल करें और शत-प्रतिशत सुधारें।' 
  },
  openMistakeBook: { en: 'Open Mistake Book', hi: 'मिस्टेक बुक खोलें' },
  
  startCaTestTitle: { en: 'Start Current Affairs Test', hi: 'करेंट अफेयर्स टेस्ट दें' },
  startCaTestDesc: { 
    en: 'Daily 10 MCQs from today\'s key SSC & Railway national events.', 
    hi: 'आज के प्रमुख राष्ट्रीय व रेलवे घटनाक्रमों पर 10 महत्वपूर्ण प्रश्न।' 
  },
  takeCaTest: { en: 'Take CA Test', hi: 'CA टेस्ट शुरू करें' },

  readTodayCaTitle: { en: 'Read Today Current Affairs', hi: 'आज के करेंट अफेयर्स पढ़ें' },
  readTodayCaDesc: { 
    en: 'Quick exam takeaways & static GK capsules for fast revision.', 
    hi: 'तेज़ रिवीज़न के लिए त्वरित परीक्षा निष्कर्ष और स्टैटिक जीके कैप्सूल।' 
  },
  exploreCards: { en: 'Read Full Analysis', hi: 'पूरा विश्लेषण पढ़ें' },

  readNotesTitle: { en: 'Read High-Yield Notes', hi: 'महत्वपूर्ण नोट्स पढ़ें' },
  readNotesDesc: { 
    en: 'Formula sheets, polity charts, and science tables in one place.', 
    hi: 'गणित सूत्र, संविधान चार्ट और सामान्य विज्ञान तालिकाएं एक जगह।' 
  },
  openNotes: { en: 'Open Notes', hi: 'नोट्स खोलें' },

  // Tests
  recommendedForYou: { en: 'Recommended Tests for You', hi: 'आपके लिए अनुशंसित टेस्ट' },
  viewAllTests: { en: 'View All Tests', hi: 'सभी टेस्ट देखें' },
  allTests: { en: 'All Tests', hi: 'सभी टेस्ट' },
  subjectWise: { en: 'Subject Wise', hi: 'विषयवार टेस्ट' },
  mockTests: { en: 'Full Mock Tests', hi: 'फुल मॉक टेस्ट' },
  pyqs: { en: 'Previous Year Papers (PYQs)', hi: 'पिछले वर्षों के प्रश्न (PYQ)' },
  freeAttemptUsed: { en: '1/1 Free Attempt Used', hi: '1/1 मुफ़्त प्रयास प्रयुक्त' },
  freeAttemptAvailable: { en: 'Free Attempt Available (1/1)', hi: 'मुफ़्त प्रयास उपलब्ध (1/1)' },
  startTest: { en: 'Start Test', hi: 'टेस्ट शुरू करें' },
  viewDetails: { en: 'View Details', hi: 'विवरण देखें' },

  // Practice Mode
  practiceHeader: { en: '01 Rapid Practice', hi: '01 त्वरित अभ्यास' },
  practiceSubtitle: { 
    en: 'Exam marking scheme · +1.0 for right, -0.33 negative marking', 
    hi: 'परीक्षा अंकन प्रणाली · सही पर +1.0, गलत पर -0.33 नेगेटिव मार्किंग' 
  },
  nextQuestion: { en: 'Next Question', hi: 'अगला प्रश्न' },
  submitAnswer: { en: 'Submit Answer', hi: 'उत्तर सबमिट करें' },

  // Result & Analysis
  testCompleted: { en: 'TEST COMPLETED', hi: 'टेस्ट समाप्त' },
  viewFullAnalysis: { en: 'View Full Analysis', hi: 'पूर्ण विश्लेषण देखें' },
  weakAreas: { en: 'Weak Areas', hi: 'कमज़ोर क्षेत्र' },
  strongAreas: { en: 'Strong Areas', hi: 'मज़बूत क्षेत्र' },
  recommendedTests: { en: 'Recommended Next Tests', hi: 'सुझाए गए अगले टेस्ट' },
  unlockExplanations: { en: 'Unlock Explanations with Premium One', hi: 'प्रीमियम वन के साथ व्याख्याएं अनलॉक करें' },

  // Common Buttons & Labels
  back: { en: 'Back', hi: 'वापस' },
  close: { en: 'Close', hi: 'बंद करें' },
  save: { en: 'Save', hi: 'सुरक्षित करें' },
  coins: { en: 'oc coins', hi: 'oc सिक्के' },
  streak: { en: 'Streak', hi: 'स्ट्रीक' }
} as const;

export type TranslationKey = keyof typeof UI_TRANSLATIONS;

export function t(key: TranslationKey, lang: Language): string {
  const item = UI_TRANSLATIONS[key];
  if (!item) return key;
  return item[lang] || item['en'] || key;
}
