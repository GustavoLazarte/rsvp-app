import { T } from '../config/i18n.js';
import { C } from '../config/colors.js';
import { WA_NUMBER } from '../config/links.js';

class AppUpload extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <section id="upload" style="background: ${C.white}">
        <div class="inner">
          <span class="eyebrow reveal">${tr.up_label}</span>
          <h2 class="h2 reveal rd1">${tr.up_title}</h2>
          <div class="rule reveal rd2"></div>
          <p class="reveal rd2" style="font-family:var(--sans);font-size:15px;font-weight:300;line-height:1.85;color:#5a7565;max-width:480px;margin-bottom:2rem">${tr.up_body}</p>

          <div class="drop-zone reveal rd2" id="drop-zone">
            <div class="dz-text">${tr.up_drag}</div>
            <div class="dz-or">${tr.up_or}</div>
            <button class="btn-o" id="upload-btn">${tr.up_btn}</button>
            <input type="file" accept="image/*" multiple id="file-input" style="display:none" />
          </div>

          <div id="upload-preview" class="up-grid" style="margin-top:1.5rem;display:none"></div>

          <div id="upload-send" style="margin-top:1.5rem;display:none">
            <button class="btn-f" id="send-photos">${tr.up_send}</button>
          </div>

          <p style="font-family:var(--sans);font-size:11px;color:#9ab0a0;margin-top:1rem;letter-spacing:0.05em">${tr.up_hint}</p>
        </div>
      </section>
    `;
  }

  initEvents() {
    const dropZone = this.querySelector('#drop-zone');
    const fileInput = this.querySelector('#file-input');
    const preview = this.querySelector('#upload-preview');
    const sendWrap = this.querySelector('#upload-send');
    const sendBtn = this.querySelector('#send-photos');
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    // Acumula archivos con su objectURL para preview; límite 8 fotos
    const files = [];

    if (!dropZone) return;

    // Toma hasta 8 archivos, crea blob URLs para preview inmediato sin subir al server
    const addFiles = (newFiles) => {
      const arr = Array.from(newFiles).slice(0, 8 - files.length);
      arr.forEach((f) => files.push({ f, url: URL.createObjectURL(f) }));
      renderPreviews();
    };

    const renderPreviews = () => {
      if (files.length === 0) {
        preview.style.display = 'none';
        sendWrap.style.display = 'none';
        return;
      }
      preview.style.display = 'grid';
      preview.innerHTML = files.map((f) => `
        <div class="up-thumb"><img src="${f.url}" alt="" /></div>
      `).join('');
      sendWrap.style.display = 'block';
    };

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('over'));
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('over'); addFiles(e.dataTransfer.files); });
    dropZone.addEventListener('click', () => fileInput.click());
    this.querySelector('#upload-btn').addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });
    fileInput.addEventListener('change', () => { addFiles(fileInput.files); fileInput.value = ''; });

    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        const msg = lang === 'es' ? 'Hola, les enviamos fotos de su boda' : 'Hi, sending you wedding photos!';
        window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`);
      });
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

customElements.define('app-upload', AppUpload);
