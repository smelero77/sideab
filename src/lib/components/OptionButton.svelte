<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { answered, currentQuestion, userAnswer } from '$lib/stores/gameStore';
  import { get } from 'svelte/store';
  import { fade } from 'svelte/transition';

  export let title: string;
  const dispatch = createEventDispatcher();

  function handleClick() {
    if (get(answered)) return;
    dispatch('select', title);
  }

  $: isCorrect = get(answered) && title === get(currentQuestion)?.correctTitle;
  $: isWrong = get(answered) && title === get(userAnswer) && title !== get(currentQuestion)?.correctTitle;
  $: isSelected = get(userAnswer) === title;
</script>

<button
  on:click={handleClick}
  class="w-full py-3 px-4 mb-2 bg-gray-800 text-white rounded-lg shadow-md 
         transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg 
         disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 
         focus:ring-indigo-500"
  class:bg-green-500={isCorrect}
  class:bg-red-500={isWrong}
  class:ring-2={isSelected}
  class:ring-indigo-500={isSelected}
  disabled={get(answered)}
  in:fade={{ duration: 200 }}
>
  {title}
</button>

<style>
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  .bg-red-500 {
    animation: shake 0.3s ease-in-out;
  }

  .bg-green-500 {
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.6);
  }
</style> 