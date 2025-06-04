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
  
  const variantColors = {
    primary: {
      border: 'border-[var(--color-accent)]',
      bg: 'bg-[var(--color-accent)]',
      text: 'text-[var(--color-accent)]',
      hoverText: 'group-hover:text-[var(--color-bg)]'
    },
    success: {
      border: 'border-[var(--success-bg)]',
      bg: 'bg-[var(--success-bg)]',
      text: 'text-[var(--success-bg)]',
      hoverText: 'group-hover:text-[var(--success-text)]'
    },
    warning: {
      border: 'border-[var(--warning-bg)]',
      bg: 'bg-[var(--warning-bg)]',
      text: 'text-[var(--warning-bg)]',
      hoverText: 'group-hover:text-[var(--warning-text)]'
    },
    error: {
      border: 'border-[var(--error-bg)]',
      bg: 'bg-[var(--error-bg)]',
      text: 'text-[var(--error-bg)]',
      hoverText: 'group-hover:text-[var(--error-text)]'
    },
    info: {
      border: 'border-[var(--info-bg)]',
      bg: 'bg-[var(--info-bg)]',
      text: 'text-[var(--info-bg)]',
      hoverText: 'group-hover:text-[var(--info-text)]'
    }
  };
</script>

<button
  {type}
  {disabled}
  class="
    group relative inline-flex items-center justify-center
    rounded-2xl border-2 bg-transparent overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-200
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    {variantColors[variant].border}
    focus:ring-[var(--color-accent)]
    {sizeClasses[size]}
    {fullWidth ? 'w-full' : ''}
    {className}
  "
  on:click={(e) => dispatch('click', e)}
>
  <!-- Capa de llenado -->
  <span
    class="
      absolute left-0 bottom-0 w-full h-0
      transition-[height] duration-300 ease-out
      group-hover:h-full
      {variantColors[variant].bg}
    "
  />

  <!-- Texto -->
  <span
    class="
      relative z-10 font-semibold tracking-wide
      transition-colors duration-300
      {variantColors[variant].text}
      {variantColors[variant].hoverText}
    "
  >
    <slot />
  </span>
</button> 