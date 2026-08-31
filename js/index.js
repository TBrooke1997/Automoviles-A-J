/* ============================================================
   A&J IMPORTS MOTORS — index.js
   Versión con carrusel y enfoque en importación bajo pedido
   ============================================================ */

// 1. DATOS DEL CATÁLOGO (Vehículos de referencia)
const vehicles = [
  {
    id: "veh-0",
    name: "Toyota Hilux 2024",
    meta: "12,000 km · 4x4 · Diésel",
    price: "$38,900",
    desc: "Camioneta doble cabina 4x4, único dueño, mantenimientos al día. Incluye garantía de fábrica vigente.",
    images: ["https://placehold.co/800x600/d4d4d4/333333?text=Toyota+Hilux+2024"]
  },
  {
    id: "veh-1",
    name: "Ford Ranger 2022",
    meta: "28,500 km · 4x2 · Gasolina",
    price: "$29,700",
    desc: "Pick-up confiable, ideal para trabajo y ciudad. Revisión mecánica reciente y neumáticos nuevos.",
    images: ["https://placehold.co/800x600/c9c9c9/333333?text=Ford+Ranger+2022"]
  },
  {
    id: "veh-2",
    name: "Chevrolet Onix 2023",
    meta: "9,200 km · Auto · Gasolina",
    price: "$16,500",
    desc: "Sedán económico, bajo kilometraje, ideal como primer vehículo. Equipamiento completo.",
    images: ["https://placehold.co/800x600/b8b8b8/333333?text=Chevrolet+Onix+2023"]
  },
  {
    id: "veh-3",
    name: "Kia Sportage 2023",
    meta: "15,300 km · 4x2 · Gasolina",
    price: "$27,200",
    desc: "SUV compacta, espaciosa y eficiente, perfecta para familia. Tecnología de seguridad avanzada.",
    images: ["https://placehold.co/800x600/a8a8a8/333333?text=Kia+Sportage+2023"]
  },
  {
    id: "veh-4",
    name: "Nissan Frontier 2021",
    meta: "41,000 km · 4x4 · Diésel",
    price: "$24,900",
    desc: "Camioneta robusta con buen historial de mantenimiento. Lista para cualquier terreno.",
    images: ["https://placehold.co/800x600/9a9a9a/333333?text=Nissan+Frontier+2021"]
  },
  {
    id: "veh-5",
    name: "Hyundai Tucson 2024",
    meta: "6,800 km · Auto · Gasolina",
    price: "$31,400",
    desc: "SUV casi nueva, equipamiento completo y bajo uso. Garantía extendida disponible.",
    images: ["https://placehold.co/800x600/8a8a8a/333333?text=Hyundai+Tucson+2024"]
  }
];

// ============================================================
// CARRUSEL (Un vehículo a la vez, estructura corregida)
// ============================================================
let currentSlide = 0;
let carouselInterval;

function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const indicators = document.getElementById('carouselIndicators');
  
  if (!track) return;

  // Generar slides con estructura de 2 columnas (Info izquierda, Imagen derecha)
  track.innerHTML = vehicles.map(v => `
    <div class="carousel-slide">
      <div class="carousel-card">
        <div class="grid">
          <!-- Columna izquierda: Información -->
          <div class="carousel-info">
            <h4>${v.name}</h4>
            <p class="desc">${v.desc}</p>
            <div class="price">${v.price}</div>
            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>

          <!-- Columna derecha: Imagen + Botón -->
          <div class="carousel-image-col">
            <a href="producto.html?id=${v.id}" class="carousel-image" style="background-image: url('${v.images[0]}')" title="Ver detalles de ${v.name}"></a>
            <a href="producto.html?id=${v.id}" class="carousel-btn-ver-mas">
              Ver más
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Generar indicadores
  indicators.innerHTML = vehicles.map((_, i) => `
    <button class="${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Ir al slide ${i + 1}"></button>
  `).join('');

  updateCarousel();
  startCarouselAuto();
}

function updateCarousel() {
  const track = document.getElementById('carouselTrack');
  const indicators = document.querySelectorAll('#carouselIndicators button');
  
  if (!track) return;

  const totalSlides = vehicles.length;
  
  if (currentSlide >= totalSlides) currentSlide = 0;
  if (currentSlide < 0) currentSlide = totalSlides - 1;

  const offset = -currentSlide * 100;
  track.style.transform = `translateX(${offset}%)`;

  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === currentSlide);
  });
}

function startCarouselAuto() {
  carouselInterval = setInterval(() => {
    currentSlide++;
    updateCarousel();
  }, 6000);
}

function stopCarouselAuto() {
  clearInterval(carouselInterval);
}

// Event listeners del carrusel
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide--;
      updateCarousel();
      stopCarouselAuto();
      startCarouselAuto();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide++;
      updateCarousel();
      stopCarouselAuto();
      startCarouselAuto();
    });
  }

  // Clic en indicadores
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#carouselIndicators button');
    if (btn) {
      currentSlide = parseInt(btn.dataset.slide);
      updateCarousel();
      stopCarouselAuto();
      startCarouselAuto();
    }
  });
});
// 3. TABS
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const target = tab.dataset.tab;
    const vehiclesCarousel = document.getElementById('vehiclesCarousel');
    const partsSection = document.getElementById('partsSection');
    
    if (target === 'vehicles') {
      vehiclesCarousel.classList.remove('hidden');
      partsSection.classList.add('hidden');
      startCarouselAuto();
    } else {
      vehiclesCarousel.classList.add('hidden');
      partsSection.classList.remove('hidden');
      stopCarouselAuto();
    }
  });
});

// 4. CONTROLES DEL CARRUSEL
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide--;
      updateCarousel();
      stopCarouselAuto();
      startCarouselAuto();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide++;
      updateCarousel();
      stopCarouselAuto();
      startCarouselAuto();
    });
  }

  // Indicadores
  document.addEventListener('click', (e) => {
    if (e.target.closest('#carouselIndicators button')) {
      const slide = parseInt(e.target.closest('button').dataset.slide);
      currentSlide = slide;
      updateCarousel();
      stopCarouselAuto();
      startCarouselAuto();
    }
  });
});

// 5. SCROLL REVEAL
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal, .service-card').forEach(el => io.observe(el));
});

// 6. FORMULARIO
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = translations['form-sent'][currentLang];
      setTimeout(() => {
        btn.textContent = originalText;
        this.reset();
      }, 1800);
    });
  }
});

// 7. NAVEGACIÓN MÓVIL
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.style.display === 'flex';
      links.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        links.classList.add('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'right-0', 'bg-[#111]', 'p-5', 'gap-4');
      } else {
        links.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'right-0', 'bg-[#111]', 'p-5', 'gap-4');
      }
    });
  }
});

// 8. TRADUCCIONES
const translations = {
  'hero-eyebrow': { es: "Importación y comercialización integral", en: "Comprehensive import and distribution" },
  'hero-h1': { es: "Tu aliado en importación de vehículos y autopartes", en: "Your partner in vehicle and auto parts import" },
  'hero-p': { es: "Compra, venta, distribución y comercialización de vehículos nacionales e importados, maquinaria pesada, autopartes y servicios técnicos especializados. Importamos bajo pedido con garantía y asesoría completa.", en: "Purchase, sale, distribution and marketing of national and imported vehicles, heavy machinery, auto parts and specialized technical services. We import on request with warranty and full support." },
  'hero-cta': { es: "Ver referencias", en: "View references" },
  'hero-cta-2': { es: "Cotizar ahora", en: "Get a quote" },
  'about-eyebrow': { es: "Quiénes somos", en: "About us" },
  'about-h2': { es: "A&J Imports Motors C.A.", en: "A&J Imports Motors C.A." },
  'about-p': { es: "Empresa dedicada a la importación, exportación, distribución y comercialización de vehículos automotores, maquinaria pesada, autopartes y servicios técnicos especializados. Conectamos a nuestros clientes con las mejores marcas nacionales e internacionales.", en: "Company dedicated to the import, export, distribution and marketing of motor vehicles, heavy machinery, auto parts and specialized technical services. We connect our clients with the best national and international brands." },
  'about-feat-1': { es: "Importación bajo pedido", en: "Import on request" },
  'about-feat-2': { es: "Garantía y post-venta", en: "Warranty and after-sales" },
  'about-feat-3': { es: "Asesoría integral", en: "Comprehensive consulting" },
  'about-cta': { es: "Contáctanos", en: "Contact us" },
  'serv-eyebrow': { es: "Nuestro objeto social", en: "Our business scope" },
  'serv-h2': { es: "Servicios integrales del sector automotriz", en: "Comprehensive automotive services" },
  'serv-veh-title': { es: "Vehículos Automotores", en: "Motor Vehicles" },
  'serv-veh-desc': { es: "Compra, venta, distribución, comercialización, importación y exportación de todo tipo de vehículos: nacionales o importados, de carga, particulares, colectivos, motocicletas y vehículos eléctricos.", en: "Purchase, sale, distribution, marketing, import and export of all types of vehicles: national or imported, cargo, private, collective, motorcycles and electric vehicles." },
  'serv-maq-title': { es: "Maquinaria Pesada", en: "Heavy Machinery" },
  'serv-maq-desc': { es: "Importación y comercialización de maquinaria pesada, agrícola e industrial para todo tipo de proyectos y sectores productivos.", en: "Import and marketing of heavy, agricultural and industrial machinery for all types of projects and productive sectors." },
  'serv-trans-title': { es: "Servicios de Transporte", en: "Transport Services" },
  'serv-trans-desc': { es: "Prestamos servicio de transporte de vehículos pesados, transporte de personal y servicio de transporte ejecutivo con los más altos estándares de calidad.", en: "We provide heavy vehicle transport, personnel transport and executive transport services with the highest quality standards." },
  'serv-part-title': { es: "Suministros y Autopartes", en: "Supplies and Auto Parts" },
  'serv-part-desc': { es: "Importación, exportación, distribución y venta al mayor y detal de partes, piezas, repuestos, accesorios y herramientas automotrices y de motos de cualquier marca.", en: "Import, export, distribution and wholesale and retail sale of parts, pieces, spare parts, accessories and automotive and motorcycle tools of any brand." },
  'serv-tec-title': { es: "Servicios Técnicos", en: "Technical Services" },
  'serv-tec-desc': { es: "Prestación de servicios de mantenimiento preventivo y correctivo, mecánica general, latonería, pintura, escaneo electrónico, blindaje y servicios de post-venta.", en: "Provision of preventive and corrective maintenance services, general mechanics, bodywork, painting, electronic scanning, armor plating and after-sales services." },
  'serv-rep-title': { es: "Representación y Alianzas", en: "Representation and Partnerships" },
  'serv-rep-desc': { es: "Representación de marcas nacionales o extranjeras, gestión de concesionarios y establecimiento de alianzas comerciales estratégicas.", en: "Representation of national or foreign brands, dealership management and establishment of strategic business alliances." },
  'cat-eyebrow': { es: "Importación bajo pedido", en: "Import on request" },
  'cat-h2': { es: "Vehículos de referencia", en: "Reference vehicles" },
  'cat-desc': { es: "Estos son ejemplos de vehículos que podemos importar para ti. Contáctanos y cotizamos el que necesites.", en: "These are examples of vehicles we can import for you. Contact us and we'll quote the one you need." },
  'tab-vehiculos': { es: "Vehículos", en: "Vehicles" },
  'tab-repuestos': { es: "Repuestos", en: "Auto Parts" },
  'parts-title': { es: "¿Necesitas repuestos o autopartes?", en: "Need auto parts or supplies?" },
  'parts-desc': { es: "Importamos y distribuimos partes, piezas, repuestos, accesorios y herramientas automotrices de cualquier marca bajo pedido. Contáctanos y te enviamos una cotización personalizada.", en: "We import and distribute parts, pieces, spare parts, accessories and automotive tools of any brand on request. Contact us and we'll send you a personalized quote." },
  'parts-cta': { es: "Solicitar cotización", en: "Request a quote" },
  'banner-eyebrow': { es: "Cotización sin compromiso", en: "No-obligation quote" },
  'banner-h3': { es: "Inicia tu proceso de importación hoy mismo", en: "Start your import process today" },
  'banner-p': { es: "Cotiza tu vehículo, maquinaria o repuestos en minutos. Te asesoramos en todo el proceso.", en: "Get a quote for your vehicle, machinery or parts in minutes. We'll guide you through the entire process." },
  'banner-cta': { es: "Solicitar importación", en: "Request import" },
  'contact-eyebrow': { es: "Contacto", en: "Contact" },
  'contact-h2': { es: "Hablemos de tu proyecto", en: "Let's talk about your project" },
  'nav-inicio': { es: "Inicio", en: "Home" },
  'nav-nosotros': { es: "Nosotros", en: "About" },
  'nav-servicios': { es: "Servicios", en: "Services" },
  'nav-catalogo': { es: "Catálogo", en: "Catalog" },
  'nav-contacto': { es: "Contacto", en: "Contact" },
  'nav-cta': { es: "Solicitar importación", en: "Request import" },
  'field-nombre': { es: "Nombre", en: "Name" },
  'field-correo': { es: "Correo", en: "Email" },
  'field-telefono': { es: "Teléfono", en: "Phone" },
  'field-mensaje': { es: "Mensaje", en: "Message" },
  'ph-nombre': { es: "Tu nombre", en: "Your name" },
  'ph-mensaje': { es: "Cuéntanos qué vehículo, maquinaria o repuesto necesitas importar", en: "Tell us what vehicle, machinery or part you need to import" },
  'btn-enviar': { es: "Enviar", en: "Send" },
  'form-sent': { es: "Enviado ✓", en: "Sent ✓" },
  'map-label': { es: "MAPA / UBICACIÓN", en: "MAP / LOCATION" },
  'footer-desc': { es: "Importación, distribución y comercialización de vehículos, maquinaria y autopartes.", en: "Import, distribution and marketing of vehicles, machinery and auto parts." },
  'footer-col-links': { es: "Enlaces", en: "Links" },
  'footer-col-support': { es: "Soporte", en: "Support" },
  'footer-col-follow': { es: "Síguenos", en: "Follow us" },
  'footer-catalogo': { es: "Catálogo", en: "Catalog" },
  'footer-cotizar': { es: "Cotizar", en: "Get a quote" },
  'footer-preguntas': { es: "Preguntas frecuentes", en: "FAQ" },
  'footer-terms': { es: "Términos", en: "Terms" },
  'footer-privacy': { es: "Privacidad", en: "Privacy" }
};

let currentLang = 'es';
let currentDark = false;

try {
  const savedLang = localStorage.getItem('ajLang');
  if (savedLang) currentLang = savedLang;
  const savedDark = localStorage.getItem('ajDark');
  if (savedDark) currentDark = savedDark === '1';
} catch (e) {}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.textContent = translations[key][lang];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key]) el.setAttribute('placeholder', translations[key][lang]);
  });
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
}

function setLang(lang) {
  currentLang = lang;
  applyLanguage(lang);
  try { localStorage.setItem('ajLang', lang); } catch (e) {}
}

function setDark(on) {
  document.body.classList.toggle('dark', on);
  const darkBtn = document.getElementById('darkToggle');
  if (darkBtn) darkBtn.textContent = on ? '☀️' : '🌙';
  currentDark = on;
  try { localStorage.setItem('ajDark', on ? '1' : '0'); } catch (e) {}
}

// 9. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  // Splash screen
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      document.body.classList.remove('loading');
      setTimeout(() => splash.remove(), 900);
    }, 1200);
  }

  // Inicializar carrusel
  initCarousel();

  // Event listeners
  const langToggle = document.getElementById('langToggle');
  const darkToggle = document.getElementById('darkToggle');
  
  if (langToggle) langToggle.addEventListener('click', () => setLang(currentLang === 'es' ? 'en' : 'es'));
  if (darkToggle) darkToggle.addEventListener('click', () => setDark(!currentDark));

  // Aplicar estado inicial
  setLang(currentLang);
  setDark(currentDark);

  // Responsive carousel
  window.addEventListener('resize', () => {
    updateCarousel();
  });
});