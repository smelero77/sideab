<script lang="ts">
  import { score } from '$lib/stores/gameStore';
  import { fade } from 'svelte/transition';
  
  let triggerPop = false;
  
  $: if ($score) {
    triggerPop = true;
    setTimeout(() => (triggerPop = false), 200);
  }
</script>

<div class="text-2xl font-bold text-indigo-500 flex items-center space-x-2">
  <span class="relative inline-block">
    <span 
      class="inline-block transition-transform duration-200 ease-out"
      class:scale-110={triggerPop}
      in:fade={{ duration: 200 }}
    >
      Puntuación: {$score}
    </span>
  </span>
</div>

<style>
  .scale-110 {
    transform: scale(1.1);
  }
</style> 