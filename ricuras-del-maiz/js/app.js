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

var TEAM_IMAGES = [
  'img/WhatsApp Image 2026-05-12 at 1.43.01 PM.jpeg',
  'img/WhatsApp Image 2026-05-12 at 1.42.59 PM.jpeg',
  'img/WhatsApp Image 2026-05-12 at 1.43.01 PM (1).jpeg'
];

function buildProducts() {
  var grid = document.getElementById('productsGrid');
  if (!grid) return;

  PRODUCTS.forEach(function(product) {
    var item = document.createElement('div');
    item.className = 'pg-item reveal';
    item.innerHTML = '<img src="' + product.img + '" alt="' + product.name + '" loading="lazy" />';
    grid.appendChild(item);
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

function buildTeam() {
  var grid = document.getElementById('teamPhotos');
  if (!grid) return;

  TEAM_IMAGES.forEach(function(src) {
    var item = document.createElement('div');
    item.className = 'team-photo reveal';
    item.innerHTML = '<img src="' + src + '" alt="Equipo Ricuras del Maiz" loading="lazy" />';
    grid.appendChild(item);
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
  buildTeam();
  initRevealAnimations();
  initNavbarScroll();
});
