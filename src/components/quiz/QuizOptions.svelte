<script lang="ts">
  import { gameStore } from '$stores/game';
  import type { Question } from '$lib/types';

  export let question: Question;
  export let onAnswer: (option: string) => void;

  function handleClick(option: string) {
    if ($gameStore.answered) return;
    onAnswer(option);
  }
</script>

<div class="options-container">
  {#each question.options as option}
    <button
      class="option-button"
      class:selected={$gameStore.userAnswer === option}
      class:correct={$gameStore.answered && option === question.correctTitle}
      class:wrong={$gameStore.answered && option === $gameStore.userAnswer && option !== question.correctTitle}
      on:click={() => handleClick(option)}
      disabled={$gameStore.answered}
    >
      {option}
    </button>
  {/each}
</div>

<style>
  .options-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    max-width: 500px;
    margin: 0 auto;
  }

  .option-button {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    background: #f5f5f5;
    color: #333;
    font-size: 1rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .option-button:hover:not(:disabled) {
    background: #e0e0e0;
    transform: translateY(-1px);
  }

  .option-button::after {
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

  .option-button:hover::after {
    transform: translateX(100%);
  }

  .selected {
    background: #e3f2fd;
  }

  .correct {
    background: #c8e6c9;
    animation: correct-answer 0.5s ease-out;
  }

  .wrong {
    background: #ffcdd2;
    animation: wrong-answer 0.5s ease-out;
  }

  @keyframes correct-answer {
    0% {
      transform: scale(1);
      background-color: #c8e6c9;
    }
    50% {
      transform: scale(1.05);
      background-color: #4caf50;
    }
    100% {
      transform: scale(1);
      background-color: #c8e6c9;
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

  @media (max-width: 768px) {
    .options-container {
      padding: 0.5rem;
    }

    .option-button {
      padding: 0.75rem;
      font-size: 0.9rem;
    }
  }
</style> 