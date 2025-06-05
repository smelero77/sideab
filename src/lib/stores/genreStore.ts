import { writable } from 'svelte/store';
import { genreData } from '$lib/data/genres';

export type Genre = keyof typeof genreData;
export type Style = typeof genreData[Genre][number];

export const selectedGenre = writable<Genre | 'All'>('All');
export const selectedStyle = writable<Style | null>(null); 