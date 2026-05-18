import { T } from '../config/i18n.js';
import { C } from '../config/colors.js';

class AppGifts extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <section id="gifts" style="background: ${C.ow}">
        <div class="inner">
          <span class="eyebrow reveal">${tr.gifts_label}</span>
          <div class="rule reveal rd1"></div>
          <p class="gifts-intro reveal rd1">${tr.gifts_title}</p>
          <p class="gifts-sub reveal rd2">${tr.gifts_intro}</p>

          <span class="gifts-sec-label reveal rd2">${tr.gifts_table}</span>
          <div class="gifts-table-grid reveal rd2">
            ${[tr.gifts_s1, tr.gifts_s2].map((store, i) => `
              <div class="gift-card">
                <div class="gift-card-name">${store}</div>
                <button class="btn-o">${tr.gifts_view}</button>
              </div>
            `).join('')}
          </div>

          <div class="gifts-other reveal rd3">
            <div class="gift-other-card">
              <div class="gift-other-title">${tr.gifts_env_title}</div>
              <div class="gift-other-body">${tr.gifts_env_body}</div>
            </div>
            <div class="gift-other-card">
              <div class="gift-other-title">${tr.gifts_qr_title}</div>
              <div class="gift-other-body">${tr.gifts_qr_body}</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  static get observedAttributes() { return ['lang']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) this.render();
  }
}

customElements.define('app-gifts', AppGifts);
