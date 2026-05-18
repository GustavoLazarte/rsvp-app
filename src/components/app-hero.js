import { T } from '../config/i18n.js';

class AppHero extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <div class="hero" id="hero" style="padding-top:34px">
        <div class="hero-bg"></div>
        <div class="hero-vline hvl1"></div>
        <div class="hero-vline hvl2"></div>
        <div class="hero-ring hr1"></div>
        <div class="hero-ring hr2"></div>

        <div class="lang-toggle">
          <button class="lang-btn${lang === 'es' ? ' active' : ''}" data-lang="es">ES</button>
          <button class="lang-btn${lang === 'en' ? ' active' : ''}" data-lang="en">EN</button>
        </div>

        <div class="hero-content">
          <div class="hero-eyebrow">${tr.hero_eyebrow}</div>
          <div class="hero-names">Moni<span class="hero-amp">&</span>Jose</div>
          <div class="hero-sub">${tr.hero_sub.replace(/\n/g, '<br/>')}</div>
          <div class="hero-meta">
            <span class="hero-meta-item">${tr.hero_date}</span>
            <span class="hero-meta-sep"></span>
            <span class="hero-meta-item">${tr.hero_location}</span>
          </div>
          <a class="hero-cta" href="#story">${tr.hero_cta}</a>
        </div>
        <div class="hero-chevron">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
    `;
  }

  initEvents() {
    this.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const newLang = btn.dataset.lang;
        window.dispatchEvent(new CustomEvent('lang-change', { detail: newLang }));
      });
    });
  }

  static get observedAttributes() { return ['lang']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) {
      this.render();
      this.initEvents();
    }
  }
}

customElements.define('app-hero', AppHero);
