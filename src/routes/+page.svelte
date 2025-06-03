<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { GameManager } from '$lib/game/GameManager';
  import { GameType, GameDifficulty } from '$lib/types/game';
  
  import CategorySelect from '$lib/components/CategorySelect.svelte';
  import CoverReveal from '$lib/components/CoverReveal.svelte';
  import OptionButton from '$lib/components/OptionButton.svelte';
  import LivesDisplay from '$lib/components/LivesDisplay.svelte';
  import TimerBar from '$lib/components/TimerBar.svelte';
  import ScoreDisplay from '$lib/components/ScoreDisplay.svelte';
  import GameOverModal from '$lib/components/GameOverModal.svelte';
  import Button from '$lib/components/ui/Button/Button.svelte';
  import Card from '$lib/components/ui/Card/Card.svelte';

  const gameManager = GameManager.getInstance();
  const { availableGames, selectedGameType, selectedDifficulty } = gameManager;

  onMount(() => {
    return () => gameManager.cleanup();
  });

  function startGame() {
    gameManager.createGame(GameType.MUSIC_QUIZ, GameDifficulty.EASY);
    gameManager.startGame();
  }

  function handleAnswer(answer: string) {
    if (gameManager.currentGame) {
      gameManager.currentGame.handleAnswer(answer);
    }
  }
</script>

<main class="min-h-screen bg-black text-white">
  <div class="container mx-auto px-4 py-8">
    {#if !$selectedGameType}
      <Card 
        variant="elevated" 
        padding="lg" 
        className="max-w-md mx-auto space-y-8"
      >
        <CategorySelect />
        
        <Button 
          variant="primary"
          size="lg"
          fullWidth
          on:click={startGame}
        >
          Comenzar Quiz
        </Button>
      </Card>
    {:else}
      <Card 
        variant="elevated" 
        padding="lg" 
        className="max-w-2xl mx-auto space-y-6"
      >
        <div class="flex justify-between items-center">
          <LivesDisplay />
          <ScoreDisplay />
        </div>
        
        <TimerBar />
        
        <div class="flex flex-col md:flex-row items-start md:space-x-8">
          <CoverReveal className="md:w-1/2" />
          
          <div class="md:w-1/2 mt-6 md:mt-0">
            {#if gameManager.currentGame?.currentQuestion}
              <div class="space-y-2">
                {#each gameManager.currentGame.currentQuestion.options as option}
                  <OptionButton 
                    title={option} 
                    on:select={(e) => handleAnswer(e.detail)}
                  />
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </Card>
    {/if}
  </div>
</main>

{#if !$selectedGameType && gameManager.currentGame?.isGameOver}
  <div class="fixed inset-0 z-50">
    <GameOverModal />
  </div>
{/if}
