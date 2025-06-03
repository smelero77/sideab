/**
 * Tipo base para todos los juegos
 */
export interface BaseGame {
  id: string;
  type: GameType;
  name: string;
  description: string;
  difficulty: GameDifficulty;
  maxLives: number;
  timeLimit: number;
  icon: string;
}

/**
 * Tipos de juegos disponibles
 */
export enum GameType {
  MUSIC_QUIZ = 'MUSIC_QUIZ',
  PICTURE_QUIZ = 'PICTURE_QUIZ',
  WORD_QUIZ = 'WORD_QUIZ',
  // Añadir más tipos según sea necesario
}

/**
 * Dificultades disponibles
 */
export enum GameDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

/**
 * Estado base del juego
 */
export interface GameState {
  isActive: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  score: number;
  lives: number;
  timer: number;
  currentQuestion: MusicQuestion | null;
}

/**
 * Configuración base del juego
 */
export interface GameSettings {
  theme: 'dark' | 'neon';
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
  defaultDifficulty: GameDifficulty;
  showSettings: boolean;
}

export interface MusicQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  imageUrl: string;
} 