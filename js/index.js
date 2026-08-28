// ---- data ----
  const vehicles = [
    {id:"veh-0", name:"Toyota Hilux 2024", meta:"12,000 km · 4x4", price:"$38,900"},
    {id:"veh-1", name:"Ford Ranger 2022", meta:"28,500 km · 4x2", price:"$29,700"},
    {id:"veh-2", name:"Chevrolet Onix 2023", meta:"9,200 km · Auto", price:"$16,500"},
    {id:"veh-3", name:"Kia Sportage 2023", meta:"15,300 km · 4x2", price:"$27,200"},
    {id:"veh-4", name:"Nissan Frontier 2021", meta:"41,000 km · 4x4", price:"$24,900"},
    {id:"veh-5", name:"Hyundai Tucson 2024", meta:"6,800 km · Auto", price:"$31,400"}
  ];
  const parts = [
    {id:"part-0", name:"Filtro de aceite", meta:"Compatible Toyota", price:"$18"},
    {id:"part-1", name:"Pastillas de freno", meta:"Compatible Ford", price:"$46"},
    {id:"part-2", name:"Amortiguador", meta:"Compatible Nissan", price:"$120"},
    {id:"part-3", name:"Correa de distribución", meta:"Compatible Kia", price:"$65"},
    {id:"part-4", name:"Batería 12V", meta:"Compatible universal", price:"$95"},
    {id:"part-5", name:"Radiador", meta:"Compatible Hyundai", price:"$140"}
  ];
  const articles = [
    {id:"art-0", date:"16 nov 2026", title:{es:"Cómo elegir el vehículo importado ideal", en:"How to choose the ideal imported vehicle"}},
    {id:"art-1", date:"15 nov 2026", title:{es:"Guía de aduanas para importación directa", en:"A customs guide to direct importing"}},
    {id:"art-2", date:"14 nov 2026", title:{es:"Financiamiento para vehículos importados", en:"Financing options for imported vehicles"}}
  ];

  function cardHTML(item, cta, badgeTxt){
    return `<a class="card-link" href="producto.html?id=${item.id}">
    <div class="card">
      <h4 data-edit-text="${item.id}-name">${item.name}</h4>
      <div class="meta" data-edit-text="${item.id}-meta">${item.meta}</div>
      <div class="card-img" data-edit-img="${item.id}-img"><span class="badge">${badgeTxt}</span></div>
      <div class="price" data-edit-text="${item.id}-price">${item.price}</div>
      <button class="btn btn-dark" type="button" onclick="location.href='producto.html?id=${item.id}'">${cta}</button>
    </div></a>`;
  }

  function renderContent(lang){
    const cta1 = lang === 'en' ? 'Book' : 'Reservar';
    const cta2 = lang === 'en' ? 'Inquire' : 'Consultar';
    const badgeTxt = lang === 'en' ? 'Sale' : 'Oferta';
    document.getElementById('vehiclesGrid').innerHTML = vehicles.map(v => cardHTML(v, cta1, badgeTxt)).join('');
    document.getElementById('partsGrid').innerHTML = parts.map(p => cardHTML(p, cta2, badgeTxt)).join('');
    document.getElementById('articlesGrid').innerHTML = articles.map(a => `
      <div class="article-card">
        <div class="article-img" data-edit-img="${a.id}-img"></div>
        <div class="article-body">
          <div class="article-date" data-edit-text="${a.id}-date">${a.date}</div>
          <h4 data-edit-text="${a.id}-title">${a.title[lang]}</h4>
        </div>
      </div>`).join('');
  }

  // ---- scroll reveal ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.15});
  document.querySelectorAll('.reveal, .service-item').forEach(el => io.observe(el));

  // ---- contact form (demo only) ----
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.textContent = translations['form-sent'][currentLang];
    setTimeout(() => { btn.textContent = translations['btn-enviar'][currentLang]; this.reset(); }, 1800);
  });

  // ---- mobile nav toggle (simple show/hide) ----
  document.querySelector('.nav-toggle').addEventListener('click', function(){
    const links = document.querySelector('.nav-links');
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? 'none' : 'flex';
    links.style.cssText += isOpen ? '' : 'position:absolute;top:64px;left:0;right:0;background:#111;flex-direction:column;padding:20px 24px;gap:18px;';
  });

  // ==================================================================
  // ---- EDITOR: modo edición sin base de datos (localStorage + export) ----
  // ==================================================================
  const EDIT_KEY = 'ajSiteEdits';
  const editBtn = document.getElementById('editToggleBtn');
  const toolbar = document.getElementById('editToolbar');
  const fileInput = document.getElementById('imgFileInput');
  const statusEl = document.getElementById('editStatus');
  let activeImgTarget = null;

  function loadEdits(){
    try{ return JSON.parse(localStorage.getItem(EDIT_KEY) || '{}'); }
    catch(e){ return {}; }
  }

  function applyEdits(edits){
    if(!edits) return;
    Object.entries(edits.texts || {}).forEach(([id, html]) => {
      const el = document.querySelector(`[data-edit-text="${id}"]`);
      if(el) el.innerHTML = html;
    });
    Object.entries(edits.images || {}).forEach(([id, dataUrl]) => {
      const el = document.querySelector(`[data-edit-img="${id}"]`);
      if(el) el.style.backgroundImage = `url(${dataUrl})`;
      if(id === 'hero-bg' || id === 'banner-bg'){
        if(el) el.style.backgroundSize = 'cover';
        if(el) el.style.backgroundPosition = 'center';
      }
    });
  }

  // (los cambios guardados se aplican al final, junto con el idioma y el tema)

  function toggleEditMode(on){
    document.body.classList.toggle('edit-mode', on);
    toolbar.style.display = on ? 'flex' : 'none';
    document.querySelectorAll('[data-edit-text]').forEach(el => {
      el.setAttribute('contenteditable', on ? 'true' : 'false');
    });
  }
  let editModeOn = false;
  editBtn.addEventListener('click', () => {
    editModeOn = !editModeOn;
    toggleEditMode(editModeOn);
  });

  // evitar que las cards naveguen mientras se está editando
  document.addEventListener('click', (e) => {
    if(editModeOn && e.target.closest('.card-link')){
      e.preventDefault();
    }
  }, true);

  // clic en imagen editable -> abrir selector de archivo
  document.addEventListener('click', (e) => {
    if(!editModeOn) return;
    const target = e.target.closest('[data-edit-img]');
    if(target){
      activeImgTarget = target;
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file || !activeImgTarget) return;
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

  function collectCurrentState(){
    const texts = {};
    document.querySelectorAll('[data-edit-text]').forEach(el => {
      texts[el.getAttribute('data-edit-text')] = el.innerHTML;
    });
    const images = {};
    document.querySelectorAll('[data-edit-img]').forEach(el => {
      if(el.dataset.pendingImg){
        images[el.getAttribute('data-edit-img')] = el.dataset.pendingImg;
      }
    });
    // conservar imágenes ya guardadas previamente que no se tocaron en esta sesión
    const prev = loadEdits();
    if(prev.images){
      Object.entries(prev.images).forEach(([id, url]) => {
        if(!(id in images)) images[id] = url;
      });
    }
    return { texts, images };
  }

  document.getElementById('etSave').addEventListener('click', () => {
    const state = collectCurrentState();
    try{
      localStorage.setItem(EDIT_KEY, JSON.stringify(state));
      statusEl.textContent = 'Cambios guardados en este navegador ✓';
    }catch(e){
      statusEl.textContent = 'Este entorno no permite guardar en el navegador. Usa "Descargar HTML" para conservar los cambios.';
    }
  });

  document.getElementById('etReset').addEventListener('click', () => {
    if(!confirm('¿Restablecer todos los textos e imágenes a su versión original?')) return;
    try{ localStorage.removeItem(EDIT_KEY); }catch(e){}
    location.reload();
  });

  document.getElementById('etExport').addEventListener('click', () => {
    const clone = document.documentElement.cloneNode(true);
    // apagar el modo edición visual en el archivo exportado
    clone.querySelector('body').classList.remove('edit-mode');
    clone.querySelectorAll('[data-edit-text]').forEach(el => el.removeAttribute('contenteditable'));
    const html = '<!DOCTYPE html>\n' + clone.outerHTML;
    const blob = new Blob([html], {type:'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'index.html';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    statusEl.textContent = 'HTML descargado con los cambios aplicados ✓';
  });

  // ==================================================================
  // ---- IDIOMA (ES / EN) + MODO OSCURO, sin base de datos ----
  // ==================================================================
  const translations = {
    'hero-eyebrow': {es:"Vehículos importados de confianza", en:"Trusted imported vehicles"},
    'hero-h1': {es:"Importa tu próximo vehículo, sin complicaciones", en:"Import your next vehicle, hassle-free"},
    'hero-p': {es:"Catálogo actualizado, garantía incluida y asesoría completa en cada etapa del proceso de importación.", en:"An up-to-date catalog, included warranty, and full guidance through every step of the import process."},
    'hero-cta': {es:"Explorar catálogo", en:"Explore catalog"},
    'about-eyebrow': {es:"Quiénes somos", en:"About us"},
    'about-h2': {es:"Sobre A&J Imports", en:"About A&J Imports"},
    'about-p': {es:"Más de una década conectando clientes con vehículos y repuestos importados, con procesos claros y seguimiento en cada etapa del proceso.", en:"Over a decade connecting customers with imported vehicles and parts, with clear processes and follow-up at every step."},
    'about-feat-1': {es:"Selección de vehículos de lujo", en:"Curated selection of premium vehicles"},
    'about-feat-2': {es:"Entrega rápida y seguimiento", en:"Fast delivery and follow-up"},
    'about-cta': {es:"Conocer más", en:"Learn more"},
    'banner-eyebrow': {es:"Cotización fácil", en:"Easy quoting"},
    'banner-h3': {es:"Inicia tu proceso de importación aquí", en:"Start your import process here"},
    'banner-p': {es:"Cotiza tu vehículo o repuesto en minutos, sin compromiso.", en:"Get a quote for your vehicle or part in minutes, no commitment."},
    'banner-cta': {es:"Solicitar importación", en:"Request import"},
    'serv-eyebrow': {es:"Recomendados", en:"Recommended"},
    'serv-h2': {es:"Nuestros servicios de importación", en:"Our import services"},
    'serv-1-h4': {es:"Precios competitivos", en:"Competitive pricing"},
    'serv-1-p': {es:"Tarifas claras y transparentes en cada importación, sin costos ocultos.", en:"Clear, transparent rates on every import, with no hidden costs."},
    'serv-2-h4': {es:"Variedad de vehículos", en:"Wide vehicle range"},
    'serv-2-p': {es:"Autos, carga, motos y maquinaria disponibles bajo pedido o en inventario.", en:"Cars, trucks, motorcycles and machinery available on request or in stock."},
    'serv-3-h4': {es:"Soporte 24/7", en:"24/7 support"},
    'serv-3-p': {es:"Acompañamiento durante todo el proceso de aduana y entrega.", en:"Support throughout the entire customs and delivery process."},
    'cat-eyebrow': {es:"Recomendados para ti", en:"Recommended for you"},
    'cat-h2': {es:"Nuestra colección de vehículos premium", en:"Our premium vehicle collection"},
    'art-eyebrow': {es:"Últimos artículos", en:"Latest articles"},
    'art-h2': {es:"Novedades del sector automotriz", en:"Automotive industry news"},
    'art-p': {es:"Guías y noticias sobre importación de vehículos y repuestos.", en:"Guides and news on importing vehicles and parts."},
    'btn-articles-cta': {es:"Nuestros servicios", en:"Our services"},
    'contact-eyebrow': {es:"Contacto", en:"Contact"},
    'contact-h2': {es:"Hablémoslo", en:"Let's talk"},
    'nav-inicio': {es:"Inicio", en:"Home"},
    'nav-nosotros': {es:"Nosotros", en:"About"},
    'nav-catalogo': {es:"Catálogo", en:"Catalog"},
    'nav-servicios': {es:"Servicios", en:"Services"},
    'nav-contacto': {es:"Contacto", en:"Contact"},
    'nav-cta': {es:"Reservar test drive", en:"Book a test drive"},
    'tab-vehiculos': {es:"Vehículos", en:"Vehicles"},
    'tab-repuestos': {es:"Repuestos", en:"Parts"},
    'chip-tipo': {es:"Tipo", en:"Type"},
    'chip-precio': {es:"Precio", en:"Price"},
    'chip-marca': {es:"Marca", en:"Brand"},
    'chip-nuevousado': {es:"Nuevo / usado", en:"New / used"},
    'chip-categoria': {es:"Categoría", en:"Category"},
    'chip-marcaveh': {es:"Marca del vehículo", en:"Vehicle brand"},
    'field-nombre': {es:"Nombre", en:"Name"},
    'field-correo': {es:"Correo", en:"Email"},
    'field-telefono': {es:"Teléfono", en:"Phone"},
    'field-mensaje': {es:"Mensaje", en:"Message"},
    'ph-nombre': {es:"Tu nombre", en:"Your name"},
    'ph-mensaje': {es:"Cuéntanos qué vehículo o repuesto buscas", en:"Tell us what vehicle or part you're looking for"},
    'btn-enviar': {es:"Enviar", en:"Send"},
    'form-sent': {es:"Enviado ✓", en:"Sent ✓"},
    'map-label': {es:"MAPA / UBICACIÓN", en:"MAP / LOCATION"},
    'footer-desc': {es:"Vehículos y repuestos importados, con garantía y soporte completo.", en:"Imported vehicles and parts, with full warranty and support."},
    'footer-col-links': {es:"Enlaces", en:"Links"},
    'footer-col-support': {es:"Soporte", en:"Support"},
    'footer-col-follow': {es:"Síguenos", en:"Follow us"},
    'footer-blog': {es:"Blog", en:"Blog"},
    'footer-precios': {es:"Precios", en:"Pricing"},
    'footer-preguntas': {es:"Preguntas", en:"FAQ"},
    'footer-terms': {es:"Términos", en:"Terms"},
    'footer-privacy': {es:"Privacidad", en:"Privacy"}
  };

  let currentLang = 'es';
  let currentDark = false;
  try{
    const savedLang = localStorage.getItem('ajLang');
    if(savedLang) currentLang = savedLang;
    const savedDark = localStorage.getItem('ajDark');
    if(savedDark) currentDark = savedDark === '1';
  }catch(e){ /* localStorage no disponible en este entorno */ }

  const langToggleBtn = document.getElementById('langToggle');
  const darkToggleBtn = document.getElementById('darkToggle');

  function applyLanguage(lang){
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(translations[key]) el.textContent = translations[key][lang];
    });
    document.querySelectorAll('[data-edit-text]').forEach(el => {
      const key = el.getAttribute('data-edit-text');
      if(translations[key]) el.textContent = translations[key][lang];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if(translations[key]) el.setAttribute('placeholder', translations[key][lang]);
    });
    langToggleBtn.textContent = lang === 'es' ? 'EN' : 'ES';
  }

  function setLang(lang){
    currentLang = lang;
    renderContent(lang);
    applyLanguage(lang);
    try{ applyEdits(loadEdits()); }catch(e){}
    try{ localStorage.setItem('ajLang', lang); }catch(e){}
  }

  function setDark(on){
    document.body.classList.toggle('dark', on);
    darkToggleBtn.textContent = on ? '☀️' : '🌙';
    currentDark = on;
    try{ localStorage.setItem('ajDark', on ? '1' : '0'); }catch(e){}
  }

  langToggleBtn.addEventListener('click', () => setLang(currentLang === 'es' ? 'en' : 'es'));
  darkToggleBtn.addEventListener('click', () => setDark(!currentDark));

  // ---- init ----
  setLang(currentLang);
  setDark(currentDark);
