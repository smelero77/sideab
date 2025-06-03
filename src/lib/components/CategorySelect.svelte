<script lang="ts">
  import { selectedKey, allCategories } from '$lib/stores/gameStore';
</script>

<div class="w-full max-w-md mx-auto">
  <label for="category-select" class="block text-sm font-medium text-white mb-2">
    Selecciona una categoría
  </label>
  
  <div class="relative">
    <select
      id="category-select"
      bind:value={$selectedKey}
      class="w-full p-3 rounded-2xl bg-gray-800 text-white 
             border border-gray-700 focus:ring-2 focus:ring-indigo-500 
             focus:border-indigo-500 transition-all duration-200
             appearance-none cursor-pointer"
    >
      {#each allCategories as category}
        <option value={category.key}>
          {category.label}
        </option>
      {/each}
    </select>
    
    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>

<style>
  select {
    background-color: rgb(31, 41, 55);
    color: white;
    padding-right: 2.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  
  select:focus {
    outline: none;
    border-color: rgb(99, 102, 241);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  select option {
    background-color: rgb(31, 41, 55);
    color: white;
    padding: 0.5rem;
  }
</style> 