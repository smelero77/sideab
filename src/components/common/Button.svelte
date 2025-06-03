<script lang="ts">
  import { UI } from '$lib/constants';
  
  export let type: 'primary' | 'success' | 'error' = 'primary';
  export let disabled = false;
  export let fullWidth = true;
  
  const colors = {
    primary: UI.COLORS.PRIMARY,
    success: UI.COLORS.SUCCESS,
    error: UI.COLORS.ERROR
  };
</script>

<button
  class="button"
  class:full-width={fullWidth}
  style="--button-color: {colors[type]}"
  {disabled}
  on:click
>
  <slot />
</button>

<style>
  .button {
    padding: var(--spacing-medium, 1rem);
    border: none;
    border-radius: var(--border-radius, 8px);
    background: var(--button-color);
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition-default);
    position: relative;
    overflow: hidden;
  }

  .button:hover:not(:disabled) {
    filter: brightness(0.9);
    transform: translateY(-1px);
  }

  .button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .button:hover::after {
    transform: translateX(100%);
  }

  .full-width {
    width: 100%;
  }

  @media (max-width: 768px) {
    .button {
      padding: 0.75rem;
      font-size: 0.9rem;
    }
  }
</style> 