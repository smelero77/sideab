<script lang="ts">
    import { menu } from '$lib/stores/menuStore';
    // import { clickOutside } from '$lib/actions/clickOutside';

    const menuItems = [
        { href: '#premium', label: 'Premium' },
        { href: '#collectors', label: 'Collectors' },
        { href: '#curated-lists', label: 'Curated lists' },
        { href: '#collector-challenges', label: 'Collector Challenges' },
    ];

    const otherLinks = [
        { href: '#privacy', label: 'Privacy policy' },
        { href: '#terms', label: 'Terms of use' },
        { href: '#acceptable-use', label: 'Acceptable use policy' },
    ];

    let sidebarElement: HTMLElement;

    $: console.log('Estado del menú en sidebar:', $menu);
</script>

<!-- Fondo que ocupa toda la página (solo visual) -->
<div class="fixed inset-0 bg-neutral-900 z-10" style="opacity: var(--menu-progress);" />

<aside
    bind:this={sidebarElement}
    class="
        fixed top-0 left-0 z-10 
        h-full 
        w-[60%] md:w-[500px]
        text-white 
        p-0 flex flex-col
        font-['Barlow_Condensed',sans-serif]
    "
    style="opacity: var(--menu-progress);"
    aria-hidden={!$menu}
    inert={!$menu}
>
    <nav class="fixed w-[60%] md:w-[500px] left-0 h-full py-12 md:py-20 z-0 text-[#cacaca] overflow-x-auto overflow-y-scroll scrollbar-none">
        <ul class="px-6 md:px-20 mt-16 md:mt-16">
            {#each menuItems as item, i}
                <li class="font-['Barlow',sans-serif] font-semibold w-full text-[16px] md:text-[23px] {i > 0 ? 'border-t border-[#313131]' : ''}">
                    <a 
                        href={item.href} 
                        class="menu-link flex justify-between items-center w-full leading-[1.2] py-4 md:py-8 transition-colors duration-[0.22s] ease-out group no-underline"
                    >
                        {item.label}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 md:w-5 md:h-5 transition-colors duration-[0.22s] ease-out ml-1 md:ml-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </a>
                </li>
            {/each}
        </ul>
        <div class="mt-6 md:mt-8 pt-4 md:pt-6 px-6 md:px-20">
            <ul>
                {#each otherLinks as item, i}
                    <li class="font-['Barlow',sans-serif] font-semibold w-full text-[14px] md:text-[18px]">
                        <a 
                            href={item.href} 
                            class="menu-link transition-colors duration-[0.22s] ease-out no-underline"
                        >
                            {item.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>

        <div class="mt-12 md:mt-20 px-6 md:px-20">
            <button class="w-full bg-neutral-800 hover:bg-neutral-700 text-white text-sm md:text-lg font-semibold py-2.5 md:py-4 px-4 md:px-6 rounded transition-colors duration-200 flex items-center justify-center font-['Barlow_Condensed',sans-serif]">
                WE ❤️ FEEDBACK
            </button>
        </div>
    </nav>
</aside>

<style>
    .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }

    /* 
        Definimos que .menu-link (el <a> de cada item)
        tenga un color base "apagado" cuando --menu-progress = 0,
        y un color "iluminado" cuando --menu-progress = 1.
    */
    .menu-link {
        color: rgba(255, 255, 255, calc(0.2 + 0.8 * var(--menu-progress)));
        transition: color 500ms ease;
    }

    .menu-link:hover {
        color: rgba(255, 255, 255, calc(0.3 + 0.7 * var(--menu-progress)));
    }

    /* Cambiamos también el color del icono SVG al mismo ritmo */
    .menu-link svg {
        stroke: rgba(255, 255, 255, var(--menu-progress));
        transition: stroke 500ms ease;
    }

    /* Aseguramos que las transiciones sean suaves */
    aside, .fixed.inset-0 {
        transition: opacity 500ms ease-in-out;
    }
</style> 