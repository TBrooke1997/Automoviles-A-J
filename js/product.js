// ---- catálogo (mismo dataset base del index) ----
  const catalog = {
    "veh-0": {type:"vehicle", name:"Toyota Hilux 2024", meta:"12,000 km · 4x4 · Diésel", price:"$38,900", descEs:"Camioneta doble cabina 4x4, único dueño, mantenimientos al día. Incluye garantía de fábrica vigente.", descEn:"4x4 double-cab pickup, single owner, up to date on maintenance. Includes active factory warranty.", specs:[["Año","2024"],["Kilometraje","12,000 km"],["Transmisión","Manual 4x4"],["Combustible","Diésel"]]},
    "veh-1": {type:"vehicle", name:"Ford Ranger 2022", meta:"28,500 km · 4x2 · Gasolina", price:"$29,700", descEs:"Pick-up confiable, ideal para trabajo y ciudad. Revisión mecánica reciente.", descEn:"Reliable pickup, great for work and city driving. Recently serviced.", specs:[["Año","2022"],["Kilometraje","28,500 km"],["Transmisión","Manual 4x2"],["Combustible","Gasolina"]]},
    "veh-2": {type:"vehicle", name:"Chevrolet Onix 2023", meta:"9,200 km · Auto · Gasolina", price:"$16,500", descEs:"Sedán económico, bajo kilometraje, ideal como primer vehículo.", descEn:"Economical sedan with low mileage, a great first car.", specs:[["Año","2023"],["Kilometraje","9,200 km"],["Transmisión","Automático"],["Combustible","Gasolina"]]},
    "veh-3": {type:"vehicle", name:"Kia Sportage 2023", meta:"15,300 km · 4x2 · Gasolina", price:"$27,200", descEs:"SUV compacta, espaciosa y eficiente, perfecta para familia.", descEn:"Compact SUV, spacious and efficient — great for families.", specs:[["Año","2023"],["Kilometraje","15,300 km"],["Transmisión","Automático 4x2"],["Combustible","Gasolina"]]},
    "veh-4": {type:"vehicle", name:"Nissan Frontier 2021", meta:"41,000 km · 4x4 · Diésel", price:"$24,900", descEs:"Camioneta robusta con buen historial de mantenimiento.", descEn:"Rugged pickup with a solid maintenance history.", specs:[["Año","2021"],["Kilometraje","41,000 km"],["Transmisión","Manual 4x4"],["Combustible","Diésel"]]},
    "veh-5": {type:"vehicle", name:"Hyundai Tucson 2024", meta:"6,800 km · Auto · Gasolina", price:"$31,400", descEs:"SUV casi nueva, equipamiento completo y bajo uso.", descEn:"Nearly new SUV, fully equipped with very low mileage.", specs:[["Año","2024"],["Kilometraje","6,800 km"],["Transmisión","Automático"],["Combustible","Gasolina"]]},
    "part-0": {type:"part", name:"Filtro de aceite", meta:"Compatible Toyota", price:"$18", descEs:"Filtro de aceite original, alta duración y filtrado eficiente.", descEn:"Original oil filter, long-lasting with efficient filtration.", specs:[["Compatibilidad","Toyota"],["Tipo","Original"],["Garantía","6 meses"]]},
    "part-1": {type:"part", name:"Pastillas de freno", meta:"Compatible Ford", price:"$46", descEs:"Juego de pastillas de freno delanteras, material cerámico de baja vibración.", descEn:"Front brake pad set, low-vibration ceramic compound.", specs:[["Compatibilidad","Ford"],["Posición","Delantera"],["Garantía","6 meses"]]},
    "part-2": {type:"part", name:"Amortiguador", meta:"Compatible Nissan", price:"$120", descEs:"Amortiguador de gas, mejora estabilidad y confort de manejo.", descEn:"Gas-charged shock absorber, improves stability and ride comfort.", specs:[["Compatibilidad","Nissan"],["Tipo","Gas"],["Garantía","12 meses"]]},
    "part-3": {type:"part", name:"Correa de distribución", meta:"Compatible Kia", price:"$65", descEs:"Kit de distribución completo, incluye tensor.", descEn:"Full timing belt kit, includes tensioner.", specs:[["Compatibilidad","Kia"],["Incluye","Tensor"],["Garantía","12 meses"]]},
    "part-4": {type:"part", name:"Batería 12V", meta:"Compatible universal", price:"$95", descEs:"Batería libre de mantenimiento, arranque en frío garantizado.", descEn:"Maintenance-free battery, guaranteed cold-start performance.", specs:[["Voltaje","12V"],["Compatibilidad","Universal"],["Garantía","18 meses"]]},
    "part-5": {type:"part", name:"Radiador", meta:"Compatible Hyundai", price:"$140", descEs:"Radiador de aluminio, alta capacidad de enfriamiento.", descEn:"Aluminum radiator with high cooling capacity.", specs:[["Compatibilidad","Hyundai"],["Material","Aluminio"],["Garantía","12 meses"]]}
  };

  const params = new URLSearchParams(location.search);
  const productId = catalog[params.get('id')] ? params.get('id') : 'veh-0';
  const product = catalog[productId];

  const seedReviews = {es:[
      {name:"Carlos M.", rating:5, text:"Excelente atención, el vehículo llegó tal cual lo describieron.", date:"12 ago 2026"},
      {name:"Andreína P.", rating:4, text:"Buen proceso de importación, un poco más lento de lo esperado pero todo salió bien.", date:"03 ago 2026"}
    ], en:[
      {name:"Carlos M.", rating:5, text:"Great service, the vehicle arrived exactly as described.", date:"Aug 12, 2026"},
      {name:"Andreína P.", rating:4, text:"Good import process, a bit slower than expected but everything worked out.", date:"Aug 3, 2026"}
    ]};

  // ---- galería ----
  const GALLERY_KEY = `ajGallery_${productId}`;
  let gallery = [null, null, null, null];
  try{
    const saved = JSON.parse(localStorage.getItem(GALLERY_KEY) || 'null');
    if(saved) gallery = saved;
  }catch(e){}
  let activeSlot = 0;

  function paintGallery(){
    const main = document.getElementById('galleryMain');
    if(gallery[activeSlot]) main.style.backgroundImage = `url(${gallery[activeSlot]})`;
    else main.style.backgroundImage = '';
    const thumbsEl = document.getElementById('thumbs');
    thumbsEl.innerHTML = '';
    gallery.forEach((img, i) => {
      const t = document.createElement('div');
      t.className = 'thumb' + (i === activeSlot ? ' active' : '');
      if(img) t.style.backgroundImage = `url(${img})`;
      t.dataset.slot = i;
      thumbsEl.appendChild(t);
    });
  }
  document.getElementById('galleryMain').addEventListener('click', () => {
    activeSlot = parseInt(document.getElementById('galleryMain').dataset.slot || 0);
    document.getElementById('imgFileInput').click();
  });
  document.getElementById('thumbs').addEventListener('click', (e) => {
    const t = e.target.closest('.thumb');
    if(!t) return;
    activeSlot = parseInt(t.dataset.slot);
    paintGallery();
  });
  document.getElementById('thumbs').addEventListener('dblclick', (e) => {
    const t = e.target.closest('.thumb');
    if(!t) return;
    activeSlot = parseInt(t.dataset.slot);
    document.getElementById('imgFileInput').click();
  });
  document.getElementById('imgFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      gallery[activeSlot] = ev.target.result;
      try{ localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery)); }catch(err){}
      paintGallery();
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });

  // ---- reseñas ----
  const REVIEWS_KEY = `ajReviews_${productId}`;
  function loadReviews(){
    try{
      const saved = JSON.parse(localStorage.getItem(REVIEWS_KEY) || 'null');
      if(saved) return saved;
    }catch(e){}
    return null;
  }
  function saveReviews(list){
    try{ localStorage.setItem(REVIEWS_KEY, JSON.stringify(list)); }catch(e){}
  }
  let reviews = loadReviews() || seedReviews.es.slice();

  function starsStr(rating){
    const full = Math.round(rating);
    return '★★★★★☆☆☆☆☆'.slice(5-full, 10-full);
  }

  function renderReviews(){
    const list = document.getElementById('reviewList');
    if(reviews.length === 0){
      list.innerHTML = `<div class="empty-reviews">${translations['no-reviews'][currentLang]}</div>`;
    } else {
      list.innerHTML = reviews.map(r => `
        <div class="review-item">
          <div class="review-top">
            <span class="review-name">${r.name}</span>
            <span class="review-date">${r.date}</span>
          </div>
          <div class="review-stars">${starsStr(r.rating)}</div>
          <div class="review-text">${r.text}</div>
        </div>`).join('');
    }
    const avg = reviews.length ? (reviews.reduce((s,r)=>s+r.rating,0) / reviews.length) : 0;
    document.getElementById('avgNumber').textContent = avg.toFixed(1);
    document.getElementById('avgStars').textContent = starsStr(avg);
    document.getElementById('headerStars').textContent = starsStr(avg);
    document.getElementById('headerCount').textContent = `(${reviews.length})`;
    document.getElementById('avgCount').textContent =
      (currentLang === 'en' ? `Based on ${reviews.length} review${reviews.length===1?'':'s'}` : `Basado en ${reviews.length} reseña${reviews.length===1?'':'s'}`);
  }

  let selectedStars = 0;
  document.getElementById('starPicker').addEventListener('click', (e) => {
    const s = e.target.closest('span');
    if(!s) return;
    selectedStars = parseInt(s.dataset.v);
    document.querySelectorAll('#starPicker span').forEach(el => {
      el.classList.toggle('filled', parseInt(el.dataset.v) <= selectedStars);
    });
  });

  document.getElementById('submitReview').addEventListener('click', () => {
    const name = document.getElementById('revName').value.trim() || (currentLang==='en' ? 'Anonymous' : 'Anónimo');
    const text = document.getElementById('revText').value.trim();
    if(!text || !selectedStars){
      alert(currentLang==='en' ? 'Please add a rating and a comment.' : 'Agrega una calificación y un comentario.');
      return;
    }
    const today = new Date();
    const dateStr = currentLang==='en'
      ? today.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})
      : today.toLocaleDateString('es-ES', {day:'2-digit', month:'short', year:'numeric'});
    reviews.unshift({name, rating:selectedStars, text, date:dateStr});
    saveReviews(reviews);
    document.getElementById('revName').value = '';
    document.getElementById('revText').value = '';
    selectedStars = 0;
    document.querySelectorAll('#starPicker span').forEach(el => el.classList.remove('filled'));
    renderReviews();
  });

  // ---- pintar producto ----
  function paintProduct(){
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productMeta').textContent = product.meta;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDesc').textContent = currentLang === 'en' ? product.descEn : product.descEs;
    document.getElementById('ctaBtn').textContent = product.type === 'vehicle'
      ? (currentLang === 'en' ? 'Book' : 'Reservar')
      : (currentLang === 'en' ? 'Inquire' : 'Consultar');
    document.getElementById('specGrid').innerHTML = product.specs.map(([k,v]) => `
      <div class="spec"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
  }

  // ==================================================================
  // ---- IDIOMA + MODO OSCURO ----
  // ==================================================================
  const translations = {
    'nav-inicio': {es:"Inicio", en:"Home"},
    'nav-catalogo': {es:"Catálogo", en:"Catalog"},
    'nav-servicios': {es:"Servicios", en:"Services"},
    'nav-contacto': {es:"Contacto", en:"Contact"},
    'back-arrow': {es:"←", en:"←"},
    'back-catalog': {es:"Volver al catálogo", en:"Back to catalog"},
    'ask-question': {es:"Hacer una pregunta", en:"Ask a question"},
    'rev-eyebrow': {es:"Opiniones", en:"Reviews"},
    'rev-h2': {es:"Lo que dicen nuestros clientes", en:"What our customers say"},
    'based-on': {es:"Basado en 0 reseñas", en:"Based on 0 reviews"},
    'rev-form-title': {es:"Deja tu opinión", en:"Leave your review"},
    'rev-rating': {es:"Tu calificación", en:"Your rating"},
    'rev-name': {es:"Nombre", en:"Name"},
    'rev-comment': {es:"Comentario", en:"Comment"},
    'rev-submit': {es:"Enviar reseña", en:"Submit review"},
    'ph-nombre': {es:"Tu nombre", en:"Your name"},
    'ph-comment': {es:"Cuéntanos tu experiencia...", en:"Tell us about your experience..."},
    'no-reviews': {es:"Todavía no hay reseñas. ¡Sé el primero en opinar!", en:"No reviews yet. Be the first to leave one!"}
  };

  let currentLang = 'es';
  let currentDark = false;
  try{
    const savedLang = localStorage.getItem('ajLang');
    if(savedLang) currentLang = savedLang;
    const savedDark = localStorage.getItem('ajDark');
    if(savedDark) currentDark = savedDark === '1';
  }catch(e){}

  const langToggleBtn = document.getElementById('langToggle');
  const darkToggleBtn = document.getElementById('darkToggle');

  function applyLanguage(lang){
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
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
    if(!loadReviews()) reviews = seedReviews[lang].slice();
    applyLanguage(lang);
    paintProduct();
    renderReviews();
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
  paintGallery();
  setLang(currentLang);
  setDark(currentDark);
