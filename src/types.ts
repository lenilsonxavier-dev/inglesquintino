/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VocabularyItem {
  english: string;
  portuguese: string;
  icon: string;
  soundText?: string;
  color?: string; // used for custom styling
}

export type SlideType = 'welcome' | 'greetings' | 'colors' | 'school' | 'animals' | 'feelings' | 'values' | 'quiz' | 'certificate';

export interface InteractiveSlide {
  id: string;
  type: SlideType;
  title: string;
  subtitle: string;
  description: string;
  colorTheme: string; // Tailwind bg color class
  vocabList?: VocabularyItem[];
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

export interface ScoreState {
  score: number;
  totalQuestions: number;
  completedCategories: string[];
  isPassed: boolean;
}
