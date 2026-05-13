import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronDown, Music2, Heart, MapPin, Clock, Camera,
  Send, X, ChevronLeft, ChevronRight, Wind, Droplets,
  Thermometer, Cloud, Sun, CloudRain, CalendarPlus, ExternalLink,
  Check, Gift
} from "lucide-react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  white: "#fff", ow: "#F7FAF8", mist: "#E8F0EB",
  sage: "#B8D4BE", forest: "#3A6B4A", deep: "#264D35",
  ink: "#1A2E22", gold: "#B89B6A",
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbw-5EcqFw0yzZZ2bZQ4YhTh0o0ECXsi5-X1M_l1k74Y2fd7nm7pKd0KwA1GBse1SSrBLg/exec";
const WA_NUMBER = "59169530474";
const MAPS_URL = "https://maps.google.com/?q=Huerto+de+los+Olivos+El+Portal+Cochabamba+Bolivia";
const GCAL_URL = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Moni+%26+Jose&dates=20260913T153000Z/20260914T033000Z&details=Ceremonia+16:30+hs+-+Huerto+de+los+Olivos+by+El+Portal,+Cochabamba&location=Huerto+de+los+Olivos,+Cochabamba,+Bolivia";
const ICAL_DATA = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Boda Moni & Jose\nDTSTART:20260913T163000Z\nDTEND:20260914T033000Z\nLOCATION:Huerto de los Olivos by El Portal, Cochabamba, Bolivia\nDESCRIPTION:Ceremonia 16:30 hs\nEND:VEVENT\nEND:VCALENDAR";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  es: {
    ticker: "Moni & Jose · 13 de Septiembre 2026 · Cochabamba, Bolivia · Solo adultos · Huerto de los Olivos by El Portal",
    nav_rsvp: "Confirmar Asistencia",
    hero_eyebrow: "El comienzo de nuestro capítulo favorito",
    hero_date: "13 de Septiembre, 2026",
    hero_location: "Cochabamba, Bolivia",
    hero_cta: "Descubrir",
    hero_sub: "Después de tantas historias, viajes y risas compartidas,\narriba el día de empezar lo mejor.",
    story_label: "Nuestra Historia",
    story_title: "Dos caminos,\nuna sola vida.",
    story_body: "Lo que empezó como una mirada se convirtió en una conversación, luego en una amistad, luego en amor. Hoy, después de años de aventuras compartidas, sunsets fotografiados y risas que no caben en ninguna foto, elegimos celebrar con las personas que más amamos.",
    story_quote: "No es mirarse el uno al otro. Es mirar juntos en la misma dirección.",
    album_label: "Momentos", album_title: "Nuestra Galería",
    album_hint: "clic para ampliar",
    album_caps: ["2019", "El viaje", "Familia", "La propuesta", "Juntos", "Hoy"],
    tl_label: "Nuestro Día", tl_title: "La Celebración",
    tl_events: [
      { time:"15:30", name:"Recepción", desc:"Bienvenida con cócteles y canapés de temporada.", gold:false, emoji:"🥂" },
      { time:"16:30", name:"Ceremonia", desc:"El momento más esperado. Unidos ante quienes más amamos.", gold:true, emoji:"💍" },
      { time:"18:00", name:"Cóctel & Brindis", desc:"Un brindis para celebrar este momento junto a ustedes.", gold:false, emoji:"🍾" },
      { time:"19:30", name:"Cena", desc:"Una noche especial alrededor de la mesa, bajo las estrellas.", gold:false, emoji:"🕯️" },
      { time:"21:30", name:"Corte de Pastel", desc:"El brindis, el corte y el dulce inicio de esta nueva vida juntos.", gold:true, emoji:"🎂" },
      { time:"23:30", name:"Hasta Siempre", desc:"Un recuerdo especial aguarda a cada invitado.", gold:false, emoji:"✨" },
    ],
    log_label: "Información Práctica", log_title: "Cómo Llegar",
    log_venue: "Huerto de los Olivos by El Portal",
    log_address: "Cochabamba, Bolivia",
    log_time: "Puertas abiertas · 15:00 hs",
    log_adults: "Solo adultos",
    log_adults_msg: "Esta celebración es solo para adultos. Si tienen hijos, ¡entendemos perfectamente! Queremos que puedan disfrutar la noche sin preocupaciones. Los peques se quedarán en buenas manos 🤍",
    log_maps: "Abrir en Google Maps",
    log_cal: "Agregar al Calendario",
    log_gcal: "Google Calendar", log_ical: "Apple Calendar",
    wx_label: "El Clima ese Día", wx_title: "Septiembre en Cochabamba",
    wx_loading: "Consultando el cielo...", wx_error: "No se pudo cargar el clima.",
    wx_temp: "Temperatura", wx_hum: "Humedad", wx_wind: "Viento", wx_rain: "Lluvia",
    wx_forecast: "Próximos días",
    wx_days: ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],
    dress_label: "Dress Code", dress_title: "Elegancia Natural",
    dress_body: "Tonos tierra, verde olivo, crema y blanco hueso. Formal de jardín. Pensado para moverse, bailar y disfrutar.",
    dress_note: "El blanco y el negro son exclusivos de los novios.",
    dress_swatches: ["Crema","Sage","Tierra","Olivo","Arena","Marfil"],
    gifts_label: "Regalos",
    gifts_title: "Lo más importante para nosotros es compartir este día con ustedes.",
    gifts_intro: "Pero si desean acompañarnos con un detalle para esta nueva etapa, aquí les dejamos algunas opciones con muchísimo cariño.",
    gifts_table: "Mesa de Regalos", gifts_s1: "Casa Ideas", gifts_s2: "Multicenter",
    gifts_view: "Ver mesa de regalos",
    gifts_env_title: "Lluvia de Sobres",
    gifts_env_body: "Para quienes prefieran acompañarnos con un aporte durante la celebración, tendremos disponible una lluvia de sobres el día del evento.",
    gifts_qr_title: "Transferencia vía QR",
    gifts_qr_body: "También podrán encontrar una opción de transferencia mediante QR para quienes prefieran hacerlo de manera digital.",
    gifts_qr_btn: "Ver código QR",
    up_label: "Comparte tu Foto", up_title: "Envíanos tu Momento",
    up_body: "¿Capturaste algo mágico? Súbelas a nuestro álbum compartido y serán parte de nuestros recuerdos para siempre.",
    up_drag: "Arrastra tus fotos aquí", up_or: "o", up_btn: "Seleccionar Fotos",
    up_send: "Subir al álbum compartido",
    up_hint: "Las fotos se guardan directamente en nuestro álbum de Google Fotos.",
    up_sending: "Abriendo álbum...",
    rsvp_label: "Confirmación de Asistencia", rsvp_title: "¿Nos Acompañas?",
    rsvp_days: "días", rsvp_hours: "horas", rsvp_mins: "min", rsvp_secs: "seg",
    rsvp_deadline: "Fecha límite · 21 de Agosto 2026",
    rsvp_name: "Tu nombre completo", rsvp_email: "Correo electrónico",
    rsvp_attending: "¿Asistirás?",
    rsvp_yes: "Asistiré", rsvp_no: "No podré asistir",
    rsvp_has_plus: "Tengo acompañante",
    rsvp_plus_note: "Tu invitación incluye un espacio adicional reservado.",
    rsvp_food: "Preferencias alimentarias",
    rsvp_food_opts: ["Sin restricción","Vegetariano","Vegano","Sin gluten","Sin lactosa","Otro"],
    rsvp_notes: "Mensaje o nota especial (opcional)",
    rsvp_submit: "Confirmar Asistencia", rsvp_submitting: "Enviando...",
    rsvp_adults_note: "Evento exclusivo para adultos.",
    rsvp_ok_yes_title: "¡Nos hace muy felices!",
    rsvp_ok_yes: "No puedes imaginar lo mucho que significa tenerte en este día. ¡Te esperamos con los brazos abiertos!",
    rsvp_ok_no_title: "Gracias por avisarnos.",
    rsvp_ok_no: "Te echaremos de menos. Siempre serás parte de nuestra historia.",
    rsvp_ok_event: "El evento",
    rsvp_ok_add_cal: "Agregar al Calendario",
    rsvp_ok_countdown: "Faltan",
    footer_close: "Gracias por ser parte de nuestra historia.",
    footer_date: "13 · 09 · 2026", footer_loc: "Cochabamba · Bolivia",
  },
  en: {
    ticker: "Moni & Jose · September 13th 2026 · Cochabamba, Bolivia · Adults Only · Huerto de los Olivos by El Portal",
    nav_rsvp: "RSVP",
    hero_eyebrow: "The beginning of our favorite chapter",
    hero_date: "September 13th, 2026",
    hero_location: "Cochabamba, Bolivia",
    hero_cta: "Discover",
    hero_sub: "After so many stories, trips and laughs shared,\nthe day to begin the best part is finally here.",
    story_label: "Our Story",
    story_title: "Two paths,\none life.",
    story_body: "What began as a glance became a conversation, then a friendship, then love. Today, after years of shared adventures, photographed sunsets and laughter that no photo can contain, we choose to celebrate with the people we love most.",
    story_quote: "It's not gazing at each other. It's looking together in the same direction.",
    album_label: "Moments", album_title: "Our Gallery",
    album_hint: "click to enlarge",
    album_caps: ["2019","The trip","Family","The proposal","Together","Today"],
    tl_label: "Our Day", tl_title: "The Celebration",
    tl_events: [
      { time:"3:30 PM", name:"Reception", desc:"Welcome cocktails and seasonal canapés as guests arrive.", gold:false, emoji:"🥂" },
      { time:"4:30 PM", name:"Ceremony", desc:"The most awaited moment. United before those we love most.", gold:true, emoji:"💍" },
      { time:"6:00 PM", name:"Cocktail Hour", desc:"A toast to celebrate this moment together with you.", gold:false, emoji:"🍾" },
      { time:"7:30 PM", name:"Dinner", desc:"A special evening around the table, under the stars.", gold:false, emoji:"🕯️" },
      { time:"9:30 PM", name:"Cake Cutting", desc:"The toast, the cut and the sweet start of this new life together.", gold:true, emoji:"🎂" },
      { time:"11:30 PM", name:"Farewell", desc:"A special keepsake awaits each guest.", gold:false, emoji:"✨" },
    ],
    log_label: "Practical Information", log_title: "Getting There",
    log_venue: "Huerto de los Olivos by El Portal",
    log_address: "Cochabamba, Bolivia",
    log_time: "Doors open · 3:00 PM",
    log_adults: "Adults only",
    log_adults_msg: "This is an adults-only celebration. If you have little ones at home, we completely understand! We want you to enjoy the night worry-free. The kids will be in good hands 🤍",
    log_maps: "Open in Google Maps",
    log_cal: "Add to Calendar",
    log_gcal: "Google Calendar", log_ical: "Apple Calendar",
    wx_label: "That Day's Weather", wx_title: "September in Cochabamba",
    wx_loading: "Checking the sky...", wx_error: "Could not load weather data.",
    wx_temp: "Temperature", wx_hum: "Humidity", wx_wind: "Wind", wx_rain: "Rain",
    wx_forecast: "Next few days",
    wx_days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    dress_label: "Dress Code", dress_title: "Natural Elegance",
    dress_body: "Earth tones, olive green, cream and bone white. Garden formal attire. Designed for movement, dancing and joy.",
    dress_note: "White and black are exclusive to the couple.",
    dress_swatches: ["Cream","Sage","Earth","Olive","Sand","Ivory"],
    gifts_label: "Gifts",
    gifts_title: "Your presence is the most important thing to us.",
    gifts_intro: "But if you'd like to accompany us with a gift for this new chapter, here are a few options with all our love.",
    gifts_table: "Gift Registry", gifts_s1: "Casa Ideas", gifts_s2: "Multicenter",
    gifts_view: "View registry",
    gifts_env_title: "Envelope Shower",
    gifts_env_body: "For those who prefer to contribute during the celebration, we'll have an envelope shower available on the day of the event.",
    gifts_qr_title: "QR Transfer",
    gifts_qr_body: "You'll also find a QR transfer option for those who prefer to do it digitally.",
    gifts_qr_btn: "Show QR code",
    up_label: "Share Your Photo", up_title: "Send Us Your Moment",
    up_body: "Did you capture something magical? Upload your photos to our shared album and they'll be part of our memories forever.",
    up_drag: "Drag your photos here", up_or: "or", up_btn: "Select Photos",
    up_send: "Upload to shared album",
    up_hint: "Photos are saved directly to our Google Photos shared album.",
    up_sending: "Opening album...",
    rsvp_label: "RSVP", rsvp_title: "Will You Join Us?",
    rsvp_days: "days", rsvp_hours: "hours", rsvp_mins: "min", rsvp_secs: "sec",
    rsvp_deadline: "Deadline · August 21st, 2026",
    rsvp_name: "Your full name", rsvp_email: "Email address",
    rsvp_attending: "Will you attend?",
    rsvp_yes: "I'll be there", rsvp_no: "I cannot attend",
    rsvp_has_plus: "I have a plus one",
    rsvp_plus_note: "Your invitation includes one additional reserved spot.",
    rsvp_food: "Dietary preferences",
    rsvp_food_opts: ["No restrictions","Vegetarian","Vegan","Gluten-free","Dairy-free","Other"],
    rsvp_notes: "Special message or note (optional)",
    rsvp_submit: "Confirm Attendance", rsvp_submitting: "Sending...",
    rsvp_adults_note: "Adults-only event.",
    rsvp_ok_yes_title: "You make us so happy!",
    rsvp_ok_yes: "You cannot imagine how much it means to have you on this day. We can't wait to celebrate with you!",
    rsvp_ok_no_title: "Thank you for letting us know.",
    rsvp_ok_no: "We will miss you. You'll always be part of our story.",
    rsvp_ok_event: "The event",
    rsvp_ok_add_cal: "Add to Calendar",
    rsvp_ok_countdown: "Countdown",
    footer_close: "Thank you for being part of our story.",
    footer_date: "13 · 09 · 2026", footer_loc: "Cochabamba · Bolivia",
  },
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --white:#fff; --ow:#F7FAF8; --mist:#E8F0EB; --sage:#B8D4BE;
      --forest:#3A6B4A; --deep:#264D35; --ink:#1A2E22; --gold:#B89B6A;
      --serif:'Cormorant Garamond',Georgia,serif; --sans:'DM Sans',system-ui,sans-serif;
      --ease:cubic-bezier(0.23,1,0.32,1);
    }
    html { scroll-behavior:smooth; font-size:16px; }
    body { font-family:var(--sans); background:var(--white); color:var(--ink); overflow-x:hidden; -webkit-font-smoothing:antialiased; }
    ::selection { background:var(--sage); color:var(--ink); }
    ::-webkit-scrollbar { width:3px; }
    ::-webkit-scrollbar-track { background:var(--ow); }
    ::-webkit-scrollbar-thumb { background:var(--sage); }

    .grain { position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:0.03;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:160px 160px; }

    /* TICKER */
    .ticker { overflow:hidden; background:var(--ink); height:34px; display:flex; align-items:center; position:fixed; top:0; left:0; right:0; z-index:1000; }
    .ticker-track { display:flex; white-space:nowrap; animation:tickMove 50s linear infinite; }
    .ticker-track:hover { animation-play-state:paused; }
    .ticker-item { font-family:var(--sans); font-size:9.5px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:var(--sage); padding:0 3rem; }
    .ticker-dot { color:var(--gold); }
    @keyframes tickMove { from{transform:translateX(0);} to{transform:translateX(-50%);} }

    /* HERO */
    .hero { min-height:100svh; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; background:var(--ink); }
    .hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 25% 60%, #1e4230 0%, #1A2E22 50%, #0b1610 100%); }
    .hero-vline { position:absolute; width:1px; height:100%; top:0; background:linear-gradient(to bottom,transparent,rgba(184,212,190,0.05) 25%,rgba(184,212,190,0.05) 75%,transparent); }
    .hvl1 { left:22%; } .hvl2 { right:22%; }
    .hero-ring { position:absolute; border-radius:50%; top:50%; left:50%; transform:translate(-50%,-50%); animation:rPulse 9s ease-in-out infinite; }
    .hr1 { width:min(480px,110vw); height:min(480px,110vw); border:1px solid rgba(184,212,190,0.07); }
    .hr2 { width:min(780px,155vw); height:min(780px,155vw); border:1px solid rgba(184,212,190,0.03); animation-delay:2.5s; }
    @keyframes rPulse { 0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1);} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.015);} }

    .hero-content { position:relative; z-index:2; text-align:center; padding:2rem 1.5rem; max-width:920px; }
    .hero-eyebrow { font-family:var(--sans); font-size:10px; font-weight:400; letter-spacing:0.26em; text-transform:uppercase; color:rgba(184,212,190,0.5); margin-bottom:2.5rem; opacity:0; animation:fadeUp 1s 0.3s forwards; }
    .hero-names { font-family:var(--serif); font-size:clamp(78px,20vw,196px); font-weight:300; line-height:0.85; color:var(--white); letter-spacing:-0.025em; opacity:0; animation:fadeUp 1.4s 0.5s forwards; }
    .hero-amp { color:var(--gold); display:block; font-size:clamp(50px,13vw,128px); }
    .hero-sub { font-family:var(--serif); font-size:clamp(15px,2.2vw,21px); font-weight:300; line-height:1.7; color:rgba(255,255,255,0.4); margin-top:2.5rem; white-space:pre-line; opacity:0; animation:fadeUp 1s 0.85s forwards; }
    .hero-meta { display:flex; align-items:center; justify-content:center; gap:1.5rem; margin-top:1.75rem; opacity:0; animation:fadeUp 1s 1.0s forwards; }
    .hero-meta-item { font-family:var(--sans); font-size:9.5px; font-weight:400; letter-spacing:0.22em; text-transform:uppercase; color:rgba(184,212,190,0.42); }
    .hero-meta-sep { width:1px; height:12px; background:rgba(184,212,190,0.18); }
    .hero-cta { margin-top:3rem; display:inline-flex; align-items:center; gap:0.75rem; padding:0.9rem 2.75rem; border:1px solid rgba(255,255,255,0.17); background:rgba(255,255,255,0.05); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border-radius:100px; color:rgba(255,255,255,0.8); font-family:var(--sans); font-size:10.5px; font-weight:500; letter-spacing:0.22em; text-transform:uppercase; cursor:pointer; text-decoration:none; transition:all 0.45s var(--ease); opacity:0; animation:fadeUp 1s 1.2s forwards; }
    .hero-cta:hover { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.3); transform:translateY(-3px); }
    .hero-chevron { position:absolute; bottom:2rem; left:50%; transform:translateX(-50%); color:rgba(184,212,190,0.28); animation:chevBounce 2.5s ease-in-out infinite; z-index:2; cursor:pointer; }
    @keyframes chevBounce { 0%,100%{transform:translateX(-50%) translateY(0);} 50%{transform:translateX(-50%) translateY(10px);} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }

    .lang-toggle { position:absolute; top:calc(34px + 1.25rem); right:1.5rem; z-index:200; display:flex; background:rgba(255,255,255,0.05); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.1); border-radius:100px; overflow:hidden; }
    .lang-btn { padding:0.4rem 0.95rem; font-family:var(--sans); font-size:10px; font-weight:600; letter-spacing:0.1em; color:rgba(255,255,255,0.38); cursor:pointer; transition:all 0.25s; border:none; background:none; }
    .lang-btn.active { background:rgba(255,255,255,0.13); color:var(--white); }

    /* SECTIONS */
    section { padding:6rem 1.5rem; }
    @media(min-width:768px){ section { padding:8rem 3rem; } }
    @media(min-width:1200px){ section { padding:10rem 5rem; } }
    .inner { max-width:1160px; margin:0 auto; }
    .eyebrow { font-family:var(--sans); font-size:9.5px; font-weight:500; letter-spacing:0.3em; text-transform:uppercase; color:var(--forest); margin-bottom:1.25rem; display:block; }
    .h2 { font-family:var(--serif); font-size:clamp(38px,6.5vw,76px); font-weight:300; line-height:1.05; color:var(--ink); }
    .rule { width:36px; height:1px; background:var(--gold); margin:2rem 0; }

    /* STORY */
    .story-grid { display:grid; grid-template-columns:1fr; gap:4rem; align-items:center; }
    @media(min-width:900px){ .story-grid { grid-template-columns:1fr 1fr; gap:7rem; } }
    .story-body { font-family:var(--sans); font-size:clamp(14.5px,1.8vw,17px); font-weight:300; line-height:1.85; color:#4a6355; max-width:480px; }
    .story-quote { font-family:var(--serif); font-size:clamp(18px,2.4vw,25px); font-weight:300; line-height:1.6; color:var(--forest); border-left:2px solid var(--gold); padding-left:1.5rem; margin-top:2.5rem; }
    .story-vis { aspect-ratio:3/4; background:linear-gradient(145deg,var(--mist) 0%,var(--sage) 60%,#9fc8aa 100%); position:relative; overflow:hidden; }
    .story-vis-inner { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:1.5rem; }
    .story-vis-date { font-family:var(--sans); font-size:10px; font-weight:500; letter-spacing:0.3em; text-transform:uppercase; color:rgba(58,107,74,0.45); }

    /* ALBUM */
    .album-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; margin-top:3rem; }
    @media(min-width:600px){ .album-grid { grid-template-columns:repeat(3,1fr); gap:1.5rem; } }
    .polaroid { background:var(--white); padding:0.875rem 0.875rem 2.75rem; box-shadow:0 6px 32px rgba(26,46,34,0.1); cursor:pointer; transition:all 0.45s var(--ease); position:relative; }
    .polaroid:nth-child(1){transform:rotate(-2.2deg);}
    .polaroid:nth-child(2){transform:rotate(1.7deg);}
    .polaroid:nth-child(3){transform:rotate(-1.3deg);}
    .polaroid:nth-child(4){transform:rotate(2.1deg);}
    .polaroid:nth-child(5){transform:rotate(-1.8deg);}
    .polaroid:nth-child(6){transform:rotate(1.4deg);}
    .polaroid:hover { transform:rotate(0deg) translateY(-10px) scale(1.03); box-shadow:0 28px 64px rgba(26,46,34,0.18); z-index:10; }
    .pol-inner { width:100%; aspect-ratio:1; display:flex; align-items:center; justify-content:center; }
    .pol-cap { font-family:var(--sans); font-size:11px; font-weight:400; color:#8a9e92; text-align:center; margin-top:0.625rem; letter-spacing:0.04em; }

    /* LIGHTBOX */
    .lightbox { position:fixed; inset:0; background:rgba(18,32,22,0.97); z-index:9000; display:flex; align-items:center; justify-content:center; opacity:0; pointer-events:none; transition:opacity 0.35s; backdrop-filter:blur(12px); }
    .lightbox.open { opacity:1; pointer-events:all; }
    .lb-close { position:absolute; top:1.5rem; right:1.5rem; color:var(--sage); cursor:pointer; padding:0.5rem; transition:color 0.2s; }
    .lb-close:hover { color:var(--white); }
    .lb-frame { padding:0.875rem 0.875rem 3.25rem; background:var(--white); box-shadow:0 40px 100px rgba(0,0,0,0.4); max-width:90vw; }
    .lb-img { width:min(540px,78vw); aspect-ratio:1; }
    .lb-nav { position:absolute; top:50%; transform:translateY(-50%); color:rgba(184,212,190,0.55); cursor:pointer; padding:1.25rem; transition:color 0.2s; }
    .lb-nav:hover { color:var(--white); }
    .lb-nav.prev { left:0.5rem; } .lb-nav.next { right:0.5rem; }

    /* TIMELINE desktop */
    .tl-desktop { display:none; }
    .tl-mobile { display:block; }
    @media(min-width:860px){ .tl-desktop { display:block; } .tl-mobile { display:none; } }
    .tl-d-wrap { display:grid; grid-template-columns:1fr 56px 1fr; margin-top:5rem; position:relative; }
    .tl-d-axis { position:absolute; left:50%; top:0; bottom:0; width:1px; background:linear-gradient(to bottom,transparent,var(--mist) 8%,var(--mist) 92%,transparent); transform:translateX(-50%); }
    .tl-d-cell { padding:0 2.5rem 4rem; }
    .tl-d-cell.left { text-align:right; }
    .tl-d-center { display:flex; align-items:flex-start; justify-content:center; padding-top:6px; }
    .tl-d-node { width:44px; height:44px; border-radius:50%; border:1px solid var(--mist); background:var(--white); display:flex; align-items:center; justify-content:center; position:relative; z-index:1; font-size:18px; line-height:1; }
    .tl-d-node.gold { border-color:var(--gold); background:#faf5eb; box-shadow:0 0 0 8px rgba(184,155,106,0.09); }
    .tl-d-dot { display:none; }
    .tl-d-time { font-family:var(--serif); font-size:30px; font-weight:300; color:var(--forest); line-height:1; margin-bottom:0.5rem; }
    .tl-d-name { font-family:var(--sans); font-size:10px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:var(--ink); margin-bottom:0.625rem; }
    .tl-d-desc { font-family:var(--sans); font-size:13px; font-weight:300; line-height:1.75; color:#5a7565; max-width:220px; }
    .tl-d-cell.left .tl-d-desc { margin-left:auto; }
    .tl-d-cell.gold .tl-d-time { color:var(--gold); }
    .tl-d-cell.gold .tl-d-name { color:var(--gold); }

    /* TIMELINE mobile */
    .tl-m-wrap { position:relative; padding-left:2.5rem; margin-top:3rem; }
    .tl-m-axis { position:absolute; left:9px; top:0; bottom:0; width:1px; background:linear-gradient(to bottom,transparent,var(--mist) 5%,var(--mist) 95%,transparent); }
    .tl-m-item { position:relative; padding-bottom:2.25rem; }
    .tl-m-node { position:absolute; left:-2.75rem; top:2px; width:24px; height:24px; border-radius:50%; border:1px solid var(--mist); background:var(--white); display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1; }
    .tl-m-node.gold { border-color:var(--gold); background:#faf5eb; box-shadow:0 0 0 5px rgba(184,155,106,0.1); }
    .tl-m-dot { display:none; }
    .tl-m-wrap { position:relative; padding-left:2.75rem; margin-top:3rem; }
    .tl-m-name { font-family:var(--sans); font-size:9.5px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--ink); margin:0.25rem 0 0.5rem; }
    .tl-m-desc { font-family:var(--sans); font-size:13px; font-weight:300; line-height:1.7; color:#5a7565; }
    .tl-m-item.gold .tl-m-time { color:var(--gold); }
    .tl-m-item.gold .tl-m-name { color:var(--gold); }

    /* LOGISTICS */
    .log-cols { display:grid; grid-template-columns:1fr; gap:1.5rem; margin-top:3rem; }
    @media(min-width:768px){ .log-cols { grid-template-columns:1fr 1fr; } }
    @media(min-width:1100px){ .log-cols { grid-template-columns:1.5fr 1fr 1fr; } }
    .log-card { background:var(--ow); border:1px solid var(--mist); padding:2.25rem; }
    .log-card-ey { font-family:var(--sans); font-size:9px; font-weight:600; letter-spacing:0.3em; text-transform:uppercase; color:var(--forest); margin-bottom:0.875rem; }
    .log-card-title { font-family:var(--serif); font-size:22px; font-weight:400; color:var(--ink); margin-bottom:0.625rem; }
    .log-card-body { font-family:var(--sans); font-size:13px; font-weight:300; line-height:1.75; color:#5a7565; }
    .log-actions { display:grid; grid-template-columns:1fr; gap:0.75rem; margin-top:2rem; }
    .log-btn { display:flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.85rem 1rem; font-family:var(--sans); font-size:10.5px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; text-decoration:none; border:1px solid; text-align:center; width:100%; }
    .log-btn.primary { background:var(--forest); color:var(--white); border-color:var(--forest); }
    .log-btn.primary:hover { background:var(--deep); border-color:var(--deep); }
    .log-btn.outline { background:none; color:var(--forest); border-color:var(--forest); }
    .log-btn.outline:hover { background:var(--forest); color:var(--white); }
    /* adults warm card */
    .log-adults-card { background:linear-gradient(135deg,#f0f8f2 0%,var(--ow) 100%); border:1px solid var(--mist); padding:2.25rem; }
    /* calendar dark card */
    .log-cal-card { background:var(--ink); border:1px solid rgba(184,212,190,0.12); padding:2.25rem; display:flex; flex-direction:column; }
    .log-cal-card .log-card-ey { color:rgba(184,212,190,0.55); }
    .log-cal-card .log-card-title { color:var(--white); }
    .log-cal-card .log-card-body { color:rgba(184,212,190,0.5); }
    .log-cal-btns { display:flex; flex-direction:column; gap:0.75rem; margin-top:auto; padding-top:1.5rem; }
    .log-cal-btn { display:flex; align-items:center; gap:0.5rem; padding:0.85rem 1rem; font-family:var(--sans); font-size:10.5px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; text-decoration:none; border:1px solid; width:100%; }
    .log-cal-btn.gcal { background:var(--forest); color:var(--white); border-color:var(--forest); }
    .log-cal-btn.gcal:hover { background:var(--deep); }
    .log-cal-btn.ical { background:rgba(255,255,255,0.06); color:rgba(184,212,190,0.8); border-color:rgba(184,212,190,0.18); }
    .log-cal-btn.ical:hover { background:rgba(255,255,255,0.12); color:var(--white); }

    /* QR MODAL */
    .qr-modal-overlay { position:fixed; inset:0; background:rgba(26,46,34,0.75); z-index:8000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(8px); opacity:0; pointer-events:none; transition:opacity 0.3s; }
    .qr-modal-overlay.open { opacity:1; pointer-events:all; }
    .qr-modal { background:var(--white); padding:2.5rem 2rem; max-width:320px; width:90%; text-align:center; position:relative; box-shadow:0 40px 100px rgba(26,46,34,0.2); }
    .qr-modal-title { font-family:var(--serif); font-size:24px; font-weight:400; color:var(--ink); margin-bottom:0.375rem; }
    .qr-modal-sub { font-family:var(--sans); font-size:12px; font-weight:300; color:#6a8575; margin-bottom:1.5rem; line-height:1.65; }
    .qr-modal-close { position:absolute; top:0.75rem; right:0.75rem; background:none; border:none; cursor:pointer; color:#9ab0a0; padding:0.25rem; }
    .qr-modal-close:hover { color:var(--ink); }

    /* WEATHER */
    .wx-section { background:var(--ink); }
    .wx-section .eyebrow { color:var(--sage); }
    .wx-section .h2 { color:var(--white); }
    .wx-section .rule { background:var(--gold); }

    /* Live weather widget */
    .wx-widget { display:grid; grid-template-columns:1fr; gap:1.5rem; margin-top:2.5rem; }
    @media(min-width:700px){ .wx-widget { grid-template-columns:1fr 1fr; } }
    @media(min-width:1000px){ .wx-widget { grid-template-columns:1.4fr 1fr; gap:2rem; } }

    .wx-main-card { background:rgba(255,255,255,0.04); border:1px solid rgba(184,212,190,0.1); padding:2rem; display:flex; flex-direction:column; gap:0; }
    .wx-city-row { display:flex; align-items:center; gap:0.5rem; margin-bottom:1.5rem; }
    .wx-city { font-family:var(--sans); font-size:10px; font-weight:500; letter-spacing:0.25em; text-transform:uppercase; color:rgba(184,212,190,0.55); }
    .wx-live-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; animation:livePulse 2s ease-in-out infinite; }
    @keyframes livePulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
    .wx-live-label { font-family:var(--sans); font-size:9px; font-weight:500; letter-spacing:0.15em; text-transform:uppercase; color:#4ade80; }
    .wx-big-row { display:flex; align-items:flex-end; gap:1.25rem; margin-bottom:0.5rem; }
    .wx-big-temp { font-family:var(--serif); font-size:clamp(72px,14vw,100px); font-weight:300; color:var(--white); line-height:1; }
    .wx-big-unit { font-family:var(--serif); font-size:28px; font-weight:300; color:rgba(255,255,255,0.4); margin-bottom:1rem; }
    .wx-desc { font-family:var(--sans); font-size:13px; font-weight:300; color:rgba(184,212,190,0.7); letter-spacing:0.06em; text-transform:capitalize; margin-bottom:1.5rem; }
    .wx-pills { display:flex; flex-wrap:wrap; gap:0.625rem; }
    .wx-pill { display:flex; align-items:center; gap:0.4rem; padding:0.375rem 0.875rem; border:1px solid rgba(184,212,190,0.12); font-family:var(--sans); font-size:11px; font-weight:300; color:rgba(184,212,190,0.7); }

    .wx-right { display:flex; flex-direction:column; gap:1rem; }
    .wx-stat { background:rgba(255,255,255,0.03); border:1px solid rgba(184,212,190,0.07); padding:1.25rem; display:flex; align-items:center; gap:1rem; }
    .wx-stat-icon { color:var(--sage); flex-shrink:0; }
    .wx-stat-val { font-family:var(--serif); font-size:24px; font-weight:300; color:var(--white); line-height:1; }
    .wx-stat-lbl { font-family:var(--sans); font-size:9.5px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:rgba(184,212,190,0.42); margin-top:2px; }

    .wx-forecast-row { display:grid; grid-template-columns:repeat(3,1fr); gap:0.875rem; margin-top:1.5rem; }
    .wx-fc-card { background:rgba(255,255,255,0.025); border:1px solid rgba(184,212,190,0.06); padding:1.25rem 0.875rem; text-align:center; }
    .wx-fc-day { font-family:var(--sans); font-size:9px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--sage); margin-bottom:0.625rem; }
    .wx-fc-hi { font-family:var(--serif); font-size:26px; font-weight:300; color:var(--white); line-height:1; }
    .wx-fc-lo { font-family:var(--sans); font-size:11px; font-weight:300; color:rgba(184,212,190,0.38); margin-top:3px; }
    .wx-fc-icon { margin:0.5rem auto; color:var(--sage); }
    .wx-section-lbl { font-family:var(--sans); font-size:9px; font-weight:500; letter-spacing:0.25em; text-transform:uppercase; color:rgba(184,212,190,0.35); margin-top:2rem; margin-bottom:0.875rem; }
    .wx-loading-block { display:flex; align-items:center; gap:0.75rem; padding:2rem 0; }
    .wx-spinner { width:20px; height:20px; border:1.5px solid rgba(184,212,190,0.2); border-top-color:var(--sage); border-radius:50%; animation:spin 0.8s linear infinite; }
    @keyframes spin { to { transform:rotate(360deg); } }

    /* DRESS */
    .swatches { display:flex; flex-wrap:wrap; gap:1.25rem; margin-top:2.5rem; }
    .swatch { display:flex; flex-direction:column; align-items:center; gap:0.5rem; }
    .swatch-c { width:60px; height:60px; border-radius:50%; border:1px solid rgba(26,46,34,0.07); box-shadow:0 4px 16px rgba(26,46,34,0.07); }
    .swatch-l { font-family:var(--sans); font-size:10px; font-weight:400; color:#7a9585; letter-spacing:0.06em; }
    .dress-note { margin-top:2.5rem; padding:1.25rem 1.75rem; background:var(--ow); border-left:2px solid var(--gold); font-family:var(--sans); font-size:13px; font-weight:400; color:var(--ink); }

    /* GIFTS */
    .gifts-intro { font-family:var(--serif); font-size:clamp(18px,2.5vw,26px); font-weight:300; line-height:1.6; color:var(--ink); max-width:640px; margin-bottom:0.75rem; }
    .gifts-sub { font-family:var(--sans); font-size:14px; font-weight:300; line-height:1.85; color:#5a7565; max-width:520px; margin-bottom:3rem; }
    .gifts-sec-label { font-family:var(--sans); font-size:9px; font-weight:600; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); margin-bottom:1.25rem; display:block; }
    .gifts-table-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:3rem; }
    .gift-card { padding:2rem; background:var(--ow); border:1px solid var(--mist); }
    .gift-card-name { font-family:var(--serif); font-size:22px; font-weight:400; color:var(--ink); margin-bottom:1.25rem; }
    .gifts-other { display:grid; grid-template-columns:1fr; gap:1.5rem; }
    @media(min-width:768px){ .gifts-other { grid-template-columns:1fr 1fr; } }
    .gift-other-card { padding:2rem; background:var(--ow); border:1px solid var(--mist); }
    .gift-other-title { font-family:var(--sans); font-size:10.5px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--ink); margin-bottom:0.75rem; }
    .gift-other-body { font-family:var(--sans); font-size:13px; font-weight:300; line-height:1.75; color:#5a7565; }

    /* BUTTONS */
    .btn-f { display:inline-flex; align-items:center; gap:0.5rem; padding:0.75rem 1.625rem; background:var(--forest); color:var(--white); font-family:var(--sans); font-size:10.5px; font-weight:500; letter-spacing:0.17em; text-transform:uppercase; cursor:pointer; border:1px solid var(--forest); transition:all 0.3s; text-decoration:none; }
    .btn-f:hover { background:var(--deep); border-color:var(--deep); }
    .btn-f:disabled { opacity:.45; cursor:not-allowed; }
    .btn-o { display:inline-flex; align-items:center; gap:0.5rem; padding:0.75rem 1.625rem; border:1px solid var(--forest); color:var(--forest); background:none; font-family:var(--sans); font-size:10.5px; font-weight:500; letter-spacing:0.17em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; }
    .btn-o:hover { background:var(--forest); color:var(--white); }

    /* UPLOAD */
    .drop-zone { border:1px dashed var(--sage); padding:3rem 1.5rem; text-align:center; cursor:pointer; transition:all 0.3s; background:var(--ow); }
    .drop-zone:hover,.drop-zone.over { border-color:var(--forest); background:var(--mist); }
    .dz-text { font-family:var(--sans); font-size:14px; font-weight:300; color:#6a8575; margin:1rem 0 0.5rem; }
    .dz-or { font-family:var(--sans); font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#9ab0a0; margin:0.75rem 0; }
    .up-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:0.875rem; margin-top:1.5rem; }
    @media(min-width:500px){ .up-grid { grid-template-columns:repeat(4,1fr); } }
    .up-thumb { aspect-ratio:1; background:var(--mist); padding:.5rem .5rem 1.75rem; box-shadow:0 4px 16px rgba(26,46,34,0.08); }
    .up-thumb img { width:100%; height:100%; object-fit:cover; display:block; }

    /* RSVP */
    .rsvp-sec { background:var(--ow); }
    .cd-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0.875rem; margin:2.5rem 0; max-width:440px; }
    .cd-item { text-align:center; padding:1.25rem .5rem; background:var(--white); border:1px solid var(--mist); }
    .cd-val { font-family:var(--serif); font-size:38px; font-weight:300; color:var(--forest); line-height:1; }
    .cd-lbl { font-family:var(--sans); font-size:9px; font-weight:500; letter-spacing:0.22em; text-transform:uppercase; color:#8a9e92; margin-top:.2rem; }
    .rsvp-form { max-width:580px; }
    .fg { margin-bottom:1.5rem; }
    .fl { display:block; font-family:var(--sans); font-size:9.5px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:var(--forest); margin-bottom:0.55rem; }
    .fi { width:100%; padding:.875rem 1rem; border:1px solid var(--mist); background:var(--white); font-family:var(--sans); font-size:14px; font-weight:300; color:var(--ink); outline:none; transition:border-color .25s; -webkit-appearance:none; border-radius:0; }
    .fi:focus { border-color:var(--forest); }
    .fi::placeholder { color:#b8cdc0; }
    .att-btns { display:grid; grid-template-columns:1fr 1fr; gap:.875rem; }
    .att-btn { padding:1rem .5rem; border:1px solid var(--mist); background:var(--white); font-family:var(--sans); font-size:12px; font-weight:500; letter-spacing:.08em; color:#6a8575; cursor:pointer; transition:all .25s; }
    .att-btn.sy { border-color:var(--forest); background:var(--forest); color:var(--white); }
    .att-btn.sn { border-color:#9aad78; background:#9aad78; color:var(--white); }
    .check-row { display:flex; align-items:flex-start; gap:.75rem; padding:1.25rem; background:var(--white); border:1px solid var(--mist); cursor:pointer; transition:border-color .25s; margin-bottom:.25rem; }
    .check-row:hover { border-color:var(--sage); }
    .check-box { width:18px; height:18px; min-width:18px; border:1px solid var(--mist); background:var(--white); display:flex; align-items:center; justify-content:center; transition:all .2s; margin-top:1px; }
    .check-box.on { background:var(--forest); border-color:var(--forest); }
    .check-lbl { font-family:var(--sans); font-size:13px; font-weight:300; color:var(--ink); line-height:1.5; }
    .plus-note { padding:.875rem 1rem; background:var(--mist); border-left:2px solid var(--gold); font-family:var(--sans); font-size:12px; font-weight:400; color:var(--forest); margin-top:.5rem; }
    .chips { display:flex; flex-wrap:wrap; gap:.5rem; }
    .chip { padding:.5rem 1.125rem; border:1px solid var(--mist); background:var(--white); font-family:var(--sans); font-size:12px; font-weight:400; color:#5a7565; cursor:pointer; transition:all .25s; border-radius:100px; }
    .chip.on { border-color:var(--forest); background:var(--forest); color:var(--white); }
    .adults-badge { display:inline-flex; align-items:center; gap:.5rem; padding:.5rem 1rem; border:1px solid rgba(184,155,106,.3); font-family:var(--sans); font-size:10px; font-weight:500; letter-spacing:.15em; text-transform:uppercase; color:var(--gold); margin-bottom:1.5rem; }
    .rsvp-ok { text-align:center; padding:5rem 2rem; }
    .rsvp-ok-title { font-family:var(--serif); font-size:clamp(34px,5vw,58px); font-weight:300; color:var(--ink); margin-bottom:1rem; line-height:1.1; }
    .rsvp-ok-body { font-family:var(--sans); font-size:15px; font-weight:300; color:#5a7565; max-width:380px; margin:0 auto; line-height:1.8; }
    .rsvp-deadline { font-family:var(--sans); font-size:10px; font-weight:500; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:1.5rem; }

    /* FOOTER */
    .footer { background:var(--ink); padding:6rem 2rem 4rem; text-align:center; }
    .footer-mono { font-family:var(--serif); font-size:clamp(70px,16vw,156px); font-weight:300; color:rgba(184,212,190,0.06); letter-spacing:-.025em; line-height:.9; margin-bottom:3rem; }
    .footer-close { font-family:var(--serif); font-size:clamp(20px,3vw,32px); font-weight:300; color:rgba(255,255,255,0.6); line-height:1.55; max-width:460px; margin:0 auto 2.5rem; }
    .footer-names { font-family:var(--serif); font-size:26px; font-weight:300; color:var(--white); margin-bottom:.5rem; }
    .footer-date { font-family:var(--sans); font-size:10px; font-weight:400; letter-spacing:.28em; text-transform:uppercase; color:var(--sage); margin-bottom:.25rem; }
    .footer-loc { font-family:var(--sans); font-size:9.5px; font-weight:300; letter-spacing:.22em; text-transform:uppercase; color:rgba(184,212,190,0.32); }
    .footer-sep { width:1px; height:36px; background:rgba(184,212,190,0.1); margin:2.5rem auto; }

    /* FABS */
    .fab-rsvp { position:fixed; bottom:1.75rem; right:1.5rem; z-index:500; display:flex; align-items:center; gap:.5rem; padding:.875rem 1.625rem; background:var(--forest); color:var(--white); font-family:var(--sans); font-size:10.5px; font-weight:500; letter-spacing:.15em; text-transform:uppercase; cursor:pointer; border:none; border-radius:100px; box-shadow:0 8px 32px rgba(58,107,74,.32); transition:all .35s; text-decoration:none; }
    .fab-rsvp:hover { background:var(--deep); transform:translateY(-2px); box-shadow:0 12px 40px rgba(58,107,74,.42); }
    .fab-music { position:fixed; bottom:1.75rem; left:1.5rem; z-index:500; width:46px; height:46px; border-radius:50%; background:rgba(247,250,248,.92); backdrop-filter:blur(8px); border:1px solid var(--mist); display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 16px rgba(26,46,34,.1); color:var(--forest); transition:all .3s; }
    .fab-music:hover { border-color:var(--sage); }

    /* REVEAL */
    .reveal { opacity:0; transform:translateY(20px); transition:opacity .85s var(--ease),transform .85s var(--ease); }
    .reveal.in { opacity:1; transform:translateY(0); }
    .rd1 { transition-delay:.1s; } .rd2 { transition-delay:.2s; }
    .rd3 { transition-delay:.3s; } .rd4 { transition-delay:.4s; }

    /* CONFETTI */
    .cf { position:fixed; top:-12px; pointer-events:none; z-index:9998; animation:cfFall linear forwards; }
    @keyframes cfFall { to { transform:translateY(105vh) rotate(800deg); opacity:0; } }

    select.fi { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%233A6B4A' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 1rem center; padding-right:2.5rem; }
  `}</style>
);

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountdown(target) {
  const [d, setD] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - Date.now();
      if (diff <= 0) return;
      setD({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return d;
}

function launchConfetti() {
  const colors = [C.forest, C.gold, C.sage, "#fff", C.deep, "#d4e8d8"];
  for (let i = 0; i < 90; i++) {
    const el = document.createElement("div");
    el.className = "cf";
    const s = Math.random() * 9 + 4;
    el.style.cssText = `width:${s}px;height:${s}px;border-radius:${Math.random() > 0.5 ? "50%" : "2px"};background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}vw;animation-duration:${Math.random() * 2.5 + 2}s;animation-delay:${Math.random() * 0.6}s;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}

// ─── SVG MONO ─────────────────────────────────────────────────────────────────
const Mono = ({ size = 80, color = C.forest, op = 0.22 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80">
    <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle"
      fontFamily="'Cormorant Garamond',serif" fontSize="38" fontWeight="300" fill={color} opacity={op}>
      M&J
    </text>
  </svg>
);

const QRPlaceholder = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" style={{ display: "block" }}>
    <rect width="96" height="96" fill="#fff" stroke="#E8F0EB" strokeWidth="1" />
    {[[0,0],[0,1],[0,2],[1,0],[2,0],[2,1],[2,2],[1,2],[4,0],[5,0],[6,0],[4,1],[6,1],[4,2],[5,2],[6,2],[0,4],[0,5],[0,6],[1,4],[2,4],[2,5],[2,6],[1,6]].map(([r,c],i)=>(
      <rect key={i} x={8+c*12} y={8+r*12} width={10} height={10} fill="#1A2E22" opacity="0.8"/>
    ))}
    <rect x={38} y={38} width={20} height={20} fill="#B8D4BE" opacity="0.6"/>
    <rect x={42} y={42} width={12} height={12} fill="#3A6B4A" opacity="0.7"/>
  </svg>
);

// ─── PHOTO DATA ───────────────────────────────────────────────────────────────
const photoGrads = [
  `linear-gradient(135deg,#ddf0e4 0%,${C.sage} 100%)`,
  `linear-gradient(148deg,${C.sage} 0%,${C.forest} 100%)`,
  `linear-gradient(128deg,#c8e4cf 0%,${C.mist} 100%)`,
  `linear-gradient(155deg,${C.deep} 0%,#3d7d54 100%)`,
  `linear-gradient(138deg,#edddb0 0%,${C.gold} 100%)`,
  `linear-gradient(148deg,${C.mist} 0%,#c5d9ca 100%)`,
];
const swatchColors = ["#F5F0E8", C.sage, "#C4A882", "#6B7B4E", "#D4C4A0", "#F2EDE0"];

// ─── TICKER ───────────────────────────────────────────────────────────────────
const Ticker = ({ lang }) => {
  const items = Array(8).fill(T[lang].ticker);
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">{item} <span className="ticker-dot">✦</span></span>
        ))}
      </div>
    </div>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = ({ lang, setLang }) => {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const tr = T[lang];
  return (
    <div className="hero" id="hero" style={{ paddingTop: 34 }}>
      <div className="hero-bg" />
      <div className="hero-vline hvl1" />
      <div className="hero-vline hvl2" />
      <div className="hero-ring hr1" />
      <div className="hero-ring hr2" />

      <div className="lang-toggle">
        <button className={`lang-btn${lang === "es" ? " active" : ""}`} onClick={() => setLang("es")}>ES</button>
        <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">{tr.hero_eyebrow}</div>
        <div className="hero-names">Moni<span className="hero-amp">&</span>Jose</div>
        <div className="hero-sub">{tr.hero_sub}</div>
        <div className="hero-meta">
          <span className="hero-meta-item">{tr.hero_date}</span>
          <span className="hero-meta-sep" />
          <span className="hero-meta-item">{tr.hero_location}</span>
        </div>
        <a className="hero-cta" href="#story" onClick={e => { e.preventDefault(); go("story"); }}>
          {tr.hero_cta} <ChevronDown size={13} />
        </a>
      </div>
      <div className="hero-chevron" onClick={() => go("story")}><ChevronDown size={26} /></div>
    </div>
  );
};

// ─── STORY ────────────────────────────────────────────────────────────────────
const Story = ({ lang }) => {
  const tr = T[lang];
  return (
    <section id="story" style={{ background: C.white }}>
      <div className="inner">
        <div className="story-grid">
          <div>
            <span className="eyebrow reveal">{tr.story_label}</span>
            <h2 className="h2 reveal rd1" style={{ whiteSpace: "pre-line" }}>{tr.story_title}</h2>
            <div className="rule reveal rd2" />
            <p className="story-body reveal rd2">{tr.story_body}</p>
            <blockquote className="story-quote reveal rd3">{tr.story_quote}</blockquote>
          </div>
          <div className="story-vis reveal rd2">
            <div className="story-vis-inner">
              <Mono size={120} color={C.forest} op={0.15} />
              <div className="story-vis-date">13 · 09 · 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── ALBUM ────────────────────────────────────────────────────────────────────
const Album = ({ lang }) => {
  const [lb, setLb] = useState(null);
  const caps = T[lang].album_caps;

  const handleKey = useCallback(e => {
    if (lb === null) return;
    if (e.key === "Escape") setLb(null);
    if (e.key === "ArrowRight") setLb(l => (l + 1) % 6);
    if (e.key === "ArrowLeft") setLb(l => (l - 1 + 6) % 6);
  }, [lb]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const tr = T[lang];
  return (
    <section style={{ background: C.ow }}>
      <div className="inner">
        <span className="eyebrow reveal">{tr.album_label}</span>
        <h2 className="h2 reveal rd1">{tr.album_title}</h2>
        <div className="rule reveal rd2" />
        <p className="reveal rd2" style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8a9e92", marginBottom: "0.25rem" }}>{tr.album_hint}</p>
        <div className="album-grid">
          {photoGrads.map((g, i) => (
            <div key={i} className="polaroid reveal" style={{ transitionDelay: `${i * 0.07}s` }} onClick={() => setLb(i)}>
              <div className="pol-inner" style={{ background: g }}><Mono size={42} color="#fff" op={0.28} /></div>
              <div className="pol-cap">{caps[i]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`lightbox${lb !== null ? " open" : ""}`} onClick={() => setLb(null)}>
        <div className="lb-close"><X size={22} /></div>
        <div className="lb-nav prev" onClick={e => { e.stopPropagation(); setLb(l => (l - 1 + 6) % 6); }}><ChevronLeft size={26} /></div>
        {lb !== null && (
          <div className="lb-frame" onClick={e => e.stopPropagation()}>
            <div className="lb-img" style={{ background: photoGrads[lb], display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Mono size={72} color="#fff" op={0.25} />
            </div>
            <div className="pol-cap" style={{ marginTop: "0.75rem", textAlign: "center" }}>{caps[lb]}</div>
          </div>
        )}
        <div className="lb-nav next" onClick={e => { e.stopPropagation(); setLb(l => (l + 1) % 6); }}><ChevronRight size={26} /></div>
      </div>
    </section>
  );
};

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
const Timeline = ({ lang }) => {
  const tr = T[lang];
  const events = tr.tl_events;
  return (
    <section id="timeline" style={{ background: C.white }}>
      <div className="inner">
        <span className="eyebrow reveal">{tr.tl_label}</span>
        <h2 className="h2 reveal rd1">{tr.tl_title}</h2>
        <div className="rule reveal rd2" />

        {/* DESKTOP */}
        <div className="tl-desktop">
          <div className="tl-d-wrap">
            <div className="tl-d-axis" />
            {events.map((ev, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} style={{ display: "contents" }}>
                  {isLeft ? (
                    <>
                      <div className={`tl-d-cell left${ev.gold ? " gold" : ""} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
                        <div className="tl-d-time">{ev.time}</div>
                        <div className="tl-d-name">{ev.name}</div>
                        <div className="tl-d-desc">{ev.desc}</div>
                      </div>
                      <div className="tl-d-center reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                        <div className={`tl-d-node${ev.gold ? " gold" : ""}`}><div className="tl-d-dot" /></div>
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div className="tl-d-center reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                        <div className={`tl-d-node${ev.gold ? " gold" : ""}`}><div className="tl-d-dot" /></div>
                      </div>
                      <div className={`tl-d-cell${ev.gold ? " gold" : ""} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
                        <div className="tl-d-time">{ev.time}</div>
                        <div className="tl-d-name">{ev.name}</div>
                        <div className="tl-d-desc">{ev.desc}</div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE */}
        <div className="tl-mobile">
          <div className="tl-m-wrap">
            <div className="tl-m-axis" />
            {events.map((ev, i) => (
              <div key={i} className={`tl-m-item${ev.gold ? " gold" : ""} reveal`} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className={`tl-m-node${ev.gold ? " gold" : ""}`}><div className="tl-m-dot" /></div>
                <div className="tl-m-time">{ev.time}</div>
                <div className="tl-m-name">{ev.name}</div>
                <div className="tl-m-desc">{ev.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── LOGISTICS ────────────────────────────────────────────────────────────────
const Logistics = ({ lang }) => {
  const [calOpen, setCalOpen] = useState(false);
  const calRef = useRef();
  const tr = T[lang];

  useEffect(() => {
    const h = e => { if (calRef.current && !calRef.current.contains(e.target)) setCalOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const downloadIcal = () => {
    const blob = new Blob([ICAL_DATA], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "boda-moni-jose.ics";
    a.click();
    setCalOpen(false);
  };

  return (
    <section id="logistics" style={{ background: C.ow }}>
      <div className="inner">
        <span className="eyebrow reveal">{tr.log_label}</span>
        <h2 className="h2 reveal rd1">{tr.log_title}</h2>
        <div className="rule reveal rd2" />
        <div className="log-cols">
          <div className="log-card reveal">
            <div className="log-card-ey">{lang === "es" ? "Lugar" : "Venue"}</div>
            <div className="log-card-title">{tr.log_venue}</div>
            <div className="log-card-body">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <MapPin size={13} color={C.forest} />{tr.log_address}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Clock size={13} color={C.forest} />{tr.log_time}
              </div>
            </div>
            <div className="log-actions" ref={calRef}>
              <a className="log-btn primary" href={MAPS_URL} target="_blank" rel="noreferrer">
                <ExternalLink size={13} />{tr.log_maps}
              </a>
              <div style={{ position: "relative" }}>
                <button className="log-btn outline" style={{ width: "100%" }} onClick={() => setCalOpen(o => !o)}>
                  <CalendarPlus size={13} />{tr.log_cal}
                </button>
                {calOpen && (
                  <div className="cal-pop">
                    <a className="cal-opt" href={GCAL_URL} target="_blank" rel="noreferrer" onClick={() => setCalOpen(false)}>{tr.log_gcal}</a>
                    <button className="cal-opt" onClick={downloadIcal}>{tr.log_ical}</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="log-card reveal rd1">
            <div className="log-card-ey">Adults Only</div>
            <div className="log-card-title">{tr.log_adults}</div>
            <div className="log-card-body" style={{ marginTop: "0.5rem" }}>{tr.log_adults_sub}</div>
          </div>

          <div className="log-card reveal rd2" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "0.75rem" }}>
            <Mono size={60} color={C.forest} op={0.2} />
            <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 300, color: C.forest, opacity: 0.65 }}>Huerto de los Olivos</div>
            <div style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", color: C.forest, opacity: 0.38 }}>by El Portal</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── WEATHER HELPERS ──────────────────────────────────────────────────────────
const WMO_DESC = {
  es: { 0:"Despejado", 1:"Mayormente despejado", 2:"Parcialmente nublado", 3:"Nublado",
    45:"Niebla", 48:"Niebla con escarcha", 51:"Llovizna ligera", 53:"Llovizna moderada",
    55:"Llovizna densa", 61:"Lluvia ligera", 63:"Lluvia moderada", 65:"Lluvia intensa",
    71:"Nieve ligera", 73:"Nieve moderada", 80:"Chubascos ligeros", 81:"Chubascos moderados",
    82:"Chubascos fuertes", 95:"Tormenta", 96:"Tormenta con granizo", 99:"Tormenta fuerte" },
  en: { 0:"Clear sky", 1:"Mainly clear", 2:"Partly cloudy", 3:"Overcast",
    45:"Fog", 48:"Icy fog", 51:"Light drizzle", 53:"Moderate drizzle",
    55:"Dense drizzle", 61:"Light rain", 63:"Moderate rain", 65:"Heavy rain",
    71:"Light snow", 73:"Moderate snow", 80:"Light showers", 81:"Moderate showers",
    82:"Heavy showers", 95:"Thunderstorm", 96:"Hail storm", 99:"Heavy hail storm" },
};

const WxIcon = ({ code, size = 24 }) => {
  if (code === 0) return <Sun size={size} />;
  if (code <= 3) return <Cloud size={size} />;
  if (code <= 67) return <CloudRain size={size} />;
  return <Cloud size={size} />;
};

const Weather = ({ lang }) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const tr = T[lang];
  const DAY_NAMES = tr.wx_days;

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=-17.3895&longitude=-66.1568" +
      "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weathercode,is_day" +
      "&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum" +
      "&timezone=America%2FLa_Paz&forecast_days=4"
    )
      .then(r => r.json())
      .then(setData)
      .catch(() => setErr(true));
  }, []);

  const desc = data
    ? (WMO_DESC[lang][data.current.weathercode] || (lang === "es" ? "Variable" : "Variable"))
    : "";

  return (
    <section className="wx-section" id="weather">
      <div className="inner">
        <span className="eyebrow reveal">{tr.wx_label}</span>
        <h2 className="h2 reveal rd1">{tr.wx_title}</h2>
        <div className="rule reveal rd2" />

        {!data && !err && (
          <div className="wx-loading-block">
            <div className="wx-spinner" />
            <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "rgba(184,212,190,0.5)" }}>{tr.wx_loading}</span>
          </div>
        )}
        {err && (
          <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: "rgba(184,212,190,0.5)", marginTop: "2rem" }}>{tr.wx_error}</p>
        )}

        {data && (
          <>
            <div className="wx-widget reveal rd2">
              {/* Main card */}
              <div className="wx-main-card">
                <div className="wx-city-row">
                  <div className="wx-live-dot" />
                  <span className="wx-live-label">{lang === "es" ? "En vivo" : "Live"}</span>
                  <span style={{ color: "rgba(184,212,190,0.2)", margin: "0 0.375rem" }}>·</span>
                  <span className="wx-city">Cochabamba, Bolivia</span>
                </div>
                <div className="wx-big-row">
                  <div className="wx-big-temp">{Math.round(data.current.temperature_2m)}</div>
                  <div className="wx-big-unit">°C</div>
                  <div style={{ marginBottom: "1rem", color: C.sage }}>
                    <WxIcon code={data.current.weathercode} size={36} />
                  </div>
                </div>
                <div className="wx-desc">{desc}</div>
                <div className="wx-pills">
                  <span className="wx-pill">
                    <Thermometer size={12} />
                    {lang === "es" ? "Sensación" : "Feels like"} {Math.round(data.current.apparent_temperature)}°
                  </span>
                  <span className="wx-pill">
                    <Droplets size={12} />
                    {data.current.relative_humidity_2m}%
                  </span>
                  <span className="wx-pill">
                    <Wind size={12} />
                    {Math.round(data.current.wind_speed_10m)} km/h
                  </span>
                  <span className="wx-pill">
                    <CloudRain size={12} />
                    {data.current.precipitation} mm
                  </span>
                </div>
              </div>

              {/* Right stats column */}
              <div className="wx-right">
                {[
                  { Icon: Thermometer, val: `${Math.round(data.daily.temperature_2m_max[0])}° / ${Math.round(data.daily.temperature_2m_min[0])}°`, lbl: lang === "es" ? "Máx / Mín hoy" : "Today high / low" },
                  { Icon: Droplets, val: `${data.current.relative_humidity_2m}%`, lbl: tr.wx_hum },
                  { Icon: Wind, val: `${Math.round(data.current.wind_speed_10m)} km/h`, lbl: tr.wx_wind },
                  { Icon: CloudRain, val: `${data.daily.precipitation_sum[0]} mm`, lbl: lang === "es" ? "Precipitación hoy" : "Precipitation today" },
                ].map(({ Icon, val, lbl }, i) => (
                  <div key={i} className="wx-stat">
                    <div className="wx-stat-icon"><Icon size={18} /></div>
                    <div>
                      <div className="wx-stat-val">{val}</div>
                      <div className="wx-stat-lbl">{lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-day forecast */}
            <div className="wx-section-lbl reveal rd3">{tr.wx_forecast}</div>
            <div className="wx-forecast-row reveal rd3">
              {data.daily.time.slice(1, 4).map((d, i) => {
                const day = new Date(d + "T12:00:00");
                return (
                  <div key={i} className="wx-fc-card">
                    <div className="wx-fc-day">{DAY_NAMES[day.getDay()]}</div>
                    <div className="wx-fc-icon"><WxIcon code={data.daily.weathercode[i + 1]} size={22} /></div>
                    <div className="wx-fc-hi">{Math.round(data.daily.temperature_2m_max[i + 1])}°</div>
                    <div className="wx-fc-lo">{Math.round(data.daily.temperature_2m_min[i + 1])}°</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

// ─── DRESS CODE ───────────────────────────────────────────────────────────────
const DressCode = ({ lang }) => {
  const tr = T[lang];
  return (
    <section id="dress" style={{ background: C.white }}>
      <div className="inner">
        <span className="eyebrow reveal">{tr.dress_label}</span>
        <h2 className="h2 reveal rd1">{tr.dress_title}</h2>
        <div className="rule reveal rd2" />
        <p className="reveal rd2" style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "#5a7565", maxWidth: 500 }}>{tr.dress_body}</p>
        <div className="swatches reveal rd2">
          {swatchColors.map((col, i) => (
            <div key={i} className="swatch">
              <div className="swatch-c" style={{ background: col }} />
              <span className="swatch-l">{tr.dress_swatches[i]}</span>
            </div>
          ))}
        </div>
        <div className="dress-note reveal rd3">{tr.dress_note}</div>
      </div>
    </section>
  );
};

// ─── GIFTS ────────────────────────────────────────────────────────────────────
const Gifts = ({ lang }) => {
  const tr = T[lang];
  return (
    <section id="gifts" style={{ background: C.ow }}>
      <div className="inner">
        <span className="eyebrow reveal">{tr.gifts_label}</span>
        <div className="rule reveal rd1" />
        <p className="gifts-intro reveal rd1">{tr.gifts_title}</p>
        <p className="gifts-sub reveal rd2">{tr.gifts_intro}</p>

        <span className="gifts-sec-label reveal rd2">{tr.gifts_table}</span>
        <div className="gifts-table-grid reveal rd2">
          {[tr.gifts_s1, tr.gifts_s2].map((store, i) => (
            <div key={i} className="gift-card">
              <div style={{ marginBottom: "0.75rem" }}><Gift size={18} color={C.gold} /></div>
              <div className="gift-card-name">{store}</div>
              <button className="btn-o">{tr.gifts_view}</button>
            </div>
          ))}
        </div>

        <div className="gifts-other reveal rd3">
          <div className="gift-other-card">
            <div className="gift-other-title">{tr.gifts_env_title}</div>
            <div className="gift-other-body">{tr.gifts_env_body}</div>
          </div>
          <div className="gift-other-card">
            <div className="gift-other-title">{tr.gifts_qr_title}</div>
            <div className="gift-other-body">{tr.gifts_qr_body}</div>
            <div style={{ marginTop: "1.25rem" }}><QRPlaceholder /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── UPLOAD ───────────────────────────────────────────────────────────────────
const Upload = ({ lang }) => {
  const [files, setFiles] = useState([]);
  const [over, setOver] = useState(false);
  const inputRef = useRef();
  const tr = T[lang];

  const addFiles = newFiles => {
    const arr = Array.from(newFiles).slice(0, 8 - files.length);
    setFiles(prev => [...prev, ...arr.map(f => ({ f, url: URL.createObjectURL(f) }))]);
  };

  return (
    <section id="upload" style={{ background: C.white }}>
      <div className="inner">
        <span className="eyebrow reveal">{tr.up_label}</span>
        <h2 className="h2 reveal rd1">{tr.up_title}</h2>
        <div className="rule reveal rd2" />
        <p className="reveal rd2" style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "#5a7565", maxWidth: 480, marginBottom: "2rem" }}>{tr.up_body}</p>

        <div
          className={`drop-zone reveal rd2${over ? " over" : ""}`}
          onDragOver={e => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={e => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
        >
          <Camera size={28} color={C.sage} />
          <div className="dz-text">{tr.up_drag}</div>
          <div className="dz-or">{tr.up_or}</div>
          <button className="btn-o" style={{ pointerEvents: "none" }}>{tr.up_btn}</button>
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => addFiles(e.target.files)} />
        </div>

        {files.length > 0 && (
          <div className="up-grid" style={{ marginTop: "1.5rem" }}>
            {files.map((f, i) => (
              <div key={i} className="up-thumb"><img src={f.url} alt="" /></div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div style={{ marginTop: "1.5rem" }}>
            <button className="btn-f" onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lang === "es" ? "Hola, les enviamos fotos de su boda" : "Hi, sending you wedding photos!")}`)}>
              <Send size={14} />{tr.up_send}
            </button>
          </div>
        )}
        <p style={{ fontFamily: "var(--sans)", fontSize: 11, color: "#9ab0a0", marginTop: "1rem", letterSpacing: "0.05em" }}>{tr.up_hint}</p>
      </div>
    </section>
  );
};

// ─── RSVP ─────────────────────────────────────────────────────────────────────
const RSVP = ({ lang }) => {
  const cd = useCountdown("2026-08-21T23:59:59");
  const [attending, setAttending] = useState(null);
  const [hasPlus, setHasPlus] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", food: [], notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const tr = T[lang];

  const toggleFood = opt => setForm(f => ({
    ...f, food: f.food.includes(opt) ? f.food.filter(x => x !== opt) : [...f.food, opt]
  }));

  const submit = async () => {
    if (!form.name || attending === null) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        name: form.name, email: form.email,
        attending: attending ? "yes" : "no",
        has_plus: hasPlus ? "yes" : "no",
        food: form.food.join(", "),
        notes: form.notes, lang,
        timestamp: new Date().toISOString(),
      });
      new Image().src = `${SHEETS_URL}?${params}`;
      await new Promise(r => setTimeout(r, 900));
      setSubmitted(true);
      if (attending) launchConfetti();
    } finally { setLoading(false); }
  };

  return (
    <section className="rsvp-sec" id="rsvp">
      <div className="inner">
        <span className="eyebrow reveal">{tr.rsvp_label}</span>
        <h2 className="h2 reveal rd1">{tr.rsvp_title}</h2>
        <div className="rule reveal rd2" />

        {!submitted ? (
          <>
            <div className="rsvp-deadline reveal">{tr.rsvp_deadline}</div>
            <div className="cd-grid reveal rd1">
              {[
                { v: cd.days, l: tr.rsvp_days },
                { v: cd.hours, l: tr.rsvp_hours },
                { v: cd.mins, l: tr.rsvp_mins },
                { v: cd.secs, l: tr.rsvp_secs },
              ].map(({ v, l }, i) => (
                <div key={i} className="cd-item">
                  <div className="cd-val">{String(v).padStart(2, "0")}</div>
                  <div className="cd-lbl">{l}</div>
                </div>
              ))}
            </div>

            <div className="rsvp-form reveal rd2">
              <div className="adults-badge"><Heart size={11} />{tr.rsvp_adults_note}</div>

              <div className="fg">
                <label className="fl">{tr.rsvp_name}</label>
                <input className="fi" type="text" placeholder={tr.rsvp_name} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="fg">
                <label className="fl">{tr.rsvp_email}</label>
                <input className="fi" type="email" placeholder={tr.rsvp_email} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="fg">
                <label className="fl">{tr.rsvp_attending}</label>
                <div className="att-btns">
                  <button className={`att-btn${attending === true ? " sy" : ""}`} onClick={() => setAttending(true)}>{tr.rsvp_yes}</button>
                  <button className={`att-btn${attending === false ? " sn" : ""}`} onClick={() => setAttending(false)}>{tr.rsvp_no}</button>
                </div>
              </div>

              {attending === true && (
                <>
                  <div className="fg">
                    <div className="check-row" onClick={() => setHasPlus(p => !p)}>
                      <div className={`check-box${hasPlus ? " on" : ""}`}>
                        {hasPlus && <Check size={11} color="#fff" strokeWidth={2.5} />}
                      </div>
                      <span className="check-lbl">{tr.rsvp_has_plus}</span>
                    </div>
                    {hasPlus && <div className="plus-note">{tr.rsvp_plus_note}</div>}
                  </div>
                  <div className="fg">
                    <label className="fl">{tr.rsvp_food}</label>
                    <div className="chips">
                      {tr.rsvp_food_opts.map(opt => (
                        <button key={opt} className={`chip${form.food.includes(opt) ? " on" : ""}`} onClick={() => toggleFood(opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="fg">
                    <label className="fl">{tr.rsvp_notes}</label>
                    <textarea className="fi" rows={3} placeholder={tr.rsvp_notes} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ resize: "vertical", fontFamily: "var(--sans)" }} />
                  </div>
                </>
              )}

              <button className="btn-f" onClick={submit} disabled={loading || !form.name || attending === null}>
                {loading ? tr.rsvp_submitting : tr.rsvp_submit}
              </button>
            </div>
          </>
        ) : (
          <div className="rsvp-ok">
            <div style={{ marginBottom: "1.5rem", color: attending ? C.forest : C.gold }}>
              <Heart size={36} strokeWidth={1.5} />
            </div>
            <div className="rsvp-ok-title">{attending ? tr.rsvp_ok_yes_title : tr.rsvp_ok_no_title}</div>
            <p className="rsvp-ok-body" style={{ marginTop: "1rem" }}>{attending ? tr.rsvp_ok_yes : tr.rsvp_ok_no}</p>
            <div style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: C.forest, marginTop: "2.5rem" }}>— Moni & Jose</div>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ lang }) => {
  const tr = T[lang];
  return (
    <footer className="footer">
      <div className="footer-mono">M&J</div>
      <p className="footer-close">{tr.footer_close}</p>
      <div className="footer-sep" />
      <div className="footer-names">Moni & Jose</div>
      <div className="footer-date">{tr.footer_date}</div>
      <div className="footer-loc">{tr.footer_loc}</div>
    </footer>
  );
};

// ─── FLOATING ─────────────────────────────────────────────────────────────────
const Floating = ({ lang }) => {
  const [mOn, setMOn] = useState(false);
  return (
    <>
      <a className="fab-rsvp" href="#rsvp" onClick={e => { e.preventDefault(); document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" }); }}>
        <Heart size={13} />{T[lang].nav_rsvp}
      </a>
      <div className="fab-music" onClick={() => setMOn(m => !m)} title="Music — coming soon">
        <Music2 size={17} color={mOn ? C.forest : C.sage} />
      </div>
    </>
  );
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("es");
  useReveal();

  return (
    <>
      <GlobalStyles />
      <div className="grain" />
      <Ticker lang={lang} />
      <Hero lang={lang} setLang={setLang} />
      <Story lang={lang} />
      <Album lang={lang} />
      <Timeline lang={lang} />
      <Logistics lang={lang} />
      <Weather lang={lang} />
      <DressCode lang={lang} />
      <Gifts lang={lang} />
      <Upload lang={lang} />
      <RSVP lang={lang} />
      <Footer lang={lang} />
      <Floating lang={lang} />
    </>
  );
}
