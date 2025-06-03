<script lang="ts">
  export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  export let hover = false;
  export let clickable = false;

  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };
</script>

<div
  class="
    bg-bg-secondary 
    rounded-xl 
    shadow-md 
    {paddingClasses[padding]}
    {hover ? 'transition-transform duration-200 hover:-translate-y-1' : ''}
    {clickable ? 'cursor-pointer' : ''}
  "
  on:click
>
  <slot />
</div> 