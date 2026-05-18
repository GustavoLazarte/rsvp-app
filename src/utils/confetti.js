const COLORS = ['#3A6B4A', '#B89B6A', '#B8D4BE', '#fff', '#264D35', '#d4e8d8'];

// Genera N partículas con tamaño, forma, color, duración y delay aleatorios
// Cada partícula se auto-remueve a los 5s para no acumular nodos en el DOM
export function launchConfetti(count = 90) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'cf';
    const s = Math.random() * 9 + 4;
    el.style.cssText = `width:${s}px;height:${s}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};background:${COLORS[Math.floor(Math.random() * COLORS.length)]};left:${Math.random() * 100}vw;animation-duration:${Math.random() * 2.5 + 2}s;animation-delay:${Math.random() * 0.6}s;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}
