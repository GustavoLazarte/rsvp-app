import { T, SHEETS_URL, C } from './constants.js';

export function init(lang = 'es', rootId = 'root') {
  const tr = T[lang] || T.es;
  const root = document.getElementById(rootId);
  if (!root) return;

  // Full page template with all sections
  root.innerHTML = `
    <div class="ticker">
      <div class="ticker-track">
        ${Array(8).fill(tr.ticker).map((item, i) => `
          <span class="ticker-item">${item} <span class="ticker-dot">✦</span></span>
        `).join('')}
      </div>
    </div>

    <div class="hero" id="hero" style="padding-top:34px">
      <div class="hero-bg"></div>
      <div class="hero-vline hvl1"></div>
      <div class="hero-vline hvl2"></div>
      <div class="hero-ring hr1"></div>
      <div class="hero-ring hr2"></div>

      <div class="lang-toggle">
        <button class="lang-btn ${lang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
        <button class="lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
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
      <div class="hero-chevron"></div>
    </div>

    <section id="story" style="background: ${C.white}">
      <div class="inner">
        <span class="eyebrow reveal">${tr.story_label}</span>
        <h2 class="h2 reveal rd1">${tr.story_title.replace(/\n/g, '<br/>')}</h2>
        <div class="rule reveal rd2"></div>
        <p class="story-body reveal rd2">${tr.story_body}</p>
        <blockquote class="story-quote reveal rd3">${tr.story_quote}</blockquote>
      </div>
    </section>

    <section style="background: ${C.ow}">
      <div class="inner">
        <span class="eyebrow reveal">${tr.album_label}</span>
        <h2 class="h2 reveal rd1">${tr.album_title}</h2>
        <div class="rule reveal rd2"></div>
        <p class="reveal rd2" style="font-family:var(--sans);font-size:11px;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:#8a9e92;margin-bottom:0.25rem">${tr.album_hint}</p>
        <div class="album-grid">
          ${tr.album_caps.map((cap, i) => `
            <div class="polaroid reveal" style="transition-delay:${i * 0.07}s">
              <div class="pol-inner"></div>
              <div class="pol-cap">${cap}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="timeline" style="background: ${C.white}">
      <div class="inner">
        <span class="eyebrow reveal">${tr.tl_label}</span>
        <h2 class="h2 reveal rd1">${tr.tl_title}</h2>
        <div class="rule reveal rd2"></div>
        <div class="tl-mobile">
          <div class="tl-m-wrap">
            <div class="tl-m-axis"></div>
            ${tr.tl_events.map((ev, i) => `
              <div class="tl-m-item ${ev.gold ? 'gold' : ''} reveal" style="transition-delay:${i * 0.08}s">
                <div class="tl-m-node ${ev.gold ? 'gold' : ''}"><div class="tl-m-dot"></div></div>
                <div class="tl-m-time">${ev.time}</div>
                <div class="tl-m-name">${ev.name}</div>
                <div class="tl-m-desc">${ev.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

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
          </div>
          <div class="log-card reveal rd1">
            <div class="log-card-ey">Adults Only</div>
            <div class="log-card-title">${tr.log_adults}</div>
            <div class="log-card-body" style="margin-top:0.5rem">${tr.log_adults_msg}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="dress" style="background: ${C.white}">
      <div class="inner">
        <span class="eyebrow reveal">${tr.dress_label}</span>
        <h2 class="h2 reveal rd1">${tr.dress_title}</h2>
        <div class="rule reveal rd2"></div>
        <p class="reveal rd2" style="font-family:var(--sans);font-size:15px;font-weight:300;line-height:1.85;color:#5a7565;max-width:500px">${tr.dress_body}</p>
        <div class="swatches reveal rd2">
          ${tr.dress_swatches.map((swatch, i) => `
            <div class="swatch">
              <div class="swatch-c" style="background:#ccc"></div>
              <span class="swatch-l">${swatch}</span>
            </div>
          `).join('')}
        </div>
        <div class="dress-note reveal rd3">${tr.dress_note}</div>
      </div>
    </section>

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
              <div style="margin-bottom:0.75rem"></div>
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

    <section id="upload" style="background: ${C.white}">
      <div class="inner">
        <span class="eyebrow reveal">${tr.up_label}</span>
        <h2 class="h2 reveal rd1">${tr.up_title}</h2>
        <div class="rule reveal rd2"></div>
        <p class="reveal rd2" style="font-family:var(--sans);font-size:15px;font-weight:300;line-height:1.85;color:#5a7565;max-width:480px;margin-bottom:2rem">${tr.up_body}</p>
        
        <div class="drop-zone reveal rd2">
          <div style="text-align:center">
            <div class="dz-text">${tr.up_drag}</div>
            <div class="dz-or">${tr.up_or}</div>
            <button class="btn-o" style="pointer-events:none">${tr.up_btn}</button>
          </div>
        </div>
        
        <p style="font-family:var(--sans);font-size:11px;color:#9ab0a0;margin-top:1rem;letter-spacing:0.05em">${tr.up_hint}</p>
      </div>
    </section>

    <section class="rsvp-sec" id="rsvp">
      <div class="inner">
        <span class="eyebrow reveal">${tr.rsvp_label}</span>
        <h2 class="h2 reveal rd1">${tr.rsvp_title}</h2>
        <div class="rule reveal rd2"></div>
        <p class="rsvp-deadline reveal">${tr.rsvp_deadline}</p>

        <form id="rsvp-form" class="rsvp-form reveal rd2" style="max-width:520px">
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

          <div style="margin-top:1rem">
            <button class="btn-f" type="submit">${tr.rsvp_submit}</button>
          </div>
        </form>

        <div id="rsvp-note" style="margin-top:1rem;font-family:var(--sans);color:#5a7565;font-size:13px"></div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-mono">M&J</div>
      <p class="footer-close">${tr.footer_close}</p>
      <div class="footer-sep"></div>
      <div class="footer-names">Moni & Jose</div>
      <div class="footer-date">${tr.footer_date}</div>
      <div class="footer-loc">${tr.footer_loc}</div>
    </footer>

    <a class="fab-rsvp" href="#rsvp">${tr.nav_rsvp}</a>
    
    <div class="grain"></div>
  `;

  // Event handlers
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpNote = document.getElementById('rsvp-note');
  const attendBtns = document.querySelectorAll('[data-attend]');

  // Attendance buttons
  attendBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      attendBtns.forEach(b => b.classList.remove('sy', 'sn'));
      const val = btn.dataset.attend;
      btn.classList.add(val === 'yes' ? 'sy' : 'sn');
      rsvpForm.elements['attending'].value = val;
    });
  });

  // Form submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = rsvpForm.elements['name']?.value || '';
      const email = rsvpForm.elements['email']?.value || '';
      const attending = rsvpForm.elements['attending']?.value || '';

      if (!name) {
        rsvpNote.textContent = lang === 'es' ? 'Por favor ingresa tu nombre.' : 'Please enter your name.';
        return;
      }
      if (!attending) {
        rsvpNote.textContent = lang === 'es' ? 'Por favor selecciona si asistirás.' : 'Please select your attendance.';
        return;
      }

      rsvpNote.textContent = lang === 'es' ? 'Enviando...' : 'Sending...';
      
      try {
        const params = new URLSearchParams({
          name, email,
          attending: attending === 'yes' ? 'yes' : 'no',
          has_plus: 'no',
          food: '',
          notes: '',
          lang,
          timestamp: new Date().toISOString(),
        });
        // Fire-and-forget to Google Sheets
        new Image().src = `${SHEETS_URL}?${params}`;
        rsvpNote.textContent = lang === 'es' ? '¡Gracias! Confirmación enviada.' : 'Thank you! Confirmation sent.';
      } catch (err) {
        rsvpNote.textContent = lang === 'es' ? 'Ocurrió un error. Intenta nuevamente.' : 'An error occurred. Please try again.';
      }
    });
  }

  // Reveal observer for scroll animations
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Language toggle
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const newLang = btn.dataset.lang;
      if (newLang !== lang) {
        init(newLang, rootId);
      }
    });
  });
}

export default { init };
