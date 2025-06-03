<script lang="ts">
  import { notifications } from '$lib/stores/notificationStore';
  import ToastMessage from './ToastMessage.svelte';
</script>

{#if $notifications.length > 0}
  <div aria-live="assertive" class="fixed bottom-20 md:bottom-5 right-5 z-[100] flex flex-col items-end w-auto max-w-sm">
    {#each $notifications as toast (toast.id)}
      <ToastMessage {toast} />
    {/each}
  </div>
{/if} 