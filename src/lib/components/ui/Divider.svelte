<script lang="ts">
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let variant: 'solid' | 'dashed' | 'dotted' = 'solid';
  export let color = 'border';
  export let spacing: 'none' | 'sm' | 'md' | 'lg' = 'md';
  export let text = '';
  export let textAlign: 'left' | 'center' | 'right' = 'center';

  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  };

  const spacingClasses = {
    none: '',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6'
  };

  const textAlignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };
</script>

{#if orientation === 'horizontal'}
  <div class="relative {spacingClasses[spacing]}">
    {#if text}
      <div class="absolute inset-0 flex items-center {textAlignClasses[textAlign]}">
        <span class="px-2 bg-bg-primary text-text-secondary text-sm">
          {text}
        </span>
      </div>
    {/if}
    <div
      class="
        border-t 
        {variantClasses[variant]} 
        border-{color}
      "
    />
  </div>
{:else}
  <div
    class="
      h-full 
      border-l 
      {variantClasses[variant]} 
      border-{color}
    "
  />
{/if} 