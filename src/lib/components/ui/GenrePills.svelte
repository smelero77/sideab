<!-- src/lib/components/ui/GenrePills.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { GENRES } from '$lib/constants';
  import { selectedGenre } from '$lib/stores/genreStore';
  import type { Genre } from '$lib/constants';
  import dragScroll from '$lib/actions/dragScroll';

  // Estado para el progreso de scroll
  let scrollProgress = 0;
  let pillsContainer: HTMLDivElement;

  function updateScrollProgress() {
    if (!pillsContainer) return;
    const maxScroll = pillsContainer.scrollWidth - pillsContainer.clientWidth;
    if (maxScroll <= 0) {
      scrollProgress = 0;
      return;
    }
    scrollProgress = pillsContainer.scrollLeft / maxScroll;
  }

  // Actualizar al hacer scroll o redimensionar
  function handleScroll() {
    updateScrollProgress();
  }
  function handleResize() {
    updateScrollProgress();
  }

  function handleGenreClick(genre: Genre) {
    selectedGenre.set(genre);
    goto(`?genre=${encodeURIComponent(genre)}`, { replaceState: true });
  }

  // Sincronizar con la URL al cargar
  $: {
    const urlGenre = $page.url.searchParams.get('genre');
    if (urlGenre && GENRES.includes(urlGenre as Genre)) {
      selectedGenre.set(urlGenre as Genre);
    }
  }
</script>

<nav class="w-full py-20 px-4 md:px-8 relative">
  <div
    class="flex overflow-x-auto no-scrollbar space-x-3"
    use:dragScroll
    bind:this={pillsContainer}
    on:scroll={handleScroll}
  >
    {#each GENRES as genre}
      <button
        on:click={() => handleGenreClick(genre)}
        class="
          whitespace-nowrap
          px-4 py-2 
          rounded-full 
          font-semibold 
          transition-colors 
          flex-shrink-0
          {$selectedGenre === genre 
            ? 'bg-yellow-500 text-black' 
            : 'bg-neutral-700/50 text-white hover:bg-neutral-600/50'}
        "
        aria-pressed={$selectedGenre === genre}
      >
        {genre}
      </button>
    {/each}
  </div>
  <!-- Indicador de progreso debajo de las pills -->
  <div class="progress-indicator-wrapper">
    <div class="progress-indicator-bg">
      <div class="progress-indicator-fill" style="width: {Math.max(8, scrollProgress * 100)}%"></div>
    </div>
  </div>
</nav>

<style>
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .progress-indicator-wrapper {
    position: relative;
    margin: 0 auto;
    width: 60px;
    height: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 10;
    margin-top: 22px;
  }
  .progress-indicator-bg {
    width: 100%;
    height: 3px;
    background: rgba(180,180,180,0.22);
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.13);
  }
  .progress-indicator-fill {
    height: 100%;
    background: #fff;
    border-radius: 2px;
    transition: width 0.25s cubic-bezier(.4,1,.4,1);
    min-width: 8px;
    max-width: 100%;
  }
</style> 