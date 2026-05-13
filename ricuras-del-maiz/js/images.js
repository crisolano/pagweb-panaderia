/* ============================================================
   images.js — Utilidades de imagen (mantenido por compatibilidad)
   Ricuras del Maiz
   ============================================================ */

function loadImage(input, placeholderId) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var container = document.getElementById(placeholderId);
    if (!container) return;
    var img = container.querySelector('img') || document.createElement('img');
    img.src = e.target.result;
    if (!img.parentNode) container.appendChild(img);
  };
  reader.readAsDataURL(file);
}
