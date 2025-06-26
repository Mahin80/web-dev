function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const icon = document.querySelector('.fa-cart-shopping');
  if (!icon) return;

  let badge = document.querySelector('.cart-count');
  if (!badge) {
    badge = document.createElement('span');
    badge.classList.add('cart-count');
    icon.parentElement.appendChild(badge);
  }

  badge.textContent = total > 0 ? total : '';
}

function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cartItems');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p style="font-family: Serif; margin-left: 50px; margin-top: 50px;">Your cart is empty.</p>';
    return;
  }

  let totalCartAmount = 0;

  cart.forEach((item, index) => {
    const total = item.price * item.quantity;
    totalCartAmount += total;

    const card = `
      <div class="cart-item" style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;">
        <img src="http://localhost:5000${item.image}" alt="${item.name}" style="width: 50px; margin-right: 10px;">
        <div>
          <span style="display:block;"><strong>${item.name}</strong></span>
          <span>${item.price}$ x ${item.quantity}</span><br/>
          <span>Total: ${total}$</span>
        </div>
        <div class="cart-actions" style="margin-left: auto; display: flex; flex-direction: row; gap: 4px;">
          <button onclick="changeQuantity(${index}, -1)"><i class="fa-solid fa-minus"></i></button>
          <button onclick="changeQuantity(${index}, 1)"><i class="fa-solid fa-plus"></i></button>
          <button onclick="removeFromCart(${index})"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', card);
  });

  // Append total and checkout button
  container.insertAdjacentHTML('beforeend', `
    <div class="cart-total" style="margin-top: 20px; border-top: 2px solid #999; padding-top: 10px; font-family: serif;">
      <p style="font-size: 16px;"><strong>Total: ${totalCartAmount.toFixed(2)}$</strong></p>
      <button onclick="goToCheckout()" style="padding: 10px 15px; font-family: serif; background: #8a422b; color: white; border: none; cursor: pointer; border-radius: 5px;">Go to Checkout</button>
    </div>
  `);
}

function goToCheckout() {
  window.location.href = 'checkout.html'; // Create this page later
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartIcon();
  renderCartItems();
}


function changeQuantity(index, delta) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartIcon();
  renderCartItems();
}

function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const icon = document.querySelector('.fa-cart-shopping');
  if (!icon) return;

  let badge = document.querySelector('.cart-count');
  if (!badge) {
    badge = document.createElement('span');
    badge.classList.add('cart-count');
    icon.parentElement.appendChild(badge);
  }

  badge.textContent = total > 0 ? total : '';
}
