<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let variant: 'primary' | 'secondary' = 'primary';

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  };

  const variantClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary'
  };
</script>

<h1 class="font-bold {sizeClasses[size]} {variantClasses[variant]} font-['Barlow_Condensed',sans-serif] tracking-wider">
  SIDE<span class="text-accent">A</span><span class="text-accent">B</span>
</h1> 