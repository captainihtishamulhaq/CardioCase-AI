export type ScreenType =
  | 'home'
  | 'login'
  | 'dashboard'
  | 'clinical_case'
  | 'topic_explainer'
  | 'mcq_generator'
  | 'notes_summarizer'
  | 'viva_practice'
  | 'profile';

export interface UserProfile {
  email: string;
  fullName: string;
  role: 'student' | 'educator' | 'clinician';
  institution: string;
  xp: number;
  quizzesCompleted: number;
  casesAnalyzed: number;
  topicsExplored: number;
  summariesCreated: number;
  streakDays: number;
}

export interface ClinicalCase {
  id: string;
  title: string;
  symptoms: string;
  demographics: string;
  differentials: {
    diagnosis: string;
    probability: 'High' | 'Moderate' | 'Low';
    rationale: string;
  }[];
  investigations: {
    test: string;
    expectedFindings: string;
    priority: 'Immediate' | 'Routine';
  }[];
  learningPoints: string[];
  redFlags: string[];
}

export interface TopicExplanation {
  topic: string;
  definition: string;
  causes: string[];
  symptoms: string[];
  diagnosis: string[];
  management: string[];
  mnemonics: {
    phrase: string;
    expansion: { key: string; text: string }[];
  }[];
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface NotesSummary {
  title: string;
  summary: string;
  keyPoints: string[];
  examTips: string[];
}

export interface VivaQuestion {
  id: string;
  question: string;
  modelAnswer: string;
  expectedKeywords: string[];
}

export interface VivaSession {
  currentQuestionIndex: number;
  questions: VivaQuestion[];
  userAnswers: { [key: string]: string };
  feedback: { [key: string]: { score: number; evaluation: string; tips: string } };
  isCompleted: boolean;
}
