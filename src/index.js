// Simple non-React entrypoint — calls the vanilla initializer from MoniJose.js
import MoniApp from './MoniJose.js';

document.addEventListener('DOMContentLoaded', () => {
  // initialize with default language 'es' and target root id 'root'
  if (MoniApp && typeof MoniApp.init === 'function') {
    MoniApp.init('es', 'root');
  } else if (MoniApp && typeof MoniApp.default === 'object' && typeof MoniApp.default.init === 'function') {
    MoniApp.default.init('es', 'root');
  }
});
