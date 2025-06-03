<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  
  export let text = '';
  export let placement: 'top' | 'right' | 'bottom' | 'left' = 'top';
  export let delay = 200;
  export let maxWidth = '200px';
  
  let tooltipElement: HTMLDivElement;
  let timeout: NodeJS.Timeout;
  let isVisible = false;

  const placementClasses = {
    top: {
      container: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      arrow: 'bottom-[-4px] left-1/2 -translate-x-1/2 rotate-45'
    },
    right: {
      container: 'left-full top-1/2 -translate-y-1/2 ml-2',
      arrow: 'left-[-4px] top-1/2 -translate-y-1/2 rotate-[-45deg]'
    },
    bottom: {
      container: 'top-full left-1/2 -translate-x-1/2 mt-2',
      arrow: 'top-[-4px] left-1/2 -translate-x-1/2 rotate-[-135deg]'
    },
    left: {
      container: 'right-full top-1/2 -translate-y-1/2 mr-2',
      arrow: 'right-[-4px] top-1/2 -translate-y-1/2 rotate-[135deg]'
    }
  };

  function showTooltip() {
    timeout = setTimeout(() => {
      isVisible = true;
    }, delay);
  }

  function hideTooltip() {
    clearTimeout(timeout);
    isVisible = false;
  }
</script>

<div
  class="relative inline-block"
  on:mouseenter={showTooltip}
  on:mouseleave={hideTooltip}
  on:focus={showTooltip}
  on:blur={hideTooltip}
>
  <slot />
  
  {#if isVisible}
    <div
      bind:this={tooltipElement}
      class="
        absolute 
        z-50 
        px-2 
        py-1 
        text-sm 
        text-white 
        bg-gray-900 
        rounded 
        whitespace-normal
        {placementClasses[placement].container}
      "
      style="max-width: {maxWidth}"
      transition:fly={{ duration: 200, y: 5 }}
      role="tooltip"
    >
      {text}
      <div
        class="
          absolute 
          w-2 
          h-2 
          bg-gray-900 
          transform 
          {placementClasses[placement].arrow}
        "
      />
    </div>
  {/if}
</div> 