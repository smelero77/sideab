<script lang="ts">
  export let isOpen = false;
  export let extraClass = "w-6 h-6";
  export let strokeWidth = "2.5";
  export let color = "currentColor";
</script>

<div class="burger-container {extraClass}" class:open={isOpen}>
  <svg viewBox="0 0 100 100" stroke={color} stroke-width={Number(strokeWidth) * 4} stroke-linecap="round" stroke-linejoin="round">
    <path class="line top" d="m 20,30 h 60" />
    <path class="line middle" d="m 20,50 h 60" />
    <path class="line bottom" d="m 20,70 h 60" />
  </svg>
</div>

<style>
  .burger-container svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .line {
    fill: none;
    transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
                opacity 0.2s 0.1s cubic-bezier(0.25, 0.1, 0.25, 1);
    transform-origin: center;
  }
  .burger-container.open .line.top {
    transform: translateY(20px) rotate(45deg);
  }
  .burger-container.open .line.middle {
    opacity: 0;
  }
  .burger-container.open .line.bottom {
    transform: translateY(-20px) rotate(-45deg);
  }
</style> 