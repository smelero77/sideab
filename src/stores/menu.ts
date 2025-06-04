import { writable } from 'svelte/store';

// Inicializamos el store con false para que el menú esté cerrado por defecto en móviles
export const isMenuOpen = writable<boolean>(false);

export function toggleMenu() {
    isMenuOpen.update(value => !value);
}

export function openMenu() {
    isMenuOpen.set(true);
}

export function closeMenu() {
    isMenuOpen.set(false);
} 