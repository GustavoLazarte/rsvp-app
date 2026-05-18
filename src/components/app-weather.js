import { T } from '../config/i18n.js';
import { WMO_DESC } from '../config/weather.js';

// Mapea códigos WMO a íconos SVG inline: sol (0), nube (1-3), lluvia (4-67), tormenta (resto)
function wxIcon(code, size = 24) {
  if (code === 0) return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
  if (code <= 3) return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`;
  if (code <= 67) return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 14v6m-4-4l4 4 4-4"/><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`;
}

class AppWeather extends HTMLElement {
  connectedCallback() {
    this.render();
    this.fetchWeather();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <section class="wx-section" id="weather">
        <div class="inner">
          <span class="eyebrow reveal">${tr.wx_label}</span>
          <h2 class="h2 reveal rd1">${tr.wx_title}</h2>
          <div class="rule reveal rd2"></div>
          <div class="wx-content">
            <div class="wx-loading-block">
              <div class="wx-spinner"></div>
              <span style="font-family:var(--sans);font-size:13px;color:rgba(184,212,190,0.5)">${tr.wx_loading}</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Fetch a Open-Meteo (sin API key), renderiza datos actuales + 3 días de pronóstico
  async fetchWeather() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    const DAY_NAMES = tr.wx_days;
    const content = this.querySelector('.wx-content');
    if (!content) return;

    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast' +
        '?latitude=-17.3895&longitude=-66.1568' +
        '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weathercode,is_day' +
        '&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum' +
        '&timezone=America%2FLa_Paz&forecast_days=4'
      );
      const data = await res.json();
      const desc = WMO_DESC[lang][data.current.weathercode] || 'Variable';

      content.innerHTML = `
        <div class="wx-widget reveal rd2">
          <div class="wx-main-card">
            <div class="wx-city-row">
              <div class="wx-live-dot"></div>
              <span class="wx-live-label">${lang === 'es' ? 'En vivo' : 'Live'}</span>
              <span style="color:rgba(184,212,190,0.2);margin:0 0.375rem">·</span>
              <span class="wx-city">Cochabamba, Bolivia</span>
            </div>
            <div class="wx-big-row">
              <div class="wx-big-temp">${Math.round(data.current.temperature_2m)}</div>
              <div class="wx-big-unit">°C</div>
              <div style="margin-bottom:1rem;color:#B8D4BE">${wxIcon(data.current.weathercode, 36)}</div>
            </div>
            <div class="wx-desc">${desc}</div>
            <div class="wx-pills">
              <span class="wx-pill">${lang === 'es' ? 'Sensación' : 'Feels like'} ${Math.round(data.current.apparent_temperature)}°</span>
              <span class="wx-pill">${data.current.relative_humidity_2m}%</span>
              <span class="wx-pill">${Math.round(data.current.wind_speed_10m)} km/h</span>
              <span class="wx-pill">${data.current.precipitation} mm</span>
            </div>
          </div>

          <div class="wx-right">
            <div class="wx-stat">
              <div class="wx-stat-icon">${wxIcon(data.current.weathercode, 18)}</div>
              <div>
                <div class="wx-stat-val">${Math.round(data.daily.temperature_2m_max[0])}° / ${Math.round(data.daily.temperature_2m_min[0])}°</div>
                <div class="wx-stat-lbl">${lang === 'es' ? 'Máx / Mín hoy' : 'Today high / low'}</div>
              </div>
            </div>
            <div class="wx-stat">
              <div class="wx-stat-icon">${wxIcon(61, 18)}</div>
              <div>
                <div class="wx-stat-val">${data.current.relative_humidity_2m}%</div>
                <div class="wx-stat-lbl">${tr.wx_hum}</div>
              </div>
            </div>
            <div class="wx-stat">
              <div class="wx-stat-icon">${wxIcon(3, 18)}</div>
              <div>
                <div class="wx-stat-val">${Math.round(data.current.wind_speed_10m)} km/h</div>
                <div class="wx-stat-lbl">${tr.wx_wind}</div>
              </div>
            </div>
            <div class="wx-stat">
              <div class="wx-stat-icon">${wxIcon(61, 18)}</div>
              <div>
                <div class="wx-stat-val">${data.daily.precipitation_sum[0]} mm</div>
                <div class="wx-stat-lbl">${lang === 'es' ? 'Precipitación hoy' : 'Precipitation today'}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="wx-section-lbl reveal rd3">${tr.wx_forecast}</div>
        <div class="wx-forecast-row reveal rd3">
          ${data.daily.time.slice(1, 4).map((d, i) => {
            const day = new Date(d + 'T12:00:00');
            return `
              <div class="wx-fc-card">
                <div class="wx-fc-day">${DAY_NAMES[day.getDay()]}</div>
                <div class="wx-fc-icon">${wxIcon(data.daily.weathercode[i + 1], 22)}</div>
                <div class="wx-fc-hi">${Math.round(data.daily.temperature_2m_max[i + 1])}°</div>
                <div class="wx-fc-lo">${Math.round(data.daily.temperature_2m_min[i + 1])}°</div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } catch {
      content.innerHTML = `<p style="font-family:var(--sans);font-size:13px;color:rgba(184,212,190,0.5);margin-top:2rem">${tr.wx_error}</p>`;
    }
  }

  static get observedAttributes() { return ['lang']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) {
      this.render();
      this.fetchWeather();
    }
  }
}

customElements.define('app-weather', AppWeather);
