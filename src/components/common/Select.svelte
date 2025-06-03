<script lang="ts">
  import { UI } from '$lib/constants';
  
  export let options: { value: string; label: string }[];
  export let value: string;
  export let label = '';
  export let fullWidth = true;
</script>

<div class="select-container" class:full-width={fullWidth}>
  {#if label}
    <label for="select">{label}</label>
  {/if}
  <select
    id="select"
    bind:value
    class="select"
  >
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>

<style>
  .select-container {
    margin: var(--spacing-medium, 1rem) 0;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-light, #666);
    font-size: 0.9rem;
  }

  .select {
    width: 100%;
    padding: var(--spacing-medium, 1rem);
    border: 1px solid #ddd;
    border-radius: var(--border-radius, 8px);
    font-size: 1rem;
    background: white;
    color: var(--text, #333);
    cursor: pointer;
    transition: var(--transition-default);
  }

  .select:hover {
    border-color: var(--primary, #2196f3);
  }

  .select:focus {
    outline: none;
    border-color: var(--primary, #2196f3);
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
  }

  .full-width {
    width: 100%;
  }

  @media (max-width: 768px) {
    .select {
      padding: 0.75rem;
      font-size: 0.9rem;
    }
  }
</style> 