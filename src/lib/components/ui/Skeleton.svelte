<script lang="ts">
  export let variant: 'text' | 'circular' | 'rectangular' = 'text';
  export let width = '100%';
  export let height = '1em';
  export let animation: 'pulse' | 'wave' | 'none' = 'pulse';
  export let className = '';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: ''
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  };
</script>

<div
  class="
    bg-bg-secondary 
    {variantClasses[variant]} 
    {animationClasses[animation]}
    {className}
  "
  style="width: {width}; height: {height}"
  role="status"
  aria-label="Cargando..."
/> 