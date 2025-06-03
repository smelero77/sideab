<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let variant: 'primary' | 'secondary' = 'primary';

  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const variantClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary'
  };
</script>

<h1 class="font-bold {sizeClasses[size]} {variantClasses[variant]} font-['Barlow_Condensed',sans-serif]">
  WAXLOG
</h1> 