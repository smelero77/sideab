import { writable } from 'svelte/store';
import type { QuizState, Question } from '$lib/types';

const initialState: QuizState = {
  currentQuestion: null,
  selectedCategory: '',
  gameOver: false
};

function createQuizStore() {
  const { subscribe, set, update } = writable<QuizState>(initialState);

  return {
    subscribe,
    reset: () => set(initialState),
    setQuestion: (question: Question | null) => update(state => ({ ...state, currentQuestion: question })),
    setCategory: (category: string) => update(state => ({ ...state, selectedCategory: category })),
    setGameOver: (isGameOver: boolean) => update(state => ({ ...state, gameOver: isGameOver }))
  };
}

export const quizStore = createQuizStore(); 