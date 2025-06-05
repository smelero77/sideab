<!-- src/lib/components/ui/GenrePills.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { genreData } from '$lib/data/genres';
  import { selectedGenre, selectedStyle, type Genre, type Style } from '$lib/stores/genreStore';
  import dragScroll from '$lib/actions/dragScroll';

  // Array de nombres de géneros (ordenados alfabéticamente)
  const genres = Object.keys(genreData).sort((a, b) => a.localeCompare(b)) as Genre[];

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
    selectedStyle.set(null);
    goto(`?genre=${encodeURIComponent(genre)}`, { replaceState: true });
  }

  function handleStyleClick(style: Style) {
    selectedStyle.set(style);
    goto(`?genre=${encodeURIComponent($selectedGenre)}&style=${encodeURIComponent(style)}`, { replaceState: true });
  }

  // Sincronizar con la URL al cargar
  $: {
    const urlGenre = $page.url.searchParams.get('genre');
    const urlStyle = $page.url.searchParams.get('style');
    if (urlGenre && genres.includes(urlGenre as Genre)) {
      selectedGenre.set(urlGenre as Genre);
      if (urlStyle && genreData[urlGenre as Genre].includes(urlStyle)) {
        selectedStyle.set(urlStyle as Style);
      }
    }
  }
</script>

<nav class="w-full py-20 md:py-24 lg:py-28 px-4 md:px-8 relative">
  <!-- Géneros principales -->
  <div
    class="flex overflow-x-auto no-scrollbar space-x-2 md:justify-center md:overflow-x-visible"
    use:dragScroll
    bind:this={pillsContainer}
    on:scroll={handleScroll}
  >
    {#each genres as genre}
      <button
        on:click={() => handleGenreClick(genre)}
        class="
          whitespace-nowrap
          px-3 py-1.5 
          rounded-full 
          transition-colors 
          flex-shrink-0
          text-sm
          font-sans
          font-bold
          relative
          {$selectedGenre === genre 
            ? 'text-neutral-600 animate-gradient-border' 
            : 'bg-transparent border-2 border-neutral-600 text-neutral-600 hover:bg-neutral-600/10'}
        "
        aria-pressed={$selectedGenre === genre}
      >
        {genre}
      </button>
    {/each}
  </div>

  <!-- Subgéneros (estilos) -->
  {#if $selectedGenre && $selectedGenre !== 'All'}
    <div class="flex overflow-x-auto no-scrollbar space-x-2 mt-3 md:justify-center md:overflow-x-visible">
      {#each genreData[$selectedGenre] as style}
        <button
          on:click={() => handleStyleClick(style)}
          class="
            whitespace-nowrap
            px-3 py-1.5 
            rounded-full 
            transition-colors 
            flex-shrink-0
            text-sm
            font-sans
            font-bold
            relative
            {$selectedStyle === style 
              ? 'text-neutral-600 animate-gradient-border' 
              : 'bg-transparent border-2 border-neutral-600 text-neutral-600 hover:bg-neutral-600/10'}
          "
          aria-pressed={$selectedStyle === style}
        >
          {style}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Indicador de progreso debajo de las pills -->
  <div class="progress-indicator-wrapper">
    <div class="progress-indicator-bg">
      <div class="progress-indicator-fill" style="width: {Math.max(8, scrollProgress * 100)}%"></div>
    </div>
  </div>
</nav>

<style>
  :global(:root) {
    --font-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-gradient-border {
    background: transparent;
    position: relative;
    border: none;
  }

  .animate-gradient-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 9999px;
    padding: 2px;
    background: linear-gradient(90deg, 
      transparent 0%,
      var(--color-accent) 20%,
      var(--color-accent) 80%,
      transparent 100%
    );
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
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

  @media (min-width: 768px) {
    .progress-indicator-wrapper {
      display: none;
    }
  }
</style> 