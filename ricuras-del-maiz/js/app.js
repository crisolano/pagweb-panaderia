/* ============================================================
   app.js - Inicializacion General de la Aplicacion
   Ricuras del Maiz
   ============================================================ */

/**
 * Construye las tarjetas de productos dinamicamente
 * usando el array PRODUCTS definido en data.js
 */
function buildProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  PRODUCTS.forEach(function(product) {
    const card = document.createElement('div');
    card.className = 'product-card reveal';

    card.innerHTML =
      '<div class="card-img-wrap">' +
        '<div class="img-placeholder" id="prod' + product.id + '">' +
          '<input type="file" accept="image/*" onchange="loadImage(this, \'prod' + product.id + '\')">' +
          '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3AAFBE" stroke-width="1.3">' +
            '<rect x="3" y="3" width="18" height="18" rx="3"/>' +
            '<circle cx="8.5" cy="8.5" r="1.5"/>' +
            '<path d="M21 15l-5-5L5 21"/>' +
          '</svg>' +
          '<p>Subir imagen</p>' +
        '</div>' +
        (product.tag ? '<div class="card-tag">' + product.tag + '</div>' : '') +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-name">'  + product.name  + '</div>' +
        '<div class="card-desc">'  + product.desc  + '</div>' +
        '<div class="card-footer">' +
          '<span class="card-price">$' + product.price.toLocaleString('es-CO') + '</span>' +
          '<button class="card-btn" onclick="addToCart(' + product.id + ')">+ Agregar</button>' +
        '</div>' +
      '</div>';

    grid.appendChild(card);
  });
}

/**
 * Construye la grilla de galeria con 6 placeholders
 */
function buildGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const labels = [
    'Horno artesanal',
    'Pan recien horneado',
    'Maiz fresco',
    'Nuestro obrador',
    'Variedad del dia',
    'Desayuno especial'
  ];

  labels.forEach(function(label, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';

    const minH = index === 0 ? '420px' : '200px';

    item.innerHTML =
      '<div class="img-placeholder" id="gal' + index + '" style="min-height:' + minH + '; border-radius:14px">' +
        '<input type="file" accept="image/*" onchange="loadImage(this, \'gal' + index + '\')">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="1.3">' +
          '<rect x="3" y="3" width="18" height="18" rx="3"/>' +
          '<circle cx="8.5" cy="8.5" r="1.5"/>' +
          '<path d="M21 15l-5-5L5 21"/>' +
        '</svg>' +
        '<p style="color:rgba(255,255,255,.7); font-size:.68rem">' + label + '</p>' +
      '</div>' +
      '<div class="gallery-overlay"></div>';

    grid.appendChild(item);
  });
}

/**
 * Activa la animacion de entrada para los elementos .reveal
 * usando IntersectionObserver (se activan al hacer scroll)
 */
function initRevealAnimations() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
}

/**
 * Comprime el navbar al hacer scroll hacia abajo
 */
function initNavbarScroll() {
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Abre y cierra el menu hamburguesa en mobile
 */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ── Punto de entrada: se ejecuta cuando carga la pagina ── */
document.addEventListener('DOMContentLoaded', function() {
  buildProducts();
  buildGallery();
  initRevealAnimations();
  initNavbarScroll();
});
