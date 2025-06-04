<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { menu } from '$lib/stores/menuStore';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import '../app.css';
  import { GameManager } from '$lib/game/GameManager';
  import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
  import ToastContainer from '$lib/components/ui/ToastContainer.svelte';
  import Card from '$lib/components/ui/Card/Card.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';

  const gameManager = GameManager.getInstance();

  // Para cerrar el menú al cambiar de ruta
  let previousPath = $page.url.pathname;
  $: if (
    $page.url.pathname !== previousPath &&
    $menu &&
    typeof window !== 'undefined'
  ) {
    previousPath = $page.url.pathname;
    menu.close();
  }

  $: console.log('Estado del menú en layout:', $menu);
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<!-- 
  Aquí inyectamos la variable CSS --menu-progress
  que vale 0 cuando $menu=false, y 1 cuando $menu=true.
-->
<div
  class="relative min-h-screen overflow-hidden p-2 md:p-8"
  style="--menu-progress: {$menu ? 1 : 0};"
>
  <!-- Elementos flotantes -->
  <div
    class="fixed top-0 left-0 right-0 py-4 md:py-8 px-4 md:px-6 flex justify-between items-center z-50 pointer-events-none"
  >
    <div class="flex items-center space-x-2 md:space-x-4 pointer-events-auto">
      <button
        on:click={() => menu.toggle()}
        class="p-2 md:p-3 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
        aria-label="Toggle menu"
      >
        {#if $menu}
          <!-- Icono "X" -->
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6 md:w-7 md:h-7"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <!-- Icono hamburguesa -->
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6 md:w-7 md:h-7"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        {/if}
      </button>
      <div class="flex items-center translate-y-0.5 md:translate-y-1">
        <Logo size="md" variant="primary" />
      </div>
    </div>

    <div class="flex items-center space-x-2 md:space-x-4 pointer-events-auto">
      <button class="bg-yellow-500 hover:bg-yellow-400 text-black text-xs md:text-sm font-semibold py-2 md:py-3 px-4 md:px-6 rounded">
        UPGRADE TO PREMIUM
      </button>
      <button class="w-8 h-8 md:w-10 md:h-10 bg-neutral-800 rounded-full flex items-center justify-center text-white hover:bg-neutral-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke-width="1.5"
             stroke="currentColor"
             class="w-5 h-5 md:w-6 md:h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Stage (Layout principal) -->
  <div
    class="absolute inset-0 bg-black text-white z-20 rounded-[1.5rem] md:rounded-[3rem] stage-panel"
  >
    <div class="h-full">
      <slot />
    </div>
  </div>

  <!-- Sidebar/Menu -->
  <Sidebar />
</div>

<ToastContainer />

<style>
  :global(.theme-neon) {
    --bg-color: #0f172a;
    --text-color: #e0e7ff;
    --accent-color: #a78bfa;
  }

  /* Aseguramos que la propiedad transform rinda bien */
  :global(.transform) {
    will-change: transform;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  /* Estilos para el Stage */
  .stage-panel {
    transition: transform 500ms ease-in-out;
    transform: translateX(calc(var(--menu-progress) * 60%))
               translateY(calc(var(--menu-progress) * 5rem));
  }

  @media (min-width: 768px) {
    .stage-panel {
      transform: translateX(calc(var(--menu-progress) * 30rem))
                 translateY(calc(var(--menu-progress) * 6.875rem));
    }
  }
</style> 