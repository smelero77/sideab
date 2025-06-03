import { writable, derived, get } from 'svelte/store';
import { GameManager } from '$lib/game/GameManager';
import type { GameState, GameSettings } from '$lib/types/game';
import { GameDifficulty } from '$lib/types/game';

const gameManager = GameManager.getInstance();

// Estado del juego
export const gameState = writable<GameState>({
  isGameOver: false,
  isActive: false,
  isPaused: false,
  currentQuestion: null,
  score: 0,
  lives: 3,
  timer: 0
});

// Configuración del juego
export const settings = writable<GameSettings>({
  theme: 'dark',
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  defaultDifficulty: GameDifficulty.EASY,
  showSettings: false
});

// Stores derivados para facilitar el acceso a propiedades específicas
export const score = derived(gameState, $gameState => $gameState.score);
export const lives = derived(gameState, $gameState => $gameState.lives);
export const timer = derived(gameState, $gameState => $gameState.timer);
export const currentQuestion = derived(gameState, $gameState => $gameState.currentQuestion);
export const isGameOver = derived(gameState, $gameState => $gameState.isGameOver);

// Métodos para actualizar el estado
export function updateGameState(newState: Partial<GameState>) {
  gameState.update(state => ({ ...state, ...newState }));
}

export function updateSettings(newSettings: Partial<GameSettings>) {
  settings.update(state => ({ ...state, ...newSettings }));
}

// Métodos para interactuar con el juego
export function handleAnswer(answer: string) {
  gameManager.handleAnswer(answer);
}

export function startGame() {
  return gameManager.startGame();
}

export function pauseGame() {
  gameManager.pauseGame();
}

export function resumeGame() {
  gameManager.resumeGame();
}

export function cleanup() {
  gameManager.cleanup();
} 