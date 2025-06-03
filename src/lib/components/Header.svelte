<script lang="ts">
  import { settings } from '$lib/stores/gameStore';
</script>

<header class="w-full py-4 px-6 flex justify-between items-center">
  <div class="flex items-center space-x-4">
  </div>
</header>

<style>
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
</style> 