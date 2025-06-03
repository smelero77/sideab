<script lang="ts">
  import { lives } from '$lib/stores/gameStore';
  import { fade } from 'svelte/transition';
</script>

<div class="flex items-center space-x-2">
  {#each Array($lives) as _, i}
    <svg 
      class="w-6 h-6 text-red-500" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      in:fade={{ duration: 200 }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  {/each}
</div>

<style>
  @keyframes heartbeat {
    0% { transform: scale(1); }
    50% { transform: scale(0.8); }
    100% { transform: scale(1); }
  }

  svg {
    animation: heartbeat 0.6s ease-in-out;
  }
</style> 