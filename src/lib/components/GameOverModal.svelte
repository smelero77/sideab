<script lang="ts">
  import { score, timer, lives, settings } from '$lib/stores/gameStore';
  import { fade, scale } from 'svelte/transition';
  import { startQuiz } from '$lib/stores/gameStore';

  function shareScore() {
    const shareText = encodeURIComponent(`¡He conseguido ${$score} puntos en Cover-Guess Quiz!`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${url}`, '_blank');
  }

  function closeModal() {
    settings.update(s => ({ ...s, showSettings: false }));
  }
</script>

<div 
  class="fixed inset-0 bg-black/50 flex items-center justify-center"
  in:fade={{ duration: 300 }}
>
  <div 
    class="bg-gray-900 text-white rounded-3xl p-8 w-80 shadow-2xl relative"
    in:scale={{ duration: 300, start: 0.95 }}
  >
    <h2 class="text-3xl font-extrabold mb-4">¡Fin del Juego!</h2>
    
    <div class="space-y-2 mb-6">
      <p>Puntuación final: <span class="text-indigo-400">{$score}</span></p>
      <p>Tiempo transcurrido: <span class="text-indigo-400">{$timer}s</span></p>
      <p>
        Precisión:
        <span class="text-indigo-400">
          {Math.round(($score / 10) * 100)}%
        </span>
      </p>
    </div>

    <div class="space-y-3">
      <button
        on:click={startQuiz}
        class="w-full py-2 bg-indigo-600 rounded-lg shadow-lg 
               hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-0.5"
      >
        Jugar de nuevo
      </button>
      
      <button
        on:click={shareScore}
        class="w-full py-2 bg-green-500 rounded-lg shadow-lg 
               hover:bg-green-600 transition duration-200 transform hover:-translate-y-0.5"
      >
        Compartir
      </button>
      
      <button
        on:click={() => settings.update(s => ({ ...s, showSettings: true }))}
        class="w-full py-2 bg-yellow-500 rounded-lg shadow-lg 
               hover:bg-yellow-600 transition duration-200 transform hover:-translate-y-0.5"
      >
        Ajustes
      </button>
    </div>

    <button
      on:click={closeModal}
      class="absolute top-3 right-3 text-gray-400 hover:text-white"
      aria-label="Cerrar"
    >
      ✕
    </button>
  </div>
</div> 