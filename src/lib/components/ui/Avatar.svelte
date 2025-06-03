<script lang="ts">
  export let src = '';
  export let alt = '';
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let fallback = '';
  export let status: 'online' | 'offline' | 'away' | 'busy' | null = null;
  export let ring = false;
  export let ringColor = 'primary';
  export let group = false;

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl'
  };

  const statusClasses = {
    online: 'bg-success',
    offline: 'bg-gray-400',
    away: 'bg-warning',
    busy: 'bg-error'
  };

  let imageError = false;

  function handleImageError() {
    imageError = true;
  }
</script>

<div class="relative inline-block {group ? '-space-x-2' : ''}">
  {#if src && !imageError}
    <img
      {src}
      {alt}
      class="
        {sizeClasses[size]}
        rounded-full
        object-cover
        {ring ? `ring-2 ring-${ringColor}` : ''}
      "
      on:error={handleImageError}
    />
  {:else}
    <div
      class="
        {sizeClasses[size]}
        rounded-full
        bg-primary
        text-white
        flex
        items-center
        justify-center
        font-medium
        {ring ? `ring-2 ring-${ringColor}` : ''}
      "
    >
      {fallback || alt?.charAt(0)?.toUpperCase() || '?'}
    </div>
  {/if}

  {#if status}
    <div
      class="
        absolute 
        bottom-0 
        right-0 
        w-3 
        h-3 
        rounded-full 
        border-2 
        border-white 
        {statusClasses[status]}
      "
    />
  {/if}
</div> 