<script lang="ts">
  import { gameStore } from '$stores/game';
</script>

<div class="status-container">
  <div class="status-item">
    <span class="label">Lives:</span>
    <span class="value">{$gameStore.lives}</span>
  </div>
  <div class="status-item">
    <span class="label">Score:</span>
    <span class="value">{$gameStore.score}</span>
  </div>
  <div class="status-item">
    <span class="label">Time:</span>
    <span class="value">{$gameStore.timer}s</span>
  </div>
</div>

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