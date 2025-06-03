<script lang="ts">
  export let height = '160px';
  export let lines = 2;
</script>

<div class="w-full p-4 bg-gray-800 rounded-2xl shadow-md animate-pulse">
  <div class="bg-gray-700 h-[160px] w-full rounded-xl mb-4"></div>
  
  <div class="space-y-3">
    <div class="h-6 bg-gray-700 rounded-lg w-3/4"></div>
    
    {#each Array(lines) as _, i}
      <div class="h-4 bg-gray-700 rounded-lg w-{Math.max(50, 90 - i * 20)}%"></div>
    {/each}
  </div>
</div>

<style>
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
</style> 