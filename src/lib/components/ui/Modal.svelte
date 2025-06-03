<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { clickOutside } from '$lib/actions/clickOutside';
  
  export let isOpen = false;
  export let title = '';
  export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  export let closeOnClickOutside = true;
  export let closeOnEscape = true;
  export let showCloseButton = true;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full'
  };

  function handleKeydown(event: KeyboardEvent) {
    if (closeOnEscape && event.key === 'Escape') {
      isOpen = false;
    }
  }

  function handleClickOutside() {
    if (closeOnClickOutside) {
      isOpen = false;
    }
  }
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-50 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <button
      class="sr-only"
      on:keydown={handleKeydown}
      aria-label="Cerrar modal con Escape"
    />
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <div
        class="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
        transition:fade
      />

      <div
        class="
          relative 
          transform 
          overflow-hidden 
          rounded-lg 
          bg-bg-primary 
          text-left 
          shadow-xl 
          transition-all 
          w-full 
          {sizeClasses[size]}
        "
        transition:scale={{ duration: 200, start: 0.95 }}
        use:clickOutside={handleClickOutside}
      >
        <div class="flex items-center justify-between p-4 border-b border-border">
          <h3 id="modal-title" class="text-lg font-semibold text-text-primary">
            {title}
          </h3>
          {#if showCloseButton}
            <button
              type="button"
              class="
                p-1 
                text-text-secondary 
                hover:text-text-primary 
                transition-colors
              "
              on:click={() => (isOpen = false)}
              aria-label="Cerrar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          {/if}
        </div>

        <div class="p-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if} 