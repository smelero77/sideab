<script lang="ts">
  import { UI } from '$lib/constants';
</script>

<header class="header">
  <h1 class="title">Cover-Guess Quiz</h1>
  <slot />
</header>

<style>
  .header {
    text-align: center;
    margin-bottom: var(--spacing-large, 2rem);
  }

  .title {
    color: var(--text, #333);
    font-size: 2rem;
    margin: 0;
    padding: var(--spacing-medium, 1rem) 0;
  }

  @media (max-width: 768px) {
    .header {
      margin-bottom: var(--spacing-medium, 1rem);
    }

    .title {
      font-size: 1.5rem;
      padding: var(--spacing-small, 0.5rem) 0;
    }
  }
</style> 