export type Language = 'en' | 'hi';

export interface ExamConfig {
  activeVersion: string;
  examName: string;
  lastVerified: string;
  verifiedBy: string;
  source: string;
  officialLink: string;
  status: string;
  statusBadge: string;
  examDates: string;
  examDateNote: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: number;
  negativeMarkingRule: string;
  examMode: string;
  eligibilityBasic: string;
  whatsNewInPET: { title: string; detail: string }[];
  patternHistory: {
    year: string;
    version: string;
    questions: number;
    marks: number;
    duration: number;
    negativeMarking: number;
    notes: string;
  }[];
}

export interface SubjectItem {
  id: string;
  code: string;
  name: string;
  nameHi: string;
  marks: number;
  questions: number;
  icon: string;
  color: string;
  category: string;
  notes?: string;
  topics: string[];
}

export interface TopicItem {
  id: string;
  subjectId: string;
  subject: string;
  name: string;
  nameHi: string;
  category: string;
  concept: string;
  importantFacts: string[];
  upConnection?: string;
  ncertRef: string;
  bookRef: string;
  tipsAndTricks?: string;
  formulaShortcut?: string;
  commonMistake?: string;
}

export interface QuestionItem {
  id: string;
  exam: string;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard' | string;
  type: string;
  question: string;
  questionHi?: string;
  options: string[];
  optionsHi?: string[];
  answer: number;
  explanation: string;
  sourceType: string;
  reference: string;
  tags: string[];
}

export interface PYQItem {
  id: string;
  year: number;
  shift: string;
  subject: string;
  topic: string;
  question: string;
  questionHi?: string;
  options: string[];
  answer: number;
  explanation: string;
  officialVerification: string;
  difficulty: string;
}

export interface BookItem {
  id: string;
  title: string;
  titleHi?: string;
  author: string;
  publisher: string;
  edition: string;
  language: string;
  category: string;
  level: string;
  subject: string;
  rating: number;
  ratingCount: number;
  pages: number;
  price: string;
  features: string[];
  purpose: string;
  bestFor: string;
  syllabusMapping: string[];
  url: string;
  retailerLinks: { name: string; url: string }[];
  isFeatured?: boolean;
}

export interface CurrentAffairsItem {
  id: string;
  headline: string;
  headlineHi?: string;
  date: string;
  category: string;
  summary: string;
  facts: string[];
  petRelevance: string;
  upRelevance: string;
  mcqs: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
  flashcard: {
    front: string;
    back: string;
  };
}

export interface FlashcardItem {
  id: string;
  subject: string;
  topic: string;
  front: string;
  back: string;
  importance: string;
  difficulty: string;
}

export interface UserProgress {
  attemptedQuestions: { [id: string]: { selected: number; correct: boolean; timestamp: number } };
  bookmarkedQuestionIds: string[];
  mistakeIds: string[];
  revisionTopics: { [topicId: string]: { nextReviewDate: string; stage: number } };
  mockScores: { date: string; score: number; total: number; accuracy: number; durationSeconds: number }[];
  streakDays: number;
  lastStudyDate: string;
}
