<script lang="ts">
  import { UI } from '$lib/constants';
  
  export let type: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let fullWidth = false;
  export let disabled = false;
  export let loading = false;

  const typeClasses = {
    primary: 'btn-gradient-accent btn-shadow-accent text-on-accent',
    secondary: 'bg-neutral-800 hover:bg-neutral-700 text-white',
    success: 'bg-success-bg hover:bg-success-bg/90 text-success-text',
    error: 'bg-error-bg hover:bg-error-bg/90 text-error-text',
    warning: 'bg-warning-bg hover:bg-warning-bg/90 text-warning-text',
    info: 'bg-info-bg hover:bg-info-bg/90 text-info-text'
  };

  const sizeClasses = {
    sm: 'text-sm md:text-base py-1 px-2 md:px-3',
    md: 'text-base md:text-lg py-2 px-3 md:px-4',
    lg: 'text-lg md:text-xl py-3 px-4 md:px-6'
  };
</script>

<button
  class="
    rounded-lg 
    font-semibold 
    transition-all 
    duration-200 
    transform 
    hover:-translate-y-0.5 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-offset-bg-primary
    disabled:opacity-50 
    disabled:cursor-not-allowed
    w-full sm:w-auto
    {typeClasses[type]}
    {sizeClasses[size]}
    {fullWidth ? 'w-full' : ''}
  "
  {disabled}
  on:click
>
  {#if loading}
    <div class="flex items-center justify-center">
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</button> 