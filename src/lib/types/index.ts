export interface Category {
  key: string;
  label: string;
  difficulty: 'easy' | 'hard';
}

export interface Question {
  imageUrl: string;
  options: string[];
  correctTitle: string;
}

export interface GameState {
  lives: number;
  score: number;
  timer: number;
  inQuiz: boolean;
  answered: boolean;
  userAnswer: string;
  blurAmount: number;
}

export interface QuizState {
  currentQuestion: Question | null;
  selectedCategory: string;
  gameOver: boolean;
} 