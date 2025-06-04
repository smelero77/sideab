// Action Svelte para permitir scroll horizontal por arrastre (drag) con mouse y touch
export default function dragScroll(node: HTMLElement) {
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  // Mouse events
  function handleMouseDown(e: MouseEvent) {
    isDown = true;
    node.classList.add('dragging');
    startX = e.pageX - node.offsetLeft;
    scrollLeft = node.scrollLeft;
    document.body.style.userSelect = 'none';
  }
  function handleMouseLeave() {
    isDown = false;
    node.classList.remove('dragging');
    document.body.style.userSelect = '';
  }
  function handleMouseUp() {
    isDown = false;
    node.classList.remove('dragging');
    document.body.style.userSelect = '';
  }
  function handleMouseMove(e: MouseEvent) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - node.offsetLeft;
    const walk = (x - startX) * 1.2; // Ajusta la sensibilidad
    node.scrollLeft = scrollLeft - walk;
  }

  // Touch events
  let touchStartX: number;
  let touchScrollLeft: number;
  function handleTouchStart(e: TouchEvent) {
    isDown = true;
    node.classList.add('dragging');
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = node.scrollLeft;
  }
  function handleTouchEnd() {
    isDown = false;
    node.classList.remove('dragging');
  }
  function handleTouchMove(e: TouchEvent) {
    if (!isDown) return;
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX) * 1.2;
    node.scrollLeft = touchScrollLeft - walk;
  }

  node.addEventListener('mousedown', handleMouseDown);
  node.addEventListener('mouseleave', handleMouseLeave);
  node.addEventListener('mouseup', handleMouseUp);
  node.addEventListener('mousemove', handleMouseMove);

  node.addEventListener('touchstart', handleTouchStart, { passive: true });
  node.addEventListener('touchend', handleTouchEnd);
  node.addEventListener('touchmove', handleTouchMove, { passive: false });

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('mouseleave', handleMouseLeave);
      node.removeEventListener('mouseup', handleMouseUp);
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchend', handleTouchEnd);
      node.removeEventListener('touchmove', handleTouchMove);
    }
  };
} 