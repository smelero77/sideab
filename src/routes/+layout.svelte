<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { settings } from '$lib/stores/gameStore';
</script>

<div class:theme-neon={$settings.theme === 'neon'}>
  <slot />
</div>

<style>
  :global(.theme-neon) {
    --bg-color: #0f172a;
    --text-color: #e0e7ff;
    --accent-color: #a78bfa;
  }
</style> 