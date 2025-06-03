<script lang="ts" generics="T extends { toString(): string }">
  export let value: T | null = null;
  export let options: { value: T; label: string }[] = [];
  export let placeholder = '';
  export let disabled = false;
  export let error = '';
  export let label = '';
  export let name = '';
  export let required = false;

  const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="flex flex-col gap-1">
  {#if label}
    <label for={selectId} class="text-sm font-medium text-text-primary">
      {label}
      {#if required}
        <span class="text-error">*</span>
      {/if}
    </label>
  {/if}
  
  <select
    value={value?.toString() ?? ''}
    {disabled}
    {name}
    {required}
    id={selectId}
    class="
      w-full 
      px-4 
      py-2 
      bg-bg-secondary 
      border 
      rounded-lg 
      focus:outline-none 
      focus:ring-2 
      focus:ring-primary 
      {error ? 'border-error' : 'border-border'}
      {disabled ? 'opacity-50 cursor-not-allowed' : ''}
    "
    on:change
    on:focus
    on:blur
  >
    {#if placeholder}
      <option value="" disabled selected>{placeholder}</option>
    {/if}
    
    {#each options as option}
      <option value={option.value.toString()}>{option.label}</option>
    {/each}
  </select>

  {#if error}
    <span class="text-sm text-error">{error}</span>
  {/if}
</div> 