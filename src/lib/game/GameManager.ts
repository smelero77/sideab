import { writable, get } from 'svelte/store';
import { BaseGameLogic } from './BaseGameLogic';
import { GameType, GameDifficulty, type BaseGame } from '$lib/types/game';
import { MusicQuizGame } from './MusicQuizGame';

export class GameManager {
  private static instance: GameManager;
  public currentGame: BaseGameLogic | null = null;
  
  public readonly availableGames = writable<BaseGame[]>([]);
  public readonly selectedGameType = writable<GameType | null>(null);
  public readonly selectedDifficulty = writable<GameDifficulty>(GameDifficulty.EASY);
  public showSettings = writable<boolean>(false);

  private constructor() {
    this.initializeGames();
  }

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  private initializeGames(): void {
    const games: BaseGame[] = [
      {
        id: 'punk77',
        type: GameType.MUSIC_QUIZ,
        name: 'Punk \'77 Quiz',
        description: 'Pon a prueba tus conocimientos sobre el punk del 77',
        difficulty: GameDifficulty.EASY,
        maxLives: 3,
        timeLimit: 10
      },
      {
        id: 'metal',
        type: GameType.MUSIC_QUIZ,
        name: 'Metal Quiz',
        description: '¿Cuánto sabes sobre metal?',
        difficulty: GameDifficulty.EASY,
        maxLives: 3,
        timeLimit: 10
      }
      // Añadir más juegos aquí
    ];

    this.availableGames.set(games);
  }

  public createGame(type: GameType, difficulty: GameDifficulty): void {
    this.selectedGameType.set(type);
    this.selectedDifficulty.set(difficulty);

    switch (type) {
      case GameType.MUSIC_QUIZ:
        const musicGame = get(this.availableGames).find((g: BaseGame) => g.type === GameType.MUSIC_QUIZ);
        if (musicGame) {
          this.currentGame = new MusicQuizGame(
            musicGame.id,
            musicGame.name,
            musicGame.description,
            difficulty,
            musicGame.maxLives,
            musicGame.timeLimit
          );
        }
        break;
      // Añadir más tipos de juegos aquí
      default:
        throw new Error(`Tipo de juego no soportado: ${type}`);
    }
  }

  public async startGame(): Promise<void> {
    const gameType = this.selectedGameType.get();
    const difficulty = this.selectedDifficulty.get();

    if (!gameType || !difficulty) {
      throw new Error('Game type and difficulty must be selected');
    }

    switch (gameType) {
      case GameType.MUSIC_QUIZ:
        this.currentGame = new MusicQuizGame(difficulty);
        break;
      default:
        throw new Error('Invalid game type');
    }

    await this.currentGame.start();
  }

  public pauseGame(): void {
    if (!this.currentGame) {
      throw new Error('No hay un juego seleccionado');
    }
    this.currentGame.pauseGame();
  }

  public resumeGame(): void {
    if (!this.currentGame) {
      throw new Error('No hay un juego seleccionado');
    }
    this.currentGame.resumeGame();
  }

  public handleAnswer(answer: string): void {
    if (!this.currentGame) {
      throw new Error('No game in progress');
    }
    this.currentGame.handleAnswer(answer);
  }

  public cleanup(): void {
    if (this.currentGame) {
      this.currentGame.cleanup();
      this.currentGame = null;
    }
  }
} 