import { T } from '../config/i18n.js';
import { C } from '../config/colors.js';

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <footer class="footer">
        <div class="footer-mono">M&J</div>
        <p class="footer-close">${tr.footer_close}</p>
        <div class="footer-sep"></div>
        <div class="footer-names">Moni & Jose</div>
        <div class="footer-date">${tr.footer_date}</div>
        <div class="footer-loc">${tr.footer_loc}</div>
      </footer>
    `;
  }

  static get observedAttributes() { return ['lang']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) this.render();
  }
}

customElements.define('app-footer', AppFooter);
