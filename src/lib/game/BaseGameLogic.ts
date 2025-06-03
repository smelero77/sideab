import { writable, derived, get } from 'svelte/store';
import { GameDifficulty, type GameState, type MusicQuestion } from '$lib/types/game';
import type { BaseGame, GameSettings, GameType } from '$lib/types/game';
import { GAME } from '$lib/constants';

export abstract class BaseGameLogic {
  protected gameState = writable<GameState>({
    isGameOver: false,
    currentQuestion: null,
    score: 0,
    lives: 3,
    timer: 0
  });

  protected settings = writable<GameSettings>({
    theme: 'dark',
    soundEnabled: true,
    musicEnabled: true,
    defaultDifficulty: GameDifficulty.EASY,
    showSettings: false
  });

  protected timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(protected difficulty: GameDifficulty) {}

  // Métodos abstractos que deben ser implementados por cada tipo de juego
  protected abstract loadQuestion(): Promise<void>;
  public abstract handleAnswer(answer: string): void;
  protected abstract calculateScore(): number;

  // Métodos comunes para todos los juegos
  public start(): Promise<void> {
    this.gameState.update(state => ({
      ...state,
      isActive: true,
      isPaused: false,
      isGameOver: false,
      score: 0,
      lives: this.getLives(),
      timer: 0,
      currentQuestion: null
    }));
    this.startTimer();
    return this.loadQuestion();
  }

  public pauseGame(): void {
    this.gameState.update(state => ({ ...state, isPaused: true }));
    this.clearTimer();
  }

  public resumeGame(): void {
    this.gameState.update(state => ({ ...state, isPaused: false }));
    this.startTimer();
  }

  protected startTimer(): void {
    this.clearTimer();
    
    this.timerInterval = setInterval(() => {
      this.gameState.update(state => {
        const newTimer = state.timer + (GAME.TIMER_INTERVAL / 1000);
        if (newTimer >= this.getTimeLimit()) {
          this.handleTimeUp();
          return { ...state, timer: this.getTimeLimit() };
        }
        return { ...state, timer: newTimer };
      });
    }, GAME.TIMER_INTERVAL);
  }

  protected clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  protected handleTimeUp(): void {
    this.gameState.update(state => ({
      ...state,
      lives: state.lives - 1
    }));

    setTimeout(() => {
      const state = get(this.gameState);
      if (state.lives > 0) {
        this.loadQuestion();
        this.startTimer();
      } else {
        this.endGame();
      }
    }, GAME.ANSWER_DELAY);
  }

  protected endGame(): void {
    this.clearTimer();
    this.gameState.update(state => ({
      ...state,
      isActive: false,
      isGameOver: true
    }));
  }

  public cleanup(): void {
    this.clearTimer();
  }

  // Getters para el estado del juego
  public get isGameOver(): boolean {
    return get(this.gameState).isGameOver;
  }

  public get currentQuestion(): MusicQuestion | null {
    return get(this.gameState).currentQuestion;
  }

  public get score(): number {
    return get(this.gameState).score;
  }

  public get lives(): number {
    return get(this.gameState).lives;
  }

  public get timer(): number {
    return get(this.gameState).timer;
  }

  protected getTimeLimit(): number {
    switch (this.difficulty) {
      case GameDifficulty.EASY:
        return 120;
      case GameDifficulty.MEDIUM:
        return 90;
      case GameDifficulty.HARD:
        return 60;
      default:
        return 120;
    }
  }

  protected getLives(): number {
    switch (this.difficulty) {
      case GameDifficulty.EASY:
        return 3;
      case GameDifficulty.MEDIUM:
        return 2;
      case GameDifficulty.HARD:
        return 1;
      default:
        return 3;
    }
  }
} 