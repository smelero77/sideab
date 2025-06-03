<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { 
    inQuiz, 
    selectedKey, 
    currentQuestion, 
    answered, 
    userAnswer, 
    lives, 
    score, 
    timer, 
    blurAmount,
    startQuiz,
    loadNextQuestion
  } from '$lib/stores/gameStore';
  import type { Question } from '$lib/stores/gameStore';
  import { get } from 'svelte/store';
  
  import Header from '$lib/components/Header.svelte';
  import CategorySelect from '$lib/components/CategorySelect.svelte';
  import CoverReveal from '$lib/components/CoverReveal.svelte';
  import OptionButton from '$lib/components/OptionButton.svelte';
  import LivesDisplay from '$lib/components/LivesDisplay.svelte';
  import TimerBar from '$lib/components/TimerBar.svelte';
  import ScoreDisplay from '$lib/components/ScoreDisplay.svelte';
  import GameOverModal from '$lib/components/GameOverModal.svelte';

  let timerInterval: ReturnType<typeof setInterval>;

  onMount(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  });

  function startTimer() {
    // Limpiar intervalo existente si lo hay
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    // Reiniciar el timer
    timer.set(0);
    
    // Iniciar nuevo intervalo
    timerInterval = setInterval(() => {
      timer.update(n => {
        const newTime = n + 0.5;
        if (newTime >= 10) {
          if (timerInterval) clearInterval(timerInterval);
          handleTimeUp();
          return 10;
        }
        return newTime;
      });
    }, 500);
  }

  async function handleAnswer(event: CustomEvent<string>) {
    const selectedTitle = event.detail;
    userAnswer.set(selectedTitle);
    answered.set(true);

    const currentQ = get(currentQuestion);
    if (currentQ && selectedTitle === currentQ.correctTitle) {
      score.update(n => n + 1);
    } else {
      lives.update(n => n - 1);
    }

    setTimeout(async () => {
      if (get(lives) > 0) {
        await loadNextQuestion();
        startTimer(); // Reiniciar el timer después de cargar la siguiente pregunta
      } else {
        inQuiz.set(false);
        if (timerInterval) clearInterval(timerInterval);
      }
    }, 1500);
  }

  async function handleTimeUp() {
    // Si el usuario no ha respondido, perder una vida
    if (!get(answered)) {
      lives.update(n => n - 1);
    }

    // Esperar un momento para que el usuario vea el resultado
    setTimeout(async () => {
      if (get(lives) > 0) {
        await loadNextQuestion();
        startTimer(); // Reiniciar el timer después de cargar la siguiente pregunta
      } else {
        inQuiz.set(false);
        if (timerInterval) clearInterval(timerInterval);
      }
    }, 1500);
  }

  async function handleStartQuiz() {
    await startQuiz($selectedKey);
    startTimer(); // Usar la función startTimer para iniciar el juego
  }
</script>

<main class="min-h-screen bg-black text-white relative">
  <Header />
  
  <div class="container mx-auto px-4 py-8">
    {#if !$inQuiz}
      <div class="max-w-md mx-auto space-y-8">
        <CategorySelect />
        
        <button
          on:click={handleStartQuiz}
          class="w-full py-3 bg-indigo-600 rounded-lg shadow-lg 
                 hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-0.5
                 text-lg font-semibold"
        >
          Comenzar Quiz
        </button>
      </div>
    {:else}
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="flex justify-between items-center">
          <LivesDisplay />
          <ScoreDisplay />
        </div>
        
        <TimerBar />
        
        <div class="flex flex-col md:flex-row items-start md:space-x-8">
          <CoverReveal className="md:w-1/2" />
          
          <div class="md:w-1/2 mt-6 md:mt-0">
            {#if $currentQuestion}
              <div class="space-y-2">
                {#each $currentQuestion.options as option}
                  <OptionButton 
                    title={option} 
                    on:select={handleAnswer}
                  />
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
</main>

{#if !$inQuiz && $lives <= 0}
  <div class="fixed inset-0 z-50">
    <GameOverModal />
  </div>
{/if}
