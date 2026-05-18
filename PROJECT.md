# RSVP App — Moni & Jose Wedding Website

## Descripción
Sitio web de boda monolítico (SPA) para **Moni & Jose**, casándose el **13 de septiembre de 2026** en **Cochabamba, Bolivia**. Incluye invitación digital, galería, cronograma, clima en vivo, dress code, mesa de regalos, subida de fotos y formulario RSVP.

## Stack
| Categoría | Tecnología |
|---|---|
| Build | Vite 6 |
| Lenguaje | JavaScript (ES Modules, vanilla, sin TypeScript) |
| UI | Web Components (Custom Elements v1) — sin framework |
| Estilos | SCSS con partials, placeholders, custom properties, Google Fonts |
| Routing | Hash‑based (`#/inv/:id`, `#/login`, `#/dashboard`) |
| Auth | `localStorage` con guardia de ruta |
| Backend | Ninguno (RSVP → Google Apps Script → Google Sheets) |
| APIs externas | Open-Meteo (clima), Google Maps, WhatsApp, Google Calendar |
| Estado | Variable global `currentLang` + eventos DOM |
| Lazy loading | IntersectionObserver con `rootMargin: '300px 0px'` |

## Estructura
```
src/
├── main.js                 # Bootstrap, router, lazy observer, idioma
├── lazy-loader.js          # Carga diferida de componentes
├── styles/
│   ├── styles.scss         # Entry point (importa todos los partials)
│   ├── _variables.scss
│   ├── _placeholders.scss  # %btn-base, %card-base, %uppercase-label, %eyebrow
│   ├── _reset.scss
│   ├── _typography.scss
│   ├── _layout.scss
│   ├── _animations.scss
│   ├── _ticker.scss
│   ├── _hero.scss
│   ├── _story.scss
│   ├── _album.scss
│   ├── _timeline.scss
│   ├── _logistics.scss
│   ├── _weather.scss
│   ├── _dresscode.scss
│   ├── _gifts.scss
│   ├── _upload.scss
│   ├── _rsvp.scss
│   ├── _footer.scss
│   └── _floating.scss
├── components/
│   ├── app-ticker.js       # Ticker superior fijo
│   ├── app-hero.js         # Hero con nombres, fecha, toggle ES/EN
│   ├── app-story.js        # Historia de la pareja
│   ├── app-album.js        # Galería polaroid + lightbox
│   ├── app-timeline.js     # Cronograma de la boda
│   ├── app-logistics.js    # Lugar, mapa, calendario
│   ├── app-weather.js      # Clima en vivo (Open-Meteo)
│   ├── app-dresscode.js    # Código de vestimenta
│   ├── app-gifts.js        # Mesa de regalos
│   ├── app-upload.js       # Subir fotos → WhatsApp
│   ├── app-rsvp.js         # Formulario RSVP + cuenta regresiva
│   ├── app-footer.js       # Footer
│   └── app-floating.js     # Botones flotantes (RSVP, música)
├── pages/
│   ├── app-login.js        # Login admin (email/password)
│   └── app-dashboard.js    # Panel admin con logout
├── services/
│   ├── router.js           # Router hash‑based con matchRoute, navigate, startRouter
│   └── auth.js             # Login/logout con localStorage, isAdmin, getUser
├── guards/
│   └── auth.js             # Guardia de ruta (redirige según sesión)
├── config/
│   ├── colors.js           # Paleta de colores
│   ├── i18n.js             # Traducciones ES/EN
│   ├── links.js            # URLs externas, Google Calendar, WhatsApp
│   ├── media.js            # Gradientes y swatch de colores
│   └── weather.js          # Descripciones de códigos WMO
└── utils/
    ├── countdown.js        # Utilidad de cuenta regresiva
    └── confetti.js         # Lanzar confeti
```

## Características principales
- **Hash‑based routing**: `#/inv/:id` (boda), `#/login` (admin), `#/dashboard` (panel)
- **Bilingüe** ES/EN con diccionario en `config/i18n.js` y atributo `lang` en componentes
- **RSVP** con toggle Asiste/No asiste, acompañante, preferencias alimenticias, mensaje; envía a Google Sheets via image beacon
- **Cuenta regresiva** hasta el 21 de agosto 2026 (deadline) y hasta la boda
- **Confeti** al confirmar asistencia
- **Clima** en vivo para Cochabamba vía Open-Meteo (sin API key)
- **Galería** con lightbox modal y navegación por teclado
- **Subida de fotos** drag-and-drop + envío a WhatsApp (máx 8)
- **Calendario** Google Calendar + Apple Calendar (.ics)
- **Animaciones** scroll reveal con clase `.reveal` y delays `.rd1`–`.rd4`
- **Lazy loading** solo ticker y hero son eager; el resto se carga al hacer scroll
- **Auth guard** previene acceso a `/dashboard` sin sesión, redirige a `/login`

## Comandos
- `npm run dev` — servidor de desarrollo Vite
- `npm run build` — build a `dist/`
- `npm run preview` — previsualizar build

## Admin demo
- Email: `admin@moniyjose.com`
- Password: `moni2026`

## Notas
- No tiene backend propio; RSVP se envía a un Google Apps Script
- No tiene base de datos; los datos van a Google Sheets
- Cero dependencias runtime, solo Vite en devDependencies
- El mapa, WhatsApp, y clima usan APIs gratuitas/sin llave
- Router hash‑based para evitar configuración de servidor
- Auth en `localStorage` (solución simple para demo)
