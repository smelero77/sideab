<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { menu } from '$lib/stores/menuStore';
  import Header from '$lib/components/layout/Header.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import '../app.css';
  import { GameManager } from '$lib/game/GameManager';
  import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
  import ToastContainer from '$lib/components/ui/ToastContainer.svelte';
  import Card from '$lib/components/ui/Card/Card.svelte';

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

<div class="relative min-h-screen overflow-hidden">
  <!-- 1) Header → z-30, bg-neutral-900 -->
  <div class="fixed top-0 left-0 right-0 z-30">
    <Header />
  </div>
  
  <!-- 2) Sidebar/Menu → z-10, bg-neutral-900 -->
  <Sidebar />
  
  <!-- 3) Stage (Layout principal) → z-20, bg-black (#000000) -->
  <div
    class="absolute inset-0 z-20 bg-black text-white transform origin-top-left transition-transform duration-500 ease-in-out translate-x-0 translate-y-0 rounded-none"
    class:translate-x-[16rem]={$menu}
    class:translate-y-[2.5rem]={$menu}
    class:rounded-xl={$menu}
    class:md:translate-x-[30rem]={$menu}
    class:md:translate-y-[6.875rem]={$menu}
    class:md:rounded-[20px]={$menu}
    on:click|stopPropagation={() => {
      if ($menu) menu.close();
    }}
  >
    <div class="pt-[4rem]">
      <slot />
    </div>
  </div>
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
</style> 