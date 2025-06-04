<!-- src/lib/components/ui/GenrePills.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { GENRES } from '$lib/constants';
  import { selectedGenre } from '$lib/stores/genreStore';
  import type { Genre } from '$lib/constants';

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

<nav class="w-full py-6 px-4 md:px-8">
  <div class="flex overflow-x-auto no-scrollbar space-x-3">
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
</nav>

<style>
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style> 