<script lang="ts">
  import { GameManager } from '$lib/game/GameManager';
  import { GameType } from '$lib/types/game';
  import Select from '$lib/components/ui/Select.svelte';
  import Card from '$lib/components/ui/Card/Card.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { onMount } from 'svelte';

  const gameManager = GameManager.getInstance();
  const { availableGames, selectedGameType } = gameManager;

  let loading = true;
  const skeletonCount = 3;

  onMount(() => {
    // Simulamos una carga de datos
    setTimeout(() => {
      loading = false;
    }, 1500);
  });
</script>

<Card variant="bordered" padding="md" className="w-full max-w-md mx-auto">
  {#if loading}
    <div class="space-y-4">
      {#each Array(skeletonCount) as _}
        <Skeleton height="h-12" />
      {/each}
    </div>
  {:else}
    <Select
      bind:value={$selectedGameType}
      options={$availableGames.map(game => ({
        value: game.type,
        label: game.name
      }))}
      label="Selecciona una categoría"
      required
    />
  {/if}
</Card>

<style>
  /* Los estilos se manejan en el componente Select.svelte */
</style> 