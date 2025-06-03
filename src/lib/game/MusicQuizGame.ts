import { writable, get } from 'svelte/store';
import { BaseGameLogic } from './BaseGameLogic';
import { GameType, GameDifficulty, type MusicQuestion } from '$lib/types/game';
import { GAME } from '$lib/constants';

export class MusicQuizGame extends BaseGameLogic {
  private userAnswer = writable<string>('');
  private answered = writable<boolean>(false);
  private questions: MusicQuestion[] = [];
  private currentQuestionIndex = 0;

  constructor(difficulty: GameDifficulty) {
    super(difficulty);
  }

  public async start(): Promise<void> {
    // TODO: Cargar preguntas desde la base de datos
    this.questions = [
      {
        id: 1,
        question: '¿Cuál es el nombre de esta canción?',
        options: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'],
        correctAnswer: 'Opción 1',
        imageUrl: 'https://example.com/image1.jpg'
      }
    ];
    this.currentQuestionIndex = 0;
    await this.loadQuestion();
  }

  public cleanup(): void {
    this.questions = [];
    this.currentQuestionIndex = 0;
  }

  protected async loadQuestion(): Promise<void> {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.gameState.update(state => ({
      ...state,
      currentQuestion
    }));
  }

  public async handleAnswer(answer: string): Promise<void> {
    this.userAnswer.set(answer);
    this.answered.set(true);

    const currentQ = this.questions[this.currentQuestionIndex];
    if (currentQ && answer === currentQ.correctAnswer) {
      this.gameState.update(state => ({
        ...state,
        score: state.score + GAME.SCORE_INCREMENT
      }));
    } else {
      this.gameState.update(state => ({
        ...state,
        lives: state.lives - 1
      }));
    }

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

  protected calculateScore(): number {
    return get(this.gameState).score;
  }
} 