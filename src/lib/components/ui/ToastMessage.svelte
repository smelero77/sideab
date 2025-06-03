<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { notifications, type ToastNotification } from '$lib/stores/notificationStore';
  import IconCheckCircle from '$lib/components/icons/IconCheckCircle.svelte';
  import IconXCircle from '$lib/components/icons/IconXCircle.svelte';
  import IconInfoCircle from '$lib/components/icons/IconInfoCircle.svelte';
  import IconWarningTriangle from '$lib/components/icons/IconWarningTriangle.svelte';

  export let toast: ToastNotification;

  const typeStyles = {
    success: {
      bg: 'bg-success-bg',
      text: 'text-success-text',
      border: 'border-success-border',
      iconColor: 'text-success-text',
      icon: IconCheckCircle,
    },
    error: {
      bg: 'bg-error-bg',
      text: 'text-error-text',
      border: 'border-error-border',
      iconColor: 'text-error-text',
      icon: IconXCircle,
    },
    info: {
      bg: 'bg-info-bg',
      text: 'text-info-text',
      border: 'border-info-border',
      iconColor: 'text-info-text',
      icon: IconInfoCircle,
    },
    warning: {
      bg: 'bg-warning-bg',
      text: 'text-warning-text',
      border: 'border-warning-border',
      iconColor: 'text-warning-text',
      icon: IconWarningTriangle,
    },
  };

  const currentStyle = typeStyles[toast.type];
</script>

<div
  in:fly={{ y: 20, duration: 300, opacity:0 }}
  out:fade={{ duration: 200 }}
  class="flex items-center p-3 mb-2 rounded-lg shadow-xl border {currentStyle.bg} {currentStyle.text} {currentStyle.border} w-full max-w-sm transform transition-all"
  role="alert"
>
  <div class="mr-3 shrink-0">
    <svelte:component this={currentStyle.icon} extraClass="w-6 h-6 {currentStyle.iconColor}" />
  </div>
  <p class="flex-1 text-sm font-medium mr-2">{toast.message}</p>
  <button
    on:click={() => notifications.removeToast(toast.id)}
    class="ml-auto p-1 rounded-full {currentStyle.text} opacity-70 hover:opacity-100 hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current_color"
    aria-label="Cerrar notificación"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div> 