/**
 * A single quiz question returned from our server.
 */
export interface Question {
  imageUrl: string;       // Discogs cover art URL
  correctTitle: string;   // The true title of this release
  options: string[];      // Exactly 5 titles: one correctTitle + four decoys, in random order
}

/**
 * Each category‐level pair that the UI can request.
 */
export interface CategoryLevel {
  key: string;              // e.g. "punk77_easy"
  label: string;            // e.g. "Punk '77 (Easy)"
  genre: string;            // e.g. "punk"
  year: number;             // e.g. 1977
  difficulty: "easy" | "hard";
}

export interface Category {
  key: string;
  label: string;
  difficulty: 'easy' | 'hard';
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