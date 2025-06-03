import { writable, derived, type Writable, type Unsubscriber } from 'svelte/store';
import { browser } from '$app/environment';
import { get } from 'svelte/store';

// Tipos
export interface Question {
  imageUrl: string;
  correctTitle: string;
  options: string[];
}

export interface Category {
  key: string;
  label: string;
}

export interface GameSettings {
  theme: 'dark' | 'neon';
  defaultDifficulty: 'easy' | 'hard';
  showSettings: boolean;
}

// Categorías disponibles
export const allCategories: Category[] = [
  { key: 'punk77_easy', label: 'Punk \'77 (Easy)' },
  { key: 'punk77_hard', label: 'Punk \'77 (Hard)' },
  { key: 'metal_easy', label: 'Metal (Easy)' },
  { key: 'metal_hard', label: 'Metal (Hard)' },
  { key: 'rock_easy', label: 'Rock (Easy)' },
  { key: 'rock_hard', label: 'Rock (Hard)' }
];

// Stores principales
export const selectedKey = writable<string>(allCategories[0].key);
export const lives = writable<number>(3);
export const score = writable<number>(0);
export const timer = writable<number>(0);
export const inQuiz = writable<boolean>(false);
export const currentQuestion = writable<Question | null>(null);
export const answered = writable<boolean>(false);
export const userAnswer = writable<string>('');
export const blurAmount = writable<number>(0);

// Configuración persistente
function createSettings() {
  const defaultSettings: GameSettings = {
    theme: 'dark',
    defaultDifficulty: 'easy',
    showSettings: false
  };

  const { subscribe, set, update } = writable<GameSettings>(defaultSettings, () => {
    if (browser) {
      const saved = localStorage.getItem('gameSettings');
      if (saved) set(JSON.parse(saved));
      
      const unsubscribe: Unsubscriber = subscribe((val: GameSettings) => {
        localStorage.setItem('gameSettings', JSON.stringify(val));
      });
      
      return unsubscribe;
    }
    return () => {};
  });

  return { subscribe, set, update };
}

export const settings = createSettings();

// Stores derivados
export const gameOver = derived(lives, ($lives) => $lives <= 0);

export const timerPercentage = derived(timer, ($timer) => {
  const maxTime = 10;
  return Math.min(($timer / maxTime) * 100, 100);
});

// Derivar blurAmount del timer
$: {
  const maxTime = 10;
  const maxBlur = 15;
  const currentTime = get(timer);
  const newBlur = Math.max(0, maxBlur - (currentTime * (maxBlur / maxTime)));
  blurAmount.set(newBlur);
}

// Funciones de utilidad
export function resetGame() {
  lives.set(3);
  score.set(0);
  timer.set(0);
  inQuiz.set(false);
  currentQuestion.set(null);
  answered.set(false);
  userAnswer.set('');
  blurAmount.set(0);
}

export async function startQuiz(category: string) {
  lives.set(3);
  score.set(0);
  timer.set(0);
  inQuiz.set(true);
  answered.set(false);
  userAnswer.set('');
  blurAmount.set(15);
  
  // Extraer género y dificultad de la categoría
  const [genre, difficulty] = category.split('_');
  
  try {
    const response = await fetch(`/api/question/${genre}/${difficulty}`);
    if (!response.ok) {
      throw new Error('Error al cargar la pregunta');
    }
    const question = await response.json();
    currentQuestion.set(question);
  } catch (error) {
    console.error('Error al cargar la pregunta:', error);
    // En caso de error, mostrar un mensaje al usuario
    currentQuestion.set(null);
  }
}

// Función para cargar la siguiente pregunta
export async function loadNextQuestion() {
  answered.set(false);
  userAnswer.set('');
  timer.set(0);
  blurAmount.set(15);
  
  const category = get(selectedKey);
  const [genre, difficulty] = category.split('_');
  
  try {
    const response = await fetch(`/api/question/${genre}/${difficulty}`);
    if (!response.ok) {
      throw new Error('Error al cargar la pregunta');
    }
    const question = await response.json();
    currentQuestion.set(question);
  } catch (error) {
    console.error('Error al cargar la pregunta:', error);
    // En caso de error, mostrar un mensaje al usuario
    currentQuestion.set(null);
  }
} 