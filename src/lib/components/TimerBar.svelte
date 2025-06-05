<script lang="ts">
  import { timerPercentage } from '$lib/stores/gameStore';
</script>

<div class="w-full bg-gray-700/50 h-2 rounded-full overflow-hidden mb-4 ocultar">
  <div
    class="h-2 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-1000 ease-linear"
    style="width: {$timerPercentage}%"
  />
</div>

<style>
  .bg-gradient-to-r {
    background-size: 200% 200%;
    animation: gradient 2s ease infinite;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .ocultar {
    display: none !important;
  }
</style> 