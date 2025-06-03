<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let variant: 'primary' | 'success' | 'warning' | 'error' | 'info' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let fullWidth = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let className = '';
  
  const dispatch = createEventDispatcher();
  
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  
  const variantClasses = {
    primary: 'btn-primary',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    info: 'btn-info'
  };
</script>

<button
  {type}
  {disabled}
  class="btn {variantClasses[variant]} {sizeClasses[size]} {fullWidth ? 'w-full' : ''} {className}"
  on:click={(e) => dispatch('click', e)}
>
  <slot />
</button> 