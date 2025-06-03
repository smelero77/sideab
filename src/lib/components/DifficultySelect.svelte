<script lang="ts">
  import { GameManager } from '$lib/game/GameManager';
  import { GameDifficulty } from '$lib/types/game';
  import Select from '$lib/components/ui/Select.svelte';
  import Card from '$lib/components/ui/Card/Card.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { onMount } from 'svelte';

  const gameManager = GameManager.getInstance();
  const { selectedDifficulty } = gameManager;

  let loading = true;
  const skeletonCount = 3;

  const difficulties = [
    { value: GameDifficulty.EASY, label: 'Fácil' },
    { value: GameDifficulty.MEDIUM, label: 'Medio' },
    { value: GameDifficulty.HARD, label: 'Difícil' }
  ];

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
      bind:value={$selectedDifficulty}
      options={difficulties}
      label="Selecciona la dificultad"
      required
    />
  {/if}
</Card>

<style>
  select {
    background-color: rgb(31, 41, 55);
    color: white;
    padding-right: 2.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  
  select:focus {
    outline: none;
    border-color: rgb(99, 102, 241);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  select option {
    background-color: rgb(31, 41, 55);
    color: white;
    padding: 0.5rem;
  }
</style> 