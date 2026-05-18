import { T } from '../config/i18n.js';
import { C } from '../config/colors.js';

class AppTimeline extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    const events = tr.tl_events;

    const desktopEvents = events.map((ev, i) => {
      const isLeft = i % 2 === 0;
      if (isLeft) {
        return `
          <div style="display:contents">
            <div class="tl-d-cell left${ev.gold ? ' gold' : ''} reveal" style="transition-delay:${i * 0.1}s">
              <div class="tl-d-time">${ev.time}</div>
              <div class="tl-d-name">${ev.name}</div>
              <div class="tl-d-desc">${ev.desc}</div>
            </div>
            <div class="tl-d-center reveal" style="transition-delay:${i * 0.1}s">
              <div class="tl-d-node${ev.gold ? ' gold' : ''}"><div class="tl-d-dot"></div></div>
            </div>
            <div></div>
          </div>
        `;
      }
      return `
        <div style="display:contents">
          <div></div>
          <div class="tl-d-center reveal" style="transition-delay:${i * 0.1}s">
            <div class="tl-d-node${ev.gold ? ' gold' : ''}"><div class="tl-d-dot"></div></div>
          </div>
          <div class="tl-d-cell${ev.gold ? ' gold' : ''} reveal" style="transition-delay:${i * 0.1}s">
            <div class="tl-d-time">${ev.time}</div>
            <div class="tl-d-name">${ev.name}</div>
            <div class="tl-d-desc">${ev.desc}</div>
          </div>
        </div>
      `;
    }).join('');

    const mobileEvents = events.map((ev, i) => `
      <div class="tl-m-item${ev.gold ? ' gold' : ''} reveal" style="transition-delay:${i * 0.08}s">
        <div class="tl-m-node${ev.gold ? ' gold' : ''}"><div class="tl-m-dot"></div></div>
        <div class="tl-m-time">${ev.time}</div>
        <div class="tl-m-name">${ev.name}</div>
        <div class="tl-m-desc">${ev.desc}</div>
      </div>
    `).join('');

    this.innerHTML = `
      <section id="timeline" style="background: ${C.white}">
        <div class="inner">
          <span class="eyebrow reveal">${tr.tl_label}</span>
          <h2 class="h2 reveal rd1">${tr.tl_title}</h2>
          <div class="rule reveal rd2"></div>

          <div class="tl-desktop">
            <div class="tl-d-wrap">
              <div class="tl-d-axis"></div>
              ${desktopEvents}
            </div>
          </div>

          <div class="tl-mobile">
            <div class="tl-m-wrap">
              <div class="tl-m-axis"></div>
              ${mobileEvents}
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

customElements.define('app-timeline', AppTimeline);
