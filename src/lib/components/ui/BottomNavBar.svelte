<script lang="ts">
  import { page } from '$app/stores';
  import IconPlay from '$lib/components/icons/IconPlay.svelte';
  import IconTrophy from '$lib/components/icons/IconTrophy.svelte';
  import IconUser from '$lib/components/icons/IconUser.svelte';
  import type { ComponentType } from 'svelte';

  interface NavItem {
    path: string;
    label: string;
    icon: ComponentType;
  }

  const navItems: NavItem[] = [
    { path: '/play', label: 'Jugar', icon: IconPlay },
    { path: '/rankings', label: 'Rankings', icon: IconTrophy },
    { path: '/profile', label: 'Perfil', icon: IconUser },
  ];

  $: currentPath = $page.url.pathname;
</script>

<nav class="fixed bottom-0 left-0 right-0 h-16 bg-bg-secondary border-t border-bg-tertiary shadow-top-md z-50">
  <div class="flex justify-around items-center h-full max-w-md mx-auto">
    {#each navItems as item}
      <a
        href={item.path}
        class="flex flex-col items-center justify-center flex-1 h-full text-text-secondary hover:text-accent-primary focus:text-accent-primary focus:outline-none transition-colors duration-200 group"
        aria-label={item.label}
        class:text-accent-primary={currentPath.startsWith(item.path)}
        class:font-semibold={currentPath.startsWith(item.path)}
      >
        <svelte:component 
          this={item.icon} 
          extraClass="w-6 h-6 mb-0.5 {currentPath.startsWith(item.path) ? 'text-accent-primary' : 'text-text-secondary group-hover:text-accent-primary group-focus:text-accent-primary'}" 
        />
        <span class="text-xs {currentPath.startsWith(item.path) ? 'text-accent-primary' : 'text-text-secondary group-hover:text-accent-primary group-focus:text-accent-primary'}">
          {item.label}
        </span>
        {#if currentPath.startsWith(item.path)}
          <div class="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent-primary rounded-full"></div>
        {/if}
      </a>
    {/each}
  </div>
</nav>

<style>
  .shadow-top-md {
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.07), 0 -2px 4px -2px rgba(0, 0, 0, 0.04);
  }
</style> 