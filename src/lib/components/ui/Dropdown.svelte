<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { clickOutside } from '$lib/actions/clickOutside';
  
  export let trigger: 'click' | 'hover' = 'click';
  export let placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  export let align: 'start' | 'center' | 'end' = 'start';
  export let offset = 8;
  export let width = 'auto';

  let isOpen = false;
  let triggerElement: HTMLElement;
  let dropdownElement: HTMLElement;

  const placementClasses = {
    top: {
      container: 'bottom-full mb-2',
      arrow: 'bottom-[-4px] rotate-45'
    },
    right: {
      container: 'left-full ml-2',
      arrow: 'left-[-4px] rotate-[-45deg]'
    },
    bottom: {
      container: 'top-full mt-2',
      arrow: 'top-[-4px] rotate-[-135deg]'
    },
    left: {
      container: 'right-full mr-2',
      arrow: 'right-[-4px] rotate-[135deg]'
    }
  };

  const alignClasses = {
    start: '',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  };

  function handleTriggerClick() {
    if (trigger === 'click') {
      isOpen = !isOpen;
    }
  }

  function handleTriggerMouseEnter() {
    if (trigger === 'hover') {
      isOpen = true;
    }
  }

  function handleTriggerMouseLeave() {
    if (trigger === 'hover') {
      isOpen = false;
    }
  }

  function handleClickOutside() {
    if (trigger === 'click') {
      isOpen = false;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false;
    }
  }
</script>

<div
  class="relative inline-block"
  on:mouseenter={handleTriggerMouseEnter}
  on:mouseleave={handleTriggerMouseLeave}
  on:keydown={handleKeydown}
>
  <div
    bind:this={triggerElement}
    on:click={handleTriggerClick}
  >
    <slot name="trigger" />
  </div>

  {#if isOpen}
    <div
      bind:this={dropdownElement}
      class="
        absolute 
        z-50 
        min-w-[8rem] 
        rounded-lg 
        bg-bg-primary 
        shadow-lg 
        ring-1 
        ring-black/5 
        {placementClasses[placement].container}
        {alignClasses[align]}
        {width === 'auto' ? '' : `w-${width}`}
      "
      transition:scale={{ duration: 200, start: 0.95 }}
      use:clickOutside={handleClickOutside}
    >
      <div
        class="
          absolute 
          w-2 
          h-2 
          bg-bg-primary 
          transform 
          {placementClasses[placement].arrow}
        "
      />
      <div class="py-1">
        <slot />
      </div>
    </div>
  {/if}
</div> 