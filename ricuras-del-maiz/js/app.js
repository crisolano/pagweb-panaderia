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

var TEAM_MEMBERS = [
  { src: 'img/WhatsApp Image 2026-05-12 at 1.43.01 PM.jpeg',     role: 'Panadero Artesanal' },
  { src: 'img/WhatsApp Image 2026-05-12 at 1.42.59 PM.jpeg',     role: 'Maestra Panadera'   },
  { src: 'img/WhatsApp Image 2026-05-12 at 1.43.01 PM (1).jpeg', role: 'Obrador Artesanal'  },
];

function buildProducts() {
  var grid = document.getElementById('productsGrid');
  if (!grid) return;

  PRODUCTS.forEach(function(product) {
    var price = '$' + product.price.toLocaleString('es-CO');
    var waText = encodeURIComponent('Hola, quiero pedir ' + product.name + ' – ' + price);
    var tagHtml = product.tag
      ? '<span class="pg-tag">' + product.tag + '</span>'
      : '';

    var item = document.createElement('div');
    item.className = 'pg-item reveal';
    item.innerHTML =
      '<img src="' + product.img + '" alt="' + product.name + '" loading="lazy" />' +
      tagHtml +
      '<div class="pg-footer">' +
        '<div class="pg-info">' +
          '<span class="pg-name">' + product.name + '</span>' +
          '<span class="pg-price">' + price + '</span>' +
        '</div>' +
        '<a href="https://wa.me/573133447620?text=' + waText + '" class="pg-cta" target="_blank" rel="noopener">Pedir</a>' +
      '</div>';
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

  TEAM_MEMBERS.forEach(function(member) {
    var item = document.createElement('div');
    item.className = 'team-photo reveal';
    item.innerHTML =
      '<img src="' + member.src + '" alt="Equipo Ricuras del Maiz" loading="lazy" />' +
      '<div class="team-role-badge">' +
        '<span class="team-role-text">' + member.role + '</span>' +
      '</div>';
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
  var nav     = document.getElementById('navLinks');
  var btn     = document.querySelector('.hamburger');
  var overlay = document.getElementById('navOverlay');
  nav.classList.toggle('open');
  btn.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
}

function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.querySelector('.hamburger').classList.remove('active');
  var overlay = document.getElementById('navOverlay');
  if (overlay) overlay.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
  buildProducts();
  buildGallery();
  buildTeam();
  initRevealAnimations();
  initNavbarScroll();

  /* Cerrar menu al tocar cualquier enlace de navegacion */
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  /* Cerrar menu con la tecla Escape */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });
});
