<script lang="ts">
  import { fade } from 'svelte/transition';
  
  export let type: 'info' | 'success' | 'warning' | 'error' = 'info';
  export let title = '';
  export let showIcon = true;
  export let dismissible = false;
  export let autoDismiss = false;
  export let dismissTimeout = 5000;

  let isVisible = true;

  const typeClasses = {
    info: {
      container: 'bg-info/10 border-info text-info',
      icon: 'text-info'
    },
    success: {
      container: 'bg-success/10 border-success text-success',
      icon: 'text-success'
    },
    warning: {
      container: 'bg-warning/10 border-warning text-warning',
      icon: 'text-warning'
    },
    error: {
      container: 'bg-error/10 border-error text-error',
      icon: 'text-error'
    }
  };

  if (autoDismiss) {
    setTimeout(() => {
      isVisible = false;
    }, dismissTimeout);
  }

  function handleDismiss() {
    isVisible = false;
  }
</script>

{#if isVisible}
  <div
    class="
      p-4 
      mb-4 
      rounded-lg 
      border 
      {typeClasses[type].container}
    "
    transition:fade={{ duration: 200 }}
    role="alert"
  >
    <div class="flex items-center">
      {#if showIcon}
        <div class="flex-shrink-0 {typeClasses[type].icon}">
          {#if type === 'info'}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          {:else if type === 'success'}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          {:else if type === 'warning'}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          {:else if type === 'error'}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          {/if}
        </div>
      {/if}
      
      <div class="ml-3 flex-1">
        {#if title}
          <h3 class="text-sm font-medium">{title}</h3>
        {/if}
        <div class="text-sm">
          <slot />
        </div>
      </div>

      {#if dismissible}
        <button
          type="button"
          class="
            ml-auto 
            -mx-1.5 
            -my-1.5 
            rounded-lg 
            p-1.5 
            inline-flex 
            h-8 
            w-8 
            focus:outline-none 
            focus:ring-2 
            focus:ring-offset-2 
            focus:ring-offset-gray-50 
            focus:ring-gray-600
          "
          on:click={handleDismiss}
          aria-label="Cerrar"
        >
          <span class="sr-only">Cerrar</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
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
  </div>
{/if} 