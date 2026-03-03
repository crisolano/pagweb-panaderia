/* ============================================================
   images.js - Carga y Sincronizacion de Imagenes
   Ricuras del Maiz
   ============================================================ */

/**
 * Carga una imagen desde el input de archivo
 * y la muestra dentro del placeholder indicado.
 *
 * @param {HTMLInputElement} input - El input de tipo file
 * @param {string} placeholderId  - El id del div placeholder
 */
function loadImage(input, placeholderId) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const placeholder = document.getElementById(placeholderId);

    // Ocultar el icono SVG y el texto del placeholder
    placeholder.querySelectorAll('svg, p').forEach(el => el.style.display = 'none');

    // Crear o reutilizar la etiqueta img
    let img = placeholder.querySelector('img.uploaded');
    if (!img) {
      img = document.createElement('img');
      img.className = 'uploaded';
      placeholder.appendChild(img);
    }

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

/**
 * Sincroniza el logo en los tres lugares donde aparece:
 * navbar, hero y footer. Al subir una sola vez se actualiza
 * en todos lados automaticamente.
 *
 * @param {HTMLInputElement} input - El input de tipo file
 */
function syncLogos(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const src = e.target.result;

    // IDs de los tres contenedores del logo
    const logoIds = ['nLogo', 'hLogo', 'fLogo'];

    logoIds.forEach(function(id) {
      const container = document.getElementById(id);
      if (!container) return;

      // Ocultar el emoji / placeholder original
      container.querySelectorAll('.hero-logo-ph, .logo-emoji').forEach(
        el => el.style.display = 'none'
      );

      // Ocultar nodos de texto (emojis sueltos)
      container.childNodes.forEach(function(node) {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = '';
      });

      // Crear o reutilizar img
      let img = container.querySelector('img.uploaded');
      if (!img) {
        img = document.createElement('img');
        img.className = 'uploaded';
        container.appendChild(img);
      }

      img.src = src;
    });
  };

  reader.readAsDataURL(file);
}
