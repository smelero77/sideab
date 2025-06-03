import { writable } from 'svelte/store';

export const isMenuOpen = writable(false);

export function toggleMenu() {
  console.log('toggleMenu called');
  isMenuOpen.update(value => {
    console.log('Current value:', value);
    const newValue = !value;
    console.log('New value:', newValue);
    return newValue;
  });
}

export function openMenu() {
  console.log('openMenu called');
  isMenuOpen.set(true);
}

export function closeMenu() {
  console.log('closeMenu called');
  isMenuOpen.set(false);
} 