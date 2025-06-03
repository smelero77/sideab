<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { clickOutside } from '$lib/actions/clickOutside';
  import IconXCircle from '$lib/components/icons/IconXCircle.svelte';

  export let open = false;
  export let title = '';
  export let showConfirmButton = true;
  export let confirmText = 'Confirmar';
  export let showCancelButton = true;
  export let cancelText = 'Cancelar';

  const dispatch = createEventDispatcher<{
    close: void;
    confirm: void;
  }>();

  let modalElement: HTMLDivElement;

  function handleClose() {
    open = false;
    dispatch('close');
  }

  function handleConfirm() {
    dispatch('confirm');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-50 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <div
        class="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
        transition:fade
      />

      <div
        bind:this={modalElement}
        use:clickOutside={handleClose}
        class="relative transform overflow-hidden rounded-2xl bg-bg-secondary p-6 text-left shadow-xl transition-all w-full max-w-lg"
        transition:scale={{ duration: 200 }}
      >
        <div class="flex items-center justify-between mb-4">
          <h3 id="modal-title" class="text-lg font-semibold text-text-primary">
            {title}
          </h3>
          <button
            type="button"
            class="text-text-secondary hover:text-text-primary transition-colors"
            on:click={handleClose}
            aria-label="Cerrar"
          >
            <IconXCircle extraClass="w-6 h-6" />
          </button>
        </div>

        <div class="mt-2">
          <slot />
        </div>

        <div class="mt-6 flex justify-end gap-3">
          {#if showCancelButton}
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              on:click={handleClose}
            >
              {cancelText}
            </button>
          {/if}
          {#if showConfirmButton}
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors"
              on:click={handleConfirm}
            >
              {confirmText}
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if} 