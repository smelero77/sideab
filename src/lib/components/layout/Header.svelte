<script lang="ts">
    import { menu } from '$lib/stores/menuStore';
    import Logo from '$lib/components/ui/Logo.svelte';
</script>

<header class="py-8 px-6 flex justify-between items-center bg-neutral-900 z-30 relative">
    <div class="flex items-center space-x-4">
        <button
            on:click={() => menu.toggle()}
            class="p-3 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
            aria-label="Toggle menu"
        >
            {#if $menu}
                <!-- Icono "X" -->
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="1.5"
                     stroke="currentColor"
                     class="w-7 h-7"
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
                     class="w-7 h-7"
                >
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            {/if}
        </button>
        <Logo size="md" variant="primary" />
    </div>

    <div class="flex items-center space-x-4">
        <button class="bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold py-3 px-6 rounded">
            UPGRADE TO PREMIUM
        </button>
        <button class="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-white hover:bg-neutral-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 class="w-6 h-6"
            >
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        </button>
    </div>
</header> 