<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { settings } from '$lib/stores/gameStore';
  import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
  import ToastContainer from '$lib/components/ui/ToastContainer.svelte';
  import SideMenu from '$lib/components/ui/SideMenu.svelte';
  import IconMenuBurger from '$lib/components/icons/IconMenuBurger.svelte';
  import { isMenuOpen, toggleMenu, closeMenu } from '$lib/stores/menuStore';
  import { page } from '$app/stores';

  // Traza para ver cambios en el estado del menú
  $: console.log('Menu state changed:', $isMenuOpen);

  let previousPath = $page.url.pathname;

  // Cierra el menú solo si la ruta realmente cambia
  $: if ($page.url.pathname !== previousPath && $isMenuOpen && typeof window !== 'undefined') {
    console.log('Route changed, closing menu');
    previousPath = $page.url.pathname;
    closeMenu();
  }
</script>

<div class="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300 flex flex-col overflow-x-hidden">
  <div
    id="main-content-wrapper"
    class="flex flex-col min-h-screen w-full relative z-10"
  >
    <header
      class="sticky top-0 z-20 bg-bg-primary/70 dark:bg-bg-secondary/70 backdrop-blur-md shadow-sm transition-all duration-300"
    >
      <div class="container mx-auto px-4 h-16 flex justify-between items-center">
        <button
          on:click={toggleMenu}
          class="p-2 -ml-2 rounded-full text-text-primary hover:bg-bg-tertiary focus:outline-none focus:bg-bg-tertiary focus:ring-2 focus:ring-accent-primary transition-all duration-300"
          aria-label={$isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={$isMenuOpen}
        >
          <IconMenuBurger extraClass="w-5 h-5" isOpen={$isMenuOpen} />
        </button>

        <a href="/" class="text-lg font-semibold text-accent-primary hover:opacity-80 transition-all duration-300 flex-1 text-center md:flex-none">
          Side A / Side B
        </a>

        <div class="flex items-center gap-1 transition-all duration-300">
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="px-4 py-6 flex-1 bg-bg-primary"> 
      <slot />
    </main>

    <footer class="p-4 text-center text-xs text-text-tertiary border-t border-bg-tertiary bg-bg-primary">
      © {new Date().getFullYear()} Side A / Side B. Todos los derechos reservados.
    </footer>
  </div>

  <SideMenu />
  <ToastContainer />
</div>

<style>
  :global(.theme-neon) {
    --bg-color: #0f172a;
    --text-color: #e0e7ff;
    --accent-color: #a78bfa;
  }
</style> 