/* ============================================================
   cart.js - Logica del Carrito de Compras
   Ricuras del Maiz
   ============================================================ */

// Estado del carrito: { id: { name, price, qty } }
const cart = {};

/**
 * Agrega un producto al carrito o incrementa su cantidad.
 * @param {number} productId
 */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  if (cart[productId]) {
    cart[productId].qty += 1;
  } else {
    cart[productId] = {
      name:  product.name,
      price: product.price,
      qty:   1
    };
  }

  renderCart();
  animateCartButton();
  showToast();
}

/**
 * Cambia la cantidad de un producto.
 * Si llega a 0 lo elimina del carrito.
 * @param {number} productId
 * @param {number} delta - +1 para sumar, -1 para restar
 */
function changeQty(productId, delta) {
  if (!cart[productId]) return;

  cart[productId].qty += delta;

  if (cart[productId].qty <= 0) {
    delete cart[productId];
  }

  renderCart();
}

/**
 * Dibuja los items del carrito en el panel lateral.
 */
function renderCart() {
  const itemsContainer  = document.getElementById('cartItems');
  const totalSection    = document.getElementById('cartTotal');
  const totalValueEl    = document.getElementById('cartTotalValue');
  const checkoutSection = document.getElementById('checkoutWrap');
  const badge           = document.getElementById('cartCount');

  const keys     = Object.keys(cart);
  const totalQty = keys.reduce((sum, k) => sum + cart[k].qty, 0);
  const totalAmt = keys.reduce((sum, k) => sum + cart[k].price * cart[k].qty, 0);

  // Actualizar badge del boton flotante
  badge.style.display = totalQty > 0 ? 'flex' : 'none';
  badge.textContent   = totalQty;

  // Carrito vacio
  if (keys.length === 0) {
    itemsContainer.innerHTML = '<div class="cart-empty">Tu carrito esta vacio. Agrega algo delicioso!</div>';
    totalSection.style.display    = 'none';
    checkoutSection.style.display = 'none';
    return;
  }

  // Renderizar filas de productos
  itemsContainer.innerHTML = keys.map(function(k) {
    return '<div class="cart-item-row">' +
      '<span class="cart-item-name">'  + cart[k].name + '</span>' +
      '<div class="cart-item-qty">' +
        '<button class="qty-btn" onclick="changeQty(' + k + ', -1)">-</button>' +
        '<span style="font-weight:700">' + cart[k].qty + '</span>' +
        '<button class="qty-btn" onclick="changeQty(' + k + ', 1)">+</button>' +
      '</div>' +
      '<span class="cart-item-price">$' + (cart[k].price * cart[k].qty).toLocaleString('es-CO') + '</span>' +
    '</div>';
  }).join('');

  // Mostrar total y boton de confirmar
  totalValueEl.textContent          = '$' + totalAmt.toLocaleString('es-CO');
  totalSection.style.display        = 'flex';
  checkoutSection.style.display     = 'block';
}

/**
 * Abre o cierra el panel lateral del carrito.
 */
function toggleCart() {
  document.getElementById('cartModal').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('active');
}

/**
 * Confirma el pedido, limpia el carrito y cierra el panel.
 */
function confirmOrder() {
  // Vaciar el carrito
  Object.keys(cart).forEach(k => delete cart[k]);
  renderCart();
  toggleCart();
  alert('Gracias por tu pedido! Nos pondremos en contacto muy pronto.');
}

/**
 * Anima el boton flotante del carrito al agregar un item.
 */
function animateCartButton() {
  const fab = document.querySelector('.cart-fab');
  fab.style.transform = 'scale(1.25)';
  setTimeout(() => { fab.style.transform = ''; }, 250);
}

/**
 * Muestra la notificacion toast brevemente.
 */
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2200);
}
