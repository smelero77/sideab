<script lang="ts">
  export let variant: 'primary' | 'success' | 'warning' | 'error' | 'info' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let rounded = false;
  export let dot = false;
  export let count: number | undefined = undefined;
  export let maxCount: number | undefined = undefined;
  export let showZero = false;
  export let className = '';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    info: 'bg-info-100 text-info-800'
  };

  $: displayCount = count !== undefined && maxCount !== undefined && count > maxCount 
    ? `${maxCount}+` 
    : count;
  $: showCount = count !== undefined && (count > 0 || showZero);
</script>

<span
  class="inline-flex items-center font-medium {sizeClasses[size]} {variantClasses[variant]} {rounded ? 'rounded-full' : 'rounded'} {className}"
>
  {#if dot}
    <span class="w-2 h-2 mr-1 rounded-full bg-current" />
  {/if}
  {#if count !== undefined}
    {#if showCount}
      {displayCount}
    {/if}
  {:else}
    <slot />
  {/if}
</span> 