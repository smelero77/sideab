<script lang="ts">
  import { UI } from '$lib/constants';
  
  export let maxWidth = '800px';
  export let padding = UI.SPACING.MEDIUM;
</script>

<div class="container" style="--max-width: {maxWidth}; --padding: {padding};">
  <slot />
</div>

<style>
  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--padding);
  }

  @media (max-width: 768px) {
    .container {
      padding: var(--spacing-small, 0.5rem);
    }
  }
</style> 