import { T } from '../config/i18n.js';
import { C } from '../config/colors.js';
import { swatchColors } from '../config/media.js';

class AppDresscode extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <section id="dress" style="background: ${C.white}">
        <div class="inner">
          <span class="eyebrow reveal">${tr.dress_label}</span>
          <h2 class="h2 reveal rd1">${tr.dress_title}</h2>
          <div class="rule reveal rd2"></div>
          <p class="reveal rd2" style="font-family:var(--sans);font-size:15px;font-weight:300;line-height:1.85;color:#5a7565;max-width:500px">${tr.dress_body}</p>
          <div class="swatches reveal rd2">
            ${swatchColors.map((col, i) => `
              <div class="swatch">
                <div class="swatch-c" style="background:${col}"></div>
                <span class="swatch-l">${tr.dress_swatches[i]}</span>
              </div>
            `).join('')}
          </div>
          <div class="dress-note reveal rd3">${tr.dress_note}</div>
        </div>
      </section>
    `;
  }

  static get observedAttributes() { return ['lang']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) this.render();
  }
}

customElements.define('app-dresscode', AppDresscode);
