/* ============================================================
   app.js — Inicializacion de la aplicacion
   Ricuras del Maiz
   ============================================================ */

var GALLERY_IMAGES = [
  { src: 'img/im3.jpeg',    label: 'Pan de maiz fresco'     },
  { src: 'img/im4.jpeg',    label: 'Arepa rellena'           },
  { src: 'img/im5.jpeg',    label: 'Variedad del dia'        },
  { src: 'img/im67.jpeg',   label: 'Nuestro obrador'         },
  { src: 'img/in8.jpeg',    label: 'Pan artesanal'           },
  { src: 'img/WhatsApp Image 2026-05-12 at 11.33.24 AM.jpeg', label: 'Horneado cada manana' }
];

function buildProducts() {
  var grid = document.getElementById('productsGrid');
  if (!grid) return;

  PRODUCTS.forEach(function(product) {
    var card = document.createElement('div');
    card.className = 'product-card reveal';

    var tagHtml = product.tag
      ? '<div class="card-tag">' + product.tag + '</div>'
      : '';

    var imgHtml = product.img
      ? '<img src="' + product.img + '" alt="' + product.name + '" loading="lazy" />'
      : '';

    card.innerHTML =
      '<div class="card-img-wrap">' +
        imgHtml +
        tagHtml +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-name">' + product.name + '</div>' +
        '<div class="card-desc">' + product.desc + '</div>' +
        '<div class="card-footer">' +
          '<span class="card-price">$' + product.price.toLocaleString('es-CO') + '</span>' +
          '<button class="card-btn" onclick="addToCart(' + product.id + ')">Agregar</button>' +
        '</div>' +
      '</div>';

    grid.appendChild(card);
  });
}

function buildGallery() {
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;

  GALLERY_IMAGES.forEach(function(item) {
    var el = document.createElement('div');
    el.className = 'gallery-item reveal';

    el.innerHTML =
      '<img src="' + item.src + '" alt="' + item.label + '" loading="lazy" />' +
      '<div class="gallery-overlay"></div>' +
      '<span class="gallery-label">' + item.label + '</span>';

    grid.appendChild(el);
  });
}

function initRevealAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
}

function initNavbarScroll() {
  window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
  }, { passive: true });
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {
  buildProducts();
  buildGallery();
  initRevealAnimations();
  initNavbarScroll();
});
