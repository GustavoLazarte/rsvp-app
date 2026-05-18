export function getCountdown(target) {
  const diff = new Date(target) - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

// Retorna función de limpieza para que el caller detenga el intervalo al hacer cleanup
export function startCountdown(target, onTick) {
  const tick = () => onTick(getCountdown(target));
  tick();
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}
