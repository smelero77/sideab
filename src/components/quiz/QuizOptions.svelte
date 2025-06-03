<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { 
    answered, 
    userAnswer, 
    currentQuestion 
  } from '$lib/stores/gameStore';
  import type { Question } from '$lib/stores/gameStore';
  import Button from '$lib/components/ui/Button/Button.svelte';
  import Card from '$lib/components/ui/Card/Card.svelte';

  export let question: Question;
  
  const dispatch = createEventDispatcher<{
    answer: string;
  }>();

  function handleClick(option: string) {
    if ($answered) return;
    dispatch('answer', option);
  }
</script>

<Card variant="bordered" padding="md" className="max-w-2xl mx-auto">
  <div class="grid gap-4">
    {#each question.options as option}
      <Button
        variant={$answered && option === question.correctTitle ? 'success' : 
                $answered && option === $userAnswer && option !== question.correctTitle ? 'error' :
                $userAnswer === option ? 'primary' : 'info'}
        fullWidth
        disabled={$answered}
        on:click={() => handleClick(option)}
        className="text-left justify-start"
      >
        {option}
      </Button>
    {/each}
  </div>
</Card>

<style>
  :global(.btn) {
    position: relative;
    overflow: hidden;
  }

  :global(.btn::after) {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  :global(.btn:hover:not(:disabled)::after) {
    transform: translateX(100%);
  }

  :global(.btn-success) {
    animation: correct-answer 0.5s ease-out;
  }

  :global(.btn-error) {
    animation: wrong-answer 0.5s ease-out;
  }

  @keyframes correct-answer {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes wrong-answer {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }
</style> 