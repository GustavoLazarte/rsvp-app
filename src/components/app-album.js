import { T } from '../config/i18n.js';
import { C } from '../config/colors.js';
import { photoGrads } from '../config/media.js';

class AppAlbum extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    const caps = tr.album_caps;
    this.innerHTML = `
      <section style="background: ${C.ow}">
        <div class="inner">
          <span class="eyebrow reveal">${tr.album_label}</span>
          <h2 class="h2 reveal rd1">${tr.album_title}</h2>
          <div class="rule reveal rd2"></div>
          <p class="reveal rd2" style="font-family:var(--sans);font-size:11px;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:#8a9e92;margin-bottom:0.25rem">${tr.album_hint}</p>
          <div class="album-grid" id="album-grid">
            ${photoGrads.map((g, i) => `
              <div class="polaroid reveal" style="transition-delay:${i * 0.07}s" data-index="${i}">
                <div class="pol-inner" style="background:${g}"></div>
                <div class="pol-cap">${caps[i]}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="lightbox" id="lightbox">
          <div class="lb-close" id="lb-close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </div>
          <div class="lb-nav prev" id="lb-prev">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg>
          </div>
          <div class="lb-frame" id="lb-frame">
            <div class="lb-img" id="lb-img" style="display:flex;align-items:center;justify-content:center"></div>
            <div class="pol-cap" id="lb-cap" style="margin-top:0.75rem;text-align:center"></div>
          </div>
          <div class="lb-nav next" id="lb-next">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </section>
    `;
  }

  initEvents() {
    const grid = this.querySelector('#album-grid');
    const lightbox = this.querySelector('#lightbox');
    if (!grid || !lightbox) return;

    const caps = T.es.album_caps;
    let current = null;

    // Abre lightbox en índice i, bloquea scroll del body
    const open = (i) => {
      current = i;
      const img = this.querySelector('#lb-img');
      const cap = this.querySelector('#lb-cap');
      img.style.background = photoGrads[i];
      cap.textContent = caps[i];
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      current = null;
    };

    // Navegación circular: (current + dir + length) % length evita índices negativos
    const nav = (dir) => {
      if (current === null) return;
      open((current + dir + photoGrads.length) % photoGrads.length);
    };

    grid.querySelectorAll('.polaroid').forEach((el) => {
      el.addEventListener('click', () => open(parseInt(el.dataset.index)));
    });

    this.querySelector('#lb-close').addEventListener('click', close);
    lightbox.addEventListener('click', close);
    this.querySelector('#lb-frame').addEventListener('click', (e) => e.stopPropagation());
    this.querySelector('#lb-prev').addEventListener('click', (e) => { e.stopPropagation(); nav(-1); });
    this.querySelector('#lb-next').addEventListener('click', (e) => { e.stopPropagation(); nav(1); });

    // Keyboard: Escape cierra, flechas navegan
    this._keyHandler = (e) => {
      if (current === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') nav(1);
      if (e.key === 'ArrowLeft') nav(-1);
    };
    document.addEventListener('keydown', this._keyHandler);
  }

  disconnectedCallback() {
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
    }
    document.body.style.overflow = '';
  }

  static get observedAttributes() { return ['lang']; }

  // Al cambiar idioma preserva el estado abierto/cerrado del lightbox
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) {
      const open = this.querySelector('#lightbox')?.classList.contains('open');
      document.body.style.overflow = '';
      this.render();
      this.initEvents();
      if (open) {
        this.querySelector('#lightbox')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }
  }
}

customElements.define('app-album', AppAlbum);
