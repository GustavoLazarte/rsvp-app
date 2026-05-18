import { T } from '../config/i18n.js';

class AppFloating extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <a class="fab-rsvp" href="#rsvp">${tr.nav_rsvp}</a>
      <div class="fab-music" id="music-toggle" title="Music — coming soon">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      </div>
    `;
  }

  initEvents() {
    const btn = this.querySelector('#music-toggle');
    if (btn) {
      btn.addEventListener('click', () => btn.classList.toggle('active'));
    }
  }

  static get observedAttributes() { return ['lang']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) {
      this.render();
      this.initEvents();
    }
  }
}

customElements.define('app-floating', AppFloating);
