<svelte:head><title>Jugar</title></svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-semibold text-text-primary">Modos de Juego</h1>
    <p class="text-text-secondary mt-2">¡Elige tu desafío!</p>
  </div>

  <div class="p-4 space-x-2">
    <button class="btn btn-success" on:click={() => toastSuccess('¡Esto es un éxito!')}>Éxito</button>
    <button class="btn btn-error" on:click={() => toastError('¡Oh no, un error!')}>Error</button>
    <button class="btn btn-info" on:click={() => toastInfo('Solo para tu información.')}>Info</button>
    <button class="btn btn-warning" on:click={() => toastWarning('Cuidado con esto.')}>Aviso</button>
  </div>
</div>

<script lang="ts">
  import { toastSuccess, toastError, toastInfo, toastWarning } from '$lib/stores/notificationStore';
</script> 