<script lang="ts">
  import { lives, score, timer } from '$lib/stores/gameStore';
  import Card from '$lib/components/ui/Card/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
</script>

<Card variant="bordered" padding="md" className="w-full max-w-2xl mx-auto">
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
    <div class="flex flex-col items-center">
      <Badge variant="warning" size="md" className="mb-2">
        Lives
      </Badge>
      <span class="text-xl md:text-2xl font-bold">{$lives}</span>
    </div>
    
    <div class="flex flex-col items-center">
      <Badge variant="primary" size="md" className="mb-2">
        Score
      </Badge>
      <span class="text-xl md:text-2xl font-bold">{$score}</span>
    </div>
    
    <div class="flex flex-col items-center">
      <Badge variant="info" size="md" className="mb-2">
        Time
      </Badge>
      <span class="text-xl md:text-2xl font-bold">{$timer}s</span>
    </div>
  </div>
</Card>

<style>
  .status-container {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    margin: 1rem auto;
    max-width: 500px;
  }

  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .label {
    font-size: 0.8rem;
    color: #666;
    text-transform: uppercase;
  }

  .value {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  @media (max-width: 768px) {
    .status-container {
      padding: 0.75rem;
      margin: 0.5rem auto;
    }

    .label {
      font-size: 0.7rem;
    }

    .value {
      font-size: 1rem;
    }
  }
</style> 