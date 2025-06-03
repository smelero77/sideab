<script lang="ts">
  export let type: 'text' | 'email' | 'password' | 'number' = 'text';
  export let value = '';
  export let placeholder = '';
  export let disabled = false;
  export let error = '';
  export let label = '';
  export let name = '';
  export let required = false;
  export let autocomplete = 'off';

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="flex flex-col gap-1">
  {#if label}
    <label for={inputId} class="text-sm font-medium text-text-primary">
      {label}
      {#if required}
        <span class="text-error">*</span>
      {/if}
    </label>
  {/if}
  
  <input
    {type}
    {value}
    {placeholder}
    {disabled}
    {name}
    {required}
    {autocomplete}
    id={inputId}
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
    on:input
    on:change
    on:focus
    on:blur
  />

  {#if error}
    <span class="text-sm text-error">{error}</span>
  {/if}
</div> 