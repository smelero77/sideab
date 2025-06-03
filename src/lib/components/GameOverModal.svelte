<script lang="ts">
  import { GameManager } from '$lib/game/GameManager';
  import { fade, scale } from 'svelte/transition';
  import Modal from '$lib/components/ui/Modal.svelte';
  import Button from '$lib/components/ui/Button/Button.svelte';
  import Card from '$lib/components/ui/Card/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  const gameManager = GameManager.getInstance();
  const { currentGame } = gameManager;

  function shareScore() {
    const shareText = encodeURIComponent(`¡He conseguido ${currentGame?.score} puntos en Cover-Guess Quiz!`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${url}`, '_blank');
  }

  function closeModal() {
    gameManager.showSettings = true;
  }

  async function handleStartQuiz() {
    await gameManager.startGame();
  }
</script>

<Modal on:close={closeModal}>
  <Card variant="elevated" padding="lg" className="w-80">
    <h2 class="text-3xl font-extrabold mb-4">¡Fin del Juego!</h2>
    
    <div class="space-y-4 mb-6">
      <div class="flex items-center justify-between">
        <span>Puntuación final:</span>
        <Badge variant="primary" size="lg">{currentGame?.score}</Badge>
      </div>
      
      <div class="flex items-center justify-between">
        <span>Tiempo transcurrido:</span>
        <Badge variant="info" size="lg">{currentGame?.timer}s</Badge>
      </div>
      
      <div class="flex items-center justify-between">
        <span>Precisión:</span>
        <Badge variant="success" size="lg">
          {Math.round((currentGame?.score ?? 0 / 10) * 100)}%
        </Badge>
      </div>
    </div>

    <div class="space-y-3">
      <Button
        variant="primary"
        fullWidth
        on:click={handleStartQuiz}
      >
        Jugar de nuevo
      </Button>
      
      <Button
        variant="success"
        fullWidth
        on:click={shareScore}
      >
        Compartir
      </Button>
      
      <Button
        variant="warning"
        fullWidth
        on:click={() => gameManager.showSettings = true}
      >
        Ajustes
      </Button>
    </div>
  </Card>
</Modal> 