import type { Category } from './types';

/**
 * We define five categories, each with two difficulty levels.
 * Feel free to add or modify later.
 */
export const allCategories: Category[] = [
  {
    key: 'punk77_hard',
    label: 'Punk 77 (Hard)',
    difficulty: 'hard'
  },
  {
    key: 'punk77_easy',
    label: 'Punk 77 (Easy)',
    difficulty: 'easy'
  },
  {
    key: "jazz60s_easy",
    label: "Jazz '60s (Easy)",
    genre: "jazz",
    year: 1960,
    difficulty: "easy"
  },
  {
    key: "jazz60s_hard",
    label: "Jazz '60s (Hard)",
    genre: "jazz",
    year: 1960,
    difficulty: "hard"
  },
  {
    key: "rock90s_easy",
    label: "Rock '90s (Easy)",
    genre: "rock",
    year: 1990,
    difficulty: "easy"
  }
]; 