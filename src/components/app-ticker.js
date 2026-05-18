import { T } from '../config/i18n.js';

class AppTicker extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    const items = Array(8).fill(tr.ticker);
    this.innerHTML = `
      <div class="ticker">
        <div class="ticker-track">
          ${items.map((item, i) => `
            <span class="ticker-item">${item} <span class="ticker-dot">✦</span></span>
          `).join('')}
        </div>
      </div>
    `;
  }

  static get observedAttributes() { return ['lang']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) this.render();
  }
}

customElements.define('app-ticker', AppTicker);
