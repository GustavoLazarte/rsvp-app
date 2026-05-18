// ─── Eager (critical) components loaded immediately ────────────────
import './components/app-ticker.js';
import './components/app-hero.js';
import './pages/app-login.js';
import './pages/app-dashboard.js';

// ─── Lazy (non-critical) components loaded on scroll ───────────────
import { observeLazy } from './lazy-loader.js';

// ─── Router & Auth ─────────────────────────────────────────────────
import { startRouter, registerRoute, navigate } from './services/router.js';
import { guardAuth } from './guards/auth.js';

const weddingSite = document.getElementById('wedding-site');
const authViews = document.getElementById('auth-views');
const loginEl = document.querySelector('app-login');
const dashEl = document.querySelector('app-dashboard');

function showWedding(invId) {
  window.__INV_ID__ = invId;
  weddingSite.style.display = '';
  authViews.style.display = 'none';
}

function showAuth(view) {
  if (!guardAuth(view)) return;
  weddingSite.style.display = 'none';
  authViews.style.display = '';
  loginEl.style.display = view === 'login' ? '' : 'none';
  dashEl.style.display = view === 'dashboard' ? '' : 'none';
}

registerRoute('/inv/:id', ({ id }) => showWedding(id));
registerRoute('/login', () => showAuth('login'));
registerRoute('/dashboard', () => showAuth('dashboard'));
registerRoute('*', () => showWedding('default'));

// ─── Global language state ─────────────────────────────────────────
let currentLang = 'es';

function applyLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[lang]').forEach((el) => {
    el.setAttribute('lang', lang);
  });
}

// single delegated click handler for all anchor links, avoids querySelectorAll
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      const href = link.getAttribute('href');
      if (href === '#/' || href.startsWith('#/')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.querySelector('.hero-chevron')?.addEventListener('click', () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ─── Reveal animation observer ────────────────────────────────────
let _revealObserver;

function observeReveals() {
  if (!_revealObserver) {
    _revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          _revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px' });
  }
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => _revealObserver.observe(el));
}

// ─── Bootstrap ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  observeLazy();
  initSmoothScroll();
  observeReveals();
  startRouter();

  const mutationObserver = new MutationObserver(() => observeReveals());
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('lang-change', (e) => {
    applyLang(e.detail);
    observeReveals();
  });
});
