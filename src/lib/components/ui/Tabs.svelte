<script lang="ts">
  import { fade } from 'svelte/transition';
  
  export let tabs: { id: string; label: string }[] = [];
  export let activeTab = tabs[0]?.id;
  export let variant: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded' = 'line';
  export let fullWidth = false;

  const variantClasses = {
    line: {
      container: 'border-b border-border',
      tab: 'border-b-2 border-transparent hover:text-text-primary hover:border-border',
      active: 'border-primary text-primary'
    },
    enclosed: {
      container: 'space-x-2',
      tab: 'border border-transparent rounded-t-lg hover:bg-bg-secondary hover:text-text-primary',
      active: 'bg-bg-primary border-border border-b-transparent text-primary'
    },
    'soft-rounded': {
      container: 'space-x-2',
      tab: 'rounded-lg hover:bg-bg-secondary hover:text-text-primary',
      active: 'bg-primary/10 text-primary'
    },
    'solid-rounded': {
      container: 'space-x-2',
      tab: 'rounded-lg hover:bg-bg-secondary hover:text-text-primary',
      active: 'bg-primary text-white'
    }
  };

  function handleTabClick(tabId: string) {
    activeTab = tabId;
  }
</script>

<div class="w-full">
  <div
    class="
      flex 
      {fullWidth ? 'w-full' : ''}
      {variantClasses[variant].container}
    "
    role="tablist"
  >
    {#each tabs as tab}
      <button
        class="
          px-4 
          py-2 
          text-sm 
          font-medium 
          text-text-secondary 
          transition-colors 
          {variantClasses[variant].tab}
          {activeTab === tab.id ? variantClasses[variant].active : ''}
          {fullWidth ? 'flex-1' : ''}
        "
        role="tab"
        aria-selected={activeTab === tab.id}
        aria-controls={`panel-${tab.id}`}
        on:click={() => handleTabClick(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <div class="mt-4">
    {#each tabs as tab}
      {#if activeTab === tab.id}
        <div
          id={`panel-${tab.id}`}
          role="tabpanel"
          transition:fade={{ duration: 200 }}
        >
          <slot {tab} />
        </div>
      {/if}
    {/each}
  </div>
</div> 