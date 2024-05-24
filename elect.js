document.addEventListener('DOMContentLoaded', function () {
  const cartCount = document.querySelector('.cart-count');
  const cartDropdown = document.querySelector('.cart-dropdown');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const buyNowButtons = document.querySelectorAll('.buy-now');
  let cart = [];

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.parentElement;
      const productId = productCard.dataset.productId;
      const productName = productCard.querySelector('h3').innerText;
      const productPrice = parseFloat(productCard.querySelector('p').innerText.replace('$', ''));

      const product = {
        id: productId,
        name: productName,
        price: productPrice
      };

      addToCart(product);
    });
  });

  buyNowButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert("Thank you for your purchase!");
    });
  });

  function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    updateCart();
  }

  function removeFromCart(productId) {
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity === 0) {
        cart = cart.filter(product => product.id !== productId);
      }
    }

    updateCart();
  }

  function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
      const cartItem = document.createElement('li');
      cartItem.innerHTML = `
        <span>${product.name} x ${product.quantity}</span>
        <span>$${(product.price * product.quantity).toFixed(2)}</span>
        <button class="remove-from-cart">-</button>
      `;
      cartItemsContainer.appendChild(cartItem);

      total += product.price * product.quantity;

      cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
        removeFromCart(product.id);
      });
    });

    cartTotal.innerText = total.toFixed(2);
    cartCount.innerText = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartDropdown.style.display = cart.length ? 'block' : 'none';
  }

  document.querySelector('.nav-links li a[href="#"]').addEventListener('click', (e) => {
    e.preventDefault();
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
  });
});
