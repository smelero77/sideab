<script lang="ts">
  import { settings } from '$lib/stores/gameStore';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let isDark = false;

  function toggleTheme() {
    isDark = !isDark;
    if (browser) {
      document.documentElement.classList.toggle('dark', isDark);
      settings.update(s => ({ ...s, theme: isDark ? 'dark' : 'neon' }));
    }
  }

  onMount(() => {
    if (browser) {
      isDark = document.documentElement.classList.contains('dark');
    }
  });
</script>

<button
  on:click={toggleTheme}
  class="p-2 rounded-full text-text-primary hover:bg-bg-tertiary focus:outline-none focus:bg-bg-tertiary focus:ring-2 focus:ring-accent transition-colors"
  aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
>
  {#if isDark}
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  {/if}
</button> 