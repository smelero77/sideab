<script lang="ts">
  import { settings } from '$lib/stores/gameStore';
  import { slide, fade } from 'svelte/transition';
  import type { GameSettings } from '$lib/stores/gameStore';

  let localSettings: GameSettings;
  settings.subscribe((v) => (localSettings = v));

  function toggleTheme() {
    const newTheme = localSettings.theme === 'dark' ? 'neon' : 'dark';
    settings.update(s => ({ ...s, theme: newTheme }));
  }

  function toggleDefaultDifficulty() {
    const newDiff = localSettings.defaultDifficulty === 'easy' ? 'hard' : 'easy';
    settings.update(s => ({ ...s, defaultDifficulty: newDiff }));
  }

  function closeSettings() {
    settings.update(s => ({ ...s, showSettings: false }));
  }
</script>

{#if localSettings.showSettings}
  <div 
    class="fixed inset-0 bg-black/40 flex justify-end z-50"
    in:fade={{ duration: 300 }}
  >
    <div 
      class="bg-gray-800 text-white w-64 h-full p-6"
      in:slide={{ duration: 300, axis: 'x' }}
    >
      <h2 class="text-xl font-semibold mb-6">Ajustes</h2>

      <div class="space-y-6">
        <div>
          <p class="font-medium mb-2">Tema</p>
          <button
            on:click={toggleTheme}
            class="w-full py-2 px-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 
                   transition duration-200 transform hover:-translate-y-0.5"
          >
            {localSettings.theme === 'dark' ? 'Cambiar a Neón' : 'Cambiar a Oscuro'}
          </button>
        </div>

        <div>
          <p class="font-medium mb-2">Dificultad por defecto</p>
          <button
            on:click={toggleDefaultDifficulty}
            class="w-full py-2 px-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 
                   transition duration-200 transform hover:-translate-y-0.5"
          >
            {localSettings.defaultDifficulty === 'easy' ? 'Cambiar a Difícil' : 'Cambiar a Fácil'}
          </button>
        </div>
      </div>

      <button
        on:click={closeSettings}
        class="absolute top-4 right-4 text-gray-400 hover:text-white"
        aria-label="Cerrar ajustes"
      >
        ✕
      </button>
    </div>
  </div>
{/if}

<style>
  .translate-x-full {
    transform: translateX(100%);
  }
  
  .translate-x-0 {
    transform: translateX(0);
  }
</style> 