<script lang="ts">
  import { page } from '$app/stores';
  import { isMenuOpen, closeMenu } from '$lib/stores/menuStore';
  import { fade, fly } from 'svelte/transition';

  import IconPlay from '$lib/components/icons/IconPlay.svelte';
  import IconTrophy from '$lib/components/icons/IconTrophy.svelte';
  import IconUser from '$lib/components/icons/IconUser.svelte';
  import IconDocumentText from '$lib/components/icons/IconDocumentText.svelte';
  import IconShieldCheck from '$lib/components/icons/IconShieldCheck.svelte';
  import IconPencilSquare from '$lib/components/icons/IconPencilSquare.svelte';
  import IconLogout from '$lib/components/icons/IconLogout.svelte';

  import type { ComponentType } from 'svelte';

  // Traza para ver cambios en el estado del menú
  $: console.log('SideMenu - Menu state:', $isMenuOpen);

  interface MenuItem {
    path: string;
    label: string;
    icon?: ComponentType;
    action?: () => void;
  }

  const menuItems: MenuItem[] = [
    { path: '/play', label: 'Jugar Ahora', icon: IconPlay },
    { path: '/rankings', label: 'Rankings', icon: IconTrophy },
    { path: '/profile', label: 'Mi Perfil', icon: IconUser },
    { path: '/rules', label: 'Reglas', icon: IconDocumentText },
    { path: '/achievements', label: 'Logros', icon: IconShieldCheck },
    { path: '/settings', label: 'Ajustes', icon: IconPencilSquare },
    { path: '/logout', label: 'Cerrar Sesión', icon: IconLogout }
  ];

  $: currentPath = $page.url.pathname;

  function handleItemClick(itemAction?: () => void) {
    console.log('Menu item clicked');
    if (itemAction) itemAction();
    closeMenu();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && $isMenuOpen) {
      console.log('Escape key pressed');
      closeMenu();
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if $isMenuOpen}
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
    on:click|self={closeMenu}
    transition:fade={{ duration: 200 }}
    aria-hidden="true"
  ></div>

  <aside
    class="fixed top-0 left-0 h-full w-64 md:w-72 bg-bg-secondary text-text-primary shadow-2xl z-50 flex flex-col"
    role="navigation"
    aria-label="Menú principal"
    transition:fly={{ x: -300, duration: 300 }}
  >
    <header class="p-5 h-16 flex items-center justify-between border-b border-bg-tertiary shrink-0">
      <a href="/" on:click={closeMenu} id="sidemenu-title" class="text-xl font-semibold text-accent-primary hover:opacity-80 transition-opacity duration-300">
        Side A / Side B
      </a>
    </header>

    <nav class="flex-1 py-3 space-y-0.5 overflow-y-auto">
      {#each menuItems as item (item.path)}
        <a
          href={item.path}
          on:click={() => handleItemClick(item.action)}
          class:bg-accent-primary={currentPath.startsWith(item.path)}
          class:text-text-primary={currentPath.startsWith(item.path)}
          class:font-medium={currentPath.startsWith(item.path)}
          class="flex items-center px-5 py-2.5 text-sm
                 hover:bg-bg-tertiary hover:text-text-primary
                 focus:bg-bg-tertiary focus:text-text-primary focus:outline-none
                 transition-colors duration-300
                 {currentPath.startsWith(item.path) ? '' : 'text-text-tertiary'}"
          aria-current={currentPath.startsWith(item.path) ? 'page' : undefined}
        >
          {#if item.icon}
            <svelte:component 
              this={item.icon} 
              extraClass="w-5 h-5 mr-3.5 {currentPath.startsWith(item.path) ? 'text-text-primary' : 'text-text-tertiary group-hover:text-text-secondary'}" 
            />
          {/if}
          <span>{item.label}</span>
        </a>
      {/each}
    </nav>

    <footer class="p-5 border-t border-bg-tertiary shrink-0">
      <p class="text-xs text-text-tertiary">
        Versión 0.1.0
      </p>
    </footer>
  </aside>
{/if} 