/* ============================================================
   A&J IMPORTS MOTORS — index.js
   Lógica principal de la página de inicio.
   
   Secciones:
     1. Datos del catálogo
     2. Renderizado de contenido (cards + artículos)
     3. Tabs del catálogo (Vehículos / Repuestos)
     4. Animaciones de scroll (Reveal)
     5. Formulario de contacto (demo)
     6. Navegación móvil
     7. Modo edición (CMS visual)
     8. Sistema de idioma (ES / EN)
     9. Modo oscuro (Dark / Light)
    10. Inicialización
   ============================================================ */


/* ============================================================
   1. DATOS DEL CATÁLOGO
   ============================================================ */
const vehicles = [
  {
    id: "veh-0",
    name: "Toyota Hilux 2024",
    meta: "12,000 km · 4x4",
    price: "$38,900",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Toyota+Hilux+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Toyota+Hilux+2",
      "https://placehold.co/600x450/b8b8b8/333333?text=Toyota+Hilux+3",
      "https://placehold.co/600x450/a8a8a8/333333?text=Toyota+Hilux+4"
    ]
  },
  {
    id: "veh-1",
    name: "Ford Ranger 2022",
    meta: "28,500 km · 4x2",
    price: "$29,700",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Ford+Ranger+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Ford+Ranger+2",
      "https://placehold.co/600x450/b8b8b8/333333?text=Ford+Ranger+3",
      "https://placehold.co/600x450/a8a8a8/333333?text=Ford+Ranger+4"
    ]
  },
  {
    id: "veh-2",
    name: "Chevrolet Onix 2023",
    meta: "9,200 km · Auto",
    price: "$16,500",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Chevrolet+Onix+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Chevrolet+Onix+2",
      "https://placehold.co/600x450/b8b8b8/333333?text=Chevrolet+Onix+3",
      "https://placehold.co/600x450/a8a8a8/333333?text=Chevrolet+Onix+4"
    ]
  },
  {
    id: "veh-3",
    name: "Kia Sportage 2023",
    meta: "15,300 km · 4x2",
    price: "$27,200",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Kia+Sportage+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Kia+Sportage+2",
      "https://placehold.co/600x450/b8b8b8/333333?text=Kia+Sportage+3",
      "https://placehold.co/600x450/a8a8a8/333333?text=Kia+Sportage+4"
    ]
  },
  {
    id: "veh-4",
    name: "Nissan Frontier 2021",
    meta: "41,000 km · 4x4",
    price: "$24,900",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Nissan+Frontier+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Nissan+Frontier+2",
      "https://placehold.co/600x450/b8b8b8/333333?text=Nissan+Frontier+3",
      "https://placehold.co/600x450/a8a8a8/333333?text=Nissan+Frontier+4"
    ]
  },
  {
    id: "veh-5",
    name: "Hyundai Tucson 2024",
    meta: "6,800 km · Auto",
    price: "$31,400",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Hyundai+Tucson+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Hyundai+Tucson+2",
      "https://placehold.co/600x450/b8b8b8/333333?text=Hyundai+Tucson+3",
      "https://placehold.co/600x450/a8a8a8/333333?text=Hyundai+Tucson+4"
    ]
  }
];

const parts = [
  {
    id: "part-0",
    name: "Filtro de aceite",
    meta: "Compatible Toyota",
    price: "$18",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Filtro+Aceite+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Filtro+Aceite+2"
    ]
  },
  {
    id: "part-1",
    name: "Pastillas de freno",
    meta: "Compatible Ford",
    price: "$46",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Pastillas+Freno+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Pastillas+Freno+2"
    ]
  },
  {
    id: "part-2",
    name: "Amortiguador",
    meta: "Compatible Nissan",
    price: "$120",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Amortiguador+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Amortiguador+2"
    ]
  },
  {
    id: "part-3",
    name: "Correa de distribución",
    meta: "Compatible Kia",
    price: "$65",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Correa+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Correa+2"
    ]
  },
  {
    id: "part-4",
    name: "Batería 12V",
    meta: "Compatible universal",
    price: "$95",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Bateria+12V+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Bateria+12V+2"
    ]
  },
  {
    id: "part-5",
    name: "Radiador",
    meta: "Compatible Hyundai",
    price: "$140",
    images: [
      "https://placehold.co/600x450/d4d4d4/333333?text=Radiador+1",
      "https://placehold.co/600x450/c9c9c9/333333?text=Radiador+2"
    ]
  }
];


const articles = [
  { id: "art-0", date: "16 nov 2026", title: { es: "Cómo elegir el vehículo importado ideal",  en: "How to choose the ideal imported vehicle" } },
  { id: "art-1", date: "15 nov 2026", title: { es: "Guía de aduanas para importación directa", en: "A customs guide to direct importing" } },
  { id: "art-2", date: "14 nov 2026", title: { es: "Financiamiento para vehículos importados", en: "Financing options for imported vehicles" } }
];


/* ============================================================
   2. RENDERIZADO DE CONTENIDO
   Genera las cards de vehículos, repuestos y artículos
   ============================================================ */

/**
 * Genera el HTML de una card de producto.
 * Usa la primera imagen del array `images` como fondo.
 * Si el usuario editó la imagen en modo CMS, esa tiene prioridad.
 * @param {Object} item - Datos del producto (incluye `images`)
 * @param {string} cta - Texto del botón
 * @param {string} badgeTxt - Texto del badge
 * @returns {string} HTML de la card
 */
function cardHTML(item, cta, badgeTxt) {
  // La primera imagen del array como fondo por defecto
  const defaultImg = item.images && item.images[0] ? item.images[0] : '';

  return `
    <a class="card-link block text-inherit no-underline"
       href="producto.html?id=${item.id}">
      <div class="border border-line rounded-xl p-4 bg-card
                  transition-all duration-400 hover:-translate-y-1.5
                  hover:shadow-[0_22px_40px_-18px_rgba(0,0,0,.22)]
                  hover:border-transparent">
        <h4 class="text-[13px] font-bold mb-1"
            data-edit-text="${item.id}-name">${item.name}</h4>
        <div class="text-[10.5px] text-muted mb-3"
             data-edit-text="${item.id}-meta">${item.meta}</div>
        <div class="relative rounded-md overflow-hidden aspect-[4/3] mb-3.5
                    bg-gradient-to-br from-[#d4d4d4] to-[#b8b8b8] img-placeholder
                    bg-cover bg-center"
             data-edit-img="${item.id}-img"
             data-default-img="${defaultImg}"
             style="background-image: url('${defaultImg}');">
          <span class="absolute top-2 right-2 bg-accent text-on-accent
                       text-[8px] font-extrabold tracking-wider px-2 py-1
                       rounded-full">${badgeTxt}</span>
        </div>
        <div class="text-[17px] font-extrabold mb-3"
             data-edit-text="${item.id}-price">${item.price}</div>
        <button class="w-full inline-flex items-center justify-center py-2.5
                       rounded-full text-[11px] font-bold bg-accent
                       text-on-accent hover:opacity-85 transition-opacity"
                type="button">${cta}</button>
      </div>
    </a>`;
}

/**
 * Renderiza todos los grids (vehículos, repuestos, artículos)
 * @param {string} lang - Idioma actual ('es' | 'en')
 */
function renderContent(lang) {
  const cta1 = lang === 'en' ? 'Book' : 'Reservar';
  const cta2 = lang === 'en' ? 'Inquire' : 'Consultar';
  const badgeTxt = lang === 'en' ? 'Sale' : 'Oferta';

  // Vehículos
  document.getElementById('vehiclesGrid').innerHTML =
    vehicles.map(v => cardHTML(v, cta1, badgeTxt)).join('');

  // Repuestos
  document.getElementById('partsGrid').innerHTML =
    parts.map(p => cardHTML(p, cta2, badgeTxt)).join('');

  // Artículos
  document.getElementById('articlesGrid').innerHTML =
    articles.map(a => `
      <div class="border border-line rounded-xl overflow-hidden bg-card
                  transition-all duration-400 hover:-translate-y-1.5
                  hover:shadow-[0_22px_40px_-18px_rgba(0,0,0,.2)]">
        <div class="aspect-[16/10] bg-gradient-to-br from-[#d4d4d4] to-[#b8b8b8]
                    img-placeholder"
             data-edit-img="${a.id}-img"></div>
        <div class="p-5">
          <div class="text-[10px] font-bold tracking-wider text-muted mb-2.5
                      uppercase"
               data-edit-text="${a.id}-date">${a.date}</div>
          <h4 class="text-[15px] font-bold leading-snug"
              data-edit-text="${a.id}-title">${a.title[lang]}</h4>
        </div>
      </div>
    `).join('');
}


/* ============================================================
   3. TABS DEL CATÁLOGO (Vehículos / Repuestos)
   ============================================================ */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Actualizar tab activo
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Mostrar/ocultar grids
    const target = tab.dataset.tab;
    document.getElementById('vehiclesGrid').classList.toggle('hidden', target !== 'vehicles');
    document.getElementById('partsGrid').classList.toggle('hidden', target !== 'parts');
  });
});


/* ============================================================
   4. ANIMACIONES DE SCROLL (Reveal on scroll)
   Usa IntersectionObserver para añadir clase .in
   ============================================================ */
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .service-item').forEach(el => {
  scrollObserver.observe(el);
});


/* ============================================================
   5. FORMULARIO DE CONTACTO (Demo)
   Simula envío. Integrar con Formspree/EmailJS para producción.
   ============================================================ */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = translations['form-sent'][currentLang];
  setTimeout(() => {
    btn.textContent = translations['btn-enviar'][currentLang];
    this.reset();
  }, 1800);
});


/* ============================================================
   6. NAVEGACIÓN MÓVIL (Hamburguesa)
   ============================================================ */
document.querySelector('.nav-toggle').addEventListener('click', function() {
  const links = document.querySelector('.nav-links');
  const isOpen = links.style.display === 'flex';

  if (isOpen) {
    links.style.display = 'none';
  } else {
    links.style.cssText = `
      display: flex;
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      background: #111;
      flex-direction: column;
      padding: 20px 24px;
      gap: 18px;
    `;
  }
});


/* ============================================================
   7. MODO EDICIÓN (CMS Visual sin base de datos)
   Permite editar textos e imágenes, guardar en localStorage
   y exportar el HTML modificado.
   ============================================================ */
const EDIT_KEY = 'ajSiteEdits';
const editBtn = document.getElementById('editToggleBtn');
const toolbar = document.getElementById('editToolbar');
const fileInput = document.getElementById('imgFileInput');
const statusEl = document.getElementById('editStatus');
let activeImgTarget = null;
let editModeOn = false;

/** Carga los cambios guardados desde localStorage */
function loadEdits() {
  try { return JSON.parse(localStorage.getItem(EDIT_KEY) || '{}'); }
  catch (e) { return {}; }
}

/** Aplica los cambios guardados al DOM */
function applyEdits(edits) {
  if (!edits) return;

  // Aplicar textos
  Object.entries(edits.texts || {}).forEach(([id, html]) => {
    const el = document.querySelector(`[data-edit-text="${id}"]`);
    if (el) el.innerHTML = html;
  });

  // Aplicar imágenes
  Object.entries(edits.images || {}).forEach(([id, dataUrl]) => {
    const el = document.querySelector(`[data-edit-img="${id}"]`);
    if (el) {
      el.style.backgroundImage = `url(${dataUrl})`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    }
  });
}

/** Activa/desactiva el modo edición visual */
function toggleEditMode(on) {
  document.body.classList.toggle('edit-mode', on);
  toolbar.style.display = on ? 'flex' : 'none';
  document.querySelectorAll('[data-edit-text]').forEach(el => {
    el.setAttribute('contenteditable', on ? 'true' : 'false');
  });
}

// Toggle modo edición
editBtn.addEventListener('click', () => {
  editModeOn = !editModeOn;
  toggleEditMode(editModeOn);
});

// Evitar navegación en cards mientras se edita
document.addEventListener('click', (e) => {
  if (editModeOn && e.target.closest('.card-link')) {
    e.preventDefault();
  }
}, true);

// Clic en imagen editable → abrir selector de archivo
document.addEventListener('click', (e) => {
  if (!editModeOn) return;
  const target = e.target.closest('[data-edit-img]');
  if (target) {
    activeImgTarget = target;
    fileInput.click();
  }
});

// Procesar imagen seleccionada
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file || !activeImgTarget) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const dataUrl = ev.target.result;
    activeImgTarget.style.backgroundImage = `url(${dataUrl})`;
    activeImgTarget.style.backgroundSize = 'cover';
    activeImgTarget.style.backgroundPosition = 'center';
    activeImgTarget.dataset.pendingImg = dataUrl;
    statusEl.textContent = 'Imagen actualizada. No olvides guardar o descargar.';
  };
  reader.readAsDataURL(file);
  fileInput.value = '';
});

/** Recopila el estado actual del DOM (textos + imágenes) */
function collectCurrentState() {
  const texts = {};
  document.querySelectorAll('[data-edit-text]').forEach(el => {
    texts[el.getAttribute('data-edit-text')] = el.innerHTML;
  });

  const images = {};
  document.querySelectorAll('[data-edit-img]').forEach(el => {
    if (el.dataset.pendingImg) {
      images[el.getAttribute('data-edit-img')] = el.dataset.pendingImg;
    }
  });

  // Conservar imágenes guardadas previamente
  const prev = loadEdits();
  if (prev.images) {
    Object.entries(prev.images).forEach(([id, url]) => {
      if (!(id in images)) images[id] = url;
    });
  }

  return { texts, images };
}

// Guardar cambios
document.getElementById('etSave').addEventListener('click', () => {
  const state = collectCurrentState();
  try {
    localStorage.setItem(EDIT_KEY, JSON.stringify(state));
    statusEl.textContent = 'Cambios guardados en este navegador ✓';
  } catch (e) {
    statusEl.textContent = 'Error al guardar. Usa "Descargar HTML".';
  }
});

// Restablecer todo
document.getElementById('etReset').addEventListener('click', () => {
  if (!confirm('¿Restablecer todos los textos e imágenes a su versión original?')) return;
  try { localStorage.removeItem(EDIT_KEY); } catch (e) {}
  location.reload();
});

// Exportar HTML
document.getElementById('etExport').addEventListener('click', () => {
  const clone = document.documentElement.cloneNode(true);
  clone.querySelector('body').classList.remove('edit-mode');
  clone.querySelectorAll('[data-edit-text]').forEach(el =>
    el.removeAttribute('contenteditable')
  );

  const html = '<!DOCTYPE html>\n' + clone.outerHTML;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  statusEl.textContent = 'HTML descargado con los cambios aplicados ✓';
});


/* ============================================================
   8. SISTEMA DE IDIOMA (ES / EN)
   Traducciones dinámicas usando atributos data-i18n
   ============================================================ */
const translations = {
  // Hero
  'hero-eyebrow':  { es: "Vehículos importados de confianza", en: "Trusted imported vehicles" },
  'hero-h1':       { es: "Importa tu próximo vehículo, sin complicaciones", en: "Import your next vehicle, hassle-free" },
  'hero-p':        { es: "Catálogo actualizado, garantía incluida y asesoría completa en cada etapa del proceso de importación.", en: "An up-to-date catalog, included warranty, and full guidance through every step of the import process." },
  'hero-cta':      { es: "Explorar catálogo", en: "Explore catalog" },

  // About
  'about-eyebrow': { es: "Quiénes somos", en: "About us" },
  'about-h2':      { es: "Sobre A&J Imports", en: "About A&J Imports" },
  'about-p':       { es: "Más de una década conectando clientes con vehículos y repuestos importados, con procesos claros y seguimiento en cada etapa.", en: "Over a decade connecting customers with imported vehicles and parts, with clear processes and follow-up at every step." },
  'about-feat-1':  { es: "Selección de vehículos de lujo", en: "Curated selection of premium vehicles" },
  'about-feat-2':  { es: "Entrega rápida y seguimiento", en: "Fast delivery and follow-up" },
  'about-cta':     { es: "Conocer más", en: "Learn more" },

  // Catálogo
  'cat-eyebrow':   { es: "Recomendados para ti", en: "Recommended for you" },
  'cat-h2':        { es: "Nuestra colección de vehículos premium", en: "Our premium vehicle collection" },
  'tab-vehiculos': { es: "Vehículos", en: "Vehicles" },
  'tab-repuestos': { es: "Repuestos", en: "Parts" },
  'chip-tipo':     { es: "Tipo", en: "Type" },
  'chip-precio':   { es: "Precio", en: "Price" },
  'chip-marca':    { es: "Marca", en: "Brand" },
  'chip-nuevousado': { es: "Nuevo / usado", en: "New / used" },

  // Banner
  'banner-eyebrow': { es: "Cotización fácil", en: "Easy quoting" },
  'banner-h3':      { es: "Inicia tu proceso de importación aquí", en: "Start your import process here" },
  'banner-p':       { es: "Cotiza tu vehículo o repuesto en minutos, sin compromiso.", en: "Get a quote for your vehicle or part in minutes, no commitment." },
  'banner-cta':     { es: "Solicitar importación", en: "Request import" },

  // Servicios
  'serv-eyebrow': { es: "Recomendados", en: "Recommended" },
  'serv-h2':      { es: "Nuestros servicios de importación", en: "Our import services" },
  'serv-1-h4':    { es: "Precios competitivos", en: "Competitive pricing" },
  'serv-1-p':     { es: "Tarifas claras y transparentes en cada importación, sin costos ocultos.", en: "Clear, transparent rates on every import, with no hidden costs." },
  'serv-2-h4':    { es: "Variedad de vehículos", en: "Wide vehicle range" },
  'serv-2-p':     { es: "Autos, carga, motos y maquinaria disponibles bajo pedido o en inventario.", en: "Cars, trucks, motorcycles and machinery available on request or in stock." },
  'serv-3-h4':    { es: "Soporte 24/7", en: "24/7 support" },
  'serv-3-p':     { es: "Acompañamiento durante todo el proceso de aduana y entrega.", en: "Support throughout the entire customs and delivery process." },

  // Artículos
  'art-eyebrow':      { es: "Últimos artículos", en: "Latest articles" },
  'art-h2':           { es: "Novedades del sector automotriz", en: "Automotive industry news" },
  'art-p':            { es: "Guías y noticias sobre importación de vehículos y repuestos.", en: "Guides and news on importing vehicles and parts." },
  'btn-articles-cta': { es: "Nuestros servicios", en: "Our services" },

  // Contacto
  'contact-eyebrow': { es: "Contacto", en: "Contact" },
  'contact-h2':      { es: "Hablémoslo", en: "Let's talk" },
  'field-nombre':    { es: "Nombre", en: "Name" },
  'field-correo':    { es: "Correo", en: "Email" },
  'field-telefono':  { es: "Teléfono", en: "Phone" },
  'field-mensaje':   { es: "Mensaje", en: "Message" },
  'ph-nombre':       { es: "Tu nombre", en: "Your name" },
  'ph-mensaje':      { es: "Cuéntanos qué vehículo o repuesto buscas", en: "Tell us what vehicle or part you're looking for" },
  'btn-enviar':      { es: "Enviar", en: "Send" },
  'form-sent':       { es: "Enviado ✓", en: "Sent ✓" },
  'map-label':       { es: "MAPA / UBICACIÓN", en: "MAP / LOCATION" },

  // Navegación
  'nav-inicio':    { es: "Inicio", en: "Home" },
  'nav-nosotros':  { es: "Nosotros", en: "About" },
  'nav-catalogo':  { es: "Catálogo", en: "Catalog" },
  'nav-servicios': { es: "Servicios", en: "Services" },
  'nav-contacto':  { es: "Contacto", en: "Contact" },
  'nav-cta':       { es: "Reservar test drive", en: "Book a test drive" },

  // Footer
  'footer-desc':      { es: "Vehículos y repuestos importados, con garantía y soporte completo.", en: "Imported vehicles and parts, with full warranty and support." },
  'footer-col-links': { es: "Enlaces", en: "Links" },
  'footer-col-support': { es: "Soporte", en: "Support" },
  'footer-col-follow':  { es: "Síguenos", en: "Follow us" },
  'footer-blog':      { es: "Blog", en: "Blog" },
  'footer-precios':   { es: "Precios", en: "Pricing" },
  'footer-preguntas': { es: "Preguntas", en: "FAQ" },
  'footer-terms':     { es: "Términos", en: "Terms" },
  'footer-privacy':   { es: "Privacidad", en: "Privacy" }
};

let currentLang = 'es';

/** Aplica las traducciones al DOM */
function applyLanguage(lang) {
  document.documentElement.lang = lang;

  // Textos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.textContent = translations[key][lang];
  });

  // Placeholders con data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key]) el.setAttribute('placeholder', translations[key][lang]);
  });

  // Botón de idioma
  document.getElementById('langToggle').textContent = lang === 'es' ? 'EN' : 'ES';
}

/** Cambia el idioma completo */
function setLang(lang) {
  currentLang = lang;
  renderContent(lang);
  applyLanguage(lang);
  try { applyEdits(loadEdits()); } catch (e) {}
  try { localStorage.setItem('ajLang', lang); } catch (e) {}
}


/* ============================================================
   9. MODO OSCURO (Dark / Light)
   Toggle de clase .dark en <body>
   ============================================================ */
let currentDark = false;

/** Activa/desactiva el modo oscuro */
function setDark(on) {
  document.body.classList.toggle('dark', on);
  document.getElementById('darkToggle').textContent = on ? '☀️' : '🌙';
  currentDark = on;
  try { localStorage.setItem('ajDark', on ? '1' : '0'); } catch (e) {}
}


/* ============================================================
   10. INICIALIZACIÓN
   Carga preferencias guardadas y renderiza todo
   ============================================================ */
(function init() {
  // Cargar preferencias de localStorage
  try {
    const savedLang = localStorage.getItem('ajLang');
    if (savedLang) currentLang = savedLang;

    const savedDark = localStorage.getItem('ajDark');
    if (savedDark) currentDark = savedDark === '1';
  } catch (e) {
    // localStorage no disponible
  }

  // Event listeners de toggles
  document.getElementById('langToggle').addEventListener('click', () =>
    setLang(currentLang === 'es' ? 'en' : 'es')
  );
  document.getElementById('darkToggle').addEventListener('click', () =>
    setDark(!currentDark)
  );

  // Aplicar estado inicial
  setLang(currentLang);
  setDark(currentDark);
})();

/* ============================================================
   11. SPLASH SCREEN (Preloader)
   Espera a que todo el contenido cargue (imágenes, fuentes)
   y luego desvanece el splash para mostrar la página.
   ============================================================ */
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  if (!splash) return;

  // Pequeño delay para que el usuario vea el logo al menos 800ms
  setTimeout(() => {
    splash.classList.add('fade-out');
    document.body.classList.remove('loading');

    // Remover del DOM después de la animación (0.8s)
    setTimeout(() => splash.remove(), 800);
  }, 800);
});