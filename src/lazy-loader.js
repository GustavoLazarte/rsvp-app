const MODULES = {
  'app-story': () => import('./components/app-story.js'),
  'app-album': () => import('./components/app-album.js'),
  'app-timeline': () => import('./components/app-timeline.js'),
  'app-logistics': () => import('./components/app-logistics.js'),
  'app-weather': () => import('./components/app-weather.js'),
  'app-dresscode': () => import('./components/app-dresscode.js'),
  'app-gifts': () => import('./components/app-gifts.js'),
  'app-upload': () => import('./components/app-upload.js'),
  'app-rsvp': () => import('./components/app-rsvp.js'),
  'app-footer': () => import('./components/app-footer.js'),
  'app-floating': () => import('./components/app-floating.js'),
};

// customElements.get() lanza error si el tag no es válido, se ataja con try/catch
function isDefined(tag) {
  try {
    return !!customElements.get(tag);
  } catch {
    return false;
  }
}

// IntersectionObserver con 300px de margen: importa el componente cuando
// aparece en el viewport, evitando carga eager de toda la wedding page
export function observeLazy() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const tag = entry.target.tagName.toLowerCase();
      if (MODULES[tag] && !isDefined(tag)) {
        MODULES[tag]().catch((err) => {
          console.error(`Failed to load ${tag}:`, err);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '300px 0px',
  });

  const tags = Object.keys(MODULES);
  document.querySelectorAll(tags.join(',')).forEach((el) => {
    if (!isDefined(el.tagName.toLowerCase())) {
      observer.observe(el);
    }
  });

  return observer;
}
