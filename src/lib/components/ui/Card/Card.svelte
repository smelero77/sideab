<script lang="ts">
  export let variant: 'default' | 'bordered' | 'elevated' = 'default';
  export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  export let className = '';
  
  const variantClasses = {
    default: 'bg-bg-primary',
    bordered: 'bg-bg-primary border border-border-color',
    elevated: 'bg-bg-primary shadow-lg'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-2 md:p-3',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };
</script>

<div class="rounded-lg w-full {variantClasses[variant]} {paddingClasses[padding]} {className}">
  <slot />
</div> 