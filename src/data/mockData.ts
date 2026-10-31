import { 
  TestPaper, 
  Question, 
  CurrentAffairCard, 
  ExamNote, 
  LeaderboardStudent, 
  MistakeItem,
  TestResult,
  Course
} from '../types';

export const ALL_QUESTIONS: Question[] = [
  // Quantitative Aptitude
  {
    id: 'q-quant-01',
    subject: 'Quantitative Aptitude',
    topic: 'Profit & Loss',
    exam: 'SSC CGL',
    year: '2024',
    difficulty: 'Medium',
    questionText: {
      en: 'A shopkeeper sells an article at a discount of 15% on its marked price and still makes a profit of 19%. If the cost price of the article is ₹680, find its marked price.',
      hi: 'एक दुकानदार किसी वस्तु को उसके अंकित मूल्य पर 15% की छूट देकर बेचता है और फिर भी 19% का लाभ कमाता है। यदि वस्तु का क्रय मूल्य ₹680 है, तो उसका अंकित मूल्य ज्ञात कीजिए।'
    },
    options: {
      en: ['₹952', '₹920', '₹960', '₹980'],
      hi: ['₹952', '₹920', '₹960', '₹980']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Cost Price (CP) = 680. Profit = 19%, so SP = 680 × 1.19 = ₹809.20. Marked Price (MP) × (1 - 0.15) = SP. MP = 809.20 / 0.85 = ₹952.',
      hi: 'क्रय मूल्य (CP) = 680। लाभ = 19%, इसलिए विक्रय मूल्य (SP) = 680 × 1.19 = ₹809.20। अंकित मूल्य (MP) × 0.85 = SP। MP = 809.20 / 0.85 = ₹952।'
    }
  },
  {
    id: 'q-quant-02',
    subject: 'Quantitative Aptitude',
    topic: 'Geometry - Circles',
    exam: 'SSC CGL',
    year: '2023',
    difficulty: 'Hard',
    questionText: {
      en: 'Two circles of radii 8 cm and 6 cm intersect each other and the distance between their centres is 10 cm. Find the length of the common chord.',
      hi: '8 सेमी और 6 सेमी त्रिज्या वाले दो वृत्त एक दूसरे को प्रतिच्छेद करते हैं और उनके केंद्रों के बीच की दूरी 10 सेमी है। उभयनिष्ठ जीवा की लंबाई ज्ञात कीजिए।'
    },
    options: {
      en: ['9.6 cm', '4.8 cm', '10.2 cm', '8.4 cm'],
      hi: ['9.6 सेमी', '4.8 सेमी', '10.2 सेमी', '8.4 सेमी']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Since 6² + 8² = 10², the triangle formed by the centers and an intersection point is a right triangle. Area = (1/2) × 6 × 8 = 24 cm². Also Area = (1/2) × 10 × (h), so h = 4.8 cm. Total chord length = 2h = 9.6 cm.',
      hi: 'चूंकि 6² + 8² = 10², केंद्रों और प्रतिच्छेदन बिंदु से बनने वाला त्रिभुज एक समकोण त्रिभुज है। क्षेत्रफल = (1/2) × 6 × 8 = 24। उभयनिष्ठ जीवा की आधी लंबाई h = 4.8 सेमी। अतः कुल जीवा = 2 × 4.8 = 9.6 सेमी।'
    }
  },
  {
    id: 'q-quant-03',
    subject: 'Quantitative Aptitude',
    topic: 'Time and Work',
    exam: 'RRB NTPC',
    year: '2022',
    difficulty: 'Easy',
    questionText: {
      en: 'A can complete a piece of work in 12 days and B in 18 days. If they work together for 4 days, what fraction of work is left?',
      hi: 'A किसी कार्य को 12 दिनों में और B 18 दिनों में पूरा कर सकता है। यदि वे 4 दिनों तक एक साथ कार्य करते हैं, तो कार्य का कितना भाग शेष रह जाएगा?'
    },
    options: {
      en: ['4/9', '5/9', '1/3', '2/9'],
      hi: ['4/9', '5/9', '1/3', '2/9']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Total work = LCM(12, 18) = 36 units. Efficiency of A = 3, B = 2. Combined efficiency = 5 units/day. In 4 days, work done = 5 × 4 = 20 units. Remaining work = 36 - 20 = 16 units. Fraction left = 16/36 = 4/9.',
      hi: 'कुल कार्य = LCM(12, 18) = 36 इकाई। A की कार्यक्षमता = 3, B = 2। दोनों की कुल क्षमता = 5 इकाई/दिन। 4 दिनों में किया गया कार्य = 20 इकाई। शेष कार्य = 36 - 20 = 16 इकाई। शेष भाग = 16/36 = 4/9।'
    }
  },
  {
    id: 'q-quant-04',
    subject: 'Quantitative Aptitude',
    topic: 'Speed Time & Distance',
    exam: 'RRB Group D',
    year: '2022',
    difficulty: 'Medium',
    questionText: {
      en: 'A 240 m long train crosses a platform equal to its double length in 36 seconds. What is the speed of the train in km/h?',
      hi: '240 मीटर लंबी ट्रेन अपनी लंबाई के दोगुने लंबे प्लेटफॉर्म को 36 सेकंड में पार करती है। ट्रेन की गति किमी/घंटा में क्या है?'
    },
    options: {
      en: ['72 km/h', '64 km/h', '80 km/h', '90 km/h'],
      hi: ['72 किमी/घंटा', '64 किमी/घंटा', '80 किमी/घंटा', '90 किमी/घंटा']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Train length = 240 m. Platform length = 480 m. Total distance = 720 m. Time = 36 s. Speed = 720 / 36 = 20 m/s. In km/h = 20 × (18/5) = 72 km/h.',
      hi: 'ट्रेन की लंबाई = 240 मीटर। प्लेटफॉर्म = 480 मीटर। कुल दूरी = 720 मीटर। समय = 36 सेकंड। गति = 720/36 = 20 मी/सेकंड। किमी/घंटा में = 20 × (18/5) = 72 किमी/घंटा।'
    }
  },

  // General Intelligence & Reasoning
  {
    id: 'q-reas-01',
    subject: 'General Intelligence & Reasoning',
    topic: 'Syllogism',
    exam: 'SSC CGL',
    year: '2024',
    difficulty: 'Medium',
    questionText: {
      en: 'Statements:\n1. All metals are solids.\n2. Some solids are conductors.\nConclusions:\nI. Some conductors are metals.\nII. Some conductors are solids.',
      hi: 'कथन:\n1. सभी धातुएं ठोस हैं।\n2. कुछ ठोस सुचालक हैं।\nनिष्कर्ष:\nI. कुछ सुचालक धातुएं हैं।\nII. कुछ सुचालक ठोस हैं।'
    },
    options: {
      en: ['Only conclusion II follows', 'Only conclusion I follows', 'Both I and II follow', 'Neither I nor II follows'],
      hi: ['केवल निष्कर्ष II अनुसरण करता है', 'केवल निष्कर्ष I अनुसरण करता है', 'दोनों I और II अनुसरण करते हैं', 'न तो I और न ही II अनुसरण करता है']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Statement 2 says "Some solids are conductors", which immediately implies its converse: "Some conductors are solids" (Conclusion II follows). Metal and conductor have no definite overlapping connection (Conclusion I does not necessarily follow).',
      hi: 'कथन 2 से सीधे निष्कर्ष निकलता है कि "कुछ सुचालक ठोस हैं"। धातु और सुचालक के बीच कोई निश्चित संबंध नहीं दिया गया है। इसलिए केवल निष्कर्ष II सत्य है।'
    }
  },
  {
    id: 'q-reas-02',
    subject: 'General Intelligence & Reasoning',
    topic: 'Coding - Decoding',
    exam: 'SSC CHSL',
    year: '2023',
    difficulty: 'Easy',
    questionText: {
      en: 'In a certain code language, "TARGET" is coded as "VCTEGV". How will "VICTORY" be coded in that language?',
      hi: 'एक निश्चित कूट भाषा में "TARGET" को "VCTEGV" के रूप में लिखा जाता है। उसी भाषा में "VICTORY" को कैसे लिखा जाएगा?'
    },
    options: {
      en: ['XKEVQTA', 'XKEEVQA', 'WJDUPSZ', 'YKFWQTB'],
      hi: ['XKEVQTA', 'XKEEVQA', 'WJDUPSZ', 'YKFWQTB']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Each letter is shifted forward by +2 positions in alphabetical order: T(+2)=V, A(+2)=C, R(+2)=T, G(+2)=E... Similarly V(+2)=X, I(+2)=K, C(+2)=E, T(+2)=V, O(+2)=Q, R(+2)=T, Y(+2)=A. Result: XKEVQTA.',
      hi: 'प्रत्येक अक्षर में वर्णमाला क्रम में +2 की वृद्धि की गई है। V(+2)=X, I(+2)=K, C(+2)=E, T(+2)=V, O(+2)=Q, R(+2)=T, Y(+2)=A। सही कोड XKEVQTA है।'
    }
  },
  {
    id: 'q-reas-03',
    subject: 'General Intelligence & Reasoning',
    topic: 'Blood Relations',
    exam: 'RRB NTPC',
    year: '2022',
    difficulty: 'Medium',
    questionText: {
      en: 'Pointing to a photograph of a woman, a man says, "Her mother\'s only son is my father." How is the woman related to the man?',
      hi: 'एक महिला की तस्वीर की ओर इशारा करते हुए एक पुरुष कहता है, "उसकी माँ का इकलौता पुत्र मेरा पिता है।" वह महिला उस पुरुष से किस प्रकार संबंधित है?'
    },
    options: {
      en: ['Paternal Aunt (Bua)', 'Mother', 'Sister', 'Grandmother'],
      hi: ['बुआ (चाची/मौसी)', 'माता', 'बहन', 'दादी']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Woman\'s mother\'s only son = Woman\'s brother. The man says this brother is his father. Therefore, the woman is the sister of his father, which makes her his Paternal Aunt (Bua).',
      hi: 'महिला की माँ का इकलौता पुत्र = महिला का भाई। पुरुष का पिता वह भाई है। अतः महिला पुरुष के पिता की बहन यानी बुआ है।'
    }
  },

  // General Awareness / Current Affairs
  {
    id: 'q-ga-01',
    subject: 'General Awareness',
    topic: 'Indian Polity - Constitution',
    exam: 'SSC CGL',
    year: '2024',
    difficulty: 'Easy',
    questionText: {
      en: 'Which Article of the Indian Constitution empowers the Supreme Court to issue writs for the enforcement of Fundamental Rights?',
      hi: 'भारतीय संविधान का कौन सा अनुच्छेद सर्वोच्च न्यायालय को मौलिक अधिकारों के प्रवर्तन के लिए रिट जारी करने का अधिकार देता है?'
    },
    options: {
      en: ['Article 32', 'Article 226', 'Article 21', 'Article 14'],
      hi: ['अनुच्छेद 32', 'अनुच्छेद 226', 'अनुच्छेद 21', 'अनुच्छेद 14']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Article 32 guarantees the Right to Constitutional Remedies and empowers the Supreme Court to issue Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, and Certiorari writs. Dr. B.R. Ambedkar called it the "Heart and Soul" of the Constitution.',
      hi: 'अनुच्छेद 32 संवैधानिक उपचारों का अधिकार प्रदान करता है जिसके तहत सुप्रीम कोर्ट 5 प्रकार की रिट जारी करता है। डॉ. बी.आर. अंबेडकर ने इसे संविधान का "हृदय और आत्मा" कहा था।'
    }
  },
  {
    id: 'q-ga-02',
    subject: 'General Awareness',
    topic: 'Current Affairs - Space',
    exam: 'SSC CGL',
    year: '2024',
    difficulty: 'Medium',
    questionText: {
      en: 'Which launch vehicle was utilized by ISRO for the successful injection of the Aditya-L1 solar observatory into space?',
      hi: 'इसरो द्वारा आदित्य-एल1 सौर वेधशाला को अंतरिक्ष में सफलतापूर्वक प्रक्षेपित करने के लिए किस प्रक्षेपण यान का उपयोग किया गया था?'
    },
    options: {
      en: ['PSLV-C57', 'GSLV-Mk III', 'LVM3-M4', 'PSLV-C56'],
      hi: ['PSLV-C57', 'GSLV-Mk III', 'LVM3-M4', 'PSLV-C56']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'ISRO launched Aditya-L1 using the PSLV-C57 launch vehicle from Satish Dhawan Space Centre (SDSC) SHAR, Sriharikota, placing it into a Halo orbit around Lagrangian point 1 (L1).',
      hi: 'इसरो ने सतीश धवन अंतरिक्ष केंद्र, श्रीहरिकोटा से PSLV-C57 रॉकेट के माध्यम से आदित्य-L1 को प्रक्षेपित किया और इसे लैग्रेंज प्वाइंट 1 (L1) के हेलो ऑर्बिट में स्थापित किया।'
    }
  },
  {
    id: 'q-ga-03',
    subject: 'General Awareness',
    topic: 'Modern Indian History',
    exam: 'RRB NTPC',
    year: '2021',
    difficulty: 'Easy',
    questionText: {
      en: 'In which year was the historic Gandhi-Irwin Pact signed in London/New Delhi before the Second Round Table Conference?',
      hi: 'द्वितीय गोलमेज सम्मेलन से पहले ऐतिहासिक गांधी-इरविन समझौते पर किस वर्ष हस्ताक्षर किए गए थे?'
    },
    options: {
      en: ['1931', '1929', '1932', '1930'],
      hi: ['1931', '1929', '1932', '1930']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'The Gandhi-Irwin Pact was signed on 5 March 1931 between Mahatma Gandhi and Viceroy Lord Irwin, leading to the suspension of the Civil Disobedience Movement.',
      hi: 'गांधी-इरविन समझौता 5 मार्च 1931 को महात्मा गांधी और वायसराय लॉर्ड इरविन के बीच हुआ था, जिसके बाद सविनय अवज्ञा आंदोलन स्थगित किया गया था।'
    }
  },

  // General Science (Crucial for Railway exams)
  {
    id: 'q-sci-01',
    subject: 'General Science',
    topic: 'Physics - Optics',
    exam: 'RRB ALP',
    year: '2024',
    difficulty: 'Medium',
    questionText: {
      en: 'Which type of mirror is utilized as a rear-view mirror in vehicles to provide a wider field of view?',
      hi: 'वाहनों में व्यापक दृष्टि क्षेत्र प्रदान करने के लिए पश्च-दृश्य दर्पण (रियर-व्यू मिरर) के रूप में किस प्रकार के दर्पण का उपयोग किया जाता है?'
    },
    options: {
      en: ['Convex Mirror', 'Concave Mirror', 'Plane Mirror', 'Cylindrical Mirror'],
      hi: ['उत्तल दर्पण', 'अवतल दर्पण', 'समतल दर्पण', 'बेलनाकार दर्पण']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Convex mirrors always form diminished, virtual, and erect images of objects, thereby providing a much wider field of view for the driver.',
      hi: 'उत्तल दर्पण हमेशा वस्तुओं का छोटा, आभासी और सीधा प्रतिबिंब बनाते हैं, जिससे ड्राइवर को पीछे का बहुत बड़ा क्षेत्र दिखाई देता है।'
    }
  },
  {
    id: 'q-sci-02',
    subject: 'General Science',
    topic: 'Chemistry - Periodic Table',
    exam: 'RRB Group D',
    year: '2022',
    difficulty: 'Easy',
    questionText: {
      en: 'What is the chemical name of "Baking Soda" widely used in cooking and antacids?',
      hi: 'खाना पकाने और एंटासिड में व्यापक रूप से उपयोग किए जाने वाले "बेकिंग सोडा" का रासायनिक नाम क्या है?'
    },
    options: {
      en: ['Sodium Hydrogen Carbonate (NaHCO₃)', 'Sodium Carbonate (Na₂CO₃)', 'Calcium Carbonate (CaCO₃)', 'Sodium Hydroxide (NaOH)'],
      hi: ['सोडियम हाइड्रोजन कार्बोनेट (NaHCO₃)', 'सोडियम कार्बोनेट (Na₂CO₃)', 'कैल्शियम कार्बोनेट (CaCO₃)', 'सोडियम हाइड्रॉक्साइड (NaOH)']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Baking Soda is Sodium Bicarbonate or Sodium Hydrogen Carbonate with chemical formula NaHCO₃. Washing soda is Na₂CO₃·10H₂O.',
      hi: 'बेकिंग सोडा का रासायनिक नाम सोडियम बाइकार्बोनेट (सोडियम हाइड्रोजन कार्बोनेट) है और इसका रासायनिक सूत्र NaHCO₃ है।'
    }
  },

  // English Language (For SSC)
  {
    id: 'q-eng-01',
    subject: 'English Language',
    topic: 'Idioms and Phrases',
    exam: 'SSC CGL',
    year: '2023',
    difficulty: 'Easy',
    questionText: {
      en: 'Select the most appropriate meaning of the given idiom: "Burn the midnight oil".',
      hi: 'दिए गए मुहावरे का सबसे उपयुक्त अर्थ चुनें: "Burn the midnight oil".'
    },
    options: {
      en: ['To work or study late into the night', 'To waste precious resources', 'To cause accidental fire', 'To celebrate enthusiastically'],
      hi: ['देर रात तक काम या पढ़ाई करना', 'संसाधनों को बर्बाद करना', 'आकस्मिक आग लगाना', 'उत्साहपूर्वक जश्न मनाना']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: '"Burn the midnight oil" means to study or work very late into the night or early morning hours.',
      hi: '"Burn the midnight oil" का अर्थ देर रात तक कठिन परिश्रम या पढ़ाई करना होता है।'
    }
  },
  {
    id: 'q-eng-02',
    subject: 'English Language',
    topic: 'Error Spotting',
    exam: 'SSC CGL',
    year: '2024',
    difficulty: 'Hard',
    questionText: {
      en: 'Identify the segment in the sentence which contains a grammatical error:\n"Neither the supervisor nor the engineers (A) / was present (B) / at the construction site (C) / during the inspection (D)."',
      hi: 'वाक्य में व्याकरण संबंधी त्रुटि वाले भाग की पहचान करें:\n"Neither the supervisor nor the engineers (A) / was present (B) / at the construction site (C) / during the inspection (D)."'
    },
    options: {
      en: ['was present (B)', 'Neither the supervisor nor the engineers (A)', 'at the construction site (C)', 'during the inspection (D)'],
      hi: ['was present (B)', 'Neither the supervisor nor the engineers (A)', 'at the construction site (C)', 'during the inspection (D)']
    },
    correctAnswerIndex: 0,
    explanation: {
      en: 'Rule of Proximity: When two subjects are joined by "neither... nor", the verb agrees with the subject nearest to it. Here, "engineers" is plural, so it should be "were present" instead of "was present".',
      hi: '"Neither... nor" के नियम के अनुसार क्रिया (verb) अपने निकटतम कर्ता (engineers - बहुवचन) के अनुसार होनी चाहिए। अतः "was present" के स्थान पर "were present" आएगा।'
    }
  }
];

export const MOCK_TESTS: TestPaper[] = [
  // Subject Wise Tests
  {
    id: 'test-sub-quant-01',
    title: 'Quantitative Aptitude Speed Booster #01',
    description: 'High-yield arithmetic and geometry questions modeled on SSC CGL & RRB NTPC pattern.',
    category: 'subject',
    examType: 'SSC CGL',
    subject: 'Quantitative Aptitude',
    totalQuestions: 15,
    durationMinutes: 15,
    totalMarks: 30,
    negativeMarking: 0.50,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 12420,
    questions: [
      ALL_QUESTIONS[0],
      ALL_QUESTIONS[1],
      ALL_QUESTIONS[2],
      ALL_QUESTIONS[3]
    ]
  },
  {
    id: 'test-sub-reas-01',
    title: 'Reasoning & Intelligence Speed Drill #01',
    description: 'Targeted drill covering Syllogism, Blood Relations, and Coding-Decoding.',
    category: 'subject',
    examType: 'SSC CGL',
    subject: 'General Intelligence & Reasoning',
    totalQuestions: 15,
    durationMinutes: 12,
    totalMarks: 30,
    negativeMarking: 0.50,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 9840,
    questions: [
      ALL_QUESTIONS[4],
      ALL_QUESTIONS[5],
      ALL_QUESTIONS[6]
    ]
  },
  {
    id: 'test-sub-gk-01',
    title: 'General Awareness & Science Capsule',
    description: 'Crucial Static GK, Indian Polity, and Physics questions for One Day Exams.',
    category: 'subject',
    examType: 'RRB NTPC',
    subject: 'General Awareness',
    totalQuestions: 20,
    durationMinutes: 10,
    totalMarks: 40,
    negativeMarking: 0.66,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 15200,
    questions: [
      ALL_QUESTIONS[7],
      ALL_QUESTIONS[8],
      ALL_QUESTIONS[9],
      ALL_QUESTIONS[10]
    ]
  },

  // Mock Tests
  {
    id: 'test-mock-cgl-01',
    title: 'SSC CGL Tier-1 All India Live Mock #01',
    description: 'Full Length CBT Mock according to official TCS interface and updated 2026 syllabus.',
    category: 'mock',
    examType: 'SSC CGL',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.50,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 28410,
    questions: ALL_QUESTIONS
  },
  {
    id: 'test-mock-cgl-02',
    title: 'SSC CGL Tier-1 Super Pro Mock #02',
    description: 'Advanced difficulty mock test curated by toppers for score improvement from 130 to 165+.',
    category: 'mock',
    examType: 'SSC CGL',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.50,
    marksPerQuestion: 2,
    isPremium: true,
    ocCost: 100,
    isUnlocked: false,
    attemptsCount: 14320,
    questions: ALL_QUESTIONS
  },
  {
    id: 'test-mock-rrb-01',
    title: 'RRB NTPC CBT-1 Mega Mock #01',
    description: 'Official TCS pattern covering 40 GA/Science, 30 Maths, and 30 General Intelligence.',
    category: 'mock',
    examType: 'RRB NTPC',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.66,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 31900,
    questions: ALL_QUESTIONS.filter(q => q.subject !== 'English Language')
  },
  {
    id: 'test-mock-rrb-02',
    title: 'RRB Group D All India CBT Mock #03',
    description: 'Special emphasis on General Science (Physics & Chemistry) and Railway Aptitude.',
    category: 'mock',
    examType: 'RRB Group D',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.66,
    marksPerQuestion: 2,
    isPremium: true,
    ocCost: 100,
    isUnlocked: false,
    attemptsCount: 22100,
    questions: ALL_QUESTIONS.filter(q => q.subject !== 'English Language')
  },

  // PYQs (Previous Year Papers)
  {
    id: 'test-pyq-cgl-2024',
    title: 'SSC CGL 2024 Tier-1 Official Paper (Shift 1)',
    description: 'Original real exam paper conducted on 12 September 2024 with detailed step-by-step solutions.',
    category: 'pyq',
    examType: 'SSC CGL',
    year: '2024',
    shift: 'Shift 1 (09:00 AM - 10:00 AM)',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.50,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 42100,
    questions: ALL_QUESTIONS
  },
  {
    id: 'test-pyq-cgl-2023',
    title: 'SSC CGL 2023 Tier-1 Official Paper (Shift 2)',
    description: 'Official question set with authentic TCS answer key & bilingual explanations.',
    category: 'pyq',
    examType: 'SSC CGL',
    year: '2023',
    shift: 'Shift 2 (12:30 PM - 01:30 PM)',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.50,
    marksPerQuestion: 2,
    isPremium: true,
    ocCost: 150,
    isUnlocked: false,
    attemptsCount: 38200,
    questions: ALL_QUESTIONS
  },
  {
    id: 'test-pyq-ntpc-2022',
    title: 'RRB NTPC CBT-2 Official Paper (Level 5)',
    description: 'Previous year paper for Commercial Apprentice and Senior Clerk posts.',
    category: 'pyq',
    examType: 'RRB NTPC',
    year: '2022',
    shift: 'Shift 1',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.66,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 35400,
    questions: ALL_QUESTIONS.filter(q => q.subject !== 'English Language')
  },
  {
    id: 'test-pyq-chsl-2023',
    title: 'SSC CHSL 2023 Tier-1 Official Shift #03',
    description: '100% authentic questions asked in 10+2 CHSL exam with shortcut tricks.',
    category: 'pyq',
    examType: 'SSC CHSL',
    year: '2023',
    shift: 'Shift 3',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.50,
    marksPerQuestion: 2,
    isPremium: true,
    ocCost: 100,
    isUnlocked: false,
    attemptsCount: 26800,
    questions: ALL_QUESTIONS
  },

  // Exam Based (Dynamically highlighted based on user selection)
  {
    id: 'test-exam-cgl-special',
    title: 'SSC CGL 2026 Rank Booster Test',
    description: 'Carefully curated test matching latest weightage trends in SSC CGL Tier 1.',
    category: 'exambased',
    examType: 'SSC CGL',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.50,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 18700,
    questions: ALL_QUESTIONS
  },
  {
    id: 'test-exam-ntpc-special',
    title: 'RRB NTPC 2026 Special CBT-1 Mock',
    description: 'High-frequency Railway General Science and General Awareness focus test.',
    category: 'exambased',
    examType: 'RRB NTPC',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.66,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 21300,
    questions: ALL_QUESTIONS.filter(q => q.subject !== 'English Language')
  },
  {
    id: 'test-exam-chsl-special',
    title: 'SSC CHSL 10+2 Target Speed Mock',
    description: 'Fast-paced mock designed for 100 questions in 60 minutes simulation.',
    category: 'exambased',
    examType: 'SSC CHSL',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.50,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 16400,
    questions: ALL_QUESTIONS
  },
  {
    id: 'test-exam-groupd-special',
    title: 'RRB Group D Science & Math Express',
    description: 'Formula & concept testing mock for Level-1 Track Maintainer & Pointsman posts.',
    category: 'exambased',
    examType: 'RRB Group D',
    totalQuestions: 25,
    durationMinutes: 30,
    totalMarks: 50,
    negativeMarking: 0.66,
    marksPerQuestion: 2,
    isPremium: false,
    ocCost: 0,
    isUnlocked: true,
    attemptsCount: 19800,
    questions: ALL_QUESTIONS.filter(q => q.subject !== 'English Language')
  }
];

export const CURRENT_AFFAIRS_CARDS: CurrentAffairCard[] = [
  {
    id: 'ca-01',
    title: 'India successfully tests Agni-5 Missile with MIRV Technology under Mission Divyastra',
    titleHi: 'भारत ने मिशन दिव्यास्त्र के तहत MIRV तकनीक से लैस अग्नि-5 मिसाइल का सफल परीक्षण किया',
    date: '28 Oct 2026',
    category: 'Science & Tech',
    summary: 'The Defence Research and Development Organisation (DRDO) successfully completed the flight test of indigenous Agni-5 equipped with Multiple Independently Targetable Re-entry Vehicle (MIRV) technology, capable of delivering multiple warheads against disparate targets.',
    summaryHi: 'रक्षा अनुसंधान एवं विकास संगठन (DRDO) ने स्वदेशी अग्नि-5 मिसाइल का सफल उड़ान परीक्षण किया। यह मिसाइल एमआईआरवी (MIRV) तकनीक से लैस है, जो एक साथ कई लक्ष्यों को भेदने में सक्षम है।',
    takeaway: 'Mission Name: Mission Divyastra | Agency: DRDO | Range: 5,000+ km (Intercontinental Ballistic Missile).',
    takeawayHi: 'मिशन का नाम: मिशन दिव्यास्त्र | एजेंसी: DRDO | रेंज: 5,000+ किमी (अंतरमहाद्वीपीय बैलिस्टिक मिसाइल)।',
    likelyQuestion: 'Under which mission did India test the MIRV technology for the Agni-5 missile?',
    likelyQuestionHi: 'भारत ने किस मिशन के तहत अग्नि-5 मिसाइल के लिए MIRV तकनीक का सफल परीक्षण किया?',
    readTime: '3 min read',
    isRead: false,
    fullArticle: {
      en: `India joined an elite group of nations having Multiple Independently Targetable Re-entry Vehicle (MIRV) capability with the successful first flight test of an indigenously developed Agni-5 missile. Codenamed 'Mission Divyastra', the test was conducted from Dr. APJ Abdul Kalam Island off the coast of Odisha.\n\nThe Agni-5 is a three-stage solid-fueled intercontinental ballistic missile (ICBM) with a strike range exceeding 5,000 kilometers. With MIRV technology, a single missile carries several nuclear warheads, each of which can be programmed to hit a separate geographic target located hundreds of kilometers apart.\n\nOnly the United States, Russia, China, France, and the United Kingdom previously possessed operational MIRV capabilities. This achievement significantly bolsters India's minimum credible nuclear deterrence posture.`,
      hi: `भारत ने स्वदेशी रूप से विकसित अग्नि-5 मिसाइल के सफल पहले उड़ान परीक्षण के साथ मल्टीपल इंडिपेंडेंटली टारगेटेबल री-एंट्री व्हीकल (MIRV) क्षमता वाले चुनिंदा देशों के समूह में प्रवेश किया। इस परीक्षण को 'मिशन दिव्यास्त्र' नाम दिया गया और इसे ओडिशा तट के डॉ. एपीजे अब्दुल कलाम द्वीप से संचालित किया गया।\n\nअग्नि-5 एक तीन चरणीय ठोस प्रणोदक इंटरकॉन्टिनेंटल बैलिस्टिक मिसाइल (ICBM) है, जिसकी मारक क्षमता 5,000 किलोमीटर से अधिक है। MIRV तकनीक से एक ही मिसाइल में कई परमाणु हथियार लगाए जा सकते हैं, जो सैकड़ों किलोमीटर दूर स्थित अलग-अलग लक्ष्यों को सटीक रूप से निशाना बना सकते हैं।\n\nअब तक केवल अमेरिका, रूस, चीन, फ्रांस और ब्रिटेन के पास ही यह ऑपरेशनल क्षमता थी। यह उपलब्धि भारत के विश्वसनीय न्यूनतम निवारक सिद्धांत को नई मजबूती प्रदान करती है।`
    },
    bulletPoints: {
      en: [
        'Mission Name: Mission Divyastra, led entirely by woman scientist Project Director Sheena Rani.',
        'Range: 5,000 to 5,500+ kilometers, bringing all of Asia and parts of Europe within strike range.',
        'Propulsion: Three-stage solid fuel rocket motor with advanced composite casing.',
        'Navigation: Ring Laser Gyro-based Inertial Navigation System (RINS) coupled with NavIC satellite constellation.'
      ],
      hi: [
        'मिशन का नाम: मिशन दिव्यास्त्र, जिसका नेतृत्व महिला वैज्ञानिक व प्रोजेक्ट डायरेक्टर शीना रानी ने किया।',
        'मारक क्षमता: 5,000 से 5,500+ किमी, जिससे संपूर्ण एशिया और यूरोप के हिस्से रेंज में आ जाते हैं।',
        'प्रणोदन प्रणाली: उन्नत कम्पोजिट केसिंग के साथ तीन चरणीय ठोस रॉकेट मोटर।',
        'नेविगेशन: NavIC उपग्रह नक्षत्र द्वारा समर्थित रिंग लेज़र जाइरो आधारित जड़त्वीय नेविगेशन प्रणाली।'
      ]
    },
    staticGk: {
      en: [
        { label: 'DRDO Established', value: '1958 (Headquarters: New Delhi)' },
        { label: 'Test Launch Site', value: 'Dr. APJ Abdul Kalam Island (Wheeler Island, Odisha)' },
        { label: 'Integrated Guided Missile Development Program (IGMDP)', value: 'Initiated 1983 by Dr. APJ Abdul Kalam (PATNA: Prithvi, Agni, Trishul, Nag, Akash)' },
        { label: 'Solid vs Liquid Propellant', value: 'Agni series uses Solid Propellant for rapid canister-based deployment' }
      ],
      hi: [
        { label: 'DRDO की स्थापना', value: '1958 (मुख्यालय: नई दिल्ली)' },
        { label: 'परीक्षण प्रक्षेपण स्थल', value: 'डॉ. एपीजे अब्दुल कलाम द्वीप (व्हीलर द्वीप, ओडिशा)' },
        { label: 'एकीकृत निर्देशित मिसाइल विकास कार्यक्रम (IGMDP)', value: '1983 में डॉ. कलाम द्वारा शुरू (PATNA: पृथ्वी, अग्नि, त्रिशूल, नाग, आकाश)' },
        { label: 'ठोस ईंधन की विशेषता', value: 'त्वरित गतिशीलता और कैनिस्टर से तुरंत लॉन्च करने में सक्षम' }
      ]
    },
    practiceQuestion: {
      id: 'ca-q-01',
      subject: 'General Awareness',
      topic: 'Defense Technology',
      exam: 'SSC CGL',
      difficulty: 'Medium',
      questionText: {
        en: 'Under which code-name was the flight test of indigenous Agni-5 with MIRV technology carried out?',
        hi: 'एमआईआरवी तकनीक के साथ स्वदेशी अग्नि-5 का परीक्षण किस कोड-नाम के तहत किया गया था?'
      },
      options: {
        en: ['Mission Divyastra', 'Operation Shakti', 'Mission Sudarshan', 'Operation Sindhu'],
        hi: ['मिशन दिव्यास्त्र', 'ऑपरेशन शक्ति', 'मिशन सुदर्शन', 'ऑपरेशन सिंधु']
      },
      correctAnswerIndex: 0,
      explanation: {
        en: 'The flight test of Agni-5 with MIRV technology was named "Mission Divyastra", carried out under DRDO project directorship.',
        hi: 'MIRV तकनीक वाली अग्नि-5 मिसाइल के परीक्षण को "मिशन दिव्यास्त्र" नाम दिया गया था।'
      }
    }
  },
  {
    id: 'ca-02',
    title: 'Reserve Bank of India expands UPI Interoperability for Cross-Border QR Payments',
    titleHi: 'भारतीय रिज़र्व बैंक ने सीमा पार QR भुगतानों के लिए UPI इंटरऑपरेबिलिटी का विस्तार किया',
    date: '27 Oct 2026',
    category: 'Economy',
    summary: 'RBI signed bilateral agreements with Southeast Asian central banks to link Unified Payments Interface (UPI) with regional fast payment systems (PayNow, PromptPay), eliminating foreign exchange intermediaries for Indian travelers.',
    summaryHi: 'आरबीआई ने दक्षिण पूर्व एशियाई देशों के केंद्रीय बैंकों के साथ समझौता किया जिससे यूपीआई को क्षेत्रीय त्वरित भुगतान प्रणालियों (PayNow, PromptPay) से जोड़ा गया, जिससे यात्रियों को बिना विदेशी मुद्रा विनिमय शुल्क के भुगतान की सुविधा मिली।',
    takeaway: 'Regulatory Body: RBI | Key Mechanism: Real-time bilateral linkage | Exam Focus: Monetary Policy & Digital Public Infrastructure.',
    takeawayHi: 'नियामक संस्था: RBI | मुख्य तंत्र: रियल-टाइम द्विपक्षीय लिंकेज | परीक्षा फोकस: मौद्रिक नीति व डिजिटल अवसंरचना।',
    likelyQuestion: 'Which Indian digital payment network has been connected with foreign payment systems like Singapore’s PayNow?',
    likelyQuestionHi: 'सिंगापुर के PayNow जैसे विदेशी भुगतान तंत्र के साथ किस भारतीय डिजिटल भुगतान नेटवर्क को जोड़ा गया है?',
    readTime: '3 min read',
    isRead: false,
    fullArticle: {
      en: `The Reserve Bank of India (RBI) and National Payments Corporation of India (NPCI) International Payments Ltd (NIPL) expanded cross-border retail linkages of UPI. Indian travelers can now scan local QR codes in Singapore, UAE, Mauritius, Nepal, Bhutan, and Sri Lanka directly from standard UPI applications like BHIM, PhonePe, and Google Pay.\n\nTransactions are settled directly in Indian Rupees (INR), saving consumers exorbitant 3-5% forex markup charges usually levied by credit card networks. The initiative utilizes standard ISO 20022 messaging protocols.`,
      hi: `भारतीय रिज़र्व बैंक (RBI) और एनपीसीआई की अंतरराष्ट्रीय शाखा NIPL ने यूपीआई के सीमा-पार खुदरा लिंकेज का दायरा बढ़ाया है। भारतीय यात्री अब सिंगापुर, यूएई, मॉरीशस, नेपाल, भूटान और श्रीलंका में स्थानीय QR कोड को सीधे अपने यूपीआई ऐप से स्कैन करके भुगतान कर सकते हैं।\n\nयह लेनदेन सीधे भारतीय रुपये (INR) में सेटल होता है, जिससे क्रेडिट कार्ड पर लगने वाले 3-5% विदेशी मुद्रा शुल्क की बचत होती है। यह प्रणाली मानकीकृत ISO 20022 वित्तीय मैसेजिंग प्रोटोकॉल का उपयोग करती है।`
    },
    bulletPoints: {
      en: [
        'Managing Authority: NPCI International Payments Ltd (NIPL), a wholly-owned subsidiary of NPCI.',
        'Connected Countries: Singapore (PayNow), UAE (Jaywan/NAPS), Nepal, Bhutan, Sri Lanka, Mauritius.',
        'Economic Impact: Lowers remittance costs towards the UN SDG target of less than 3%.'
      ],
      hi: [
        'प्रबंधन संस्था: NIPL (NPCI इंटरनेशनल पेमेंट्स लिमिटेड), जो NPCI की पूर्ण स्वामित्व वाली सहायक कंपनी है।',
        'संबद्ध देश: सिंगापुर (PayNow), यूएई (Jaywan), नेपाल, भूटान, श्रीलंका, मॉरीशस।',
        'आर्थिक महत्व: प्रेषण (Remittance) लागत में भारी कमी और रुपये के अंतर्राष्ट्रीयकरण को बढ़ावा।'
      ]
    },
    staticGk: {
      en: [
        { label: 'RBI Established', value: '1 April 1935 (Hilton Young Commission recommendation)' },
        { label: 'RBI Nationalisation', value: '1 January 1949' },
        { label: 'NPCI Founded', value: '2008 under Payment and Settlement Systems Act, 2007' },
        { label: 'UPI Launched', value: '11 April 2016 by Dr. Raghuram Rajan' }
      ],
      hi: [
        { label: 'RBI की स्थापना', value: '1 अप्रैल 1935 (हिल्टन यंग आयोग की सिफारिश पर)' },
        { label: 'RBI का राष्ट्रीयकरण', value: '1 जनवरी 1949' },
        { label: 'NPCI की स्थापना', value: '2008 (भुगतान और निपटान प्रणाली अधिनियम, 2007 के तहत)' },
        { label: 'UPI की शुरुआत', value: '11 अप्रैल 2016 को डॉ. रघुराम राजन द्वारा' }
      ]
    },
    practiceQuestion: {
      id: 'ca-q-02',
      subject: 'General Awareness',
      topic: 'Banking & Indian Economy',
      exam: 'SSC CGL',
      difficulty: 'Easy',
      questionText: {
        en: 'In which year was the National Payments Corporation of India (NPCI) established?',
        hi: 'भारतीय राष्ट्रीय भुगतान निगम (NPCI) की स्थापना किस वर्ष हुई थी?'
      },
      options: {
        en: ['2008', '2016', '2014', '2004'],
        hi: ['2008', '2016', '2014', '2004']
      },
      correctAnswerIndex: 0,
      explanation: {
        en: 'NPCI was established in 2008 as an umbrella organisation for operating retail payments and settlement systems in India under RBI guidance.',
        hi: 'NPCI की स्थापना 2008 में भारत में खुदरा भुगतान और निपटान प्रणालियों के संचालन के लिए की गई थी।'
      }
    }
  },
  {
    id: 'ca-03',
    title: 'Indian Railways rolls out Kavach 4.0 and unveils Vande Bharat Sleeper Trains',
    titleHi: 'भारतीय रेलवे ने कवच 4.0 लागू किया और वंदे भारत स्लीपर ट्रेनों का अनावरण किया',
    date: '26 Oct 2026',
    category: 'Railway',
    summary: 'Ministry of Railways announced nationwide deployment of Kavach 4.0 automatic train protection system along with commercial rollout of 16-car Vande Bharat Sleeper rakes built by BEML Bengaluru.',
    summaryHi: 'रेल मंत्रालय ने कवच 4.0 स्वचालित ट्रेन सुरक्षा प्रणाली को पूरे नेटवर्क पर लागू करने तथा BEML बेंगलुरु द्वारा निर्मित 16-डिब्बों वाली वंदे भारत स्लीपर ट्रेनों के व्यावसायिक संचालन की घोषणा की।',
    takeaway: 'Manufacturer: BEML Bengaluru | Safety Tech: Kavach 4.0 | Speed Capability: 160 km/h.',
    takeawayHi: 'निर्माता: BEML बेंगलुरु | सुरक्षा तकनीक: कवच 4.0 (SIL-4 प्रमाणित) | गति क्षमता: 160 किमी/घंटा।',
    likelyQuestion: 'Which public sector enterprise manufactured the prototype of the Vande Bharat Sleeper train set?',
    likelyQuestionHi: 'वंदे भारत स्लीपर ट्रेन सेट का प्रोटोटाइप किस सार्वजनिक क्षेत्र के उपक्रम द्वारा निर्मित किया गया है?',
    readTime: '3 min read',
    isRead: false,
    fullArticle: {
      en: `Indian Railways marked a milestone in passenger transit safety and comfort by inaugurating trials for the newly upgraded Kavach 4.0 Automatic Train Protection (ATP) system. Kavach operates on RFID, UHF radio frequencies, and GPS to prevent Signal Passing At Danger (SPAD) and avoid head-on and rear-end train collisions by automatically applying brakes if the loco pilot fails to do so.\n\nSimultaneously, the first prototype rake of the Vande Bharat Sleeper train set was rolled out by Bharat Earth Movers Limited (BEML) in Bengaluru. With 16 coaches (11 AC 3-Tier, 4 AC 2-Tier, and 1 AC First Class), it is designed for speeds up to 160 km/h on high-density golden quadrilateral routes.`,
      hi: `भारतीय रेलवे ने 'कवच 4.0' स्वचालित ट्रेन सुरक्षा प्रणाली (ATP) का सफल परीक्षण किया। कवच प्रणाली आरएफआईडी, यूएचएफ रेडियो और जीपीएस तकनीक पर काम करती है। यदि लोको पायलट लाल सिग्नल की अनदेखी करता है या गति सीमा से अधिक चलता है, तो कवच स्वतः ब्रेक लगाकर आमने-सामने की टक्कर को रोकता है।\n\nइसके साथ ही भारत अर्थ मूवर्स लिमिटेड (BEML) बेंगलुरु द्वारा निर्मित देश की पहली वंदे भारत स्लीपर ट्रेन का अनावरण किया गया। 16 कोच वाली यह ट्रेन 160 किमी/घंटे की गति से लंबी दूरी के मार्गों पर संचालित होगी।`
    },
    bulletPoints: {
      en: [
        'Kavach Safety Standard: Safety Integrity Level 4 (SIL-4), highest international safety benchmark.',
        'Developer: Research Designs and Standards Organisation (RDSO) Lucknow in collaboration with Indian OEMs.',
        'Vande Bharat Sleeper Coaches: 16 cars totaling 823 passenger berths, aerodynamic nose cone, and sound-insulated bogies.'
      ],
      hi: [
        'कवच सुरक्षा मानक: सेफ्टी इंटीग्रिटी लेवल 4 (SIL-4), जो अंतरराष्ट्रीय स्तर पर उच्चतम मानक है।',
        'विकासकर्ता: RDSO (अनुसंधान अभिकल्प और मानक संगठन) लखनऊ।',
        'वंदे भारत स्लीपर क्षमता: 16 कोच में कुल 823 बर्थ, स्वचालित स्लाइडिंग दरवाजे और बेहतर सस्पेंशन।'
      ]
    },
    staticGk: {
      en: [
        { label: 'First Railway Line in India', value: '16 April 1853 (Bombay to Thane - 34 km, Lord Dalhousie)' },
        { label: 'Railway Zones in India', value: '18 Zones (18th is South Coast Railway, HQ Visakhapatnam)' },
        { label: 'RDSO Headquarters', value: 'Lucknow, Uttar Pradesh' },
        { label: 'National Rail Museum', value: 'Chanakyapuri, New Delhi' }
      ],
      hi: [
        { label: 'भारत में पहली रेलगाड़ी', value: '16 अप्रैल 1853 (बॉम्बे से ठाणे - 34 किमी, लॉर्ड डलहौजी के काल में)' },
        { label: 'भारत में कुल रेलवे ज़ोन', value: '18 ज़ोन (18वां दक्षिण तटीय रेलवे, मुख्यालय: विशाखापट्टनम)' },
        { label: 'RDSO का मुख्यालय', value: 'लखनऊ, उत्तर प्रदेश' },
        { label: 'राष्ट्रीय रेल संग्रहालय', value: 'चाणक्यपुरी, नई दिल्ली' }
      ]
    },
    practiceQuestion: {
      id: 'ca-q-03',
      subject: 'General Awareness',
      topic: 'Indian Railways & Transport',
      exam: 'RRB NTPC',
      difficulty: 'Easy',
      questionText: {
        en: 'Where is the headquarters of the Research Designs and Standards Organisation (RDSO) of Indian Railways situated?',
        hi: 'भारतीय रेलवे के अनुसंधान अभिकल्प और मानक संगठन (RDSO) का मुख्यालय कहाँ स्थित है?'
      },
      options: {
        en: ['Lucknow', 'New Delhi', 'Varanasi', 'Kolkata'],
        hi: ['लखनऊ', 'नई दिल्ली', 'वाराणसी', 'कोलकाता']
      },
      correctAnswerIndex: 0,
      explanation: {
        en: 'The Research Designs and Standards Organisation (RDSO) functions as technical adviser to the Railway Board and is headquartered in Lucknow, UP.',
        hi: 'RDSO का मुख्यालय लखनऊ, उत्तर प्रदेश में स्थित है।'
      }
    }
  },
  {
    id: 'ca-04',
    title: 'Grandmaster D. Gukesh sets record as youngest World Chess Championship contender',
    titleHi: 'ग्रैंडमास्टर डी. गुकेश विश्व शतरंज चैम्पियनशिप के सबसे युवा चैलेंजर बने',
    date: '25 Oct 2026',
    category: 'Sports',
    summary: 'Indian Grandmaster Dommaraju Gukesh created history by winning the FIDE Candidates Tournament in Toronto, becoming the youngest challenger in history to play for the World Championship title at age 17.',
    summaryHi: 'भारतीय ग्रैंडमास्टर डी. गुकेश ने टोरंटो में आयोजित FIDE कैंडिडेट्स टूर्नामेंट जीतकर इतिहास रच दिया। वह मात्र 17 वर्ष की उम्र में विश्व चैंपियनशिप के सबसे युवा चैलेंजर बने।',
    takeaway: 'Athlete: D. Gukesh | Origin: Chennai, Tamil Nadu | Event: FIDE Candidates Tournament Toronto.',
    takeawayHi: 'खिलाड़ी: डी. गुकेश | शहर: चेन्नई, तमिलनाडु | प्रतियोगिता: FIDE कैंडिडेट्स टोरंटो।',
    likelyQuestion: 'Who became the youngest challenger in history to qualify for the World Chess Championship title?',
    likelyQuestionHi: 'विश्व शतरंज चैम्पियनशिप खिताब के लिए क्वालीफाई करने वाले इतिहास के सबसे युवा चैलेंजर कौन बने?',
    readTime: '2 min read',
    isRead: true,
    fullArticle: {
      en: `Seventeen-year-old Grandmaster Dommaraju Gukesh won the FIDE Candidates Tournament in Toronto, Canada, scoring 9 out of 14 points. With this monumental victory, he broke Garry Kasparov's 40-year-old record (who qualified at age 22 in 1984) to become the youngest ever challenger for the World Chess Championship.\n\nGukesh joins the legendary Viswanathan Anand as only the second Indian in history to win the prestigious Candidates Tournament.`,
      hi: `चेन्नई के 17 वर्षीय ग्रैंडमास्टर दोम्माराजू गुकेश ने कनाडा के टोरंटो में आयोजित FIDE कैंडिडेट्स टूर्नामेंट में 14 में से 9 अंक हासिल कर ऐतिहासिक जीत दर्ज की। उन्होंने महान गैरी कास्पारोव का 40 साल पुराना रिकॉर्ड तोड़ा (जो 1984 में 22 वर्ष की उम्र में चैलेंजर बने थे)।\n\nगुकेश महान विश्वनाथन आनंद के बाद कैंडिडेट्स टूर्नामेंट जीतने वाले भारत के केवल दूसरे खिलाड़ी बन गए हैं।`
    },
    bulletPoints: {
      en: [
        'Historic Record: Youngest player in 138 years of World Chess Championship history to qualify for the match.',
        'Predecessor: Viswanathan Anand won the World Chess Championship five times (2000, 2007, 2008, 2010, 2012).',
        'FIDE Headquarters: Lausanne, Switzerland.'
      ],
      hi: [
        'ऐतिहासिक रिकॉर्ड: 138 वर्षों के शतरंज इतिहास में विश्व चैंपियनशिप मुकाबले के लिए सबसे युवा क्वालीफायर।',
        'पूर्व भारतीय विजेता: विश्वनाथन आनंद ने 5 बार विश्व शतरंज चैंपियनशिप जीती थी।',
        'FIDE का मुख्यालय: लुसाने, स्विट्जरलैंड।'
      ]
    },
    staticGk: {
      en: [
        { label: 'India’s First Grandmaster', value: 'Viswanathan Anand (1988)' },
        { label: 'India’s First Woman Grandmaster', value: 'Subbaraman Vijayalakshmi (2001)' },
        { label: 'Major Dhyan Chand Khel Ratna first recipient', value: 'Viswanathan Anand (1991–92)' }
      ],
      hi: [
        { label: 'भारत के पहले ग्रैंडमास्टर', value: 'विश्वनाथन आनंद (1988)' },
        { label: 'भारत की पहली महिला ग्रैंडमास्टर', value: 'सुब्बारामन विजयलक्ष्मी (2001)' },
        { label: 'प्रथम खेल रत्न पुरस्कार विजेता', value: 'विश्वनाथन आनंद (1991-92)' }
      ]
    },
    practiceQuestion: {
      id: 'ca-q-04',
      subject: 'General Awareness',
      topic: 'Sports GK',
      exam: 'SSC MTS',
      difficulty: 'Easy',
      questionText: {
        en: 'Who was the first recipient of the Rajiv Gandhi Khel Ratna (now Major Dhyan Chand Khel Ratna) Award?',
        hi: 'राजीव गांधी खेल रत्न (अब मेजर ध्यानचंद खेल रत्न) पुरस्कार के पहले प्राप्तकर्ता कौन थे?'
      },
      options: {
        en: ['Viswanathan Anand', 'Sachin Tendulkar', 'Geet Sethi', 'Abhinav Bindra'],
        hi: ['विश्वनाथन आनंद', 'सचिन तेंदुलकर', 'गीत सेठी', 'अभिनव बिंद्रा']
      },
      correctAnswerIndex: 0,
      explanation: {
        en: 'Chess Grandmaster Viswanathan Anand was the first recipient of the Khel Ratna award in 1991–92.',
        hi: 'शतरंज के ग्रैंडमास्टर विश्वनाथन आनंद को 1991-92 में पहला खेल रत्न पुरस्कार दिया गया था।'
      }
    }
  }
];


export const EXAM_NOTES: ExamNote[] = [
  {
    id: 'note-01',
    title: 'Geometry & Mensuration - Most Repeated Formulas',
    subject: 'Quantitative Aptitude',
    exam: 'SSC CGL',
    readTime: '5 min read',
    summary: 'Handcrafted formula bank covering chords, secants, tangents, in-radius, and circum-radius frequently tested in SSC CGL & CHSL.',
    keyPoints: [
      'Length of Direct Common Tangent (DCT) = √(d² - (r₁ - r₂)²) where d is the distance between centers.',
      'Length of Transverse Common Tangent (TCT) = √(d² - (r₁ + r₂))².',
      'In a right-angled triangle: In-radius (r) = (P + B - H) / 2 and Circum-radius (R) = H / 2.',
      'Area of triangle using Heron’s formula = √[s(s-a)(s-b)(s-c)], where s = (a+b+c)/2.',
      'Angle bisector theorem: AB / AC = BD / DC.'
    ],
    formulaList: [
      'In-radius (r) = Area (Δ) / Semi-perimeter (s)',
      'Circum-radius (R) = (a × b × c) / (4 × Area)',
      'Diagonal of Cuboid = √(l² + b² + h²)',
      'Volume of Cone = (1/3)πr²h; Curved Surface Area = πrl (where l = √(r²+h²))'
    ]
  },
  {
    id: 'note-02',
    title: 'Static GK & Indian Polity - Fundamental Rights Matrix',
    subject: 'General Awareness',
    exam: 'All One Day Exams',
    readTime: '6 min read',
    summary: 'Complete breakdown of Articles 12 through 35, emergency exceptions, and writ jurisdictions for SSC CGL, MTS, and RRB NTPC.',
    keyPoints: [
      'Right to Equality: Articles 14 to 18 (Article 17: Abolition of Untouchability; Article 18: Abolition of Titles).',
      'Right to Freedom: Articles 19 to 22 (Article 21A: Right to Education added by 86th Amendment 2002).',
      'Right against Exploitation: Articles 23 & 24 (Article 24: Prohibition of employment of children in factories below 14 years).',
      'Article 32: Heart and Soul of Constitution (Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).',
      'Articles 20 and 21 CANNOT be suspended even during a National Emergency (Article 352).'
    ]
  },
  {
    id: 'note-03',
    title: 'General Science - Optics & Ray Diagrams Cheat Sheet',
    subject: 'General Science',
    exam: 'RRB NTPC',
    readTime: '4 min read',
    summary: 'Concise summary of Concave and Convex mirrors & lenses, sign conventions, and lens formula for Railway Group D & ALP exams.',
    keyPoints: [
      'Mirror Formula: 1/f = 1/v + 1/u (f is negative for concave mirror, positive for convex mirror).',
      'Lens Formula: 1/f = 1/v - 1/u (Power of lens P = 1 / f in meters; Unit: Dioptre (D)).',
      'Convex mirror always forms Virtual, Erect, and Diminished images (Used as vehicle rear-view mirror).',
      'Concave mirror forms real and inverted images except when the object is placed between Pole and Focus (virtual, erect, magnified — used by dentists and shaving mirrors).',
      'Total Internal Reflection conditions: Light travels from denser to rarer medium & angle of incidence > critical angle (Mirage, Optical Fibre).'
    ]
  },
  {
    id: 'note-04',
    title: 'Reasoning - Syllogism Shortcut Rules',
    subject: 'General Intelligence & Reasoning',
    exam: 'All One Day Exams',
    readTime: '4 min read',
    summary: 'The 100-50 method vs Venn diagram method for solving syllogism conclusions in under 20 seconds.',
    keyPoints: [
      'Universal Positive (All A are B): Subject = 100, Predicate = 50.',
      'Universal Negative (No A are B): Subject = 100, Predicate = 100.',
      'Particular Positive (Some A are B): Subject = 50, Predicate = 50.',
      'Particular Negative (Some A are not B): Subject = 50, Predicate = 100.',
      'Either-Or Condition: 1. Both conclusions must be wrong independently. 2. Subjects and predicates must be same. 3. One must be positive and one negative (Some + No or Some + Some Not).'
    ]
  }
];

export const INITIAL_MISTAKE_ITEMS: MistakeItem[] = [
  {
    id: 'mstk-01',
    question: ALL_QUESTIONS[1], // Geometry circle chord
    testTitle: 'SSC CGL Tier-1 All India Live Mock #01',
    userSelectedWrongIndex: 1, // User picked 4.8 cm instead of 9.6 cm (forgot to double!)
    dateAdded: '26 Oct 2026',
    attemptCount: 1,
    isMastered: false,
    userNotes: 'Careful! I calculated half chord length (h = 4.8) and forgot to multiply by 2 to get total chord length (9.6 cm).'
  },
  {
    id: 'mstk-02',
    question: ALL_QUESTIONS[11], // Error Spotting
    testTitle: 'SSC CGL 2024 Tier-1 Official Paper (Shift 1)',
    userSelectedWrongIndex: 1,
    dateAdded: '25 Oct 2026',
    attemptCount: 2,
    isMastered: false,
    userNotes: 'Proximity rule in neither-nor! Nearest subject was "engineers" (plural), so verb must be "were", not "was".'
  }
];

export const TOP_STUDENTS_LEADERBOARD: LeaderboardStudent[] = [
  {
    rank: 1,
    name: 'Ankit Tiwari',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    score: 194.5,
    totalMarks: 200,
    accuracy: 98.2,
    timeTaken: '48m 12s',
    exam: 'SSC CGL'
  },
  {
    rank: 2,
    name: 'Pooja Verma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    score: 191.0,
    totalMarks: 200,
    accuracy: 96.5,
    timeTaken: '51m 30s',
    exam: 'SSC CGL'
  },
  {
    rank: 3,
    name: 'Vikram Singh Meena',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    score: 188.5,
    totalMarks: 200,
    accuracy: 95.8,
    timeTaken: '49m 05s',
    exam: 'RRB NTPC'
  },
  {
    rank: 4,
    name: 'Divya Srivastava',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    score: 186.0,
    totalMarks: 200,
    accuracy: 94.2,
    timeTaken: '53m 40s',
    exam: 'SSC CGL'
  },
  {
    rank: 5,
    name: 'Mohit Kumar Rawat',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    score: 184.0,
    totalMarks: 200,
    accuracy: 93.6,
    timeTaken: '52m 10s',
    exam: 'RRB Group D'
  },
  {
    rank: 6,
    name: 'Sneha Banerjee',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    score: 182.5,
    totalMarks: 200,
    accuracy: 92.9,
    timeTaken: '54m 15s',
    exam: 'SSC CHSL'
  },
  {
    rank: 7,
    name: 'Aman Deep Sharma',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    score: 180.0,
    totalMarks: 200,
    accuracy: 91.5,
    timeTaken: '55m 02s',
    exam: 'SSC CGL'
  },
  {
    rank: 8,
    name: 'Kavita Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    score: 178.5,
    totalMarks: 200,
    accuracy: 91.0,
    timeTaken: '53m 22s',
    exam: 'RRB NTPC'
  },
  {
    rank: 9,
    name: 'Suresh Yadav',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    score: 176.0,
    totalMarks: 200,
    accuracy: 90.4,
    timeTaken: '56m 12s',
    exam: 'SSC GD'
  },
  {
    rank: 10,
    name: 'Ritu Choudhary',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    score: 174.5,
    totalMarks: 200,
    accuracy: 89.8,
    timeTaken: '55m 50s',
    exam: 'SSC CGL'
  }
];

export const SAMPLE_RECENT_RESULT: TestResult = {
  id: 'res-sample-01',
  testId: 'test-mock-cgl-01',
  testTitle: 'SSC CGL Tier-1 All India Live Mock #01',
  examType: 'SSC CGL',
  date: 'Today, 11:20 AM',
  totalMarks: 50,
  score: 38.5,
  correctCount: 20,
  incorrectCount: 3,
  unattemptedCount: 2,
  accuracy: 87.0,
  percentile: 94.6,
  userRank: 14,
  totalParticipants: 28410,
  timeTakenSeconds: 1420,
  weakAreas: [
    {
      topic: 'Geometry - Circles & Chords',
      subject: 'Quantitative Aptitude',
      totalQuestions: 2,
      correctQuestions: 0,
      accuracy: 0,
      status: 'weak'
    },
    {
      topic: 'English - Error Spotting (Proximity Rule)',
      subject: 'English Language',
      totalQuestions: 2,
      correctQuestions: 1,
      accuracy: 50,
      status: 'weak'
    }
  ],
  strongAreas: [
    {
      topic: 'Indian Polity - Articles & Writs',
      subject: 'General Awareness',
      totalQuestions: 3,
      correctQuestions: 3,
      accuracy: 100,
      status: 'strong'
    },
    {
      topic: 'Reasoning - Coding & Syllogism',
      subject: 'General Intelligence & Reasoning',
      totalQuestions: 4,
      correctQuestions: 4,
      accuracy: 100,
      status: 'strong'
    },
    {
      topic: 'Arithmetic - Time & Work',
      subject: 'Quantitative Aptitude',
      totalQuestions: 3,
      correctQuestions: 3,
      accuracy: 100,
      status: 'strong'
    }
  ],
  recommendedTests: [
    {
      id: 'rec-01',
      title: 'Geometry & Circles Target Fix Drill',
      type: 'weak_fix',
      topic: 'Geometry - Circles & Chords',
      subject: 'Quantitative Aptitude',
      questionsCount: 10,
      duration: '12 min'
    },
    {
      id: 'rec-02',
      title: 'Polity & Articles Mastery Challenge',
      type: 'strong_level_up',
      topic: 'Indian Polity - Constitution',
      subject: 'General Awareness',
      questionsCount: 15,
      duration: '10 min'
    }
  ],
  mistakeCountAdded: 3,
  userAnswers: []
 };

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-ssc-quant-mastery',
    title: 'SSC CGL & CHSL Complete Quant Formula & Speed Tricks',
    titleHi: 'एसएससी सीजीएल और सीएचएसएल संपूर्ण गणित फॉर्मूला व स्पीड ट्रिक्स',
    exam: 'SSC',
    examBadge: 'SSC CGL / CHSL',
    subject: 'Quantitative Aptitude',
    instructor: 'Abhishek Sharma (AIR 14)',
    rating: 4.9,
    ratingCount: 3820,
    enrolledCount: 14250,
    totalDurationHours: 18.5,
    totalLessons: 24,
    isPro: false,
    ocCost: 0,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    description: 'Master fast calculation techniques, shortcut approaches to Profit & Loss, Percentages, and Advanced Algebra designed for Tier-1 & Tier-2.',
    descriptionHi: 'टियर-1 और टियर-2 के लिए तैयार की गई तेज गणना तकनीक, लाभ और हानि, प्रतिशत और बीजगणित के शॉर्टकट सीखें।',
    modules: [
      {
        id: 'mod-arithmetic-01',
        title: 'Module 1: High Speed Arithmetic & Percentage Matrix',
        titleHi: 'मॉड्यूल 1: हाई स्पीड अंकगणित और प्रतिशत मैट्रिक्स',
        lessons: [
          {
            id: 'les-arith-01',
            title: 'Fraction to Percentage Conversion & 3-Second Mental Math',
            titleHi: 'भिन्न से प्रतिशत रूपांतरण और 3-सेकंड मानसिक गणित ट्रिक',
            durationMinutes: 22,
            type: 'video',
            transcriptEn: 'In this lesson, we break down standard fractions from 1/2 to 1/25 into exact percentages. You will learn how multiplying factors allow instant calculation of discounts, successive discounts, and compounding without using pen and paper.',
            transcriptHi: 'इस पाठ में हम 1/2 से 1/25 तक के भिन्नों को प्रतिशत में बदलते हैं। पेन और कागज के बिना छूट और क्रमिक वृद्धि की त्वरित गणना सीखें।',
            keyFormulas: [
              '1/7 = 14.28% | 1/8 = 12.5% | 1/13 = 7.69% | 1/17 = 5.88%',
              'Successive Increase: a + b + (ab / 100)%',
              'Equivalent Discount: d1 + d2 - (d1 * d2 / 100)%'
            ],
            practiceQuizId: 'test-quant-sub-01'
          },
          {
            id: 'les-arith-02',
            title: 'Profit, Loss & Dishonest Shopkeeper Shortcut Method',
            titleHi: 'लाभ, हानि और बेईमान दुकानदार शॉर्टकट विधि',
            durationMinutes: 28,
            type: 'video',
            transcriptEn: 'Step-by-step masterclass on solving marked price, cost price ratios (MP/CP = (100 + P%)/(100 - D%)) and true weight vs false weight fraud problems that repeat every year in SSC CGL.',
            transcriptHi: 'अंकित मूल्य, क्रय मूल्य अनुपात और झूठे वजन वाले प्रश्नों को 15 सेकंड में हल करने का फॉर्मूला।',
            keyFormulas: [
              'MP / CP = (100 + Profit%) / (100 - Discount%)',
              'Dishonest Dealer Profit% = (Error / (True Value - Error)) * 100%'
            ],
            practiceQuizId: 'test-quant-sub-01'
          },
          {
            id: 'les-arith-03',
            title: 'Time & Work: Efficiency Ratios and Alternate Day Concept',
            titleHi: 'कार्य और समय: कार्यक्षमता अनुपात और एकांतर दिन सिद्धांत',
            durationMinutes: 34,
            type: 'video',
            transcriptEn: 'Learn the LCM-unit method to compute individual and collective work rates. Understand negative work rates (pipes & cistern leaks) and rotating worker cycles.',
            transcriptHi: 'एलसीएम-यूनिट पद्धति से कार्यक्षमता निकालें और बारी-बारी काम करने वाले प्रश्नों को हल करें।',
            keyFormulas: [
              'Total Work = Efficiency * Time Taken',
              'M1 * D1 * H1 / W1 = M2 * D2 * H2 / W2'
            ],
            practiceQuizId: 'test-mock-cgl-01'
          }
        ]
      },
      {
        id: 'mod-algebra-02',
        title: 'Module 2: Advanced Algebra & Geometry Invariants',
        titleHi: 'मॉड्यूल 2: उन्नत बीजगणित और ज्यामिति',
        lessons: [
          {
            id: 'les-alg-01',
            title: 'Value Putting Strategy in Symmetric Algebraic Equations',
            titleHi: 'सममित बीजगणितीय समीकरणों में मान रखने (Value Putting) की रणनीति',
            durationMinutes: 26,
            type: 'video',
            transcriptEn: 'Why expand lengthy polynomial identities when setting a = b = c = 1 or x = 0 gives the exact option in 5 seconds? We solve 15 TCS PYQs using pure substitution.',
            transcriptHi: 'लंबे सूत्रों के विस्तार के बजाय a = b = c = 1 रखकर 5 सेकंड में सही विकल्प खोजने का नियम।',
            keyFormulas: [
              'If a + b + c = 0, then a^3 + b^3 + c^3 = 3abc',
              'If x + 1/x = k, then x^2 + 1/x^2 = k^2 - 2, x^3 + 1/x^3 = k^3 - 3k'
            ],
            practiceQuizId: 'test-pyq-cgl-2024'
          },
          {
            id: 'les-geom-02',
            title: 'Circles, Tangents, Secants & Direct Common Tangent (DCT)',
            titleHi: 'वृत्त, स्पर्श रेखाएं, छेदक रेखा और उभयनिष्ठ अनुस्पर्श रेखा',
            durationMinutes: 31,
            type: 'video',
            transcriptEn: 'Comprehensive drill on circle geometry properties: chords equidistant from center, angle subtended by arc at center, and formula for Direct Common Tangent length.',
            transcriptHi: 'केंद्र से जीवाओं की दूरी, स्पर्श रेखा और उभयनिष्ठ स्पर्श रेखा (DCT व TCT) की लंबाई के सूत्र।',
            keyFormulas: [
              'DCT Length = sqrt(d^2 - (r1 - r2)^2)',
              'TCT Length = sqrt(d^2 - (r1 + r2)^2)',
              'Intersecting Chords: PA * PB = PC * PD'
            ],
            practiceQuizId: 'rec-01'
          }
        ]
      }
    ]
  },
  {
    id: 'course-rrb-science-mastery',
    title: 'Railway NTPC & Group D General Science Capsule (Physics & Bio)',
    titleHi: 'रेलवे एनटीपीसी और ग्रुप डी सामान्य विज्ञान कैप्सूल (भौतिकी और जीवविज्ञान)',
    exam: 'Railway',
    examBadge: 'RRB NTPC / Group D',
    subject: 'General Science',
    instructor: 'Dr. Vivek Verma (Science Faculty)',
    rating: 4.8,
    ratingCount: 2940,
    enrolledCount: 18920,
    totalDurationHours: 14.0,
    totalLessons: 18,
    isPro: false,
    ocCost: 0,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    description: 'Target 25/25 in General Science for Railway exams. Deep dive into NCERT 9th & 10th Physics numericals, human physiology, and chemical equations.',
    descriptionHi: 'रेलवे परीक्षाओं में सामान्य विज्ञान में पूरे अंक प्राप्त करने के लिए एनसीईआरटी 9वीं व 10वीं के भौतिकी न्यूमेरिकल, जीवविज्ञान व रासायनिक समीकरण।',
    modules: [
      {
        id: 'mod-phys-01',
        title: 'Module 1: Mechanics, Optics & Electricity Numericals',
        titleHi: 'मॉड्यूल 1: यांत्रिकी, प्रकाशिकी और विद्युत न्यूमेरिकल',
        lessons: [
          {
            id: 'les-phys-01',
            title: 'Newton Laws of Motion, Work, Power & Kinetic Energy',
            titleHi: 'न्यूटन के गति के नियम, कार्य, शक्ति और गतिज ऊर्जा',
            durationMinutes: 25,
            type: 'video',
            transcriptEn: 'Railway Group D and NTPC consistently test kinetic energy doubling and momentum conservation. Learn sign convention and SI units effortlessly.',
            transcriptHi: 'गतिज ऊर्जा, संवेग संरक्षण और कार्य-ऊर्जा प्रमेय पर आधारित रेलवे प्रश्नों का अभ्यास।',
            keyFormulas: [
              'Kinetic Energy: KE = 1/2 * m * v^2 = p^2 / (2m)',
              'Potential Energy: PE = m * g * h',
              'Ohm Law: V = I * R | Power: P = V * I = I^2 * R = V^2 / R'
            ],
            practiceQuizId: 'test-mock-rrb-01'
          },
          {
            id: 'les-optics-02',
            title: 'Mirror & Lens Formula, Refractive Index & Total Internal Reflection',
            titleHi: 'दर्पण और लेंस सूत्र, अपवर्तनांक और पूर्ण आंतरिक परावर्तन',
            durationMinutes: 29,
            type: 'video',
            transcriptEn: 'Master focal lengths of concave and convex mirrors. Understand fiber optics, mirage in deserts, and sparkling diamonds via Total Internal Reflection.',
            transcriptHi: 'उत्तल व अवतल दर्पण के फोकस नियम, प्रकाशिक तंतु और पूर्ण आंतरिक परावर्तन (TIR) का विवरण।',
            keyFormulas: [
              'Mirror Formula: 1/f = 1/v + 1/u',
              'Lens Formula: 1/f = 1/v - 1/u',
              'Lens Power (Diopter): P = 1 / f(in meters)'
            ],
            practiceQuizId: 'test-mock-rrb-01'
          }
        ]
      },
      {
        id: 'mod-bio-02',
        title: 'Module 2: Human Organ Systems, Vitamins & Diseases',
        titleHi: 'मॉड्यूल 2: मानव अंग तंत्र, विटामिन और रोग',
        lessons: [
          {
            id: 'les-bio-01',
            title: 'Circulatory System, Blood Groups & Cardiac Cycle',
            titleHi: 'परिसंचरण तंत्र, रक्त समूह (ABO & Rh) और हृदय चक्र',
            durationMinutes: 24,
            type: 'video',
            transcriptEn: 'Comprehensive guide to red blood cells, white blood cells, universal donor (O negative), universal recipient (AB positive), and blood pressure norms.',
            transcriptHi: 'आरबीसी, डब्ल्यूबीसी, रक्त समूह (सर्वदाता O-, सर्वग्राही AB+) और सामान्य रक्तचाप (120/80 mmHg)।',
            keyFormulas: [
              'Normal BP: 120/80 mmHg (Systolic/Diastolic)',
              'Universal Donor: O negative | Universal Recipient: AB positive'
            ],
            practiceQuizId: 'test-mock-rrb-01'
          }
        ]
      }
    ]
  },
  {
    id: 'course-ssc-polity-static-gk',
    title: 'Indian Polity Constitution & Static GK Master Class',
    titleHi: 'भारतीय राजव्यवस्था, संविधान और स्टैटिक जीके मास्टर क्लास',
    exam: 'Both',
    examBadge: 'SSC & Railway',
    subject: 'General Awareness',
    instructor: 'Pooja Kashyap (Civil Services Mentor)',
    rating: 4.9,
    ratingCount: 4120,
    enrolledCount: 22100,
    totalDurationHours: 16.0,
    totalLessons: 20,
    isPro: true,
    ocCost: 150,
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    description: 'Learn all important Articles, Constitutional Amendments, President Powers, Fundamental Rights, Writs, and Static GK (National Parks, Folk Dances, Biosphere reserves).',
    descriptionHi: 'महत्वपूर्ण अनुच्छेद, संविधान संशोधन, राष्ट्रपति की शक्तियां, मौलिक अधिकार, रिट और स्टैटिक जीके (राष्ट्रीय उद्यान, लोक नृत्य)।',
    modules: [
      {
        id: 'mod-polity-01',
        title: 'Module 1: Fundamental Rights, DPSP & Writs',
        titleHi: 'मॉड्यूल 1: मौलिक अधिकार, नीति निर्देशक तत्व व रिट',
        lessons: [
          {
            id: 'les-pol-01',
            title: 'Article 12 to 35: Fundamental Rights & 5 Prerogative Writs',
            titleHi: 'अनुच्छेद 12 से 35: मौलिक अधिकार और 5 रिट (Habeas Corpus etc.)',
            durationMinutes: 30,
            type: 'video',
            transcriptEn: 'In-depth breakdown of Article 21 (Right to Life), Article 19 (6 Freedoms), and the 5 writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo-Warranto.',
            transcriptHi: 'अनुच्छेद 21 (जीने का अधिकार), अनुच्छेद 19 और सुप्रीम कोर्ट (Art 32) व हाईकोर्ट (Art 226) द्वारा जारी की जाने वाली 5 रिट का संपूर्ण विश्लेषण।',
            keyFormulas: [
              'Article 32: Constitutional Remedies (Soul of Constitution - Ambedkar)',
              'Article 226: High Court writ jurisdiction (wider than Art 32)'
            ],
            practiceQuizId: 'rec-02'
          }
        ]
      }
    ]
  },
  {
    id: 'course-reasoning-speed',
    title: 'Speed Reasoning & Logical Deduction (All One Day Exams)',
    titleHi: 'स्पीड रीजनिंग और तार्किक निगमन (सभी वन डे परीक्षाएं)',
    exam: 'Both',
    examBadge: 'SSC & Railway',
    subject: 'General Intelligence & Reasoning',
    instructor: 'Rajeev Singhania',
    rating: 4.9,
    ratingCount: 3180,
    enrolledCount: 16400,
    totalDurationHours: 12.0,
    totalLessons: 16,
    isPro: false,
    ocCost: 0,
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    description: 'Zero pen-paper syllogism rules (100-50 method), mirror images, blood relations tree, and circular seating arrangements for maximum speed.',
    descriptionHi: 'बिना पेन-कागज के न्याय निगमन (100-50 विधि), रक्त संबंध और बैठक व्यवस्था को तेजी से हल करने के गुर।',
    modules: [
      {
        id: 'mod-reas-01',
        title: 'Module 1: Syllogism 100-50 Rule & Coding Matrix',
        titleHi: 'मॉड्यूल 1: न्याय निगमन 100-50 नियम व कोडिंग मैट्रिक्स',
        lessons: [
          {
            id: 'les-reas-01',
            title: 'Solve Any Syllogism in 10 Seconds Without Venn Diagrams',
            titleHi: 'बिना वेन आरेख के 10 सेकंड में न्याय निगमन हल करें',
            durationMinutes: 20,
            type: 'video',
            transcriptEn: 'Traditional Venn diagrams take 40-50 seconds per question. Learn the infallible 100-50 rule: All A are B (100, 50), Some A are B (50, 50), No A is B (100, 100).',
            transcriptHi: 'पारंपरिक वेन आरेख के स्थान पर 100-50 नियम सीखें और संभावना (Possibility) वाले प्रश्नों में कभी गलती न करें।',
            keyFormulas: [
              'All: Subject 100, Predicate 50 | Some: 50, 50 | No: 100, 100',
              'Income cannot exceed expenditure rule'
            ],
            practiceQuizId: 'test-mock-cgl-01'
          }
        ]
      }
    ]
  }
];
