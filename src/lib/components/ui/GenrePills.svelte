<!-- src/lib/components/ui/GenrePills.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { genreData } from '$lib/data/genres';
  import { selectedGenre, selectedStyle, type Genre, type Style } from '$lib/stores/genreStore';
  import dragScroll from '$lib/actions/dragScroll';

  // Array de nombres de géneros (ordenados alfabéticamente)
  const genres = Object.keys(genreData).sort((a, b) => a.localeCompare(b)) as Genre[];

  // Estado para el progreso de scroll (0 a 1)
  let scrollProgress = 0;
  let pillsContainer: HTMLDivElement;
  let stylesContainer: HTMLDivElement;

  function updateScrollProgress(container: HTMLDivElement) {
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) {
      scrollProgress = 0;
      return;
    }
    scrollProgress = container.scrollLeft / maxScroll;
  }

  function handleScroll(event: Event) {
    const container = event.target as HTMLDivElement;
    updateScrollProgress(container);
  }

  function handleResize() {
    if (pillsContainer) updateScrollProgress(pillsContainer);
    if (stylesContainer) updateScrollProgress(stylesContainer);
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
  <!-- WRAPPER de Géneros con "overlay" en los laterales -->
  <div class="pill-wrapper relative">
    <!-- Contenedor de pills (géneros) -->
    <div
      class="pill-container flex overflow-x-auto no-scrollbar space-x-2 md:justify-center md:overflow-x-visible relative z-10"
      use:dragScroll
      bind:this={pillsContainer}
      on:scroll={handleScroll}
      on:resize={handleResize}
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
              ? 'text-accent border-gradient-anim' 
              : 'bg-transparent border-2 border-neutral-600 text-neutral-600 hover:bg-neutral-600/10'}
          "
          aria-pressed={$selectedGenre === genre}
        >
          {genre}
        </button>
      {/each}
    </div>

    <!-- Capa "desvanecida" a la izquierda -->
    <div class="fade-edge left md:hidden" class:invisible={scrollProgress <= 0}></div>
    <!-- Capa "desvanecida" a la derecha -->
    <div class="fade-edge right md:hidden" class:invisible={scrollProgress >= 1}></div>
  </div>

  <!-- Subgéneros (estilos) -->
  {#if $selectedGenre && $selectedGenre !== 'All'}
    <div class="pill-wrapper mt-3 relative">
      <div
        class="pill-container flex overflow-x-auto no-scrollbar space-x-2 md:justify-center md:overflow-x-visible relative z-10"
        use:dragScroll
        bind:this={stylesContainer}
        on:scroll={handleScroll}
        on:resize={handleResize}
      >
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
                ? 'text-accent border-gradient-anim' 
                : 'bg-transparent border-2 border-neutral-600 text-neutral-600 hover:bg-neutral-600/10'}
            "
            aria-pressed={$selectedStyle === style}
          >
            {style}
          </button>
        {/each}
      </div>

      <div class="fade-edge left md:hidden" class:invisible={scrollProgress <= 0}></div>
      <div class="fade-edge right md:hidden" class:invisible={scrollProgress >= 1}></div>
    </div>
  {/if}

  <!-- Indicador de progreso debajo de las pills (sólo para pantallas < md) -->
  <div class="progress-indicator-wrapper">
    <div class="progress-indicator-bg">
      <div class="progress-indicator-fill" style="width: {Math.max(8, scrollProgress * 100)}%"></div>
    </div>
  </div>
</nav>

<style>
  :global(:root) {
    --font-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --fade-width: 1.5rem; /* Tamaño horizontal del degradado */
    --fade-color: rgba(0, 0, 0, 1); /* Color de fondo sólido */
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  @keyframes border-gradient-move {
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

  .border-gradient-anim {
    border-width: 2px;
    border-style: solid;
    border-radius: 9999px;
    border-image: linear-gradient(90deg, var(--color-accent), #3b82f6, var(--color-accent)) 1;
    animation: border-gradient-move 3s ease infinite;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    color: var(--color-accent);
  }

  .text-accent {
    color: var(--color-accent) !important;
  }

  /* CONTENEDOR que envuelve cada "fila" de pills y las capas de desenfoque */
  .pill-wrapper {
    position: relative;
  }

  /* Contenedor real de pills (con scroll) */
  .pill-container {
    /* Ya tenía: flex, overflow-x-auto, no scrollbar, spacing, etc. */
  }

  /* CAPAS GRADUALES para "desvanecer" los extremos */
  .fade-edge {
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--fade-width);
    pointer-events: none;
    z-index: 20;
    transition: opacity 0.3s ease;
  }

  /* Gradiente desde el color de fondo (negro) hacia transparente */
  .fade-edge.left {
    left: 0;
    background: linear-gradient(to right, var(--fade-color), transparent);
  }
  .fade-edge.right {
    right: 0;
    background: linear-gradient(to left, var(--fade-color), transparent);
  }

  /* Cuando scroll está al inicio o final, ocultamos la capa correspondiente */
  .fade-edge.invisible {
    opacity: 0;
    pointer-events: none;
  }
  .fade-edge:not(.invisible) {
    opacity: 1;
  }

  /* Estilos del indicador de progreso (igual que antes) */
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
    background: rgba(180, 180, 180, 0.22);
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.13);
  }
  .progress-indicator-fill {
    height: 100%;
    background: #fff;
    border-radius: 2px;
    transition: width 0.25s cubic-bezier(.4, 1, .4, 1);
    min-width: 8px;
    max-width: 100%;
  }

  @media (min-width: 768px) {
    .progress-indicator-wrapper {
      display: none;
    }
  }
</style> 