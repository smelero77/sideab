import { writable } from 'svelte/store';
import type { Genre } from '$lib/constants';

export const selectedGenre = writable<Genre | 'All'>('All'); 