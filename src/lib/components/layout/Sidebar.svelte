<script lang="ts">
    import { menu } from '$lib/stores/menuStore';
    import { clickOutside } from '$lib/actions/clickOutside';

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

<!-- Fondo que ocupa toda la página -->
<div class="fixed inset-0 bg-neutral-900 z-10" />

<aside
    bind:this={sidebarElement}
    class="
        fixed top-0 left-0 z-10 
        h-full w-[500px]
        text-white 
        p-0 flex flex-col
        font-['Barlow_Condensed',sans-serif]
    "
    use:clickOutside={() => {
        if ($menu) {
            menu.close();
        }
    }}
    aria-hidden={!$menu}
    inert={!$menu}
>
    <nav class="fixed w-[500px] left-0 h-full py-20 z-0 text-[#cacaca] overflow-x-auto overflow-y-scroll scrollbar-none">
        <ul class="px-20 mt-8">
            {#each menuItems as item, i}
                <li class="font-['Barlow',sans-serif] font-semibold w-full text-[20px] md:text-[23px] border-t border-[#313131]">
                    <a 
                        href={item.href} 
                        class="flex justify-between items-center w-full leading-[1.2] py-8 text-white transition-colors duration-[0.22s] ease-out"
                    >
                        {item.label}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </a>
                </li>
            {/each}
        </ul>
        <div class="mt-8 pt-6 px-20">
            <ul>
                {#each otherLinks as item, i}
                    <li class="font-['Barlow',sans-serif] font-semibold w-full text-[18px]">
                        <a 
                            href={item.href} 
                            class="flex justify-between items-center w-full leading-[1.2] py-3 text-[#cacaca] hover:text-white transition-colors duration-[0.22s] ease-out"
                        >
                            {item.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </nav>

    <div class="mt-auto p-8 px-16">
        <button class="w-full bg-neutral-800 hover:bg-neutral-700 text-white text-lg font-semibold py-4 px-6 rounded transition-colors duration-200 flex items-center justify-center font-['Barlow_Condensed',sans-serif]">
            WE ❤️ FEEDBACK
        </button>
    </div>
</aside>

<style>
    .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }
</style> 