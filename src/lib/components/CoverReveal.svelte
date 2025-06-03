<script lang="ts">
  import { blurAmount, currentQuestion } from '$lib/stores/gameStore';
  import { fade } from 'svelte/transition';

  export let className: string = '';
  let imageError = false;
  let isLoading = true;

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    imageError = true;
    isLoading = false;
    img.src = 'https://i.discogs.com/placeholder.jpg?size=500';
  }

  function handleImageLoad() {
    isLoading = false;
    imageError = false;
  }
</script>

<div class="relative w-64 h-64 mx-auto overflow-hidden rounded-2xl shadow-2xl {className}">
  {#if $currentQuestion}
    {#key $currentQuestion.imageUrl}
      {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-800">
          <p class="text-gray-400">Cargando imagen...</p>
        </div>
      {/if}

      <img
        src={$currentQuestion.imageUrl}
        alt="Portada del álbum"
        class="w-full h-full object-cover transition-all duration-500 ease-out"
        class:error={imageError}
        style="filter: blur({$blurAmount}px);"
        on:error={handleImageError}
        on:load={handleImageLoad}
        in:fade={{ duration: 300 }}
        out:fade={{ duration: 300 }}
      />

      {#if $blurAmount > 0}
        <div
          class="absolute inset-0 bg-black/20 mix-blend-multiply animate-scanline"
          in:fade={{ duration: 300 }}
          out:fade={{ duration: 300 }}
        />
      {/if}
    {/key}
  {:else}
    <div class="w-full h-full bg-gray-800 flex items-center justify-center">
      <p class="text-gray-400">Selecciona una categoría para comenzar</p>
    </div>
  {/if}
</div>

<style>
  @keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }

  .animate-scanline {
    background-image: linear-gradient(rgba(0,0,0,0.05) 50%, transparent 50%);
    background-size: 100% 4px;
    animation: scanline 1s linear infinite;
  }

  .error {
    opacity: 0.5;
  }
</style> 