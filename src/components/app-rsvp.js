import { T } from '../config/i18n.js';
import { C } from '../config/colors.js';
import { SHEETS_URL } from '../config/links.js';
import { startCountdown, getCountdown } from '../utils/countdown.js';
import { launchConfetti } from '../utils/confetti.js';

class AppRsvp extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <section class="rsvp-sec" id="rsvp">
        <div class="inner">
          <span class="eyebrow reveal">${tr.rsvp_label}</span>
          <h2 class="h2 reveal rd1">${tr.rsvp_title}</h2>
          <div class="rule reveal rd2"></div>

          <div class="rsvp-form-container">
            <div class="rsvp-deadline reveal">${tr.rsvp_deadline}</div>

            <div class="cd-grid reveal rd1" id="countdown">
              ${['days','hours','mins','secs'].map((k) => `
                <div class="cd-item">
                  <div class="cd-val" data-cd="${k}">00</div>
                  <div class="cd-lbl">${tr[`rsvp_${k}`]}</div>
                </div>
              `).join('')}
            </div>

            <form id="rsvp-form" class="rsvp-form reveal rd2">
              <div class="adults-badge" style="margin-bottom:1.5rem">${tr.rsvp_adults_note}</div>

              <div class="fg">
                <label class="fl">${tr.rsvp_name}</label>
                <input class="fi" name="name" type="text" placeholder="${tr.rsvp_name}" required />
              </div>

              <div class="fg">
                <label class="fl">${tr.rsvp_email}</label>
                <input class="fi" name="email" type="email" placeholder="${tr.rsvp_email}" />
              </div>

              <div class="fg">
                <label class="fl">${tr.rsvp_attending}</label>
                <div class="att-btns">
                  <button class="att-btn" type="button" data-attend="yes">${tr.rsvp_yes}</button>
                  <button class="att-btn" type="button" data-attend="no">${tr.rsvp_no}</button>
                </div>
                <input type="hidden" name="attending" value="" />
              </div>

              <div id="rsvp-plus-section" style="display:none">
                <div class="fg">
                  <div class="check-row" id="plus-toggle">
                    <div class="check-box" id="plus-check">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" style="display:none"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span class="check-lbl">${tr.rsvp_has_plus}</span>
                  </div>
                  <div id="plus-note" class="plus-note" style="display:none">${tr.rsvp_plus_note}</div>
                </div>

                <div class="fg">
                  <label class="fl">${tr.rsvp_food}</label>
                  <div class="chips" id="food-chips">
                    ${tr.rsvp_food_opts.map((opt) => `
                      <button type="button" class="chip" data-opt="${opt}">${opt}</button>
                    `).join('')}
                  </div>
                </div>

                <div class="fg">
                  <label class="fl">${tr.rsvp_notes}</label>
                  <textarea class="fi" name="notes" rows="3" placeholder="${tr.rsvp_notes}" style="resize:vertical;font-family:var(--sans)"></textarea>
                </div>
              </div>

              <button class="btn-f" type="submit" id="rsvp-submit">${tr.rsvp_submit}</button>
            </form>

            <div id="rsvp-ok" class="rsvp-ok" style="display:none">
              <div style="margin-bottom:1.5rem;color:${C.forest}">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <div class="rsvp-ok-title" id="ok-title"></div>
              <p class="rsvp-ok-body" id="ok-body" style="margin-top:1rem"></p>
              <div style="font-family:var(--serif);font-size:22px;font-weight:300;color:${C.forest};margin-top:2.5rem">— Moni & Jose</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  initEvents() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    const form = this.querySelector('#rsvp-form');
    if (!form) return;

    let attending = null;
    let hasPlus = false;
    const food = [];

    const cdEls = {
      days: this.querySelector('[data-cd="days"]'),
      hours: this.querySelector('[data-cd="hours"]'),
      mins: this.querySelector('[data-cd="mins"]'),
      secs: this.querySelector('[data-cd="secs"]'),
    };

    this._cleanupCountdown = startCountdown('2026-08-21T23:59:59', (d) => {
      if (cdEls.days) cdEls.days.textContent = String(d.days).padStart(2, '0');
      if (cdEls.hours) cdEls.hours.textContent = String(d.hours).padStart(2, '0');
      if (cdEls.mins) cdEls.mins.textContent = String(d.mins).padStart(2, '0');
      if (cdEls.secs) cdEls.secs.textContent = String(d.secs).padStart(2, '0');
    });

    const attendBtns = form.querySelectorAll('[data-attend]');
    const plusSection = this.querySelector('#rsvp-plus-section');
    const plusToggle = this.querySelector('#plus-toggle');
    const plusCheck = this.querySelector('#plus-check');
    const plusNote = this.querySelector('#plus-note');

    attendBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        attendBtns.forEach((b) => b.classList.remove('sy', 'sn'));
        const val = btn.dataset.attend;
        btn.classList.add(val === 'yes' ? 'sy' : 'sn');
        form.elements['attending'].value = val;
        attending = val === 'yes';
        if (plusSection) plusSection.style.display = attending ? 'block' : 'none';
      });
    });

    if (plusToggle) {
      plusToggle.addEventListener('click', () => {
        hasPlus = !hasPlus;
        const svg = plusCheck.querySelector('svg');
        if (svg) svg.style.display = hasPlus ? 'block' : 'none';
        plusCheck.classList.toggle('on', hasPlus);
        if (plusNote) plusNote.style.display = hasPlus ? 'block' : 'none';
      });
    }

    const chipContainer = this.querySelector('#food-chips');
    if (chipContainer) {
      chipContainer.querySelectorAll('.chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          const opt = chip.dataset.opt;
          const idx = food.indexOf(opt);
          if (idx >= 0) { food.splice(idx, 1); } else { food.push(opt); }
          chip.classList.toggle('on', food.includes(opt));
        });
      });
    }

    const submitBtn = this.querySelector('#rsvp-submit');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.elements['name']?.value || '';
      const email = form.elements['email']?.value || '';

      if (!name || !attending) return;

      submitBtn.disabled = true;
      submitBtn.textContent = tr.rsvp_submitting;

      try {
        // Image beacon: envía GET a Google Apps Script sin esperar respuesta,
        // setTimeout de 900ms da tiempo a que el request salga antes de mostrar el OK
        const params = new URLSearchParams({
          name, email,
          attending: attending ? 'yes' : 'no',
          has_plus: hasPlus ? 'yes' : 'no',
          food: food.join(', '),
          notes: form.elements['notes']?.value || '',
          lang,
          timestamp: new Date().toISOString(),
        });
        new Image().src = `${SHEETS_URL}?${params}`;
        await new Promise((r) => setTimeout(r, 900));

        const ok = this.querySelector('#rsvp-ok');
        const container = this.querySelector('.rsvp-form-container');
        this.querySelector('#ok-title').textContent = attending ? tr.rsvp_ok_yes_title : tr.rsvp_ok_no_title;
        this.querySelector('#ok-body').textContent = attending ? tr.rsvp_ok_yes : tr.rsvp_ok_no;
        form.style.display = 'none';
        this.querySelector('.rsvp-deadline').style.display = 'none';
        this.querySelector('#countdown').style.display = 'none';
        ok.style.display = 'block';
        if (attending) launchConfetti();
      } catch {
        submitBtn.disabled = false;
        submitBtn.textContent = tr.rsvp_submit;
      }
    });
  }

  disconnectedCallback() {
    if (this._cleanupCountdown) this._cleanupCountdown();
  }

  static get observedAttributes() { return ['lang']; }

  // Al cambiar idioma: detiene countdown viejo, re-renderiza y reinicia eventos
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) {
      if (this._cleanupCountdown) this._cleanupCountdown();
      this.render();
      this.initEvents();
    }
  }
}

customElements.define('app-rsvp', AppRsvp);
