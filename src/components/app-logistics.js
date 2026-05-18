import { T } from '../config/i18n.js';
import { C } from '../config/colors.js';
import { MAPS_URL, GCAL_URL, ICAL_DATA } from '../config/links.js';

class AppLogistics extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <section id="logistics" style="background: ${C.ow}">
        <div class="inner">
          <span class="eyebrow reveal">${tr.log_label}</span>
          <h2 class="h2 reveal rd1">${tr.log_title}</h2>
          <div class="rule reveal rd2"></div>
          <div class="log-cols">
            <div class="log-card reveal">
              <div class="log-card-ey">${lang === 'es' ? 'Lugar' : 'Venue'}</div>
              <div class="log-card-title">${tr.log_venue}</div>
              <div class="log-card-body">
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem">${tr.log_address}</div>
                <div style="display:flex;align-items:center;gap:0.5rem">${tr.log_time}</div>
              </div>
              <div class="log-actions">
                <a class="log-btn primary" href="${MAPS_URL}" target="_blank" rel="noreferrer">${tr.log_maps}</a>
                <div style="position:relative">
                  <button class="log-btn outline" id="cal-toggle" style="width:100%">${tr.log_cal}</button>
                  <div id="cal-popup" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:10;margin-top:4px">
                    <a class="cal-opt" href="${GCAL_URL}" target="_blank" rel="noreferrer">${tr.log_gcal}</a>
                    <button class="cal-opt" id="ical-download" style="border-top:none">${tr.log_ical}</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="log-card reveal rd1">
              <div class="log-card-ey">Adults Only</div>
              <div class="log-card-title">${tr.log_adults}</div>
              <div class="log-card-body" style="margin-top:0.5rem">${tr.log_adults_msg}</div>
            </div>

            <div class="log-card reveal rd2" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:0.75rem">
              <div style="font-family:var(--serif);font-size:60px;font-weight:300;color:${C.forest};opacity:0.2">M&J</div>
              <div style="font-family:var(--serif);font-size:18px;font-weight:300;color:${C.forest};opacity:0.65">Huerto de los Olivos</div>
              <div style="font-family:var(--sans);font-size:10px;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:${C.forest};opacity:0.38">by El Portal</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  initEvents() {
    const toggle = this.querySelector('#cal-toggle');
    const popup = this.querySelector('#cal-popup');
    const icalBtn = this.querySelector('#ical-download');

    // toggle calendar popup on button click; close when clicking anywhere outside
    if (toggle && popup) {
      this._toggleCal = (e) => {
        e.stopPropagation();
        popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
      };
      this._closeCal = () => { popup.style.display = 'none'; };
      toggle.addEventListener('click', this._toggleCal);
      document.addEventListener('click', this._closeCal);
    }

    if (icalBtn) {
      icalBtn.addEventListener('click', () => {
        const blob = new Blob([ICAL_DATA], { type: 'text/calendar' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'boda-moni-jose.ics';
        a.click();
        popup.style.display = 'none';
      });
    }
  }

  disconnectedCallback() {
    if (this._closeCal) document.removeEventListener('click', this._closeCal);
  }

  static get observedAttributes() { return ['lang']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) {
      this.render();
      this.initEvents();
    }
  }
}

customElements.define('app-logistics', AppLogistics);
